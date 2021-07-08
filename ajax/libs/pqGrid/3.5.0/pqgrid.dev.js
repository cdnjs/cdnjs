/*!
 * ParamQuery Pro v3.5.0
 * 
 * Copyright (c) 2012-2021 Paramvir Dhindsa (http://paramquery.com)
 * Released under GNU General Public License v3
 * http://paramquery.com/license
 * 
 */
 if (typeof require == "function") {
	var jQuery = require("jquery-ui-pack"),
		pq = {},
		JSZip = require("jszip");
	module.exports = pq
} else {
	var jQuery = window.jQuery,
		pq = window.pq = window.pq || {},
		JSZip = window.JSZip
}(function($) {
	var _p = $.ui.autocomplete.prototype;
	var _renderMenu = _p._renderMenu;
	var _renderItem = _p._renderItem;
	_p._renderMenu = function(ul, items) {
		_renderMenu.call(this, ul, items);
		var o = this.options,
			SI = o.selectItem;
		if (SI && SI.on) {
			var cls = SI.cls,
				cls = cls === undefined ? "ui-state-highlight" : cls;
			var val = this.element.val();
			if (val && cls) {
				$("a", ul).filter(function() {
					return $(this).text() === val
				}).addClass(cls)
			}
		}
	};
	_p._renderItem = function(ul, item) {
		var li = _renderItem.call(this, ul, item);
		var o = this.options,
			HI = o.highlightText;
		if (HI && HI.on) {
			var val = this.element.val();
			if (val) {
				var re = new RegExp("(" + val + ")", "i"),
					text = item.label;
				if (re.test(text)) {
					var style = HI.style,
						style = style === undefined ? "font-weight:bold;" : style,
						cls = HI.cls,
						cls = cls === undefined ? "" : cls;
					text = text.replace(re, "<span style='" + style + "' class='" + cls + "'>$1</span>");
					li.find("a").html(text)
				}
			}
		}
		return li
	};
	var _pq = $.paramquery = $.paramquery || {};
	var handleListeners = function(that, arg_listeners, evt, data) {
		var listeners = arg_listeners.slice(),
			removals = [];
		for (var i = 0, len = listeners.length; i < len; i++) {
			var listener = listeners[i],
				cb = listener.cb,
				one = listener.one;
			if (one) {
				if (listener._oncerun) {
					continue
				}
				listener._oncerun = true
			}
			var ret = cb.call(that, evt, data);
			if (ret === false) {
				evt.preventDefault();
				evt.stopPropagation()
			}
			if (one) {
				removals.push(i)
			}
			if (evt.isImmediatePropagationStopped()) {
				break
			}
		}
		if (removals.length) {
			for (var i = removals.length - 1; i >= 0; i--) {
				listeners.splice(removals[i], 1)
			}
		}
	};
	_pq._trigger = function(type, evt, data) {
		var self = this,
			prop, orig, this_listeners = self.listeners,
			listeners = this_listeners[type],
			o = self.options,
			allEvents = o.allEvents,
			bubble = o.bubble,
			$ele = self.element,
			callback = o[type];
		data = data || {};
		evt = $.Event(evt);
		evt.type = self.widgetName + ":" + type;
		evt.target = $ele[0];
		orig = evt.originalEvent;
		if (orig) {
			for (prop in orig) {
				if (!(prop in evt)) {
					evt[prop] = orig[prop]
				}
			}
		}
		if (allEvents) {
			if (typeof allEvents == "function") {
				allEvents.call(self, evt, data)
			}
		}
		if (listeners && listeners.length) {
			handleListeners(self, listeners, evt, data);
			if (evt.isImmediatePropagationStopped()) {
				return !evt.isDefaultPrevented()
			}
		}
		if (o.trigger) {
			$ele[bubble ? "trigger" : "triggerHandler"](evt, data);
			if (evt.isImmediatePropagationStopped()) {
				return !evt.isDefaultPrevented()
			}
		}
		if (callback) {
			var ret = callback.call(self, evt, data);
			if (ret === false) {
				evt.preventDefault();
				evt.stopPropagation()
			}
		}
		listeners = this_listeners[type + "Done"];
		if (listeners && listeners.length) {
			handleListeners(self, listeners, evt, data)
		}
		return !evt.isDefaultPrevented()
	};
	var event_on = function(that, type, cb, one, first) {
		var listeners = that.listeners[type];
		if (!listeners) {
			listeners = that.listeners[type] = []
		}
		listeners[first ? "unshift" : "push"]({
			cb: cb,
			one: one
		})
	};
	_pq.on = function() {
		var arg = arguments;
		if (typeof arg[0] == "boolean") {
			var first = arg[0],
				type = arg[1],
				cb = arg[2],
				one = arg[3]
		} else {
			var type = arg[0],
				cb = arg[1],
				one = arg[2]
		}
		var arr = type.split(" ");
		for (var i = 0; i < arr.length; i++) {
			var _type = arr[i];
			if (_type) {
				event_on(this, _type, cb, one, first)
			}
		}
		return this
	};
	_pq.one = function() {
		var len = arguments.length,
			arr = [];
		for (var i = 0; i < len; i++) {
			arr[i] = arguments[i]
		}
		arr[len] = true;
		return this.on.apply(this, arr)
	};
	var event_off = function(that, evtName, cb) {
		if (cb) {
			var listeners = that.listeners[evtName];
			if (listeners) {
				var removals = [];
				for (var i = 0, len = listeners.length; i < len; i++) {
					var listener = listeners[i],
						cb2 = listener.cb;
					if (cb == cb2) {
						removals.push(i)
					}
				}
				if (removals.length) {
					for (var i = removals.length - 1; i >= 0; i--) {
						listeners.splice(removals[i], 1)
					}
				}
			}
		} else {
			delete that.listeners[evtName]
		}
	};
	_pq.off = function(type, cb) {
		var arr = type.split(" ");
		for (var i = 0; i < arr.length; i++) {
			var _type = arr[i];
			if (_type) {
				event_off(this, _type, cb)
			}
		}
		return this
	};
	var fn = {
		options: {
			items: "td.pq-has-tooltip,td[title]",
			position: {
				my: "center top",
				at: "center bottom"
			},
			content: function() {
				var $td = $(this),
					$grid = $td.closest(".pq-grid"),
					grid = $grid.pqGrid("getInstance").grid,
					obj = grid.getCellIndices({
						$td: $td
					}),
					rowIndx = obj.rowIndx,
					dataIndx = obj.dataIndx,
					pq_valid = grid.data({
						rowIndx: rowIndx,
						dataIndx: dataIndx,
						data: "pq_valid"
					}).data;
				if (pq_valid) {
					var icon = pq_valid.icon,
						title = pq_valid.msg;
					title = title != null ? title : "";
					var strIcon = icon == "" ? "" : "<span class='ui-icon " + icon + " pq-tooltip-icon'></span>";
					return strIcon + title
				} else {
					return $td.attr("title")
				}
			}
		}
	};
	fn._create = function() {
		this._super();
		var $ele = this.element,
			eventNamespace = this.eventNamespace;
		$ele.on("pqtooltipopen" + eventNamespace, function(evt, ui) {
			var $grid = $(evt.target),
				$td = $(evt.originalEvent.target);
			$td.on("remove", function(evt) {
				$grid.pqTooltip("close", evt, true)
			});
			if ($grid.is(".pq-grid")) {
				var obj = $grid.pqGrid("getCellIndices", {
						$td: $td
					}),
					rowIndx = obj.rowIndx,
					dataIndx = obj.dataIndx,
					a, rowData = $grid.pqGrid("getRowData", {
						rowIndx: rowIndx
					});
				if ((a = rowData) && (a = a.pq_celldata) && (a = a[dataIndx]) && (a = a.pq_valid)) {
					var valid = a,
						style = valid.style,
						cls = valid.cls;
					ui.tooltip.addClass(cls);
					var olds = ui.tooltip.attr("style");
					ui.tooltip.attr("style", olds + ";" + style)
				}
				$grid.find("div.pq-sb-horiz,div.pq-sb-vert").on("pqscrollbardrag", function(evt, ui) {
					evt.currentTarget = $td[0];
					$grid.pqTooltip("close", evt, true)
				})
			}
		});
		$ele.on("pqtooltipclose" + eventNamespace, function(evt, ui) {
			var $grid = $(evt.target),
				$td = $(evt.originalEvent.target);
			$td.off("remove");
			if ($grid.is(".pq-grid")) {
				$grid.find("div.pq-sb-horiz,div.pq-sb-vert").off("pqscrollbardrag")
			}
		})
	};
	$.widget("paramquery.pqTooltip", $.ui.tooltip, fn)
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		_proto_ = Array.prototype;
	if (!_proto_.find) {
		_proto_.find = function(fn, context) {
			for (var i = 0, len = this.length, item; i < len; i++) {
				item = this[i];
				if (fn.call(context, item, i, this)) {
					return item
				}
			}
		}
	}
	if (!_proto_.findIndex) {
		_proto_.findIndex = function(fn, context) {
			for (var i = 0, len = this.length, item; i < len; i++) {
				item = this[i];
				if (fn.call(context, item, i, this)) {
					return i
				}
			}
			return -1
		}
	}
	if (!_proto_.map) {
		_proto_.map = function(fn, context) {
			for (var i = 0, len = this.length, arr = []; i < len; i++) {
				arr.push(fn.call(context, this[i], i, this))
			}
			return arr
		}
	}
	if (!_proto_.forEach) {
		_proto_.forEach = function(fn, context) {
			for (var i = 0, len = this.length; i < len; i++) {
				fn.call(context, this[i], i, this)
			}
		}
	}
	pq.getFn = function() {
		var obj = {};
		return function(cb) {
			var fn = cb;
			if (typeof cb === "string") {
				if (!(fn = obj[cb])) {
					fn = window;
					cb.split(".").forEach(function(part) {
						fn = fn[part]
					});
					obj[cb] = fn
				}
			}
			return fn
		}
	}();
	pq.searchSeqArray = function(arr, val) {
		var len = arr.length,
			b = val,
			indx = val,
			count = 0,
			indx = indx > len - 1 ? len - 1 : indx,
			_val;
		do {
			_val = arr[indx];
			count++;
			if (_val < val) {
				if (indx == len - 1) {
					indx = -1;
					break
				}
				indx = Math.ceil((indx + b) / 2);
				indx = indx > len - 1 ? len - 1 : indx
			} else {
				if (_val > val) {
					b = indx;
					indx = Math.floor(indx / 2)
				} else {
					break
				}
			}
			if (count > 100) {
				throw "too many iterations"
			}
		} while (1);
		return indx
	};
	pq.arrayUnique = function(arr, key) {
		var newarr = [],
			i, len = arr.length,
			str, obj = {},
			key2;
		for (i = 0; i < len; i++) {
			str = arr[i];
			key2 = key ? str[key] : str;
			if (obj.hasOwnProperty(key2)) {
				continue
			}
			obj[key2] = 1;
			newarr.push(str)
		}
		return newarr
	};
	_pq.select = function(objP) {
		var attr = objP.attr,
			opts = objP.options,
			groupIndx = objP.groupIndx,
			labelIndx = objP.labelIndx,
			valueIndx = objP.valueIndx,
			jsonFormat = labelIndx != null && valueIndx != null,
			grouping = groupIndx != null,
			prepend = objP.prepend,
			dataMap = objP.dataMap,
			groupV, groupVLast, jsonF, dataMapFn = function() {
				var jsonObj = {};
				for (var k = 0; k < dataMap.length; k++) {
					var key = dataMap[k];
					jsonObj[key] = option[key]
				}
				return "data-map='" + JSON.stringify(jsonObj) + "'"
			},
			buffer = ["<select ", attr, " >"];
		if (prepend) {
			for (var key in prepend) {
				buffer.push('<option value="', key, '">', prepend[key], "</option>")
			}
		}
		if (opts && opts.length) {
			for (var i = 0, len = opts.length; i < len; i++) {
				var option = opts[i];
				if (jsonFormat) {
					var value = option[valueIndx],
						disabled = option.pq_disabled ? 'disabled="disabled" ' : "",
						selected = option.pq_selected ? 'selected="selected" ' : "";
					if (value == null) {
						continue
					}
					jsonF = dataMap ? dataMapFn() : "";
					if (grouping) {
						var disabled_group = option.pq_disabled_group ? 'disabled="disabled" ' : "";
						groupV = option[groupIndx];
						if (groupVLast != groupV) {
							if (groupVLast != null) {
								buffer.push("</optgroup>")
							}
							buffer.push('<optgroup label="', groupV, '" ', disabled_group, " >");
							groupVLast = groupV
						}
					}
					if (labelIndx == valueIndx) {
						buffer.push("<option ", selected, disabled, jsonF, ">", value, "</option>")
					} else {
						var label = option[labelIndx];
						buffer.push("<option ", selected, disabled, jsonF, ' value="', value, '">', label, "</option>")
					}
				} else {
					if (typeof option == "object") {
						for (var key in option) {
							buffer.push('<option value="', key, '">', option[key], "</option>")
						}
					} else {
						buffer.push("<option>", option, "</option>")
					}
				}
			}
			if (grouping) {
				buffer.push("</optgroup>")
			}
		}
		buffer.push("</select>");
		return buffer.join("")
	};
	$.fn.pqval = function(obj) {
		if (obj) {
			if (obj.incr) {
				var val = this.data("pq_value");
				this.prop("indeterminate", false);
				if (val) {
					val = false;
					this.prop("checked", false)
				} else {
					if (val === false) {
						val = null;
						this.prop("indeterminate", true);
						this.prop("checked", false)
					} else {
						val = true;
						this.prop("checked", true)
					}
				}
				this.data("pq_value", val);
				return val
			} else {
				var val = obj.val;
				this.data("pq_value", val);
				this.prop("indeterminate", false);
				if (val == null) {
					this.prop("indeterminate", true);
					this.prop("checked", false)
				} else {
					if (val) {
						this.prop("checked", true)
					} else {
						this.prop("checked", false)
					}
				}
				return this
			}
		} else {
			return this.data("pq_value")
		}
	};
	_pq.xmlToArray = function(data, obj) {
		var itemParent = obj.itemParent;
		var itemNames = obj.itemNames;
		var arr = [];
		var $items = $(data).find(itemParent);
		$items.each(function(i, item) {
			var $item = $(item);
			var arr2 = [];
			$(itemNames).each(function(j, itemName) {
				arr2.push($item.find(itemName).text().replace(/\r|\n|\t/g, ""))
			});
			arr.push(arr2)
		});
		return arr
	};
	_pq.xmlToJson = function(data, obj) {
		var itemParent = obj.itemParent;
		var itemNames = obj.itemNames;
		var arr = [];
		var $items = $(data).find(itemParent);
		$items.each(function(i, item) {
			var $item = $(item);
			var arr2 = {};
			for (var j = 0, len = itemNames.length; j < len; j++) {
				var itemName = itemNames[j];
				arr2[itemName] = $item.find(itemName).text().replace(/\r|\n|\t/g, "")
			}
			arr.push(arr2)
		});
		return arr
	};
	_pq.tableToArray = function(tbl) {
		var $tbl = $(tbl),
			colModel = [],
			data = [],
			$trs = $tbl.children("tbody").children("tr"),
			$trfirst = $trs.length ? $($trs[0]) : $(),
			$trsecond = $trs.length > 1 ? $($trs[1]) : $();
		$trfirst.children("th,td").each(function(i, td) {
			var $td = $(td),
				title = $td.html(),
				width = $td.width(),
				align = "left",
				dataType = "string";
			if ($trsecond.length) {
				var $tdsec = $trsecond.find("td:eq(" + i + ")"),
					halign = $tdsec.attr("align"),
					align = halign ? halign : align
			}
			var obj = {
				title: title,
				width: width,
				dataType: dataType,
				align: align,
				dataIndx: i
			};
			colModel.push(obj)
		});
		$trs.each(function(i, tr) {
			if (i == 0) {
				return
			}
			var $tr = $(tr);
			var arr2 = [];
			$tr.children("td").each(function(j, td) {
				arr2.push($.trim($(td).html()))
			});
			data.push(arr2)
		});
		return {
			data: data,
			colModel: colModel
		}
	};
	var _nformats = {};

	function _getNumFormat(format, negative) {
		var obj, arr, re, m;
		if (format) {
			arr = format.split(":");
			format = negative && arr.length > 1 ? arr[1] : arr[0];
			if (obj = _nformats[format]) {
				return obj
			}
			re = /^([^#]*|&#[^#]*)?[\,\.#0]*?([\,\s\.]?)([#0]*)([\,\s\.]?)([0]*?)(\s*[^#^0]*|&#[^#]*)?$/;
			m = format.match(re);
			if (m && m.length) {
				obj = {
					symbol: m[1] || "",
					thouSep: m[2],
					thousand: m[3].length,
					decSep: m[4],
					decimal: m[5].length,
					symbolEnd: m[6] || ""
				};
				_nformats[format] = obj
			}
		}
		obj = obj || {
			symbol: "",
			symbolEnd: "",
			thouSep: ",",
			thousand: 3,
			decSep: ".",
			decimal: 2
		};
		return obj
	}
	_pq.formatCurrency = function(o_val, format) {
		var val = parseFloat(o_val);
		if (isNaN(val)) {
			return
		}
		var negative = val < 0,
			obj = _getNumFormat(format, negative),
			symbol = obj.symbol,
			symbolEnd = obj.symbolEnd,
			thousand = obj.thousand,
			thouSep = obj.thouSep,
			decSep = obj.decSep,
			decimal = obj.decimal;
		val = val.toFixed(decimal);
		var len = val.length,
			sublen = decimal + decSep.length,
			fp = val.substring(0, len - sublen),
			lp = val.substring(len - sublen + decSep.length, len),
			arr = fp.match(/\d/g).reverse(),
			arr2 = [];
		for (var i = 0; i < arr.length; i++) {
			if (i > 0 && i % thousand == 0) {
				arr2.push(thouSep)
			}
			arr2.push(arr[i])
		}
		arr2 = arr2.reverse();
		fp = arr2.join("");
		return (negative ? "-" : "") + symbol + fp + decSep + lp + symbolEnd
	};
	pq.formatNumber = _pq.formatCurrency;
	pq.validation = {
		is: function(type, val) {
			if (type == "string" || !type) {
				return true
			}
			type = type.substring(0, 1).toUpperCase() + type.substring(1, type.length);
			return this["is" + type](val)
		},
		isFloat: function(val) {
			var pf = parseFloat(val);
			if (!isNaN(pf) && pf == val) {
				return true
			} else {
				return false
			}
		},
		isInteger: function(val) {
			var pi = parseInt(val);
			if (!isNaN(pi) && pi == val) {
				return true
			} else {
				return false
			}
		},
		isDate: function(val) {
			var pd = Date.parse(val);
			if (!isNaN(pd)) {
				return true
			} else {
				return false
			}
		}
	};
	var NumToLetter = [],
		letterToNum = {};
	var toLetter = _pq.toLetter = function(num) {
		var letter = NumToLetter[num];
		if (!letter) {
			num++;
			var mod = num % 26,
				pow = num / 26 | 0,
				out = mod ? String.fromCharCode(64 + mod) : (--pow, "Z");
			letter = pow ? toLetter(pow - 1) + out : out;
			num--;
			NumToLetter[num] = letter;
			letterToNum[letter] = num
		}
		return letter
	};
	_pq.generateData = function(rows, cols) {
		var alp = [];
		for (var i = 0; i < cols; i++) {
			alp[i] = toLetter(i)
		}
		var data = [];
		for (var i = 0; i < rows; i++) {
			var row = data[i] = [];
			for (var j = 0; j < cols; j++) {
				row[j] = alp[j] + (i + 1)
			}
		}
		return data
	}
})(jQuery);
(function($) {
	var fnPG = {};
	fnPG.options = {
		bootstrap: {
			on: false,
			pager: "",
			nextIcon: "glyphicon glyphicon-forward",
			prevIcon: "glyphicon glyphicon-backward",
			firstIcon: "glyphicon glyphicon-step-backward",
			lastIcon: "glyphicon glyphicon-step-forward",
			refreshIcon: "glyphicon glyphicon-refresh"
		},
		curPage: 0,
		totalPages: 0,
		totalRecords: 0,
		msg: "",
		rPPOptions: [10, 20, 30, 40, 50, 100],
		rPP: 20
	};
	fnPG._regional = {
		strDisplay: "Displaying {0} to {1} of {2} items.",
		strFirstPage: "First Page",
		strLastPage: "Last Page",
		strNextPage: "Next Page",
		strPage: "Page {0} of {1}",
		strPrevPage: "Previous Page",
		strRefresh: "Refresh",
		strRpp: "Records per page:{0}"
	};
	$.extend(fnPG.options, fnPG._regional);

	function createButton(bootstrap, str, icon) {
		if (bootstrap) {
			return $("<span tabindex='0' rel='tooltip' data-placement='top' title='" + str + "' class='btn btn-xs " + icon + "'></span>")
		} else {
			return $("<span class='pq-ui-button ui-widget-header' tabindex='0' rel='tooltip' title='" + str + "'><span class='ui-icon ui-icon-" + icon + "'></span></span>")
		}
	}

	function bind($ele, fn) {
		$ele.bind("click keydown", function(evt) {
			if (evt.type == "keydown" && evt.keyCode != $.ui.keyCode.ENTER) {
				return
			}
			return fn.call(this, evt)
		})
	}
	fnPG._create = function() {
		var that = this,
			options = this.options,
			$ele = this.element,
			bootstrap = options.bootstrap,
			btp_on = bootstrap.on;
		this.listeners = {};
		$ele.addClass("pq-pager " + (btp_on ? bootstrap.pager : ""));
		this.first = createButton(btp_on, options.strFirstPage, btp_on ? bootstrap.firstIcon : "seek-first").appendTo($ele);
		bind(this.first, function(evt) {
			if (options.curPage > 1) {
				that._onChange(evt, 1)
			}
		});
		this.prev = createButton(btp_on, options.strPrevPage, btp_on ? bootstrap.prevIcon : "seek-prev").appendTo($ele);
		bind(this.prev, function(evt) {
			if (options.curPage > 1) {
				var curPage = options.curPage - 1;
				that._onChange(evt, curPage)
			}
		});
		$("<span class='pq-separator'></span>").appendTo($ele);
		this.pageHolder = $("<span class='pq-page-placeholder'></span>").appendTo($ele);
		$("<span class='pq-separator'></span>").appendTo($ele);
		this.next = createButton(btp_on, options.strNextPage, btp_on ? bootstrap.nextIcon : "seek-next").appendTo($ele);
		bind(this.next, function(evt) {
			if (options.curPage < options.totalPages) {
				var val = options.curPage + 1;
				that._onChange(evt, val)
			}
		});
		this.last = createButton(btp_on, options.strLastPage, btp_on ? bootstrap.lastIcon : "seek-end").appendTo($ele);
		bind(this.last, function(evt) {
			if (options.curPage !== options.totalPages) {
				var val = options.totalPages;
				that._onChange(evt, val)
			}
		});
		$("<span class='pq-separator'></span>").appendTo($ele);
		this.rPPHolder = $("<span class='pq-page-placeholder'></span>").appendTo($ele);
		this.$refresh = createButton(btp_on, options.strRefresh, btp_on ? bootstrap.refreshIcon : "refresh").appendTo($ele);
		bind(this.$refresh, function(evt) {
			if (that._trigger("beforeRefresh", evt) === false) {
				return false
			}
			that._trigger("refresh", evt)
		});
		$("<span class='pq-separator'></span>").appendTo($ele);
		this.$msg = $("<span class='pq-pager-msg'></span>").appendTo($ele);
		this._refresh()
	};

	function setDisable(bts_on, $btn, disabled) {
		$btn[disabled ? "addClass" : "removeClass"]("disabled").css("pointer-events", disabled ? "none" : "").attr("tabindex", disabled ? "" : "0")
	}
	fnPG._destroy = function() {
		this.element.empty().removeClass("pq-pager").enableSelection()
	};
	fnPG._setOption = function(key, value) {
		if (key == "curPage" || key == "totalPages") {
			value = value * 1
		}
		this._super(key, value)
	};
	fnPG._setOptions = function(options) {
		var key, refresh = false,
			o = this.options;
		for (key in options) {
			var value = options[key],
				type = typeof value;
			if (type == "string" || type == "number") {
				if (value != o[key]) {
					this._setOption(key, value);
					refresh = true
				}
			} else {
				if (typeof value.splice == "function" || $.isPlainObject(value)) {
					if (JSON.stringify(value) != JSON.stringify(o[key])) {
						this._setOption(key, value);
						refresh = true
					}
				} else {
					if (value != o[key]) {
						this._setOption(key, value);
						refresh = true
					}
				}
			}
		}
		if (refresh) {
			this._refresh()
		}
		return this
	};
	$.widget("paramquery.pqPager", fnPG);
	pq.pager = function(selector, options) {
		var $p = $(selector).pqPager(options),
			p = $p.data("paramqueryPqPager") || $p.data("paramquery-pqPager");
		return p
	};
	var _pq = $.paramquery;
	_pq.pqPager.regional = {};
	_pq.pqPager.regional.en = fnPG._regional;
	fnPG = _pq.pqPager.prototype;
	_pq.pqPager.defaults = fnPG.options;
	fnPG._refreshPage = function() {
		var that = this;
		this.pageHolder.empty();
		var options = this.options,
			bts = options.bootstrap,
			strPage = options.strPage,
			arr = strPage.split(" "),
			str = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			var ele = arr[i];
			if (ele == "{0}") {
				str.push("<input type='text' tabindex='0' class='pq-pager-input ", bts.on ? "" : "ui-corner-all", "' />")
			} else {
				if (ele == "{1}") {
					str.push("<span class='total'></span>")
				} else {
					str.push("<span>", ele, "</span>")
				}
			}
		}
		var str2 = str.join("");
		var $temp = $(str2).appendTo(this.pageHolder);
		this.page = $temp.filter("input").bind("keydown", function(evt) {
			if (evt.keyCode === $.ui.keyCode.ENTER) {
				$(this).trigger("change")
			}
		}).bind("change", function(evt) {
			var $this = $(this),
				val = $this.val();
			if (isNaN(val) || val < 1) {
				$this.val(options.curPage);
				return false
			}
			val = parseInt(val);
			if (val === options.curPage) {
				return
			}
			if (val > options.totalPages) {
				$this.val(options.curPage);
				return false
			}
			if (that._onChange(evt, val) === false) {
				$this.val(options.curPage);
				return false
			}
		});
		this.$total = $temp.filter("span.total")
	};
	fnPG._onChange = function(evt, val) {
		if (this._trigger("beforeChange", evt, {
				curPage: val
			}) === false) {
			return false
		}
		if (this._trigger("change", evt, {
				curPage: val
			}) === false) {
			return false
		} else {
			this.option({
				curPage: val
			})
		}
	};
	fnPG._refresh = function() {
		this._refreshPage();
		var $rPP = this.$rPP,
			that = this,
			options = this.options,
			bts = options.bootstrap;
		this.rPPHolder.empty();
		if (options.strRpp) {
			var opts = options.rPPOptions,
				strRpp = options.strRpp;
			if (strRpp.indexOf("{0}") != -1) {
				var selectArr = ["<select class='", bts.on ? "" : "ui-corner-all", "'>"];
				for (var i = 0, len = opts.length; i < len; i++) {
					var opt = opts[i];
					selectArr.push('<option value="', opt, '">', opt, "</option>")
				}
				selectArr.push("</select>");
				var selectStr = selectArr.join("");
				strRpp = strRpp.replace("{0}", "</span>" + selectStr);
				strRpp = "<span>" + strRpp + "<span class='pq-separator'></span>"
			} else {
				strRpp = "<span>" + strRpp + "</span><span class='pq-separator'></span>"
			}
			this.$rPP = $(strRpp).appendTo(this.rPPHolder).filter("select").val(options.rPP).change(function(evt) {
				var $select = $(this),
					val = $select.val();
				if (that._trigger("beforeChange", evt, {
						rPP: val
					}) === false) {
					$select.val(that.options.rPP);
					return false
				}
				if (that._trigger("change", evt, {
						rPP: val
					}) !== false) {
					that.options.rPP = val
				}
			})
		}
		var bts_on = options.bootstrap.on;
		var isDisabled = options.curPage >= options.totalPages;
		setDisable(bts_on, this.next, isDisabled);
		setDisable(bts_on, this.last, isDisabled);
		var isDisabled = options.curPage <= 1;
		setDisable(bts_on, this.first, isDisabled);
		setDisable(bts_on, this.prev, isDisabled);
		this.page.val(options.curPage);
		this.$total.text(options.totalPages);
		if (this.options.totalRecords > 0) {
			var rPP = options.rPP,
				curPage = options.curPage,
				totalRecords = options.totalRecords,
				begIndx = (curPage - 1) * rPP,
				endIndx = curPage * rPP;
			if (endIndx > totalRecords) {
				endIndx = totalRecords
			}
			var strDisplay = options.strDisplay;
			strDisplay = strDisplay.replace("{0}", begIndx + 1);
			strDisplay = strDisplay.replace("{1}", endIndx);
			strDisplay = strDisplay.replace("{2}", totalRecords);
			this.$msg.html(strDisplay)
		} else {
			this.$msg.html("")
		}
	};
	fnPG.getInstance = function() {
		return {
			pager: this
		}
	};
	fnPG._trigger = _pq._trigger;
	fnPG.on = _pq.on;
	fnPG.one = _pq.one;
	fnPG.off = _pq.off
})(jQuery);
(function($) {
	var _pq = $.paramquery;
	var fnSB = {};
	fnSB.options = {
		length: 200,
		num_eles: 3,
		trigger: false,
		cur_pos: 0,
		ratio: 0,
		timeout: 350,
		pace: "optimum",
		direction: "vertical",
		bootstrap: {
			on: false,
			slider: "btn btn-default",
			up: "glyphicon glyphicon-chevron-up",
			down: "glyphicon glyphicon-chevron-down",
			left: "glyphicon glyphicon-chevron-left",
			right: "glyphicon glyphicon-chevron-right"
		},
		theme: false
	};
	fnSB._destroy = function() {
		$(document).off("." + this.eventNamespace);
		this.element.removeClass("pq-sb pq-sb-vert pq-sb-vert-t pq-sb-vert-wt").enableSelection().removeClass("pq-sb-horiz pq-sb-horiz-t pq-sb-horiz-wt").unbind("click.pq-scrollbar").empty();
		this.element.removeData()
	};
	fnSB._create = function() {
		this.listeners = {};
		this._createLayout()
	};
	fnSB._setOption = function(key, value) {
		var options = this.options;
		if (key == "disabled") {
			this._super(key, value);
			if (value == true) {
				this.$slider.draggable("disable")
			} else {
				this.$slider.draggable("enable")
			}
		} else {
			if (key == "theme") {
				options[key] = value;
				this._createLayout()
			} else {
				if (key == "ratio") {
					if (value >= 0 && value <= 1) {
						options[key] = value
					} else {}
				} else {
					options[key] = value
				}
			}
		}
	};
	fnSB._setOptions = function() {
		this._super.apply(this, arguments);
		this.refresh()
	};
	$.widget("paramquery.pqScrollBar", fnSB);
	pq.scrollbar = function(selector, options) {
		var $s = $(selector).pqScrollBar(options),
			s = $s.data("paramqueryPqScrollBar") || $s.data("paramquery-pqScrollBar");
		return s
	};
	var fnSB = _pq.pqScrollBar.prototype;
	_pq.pqScrollBar.defaults = fnSB.options;

	function createButton(bts_on, icon) {
		return bts_on ? "<div class='" + icon + "'></div>" : "<div class='ui-icon ui-icon-" + icon + "'></div>"
	}
	fnSB._createLayout = function() {
		var that = this,
			options = this.options,
			bts = options.bootstrap,
			bts_on = bts.on,
			direction = options.direction,
			eventNamespace = this.eventNamespace,
			theme = options.theme;
		var ele = this.element.empty();
		if (direction == "vertical") {
			ele.removeClass("pq-sb-vert-t pq-sb-vert-wt").addClass("pq-sb pq-sb-vert");
			if (theme) {
				ele.addClass("pq-sb-vert-t");
				ele[0].innerHTML = ["<div class='top-btn pq-sb-btn ", bts_on ? "" : "ui-state-default ui-corner-top", "'>", createButton(bts_on, bts_on ? bts.up : "triangle-1-n"), "</div>", "<div class='pq-sb-slider ", bts_on ? bts.slider : "ui-corner-all ui-state-default", "'>", "</div>", "<div class='bottom-btn pq-sb-btn ", bts_on ? "" : "ui-state-default ui-corner-bottom", "'>", createButton(bts_on, bts_on ? bts.down : "triangle-1-s"), "</div>"].join("")
			} else {
				ele.addClass("pq-sb-vert-wt");
				ele[0].innerHTML = ["<div class='top-btn pq-sb-btn'></div>", "<div class='pq-sb-slider'>", "<div class='vert-slider-top'></div>", "<div class='vert-slider-bg'></div>", "<div class='vert-slider-center'></div>", "<div class='vert-slider-bg'></div>", "<div class='vert-slider-bottom'></div>", "</div>", "<div class='bottom-btn pq-sb-btn'></div>"].join("")
			}
		} else {
			ele.removeClass("pq-sb-horiz-t pq-sb-horiz-wt").addClass("pq-sb pq-sb-horiz");
			if (theme) {
				ele.addClass("pq-sb-horiz-t");
				ele[0].innerHTML = ["<div class='left-btn pq-sb-btn ", bts_on ? "" : "ui-state-default ui-corner-left", "'>", createButton(bts_on, bts_on ? bts.left : "triangle-1-w"), "</div>", "<div class='pq-sb-slider pq-sb-slider-h ", bts_on ? bts.slider : "ui-state-default ui-corner-all", "'>", "</div>", "<div class='right-btn pq-sb-btn ", bts_on ? "" : "ui-state-default ui-corner-right", "'>", createButton(bts_on, bts_on ? bts.right : "triangle-1-e"), "</div>"].join("")
			} else {
				ele.addClass("pq-sb-horiz-wt");
				ele.width(this.width);
				ele[0].innerHTML = ["<div class='left-btn pq-sb-btn'></div>", "<div class='pq-sb-slider pq-sb-slider-h'>", "<span class='horiz-slider-left'></span>", "<span class='horiz-slider-bg'></span>", "<span class='horiz-slider-center'></span>", "<span class='horiz-slider-bg'></span>", "<span class='horiz-slider-right'></span>", "</div>", "<div class='right-btn pq-sb-btn'></div>"].join("")
			}
		}
		ele.disableSelection().unbind(".pq-scrollbar").on("mousedown.pq-scrollbar", function(evt) {
			if (options.disabled) {
				return
			}
			if (that.$slider.is(":hidden")) {
				return
			}
			$(document).off("." + eventNamespace).on("mouseup." + eventNamespace, function(evt) {
				that._mouseup(evt)
			});
			if (direction == "vertical") {
				var clickY = evt.pageY,
					top_this = that.element.offset().top,
					bottom_this = top_this + options.length,
					$slider = that.$slider,
					topSlider = $slider.offset().top,
					heightSlider = $slider.height(),
					botSlider = topSlider + heightSlider;
				if (clickY < topSlider && clickY > top_this + 17) {
					that._setTimerPageLeft(clickY, heightSlider, evt, 0)
				} else {
					if (clickY > botSlider && clickY < bottom_this - 17) {
						that._setTimerPageRight(clickY, heightSlider, evt, 0)
					}
				}
			} else {
				var clickX = evt.pageX,
					top_this = that.element.offset().left,
					bottom_this = top_this + options.length,
					topSlider = that.$slider.offset().left,
					botSlider = topSlider + that.$slider.width();
				if (clickX < topSlider && clickX > top_this + 17) {
					that.$slider.css("left", clickX - that.element.offset().left);
					that._updateCurPosAndTrigger(evt)
				} else {
					if (clickX > botSlider && clickX < bottom_this - 17) {
						that.$slider.css("left", clickX - that.element.offset().left - that.$slider.width());
						that._updateCurPosAndTrigger(evt)
					}
				}
			}
		});
		var $slider = this.$slider = $("div.pq-sb-slider", this.element);
		$slider.attr("tabindex", "0");
		this._bindSliderEvents($slider);
		this.$top_btn = $("div.top-btn,div.left-btn", this.element).click(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.decr_cur_pos(evt);
			return false
		}).mousedown(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.mousedownTimeout = setTimeout(function() {
				that.mousedownInterval = setInterval(function() {
					that.decr_cur_pos(evt)
				}, 0)
			}, that.options.timeout);
			return false
		}).bind("mouseup mouseout", function(evt) {
			that._mouseup(evt)
		});
		this.$bottom_btn = $("div.bottom-btn,div.right-btn", this.element).click(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.incr_cur_pos(evt);
			return false
		}).mousedown(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.mousedownTimeout = setTimeout(function() {
				that.mousedownInterval = setInterval(function() {
					that.incr_cur_pos(evt)
				}, 0)
			}, that.options.timeout);
			return false
		}).bind("mouseup mouseout", function(evt) {
			that._mouseup(evt)
		});
		this.refresh()
	};
	var counter = 0;
	fnSB._setTimerPageLeft = function(clickY, heightSlider, evt, interval) {
		var that = this,
			o = that.options;
		this.mousedownTimeout = window.setTimeout(function() {
			if (clickY >= that.$slider.offset().top) {
				that._mouseup()
			} else {
				that._pageLeft(evt);
				var intt = counter ? 0 : o.timeout;
				counter++;
				that._setTimerPageLeft(clickY, heightSlider, evt, intt)
			}
		}, interval)
	};
	fnSB._setTimerPageRight = function(clickY, heightSlider, evt, interval) {
		var that = this;
		this.mousedownTimeout = window.setTimeout(function() {
			if (clickY <= that.$slider.offset().top + heightSlider) {
				that._mouseup()
			} else {
				that._pageRight(evt);
				var intt = counter ? 0 : that.options.timeout;
				counter++;
				that._setTimerPageRight(clickY, heightSlider, evt, intt)
			}
		}, interval)
	};
	fnSB._bindSliderEvents = function($slider) {
		var that = this,
			direction = this.options.direction,
			axis = "x";
		if (direction == "vertical") {
			axis = "y"
		}
		$slider.draggable({
			axis: axis,
			helper: function(evt, ui) {
				that._setDragLimits();
				return this
			},
			start: function(evt) {
				that.topWhileDrag = null;
				that.dragging = true
			},
			drag: function(evt) {
				that.dragging = true;
				var pace = that.options.pace;
				if (pace == "optimum") {
					that._setNormalPace(evt)
				} else {
					if (pace == "fast") {
						that._updateCurPosAndTrigger(evt)
					}
				}
			},
			stop: function(evt) {
				if (that.options.pace != "fast") {
					that._updateCurPosAndTrigger(evt)
				}
				that.dragging = false;
				that.refresh()
			}
		}).on("keydown.pq-scrollbar", function(evt) {
			var keyCode = evt.keyCode,
				o = that.options,
				cur_pos = o.cur_pos,
				ratio = o.ratio,
				num_eles = o.num_eles,
				KC = $.ui.keyCode;
			if (that.keydownTimeout == null) {
				that.keydownTimeout = window.setTimeout(function() {
					if (keyCode == KC.DOWN || keyCode == KC.RIGHT) {
						that.incr_cur_pos(evt)
					} else {
						if (keyCode == KC.UP || keyCode == KC.LEFT) {
							that.decr_cur_pos(evt)
						} else {
							if (keyCode == KC.HOME) {
								if (o.steps) {
									if (cur_pos > 0) {
										o.cur_pos = 0;
										that.updateSliderPos();
										that.scroll(evt)
									}
								} else {
									if (ratio > 0) {
										o.ratio = 0;
										that.updateSliderPos();
										that.drag(evt)
									}
								}
							} else {
								if (keyCode == KC.END) {
									if (o.steps) {
										if (cur_pos < num_eles) {
											o.cur_pos = num_eles;
											that.updateSliderPos();
											that.scroll(evt)
										}
									} else {
										if (ratio < 1) {
											o.ratio = 1;
											that.updateSliderPos();
											that.drag(evt)
										}
									}
								} else {
									if (o.direction == "vertical") {
										if (keyCode == KC.PAGE_DOWN) {
											that._pageRight(evt)
										} else {
											if (keyCode == KC.PAGE_UP) {
												that._pageLeft(evt)
											}
										}
									}
								}
							}
						}
					}
					that.keydownTimeout = null
				}, 0)
			}
			if (keyCode == KC.DOWN || keyCode == KC.RIGHT || keyCode == KC.UP || keyCode == KC.LEFT || keyCode == KC.PAGE_DOWN || keyCode == KC.PAGE_UP || keyCode == KC.HOME || keyCode == KC.END) {
				evt.preventDefault();
				return false
			}
		})
	};
	fnSB.decr_cur_pos = function(evt) {
		var that = this,
			o = that.options,
			steps = o.steps;
		if (steps) {
			if (o.cur_pos > 0) {
				o.cur_pos--;
				that.updateSliderPos();
				that.scroll(evt)
			}
		} else {
			if (o.ratio > 0) {
				var ratio = o.ratio - 1 / (o.num_eles - 1);
				if (ratio < 0) {
					ratio = 0
				}
				o.ratio = ratio;
				that.updateSliderPos();
				that.drag(evt)
			}
		}
	};
	fnSB.incr_cur_pos = function(evt) {
		var that = this,
			o = that.options,
			steps = o.steps;
		if (steps) {
			if (o.cur_pos < o.num_eles - 1) {
				o.cur_pos++
			}
			that.updateSliderPos();
			that.scroll(evt)
		} else {
			if (o.ratio < 1) {
				var ratio = o.ratio + 1 / (o.num_eles - 1);
				if (ratio > 1) {
					ratio = 1
				}
				o.ratio = ratio
			}
			that.updateSliderPos();
			that.drag(evt)
		}
	};
	fnSB._mouseup = function(evt) {
		if (this.options.disabled) {
			return
		}
		counter = 0;
		var that = this;
		window.clearTimeout(that.mousedownTimeout);
		that.mousedownTimeout = null;
		window.clearInterval(that.mousedownInterval);
		that.mousedownInterval = null
	};
	fnSB._setDragLimits = function() {
		var o = this.options;
		if (o.direction == "vertical") {
			var top = this.element.offset().top + 17;
			var bot = top + o.length - 34 - this.slider_length;
			this.$slider.draggable("option", "containment", [0, top, 0, bot])
		} else {
			top = this.element.offset().left + 17;
			bot = top + o.length - 34 - this.slider_length;
			this.$slider.draggable("option", "containment", [top, 0, bot, 0])
		}
	};
	fnSB._validateCurPos = function() {
		var o = this.options;
		if (o.cur_pos >= o.num_eles) {
			o.cur_pos = o.num_eles - 1
		}
		if (o.cur_pos < 0) {
			o.cur_pos = 0
		}
	};
	fnSB._updateSliderPosRatio = function() {
		var that = this,
			o = this.options,
			direction = o.direction,
			ratio = o.ratio,
			slider = that.$slider[0],
			scroll_space = o.length - 34 - this.slider_length;
		if (ratio == null) {
			throw "updateSliderPosRatio ratio N/A"
		}
		var top = ratio * scroll_space + 17;
		if (direction == "vertical") {
			slider.style.top = top + "px"
		} else {
			slider.style.left = top + "px"
		}
	};
	fnSB._updateSliderPosCurPos = function() {
		var o = this.options,
			slider = this.$slider[0];
		var sT = this.scroll_space * o.cur_pos / (o.num_eles - 1);
		if (o.direction == "vertical") {
			slider.style.top = 17 + sT + "px"
		} else {
			slider.style.left = 17 + sT + "px"
		}
	};
	fnSB.updateSliderPos = function() {
		var o = this.options;
		if (o.steps === undefined) {
			throw "updateSliderPos. steps N/A"
		}
		if (o.steps) {
			this._updateSliderPosCurPos()
		} else {
			this._updateSliderPosRatio()
		}
	};
	fnSB.scroll = function(evt) {
		var o = this.options;
		this._trigger("scroll", evt, {
			cur_pos: o.cur_pos,
			num_eles: o.num_eles
		})
	};
	fnSB.drag = function(evt) {
		var that = this,
			o = that.options;
		this._trigger("drag", evt, {
			ratio: o.ratio
		})
	};
	fnSB._pageRight = function(evt) {
		this._trigger("pageRight", evt, null)
	};
	fnSB._pageLeft = function(evt) {
		this._trigger("pageLeft", evt, null)
	};
	fnSB._setSliderBgLength = function() {
		var o = this.options,
			theme = o.theme,
			$slider = this.$slider,
			outerHeight = o.length,
			innerHeight = o.num_eles * 40 + outerHeight,
			avail_space = outerHeight - 34,
			slider_height = avail_space * outerHeight / innerHeight,
			slider_bg_ht = Math.round((slider_height - (8 + 3 + 3)) / 2);
		if (slider_bg_ht < 1) {
			slider_bg_ht = 1
		}
		var slider_length = 8 + 3 + 3 + 2 * slider_bg_ht;
		this.scroll_space = o.length - 34 - slider_length;
		if (slider_length !== this.slider_length) {
			this.slider_length = slider_length;
			var obj = o.direction === "vertical" ? {
				dim: "height",
				cls: ".vert-slider-bg"
			} : {
				dim: "width",
				cls: ".horiz-slider-bg"
			};
			if (theme) {
				$slider[obj.dim](slider_length - 2)
			} else {
				$(obj.cls, this.element)[obj.dim](slider_bg_ht);
				$slider[obj.dim](slider_length)
			}
		}
	};
	fnSB._updateCurPosAndTrigger = function(evt, top) {
		var that = this,
			o = this.options,
			direction = o.direction,
			$slider = that.$slider;
		if (top == null) {
			top = parseInt($slider[0].style[direction === "vertical" ? "top" : "left"])
		}
		var scroll_space = o.length - 34 - this.slider_length;
		var ratio = (top - 17) / scroll_space;
		if (o.steps) {
			var cur_pos = ratio * (o.num_eles - 1);
			cur_pos = Math.round(cur_pos);
			if (o.cur_pos != cur_pos) {
				if (this.dragging) {
					if (this.topWhileDrag != null) {
						if (this.topWhileDrag < top && o.cur_pos > cur_pos) {
							return
						} else {
							if (this.topWhileDrag > top && o.cur_pos < cur_pos) {
								return
							}
						}
					}
					this.topWhileDrag = top
				}
				that.options.cur_pos = cur_pos;
				this.scroll(evt)
			}
		} else {
			o.ratio = ratio;
			this.drag(evt)
		}
	};
	fnSB._setNormalPace = function(evt) {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = null
		}
		var that = this,
			o = this.options,
			direction = o.direction;
		that.timer = window.setInterval(function() {
			var $slider = that.$slider;
			var top = parseInt($slider[0].style[direction === "vertical" ? "top" : "left"]);
			if (that.prev_top === top) {
				that._updateCurPosAndTrigger(evt, top);
				window.clearInterval(that.timer);
				that.timer = null
			}
			that.prev_top = top;
		}, 20)
	};
	fnSB.refresh = function() {
		var o = this.options,
			slider = this.$slider[0],
			$sb = this.element;
		if (o.num_eles <= 1) {
			$sb[0].style.display = "none";
			return
		} else {
			$sb[0].style.display = ""
		}
		this._validateCurPos();
		if (!this.dragging) {
			$sb[o.direction === "vertical" ? "height" : "width"](o.length);
			this._setSliderBgLength();
			if (this.scroll_space < 4 || o.num_eles <= 1) {
				slider.style.display = "none"
			} else {
				slider.style.display = ""
			}
		}
		this.updateSliderPos()
	};
	fnSB._trigger = _pq._trigger;
	fnSB.on = _pq.on;
	fnSB.one = _pq.one;
	fnSB.off = _pq.off
})(jQuery);
(function($) {
	$.paramquery = $.paramquery || {};
	$.paramquery.onResize = function(ele, fn) {
		var attachEvent = false,
			$ele = $(ele);
		if ($ele.css("position") === "static") {
			$ele.css("position", "relative")
		}
		if (!attachEvent) {
			var $iframe = $('<iframe type="text/html" src="about:blank" class="pq-resize-iframe" style="display:block;width:100%;height:100%;position:absolute;top:0;left:0;z-index:-1;overflow: hidden; pointer-events: none;" />').appendTo($ele);
			$iframe[0].data = "about:blank";
			$iframe.css("opacity", "0")
		}
		for (var i = 0; i < $ele.length; i++) {
			if (attachEvent) {
				$($ele[i]).on("resize", function(e) {
					fn()
				})
			} else {
				var ele2 = $iframe[i];
				var $win = $(ele2.contentWindow);
				$win.on("resize", function(evt) {
					fn()
				})
			}
		}
	}
})(jQuery);
(function($) {
	var cClass = function() {};
	cClass.prototype.belongs = function(evt) {
		if (evt.target == this.that.element[0]) {
			return true
		}
	};
	var _pq = $.paramquery;
	_pq.cClass = cClass;
	var cGenerateView = function(that) {
		this.that = that;
		var o = this.options = that.options,
			self = this;
		if (o.postRenderInterval != null) {
			that.on("refresh", function() {
				if (self.prColDef.length) {
					self.postRenderAll()
				}
			}).on("refreshRow", function(evt, ui) {
				if (self.prColDef.length) {
					self.postRenderRow(ui)
				}
			}).on("refreshCell", function(evt, ui) {
				if (ui.column.postRender) {
					self.postRenderRow(ui)
				}
			}).on("refreshColumn", function(evt, ui) {
				if (ui.column.postRender) {
					self.setTimerPostRender(0, ui.colIndx, ui.column)
				}
			})
		}
		if (!o.mergeModel.flex) {
			that.on("refresh refreshCell refreshRow refreshColumn", self.onRefreshMerge(that))
		}
	};
	_pq.cGenerateView = cGenerateView;
	var _pGenerateView = cGenerateView.prototype = new cClass;
	_pGenerateView.onRefreshMerge = function(that) {
		return function onRefreshMerge() {
			var $cells = that.$cont.find(".pq-merge-cell-div"),
				ele, par, paddingTop, paddingLeft, parHeight, i = $cells.length,
				height, width, heights = [],
				widths = [];
			while (i--) {
				ele = $cells[i];
				par = ele.parentNode;
				if (!paddingTop) {
					paddingTop = 2 * parseInt($(par).css("paddingTop"));
					paddingLeft = 2 * parseInt($(par).css("paddingLeft"))
				}
				parHeight = Math.max(par.offsetHeight, 28);
				height = parHeight - paddingTop;
				width = par.offsetWidth - paddingLeft;
				heights[i] = height - 1 + "px";
				widths[i] = width + "px"
			}
			i = $cells.length;
			while (i--) {
				ele = $cells[i];
				ele.style.height = heights[i];
				ele.style.width = widths[i]
			}
		}
	};
	_pGenerateView.generateView = function(ui) {
		ui = ui || {};
		var self = this,
			that = this.that,
			o = that.options,
			flexWidth = o.width === "flex",
			flexHeight = o.height === "flex",
			cls = o.cls,
			cont_inner_cls = cls.cont_inner,
			cont_inner_b_cls = cls.cont_inner_b,
			initV, finalV, initH = that.initH,
			finalH = that.finalH,
			pqpanes = that.pqpanes;
		if (ui.$cont) {
			var strTbl = this._generateTables(null, null, ui),
				$cont = ui.$cont;
			$cont.empty();
			if (pqpanes.v) {
				$cont[0].innerHTML = ["<div class='", cont_inner_cls, "'>", strTbl, "</div>", "<div class='", cont_inner_cls, "'>", strTbl, "</div>"].join("")
			} else {
				$cont[0].innerHTML = ["<div class='", cont_inner_cls, "'>", strTbl, "</div>"].join("")
			}
			var $div_child = $cont.children("div"),
				$tbl = $div_child.children("table");
			that.tables[0] = {
				$tbl: $tbl,
				$cont: $cont
			}
		} else {
			initV = that.initV;
			finalV = that.finalV;
			var data = that.pdata;
			var $cont = that.$cont;
			if (o.editModel.indices != null) {
				that.blurEditor({
					force: true
				})
			}
			var uiEvent = {
				pageData: data,
				initV: initV,
				finalV: finalV,
				initH: initH,
				finalH: finalH,
				source: ui.source
			};
			that._trigger("beforeTableView", null, uiEvent);
			var strTbl = self._generateTables(initV, finalV, ui);
			$cont.empty();
			if (that.totalVisibleRows === 0) {
				$cont.append("<div class='" + cont_inner_cls + " pq-grid-norows' >" + o.strNoRows + "</div>")
			} else {
				var style = flexHeight || flexWidth ? "style='position:relative;'" : "",
					styleTbl = "";
				if (pqpanes.h && pqpanes.v) {
					$cont[0].innerHTML = ["<div class='", cont_inner_cls, "'>", strTbl, "</div>", "<div class='", cont_inner_cls, "'>", strTbl, "</div>", "<div class='", cont_inner_cls, " ", cont_inner_b_cls, "'>", strTbl, "</div>", "<div class='", cont_inner_cls, " ", cont_inner_b_cls, "'>", strTbl, "</div>"].join("")
				} else {
					if (pqpanes.v) {
						$cont[0].innerHTML = ["<div class='", cont_inner_cls, "' ", style, " >", strTbl, "</div>", "<div class='", cont_inner_cls, "' >", strTbl, "</div>"].join("")
					} else {
						if (pqpanes.h) {
							$cont[0].innerHTML = ["<div class='", cont_inner_cls, "' style='position:static;' >", strTbl, "</div>", "<div class='", cont_inner_cls, " ", cont_inner_b_cls, "' style='position:static;' >", strTbl, "</div>"].join("")
						} else {
							$cont[0].innerHTML = ["<div class='", cont_inner_cls, "' ", style, " >", strTbl, "</div>"].join("")
						}
					}
				}
			}
			that.$tbl = $cont.children("div").children("table");
			if (o.scrollModel.flexContent && that.$tbl[0]) {
				_pq.onResize(that.$tbl[0], function() {
					var iR = that.iRefresh;
					if (!iR.ignoreTResize) {
						iR.softRefresh()
					}
				})
			}
			this.setPaneEvents();
			that._trigger("refresh", null, uiEvent)
		}
		this.setPanes()
	};
	_pGenerateView.postRenderRow = function(ui) {
		var that = this.that,
			colDef = this.prColDef,
			iM = that.iMerge,
			ri = ui.rowIndx,
			grid = that,
			postRender;
		if (ui.colIndx != null) {
			colDef = [{
				colIndx: ui.colIndx,
				column: ui.column
			}]
		}
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				postRender = colD.column.postRender,
				ci = colD.colIndx;
			if (iM.ismergedCell(ri, ci)) {
				if (iM.isRootCell(ri, ci, "a")) {
					ui = iM.getRootCell(ri, ci);
					postRender.call(grid, ui)
				}
			} else {
				ui = that.normalize({
					rowIndx: ri,
					colIndx: ci
				});
				postRender.call(grid, ui)
			}
		}
	};
	_pGenerateView.setTimerPostRender = function(rip, colIndx, column) {
		var that = this.that,
			self = this,
			pdata = that.pdata,
			fn = function(cb) {
				return that.options.postRenderInterval == -1 ? cb() : setTimeout(cb, 0)
			};
		if (!pdata || !pdata.length) {
			return
		}
		self.postRenderTimeoutID = fn(function() {
			var initV = that.initV,
				fr = that.options.freezeRows;
			if (rip < initV && rip >= fr) {
				rip = initV
			}
			var rowData = pdata[rip];
			if (!rowData.pq_hidden) {
				self.postRenderRow({
					column: column,
					colIndx: colIndx,
					rowIndx: rip + that.rowIndxOffset
				})
			}
			rip++;
			if (rip <= that.finalV) {
				self.setTimerPostRender(rip)
			}
		})
	};
	_pGenerateView.postRenderAll = function() {
		var that = this.that,
			self = this,
			data = that.pdata,
			intv = that.options.postRenderInterval,
			fn = function(cb) {
				return intv == -1 ? cb() : setTimeout(cb, intv)
			};
		if (!data || !data.length) {
			return
		}
		clearTimeout(self.postRenderTimeoutID);
		self.postRenderTimeoutID = fn(function() {
			self.setTimerPostRender(0)
		})
	};
	_pGenerateView.scrollView = function() {
		var that = this.that,
			o = this.options,
			virtualX = o.virtualX,
			virtualY = o.virtualY;
		if (!virtualX) {
			that.hscroll.drag()
		}
		if (!virtualY) {
			that.vscroll.drag()
		}
	};
	_pGenerateView.setPaneEvents = function() {
		var that = this.that,
			$cont = that.$cont,
			pqpanes = that.pqpanes,
			$div_child = $cont.children("div"),
			iMS = that.iMouseSelection,
			$tbl = that.$tbl;
		if ($tbl && $tbl.length) {
			if (pqpanes.h && pqpanes.v) {
				var $cont_lt = $($div_child[0]),
					$cont_rt = $($div_child[1]),
					$cont_lb = $($div_child[2]),
					$cont_rb = $($div_child[3]);
				$cont_lt.on("scroll", function(evt) {
					this.scrollTop = 0;
					this.scrollLeft = 0
				});
				$cont_rt.on("scroll", function(evt) {
					this.scrollTop = 0;
					this.scrollLeft = iMS.getScrollLeft(true)
				});
				$cont_lb.on("scroll", function(evt) {
					this.scrollTop = iMS.getScrollTop(true);
					this.scrollLeft = 0
				});
				$cont_rb.on("scroll", function(evt) {
					this.scrollTop = iMS.getScrollTop(true);
					this.scrollLeft = iMS.getScrollLeft(true)
				})
			} else {
				if (pqpanes.v) {
					var $cont_l = $($div_child[0]),
						$cont_r = $($div_child[1]);
					$cont_l.on("scroll", function(evt) {
						this.scrollTop = iMS.getScrollTop(true);
						this.scrollLeft = 0
					});
					$cont_r.on("scroll", function(evt) {
						this.scrollTop = iMS.getScrollTop(true);
						this.scrollLeft = iMS.getScrollLeft(true)
					})
				} else {
					if (pqpanes.h) {
						var $cont_t = $($div_child[0]),
							$cont_b = $($div_child[1]);
						$cont_t.on("scroll", function(evt) {
							this.scrollTop = 0;
							this.scrollLeft = iMS.getScrollLeft(true)
						});
						$cont_b.on("scroll", function(evt) {
							this.scrollTop = iMS.getScrollTop(true);
							this.scrollLeft = iMS.getScrollLeft(true)
						})
					} else {
						$div_child.on("scroll", function(evt) {
							this.scrollTop = iMS.getScrollTop(true);
							this.scrollLeft = iMS.getScrollLeft(true)
						})
					}
				}
			}
		}
	};
	_pGenerateView.setPanes = function() {
		var that = this.that,
			$cont = that.$cont,
			pqpanes = that.pqpanes,
			$div_child = $cont.children("div"),
			iR = that.iRefresh,
			$tbl = that.$tbl,
			o = that.options,
			freezeCols = o.freezeCols * 1,
			initH = that.initH,
			offset = 1,
			wd = that.calcWidthCols(-1, freezeCols) + offset,
			flexWidth = o.width === "flex",
			contWd = flexWidth && !o.maxWidth ? "" : iR.getEContWd(),
			lft, ht;
		if (that.tables.length) {
			var $tblS = that.tables[0].$tbl,
				$contS = that.tables[0].$cont,
				$div_childS = $tblS.parent("div");
			if (pqpanes.v) {
				$($div_childS[0]).css({
					width: wd
				});
				$($div_childS[1]).css({
					left: wd,
					width: contWd - wd
				});
				$($tblS[1]).css({
					left: -1 * wd
				})
			} else {
				$($div_childS[0]).css({
					width: contWd
				})
			}
			$contS.height($tblS[0].scrollHeight - 1);
			iR.setContHeight()
		}
		if ($tbl && $tbl.length) {
			var flexHeight = o.height === "flex",
				contHt = flexHeight && !o.maxHeight ? "" : iR.getEContHt();
			if (pqpanes.h && pqpanes.v) {
				var $cont_lt = $($div_child[0]),
					$cont_rt = $($div_child[1]),
					$tbl_rt = $($tbl[1]),
					$cont_lb = $($div_child[2]),
					$tbl_lb = $($tbl[2]),
					$cont_rb = $($div_child[3]),
					$tbl_rb = $($tbl[3]),
					ht = that.calcHeightFrozenRows(),
					htFrozenPane = ht;
				$cont_lt.css({
					width: wd,
					height: htFrozenPane
				});
				$cont_rt.css({
					left: wd,
					width: contWd - wd,
					height: htFrozenPane
				});
				$tbl_rt.css({
					left: -1 * wd
				});
				$cont_lb.css({
					width: wd,
					top: htFrozenPane,
					height: contHt - htFrozenPane
				});
				$tbl_lb.css({
					marginTop: -(htFrozenPane + 1)
				});
				$cont_rb.css({
					left: wd,
					width: contWd - wd,
					top: htFrozenPane,
					height: contHt - htFrozenPane
				});
				$tbl_rb.css({
					marginTop: -(htFrozenPane + 1),
					left: -1 * wd
				})
			} else {
				if (pqpanes.v) {
					var $cont_l = $($div_child[0]),
						$cont_r = $($div_child[1]),
						$tbl_r = $($tbl[1]);
					$cont_l.css({
						width: wd,
						height: contHt
					});
					$cont_r.css({
						left: wd,
						width: contWd - wd,
						height: contHt
					});
					$tbl_r.css({
						left: -1 * wd
					})
				} else {
					if (pqpanes.h) {
						var $cont_t = $($div_child[0]),
							$cont_b = $($div_child[1]),
							$tbl_b = $($tbl[1]),
							ht = that.calcHeightFrozenRows(),
							htFrozenPane = ht;
						$cont_t.css({
							height: htFrozenPane,
							width: contWd
						});
						$cont_b.css({
							width: contWd,
							top: htFrozenPane,
							height: contHt - htFrozenPane
						});
						$tbl_b.css({
							marginTop: -(htFrozenPane + 1)
						})
					} else {
						$div_child.css({
							width: contWd,
							height: contHt
						})
					}
				}
			}
		}
		if (o.showHeader) {
			if (pqpanes.vH) {
				that.$header_left.css({
					width: wd
				});
				that.$header_right.css({
					left: wd,
					width: contWd - wd
				});
				that.$header_right_inner.css({
					left: -wd
				})
			} else {
				that.$header_left.css({
					width: contWd
				})
			}
		}
	};
	_pGenerateView.createColDefs = function() {
		var that = this.that,
			CM = that.colModel,
			initH = that.initH,
			finalH = that.finalH,
			o = that.options,
			freezeCols = o.freezeCols,
			colDef = [],
			prColDef = [];
		for (var col = 0; col <= finalH; col++) {
			if (col < initH && col >= freezeCols) {
				col = initH;
				if (col > finalH) {
					throw "initH>finalH";
					break
				}
			}
			var column = CM[col];
			if (column.hidden) {
				continue
			}
			colDef.push({
				column: column,
				colIndx: col
			});
			if (column.postRender && typeof column.postRender == "function") {
				prColDef.push({
					column: column,
					colIndx: col
				})
			}
		}
		this.colDef = colDef;
		this.prColDef = prColDef
	};
	_pGenerateView._generateTables = function(initV, finalV, objP) {
		objP = objP || {};
		var that = this.that,
			o = that.options,
			bootstrap = o.bootstrap,
			numberCell = o.numberCell,
			iRefresh = that.iRefresh,
			freezeRows = o.freezeRows * 1,
			row = 0,
			other = objP.other,
			finalRow = other ? objP.data.length - 1 : finalV,
			data;
		if (other) {
			data = objP.data
		} else {
			data = that.pdata;
			this.setFrozenRip(data, freezeRows)
		}
		if (!other && (initV == null || finalRow == null)) {
			return
		}
		this.vrows = iRefresh.vrows;
		this.vfrows = iRefresh.vfrows;
		var tblClass = ["pq-grid-table"];
		if (bootstrap.on) {
			tblClass.push(bootstrap.tbody)
		}
		if (o.columnBorders) {
			tblClass.push("pq-td-border-right")
		}
		if (o.rowBorders) {
			tblClass.push("pq-td-border-top")
		}
		tblClass.push(o.wrap ? "pq-wrap" : "pq-no-wrap");
		var buffer = ["<table class='" + tblClass.join(" ") + "' >"];
		buffer.push("<tr class='pq-row-hidden'>");
		if (numberCell.show) {
			var wd = numberCell.width;
			buffer.push("<td style='width:" + wd + "px;' ></td>")
		}
		var colDef = this.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column,
				wd = column.outerWidth;
			buffer.push("<td style='width:", wd, "px;' pq-col-indx='", col, "'></td>")
		}
		buffer.push("</tr>");
		for (var row = 0; row <= finalRow; row++) {
			if (row < initV && row >= freezeRows) {
				row = initV
			}
			var rowData = data[row],
				rip = row,
				rowHidden = rowData ? rowData.pq_hidden : false;
			if (rowHidden) {
				continue
			}
			var nestedshow = rowData.pq_detail && rowData.pq_detail.show;
			this._generateRow(rowData, rip, buffer, other, nestedshow);
			if (nestedshow) {
				this._generateDetailRow(rowData, rip, buffer)
			}
		}
		buffer.push("</table>");
		return buffer.join("")
	};
	_pGenerateView.appendRow = function(noRows) {
		var that = this.that,
			data = that.pdata,
			CM = that.colModel,
			finalV = that.finalV;
		if (finalV + noRows > data.length) {
			noRows = data.length - finalV
		}
		if (noRows) {
			if (noRows > 1) {
				throw "noRows > 1"
			}
			that._trigger("beforeTableView", null, {
				pageData: data,
				initV: finalV,
				finalV: finalV,
				initH: that.initH,
				finalH: that.finalH,
				colModel: CM
			});
			that.refreshRow({
				rowIndxPage: finalV,
				refresh: false
			})
		}
		return noRows
	};
	_pGenerateView.prependRow = function(noRows) {
		var that = this.that,
			fr = that.options.freezeRows,
			frVisible = that.calcVisibleRows(that.pdata, 0, fr),
			data = that.pdata,
			initV = that.initV,
			CM = that.colModel;
		if (that._mergeCells) {
			if (frVisible) {
				for (var i = 0; i < fr; i++) {
					that.refreshRow({
						rowIndxPage: i,
						refresh: false
					})
				}
			}
			that.refreshRow({
				rowIndxPage: initV + 1,
				refresh: false
			})
		}
		that._trigger("beforeTableView", null, {
			pageData: data,
			initV: initV,
			finalV: initV,
			initH: that.initH,
			finalH: that.finalH,
			colModel: CM
		});
		that.refreshRow({
			rowIndxPage: initV,
			refresh: false
		});
		return noRows
	};
	_pGenerateView.removeTopRow = function(noRows) {
		var that = this.that,
			fr = that.options.freezeRows,
			frVisible = that.calcVisibleRows(that.pdata, 0, fr),
			$tbls = that.$tbl,
			$rows2 = $([]);
		for (var i = 0; i < $tbls.length; i++) {
			var $tbl = $($tbls[i]),
				$tbody = $tbl.children("tbody"),
				$rows = $tbody.children("tr:gt(0)").slice(frVisible, noRows + frVisible);
			$rows2 = $rows2.add($rows)
		}
		$rows2.remove();
		if (that._mergeCells) {
			if (frVisible) {
				for (var i = 0; i < fr; i++) {
					that.refreshRow({
						rowIndxPage: i,
						refresh: false
					})
				}
			}
			that.refreshRow({
				rowIndxPage: that.initV,
				refresh: false
			})
		}
	};
	_pGenerateView.removeBottomRow = function(noRows) {
		var that = this.that,
			$tbls = that.$tbl;
		if (noRows) {
			for (var i = 0; i < $tbls.length; i++) {
				var $tbl = $($tbls[i]),
					$tbody = $tbl.children("tbody");
				var $rows = $tbody.children("tr:gt(0)").slice(-noRows);
				$rows.remove()
			}
		}
	};
	_pGenerateView.format = function() {
		var dp = $.datepicker,
			formatNumber = pq.formatNumber;
		return function(cellData, format, dataType) {
			if (dataType == "date") {
				if (isNaN(Date.parse(cellData))) {
					return
				}
				return dp.formatDate(format, new Date(cellData))
			} else {
				return formatNumber(cellData, format)
			}
		}
	}();
	_pGenerateView.renderCell = function(objP) {
		var that = this.that,
			attr = [],
			style = [],
			_export = objP.Export,
			mergeOverlay = false,
			o = this.options,
			cls = ["pq-grid-cell"];
		if (!objP.other && !_export && that._mergeCells) {
			objP = that.iMerge.renderCell(objP);
			if (objP == null) {
				return ""
			}
			if (objP.rowspan) {
				attr.push("rowspan='" + objP.rowspan + "'", "colspan='" + objP.colspan + "'");
				if (!o.mergeModel.flex) {
					mergeOverlay = true;
					cls.push("pq-merge-cell")
				}
			}
			if (objP.style) {
				style.push(objP.style)
			}
			if (objP.cls) {
				cls.push(objP.cls)
			}
		}
		var rowData = objP.rowData,
			column = objP.column,
			colIndx = objP.colIndx,
			dataIndx = column.dataIndx,
			freezeCols = o.freezeCols,
			columnBorders = o.columnBorders;
		if (!rowData) {
			return
		}
		if (!_export) {
			attr.push("pq-col-indx='" + colIndx + "'");
			if (column.align == "right") {
				cls.push("pq-align-right")
			} else {
				if (column.align == "center") {
					cls.push("pq-align-center")
				}
			}
			if (colIndx == freezeCols - 1 && columnBorders) {
				cls.push("pq-last-frozen-col")
			}
			var ccls = column.cls;
			if (ccls) {
				cls.push(ccls)
			}
			var cellselect = that.iSelection.dirty ? null : rowData.pq_cellselect;
			if (cellselect && cellselect[dataIndx]) {
				cls.push(that.iCells.hclass)
			}
		}
		var dataCell, cellData = rowData[dataIndx],
			_cf = column.format,
			formatVal = _cf ? this.format(cellData, _cf, column.dataType) : cellData;
		objP.dataIndx = dataIndx;
		objP.cellData = cellData;
		objP.formatVal = formatVal;
		if (column.render) {
			dataCell = column.render.call(that, objP);
			if (dataCell && typeof dataCell != "string") {
				var dattr = dataCell.attr,
					dcls = dataCell.cls,
					dstyle = dataCell.style;
				if (dattr) {
					attr.push(dattr)
				}
				if (dcls) {
					cls.push(dcls)
				}
				if (dstyle) {
					style.push(dstyle)
				}
				dataCell = dataCell.text
			}
		}
		if (dataCell == null && column._render) {
			dataCell = column._render.call(that, objP)
		}
		if (dataCell && typeof dataCell != "string") {
			var dattr = dataCell.attr,
				dcls = dataCell.cls,
				dstyle = dataCell.style;
			if (dattr) {
				attr.push(dattr)
			}
			if (dcls) {
				cls.push(dcls)
			}
			if (dstyle) {
				style.push(dstyle)
			}
			dataCell = dataCell.text
		}
		if (dataCell == null) {
			dataCell = formatVal
		}
		if (_export) {
			return dataCell
		} else {
			if (dataCell === "" || dataCell == undefined) {
				dataCell = "&nbsp;"
			}
			var pq_cellcls = rowData.pq_cellcls;
			if (pq_cellcls) {
				var cellClass = pq_cellcls[dataIndx];
				if (cellClass) {
					cls.push(cellClass)
				}
			}
			var pq_cellattr = rowData.pq_cellattr;
			if (pq_cellattr) {
				var cellattr = pq_cellattr[dataIndx];
				if (cellattr) {
					var newcellattr = stringifyAttr(cellattr);
					for (var key in newcellattr) {
						var val = newcellattr[key];
						if (key == "style") {
							style.push(val)
						} else {
							attr.push(key + '="' + val + '"')
						}
					}
				}
			}
			style = style.length ? " style='" + style.join("") + "' " : "";
			var str = ["<td class='", cls.join(" "), "' ", attr.join(" "), style, " >", mergeOverlay ? "<div class='pq-merge-cell-div'><div><div class='pq-merge-inner'>" : "", dataCell, mergeOverlay ? "</div></div></div>" : "", "</td>"].join("");
			return str
		}
	};
	_pGenerateView.setFrozenRip = function(data, fr) {
		if (!data) {
			return
		}
		var rd;
		while (fr-- && (rd = data[fr]) && rd.pq_hidden) {}
		this.frozenRip = fr
	};
	_pGenerateView.refreshRow = function(rip, buffer) {
		var that = this.that,
			rowData = that.pdata[rip],
			nestedshow = rowData.pq_detail && rowData.pq_detail.show;
		this._generateRow(rowData, rip, buffer, null, nestedshow)
	};
	_pGenerateView._generateRow = function(rowData, rip, buffer, other, nestedshow) {
		var row_cls = ["pq-grid-row"];
		if (this.frozenRip === rip) {
			row_cls.push("pq-last-frozen-row")
		}
		if (nestedshow) {
			row_cls.push("pq-detail-master")
		}
		var that = this.that,
			o = this.options,
			rowInit = o.rowInit,
			numberCell = o.numberCell,
			attr = "",
			style = "",
			offset = that.rowIndxOffset,
			ri = rip + offset;
		if (rowInit) {
			var retui = rowInit.call(that, {
				rowData: rowData,
				rowIndxPage: rip,
				rowIndx: ri
			});
			if (retui) {
				if (retui.cls) {
					row_cls.push(retui.cls)
				}
				attr += retui.attr ? " " + retui.attr : "";
				style += retui.style ? retui.style : ""
			}
		}
		if (!other && o.stripeRows && this.isOdd(rip, o.freezeRows)) {
			row_cls.push("pq-grid-oddRow")
		}
		if (rowData.pq_rowselect) {
			row_cls.push(that.iRows.hclass)
		}
		var pq_rowcls = rowData.pq_rowcls;
		if (pq_rowcls != null) {
			row_cls.push(pq_rowcls)
		}
		var rowattr = rowData.pq_rowattr;
		if (rowattr) {
			var newrowattr = stringifyAttr(rowattr);
			for (var key in newrowattr) {
				var val = newrowattr[key];
				attr += " " + key + '="' + val + '"'
			}
		}
		style = style ? "style='" + style + "'" : "";
		buffer.push("<tr pq-row-indx='", rip, "' class='", row_cls.join(" "), "' ", attr, " ", style, " >");
		if (numberCell.show) {
			buffer.push(["<td pq-col-indx='-1' class='pq-grid-number-cell'>", other ? "&nbsp;" : ri + 1, "</td>"].join(""))
		}
		var objRender = {
			rowIndx: rip + offset,
			rowIndxPage: rip,
			other: other,
			rowData: rowData
		};
		var colDef = this.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column;
			objRender.column = column;
			objRender.colIndx = col;
			buffer.push(this.renderCell(objRender))
		}
		buffer.push("</tr>");
		return buffer
	};
	_pGenerateView.isOdd = function(rip, fr) {
		var indx = pq.searchSeqArray(rip < fr ? this.vfrows : this.vrows, rip);
		return indx / 2 == parseInt(indx / 2)
	};
	_pGenerateView._generateDetailRow = function(rowData, rip, buffer) {
		var row_cls = ["pq-grid-row pq-detail-child"];
		var that = this.that,
			o = that.options,
			numberCell = o.numberCell,
			const_cls = "pq-grid-cell";
		if (o.stripeRows && this.isOdd(rip, o.freezeRows)) {
			row_cls.push("pq-grid-oddRow")
		}
		if (rowData.pq_rowselect) {
			row_cls.push(that.iRows.hclass)
		}
		var pq_rowcls = rowData.pq_rowcls;
		if (pq_rowcls != null) {
			row_cls.push(pq_rowcls)
		}
		buffer.push("<tr pq-row-indx='" + rip + "' class='" + row_cls.join(" ") + "' >");
		if (numberCell.show) {
			buffer.push(["<td class='pq-grid-number-cell'>", "&nbsp;</td>"].join(""))
		}
		buffer.push("<td class='" + const_cls + " pq-detail-child' colSpan='20'></td>");
		buffer.push("</tr>");
		return buffer
	};
	var fni = {
		widgetEventPrefix: "pqgrid"
	};
	fni._create = function() {
		var that = this,
			o = this.options,
			DM = o.dataModel,
			bts = o.bootstrap,
			bts_on = bts.on,
			roundCorners = o.roundCorners && !bts_on,
			jui = o.ui,
			SM = o.sortModel;
		$(document).triggerHandler("pqGrid:bootup", {
			instance: this
		});
		this.BS_on = bts_on;
		if (!o.collapsible) {
			o.collapsible = {
				on: false,
				collapsed: false
			}
		}
		if (o.flexHeight) {
			o.height = "flex"
		}
		if (o.flexWidth) {
			o.width = "flex"
		}
		if (DM.sortIndx) {
			SM.on = o.sortable;
			SM.type = DM.sorting;
			var sorter = [],
				sortIndx = DM.sortIndx,
				sortDir = DM.sortDir;
			if ($.isArray(sortIndx)) {
				for (var i = 0; i < sortIndx.length; i++) {
					var dir = sortDir && sortDir[i] ? sortDir[i] : "up";
					sorter.push({
						dataIndx: sortIndx[i],
						dir: dir
					})
				}
				SM.single = false
			} else {
				var dir = sortDir ? sortDir : "up";
				sorter.push({
					dataIndx: sortIndx,
					dir: dir
				});
				SM.single = true
			}
			SM.sorter = sorter
		}
		if (o.virtualXHeader === false) {
			o.virtualXHeader = null
		}
		this.setEditorPosTimer();
		this.iGenerateView = new cGenerateView(this);
		this.iRefresh = new _pq.cRefresh(this);
		this.iKeyNav = new cKeyNav(this);
		this.iIsValid = new cIsValid(this);
		this.tables = [];
		this.$tbl = null;
		this.iColModel = new _pq.cColModel(this);
		this.iSort = new _pq.cSort(this);
		this.iHeader = new _pq.cHeader(this);
		this._initTypeColumns();
		var element = this.element;
		element.on("scroll" + this.eventNamespace, function() {
			this.scrollLeft = 0;
			this.scrollTop = 0
		});
		var jui_grid = bts_on ? bts.grid : jui.grid,
			jui_header_o = bts_on ? "" : jui.header_o,
			jui_bottom = bts_on ? "" : jui.bottom,
			jui_top = bts_on ? bts.top : jui.top;
		element.empty().addClass("pq-grid " + jui_grid + " " + (roundCorners ? " ui-corner-all" : "")).html(["<div class='pq-grid-top ", jui_top, " ", roundCorners ? " ui-corner-top" : "", "'>", "<div class='pq-grid-title", roundCorners ? " ui-corner-top" : "", "'>&nbsp;</div>", "</div>", "<div class='pq-grid-center' >", "<div class='pq-header-outer ", jui_header_o, "'>", "</div>", "<div class='pq-grid-cont-outer' >", "<div class='pq-grid-cont' tabindex='0'></div>", "</div>", "</div>", "<div class='pq-grid-bottom ", jui_bottom, " ", roundCorners ? " ui-corner-bottom" : "", "'>", "<div class='pq-grid-footer'></div>", "</div>"].join(""));
		this.$bottom = $("div.pq-grid-bottom", element);
		this._trigger("render", null, {
			dataModel: this.options.dataModel,
			colModel: this.colModel
		});
		this.$top = $("div.pq-grid-top", element);
		if (!o.showTop) {
			this.$top.css("display", "none")
		}
		this.$title = $("div.pq-grid-title", element);
		if (!o.showTitle) {
			this.$title.css("display", "none")
		}
		var $grid_center = this.$grid_center = $("div.pq-grid-center", element).on("scroll", function() {
			this.scrollTop = 0
		});
		this.$header_o = $("div.pq-header-outer", this.$grid_center).on("scroll", function() {
			this.scrollTop = 0;
			this.scrollLeft = 0
		});
		this.$footer = $("div.pq-grid-footer", element);
		this.$cont_o = $(".pq-grid-cont-outer", $grid_center);
		var $cont = this.$cont = $("div.pq-grid-cont", $grid_center);
		$(window).bind("resize" + that.eventNamespace + " orientationchange" + that.eventNamespace, function(evt, ui) {
			that.onWindowResize(evt, ui)
		});
		$cont.on("click", ".pq-grid-cell,.pq-grid-number-cell", function(evt) {
			if ($.data(evt.target, that.widgetName + ".preventClickEvent") === true) {
				return
			}
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onClickCell(evt)
			}
		});
		$cont.on("click", "tr.pq-grid-row", function(evt) {
			if ($.data(evt.target, that.widgetName + ".preventClickEvent") === true) {
				return
			}
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onClickRow(evt)
			}
		});
		$cont.on("contextmenu", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRightClickCell(evt)
			}
		});
		$cont.on("contextmenu", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRightClickRow(evt)
			}
		});
		$cont.on("dblclick", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onDblClickCell(evt)
			}
		});
		$cont.on("dblclick", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onDblClickRow(evt)
			}
		});
		$cont.on("blur", function() {
			that.onblur()
		});
		$cont.on("focus", function() {
			that.onfocus()
		});
		$cont.on("mousedown", function(evt) {
			if (evt.which !== 1) {
				return
			}
			var $target = $(evt.target);
			if ($target.closest(".pq-grid")[0] == that.element[0]) {
				var ret, $td = $target.closest(".pq-grid-cell:not(.pq-detail-child)");
				if ($td.length) {
					evt.currentTarget = $td[0];
					ret = that._onCellMouseDown(evt);
					if (ret === false) {
						return false
					}
				}
				if (evt.isPropagationStopped()) {
					return
				}
				var $tr = $target.closest(".pq-grid-row");
				if ($tr.length) {
					evt.currentTarget = $tr[0];
					ret = that._onRowMouseDown(evt);
					if (ret === false) {
						return false
					}
				}
				if (evt.isPropagationStopped()) {
					return
				}
				return that._onContMouseDown(evt)
			}
		});
		$cont.on("mouseenter", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseEnter(evt, $(this))
			}
		});
		$cont.on("mouseenter", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseEnter(evt, $(this))
			}
		});
		$cont.on("mouseleave", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseLeave(evt, $(this))
			}
		});
		$cont.on("mouseleave", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseLeave(evt, $(this))
			}
		});
		$cont.on("keyup", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				that._trigger("keyUp", evt, null)
			}
		});
		$grid_center.bind("mousewheel DOMMouseScroll", function(evt) {
			return that._onMouseWheel(evt)
		});
		var prevVScroll = 0;
		this.$hvscroll = $("<div class='pq-hvscroll-square ui-widget-content'></div>").appendTo($grid_center);
		var $vscroll = $("<div class='pq-vscroll'></div>").appendTo($grid_center);
		this.prevVScroll = 0;
		var scrollModel = o.scrollModel;
		if (scrollModel.lastColumn === undefined) {
			if (o.virtualX) {
				scrollModel.lastColumn = "auto"
			}
		}
		this.vscroll = pq.scrollbar($vscroll, {
			pace: scrollModel.pace,
			theme: scrollModel.theme,
			bootstrap: o.bootstrap,
			steps: o.virtualY && !scrollModel.smooth,
			direction: "vertical",
			cur_pos: 0,
			pageRight: function() {
				that.iKeyNav.pageDown()
			},
			pageLeft: function() {
				that.iKeyNav.pageUp()
			},
			drag: function(evt, obj) {
				that.iMouseSelection.syncViewWithScrollBarVert(obj.ratio)
			},
			scroll: function(evt, obj) {
				that.iRefresh.refreshVscroll(obj)
			}
		});
		var $hscroll = $("<div class='pq-hscroll'></div>").appendTo($grid_center);
		if (o.height === "flex") {
			$hscroll.css("position", "relative")
		}
		this.hscroll = pq.scrollbar($hscroll, {
			direction: "horizontal",
			pace: scrollModel.pace,
			bootstrap: o.bootstrap,
			theme: scrollModel.theme,
			steps: o.virtualX && !scrollModel.smooth,
			cur_pos: 0,
			drag: function(evt, obj) {
				that.iMouseSelection.syncViewWithScrollBarHor(obj.ratio)
			},
			scroll: function() {
				if (o.virtualX && !o.scrollModel.smooth) {
					that.refresh()
				}
			}
		});
		if (!o.selectionModel["native"]) {
			this.disableSelection()
		}
		$grid_center.bind("keydown.pq-grid", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				that._onKeyPressDown(evt)
			}
		});
		this._refreshTitle();
		this.iRows = new _pq.cRows(this);
		this.iCells = new _pq.cCells(this);
		this.generateLoading();
		this._initPager();
		this._refreshResizable();
		this._refreshDraggable();
		this.iResizeColumns = new _pq.cResizeColumns(this);
		this._mouseInit()
	};
	fni._mouseDown = function(evt) {
		var that = this;
		if ($(evt.target).closest(".pq-editor-focus").length) {
			this._blurEditMode = true;
			window.setTimeout(function() {
				that._blurEditMode = false
			}, 0);
			return
		}
		this._saveDims();
		this._mousePQUpDelegate = function(event) {
			return that._mousePQUp(event)
		};
		$(document).bind("mouseup" + this.eventNamespace, this._mousePQUpDelegate);
		return this._super(evt)
	};
	fni.destroy = function() {
		this._trigger("destroy");
		this._super();
		window.clearInterval(this._refreshEditorPosTimer);
		if (this.autoResizeTimeout) {
			clearTimeout(this.autoResizeTimeout)
		}
		for (var key in this) {
			delete this[key]
		}
		this.options = undefined;
		$.fragments = {}
	};
	fni._setOption = function(key, value) {
		var options = this.options,
			DM = options.dataModel;
		if (key === "height") {
			if (value === "flex") {
				var vscroll = this.vscroll;
				if (value && vscroll && vscroll.widget().hasClass("pq-sb-vert")) {
					if (options.virtualY) {
						vscroll.option("cur_pos", 0)
					} else {
						vscroll.option("ratio", 0)
					}
				}
				this.hscroll.widget().css("position", "relative")
			} else {
				if (options.height === "flex") {
					this.hscroll.widget().css("position", "")
				}
			}
			options[key] = value
		} else {
			if (key === "width" && value == "flex") {
				options[key] = value;
				var hscroll = this.hscroll;
				if (value && hscroll && hscroll.widget().hasClass("pq-sb-horiz")) {
					if (options.virtualX) {
						hscroll.option("cur_pos", 0)
					} else {
						hscroll.option("ratio", 0)
					}
				}
			} else {
				if (key == "title") {
					options[key] = value;
					this._refreshTitle()
				} else {
					if (key == "roundCorners") {
						options[key] = value;
						if (value) {
							this.element.addClass("ui-corner-all");
							this.$top.addClass("ui-corner-top");
							this.$bottom.addClass("ui-corner-bottom")
						} else {
							this.element.removeClass("ui-corner-all");
							this.$top.removeClass("ui-corner-top");
							this.$bottom.removeClass("ui-corner-bottom")
						}
					} else {
						if (key == "virtualX") {
							options[key] = value;
							this.hscroll.option("steps", value)
						} else {
							if (key == "virtualY") {
								options[key] = value;
								this.vscroll.option("steps", value)
							} else {
								if (key == "freezeCols") {
									value = parseInt(value);
									if (!isNaN(value) && value >= 0 && value <= this.colModel.length - 2) {
										options[key] = value
									}
								} else {
									if (key == "freezeRows") {
										value = parseInt(value);
										if (!isNaN(value) && value >= 0) {
											options[key] = value
										}
									} else {
										if (key == "resizable") {
											options[key] = value;
											this._refreshResizable()
										} else {
											if (key == "draggable") {
												options[key] = value;
												this._refreshDraggable()
											} else {
												if (key == "scrollModel") {
													options[key] = value
												} else {
													if (key == "dataModel") {
														if (value.data !== DM.data) {
															if (DM.dataUF) {
																DM.dataUF.length = 0
															}
														}
														options[key] = value
													} else {
														if (key == "groupModel") {
															throw "use groupOption() to set groupModel options."
														} else {
															if (key == "pageModel") {
																options[key] = value
															} else {
																if (key === "selectionModel") {
																	options[key] = value
																} else {
																	if (key === "colModel" || key == "columnTemplate") {
																		options[key] = value;
																		this.iColModel.init()
																	} else {
																		if (key === "disabled") {
																			this._super(key, value);
																			if (value === true) {
																				this._disable()
																			} else {
																				this._enable()
																			}
																		} else {
																			if (key === "numberCell") {
																				options[key] = value;
																				this.iRefresh.decidePanes()
																			} else {
																				if (key === "strLoading") {
																					options[key] = value;
																					this._refreshLoadingString()
																				} else {
																					if (key === "showTop") {
																						options[key] = value;
																						this.$top.css("display", value ? "" : "none")
																					} else {
																						if (key === "showTitle") {
																							options[key] = value;
																							this.$title.css("display", value ? "" : "none")
																						} else {
																							if (key === "showToolbar") {
																								options[key] = value;
																								var $tb = this._toolbar.widget();
																								$tb.css("display", value ? "" : "none")
																							} else {
																								if (key == "toolbar") {
																									options[key] = value
																								} else {
																									if (key === "collapsible") {
																										options[key] = value;
																										this._createCollapse()
																									} else {
																										if (key === "showBottom") {
																											options[key] = value;
																											this.$bottom.css("display", value ? "" : "none")
																										} else {
																											options[key] = value
																										}
																									}
																								}
																							}
																						}
																					}
																				}
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
		}
		return this
	};
	fni.options = {
		cancel: "input,textarea,button,select,option,.pq-no-capture,.ui-resizable-handle",
		trigger: false,
		bootstrap: {
			on: false,
			thead: "table table-striped table-condensed table-bordered",
			tbody: "table table-condensed",
			grid: "panel panel-default",
			top: "",
			btn: "btn btn-default",
			groupModel: {
				icon: ["glyphicon-triangle-bottom", "glyphicon-triangle-right"]
			},
			header_active: "active"
		},
		ui: {
			on: true,
			grid: "ui-widget ui-widget-content",
			top: "ui-widget-header",
			bottom: "ui-widget-header",
			header_o: "ui-widget-header",
			header: "ui-state-default",
			header_active: "ui-state-active"
		},
		cls: {
			cont_inner: "pq-grid-cont-inner",
			cont_inner_b: "pq-grid-cont-inner-b"
		},
		distance: 3,
		collapsible: {
			on: true,
			toggle: true,
			collapsed: false,
			_collapsed: false,
			refreshAfterExpand: true,
			css: {
				zIndex: 1e3
			}
		},
		colModel: null,
		columnBorders: true,
		dataModel: {
			data: [],
			dataUF: [],
			cache: false,
			dataType: "JSON",
			location: "local",
			sorting: "local",
			sortDir: "up",
			method: "GET"
		},
		direction: "",
		draggable: false,
		editable: true,
		editModel: {
			cellBorderWidth: 0,
			pressToEdit: true,
			clicksToEdit: 2,
			filterKeys: true,
			keyUpDown: true,
			reInt: /^([\-]?[1-9][0-9]*|[\-]?[0-9]?)$/,
			reFloat: /^[\-]?[0-9]*\.?[0-9]*$/,
			onBlur: "validate",
			saveKey: $.ui.keyCode.ENTER,
			onSave: "nextFocus",
			onTab: "nextFocus",
			allowInvalid: false,
			invalidClass: "pq-cell-red-tr pq-has-tooltip",
			warnClass: "pq-cell-blue-tr pq-has-tooltip",
			validate: true
		},
		editor: {
			select: false,
			type: "textbox"
		},
		summaryOptions: {
			number: "avg,sum,max,min",
			date: "count,max,min",
			string: "count"
		},
		summaryTitle: {
			avg: "Avg: {0}",
			count: "Count: {0}",
			max: "Max: {0}",
			min: "Min: {0}",
			sum: "Sum: {0}"
		},
		validation: {
			icon: "ui-icon-alert",
			cls: "ui-state-error",
			style: "padding:3px 10px;"
		},
		warning: {
			icon: "ui-icon-info",
			cls: "",
			style: "padding:3px 10px;"
		},
		freezeCols: 0,
		freezeRows: 0,
		freezeBorders: true,
		calcDataIndxFromColIndx: true,
		height: 400,
		hoverMode: "null",
		_maxColWidth: "99%",
		_minColWidth: 50,
		minWidth: 100,
		numberCell: {
			width: 30,
			title: "",
			resizable: true,
			minWidth: 30,
			maxWidth: 100,
			show: true
		},
		pageModel: {
			curPage: 1,
			totalPages: 0,
			rPP: 10,
			rPPOptions: [10, 20, 50, 100]
		},
		resizable: false,
		roundCorners: true,
		rowBorders: true,
		rowHeight: 25,
		scrollModel: {
			pace: "fast",
			smooth: false,
			horizontal: true,
			lastColumn: "auto",
			autoFit: false,
			theme: true
		},
		selectionModel: {
			type: "cell",
			onTab: "nextFocus",
			row: true,
			mode: "block"
		},
		swipeModel: {
			on: true,
			speed: 20,
			ratio: .15,
			repeat: 20
		},
		showBottom: true,
		showHeader: true,
		showTitle: true,
		showToolbar: true,
		showTop: true,
		sortable: true,
		sql: false,
		stripeRows: true,
		title: "&nbsp;",
		treeModel: null,
		virtualX: false,
		virtualY: false,
		width: "auto",
		wrap: true,
		hwrap: true
	};
	var _regional = {
		strAdd: "Add",
		strDelete: "Delete",
		strEdit: "Edit",
		strGroup_header: "Drag a column here to group by that column",
		strGroup_merge: "Merge cells",
		strGroup_fixCols: "Fix columns",
		strGroup_grandSummary: "Grand summary",
		strLoading: "Loading",
		strNoRows: "No rows to display."
	};
	$.extend(true, fni.options, _regional);
	$.widget("paramquery._pqGrid", $.ui.mouse, fni);
	var fn = _pq._pqGrid.prototype;
	fn.refreshCM = function(CM) {
		if (CM) {
			this.option("colModel", CM)
		} else {
			this.iColModel.init()
		}
	};
	fn.readCell = function(rowData, column, iMerge, ri, ci) {
		var dataIndx = column.dataIndx;
		if (iMerge && iMerge.isRootCell(ri, ci, "o") === false) {
			return undefined
		}
		return rowData[dataIndx]
	};
	fn.saveCell = function(rowData, column, val) {
		var dataIndx = column.dataIndx;
		rowData[dataIndx] = val
	};
	fn._destroyResizable = function() {
		var ele = this.element,
			data = ele.data();
		if (data.resizable || data.uiResizable || data["ui-resizable"]) {
			ele.resizable("destroy")
		}
	};
	fn._disable = function() {
		if (this.$disable == null) {
			this.$disable = $("<div class='pq-grid-disable'></div>").css("opacity", .2).appendTo(this.element)
		}
	};
	fn._enable = function() {
		if (this.$disable) {
			this.element[0].removeChild(this.$disable[0]);
			this.$disable = null
		}
	};
	fn._destroy = function() {
		if (this.loading) {
			this.xhr.abort()
		}
		this._destroyResizable();
		this._destroyDraggable();
		this._mouseDestroy();
		this.element.off(this.eventNamespace);
		$(window).unbind(this.eventNamespace);
		$(document).unbind(this.eventNamespace);
		this.element.empty().css("height", "").css("width", "").removeClass("pq-grid ui-widget ui-widget-content ui-corner-all").removeData()
	};
	fn.collapse = function(objP) {
		var that = this,
			ele = this.element,
			o = this.options,
			CP = o.collapsible,
			$icon = CP.$collapse.children("span"),
			postCollapse = function() {
				ele.css("overflow", "hidden");
				$icon.addClass("ui-icon-circle-triangle-s").removeClass("ui-icon-circle-triangle-n");
				if (ele.hasClass("ui-resizable")) {
					ele.resizable("destroy")
				}
				if (that._toolbar) {
					that._toolbar.disable()
				}
				CP.collapsed = true;
				CP._collapsed = true;
				CP.animating = false;
				that._trigger("collapse")
			};
		objP = objP ? objP : {};
		if (CP._collapsed) {
			return false
		}
		CP.htCapture = ele.height();
		if (objP.animate === false) {
			ele.height(23);
			postCollapse()
		} else {
			CP.animating = true;
			ele.animate({
				height: "23px"
			}, function() {
				postCollapse()
			})
		}
	};
	fn.expand = function(objP) {
		var that = this,
			ele = this.element,
			o = this.options,
			CP = o.collapsible,
			htCapture = CP.htCapture,
			$icon = CP.$collapse.children("span"),
			postExpand = function() {
				ele.css("overflow", "");
				CP._collapsed = false;
				CP.collapsed = false;
				that._refreshResizable();
				if (CP.refreshAfterExpand) {
					that.refresh()
				}
				$icon.addClass("ui-icon-circle-triangle-n").removeClass("ui-icon-circle-triangle-s");
				if (that._toolbar) {
					that._toolbar.enable()
				}
				CP.animating = false;
				that._trigger("expand")
			};
		objP = objP ? objP : {};
		if (CP._collapsed === false) {
			return false
		}
		if (objP.animate === false) {
			ele.height(htCapture);
			postExpand()
		} else {
			CP.animating = true;
			ele.animate({
				height: htCapture
			}, function() {
				postExpand()
			})
		}
	};

	function createButton(icon) {
		return "<span class='btn btn-xs glyphicon glyphicon-" + icon + "' ></span>"
	}

	function createUIButton(icon) {
		return "<span class='ui-widget-header pq-ui-button'><span class='ui-icon ui-icon-" + icon + "'></span></span>"
	}
	fn._createCollapse = function() {
		var that = this,
			$top = this.$top,
			o = this.options,
			BS_on = this.BS_on,
			CP = o.collapsible;
		if (!CP.$stripe) {
			var $stripe = $(["<div class='pq-slider-icon pq-no-capture'  >", "</div>"].join("")).appendTo($top);
			CP.$stripe = $stripe
		}
		if (CP.on) {
			if (!CP.$collapse) {
				CP.$collapse = $(BS_on ? createButton("collapse-down") : createUIButton("circle-triangle-n")).appendTo(CP.$stripe).click(function(evt) {
					if (CP.collapsed) {
						that.expand()
					} else {
						that.collapse()
					}
				})
			}
		} else {
			if (CP.$collapse) {
				CP.$collapse.remove();
				delete CP.$collapse
			}
		}
		if (CP.collapsed && !CP._collapsed) {
			that.collapse({
				animate: false
			})
		} else {
			if (!CP.collapsed && CP._collapsed) {
				that.expand({
					animate: false
				})
			}
		}
		if (CP.toggle) {
			if (!CP.$toggle) {
				CP.$toggle = $(BS_on ? createButton("fullscreen") : createUIButton("arrow-4-diag")).prependTo(CP.$stripe).click(function(evt) {
					that.toggle()
				})
			}
		} else {
			if (CP.$toggle) {
				CP.$toggle.remove();
				delete CP.$toggle
			}
		}
	};
	fn.toggle = function() {
		var o = this.options,
			CP = o.collapsible,
			$grid = this.element,
			state, maxim = this._maxim,
			state = maxim ? "min" : "max",
			$doc = $(document.body);
		if (this._trigger("beforeToggle", null, {
				state: state
			}) === false) {
			return false
		}
		if (state == "min") {
			var eleObj = maxim.eleObj,
				docObj = maxim.docObj;
			this.option({
				height: eleObj.height,
				width: eleObj.width,
				maxHeight: eleObj.maxHeight,
				maxWidth: eleObj.maxWidth
			});
			$grid[0].style.cssText = eleObj.cssText;
			$doc[0].style.cssText = docObj.cssText;
			$("html").css({
				overflow: "visible"
			});
			window.scrollTo(docObj.scrollLeft, docObj.scrollTop);
			this._maxim = null
		} else {
			var eleObj = {
				height: o.height,
				width: o.width,
				cssText: $grid[0].style.cssText,
				maxHeight: o.maxHeight,
				maxWidth: o.maxWidth
			};
			this.option({
				height: "100%",
				width: "100%",
				maxHeight: null,
				maxWidth: null
			});
			$grid.css($.extend({
				position: "fixed",
				left: 0,
				top: 0,
				margin: 0
			}, CP.css));
			var docObj = {
				scrollLeft: $(window).scrollLeft(),
				scrollTop: $(window).scrollTop(),
				cssText: $doc[0].style.cssText
			};
			$doc.css({
				height: 0,
				width: 0,
				overflow: "hidden",
				position: "static"
			});
			$("html").css({
				overflow: "hidden"
			});
			window.scrollTo(0, 0);
			this._maxim = {
				eleObj: eleObj,
				docObj: docObj
			}
		}
		this._trigger("toggle", null, {
			state: state
		});
		this._refreshResizable();
		this.refresh();
		$(window).trigger("resize", {
			$grid: $grid,
			state: state
		})
	};
	fn._mouseCapture = function(evt) {
		var o = this.options;
		if (o.virtualX && o.virtualY && !o.scrollModel.smooth) {
			return false
		}
		if (!evt.target) {
			return false
		}
		if ($(evt.target).closest(".pq-grid")[0] == this.element[0]) {
			var SW = o.swipeModel;
			if (SW.on == false || SW.on == "touch" && !$.support.touch) {
				return false
			}
			return true
		}
		return false
	};
	fn._saveDims = function() {
		var $cont = this.$cont;
		var $tblb = this.$tbl,
			$tblh = this.$tbl_header;
		if ($tblb) {
			for (var i = 0; i < $tblb.length; i++) {
				var tbl = $tblb[i],
					$tbl = $(tbl);
				$tbl.data("offsetHeight", Math.round(tbl.offsetHeight) - 1);
				$tbl.data("scrollWidth", Math.round(tbl.scrollWidth))
			}
		}
		if ($tblh) {
			for (var i = 0; i < $tblh.length; i++) {
				var tbl = $tblh[i],
					$tblParent = $(tbl).parent();
				$tblParent.data("offsetHeight", Math.round(tbl.offsetHeight));
				$tblParent.data("scrollWidth", Math.round(tbl.scrollWidth))
			}
		}
	};
	fn._mousePQUp = function(evt) {
		$(document).unbind("mouseup" + this.eventNamespace, this._mousePQUpDelegate);
		this._trigger("mousePQUp", evt, null)
	};
	fn._mouseStart = function(evt) {
		this.blurEditor({
			force: true
		});
		return true
	};
	fn._mouseDrag = function(evt) {
		if (this._trigger("mouseDrag", evt, null) == false) {
			return false
		}
		return true
	};
	fn._mouseStop = function(evt) {
		if (this._trigger("mouseStop", evt, null) == false) {
			return false
		}
		return true
	};
	fn.onWindowResize = function(evt, ui) {
		var that = this,
			o = that.options,
			$grid = that.element,
			$parent = $grid.parent(),
			lastParentHeight = "_lastParentHt",
			lastParentWidth = "_lastParentWd",
			autoResizeTimeout = "autoResizeTimeout",
			newParentHeight, newParentWidth;
		if (ui) {
			var ui_grid = ui.$grid;
			if (ui_grid) {
				if (ui_grid == $grid || $grid.closest(ui_grid).length == 0) {
					return
				}
			}
		}
		if (!$parent.length) {
			return
		}
		if ($parent[0] == document.body || $grid.css("position") == "fixed") {
			newParentHeight = window.innerHeight ? window.innerHeight : $(window).height();
			newParentWidth = $(window).width()
		} else {
			newParentHeight = $parent.height();
			newParentWidth = $parent.width()
		}
		if (that[lastParentHeight] != null && newParentHeight == that[lastParentHeight] && newParentWidth == that[lastParentWidth]) {
			return
		} else {
			that[lastParentHeight] = newParentHeight;
			that[lastParentWidth] = newParentWidth
		}
		if ($.support.touch && o.editModel.indices && $(document.activeElement).is(".pq-editor-focus")) {
			return
		}
		if (that[autoResizeTimeout]) {
			clearTimeout(that[autoResizeTimeout])
		}
		that[autoResizeTimeout] = window.setTimeout(function() {
			that._refreshAfterResize();
			delete that[autoResizeTimeout]
		}, o.autoSizeInterval || 0)
	};
	fn._onMouseWheel = function(evt) {
		this._saveDims();
		var o = this.options;
		var that = this;
		var num = 0,
			horizontal = false,
			evt = evt.originalEvent,
			wheelDeltaX = evt.wheelDeltaX,
			wheelDeltaY = evt.wheelDeltaY,
			wheelDelta = evt.wheelDelta;
		if (wheelDeltaX && Math.abs(wheelDeltaX) > Math.abs(wheelDeltaY)) {
			if (o.width == "flex") {
				return true
			}
			horizontal = true;
			num = wheelDeltaX / 120
		} else {
			if (wheelDelta) {
				if (!this.iRefresh.vscroll) {
					return true
				}
				num = wheelDelta / 120
			} else {
				if (evt.detail) {
					if (!this.iRefresh.vscroll) {
						return true
					}
					num = evt.detail * -1 / 3
				}
			}
		}
		num *= 3;
		var scroll = horizontal ? that.hscroll : that.vscroll;
		var cur_pos = parseInt(scroll.option("cur_pos")),
			num_eles = parseInt(scroll.option("num_eles"));
		if (!o.scrollModel.smooth && (horizontal && o.virtualX || !horizontal && o.virtualY)) {
			if (num > 0) {
				num = Math[num < 1 ? "ceil" : "floor"](num)
			} else {
				num = Math[num < -1 ? "ceil" : "floor"](num)
			}
			var new_pos = cur_pos - num;
			if (new_pos < 0) {
				new_pos = 0
			} else {
				if (new_pos > num_eles - 1) {
					new_pos = num_eles - 1
				}
			}
			if (new_pos == cur_pos) {
				return true
			}
			scroll.option("cur_pos", cur_pos - num);
			scroll.scroll()
		} else {
			var ratio = scroll.option("ratio");
			var new_ratio = ratio - num / (num_eles - 1);
			if (new_ratio > 1) {
				new_ratio = 1
			} else {
				if (new_ratio < 0) {
					new_ratio = 0
				}
			}
			if (ratio == new_ratio) {
				return true
			}
			scroll.option("ratio", new_ratio);
			scroll.drag()
		}
		return false
	};
	fn._onDblClickCell = function(evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var obj = that.getCellIndices({
			$td: $td
		});
		var rowIndxPage = obj.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = rowIndxPage + offset,
			colIndx = obj.colIndx;
		if (colIndx == null) {
			return
		}
		if (that._trigger("cellDblClick", evt, {
				$td: $td,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				colIndx: colIndx,
				column: that.colModel[colIndx],
				rowData: that.pdata[rowIndxPage]
			}) == false) {
			return false
		}
		if (that.options.editModel.clicksToEdit > 1 && this.isEditableRow({
				rowIndx: rowIndx
			}) && this.isEditableCell({
				colIndx: colIndx,
				rowIndx: rowIndx
			})) {
			that.editCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			})
		}
	};
	fn._onClickCont = function(evt) {
		var that = this
	};
	fn._onClickRow = function(evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var rowIndxPage = parseInt($tr.attr("pq-row-indx")),
			offset = that.rowIndxOffset,
			rowIndx = rowIndxPage + offset;
		if (isNaN(rowIndxPage)) {
			return
		}
		var objP = {
				rowIndx: rowIndx,
				evt: evt
			},
			options = this.options;
		if (that._trigger("rowClick", evt, {
				$tr: $tr,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				rowData: that.pdata[rowIndxPage]
			}) == false) {
			return false
		}
		return
	};
	fn._onRightClickRow = function(evt) {
		var that = this,
			$tr = $(evt.currentTarget),
			rowIndxPage = parseInt($tr.attr("pq-row-indx")),
			offset = that.rowIndxOffset,
			rowIndx = rowIndxPage + offset;
		if (isNaN(rowIndxPage)) {
			return
		}
		var options = this.options;
		if (that._trigger("rowRightClick", evt, {
				$tr: $tr,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				rowData: that.pdata[rowIndxPage]
			}) == false) {
			return false
		}
	};
	fn._onDblClickRow = function(evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var rowIndxPage = parseInt($tr.attr("pq-row-indx")),
			offset = that.getRowIndxOffset(),
			rowIndx = rowIndxPage + offset;
		if (that._trigger("rowDblClick", evt, {
				$tr: $tr,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				rowData: that.pdata[rowIndxPage]
			}) == false) {
			return false
		}
	};
	fn.getValueFromDataType = function(val, dataType, validation) {
		var val2;
		if (dataType == "date") {
			val2 = Date.parse(val);
			if (isNaN(val2)) {
				return ""
			} else {
				if (validation) {
					return val2
				} else {
					return val
				}
			}
		} else {
			if (dataType == "object") {
				return val
			} else {
				if (dataType == "integer") {
					val2 = parseInt(val)
				} else {
					if (dataType == "float") {
						val2 = parseFloat(val)
					} else {
						if (dataType == "bool") {
							val2 = $.trim(val).toLowerCase();
							if (val2.length == 0) {
								return null
							}
							if (val2 == "true" || val2 == "yes" || val2 == "1") {
								return true
							} else {
								if (val2 == "false" || val2 == "no" || val2 == "0") {
									return false
								} else {
									return Boolean(val2)
								}
							}
						} else {
							return $.trim(val)
						}
					}
				}
			}
		}
		if (isNaN(val2) || val2 == null) {
			if (val == null) {
				return val
			} else {
				return null
			}
		} else {
			return val2
		}
	};
	var cIsValid = function(that) {
		this.that = that
	};
	var _piv = cIsValid.prototype;
	_piv._isValidCell = function(objP) {
		var that = this.that,
			column = objP.column,
			valids = column.validations;
		if (!valids || !valids.length) {
			return {
				valid: true
			}
		}
		var value = objP.value,
			dataType = column.dataType,
			getValue = function(val) {
				return that.getValueFromDataType(val, dataType, true)
			},
			rowData = objP.rowData;
		if (!rowData) {
			throw "rowData required."
		}
		for (var j = 0; j < valids.length; j++) {
			var valid = valids[j],
				on = valid.on,
				type = valid.type,
				_valid = false,
				msg = valid.msg,
				reqVal = valid.value;
			if (on === false) {
				continue
			}
			if (value == null && typeof type != "function") {
				_valid = false
			} else {
				if (type == "minLen") {
					value = getValue(value);
					reqVal = getValue(reqVal);
					if (value.length >= reqVal) {
						_valid = true
					}
				} else {
					if (type == "nonEmpty") {
						if (value != null && value !== "") {
							_valid = true
						}
					} else {
						if (type == "maxLen") {
							value = getValue(value);
							reqVal = getValue(reqVal);
							if (value.length <= reqVal) {
								_valid = true
							}
						} else {
							if (type == "gt") {
								value = getValue(value);
								reqVal = getValue(reqVal);
								if (value > reqVal) {
									_valid = true
								}
							} else {
								if (type == "gte") {
									value = getValue(value);
									reqVal = getValue(reqVal);
									if (value >= reqVal) {
										_valid = true
									}
								} else {
									if (type == "lt") {
										value = getValue(value);
										reqVal = getValue(reqVal);
										if (value < reqVal) {
											_valid = true
										}
									} else {
										if (type == "lte") {
											value = getValue(value);
											reqVal = getValue(reqVal);
											if (value <= reqVal) {
												_valid = true
											}
										} else {
											if (type == "neq") {
												value = getValue(value);
												reqVal = getValue(reqVal);
												if (value !== reqVal) {
													_valid = true
												}
											} else {
												if (type == "regexp") {
													if (new RegExp(reqVal).test(value)) {
														_valid = true
													}
												} else {
													if (typeof type == "function") {
														var obj2 = {
															column: column,
															value: value,
															rowData: rowData,
															msg: msg
														};
														var ret = type.call(that, obj2);
														if (ret == false) {
															_valid = false;
															if (obj2.msg != msg) {
																msg = obj2.msg
															}
														} else {
															_valid = true
														}
													} else {
														_valid = true
													}
												}
											}
										}
									}
								}
							}
						}
					}
				}
			}
			if (!_valid) {
				return {
					valid: false,
					msg: msg,
					column: column,
					warn: valid.warn,
					dataIndx: column.dataIndx,
					validation: valid
				}
			}
		}
		return {
			valid: true
		}
	};
	_piv.isValidCell = function(objP) {
		var that = this.that,
			rowData = objP.rowData,
			rowIndx = objP.rowIndx,
			value = objP.value,
			valueDef = objP.valueDef,
			column = objP.column,
			focusInvalid = objP.focusInvalid,
			o = that.options,
			bootstrap = o.bootstrap,
			allowInvalid = objP.allowInvalid,
			dataIndx = column.dataIndx,
			gValid = o.validation,
			gWarn = o.warning,
			EM = o.editModel,
			errorClass = EM.invalidClass,
			warnClass = EM.warnClass,
			ae = document.activeElement;
		if (objP.checkEditable) {
			if (that.isEditableCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				}) == false) {
				return {
					valid: true
				}
			}
		}
		var objvalid = this._isValidCell({
				column: column,
				value: value,
				rowData: rowData
			}),
			_valid = objvalid.valid,
			warn = objvalid.warn,
			msg = objvalid.msg;
		if (!_valid) {
			var pq_valid = $.extend({}, warn ? gWarn : gValid, objvalid.validation),
				css = pq_valid.css,
				cls = pq_valid.cls,
				icon = pq_valid.icon,
				style = pq_valid.style
		} else {
			if (that.data({
					rowData: rowData,
					dataIndx: dataIndx,
					data: "pq_valid"
				})) {
				that.removeClass({
					rowData: rowData,
					rowIndx: rowIndx,
					dataIndx: dataIndx,
					cls: warnClass + " " + errorClass
				});
				that.removeData({
					rowData: rowData,
					dataIndx: dataIndx,
					data: "pq_valid"
				})
			}
		}
		if (allowInvalid || warn) {
			if (!_valid) {
				that.addClass({
					rowData: rowData,
					rowIndx: rowIndx,
					dataIndx: dataIndx,
					cls: warn ? warnClass : errorClass
				});
				that.data({
					rowData: rowData,
					dataIndx: dataIndx,
					data: {
						pq_valid: {
							css: css,
							icon: icon,
							style: style,
							msg: msg,
							cls: cls
						}
					}
				});
				return objvalid
			} else {
				return {
					valid: true
				}
			}
		} else {
			if (!_valid) {
				if (rowIndx == null) {
					var objR = that.getRowIndx({
							rowData: rowData,
							dataUF: true
						}),
						rowIndx = objR.rowIndx;
					if (rowIndx == null || objR.uf) {
						objvalid.uf = objR.uf;
						return objvalid
					}
				}
				if (focusInvalid) {
					var $td;
					if (!valueDef) {
						that.goToPage({
							rowIndx: rowIndx
						});
						var uin = {
								rowIndx: rowIndx,
								dataIndx: dataIndx
							},
							uin = that.normalize(uin);
						$td = that.getCell(uin);
						that[o.selectionModel.type == "cell" ? "setSelection" : "scrollCell"](uin);
						that.focus(uin)
					} else {
						if ($(ae).hasClass("pq-editor-focus")) {
							var indices = o.editModel.indices;
							if (indices) {
								var rowIndx2 = indices.rowIndx,
									dataIndx2 = indices.dataIndx;
								if (rowIndx != null && rowIndx != rowIndx2) {
									throw "incorrect usage of isValid rowIndx: " + rowIndx
								}
								if (dataIndx != dataIndx2) {
									throw "incorrect usage of isValid dataIndx: " + dataIndx
								}
								that.editCell({
									rowIndx: rowIndx2,
									dataIndx: dataIndx
								})
							}
						}
					}
					var cell;
					if ($td || (cell = that.getEditCell()) && cell.$cell) {
						var $cell = $td || cell.$cell;
						$cell.attr("title", msg);
						var tooltipFn = "tooltip",
							tooltipShowFn = "open";
						if (bootstrap.on && bootstrap.tooltip) {
							tooltipFn = bootstrap.tooltip;
							tooltipShowFn = "show"
						}
						try {
							$cell[tooltipFn]("destroy")
						} catch (ex) {}
						$cell[tooltipFn]({
							trigger: "manual",
							position: {
								my: "left center+5",
								at: "right center"
							},
							content: function() {
								var strIcon = icon == "" ? "" : "<span class='ui-icon " + icon + " pq-tooltip-icon'></span>";
								return strIcon + msg
							},
							open: function(evt, ui) {
								var tt = ui.tooltip;
								if (cls) {
									tt.addClass(cls)
								}
								if (style) {
									var olds = tt.attr("style");
									tt.attr("style", olds + ";" + style)
								}
								if (css) {
									tt.tooltip.css(css)
								}
							}
						})[tooltipFn](tooltipShowFn)
					}
				}
				return objvalid
			}
			if (valueDef) {
				var cell = that.getEditCell();
				if (cell && cell.$cell) {
					var $cell = cell.$cell;
					$cell.removeAttr("title");
					try {
						$cell.tooltip("destroy")
					} catch (ex) {}
				}
			}
			return {
				valid: true
			}
		}
	};
	fn.isValid = function(objP) {
		return this.iIsValid.isValid(objP)
	};
	_piv.isValid = function(objP) {
		objP = objP || {};
		var that = this.that,
			allowInvalid = objP.allowInvalid,
			focusInvalid = objP.focusInvalid,
			checkEditable = objP.checkEditable,
			allowInvalid = allowInvalid == null ? false : allowInvalid,
			dataIndx = objP.dataIndx;
		if (dataIndx != null) {
			var column = that.columns[dataIndx],
				rowData = objP.rowData || that.getRowData(objP),
				valueDef = objP.hasOwnProperty("value"),
				value = valueDef ? objP.value : rowData[dataIndx],
				objValid = this.isValidCell({
					rowData: rowData,
					checkEditable: checkEditable,
					rowIndx: objP.rowIndx,
					value: value,
					valueDef: valueDef,
					column: column,
					allowInvalid: allowInvalid,
					focusInvalid: focusInvalid
				});
			if (!objValid.valid && !objValid.warn) {
				return objValid
			} else {
				return {
					valid: true
				}
			}
		} else {
			if (objP.rowIndx != null || objP.rowIndxPage != null || objP.rowData != null) {
				var rowData = objP.rowData || that.getRowData(objP),
					CM = that.colModel,
					cells = [],
					warncells = [];
				for (var i = 0, len = CM.length; i < len; i++) {
					var column = CM[i],
						hidden = column.hidden;
					if (hidden) {
						continue
					}
					var dataIndx = column.dataIndx,
						value = rowData[dataIndx],
						objValid = this.isValidCell({
							rowData: rowData,
							value: value,
							column: column,
							rowIndx: objP.rowIndx,
							checkEditable: checkEditable,
							allowInvalid: allowInvalid,
							focusInvalid: focusInvalid
						});
					if (!objValid.valid && !objValid.warn) {
						if (allowInvalid) {
							cells.push({
								rowData: rowData,
								dataIndx: dataIndx,
								column: column
							})
						} else {
							return objValid
						}
					}
				}
				if (allowInvalid && cells.length) {
					return {
						cells: cells,
						valid: false
					}
				} else {
					return {
						valid: true
					}
				}
			} else {
				var data = objP.data ? objP.data : that.options.dataModel.data,
					cells = [];
				if (!data) {
					return null
				}
				for (var i = 0, len = data.length; i < len; i++) {
					var rowData = data[i],
						rowIndx;
					if (checkEditable) {
						rowIndx = this.getRowIndx({
							rowData: rowData
						}).rowIndx;
						if (rowIndx == null || that.isEditableRow({
								rowData: rowData,
								rowIndx: rowIndx
							}) == false) {
							continue
						}
					}
					var objRet = this.isValid({
						rowData: rowData,
						rowIndx: rowIndx,
						checkEditable: checkEditable,
						allowInvalid: allowInvalid,
						focusInvalid: focusInvalid
					});
					var objRet_cells = objRet.cells;
					if (allowInvalid === false) {
						if (!objRet.valid) {
							return objRet
						}
					} else {
						if (objRet_cells && objRet_cells.length) {
							cells = cells.concat(objRet_cells)
						}
					}
				}
				if (allowInvalid && cells.length) {
					return {
						cells: cells,
						valid: false
					}
				} else {
					return {
						valid: true
					}
				}
			}
		}
	};
	fn.isValidChange = function(ui) {
		ui = ui || {};
		var changes = this.getChanges(),
			al = changes.addList,
			ul = changes.updateList,
			list = ul.concat(al);
		ui.data = list;
		return this.isValid(ui)
	};
	fn.isEditableRow = function(objP) {
		var o = this.options,
			gEditable = o.editable;
		if (gEditable != null) {
			if (typeof gEditable == "function") {
				return gEditable.call(this, this.normalize(objP))
			} else {
				return gEditable
			}
		} else {
			return true
		}
	};
	fn.isEditableCell = function(ui) {
		var objP = this.normalize(ui);
		var ri = objP.rowIndx,
			ci = objP.colIndx,
			iM = this.iMerge;
		var column = objP.column,
			cEditable = column.editable;
		if (objP.checkVisible && column.hidden) {
			return false
		}
		if (cEditable != null) {
			if (typeof cEditable == "function") {
				return cEditable.call(this, objP)
			} else {
				return cEditable
			}
		} else {
			return true
		}
	};
	fn._onContMouseDown = function(evt) {
		this.blurEditor({
			blurIfFocus: true
		});
		var that = this;
		if (that._trigger("contMouseDown", evt, null) === false) {
			return false
		}
		var $target = $(evt.target),
			$td = $target.closest(".pq-grid-cell,.pq-grid-number-cell"),
			$tr = $target.closest(".pq-grid-row");
		if (!$td.length && !$tr.length) {
			var cont = this.$cont[0];
			cont.setAttribute("tabindex", 0);
			cont.focus()
		}
		return true
	};
	fn._onCellMouseDown = function(evt) {
		var that = this,
			$td = $(evt.currentTarget),
			_obj = that.getCellIndices({
				$td: $td
			}),
			objP;
		if (_obj.rowIndx == null) {
			return
		}
		_obj = this.iMerge.getRootCell(_obj.rowIndx, _obj.colIndx, "o");
		objP = that.normalize(_obj);
		objP.$td = $td;
		if (that._trigger("cellMouseDown", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onRowMouseDown = function(evt) {
		var that = this,
			$tr = $(evt.currentTarget),
			objP = that.getRowIndx({
				$tr: $tr
			});
		objP.$tr = $tr;
		if (that._trigger("rowMouseDown", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onCellMouseEnter = function(evt, $this) {
		var $td = $this,
			o = this.options,
			objP = this.getCellIndices({
				$td: $td
			}),
			that = this;
		if (objP.rowIndx == null || objP.colIndx == null) {
			return
		}
		if (that._trigger("cellMouseEnter", evt, objP) === false) {
			return false
		}
		if (o.hoverMode == "cell") {
			that.highlightCell($td)
		}
		return true
	};
	fn._onRowMouseEnter = function(evt, $this) {
		var $tr = $this,
			o = this.options,
			that = this;
		var objRI = that.getRowIndx({
			$tr: $tr
		});
		var rowIndxPage = objRI.rowIndxPage;
		if (that._trigger("rowMouseEnter", evt, objRI) === false) {
			return false
		}
		if (o.hoverMode == "row") {
			that.highlightRow(rowIndxPage)
		}
		return true
	};
	fn._onCellMouseLeave = function(evt, $this) {
		var $td = $this,
			that = this;
		if (that.options.hoverMode == "cell") {
			that.unHighlightCell($td)
		}
		return true
	};
	fn._onRowMouseLeave = function(evt, $this) {
		var $tr = $this,
			that = this;
		var objRI = that.getRowIndx({
			$tr: $tr
		});
		var rowIndxPage = objRI.rowIndxPage;
		if (that.options.hoverMode == "row") {
			that.unHighlightRow(rowIndxPage)
		}
		return true
	};
	fn.enableSelection = function() {
		this.element.removeClass("pq-disable-select").off("selectstart" + this.eventNamespace)
	};
	fn.disableSelection = function() {
		this.element.addClass("pq-disable-select").on("selectstart" + this.eventNamespace, function(evt) {
			var target = evt.target;
			if (!target) {
				return
			}
			var $target = $(evt.target);
			if ($target.is("input,textarea,select")) {
				return true
			} else {
				if ($target.closest(".pq-native-select").length) {
					return true
				} else {
					evt.preventDefault()
				}
			}
		})
	};
	fn._onClickCell = function(evt) {
		var that = this,
			o = this.options,
			EM = o.editModel,
			$td = $(evt.currentTarget),
			__obj = that.getCellIndices({
				$td: $td
			}),
			_obj = this.iMerge.getRootCell(__obj.rowIndx, __obj.colIndx, "o"),
			objP = this.normalize(_obj),
			rowIndx = objP.rowIndx,
			colIndx = objP.colIndx;
		objP.$td = $td;
		objP.evt = evt;
		if (that._trigger("cellClick", evt, objP) == false) {
			return false
		}
		if (colIndx == null || colIndx < 0) {
			return
		}
		if (EM.clicksToEdit == 1 && this.isEditableRow({
				rowIndx: rowIndx
			}) && this.isEditableCell({
				colIndx: colIndx,
				rowIndx: rowIndx
			})) {
			that.editCell(objP)
		}
	};
	fn._onRightClickCell = function(evt) {
		var $td = $(evt.currentTarget);
		var objP = this.getCellIndices({
			$td: $td
		});
		var that = this,
			rowIndxPage = objP.rowIndxPage,
			offset = this.rowIndxOffset,
			rowIndx = rowIndxPage + offset,
			colIndx = objP.colIndx,
			CM = this.colModel,
			options = this.options,
			DM = options.DM;
		if (colIndx == null) {
			return
		}
		var column = CM[colIndx],
			dataIndx = column.dataIndx;
		if (this._trigger("cellRightClick", evt, {
				$td: $td,
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				colIndx: colIndx,
				dataIndx: dataIndx,
				column: column,
				rowData: that.pdata[rowIndxPage]
			}) == false) {
			return false
		}
	};
	fn.highlightCell = function($td) {
		$td.addClass("pq-grid-cell-hover ui-state-hover")
	};
	fn.unHighlightCell = function($td) {
		$td.removeClass("pq-grid-cell-hover ui-state-hover")
	};
	fn.highlightRow = function(varr) {
		if (isNaN(varr)) {} else {
			var $tr = this.getRow({
				rowIndxPage: varr
			});
			if ($tr) {
				$tr.addClass("pq-grid-row-hover ui-state-hover")
			}
		}
	};
	fn.unHighlightRow = function(varr) {
		if (isNaN(varr)) {} else {
			var $tr = this.getRow({
				rowIndxPage: varr
			});
			if ($tr) {
				$tr.removeClass("pq-grid-row-hover ui-state-hover")
			}
		}
	};
	fn._getCreateEventData = function() {
		return {
			dataModel: this.options.dataModel,
			data: this.pdata,
			colModel: this.options.colModel
		}
	};
	fn._findCellFromEvt = function(evt) {
		var $targ = $(evt.target);
		var $td = $targ.closest(".pq-grid-cell");
		if ($td == null || $td.length == 0) {
			return {
				rowIndxPage: null,
				colIndx: null,
				$td: null
			}
		} else {
			var obj = this.getCellIndices({
				$td: $td
			});
			obj.$td = $td;
			return obj
		}
	};
	fn._initPager = function() {
		var that = this,
			o = that.options,
			PM = o.pageModel;
		if (PM.type) {
			var obj2 = {
				bootstrap: o.bootstrap,
				change: function(evt, ui) {
					that.blurEditor({
						force: true
					});
					var DM = that.options.pageModel;
					if (ui.curPage != undefined) {
						DM.prevPage = DM.curPage;
						DM.curPage = ui.curPage
					}
					if (ui.rPP != undefined) {
						DM.rPP = ui.rPP
					}
					if (DM.type == "remote") {
						that.remoteRequest({
							callback: function() {
								that._onDataAvailable({
									apply: true,
									header: false
								})
							}
						})
					} else {
						that.refreshView({
							header: false,
							source: "pager"
						})
					}
				},
				refresh: function(evt) {
					that.refreshDataAndView()
				}
			};
			obj2 = $.extend(obj2, PM);
			this.pagerW = pq.pager(PM.appendTo ? PM.appendTo : this.$footer, obj2)
		} else {}
	};
	fn.generateLoading = function() {
		if (this.$loading) {
			this.$loading.remove()
		}
		this.$loading = $("<div class='pq-loading'></div>").appendTo(this.element);
		$(["<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div>", this.options.strLoading, "...</div></div>"].join("")).appendTo(this.$loading);
		this.$loading.find("div.pq-loading-bg").css("opacity", .2)
	};
	fn._refreshLoadingString = function() {
		this.$loading.find("div.pq-loading-mask").children("div").html(this.options.strLoading)
	};
	fn.showLoading = function() {
		if (this.showLoadingCounter == null) {
			this.showLoadingCounter = 0
		}
		this.showLoadingCounter++;
		this.$loading.show()
	};
	fn.hideLoading = function() {
		if (this.showLoadingCounter > 0) {
			this.showLoadingCounter--
		}
		if (!this.showLoadingCounter) {
			this.$loading.hide()
		}
	};
	fn.refreshDataFromDataModel = function(obj) {
		obj = obj || {};
		var that = this,
			thisOptions = that.options,
			DM = thisOptions.dataModel,
			PM = thisOptions.pageModel,
			DMdata = DM.data,
			begIndx, endIndx, totalPages, totalRecords, paging = PM.type,
			rowIndxOffset, qTriggers = that._queueATriggers;
		for (var key in qTriggers) {
			var t = qTriggers[key];
			delete qTriggers[key];
			that._trigger(key, t.evt, t.ui)
		}
		that._trigger("beforeRefreshData", null, {});
		if (paging == "local") {
			totalRecords = PM.totalRecords = DMdata.length;
			PM.totalPages = totalPages = Math.ceil(totalRecords / PM.rPP);
			if (PM.curPage > totalPages) {
				PM.curPage = totalPages
			}
			if (totalPages && !PM.curPage) {
				PM.curPage = 1
			}
			begIndx = (PM.curPage - 1) * PM.rPP;
			begIndx = begIndx >= 0 ? begIndx : 0;
			endIndx = PM.curPage * PM.rPP;
			if (endIndx > DMdata.length) {
				endIndx = DMdata.length
			}
			that.pdata = DMdata.slice(begIndx, endIndx);
			rowIndxOffset = begIndx
		} else {
			if (paging == "remote") {
				PM.totalPages = totalPages = Math.ceil(PM.totalRecords / PM.rPP);
				if (PM.curPage > totalPages) {
					PM.curPage = totalPages
				}
				if (totalPages && !PM.curPage) {
					PM.curPage = 1
				}
				var endIndx = PM.rPP;
				if (endIndx > DMdata.length) {
					endIndx = DMdata.length
				}
				that.pdata = DMdata.slice(0, endIndx);
				rowIndxOffset = PM.rPP * (PM.curPage - 1)
			} else {
				if (thisOptions.backwardCompat) {
					that.pdata = DMdata.slice(0)
				} else {
					that.pdata = DMdata
				}
			}
		}
		that.rowIndxOffset = rowIndxOffset >= 0 ? rowIndxOffset : 0;
		that._trigger("dataReady", null, {
			source: obj.source
		})
	};
	fn.getQueryStringCRUD = function() {
		return ""
	};
	fn.remoteRequest = function(objP) {
		if (this.loading) {
			this.xhr.abort()
		}
		objP = objP || {};
		var that = this,
			url = "",
			dataURL = "",
			o = this.options,
			raiseFilterEvent = false,
			thisColModel = this.colModel,
			DM = o.dataModel,
			SM = o.sortModel,
			FM = o.filterModel,
			PM = o.pageModel;
		if (typeof DM.getUrl == "function") {
			var objk = {
				colModel: thisColModel,
				dataModel: DM,
				sortModel: SM,
				groupModel: o.groupModel,
				pageModel: PM,
				filterModel: FM
			};
			var objURL = DM.getUrl.call(this, objk);
			if (objURL && objURL.url) {
				url = objURL.url
			}
			if (objURL && objURL.data) {
				dataURL = objURL.data
			}
		} else {
			if (typeof DM.url == "string") {
				url = DM.url;
				var sortQueryString = {},
					filterQueryString = {},
					pageQueryString = {};
				if (SM.type == "remote") {
					if (!objP.initBySort) {
						this.sort({
							initByRemote: true
						})
					}
					var sortingQS = this.iSort.getQueryStringSort();
					if (sortingQS) {
						sortQueryString = {
							pq_sort: sortingQS
						}
					}
				}
				if (PM.type == "remote") {
					pageQueryString = {
						pq_curpage: PM.curPage,
						pq_rpp: PM.rPP
					}
				}
				var filterQS;
				if (FM.type != "local") {
					filterQS = this.iFilterData.getQueryStringFilter();
					if (filterQS) {
						raiseFilterEvent = true;
						filterQueryString = {
							pq_filter: filterQS
						}
					}
				}
				var postData = DM.postData,
					postDataOnce = DM.postDataOnce;
				if (postData && typeof postData == "function") {
					postData = postData.call(this, {
						colModel: thisColModel,
						dataModel: DM
					})
				}
				dataURL = $.extend({
					pq_datatype: DM.dataType
				}, filterQueryString, pageQueryString, sortQueryString, postData, postDataOnce)
			}
		}
		if (!url) {
			return
		}
		this.loading = true;
		this.showLoading();
		this.xhr = $.ajax({
			url: url,
			dataType: DM.dataType,
			async: DM.async == null ? true : DM.async,
			cache: DM.cache,
			contentType: DM.contentType,
			type: DM.method,
			data: dataURL,
			beforeSend: function(jqXHR, settings) {
				if (typeof DM.beforeSend == "function") {
					return DM.beforeSend.call(that, jqXHR, settings)
				}
			},
			success: function(responseObj, textStatus, jqXHR) {
				that.onRemoteSuccess(responseObj, textStatus, jqXHR, raiseFilterEvent, objP)
			},
			error: function(jqXHR, textStatus, errorThrown) {
				that.hideLoading();
				that.loading = false;
				if (typeof DM.error == "function") {
					DM.error.call(that, jqXHR, textStatus, errorThrown)
				} else {
					if (errorThrown != "abort") {
						throw "Error : " + errorThrown
					}
				}
			}
		})
	};
	fn.onRemoteSuccess = function(response, textStatus, jqXHR, raiseFilterEvent, objP) {
		var that = this,
			o = that.options,
			retObj, CM = that.colModel,
			PM = o.pageModel,
			DM = o.dataModel;
		if (typeof DM.getData == "function") {
			retObj = DM.getData.call(that, response, textStatus, jqXHR)
		} else {
			retObj = response
		}
		DM.data = retObj.data;
		if (PM.type == "remote") {
			if (retObj.curPage != null) {
				PM.curPage = retObj.curPage
			}
			if (retObj.totalRecords != null) {
				PM.totalRecords = retObj.totalRecords
			}
		}
		that.hideLoading();
		that.loading = false;
		that._trigger("load", null, {
			dataModel: DM,
			colModel: CM
		});
		if (raiseFilterEvent) {
			that._queueATriggers.filter = {
				ui: {}
			}
		}
		if (objP.callback) {
			objP.callback()
		}
	};
	fn._refreshTitle = function() {
		this.$title.html(this.options.title)
	};
	fn._destroyDraggable = function() {
		var ele = this.element;
		var $parent = ele.parent(".pq-wrapper");
		if ($parent.length && $parent.data("draggable")) {
			$parent.draggable("destroy");
			this.$title.removeClass("pq-draggable pq-no-capture");
			ele.unwrap(".pq-wrapper")
		}
	};
	fn._refreshDraggable = function() {
		var o = this.options,
			ele = this.element,
			$title = this.$title;
		if (o.draggable) {
			$title.addClass("pq-draggable pq-no-capture");
			var $wrap = ele.parent(".pq-wrapper");
			if (!$wrap.length) {
				ele.wrap("<div class='pq-wrapper' />")
			}
			ele.parent(".pq-wrapper").draggable({
				handle: $title
			})
		} else {
			this._destroyDraggable()
		}
	};
	fn._refreshResizable = function() {
		var that = this,
			$ele = this.element,
			o = this.options,
			widthPercent = (o.width + "").indexOf("%") > -1,
			heightPercent = (o.height + "").indexOf("%") > -1,
			autoWidth = o.width == "auto",
			flexWidth = o.width == "flex",
			flexHeight = o.height == "flex";
		if (o.resizable && (!(flexHeight || heightPercent) || !(flexWidth || widthPercent || autoWidth))) {
			var handles = "e,s,se";
			if (flexHeight || heightPercent) {
				handles = "e"
			} else {
				if (flexWidth || widthPercent || autoWidth) {
					handles = "s"
				}
			}
			var initReq = true;
			if ($ele.hasClass("ui-resizable")) {
				var handles2 = $ele.resizable("option", "handles");
				if (handles == handles2) {
					initReq = false
				} else {
					this._destroyResizable()
				}
			}
			if (initReq) {
				$ele.resizable({
					helper: "ui-state-default",
					handles: handles,
					minWidth: o.minWidth,
					minHeight: o.minHeight ? o.minHeight : 100,
					delay: 0,
					start: function(evt, ui) {
						$(ui.helper).css({
							opacity: .5,
							background: "#ccc",
							border: "1px solid steelblue"
						})
					},
					resize: function(evt, ui) {},
					stop: function(evt, ui) {
						var $ele = that.element,
							ele = $ele[0],
							width = o.width,
							height = o.height,
							widthPercent = (width + "").indexOf("%") > -1,
							heightPercent = (height + "").indexOf("%") > -1,
							autoWidth = width == "auto",
							flexWidth = width == "flex",
							flexHeight = height == "flex",
							refreshRQ = false;
						ele.style.width = ele.offsetWidth + 3 + "px";
						ele.style.height = ele.offsetHeight + 3 + "px";
						if (!heightPercent && !flexHeight) {
							refreshRQ = true;
							o.height = ele.offsetHeight
						}
						if (!widthPercent && !autoWidth && !flexWidth) {
							refreshRQ = true;
							o.width = ele.offsetWidth
						}
						that.refresh();
						$ele.css("position", "relative");
						if (refreshRQ) {
							$(window).trigger("resize")
						}
					}
				})
			}
		} else {
			this._destroyResizable()
		}
	};
	fn._refreshAfterResize = function() {
		var o = this.options;
		var wd = o.width,
			ht = o.height,
			widthPercent = (wd + "").indexOf("%") != -1 ? true : false,
			autoWidth = wd === "auto",
			heightPercent = (ht + "").indexOf("%") != -1 ? true : false;
		if (widthPercent || autoWidth || heightPercent) {
			this.refresh()
		}
	};
	fn.refresh = function(objP) {
		this.iRefresh.refresh(objP)
	};
	fn.refreshView = function(obj) {
		if (this.options.editModel.indices != null) {
			this.blurEditor({
				force: true
			})
		}
		this.refreshDataFromDataModel(obj);
		this.refresh(obj)
	};
	fn._refreshPager = function() {
		var options = this.options,
			PM = options.pageModel,
			paging = PM.type ? true : false,
			rPP = PM.rPP,
			totalRecords = PM.totalRecords;
		if (paging) {
			var obj = options.pageModel;
			if (!this.pagerW) {
				this._initPager()
			}
			this.pagerW.option(obj);
			if (totalRecords > rPP) {
				this.$bottom.css("display", "")
			} else {
				if (!options.showBottom) {
					this.$bottom.css("display", "none")
				}
			}
		} else {
			if (this.pagerW) {
				this.pagerW.destroy();
				this.pagerW = null
			}
			if (options.showBottom) {
				this.$bottom.css("display", "")
			} else {
				this.$bottom.css("display", "none")
			}
		}
	};
	fn.getInstance = function() {
		return {
			grid: this
		}
	};
	fn.refreshDataAndView = function(objP) {
		var DM = this.options.dataModel;
		if (DM.location == "remote") {
			var self = this;
			this.remoteRequest({
				callback: function() {
					self._onDataAvailable(objP)
				}
			})
		} else {
			this._onDataAvailable(objP)
		}
	};
	fn.getColIndx = function(ui) {
		var dataIndx = ui.dataIndx,
			column = ui.column,
			colIndx, searchByColumn, searchByDI;
		if (column) {
			searchByColumn = true
		} else {
			if (dataIndx !== undefined) {
				searchByDI = true;
			} else {
				throw "dataIndx / column NA"
			}
		}
		var CM = this.colModel,
			len = CM.length;
		if (searchByColumn) {
			for (var i = 0; i < len; i++) {
				if (CM[i] == column) {
					return i
				}
			}
		} else {
			colIndx = this.colIndxs[dataIndx];
			if (colIndx != null) {
				return colIndx
			}
		}
		return -1
	};
	fn.getColumn = function(obj) {
		if (obj.dataIndx == null) {
			throw "dataIndx N/A"
		}
		return this.columns[obj.dataIndx]
	};
	fn._generateCellRowOutline = function() {
		var o = this.options,
			EM = o.editModel;
		if (this.$div_focus) {
			if (o.debug) {
				throw "this.$div_focus already present assert failed"
			}
			return
		} else {
			var $parent = this.element;
			if (EM.inline) {
				$parent = this.getCell(EM.indices);
				$parent.css("padding", 0).empty()
			}
			this.$div_focus = $(["<div class='pq-editor-outer'>", "<div class='pq-editor-inner'>", "</div>", "</div>"].join("")).appendTo($parent)
		}
		var obj = $.extend({
			all: true
		}, EM.indices);
		var $td = this.getCell(obj);
		$td.css("height", $td[0].offsetHeight);
		$td.empty();
		this.refreshEditorPos()
	};
	fn._removeEditOutline = function(objP) {
		function destroyDatePicker($editor) {
			if ($editor.hasClass("hasDatepicker")) {
				$editor.datepicker("hide").datepicker("destroy")
			}
		}
		if (this.$div_focus) {
			var $editor = this.$div_focus.find(".pq-editor-focus");
			destroyDatePicker($editor);
			if ($editor[0] == document.activeElement) {
				var prevBlurEditMode = this._blurEditMode;
				this._blurEditMode = true;
				$editor.blur();
				this._blurEditMode = prevBlurEditMode
			}
			this.$div_focus.remove();
			delete this.$div_focus;
			var EM = this.options.editModel;
			var obj = $.extend({}, EM.indices);
			EM.indices = null;
			obj.rowData = undefined;
			this.refreshCell(obj)
		}
	};
	fn.refreshEditorPos = function() {
		var o = this.options,
			EM = o.editModel,
			cellBW = EM.cellBorderWidth,
			$div_focus = this.$div_focus,
			$td = this.getCell(EM.indices);
		if (!$td || !$td.length) {
			return false
		}
		var wd = $td[0].offsetWidth,
			ht = $td[0].offsetHeight,
			offset = this.element.offset(),
			tdOffset = $td.offset(),
			lft = tdOffset.left - offset.left - 1,
			top = tdOffset.top - offset.top - 1;
		$div_focus.css({
			height: ht,
			width: wd - 1,
			borderWidth: cellBW,
			left: lft,
			top: top
		})
	};
	fn.setEditorPosTimer = function() {
		var that = this,
			widthParent, o = this.options;
		if (this._refreshEditorPosTimer) {
			window.clearInterval(this._refreshEditorPosTimer);
			this._refreshEditorPosTimer = null
		}
		this._refreshEditorPosTimer = window.setInterval(function() {
			var EM = o.editModel;
			if (EM.indices) {
				that.refreshEditorPos()
			}
		}, 200)
	};
	fn.get$Tbl = function(rowIndxPage, colIndx) {
		var $tbl = this.$tbl,
			tbl = [];
		if (!$tbl || !$tbl.length) {
			return
		}
		var pqpanes = this.pqpanes,
			o = this.options,
			fr = o.freezeRows,
			fc = o.freezeCols;
		if (pqpanes.h && pqpanes.v) {
			if (colIndx == null) {
				if (rowIndxPage >= fr) {
					tbl.push($tbl[2], $tbl[3])
				} else {
					tbl.push($tbl[0], $tbl[1])
				}
			} else {
				if (colIndx >= fc && rowIndxPage >= fr) {
					tbl = $tbl[3]
				} else {
					if (colIndx < fc && rowIndxPage >= fr) {
						tbl = $tbl[2]
					} else {
						if (colIndx >= fc && rowIndxPage < fr) {
							tbl = $tbl[1]
						} else {
							tbl = $tbl[0]
						}
					}
				}
			}
		} else {
			if (pqpanes.v) {
				if (colIndx == null) {
					tbl = $tbl
				} else {
					if (colIndx >= fc) {
						tbl = $tbl[1]
					} else {
						tbl = $tbl[0]
					}
				}
			} else {
				if (pqpanes.h) {
					if (rowIndxPage >= fr) {
						tbl = $tbl[1]
					} else {
						tbl = $tbl[0]
					}
				} else {
					tbl = $tbl[0]
				}
			}
		}
		if (tbl) {
			return $(tbl)
		}
	};
	fn.scrollCell = function(obj) {
		this.scrollRow(obj);
		this.scrollColumn(obj)
	};
	fn.scrollY = function(curPos) {
		this.vscroll.option("cur_pos", curPos);
		this.vscroll.scroll()
	};
	fn.scrollRow = function(obj) {
		var o = this.options,
			obj = this.normalize(obj),
			rip = obj.rowIndxPage,
			rd = obj.rowData;
		if (!this.pdata || rip >= this.pdata.length) {
			return false
		}
		if (!rd || rd.pq_hidden) {
			return false
		}
		if (o.virtualY) {
			this._scrollRowVirtual(obj)
		} else {
			this.iMouseSelection.scrollRowNonVirtual(obj)
		}
	};
	fn._scrollRowVirtual = function(obj) {
		var o = this.options,
			rowIndxPage = obj.rowIndxPage,
			nested = this.iHierarchy ? true : false,
			rowIndx = obj.rowIndx,
			vscroll = this.vscroll,
			scrollCurPos = this.scrollCurPos,
			rowIndxPage = rowIndxPage == null ? rowIndx - this.rowIndxOffset : rowIndxPage,
			freezeRows = parseInt(o.freezeRows);
		if (rowIndxPage < freezeRows) {
			return
		}
		var calcCurPos = this._calcCurPosFromRowIndxPage(rowIndxPage);
		if (calcCurPos == null) {
			return
		}
		if (calcCurPos < scrollCurPos) {
			vscroll.option("cur_pos", calcCurPos);
			vscroll.scroll()
		}
		var $tbl = this.get$Tbl(rowIndxPage);
		if (!$tbl || !$tbl.length) {
			return null
		}
		var $trs = $tbl.children("tbody").children("tr[pq-row-indx=" + rowIndxPage + "]"),
			$tr = $trs.last(),
			$tr_first = $tr;
		if ($trs.length > 1) {
			$tr_first = $trs.first()
		}
		var tr = $tr[0],
			tbl_marginTop = parseInt($tbl.css("marginTop"));
		if (tr == undefined) {
			vscroll.option("cur_pos", calcCurPos);
			vscroll.scroll()
		} else {
			var td_bottom = tr.offsetTop + tr.offsetHeight,
				htCont = this.iRefresh.getEContHt(),
				marginTop = tbl_marginTop,
				htSB = this._getSBHeight(),
				$tr_prev = $tr_first.prev("tr");
			if ($tr_prev.hasClass("pq-row-hidden") || $tr_prev.hasClass("pq-last-frozen-row")) {
				return
			} else {
				if (td_bottom > htCont - marginTop) {
					var diff = td_bottom - (htCont - htSB - marginTop),
						$trs = $tbl.children().children("tr"),
						ht = 0,
						indx = 0,
						$tr_next;
					if (freezeRows) {
						$tr_next = $trs.filter("tr.pq-last-frozen-row").last().next();
						if ($tr_next.length == 0) {
							$tr_next = $trs.filter("tr.pq-row-hidden").next()
						}
					} else {
						$tr_next = $trs.filter("tr.pq-row-hidden").next()
					}
					do {
						if (!$tr_next.length) {
							break
						}
						ht += $tr_next[0].offsetHeight;
						if ($tr_next[0] == $tr[0]) {
							break
						} else {
							if (!nested || $tr_next.hasClass("pq-detail-child") == false) {
								indx++;
								if (ht >= diff) {
									break
								}
							} else {
								if (ht >= diff) {
									break
								}
							}
						}
						$tr_next = $tr_next.next()
					} while (1 === 1);
					var cur_pos = scrollCurPos + indx;
					if (cur_pos > calcCurPos) {
						cur_pos = calcCurPos
					}
					var num_eles = vscroll.option("num_eles");
					if (num_eles < cur_pos + 1) {
						num_eles = cur_pos + 1
					}
					vscroll.option({
						num_eles: num_eles,
						cur_pos: cur_pos
					});
					vscroll.scroll()
				}
			}
		}
	};
	fn.blurEditor = function(objP) {
		if (this.$div_focus) {
			var $editor = this.$div_focus.find(".pq-editor-focus");
			if (objP && objP.blurIfFocus) {
				if (document.activeElement == $editor[0]) {
					$editor.blur()
				}
			} else {
				return $editor.triggerHandler("blur", objP)
			}
		}
	};
	fn._scrollColumnVirtual = function(objP) {
		var colIndx = objP.colIndx,
			hscroll = this.hscroll,
			colIndx = colIndx == null ? this.colIndxs[objP.dataIndx] : colIndx,
			freezeCols = this.options.freezeCols;
		var td_right = this._calcRightEdgeCol(colIndx).width,
			contWd = this.iRefresh.getEContWd();
		if (td_right > contWd) {
			var diff = this.calcWidthCols(-1, colIndx + 1) - contWd,
				CM = this.colModel,
				CMLength = CM.length,
				wd = 0,
				initH = 0;
			for (var i = freezeCols; i < CMLength; i++) {
				var column = CM[i];
				if (!column.hidden) {
					wd += column.outerWidth
				}
				if (i == colIndx) {
					initH = i - freezeCols - this._calcNumHiddenUnFrozens(i);
					break
				} else {
					if (wd >= diff) {
						initH = i - freezeCols - this._calcNumHiddenUnFrozens(i) + 1;
						break
					}
				}
			}
			hscroll.option("cur_pos", initH);
			hscroll.scroll();
			return true
		} else {
			if (colIndx >= freezeCols && colIndx < this.initH) {
				var cur_pos = colIndx - freezeCols - this._calcNumHiddenUnFrozens(colIndx);
				hscroll.option("cur_pos", cur_pos);
				hscroll.scroll();
				return true
			}
		}
		return false
	};
	fn.scrollColumn = function(objP) {
		var o = this.options,
			virtualX = o.virtualX;
		if (o.width === "flex" && !o.maxWidth) {
			return false
		}
		if (virtualX) {
			return this._scrollColumnVirtual(objP)
		} else {
			return this.iMouseSelection.scrollColumnNonVirtual(objP)
		}
	};
	fn.selection = function(obj) {
		if (obj) {
			var method = obj.method,
				ret, type = obj.type;
			if (type == "row") {
				ret = this["iRows"][method](obj)
			} else {
				if (type == "cell") {
					ret = this["iCells"][method](obj)
				}
			}
			if (method == "add" || method == "remove" || method == "removeAll") {
				this.iSelection.dirty = true;
				this.iSelection._trigger()
			}
			return ret
		} else {
			var iSel = this.iSelection;
			if (iSel.isDirty()) {
				iSel.refresh()
			}
			return iSel
		}
	};
	fn.goToPage = function(obj) {
		var DM = this.options.pageModel;
		if (DM.type == "local" || DM.type == "remote") {
			var rowIndx = obj.rowIndx,
				rPP = DM.rPP,
				page = obj.page == null ? Math.ceil((rowIndx + 1) / rPP) : obj.page,
				curPage = DM.curPage;
			if (page != curPage) {
				DM.curPage = page;
				if (DM.type == "local") {
					this.refreshView()
				} else {
					this.refreshDataAndView()
				}
			}
		}
	};
	fn.setSelection = function(obj) {
		if (obj == null) {
			this.iSelection.removeAll();
			return true
		}
		var data = this.pdata;
		if (!data || !data.length) {
			return false
		}
		obj = this.normalize(obj);
		var rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			colIndx = obj.colIndx;
		if (obj.rowData && rowIndx == null) {
			var obj2 = this.getRowIndx(obj);
			obj.rowIndx = rowIndx = obj2.rowIndx;
			obj.rowIndxPage = rowIndxPage = obj2.rowIndxPage
		}
		if (rowIndx == null || rowIndx < 0 || colIndx < 0 || colIndx >= this.colModel.length) {
			return false
		}
		this.goToPage(obj);
		rowIndxPage = rowIndx - this.rowIndxOffset;
		this.scrollRow({
			rowIndxPage: rowIndxPage
		});
		if (colIndx == null) {
			this.range({
				r1: rowIndx
			}).select()
		} else {
			this.scrollColumn({
				colIndx: colIndx
			});
			this.range({
				r1: rowIndx,
				c1: colIndx
			}).select()
		}
		if (obj.focus !== false) {
			this.focus({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx == null ? this.getFirstVisibleCI() : colIndx
			})
		}
	};
	fn.getColModel = function() {
		return this.colModel
	};
	fn.saveEditCell = function(objP) {
		var o = this.options;
		var EM = o.editModel;
		if (!EM.indices) {
			return null
		}
		var obj = $.extend({}, EM.indices),
			evt = objP ? objP.evt : null,
			offset = this.rowIndxOffset,
			colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = rowIndxPage + offset,
			thisColModel = this.colModel,
			column = thisColModel[colIndx],
			dataIndx = column.dataIndx,
			pdata = this.pdata,
			rowData = pdata[rowIndxPage],
			DM = o.dataModel,
			oldVal;
		if (rowData == null) {
			return null
		}
		if (rowIndxPage != null) {
			var newVal = this.getEditCellData();
			if ($.isPlainObject(newVal)) {
				oldVal = {};
				for (var key in newVal) {
					oldVal[key] = rowData[key]
				}
			} else {
				oldVal = this.readCell(rowData, column)
			}
			if (newVal == "<br>") {
				newVal = ""
			}
			if (oldVal == null && newVal === "") {
				newVal = null
			}
			var objCell = {
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				dataIndx: dataIndx,
				column: column,
				newVal: newVal,
				value: newVal,
				oldVal: oldVal,
				rowData: rowData,
				dataModel: DM
			};
			if (this._trigger("cellBeforeSave", evt, objCell) === false) {
				return false
			}
			if (1 == 1) {
				var newRow = {},
					refresh = false;
				if ($.isPlainObject(newVal)) {
					newRow = newVal;
					refresh = true
				} else {
					newRow[dataIndx] = newVal
				}
				var ret = this.updateRow({
					row: newRow,
					rowIndx: rowIndx,
					refresh: refresh,
					silent: true,
					source: "edit",
					checkEditable: false
				});
				if (ret === false) {
					return false
				}
				this._trigger("cellSave", evt, objCell)
			}
			return true
		}
	};
	fn._addInvalid = function(ui) {};
	fn._digestData = function(ui) {
		if (this._trigger("beforeValidate", null, ui) === false) {
			return false
		}
		var that = this,
			options = that.options,
			EM = options.editModel,
			DM = options.dataModel,
			data = DM.data,
			CM = options.colModel,
			PM = options.pageModel,
			HM = options.historyModel,
			validate = ui.validate,
			validate = validate == null ? EM.validate : validate,
			remotePaging = PM.type == "remote",
			allowInvalid = ui.allowInvalid,
			allowInvalid = allowInvalid == null ? EM.allowInvalid : allowInvalid,
			TM = options.trackModel,
			track = ui.track,
			track = track == null ? options.track == null ? TM.on : options.track : track,
			history = ui.history,
			history = history == null ? HM.on : history,
			iHistory = this.iHistory,
			iUCData = this.iUCData,
			checkEditable = ui.checkEditable,
			checkEditable = checkEditable == null ? true : checkEditable,
			checkEditableAdd = ui.checkEditableAdd,
			checkEditableAdd = checkEditableAdd == null ? checkEditable : checkEditableAdd,
			saveCell = this.saveCell,
			columns = this.columns,
			colIndxs = this.colIndxs,
			source = ui.source,
			offset = this.rowIndxOffset,
			getValueFromDataType = that.getValueFromDataType,
			rowList = ui.rowList,
			rowListLen = rowList.length;
		if (!data) {
			data = options.dataModel.data = []
		}
		var rowListFinal = [];
		for (var i = 0; i < rowListLen; i++) {
			var rowListObj = rowList[i],
				newRow = rowListObj.newRow,
				rowData = rowListObj.rowData,
				type = rowListObj.type,
				rowCheckEditable = rowListObj.checkEditable,
				rowIndx = rowListObj.rowIndx,
				oldRow = rowListObj.oldRow;
			if (rowCheckEditable == null) {
				if (type == "update") {
					rowCheckEditable = checkEditable
				} else {
					if (type == "add") {
						rowCheckEditable = checkEditableAdd
					}
				}
			}
			if (type == "update") {
				if (!oldRow) {
					throw "oldRow required while update"
				}
				if (rowCheckEditable && options.editable !== true && that.isEditableRow({
						rowIndx: rowIndx,
						rowData: rowData
					}) === false) {
					continue
				}
			} else {
				if (type == "delete") {
					rowListFinal.push(rowListObj);
					continue
				}
			}
			if (type == "add") {
				for (var j = 0, lenj = CM.length; j < lenj; j++) {
					var column = CM[j],
						dataIndx = column.dataIndx;
					newRow[dataIndx] = newRow[dataIndx]
				}
			}
			for (var dataIndx in newRow) {
				var column = columns[dataIndx],
					colIndx = colIndxs[dataIndx];
				if (column) {
					if (rowCheckEditable && column.editable != null && that.isEditableCell({
							rowIndx: rowIndx,
							colIndx: colIndx,
							dataIndx: dataIndx
						}) === false) {
						delete newRow[dataIndx];
						oldRow && delete oldRow[dataIndx];
						continue
					}
					var dataType = column.dataType,
						newVal = getValueFromDataType(newRow[dataIndx], dataType),
						oldVal = oldRow ? oldRow[dataIndx] : undefined,
						oldVal = oldVal !== undefined ? getValueFromDataType(oldVal, dataType) : undefined;
					newRow[dataIndx] = newVal;
					if (validate && column.validations) {
						if (source == "edit" && allowInvalid === false) {
							var objRet = this.isValid({
								focusInvalid: true,
								dataIndx: dataIndx,
								rowIndx: rowIndx,
								value: newVal
							});
							if (objRet.valid == false && !objRet.warn) {
								return false
							}
						} else {
							var wRow = type == "add" ? newRow : rowData,
								objRet = this.iIsValid.isValidCell({
									column: column,
									rowData: wRow,
									allowInvalid: allowInvalid,
									value: newVal
								});
							if (objRet.valid === false) {
								if (allowInvalid === false && !objRet.warn) {
									delete newRow[dataIndx]
								}
							}
						}
					}
					if (type == "update" && newVal === oldVal) {
						delete newRow[dataIndx];
						if (oldRow) {
							delete oldRow[dataIndx]
						}
						continue
					}
				}
			}
			if (newRow) {
				if (type == "update") {
					for (var dataIndx in newRow) {
						rowListFinal.push(rowListObj);
						break
					}
				} else {
					rowListFinal.push(rowListObj)
				}
			}
		}
		rowList = ui.rowList = rowListFinal;
		rowListLen = rowList.length;
		if (!rowListLen) {
			if (source == "edit") {
				return null
			}
			return false
		}
		if (history) {
			iHistory.increment();
			iHistory.push({
				rowList: rowList
			})
		}
		for (var i = 0; i < rowListLen; i++) {
			var rowListObj = rowList[i],
				type = rowListObj.type,
				newRow = rowListObj.newRow,
				rowIndx = rowListObj.rowIndx,
				rowIndxPage = rowListObj.rowIndxPage,
				rowData = rowListObj.rowData;
			if (type == "update") {
				if (track) {
					iUCData.update({
						rowData: rowData,
						row: newRow,
						refresh: false
					})
				}
				for (var dataIndx in newRow) {
					var column = columns[dataIndx],
						newVal = newRow[dataIndx];
					saveCell(rowData, column, newVal)
				}
			} else {
				if (type == "add") {
					if (track) {
						iUCData.add({
							rowData: newRow
						})
					}
					if (rowIndx == null && rowIndxPage == null) {
						data.push(newRow)
					} else {
						var rowIndxPage = rowIndx - offset,
							indx = remotePaging ? rowIndxPage : rowIndx;
						data.splice(indx, 0, newRow)
					}
					if (remotePaging) {
						PM.totalRecords++
					}
				} else {
					if (type == "delete") {
						var rowIndxObj = that.getRowIndx({
								rowData: rowData,
								dataUF: true
							}),
							uf = rowIndxObj.uf,
							rowIndx = rowIndxObj.rowIndx;
						if (track) {
							iUCData["delete"]({
								rowIndx: rowIndx,
								rowData: rowData
							})
						}
						var rowIndxPage = rowIndx - offset,
							indx = remotePaging ? rowIndxPage : rowIndx;
						if (uf) {
							DM.dataUF.splice(rowIndx, 1)
						} else {
							var remArr = data.splice(indx, 1);
							if (remArr && remArr.length && remotePaging) {
								PM.totalRecords--
							}
						}
					}
				}
			}
		}
		that._trigger("change", null, ui);
		return true
	};
	fn.refreshColumn = function(ui) {
		var obj = this.normalize(ui);
		var initV = this.initV,
			finalV = this.finalV,
			freezeRows = this.options.freezeRows,
			colIndx = obj.colIndx,
			dataIndx = obj.dataIndx,
			column = obj.column;
		obj.skip = true;
		for (var rip = 0; rip <= finalV; rip++) {
			if (rip < initV && rip >= freezeRows) {
				rip = initV
			}
			obj.rowIndxPage = rip;
			this.refreshCell(obj)
		}
		this._trigger("refreshColumn", null, {
			column: column,
			colIndx: colIndx,
			dataIndx: dataIndx
		});
		this.iRefresh.softRefresh()
	};
	fn.refreshCell = function(ui) {
		var obj = this.normalize(ui);
		if (!this.pdata) {
			return
		}
		var skip = obj.skip,
			ri = obj.rowIndx,
			rip = obj.rowIndxPage,
			ci = obj.colIndx,
			iM = this.iMerge,
			rowData = obj.rowData;
		if (!rowData) {
			return
		}
		var $td = this.getCell({
			all: true,
			rowIndxPage: rip,
			colIndx: ci
		});
		if ($td && $td.length > 0) {
			var objRender = obj;
			if (iM.ismergedCell(ri, ci)) {
				objRender = iM.getRootCell(ri, ci, "a")
			}
			var tdStr = this.iGenerateView.renderCell(objRender),
				_fe;
			if (!tdStr) {
				return
			}
			$td.replaceWith(tdStr);
			if ((_fe = this._focusElement) && _fe.rowIndxPage == rip) {
				this.focus()
			}
			if (!skip) {
				this._trigger("refreshCell", null, obj);
				this.iRefresh.softRefresh()
			}
		}
	};
	fn.refreshRow = function(_obj) {
		var obj = this.normalize(_obj);
		if (!this.pdata) {
			return
		}
		var that = this,
			ri = obj.rowIndx,
			rip = obj.rowIndxPage,
			o = that.options,
			freezeRows = o.freezeRows,
			rowData = obj.rowData;
		if (!rowData || rowData.pq_hidden || rip > that.finalV || rip < that.initV && rip >= freezeRows) {
			return null
		}
		var $trOld = this.getRow({
				all: true,
				rowIndxPage: rip
			}),
			_fe, buffer = [];
		that.iGenerateView.refreshRow(rip, buffer);
		var trStr = buffer.join("");
		if ($trOld && $trOld.length) {
			$trOld.replaceWith(trStr)
		} else {
			if (o.virtualY) {
				if (rip == that.finalV) {
					that.$tbl.append(trStr)
				} else {
					if (rip == that.initV) {
						var $tbls = that.$tbl;
						for (var i = 0; i < $tbls.length; i++) {
							$($tbls[i]).children("tbody").children(freezeRows ? ".pq-last-frozen-row" : "tr:first").after(trStr)
						}
					} else {
						throw "refreshRow > rip not found"
					}
				}
			} else {
				return false
			}
		}
		if ((_fe = this._focusElement) && _fe.rowIndxPage == rip) {
			that.focus()
		}
		this._trigger("refreshRow", null, {
			rowData: rowData,
			rowIndx: ri,
			rowIndxPage: rip
		});
		if (obj.refresh !== false) {
			this.iRefresh.softRefresh()
		}
		return true
	};
	fn.quitEditMode = function(objP) {
		if (this._quitEditMode) {
			return
		}
		var that = this,
			old = false,
			silent = false,
			fireOnly = false,
			o = this.options,
			EM = o.editModel,
			EMIndices = EM.indices,
			evt = undefined;
		that._quitEditMode = true;
		if (objP) {
			old = objP.old;
			silent = objP.silent;
			fireOnly = objP.fireOnly;
			evt = objP.evt
		}
		if (EMIndices) {
			if (!silent && !old) {
				this._trigger("editorEnd", evt, EMIndices)
			}
			if (!fireOnly) {
				this._removeEditOutline(objP);
				EM.indices = null
			}
		}
		that._quitEditMode = null
	};
	fn.getViewPortRowsIndx = function() {
		return {
			beginIndx: this.initV,
			endIndx: this.finalV
		}
	};
	fn.getViewPortIndx = function() {
		return {
			initV: this.initV,
			finalV: this.finalV,
			initH: this.initH,
			finalH: this.finalH
		}
	};
	fn.getRowIndxOffset = function() {
		return this.rowIndxOffset
	};
	fn.getEditCell = function() {
		var EM = this.options.editModel;
		if (EM.indices) {
			var $td = this.getCell(EM.indices),
				$cell = this.$div_focus.children(".pq-editor-inner"),
				$editor = $cell.find(".pq-editor-focus");
			return {
				$td: $td,
				$cell: $cell,
				$editor: $editor
			}
		} else {
			return {}
		}
	};
	fn.editCell = function(ui) {
		var obj = this.normalize(ui);
		var iM = this.iMerge,
			ri = obj.rowIndx,
			ci = obj.colIndx;
		if (iM.ismergedCell(ri, ci)) {
			var obj2 = iM.getRootCell(ri, ci, "o");
			if (obj2.rowIndx != obj.rowIndx || obj2.colIndx != obj.colIndx) {
				return false
			}
		}
		this.scrollRow(obj);
		this.scrollColumn(obj);
		var $td = this.getCell(obj);
		if ($td && $td.length) {
			return this._editCell(obj)
		}
	};
	fn.getFirstEditableColIndx = function(objP) {
		if (objP.rowIndx == null) {
			throw "rowIndx NA"
		}
		if (!this.isEditableRow(objP)) {
			return -1
		}
		var CM = this.colModel;
		for (var i = 0; i < CM.length; i++) {
			objP.colIndx = i;
			if (!this.isEditableCell(objP)) {
				continue
			} else {
				if (CM[i].hidden) {
					continue
				}
			}
			return i
		}
		return -1
	};
	fn.editFirstCellInRow = function(objP) {
		var that = this,
			offset = this.rowIndxOffset,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			rowIndx = rowIndx == null ? rowIndxPage + offset : rowIndx,
			rowIndxPage = rowIndxPage == null ? rowIndx - offset : rowIndxPage,
			colIndx = this.getFirstEditableColIndx({
				rowIndx: rowIndx
			});
		if (colIndx != -1) {
			this.editCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			})
		}
	};
	fn._editCell = function(_objP) {
		var objP = this.normalize(_objP);
		var that = this,
			evt = objP.evt,
			rip = objP.rowIndxPage,
			ci = objP.colIndx,
			pdata = that.pdata;
		if (!pdata || rip >= pdata.length) {
			return false
		}
		var o = this.options,
			EM = o.editModel,
			rowData = pdata[rip],
			rowIndx = objP.rowIndx,
			CM = this.colModel,
			column = CM[ci],
			dataIndx = column.dataIndx,
			cellData = that.readCell(rowData, column),
			objCall = {
				rowIndx: rowIndx,
				rowIndxPage: rip,
				cellData: cellData,
				rowData: rowData,
				dataIndx: dataIndx,
				colIndx: ci,
				column: column
			},
			ceditor = column.editor,
			grid = this,
			ceditor = typeof ceditor == "function" ? ceditor.call(grid, objCall) : ceditor;
		if (ceditor === undefined && typeof o.geditor == "function") {
			ceditor = o.geditor.call(grid, objCall)
		}
		if (ceditor === false) {
			return
		}
		if (ceditor && ceditor.getData) {
			EM._getData = ceditor.getData
		}
		var geditor = o.editor,
			editor = ceditor ? $.extend({}, geditor, ceditor) : geditor,
			contentEditable = false;
		if (EM.indices) {
			var indxOld = EM.indices;
			if (indxOld.rowIndxPage == rip && indxOld.colIndx == ci) {
				this.refreshEditorPos();
				var $focus = this.$div_focus.find(".pq-editor-focus");
				window.setTimeout(function() {
					$focus.focus()
				}, 0);
				return false
			} else {
				if (this.blurEditor({
						evt: evt
					}) === false) {
					return false
				}
				this.quitEditMode({
					evt: evt
				})
			}
		}
		EM.indices = {
			rowIndxPage: rip,
			rowIndx: rowIndx,
			colIndx: ci,
			column: column,
			dataIndx: dataIndx
		};
		this._generateCellRowOutline();
		var $div_focus = this.$div_focus,
			$cell = $div_focus.children(".pq-editor-inner");
		if (column.align == "right") {
			$cell.addClass("pq-align-right")
		} else {
			if (column.align == "center") {
				$cell.addClass("pq-align-center")
			} else {
				$cell.addClass("pq-align-left")
			}
		}
		objCall.$cell = $cell;
		var inp, edtype = editor.type,
			edSelect = objP.select == null ? editor.select : objP.select,
			edInit = editor.init,
			ed_valueIndx = editor.valueIndx,
			ed_dataMap = editor.dataMap,
			ed_mapIndices = editor.mapIndices,
			ed_mapIndices = ed_mapIndices ? ed_mapIndices : {},
			edcls = editor.cls || "",
			edcls = typeof edcls === "function" ? edcls.call(grid, objCall) : edcls,
			cls = "pq-editor-focus " + edcls,
			cls2 = cls + " pq-cell-editor ",
			attr = editor.attr || "",
			attr = typeof attr === "function" ? attr.call(grid, objCall) : attr,
			edstyle = editor.style || "",
			edstyle = typeof edstyle === "function" ? edstyle.call(grid, objCall) : edstyle,
			styleCE = edstyle ? "style='" + edstyle + "'" : "",
			style = styleCE,
			styleChk = styleCE;
		objCall.cls = cls;
		objCall.attr = attr;
		if (typeof edtype == "function") {
			inp = edtype.call(grid, objCall);
			if (inp) {
				edtype = inp
			}
		}
		geditor._type = edtype;
		if (edtype == "checkbox") {
			var subtype = editor.subtype;
			var checked = cellData ? "checked='checked'" : "";
			inp = "<input " + checked + " class='" + cls2 + "' " + attr + " " + styleChk + " type=checkbox name='" + dataIndx + "' />";
			$cell.html(inp);
			var $ele = $cell.children("input");
			if (subtype == "triple") {
				$ele.pqval({
					val: cellData
				});
				$cell.click(function(evt) {
					$(this).children("input").pqval({
						incr: true
					})
				})
			}
		} else {
			if (edtype == "textarea" || edtype == "select" || edtype == "textbox") {
				if (edtype == "textarea") {
					inp = "<textarea class='" + cls2 + "' " + attr + " " + style + " name='" + dataIndx + "' ></textarea>"
				} else {
					if (edtype == "select") {
						var options = editor.options || [];
						if (typeof options === "function") {
							options = options.call(grid, objCall)
						}
						var attrSelect = [attr, " class='", cls2, "' ", style, " name='", dataIndx, "'"].join("");
						inp = _pq.select({
							options: options,
							attr: attrSelect,
							prepend: editor.prepend,
							labelIndx: editor.labelIndx,
							valueIndx: ed_valueIndx,
							groupIndx: editor.groupIndx,
							dataMap: ed_dataMap
						})
					} else {
						inp = "<input class='" + cls2 + "' " + attr + " " + style + " type=text name='" + dataIndx + "' />"
					}
				}
				$(inp).appendTo($cell).val(edtype == "select" && ed_valueIndx != null && (ed_mapIndices[ed_valueIndx] || this.columns[ed_valueIndx]) ? ed_mapIndices[ed_valueIndx] ? rowData[ed_mapIndices[ed_valueIndx]] : rowData[ed_valueIndx] : cellData)
			} else {
				if (!edtype || edtype == "contenteditable") {
					inp = "<div contenteditable='true' tabindx='0' " + styleCE + " " + attr + " class='" + cls2 + "'></div>";
					$cell.html(inp);
					$cell.children().html(cellData);
					contentEditable = true
				}
			}
		}
		if (typeof edInit == "function") {
			edInit.call(grid, objCall)
		}
		var that = this;
		var $focus = $cell.children(".pq-editor-focus"),
			FK = EM.filterKeys,
			cEM = column.editModel;
		if (cEM && cEM.filterKeys !== undefined) {
			FK = cEM.filterKeys
		}
		var objTrigger = {
			$cell: $cell,
			$editor: $focus,
			dataIndx: dataIndx,
			column: column,
			colIndx: ci,
			rowIndx: rowIndx,
			rowIndxPage: rip,
			rowData: rowData
		};
		EM.indices = objTrigger;
		$focus.data({
			FK: FK
		}).on("click", function(evt) {
			$(this).focus()
		}).on("keydown", function(evt) {
			that.iKeyNav._keyDownInEdit(evt)
		}).on("keypress", function(evt) {
			return that.iKeyNav._keyPressInEdit(evt, {
				FK: FK
			})
		}).on("keyup", function(evt) {
			return that.iKeyNav._keyUpInEdit(evt, {
				FK: FK
			})
		}).on("blur", function(evt, objP) {
			var o = that.options,
				EM = o.editModel,
				onBlur = EM.onBlur,
				saveOnBlur = onBlur == "save",
				validateOnBlur = onBlur == "validate",
				cancelBlurCls = EM.cancelBlurCls,
				force = objP ? objP.force : false;
			if (that._quitEditMode || that._blurEditMode) {
				return
			}
			if (!EM.indices) {
				return
			}
			var $this = $(evt.target);
			if (!force) {
				if (that._trigger("editorBlur", evt, objTrigger) === false) {
					return
				}
				if (!onBlur) {
					return
				}
				if (cancelBlurCls && $this.hasClass(cancelBlurCls)) {
					return
				}
				if ($this.hasClass("hasDatepicker")) {
					var $datepicker = $this.datepicker("widget");
					if ($datepicker.is(":visible")) {
						return false
					}
				} else {
					if ($this.hasClass("ui-autocomplete-input")) {
						if ($this.autocomplete("widget").is(":visible")) {
							return
						}
					} else {
						if ($this.hasClass("ui-multiselect")) {
							if ($(".ui-multiselect-menu").is(":visible") || $(document.activeElement).closest(".ui-multiselect-menu").length) {
								return
							}
						} else {
							if ($this.hasClass("pq-select-button")) {
								if ($(".pq-select-menu").is(":visible") || $(document.activeElement).closest(".pq-select-menu").length) {
									return
								}
							}
						}
					}
				}
			}
			that._blurEditMode = true;
			var silent = force || saveOnBlur || !validateOnBlur;
			if (!that.saveEditCell({
					evt: evt,
					silent: silent
				})) {
				if (!force && validateOnBlur) {
					that._deleteBlurEditMode();
					return false
				}
			}
			that.quitEditMode({
				evt: evt
			});
			that._deleteBlurEditMode()
		}).on("focus", function(evt) {
			that._trigger("editorFocus", evt, objTrigger)
		});
		that._trigger("editorBegin", evt, objTrigger);
		$focus.focus();
		window.setTimeout(function() {
			var $ae = $(document.activeElement);
			if ($ae.hasClass("pq-editor-focus") === false) {
				var $focus = that.element ? that.element.find(".pq-editor-focus") : $();
				$focus.focus()
			}
		}, 0);
		if (edSelect) {
			if (contentEditable) {
				try {
					var el = $focus[0];
					var range = document.createRange();
					range.selectNodeContents(el);
					var sel = window.getSelection();
					sel.removeAllRanges();
					sel.addRange(range)
				} catch (ex) {}
			} else {
				$focus.select()
			}
		}
	};
	fn._deleteBlurEditMode = function(objP) {
		var that = this,
			objP = objP ? objP : {};
		if (that._blurEditMode) {
			if (objP.timer) {
				window.setTimeout(function() {
					delete that._blurEditMode
				}, 0)
			} else {
				delete that._blurEditMode
			}
		}
	};
	fn.getRow = function(_obj) {
		var obj = this.normalize(_obj),
			rip = obj.rowIndxPage,
			$tbl = obj.all ? this.$tbl : this.get$Tbl(rip),
			$tr = $();
		if ($tbl && $tbl.length) {
			var $tbody = $tbl.children("tbody");
			if (rip != null) {
				$tr = $tbody.children("tr[pq-row-indx=" + rip + "]");
				if ($tr.length > $tbl.length) {
					$tr = $tr.filter(".pq-detail-master")
				}
			}
		}
		return $tr
	};
	fn.getCell = function(_obj) {
		var all = _obj.all,
			o = this.options,
			obj = this.normalize(_obj),
			rip = obj.rowIndxPage,
			r1 = obj.rowIndx,
			ci = obj.colIndx;
		var iM = this.iMerge,
			isMerged = iM.ismergedCell(r1, ci);
		if (isMerged) {
			var uiM_a = iM.getRootCell(r1, ci, "a"),
				uiM_o = iM.getRootCell(r1, ci, "o");
			if ((rip !== uiM_o.rowIndxPage || ci !== uiM_o.colIndx) && (rip !== uiM_a.rowIndxPage || ci !== uiM_a.colIndx)) {
				return $()
			}
			rip = uiM_a.rowIndxPage;
			ci = uiM_o.colIndx
		} else {
			if (rip >= o.freezeRows && (rip < this.initV || rip > this.finalV) || ci >= o.freezeCols && (ci < this.initH || ci > this.finalH)) {
				return $()
			}
			if (!obj.rowData || !obj.column || obj.rowData.pq_hidden || obj.column.hidden) {
				return $()
			}
		}
		var $tbl = all ? this.$tbl : this.get$Tbl(rip, ci),
			$td;
		if ($tbl && $tbl.length) {
			$td = $tbl.children().children("tr[pq-row-indx=" + rip + "]").children("[pq-col-indx=" + ci + "]")
		} else {
			$td = $()
		}
		return $td
	};
	fn.getCellHeader = function(obj) {
		var colIndx = obj.colIndx,
			dataIndx = obj.dataIndx,
			colIndx = colIndx == null ? this.colIndxs[dataIndx] : colIndx,
			$tbl = this.$tbl_header,
			$td, options = this.options,
			freezeCols = options.freezeCols;
		if ($tbl) {
			if ($tbl.length > 1) {
				if (colIndx >= freezeCols) {
					$tbl = $($tbl[1])
				} else {
					$tbl = $($tbl[0])
				}
			}
			var $td = $tbl.find("[pq-col-indx=" + colIndx + "].pq-grid-col-leaf");
			return $td
		} else {
			return $()
		}
	};
	fn.getEditorIndices = function() {
		var obj = this.options.editModel.indices;
		if (!obj) {
			return null
		} else {
			return $.extend({}, obj)
		}
	};
	fn.getEditCellData = function() {
		var o = this.options,
			EM = o.editModel,
			obj = EM.indices;
		if (!obj) {
			return null
		}
		var colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx,
			column = this.colModel[colIndx],
			ceditor = column.editor,
			geditor = o.editor,
			editor = ceditor ? $.extend({}, geditor, ceditor) : geditor,
			ed_valueIndx = editor.valueIndx,
			ed_labelIndx = editor.labelIndx,
			ed_mapIndices = editor.mapIndices,
			ed_mapIndices = ed_mapIndices ? ed_mapIndices : {},
			dataIndx = column.dataIndx,
			$div_focus = this.$div_focus,
			$cell = $div_focus.children(".pq-editor-inner"),
			dataCell;
		var getData = EM._getData || editor.getData;
		EM._getData = undefined;
		if (typeof getData == "function") {
			dataCell = getData.call(this, {
				$cell: $cell,
				rowData: obj.rowData,
				dataIndx: dataIndx,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				column: column,
				colIndx: colIndx
			})
		} else {
			var edtype = geditor._type;
			if (edtype == "checkbox") {
				var $ele = $cell.children();
				if (editor.subtype == "triple") {
					dataCell = $ele.pqval()
				} else {
					dataCell = $ele.is(":checked") ? true : false
				}
			} else {
				if (edtype == "contenteditable") {
					dataCell = $cell.children().html()
				} else {
					var $ed = $cell.find('*[name="' + dataIndx + '"]');
					if ($ed && $ed.length) {
						if (edtype == "select" && ed_valueIndx != null) {
							if (!ed_mapIndices[ed_valueIndx] && !this.columns[ed_valueIndx]) {
								dataCell = $ed.val()
							} else {
								dataCell = {};
								dataCell[ed_mapIndices[ed_valueIndx] ? ed_mapIndices[ed_valueIndx] : ed_valueIndx] = $ed.val();
								dataCell[ed_mapIndices[ed_labelIndx] ? ed_mapIndices[ed_labelIndx] : ed_labelIndx] = $ed.find("option:selected").text();
								var dataMap = editor.dataMap;
								if (dataMap) {
									var jsonMap = $ed.find("option:selected").data("map");
									if (jsonMap) {
										for (var k = 0; k < dataMap.length; k++) {
											var key = dataMap[k];
											dataCell[ed_mapIndices[key] ? ed_mapIndices[key] : key] = jsonMap[key]
										}
									}
								}
							}
						} else {
							dataCell = $ed.val()
						}
					} else {
						var $ed = $cell.find(".pq-editor-focus");
						if ($ed && $ed.length) {
							dataCell = $ed.val()
						}
					}
				}
			}
		}
		return dataCell
	};
	fn.getCellIndices = function(objP) {
		var $td = objP.$td;
		if ($td == null || $td.length == 0 || $td.closest(".pq-grid")[0] != this.element[0]) {
			return {}
		}
		var $tr = $td.parent("tr");
		var rowIndxPage = $tr.attr("pq-row-indx"),
			rowIndx;
		if (rowIndxPage != null) {
			rowIndxPage = parseInt(rowIndxPage);
			rowIndx = rowIndxPage + this.rowIndxOffset
		}
		var colIndx = $td.attr("pq-col-indx"),
			dataIndx;
		if (colIndx != null) {
			colIndx = parseInt(colIndx);
			if (colIndx >= 0) {
				dataIndx = this.colModel[colIndx].dataIndx
			}
		}
		return this.iMerge.getRootCell(rowIndx, colIndx, "o")
	};
	fn.getRowsByClass = function(obj) {
		var options = this.options,
			DM = options.dataModel,
			PM = options.pageModel,
			remotePaging = PM.type == "remote",
			offset = this.rowIndxOffset,
			data = DM.data,
			rows = [];
		if (data == null) {
			return rows
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rd = data[i];
			if (rd.pq_rowcls) {
				obj.rowData = rd;
				if (this.hasClass(obj)) {
					var row = {
							rowData: rd
						},
						ri = remotePaging ? i + offset : i,
						rip = ri - offset;
					row.rowIndx = ri;
					row.rowIndxPage = rip;
					rows.push(row)
				}
			}
		}
		return rows
	};
	fn.getCellsByClass = function(obj) {
		var that = this,
			options = this.options,
			DM = options.dataModel,
			PM = options.pageModel,
			remotePaging = PM.type == "remote",
			offset = this.rowIndxOffset,
			data = DM.data,
			cells = [];
		if (data == null) {
			return cells
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rd = data[i],
				ri = remotePaging ? i + offset : i,
				cellcls = rd.pq_cellcls;
			if (cellcls) {
				for (var di in cellcls) {
					var ui = {
						rowData: rd,
						rowIndx: ri,
						dataIndx: di,
						cls: obj.cls
					};
					if (that.hasClass(ui)) {
						var cell = that.normalize(ui);
						cells.push(cell)
					}
				}
			}
		}
		return cells
	};
	fn.data = function(objP) {
		var dataIndx = objP.dataIndx,
			colIndx = objP.colIndx,
			dataIndx = colIndx != null ? this.colModel[colIndx].dataIndx : dataIndx,
			data = objP.data,
			readOnly = data == null || typeof data == "string" ? true : false,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return {
				data: null
			}
		}
		if (dataIndx == null) {
			var rowdata = rowData.pq_rowdata;
			if (readOnly) {
				var ret;
				if (rowdata != null) {
					if (data == null) {
						ret = rowdata
					} else {
						ret = rowdata[data]
					}
				}
				return {
					data: ret
				}
			}
			var finalData = $.extend(true, rowData.pq_rowdata, data);
			rowData.pq_rowdata = finalData
		} else {
			var celldata = rowData.pq_celldata;
			if (readOnly) {
				var ret;
				if (celldata != null) {
					var a = celldata[dataIndx];
					if (data == null || a == null) {
						ret = a
					} else {
						ret = a[data]
					}
				}
				return {
					data: ret
				}
			}
			if (!celldata) {
				rowData.pq_celldata = {}
			}
			var finalData = $.extend(true, rowData.pq_celldata[dataIndx], data);
			rowData.pq_celldata[dataIndx] = finalData
		}
	};
	fn.attr = function(objP) {
		var rowIndx = objP.rowIndx,
			dataIndx = objP.dataIndx,
			colIndx = objP.colIndx,
			dataIndx = colIndx != null ? this.colModel[colIndx].dataIndx : dataIndx,
			attr = objP.attr,
			readOnly = attr == null || typeof attr == "string" ? true : false,
			offset = this.rowIndxOffset,
			refresh = objP.refresh,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return {
				attr: null
			}
		}
		if (!readOnly && refresh !== false && rowIndx == null) {
			rowIndx = this.getRowIndx({
				rowData: rowData
			}).rowIndx
		}
		if (dataIndx == null) {
			var rowattr = rowData.pq_rowattr;
			if (readOnly) {
				var ret;
				if (rowattr != null) {
					if (attr == null) {
						ret = rowattr
					} else {
						ret = rowattr[attr]
					}
				}
				return {
					attr: ret
				}
			}
			var finalAttr = $.extend(true, rowData.pq_rowattr, attr);
			rowData.pq_rowattr = finalAttr;
			if (refresh !== false && rowIndx != null) {
				var $tr = this.getRow({
					rowIndxPage: rowIndx - offset
				});
				if ($tr) {
					var strFinalAttr = stringifyAttr(finalAttr);
					$tr.attr(strFinalAttr)
				}
			}
		} else {
			var cellattr = rowData.pq_cellattr;
			if (readOnly) {
				var ret;
				if (cellattr != null) {
					var a = cellattr[dataIndx];
					if (attr == null || a == null) {
						ret = a
					} else {
						ret = a[attr]
					}
				}
				return {
					attr: ret
				}
			}
			if (!cellattr) {
				rowData.pq_cellattr = {}
			}
			var finalAttr = $.extend(true, rowData.pq_cellattr[dataIndx], attr);
			rowData.pq_cellattr[dataIndx] = finalAttr;
			if (refresh !== false && rowIndx != null) {
				var $td = this.getCell({
					rowIndxPage: rowIndx - offset,
					dataIndx: dataIndx
				});
				if ($td) {
					var strFinalAttr = stringifyAttr(finalAttr);
					$td.attr(strFinalAttr)
				}
			}
		}
	};
	var stringifyAttr = function(attr) {
		var newAttr = {};
		for (var key in attr) {
			var val = attr[key];
			if (val) {
				if (key == "title") {
					val = val.replace(/\"/g, "&quot;");
					newAttr[key] = val
				} else {
					if (key == "style" && typeof val == "object") {
						var val2 = [],
							val22;
						for (var kk in val) {
							val22 = val[kk];
							if (val22) {
								val2.push(kk + ":" + val22)
							}
						}
						val = val2.join(";") + (val2.length ? ";" : "");
						if (val) {
							newAttr[key] = val
						}
					} else {
						if (typeof val == "object") {
							val = JSON.stringify(val)
						}
						newAttr[key] = val
					}
				}
			}
		}
		return newAttr
	};
	fn.removeData = function(objP) {
		var dataIndx = objP.dataIndx,
			colIndx = objP.colIndx,
			dataIndx = colIndx != null ? this.colModel[colIndx].dataIndx : dataIndx,
			data = objP.data,
			data = data == null ? [] : data,
			datas = typeof data == "string" ? data.split(" ") : data,
			datalen = datas.length,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return
		}
		if (dataIndx == null) {
			var rowdata = rowData.pq_rowdata;
			if (rowdata) {
				if (datalen) {
					for (var i = 0; i < datalen; i++) {
						var key = datas[i];
						delete rowdata[key]
					}
				}
				if (!datalen || $.isEmptyObject(rowdata)) {
					delete rowData.pq_rowdata
				}
			}
		} else {
			var celldata = rowData.pq_celldata;
			if (celldata && celldata[dataIndx]) {
				var a = celldata[dataIndx];
				if (datalen) {
					for (var i = 0; i < datalen; i++) {
						var key = datas[i];
						delete a[key]
					}
				}
				if (!datalen || $.isEmptyObject(a)) {
					delete celldata[dataIndx]
				}
			}
		}
	};
	fn.removeAttr = function(objP) {
		var rowIndx = objP.rowIndx,
			dataIndx = objP.dataIndx,
			colIndx = objP.colIndx,
			dataIndx = colIndx != null ? this.colModel[colIndx].dataIndx : dataIndx,
			attr = objP.attr,
			attr = attr == null ? [] : attr,
			attrs = typeof attr == "string" ? attr.split(" ") : attr,
			attrlen = attrs.length,
			rowIndxPage = rowIndx - this.rowIndxOffset,
			refresh = objP.refresh,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return
		}
		if (refresh !== false && rowIndx == null) {
			rowIndx = this.getRowIndx({
				rowData: rowData
			}).rowIndx
		}
		if (dataIndx == null) {
			var rowattr = rowData.pq_rowattr;
			if (rowattr) {
				if (attrlen) {
					for (var i = 0; i < attrlen; i++) {
						var key = attrs[i];
						delete rowattr[key]
					}
				} else {
					for (var key in rowattr) {
						attrs.push(key)
					}
				}
				if (!attrlen || $.isEmptyObject(rowattr)) {
					delete rowData.pq_rowattr
				}
			}
			if (refresh !== false && rowIndx != null && attrs.length) {
				attr = attrs.join(" ");
				var $tr = this.getRow({
					rowIndxPage: rowIndxPage
				});
				if ($tr) {
					$tr.removeAttr(attr)
				}
			}
		} else {
			var cellattr = rowData.pq_cellattr;
			if (cellattr && cellattr[dataIndx]) {
				var a = cellattr[dataIndx];
				if (attrlen) {
					for (var i = 0; i < attrlen; i++) {
						var key = attrs[i];
						delete a[key]
					}
				} else {
					for (var key in a) {
						attrs.push(key)
					}
				}
				if (!attrlen || $.isEmptyObject(a)) {
					delete cellattr[dataIndx]
				}
			}
			if (refresh !== false && rowIndx != null && attrs.length) {
				attr = attrs.join(" ");
				var $td = this.getCell({
					rowIndxPage: rowIndxPage,
					dataIndx: dataIndx
				});
				if ($td) {
					$td.removeAttr(attr)
				}
			}
		}
	};
	fn.normalize = function(ui) {
		var obj = {};
		for (var key in ui) {
			obj[key] = ui[key]
		}
		var ri = obj.rowIndx,
			rip = obj.rowIndxPage,
			di = obj.dataIndx,
			ci = obj.colIndx;
		if (rip != null || ri != null) {
			var offset = this.rowIndxOffset;
			ri = ri == null ? parseInt(rip, 10) + offset : ri;
			rip = rip == null ? parseInt(ri, 10) - offset : rip;
			obj.rowIndx = ri;
			obj.rowIndxPage = rip;
			obj.rowData = obj.rowData || this.getRowData(obj)
		}
		if (ci != null || di != null) {
			var CM = this.colModel;
			di = di == null ? CM[ci] ? CM[ci].dataIndx : undefined : di, ci = ci == null ? this.colIndxs[di] : ci;
			obj.column = CM[ci];
			obj.colIndx = ci;
			obj.dataIndx = di
		}
		return obj
	};
	fn.addClass = function(_objP) {
		var objP = this.normalize(_objP),
			rip = objP.rowIndxPage,
			dataIndx = objP.dataIndx,
			uniqueArray = pq.arrayUnique,
			objcls = objP.cls,
			refresh = objP.refresh,
			rowData = objP.rowData;
		if (!rowData) {
			return
		}
		if (refresh !== false && rip == null) {
			rip = this.getRowIndx({
				rowData: rowData
			}).rowIndxPage
		}
		if (dataIndx == null) {
			var rowcls = rowData.pq_rowcls,
				newcls;
			if (rowcls) {
				newcls = rowcls + " " + objcls
			} else {
				newcls = objcls
			}
			newcls = uniqueArray(newcls.split(/\s+/)).join(" ");
			rowData.pq_rowcls = newcls;
			if (refresh !== false && rip != null) {
				var $tr = this.getRow({
					rowIndxPage: rip
				});
				if ($tr) {
					$tr.addClass(objcls)
				}
			}
		} else {
			var dataIndxs = [];
			if (typeof dataIndx.push != "function") {
				dataIndxs.push(dataIndx)
			} else {
				dataIndxs = dataIndx
			}
			var pq_cellcls = rowData.pq_cellcls;
			if (!pq_cellcls) {
				pq_cellcls = rowData.pq_cellcls = {}
			}
			for (var j = 0, len = dataIndxs.length; j < len; j++) {
				var dataIndx = dataIndxs[j];
				var cellcls = pq_cellcls[dataIndx],
					newcls;
				if (cellcls) {
					newcls = cellcls + " " + objcls
				} else {
					newcls = objcls
				}
				newcls = uniqueArray(newcls.split(/\s+/)).join(" ");
				pq_cellcls[dataIndx] = newcls;
				if (refresh !== false && rip != null) {
					var $td = this.getCell({
						rowIndxPage: rip,
						dataIndx: dataIndx
					});
					if ($td) {
						$td.addClass(objcls)
					}
				}
			}
		}
	};
	fn.removeClass = function(_objP) {
		var objP = this.normalize(_objP);
		var rowIndx = objP.rowIndx,
			rowData = objP.rowData,
			dataIndx = objP.dataIndx,
			cls = objP.cls,
			refresh = objP.refresh;
		if (!rowData) {
			return
		}
		var pq_cellcls = rowData.pq_cellcls,
			pq_rowcls = rowData.pq_rowcls;
		if (refresh !== false && rowIndx == null) {
			rowIndx = this.getRowIndx({
				rowData: rowData
			}).rowIndx
		}
		if (dataIndx == null) {
			if (pq_rowcls) {
				rowData.pq_rowcls = this._removeClass(pq_rowcls, cls);
				if (rowIndx != null && refresh !== false) {
					var $tr = this.getRow({
						rowIndx: rowIndx
					});
					if ($tr) {
						$tr.removeClass(cls)
					}
				}
			}
		} else {
			if (pq_cellcls) {
				var dataIndxs = [];
				if (typeof dataIndx.push != "function") {
					dataIndxs.push(dataIndx)
				} else {
					dataIndxs = dataIndx
				}
				for (var i = 0, len = dataIndxs.length; i < len; i++) {
					var dataIndx = dataIndxs[i];
					var cellClass = pq_cellcls[dataIndx];
					if (cellClass) {
						rowData.pq_cellcls[dataIndx] = this._removeClass(cellClass, cls);
						if (rowIndx != null && refresh !== false) {
							var $td = this.getCell({
								rowIndx: rowIndx,
								dataIndx: dataIndx
							});
							if ($td) {
								$td.removeClass(cls)
							}
						}
					}
				}
			}
		}
	};
	fn.hasClass = function(obj) {
		var dataIndx = obj.dataIndx,
			cls = obj.cls,
			rowData = this.getRowData(obj),
			re = new RegExp("\\b" + cls + "\\b"),
			str;
		if (rowData) {
			if (dataIndx == null) {
				str = rowData.pq_rowcls;
				if (str && re.test(str)) {
					return true
				} else {
					return false
				}
			} else {
				var objCls = rowData.pq_cellcls;
				if (objCls && objCls[dataIndx] && re.test(objCls[dataIndx])) {
					return true
				} else {
					return false
				}
			}
		} else {
			return null
		}
	};
	fn._removeClass = function(str, str2) {
		if (str && str2) {
			var arr = str.split(/\s+/),
				arr2 = str2.split(/\s+/),
				arr3 = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				var cls = arr[i],
					found = false;
				for (var j = 0, len2 = arr2.length; j < len2; j++) {
					var cls2 = arr2[j];
					if (cls === cls2) {
						found = true;
						break
					}
				}
				if (!found) {
					arr3.push(cls)
				}
			}
			if (arr3.length > 1) {
				return arr3.join(" ")
			} else {
				if (arr3.length === 1) {
					return arr3[0]
				} else {
					return null
				}
			}
		}
	};
	fn.getRowIndx = function(obj) {
		var $tr = obj.$tr,
			rowData = obj.rowData,
			rowIndxPage, rowIndx, offset = this.rowIndxOffset;
		if (rowData) {
			var o = this.options,
				DM = o.dataModel,
				data = this.get_p_data(),
				uf = false,
				dataUF = obj.dataUF ? DM.dataUF : null,
				_found = false;
			if (data) {
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i] == rowData) {
						_found = true;
						break
					}
				}
			}
			if (!_found && dataUF) {
				uf = true;
				for (var i = 0, len = dataUF.length; i < len; i++) {
					if (dataUF[i] == rowData) {
						_found = true;
						break
					}
				}
			}
			if (_found) {
				rowIndxPage = i - offset;
				rowIndx = i;
				return {
					rowIndxPage: uf ? undefined : rowIndxPage,
					uf: uf,
					rowIndx: rowIndx,
					rowData: rowData
				}
			} else {
				return {}
			}
		} else {
			if ($tr == null || $tr.length == 0) {
				return {}
			}
			rowIndxPage = $tr.attr("pq-row-indx");
			if (rowIndxPage == null) {
				return {}
			}
			rowIndxPage = parseInt(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndxPage + offset
			}
		}
	};
	fn.search = function(ui) {
		var o = this.options,
			row = ui.row,
			first = ui.first,
			DM = o.dataModel,
			PM = o.pageModel,
			paging = PM.type,
			rowList = [],
			offset = this.rowIndxOffset,
			remotePaging = paging == "remote",
			data = DM.data;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i],
				_found = true;
			for (var dataIndx in row) {
				if (row[dataIndx] !== rowData[dataIndx]) {
					_found = false
				}
			}
			if (_found) {
				var ri = remotePaging ? i + offset : i,
					obj = this.normalize({
						rowIndx: ri
					});
				rowList.push(obj);
				if (first) {
					break
				}
			}
		}
		return rowList
	};
	var cKeyNav = function(that) {
		this.options = that.options;
		this.that = that
	};
	var _pKeyNav = cKeyNav.prototype;
	_pKeyNav._incrRowIndx = function(rowIndxPage, noRows) {
		var that = this.that,
			newRowIndx = rowIndxPage,
			noRows = 1,
			data = that.pdata,
			counter = 0;
		for (var i = rowIndxPage + 1, len = data.length; i < len; i++) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				counter++;
				newRowIndx = i;
				if (counter == noRows) {
					return newRowIndx
				}
			}
		}
		return newRowIndx
	};
	_pKeyNav._decrRowIndx = function(rowIndxPage, noRows) {
		var that = this.that,
			newRowIndx = rowIndxPage,
			data = that.pdata,
			noRows = 1,
			counter = 0;
		for (var i = rowIndxPage - 1; i >= 0; i--) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				counter++;
				newRowIndx = i;
				if (counter == noRows) {
					return newRowIndx
				}
			}
		}
		return newRowIndx
	};
	_pKeyNav._decrRowIndx2 = function(rip, ci) {
		var that = this.that,
			offset = that.rowIndxOffset,
			ri = rip + offset,
			iM = that.iMerge,
			merge, pqN, data = that.pdata;
		if (merge = iM.ismergedCell(ri, ci)) {
			var uiIM_a = iM.getRootCell(ri, ci, "a"),
				pqN = iM.getData(ri, ci, "proxy_cell"),
				ci = uiIM_a.colIndx;
			ci = pqN ? pqN.colIndx : ci
		}
		for (var i = rip - 1; i >= 0; i--) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				rip = i;
				break
			}
		}
		return {
			rowIndxPage: rip,
			colIndx: ci
		}
	};
	_pKeyNav._incrRowIndx2 = function(rip, ci) {
		var that = this.that,
			offset = that.rowIndxOffset,
			ri = rip + offset,
			iM = that.iMerge,
			merge, pqN, data = that.pdata;
		if (merge = iM.ismergedCell(ri, ci)) {
			var uiIM_a = iM.getRootCell(ri, ci, "a"),
				pqN = iM.getData(ri, ci, "proxy_cell"),
				ci = uiIM_a.colIndx;
			rip = merge.rowspan ? rip + merge.rowspan - 1 : 0;
			ci = pqN ? pqN.colIndx : ci
		}
		for (var i = rip + 1, len = data.length; i < len; i++) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				rip = i;
				break
			}
		}
		return {
			rowIndxPage: rip,
			colIndx: ci
		}
	};
	fn.addColumn = function(ui) {
		var colList = ui.colList || [{
				colIndx: ui.colIndx,
				column: ui.column
			}],
			history = ui.history !== false,
			o = this.options,
			CM = o.colModel;
		for (var i = 0; i < colList.length; i++) {
			var colIndx = colList[i].colIndx,
				column = colList[i].column;
			if (column.dataIndx == undefined) {
				column.dataIndx = Math.random()
			}
			if (colIndx == null) {
				colIndx = colList.colIndx = CM.length
			}
			CM.splice(colIndx, 0, column)
		}
		this.iColModel.init();
		if (history) {
			this.iHistory.increment();
			colList.type = "add";
			this.iHistory.push({
				colList: colList
			})
		}
		this._trigger("addColumn", null, {
			colList: colList
		});
		if (ui.refresh !== false) {
			this.refreshView()
		}
	};
	fn.deleteColumn = function(ui) {
		var colList = ui.colList || [{
				colIndx: ui.colIndx
			}],
			history = ui.history !== false,
			o = this.options,
			CM = o.colModel;
		for (var i = colList.length - 1; i >= 0; i--) {
			var co = colList[i],
				colIndx = co.colIndx,
				column = CM.splice(colIndx, 1)[0];
			co.column = column
		}
		this.iColModel.init();
		if (history) {
			this.iHistory.increment();
			colList.type = "delete";
			this.iHistory.push({
				colList: colList
			})
		}
		this._trigger("deleteColumn", null, {
			colList: colList
		});
		if (ui.refresh !== false) {
			this.refreshView()
		}
	};
	_pKeyNav._incrIndx = function(rowIndxPage, colIndx, incr) {
		var that = this.that,
			iM = that.iMerge,
			merged, pqN, rowIndx, rip2, column, pdata = that.pdata,
			offset = that.rowIndxOffset,
			lastRowIndxPage = that[incr ? "getLastVisibleRIP" : "getFirstVisibleRIP"](),
			CM = that.colModel,
			CMLength = CM.length;
		if (colIndx == null) {
			if (rowIndxPage == lastRowIndxPage) {
				return null
			}
			rowIndxPage = this[incr ? "_incrRowIndx" : "_decrRowIndx"](rowIndxPage);
			return {
				rowIndxPage: rowIndxPage
			}
		}
		do {
			rowIndx = rowIndxPage + offset;
			if (merged = iM.ismergedCell(rowIndx, colIndx)) {
				if (!column && (pqN = iM.getData(rowIndx, colIndx, "proxy_cell"))) {
					rip2 = pqN.rowIndx - offset;
					if (!pdata[rip2].pq_hidden) {
						rowIndxPage = rip2
					}
				}
				if (pdata[rowIndxPage].pq_hidden) {
					rowIndxPage = iM.getRootCell(rowIndx, colIndx).rowIndxPage
				}
				if (!column && incr) {
					colIndx = colIndx + (merged && merged.colspan ? merged.colspan - 1 : 0)
				}
			}
			colIndx = incr ? colIndx + 1 : colIndx - 1;
			if (incr && colIndx >= CMLength || !incr && colIndx < 0) {
				if (rowIndxPage == lastRowIndxPage) {
					return null
				}
				rowIndxPage = this[incr ? "_incrRowIndx" : "_decrRowIndx"](rowIndxPage);
				colIndx = incr ? 0 : CMLength - 1
			}
			column = CM[colIndx]
		} while (column && column.hidden);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._incrEditIndx = function(rowIndxPage, colIndx, incr) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			iM = that.iMerge,
			column, offset = that.rowIndxOffset,
			lastRowIndxPage = that[incr ? "getLastVisibleRIP" : "getFirstVisibleRIP"]();
		do {
			var rowIndx = rowIndxPage + offset,
				merged = iM.ismergedCell(rowIndx, colIndx);
			if (merged) {
				var pqN = iM.getData(rowIndx, colIndx, "proxy_edit_cell");
				if (pqN) {
					rowIndx = pqN.rowIndx;
					rowIndxPage = rowIndx - offset
				}
				colIndx = incr ? colIndx + merged.colspan : colIndx - 1
			} else {
				colIndx = incr ? colIndx + 1 : colIndx - 1
			}
			if (incr && colIndx >= CMLength || !incr && colIndx < 0) {
				if (rowIndxPage == lastRowIndxPage) {
					return null
				}
				do {
					rowIndxPage = this[incr ? "_incrRowIndx" : "_decrRowIndx"](rowIndxPage);
					var isEditableRow = that.isEditableRow({
						rowIndxPage: rowIndxPage
					});
					if (rowIndxPage == lastRowIndxPage && isEditableRow == false) {
						return null
					}
				} while (isEditableRow == false);
				colIndx = incr ? 0 : CMLength - 1
			}
			rowIndx = rowIndxPage + offset;
			merged = iM.ismergedCell(rowIndx, colIndx);
			if (merged) {
				var uiIM = iM.getRootCell(rowIndx, colIndx, "o");
				iM.setData(uiIM.rowIndx, uiIM.colIndx, {
					proxy_edit_cell: {
						rowIndx: rowIndx,
						colIndx: colIndx
					}
				});
				rowIndx = uiIM.rowIndx;
				colIndx = uiIM.colIndx
			}
			column = CM[colIndx];
			var isEditableCell = that.isEditableCell({
					rowIndx: rowIndx,
					colIndx: colIndx,
					checkVisible: true
				}),
				ceditor = column.editor,
				ceditor = typeof ceditor == "function" ? ceditor.call(that, that.normalize({
					rowIndx: rowIndx,
					colIndx: colIndx
				})) : ceditor;
			rowIndxPage = rowIndx - offset
		} while (column && (column.hidden || isEditableCell == false || ceditor === false));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav.getMergeCell = function(rowIndx, colIndx) {
		var that = this.that,
			o = that.options,
			iM = that.iMerge,
			obj, obj_o;
		if (iM.ismergedCell(rowIndx, colIndx)) {
			obj_o = iM.getRootCell(rowIndx, colIndx, "o");
			iM.setData(obj_o.rowIndx, obj_o.colIndx, {
				proxy_cell: {
					rowIndx: rowIndx,
					colIndx: colIndx
				}
			});
			if (o.virtualY) {
				obj = iM.getRootCell(rowIndx, colIndx, "a")
			}
		}
		if (!obj) {
			rowIndx = this.getVisibleRowIndx(rowIndx);
			colIndx = this.getVisibleColIndx(colIndx);
			obj = that.normalize({
				rowIndx: rowIndx,
				colIndx: colIndx
			})
		}
		return obj
	};
	_pKeyNav.getVisibleRowIndx = function(ri) {
		var that = this.that,
			pdata = that.pdata,
			pdLen = pdata.length,
			offset = that.rowIndxOffset,
			rip = ri - offset,
			rd = that.getRowData({
				rowIndx: ri
			});
		while (rd.pq_hidden && rip < pdLen - 1) {
			rip++;
			ri++;
			rd = that.getRowData({
				rowIndx: ri
			})
		}
		return ri
	};
	_pKeyNav.getVisibleColIndx = function(ci) {
		var that = this.that,
			CM = that.colModel,
			CMLen = CM.length,
			column = CM[ci];
		while (column.hidden && ci < CMLen - 1) {
			ci++;
			column = CM[ci]
		}
		return ci
	};
	fn._onKeyPressDown = function(evt) {
		var $header = $(evt.target).closest(".pq-grid-header");
		if ($header.length > 0) {
			if (this._trigger("headerKeyDown", evt, null) == false) {
				return false
			} else {
				return true
			}
		} else {
			var ret = this.iKeyNav._bodyKeyPressDown(evt);
			if (ret === false) {
				return false
			}
			if (this._trigger("keyDown", evt, null) == false) {
				return false
			}
		}
	};
	_pKeyNav._saveAndMove = function(objP, evt) {
		if (objP == null) {
			evt.preventDefault();
			return false
		}
		var that = this.that,
			rowIndxPage = objP.rowIndxPage,
			colIndx = objP.colIndx;
		that._blurEditMode = true;
		if (that.saveEditCell({
				evt: evt
			}) === false || !that.pdata) {
			if (!that.pdata) {
				that.quitEditMode(evt)
			}
			that._deleteBlurEditMode({
				timer: true,
				msg: "_saveAndMove saveEditCell"
			});
			evt.preventDefault();
			return false
		}
		that.quitEditMode(evt);
		if (objP.incr) {
			var obj = this[objP.edit ? "_incrEditIndx" : "_incrIndx"](rowIndxPage, colIndx, !evt.shiftKey);
			rowIndxPage = obj ? obj.rowIndxPage : rowIndxPage;
			colIndx = obj ? obj.colIndx : colIndx
		}
		that.scrollRow({
			rowIndxPage: rowIndxPage
		});
		that.scrollColumn({
			colIndx: colIndx
		});
		var rowIndx = rowIndxPage + that.rowIndxOffset;
		this.select({
			rowIndx: rowIndx,
			colIndx: colIndx,
			evt: evt
		});
		if (objP.edit) {
			that._editCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			})
		}
		that._deleteBlurEditMode({
			timer: true,
			msg: "_saveAndMove"
		});
		evt.preventDefault();
		return false
	};
	_pKeyNav._keyPressInEdit = function(evt, _objP) {
		var that = this.that,
			o = that.options,
			EMIndx = o.editModel.indices,
			objP = _objP || {},
			FK = objP.FK,
			column = EMIndx.column,
			KC = $.ui.keyCode,
			allowedKeys = ["BACKSPACE", "LEFT", "RIGHT", "UP", "DOWN", "DELETE", "HOME", "END"].map(function(kc) {
				return KC[kc]
			}),
			dataType = column.dataType;
		if ($.inArray(evt.keyCode, allowedKeys) >= 0) {
			return true
		}
		if (that._trigger("editorKeyPress", evt, $.extend({}, EMIndx)) === false) {
			return false
		}
		if (FK && (dataType == "float" || dataType == "integer")) {
			var charsPermit = dataType == "float" ? "0123456789.-" : "0123456789-",
				charC = evt.charCode || evt.keyCode,
				chr = String.fromCharCode(charC);
			if (chr && charsPermit.indexOf(chr) == -1) {
				return false
			}
		}
		return true
	};
	_pKeyNav.getValText = function($editor) {
		var nodeName = $editor[0].nodeName.toLowerCase(),
			valsarr = ["input", "textarea", "select"],
			byVal = "text";
		if ($.inArray(nodeName, valsarr) != -1) {
			byVal = "val"
		}
		return byVal
	};
	_pKeyNav._keyUpInEdit = function(evt, objP) {
		var that = this.that,
			o = that.options,
			objP = objP ? objP : {},
			FK = objP.FK,
			EM = o.editModel,
			EMIndices = EM.indices;
		that._trigger("editorKeyUp", evt, $.extend({}, EMIndices));
		var column = EMIndices.column,
			dataType = column.dataType;
		if (FK && (dataType == "float" || dataType == "integer")) {
			var $this = $(evt.target),
				re = dataType == "integer" ? EM.reInt : EM.reFloat;
			var byVal = this.getValText($this);
			var oldVal = $this.data("oldVal");
			var newVal = $this[byVal]();
			if (re.test(newVal) == false) {
				if (re.test(oldVal)) {
					$this[byVal](oldVal)
				} else {
					var val = dataType == "float" ? parseFloat(oldVal) : parseInt(oldVal);
					if (isNaN(val)) {
						$this[byVal](0)
					} else {
						$this[byVal](val)
					}
				}
			}
		}
	};
	_pKeyNav._keyDownInEdit = function(evt) {
		var that = this.that,
			o = that.options;
		var EMIndx = o.editModel.indices;
		if (!EMIndx) {
			return
		}
		var $this = $(evt.target),
			keyCodes = $.ui.keyCode,
			gEM = o.editModel,
			obj = $.extend({}, EMIndx),
			rowIndxPage = obj.rowIndxPage,
			colIndx = obj.colIndx,
			column = obj.column,
			cEM = column.editModel,
			EM = cEM ? $.extend({}, gEM, cEM) : gEM;
		var byVal = this.getValText($this);
		$this.data("oldVal", $this[byVal]());
		if (that._trigger("editorKeyDown", evt, obj) == false) {
			return false
		}
		if (evt.keyCode == keyCodes.TAB || evt.keyCode == EM.saveKey) {
			var onSave = evt.keyCode == keyCodes.TAB ? EM.onTab : EM.onSave,
				obj = {
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					incr: onSave ? true : false,
					edit: onSave == "nextEdit"
				};
			return this._saveAndMove(obj, evt)
		} else {
			if (evt.keyCode == keyCodes.ESCAPE) {
				that.quitEditMode({
					evt: evt
				});
				that.focus({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				});
				evt.preventDefault();
				return false
			} else {
				if (evt.keyCode == keyCodes.PAGE_UP || evt.keyCode == keyCodes.PAGE_DOWN) {
					evt.preventDefault();
					return false
				} else {
					if (EM.keyUpDown && !evt.altKey) {
						if (evt.keyCode == keyCodes.DOWN) {
							var obj = this._incrRowIndx2(rowIndxPage, colIndx);
							return this._saveAndMove(obj, evt)
						} else {
							if (evt.keyCode == keyCodes.UP) {
								var obj = this._decrRowIndx2(rowIndxPage, colIndx);
								return this._saveAndMove(obj, evt)
							}
						}
					}
				}
			}
		}
		return
	};
	_pKeyNav.select = function(objP) {
		var that = this.that,
			self = this,
			rowIndx = objP.rowIndx,
			colIndx = objP.colIndx,
			evt = objP.evt,
			objP = this.getMergeCell(rowIndx, colIndx),
			rowIndx = objP.rowIndx,
			colIndx = objP.colIndx,
			rowIndxPage = objP.rowIndxPage,
			o = that.options,
			iSel = that.iSelection,
			SM = o.selectionModel,
			type = SM.type,
			type_row = type == "row",
			type_cell = type == "cell",
			fn = o.realFocus ? function(fn2) {
				clearTimeout(self.timeoutID);
				self.timeoutID = setTimeout(function() {
					fn2()
				}, 0)
			} : function(fn2) {
				fn2()
			};
		fn(function() {
			that.scrollCell({
				rowIndx: rowIndx,
				colIndx: colIndx
			});
			var areas = iSel.address();
			if (evt.shiftKey && evt.keyCode !== $.ui.keyCode.TAB && SM.type && SM.mode != "single" && areas.length) {
				var last = areas[areas.length - 1],
					firstR = last.firstR,
					firstC = last.firstC,
					type = last.type,
					expand = false;
				if (type == "column") {
					last.c1 = firstC;
					last.c2 = colIndx;
					last.r1 = last.r2 = last.type = undefined
				} else {
					if (type == "row") {
						last.r1 = firstR;
						last.r2 = rowIndx;
						last.c1 = last.c2 = last.type = undefined
					} else {
						areas = {
							r1: firstR,
							r2: rowIndx,
							c1: firstC,
							c2: colIndx,
							firstR: firstR,
							firstC: firstC
						};
						expand = true
					}
				}
				that.range(areas, expand).select()
			} else {
				if (type_row) {
					that.range({
						r1: rowIndx,
						firstR: rowIndx
					}, false).select()
				} else {
					if (type_cell) {
						that.range({
							r1: rowIndx,
							c1: colIndx,
							firstR: rowIndx,
							firstC: colIndx
						}).select()
					}
				}
			}
			that.focus({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			})
		})
	};
	_pKeyNav._bodyKeyPressDown = function(evt) {
		var that = this.that,
			offset = that.rowIndxOffset,
			rowIndx, rowIndxPage, colIndx, o = this.options,
			iM = that.iMerge,
			_fe = that._focusElement,
			CM = that.colModel,
			SM = o.selectionModel,
			EM = o.editModel,
			ctrlMeta = evt.ctrlKey || evt.metaKey,
			rowIndx, colIndx, KC = $.ui.keyCode,
			keyCode = evt.keyCode;
		if (EM.indices) {
			that.$div_focus.find(".pq-cell-focus").focus();
			return
		}
		if (_fe) {
			var ac = document.activeElement;
			if (ac.className != "pq-grid-cont" && ac.nodeName.toUpperCase() != "TD" && ac.id != "pq-grid-excel") {
				return
			}
		} else {
			var $target = $(evt.target);
			if (!$target.hasClass("pq-grid-cell")) {
				return
			}
			_fe = that.getCellIndices({
				$td: $target
			})
		}
		var cell = that.normalize(_fe),
			rowIndxPage = cell.rowIndxPage,
			rowIndx = cell.rowIndx,
			colIndx = cell.colIndx,
			pqN, rip2, pdata = that.pdata,
			uiTrigger = cell,
			preventDefault = true;
		if (rowIndx == null || colIndx == null || cell.rowData == null) {
			return
		}
		if (iM.ismergedCell(rowIndx, colIndx)) {
			uiTrigger = iM.getRootCell(rowIndx, colIndx, "o");
			cell = uiTrigger;
			rowIndxPage = cell.rowIndxPage;
			rowIndx = cell.rowIndx;
			colIndx = cell.colIndx;
			if (keyCode == KC.PAGE_UP || keyCode == KC.PAGE_DOWN || keyCode == KC.SPACE || keyCode == KC.HOME || keyCode == KC.END) {
				if (pqN = iM.getData(rowIndx, colIndx, "proxy_cell")) {
					rip2 = pqN.rowIndx - offset;
					if (!pdata[rip2].pq_hidden) {
						rowIndxPage = rip2;
						rowIndx = rowIndxPage + offset
					}
				}
			}
		}
		if (that._trigger("cellKeyDown", evt, uiTrigger) == false) {
			return false
		}
		if (keyCode == KC.LEFT || keyCode == KC.RIGHT || keyCode == KC.UP || keyCode == KC.DOWN || SM.onTab && keyCode == KC.TAB) {
			var obj = null;
			if (keyCode == KC.LEFT || keyCode == KC.TAB && evt.shiftKey) {
				obj = this._incrIndx(rowIndxPage, colIndx, false)
			} else {
				if (keyCode == KC.RIGHT || keyCode == KC.TAB && !evt.shiftKey) {
					obj = this._incrIndx(rowIndxPage, colIndx, true)
				} else {
					if (keyCode == KC.UP) {
						obj = this._decrRowIndx2(rowIndxPage, colIndx)
					} else {
						if (keyCode == KC.DOWN) {
							obj = this._incrRowIndx2(rowIndxPage, colIndx)
						}
					}
				}
			}
			if (obj) {
				rowIndx = obj.rowIndxPage + offset;
				this.select({
					rowIndx: rowIndx,
					colIndx: obj.colIndx,
					evt: evt
				})
			}
		} else {
			if (keyCode == KC.PAGE_DOWN || keyCode == KC.SPACE || keyCode == KC.PAGE_UP) {
				var fn = keyCode == KC.PAGE_UP ? "pageUp" : "pageDown",
					objPage = this[fn](rowIndxPage);
				if (objPage) {
					rowIndxPage = objPage.rowIndxPage;
					if (rowIndxPage != null) {
						rowIndx = rowIndxPage + offset;
						this.select({
							rowIndx: rowIndx,
							colIndx: colIndx,
							evt: evt
						})
					}
				}
			} else {
				if (keyCode == KC.HOME) {
					if (ctrlMeta) {
						rowIndx = that.getFirstVisibleRIP() + offset
					} else {
						colIndx = that.getFirstVisibleCI()
					}
					this.select({
						rowIndx: rowIndx,
						colIndx: colIndx,
						evt: evt
					})
				} else {
					if (keyCode == KC.END) {
						if (ctrlMeta) {
							rowIndx = that.getLastVisibleRIP() + offset
						} else {
							colIndx = that.getLastVisibleCI()
						}
						this.select({
							rowIndx: rowIndx,
							colIndx: colIndx,
							evt: evt
						})
					} else {
						if (keyCode == KC.ENTER) {
							rowIndxPage = uiTrigger.rowIndxPage;
							colIndx = uiTrigger.colIndx;
							var $td = that.getCell({
								rowIndxPage: rowIndxPage,
								colIndx: colIndx
							});
							if ($td && $td.length > 0) {
								var rowIndx = rowIndxPage + offset,
									isEditableRow = that.isEditableRow({
										rowIndx: rowIndx
									}),
									isEditableCell = that.isEditableCell({
										rowIndx: rowIndx,
										colIndx: colIndx
									});
								if (isEditableRow && isEditableCell) {
									that.editCell({
										rowIndxPage: rowIndxPage,
										colIndx: colIndx
									})
								} else {
									var $button = $td.find("button");
									if ($button.length) {
										$($button[0]).click()
									}
								}
							}
						} else {
							if (ctrlMeta && keyCode == "65") {
								var iSel = that.iSelection;
								if (SM.type == "row" && SM.mode != "single") {
									iSel.selectAll({
										type: "row",
										all: SM.all
									})
								} else {
									if (SM.type == "cell" && SM.mode != "single") {
										iSel.selectAll({
											type: "cell",
											all: SM.all
										})
									}
								}
							} else {
								if (EM.pressToEdit && (keyCode >= 32 && keyCode <= 127 || keyCode == 189) && !ctrlMeta) {
									if (keyCode == 46) {
										that.clear()
									} else {
										rowIndxPage = uiTrigger.rowIndxPage;
										colIndx = uiTrigger.colIndx;
										var $td = that.getCell({
											rowIndxPage: rowIndxPage,
											colIndx: colIndx
										});
										if ($td && $td.length > 0) {
											var rowIndx = rowIndxPage + offset,
												isEditableRow = that.isEditableRow({
													rowIndx: rowIndx
												}),
												isEditableCell = that.isEditableCell({
													rowIndx: rowIndx,
													colIndx: colIndx
												});
											if (isEditableRow && isEditableCell) {
												that.editCell({
													rowIndxPage: rowIndxPage,
													colIndx: colIndx,
													select: true
												})
											}
										}
										preventDefault = false
									}
								} else {
									preventDefault = false
								}
							}
						}
					}
				}
			}
		}
		if (preventDefault) {
			evt.preventDefault()
		}
	};
	_pKeyNav.incrPageSize = function() {
		var that = this.that,
			$tbl = that.$tbl,
			$trs = $tbl.children("tbody").children(".pq-grid-row"),
			marginTop = parseInt($tbl.css("marginTop")),
			htContR = that.iRefresh.getEContHt() - marginTop;
		for (var i = $trs.length - 1; i >= 0; i--) {
			var tr = $trs[i];
			if (tr.offsetTop < htContR) {
				break
			}
		}
		var rowIndxPage = that.getRowIndx({
			$tr: $(tr)
		}).rowIndxPage;
		return {
			rowIndxPage: rowIndxPage
		}
	};
	_pKeyNav.pageNonVirtual = function(rowIndxPage, type) {
		var that = this.that,
			contHt = that.$cont[0].offsetHeight - that._getSBHeight();
		var $tr = that.getRow({
			rowIndxPage: rowIndxPage
		});
		var htTotal = 0,
			counter = 0,
			tr, $tr_prevAll = $($tr[0])[type]("tr.pq-grid-row"),
			len = $tr_prevAll.length;
		if (len > 0) {
			do {
				tr = $tr_prevAll[counter];
				var ht = tr.offsetHeight;
				htTotal += ht;
				if (htTotal >= contHt) {
					break
				}
				counter++
			} while (counter < len);
			counter = counter > 0 ? counter - 1 : counter;
			do {
				var $tr = $($tr_prevAll[counter]);
				rowIndxPage = that.getRowIndx({
					$tr: $tr
				}).rowIndxPage;
				if (rowIndxPage != null) {
					break
				} else {
					counter--
				}
			} while (counter >= 0)
		}
		return rowIndxPage
	};
	_pKeyNav.pageDown = function(rowIndxPage) {
		var that = this.that,
			o = that.options,
			vscroll = that.vscroll,
			old_cur_pos = vscroll.option("cur_pos"),
			num_eles = vscroll.option("num_eles"),
			ratio = vscroll.option("ratio");
		if (o.virtualY) {
			if (old_cur_pos < num_eles - 1) {
				var rowIndxPage = this.incrPageSize().rowIndxPage,
					calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
				if (calcCurPos == null) {
					return
				}
				vscroll.option("cur_pos", calcCurPos);
				vscroll.scroll()
			}
		} else {
			if (rowIndxPage != null) {
				rowIndxPage = this.pageNonVirtual(rowIndxPage, "nextAll")
			} else {
				if (ratio < 1) {
					var contHt = that.iRefresh.getEContHt(),
						iMS = that.iMouseSelection;
					iMS.updateTableY(-1 * contHt);
					iMS.syncScrollBarVert()
				}
			}
		}
		return {
			rowIndxPage: rowIndxPage,
			curPos: calcCurPos
		}
	};
	_pKeyNav.pageUp = function(rowIndxPage) {
		var that = this.that,
			o = that.options,
			vscroll = that.vscroll;
		if (o.virtualY) {
			var old_cur_pos = vscroll.option("cur_pos");
			if (old_cur_pos > 0) {
				var rowIndxPage = this.decrPageSize().rowIndxPage,
					calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
				if (calcCurPos == null) {
					return
				}
				vscroll.option("cur_pos", calcCurPos);
				vscroll.scroll()
			}
		} else {
			var ratio = vscroll.option("ratio");
			if (rowIndxPage != null) {
				rowIndxPage = this.pageNonVirtual(rowIndxPage, "prevAll")
			} else {
				if (ratio > 0) {
					var contHt = that.iRefresh.getEContHt(),
						iMS = that.iMouseSelection;
					iMS.updateTableY(contHt);
					iMS.syncScrollBarVert()
				}
			}
		}
		return {
			rowIndxPage: rowIndxPage,
			curPos: calcCurPos
		}
	};
	_pKeyNav.decrPageSize = function() {
		var that = this.that,
			$tbl = that.$tbl,
			$trs = $tbl.children("tbody").children(".pq-grid-row"),
			freezeRows = that.options.freezeRows,
			pdata = that.pdata,
			lastRIP, rip = 0;
		if ($trs.length) {
			var $tr;
			if (freezeRows) {
				$tr = $trs.filter("tr.pq-last-frozen-row");
				if ($tr.length) {
					$tr = $tr.next()
				}
			} else {
				if ($trs.length >= 2) {
					$tr = $($trs[1])
				}
			}
			if ($tr && $tr.length) {
				var rip = that.getRowIndx({
						$tr: $tr
					}).rowIndxPage,
					lastRIP = rip,
					counter = 0,
					pageSize = that.pageSize - 3;
				for (var i = rip; i >= 0; i--) {
					var rd = pdata[i];
					if (!rd.pq_hidden) {
						counter++;
						lastRIP = i;
						if (counter >= pageSize) {
							break
						}
					}
				}
			}
		}
		return {
			rowIndxPage: lastRIP
		}
	};
	fn._calcNumHiddenFrozens = function() {
		var num_hidden = 0,
			freezeCols = this.options.freezeCols;
		for (var i = 0; i < freezeCols; i++) {
			if (this.colModel[i].hidden) {
				num_hidden++
			}
		}
		return num_hidden
	};
	fn._calcNumHiddenUnFrozens = function(colIndx) {
		var num_hidden = 0,
			freezeCols = this.options.freezeCols;
		var len = colIndx != null ? colIndx : this.colModel.length;
		for (var i = freezeCols; i < len; i++) {
			if (this.colModel[i].hidden) {
				num_hidden++
			}
		}
		return num_hidden
	};
	fn._getSBHeight = function() {
		return this.iRefresh.getSBHeight()
	};
	fn._getSBWidth = function() {
		return this.iRefresh.getSBWidth()
	};
	fn.getFirstVisibleRIP = function(view) {
		var data = this.pdata;
		for (var i = view ? this.initV : 0, len = data.length; i < len; i++) {
			if (!data[i].pq_hidden) {
				return i
			}
		}
	};
	fn.getLastVisibleRIP = function() {
		var data = this.pdata;
		for (var i = data.length - 1; i >= 0; i--) {
			if (!data[i].pq_hidden) {
				return i
			}
		}
		return null
	};
	fn.getFirstVisibleCI = function(view) {
		var CM = this.colModel,
			CMLength = CM.length;
		for (var i = view ? this.initH : 0; i < CMLength; i++) {
			var hidden = CM[i].hidden;
			if (!hidden) {
				return i
			}
		}
		return null
	};
	fn.getLastVisibleCI = function() {
		var CM = this.colModel,
			CMLength = CM.length;
		for (var i = CMLength - 1; i >= 0; i--) {
			var hidden = CM[i].hidden;
			if (!hidden) {
				return i
			}
		}
		return null
	};
	fn.getTotalVisibleColumns = function() {
		var CM = this.colModel,
			CMLength = CM.length,
			j = 0;
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				hidden = column.hidden;
			if (!hidden) {
				j++
			}
		}
		return j
	};
	fn._calcCurPosFromRowIndxPage = function(rowIndxPage) {
		var thisOptions = this.options,
			data = this.pdata,
			freezeRows = thisOptions.freezeRows;
		if (rowIndxPage < freezeRows) {
			return 0
		}
		var cur_pos = 0,
			j = freezeRows;
		for (var i = freezeRows, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (j == rowIndxPage) {
				break
			}
			j++;
			var hidden = rowData.pq_hidden;
			if (!hidden) {
				cur_pos++
			}
		}
		if (cur_pos >= len) {
			return null
		} else {
			return cur_pos
		}
	};
	fn._calcCurPosFromColIndx = function(colIndx) {
		var thisOptions = this.options,
			CM = this.colModel,
			freezeCols = thisOptions.freezeCols;
		if (colIndx < freezeCols) {
			return 0
		}
		var cur_pos = 0,
			j = freezeCols;
		for (var i = freezeCols, len = CM.length; i < len; i++) {
			var column = CM[i];
			if (j == colIndx) {
				break
			}
			j++;
			var hidden = column.hidden;
			if (!hidden) {
				cur_pos++
			}
		}
		if (cur_pos >= len) {
			return null
		} else {
			return cur_pos
		}
	};
	fn.calcWidthCols = function(colIndx1, colIndx2, _direct) {
		var wd = 0,
			o = this.options,
			cbWidth = 0,
			numberCell = o.numberCell,
			CM = this.colModel;
		if (colIndx1 == -1) {
			if (numberCell.show) {
				if (_direct) {
					wd += numberCell.width * 1
				} else {
					wd += numberCell.outerWidth
				}
			}
			colIndx1 = 0
		}
		if (_direct) {
			for (var i = colIndx1; i < colIndx2; i++) {
				var column = CM[i];
				if (column && !column.hidden) {
					if (!column._width) {
						throw "assert failed"
					}
					wd += column._width + cbWidth
				}
			}
		} else {
			for (var i = colIndx1; i < colIndx2; i++) {
				var column = CM[i];
				if (column && !column.hidden) {
					wd += column.outerWidth
				}
			}
		}
		return wd
	};
	fn.calcHeightFrozenRows = function() {
		var $tbl = this.$tbl,
			ht = 0;
		if ($tbl && $tbl.length) {
			var $tr = $($tbl[0]).find("tr.pq-last-frozen-row");
			if ($tr && $tr.length) {
				var tr = $tr[0];
				ht = tr.offsetTop + tr.offsetHeight
			}
		}
		return ht
	};
	fn._calcRightEdgeCol = function(colIndx) {
		var wd = 0,
			cols = 0,
			CM = this.colModel,
			initH = this.initH,
			o = this.options,
			freezeCols = o.freezeCols,
			numberCell = o.numberCell;
		if (numberCell.show) {
			wd += numberCell.outerWidth;
			cols++
		}
		for (var col = 0; col <= colIndx; col++) {
			if (col < initH && col >= freezeCols) {
				col = initH
			}
			var column = CM[col];
			if (!column.hidden) {
				wd += column.outerWidth;
				cols++
			}
		}
		return {
			width: wd,
			cols: cols
		}
	};
	fn._createHeader = function() {
		this.iHeader.createHeader();
		if (this.options.showHeader) {
			this._trigger("createHeader")
		}
	};
	fn.createTable = function(objP) {
		objP.other = true;
		var iGV = this.iGenerateView;
		iGV.generateView(objP);
		iGV.scrollView()
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		fn = _pq._pqGrid.prototype;
	fn.getHeadCell = function($td) {
		var ci = $td.attr("pq-col-indx"),
			ri = $td.attr("pq-row-indx"),
			isParent, column, o_ci, cCM;
		if (ci != null && ri != null) {
			ci = ci * 1;
			ri = ri * 1;
			column = this.headerCells[ri][ci];
			if (column) {
				cCM = column.colModel;
				o_ci = column.leftPos
			}
		}
		if (cCM && cCM.length) {
			isParent = true
		}
		return {
			col: column,
			ci: ci,
			o_ci: o_ci,
			ri: ri,
			isParent: isParent
		}
	};
	fn.flex = function(ui) {
		this.iResizeColumns.flex(ui)
	};

	function cHeader(that) {
		this.that = that
	}
	_pq.cHeader = cHeader;
	var _p = cHeader.prototype;
	_p.createHeader = function() {
		var that = this.that,
			self = this,
			o = that.options,
			bootstrap = o.bootstrap,
			tblClass = (bootstrap.on ? bootstrap.thead : "") + " pq-grid-header-table ",
			jui = o.ui,
			jui_header = bootstrap.on ? "" : jui.header,
			hwrap = o.hwrap,
			pqpanes = that.pqpanes,
			freezeCols = parseInt(o.freezeCols),
			numberCell = o.numberCell,
			thisColModel = that.colModel,
			SM = o.sortModel,
			depth = that.depth,
			virtualX = o.virtualX,
			colDef = that.iGenerateView.colDef,
			initH = that.initH,
			finalH = that.finalH,
			headerCells = that.headerCells,
			$header_o = that.$header_o;
		$header_o.empty();
		if (finalH == null) {
			return
		}
		if (o.showHeader === false) {
			$header_o.css("display", "none");
			return
		} else {
			$header_o.css("display", "")
		}
		if (hwrap) {
			tblClass += "pq-wrap "
		} else {
			tblClass += "pq-no-wrap "
		}
		var buffer = ["<table class='" + tblClass + "' >"];
		if (depth >= 1) {
			buffer.push("<tr class='pq-row-hidden'>");
			if (numberCell.show) {
				buffer.push("<td style='width:" + numberCell.width + "px;' ></td>")
			}
			for (var i = 0, len = colDef.length; i < len; i++) {
				var colD = colDef[i],
					col = colD.colIndx,
					column = colD.column;
				var wd = column.outerWidth;
				buffer.push("<td style='width:" + wd + "px;' pq-col-indx=" + col + "></td>")
			}
			buffer.push("</tr>")
		}
		var const_cls = "pq-grid-col ";
		for (var row = 0; row < depth; row++) {
			buffer.push("<tr class='pq-grid-title-row'>");
			if (row == 0 && numberCell.show) {
				buffer.push(["<th pq-col-indx='-1' class='pq-grid-number-col' rowspan='", depth, "'>", "<div class='pq-td-div'>", numberCell.title ? numberCell.title : "&nbsp;", "</div></th>"].join(""))
			}
			for (var col = 0; col <= finalH; col++) {
				if (col < initH && col >= freezeCols && virtualX) {
					col = initH;
					if (col > finalH) {
						throw "initH>finalH";
						break
					}
				}
				self.createHeaderCell(row, col, headerCells, buffer, const_cls, freezeCols, initH, depth, SM)
			}
			buffer.push("</tr>")
		}
		that.ovCreateHeader(buffer, const_cls);
		buffer.push("</table>");
		var strTbl = buffer.join("");
		if (pqpanes.vH) {
			$header_o[0].innerHTML = ["<span class='pq-grid-header pq-grid-header-left ", jui_header, "'>", "<div class='pq-grid-header-inner'>", strTbl, "</div>", "</span>", "<span class='pq-grid-header ", jui_header, "'>", "<div class='pq-grid-header-inner'>", strTbl, "</div>", "</span>"].join("")
		} else {
			$header_o[0].innerHTML = ["<span class='pq-grid-header ", jui_header, "'>", "<div class='pq-grid-header-inner'>", strTbl, "</div>", "</span>"].join("")
		}
		var $header = that.$header = $header_o.children(".pq-grid-header"),
			$header_i = $header.children(".pq-grid-header-inner");
		that.$tbl_header = $header_i.children("table");
		that.$header_left = $($header[0]);
		that.$header_left_inner = $($header_i[0]);
		if (pqpanes.vH) {
			that.$header_right = $($header[1]);
			that.$header_right_inner = $($header_i[1])
		}
		$header.click(function(evt) {
			return self._onHeaderClick(evt)
		});
		self._refreshResizeColumn(initH, finalH, thisColModel);
		that._trigger("refreshHeader", null, null)
	};
	_p._onHeaderClick = function(evt) {
		var self = this,
			that = this.that,
			$td, column, obj, iDG = that.iDragColumns;
		if (iDG && iDG.status != "stop") {
			return
		}
		var $target = $(evt.target);
		if ($target.is("input,label")) {
			return true
		}
		$td = $target.closest(".pq-grid-col");
		if ($td.length) {
			obj = that.getHeadCell($td);
			column = obj.col;
			if (column && !obj.isParent) {
				return self._onHeaderCellClick(column, obj.ci, evt)
			}
		}
	};

	function getColIndx(headerCells, row, column) {
		var hc = headerCells[row];
		for (var i = 0; i < hc.length; i++) {
			if (hc[i] == column) {
				return i
			}
		}
	}

	function calcVisibleColumns(CM, colIndx1, colIndx2) {
		var num = 0;
		for (var i = colIndx1; i < colIndx2; i++) {
			var column = CM[i];
			if (column.hidden !== true) {
				num++
			}
		}
		return num
	}
	_p.createHeaderCell = function(row, col, headerCells, buffer, const_cls, freezeCols, initH, depth, SM) {
		var that = this.that,
			sheet = that.options.sheet,
			column = headerCells[row][col],
			CM = that.colModel,
			colSpan = column.colSpan;
		if (column.hidden || colSpan === 0) {
			return
		}
		if (row > 0 && column == headerCells[row - 1][col]) {
			return
		} else {
			if (col > 0 && column == headerCells[row][col - 1]) {
				if (col > initH) {
					return
				} else {
					var orig_colIndx = getColIndx(headerCells, row, column);
					if (orig_colIndx < freezeCols) {
						return
					}
					colSpan = colSpan - calcVisibleColumns(CM, orig_colIndx, col)
				}
			} else {
				if (freezeCols && col < freezeCols && col + colSpan > freezeCols) {
					var colSpan1 = colSpan - calcVisibleColumns(CM, freezeCols, initH),
						colSpan2 = calcVisibleColumns(CM, col, freezeCols);
					colSpan = Math.max(colSpan1, colSpan2)
				}
			}
		}
		var align = column.halign || column.align,
			ccls = column.cls,
			cls = [const_cls],
			title = column.title,
			type = column.type,
			title = typeof title == "function" ? title.call(that, {
				column: column,
				colIndx: col,
				dataIndx: column.dataIndx
			}) : title,
			title = sheet ? _pq.toLetter(col) : title,
			title = title != null ? title : type == "checkbox" && column.cb.header ? "<input type='checkbox'/>" : column.dataIndx;
		column.pqtitle = title;
		if (align) {
			cls.push("pq-align-" + align)
		}
		if (col == freezeCols - 1 && depth == 1) {
			cls.push("pq-last-frozen-col")
		}
		if (col <= freezeCols - 1) {
			cls.push("pq-left-col")
		} else {
			if (col >= initH) {
				cls.push("pq-right-col")
			}
		}
		if (ccls) {
			cls.push(ccls)
		}
		var colIndx = "";
		if (column.colModel == null || column.colModel.length == 0) {
			cls.push("pq-grid-col-leaf")
		}
		var rowIndxDD = "pq-row-indx=" + row,
			colIndxDD = "pq-col-indx=" + col,
			pq_space = SM.space ? "pq-space" : "";
		buffer.push(["<th ", colIndx, " ", colIndxDD, " ", rowIndxDD, " ", " class='", cls.join(" "), "' rowspan=", column.rowSpan, " colspan=", colSpan, ">", "<div class='pq-td-div'>", title, "<span class='pq-col-sort-icon ", pq_space, "'></span>", SM.number ? "<span class='pq-col-sort-count " + pq_space + "'></span>" : "", "</div></th>"].join(""))
	};
	_p._onHeaderCellClick = function(column, colIndx, evt) {
		var that = this.that,
			o = that.options,
			SM = o.sortModel,
			dataIndx = column.dataIndx;
		if (that._trigger("headerCellClick", evt, {
				column: column,
				colIndx: colIndx,
				dataIndx: dataIndx
			}) === false) {
			return
		}
		if (o.selectionModel.column && evt.target.className.indexOf("pq-td-div") == -1) {
			var address = {
					c1: colIndx,
					firstC: colIndx
				},
				oldaddress = that.iSelection.address();
			if (evt.shiftKey) {
				var alen = oldaddress.length;
				if (alen && oldaddress[alen - 1].type == "column") {
					var last = oldaddress[alen - 1];
					last.c1 = last.firstC;
					last.c2 = colIndx;
					last.r1 = last.r2 = last.type = undefined
				}
				address = oldaddress
			}
			that.range(address, false).select();
			that.focus({
				rowIndxPage: that.getFirstVisibleRIP(true),
				colIndx: colIndx
			});
			return
		}
		if (!SM.on) {
			return
		}
		if (column.sortable == false) {
			return
		}
		that.sort({
			sorter: [{
				dataIndx: dataIndx
			}],
			addon: true,
			tempMultiple: SM.multiKey && evt[SM.multiKey],
			evt: evt
		})
	};
	_p._refreshResizeColumn = function(initH, finalH, model) {
		var that = this.that,
			options = that.options,
			FMficon = options.filterModel.ficon ? true : false,
			numberCell = options.numberCell,
			freezeCols = parseInt(options.freezeCols),
			buffer1 = [],
			buffer2 = [],
			pqpanes_vH = that.pqpanes.vH,
			lftCol = 0,
			lft = 0;
		if (numberCell.show) {
			lftCol = numberCell.outerWidth;
			if (numberCell.resizable) {
				lft = lftCol - 5;
				buffer1.push("<div pq-col-indx='-1' style='left:", lft, "px;'", " class='pq-grid-col-resize-handle'>&nbsp;</div>")
			}
		}
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column;
			var cficon = column.ficon,
				ficon = cficon || cficon == null && FMficon,
				buffer = buffer1;
			lftCol += column.outerWidth;
			if (column.resizable !== false || ficon) {
				if (pqpanes_vH && col >= freezeCols) {
					buffer = buffer2
				}
				lft = lftCol - 5;
				buffer.push("<div pq-col-indx='", col, "' style='left:", lft, "px;'", " class='pq-grid-col-resize-handle'>&nbsp;</div>")
			}
		}
		if (buffer2.length) {
			that.$header_right_inner.append(buffer2.join(""))
		}
		that.$header_left_inner.append(buffer1.join(""))
	};
	_p.refreshHeaderSortIcons = function() {
		var that = this.that,
			o = that.options,
			BS = o.bootstrap,
			jui = o.ui,
			$header = that.$header;
		if (!$header) {
			return
		}
		var sorters = that.iSort.getSorter(),
			sorterLen = sorters.length,
			number = false,
			SM = that.options.sortModel;
		if (SM.number && sorterLen > 1) {
			number = true
		}
		for (var i = 0; i < sorterLen; i++) {
			var sorter = sorters[i],
				dataIndx = sorter.dataIndx,
				colIndx = that.getColIndx({
					dataIndx: dataIndx
				}),
				dir = sorter.dir,
				addClass = " pq-col-sort-" + (dir == "up" ? "asc" : "desc"),
				cls2 = BS.on ? " glyphicon glyphicon-arrow-" + dir : "ui-icon ui-icon-triangle-1-" + (dir == "up" ? "n" : "s");
			var $th = $header.find(".pq-grid-col-leaf[pq-col-indx=" + colIndx + "]");
			$th.addClass(addClass);
			$th.find(".pq-col-sort-icon").addClass(cls2);
			if (number) {
				$th.find(".pq-col-sort-count").html(i + 1)
			}
		}
	};
	var cResizeColumns = function(that) {
		this.that = that;
		var self = this;
		that.$header_o.on({
			mousedown: function(evt) {
				if (!evt.pq_composed) {
					var $target = $(evt.target);
					self.setDraggables(evt);
					evt.pq_composed = true;
					var e = $.Event("mousedown", evt);
					$target.trigger(e)
				}
			},
			dblclick: function(evt) {
				self.doubleClick(evt)
			}
		}, ".pq-grid-col-resize-handle");
		var o = that.options,
			flex = o.flex;
		if (flex.on && flex.one) {
			that.one("ready", function() {
				self.flex()
			})
		}
	};
	_pq.cResizeColumns = cResizeColumns;
	var _pResizeColumns = cResizeColumns.prototype = new _pq.cClass;
	_pResizeColumns.doubleClick = function(evt) {
		var that = this.that,
			o = that.options,
			flex = o.flex,
			$target = $(evt.target),
			colIndx = parseInt($target.attr("pq-col-indx"));
		if (isNaN(colIndx)) {
			return
		}
		if (flex.on) {
			this.flex(flex.all && !o.scrollModel.autoFit ? {} : {
				colIndx: [colIndx]
			})
		}
	};
	_pResizeColumns._initFlexTable = function($tbl, takeNextRow) {
		if ($tbl.length) {
			var $tr = $tbl.css({
					tableLayout: "auto",
					width: ""
				}).addClass("pq-no-wrap").removeClass("pq-wrap").children("tbody").children(".pq-row-hidden"),
				th, $ths = $tr.children("td").css("width", "");
			if (takeNextRow) {
				var $tds = $tr.next().children("td"),
					j = 0,
					widths = [],
					colspan, skip = [];
				$tds.each(function(i, td) {
					colspan = td.getAttribute("colspan") * 1;
					if (colspan > 1) {
						j += colspan - 1;
						widths[j] = td.offsetWidth;
						th = $ths[j];
						if (!th || !th.offsetWidth) {
							for (var k = j - (colspan - 1); k < j; k++) {
								skip[k] = true
							}
						}
					}
					j++
				})
			}
		}
		return [$ths || $(), skip || [], widths]
	};
	_pResizeColumns.flex = function(objP) {
		objP = objP || {};
		var that = this.that,
			o = that.options;
		var $ogrid = that.element,
			numberCell = o.numberCell,
			colIndx = objP.colIndx,
			lenColIndx, dataIndx = objP.dataIndx,
			refresh = objP.refresh == null ? true : objP.refresh,
			widthDirty = false,
			cbWidth = 0,
			$tbl = that.$tbl,
			$tbl_header = that.$tbl_header,
			$tblB = $tbl && $tbl.length ? $($tbl[0]).clone() : $(),
			$tblS = that.tables && that.tables.length ? that.tables[0].$tbl : null,
			$tblS = $tblS ? $($tblS[0]).clone() : $(),
			$tblH = $tbl_header && $tbl_header.length ? $($tbl_header[0]).clone() : $();
		var $merged = $tblB.find(".pq-merge-cell");
		$merged.each(function(i, ele) {
			ele.innerHTML = $(ele).find(".pq-merge-inner")[0].innerHTML;
			ele.style.whiteSpace = "noWrap"
		});
		if (dataIndx != null) {
			colIndx = [];
			for (var i = 0, len = dataIndx.length; i < len; i++) {
				var colIndx2 = that.colIndxs[dataIndx[i]];
				if (colIndx2 != null) {
					colIndx.push(colIndx2)
				}
			}
		}
		if (colIndx != null) {
			colIndx.sort(function(a, b) {
				return a - b
			});
			lenColIndx = colIndx.length
		}
		$tblH.find("tr.pq-grid-header-search-row").remove();
		var $grid = $("<div class='pq-grid'>").append($tblH).append($tblS).append($tblB);
		$grid.addClass($ogrid.attr("class"));
		$ogrid.parent().append($grid);
		var obj = this._initFlexTable($tblB, true),
			$tdsB = obj[0],
			skipArr = obj[1],
			widths = obj[2],
			widthTaken = 0,
			$tdsS = this._initFlexTable($tblS)[0],
			$tdsH = this._initFlexTable($tblH)[0];
		var j = numberCell.show ? 0 : -1;
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column;
			j++;
			if (colIndx) {
				if (!colIndx.length) {
					break
				} else {
					if (colIndx[0] === col) {
						colIndx.splice(0, 1)
					} else {
						continue
					}
				}
			}
			var tdB = $tdsB[j],
				tdH = $tdsH[j],
				tdS = $tdsS[j],
				skipBody = skipArr[j],
				widthB = tdB ? tdB.offsetWidth : 0,
				widthS = tdS ? tdS.offsetWidth : 0,
				widthH = tdH ? tdH.offsetWidth : 0;
			if (skipBody) {
				widthB = 0
			} else {
				if (widthTaken) {
					widthB = widths[j] - widthTaken;
					widthTaken = 0
				}
			}
			var width = Math.max(widthB, widthS, widthH) - cbWidth + 1;
			if (skipBody) {
				widthTaken += width
			}
			if (column._width !== width) {
				widthDirty = true;
				column.width = width;
				if (lenColIndx === 1) {
					column._resized = true
				}
			}
		}
		$grid.remove();
		if (widthDirty && refresh) {
			that.refresh({
				source: "flex",
				colModel: true
			})
		}
	};
	_pResizeColumns.setDraggables = function(evt) {
		var $div = $(evt.target),
			that = this.that,
			self = this;
		var drag_left, drag_new_left, cl_left;
		$div.draggable({
			axis: "x",
			helper: function(evt, ui) {
				var $target = $(evt.target),
					indx = parseInt($target.attr("pq-col-indx"));
				self._setDragLimits(indx);
				self._getDragHelper(evt, ui);
				return $target
			},
			start: function(evt, ui) {
				drag_left = ui.position.left;
				cl_left = parseInt(self.$cl[0].style.left)
			},
			drag: function(evt, ui) {
				drag_new_left = ui.position.left;
				var dx = drag_new_left - drag_left;
				self.$cl[0].style.left = cl_left + dx + "px"
			},
			stop: function(evt, ui) {
				return self.resizeStop(evt, ui, drag_left)
			}
		})
	};
	_pResizeColumns._getDragHelper = function(evt) {
		var that = this.that,
			o = that.options,
			freezeCols = parseInt(o.freezeCols),
			$target = $(evt.target),
			$grid_center = that.$grid_center,
			indx = parseInt($target.attr("pq-col-indx")),
			ht = $grid_center.outerHeight();
		this.$cl = $("<div class='pq-grid-drag-bar'></div>").appendTo($grid_center);
		this.$clleft = $("<div class='pq-grid-drag-bar'></div>").appendTo($grid_center);
		this.$cl.height(ht);
		this.$clleft.height(ht);
		var ele = $("[pq-col-indx=" + indx + "]", that.$header)[0];
		var lft = ele.offsetLeft;
		if (that.pqpanes.vH) {
			if (indx >= freezeCols) {
				lft -= that.$header[1].scrollLeft
			}
		} else {
			lft += that.$header[0].offsetLeft;
			lft -= that.$header[0].scrollLeft
		}
		this.$clleft.css({
			left: lft
		});
		lft = lft + ele.offsetWidth;
		this.$cl.css({
			left: lft
		})
	};
	_pResizeColumns._setDragLimits = function(colIndx) {
		if (colIndx < 0) {
			return
		}
		var that = this.that,
			CM = that.colModel,
			column = CM[colIndx],
			o = that.options,
			numberCell = o.numberCell,
			$head = that.$header_left;
		if (colIndx >= o.freezeCols && that.pqpanes.vH) {
			$head = that.$header_right
		}
		var $pQuery_col = $head.find("th[pq-col-indx='" + colIndx + "']");
		var cont_left = $pQuery_col.offset().left + column._minWidth;
		var cont_right = cont_left + column._maxWidth - column._minWidth;
		var $pQuery_drag = $head.find("div.pq-grid-col-resize-handle[pq-col-indx=" + colIndx + "]");
		$pQuery_drag.draggable("option", "containment", [cont_left, 0, cont_right, 0])
	};
	_pResizeColumns.resizeStop = function(evt, ui, drag_left) {
		var that = this.that,
			CM = that.colModel,
			thisOptions = that.options,
			self = this,
			numberCell = thisOptions.numberCell;
		self.$clleft.remove();
		self.$cl.remove();
		var drag_new_left = ui.position.left;
		var dx = drag_new_left - drag_left;
		var $target = $(ui.helper),
			colIndx = parseInt($target.attr("pq-col-indx")),
			column;
		if (colIndx == -1) {
			column = null;
			var oldWidth = parseInt(numberCell.width),
				newWidth = oldWidth + dx;
			numberCell.width = newWidth
		} else {
			column = CM[colIndx];
			var oldWidth = parseInt(column.width),
				newWidth = oldWidth + dx;
			column.width = newWidth;
			column._resized = true
		}
		that.refresh();
		that._trigger("columnResize", evt, {
			colIndx: colIndx,
			column: column,
			dataIndx: column ? column.dataIndx : null,
			oldWidth: oldWidth,
			newWidth: column ? column.width : numberCell.width
		})
	};
	var cDragColumns = function(that) {
		var self = this;
		self.that = that;
		self.$drag_helper = null;
		var dragColumns = that.options.dragColumns,
			topIcon = dragColumns.topIcon,
			bottomIcon = dragColumns.bottomIcon;
		self.status = "stop";
		self.$arrowTop = $("<div class='pq-arrow-down ui-icon " + topIcon + "'></div>").appendTo(that.element);
		self.$arrowBottom = $("<div class='pq-arrow-up ui-icon " + bottomIcon + "' ></div>").appendTo(that.element);
		self.hideArrows();
		if (dragColumns && dragColumns.enabled) {
			that.$header_o.on("mousedown", ".pq-grid-col", self.onColMouseDown(self, that))
		}
	};
	_pq.cDragColumns = cDragColumns;
	var _pDragColumns = cDragColumns.prototype;
	_pDragColumns.onColMouseDown = function(self, that) {
		return function(evt) {
			var colobj, col, parent, e, $td = $(this);
			if (!evt.pq_composed) {
				if ($(evt.target).is("input,select,textarea")) {
					return
				}
				colobj = that.getHeadCell($td);
				col = colobj.col;
				parent = col ? col.parent : null;
				if (!col || col.nodrag || col._nodrag || parent && parent.colSpan == 1) {
					return
				}
				if (self.setDraggable(evt, col, colobj)) {
					evt.pq_composed = true;
					e = $.Event("mousedown", evt);
					$(evt.target).trigger(e)
				}
			}
		}
	};
	_pDragColumns.showFeedback = function($td, leftDrop) {
		var that = this.that,
			td = $td[0],
			offParent = td.offsetParent.offsetParent,
			grid_center_top = that.$grid_center[0].offsetTop,
			left = td.offsetLeft - offParent.offsetParent.scrollLeft + (!leftDrop ? td.offsetWidth : 0) - 8,
			top = grid_center_top + td.offsetTop - 16,
			top2 = grid_center_top + that.$header[0].offsetHeight;
		this.$arrowTop.css({
			left: left,
			top: top,
			display: ""
		});
		this.$arrowBottom.css({
			left: left,
			top: top2,
			display: ""
		})
	};
	_pDragColumns.showArrows = function() {
		this.$arrowTop.show();
		this.$arrowBottom.show()
	};
	_pDragColumns.hideArrows = function() {
		this.$arrowTop.hide();
		this.$arrowBottom.hide()
	};
	_pDragColumns.updateDragHelper = function(accept) {
		var that = this.that,
			dragColumns = that.options.dragColumns,
			acceptIcon = dragColumns.acceptIcon,
			rejectIcon = dragColumns.rejectIcon,
			$drag_helper = this.$drag_helper;
		if (!$drag_helper) {
			return
		}
		if (accept) {
			$drag_helper.children("span.pq-drag-icon").addClass(acceptIcon).removeClass(rejectIcon);
			$drag_helper.removeClass("ui-state-error")
		} else {
			$drag_helper.children("span.pq-drag-icon").removeClass(acceptIcon).addClass(rejectIcon);
			$drag_helper.addClass("ui-state-error")
		}
	};
	_pDragColumns.setDraggable = function(evt, column, colobj) {
		var $td = $(evt.currentTarget),
			self = this,
			that = self.that;
		if (!$td.hasClass("ui-draggable")) {
			$td.draggable({
				distance: 10,
				cursorAt: {
					top: -18,
					left: -10
				},
				zIndex: "1000",
				appendTo: that.element,
				revert: "invalid",
				helper: self.dragHelper(self, that, column),
				start: self.onStart(self, that, column, colobj),
				drag: self.onDrag(self, that),
				stop: function() {
					if (that.element) {
						self.status = "stop";
						that.$header.find(".pq-grid-col-resize-handle").show();
						self.hideArrows()
					}
				}
			});
			return true
		}
	};
	_pDragColumns.onStart = function(self, that, column, colobj) {
		return function(evt) {
			if (that._trigger("columnDrag", evt.originalEvent, {
					column: column
				}) === false) {
				return false
			}
			self.setDroppables(colobj)
		}
	};
	_pDragColumns.onDrag = function(self, that) {
		return function(evt, ui) {
			self.status = "drag";
			var $td = $(".pq-drop-hover", that.$header);
			if ($td.length > 0) {
				self.showArrows();
				self.updateDragHelper(true);
				var wd = $td.width();
				var lft = evt.clientX - $td.offset().left + $(document).scrollLeft();
				if (lft < wd / 2) {
					self.leftDrop = true;
					self.showFeedback($td, true)
				} else {
					self.leftDrop = false;
					self.showFeedback($td, false)
				}
			} else {
				self.hideArrows();
				var $group = $(".pq-drop-hover", that.$top);
				if ($group.length) {
					self.updateDragHelper(true)
				} else {
					self.updateDragHelper()
				}
			}
		}
	};
	_pDragColumns.dragHelper = function(self, that, column) {
		var rejectIcon = that.options.dragColumns.rejectIcon;
		return function() {
			self.status = "helper";
			that.$header.find(".pq-grid-col-resize-handle").hide();
			var $drag_helper = $("<div class='pq-col-drag-helper ui-widget-content ui-corner-all panel panel-default' ><span class='pq-drag-icon ui-icon " + rejectIcon + " glyphicon glyphicon-remove'></span>" + column.pqtitle + "</div>");
			self.$drag_helper = $drag_helper;
			return $drag_helper[0]
		}
	};
	_pDragColumns._columnIndexOf = function(colModel, column) {
		for (var i = 0, len = colModel.length; i < len; i++) {
			if (colModel[i] == column) {
				return i
			}
		}
		return -1
	};
	_pDragColumns.setDroppables = function(colObj) {
		var self = this,
			that = self.that,
			col_o = colObj.col,
			ri_o = colObj.ri,
			ci_o1 = colObj.o_ci,
			ci_o2 = ci_o1 + col_o.o_colspan,
			obj, ri, ci, col, $td, td_isDroppable, $header_left = that.$header_left,
			i, onDrop = self.onDrop(),
			objDrop = {
				hoverClass: "pq-drop-hover ui-state-highlight",
				accept: ".pq-grid-col",
				tolerance: "pointer",
				drop: onDrop
			},
			$tds = $header_left.find(".pq-left-col"),
			$tds2 = that.pqpanes.v || that.pqpanes.vH ? that.$header_right.find(".pq-right-col") : $header_left.find(".pq-right-col");
		$tds = $tds.add($tds2);
		i = $tds.length;
		while (i--) {
			$td = $($tds[i]);
			td_isDroppable = $td.hasClass("ui-droppable");
			obj = that.getHeadCell($td);
			col = obj.col;
			ri = obj.ri;
			ci = obj.ci;
			if (col == col_o || col.nodrop || col._nodrop || ri_o < ri && ci >= ci_o1 && ci < ci_o2) {
				if (td_isDroppable) {
					$td.droppable("destroy")
				}
			} else {
				if (!td_isDroppable) {
					$td.droppable(objDrop)
				}
			}
		}
	};
	_pDragColumns.onDrop = function() {
		var self = this,
			that = this.that;
		return function(evt, ui) {
			if (self.dropPending) {
				return
			}
			var colIndxDrag = ui.draggable.attr("pq-col-indx") * 1,
				rowIndxDrag = ui.draggable.attr("pq-row-indx") * 1,
				$this = $(this),
				colIndxDrop = $this.attr("pq-col-indx") * 1,
				rowIndxDrop = $this.attr("pq-row-indx") * 1,
				left = self.leftDrop;
			var column = self.moveColumn(colIndxDrag, colIndxDrop, left, rowIndxDrag, rowIndxDrop);
			self.dropPending = true;
			window.setTimeout(function() {
				that.iColModel.init();
				var ret = that._trigger("columnOrder", null, {
					dataIndx: column.dataIndx,
					column: column,
					oldcolIndx: colIndxDrag,
					colIndx: that.getColIndx({
						column: column
					})
				});
				if (ret !== false) {
					that.refresh()
				}
				self.dropPending = false
			}, 0)
		}
	};

	function getRowIndx(hc, colIndx, lastRowIndx) {
		var column, column2;
		while (lastRowIndx) {
			column = hc[lastRowIndx][colIndx];
			column2 = hc[lastRowIndx - 1][colIndx];
			if (column != column2) {
				break
			}
			lastRowIndx--
		}
		return lastRowIndx
	}
	_pDragColumns.moveColumn = function(colIndxDrag, colIndxDrop, leftDrop, rowIndxDrag, rowIndxDrop) {
		var that = this.that,
			self = this,
			optCM = that.options.colModel,
			hc = that.headerCells,
			lastRowIndx = that.depth - 1,
			rowIndxDrag = rowIndxDrag == null ? getRowIndx(hc, colIndxDrag, lastRowIndx) : rowIndxDrag,
			rowIndxDrop = rowIndxDrop == null ? getRowIndx(hc, colIndxDrop, lastRowIndx) : rowIndxDrop,
			columnDrag = hc[rowIndxDrag][colIndxDrag],
			columnDrop = hc[rowIndxDrop][colIndxDrop],
			colModelDrag = rowIndxDrag ? hc[rowIndxDrag - 1][colIndxDrag].colModel : optCM,
			colModelDrop = rowIndxDrop ? hc[rowIndxDrop - 1][colIndxDrop].colModel : optCM;
		var indxDrag = self._columnIndexOf(colModelDrag, columnDrag),
			decr = leftDrop ? 1 : 0;
		var column = colModelDrag.splice(indxDrag, 1)[0],
			indxDrop = self._columnIndexOf(colModelDrop, columnDrop) + 1 - decr;
		colModelDrop.splice(indxDrop, 0, column);
		return column
	}
})(jQuery);
(function($) {
	function cHierarchy(that, column) {
		this.that = that;
		var self = this,
			o = that.options;
		this.type = "detail";
		this.refreshComplete = true;
		this.detachView = false;
		that.on("cellClick", function(evt, ui) {
			return self.toggle(evt, ui)
		}).on("cellKeyDown", function(evt, ui) {
			if (evt.keyCode == $.ui.keyCode.ENTER) {
				return self.toggle(evt, ui)
			}
		}).on("refresh", function(evt, ui) {
			return self.aftertable()
		}).on("beforeTableView", function(evt, ui) {
			return self.beforeTableView(evt, ui)
		}).on("tableWidthChange", function(evt, ui) {
			return self.tableWidthChange(evt, ui)
		});
		column._render = function(ui) {
			var DTM = o.detailModel,
				cellData = ui.cellData,
				rd = ui.rowData,
				hicon;
			if (rd.pq_gsummary || rd.pq_gtitle) {
				return
			}
			hicon = cellData && cellData.show ? DTM.expandIcon : DTM.collapseIcon;
			return "<div class='ui-icon " + hicon + "'></div>"
		}
	}
	$.paramquery.cHierarchy = cHierarchy;
	var _pHierarchy = cHierarchy.prototype = new $.paramquery.cClass;
	_pHierarchy.tableWidthChange = function() {
		if (!this.refreshComplete) {
			return
		}
		this.refreshComplete = false;
		var that = this.that,
			$tds = that.$tbl.children("tbody").children("tr.pq-detail-child").children("td.pq-detail-child");
		for (var i = 0, tdLen = $tds.length; i < tdLen; i++) {
			var td = $tds[i],
				$td = $(td);
			var $grids = $td.find(".pq-grid");
			for (var j = 0, gridLen = $grids.length; j < gridLen; j++) {
				var $grid = $($grids[j]);
				if ($grid.is(":visible")) {
					$grid.pqGrid("onWindowResize")
				}
			}
		}
		this.refreshComplete = true
	};
	_pHierarchy.aftertable = function($trs) {
		var that = this.that,
			initDetail = that.options.detailModel.init,
			data = that.pdata;
		if (!this.refreshComplete) {
			return
		}
		this.refreshComplete = false;
		$trs = $trs ? $trs : that.$tbl.children("tbody").children("tr.pq-detail-child");
		for (var i = 0, trLen = $trs.length; i < trLen; i++) {
			var tr = $trs[i],
				$tr = $(tr),
				rowIndxPage = $tr.attr("pq-row-indx"),
				rowData = data[rowIndxPage],
				newCreate = false,
				$detail = rowData.pq_detail.child;
			if (!$detail) {
				if (typeof initDetail == "function") {
					newCreate = true;
					$detail = initDetail.call(that.element[0], {
						rowData: rowData
					});
					rowData.pq_detail.child = $detail;
					rowData.pq_detail.height = 25
				}
			}
			var $td = $tr.children("td.pq-detail-child");
			$td.append($detail);
			var $grids = $td.find(".pq-grid");
			for (var j = 0, gridLen = $grids.length; j < gridLen; j++) {
				var $grid = $($grids[j]);
				if (newCreate) {
					if ($grid.hasClass("pq-pending-refresh") && $grid.is(":visible")) {
						$grid.removeClass("pq-pending-refresh");
						$grid.pqGrid("refresh")
					}
				} else {
					if ($grid.is(":visible")) {
						$grid.pqGrid("onWindowResize")
					}
				}
			}
		}
		this.refreshComplete = true;
		this.detachView = false
	};
	_pHierarchy.beforeTableView = function(evt, ui) {
		if (!this.detachView) {
			this.detachInitView();
			this.detachView = true
		}
	};
	_pHierarchy.detachInitView = function($trs) {
		var that = this.that,
			$tbl = that.$tbl;
		if (!$tbl || !$tbl.length) {
			return
		}
		$trs = $trs ? $trs : $tbl.children("tbody").children("tr.pq-detail-child");
		for (var i = 0; i < $trs.length; i++) {
			var tr = $trs[i],
				$tr = $(tr),
				$child = $tr.children("td.pq-detail-child").children();
			$child.detach()
		}
	};
	_pHierarchy.toggle = function(evt, ui) {
		var that = this.that,
			column = ui.column,
			rowData = ui.rowData,
			rowIndx = ui.rowIndx,
			type = this.type;
		if (rowData.pq_gtitle || rowData.pq_gsummary) {
			return
		}
		if (column && column.type === type) {
			var dataIndx = "pq_detail",
				obj = {
					rowIndx: rowIndx,
					focus: true
				};
			if (rowData[dataIndx] == null) {
				that.rowExpand(obj)
			} else {
				if (rowData[dataIndx]["show"] === false) {
					that.rowExpand(obj)
				} else {
					this.rowCollapse(obj)
				}
			}
		}
	};
	_pHierarchy.rowExpand = function(objP) {
		this.normalize(objP);
		var that = this.that,
			o = that.options,
			rowData = objP.rowData,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			detM = o.detailModel,
			dataIndx = "pq_detail";
		if (rowData == null) {
			return
		}
		if (that._trigger("beforeRowExpand", null, objP) === false) {
			return false
		}
		if (rowData[dataIndx] == null) {
			rowData[dataIndx] = {
				show: true
			}
		} else {
			if (rowData[dataIndx]["show"] === false) {
				rowData[dataIndx]["show"] = true
			}
		}
		if (!detM.cache) {
			this.rowInvalidate(objP)
		}
		that.refreshRow({
			rowIndx: rowIndx
		});
		var buffer = [];
		that.iGenerateView._generateDetailRow(rowData, rowIndxPage, buffer);
		var $tr = that.getRow({
			rowIndxPage: rowIndxPage
		});
		$tr.after(buffer.join(""));
		this.aftertable($tr.next());
		if (objP.focus) {
			that.getCell({
				rowIndx: rowIndx,
				dataIndx: dataIndx
			}).attr("tabindex", "0").focus()
		}
		if (objP.scrollRow) {
			this.scrollRow({
				rowIndx: rowIndx
			})
		}
	};
	_pHierarchy.rowInvalidate = function(objP) {
		var that = this.that,
			rowData = that.getRowData(objP),
			dataIndx = "pq_detail",
			pq_detail = rowData[dataIndx],
			$temp = pq_detail ? pq_detail.child : null;
		if ($temp) {
			$temp.remove();
			rowData[dataIndx]["child"] = null;
			rowData[dataIndx]["height"] = 0
		}
	};
	_pHierarchy.normalize = function(objP) {
		var that = this.that,
			rowI = objP.rowIndx,
			rowIP = objP.rowIndxPage,
			rowIO = that.rowIndxOffset;
		objP.rowIndx = rowI == null ? rowIP + rowIO : rowI;
		objP.rowIndxPage = rowIP == null ? rowI - rowIO : rowIP;
		objP.rowData = that.getRowData(objP)
	};
	_pHierarchy.rowCollapse = function(objP) {
		this.normalize(objP);
		var that = this.that,
			o = that.options,
			rowData = objP.rowData,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			detM = o.detailModel,
			dataIndx = "pq_detail";
		if (rowData == null || rowData[dataIndx] == null) {
			return
		} else {
			if (rowData[dataIndx]["show"] === true) {
				if (!detM.cache) {
					this.rowInvalidate(objP)
				}
				rowData[dataIndx]["show"] = false;
				if (o.virtualY) {
					that.refresh()
				} else {
					var $tr = that.getRow({
						rowIndxPage: rowIndxPage
					}).next("tr.pq-detail-child");
					if ($tr.length) {
						this.detachInitView($tr);
						$tr.remove();
						that.refreshRow({
							rowIndx: rowIndx
						})
					}
					if (objP.focus) {
						that.getCell({
							rowIndx: rowIndx,
							dataIndx: dataIndx
						}).attr("tabindex", "0").focus()
					}
				}
				if (objP.scrollRow) {
					var rowIndx = objP.rowIndx;
					this.scrollRow({
						rowIndx: rowIndx
					})
				}
			}
		}
	}
})(jQuery);
(function($) {
	var cRefresh = function(that) {
		var self = this;
		self.that = that;
		that.on("dataReadyDone", function() {
			self.calcVisibleV()
		}).on("CMInit", function() {
			self.calcVisibleH()
		}).on("refresh", function() {
			self.summaryTable()
		})
	};
	$.paramquery.cRefresh = cRefresh;
	var _pRefresh = cRefresh.prototype;
	_pRefresh._computeOuterWidths = function() {
		var that = this.that,
			o = that.options,
			CBWidth = 0,
			numberCell = o.numberCell,
			thisColModel = that.colModel,
			CMLength = thisColModel.length;
		for (var i = 0; i < CMLength; i++) {
			var column = thisColModel[i];
			column.outerWidth = column._width + CBWidth
		}
		if (numberCell.show) {
			numberCell.outerWidth = numberCell.width
		}
	};
	_pRefresh.autoFit = function() {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length;
		var wdAllCols = that.calcWidthCols(-1, CMLength, true);
		var wdCont = this.contWd - this.getSBWidth();
		if (wdAllCols !== wdCont) {
			var diff = wdAllCols - wdCont,
				columnResized, availWds = [];
			for (var i = 0; i < CMLength; i++) {
				var column = CM[i],
					colPercent = column._percent,
					resizable = column.resizable !== false,
					resized = column._resized,
					hidden = column.hidden;
				if (!hidden && !colPercent && !resized) {
					var availWd;
					if (diff < 0) {
						availWd = column._maxWidth - column._width;
						if (availWd) {
							availWds.push({
								availWd: -1 * availWd,
								colIndx: i
							})
						}
					} else {
						availWd = column._width - column._minWidth;
						if (availWd) {
							availWds.push({
								availWd: availWd,
								colIndx: i
							})
						}
					}
				}
				if (resized) {
					columnResized = column;
					delete column._resized
				}
			}
			availWds.sort(function(obj1, obj2) {
				if (obj1.availWd > obj2.availWd) {
					return 1
				} else {
					if (obj1.availWd < obj2.availWd) {
						return -1
					} else {
						return 0
					}
				}
			});
			for (var i = 0, len = availWds.length; i < len; i++) {
				var obj = availWds[i],
					availWd = obj.availWd,
					colIndx = obj.colIndx,
					part = Math.round(diff / (len - i)),
					column = CM[colIndx],
					wd, colWd = column._width;
				if (Math.abs(availWd) > Math.abs(part)) {
					wd = colWd - part;
					diff = diff - part
				} else {
					wd = colWd - availWd;
					diff = diff - availWd
				}
				column.width = column._width = wd
			}
			if (diff != 0 && columnResized) {
				var wd = columnResized._width - diff;
				if (wd > columnResized._maxWidth) {
					wd = columnResized._maxWidth
				} else {
					if (wd < columnResized._minWidth) {
						wd = columnResized._minWidth
					}
				}
				columnResized.width = columnResized._width = wd
			}
		}
	};
	_pRefresh.autoLastColumn = function() {
		var that = this.that,
			o = that.options,
			cbWidth = 0,
			CM = that.colModel,
			CMLength = CM.length,
			freezeCols = o.freezeCols,
			wdCont = this.contWd - this.getSBWidth(),
			wd1 = that.calcWidthCols(-1, freezeCols, true);
		var rem = wdCont - wd1,
			_found = false,
			lastColIndx = that.getLastVisibleCI();
		if (lastColIndx == null) {
			return
		}
		var lastColumn = CM[lastColIndx];
		if (lastColumn._percent) {
			return
		}
		var lastColWd = lastColumn._width,
			wd, lastColMinWidth = lastColumn._minWidth,
			lastColMaxWidth = lastColumn._maxWidth;
		for (var i = CMLength - 1; i >= freezeCols; i--) {
			var column = CM[i];
			if (column.hidden) {
				continue
			}
			var outerWd = column._width + cbWidth;
			rem = rem - outerWd;
			if (rem < 0) {
				_found = true;
				if (lastColWd + rem >= lastColMinWidth) {
					wd = lastColWd + rem
				} else {
					wd = lastColWd + outerWd + rem
				}
				break
			}
		}
		if (!_found) {
			wd = lastColWd + rem
		}
		if (wd > lastColMaxWidth) {
			wd = lastColMaxWidth
		} else {
			if (wd < lastColMinWidth) {
				wd = lastColMinWidth
			}
		}
		lastColumn.width = lastColumn._width = wd
	};
	_pRefresh.numericVal = function(width, totalWidth) {
		var val;
		if ((width + "").indexOf("%") > -1) {
			val = parseInt(width) * totalWidth / 100
		} else {
			val = parseInt(width)
		}
		return Math.round(val)
	};
	_pRefresh.refreshColumnWidths = function(ui) {
		ui = ui || {};
		var that = this.that,
			o = that.options,
			numberCell = o.numberCell,
			flexWidth = o.width === "flex",
			cbWidth = 0,
			CM = that.colModel,
			SM = o.scrollModel,
			SMLastColumn = SM.lastColumn,
			autoFit = SM.autoFit,
			contWd = this.contWd,
			CMLength = CM.length,
			sbWidth = this.getSBWidth(),
			minColWidth = o._minColWidth,
			maxColWidth = o._maxColWidth;
		var numberCellWidth = 0;
		if (numberCell.show) {
			if (numberCell.width < numberCell.minWidth) {
				numberCell.width = numberCell.minWidth
			}
			numberCellWidth = numberCell.outerWidth = numberCell.width
		}
		var availWidth = flexWidth ? null : contWd - sbWidth - numberCellWidth,
			minColWidth = Math.floor(this.numericVal(minColWidth, availWidth)),
			maxColWidth = Math.ceil(this.numericVal(maxColWidth, availWidth)),
			rem = 0;
		if (!flexWidth && availWidth < 5 || isNaN(availWidth)) {
			if (o.debug) {
				throw "availWidth N/A"
			}
			return
		}
		delete that.percentColumn;
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				hidden = column.hidden;
			if (hidden) {
				continue
			}
			var colWidth = column.width,
				colWidthPercent = (colWidth + "").indexOf("%") > -1 ? true : null,
				colMinWidth = column.minWidth,
				colMaxWidth = column.maxWidth,
				colMinWidth = colMinWidth ? this.numericVal(colMinWidth, availWidth) : minColWidth,
				colMaxWidth = colMaxWidth ? this.numericVal(colMaxWidth, availWidth) : maxColWidth;
			if (colMaxWidth < colMinWidth) {
				colMaxWidth = colMinWidth
			}
			if (colWidth != undefined) {
				var wdFrac, wd = 0;
				if (!flexWidth && colWidthPercent) {
					that.percentColumn = true;
					column.resizable = false;
					column._percent = true;
					wdFrac = this.numericVal(colWidth, availWidth) - cbWidth;
					wd = Math.floor(wdFrac);
					rem += wdFrac - wd;
					if (rem >= 1) {
						wd += 1;
						rem -= 1
					}
				} else {
					if (colWidth) {
						wd = parseInt(colWidth)
					}
				}
				if (wd < colMinWidth) {
					wd = colMinWidth
				} else {
					if (!flexWidth && wd > colMaxWidth) {
						wd = colMaxWidth
					}
				}
				column._width = wd
			} else {
				column._width = colMinWidth
			}
			if (!colWidthPercent) {
				column.width = column._width
			}
			column._minWidth = colMinWidth;
			column._maxWidth = flexWidth ? 1e3 : colMaxWidth
		}
		if (flexWidth === false && ui.refreshWidth !== false) {
			if (autoFit) {
				this.autoFit()
			}
			if (SMLastColumn === "auto" && o.virtualX) {
				this.autoLastColumn()
			}
		}
		this._computeOuterWidths()
	};
	_pRefresh.estRowsInViewPort = function() {
		var noRows = Math.ceil(this.contHt / this.rowHt);
		this.that.pageSize = noRows;
		return noRows
	};
	_pRefresh._refreshFrozenLine = function() {
		var that = this.that,
			o = that.options,
			numberCell = o.numberCell,
			$container = that.$cont_o,
			freezeBorders = o.freezeBorders,
			freezeCols = o.freezeCols,
			freezeRows = o.freezeRows;
		if (this.$freezeLine) {
			this.$freezeLine.remove()
		}
		if (this.$freezeLineH) {
			this.$freezeLineH.remove()
		}
		if (freezeBorders) {
			if (freezeCols) {
				var lft = that.calcWidthCols(-1, freezeCols);
				if (isNaN(lft) || lft === 0) {} else {
					if (lft > 0 && numberCell.show && lft === numberCell.width) {} else {
						this.$freezeLine = $(["<div class='pqg-vert-frozen-line' ", " style = 'left:", lft - 1, "px;' >", "</div>"].join("")).appendTo($container)
					}
				}
			}
			if (freezeRows) {
				var $tbl = that.$tbl;
				if ($tbl) {
					var tr = $tbl.children("tbody").children(".pq-last-frozen-row")[0];
					if (tr) {
						var top = tr.offsetTop + tr.offsetHeight - 1;
						this.$freezeLineH = $("<div class='pqg-horiz-frozen-line' style='top:" + (top - 1) + "px;' ></div>").appendTo($container)
					}
				}
			}
		}
	};
	_pRefresh.setScrollVNumEles = function(ui) {
		ui = ui || {};
		var that = this.that,
			vscroll = that.vscroll,
			o = that.options;
		if (!o.maxHeight && o.height === "flex") {
			vscroll.option("num_eles", 0);
			return 0
		}
		var nested = that.iHierarchy ? true : false,
			num_eles = parseInt(vscroll.option("num_eles")),
			cur_pos = parseInt(vscroll.option("cur_pos")),
			htView = this.getEContHt(),
			data = that.pdata;
		var totalVisibleRows = data ? that.totalVisibleRows : 0;
		var tbl, $tbl, htTbl = 0;
		if (that.$tbl && that.$tbl.length > 0) {
			tbl = that.$tbl[that.$tbl.length - 1];
			htTbl = tbl.scrollHeight;
			$tbl = $(tbl)
		}
		if (htTbl > 0) {
			var $trs = $tbl.children().children("tr");
			var ht = 0,
				visibleRows = 0;
			for (var i = 1; i < $trs.length; i++) {
				var tr = $trs[i];
				ht += tr.offsetHeight;
				if (ht >= htView) {
					if (nested && $(tr).hasClass("pq-detail-child")) {
						visibleRows = visibleRows > 1 ? visibleRows - 1 : 1
					} else {}
					break
				} else {
					if (nested) {
						if ($(tr).hasClass("pq-detail-child") === false) {
							visibleRows++
						}
					} else {
						visibleRows++
					}
				}
			}
			num_eles = totalVisibleRows - visibleRows + 1
		} else {
			num_eles = cur_pos + 1
		}
		if (num_eles > totalVisibleRows) {
			num_eles = totalVisibleRows
		}
		if (ht > htView && nested) {
			num_eles++
		}
		vscroll.option("num_eles", num_eles);
		return num_eles
	};
	_pRefresh._setScrollVLength = function(ui) {
		ui = ui || {};
		var that = this.that,
			o = that.options;
		if (o.height !== "flex" || o.maxHeight) {
			var htSB = this.getSBHeight(),
				len = this.contHt - htSB + this.headerHt - 2;
			that.vscroll.widget().css("bottom", htSB);
			that.vscroll.option("length", len)
		}
	};
	_pRefresh.setHeaderHeight = function() {
		var that = this.that,
			$header = that.$header,
			type = "scrollHeight",
			selector = ".pq-grid-header-search-row",
			htHD0, htHD1, htHD;
		if ($header && $header.length) {
			if ($header.length > 1) {
				htHD0 = $header[0][type];
				htHD1 = $header[1][type];
				htHD = Math.max(htHD0, htHD1);
				if (htHD0 !== htHD1) {
					var $tr0 = $($header[0]).find(selector),
						$tr1 = $($header[1]).find(selector);
					if ($tr0.length) {
						$tr0.css("height", "");
						$tr1.css("height", "");
						htHD0 = $header[0][type];
						htHD1 = $header[1][type];
						htHD = Math.max(htHD0, htHD1);
						if (htHD0 < htHD) {
							$tr0.height($tr1[0][type])
						} else {
							$tr1.height($tr0[0][type])
						}
					}
				}
			} else {
				htHD0 = $header[0][type];
				htHD = htHD0
			}
			that.$header_o.height(htHD - 3);
			this.headerHt = htHD - 1
		} else {
			that.$header_o.height(0);
			this.headerHt = 0
		}
	};
	_pRefresh.initContHeight = function() {
		var that = this.that,
			o = that.options,
			flexHeight = o.height == "flex";
		if (!flexHeight || o.maxHeight) {
			this.contHt = this.height - (o.showHeader ? this.rowHt : 0) - (o.showTop ? that.$top[0].offsetHeight : 0) - (o.showBottom ? that.$bottom[0].offsetHeight : 0)
		}
	};
	_pRefresh.initContWidth = function() {
		var that = this.that,
			o = that.options;
		this.contWd = this.width
	};

	function getStyle(el, prop) {
		if (window.getComputedStyle) {
			return getComputedStyle(el)[prop]
		} else {
			var val = el.currentStyle[prop];
			return val == "auto" ? 0 : val
		}
	}
	_pRefresh.setContHeight = function(ui) {
		ui = ui || {};
		var that = this.that,
			$top = that.$top,
			o = that.options;
		var ht = this.height - that.$header_o[0].offsetHeight - (o.showTop ? $top[0].offsetHeight + parseInt(getStyle($top[0], "marginTop")) : 0) - that.$bottom[0].offsetHeight + 1;
		ht = ht >= 0 ? ht : "";
		that.$cont.height(ht);
		this.contHt = ht
	};
	_pRefresh.setContAndGridHeightForFlex = function() {
		var that = this.that,
			$hscroll = that.hscroll.widget();
		if (this.vscroll) {
			$hscroll.css("position", "")
		} else {
			$hscroll.css("position", "relative");
			var $cont = that.$cont,
				cls = that.options.cls,
				$bottom_cont = $cont.children("." + cls.cont_inner_b);
			$cont.height("");
			if (!$bottom_cont.length) {
				$bottom_cont = $cont.children("." + cls.cont_inner)
			}
			$bottom_cont.height("");
			that.element.height("");
			that.$grid_center.height("")
		}
	};
	_pRefresh.setContAndGridWidthForFlex = function() {
		var that = this.that,
			o = that.options,
			maxWidth = o.maxWidth,
			maxWidthPixel = this.maxWidthPixel,
			wdTbl = that.calcWidthCols(-1, that.colModel.length),
			$grid = that.element,
			wdSB = this.getSBWidth(),
			contWd = wdTbl + wdSB;
		if (maxWidth && contWd >= maxWidthPixel) {
			contWd = maxWidthPixel
		}
		this.contWd = contWd;
		$grid.width(contWd + "px")
	};
	_pRefresh.getTotalVisibleRows = function(cur_pos, freezeRows, data) {
		var that = this.that,
			vrows = this.vrows,
			rowsVP = this.estRowsInViewPort(),
			tvRows = 0,
			dataLength = data ? data.length : 0,
			initV = freezeRows,
			finalV = 0,
			visible = 0,
			lastFrozenRow = null,
			nesting = that.iHierarchy ? true : false,
			o = that.options,
			DTMoff = o.detailModel.offset,
			htTotal = 0,
			rowHeight = this.rowHt,
			htCont = nesting ? this.contHt : undefined;
		if (data == null || dataLength == 0) {
			return {
				initV: null,
				finalV: null,
				tvRows: tvRows,
				lastFrozenRow: null
			}
		}
		for (var i = 0, len = dataLength > freezeRows ? freezeRows : dataLength; i < len; i++) {
			var rowData = data[i],
				hidden = rowData.pq_hidden;
			if (!hidden) {
				lastFrozenRow = i;
				tvRows++;
				if (nesting) {
					var cellData = rowData.pq_detail;
					if (cellData && cellData.show) {
						var ht = cellData.height || 0;
						if (ht > DTMoff) {
							ht = DTMoff
						}
						htTotal += ht + rowHeight
					} else {
						htTotal += rowHeight
					}
				}
			}
		}
		if (dataLength < freezeRows) {
			return {
				initV: lastFrozenRow,
				finalV: lastFrozenRow,
				tvRows: tvRows,
				lastFrozenRow: lastFrozenRow
			}
		}
		rowsVP = rowsVP - tvRows;
		initV = finalV = vrows[cur_pos];
		visible = 0;
		for (var i = initV, len = dataLength; i < len; i++) {
			var rowData = data[i],
				hidden = rowData.pq_hidden;
			if (hidden) {
				finalV++
			} else {
				if (visible === rowsVP) {
					break
				} else {
					finalV++;
					visible++
				}
			}
			if (nesting && !hidden) {
				var cellData = rowData.pq_detail;
				if (cellData && cellData.show) {
					var ht = cellData.height || 0;
					if (ht > DTMoff) {
						ht = DTMoff
					}
					htTotal += ht + rowHeight
				} else {
					htTotal += rowHeight
				}
				if (htTotal > htCont) {
					break
				}
			}
		}
		tvRows += vrows.length;
		initV = initV >= dataLength ? dataLength - 1 : initV;
		finalV = finalV >= dataLength ? dataLength - 1 : finalV;
		finalV = finalV < initV ? initV : finalV;
		return {
			initV: initV,
			finalV: finalV,
			tvRows: tvRows,
			lastFrozenRow: lastFrozenRow
		}
	};
	_pRefresh.setInitH = function(initH, finalH) {
		var that = this.that;
		that.initH = initH;
		that.finalH = finalH
	};
	_pRefresh.setInitV = function(initV, finalV) {
		var that = this.that,
			vrows;
		if (initV == null || finalV == null) {
			vrows = this.vrows;
			if (vrows && vrows.length) {
				initV = finalV = vrows[vrows.length - 1]
			}
		}
		that.initV = initV;
		that.finalV = finalV
	};
	_pRefresh.calcVisibleV = function() {
		var that = this.that,
			o = that.options,
			fr = o.freezeRows,
			data = that.pdata || [],
			i, len = data.length,
			arr = [],
			j = 0;
		for (i = 0; i < fr; i++) {
			if (!data[i].pq_hidden) {
				arr[j++] = i
			}
		}
		this.vfrows = arr;
		j = 0;
		arr = [];
		for (i = fr; i < len; i++) {
			if (!data[i].pq_hidden) {
				arr[j++] = i
			}
		}
		this.vrows = arr
	};
	_pRefresh.calcVisibleH = function() {
		var that = this.that,
			o = that.options,
			fc = o.freezeCols,
			i, arrC = [],
			j = 0,
			CM = that.colModel;
		for (var i = fc, len = CM.length; i < len; i++) {
			if (!CM[i].hidden) {
				arrC[j++] = i
			}
		}
		this.vcols = arrC
	};
	_pRefresh.calcInitFinal = function() {
		var that = this.that,
			o = that.options,
			virtualY = o.virtualY,
			freezeRows = o.freezeRows,
			initV, finalV, flexHeight = o.height === "flex",
			data = that.pdata;
		if (data == null || data.length === 0) {
			var objTVR = this.getTotalVisibleRows(cur_pos, freezeRows, data);
			that.totalVisibleRows = objTVR.tvRows;
			initV = objTVR.initV;
			finalV = objTVR.finalV;
			that.lastFrozenRow = objTVR.lastFrozenRow
		} else {
			if (!virtualY) {
				var objTVR = this.getTotalVisibleRows(0, freezeRows, data);
				that.lastFrozenRow = objTVR.lastFrozenRow;
				that.totalVisibleRows = objTVR.tvRows;
				initV = 0;
				finalV = data.length - 1
			} else {
				var cur_pos = parseInt(that.vscroll.option("cur_pos"));
				if (isNaN(cur_pos) || cur_pos < 0) {
					throw "cur_pos NA"
				}
				that.scrollCurPos = cur_pos;
				var objTVR = this.getTotalVisibleRows(cur_pos, freezeRows, data);
				that.totalVisibleRows = objTVR.tvRows;
				initV = objTVR.initV;
				that.lastFrozenRow = objTVR.lastFrozenRow;
				if (flexHeight && !o.maxHeight) {
					finalV = data.length - 1
				} else {
					finalV = objTVR.finalV
				}
			}
		}
		this.setInitV(initV, finalV)
	};
	_pRefresh.calcInitFinalH = function() {
		var that = this.that,
			o = that.options,
			initH, finalH, virtualX = o.virtualX,
			CM = that.colModel,
			CMLength = CM.length;
		if (!virtualX) {
			initH = 0;
			finalH = CMLength - 1
		} else {
			var cur_pos = parseInt(that.hscroll.option("cur_pos")),
				freezeCols = parseInt(o.freezeCols),
				flexWidth = o.width === "flex",
				initH, vcols = this.vcols;
			if (!vcols) {
				this.calcVisibleH();
				vcols = this.vcols
			}
			cur_pos >= vcols.length && (cur_pos = vcols.length - 1);
			initH = vcols[cur_pos];
			if (initH > CMLength - 1) {
				initH = CMLength - 1
			}
			if (initH < 0 || initH == null) {
				initH = 0
			}
			if (flexWidth && !o.maxWidth) {
				finalH = CMLength - 1
			} else {
				var wd = that.calcWidthCols(-1, freezeCols),
					wdCont = this.getEContWd();
				for (var i = initH; i < CMLength; i++) {
					var column = CM[i];
					if (!column.hidden) {
						var wdCol = column.outerWidth;
						if (!wdCol) {
							if (o.debug) {
								throw "outerwidth N/A"
							}
						}
						wd += wdCol;
						if (wd > wdCont) {
							break
						}
					}
				}
				finalH = i;
				if (finalH > CMLength - 1) {
					finalH = CMLength - 1
				}
				if (finalH < freezeCols - 1) {
					finalH = freezeCols - 1
				}
			}
		}
		this.setInitH(initH, finalH)
	};
	_pRefresh._calcOffset = function(val) {
		var re = /(-|\+)([0-9]+)/;
		var match = re.exec(val);
		if (match && match.length === 3) {
			return parseInt(match[1] + match[2])
		} else {
			return 0
		}
	};
	_pRefresh.setMax = function(prop) {
		var that = this.that,
			$grid = that.element,
			o = that.options,
			val = o[prop];
		if (val) {
			if (val == parseInt(val)) {
				val += "px"
			}
			$grid.css(prop, val)
		} else {
			$grid.css(prop, "")
		}
	};
	_pRefresh.refreshGridWidthAndHeight = function() {
		var that = this.that,
			o = that.options,
			wd, ht, widthPercent = (o.width + "").indexOf("%") > -1 ? true : false,
			heightPercent = (o.height + "").indexOf("%") > -1 ? true : false,
			maxHeightPercent = (o.maxHeight + "").indexOf("%") > -1 ? true : false,
			flexHeight = o.height == "flex",
			maxHeightPercentAndFlexHeight = maxHeightPercent && flexHeight,
			maxWidthPercent = (o.maxWidth + "").indexOf("%") > -1 ? true : false,
			flexWidth = o.width == "flex",
			maxWidthPercentAndFlexWidth = maxWidthPercent && flexWidth,
			element = that.element;
		if (widthPercent || heightPercent || maxHeightPercentAndFlexHeight || maxWidthPercentAndFlexWidth) {
			var parent = element.parent();
			if (!parent.length) {
				return
			}
			var wdParent, htParent;
			if (parent[0] == document.body || element.css("position") == "fixed") {
				wdParent = $(window).width();
				htParent = window.innerHeight ? window.innerHeight : $(window).height()
			} else {
				wdParent = parent.width();
				htParent = parent.height()
			}
			var superParent = null,
				calcOffset = this._calcOffset,
				widthOffset = widthPercent ? calcOffset(o.width) : 0,
				heightOffset = heightPercent ? calcOffset(o.height) : 0;
			if (maxWidthPercentAndFlexWidth) {
				wd = parseInt(o.maxWidth) * wdParent / 100
			} else {
				if (widthPercent) {
					wd = parseInt(o.width) * wdParent / 100 + widthOffset
				}
			}
			if (maxHeightPercentAndFlexHeight) {
				ht = parseInt(o.maxHeight) * htParent / 100
			} else {
				if (heightPercent) {
					ht = parseInt(o.height) * htParent / 100 + heightOffset
				}
			}
		}
		if (!wd) {
			if (flexWidth && o.maxWidth) {
				if (!maxWidthPercent) {
					wd = o.maxWidth
				}
			} else {
				if (!widthPercent) {
					wd = o.width
				}
			}
		}
		if (o.maxWidth) {
			this.maxWidthPixel = wd
		}
		if (!ht) {
			if (flexHeight && o.maxHeight) {
				if (!maxHeightPercent) {
					ht = o.maxHeight
				}
			} else {
				if (!heightPercent) {
					ht = o.height
				}
			}
		}
		if (parseFloat(wd) == wd) {
			wd = wd < o.minWidth ? o.minWidth : wd;
			element.css("width", wd)
		} else {
			if (wd === "auto") {
				element.width(wd)
			}
		}
		if (parseFloat(ht) == ht) {
			ht = ht < o.minHeight ? o.minHeight : ht;
			element.css("height", ht)
		}
		this.width = Math.round(element.width());
		this.height = Math.round(element.height())
	};
	_pRefresh.decidePanes = function() {
		var that = this.that,
			pqpanes = that.pqpanes = {
				v: false,
				h: false,
				vH: false
			},
			o = that.options,
			virtualX = o.virtualX,
			virtualY = o.virtualY,
			flexHeight = o.height == "flex" && !o.maxHeight,
			flexWidth = o.width == "flex" && !o.maxWidth,
			numberCell = o.numberCell,
			freezeRows = o.freezeRows,
			freezeCols = o.freezeCols;
		if (freezeRows && !flexHeight && (freezeCols || numberCell.show) && !flexWidth) {
			if (!virtualY) {
				pqpanes.h = true
			}
			if (!virtualX) {
				pqpanes.v = true;
				pqpanes.vH = true
			}
		} else {
			if (freezeRows && !flexHeight) {
				if (!virtualY) {
					pqpanes.h = true
				}
			} else {
				if ((freezeCols || numberCell.show) && !flexWidth) {
					if (!virtualX) {
						pqpanes.v = true;
						pqpanes.vH = true
					}
				}
			}
		}
	};
	_pRefresh._storeColumnWidths = function(full) {
		var that = this.that,
			o = that.options,
			CM = that.colModel,
			virtualX = o.virtualX,
			freezeCols = o.freezeCols,
			initH = that.initH,
			finalH = full ? CM.length - 1 : that.finalH,
			CMOld = [];
		for (var i = 0; i <= finalH; i++) {
			if (!full && virtualX && i < initH && i >= freezeCols) {
				i = initH
			}
			CMOld[i] = {
				outerWidth: CM[i].outerWidth
			}
		}
		return CMOld
	};
	_pRefresh._isColumnWidthChanged = function(CMOld) {
		var that = this.that,
			CM = that.colModel;
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx;
			if (CM[col].outerWidth !== CMOld[col].outerWidth) {
				return true
			}
		}
		return false
	};
	_pRefresh.softRefresh = function() {
		var that = this.that,
			o = that.options;
		this.refreshScrollbars();
		that.iGenerateView.setPanes();
		that._saveDims();
		that.iMouseSelection.syncScrollBarVert();
		if (o.height == "flex") {
			this.setContAndGridHeightForFlex()
		}
		if (o.width == "flex") {
			this.setContAndGridWidthForFlex()
		}
		this._refreshFrozenLine()
	};
	_pRefresh.refreshScrollbars = function(ui) {
		ui = ui || {};
		var self = this,
			that = self.that,
			o = that.options,
			CMOld, GV = that.iGenerateView,
			num_eles, hscroll, vscroll, flexHeight = o.height === "flex",
			flexWidth = o.width === "flex";
		if (!flexHeight && !self.contHt || !flexWidth && !self.contWd || that.totalVisibleRows === null) {
			return
		}
		num_eles = self.setScrollVNumEles(ui);
		vscroll = num_eles > 1 ? true : false;
		if ((!flexHeight || o.maxHeight) && vscroll !== self.vscroll) {
			self.vscroll = vscroll;
			if (o.scrollModel.autoFit || o.virtualX || flexWidth) {
				CMOld = self._storeColumnWidths();
				self.refreshColumnWidths();
				if (self._isColumnWidthChanged(CMOld) || flexWidth) {
					self.ignoreTResize = true;
					self._refreshTableWidths(CMOld, {
						table: true,
						header: true
					});
					delete self.ignoreTResize;
					self.setHeaderHeight();
					self.setContHeight();
					GV.setPanes();
					num_eles = self.setScrollVNumEles(true), vscroll = num_eles > 1 ? true : false;
					self.vscroll = vscroll
				}
				CMOld = null
			} else {
				GV.setPanes()
			}
		}
		num_eles = self.setScrollHNumEles();
		hscroll = num_eles > 1 ? true : false;
		if (self.hscroll != hscroll) {
			self.hscroll = hscroll;
			GV.setPanes()
		}
		self._setScrollHLength();
		self._setScrollVLength(ui);
		self._setScrollHVLength()
	};
	_pRefresh._setScrollHVLength = function() {
		var that = this.that;
		if (!this.vscroll || !this.hscroll) {
			that.$hvscroll.css("visibility", "hidden")
		}
	};
	_pRefresh._setScrollHLength = function() {
		var that = this.that,
			$hscroll = that.hscroll.widget(),
			$hvscroll = that.$hvscroll,
			options = that.options;
		if (!options.scrollModel.horizontal) {
			$hscroll.css("visibility", "hidden");
			$hvscroll.css("visibility", "hidden");
			return
		} else {
			$hscroll.css("visibility", "");
			$hvscroll.css("visibility", "")
		}
		var contWd = this.contWd,
			wdSB = this.getSBWidth();
		$hscroll.css("right", wdSB === 0 ? 0 : "");
		that.hscroll.option("length", contWd - wdSB)
	};
	_pRefresh.estVscroll = function() {
		var that = this.that;
		var vscroll = true;
		if (that.totalVisibleRows == null || this.contHt == null) {
			vscroll = false
		} else {
			if (that.totalVisibleRows * this.rowHt < this.contHt) {
				vscroll = false
			}
		}
		this.vscroll = vscroll
	};
	_pRefresh.getSBWidth = function() {
		if (this.vscroll == null) {
			this.estVscroll()
		}
		return this.vscroll ? 17 : 0
	};
	_pRefresh.estHscroll = function() {
		var that = this.that;
		if (this.contWd == null) {
			throw "failed"
		}
		var hscroll = false;
		var num_eles = this.calcColsOutsideCont(that.colModel) + 1;
		if (num_eles > 1) {
			hscroll = true
		}
		this.hscroll = hscroll
	};
	_pRefresh.getSBHeight = function() {
		if (this.hscroll == null) {
			this.estHscroll()
		}
		return this.hscroll ? 17 : 0
	};
	_pRefresh.getEContHt = function() {
		if (this.contHt == null) {
			throw "contHt N/A"
		}
		return this.contHt - this.getSBHeight()
	};
	_pRefresh.getEContWd = function() {
		if (this.contWd == null) {
			throw "contWd N/A"
		}
		return this.contWd - this.getSBWidth()
	};
	_pRefresh.calcColsOutsideCont = function(model) {
		var that = this.that,
			o = that.options,
			numberCell = o.numberCell,
			freezeCols = o.freezeCols,
			contWd = this.contWd - this.getSBWidth();
		var tblWd = 0;
		if (numberCell.show) {
			tblWd += numberCell.outerWidth
		}
		for (var i = 0; i < model.length; i++) {
			var column = model[i];
			if (!column.hidden) {
				tblWd += column.outerWidth
			}
		}
		var wd = 0,
			noCols = 0;
		var tblremainingWidth = Math.round(tblWd);
		if (tblremainingWidth > contWd) {
			noCols++
		}
		for (i = freezeCols; i < model.length; i++) {
			column = model[i];
			if (!column.hidden) {
				wd += column.outerWidth;
				tblremainingWidth = tblWd - wd;
				if (tblremainingWidth > contWd) {
					noCols++
				} else {
					break
				}
			}
		}
		return noCols
	};
	_pRefresh.setScrollHNumEles = function() {
		var that = this.that,
			options = that.options,
			CM = that.colModel,
			SM = options.scrollModel,
			hscroll = that.hscroll,
			cur_pos = hscroll.option("cur_pos") * 1,
			num_eles = 0;
		if (options.width !== "flex" || options.maxWidth) {
			if (SM.lastColumn === "fullScroll") {
				num_eles = CM.length - options.freezeCols - that._calcNumHiddenUnFrozens()
			} else {
				num_eles = this.calcColsOutsideCont(CM) + 1
			}
		}
		if (cur_pos && num_eles <= cur_pos) {
			num_eles = cur_pos + 1
		}
		that.hscroll.option("num_eles", num_eles);
		return num_eles
	};
	_pRefresh.init = function() {
		var that = this.that,
			o = that.options;
		this.hscroll = this.vscroll = this.contHt = this.contWd = null;
		that.initH = that.initV = that.finalH = that.finalV = null;
		that.totalVisibleRows = that.lastFrozenRow = null;
		this.rowHt = o.rowHeight;
		this.headerHt = 0;
		this.height = null
	};
	_pRefresh.refresh = function(ui) {
		ui = ui || {};
		var self = this,
			that = self.that,
			header = ui.header,
			table = ui.table,
			pager = ui.pager,
			o, GV = that.iGenerateView,
			$grid = that.element;
		if (!$grid[0].offsetWidth) {
			$grid.addClass("pq-pending-refresh");
			return
		}
		if (ui.toolbar) {
			that.refreshToolbar()
		}
		that.iMouseSelection.resetMargins();
		self.init();
		o = that.options;
		self.decidePanes();
		o.collapsible._collapsed = false;
		self.setMax("maxHeight");
		self.setMax("maxWidth");
		self.refreshGridWidthAndHeight();
		self.initContHeight();
		self.initContWidth();
		self.calcInitFinal();
		if (header === false || table === false) {
			var CMOld = self._storeColumnWidths(true)
		}
		self.refreshColumnWidths();
		self.calcInitFinalH();
		GV.createColDefs();
		if (header !== false) {
			that._createHeader()
		} else {
			if (self._isColumnWidthChanged(CMOld)) {
				self._refreshTableWidths(CMOld, {
					header: true
				})
			}
		}
		that._refreshHeaderSortIcons();
		if (pager !== false) {
			that._refreshPager()
		}
		self.setHeaderHeight();
		self.setContHeight();
		if (table !== false) {
			GV.generateView({
				source: ui.source
			})
		} else {
			self._refreshTableWidths(CMOld, {
				table: true
			});
			GV.setPanes()
		}
		that._saveDims();
		GV.scrollView();
		self.refreshScrollbars();
		if (o.height == "flex") {
			self.setContAndGridHeightForFlex()
		}
		if (o.width == "flex") {
			self.setContAndGridWidthForFlex()
		}
		self._refreshFrozenLine();
		that._createCollapse();
		o.dataModel.postDataOnce = undefined
	};
	_pRefresh.summaryTable = function() {
		var self = this,
			$summary = self.$summary,
			that = self.that,
			data = that.options.summaryData,
			obj;
		if (data) {
			if (!$summary) {
				$summary = self.$summary = $("<div class='pq-grid-summary'></div>").prependTo(that.$bottom)
			}
			obj = {
				data: data,
				$cont: $summary
			};
			that.createTable(obj)
		} else {
			if ($summary && $summary[0].innerHTML) {
				$summary.empty()
			}
		}
	};
	_pRefresh.refreshVscroll = function(obj) {
		var that = this.that,
			GV = that.iGenerateView,
			o = that.options;
		if (o.virtualY && !o.scrollModel.smooth) {
			var initV = that.initV,
				finalV = that.finalV;
			this.calcInitFinal();
			var diff = initV - that.initV,
				diffF = finalV - that.finalV;
			if (!o.fullrefreshOnScroll && !o.detailModel.init && !that._mergeCells && Math.abs(diff) == 1 && Math.abs(diffF) == 1) {
				if (diff == -1) {
					GV.removeTopRow(1);
					GV.appendRow(that.finalV - finalV)
				} else {
					if (diff == 1) {
						GV.prependRow();
						GV.removeBottomRow(finalV - that.finalV)
					}
				}
			} else {
				if (initV != that.initV || finalV != that.finalV) {
					GV.generateView()
				}
			}
			that._saveDims();
			var num_eles;
			GV.scrollView();
			num_eles = this.setScrollVNumEles();
			if (num_eles <= 1) {
				this.refreshScrollbars()
			}
		}
	};
	_pRefresh._refreshTableWidths = function(CMOld, objP) {
		var that = this.that,
			$tbl_header = that.$tbl_header,
			header = objP.header && $tbl_header,
			$tbl = that.$tbl,
			table = objP.table && $tbl,
			$trH = header ? $tbl_header.children().children(".pq-row-hidden") : null,
			$draggables = header ? that.$header.find(".pq-grid-col-resize-handle") : null,
			$tr2 = table && $tbl ? $tbl.children().children(".pq-row-hidden") : null,
			$tdH, $td2, _bodyTableChanged = false,
			incr = 0;
		if (table && that.tables.length) {
			var $tr3 = that.tables[0].$tbl.children().children(".pq-row-hidden");
			$tr2 = $tr2 ? $tr2.add($tr3) : $tr3
		}
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column;
			var columnOld = CMOld[col],
				oldWidth = columnOld.outerWidth,
				outerwidth = column.outerWidth;
			if (outerwidth !== oldWidth) {
				if (header) {
					$tdH = $trH.find("td[pq-col-indx=" + col + "]");
					$tdH.width(outerwidth)
				}
				if ($tr2) {
					$td2 = $tr2.find("td[pq-col-indx=" + col + "]");
					if ($td2.length) {
						_bodyTableChanged = true;
						$td2.width(outerwidth)
					}
				}
			}
			incr += outerwidth - oldWidth;
			if (header && incr !== 0) {
				var $draggable = $draggables.filter("[pq-col-indx=" + col + "]"),
					oldLeft = parseInt($draggable.css("left"));
				$draggable.css("left", oldLeft + incr)
			}
		}
		if (_bodyTableChanged) {
			that._trigger("tableWidthChange")
		}
		that._saveDims()
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery;
	var cClass = _pq.cClass;
	var fni = {};
	fni.options = {
		flex: {
			on: true,
			one: false,
			all: true
		},
		detailModel: {
			cache: true,
			offset: 100,
			expandIcon: "ui-icon-triangle-1-se glyphicon glyphicon-minus",
			collapseIcon: "ui-icon-triangle-1-e glyphicon glyphicon-plus"
		},
		dragColumns: {
			enabled: true,
			acceptIcon: "ui-icon-check glyphicon-ok",
			rejectIcon: "ui-icon-closethick glyphicon-remove",
			topIcon: "ui-icon-circle-arrow-s glyphicon glyphicon-circle-arrow-down",
			bottomIcon: "ui-icon-circle-arrow-n glyphicon glyphicon-circle-arrow-up"
		},
		track: null,
		mergeModel: {
			flex: false
		},
		realFocus: true,
		sortModel: {
			on: true,
			type: "local",
			multiKey: "shiftKey",
			number: true,
			single: true,
			cancel: true,
			sorter: [],
			useCache: true,
			ignoreCase: false
		},
		filterModel: {
			on: true,
			type: "local",
			mode: "AND",
			header: false
		}
	};
	fni._create = function() {
		var that = this,
			o = that.options;
		that.listeners = {};
		that._queueATriggers = {};
		that.iHistory = new _pq.cHistory(that);
		that.iGroup = new _pq.cGroup(that);
		if (_pq.cMerge) {
			that.iMerge = new _pq.cMerge(that)
		}
		that.iFilterData = new _pq.cFilterData(that);
		that.iSelection = new pq.Selection(that);
		that.iHeaderSearch = new cHeaderSearch(that);
		that.iUCData = new _pq.cUCData(that);
		that.iMouseSelection = new _pq.cMouseSelection(that);
		that._super();
		new cCompute(that);
		that.iDragColumns = new _pq.cDragColumns(that);
		that.refreshToolbar();
		if (o.dataModel.location === "remote") {
			that.refresh({
				table: true
			})
		}
		that.on("dataAvailable", function() {
			that.one("refreshDone", function() {
				that._trigger("ready");
				setTimeout(function() {
					if (that.element) {
						that._trigger("complete")
					}
				}, 0)
			})
		});
		that.refreshDataAndView({
			header: true
		})
	};
	$.widget("paramquery.pqGrid", _pq._pqGrid, fni);
	$.widget.extend = function() {
		var arr_shift = Array.prototype.shift,
			isPlainObject = $.isPlainObject,
			isArray = $.isArray,
			w_extend = $.widget.extend,
			target = arr_shift.apply(arguments),
			deep, _deep;
		if (typeof target == "boolean") {
			deep = target;
			target = arr_shift.apply(arguments)
		}
		var inputs = arguments,
			i = 0,
			len = inputs.length,
			input, key, val;
		if (deep == null) {
			deep = len > 1 ? true : false
		}
		for (; i < len; i++) {
			input = inputs[i];
			for (key in input) {
				val = input[key];
				if (val !== undefined) {
					_deep = i > 0 ? false : true;
					if (isPlainObject(val)) {
						target[key] = target[key] || {};
						w_extend(_deep, target[key], val)
					} else {
						if (isArray(val)) {
							target[key] = deep && _deep ? val.slice() : val
						} else {
							target[key] = val
						}
					}
				}
			}
		}
		return target
	};
	pq.grid = function(selector, options) {
		var $g = $(selector).pqGrid(options),
			g = $g.data("paramqueryPqGrid") || $g.data("paramquery-pqGrid");
		return g
	};
	_pq.pqGrid.regional = {};
	var fn = _pq.pqGrid.prototype;
	_pq.pqGrid.defaults = fn.options;
	fn.focus = function(ui) {
		ui = ui || {};
		var that = this,
			$td = ui.$td,
			td, rip = ui.rowIndxPage,
			ci = ui.colIndx,
			ae = document.activeElement;
		if ($td) {
			if (rip == null || ci == null) {
				var objC = this.getCellIndices({
					$td: $td
				});
				rip = objC.rowIndxPage;
				ci = objC.colIndx
			}
		} else {
			if (rip == null || ci == null) {
				if (ae && ae != document.body && ae.id != "pq-grid-excel" && ae.className != "pq-grid-cont") {
					return
				}
				var _fe = this._focusElement;
				if (_fe) {
					rip = _fe.rowIndxPage;
					ci = _fe.colIndx
				} else {
					return
				}
			}
			var iM = this.iMerge,
				ri = rip + this.rowIndxOffset;
			if (iM.ismergedCell(ri, ci)) {
				var cord = iM.getRootCell(ri, ci, "o");
				rip = cord.rowIndxPage;
				ci = cord.colIndx
			}
			$td = that.getCell({
				rowIndxPage: rip,
				colIndx: ci
			})
		}
		if (this.options.realFocus) {
			this._focusElement = {
				$ele: $td,
				rowIndxPage: rip,
				colIndx: ci
			};
			if ((td = $td[0]) && td.nodeName.toUpperCase() == "TD") {
				if ($(ae).hasClass("pq-editor-focus") === false) {
					td.setAttribute("tabindex", 0);
					td.focus()
				}
			} else {
				var data = this.options.dataModel.data;
				if (!data || !data.length) {
					this.$cont.focus()
				}
				return
			}
		} else {
			var fe = this._focusElement;
			if (fe) {
				this.removeClass({
					rowIndxPage: fe.rowIndxPage,
					colIndx: fe.colIndx,
					cls: "pq-focus",
					refresh: false
				});
				this.element.find(".pq-focus").removeClass("pq-focus")
			}
			if ($td) {
				this.addClass({
					rowIndxPage: rip,
					colIndx: ci,
					cls: "pq-focus"
				});
				this._focusElement = {
					$ele: $td,
					rowIndxPage: rip,
					colIndx: ci
				}
			}
			var $cont = this.$cont;
			if (document.activeElement != $cont[0]) {
				$cont[0].focus()
			}
		}
	};
	fn.onfocus = function() {
		if (!this.options.realFocus) {
			var fe = this._focusElement;
			if (fe) {
				var rip = fe.rowIndxPage,
					ci = fe.colIndx;
				this.addClass({
					rowIndxPage: rip,
					colIndx: ci,
					cls: "pq-focus"
				})
			}
		}
	};
	fn.onblur = function() {
		if (!this.options.realFocus) {
			var fe = this._focusElement;
			if (fe) {
				var rip = fe.rowIndxPage,
					ci = fe.colIndx;
				this.removeClass({
					rowIndxPage: rip,
					colIndx: ci,
					cls: "pq-focus"
				})
			}
		}
	};
	fn.range = function(range, expand) {
		return new pq.Range(this, range, "range", expand)
	};
	fn.rowExpand = function(objP) {
		this.iHierarchy.rowExpand(objP)
	};
	fn.rowInvalidate = function(objP) {
		this.iHierarchy.rowInvalidate(objP)
	};
	fn.rowCollapse = function(objP) {
		this.iHierarchy.rowCollapse(objP)
	};
	fn.saveState = function(ui) {
		ui = ui || {};
		var self = this,
			$grid = self.element,
			extend = $.extend,
			o = self.options,
			oSM = o.sortModel,
			sSM = extend(true, {}, {
				sorter: oSM.sorter
			}),
			oPM = o.pageModel,
			sPM = {
				rPP: oPM.rPP,
				curPage: oPM.curPage
			},
			CM = self.colModel,
			sCM = [],
			column, filter, sCol, i = 0,
			CMlen = CM.length,
			oGM = o.groupModel,
			sGM = extend(true, {}, {
				dataIndx: oGM.dataIndx,
				dir: oGM.dir,
				collapsed: oGM.collapsed,
				merge: oGM.merge,
				grandSummary: oGM.grandSummary
			}),
			id = $grid[0].id;
		for (; i < CMlen; i++) {
			column = CM[i];
			sCol = {
				width: column.width,
				dataIndx: column.dataIndx,
				hidden: column.hidden
			};
			if (filter = column.filter) {
				sCol.filter = {
					value: filter.value,
					value2: filter.value2,
					on: filter.on
				}
			}
			sCM[i] = sCol
		}
		var state = {
			colModel: sCM,
			height: o.height,
			datestamp: Date.now(),
			width: o.width,
			groupModel: sGM,
			pageModel: sPM,
			sortModel: sSM,
			freezeRows: o.freezeRows,
			freezeCols: o.freezeCols
		};
		if (ui.stringify !== false) {
			state = JSON.stringify(state);
			if (ui.save !== false && typeof Storage !== "undefined") {
				localStorage.setItem("pq-grid" + (id ? id : ""), state)
			}
		}
		return state
	};
	fn.loadState = function(ui) {
		ui = ui || {};
		var self = this,
			obj, $grid = self.element,
			wextend = $.widget.extend,
			jextend = $.extend,
			id = $grid[0].id,
			state = ui.state || (typeof Storage === "undefined" ? undefined : localStorage.getItem("pq-grid" + (id || "")));
		if (!state) {
			return false
		} else {
			if (typeof state == "string") {
				state = JSON.parse(state)
			}
		}
		var CMstate = state.colModel,
			columnSt, column, dataIndx, widths = [],
			dataIndxs = [],
			colIndxs = [],
			filters = [],
			hidden = [],
			o = self.options,
			isColGroup = self.depth > 1,
			oCM = isColGroup ? self.colModel : o.colModel;
		for (var i = 0, len = CMstate.length; i < len; i++) {
			columnSt = CMstate[i];
			dataIndx = columnSt.dataIndx;
			dataIndxs[dataIndx] = true;
			colIndxs[dataIndx] = i;
			widths[dataIndx] = columnSt.width;
			filters[dataIndx] = columnSt.filter;
			hidden[dataIndx] = columnSt.hidden
		}
		if (!isColGroup) {
			oCM.sort(function(col1, col2) {
				return colIndxs[col1.dataIndx] - colIndxs[col2.dataIndx]
			})
		}
		for (var i = 0, len = oCM.length; i < len; i++) {
			column = oCM[i];
			dataIndx = column.dataIndx;
			if (dataIndxs[dataIndx]) {
				column.width = widths[dataIndx] || column.width;
				column.filter = jextend(column.filter, filters[dataIndx]);
				column.hidden = hidden[dataIndx]
			}
		}
		self.iColModel.init();
		wextend(o.sortModel, state.sortModel);
		wextend(o.pageModel, state.pageModel);
		var GM = state.groupModel;
		self.groupOption(GM, false);
		obj = {
			freezeRows: state.freezeRows,
			freezeCols: state.freezeCols
		};
		if (!isNaN(o.height * 1) && !isNaN(state.height * 1)) {
			obj.height = state.height
		}
		if (!isNaN(o.width * 1) && !isNaN(state.width * 1)) {
			obj.width = state.width
		}
		self.option(obj);
		if (ui.refresh !== false) {
			self.refreshDataAndView()
		}
		return true
	};
	var cHeaderSearch = function(that) {
		this.that = that;
		var self = this;
		this.dataHS = {};
		that.on("headerKeyDown", function(evt, ui) {
			var $src = $(evt.originalEvent.target);
			if ($src.hasClass("pq-grid-hd-search-field")) {
				return self.onKeyDown(evt, ui, $src)
			} else {
				return true
			}
		});
		that.on("createHeader", function(evt, ui) {
			return self._onCreateHeader()
		});

		function filter(dataIndx, value, value2) {
			that.filter({
				data: [{
					dataIndx: dataIndx,
					value: value,
					value2: value2
				}]
			})
		}
		this.changeListener = {
			change: function(evt, ui) {
				filter(ui.dataIndx, ui.value, ui.value2)
			}
		};
		this.keyupListener = {
			keyup: function(evt, ui) {
				filter(ui.dataIndx, ui.value, ui.value2)
			}
		};
		this.clickListener = {
			click: function(evt, ui) {
				filter(ui.dataIndx, ui.value)
			}
		}
	};
	var _pHeaderSearch = cHeaderSearch.prototype = new cClass;
	_pHeaderSearch.get$Ele = function(colIndx, dataIndx) {
		var that = this.that,
			freezeCols = that.options.freezeCols,
			$tbl_left = $(that.$tbl_header[0]),
			$inp, selector = ".pq-grid-hd-search-field[name='" + dataIndx + "']",
			$tbl_right = $(that.$tbl_header[that.$tbl_header.length == 2 ? 1 : 0]);
		if (colIndx >= freezeCols) {
			$inp = $tbl_right.find(selector)
		} else {
			$inp = $tbl_left.find(selector)
		}
		return $inp
	};
	_pHeaderSearch.onKeyDown = function(evt, ui, $this) {
		var that = this.that,
			keyCode = evt.keyCode,
			keyCodes = $.ui.keyCode,
			selector;
		if (keyCode === keyCodes.TAB) {
			var dataIndx = $this.attr("name"),
				colIndx = that.getColIndx({
					dataIndx: dataIndx
				}),
				CM = that.colModel,
				$inp, shiftKey = evt.shiftKey,
				column = CM[colIndx];
			if (column.filter.condition == "between") {
				that.scrollColumn({
					colIndx: colIndx
				});
				var $ele = this.get$Ele(colIndx, dataIndx);
				if ($ele[0] == $this[0]) {
					if (!shiftKey) {
						$inp = $ele[1]
					}
				} else {
					if (shiftKey) {
						$inp = $ele[0]
					}
				}
				if ($inp) {
					$inp.focus();
					evt.preventDefault();
					return false
				}
			}
			do {
				if (shiftKey) {
					colIndx--
				} else {
					colIndx++
				}
				if (colIndx < 0 || colIndx >= CM.length) {
					break
				}
				var column = CM[colIndx],
					cFilter = column.filter;
				if (column.hidden) {
					continue
				}
				if (!cFilter) {
					continue
				}
				that.scrollColumn({
					colIndx: colIndx
				});
				var $inp, dataIndx = column.dataIndx,
					$inp = this.get$Ele(colIndx, dataIndx);
				if (cFilter.condition == "between") {
					if (shiftKey) {
						$inp = $($inp[1])
					} else {
						$inp = $($inp[0])
					}
				}
				if ($inp) {
					$inp.focus();
					evt.preventDefault();
					return false
				} else {
					break
				}
			} while (1 === 1)
		} else {
			return true
		}
	};
	_pHeaderSearch._bindFocus = function() {
		var that = this.that,
			self = this;

		function handleFocus(e) {
			var $target = $(e.target),
				$inp = $target.closest(".pq-grid-hd-search-field"),
				dataIndx = $inp.attr("name");
			if (that.scrollColumn({
					dataIndx: dataIndx
				})) {
				var colIndx = that.getColIndx({
					dataIndx: dataIndx
				});
				var $ele = self.get$Ele(colIndx, dataIndx);
				$ele.focus()
			}
		}
		var $trs = that.$header.find(".pq-grid-header-search-row");
		for (var i = 0; i < $trs.length; i++) {
			$($trs[i]).on("focusin", handleFocus)
		}
	};
	_pHeaderSearch._onCreateHeader = function() {
		var self = this,
			that = this.that,
			options = that.options,
			FM = options.filterModel;
		if (!FM.header) {
			return
		}
		this._bindFocus();
		var CM = that.colModel,
			freezeCols = options.freezeCols,
			$tbl_header = that.$tbl_header,
			$tbl_left = $($tbl_header[0]),
			$tbl_right = $($tbl_header[1]),
			selector = "input,select";
		if ($tbl_header.length > 1) {
			$tbl_left.find(selector).css("visibility", "hidden");
			for (var i = 0; i < freezeCols; i++) {
				var column = CM[i];
				var dIndx = column.dataIndx;
				var selector = "*[name='" + dIndx + "']";
				$tbl_left.find(selector).css("visibility", "visible");
				$tbl_right.find(selector).css("visibility", "hidden")
			}
		}
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				col = colD.colIndx,
				column = colD.column;
			var filter = column.filter;
			if (!filter) {
				continue
			}
			var dataIndx = column.dataIndx,
				$tbl_h = $tbl_left;
			if (col >= freezeCols && $tbl_header.length > 1) {
				$tbl_h = $tbl_right
			}
			var $ele = $tbl_h.find("*[name='" + dataIndx + "']");
			if ($ele.length == 0) {
				continue
			}
			var ftype = filter.type,
				value = filter.value,
				value2 = filter.value2;
			if (ftype == "checkbox" && filter.subtype == "triple") {
				$ele.pqval({
					val: value
				})
			} else {
				if (ftype == "select") {
					if (value != null) {
						$ele.val(value)
					}
				}
			}
			var finit = filter.init;
			if (finit) {
				finit.call($ele, {
					dataIndx: dataIndx,
					column: column
				})
			}
			var listeners = filter.listeners;
			if (listeners) {
				for (var j = 0; j < listeners.length; j++) {
					var listener = listeners[j];
					if (typeof listener == "string") {
						listener = self[listener + "Listener"]
					}
					for (var event in listener) {
						var handler = listener[event];
						(function($ele, handler, dataIndx) {
							$ele.bind(event, function(evt) {
								var column = that.getColumn({
										dataIndx: dataIndx
									}),
									filter = column.filter;
								if (filter.type == "checkbox") {
									if (filter.subtype == "triple") {
										value = $ele.pqval({
											incr: true
										})
									} else {
										value = $ele.is(":checked") ? true : false
									}
								} else {
									if (filter.condition == "between") {
										value = $($ele[0]).val();
										value2 = $($ele[1]).val()
									} else {
										value = $ele.val()
									}
								}
								return handler.call(this, evt, {
									column: column,
									dataIndx: dataIndx,
									value: value,
									value2: value2
								})
							})
						})($ele, handler, dataIndx)
					}
				}
			}
		}
	};
	var _betweenTmpl = function(input1, input2) {
		var strS = ["<div class='pq-from-div'>", input1, "</div>", "<span class='pq-from-to-center'>-</span>", "<div class='pq-to-div'>", input2, "</div>"].join("");
		return strS
	};
	_pHeaderSearch.createDOM = function(buffer, td_const_cls) {
		var that = this.that,
			self = this,
			thisOptions = that.options,
			bts_on = thisOptions.bootstrap.on,
			corner_cls = bts_on ? " " : " ui-corner-all",
			dataHS = this.dataHS,
			numberCell = thisOptions.numberCell,
			betweenTmpl = _betweenTmpl;
		buffer.push("<tr class='pq-grid-header-search-row'>");
		if (numberCell.show) {
			buffer.push(["<td pq-col-indx='-1' class='pq-grid-number-col' rowspan='1'>", "<div class='pq-td-div'>&nbsp;</div></td>"].join(""))
		}
		var colDef = that.iGenerateView.colDef;
		for (var i = 0, len = colDef.length; i < len; i++) {
			var colD = colDef[i],
				column = colD.column;
			var td_cls = td_const_cls,
				align = column.halign;
			if (!align) {
				align = column.align
			}
			if (align == "right") {
				td_cls += " pq-align-right"
			} else {
				if (align == "center") {
					td_cls += " pq-align-center"
				}
			}
			var ccls = column.cls;
			if (ccls) {
				td_cls = td_cls + " " + ccls
			}
			var filter = column.filter;
			if (filter) {
				var dataIndx = column.dataIndx,
					type = filter.type,
					value = filter.value,
					condition = filter.condition,
					cls = filter.cls,
					cls = "pq-grid-hd-search-field " + (cls ? cls : ""),
					style = filter.style,
					style = style ? style : "",
					attr = filter.attr,
					attr = attr ? attr : "",
					strS = "";
				if (condition == "between") {
					var value2 = filter.value2,
						value2 = value2 != null ? value2 : ""
				}
				if (type === "textbox") {
					value = value ? value : "";
					cls = cls + " pq-search-txt" + corner_cls;
					if (condition == "between") {
						strS = betweenTmpl(this._input(dataIndx, value, cls + " pq-from", style, attr), this._input(dataIndx, value2, cls + " pq-to", style, attr))
					} else {
						strS = this._input(dataIndx, value, cls, style, attr)
					}
				} else {
					if (type === "textarea") {
						value = value ? value : "";
						cls = cls + " pq-search-txt" + corner_cls;
						if (condition == "between") {
							strS = betweenTmpl(this._textarea(dataIndx, value, cls + " pq-from", style, attr), this._textarea(dataIndx, value2, cls + " pq-to", style, attr))
						} else {
							strS = this._textarea(dataIndx, value, cls, style, attr)
						}
					} else {
						if (type === "select") {
							if (filter.cache) {
								strS = filter.cache
							} else {
								var opts = filter.options;
								if (typeof opts === "function") {
									opts = opts.call(that, {
										column: column,
										value: value,
										dataIndx: dataIndx,
										cls: cls,
										style: style,
										attr: attr
									})
								}
								cls = cls + corner_cls;
								var attrSelect = ["name='", dataIndx, "' class='", cls, "' style='", style, "' ", attr].join("");
								strS = _pq.select({
									options: opts,
									attr: attrSelect,
									prepend: filter.prepend,
									valueIndx: filter.valueIndx,
									labelIndx: filter.labelIndx,
									groupIndx: filter.groupIndx
								});
								filter.cache = strS
							}
						} else {
							if (type == "checkbox") {
								var checked = value == null || value == false ? "" : "checked=checked";
								strS = ["<input ", checked, " name='", dataIndx, "' type=checkbox class='" + cls + "' style='" + style + "' " + attr + "/>"].join("")
							} else {
								if (typeof type == "string") {
									strS = type
								} else {
									if (typeof type == "function") {
										strS = type.call(that, {
											width: column.outerWidth,
											value: value,
											value2: value2,
											column: column,
											dataIndx: dataIndx,
											cls: cls,
											attr: attr,
											style: style
										})
									}
								}
							}
						}
					}
				}
				buffer.push(["<td class='", td_cls, "'><div class='pq-td-div' >", "", strS, "</div></td>"].join(""))
			} else {
				buffer.push(["<td class='", td_cls, "'><div class='pq-td-div' >", "&nbsp;", "</div></td>"].join(""))
			}
		}
		buffer.push("</tr>")
	};
	_pHeaderSearch._input = function(dataIndx, value, cls, style, attr) {
		return ['<input value="', value, "\" name='", dataIndx, "' type=text style='" + style + "' class='" + cls + "' " + attr + " />"].join("")
	};
	_pHeaderSearch._textarea = function(dataIndx, value, cls, style, attr) {
		return ["<textarea name='", dataIndx, "' style='" + style + "' class='" + cls + "' " + attr + " >", value, "</textarea>"].join("")
	};
	fn.refreshToolbar = function() {
		var that = this,
			options = that.options,
			tb = options.toolbar,
			_toolbar;
		if (that._toolbar) {
			_toolbar = that._toolbar;
			_toolbar.destroy()
		}
		if (tb) {
			var cls = tb.cls,
				cls = cls ? cls : "",
				style = tb.style,
				style = style ? style : "",
				attr = tb.attr,
				attr = attr ? attr : "",
				items = tb.items,
				$toolbar = $("<div class='" + cls + "' style='" + style + "' " + attr + " ></div>");
			if (_toolbar) {
				_toolbar.widget().replaceWith($toolbar)
			} else {
				that.$top.append($toolbar)
			}
			_toolbar = pq.toolbar($toolbar, {
				items: items,
				gridInstance: that,
				bootstrap: options.bootstrap
			});
			if (!options.showToolbar) {
				$toolbar.css("display", "none")
			}
			that._toolbar = _toolbar
		}
	};
	fn.isLeftOrRight = function(colIndx) {
		var thisOptions = this.options,
			freezeCols = this.freezeCols;
		if (colIndx > freezeCols) {
			return "right"
		} else {
			return "left"
		}
	};
	fn.ovCreateHeader = function(buffer, const_cls) {
		if (this.options.filterModel.header) {
			this.iHeaderSearch.createDOM(buffer, const_cls)
		}
	};
	fn.filter = function(objP) {
		var that = this,
			thisOptions = this.options,
			apply = objP.apply === undefined ? true : objP.apply,
			sort = objP.sort === undefined ? true : objP.sort,
			DM = thisOptions.dataModel,
			FM = thisOptions.filterModel;
		if (objP != undefined) {
			var replace = objP.oper == "replace" ? true : false,
				rules = objP.data,
				CM = this.colModel,
				CM = !apply ? $.extend(true, [], CM) : CM,
				foundCount = 0,
				CMLength = CM.length,
				rulesLength = rules.length;
			for (var i = 0; i < CMLength; i++) {
				var column = CM[i],
					found = false;
				for (var j = 0; j < rulesLength; j++) {
					if (foundCount == rulesLength) {
						break
					}
					var obj = rules[j];
					if (obj.dataIndx == column.dataIndx) {
						found = true;
						foundCount++;
						var filter = column.filter,
							condition = obj.condition,
							value = obj.value;
						if (!filter) {
							filter = column.filter = {
								on: true
							}
						} else {
							filter.on = true
						}
						if (condition) {
							filter.condition = condition
						}
						condition = filter.condition;
						filter.value = value;
						if (condition == "between") {
							filter.value2 = obj.value2
						} else {
							if (condition == "range") {
								var arrOpts = [];
								if (value) {
									if (typeof value == "string") {
										var options = filter.options;
										var firstIndx = value.indexOf('"');
										var lastIndx = value.lastIndexOf('"');
										value = value.substr(firstIndx, lastIndx + 1);
										value = JSON.parse("[" + value + "]");
										if (options) {
											for (var k = 0, optLen = options.length; k < optLen; k++) {
												var opt = options[k];
												if ($.inArray(opt, value) != -1) {
													arrOpts.push(opt)
												}
											}
										} else {
											arrOpts = value.split(",s*");
										}
									} else {
										if (typeof value.push == "function") {
											arrOpts = value
										}
									}
								}
								filter.value = arrOpts
							}
						}
						break
					}
				}
				if (replace && !found && column.filter) {
					column.filter.on = false
				}
			}
		}
		var obj2 = {
			header: false,
			apply: apply,
			sort: sort,
			CM: CM
		};
		if (DM.location == "remote" && FM.type != "local") {
			this.remoteRequest({
				apply: apply,
				CM: CM,
				callback: function() {
					return that._onDataAvailable(obj2)
				}
			})
		} else {
			obj2.source = "filter";
			obj2.trigger = false;
			return that._onDataAvailable(obj2)
		}
	};
	fn._initTypeColumns = function() {
		var CM = this.colModel;
		for (var i = 0, len = CM.length; i < len; i++) {
			var column = CM[i],
				type = column.type;
			if (type === "checkBoxSelection" || type == "checkbox") {
				column.type = "checkbox";
				new _pq.cCheckBoxColumn(this, column)
			} else {
				if (type === "detail") {
					column.dataIndx = "pq_detail";
					this.iHierarchy = new _pq.cHierarchy(this, column)
				}
			}
		}
	};
	fn.refreshHeader = function() {
		this._createHeader();
		this.iGenerateView.setPanes();
		this._refreshHeaderSortIcons()
	};
	fn._refreshHeaderSortIcons = function() {
		this.iHeader.refreshHeaderSortIcons()
	};
	fn.getLargestRowCol = function(arr) {
		var rowIndx, colIndx;
		for (var i = 0; i < arr.length; i++) {
			var sel = arr[i];
			var rowIndx2 = sel.rowIndx;
			if (rowIndx == null) {
				rowIndx = sel.rowIndx
			} else {
				if (rowIndx2 > rowIndx) {
					rowIndx = rowIndx2
				}
			}
			rowIndx = sel.rowIndx
		}
	};
	fn.bringCellToView = function(obj) {
		this._bringCellToView(obj)
	};
	fn._setUrl = function(queryStr) {
		this.options.dataModel.getUrl = function() {
			return {
				url: this.url + (queryStr != null ? queryStr : "")
			}
		}
	};
	fn.pageData = function() {
		return this.pdata
	};

	function _getData(data, dataIndices, arr) {
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i],
				row = {};
			for (var j = 0, dILen = dataIndices.length; j < dILen; j++) {
				var dataIndx = dataIndices[j];
				row[dataIndx] = rowData[dataIndx]
			}
			arr.push(row)
		}
	}
	fn.getData = function(ui) {
		ui = ui || {};
		var dataIndices = ui.dataIndx,
			dILen = dataIndices ? dataIndices.length : 0,
			data = ui.data,
			DM = this.options.dataModel,
			DMData = DM.data,
			DMDataUF = DM.dataUF,
			arr = [];
		if (dILen) {
			if (data) {
				_getData(data, dataIndices, arr)
			} else {
				if (DMData) {
					_getData(DMData, dataIndices, arr)
				}
				if (DMDataUF) {
					_getData(DMDataUF, dataIndices, arr)
				}
			}
		} else {
			return DMData.concat(DMDataUF ? DMDataUF : [])
		}
		var sorters = [];
		for (var j = 0; j < dILen; j++) {
			var dataIndx = dataIndices[j],
				column = this.getColumn({
					dataIndx: dataIndx
				});
			sorters.push({
				dataIndx: dataIndx,
				dir: "up",
				dataType: column.dataType,
				sortType: column.sortType
			})
		}
		arr = this.iSort._sortLocalData(sorters, arr);
		var arr2 = [],
			item2 = undefined;
		for (var i = 0, len = arr.length; i < len; i++) {
			var rowData = arr[i],
				item = JSON.stringify(rowData);
			if (item !== item2) {
				arr2.push(rowData);
				item2 = item
			}
		}
		return arr2
	};
	fn.get_p_data = function() {
		var o = this.options,
			remotePaging = o.pageModel.type == "remote",
			data = o.dataModel.data,
			pdata = this.pdata,
			offset = this.rowIndxOffset,
			GM = o.groupModel,
			arr = offset && remotePaging ? new Array(offset) : [],
			GMOn = GM.on && GM.dataIndx.length;
		if (GMOn) {
			if (offset) {
				if (!remotePaging) {
					arr = data.slice(0, offset)
				}
				return arr.concat(pdata)
			} else {
				return pdata
			}
		} else {
			if (offset && remotePaging) {
				return arr.concat(pdata)
			} else {
				return data
			}
		}
	};
	fn._onDataAvailable = function(objP) {
		objP = objP || {};
		var options = this.options,
			apply = objP.apply == null ? true : objP.apply,
			source = objP.source,
			sort = objP.sort,
			data = [],
			FM = options.filterModel,
			DM = options.dataModel,
			SM = options.sortModel,
			location = DM.location;
		if (apply !== false) {
			if (objP.trigger !== false) {
				this._trigger("dataAvailable", objP.evt, {
					source: source
				})
			}
		}
		if (FM && FM.on && (location == "local" && FM.type != "remote" || location == "remote" && FM.type == "local")) {
			data = this.iFilterData.filterLocalData(objP).data
		} else {
			data = DM.data
		}
		if (SM.type == "local") {
			if (sort !== false) {
				if (apply) {
					this.sort({
						refresh: false
					})
				} else {
					data = this.iSort.sortLocalData(data)
				}
			}
		}
		if (apply === false) {
			return data
		} else {
			DM.data = data
		}
		this.refreshView(objP)
	};
	fn.reset = function(ui) {
		ui = ui || {};
		var self = this,
			sort = ui.sort,
			CM, i = 0,
			len, o = self.options,
			extend = $.extend,
			sortModel, groupModel, filter = ui.filter,
			cfilter, group = ui.group;
		if (!sort && !filter && !group) {
			return
		}
		if (sort) {
			sortModel = sort === true ? {
				sorter: []
			} : sort;
			extend(o.sortModel, sortModel)
		}
		if (filter) {
			CM = self.getColModel();
			len = CM.length;
			for (; i < len; i++) {
				cfilter = CM[i].filter;
				if (cfilter) {
					cfilter.value = null;
					cfilter.value2 = null;
					cfilter.cache = null
				}
			}
		}
		if (group) {
			groupModel = group === true ? {
				dataIndx: []
			} : group;
			self.groupOption(groupModel, false)
		}
		if (ui.refresh !== false) {
			if (filter) {
				self.filter({
					oper: "replace",
					data: []
				});
				self.refreshHeader()
			} else {
				if (sort) {
					self.sort()
				} else {
					self.refreshView()
				}
			}
		}
	};
	fn._trigger = _pq._trigger;
	fn.on = _pq.on;
	fn.one = _pq.one;
	fn.off = _pq.off;
	fn.pager = function() {
		return this.pagerW
	};
	fn.vscrollbar = function() {
		return this.vscroll
	};
	fn.hscrollbar = function() {
		return this.hscroll
	};
	fn.toolbar = function() {
		return this._toolbar.element
	};

	function cCompute(that) {
		var self = this;
		self.that = that;
		self.findformulas();
		that.on("columnChange", function() {
			self.findformulas()
		}).on("dataAvailable", function() {
			self._onDA()
		}).on(true, "change", function(evt, ui) {
			self._onchange(ui)
		})
	}
	_pq.cCompute = cCompute;
	var _pCompute = cCompute.prototype;
	_pCompute.callRow = function(rowData, formulas, flen) {
		if (!rowData) {
			return
		}
		while (flen--) {
			var fobj = formulas[flen],
				formula = fobj.formula,
				column = fobj.column;
			rowData[column.dataIndx] = formula.call(this.that, {
				rowData: rowData,
				column: column
			})
		}
	};
	_pCompute._onDA = function() {
		var flen = this.formulas.length;
		if (flen) {
			var o = this.that.options,
				data = o.dataModel.data,
				i = data.length,
				formulas = this.formulas;
			while (i--) {
				this.callRow(data[i], formulas, flen)
			}
		}
	};
	_pCompute._onchange = function(ui) {
		var flen = this.formulas.length;
		if (flen) {
			var rowList = ui.rowList,
				formulas = this.formulas,
				i = rowList.length;
			while (i--) {
				this.callRow(rowList[i].rowData, formulas, flen)
			}
		}
	};
	_pCompute.findformulas = function() {
		var that = this.that,
			CM = that.colModel,
			column, formula, formulas = [],
			i = CM.length;
		while (i--) {
			column = CM[i];
			formula = column.formula;
			if (formula) {
				formulas.push({
					formula: formula,
					column: column
				})
			}
		}
		this.formulas = formulas
	};
	var cColModel = _pq.cColModel = cColModel = function(that) {
		this.that = that;
		this.init()
	};
	var _pCM = cColModel.prototype;
	_pCM.extend = function(CM, CMT) {
		var key, val, extend = $.extend,
			i = CM.length;
		while (i--) {
			var column = CM[i];
			for (key in CMT) {
				if (column[key] === undefined) {
					val = CMT[key];
					if (val && typeof val == "object") {
						column[key] = extend(true, {}, val)
					} else {
						column[key] = val
					}
				}
			}
		}
	};
	_pCM.init = function() {
		var that = this.that,
			o = that.options,
			obj, CMT = o.columnTemplate,
			CM, CMLength, oCM = o.colModel;
		if (!oCM) {
			this._autoGenColumns();
			oCM = o.colModel
		}
		obj = this.nestedCols(oCM);
		that.depth = obj.depth;
		CM = that.colModel = obj.colModel;
		CMLength = CM.length;
		if (CMT) {
			this.extend(CM, CMT)
		}
		this.getHeadersCells();
		this.alignColumns(CM, CMLength);
		this.assignRowSpan();
		this._refreshDataIndices();
		that._trigger("CMInit")
	};
	_pCM.alignColumns = function(CM, CMLength) {
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i];
			if (!column.align) {
				var dataType = column.dataType;
				if (dataType && (dataType == "integer" || dataType == "float")) {
					column.align = "right"
				}
			}
		}
	};
	_pCM.nestedCols = function(colMarr, _depth, _hidden, parent) {
		var len = colMarr.length,
			arr = [];
		if (_depth == null) {
			_depth = 1
		}
		var new_depth = _depth,
			colSpan = 0,
			width = 0,
			childCount = 0,
			o_colspan = 0;
		for (var i = 0; i < len; i++) {
			var column = colMarr[i];
			column.parent = parent ? parent : undefined;
			if (_hidden === true) {
				column.hidden = _hidden
			}
			var child_CM = column.colModel;
			if (child_CM && child_CM.length) {
				var obj = this.nestedCols(child_CM, _depth + 1, column.hidden, column);
				arr = arr.concat(obj.colModel);
				if (obj.colSpan > 0) {
					if (obj.depth > new_depth) {
						new_depth = obj.depth
					}
					column.colSpan = obj.colSpan;
					colSpan += obj.colSpan
				} else {
					column.colSpan = 0
				}
				o_colspan += obj.o_colspan;
				column.o_colspan = obj.o_colspan;
				column.childCount = obj.childCount;
				childCount += obj.childCount
			} else {
				if (column.hidden) {
					column.colSpan = 0
				} else {
					column.colSpan = 1;
					colSpan++
				}
				o_colspan++;
				column.o_colspan = 1;
				column.childCount = 0;
				childCount++;
				arr.push(column)
			}
		}
		return {
			depth: new_depth,
			colModel: arr,
			colSpan: colSpan,
			width: width,
			childCount: childCount,
			o_colspan: o_colspan
		}
	};
	_pCM.getHeadersCells = function() {
		var that = this.that,
			optColModel = that.options.colModel,
			CMLength = that.colModel.length,
			depth = that.depth,
			arr = [];
		for (var row = 0; row < depth; row++) {
			arr[row] = [];
			var k = 0,
				childCountSum = 0;
			for (var col = 0; col < CMLength; col++) {
				var colModel;
				if (row == 0) {
					colModel = optColModel[k]
				} else {
					var parentColModel = arr[row - 1][col],
						children = parentColModel.colModel;
					if (!children || children.length == 0) {
						colModel = parentColModel
					} else {
						var diff = col - parentColModel.leftPos,
							childCountSum2 = 0,
							tt = 0;
						for (var t = 0; t < children.length; t++) {
							childCountSum2 += children[t].childCount > 0 ? children[t].childCount : 1;
							if (diff < childCountSum2) {
								tt = t;
								break
							}
						}
						colModel = children[tt]
					}
				}
				var childCount = colModel.childCount ? colModel.childCount : 1;
				if (col == childCountSum) {
					colModel.leftPos = col;
					arr[row][col] = colModel;
					childCountSum += childCount;
					if (optColModel[k + 1]) {
						k++
					}
				} else {
					arr[row][col] = arr[row][col - 1]
				}
			}
		}
		that.headerCells = arr;
		return arr
	};
	_pCM.getDataType = function() {
		var CM = this.colModel;
		if (CM && CM[0]) {
			var dataIndx = CM[0].dataIndx;
			if (typeof dataIndx == "string") {
				return "JSON"
			} else {
				return "ARRAY"
			}
		}
	};
	_pCM.assignRowSpan = function() {
		var that = this.that,
			CMLength = that.colModel.length,
			headerCells = that.headerCells,
			depth = that.depth;
		for (var col = 0; col < CMLength; col++) {
			for (var row = 0; row < depth; row++) {
				var colModel = headerCells[row][col];
				if (col > 0 && colModel == headerCells[row][col - 1]) {
					continue
				} else {
					if (row > 0 && colModel == headerCells[row - 1][col]) {
						continue
					}
				}
				var rowSpan = 1;
				for (var row2 = row + 1; row2 < depth; row2++) {
					var colModel2 = headerCells[row2][col];
					if (colModel == colModel2) {
						rowSpan++
					}
				}
				colModel.rowSpan = rowSpan
			}
		}
		return headerCells
	};
	_pCM._autoGenColumns = function() {
		var that = this.that,
			o = that.options,
			CT = o.columnTemplate || {},
			CT_dataType = CT.dataType,
			CT_title = CT.title,
			CT_width = CT.width,
			data = o.dataModel.data,
			val = pq.validation,
			CM = [];
		if (data && data.length) {
			var rowData = data[0];
			$.each(rowData, function(indx, cellData) {
				var dataType = "string";
				if (val.isInteger(cellData)) {
					if (cellData + "".indexOf(".") > -1) {
						dataType = "float"
					} else {
						dataType = "integer"
					}
				} else {
					if (val.isDate(cellData)) {
						dataType = "date"
					} else {
						if (val.isFloat(cellData)) {
							dataType = "float"
						}
					}
				}
				CM.push({
					dataType: CT_dataType ? CT_dataType : dataType,
					dataIndx: indx,
					title: CT_title ? CT_title : indx,
					width: CT_width ? CT_width : 100
				})
			})
		}
		o.colModel = CM
	};
	_pCM._refreshDataIndices = function() {
		var that = this.that,
			isJSON = this.getDataType() == "JSON" ? true : false,
			columns = {},
			colIndxs = {},
			validations = {};
		var CM = that.colModel,
			CMLength = CM.length;
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx;
			if (dataIndx == null) {
				dataIndx = column.type == "detail" ? "pq_detail" : isJSON ? "dataIndx_" + i : i;
				if (dataIndx == "pq_detail") {
					column.dataType = "object"
				}
				column.dataIndx = dataIndx
			}
			columns[dataIndx] = column;
			colIndxs[dataIndx] = i;
			var valids = column.validations;
			if (valids) {
				validations[dataIndx] = validations
			}
		}
		that.columns = columns;
		that.colIndxs = colIndxs;
		that.validations = validations
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		fn = _pq._pqGrid.prototype;
	fn.exportExcel = function(obj) {
		obj = obj || {};
		obj.format = "xlsx";
		return this.exportData(obj)
	};
	fn.exportCsv = function(obj) {
		obj = obj || {};
		obj.format = "csv";
		return this.exportData(obj)
	};
	fn.exportData = function(obj) {
		var e = new cExport(this, obj);
		return e.Export(obj)
	};
	var cExport = _pq.cExport = function(that, obj) {
		var self = this,
			__pro__ = "ParamQuery Pro";
		self.that = that;
		self.templates = {
			content_types: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Override PartName="/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/worksheet.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/></Types>',
			workbook: ['<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><sheets><sheet name="', obj.sheetName ? obj.sheetName : __pro__, '" sheetId="1" r:id="rId1"/></sheets></workbook>'].join(""),
			worksheet: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="http://schemas.openxmlformats.org/spreadsheetml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships"><%=content%></worksheet>',
			rels: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="workbook.xml"/></Relationships>',
			workbook_rels: '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheet.xml"/></Relationships>'
		}
	};
	var _p = cExport.prototype;
	_p.getTitle = function(cell, colIndx) {
		var title = cell.title;
		if (title) {
			if (typeof title == "function") {
				title = title.call(this.that, {
					colIndx: colIndx,
					column: cell,
					dataIndx: cell.dataIndx,
					Export: true
				})
			}
		} else {
			title = ""
		}
		return title
	};
	_p.getRenderVal = function(objP, render, iGV) {
		var column = objP.column,
			cer = column.exportRender;
		if ((render && cer !== false || cer) && (column.render || column._render || column.format)) {
			return iGV.renderCell(objP)
		} else {
			return objP.rowData[objP.dataIndx]
		}
	};
	_p.getXlsMergeCells = function(mc, hcLen, iMerge, dataLen) {
		mc = mc.concat(iMerge.getMergeCells(hcLen, this.curPage, dataLen));
		var mcs = [],
			toLetter = _pq.toLetter,
			mcLen = mc.length;
		mcs.push('<mergeCells count="' + mcLen + '">');
		for (var i = 0; i < mcLen; i++) {
			var obj = mc[i];
			obj = toLetter(obj.c1) + (obj.r1 + 1) + ":" + toLetter(obj.c2) + (obj.r2 + 1);
			mcs.push('<mergeCell ref="', obj, '"/>')
		}
		mcs.push("</mergeCells>");
		return mcLen ? mcs.join("") : ""
	};
	_p.getXlsCols = function(CM, CMLen) {
		var cols = [],
			min, max, oldWidth, oldHidden, col = 0,
			addCol = function(cols, min, max, hidden, width) {
				cols.push('<col min="', min, '" max="', max, '" hidden="', hidden, '" customWidth="1" width="', Math.ceil(width / 7), '"/>')
			};
		cols.push("<cols>");
		for (var i = 0; i < CMLen; i++) {
			var column = CM[i],
				hidden = column.hidden ? "1" : "0",
				width = column._width;
			if (column.copy === false) {
				continue
			}
			col++;
			if (!width) {
				width = parseInt(column.width);
				if (!width) {
					width = 100
				}
			}
			if (oldWidth === width && oldHidden === hidden) {
				max = col
			} else {
				if (oldWidth != null) {
					addCol(cols, min, max, oldHidden, oldWidth);
					min = null
				}
				max = col;
				if (min == null) {
					min = col
				}
			}
			oldWidth = width;
			oldHidden = hidden
		}
		addCol(cols, min, max, oldHidden, oldWidth);
		cols.push("</cols>");
		return cols.join("")
	};
	_p.getXlsHeader = function(hc, hcLen, mc) {
		var self = this,
			header = [];
		for (var i = 0; i < hcLen; i++) {
			var row = hc[i];
			header.push("<row>");
			for (var ci = 0, lenj = row.length; ci < lenj; ci++) {
				var cell = row[ci];
				if (cell.copy === false) {
					continue
				}
				var colspan = cell.o_colspan,
					rowspan = cell.rowSpan,
					title = self.getTitle(cell, ci);
				if (i > 0 && cell == hc[i - 1][ci]) {
					title = ""
				} else {
					if (ci > 0 && cell == hc[i][ci - 1]) {
						title = ""
					} else {
						if (colspan > 1 || rowspan > 1) {
							mc.push({
								r1: i,
								c1: ci,
								r2: i + rowspan - 1,
								c2: ci + colspan - 1
							})
						}
					}
				}
				header.push('<c t="inlineStr"><is><t><![CDATA[' + title + "]]></t></is></c>")
			}
			header.push("</row>")
		}
		return header.join("")
	};
	_p.getXlsBody = function(CM, CMLen, data, dataLen, remotePage, offset, iMerge, render, iGV) {
		var self = this,
			body = [],
			i, j, cv, column, objR, rowData, ri, rip, hidden, objDataType = {
				integer: "Number",
				"float": "Number",
				bool: "bool"
			},
			datatype;
		for (i = 0; i < dataLen; i++) {
			rowData = data[i];
			hidden = rowData.pq_hidden ? 'hidden="1"' : "";
			ri = remotePage ? i + offset : i;
			rip = ri - offset;
			objR = {
				rowIndx: ri,
				rowIndxPage: rip,
				rowData: rowData,
				Export: true
			};
			body.push("<row " + hidden + ">");
			for (j = 0; j < CMLen; j++) {
				column = CM[j];
				if (column.copy === false) {
					continue
				}
				cv = undefined;
				if (iMerge.ismergedCell(ri, j)) {
					if (!iMerge.isRootCell(ri, j, "o")) {
						cv = null
					}
				}
				if (cv === undefined) {
					objR.colIndx = j;
					objR.column = column;
					objR.dataIndx = column.dataIndx;
					cv = self.getRenderVal(objR, render, iGV)
				}
				datatype = cv == null ? null : objDataType[column.dataType];
				if (typeof cv == "string") {
					datatype = "String"
				}
				datatype = datatype || "String";
				cv = cv == null ? "" : cv;
				if (datatype == "String") {
					body.push('<c t="inlineStr"><is><t><![CDATA[' + cv + "]]></t></is></c>")
				} else {
					if (datatype == "Number") {
						body.push("<c><v>" + cv + "</v></c>")
					} else {
						if (datatype == "bool") {
							cv = cv ? "1" : "0";
							body.push('<c t="b"><v>' + cv + "</v></c>")
						} else {
							body.push("<c><v>" + cv + "</v></c>")
						}
					}
				}
			}
			body.push("</row>")
		}
		return body.join("\n")
	};
	_p.getXlsContent = function(CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header) {
		var self = this,
			frozen = '<sheetViews><sheetView workbookViewId="0"><pane ySplit="<%=a%>" topLeftCell="A<%=b%>" activePane="bottomLeft" state="frozen"/></sheetView></sheetViews>',
			cols = self.getXlsCols(CM, CMLen),
			mc = [],
			fr = header ? hcLen : 0,
			frozen = frozen.replace("<%=a%>", fr),
			frozen = frozen.replace("<%=b%>", fr + 1),
			_header = header ? self.getXlsHeader(hc, hcLen, mc) : "",
			body = self.getXlsBody(CM, CMLen, data, dataLen, remotePage, offset, iMerge, render, iGV),
			content = [frozen, cols, "<sheetData>", _header, body, "</sheetData>", self.getXlsMergeCells(mc, header ? hcLen : 0, iMerge, dataLen)].join("");
		return content
	};
	_p.getHtmlHeader = function(hc, hcLen) {
		var self = this,
			header = [],
			cell, colspan, rowspan, title, align;
		for (var i = 0; i < hcLen; i++) {
			var row = hc[i],
				laidCell = null;
			header.push("<tr>");
			for (var ci = 0, lenj = row.length; ci < lenj; ci++) {
				cell = row[ci];
				colspan = cell.colSpan;
				if (cell.hidden || !colspan || cell.copy === false) {
					continue
				}
				rowspan = cell.rowSpan;
				if (i > 0 && cell == hc[i - 1][ci]) {} else {
					if (laidCell && ci > 0 && cell == laidCell) {} else {
						title = self.getTitle(cell, ci);
						laidCell = cell;
						align = cell.halign || cell.align;
						align = align ? "align=" + align : "";
						header.push("<th colspan=", colspan, " rowspan=", rowspan, " ", align, ">", title, "</th>")
					}
				}
			}
			header.push("</tr>")
		}
		return header.join("")
	};
	_p.getHtmlBody = function(CM, CMLen, data, dataLen, remotePage, offset, iMerge, render, iGV) {
		var self = this,
			response = [],
			i, j, column, objN, objM, objR, rowData, ri, rip, cellData, attr, align;
		for (i = 0; i < dataLen; i++) {
			rowData = data[i];
			if (rowData.pq_hidden) {
				continue
			}
			ri = remotePage ? i + offset : i;
			rip = ri - offset;
			objR = {
				rowIndx: ri,
				rowIndxPage: rip,
				rowData: rowData,
				Export: true
			};
			response.push("<tr>");
			for (j = 0; j < CMLen; j++) {
				column = CM[j];
				if (column.hidden || column.copy === false) {
					continue
				}
				objN = null;
				objM = null;
				attr = "";
				if (iMerge.ismergedCell(ri, j)) {
					if (objM = iMerge.isRootCell(ri, j)) {
						objN = iMerge.getRootCell(ri, j, "o");
						objN.Export = true;
						cellData = self.getRenderVal(objN, render, iGV)
					} else {
						continue
					}
					attr = "rowspan=" + objM.rowspan + " colspan=" + objM.colspan + " "
				} else {
					objR.colIndx = j;
					objR.column = column;
					objR.dataIndx = column.dataIndx;
					cellData = self.getRenderVal(objR, render, iGV)
				}
				align = column.align;
				attr += align ? "align=" + align : "";
				cellData = cellData == null ? "" : cellData;
				response.push("<td ", attr, ">", cellData, "</td>")
			}
			response.push("</tr>")
		}
		return response.join("")
	};
	_p.getHtmlContent = function(obj, CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header) {
		var self = this,
			that = self.that,
			cssRules = obj.cssRules || "",
			$tbl = that.element.find(".pq-grid-table"),
			fontFamily = $tbl.css("font-family"),
			fontSize = $tbl.css("font-size"),
			styleTable = "table{empty-cells:show;font-family:" + fontFamily + ";font-size:" + fontSize + ";border-collapse:collapse;}",
			response = [];
		response.push("<!DOCTYPE html><html><head>", '<meta charset="utf-8" />', "<title>", obj.title ? obj.title : "ParamQuery Pro", "</title>", "</head><body>", "<style>", styleTable, "td,th{padding: 5px;border:1px solid #ccc;}", cssRules, "</style>", "<table>");
		response.push(header ? self.getHtmlHeader(hc, hcLen, CM) : "");
		response.push(self.getHtmlBody(CM, CMLen, data, dataLen, remotePage, offset, iMerge, render, iGV));
		response.push("</table></body></html>");
		return response.join("")
	};
	_p.getCsvHeader = function(hc, hcLen, CM, separator) {
		var self = this,
			header = [],
			csvRows = [],
			column, cell, title;
		for (var i = 0; i < hcLen; i++) {
			var row = hc[i],
				laidCell = null;
			for (var ci = 0, lenj = row.length; ci < lenj; ci++) {
				column = CM[ci];
				if (column.hidden || column.copy === false) {
					continue
				}
				cell = row[ci];
				if (i > 0 && cell == hc[i - 1][ci]) {
					header.push("")
				} else {
					if (laidCell && ci > 0 && cell == laidCell) {
						header.push("")
					} else {
						title = self.getTitle(cell, ci);
						title = title ? title.replace(/\"/g, '""') : "";
						laidCell = cell;
						header.push('"' + title + '"')
					}
				}
			}
			csvRows.push(header.join(separator));
			header = []
		}
		return csvRows
	};
	_p.getCSVContent = function(obj, CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header) {
		var self = this,
			objM, objN, cv, i, j, separator = obj.separator || ",",
			objR, rowData, ri, rip, column, csvRows, response = [];
		csvRows = header ? self.getCsvHeader(hc, hcLen, CM, separator) : [];
		for (i = 0; i < dataLen; i++) {
			rowData = data[i];
			if (rowData.pq_hidden) {
				continue
			}
			ri = remotePage ? i + offset : i;
			rip = ri - offset;
			objR = {
				rowIndx: ri,
				rowIndxPage: rip,
				rowData: rowData,
				Export: true
			};
			for (var j = 0; j < CMLen; j++) {
				column = CM[j];
				if (!column.hidden && column.copy !== false) {
					objN = null;
					objM = null;
					if (iMerge.ismergedCell(ri, j)) {
						if (objM = iMerge.isRootCell(ri, j)) {
							objN = iMerge.getRootCell(ri, j, "o");
							objN.Export = true;
							cv = self.getRenderVal(objN, render, iGV)
						} else {
							cv = ""
						}
					} else {
						objR.colIndx = j;
						objR.column = column;
						objR.dataIndx = column.dataIndx;
						cv = self.getRenderVal(objR, render, iGV)
					}
					var cellData = (cv == null ? "" : cv) + "";
					cellData = cellData.replace(/\"/g, '""');
					response.push('"' + cellData + '"')
				}
			}
			csvRows.push(response.join(separator));
			response = []
		}
		return csvRows.join("\n")
	};
	_p.getJsonContent = function(obj, data) {
		function replacer(key, val) {
			if ((key + "").indexOf("pq_") === 0) {
				return undefined
			}
			return val
		}
		return obj.nostringify ? data : JSON.stringify(data, obj.nopqdata ? replacer : null, obj.nopretty ? null : 2)
	};
	_p.postRequest = function(obj) {
		var format = obj.format,
			data, decodeBase, url = obj.url,
			filename = obj.filename || "pqGrid";
		if (obj.zip && format != "xlsx") {
			var zip = new JSZip;
			zip.file(filename + "." + obj.format, obj.data);
			data = zip.generate({
				type: "base64",
				compression: "DEFLATE"
			});
			decodeBase = true;
			format = "zip"
		} else {
			decodeBase = obj.decodeBase ? true : false;
			data = obj.data
		}
		if (url) {
			$.ajax({
				url: url,
				type: "POST",
				cache: false,
				data: {
					pq_ext: format,
					pq_data: data,
					pq_decode: decodeBase,
					pq_filename: filename
				},
				success: function(filename) {
					url = url + ((url.indexOf("?") > 0 ? "&" : "?") + "pq_filename=" + filename);
					$(document.body).append("<iframe height='0' width='0' frameborder='0' src=\"" + url + '"></iframe>')
				}
			})
		}
		return data
	};
	_p.Export = function(obj) {
		var self = this,
			that = self.that,
			options = that.options,
			content, zip, ret, rels, templates = self.templates,
			GM = options.groupModel,
			remotePage = options.pageModel.type == "remote",
			offset = that.rowIndxOffset,
			iGV = that.iGenerateView,
			iMerge = that.iMerge,
			CM = that.colModel,
			CMLen = CM.length,
			hc = that.headerCells,
			hcLen = hc.length,
			curPage = self.curPage = GM.on && GM.dataIndx.length || remotePage,
			data = curPage ? that.pdata : options.dataModel.data,
			data = options.summaryData ? data.concat(options.summaryData) : data,
			dataLen = data.length,
			url = obj.url,
			render = obj.render,
			header = !obj.noheader,
			format = obj.format;
		that._trigger("beforeExport", null, obj);
		if (format == "xlsx") {
			content = self.getXlsContent(CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header);
			zip = new JSZip;
			zip.file("[Content_Types].xml", templates.content_types);
			zip.file("workbook.xml", templates.workbook);
			zip.file("worksheet.xml", templates.worksheet.replace("<%=content%>", content));
			rels = zip.folder("_rels");
			rels.file(".rels", templates.rels);
			rels.file("workbook.xml.rels", templates.workbook_rels);
			if (url) {
				obj.data = zip.generate({
					type: "base64",
					compression: "DEFLATE"
				});
				obj.decodeBase = true
			} else {
				ret = zip.generate({
					type: "blob",
					compression: "DEFLATE"
				})
			}
		} else {
			if (format == "json") {
				obj.data = self.getJsonContent(obj, data)
			} else {
				if (format == "csv") {
					obj.data = self.getCSVContent(obj, CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header)
				} else {
					obj.data = self.getHtmlContent(obj, CM, CMLen, hc, hcLen, data, dataLen, remotePage, offset, iMerge, render, iGV, header)
				}
			}
		}
		ret = ret ? ret : self.postRequest(obj);
		that._trigger("exportData", null, obj);
		return ret
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		fnTB = {};
	fnTB.options = {
		items: [],
		gridInstance: null
	};
	$.widget("paramquery.pqToolbar", fnTB);
	fnTB = _pq.pqToolbar.prototype;
	fnTB.refresh = function() {
		this.element.empty();
		this._create()
	};
	fnTB._create = function() {
		var o = this.options,
			that = o.gridInstance,
			events = {
				button: "click",
				select: "change",
				checkbox: "change",
				textbox: "change"
			},
			event, listener, bootstrap = o.bootstrap,
			BS_on = bootstrap.on,
			CM = that.colModel,
			items = o.items,
			element = this.element;
		element.addClass("pq-toolbar");
		for (var i = 0, len = items.length; i < len; i++) {
			var item = items[i],
				type = item.type,
				ivalue = item.value,
				icon = item.icon,
				options = item.options || {},
				label = item.label,
				listener = item.listener,
				listeners = listener ? [listener] : item.listeners,
				listeners = listeners || [function() {}],
				itemcls = item.cls,
				cls = itemcls ? itemcls : "",
				cls = BS_on && type == "button" ? bootstrap.btn + " " + cls : cls,
				cls = cls ? "class='" + cls + "'" : "",
				itemstyle = item.style,
				style = itemstyle ? "style='" + itemstyle + "'" : "",
				itemattr = item.attr,
				attr = itemattr ? itemattr : "",
				strStyleClsAttr = label && type != "button" ? [cls, attr] : [cls, attr, style],
				strStyleClsAttr = strStyleClsAttr.join(" "),
				inp, $ctrl;
			item.options = options;
			if (type == "textbox") {
				$ctrl = $([label ? "<label " + style + ">" + label : "", "<input type='text' " + strStyleClsAttr + ">", label ? "</label>" : ""].join(""))
			} else {
				if (type == "textarea") {
					$ctrl = $([label ? "<label " + style + ">" + label : "", "<textarea " + strStyleClsAttr + "></textarea>", label ? "</label>" : ""].join(""))
				} else {
					if (type == "checkbox") {
						$ctrl = $([label ? "<label " + style + ">" : "", "<input type='checkbox' ", ivalue ? "checked='checked' " : "", strStyleClsAttr, ">", label ? label + "</label>" : ""].join(""))
					} else {
						if (type == "separator") {
							$ctrl = $("<span class='pq-separator' " + [attr, style].join(" ") + "></span>")
						} else {
							if (type == "button") {
								var bicon = "";
								if (BS_on) {
									bicon = icon ? "<span class='glyphicon " + icon + "'></span>" : ""
								}
								$ctrl = $("<button type='button' " + strStyleClsAttr + ">" + bicon + label + "</button>");
								$.extend(options, {
									label: label ? label : false,
									icons: {
										primary: BS_on ? "" : icon
									}
								});
								$ctrl.button(options)
							} else {
								if (type == "select") {
									if (typeof options === "function") {
										options = options.call(that, {
											colModel: CM
										})
									}
									options = options || [];
									inp = _pq.select({
										options: options,
										attr: strStyleClsAttr,
										prepend: item.prepend,
										groupIndx: item.groupIndx,
										valueIndx: item.valueIndx,
										labelIndx: item.labelIndx
									});
									$ctrl = $([label ? "<label " + style + ">" + label : "", inp, label ? "</label>" : ""].join(""))
								} else {
									if (typeof type == "string") {
										$ctrl = $(type)
									} else {
										if (typeof type == "function") {
											inp = type.call(that, {
												colModel: CM,
												cls: cls
											});
											$ctrl = $(inp)
										}
									}
								}
							}
						}
					}
				}
			}
			$ctrl.appendTo(element);
			if (type !== "checkbox" && ivalue !== undefined) {
				if (label) {
					$($ctrl[0].children[0]).val(ivalue)
				} else {
					$ctrl.val(ivalue)
				}
			}
			for (var j = 0, lenj = listeners.length; j < lenj; j++) {
				listener = listeners[j];
				var _obj = {};
				if (typeof listener == "function") {
					_obj[events[type]] = listener
				} else {
					_obj = listener
				}
				for (event in _obj) {
					$ctrl.on(event, this._onEvent(that, _obj[event], item))
				}
			}
		}
	};
	fnTB._onEvent = function(that, cb, item) {
		return function(evt) {
			if (item.type == "checkbox") {
				item.value = $(evt.target).prop("checked")
			} else {
				item.value = $(evt.target).val()
			}
			cb.call(that, evt)
		}
	};
	fnTB._destroy = function() {
		this.element.empty().removeClass("pq-toolbar").enableSelection()
	};
	fnTB._disable = function() {
		if (this.$disable == null) {
			this.$disable = $("<div class='pq-grid-disable'></div>").css("opacity", .2).appendTo(this.element)
		}
	};
	fnTB._enable = function() {
		if (this.$disable) {
			this.element[0].removeChild(this.$disable[0]);
			this.$disable = null
		}
	};
	fnTB._setOption = function(key, value) {
		if (key == "disabled") {
			if (value == true) {
				this._disable()
			} else {
				this._enable()
			}
		}
	};
	pq.toolbar = function(selector, options) {
		var $p = $(selector).pqToolbar(options),
			p = $p.data("paramqueryPqToolbar") || $p.data("paramquery-pqToolbar");
		return p
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		pq_options = _pq.pqGrid.prototype.options,
		trackModel = {
			on: false,
			dirtyClass: "pq-cell-dirty"
		};
	pq_options.trackModel = pq_options.trackModel || trackModel;
	var cUCData = _pq.cUCData = function(that) {
		this.that = that;
		this.udata = [];
		this.ddata = [];
		this.adata = [];
		this.options = that.options;
		var self = this;
		that.on("dataAvailable", function(evt, ui) {
			if (ui.source != "filter") {
				self.udata = [];
				self.ddata = [];
				self.adata = []
			}
		})
	};
	var _pUCData = cUCData.prototype = new _pq.cClass;
	_pUCData.add = function(obj) {
		var that = this.that,
			adata = this.adata,
			ddata = this.ddata,
			rowData = obj.rowData,
			TM = this.options.trackModel,
			dirtyClass = TM.dirtyClass,
			recId = that.getRecId({
				rowData: rowData
			});
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i];
			if (recId != null && rec.recId == recId) {
				throw "primary key violation"
			}
			if (rec.rowData == rowData) {
				throw "same data can't be added twice."
			}
		}
		for (var i = 0, len = ddata.length; i < len; i++) {
			if (rowData == ddata[i].rowData) {
				ddata.splice(i, 1);
				return
			}
		}
		var dataIndxs = [];
		for (var dataIndx in rowData) {
			dataIndxs.push(dataIndx)
		}
		that.removeClass({
			rowData: rowData,
			dataIndx: dataIndxs,
			cls: dirtyClass
		});
		var obj = {
			recId: recId,
			rowData: rowData
		};
		adata.push(obj)
	};
	_pUCData.update = function(objP) {
		var that = this.that,
			TM = this.options.trackModel,
			dirtyClass = TM.dirtyClass,
			rowData = objP.rowData || that.getRowData(objP),
			recId = that.getRecId({
				rowData: rowData
			}),
			dataIndx = objP.dataIndx,
			refresh = objP.refresh,
			columns = that.columns,
			getVal = that.getValueFromDataType,
			newRow = objP.row,
			udata = this.udata,
			newudata = udata.slice(0),
			_found = false;
		if (recId == null) {
			return
		}
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				oldRow = rec.oldRow;
			if (rec.rowData == rowData) {
				_found = true;
				for (var dataIndx in newRow) {
					var column = columns[dataIndx],
						dataType = column.dataType,
						newVal = newRow[dataIndx],
						newVal = getVal(newVal, dataType),
						oldVal = oldRow[dataIndx],
						oldVal = getVal(oldVal, dataType);
					if (oldRow.hasOwnProperty(dataIndx) && oldVal === newVal) {
						var obj = {
							rowData: rowData,
							dataIndx: dataIndx,
							refresh: refresh,
							cls: dirtyClass
						};
						that.removeClass(obj);
						delete oldRow[dataIndx]
					} else {
						var obj = {
							rowData: rowData,
							dataIndx: dataIndx,
							refresh: refresh,
							cls: dirtyClass
						};
						that.addClass(obj);
						if (!oldRow.hasOwnProperty(dataIndx)) {
							oldRow[dataIndx] = rowData[dataIndx]
						}
					}
				}
				if ($.isEmptyObject(oldRow)) {
					newudata.splice(i, 1)
				}
				break
			}
		}
		if (!_found) {
			var oldRow = {};
			for (var dataIndx in newRow) {
				oldRow[dataIndx] = rowData[dataIndx];
				var obj = {
					rowData: rowData,
					dataIndx: dataIndx,
					refresh: refresh,
					cls: dirtyClass
				};
				that.addClass(obj)
			}
			var obj = {
				rowData: rowData,
				recId: recId,
				oldRow: oldRow
			};
			newudata.push(obj)
		}
		this.udata = newudata
	};
	_pUCData["delete"] = function(obj) {
		var that = this.that,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = rowIndx == null ? rowIndxPage + offset : rowIndx,
			rowIndxPage = rowIndxPage == null ? rowIndx - offset : rowIndxPage,
			paging = that.options.pageModel.type,
			indx = paging == "remote" ? rowIndxPage : rowIndx,
			adata = this.adata,
			ddata = this.ddata,
			rowData = that.getRowData(obj);
		for (var i = 0, len = adata.length; i < len; i++) {
			if (adata[i].rowData == rowData) {
				adata.splice(i, 1);
				return
			}
		}
		ddata.push({
			indx: indx,
			rowData: rowData,
			rowIndx: rowIndx
		})
	};
	_pUCData.isDirty = function(ui) {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			dirty = false,
			rowData = that.getRowData(ui);
		if (rowData) {
			for (var i = 0; i < udata.length; i++) {
				var rec = udata[i];
				if (rowData == rec.rowData) {
					dirty = true;
					break
				}
			}
		} else {
			if (udata.length || adata.length || ddata.length) {
				dirty = true
			}
		}
		return dirty
	};
	_pUCData.getChangesValue = function(ui) {
		ui = ui || {};
		var that = this.that,
			all = ui.all,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			mupdateList = [],
			updateList = [],
			oldList = [],
			addList = [],
			mdeleteList = [],
			deleteList = [];
		for (var i = 0, len = ddata.length; i < len; i++) {
			var rec = ddata[i],
				rowData = rec.rowData,
				row = {};
			mdeleteList.push(rowData);
			for (var key in rowData) {
				if (key.indexOf("pq_") != 0) {
					row[key] = rowData[key]
				}
			}
			deleteList.push(row)
		}
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				oldRow = rec.oldRow,
				rowData = rec.rowData;
			if ($.inArray(rowData, mdeleteList) != -1) {
				continue
			}
			if ($.inArray(rowData, mupdateList) == -1) {
				var row = {};
				if (all !== false) {
					for (var key in rowData) {
						if (key.indexOf("pq_") != 0) {
							row[key] = rowData[key]
						}
					}
				} else {
					for (var key in oldRow) {
						row[key] = rowData[key]
					}
					row[that.options.dataModel.recIndx] = rec.recId
				}
				mupdateList.push(rowData);
				updateList.push(row);
				oldList.push(oldRow)
			}
		}
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i],
				rowData = rec.rowData,
				row = {};
			for (var key in rowData) {
				if (key.indexOf("pq_") != 0) {
					row[key] = rowData[key]
				}
			}
			addList.push(row)
		}
		return {
			updateList: updateList,
			addList: addList,
			deleteList: deleteList,
			oldList: oldList
		}
	};
	_pUCData.getChanges = function() {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			inArray = $.inArray,
			updateList = [],
			oldList = [],
			addList = [],
			deleteList = [];
		for (var i = 0, len = ddata.length; i < len; i++) {
			var rec = ddata[i],
				rowData = rec.rowData;
			deleteList.push(rowData)
		}
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				oldRow = rec.oldRow,
				rowData = rec.rowData;
			if (inArray(rowData, deleteList) != -1) {
				continue
			}
			if (inArray(rowData, updateList) == -1) {
				updateList.push(rowData);
				oldList.push(oldRow)
			}
		}
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i],
				rowData = rec.rowData;
			addList.push(rowData)
		}
		return {
			updateList: updateList,
			addList: addList,
			deleteList: deleteList,
			oldList: oldList
		}
	};
	_pUCData.getChangesRaw = function() {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			mydata = {
				updateList: [],
				addList: [],
				deleteList: []
			};
		mydata.updateList = udata;
		mydata.addList = adata;
		mydata.deleteList = ddata;
		return mydata
	};
	_pUCData.commitAdd = function(rows, recIndx) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			adata = this.adata,
			inArray = $.inArray,
			adataLen = adata.length,
			getVal = that.getValueFromDataType,
			rowList = [],
			rowLen = rows.length,
			foundRowData = [];
		for (var j = 0; j < rowLen; j++) {
			var row = rows[j];
			for (var i = 0; i < adataLen; i++) {
				var rowData = adata[i].rowData,
					_found = true;
				if (inArray(rowData, foundRowData) == -1) {
					for (var k = 0; k < CMLength; k++) {
						var column = CM[k],
							hidden = column.hidden,
							dataType = column.dataType,
							dataIndx = column.dataIndx;
						if (hidden || dataIndx == recIndx) {
							continue
						}
						var cellData = rowData[dataIndx],
							cellData = getVal(cellData, dataType),
							cell = row[dataIndx],
							cell = getVal(cell, dataType);
						if (cellData !== cell) {
							_found = false;
							break
						}
					}
					if (_found) {
						var newRow = {},
							oldRow = {};
						newRow[recIndx] = row[recIndx];
						oldRow[recIndx] = rowData[recIndx];
						rowList.push({
							type: "update",
							rowData: rowData,
							oldRow: oldRow,
							newRow: newRow
						});
						foundRowData.push(rowData);
						break
					}
				}
			}
		}
		var remain_adata = [];
		for (var i = 0; i < adataLen; i++) {
			var rowData = adata[i].rowData;
			if (inArray(rowData, foundRowData) == -1) {
				remain_adata.push(adata[i])
			}
		}
		this.adata = remain_adata;
		return rowList
	};
	_pUCData.commitUpdate = function(rows, recIndx) {
		var that = this.that,
			dirtyClass = this.options.trackModel.dirtyClass,
			CM = that.colModel,
			CMLength = CM.length,
			udata = this.udata,
			udataLen = udata.length,
			rowLen = rows.length,
			rowList = [],
			foundRowData = [];
		for (var i = 0; i < udataLen; i++) {
			var rec = udata[i],
				rowData = rec.rowData,
				oldRow = rec.oldRow;
			if ($.inArray(rowData, foundRowData) != -1) {
				continue
			}
			for (var j = 0; j < rowLen; j++) {
				var row = rows[j];
				if (rowData[recIndx] == row[recIndx]) {
					foundRowData.push(rowData);
					for (var dataIndx in oldRow) {
						that.removeClass({
							rowData: rowData,
							dataIndx: dataIndx,
							cls: dirtyClass
						})
					}
				}
			}
		}
		var newudata = [];
		for (var i = 0; i < udataLen; i++) {
			var rowData = udata[i].rowData;
			if ($.inArray(rowData, foundRowData) == -1) {
				newudata.push(udata[i])
			}
		}
		this.udata = newudata;
		return rowList
	};
	_pUCData.commitDelete = function(rows, recIndx) {
		var ddata = this.ddata,
			i = ddata.length,
			udata = this.udata,
			rowData, recId, j, k;
		while (i--) {
			rowData = ddata[i].rowData;
			recId = rowData[recIndx];
			j = rows.length;
			if (!j) {
				break
			}
			while (j--) {
				if (recId == rows[j][recIndx]) {
					rows.splice(j, 1);
					ddata.splice(i, 1);
					k = udata.length;
					while (k--) {
						if (udata[k].rowData == rowData) {
							udata.splice(k, 1)
						}
					}
					break
				}
			}
		}
	};
	_pUCData.commitUpdateAll = function() {
		var that = this.that,
			dirtyClass = this.options.trackModel.dirtyClass,
			udata = this.udata;
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				row = rec.oldRow,
				rowData = rec.rowData;
			for (var dataIndx in row) {
				that.removeClass({
					rowData: rowData,
					dataIndx: dataIndx,
					cls: dirtyClass
				})
			}
		}
		this.udata = []
	};
	_pUCData.commitAddAll = function() {
		this.adata = []
	};
	_pUCData.commitDeleteAll = function() {
		var ddata = this.ddata,
			udata = this.udata,
			j = udata.length,
			rowData, ddataLen = ddata.length;
		for (var i = 0; j > 0 && i < ddataLen; i++) {
			rowData = ddata[i].rowData;
			while (j--) {
				if (udata[j].rowData == rowData) {
					udata.splice(j, 1)
				}
			}
			j = udata.length
		}
		ddata.length = 0
	};
	_pUCData.commit = function(objP) {
		var that = this.that,
			history = objP ? objP.history : null,
			history = history == null ? false : history,
			DM = that.options.dataModel,
			rowList = [],
			rowListAdd = [],
			rowListUpdate = [],
			recIndx = DM.recIndx;
		if (objP == null) {
			this.commitAddAll();
			this.commitUpdateAll();
			this.commitDeleteAll()
		} else {
			var objType = objP.type,
				rows = objP.rows;
			if (objType == "add") {
				if (rows) {
					rowListAdd = this.commitAdd(rows, recIndx)
				} else {
					this.commitAddAll()
				}
			} else {
				if (objType == "update") {
					if (rows) {
						rowListUpdate = this.commitUpdate(rows, recIndx)
					} else {
						this.commitUpdateAll()
					}
				} else {
					if (objType == "delete") {
						if (rows) {
							this.commitDelete(rows, recIndx)
						} else {
							this.commitDeleteAll()
						}
					}
				}
			}
		}
		rowList = rowListAdd.concat(rowListUpdate);
		if (rowList.length) {
			that._digestData({
				source: "commit",
				checkEditable: false,
				track: false,
				history: history,
				rowList: rowList
			});
			that.refreshView()
		}
	};
	_pUCData.rollbackAdd = function(PM, data) {
		var adata = this.adata,
			rowList = [],
			paging = PM.type;
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i],
				rowData = rec.rowData;
			rowList.push({
				type: "delete",
				rowData: rowData
			})
		}
		this.adata = [];
		return rowList
	};
	_pUCData.rollbackDelete = function(PM, data) {
		var ddata = this.ddata,
			rowList = [],
			paging = PM.type;
		for (var i = ddata.length - 1; i >= 0; i--) {
			var rec = ddata[i],
				indx = rec.indx,
				rowIndx = rec.rowIndx,
				rowData = rec.rowData;
			rowList.push({
				type: "add",
				rowIndx: rowIndx,
				newRow: rowData
			})
		}
		this.ddata = [];
		return rowList
	};
	_pUCData.rollbackUpdate = function(PM, data) {
		var that = this.that,
			dirtyClass = this.options.trackModel.dirtyClass,
			udata = this.udata,
			rowList = [];
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				recId = rec.recId,
				rowData = rec.rowData,
				oldRow = {},
				newRow = rec.oldRow;
			if (recId == null) {
				continue
			}
			var dataIndxs = [];
			for (var dataIndx in newRow) {
				oldRow[dataIndx] = rowData[dataIndx];
				dataIndxs.push(dataIndx)
			}
			that.removeClass({
				rowData: rowData,
				dataIndx: dataIndxs,
				cls: dirtyClass,
				refresh: false
			});
			rowList.push({
				type: "update",
				rowData: rowData,
				newRow: newRow,
				oldRow: oldRow
			})
		}
		this.udata = [];
		return rowList
	};
	_pUCData.rollback = function(objP) {
		var that = this.that,
			DM = that.options.dataModel,
			PM = that.options.pageModel,
			refreshView = objP && objP.refresh != null ? objP.refresh : true,
			objType = objP && objP.type != null ? objP.type : null,
			rowList = [],
			rowListAdd = [],
			rowListUpdate = [],
			rowListDelete = [],
			data = DM.data;
		if (objType == null || objType == "update") {
			rowListUpdate = this.rollbackUpdate(PM, data)
		}
		if (objType == null || objType == "delete") {
			rowListAdd = this.rollbackDelete(PM, data)
		}
		if (objType == null || objType == "add") {
			rowListDelete = this.rollbackAdd(PM, data)
		}
		rowList = rowListAdd.concat(rowListDelete, rowListUpdate);
		that._digestData({
			history: false,
			allowInvalid: true,
			checkEditable: false,
			source: "rollback",
			track: false,
			rowList: rowList
		});
		if (refreshView) {
			that.refreshView()
		}
	};
	var fnGrid = _pq.pqGrid.prototype;
	fnGrid.getChanges = function(obj) {
		this.blurEditor({
			force: true
		});
		if (obj) {
			var format = obj.format;
			if (format) {
				if (format == "byVal") {
					return this.iUCData.getChangesValue(obj)
				} else {
					if (format == "raw") {
						return this.iUCData.getChangesRaw()
					}
				}
			}
		}
		return this.iUCData.getChanges()
	};
	fnGrid.rollback = function(obj) {
		this.blurEditor({
			force: true
		});
		this.iUCData.rollback(obj)
	};
	fnGrid.isDirty = function(ui) {
		return this.iUCData.isDirty(ui)
	};
	fnGrid.commit = function(obj) {
		this.iUCData.commit(obj)
	};
	fnGrid.updateRow = function(ui) {
		var that = this,
			rowList = ui.rowList || [{
				rowIndx: ui.rowIndx,
				newRow: ui.newRow || ui.row,
				rowData: ui.rowData,
				rowIndxPage: ui.rowIndxPage
			}],
			rowListNew = [];
		for (var i = 0, len = rowList.length; i < len; i++) {
			var rlObj = that.normalize(rowList[i]),
				newRow = rlObj.newRow,
				rowData = rlObj.rowData,
				oldRow = {};
			if (!rowData) {
				continue
			}
			for (var dataIndx in newRow) {
				oldRow[dataIndx] = rowData[dataIndx]
			}
			rlObj.oldRow = oldRow;
			rlObj.type = "update";
			rowListNew.push(rlObj)
		}
		if (!rowListNew.length) {
			return false
		}
		var ret = this._digestData({
			source: ui.source || "update",
			history: ui.history,
			checkEditable: ui.checkEditable,
			track: ui.track,
			allowInvalid: ui.allowInvalid,
			rowList: rowListNew
		});
		if (ret === false) {
			return false
		}
		if (ui.refresh !== false) {
			if (rowListNew.length > 1) {
				that.refresh()
			} else {
				that.refreshRow({
					rowIndx: rowListNew[0].rowIndx
				})
			}
		}
	};
	fnGrid.getRecId = function(obj) {
		var that = this,
			DM = that.options.dataModel;
		obj.dataIndx = DM.recIndx;
		var recId = that.getCellData(obj);
		if (recId == null) {
			return null
		} else {
			return recId
		}
	};
	fnGrid.getCellData = function(obj) {
		var rowData = obj.rowData || this.getRowData(obj),
			dataIndx = obj.dataIndx;
		if (rowData) {
			return rowData[dataIndx]
		} else {
			return null
		}
	};
	fnGrid.getRowData = function(obj) {
		if (!obj) {
			return null
		}
		var objRowData = obj.rowData,
			recId;
		if (objRowData != null) {
			return objRowData
		}
		recId = obj.recId;
		if (recId == null) {
			var rowIndx = obj.rowIndx,
				rowIndx = rowIndx != null ? rowIndx : obj.rowIndxPage + this.rowIndxOffset,
				data = this.get_p_data(),
				rowData = data[rowIndx];
			return rowData
		} else {
			var options = this.options,
				DM = options.dataModel,
				recIndx = DM.recIndx,
				DMdata = DM.data;
			for (var i = 0, len = DMdata.length; i < len; i++) {
				var rowData = DMdata[i];
				if (rowData[recIndx] == recId) {
					return rowData
				}
			}
		}
		return null
	};
	fnGrid.deleteRow = function(ui) {
		var that = this,
			rowList = ui.rowList || [{
				rowIndx: ui.rowIndx,
				rowIndxPage: ui.rowIndxPage
			}],
			rowListNew = [];
		for (var i = 0, len = rowList.length; i < len; i++) {
			var rlObj = that.normalize(rowList[i]),
				rowData = rlObj.rowData;
			rlObj.oldRow = rowData;
			rlObj.type = "delete";
			rowListNew.push(rlObj)
		}
		if (!rowListNew.length) {
			return false
		}
		this._digestData({
			source: ui.source || "delete",
			history: ui.history,
			track: ui.track,
			rowList: rowListNew
		});
		if (ui.refresh !== false) {
			that.refreshView()
		}
	};
	fnGrid.addRow = function(ui) {
		var that = this,
			rowList = ui.rowList || [{
				rowIndx: ui.rowIndx,
				rowIndxPage: ui.rowIndxPage,
				newRow: ui.newRow || ui.rowData
			}],
			rowListNew = [],
			o = that.options,
			DM = o.dataModel,
			data = DM.data;
		if (data == null) {
			DM.data = [];
			data = DM.data
		}
		for (var i = 0, len = rowList.length; i < len; i++) {
			var rlObj = that.normalize(rowList[i]);
			rlObj.type = "add";
			rowListNew.push(rlObj)
		}
		if (!rowListNew.length) {
			return false
		}
		var ret = this._digestData({
			source: ui.source || "add",
			history: ui.history,
			track: ui.track,
			checkEditable: ui.checkEditable,
			rowList: rowListNew
		});
		if (ret === false) {
			return false
		}
		if (ui.refresh !== false) {
			this.refreshView()
		}
		var rowIndx = rowListNew[0].rowIndx;
		if (rowIndx == null) {
			return data.length - 1
		} else {
			return rowIndx
		}
	}
})(jQuery);
(function($) {
	var cSelection = function(that) {
		this.focusSelection = null
	};
	var _pSelection = cSelection.prototype;
	_pSelection.inViewRow = function(rowIndxPage) {
		var that = this.that,
			options = that.options,
			freezeRows = options.freezeRows,
			finalV = that.finalV;
		if (rowIndxPage < freezeRows) {
			return true
		}
		return rowIndxPage >= that.initV && rowIndxPage <= finalV
	};
	var cRows = function(that) {
		this.that = that;
		var o = that.options;
		this.options = o;
		this.selection = [];
		this.hclass = " pq-state-select " + (o.bootstrap.on ? "" : "ui-state-highlight")
	};
	$.paramquery.cRows = cRows;
	var cCells = function(that) {
		var o = that.options;
		this.that = that;
		this.selection = [];
		this.hclass = "pq-state-select " + (o.bootstrap.on ? "" : "ui-state-highlight")
	};
	$.paramquery.cCells = cCells;
	var _pC = cCells.prototype = new cSelection;
	var _pR = cRows.prototype = new cSelection;
	_pR.isSelected = function(objP) {
		var rowData = objP.rowData || this.that.getRowData(objP);
		return rowData ? rowData.pq_rowselect === true : null
	};
	_pR.selectRange = function(objP) {
		var that = this.that,
			range = objP.range,
			initRowIndx = range.r1,
			finalRowIndx = range.r2,
			evt = objP.evt;
		var arr = [];
		if (initRowIndx > finalRowIndx) {
			var temp = initRowIndx;
			initRowIndx = finalRowIndx;
			finalRowIndx = temp
		}
		for (var row = initRowIndx; row <= finalRowIndx; row++) {
			arr.push({
				rowIndx: row
			})
		}
		this.add({
			rows: arr,
			evt: evt
		})
	};
	_pC.removeAll = function(ui) {
		ui = ui || {};
		var that = this.that,
			data = that.get_p_data(),
			hclass = this.hclass;
		if (!data || !data.length) {
			return
		}
		if (that.$tbl) {
			that.$tbl.children().children().children().removeClass(hclass)
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rd = data[i];
			if (rd) {
				delete rd.pq_cellselect
			}
		}
	};
	_pR.removeAll = function(ui) {
		ui = ui || {};
		var that = this.that,
			all = ui.all,
			hclass = this.hclass,
			data = that.get_p_data();
		if (!data || !data.length) {
			return
		}
		if (ui.refresh) {
			if (that.$tbl) {
				that.$tbl.children().children().removeClass(hclass)
			}
		}
		data = all ? data : that.pdata;
		for (var i = 0, len = data.length; i < len; i++) {
			var rd = data[i];
			if (rd) {
				delete rd.pq_rowselect
			}
		}
	};
	_pC.isSelected = function(objP) {
		var that = this.that,
			rowData = objP.rowData || that.getRowData(objP),
			dataIndx = objP.dataIndx,
			colIndx = objP.colIndx;
		if (colIndx == null && dataIndx == null) {
			return null
		}
		if (rowData == null) {
			return null
		}
		dataIndx = dataIndx == null ? that.colModel[colIndx].dataIndx : dataIndx;
		return (rowData.pq_cellselect && rowData.pq_cellselect[dataIndx]) == true
	};
	_pR.getSelection = function() {
		var that = this.that,
			iSel = that.selection(),
			areas = iSel.address(),
			rows = [];
		for (var i = 0, len = areas.length; i < len; i++) {
			var area = areas[i],
				type = area.type;
			if (type == "row") {
				var r1 = area.r1,
					r2 = area.r2;
				for (var j = r1; j <= r2; j++) {
					var rd = that.getRowData({
						rowIndx: j
					});
					rows.push({
						rowIndx: j,
						rowData: rd
					})
				}
			}
		}
		return rows
	};
	_pC.getSelection = function() {
		var that = this.that,
			iSel = that.selection(),
			CM = that.colModel,
			areas = iSel.address(),
			cells = [];
		for (var i = 0, len = areas.length; i < len; i++) {
			var area = areas[i],
				type = area.type;
			if (type == "block" || type == "cell" || type == "column") {
				var r1 = area.r1,
					r2 = area.r2,
					c1 = area.c1,
					c2 = area.c2;
				for (var j = r1; j <= r2; j++) {
					var rd = that.getRowData({
						rowIndx: j
					});
					for (var k = c1; k <= c2; k++) {
						cells.push({
							rowIndx: j,
							rowData: rd,
							colIndx: k,
							dataIndx: CM[k].dataIndx
						})
					}
				}
			}
		}
		return cells
	};
	_pC.inViewCell = function(rowIndxPage, colIndx) {
		var that = this.that,
			options = that.options,
			freezeCols = options.freezeCols;
		if (this.inViewRow(rowIndxPage)) {
			return colIndx < freezeCols || colIndx >= that.initH && colIndx <= that.finalH
		} else {
			return false
		}
	};
	_pC._add = function(_objP) {
		var that = this.that,
			objP = that.normalize(_objP),
			rowIndxPage = objP.rowIndxPage,
			rowData = objP.rowData,
			success, colIndx = objP.colIndx,
			dataIndx = objP.dataIndx,
			isSelected = this.isSelected({
				rowData: rowData,
				dataIndx: dataIndx
			});
		if (isSelected == null) {
			return false
		}
		var inView = that.iMerge.ismergedCell(objP.rowIndx, colIndx) || this.inViewCell(rowIndxPage, colIndx);
		if (isSelected === false) {
			if (inView) {
				var $td = that.getCell({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				});
				if ($td) {
					$td.addClass(this.hclass)
				}
			}
			var cs = rowData.pq_cellselect = rowData.pq_cellselect || {};
			cs[dataIndx] = true;
			success = true
		}
		if (success) {
			return objP
		}
	};
	_pR._add = function(_objP) {
		var that = this.that,
			objP = that.normalize(_objP),
			rowIndxPage = objP.rowIndxPage,
			rowData = objP.rowData,
			isSelected = this.isSelected({
				rowData: rowData
			});
		objP.rowIndxPage = rowIndxPage;
		if (isSelected == null) {
			return false
		}
		var inView = this.inViewRow(rowIndxPage);
		if (isSelected === false) {
			if (!rowData.pq_hidden && inView) {
				var $tr = that.getRow({
					rowIndxPage: rowIndxPage
				});
				if ($tr.length) {
					$tr.addClass(this.hclass)
				}
			}
			rowData.pq_rowselect = true
		}
	};
	_pC.add = function(objP) {
		var that = this.that,
			ret = false;
		ret = this._add(objP)
	};
	_pR.add = function(objP) {
		var that = this.that,
			rows = objP.rows;
		if (rows && typeof rows.push == "function") {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				this._add(row)
			}
		} else {
			this._add(objP)
		}
	};
	_pR._remove = function(_objP) {
		var that = this.that,
			objP = that.normalize(_objP),
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			rowData = objP.rowData,
			$tr = objP.$tr,
			evt = objP.evt,
			isSelected = this.isSelected({
				rowData: rowData
			});
		if (isSelected) {
			if (this.inViewRow(rowIndxPage)) {
				var $tr = that.getRow({
					rowIndxPage: rowIndxPage
				});
				if ($tr) {
					$tr.removeClass(this.hclass);
					$tr.removeAttr("tabindex")
				}
			}
			rowData.pq_rowselect = false;
			return {
				rowIndx: rowIndx,
				rowData: rowData
			}
		}
	};
	_pR.remove = function(objP) {
		var rows = objP.rows,
			ret = false;
		if (rows && typeof rows.push == "function") {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				ret = this._remove(row)
			}
		} else {
			ret = this._remove(objP)
		}
	};
	_pC.selectBlock = function(objP) {
		var that = this.that,
			self = this,
			hclass = self.hclass,
			range = objP.range,
			r1 = range.r1,
			c1 = range.c1,
			r2 = range.r2,
			c2 = range.c2,
			initH = that.initH,
			finalH = that.finalH,
			o = that.options,
			freezeCols = o.freezeCols,
			dataIndxArr = [],
			CM = that.colModel,
			tds = [],
			remove = objP.remove ? true : false;
		for (var col = c1; col <= c2; col++) {
			dataIndxArr[col] = CM[col].dataIndx
		}
		for (var row = r1; row <= r2; row++) {
			var nobj = that.normalize({
					rowIndx: row
				}),
				rowData = nobj.rowData,
				rip = nobj.rowIndxPage;
			if (!rowData) {
				continue
			}
			var cs = rowData.pq_cellselect = rowData.pq_cellselect || {};
			if (self.inViewRow(rip)) {
				for (var col = c1; col <= c2; col++) {
					var dataIndx = dataIndxArr[col];
					if (remove && cs[dataIndx] || !remove && !cs[dataIndx]) {
						if (col < freezeCols || col >= initH && col <= finalH) {
							var $td = that.getCell({
								rowIndxPage: rip,
								colIndx: col
							});
							if ($td.length) {
								tds.push($td[0])
							}
						}
						cs[dataIndx] = remove ? undefined : true
					}
				}
			} else {
				for (var col = c1; col <= c2; col++) {
					var dataIndx = dataIndxArr[col];
					cs[dataIndx] = remove ? undefined : true
				}
			}
		}
		if (tds.length) {
			$(tds)[remove ? "removeClass" : "addClass"](hclass)
		}
	}
})(jQuery);
(function($) {
	var ISIE = true;
	$(function() {
		var $inp = $("<input type='checkbox' style='position:fixed;left:-50px;top:-50px;'/>").appendTo(document.body);
		$inp[0].indeterminate = true;
		$inp.on("change", function() {
			ISIE = false
		});
		$inp.click();
		$inp.remove()
	});
	var cCheckBoxColumn = $.paramquery.cCheckBoxColumn = function(that, column) {
		var self = this;
		this.that = that;
		this.options = that.options;
		this.column = column;
		var defObj = {
			all: false,
			header: false,
			select: false,
			check: true,
			uncheck: false
		};
		column.cb = $.extend({}, defObj, column.cb);
		column._render = function(ui) {
			var rd = ui.rowData;
			if (rd.pq_gtitle || rd.pq_gsummary) {
				return
			}
			var checked = column.cb.check === ui.cellData ? "checked" : "";
			return "<input type='checkbox' " + checked + " />"
		};
		this.dataIndx = column.dataIndx;
		var element = that.element,
			EN = that.eventNamespace;
		that.on("dataAvailable", function() {
			that.one("dataReady", function() {
				return self._onDataReady()
			})
		}).on("dataReady", function() {
			self.setValCBox()
		});
		element.on("change" + EN, function(evt) {
			var target = evt.target;
			if (target.type == "checkbox" && $(target).closest(".pq-grid")[0] == this) {
				return self.onCheckBoxChange(evt)
			}
		});
		that.on("cellKeyDown", function(evt, ui) {
			return self.onCellKeyDown(evt, ui)
		});
		that.on("refreshHeader", function(evt, ui) {
			return self.refreshHeader(evt, ui)
		})
	};
	var _pCheckBC = cCheckBoxColumn.prototype = new $.paramquery.cClass;
	_pCheckBC.hasHeaderChkBox = function() {
		return this.column.cb.header
	};
	_pCheckBC.setValCBox = function() {
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			options = this.options,
			dataIndx = this.dataIndx,
			cb = this.column.cb,
			cbAll = cb.all,
			remotePage = options.pageModel.type == "remote",
			offset = that.rowIndxOffset,
			offset = remotePage || !cbAll ? offset : 0,
			data = cbAll ? options.dataModel.data : that.pdata,
			val = null,
			selFound = 0,
			unSelFound = 0;
		if (!data) {
			return
		}
		var rows = 0;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i],
				rowIndx = i + offset;
			if (that.isEditableRow({
					rowIndx: rowIndx
				}) && that.isEditableCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				})) {
				rows++;
				if (rowData[dataIndx] === cb.check) {
					selFound++
				} else {
					unSelFound++
				}
			}
		}
		if (selFound == rows && rows) {
			val = true
		} else {
			if (unSelFound == rows) {
				val = false
			}
		}
		if (this.$inp) {
			this.$inp.pqval({
				val: val
			})
		}
	};
	_pCheckBC.onHeaderChange = function(evt) {
		var $inp = $(evt.target),
			that = this.that,
			column = this.column,
			dataIndx = column.dataIndx,
			options = that.options,
			cb = column.cb,
			cbAll = cb.all,
			data = cbAll ? options.dataModel.data : that.pdata,
			remotePage = options.pageModel.type == "remote",
			offset = that.rowIndxOffset,
			offset = remotePage || !cbAll ? offset : 0,
			rowList = [],
			ui = {
				column: column,
				dataIndx: dataIndx,
				source: "header"
			},
			inpChk = $inp[0].checked;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowIndx = i + offset,
				rowData = data[i],
				newRow = {},
				oldRow = {};
			newRow[dataIndx] = inpChk ? cb.check : cb.uncheck;
			oldRow[dataIndx] = rowData[dataIndx];
			rowList.push({
				rowIndx: rowIndx,
				rowData: rowData,
				newRow: newRow,
				oldRow: oldRow,
				type: "update"
			})
		}
		var dui = {
			rowList: rowList,
			source: "checkbox"
		};
		dui.history = dui.track = cb.select ? false : null;
		ui.check = inpChk;
		ui.rows = rowList;
		if (that._trigger("beforeCheck", evt, ui) === false) {
			that.refreshHeader();
			return false
		}
		if (that._digestData(dui) === false) {
			that.refreshHeader();
			return false
		}
		that.refresh({
			header: false
		});
		rowList = ui.rows = dui.rowList;
		that._trigger("check", evt, ui);
		if (cb.select) {
			that.selection({
				type: "row",
				method: inpChk ? "add" : "remove",
				rows: rowList
			})
		}
	};
	_pCheckBC.refreshHeader = function(evt, ui) {
		var self = this;
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			data = that.pdata;
		if (!data) {
			return
		}
		var $td = that.getCellHeader({
			dataIndx: this.dataIndx
		});
		if (!$td) {
			return
		}
		var $inp = this.$inp = $td.find("input");
		this.setValCBox();
		if (ISIE) {
			$inp.on("click", function(evt) {
				if ($inp.data("pq_value") == null) {
					$inp[0].checked = true;
					$inp.data("pq_value", true);
					self.onHeaderChange(evt)
				}
			})
		}
		$inp.on("change", function(evt) {
			self.onHeaderChange(evt)
		})
	};
	_pCheckBC._onDataReady = function() {
		var that = this.that,
			o = this.options,
			data = o.dataModel.data,
			remote = o.pageModel.type == "remote",
			ro = remote ? that.rowIndxOffset : 0,
			column = this.column,
			cb = column.cb,
			dataIndx = column.dataIndx;
		if (dataIndx != null && data) {
			var rows = [];
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				if (rowData[dataIndx] === cb.check) {
					rows.push({
						rowIndx: i + ro,
						rowData: rowData
					})
				}
			}
			if (that._trigger("check", null, {
					rows: rows,
					column: column,
					dataIndx: dataIndx,
					source: "dataAvailable"
				}) !== false && cb.select) {
				for (var i = 0; i < len; i++) {
					var rowData = data[i];
					if (rowData[dataIndx] === cb.check) {
						rowData.pq_rowselect = true
					}
				}
				that.selection().refresh()
			}
		}
		this.setValCBox()
	};
	_pCheckBC.rowSelect = function(evt, ui) {
		var that = this.that,
			rows = ui.rows,
			rowData = ui.rowData,
			dataIndx = this.dataIndx;
		if (rows) {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i],
					rowIndx = row.rowIndx,
					rowData = row.rowData;
				rowData[dataIndx] = true;
				that.refreshCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				})
			}
		} else {
			if (rowData) {
				rowData[dataIndx] = true;
				rowIndx = ui.rowIndx, that.refreshCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				})
			}
		}
		this.setValCBox()
	};
	_pCheckBC.rowUnSelect = function(evt, ui) {
		var that = this.that,
			rows = ui.rows,
			rowData = ui.rowData,
			dataIndx = this.dataIndx;
		if (rows) {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i],
					rowIndx = row.rowIndx,
					rowData = row.rowData;
				rowData[dataIndx] = false;
				that.refreshCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				})
			}
		} else {
			if (rowData) {
				rowData[dataIndx] = false;
				rowIndx = ui.rowIndx, that.refreshCell({
					rowIndx: rowIndx,
					dataIndx: dataIndx
				})
			}
		}
		this.setValCBox()
	};
	_pCheckBC.onCheckBoxChange = function(evt) {
		var that = this.that,
			cb = this.column.cb,
			$inp = $(evt.target),
			$td = $inp.closest(".pq-grid-cell");
		if (!$td.length) {
			return
		}
		var ui = that.getCellIndices({
				$td: $td
			}),
			ui = that.normalize(ui),
			rowData = ui.rowData,
			rowIndx = ui.rowIndx,
			dataIndx = ui.dataIndx;
		if (dataIndx != this.dataIndx) {
			return
		}
		var inpChk = $inp[0].checked;
		var newRow = {},
			oldRow = {};
		newRow[dataIndx] = inpChk ? cb.check : cb.uncheck;
		oldRow[dataIndx] = rowData[dataIndx];
		var rowList = [{
			rowData: rowData,
			rowIndx: rowIndx,
			oldRow: oldRow,
			newRow: newRow,
			type: "update"
		}];
		ui.check = inpChk;
		ui.rows = rowList;
		if (that._trigger("beforeCheck", evt, ui) === false) {
			that.refreshCell({
				rowIndx: rowIndx,
				dataIndx: dataIndx
			});
			return false
		}
		var dui = {
			source: "checkbox",
			rowList: rowList
		};
		dui.history = dui.track = cb.select ? false : null;
		if (that._digestData(dui) === false) {
			that.refreshCell({
				rowIndx: rowIndx,
				dataIndx: dataIndx
			});
			return false
		}
		that.refreshRow({
			rowIndx: rowIndx
		});
		rowList = ui.rows = dui.rowList;
		that._trigger("check", evt, ui);
		if (cb.select) {
			that.selection({
				type: "row",
				method: inpChk ? "add" : "remove",
				rows: rowList
			})
		}
		this.setValCBox()
	};
	_pCheckBC.onCellKeyDown = function(evt, ui) {
		if (ui.dataIndx == this.dataIndx) {
			if (evt.keyCode == 13 || evt.keyCode == 32) {
				var $inp = $(evt.originalEvent.target).find("input");
				$inp.click();
				return false
			}
		}
	}
})(jQuery);
(function() {
	var lastTime = 0,
		prefix = ["moz", "webkit"];
	for (var i = 0; !window.requestAnimationFrame && i < prefix.length; i++) {
		window.requestAnimationFrame = window[prefix[i] + "RequestAnimationFrame"];
		window.cancelAnimationFrame = window[prefix[i] + "CancelAnimationFrame"] || window[prefix[i] + "CancelRequestAnimationFrame"]
	}
	if (!window.requestAnimationFrame) {
		window.requestAnimationFrame = function(callback) {
			var curTime = (new Date).getTime(),
				interval = Math.max(0, 16 - (curTime - lastTime)),
				id = window.setTimeout(function() {
					lastTime = (new Date).getTime();
					callback()
				}, interval);
			return id
		}
	}
	if (!window.cancelAnimationFrame) {
		window.cancelAnimationFrame = function(id) {
			clearTimeout(id)
		}
	}
})();
(function($) {
	function cMouseSelection(that) {
		this.that = that;
		var self = this;
		this.scrollTop = 0;
		this.scrollLeft = 0;
		this.borderRight = 0;
		this.borderRightExtra = 0;
		this.borderTop = 0;
		this.borderTopExtra = 0;
		this.borderLeft = 0;
		this.borderLeftExtra = 0;
		this.borderBottom = 0;
		this.borderBottomExtra = 0;
		this.maxBorder = 5e3;
		this.rowht = that.options.rowHeight;
		this.colwd = 60;
		that.on("contMouseDown", function(evt, ui) {
			return self._onContMouseDown(evt, ui)
		}).on("mouseDrag", function(evt, ui) {
			return self._onMouseDrag(evt, ui)
		}).on("mouseStop", function(evt, ui) {
			return self._onMouseStop(evt, ui)
		}).on("mousePQUp", function(evt, ui) {
			return self._onMousePQUp(evt, ui)
		}).on("rowMouseDown", function(evt, ui) {
			return self._onRowMouseDown(evt, ui)
		}).on("cellMouseDown", function(evt, ui) {
			return self._onCellMouseDown(evt, ui)
		}).on("refresh", function(evt, ui) {
			setTimeout(function() {
				if (that.element) {
					that.focus()
				}
			}, 0)
		}).on("cellMouseEnter", function(evt, ui) {
			return self._onCellMouseEnter(evt, ui)
		}).on("rowMouseEnter", function(evt, ui) {
			return self._onRowMouseEnter(evt, ui)
		})
	}
	$.paramquery.cMouseSelection = cMouseSelection;
	var _pMouseSelection = cMouseSelection.prototype = new $.paramquery.cClass;
	_pMouseSelection.inViewPort = function($tdr) {
		var that = this.that,
			iR = that.iRefresh,
			htCont = iR.getEContHt(),
			wdCont = iR.getEContWd() + 1,
			tdr = $tdr[0],
			iMS = this,
			marginTop = iMS.marginTop,
			scrollLeft = iMS.scrollLeft;
		if (htCont >= tdr.offsetTop + tdr.offsetHeight + marginTop) {
			if (tdr.nodeName.toUpperCase() == "TD") {
				if (wdCont >= tdr.offsetLeft + tdr.offsetWidth + scrollLeft) {
					return true
				}
			} else {
				return true
			}
		}
	};
	_pMouseSelection._onCellMouseDown = function(evt, ui) {
		var that = this.that,
			rowIndx = ui.rowIndx,
			rip = ui.rowIndxPage,
			iSel = that.iSelection,
			colIndx = ui.colIndx,
			SM = that.options.selectionModel,
			type = SM.type,
			mode = SM.mode;
		if (type != "cell") {
			that.focus(ui);
			return
		}
		if (colIndx == null) {
			return
		}
		var last = iSel.address()[0];
		if (evt.shiftKey && mode != "single" && last) {
			var r1 = last.firstR,
				c1 = last.firstC;
			that.range({
				r1: r1,
				c1: c1,
				r2: rowIndx,
				c2: colIndx,
				firstR: r1,
				firstC: c1
			}).select()
		} else {
			this.mousedown = {
				r1: rowIndx,
				c1: colIndx
			};
			that.range({
				r1: rowIndx,
				c1: colIndx,
				firstR: rowIndx,
				firstC: colIndx
			}).select()
		}
		that.focus(ui);
		return true
	};
	_pMouseSelection._onCellMouseEnter = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type,
			mode = SM.mode;
		if (this.mousedown) {
			if (mode != "single") {
				if (type == "cell") {
					var mousedown = this.mousedown,
						r1 = mousedown.r1,
						c1 = mousedown.c1,
						r2 = ui.rowIndx,
						c2 = ui.colIndx;
					if (r1 == r2 && c1 == c2) {
						return
					} else {
						if (mousedown.r2 == r2 && mousedown.c2 == c2) {
							return
						} else {
							this.mousedown.r2 = r2;
							this.mousedown.c2 = c2
						}
					}
					that.scrollCell({
						rowIndx: r2,
						colIndx: c2
					});
					that.range({
						r1: r1,
						c1: c1,
						r2: r2,
						c2: c2,
						firstR: r1,
						firstC: c1
					}).select()
				}
				that.focus(ui)
			}
		}
	};
	_pMouseSelection._onRowMouseEnter = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type,
			mode = SM.mode;
		if (type == "row" && this.mousedown && mode != "single") {
			var m = this.mousedown;
			var r1 = m.r1,
				r2 = ui.rowIndx;
			if (r1 == r2) {
				that.range({
					r1: r1,
					firstR: r1
				}, false).select();
				return
			} else {
				if (this.mousedown.r2 == r2) {
					return
				} else {
					this.mousedown.r2 = r2
				}
			}
			that.scrollRow({
				rowIndx: r2
			});
			that.range({
				r1: r1,
				r2: r2,
				firstR: r1
			}, false).select()
		}
	};
	_pMouseSelection._onRowMouseDown = function(evt, ui) {
		var that = this.that,
			rowIndx = ui.rowIndx,
			iSel = that.iSelection,
			isSelected, SM = that.options.selectionModel,
			clickOnNumberCell = $(evt.originalEvent.target).hasClass("pq-grid-number-cell"),
			mode = SM.mode,
			type = SM.type;
		if (type != "row" && !(SM.row && clickOnNumberCell)) {
			return
		}
		if (rowIndx == null) {
			return
		}
		var oldaddress = that.iSelection.address();
		if (evt.shiftKey && mode != "single") {
			var alen = oldaddress.length;
			if (alen && oldaddress[alen - 1].type == "row") {
				var last = oldaddress[alen - 1];
				last.r1 = last.firstR;
				last.r2 = rowIndx;
				last.c1 = last.c2 = last.type = undefined
			}
			that.range(oldaddress).select()
		} else {
			if ((evt.ctrlKey || evt.metaKey) && mode != "single") {
				isSelected = that.iRows.isSelected({
					rowIndx: rowIndx
				});
				iSel[isSelected ? "removeRow" : "add"]({
					r1: rowIndx,
					firstR: rowIndx
				})
			} else {
				this.mousedown = {
					r1: rowIndx,
					y1: evt.pageY,
					x1: evt.pageX
				};
				that.range({
					r1: rowIndx,
					firstR: rowIndx
				}, false).select()
			}
		}
		if (clickOnNumberCell) {
			setTimeout(function() {
				that.focus({
					rowIndxPage: ui.rowIndxPage,
					colIndx: that.getFirstVisibleCI(true)
				})
			}, 0)
		}
		return true
	};
	_pMouseSelection._onContMouseDown = function(evt, ui) {
		var that = this.that,
			SW = that.options.swipeModel,
			swipe = SW.on;
		if (swipe) {
			this._stopSwipe(true);
			this.swipedown = {
				x: evt.pageX,
				y: evt.pageY
			}
		}
		return true
	};
	_pMouseSelection._onMousePQUp = function(evt, ui) {
		var that = this.that;
		this.mousedown = null
	};
	_pMouseSelection._stopSwipe = function(full) {
		var self = this;
		if (full) {
			self.swipedown = null;
			self.swipedownPrev = null
		}
		window.clearInterval(self.intID);
		window.cancelAnimationFrame(self.intID);
		self.intID = null
	};
	_pMouseSelection._onMouseStop = function(evt, ui) {
		var self = this,
			that = this.that;
		if (this.swipedownPrev) {
			var SW = that.options.swipeModel,
				sdP = this.swipedownPrev,
				ts1 = sdP.ts,
				ts2 = (new Date).getTime(),
				tsdiff = ts2 - ts1,
				x1 = sdP.x,
				y1 = sdP.y,
				x2 = evt.pageX,
				y2 = evt.pageY,
				xdiff = x2 - x1,
				ydiff = y2 - y1,
				distance = Math.sqrt(xdiff * xdiff + ydiff * ydiff),
				ratio = distance / tsdiff;
			if (ratio > SW.ratio) {
				var count = 0,
					count2 = SW.repeat;
				self._stopSwipe();
				var animate = function() {
					count += SW.speed;
					count2--;
					var pageX = x2 + count * xdiff / tsdiff,
						pageY = y2 + count * ydiff / tsdiff;
					self._onMouseDrag({
						pageX: pageX,
						pageY: pageY
					});
					if (count2 > 0) {
						self.intID = window.requestAnimationFrame(animate)
					} else {
						self._stopSwipe(true)
					}
				};
				animate()
			} else {
				self.swipedown = null;
				self.swipedownPrev = null
			}
		}
	};
	_pMouseSelection._onMouseDrag = function(evt, ui) {
		var that = this.that,
			o = that.options;
		if (this.swipedown) {
			var m = this.swipedown,
				x1 = m.x,
				y1 = m.y,
				x2 = evt.pageX,
				y2 = evt.pageY;
			this.swipedownPrev = {
				x: x1,
				y: y1,
				ts: (new Date).getTime()
			};
			var smooth = o.scrollModel.smooth;
			if (!o.virtualY || smooth) {
				this.scrollVertSmooth(y1, y2);
				this.syncScrollBarVert()
			}
			if (!o.virtualX || smooth) {
				this.scrollHorSmooth(x1, x2);
				this.syncScrollBarHor()
			}
			m.x = x2;
			m.y = y2
		}
		return true
	};
	_pMouseSelection.updateTableY = function(diffY) {
		if (diffY == 0) {
			return false
		}
		var that = this.that,
			$tbl = this.getTableForVertScroll(),
			contHt = that.iRefresh.getEContHt();
		if (!$tbl || !$tbl.length) {
			return false
		}
		var scrollHt = $tbl.data("offsetHeight") - 1,
			scrollTop = this.scrollTop - diffY,
			scrollTop2;
		if (scrollTop < 0) {
			scrollTop2 = 0
		} else {
			if (diffY < 0 && contHt - scrollHt + scrollTop > 0) {
				scrollTop2 = scrollHt - contHt
			} else {
				scrollTop2 = scrollTop
			}
		}
		this.setScrollTop(scrollTop2, $tbl, contHt);
		return true
	};
	_pMouseSelection.setScrollTop = function(scrollTop, $tbl, contHt) {
		if (scrollTop >= 0) {
			scrollTop = Math.round(scrollTop);
			this.scrollTop = scrollTop;
			$tbl.parent("div").scrollTop(scrollTop)
		} else {}
	};
	_pMouseSelection.getScrollLeft = function(eff) {
		return this.scrollLeft
	};
	_pMouseSelection.getScrollTop = function(eff) {
		return this.scrollTop
	};
	_pMouseSelection.setScrollLeft = function(margin, $tbls, $tbl_h, contWd) {
		if (margin >= 0) {
			margin = Math.round(margin);
			this.scrollLeft = margin;
			var $tt = $tbl_h ? $tbl_h.parent() : $();
			$tt = $tt.add($tbls ? $tbls.parent("div") : $());
			$tt.scrollLeft(margin)
		}
	};
	_pMouseSelection.scrollVertSmooth = function(y1, y2) {
		if (y1 == y2) {
			return
		}
		this.updateTableY(y2 - y1)
	};
	_pMouseSelection.scrollHorSmooth = function(x1, x2) {
		if (x1 == x2) {
			return
		}
		var that = this.that,
			o = that.options,
			diffX = x2 - x1,
			$tbl = this.getTableForHorScroll(),
			$tbl_h = this.getTableHeaderForHorScroll(),
			contWd = that.iRefresh.getEContWd();
		if (!$tbl && !$tbl_h) {
			return
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h,
			scrollWd = o.virtualX ? this.getScrollWidth($tbl_r) : $tbl_r.data("scrollWidth"),
			new_scrollLeft, scrollLeft = this.scrollLeft - diffX;
		if (scrollLeft < 0) {
			new_scrollLeft = 0
		} else {
			if (scrollWd - contWd - scrollLeft < 0) {
				new_scrollLeft = scrollWd - contWd
			} else {
				new_scrollLeft = scrollLeft
			}
		}
		this.setScrollLeft(new_scrollLeft, $tbl, $tbl_h, contWd)
	};
	_pMouseSelection.syncViewWithScrollBarVert = function(ratio) {
		if (ratio == null) {
			return
		}
		var that = this.that,
			$tbl = this.getTableForVertScroll();
		if (!$tbl || !$tbl.length) {
			return
		}
		var o = that.options;
		if (o.editModel.indices) {
			that.blurEditor({
				force: true
			})
		}
		var scrollHt = $tbl.data("offsetHeight"),
			contHt = that.iRefresh.getEContHt(),
			excess = scrollHt - contHt,
			scrollTop = excess * ratio;
		if (!scrollTop && scrollTop !== 0) {
			return
		}
		if (scrollTop < 0) {
			scrollTop = 0
		}
		this.setScrollTop(scrollTop, $tbl, contHt)
	};
	_pMouseSelection.syncViewWithScrollBarHor = function(ratio) {
		if (ratio == null) {
			return
		}
		var that = this.that,
			$tbl = this.getTableForHorScroll();
		var $tbl_h = this.getTableHeaderForHorScroll();
		if (!$tbl && !$tbl_h) {
			return
		}
		var o = that.options;
		if (o.editModel.indices) {
			that.blurEditor({
				force: true
			})
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h,
			scrollWd = o.virtualX ? this.getScrollWidth($tbl_r) : $tbl_r.data("scrollWidth"),
			contWd = that.iRefresh.getEContWd(),
			excess = scrollWd - contWd,
			scrollLeft = excess * ratio;
		if (!scrollWd || !contWd) {
			return
		}
		if (scrollLeft < 0) {
			scrollLeft = 0
		}
		this.setScrollLeft(scrollLeft, $tbl, $tbl_h, contWd)
	};
	_pMouseSelection.resetMargins = function() {
		this.scrollLeft = 0;
		this.scrollTop = 0
	};
	_pMouseSelection.syncHeaderViewWithScrollBarHor = function(cur_pos) {
		if (cur_pos == null) {
			return
		}
		var that = this.that,
			$tbl_h = this.getTableHeaderForHorScroll();
		if (!$tbl_h) {
			return
		}
		var o = that.options,
			freezeCols = o.freezeCols;
		if (o.editModel.indices) {
			that.blurEditor({
				force: true
			})
		}
		var $tbl_r = $tbl_h,
			tblWd = $tbl_r.data("scrollWidth"),
			contWd = that.iRefresh.getEContWd(),
			scrollLeft = that.calcWidthCols(freezeCols, cur_pos + freezeCols);
		if (!tblWd || !contWd) {
			return
		}
		if (scrollLeft < 0) {
			scrollLeft = 0
		}
		$tbl_h.css("marginLeft", -scrollLeft)
	};
	_pMouseSelection.syncScrollBarVert = function() {
		var that = this.that,
			$tbl = this.getTableForVertScroll();
		if (!$tbl || !$tbl.length) {
			return
		}
		var tblHt = $tbl.data("offsetHeight"),
			contHt = that.iRefresh.getEContHt(),
			excess = tblHt - contHt,
			scrollTop = this.scrollTop,
			ratio = scrollTop / excess;
		if (ratio >= 0 && ratio <= 1) {
			if (that.vscroll.widget().hasClass("pq-sb-vert")) {
				that.vscroll.option("ratio", ratio)
			}
		}
	};
	_pMouseSelection.syncScrollBarHor = function() {
		var that = this.that,
			o = that.options,
			$tbl = this.getTableForHorScroll(),
			$tbl_h = this.getTableHeaderForHorScroll();
		if (!$tbl && !$tbl_h) {
			return
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h;
		var scrollWd = o.virtualX ? this.getScrollWidth($tbl_r) : $tbl_r.data("scrollWidth"),
			contWd = that.iRefresh.getEContWd(),
			excess = scrollWd - contWd,
			scrollLeft = this.scrollLeft,
			ratio = scrollLeft / excess;
		if (ratio >= 0 && ratio <= 1) {
			if (that.hscroll.widget().hasClass("pq-sb-horiz")) {
				that.hscroll.option("ratio", ratio)
			}
		}
	};
	_pMouseSelection.getTableForVertScroll = function() {
		var that = this.that,
			pqpanes = that.pqpanes,
			$tbl = that.$tbl;
		if (!$tbl || !$tbl.length) {
			return
		}
		if (pqpanes.h && pqpanes.v) {
			$tbl = $([$tbl[2], $tbl[3]])
		} else {
			if (pqpanes.v) {
				$tbl = $([$tbl[0], $tbl[1]])
			} else {
				if (pqpanes.h) {
					$tbl = $($tbl[1])
				}
			}
		}
		return $tbl
	};
	_pMouseSelection.getTableForHorScroll = function() {
		var that = this.that,
			pqpanes = that.pqpanes,
			tbl = [],
			$tbl = that.$tbl;
		if (!$tbl || !$tbl.length) {
			return
		}
		if (pqpanes.h && pqpanes.v) {
			tbl.push($tbl[1], $tbl[3])
		} else {
			if (pqpanes.v) {
				tbl.push($tbl[1])
			} else {
				if (pqpanes.h) {
					tbl.push($tbl[0], $tbl[1])
				} else {
					tbl.push($tbl[0])
				}
			}
		}
		if (that.tables.length) {
			var $tbl2 = that.tables[0].$tbl;
			if (pqpanes.v) {
				tbl.push($tbl2[1])
			} else {
				tbl.push($tbl2[0])
			}
		}
		return $(tbl)
	};
	_pMouseSelection.getTableHeaderForHorScroll = function() {
		var that = this.that,
			pqpanes = that.pqpanes,
			$tbl = that.$tbl_header;
		if (!$tbl || !$tbl.length) {
			return
		}
		if (pqpanes.vH) {
			$tbl = $($tbl[1])
		} else {
			$tbl = $($tbl[0])
		}
		return $tbl.parent()
	};
	_pMouseSelection.scrollRowNonVirtual = function(obj) {
		var that = this.that,
			o = that.options,
			rowIndxPage = obj.rowIndxPage,
			nested = that.iHierarchy ? true : false,
			rowIndx = obj.rowIndx,
			contHt = that.iRefresh.getEContHt(),
			rowIndxPage = rowIndxPage == null ? rowIndx - that.rowIndxOffset : rowIndxPage,
			freezeRows = parseInt(o.freezeRows);
		if (rowIndxPage < freezeRows) {
			return
		}
		var $tbl = that.get$Tbl(rowIndxPage),
			$tr = that.getRow({
				rowIndxPage: rowIndxPage
			}),
			tr = $tr[0];
		if (!tr) {
			return
		}
		var tblTop = $tbl[0].offsetTop + 1,
			trHt = tr.offsetHeight,
			scrollTop = this.getScrollTop(),
			trTop = tr.offsetTop - 1,
			marginTop = -1;
		if (tblTop + trTop - scrollTop < 0) {
			var scrollTop2 = tblTop + trTop + marginTop;
			scrollTop2 = scrollTop2 < 0 ? 0 : scrollTop2;
			this.setScrollTop(scrollTop2, $tbl, contHt);
			this.syncScrollBarVert()
		} else {
			if (trTop + trHt - scrollTop > contHt) {
				var scrollTop2 = trHt + trTop - contHt;
				this.setScrollTop(scrollTop2, $tbl, contHt);
				this.syncScrollBarVert()
			}
		}
	};
	_pMouseSelection.scrollColumnNonVirtual = function(objP) {
		var that = this.that,
			colIndx = objP.colIndx,
			colIndx = colIndx == null ? that.getColIndx({
				dataIndx: objP.dataIndx
			}) : colIndx,
			freezeCols = that.options.freezeCols;
		if (colIndx < freezeCols) {
			return
		}
		var td_right = that._calcRightEdgeCol(colIndx).width,
			td_left = that._calcRightEdgeCol(colIndx - 1).width,
			wdFrozen = that._calcRightEdgeCol(freezeCols - 1).width,
			$tbl = this.getTableForHorScroll(),
			$tbl_h = this.getTableHeaderForHorScroll(),
			contWd = that.iRefresh.getEContWd(),
			scrollLeft = this.scrollLeft;
		if (td_right - scrollLeft > contWd) {
			var scrollLeft2 = td_right - contWd;
			this.setScrollLeft(scrollLeft2, $tbl, $tbl_h, contWd);
			this.syncScrollBarHor()
		} else {
			if (td_left - wdFrozen < scrollLeft) {
				var scrollLeft2 = td_left - wdFrozen;
				this.setScrollLeft(scrollLeft2, $tbl, $tbl_h, contWd);
				this.syncScrollBarHor()
			}
		}
	}
})(jQuery);
(function($) {
	var iExcel = null,
		pasteProgress = false,
		id_clip = "pq-grid-excel",
		gMemory = "",
		_pgrid = $.paramquery.pqGrid.prototype,
		pq_options = _pgrid.options,
		copyModel = {
			on: true,
			header: true,
			zIndex: 1e4
		},
		cutModel = {
			on: true
		},
		pasteModel = {
			on: true,
			compare: "byVal",
			select: true,
			validate: true,
			allowInvalid: true,
			type: "replace"
		};
	pq_options.pasteModel = pq_options.pasteModel || pasteModel;
	pq_options.copyModel = pq_options.copyModel || copyModel;
	pq_options.cutModel = pq_options.cutModel || cutModel;
	_pgrid._setGlobalStr = function(str) {
		gMemory = str
	};
	_pgrid.canPaste = function() {
		return gMemory ? true : false
	};
	_pgrid.copy = function() {
		iExcel = new cExcel(this);
		iExcel.copy();
		iExcel = null
	};
	_pgrid.paste = function(ui) {
		iExcel = new cExcel(this);
		iExcel.paste(ui);
		iExcel = null
	};
	_pgrid.cut = function() {
		iExcel = new cExcel(this);
		iExcel.copy({
			cut: true,
			source: "cut"
		});
		iExcel = null
	};
	_pgrid.clear = function() {
		this.iSelection.clear()
	};
	var cExcel = function(that, $ae) {
		this.that = that
	};
	var _pExcel = cExcel.prototype;
	_pExcel.createClipBoard = function() {
		var $div = $("#pq-grid-excel-div"),
			CPM = this.that.options.copyModel,
			$text = $("#" + id_clip);
		if ($text.length == 0) {
			$div = $("<div id='pq-grid-excel-div'  style='position:fixed;top:20px;left:20px;height:1px;width:1px;overflow:hidden;z-index:" + CPM.zIndex + ";'/>").appendTo(document.body);
			$text = $("<textarea id='" + id_clip + "' autocomplete='off' spellcheck='false' style='overflow:hidden;height:10000px;width:10000px;opacity:0' />").appendTo($div);
			$text.css({
				opacity: 0
			})
		}
		$text.on("focusin", function(evt) {
			evt.stopPropagation()
		});
		$text.select()
	};
	_pExcel.destroyClipBoard = function() {
		this.clearClipBoard();
		var that = this.that;
		var pageTop = $(window).scrollTop(),
			pageLeft = $(window).scrollLeft();
		that.focus();
		var pageTop2 = $(window).scrollTop(),
			pageLeft2 = $(window).scrollLeft();
		if (pageTop != pageTop2 || pageLeft != pageLeft2) {
			window.scrollTo(pageLeft, pageTop)
		}
	};
	_pExcel.clearClipBoard = function() {
		var $text = $("#" + id_clip);
		$text.val("")
	};
	_pExcel.copy = function(ui) {
		return this.that.iSelection.copy(ui)
	};
	_pExcel.paste = function(ui) {
		ui = ui || {};
		var that = this.that,
			dest = ui.dest,
			clip = ui.clip,
			text = clip ? clip.length ? clip.val() : "" : gMemory,
			text = text.replace(/\n$/, ""),
			rows = text.split("\n"),
			rows_length = rows.length,
			cells_length, CM = that.colModel,
			o = that.options,
			readCell = that.readCell,
			PSTM = o.pasteModel,
			SMType = "row",
			refreshView = false,
			CMLength = CM.length;
		if (!PSTM.on) {
			return
		}
		if (text.length == 0 || rows_length == 0) {
			return
		}
		var tui = {
			rows: rows
		};
		if (that._trigger("beforePaste", null, tui) === false) {
			return false
		}
		var PMtype = PSTM.type,
			selRowIndx, selColIndx, selEndRowIndx, selEndColIndx;
		var iSel = dest ? that.range(dest) : that.selection(),
			areas = iSel._areas,
			area = areas.length ? areas[0] : null;
		if (area && that.getRowData({
				rowIndx: area.r1
			})) {
			SMType = area.type == "row" ? "row" : "cell";
			selRowIndx = area.r1;
			selEndRowIndx = area.r2;
			selColIndx = area.c1;
			selEndColIndx = area.c2
		} else {
			SMType = "cell";
			selRowIndx = 0;
			selEndRowIndx = 0;
			selColIndx = 0;
			selEndColIndx = 0
		}
		var selRowIndx2, modeV;
		if (PMtype == "replace") {
			selRowIndx2 = selRowIndx;
			modeV = selEndRowIndx - selRowIndx + 1 < rows_length ? "extend" : "repeat"
		} else {
			if (PMtype == "append") {
				selRowIndx2 = selEndRowIndx + 1;
				modeV = "extend"
			} else {
				if (PMtype == "prepend") {
					selRowIndx2 = selRowIndx;
					modeV = "extend"
				}
			}
		}
		var modeH, lenV = modeV == "extend" ? rows_length : selEndRowIndx - selRowIndx + 1,
			lenH, lenHCopy;
		var ii = 0,
			rowList = ui.rowList || [],
			rowsAffected = 0;
		for (var i = 0; i < lenV; i++) {
			var row = rows[ii],
				rowIndx = i + selRowIndx2,
				rowData = PMtype == "replace" ? that.getRowData({
					rowIndx: rowIndx
				}) : null,
				oldRow = rowData ? {} : null,
				newRow = {};
			if (row === undefined && modeV === "repeat") {
				ii = 0;
				row = rows[ii]
			}
			ii++;
			var cells = row.split("	");
			if (!lenH) {
				if (SMType == "cell") {
					cells_length = cells.length;
					modeH = selEndColIndx - selColIndx + 1 < cells.length ? "extend" : "repeat";
					lenH = modeH == "extend" ? cells_length : selEndColIndx - selColIndx + 1;
					if (isNaN(lenH)) {
						throw "lenH NaN. assert failed."
					}
					if (lenH + selColIndx > CMLength) {
						lenH = CMLength - selColIndx
					}
				} else {
					lenH = CMLength;
					selColIndx = 0
				}
			}
			var jj = 0,
				j = 0,
				skipped = 0,
				lenHCopy = lenH,
				cellsLength = cells.length;
			for (var j = 0; j < lenHCopy; j++) {
				if (jj >= cellsLength) {
					jj = 0
				}
				var colIndx = j + selColIndx,
					column = CM[colIndx],
					cell = cells[jj],
					dataIndx = column.dataIndx;
				if (column.copy === false) {
					skipped++;
					if (modeH == "extend") {
						if (lenHCopy + selColIndx < CMLength) {
							lenHCopy++
						}
					}
					continue
				} else {
					jj++;
					newRow[dataIndx] = cell;
					if (oldRow) {
						oldRow[dataIndx] = readCell(rowData, column)
					}
				}
			}
			if ($.isEmptyObject(newRow) == false) {
				var type = "update";
				if (rowData == null) {
					refreshView = true;
					type = "add"
				}
				rowList.push({
					newRow: newRow,
					rowIndx: rowIndx,
					rowData: rowData,
					oldRow: oldRow,
					type: type
				});
				rowsAffected++
			}
		}
		var dui = {
			rowList: rowList,
			source: "paste",
			allowInvalid: PSTM.allowInvalid,
			validate: PSTM.validate
		};
		that._digestData(dui);
		that[refreshView ? "refreshView" : "refresh"]();
		if (PSTM.select) {
			if (SMType == "cell") {
				that.range({
					r1: selRowIndx2,
					c1: selColIndx,
					r2: selRowIndx2 + rowsAffected - 1,
					c2: modeH == "extend" ? selColIndx + lenH - 1 + skipped : selEndColIndx
				}).select()
			} else {
				that.range({
					r1: selRowIndx2,
					r2: selRowIndx2 + rowsAffected - 1
				}).select()
			}
		}
		that._trigger("paste", null, tui)
	};
	$(document).unbind(".pqExcel").bind("keydown.pqExcel", function(evt) {
		if (evt.ctrlKey || evt.metaKey) {
			var $ae = $(evt.target);
			if (!$ae.hasClass("pq-grid-row") && !$ae.hasClass("pq-grid-cell") && !$ae.is("#" + id_clip) && !$ae.hasClass("pq-grid-cont")) {
				return
			}
			var $grid = $ae.closest(".pq-grid");
			if (iExcel || $ae.length && $grid.length) {
				if (!iExcel) {
					try {
						var that = $grid.pqGrid("getInstance").grid;
						if (that.option("selectionModel.native")) {
							return true
						}
					} catch (ex) {
						return true
					}
					iExcel = new cExcel(that, $ae);
					iExcel.createClipBoard()
				}
				if (evt.keyCode == "67" || evt.keyCode == "99") {
					iExcel.copy({
						clip: $("#" + id_clip)
					})
				} else {
					if (evt.keyCode == "88") {
						iExcel.copy({
							cut: true,
							clip: $("#" + id_clip)
						})
					} else {
						if (evt.keyCode == "86" || evt.keyCode == "118") {
							pasteProgress = true;
							iExcel.clearClipBoard();
							window.setTimeout(function() {
								if (iExcel) {
									iExcel.paste({
										clip: $("#" + id_clip)
									});
									iExcel.destroyClipBoard();
									iExcel = null
								}
								pasteProgress = false
							}, 0)
						} else {
							var $text = $("#" + id_clip);
							if ($text.length) {
								var ae = document.activeElement;
								if (ae == $text[0]) {
									iExcel.that._onKeyPressDown(evt)
								}
							}
						}
					}
				}
			} else {}
		} else {
			var kc = evt.keyCode,
				KC = $.ui.keyCode,
				navKey = kc == KC.UP || kc == KC.DOWN || kc == KC.LEFT || kc == KC.RIGHT || kc == KC.PAGE_UP || kc == KC.PAGE_DOWN;
			if (navKey) {
				if (keyDownInGrid) {
					return false
				}
				var $ae = $(evt.target);
				if ($ae.hasClass("pq-grid-row") || $ae.hasClass("pq-grid-cell")) {
					keyDownInGrid = true
				}
			}
		}
	}).bind("keyup.pqExcel", function(evt) {
		var keyCode = evt.keyCode;
		if (!pasteProgress && iExcel && !(evt.ctrlKey || evt.metaKey) && $.inArray(keyCode, [17, 91, 93, 224]) != -1) {
			iExcel.destroyClipBoard();
			iExcel = null
		}
		if (keyDownInGrid) {
			var $ae = $(evt.target);
			if (!$ae.hasClass("pq-grid-row") && !$ae.hasClass("pq-grid-cell")) {
				keyDownInGrid = false
			}
		}
	});
	var keyDownInGrid = false
})(jQuery);
(function($) {
	var pq_options = $.paramquery.pqGrid.prototype.options;
	var historyModel = {
		on: true,
		checkEditable: true,
		checkEditableAdd: false,
		allowInvalid: true
	};
	pq_options.historyModel = pq_options.historyModel || historyModel;
	var cHistory = $.paramquery.cHistory = function(that) {
		var self = this;
		this.that = that;
		this.options = that.options;
		this.records = [];
		this.counter = 0;
		this.id = 0;
		that.on("keyDown", function(evt, ui) {
			return self._onKeyDown(evt, ui)
		}).on("dataAvailable", function(evt, ui) {
			if (ui.source != "filter") {
				self.reset()
			}
		})
	};
	var _pHistory = cHistory.prototype = new $.paramquery.cClass;
	_pHistory._onKeyDown = function(evt, ui) {
		var keyCodes = {
				z: "90",
				y: "89",
				c: "67",
				v: "86"
			},
			ctrlMeta = evt.ctrlKey || evt.metaKey;
		if (ctrlMeta && evt.keyCode == keyCodes.z) {
			if (this.undo()) {}
			return false
		} else {
			if (ctrlMeta && evt.keyCode == keyCodes.y) {
				if (this.redo()) {}
				return false
			}
		}
	};
	_pHistory.resetUndo = function() {
		if (this.counter == 0) {
			return false
		}
		this.counter = 0;
		var that = this.that;
		that._trigger("history", null, {
			type: "resetUndo",
			num_undo: 0,
			num_redo: this.records.length - this.counter,
			canUndo: false,
			canRedo: true
		})
	};
	_pHistory.reset = function() {
		if (this.counter == 0 && this.records.length == 0) {
			return false
		}
		this.records = [];
		this.counter = 0;
		this.id = 0;
		var that = this.that;
		that._trigger("history", null, {
			num_undo: 0,
			num_redo: 0,
			type: "reset",
			canUndo: false,
			canRedo: false
		})
	};
	_pHistory.increment = function() {
		var records = this.records,
			len = records.length;
		if (len) {
			var id = records[len - 1].id;
			this.id = id + 1
		} else {
			this.id = 0
		}
	};
	_pHistory.push = function(objP) {
		var prevCanRedo = this.canRedo();
		var records = this.records,
			counter = this.counter;
		if (records.length > counter) {
			records.splice(counter, records.length - counter)
		}
		records[counter] = $.extend({
			id: this.id
		}, objP);
		this.counter++;
		var that = this.that,
			canUndo, canRedo;
		if (this.counter == 1) {
			canUndo = true
		}
		if (prevCanRedo && this.counter == records.length) {
			canRedo = false
		}
		that._trigger("history", null, {
			type: "add",
			canUndo: canUndo,
			canRedo: canRedo,
			num_undo: this.counter,
			num_redo: 0
		})
	};
	_pHistory.canUndo = function() {
		if (this.counter > 0) {
			return true
		} else {
			return false
		}
	};
	_pHistory.canRedo = function() {
		if (this.counter < this.records.length) {
			return true
		} else {
			return false
		}
	};
	_pHistory.processCol = function(colList, redo) {
		var that = this.that;
		if (colList.length) {
			var type_add = colList.type == "add",
				type_add = redo ? type_add : !type_add;
			that[type_add ? "addColumn" : "deleteColumn"]({
				colList: colList,
				history: false
			})
		}
	};
	_pHistory.undo = function() {
		var prevCanRedo = this.canRedo();
		var that = this.that,
			refreshView = false,
			HM = this.options.historyModel,
			records = this.records;
		if (this.counter > 0) {
			this.counter--
		} else {
			return false
		}
		var counter = this.counter,
			record = records[counter],
			rowList = record.rowList,
			rowList = rowList ? rowList : [],
			colList = record.colList,
			colList = colList ? colList : [],
			rowListFinal = [],
			id = record.id;
		for (var i = 0, len = rowList.length; i < len; i++) {
			var rowListObj = rowList[i],
				newRow = rowListObj.newRow,
				rowData = rowListObj.rowData,
				type = rowListObj.type,
				oldRow = rowListObj.oldRow,
				rowIndx = rowListObj.rowIndx;
			if (type == "update") {
				rowIndx = that.getRowIndx({
					rowData: rowData
				}).rowIndx;
				rowListFinal.push({
					type: type,
					rowIndx: rowIndx,
					rowData: rowData,
					oldRow: newRow,
					newRow: oldRow
				})
			} else {
				if (type == "add") {
					refreshView = true;
					rowListFinal.push({
						type: "delete",
						rowData: newRow
					})
				} else {
					if (type == "delete") {
						refreshView = true;
						rowListFinal.push({
							type: "add",
							rowIndx: rowIndx,
							newRow: rowData
						})
					}
				}
			}
		}
		if (colList.length) {
			this.processCol(colList)
		} else {
			var ret = that._digestData({
				history: false,
				source: "undo",
				checkEditable: HM.checkEditable,
				checkEditableAdd: HM.checkEditableAdd,
				allowInvalid: HM.allowInvalid,
				rowList: rowListFinal
			});
			that[refreshView ? "refreshView" : "refresh"]({
				source: "undo"
			})
		}
		var canRedo, canUndo;
		if (prevCanRedo === false) {
			canRedo = true
		}
		if (this.counter == 0) {
			canUndo = false
		}
		that._trigger("history", null, {
			canUndo: canUndo,
			canRedo: canRedo,
			type: "undo",
			num_undo: this.counter,
			num_redo: this.records.length - this.counter
		});
		return true
	};
	_pHistory.redo = function() {
		var prevCanUndo = this.canUndo();
		var that = this.that,
			HM = this.options.historyModel,
			counter = this.counter,
			records = this.records;
		if (counter == records.length) {
			return false
		}
		var refreshView = false,
			record = records[counter],
			rowList = record.rowList,
			rowList = rowList ? rowList : [],
			colList = record.colList,
			colList = colList ? colList : [],
			rowListFinal = [],
			id = record.id;
		for (var i = 0, len = rowList.length; i < len; i++) {
			var rowListObj = rowList[i],
				newRow = rowListObj.newRow,
				rowData = rowListObj.rowData,
				type = rowListObj.type,
				oldRow = rowListObj.oldRow,
				rowIndx = rowListObj.rowIndx;
			if (type == "update") {
				rowIndx = that.getRowIndx({
					rowData: rowData
				}).rowIndx;
				rowListFinal.push({
					type: type,
					rowIndx: rowIndx,
					rowData: rowData,
					oldRow: oldRow,
					newRow: newRow
				})
			} else {
				if (type == "add") {
					refreshView = true;
					rowListFinal.push({
						type: "add",
						rowIndx: rowIndx,
						newRow: newRow
					})
				} else {
					if (type == "delete") {
						refreshView = true;
						rowListFinal.push({
							type: "delete",
							rowData: rowData
						})
					}
				}
			}
		}
		if (colList.length) {
			this.processCol(colList, true)
		} else {
			var ret = that._digestData({
				history: false,
				source: "redo",
				checkEditable: HM.checkEditable,
				checkEditableAdd: HM.checkEditableAdd,
				allowInvalid: HM.allowInvalid,
				rowList: rowListFinal
			});
			that[refreshView ? "refreshView" : "refresh"]({
				source: "redo"
			})
		}
		if (this.counter < records.length) {
			this.counter++
		}
		var canUndo, canRedo;
		if (prevCanUndo == false) {
			canUndo = true
		}
		if (this.counter == this.records.length) {
			canRedo = false
		}
		that._trigger("history", null, {
			canUndo: canUndo,
			canRedo: canRedo,
			type: "redo",
			num_undo: this.counter,
			num_redo: this.records.length - this.counter
		});
		return true
	};
	var fnGrid = $.paramquery.pqGrid.prototype;
	fnGrid.history = function(obj) {
		var method = obj.method;
		return this["iHistory"][method](obj)
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery;
	_pq.filter = function() {
		var conditions = {
			begin: {
				text: "Begins With",
				TR: true,
				string: true
			},
			between: {
				text: "Between",
				TR: true,
				string: true,
				date: true,
				number: true
			},
			notbegin: {
				text: "Does not begin with",
				TR: true,
				string: true
			},
			contain: {
				text: "Contains",
				TR: true,
				string: true
			},
			notcontain: {
				text: "Does not contain",
				TR: true,
				string: true
			},
			equal: {
				text: "Equal To",
				TR: true,
				string: true,
				bool: true
			},
			notequal: {
				text: "Not Equal To",
				TR: true,
				string: true
			},
			empty: {
				text: "Empty",
				TR: false,
				string: true,
				bool: true
			},
			notempty: {
				text: "Not Empty",
				TR: false,
				string: true,
				bool: true
			},
			end: {
				text: "Ends With",
				TR: true,
				string: true
			},
			notend: {
				text: "Does not end with",
				TR: true,
				string: true
			},
			less: {
				text: "Less Than",
				TR: true,
				number: true,
				date: true
			},
			lte: {
				text: "Less than or equal",
				TR: true,
				number: true,
				date: true
			},
			range: {
				TR: true,
				string: true,
				number: true,
				date: true
			},
			regexp: {
				TR: true,
				string: true,
				number: true,
				date: true
			},
			great: {
				text: "Great Than",
				TR: true,
				number: true,
				date: true
			},
			gte: {
				text: "Greater than or equal",
				TR: true,
				number: true,
				date: true
			}
		};
		return {
			conditions: conditions,
			getAllConditions: function() {
				var arr = [];
				for (var key in conditions) {
					arr.push(key)
				}
				return arr
			}(),
			getConditions: function(type) {
				var arr = [];
				for (var key in conditions) {
					if (conditions[key][type]) {
						arr.push(key)
					}
				}
				return arr
			},
			getTRConditions: function() {
				var arr = [];
				for (var key in conditions) {
					if (conditions[key].TR) {
						arr.push(key)
					}
				}
				return arr
			}(),
			getWTRConditions: function() {
				var arr = [];
				for (var key in conditions) {
					if (!conditions[key].TR) {
						arr.push(key)
					}
				}
				return arr
			}()
		}
	}();
	_pq.filter.rules = {};
	_pq.filter.rules.en = {
		begin: "Begins With",
		between: "Between",
		notbegin: "Does not begin with",
		contain: "Contains",
		notcontain: "Does not contain",
		equal: "Equal To",
		notequal: "Not Equal To",
		empty: "Empty",
		notempty: "Not Empty",
		end: "Ends With",
		notend: "Does not end with",
		less: "Less Than",
		lte: "Less than or equal",
		great: "Great Than",
		gte: "Greater than or equal"
	};
	var cFilterData = function(that) {
		this.that = that;
		that.on("load", function() {
			var dataUF = that.options.dataModel.dataUF;
			if (dataUF) {
				dataUF.length = 0
			}
		})
	};
	_pq.cFilterData = cFilterData;
	var _pFilterData = cFilterData.prototype;
	cFilterData.conditions = {
		equal: function(cd, value) {
			if (cd == value) {
				return true
			}
		},
		contain: function(cd, value) {
			if (cd.indexOf(value) != -1) {
				return true
			}
		},
		notcontain: function(cd, value) {
			if (cd.indexOf(value) == -1) {
				return true
			}
		},
		empty: function(cd) {
			if (cd.length == 0) {
				return true
			}
		},
		notempty: function(cd) {
			if (cd.length > 0) {
				return true
			}
		},
		begin: function(cd, value) {
			if ((cd + "").indexOf(value) == 0) {
				return true
			}
		},
		notbegin: function(cd, value) {
			if (cd.indexOf(value) != 0) {
				return true
			}
		},
		end: function(cd, value) {
			var lastIndx = cd.lastIndexOf(value);
			if (lastIndx != -1 && lastIndx + value.length == cd.length) {
				return true
			}
		},
		notend: function(cd, value) {
			var lastIndx = cd.lastIndexOf(value);
			if (lastIndx != -1 && lastIndx + value.length == cd.length) {} else {
				return true
			}
		},
		regexp: function(cd, value) {
			if (value.test(cd)) {
				value.lastIndex = 0;
				return true
			}
		},
		notequal: function(cd, value) {
			if (cd != value) {
				return true
			}
		},
		great: function(cd, value) {
			if (cd > value) {
				return true
			}
		},
		gte: function(cd, value) {
			if (cd >= value) {
				return true
			}
		},
		between: function(cd, value, value2) {
			if (cd >= value && cd <= value2) {
				return true
			}
		},
		range: function(cd, value) {
			if ($.inArray(cd, value) != -1) {
				return true
			}
		},
		less: function(cd, value) {
			if (cd < value) {
				return true
			}
		},
		lte: function(cd, value) {
			if (cd <= value) {
				return true
			}
		}
	};
	cFilterData.convert = function(cd, dataType) {
		cd = cd == null ? "" : cd;
		if (dataType == "string") {
			cd = $.trim(cd).toUpperCase()
		} else {
			if (dataType == "date") {
				cd = Date.parse(cd)
			} else {
				if (dataType == "integer") {
					cd = parseInt(cd)
				} else {
					if (dataType == "float") {
						cd = parseFloat(cd)
					} else {
						if (dataType == "bool") {
							cd = String(cd).toLowerCase()
						}
					}
				}
			}
		}
		return cd
	};
	_pFilterData.isMatchCellSingle = function(s, rowData) {
		var dataIndx = s.dataIndx,
			dataType = s.dataType,
			value = s.value,
			value2 = s.value2,
			condition = s.condition,
			cbFn = s.cbFn,
			cd = rowData[dataIndx];
		if (condition == "regexp") {
			cd = cd == null ? "" : cd
		} else {
			cd = cFilterData.convert(cd, dataType)
		}
		var found = cbFn(cd, value, value2) ? true : false;
		return found
	};
	_pFilterData.isMatchRow = function(rowData, arrS, FMmode) {
		if (arrS.length == 0) {
			return true
		}
		for (var i = 0; i < arrS.length; i++) {
			var s = arrS[i],
				found = this.isMatchCell(s, rowData);
			if (FMmode == "OR" && found) {
				return true
			}
			if (FMmode == "AND" && !found) {
				return false
			}
		}
		if (FMmode == "AND") {
			return true
		} else {
			if (FMmode == "OR") {
				return false
			}
		}
	};
	_pFilterData.getQueryStringFilter = function() {
		var that = this.that,
			o = that.options,
			stringify = o.stringify,
			FM = o.filterModel,
			FMmode = FM.mode,
			CM = that.colModel,
			arrS = this.getFilterData({
				CM: CM,
				location: "remote"
			}),
			filter = "";
		if (FM && FM.on && arrS) {
			if (arrS.length) {
				var obj = {
					mode: FMmode,
					data: arrS
				};
				if (stringify === false) {
					filter = obj
				} else {
					filter = JSON.stringify(obj)
				}
			} else {
				filter = ""
			}
		}
		return filter
	};
	_pFilterData.filterLocalData = function(objP) {
		objP = objP || {};
		var that = this.that,
			apply = objP.apply,
			apply = apply == null ? true : apply,
			CM = apply ? that.colModel : objP.CM,
			arrS = this.getFilterData({
				CM: CM
			}),
			options = that.options,
			DM = options.dataModel,
			iSort = that.iSort,
			data1 = DM.data,
			data11 = [],
			data22 = [],
			data2 = DM.dataUF,
			FM = options.filterModel,
			FMmultiple = FM.multiple,
			FMmode = FM ? FM.mode : null;
		if (!data1) {
			data1 = DM.data = []
		}
		if (!data2) {
			data2 = DM.dataUF = []
		}
		if (apply === false) {
			data1 = data1.slice()
		}
		if (data2.length) {
			for (var i = 0, len = data2.length; i < len; i++) {
				data1.push(data2[i])
			}
			if (iSort.readSorter().length == 0) {
				iSort.sortLocalData(data1)
			}
			data2 = DM.dataUF = []
		} else {
			if (!arrS.length) {
				return {
					data: data1,
					dataUF: data2
				}
			} else {
				iSort.saveOrder()
			}
		}
		this.isMatchCell = FMmultiple ? this.isMatchCellMultiple : this.isMatchCellSingle;
		if (FM.on && FMmode && arrS && arrS.length) {
			if (data1.length) {
				for (var i = 0, len = data1.length; i < len; i++) {
					var rowData = data1[i];
					if (!this.isMatchRow(rowData, arrS, FMmode)) {
						data22.push(rowData)
					} else {
						data11.push(rowData)
					}
				}
			}
			data1 = data11;
			data2 = data22;
			if (apply) {
				DM.data = data1;
				DM.dataUF = data2
			}
		}
		if (apply) {
			that._queueATriggers.filter = {
				ui: {
					type: "local",
					filter: arrS
				}
			}
		}
		return {
			data: data1,
			dataUF: data2
		}
	};
	_pFilterData.getFilterData = function(objP) {
		var CM = objP.CM;
		if (!CM) {
			throw "CM N/A"
		}
		var that = this.that,
			CMLength = CM.length,
			location = objP.location,
			FM = that.options.filterModel,
			FMmultiple = FM.multiple,
			conditions = _pq.filter.getAllConditions,
			TRconditions = _pq.filter.getTRConditions,
			arrS = [],
			cFilterData = _pq.cFilterData,
			isCorrect = function(condition, value, value2) {
				if (typeof condition == "function") {
					return true
				} else {
					if (condition == "between") {
						if ((value == null || value === "") && (value2 == null || value2 === "")) {
							return false
						} else {
							return true
						}
					} else {
						if ($.inArray(condition, conditions) != -1) {
							if (value == null || value === "") {
								if ($.inArray(condition, TRconditions) != -1) {
									return false
								}
							}
							return true
						} else {
							return true
						}
					}
				}
			},
			getValue = function(cd, dataType) {
				if (location == "remote") {
					cd = cd == null ? "" : cd;
					return cd.toString()
				} else {
					return cFilterData.convert(cd, dataType)
				}
			};
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				filter = column.filter;
			if (filter && filter.on) {
				var dataIndx = column.dataIndx,
					dataType = column.dataType,
					dataType = !dataType || dataType == "stringi" || typeof dataType == "function" ? "string" : dataType,
					value = filter.value,
					value2 = filter.value2,
					condition = filter.condition;
				if (isCorrect(condition, value, value2)) {
					if (condition == "between") {
						if (value === "" || value == null) {
							condition = "lte";
							value = getValue(value2, dataType)
						} else {
							if (value2 === "" || value2 == null) {
								condition = "gte";
								value = getValue(value, dataType)
							} else {
								value = getValue(value, dataType);
								value2 = getValue(value2, dataType)
							}
						}
					} else {
						if (condition == "regexp") {
							if (location == "remote") {
								value = value.toString()
							} else {
								if (typeof value == "string") {
									try {
										var modifiers = filter.modifiers,
											modifiers = modifiers ? modifiers : "gi";
										value = new RegExp(value, modifiers)
									} catch (ex) {
										value = /.*/
									}
								}
							}
						} else {
							if (condition == "range") {
								if (value == null) {
									continue
								} else {
									if (typeof value == "string") {
										value = getValue(value, dataType);
										value = value.split(/\s*,\s*/)
									} else {
										if (value && typeof value.push == "function") {
											if (value.length == 0) {
												continue
											}
											value = value.slice();
											for (var j = 0, len = value.length; j < len; j++) {
												value[j] = getValue(value[j], dataType)
											}
										}
									}
								}
							} else {
								value = getValue(value, dataType)
							}
						}
					}
					var cbFn;
					if (location == "remote") {
						cbFn = ""
					} else {
						if (typeof condition == "function") {
							cbFn = condition
						} else {
							cbFn = cFilterData.conditions[condition]
						}
					}
					arrS.push({
						dataIndx: dataIndx,
						value: value,
						value2: value2,
						condition: condition,
						dataType: dataType,
						cbFn: cbFn
					})
				}
			}
		}
		return arrS
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery,
		cSort = _pq.cSort = function(that) {
			var self = this;
			self.that = that;
			self.sorters = [];
			self.tmpPrefix = "pq_tmp_";
			self.cancel = false
		};
	_pq.pqGrid.prototype.sort = function(ui) {
		ui = ui || {};
		var that = this,
			options = this.options,
			DM = options.dataModel,
			data = DM.data,
			SM = options.sortModel,
			type = SM.type;
		if ((!data || !data.length) && type == "local") {
			return
		}
		var EM = options.editModel,
			iSort = this.iSort,
			oldSorter = iSort.getSorter(),
			newSorter, evt = ui.evt,
			single = ui.single == null ? iSort.readSingle() : ui.single,
			cancel = iSort.readCancel();
		if (ui.sorter) {
			if (ui.addon) {
				ui.single = single;
				ui.cancel = cancel;
				newSorter = iSort.addon(ui)
			} else {
				newSorter = ui.sorter
			}
		} else {
			newSorter = iSort.readSorter()
		}
		if (!newSorter.length && !oldSorter.length) {
			return
		}
		if (EM.indices) {
			that.blurEditor({
				force: true
			})
		}
		var ui2 = {
			dataIndx: newSorter.length ? newSorter[0].dataIndx : null,
			oldSorter: oldSorter,
			sorter: newSorter,
			source: ui.source,
			single: single
		};
		if (that._trigger("beforeSort", evt, ui2) === false) {
			iSort.cancelSort();
			return
		}
		iSort.resumeSort();
		if (type == "local") {
			iSort.saveOrder()
		}
		iSort.setSorter(newSorter);
		iSort.setSingle(single);
		iSort.writeSorter(newSorter);
		iSort.writeSingle(single);
		if (type == "local") {
			DM.data = iSort.sortLocalData(data);
			this._queueATriggers.sort = {
				evt: evt,
				ui: ui2
			};
			if (ui.refresh !== false) {
				this.refreshView()
			}
		} else {
			if (type == "remote") {
				this._queueATriggers.sort = {
					evt: evt,
					ui: ui2
				};
				if (!ui.initByRemote) {
					this.remoteRequest({
						initBySort: true,
						callback: function() {
							that._onDataAvailable()
						}
					})
				}
			}
		}
	};
	var _pSort = cSort.prototype;
	_pSort.cancelSort = function() {
		this.cancel = true
	};
	_pSort.resumeSort = function() {
		this.cancel = false
	};
	_pSort.readSorter = function() {
		var that = this.that,
			o = that.options,
			columns = that.columns,
			len, sorters = [];
		var SM = o.sortModel,
			SMsorter = SM.sorter;
		if (SMsorter && (len = SMsorter.length)) {
			while (len--) {
				if (columns[SMsorter[len].dataIndx] == null) {
					SMsorter.splice(len, 1)
				}
			}
			sorters = sorters.concat(SMsorter)
		}
		sorters = pq.arrayUnique(sorters, "dataIndx");
		return sorters
	};
	_pSort.setSingle = function(m) {
		this.single = m
	};
	_pSort.getSingle = function() {
		return this.single
	};
	_pSort.readSingle = function() {
		return this.that.options.sortModel.single
	};
	_pSort.writeSingle = function(m) {
		this.that.options.sortModel.single = m
	};
	_pSort.setCancel = function(m) {
		this.cancel = m
	};
	_pSort.getCancel = function() {
		return this.cancel
	};
	_pSort.readCancel = function() {
		return this.that.options.sortModel.cancel
	};
	_pSort.writeCancel = function(m) {
		this.that.options.sortModel.cancel = m
	};
	_pSort.writeSorter = function(sorter) {
		var o = this.that.options,
			SM = o.sortModel;
		SM.sorter = sorter
	};
	_pSort.addon = function(ui) {
		ui = ui || {};
		var sorter = ui.sorter,
			uiDataIndx = sorter[0].dataIndx,
			uiDir = sorter[0].dir,
			single = ui.single,
			cancel = ui.cancel,
			GMLength = 0,
			sorters = this.readSorter();
		if (single == null) {
			throw "sort single N/A"
		}
		if (uiDataIndx != null) {
			if (single && !ui.tempMultiple) {
				sorters = sorters.length ? [sorters[0]] : [];
				if (sorters[GMLength] && sorters[GMLength].dataIndx == uiDataIndx) {
					var oldDir = sorters[GMLength].dir;
					var sortDir = oldDir === "up" ? "down" : cancel && oldDir === "down" ? "" : "up";
					if (sortDir === "") {
						sorters.length--
					} else {
						sorters[GMLength].dir = sortDir
					}
				} else {
					sortDir = uiDir ? uiDir : "up";
					sorters[GMLength] = {
						dataIndx: uiDataIndx,
						dir: sortDir
					}
				}
			} else {
				var indx = this.inSorters(sorters, uiDataIndx);
				if (indx > -1) {
					oldDir = sorters[indx].dir;
					if (oldDir == "up") {
						sorters[indx].dir = "down"
					} else {
						if (cancel && oldDir == "down") {
							sorters.splice(indx, 1)
						} else {
							if (sorters.length == 1) {
								sorters[indx].dir = "up"
							} else {
								sorters.splice(indx, 1)
							}
						}
					}
				} else {
					sorters.push({
						dataIndx: uiDataIndx,
						dir: "up"
					})
				}
			}
		}
		return sorters
	};
	_pSort.saveOrder = function(data) {
		var that = this.that,
			DM = that.options.dataModel,
			data = DM.data;
		if (data && data.length) {
			if (!DM.dataUF || !DM.dataUF.length) {
				if (!this.getSorter().length || data[0].pq_order == null) {
					for (var i = 0, len = data.length; i < len; i++) {
						data[i].pq_order = i
					}
				}
			}
		}
	};
	_pSort.getQueryStringSort = function() {
		if (this.cancel) {
			return ""
		}
		var that = this.that,
			sorters = this.sorters,
			options = that.options,
			stringify = options.stringify;
		if (sorters.length) {
			if (stringify === false) {
				return sorters
			} else {
				return JSON.stringify(sorters)
			}
		} else {
			return ""
		}
	};
	_pSort.getSorter = function() {
		var sorter = this.sorters;
		return sorter
	};
	_pSort.setSorter = function(sorters) {
		this.sorters = sorters.slice(0)
	};
	_pSort.inSorters = function(sorters, dataIndx) {
		for (var i = 0; i < sorters.length; i++) {
			if (sorters[i].dataIndx == dataIndx) {
				return i
			}
		}
		return -1
	};
	_pSort.sortLocalData = function(data) {
		var sorters = this.sorters;
		if (!sorters.length) {
			sorters = [{
				dataIndx: "pq_order",
				dir: "up",
				dataType: "integer"
			}]
		}
		return this._sortLocalData(sorters, data)
	};
	_pSort.compileSorter = function(sorters, data) {
		var self = this,
			that = self.that,
			columns = that.columns,
			o = that.options,
			arrFn = [],
			arrDI = [],
			arrDir = [],
			tmpPrefix = self.tmpPrefix,
			SM = o.sortModel,
			o_useCache = SM.useCache,
			ignoreCase = SM.ignoreCase,
			sortersLength = sorters.length;
		data = data ? data : o.dataModel.data;
		for (var i = 0; i < sortersLength; i++) {
			var sorter = sorters[i],
				dataIndx = sorter.dataIndx,
				column = columns[dataIndx] || {},
				_dir = sorter.dir = sorter.dir || "up",
				dir = _dir == "up" ? 1 : -1,
				sortType = column.sortType,
				sortType = pq.getFn(sortType),
				dataType = column.dataType || sorter.dataType || "string",
				dataType = dataType == "string" && ignoreCase ? "stringi" : dataType,
				useCache = o_useCache && dataType == "date",
				_dataIndx = useCache ? tmpPrefix + dataIndx : dataIndx;
			arrDI[i] = _dataIndx;
			arrDir[i] = dir;
			if (sortType) {
				arrFn[i] = function(sortType, sort_custom) {
					return function(obj1, obj2, dataIndx, dir) {
						return sort_custom(obj1, obj2, dataIndx, dir, sortType)
					}
				}(sortType, sortObj.sort_sortType)
			} else {
				if (dataType == "integer") {
					arrFn[i] = sortObj.sort_number
				} else {
					if (dataType == "float") {
						arrFn[i] = sortObj.sort_number
					} else {
						if (typeof dataType == "function") {
							arrFn[i] = function(dataType, sort_custom) {
								return function(obj1, obj2, dataIndx, dir) {
									return sort_custom(obj1, obj2, dataIndx, dir, dataType)
								}
							}(dataType, sortObj.sort_dataType)
						} else {
							if (dataType == "date") {
								arrFn[i] = sortObj["sort_date" + (useCache ? "_fast" : "")]
							} else {
								if (dataType == "bool") {
									arrFn[i] = sortObj.sort_bool
								} else {
									if (dataType == "stringi") {
										arrFn[i] = sortObj.sort_locale
									} else {
										arrFn[i] = sortObj.sort_string
									}
								}
							}
						}
					}
				}
			}
			if (useCache) {
				self.useCache(data, dataType, dataIndx, _dataIndx)
			}
		}
		return self._composite(arrFn, arrDI, arrDir, sortersLength)
	};
	_pSort._composite = function(arrFn, arrDI, arrDir, len) {
		return function sort_composite(obj1, obj2) {
			var ret = 0,
				i = 0;
			for (; i < len; i++) {
				ret = arrFn[i](obj1, obj2, arrDI[i], arrDir[i]);
				if (ret != 0) {
					break
				}
			}
			return ret
		}
	};
	_pSort._sortLocalData = function(sorters, data) {
		if (!data) {
			return []
		}
		if (!data.length || !sorters || !sorters.length) {
			return data
		}
		var self = this,
			that = self.that,
			SM = that.options.sortModel,
			sort_composite = self.compileSorter(sorters),
			ui = {
				sort_composite: sort_composite
			};
		if (that._trigger("customSort", null, ui) !== false) {
			data.sort(sort_composite)
		} else {
			data = ui.data
		}
		if (SM.useCache) {
			setTimeout(self.removeCache(sorters, data), 0)
		}
		return data
	};
	_pSort.useCache = function(data, dataType, dataIndx, _dataIndx) {
		var valueFn = sortObj["get_" + dataType],
			j = data.length;
		while (j--) {
			var rowData = data[j];
			rowData[_dataIndx] = valueFn(rowData[dataIndx])
		}
	};
	_pSort.removeCache = function(sorters, data) {
		var tmpPrefix = this.tmpPrefix;
		return function() {
			var i = sorters.length;
			while (i--) {
				var sorter = sorters[i],
					_dataIndx = tmpPrefix + sorter.dataIndx,
					j = data.length;
				if (j && data[0].hasOwnProperty(_dataIndx)) {
					while (j--) {
						delete data[j][_dataIndx]
					}
				}
			}
		}
	};
	var sortObj = {
		get_date: function(val) {
			var val2;
			return val ? isNaN(val2 = Date.parse(val)) ? 0 : val2 : 0
		},
		sort_number: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx],
				val2 = obj2[dataIndx];
			val1 = val1 ? val1 * 1 : 0;
			val2 = val2 ? val2 * 1 : 0;
			return (val1 - val2) * dir
		},
		sort_date: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx],
				val2 = obj2[dataIndx];
			val1 = val1 ? Date.parse(val1) : 0;
			val2 = val2 ? Date.parse(val2) : 0;
			return (val1 - val2) * dir
		},
		sort_date_fast: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx],
				val2 = obj2[dataIndx];
			return (val1 - val2) * dir
		},
		sort_dataType: function(obj1, obj2, dataIndx, dir, dataType) {
			var val1 = obj1[dataIndx],
				val2 = obj2[dataIndx];
			return dataType(val1, val2) * dir
		},
		sort_sortType: function(obj1, obj2, dataIndx, dir, sortType) {
			return sortType(obj1, obj2, dataIndx) * dir
		},
		sort_string: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx] || "",
				val2 = obj2[dataIndx] || "",
				ret = 0;
			if (val1 > val2) {
				ret = 1
			} else {
				if (val1 < val2) {
					ret = -1
				}
			}
			return ret * dir
		},
		sort_locale: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx] || "",
				val2 = obj2[dataIndx] || "";
			return val1.localeCompare(val2) * dir
		},
		sort_bool: function(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx],
				val2 = obj2[dataIndx],
				ret = 0;
			if (val1 && !val2 || val1 === false && val2 === null) {
				ret = 1
			} else {
				if (val2 && !val1 || val2 === false && val1 === null) {
					ret = -1
				}
			}
			return ret * dir
		}
	};
	pq.sortObj = sortObj
})(jQuery);
(function($) {
	function cMerge(that) {
		this.that = that;
		this.mc = null;
		var self = this,
			o = that.options;
		this.DM = o.dataModel;
		that.on("dataReady columnOrder groupShowHide", function(evt, ui) {
			if (o.mergeCells && ui.source !== "pager") {
				self.init()
			}
		})
	}
	$.paramquery.cMerge = cMerge;
	var _pMerge = cMerge.prototype = new $.paramquery.cClass;

	function findNextVisibleColumn(CM, ci, cs) {
		for (var i = ci; i < ci + cs; i++) {
			var column = CM[i];
			if (!column) {
				return -1
			}
			if (!column.hidden) {
				return i
			}
		}
	}

	function findNextVisibleRow(pdata, rip, rs) {
		for (var i = rip; i < rip + rs; i++) {
			var rowdata = pdata[i];
			if (!rowdata) {
				return -1
			}
			if (!rowdata.pq_hidden) {
				return i
			}
		}
	}
	_pMerge.init = function() {
		var that = this.that,
			CM = that.colModel,
			mc_o = that.options.mergeCells || [],
			data = that.get_p_data(),
			arr2 = [],
			arr = [];
		for (var i = 0, len = mc_o.length; i < len; i++) {
			var rec = mc_o[i],
				r1 = rec.r1,
				v_r1 = r1,
				rowdata = data[r1],
				c1 = rec.c1,
				v_c1 = c1,
				column = CM[c1],
				rs = rec.rc,
				cs = rec.cc,
				cs2, rs2;
			if (!column || !rowdata) {
				continue
			}
			if (column.hidden) {
				v_c1 = findNextVisibleColumn(CM, c1, cs)
			}
			cs2 = calcVisibleColumns(CM, c1, c1 + cs);
			if (rowdata.pq_hidden) {
				v_r1 = findNextVisibleRow(data, r1, rs)
			}
			rs2 = calcVisibleRows(data, r1, r1 + rs);
			if (rs2 < 1 || cs2 < 1) {
				continue
			}
			arr2.push({
				r1: r1,
				c1: c1,
				rc: rs,
				cc: cs,
				e_rc: rs2,
				e_cc: cs2
			});
			arr[v_r1] = arr[v_r1] || [];
			arr[v_r1][v_c1] = {
				show: true,
				rowspan: rs2,
				colspan: cs2,
				o_rowspan: rs,
				o_colspan: cs,
				style: rec.style,
				cls: rec.cls,
				attr: rec.attr,
				r1: r1,
				c1: c1,
				v_r1: v_r1,
				v_c1: v_c1
			};
			var hidden_obj = {
				show: false,
				r1: r1,
				c1: c1,
				v_r1: v_r1,
				v_c1: v_c1
			};
			for (var j = r1; j < r1 + rs; j++) {
				arr[j] = arr[j] || [];
				for (var k = c1; k < c1 + cs; k++) {
					if (j == v_r1 && k == v_c1) {
						continue
					}
					arr[j][k] = hidden_obj
				}
			}
		}
		that._mergeCells = arr.length > 0;
		this.mc = arr;
		this.mc2 = arr2
	};
	_pMerge.isHidden = function(ri, ci) {
		var that = this.that,
			mcRec, mc = this.mc;
		if (mc && mc[ri] && (mcRec = mc[ri][ci])) {
			if (!mcRec.show) {
				return true
			}
		}
		return false
	};
	_pMerge.setData = function(ri, ci, data) {
		var that = this.that,
			mcRec, mc = this.mc;
		if (mc[ri] && (mcRec = mc[ri][ci])) {
			mcRec.data = data
		}
	};
	_pMerge.getData = function(ri, ci, key) {
		var that = this.that,
			mcRec, mc = this.mc;
		if (mc[ri] && (mcRec = mc[ri][ci])) {
			var data = mcRec.data;
			return data ? data[key] : null
		}
	};
	_pMerge.removeData = function(ri, ci, key) {
		var that = this.that,
			mcRec, mc = this.mc;
		if (mc && mc[ri] && (mcRec = mc[ri][ci])) {
			var data = mcRec.data;
			if (data) {
				data[key] = null
			}
		}
	};
	_pMerge.ismergedCell = function(ri, ci) {
		var that = this.that,
			mc = this.mc,
			mcRec;
		if (mc && mc[ri] && (mcRec = mc[ri][ci])) {
			var v_ri = mcRec.v_r1,
				v_ci = mcRec.v_c1,
				mcRoot = mc[v_ri][v_ci];
			if (ri == mcRoot.r1 && ci == mcRoot.c1) {
				return {
					rowspan: mcRoot.o_rowspan,
					colspan: mcRoot.o_colspan
				}
			} else {
				return true
			}
		} else {
			return false
		}
	};
	_pMerge.isRootCell = function(r1, c1, type) {
		var that = this.that,
			mc = this.mc,
			mcRec;
		if (mc && mc[r1] && (mcRec = mc[r1][c1])) {
			if (type == "o") {
				return r1 == mcRec.r1 && c1 == mcRec.c1
			}
			var v_r1 = mcRec.v_r1,
				v_c1 = mcRec.v_c1;
			if (type == "a") {
				var mcRoot = mc[v_r1][v_c1];
				return mcRoot.a_r1 == r1 && mcRoot.a_c1 == c1
			} else {
				if (v_r1 == r1 && v_c1 == c1) {
					var mcRoot = mc[v_r1][v_c1];
					return {
						rowspan: mcRoot.rowspan,
						colspan: mcRoot.colspan
					}
				}
			}
		}
	};
	_pMerge.getRootCell = function(r1, ci, type) {
		var that = this.that,
			mc = this.mc,
			mcRec;
		if (mc && mc[r1] && (mcRec = mc[r1][ci])) {
			if (type == "a") {
				r1 = mcRec.v_r1;
				ci = mcRec.v_c1;
				var mcRoot = mc[r1][ci];
				if (mcRoot.a_r1) {
					r1 = mcRoot.a_r1;
					ci = mcRoot.a_c1
				}
			} else {
				if (type == "o") {
					r1 = mcRec.r1;
					ci = mcRec.c1
				} else {
					r1 = mcRec.v_r1;
					ci = mcRec.v_c1
				}
			}
			var CM = that.colModel,
				column = CM[ci],
				offset = that.rowIndxOffset,
				rip = r1 - offset;
			if (rip < 0) {
				rip = 0;
				r1 = offset
			}
			return {
				rowIndxPage: rip,
				colIndx: ci,
				column: column,
				dataIndx: column.dataIndx,
				rowData: that.getRowData({
					rowIndx: r1
				}),
				rowIndx: r1,
				rowspan: mcRec.rowspan,
				colspan: mcRec.colspan
			}
		} else {
			return that.normalize({
				rowIndx: r1,
				colIndx: ci
			})
		}
	};
	_pMerge.inflateRange = function(r1, c1, r2, c2) {
		var that = this.that,
			expand = false,
			o = that.options,
			GM = o.groupModel,
			max_ri2 = GM.on ? that.rowIndxOffset + that.pdata.length - 1 : o.dataModel.data.length - 1,
			max_ci2 = that.colModel.length - 1,
			mc = this.mc2;
		if (!mc) {
			return [r1, c1, r2, c2]
		}
		expando: for (var i = 0, len = mc.length; i < len; i++) {
			var rec = mc[i],
				ri1 = rec.r1,
				ci1 = rec.c1,
				ri2 = ri1 + rec.rc - 1,
				ci2 = ci1 + rec.cc - 1,
				ri2 = ri2 > max_ri2 ? max_ri2 : ri2,
				ci2 = ci2 > max_ci2 ? max_ci2 : ci2,
				topEdge = ri1 < r1 && ri2 >= r1,
				botEdge = ri1 <= r2 && ri2 > r2,
				leftEdge = ci1 < c1 && ci2 >= c1,
				rightEdge = ci1 <= c2 && ci2 > c2;
			if ((topEdge || botEdge) && ci2 >= c1 && ci1 <= c2 || (leftEdge || rightEdge) && ri2 >= r1 && ri1 <= r2) {
				expand = true;
				r1 = ri1 < r1 ? ri1 : r1;
				c1 = ci1 < c1 ? ci1 : c1;
				r2 = ri2 > r2 ? ri2 : r2;
				c2 = ci2 > c2 ? ci2 : c2;
				break expando
			}
		}
		if (expand) {
			return this.inflateRange(r1, c1, r2, c2)
		} else {
			return [r1, c1, r2, c2]
		}
	};

	function calcVisibleColumns(CM, ci1, ci2) {
		var num = 0,
			len = CM.length;
		ci2 = ci2 > len ? len : ci2;
		for (var i = ci1; i < ci2; i++) {
			var column = CM[i];
			if (column.hidden !== true) {
				num++
			}
		}
		return num
	}

	function calcVisibleRows(pdata, rip1, rip2) {
		var num = 0,
			len = pdata.length;
		rip2 = rip2 > len ? len : rip2;
		for (var i = rip1; i < rip2; i++) {
			var rd = pdata[i];
			if (rd.pq_hidden !== true) {
				num++
			}
		}
		return num
	}
	var fn = $.paramquery.pqGrid.prototype;
	fn.calcVisibleRows = calcVisibleRows;
	_pMerge.renderCell = function(ui) {
		var that = this.that,
			a_r1 = ui.rowIndx,
			a_rip = ui.rowIndxPage,
			a_ci = ui.colIndx,
			nui, mc = this.mc,
			mcRec;
		if (mc[a_r1] && (mcRec = mc[a_r1][a_ci])) {
			var r1 = mcRec.v_r1,
				ci = mcRec.v_c1,
				o_r1 = mcRec.r1,
				o_ci = mcRec.c1,
				o = that.options,
				CM = that.colModel,
				offset = that.rowIndxOffset,
				fc = o.freezeCols,
				fr = o.freezeRows,
				fr_off = fr ? fr + offset : 0,
				initH = that.initH,
				initV = that.initV;
			var firstRowPage = a_ci == ci && a_rip == initV && r1 >= fr_off,
				topEdge = a_ci == ci && a_r1 == initV && r1 >= fr_off,
				leftEdge = a_r1 == r1 && a_ci == initH && ci >= fc,
				bothEdges = a_r1 == initV && a_ci == initH && ci >= fc && r1 >= fr_off;
			if (!mcRec.show && !firstRowPage && !topEdge && !leftEdge && !bothEdges) {
				return null
			} else {
				var o_rip = o_r1 - offset,
					pdata = that.pdata,
					data = that.get_p_data(),
					rd = data[o_r1],
					column = CM[o_ci];
				nui = {
					rowData: rd,
					rowIndx: o_r1,
					colIndx: o_ci,
					column: column,
					rowIndxPage: o_rip
				};
				var mcRoot = mc[r1][ci],
					colspan = mcRoot.colspan,
					rowspan = mcRoot.rowspan,
					fcVisible = calcVisibleColumns(CM, a_ci, fc),
					frVisible = calcVisibleRows(pdata, a_r1 - offset, fr);
				if (fc && a_ci < fc && colspan > fcVisible) {
					var colspan1 = colspan - calcVisibleColumns(CM, fc, initH),
						colspan2 = fcVisible;
					colspan = Math.max(colspan1, colspan2)
				} else {
					colspan = colspan - calcVisibleColumns(CM, ci, a_ci)
				}
				if (fr && a_r1 > offset && a_r1 < fr_off && rowspan > frVisible) {
					var rowspan1 = rowspan - calcVisibleRows(pdata, fr, initV),
						rowspan2 = frVisible;
					rowspan = Math.max(rowspan1, rowspan2)
				} else {
					rowspan = rowspan - calcVisibleRows(data, r1, a_r1)
				}
				mcRoot.a_r1 = a_r1;
				mcRoot.a_c1 = a_ci;
				nui.rowspan = rowspan;
				nui.colspan = colspan;
				nui.style = mcRoot.style;
				nui.attr = mcRoot.attr;
				nui.cls = mcRoot.cls
			}
		}
		return nui ? nui : ui
	};
	_pMerge.getMergeCells = function(hcLen, curPage, dataLen) {
		var that = this.that,
			mcarr = that.options.mergeCells,
			mc, r1, c1, offset = that.rowIndxOffset,
			offset2 = offset + dataLen,
			arr = [],
			mcLen = mcarr ? mcarr.length : 0;
		for (var i = 0; i < mcLen; i++) {
			mc = mcarr[i];
			r1 = mc.r1;
			c1 = mc.c1;
			if (!curPage || r1 >= offset && r1 < offset2) {
				if (curPage) {
					r1 -= offset
				}
				r1 += hcLen;
				arr.push({
					r1: r1,
					c1: c1,
					r2: r1 + mc.rc - 1,
					c2: c1 + mc.cc - 1
				})
			}
		}
		return arr
	}
})(jQuery);
(function() {
	pq.extend = function(base, sub, methods) {
		var fn = function() {};
		fn.prototype = base.prototype;
		var _p = sub.prototype = new fn;
		var _bp = base.prototype;
		for (var method in methods) {
			var _bpm = _bp[method],
				_spm = methods[method];
			if (_bpm) {
				_p[method] = function(_bpm, _spm) {
					return function() {
						var old_super = this._super,
							ret;
						this._super = function() {
							return _bpm.apply(this, arguments)
						};
						ret = _spm.apply(this, arguments);
						this._super = old_super;
						return ret
					}
				}(_bpm, _spm)
			} else {
				_p[method] = _spm
			}
		}
		_p.constructor = sub;
		_p._base = base;
		_p._bp = function(method) {
			var args = arguments;
			Array.prototype.shift.call(args);
			return _bp[method].apply(this, args)
		}
	};
	var Range = pq.Range = function(that, range, type, expand) {
		if (that == null) {
			throw "invalid param"
		}
		this.that = that;
		if (this instanceof Range == false) {
			return new Range(that, range, type, expand)
		}
		this._type = type ? type : "range";
		this.init(range, expand)
	};
	var _R = Range.prototype;
	_R._areas = [];
	_R.init = function(range, expand) {
		expand = expand !== false;
		if (!range) {
			return
		}
		if (typeof range.push == "function") {
			for (var i = 0, len = range.length; i < len; i++) {
				this.init(range[i], expand)
			}
		} else {
			var nrange = this._normal(range, expand);
			if (nrange) {
				var areas = this._areas;
				if (areas.length) {
					areas.push(nrange)
				} else {
					this._areas = [nrange]
				}
			}
		}
	};
	_R.address = function() {
		if (this.dirty) {
			this.refresh()
		}
		return this._areas
	};
	_R.areas = function(i) {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			areas = this._areas,
			areas = i == null ? areas : areas[i];
		return pq.Range(that, areas, "area")
	};
	_R.merge = function(ui) {
		ui = ui || {};
		var that = this.that,
			o = that.options,
			mc = o.mergeCells,
			areas = this._areas,
			rc, cc, area = areas[0];
		if (area) {
			rc = area.r2 - area.r1 + 1;
			cc = area.c2 - area.c1 + 1;
			if (rc > 1 || cc > 1) {
				area.rc = rc;
				area.cc = cc;
				mc.push(area);
				if (ui.refresh !== false) {
					that.refreshView()
				}
			}
		}
	};
	_R.unmerge = function(ui) {
		ui = ui || {};
		var that = this.that,
			o = that.options,
			mc = o.mergeCells,
			areas = this._areas,
			area = areas[0];
		if (area) {
			for (var i = 0; i < mc.length; i++) {
				var mcRec = mc[i];
				if (mcRec.r1 == area.r1 && mcRec.c1 == area.c1) {
					mc.splice(i, 1);
					break
				}
			}
			if (ui.refresh !== false) {
				that.refreshView()
			}
		}
	};
	_R.hide = function(ui) {
		ui = ui || {};
		var that = this.that,
			CM = that.colModel,
			data = that.get_p_data(),
			areas = this._areas;
		for (var i = 0, len = areas.length; i < len; i++) {
			var area = areas[i],
				type = area.type,
				r1 = area.r1,
				r2 = area.r2,
				c1 = area.c1,
				c2 = area.c2;
			if (type == "column") {
				for (var j = c1; j <= c2; j++) {
					CM[j].hidden = true
				}
			} else {
				if (type == "row") {
					for (var j = r1; j <= r2; j++) {
						data[j].pq_hidden = true
					}
				}
			}
		}
		if (ui.refresh !== false) {
			that.refreshView()
		}
	};
	_R.unhide = function(ui) {
		ui = ui || {};
		var that = this.that,
			CM = that.colModel,
			data = that.get_p_data(),
			areas = this._areas;
		for (var i = 0, len = areas.length; i < len; i++) {
			var area = areas[i],
				type = area.type,
				r1 = area.r1,
				r2 = area.r2,
				c1 = area.c1,
				c2 = area.c2;
			if (type == "column") {
				for (var j = c1; j <= c2; j++) {
					CM[j].hidden = false
				}
			} else {
				if (type == "row") {
					for (var j = r1; j <= r2; j++) {
						data[j].pq_hidden = false
					}
				}
			}
		}
		if (ui.refresh !== false) {
			that.refreshView()
		}
	};
	_R.select = function() {
		var that = this.that,
			iS = that.iSelection,
			sarea = iS._areas[0],
			areas = this._areas,
			area = areas[0];
		if (!area) {
			return this
		}
		var r1 = area.r1,
			c1 = area.c1;
		if (!iS.dirty && areas.length == 1 && areas[0].type == "block" && sarea && (sarea.type == "cell" || sarea.type == "block") && r1 == sarea.r1 && c1 == sarea.c1) {
			var sr1 = sarea.r1,
				sc1 = sarea.c1,
				sr2 = sarea.r2,
				sc2 = sarea.c2,
				r2 = area.r2,
				c2 = area.c2,
				iC = that.iCells;
			if (r2 == sr2 && c2 == sc2) {
				return this
			}
			if (c2 > sc2) {
				iC.selectBlock({
					range: {
						r1: r1,
						c1: sc2 + 1,
						r2: r2,
						c2: c2
					}
				})
			} else {
				if (c2 < sc2) {
					iC.selectBlock({
						range: {
							r1: Math.max(r1, sr1),
							c1: c2 + 1,
							r2: Math.max(r2, sr2),
							c2: sc2
						},
						remove: true
					})
				}
			}
			if (r2 > sr2) {
				iC.selectBlock({
					range: {
						r1: sr2 + 1,
						c1: c1,
						r2: r2,
						c2: c2
					}
				})
			} else {
				if (r2 < sr2) {
					iC.selectBlock({
						range: {
							r1: r2 + 1,
							c1: Math.max(c1, sc1),
							r2: sr2,
							c2: Math.max(c2, sc2)
						},
						remove: true
					})
				}
			}
			iS._areas = areas;
			iS._trigger()
		} else {
			iS.removeAll({
				trigger: false
			});
			for (var i = 0, len = areas.length; i < len; i++) {
				iS.add(areas[i], false)
			}
			iS._trigger()
		}
		return this
	};
	_R.resize = function(rc, cc) {
		var area = this._areas[0],
			range = {
				r1: area.r1,
				c1: area.c1,
				rc: rc,
				cc: cc
			};
		return Range(this.that, range)
	};
	_R.cut = function(ui) {
		ui = ui || {};
		ui.cut = true;
		return this.copy(ui)
	};
	_R.copy = function(ui) {
		ui = ui || {};
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			dest = ui.dest,
			cut = ui.cut ? true : false,
			copy = ui.copy == null ? true : ui.copy,
			source = ui.source || (cut ? "cut" : "copy"),
			history = ui.history == null ? true : ui.history,
			allowInvalid = ui.allowInvalid == null ? true : ui.allowInvalid,
			rowList = [],
			buffer = [],
			p_data = that.get_p_data(),
			CM = that.colModel,
			readCell = that.readCell,
			iMerge = that.iMerge,
			areas = this._areas;
		if (!areas.length) {
			return
		}
		var area = this._areas[0],
			type = area.type,
			r1 = area.r1,
			c1 = area.c1,
			r2 = type == "cell" ? r1 : area.r2,
			c2 = type == "cell" ? c1 : area.c2,
			k = 0;
		do {
			for (var ri = r1; ri <= r2; ri++) {
				var rowBuffer = [],
					rd = p_data[ri],
					newRow = {},
					oldRow = {};
				for (var ci = c1; ci <= c2; ci++) {
					var column = CM[ci],
						di = column.dataIndx;
					if (column.copy === false) {
						continue
					}
					var cv = rd[di];
					if (copy) {
						rowBuffer.push(readCell(rd, column, iMerge, ri, ci))
					}
					if (cut) {
						newRow[di] = undefined;
						oldRow[di] = cv
					}
				}
				if (cut) {
					rowList.push({
						rowIndx: ri,
						rowData: rd,
						oldRow: oldRow,
						newRow: newRow,
						type: "update"
					})
				}
				var str = rowBuffer.join("	");
				rowBuffer = [];
				buffer.push(str)
			}
			k++;
			area = areas[k];
			if (type == "row" && area && area.type == "row") {
				r1 = area.r1, c1 = area.c1, r2 = area.r2, c2 = area.c2
			} else {
				break
			}
		} while (true);
		if (copy) {
			var str = buffer.join("\n");
			if (ui.clip) {
				var $clip = ui.clip;
				$clip.val(str);
				$clip.select()
			} else {
				that._setGlobalStr(str)
			}
		}
		if (dest) {
			that.paste({
				dest: dest,
				rowList: rowList,
				history: history,
				allowInvalid: allowInvalid
			})
		} else {
			if (cut) {
				var ret = that._digestData({
					rowList: rowList,
					source: source,
					history: history,
					allowInvalid: allowInvalid
				});
				if (ret !== false) {
					that.refresh({
						source: "cut"
					})
				}
			}
		}
	};
	_R.clear = function() {
		return this.copy({
			copy: false,
			cut: true,
			source: "clear"
		})
	};
	_R.add = function(range) {
		this.init(range)
	};
	_R._countArea = function(nrange) {
		var that = this.that,
			arr = nrange,
			type = nrange.type,
			r1 = arr.r1,
			c1 = arr.c1,
			r2 = arr.r2,
			c2 = arr.c2;
		if (type == "cell") {
			return 1
		} else {
			return (r2 - r1 + 1) * (c2 - c1 + 1)
		}
	};
	_R.count = function() {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			type_range = this._type == "range",
			arr = this._areas,
			tot = 0,
			len = arr.length;
		for (var i = 0; i < len; i++) {
			tot += type_range ? this._countArea(arr[i]) : 1
		}
		return tot
	};
	_R.rows = function(indx) {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			narr = [],
			arr = this._areas[0];
		if (arr) {
			var r1 = arr.r1,
				c1 = arr.c1,
				r2 = arr.r2,
				c2 = arr.c2,
				type = arr.type,
				indx1 = indx == null ? r1 : r1 + indx,
				indx2 = indx == null ? r2 : r1 + indx;
			for (var i = indx1; i <= indx2; i++) {
				narr.push({
					r1: i,
					c1: c1,
					r2: i,
					c2: c2,
					type: type
				})
			}
		}
		return pq.Range(that, narr, "row")
	};
	_R.columns = function(indx) {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			narr = [],
			arr = this._areas[0];
		if (arr) {
			var r1 = arr.r1,
				c1 = arr.c1,
				r2 = arr.r2,
				c2 = arr.c2,
				type = arr.type,
				indx1 = indx == null ? c1 : c1 + indx,
				indx2 = indx == null ? c2 : c1 + indx;
			for (var i = indx1; i <= indx2; i++) {
				narr.push({
					r1: r1,
					c1: i,
					r2: r2,
					c2: i,
					type: type
				})
			}
		}
		return pq.Range(that, narr, "column")
	};
	_R.cell = function(r, c) {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			narr = [],
			arr = this._areas[0];
		if (arr) {
			var r1 = arr.r1 + r,
				c1 = arr.c1 + c;
			narr = [r1, c1, r1, c1]
		}
		return pq.Range(that, narr, "cell")
	};
	_R.item = function(indx) {
		if (this.dirty) {
			this.refresh()
		}
		var that = this.that,
			tcount = 0,
			_found = false,
			areas = this._areas;
		for (var i = 0, len = areas.length; i < len; i++) {
			var a = areas[i],
				count = this._countArea(a);
			if (tcount + count > indx) {
				_found = true;
				indx = indx - tcount;
				break
			} else {
				tcount += count
			}
		}
		if (!_found) {
			return
		}
		if (a) {
			var r1 = a.r1,
				c1 = a.c1,
				c2 = a.c2,
				cc = c2 - c1 + 1,
				r = Math.floor(indx / cc),
				c = indx % cc,
				r1 = r1 + r,
				c1 = c1 + c
		}
		return {
			r1: r1,
			c1: c1
		}
	};
	_R._normal = function(range, expand) {
		if (range.type) {
			return range
		}
		if (range.push == "function") {
			var arr = [];
			for (var i = 0, len = range.length; i < len; i++) {
				var ret = this._normal(range[i], expand);
				if (ret) {
					arr.push(ret)
				}
			}
			return arr
		}
		var that = this.that,
			data = that.get_p_data(),
			rmax = data.length - 1,
			CM = that.colModel,
			cmax = CM.length - 1,
			r1 = range.r1,
			c1 = range.c1,
			r1 = r1 > rmax ? rmax : r1,
			c1 = c1 > cmax ? cmax : c1,
			rc = range.rc,
			cc = range.cc,
			r2 = range.r2,
			c2 = range.c2,
			r2 = r2 > rmax ? rmax : r2,
			c2 = c2 > cmax ? cmax : c2,
			r2 = rc ? r1 + rc - 1 : r2,
			c2 = cc ? c1 + cc - 1 : c2,
			tmp, type;
		if (cmax < 0 || rmax < 0) {
			return null
		}
		if (r1 > r2) {
			tmp = r1;
			r1 = r2;
			r2 = tmp
		}
		if (c1 > c2) {
			tmp = c1;
			c1 = c2;
			c2 = tmp
		}
		if (r1 == null && c1 == null) {
			return
		}
		if (r1 == null) {
			r1 = 0;
			r2 = rmax;
			c2 = c2 == null ? c1 : c2;
			type = "column"
		} else {
			if (c1 == null) {
				c1 = 0;
				r2 = r2 == null ? r1 : r2;
				c2 = cmax;
				type = "row"
			} else {
				if (r2 == null) {
					type = "cell";
					r2 = r1;
					c2 = c1
				} else {
					type = "block"
				}
			}
		}
		if (expand) {
			var arr = that.iMerge.inflateRange(r1, c1, r2, c2);
			r1 = arr[0];
			c1 = arr[1];
			r2 = arr[2];
			c2 = arr[3]
		}
		range.r1 = r1;
		range.c1 = c1;
		range.r2 = r2;
		range.c2 = c2;
		range.type = range.type || type;
		return range
	};
	_R.getValue = function() {
		var areas = this.address(),
			area, rd, arr = [],
			_arr, val, that = this.that,
			r1, c1, r2, c2, i, j, data;
		if (areas.length) {
			area = areas[0];
			r1 = area.r1;
			c1 = area.c1;
			r2 = area.r2;
			c2 = area.c2;
			data = that.get_p_data();
			for (i = r1; i <= r2; i++) {
				rd = data[i];
				_arr = arr[i - r1] = [];
				for (j = c1; j <= c2; j++) {
					val = rd[that.colModel[j].dataIndx];
					_arr.push(val)
				}
			}
			return arr
		}
	};
	_R.value = function(val) {
		var valj, valk, isValArray, that = this.that,
			CM = that.colModel,
			area, r1, c1, r2, c2, rowList = [],
			areas = this.address();
		if (val === undefined) {
			return this.getValue()
		} else {
			isValArray = typeof val.push === "function"
		}
		for (var i = 0; i < areas.length; i++) {
			area = areas[i];
			r1 = area.r1;
			c1 = area.c1;
			r2 = area.r2;
			c2 = area.c2;
			for (var j = r1; j <= r2; j++) {
				var obj = that.normalize({
						rowIndx: j
					}),
					rd = obj.rowData,
					ri = obj.rowIndx,
					oldRow = {},
					newRow = {};
				valj = isValArray ? val[j - r1] : val;
				for (var k = c1; k <= c2; k++) {
					var dataIndx = CM[k].dataIndx;
					valk = isValArray ? valj[k - c1] : val;
					newRow[dataIndx] = valk;
					oldRow[dataIndx] = rd[dataIndx]
				}
				rowList.push({
					rowData: rd,
					rowIndx: ri,
					type: "update",
					newRow: newRow,
					oldRow: oldRow
				})
			}
		}
		if (rowList.length) {
			that._digestData({
				rowList: rowList,
				source: "range"
			});
			that.refresh()
		}
		return this
	};
	var Selection = pq.Selection = function(that, range) {
		if (that == null) {
			throw "invalid param"
		}
		if (this instanceof Selection == false) {
			return new Selection(that, range)
		}
		this.that = that;
		var o = that.options,
			self = this;
		that.on("dataReady columnOrder addColumn deleteColumn", function(evt, ui) {
			if (ui.source != "pager") {
				self.renew()
			}
		});
		this._base(that, range)
	};
	var _S = {};
	_S.renew = function() {
		this.dirty = true
	};
	_S.isDirty = function() {
		return this.dirty
	};
	var selectEndDelegate = function(evt) {
		if (!evt.shiftKey || evt.type == "pqGrid:mousePQUp") {
			this._trigger("selectEnd", null, {
				selection: this.selection()
			});
			this.off("mousePQUp", selectEndDelegate);
			this.off("keyUp", selectEndDelegate)
		}
	};
	_S._trigger = function() {
		var that = this.that;
		if (this.dirty) {
			this.refresh()
		}
		that._trigger("selectChange", null, {
			selection: this
		});
		that.off("mousePQUp", selectEndDelegate);
		that.off("keyUp", selectEndDelegate);
		that.on("mousePQUp", selectEndDelegate);
		that.on("keyUp", selectEndDelegate)
	};
	_S.removeAll = function(ui) {
		ui = ui || {};
		var that = this.that;
		that.iCells.removeAll({
			refresh: true
		});
		that.iRows.removeAll({
			refresh: true,
			all: true
		});
		this._areas = [];
		if (ui.trigger !== false) {
			this._trigger()
		}
	};
	_R.indexOf = function(range) {
		if (this.dirty) {
			this.refresh()
		}
		range = this._normal(range);
		var that = this.that,
			type = range.type,
			r1 = range.r1,
			c1 = range.c1,
			r2 = range.r2,
			c2 = range.c2,
			areas = this._areas;
		for (var i = 0, len = areas.length; i < len; i++) {
			var area = areas[i],
				a = area;
			if (type == area.type && r1 >= a.r1 && r2 <= a.r2 && c1 == a.c1 && c2 == a.c2) {
				return i
			}
		}
		return -1
	};
	_S.add = function(range, trigger) {
		var that = this.that,
			narea = this._normal(range, true),
			iC = that.iCells,
			iR = that.iRows,
			r1 = narea.r1,
			c1 = narea.c1,
			r2 = narea.r2,
			type = narea.type;
		if (this.indexOf(narea) >= 0) {
			return
		}
		if (type == "row") {
			var areas = this._areas;
			if (areas.length) {
				var oarea = areas[areas.length - 1],
					type = oarea.type;
				if (type == "row") {
					var or2 = oarea.r2;
					if (r1 <= or2) {
						this.dirty = true
					}
				}
			}
			if (r2 > r1) {
				iR.selectRange({
					range: narea
				})
			} else {
				iR.add({
					rowIndx: r1
				})
			}
		} else {
			if (type == "column" || type == "block") {
				iC.selectBlock({
					range: narea
				})
			} else {
				if (type == "cell") {
					iC.add({
						rowIndx: r1,
						colIndx: c1
					})
				}
			}
		}
		this._super(narea);
		if (trigger !== false) {
			this._trigger()
		}
	};
	_S._adjust = function(range) {
		var that = this.that,
			data = that.get_p_data(),
			rmax = data.length - 1,
			CM = that.colModel,
			cmax = CM.length - 1,
			r1 = range.r1,
			c1 = range.c1,
			r2 = range.r2,
			c2 = range.c2,
			r2 = r2 > rmax ? rmax : r2,
			c2 = c2 > cmax ? cmax : c2;
		if (cmax < 0 || rmax < 0 || r1 > r2 || c1 > c2) {
			return null
		}
		range.r1 = r1;
		range.r2 = r2;
		range.c1 = c1;
		range.c2 = c2;
		return range
	};
	_R.removeRow = function(range, indx) {
		var _r1 = range.r1,
			_r2 = range.r2,
			areas = this._areas,
			a = this._areas[indx],
			r1 = a.r1,
			r2 = a.r2;
		if (_r1 == r1 && _r2 == r2) {
			areas.splice(indx, 1)
		} else {
			if (_r1 > r1) {
				a.r2 = _r1 - 1;
				if (_r2 < r2) {
					var new_range = this._normal({
						r1: _r2 + 1,
						r2: r2
					});
					areas.splice(indx + 1, 0, new_range)
				}
			} else {
				if (_r2 < r2) {
					if (_r1 > r1) {
						var new_range = this._normal({
							r1: _r2 + 1,
							r2: r2
						});
						areas.splice(indx, 0, new_range)
					}
					a.r1 = _r2 + 1
				}
			}
		}
	};
	_S.removeRow = function(range, trigger) {
		var that = this.that,
			nrange = this._normal(range),
			indx = this.indexOf(nrange);
		if (indx > -1 && nrange.type == "row" && nrange.r1 == nrange.r2) {
			that.iRows.remove({
				rowIndx: nrange.r1
			});
			this._super(range, indx);
			if (trigger !== false) {
				this._trigger()
			}
		}
	};
	_S.selectAll = function(ui) {
		ui = ui || {};
		var type = ui.type,
			that = this.that,
			CM = that.colModel,
			all = ui.all,
			r1 = all ? 0 : that.rowIndxOffset,
			data_len = all ? that.options.dataModel.data.length - 1 : that.pdata.length - 1,
			cm_len = CM.length - 1,
			r2 = r1 + data_len;
		if (type == "cell") {
			var range = {
				r1: r1,
				c1: 0
			};
			range.r2 = r2;
			range.c2 = cm_len;
			that.range(range).select()
		} else {
			var range = {
				r1: r1
			};
			range.r2 = r2;
			if (!all) {
				this.removeRows({
					all: false,
					trigger: false
				})
			}
			that.iRows.selectRange({
				range: range
			});
			var areas = all ? [] : this._areas;
			areas.push({
				r1: r1,
				c1: 0,
				r2: r2,
				c2: cm_len,
				type: "row"
			});
			this._areas = areas;
			this._trigger()
		}
		return this
	};
	_S.removeRows = function(ui) {
		ui = ui || {};
		var that = this.that,
			all = ui.all;
		that.iRows.removeAll({
			refresh: true,
			all: ui.all
		});
		if (all) {
			this._areas = []
		} else {
			this.refresh()
		}
		if (ui.trigger !== false) {
			this._trigger()
		}
	};
	_S.refresh = function() {
		var that = this.that,
			areas = [],
			CM = that.colModel,
			clen = CM.length - 1,
			data = that.get_p_data();
		for (var ri = 0, len = data.length; ri < len; ri++) {
			var rd = data[ri],
				prevR;
			if (rd) {
				rd.pq_cellselect = undefined;
				if (rd.pq_rowselect) {
					if (prevR) {
						prevR.r2 = ri
					} else {
						prevR = {
							r1: ri,
							r2: ri,
							c1: 0,
							c2: clen,
							type: "row"
						}
					}
				} else {
					if (prevR) {
						areas.push(prevR);
						prevR = null
					}
				}
			}
		}
		if (prevR) {
			areas.push(prevR)
		}
		this.dirty = false;
		this._areas = areas
	};
	pq.extend(Range, Selection, _S)
})();
(function($) {
	var _pq = $.paramquery;
	_pq.pqGrid.defaults.groupModel = {
		on: false,
		title: [],
		titleDefault: "{0} ({1})",
		header: true,
		headerMenu: true,
		menuItems: ["merge", "fixCols", "grandSummary"],
		fixCols: true,
		icon: ["ui-icon-triangle-1-se", "ui-icon-triangle-1-e"],
		dataIndx: [],
		collapsed: [],
		dir: [],
		showSummary: [],
		calcSummary: [],
		summaryInTitleRow: "collapsed",
		summaryEdit: true,
		refreshOnChange: true
	};
	pq.aggregate = {
		sum: function(arr) {
			var s = 0,
				i = arr.length,
				val;
			while (i--) {
				val = arr[i];
				if (val != null) {
					s += val - 0
				}
			}
			return s
		},
		avg: function(arr, column) {
			var avg = this.sum(arr, column, true) / arr.length;
			return avg
		},
		max: function(arr, column) {
			var ret, dataType = column.dataType;
			if (dataType == "float" || dataType == "integer") {
				ret = Math.max.apply(Math, arr)
			} else {
				if (dataType == "date") {
					arr.sort(function(a, b) {
						a = Date.parse(a);
						b = Date.parse(b);
						if (isNaN(a)) {
							a = 0
						}
						if (isNaN(b)) {
							b = 0
						}
						return b - a
					});
					ret = arr[0]
				} else {
					arr.sort();
					ret = arr[arr.length - 1]
				}
			}
			return ret
		},
		min: function(arr, column) {
			var ret, dataType = column.dataType,
				dateArr, dateO, i;
			if (dataType == "integer" || dataType == "float") {
				ret = Math.min.apply(Math, arr)
			} else {
				if (dataType == "date") {
					i = arr.length;
					dateArr = [];
					while (i--) {
						dateO = arr[i];
						if (dateO) {
							dateArr.push({
								dateO: dateO,
								dateP: Date.parse(dateO)
							})
						}
					}
					dateArr.sort(function(a, b) {
						return a.dateP - b.dateP
					});
					ret = dateArr.length ? dateArr[0].dateO : undefined
				} else {
					arr.sort();
					ret = arr[0]
				}
			}
			return ret
		},
		count: function(arr) {
			return arr.length
		}
	};
	var cGroup = _pq.cGroup = function(that) {
		var self = this;
		self.that = that;
		if (that.options.groupModel.on) {
			self.init()
		}
	};
	var _pGroup = cGroup.prototype;
	_pGroup.init = function() {
		var self = this,
			o, GM, BS, BS_on, base_icon, that;
		if (!self._init) {
			self.mc = [];
			self.tree = [];
			self.summaryData = [];
			that = self.that;
			o = that.options;
			GM = o.groupModel;
			BS = o.bootstrap;
			BS_on = BS.on;
			base_icon = BS_on ? "glyphicon " : "ui-icon ";
			self.groupRemoveIcon = "pq-group-remove " + base_icon + (BS_on ? "glyphicon-remove" : "ui-icon-close");
			self.toggleIcon = "pq-group-toggle " + base_icon;
			that.on("cellClick", self.onCellClick(self)).on("cellKeyDown", self.onCellKeyDown(self, GM)).on(true, "cellMouseDown", self.onCellMouseDown()).on("change", self.onChange(self, GM)).on("dataReady", self.onDataReady(self, that)).on("columnDragDone", self.onColumnDrag(self)).on("columnOrder", self.onColumnOrder(self));
			self._init = true
		}
	};
	_pGroup.onCellClick = function(self) {
		return function(evt, ui) {
			if (ui.rowData.pq_gtitle && $(evt.originalEvent.target).hasClass("pq-group-icon")) {
				self.toggleRow(ui.rowIndxPage, evt)
			}
		}
	};
	_pGroup.onChange = function(self, GM) {
		return function() {
			self.saveState(GM.refreshOnChange)
		}
	};
	_pGroup.onCellMouseDown = function() {
		return function(evt, ui) {
			if (ui.rowData.pq_gtitle && $(evt.originalEvent.target).hasClass("pq-group-icon")) {
				evt.stopImmediatePropagation()
			}
		}
	};
	_pGroup.onCellKeyDown = function(self, GM) {
		return function(evt, ui) {
			if (ui.rowData.pq_gtitle) {
				if ($.inArray(ui.dataIndx, GM.dataIndx) >= 0 && evt.keyCode == $.ui.keyCode.ENTER) {
					self.toggleRow(ui.rowIndxPage, evt);
					return false
				}
			}
		}
	};
	_pGroup.showRows = function() {
		this.that.options.dataModel.data.forEach(function(rd) {
			if (rd.pq_hidden) {
				rd.pq_hidden = undefined
			}
		})
	};
	_pGroup.removeGroup = function(dataIndx) {
		var self = this,
			that = self.that,
			i = 0,
			GM = that.options.groupModel,
			groupIndx = GM.dataIndx;
		for (; i < groupIndx.length; i++) {
			if (dataIndx === groupIndx[i]) {
				groupIndx.splice(i, 1);
				break
			}
		}
		if (!groupIndx.length) {
			self.showRows();
			self.mc.length = 0
		}
		self._triggerChange = true;
		self.refreshFull()
	};
	_pGroup.addGroup = function(dataIndx, indx) {
		var that = this.that,
			GM = that.options.groupModel,
			arr = GM.dataIndx = GM.dataIndx || [];
		if (dataIndx != null && $.inArray(dataIndx, arr) === -1) {
			if (indx == null) {
				arr.push(dataIndx)
			} else {
				arr.splice(indx, 0, dataIndx)
			}
			this._triggerChange = true;
			this.refreshFull()
		}
	};
	_pGroup._initHeadSortable = function() {
		var self = this,
			that = self.that,
			$h = self.$header,
			o = that.options;
		$h.sortable({
			axis: "x",
			distance: 3,
			tolerance: "pointer",
			cancel: ".pq-group-menu",
			stop: self.onSortable(self, o)
		})
	};
	_pGroup.onColumnDrag = function(self) {
		return function(evt, ui) {
			var col = ui.column,
				CM = col.colModel;
			if (CM && CM.length || col.groupable === false) {
				self.acceptDrop = false
			} else {
				self._initHeadDroppable()
			}
		}
	};
	_pGroup._initHeadDroppable = function() {
		var self = this,
			that = self.that,
			$h = self.$header;
		if ($h) {
			$h.droppable({
				accept: function($td) {
					var colIndxDrag = $td.attr("pq-col-indx") * 1;
					if (isNaN(colIndxDrag) || !that.colModel[colIndxDrag]) {
						return
					}
					return self.acceptDrop
				},
				tolerance: "pointer",
				hoverClass: "pq-drop-hover",
				drop: self.onDrop(that, self)
			});
			self.acceptDrop = true
		}
	};
	_pGroup.onDrop = function(that, self) {
		return function(evt, ui) {
			var colIndxDrag = ui.draggable.attr("pq-col-indx") * 1,
				dataIndx = that.colModel[colIndxDrag].dataIndx;
			self.addGroup(dataIndx);
			self.acceptDrop = false
		}
	};
	_pGroup.onSortable = function(self, o) {
		return function() {
			var arr = [],
				GM = o.groupModel,
				GMDataIndx = GM.dataIndx,
				arrDir = [],
				refresh = false,
				$items = $(this).find(".pq-group-item");
			for (var i = 0; i < $items.length; i++) {
				var $item = $($items[i]),
					dataIndx = $item.data("indx"),
					dir = $item.data("dir");
				if (GMDataIndx[i] !== dataIndx) {
					refresh = true
				}
				arr.push(dataIndx);
				arrDir.push(dir)
			}
			if (refresh) {
				GM.dataIndx = arr;
				GM.dir = arrDir;
				self._triggerChange = true;
				self.refreshFull()
			}
		}
	};
	_pGroup._initHeader = function(o, GM) {
		var self = this;
		if (self.$header) {
			var $h = self.$header,
				$items = $h.find(".pq-group-item");
			if ($h.data("uiSortable")) {} else {
				self._initHeadSortable()
			}
			if (!$items.length) {
				$h.append("<span class='pq-group-placeholder'>" + o.strGroup_header + "</span>")
			}
			if (GM.headerMenu) {
				self._initHeaderMenu()
			}
		}
	};
	_pGroup.createHeader = function() {
		var self = this,
			that = self.that,
			$h = self.$header,
			o = that.options,
			BS = o.bootstrap,
			columns = that.columns,
			BS_on = BS.on,
			GM = o.groupModel,
			GMdataIndx = GM.dataIndx,
			len = GMdataIndx.length;
		while (len--) {
			if (columns[GMdataIndx[len]] == null) {
				GMdataIndx.splice(len, 1)
			}
		}
		len = GMdataIndx.length;
		if (GM.header && GM.on) {
			if ($h) {
				$h.empty()
			} else {
				$h = self.$header = $("<div class='pq-group-header ui-helper-clearfix' ></div>").appendTo(that.$top);
				$h.on("click", ".pq-group-item", cGroup.onGroupItemClick(self))
			}
			if (len) {
				var arr = [];
				for (var i = 0; i < len; i++) {
					var dataIndx = GMdataIndx[i],
						column = columns[dataIndx],
						collapsed = GM.collapsed,
						icon = BS_on ? BS.groupModel.icon : GM.icon,
						cicon = collapsed[i] ? icon[1] : icon[0],
						dir = GM.dir[i];
					arr.push("<div tabindex='0' class='pq-group-item' data-indx='", dataIndx, "' data-dir='", dir, "'>", "<span class='", self.toggleIcon, cicon, "' ></span>", column.pqtitle || (typeof column.title == "string" ? column.title : dataIndx), "<span class='", self.groupRemoveIcon, "' ></span></div>")
				}
				$h[0].innerHTML = arr.join("")
			}
			self._initHeader(o, GM)
		} else {
			if ($h) {
				$h.remove();
				self.$header = null
			}
		}
	};
	cGroup.onGroupItemClick = function(self) {
		return function(evt) {
			var $target = $(evt.target),
				dataIndx = $(this).data("indx");
			if ($target.hasClass("pq-group-remove")) {
				self.removeGroup(dataIndx)
			} else {
				self.toggleLevel(dataIndx, evt)
			}
		}
	};

	function tmpl(arr, GM, option, o) {
		arr.push("<li data-option='", option, "' class='pq-menu-item'>", "<label>", "<input type='checkbox' ", GM[option] ? "checked" : "", "/>", o["strGroup_" + option], "</label></li>")
	}
	_pGroup._initHeaderMenu = function() {
		var self = this,
			that = self.that,
			BS_on = that.BS_on,
			o = that.options,
			$h = self.$header,
			arr = ["<ul class='pq-group-menu'><li>", BS_on ? "<span class='glyphicon glyphicon-chevron-left'></span>" : "", "<ul>"],
			GM = o.groupModel,
			menuItems = GM.menuItems,
			$menu;
		for (var i = 0, len = menuItems.length; i < len; i++) {
			tmpl(arr, GM, menuItems[i], o)
		}
		arr.push("</ul></li></ul>");
		$menu = $(arr.join("")).appendTo($h);
		$menu.menu({
			icons: {
				submenu: "ui-icon-carat-1-w"
			},
			position: {
				my: "right top",
				at: "left top"
			}
		});
		$menu.change(function(evt) {
			if (evt.target.nodeName == "INPUT") {
				var $target = $(evt.target),
					option = $target.closest("li").data("option"),
					ui = {};
				ui[option] = !o.groupModel[option];
				that.groupOption(ui)
			}
		})
	};
	_pGroup.setOption = function() {
		var self = this;
		if (self._init) {
			self.refreshColumns();
			self.summaryData.length = 0;
			self.tree.length = 0;
			self._initmerge()
		}
	};
	_pGroup.onDataReady = function(self, that) {
		return function() {
			self.tree.length = 0;
			var GM = that.options.groupModel,
				GMLen = GM.dataIndx.length;
			if (GM.on) {
				if (GMLen || GM.grandSummary) {
					self._groupData();
					self.refreshColumns();
					if (GMLen) {
						self._initcollapsed();
						self._initmerge()
					}
				}
			}
			self.createHeader()
		}
	};
	_pGroup.onColumnOrder = function(self) {
		return function() {
			self._initmerge()
		}
	};
	_pGroup.toggleLevel = function(dataIndx, evt) {
		var GM = this.that.options.groupModel,
			collapsed = GM.collapsed,
			level = $.inArray(dataIndx, GM.dataIndx),
			all = evt.ctrlKey ? "All" : "",
			close = collapsed[level];
		this[(close ? "expand" : "collapse") + all](level)
	};

	function findOffset(tree, l, rip, indx) {
		var _tree = tree[l],
			ripT, i = indx;
		if (!_tree) {
			return
		}
		do {
			ripT = _tree[i].rip;
			i++
		} while (ripT < rip);
		return i - 1
	}
	_pGroup.collapseTo = function(address) {
		this.expandTo(address, true)
	};
	_pGroup.expandTo = function(address, _close) {
		var that = this.that,
			close = !!_close,
			indices = address.split(","),
			len = indices.length,
			tree = this.tree,
			rip, rd, rdFinal, offset = 0,
			node, indx, data = that.pdata;
		if (len > tree.length) {
			return
		}
		for (var l = 0; l < len; l++) {
			indx = indices[l] * 1 + offset;
			node = tree[l][indx];
			if (!node) {
				if (l == 0) {
					return
				}
				break
			}
			rip = node.rip;
			if (!close || close && l == len - 1) {
				rd = data[rip];
				if (rd.pq_close != close) {
					rdFinal = rd;
					rd.pq_close = close
				}
			}
			offset = findOffset(tree, l + 1, rip, indx)
		}
		if (rdFinal) {
			if (that._trigger("group", null, {
					indx: indx,
					close: close
				}) !== false) {
				this.saveState(true)
			}
		}
	};
	_pGroup._editorSummary = function(o, GM) {
		var map = o.summaryOptions,
			self = this;
		return function(ui) {
			var rd = ui.rowData;
			if (rd.pq_gsummary || rd.pq_gtitle) {
				var _aggr = pq.aggregate,
					column = ui.column,
					csummary = column.summary,
					cs_edit = csummary ? csummary.edit : null,
					inArray, dt = column.dataType,
					allow, arr = [""];
				if ($.inArray(ui.dataIndx, GM.dataIndx) > -1) {
					return false
				}
				if (!GM.summaryEdit && !cs_edit || cs_edit === false) {
					return false
				}
				if (dt == "integer" || dt == "float") {
					dt = "number"
				} else {
					if (dt !== "date") {
						dt = "string"
					}
				}
				allow = map[dt].split(",");
				inArray = $.inArray;
				for (var key in _aggr) {
					if (inArray(key, allow) > -1) {
						arr.push(key)
					}
				}
				if (arr.length == 1) {
					return false
				}
				return {
					type: "select",
					prepend: GM.prepend,
					options: GM.options || arr,
					valueIndx: GM.valueIndx,
					labelIndx: GM.labelIndx,
					init: GM.init || self._editorInit,
					getData: GM.getData || self._editorGetData
				}
			}
		}
	};
	_pGroup._editorInit = function(ui) {
		var summary = ui.column.summary,
			type;
		if (!summary) {
			summary = ui.column.summary = {}
		}
		type = summary.type;
		ui.$cell.find("select").val(type)
	};
	_pGroup._editorGetData = function(ui) {
		var column = ui.column,
			dt = column.dataType,
			val = ui.$cell.find("select").val();
		column.summary.type = val;
		this.one("beforeValidate", function(evt, ui) {
			ui.allowInvalid = true;
			ui.track = false;
			ui.history = false;
			column.dataType = "string";
			this.one(true, "change", function(evt, ui) {
				column.dataType = dt
			})
		});
		return val
	};
	_pGroup._renderTitle = function(o, GM) {
		var that = this.that,
			BS = o.bootstrap,
			bts_on = BS.on,
			icon = bts_on ? BS.groupModel.icon : GM.icon,
			icons = bts_on ? ["glyphicon " + icon[0], "glyphicon " + icon[1]] : ["ui-icon " + icon[0], "ui-icon " + icon[1]];
		return function(ui) {
			var rd = ui.rowData,
				collapsed, level, title, indx;
			if (rd.pq_gtitle && ui.cellData != null) {
				collapsed = rd.pq_close;
				level = rd.pq_level;
				title = GM.title;
				title = title[level] || GM.titleDefault;
				title = typeof title === "function" ? title.call(that, ui) : title.replace("{0}", ui.cellData).replace("{1}", rd.pq_items);
				indx = collapsed ? 1 : 0;
				return {
					text: (ui.Export ? "" : "<span class='pq-group-icon " + icons[indx] + "'></span>") + title,
					cls: "pq-group-title-cell",
					style: "text-align:left;"
				}
			}
		}
	};
	_pGroup._renderSummary = function(o) {
		var that = this.that;
		return function(ui) {
			var rd = ui.rowData,
				val, column, type, title;
			if (rd.pq_gsummary || rd.pq_gtitle) {
				column = ui.column;
				type = column.summary.type;
				title = o.summaryTitle[type];
				if (typeof title == "function") {
					return title.call(that, ui)
				} else {
					val = ui.formatVal;
					if (val == null) {
						val = ui.cellData;
						val = val == null ? "" : val
					}
					if (typeof val == "number" && !column.format && parseInt(val) !== val) {
						val = val.toFixed(2)
					}
					if (title) {
						return title.replace("{0}", val)
					} else {
						return val
					}
				}
			}
		}
	};
	_pGroup.refreshColumns = function() {
		var that = this.that,
			o = that.options,
			GM = o.groupModel,
			GM_on = GM.on,
			fixCols = GM.fixCols,
			renderTitle, renderSummary, _render, column, csummary, csummaryType, groupIndx = GM.dataIndx,
			groupIndxLen = groupIndx.length,
			colIndx, CM = that.colModel,
			i = CM.length;
		while (i--) {
			column = CM[i];
			if (_render = column._render) {
				if (_render == column._renderGT) {
					delete column._renderGT;
					delete column._render
				} else {
					if (_render == column._renderGS) {
						delete column._renderGS;
						delete column._render
					}
				}
			}
			if (column._nodrag) {
				delete column._nodrag;
				delete column._nodrop
			}
			if (GM_on && (csummary = column.summary) && (csummaryType = csummary.type)) {
				renderSummary = renderSummary || this._renderSummary(o);
				column._render = column._renderGS = renderSummary
			}
		}
		o.geditor = GM_on ? this._editorSummary(o, GM) : undefined;
		if (GM_on) {
			for (i = groupIndxLen - 1; i >= 0; i--) {
				column = that.getColumn({
					dataIndx: groupIndx[i]
				});
				renderTitle = renderTitle || this._renderTitle(o, GM);
				column._renderGT = column._render = renderTitle
			}
		}
		if (fixCols && GM_on) {
			for (i = 0; i < groupIndxLen; i++) {
				colIndx = that.getColIndx({
					dataIndx: groupIndx[i]
				});
				column = CM[colIndx];
				column._nodrag = column._nodrop = true;
				if (colIndx != i) {
					that.iDragColumns.moveColumn(colIndx, i, true);
					that.iColModel.init()
				}
			}
		}
	};
	_pGroup.refreshFull = function() {
		var that = this.that;
		this.refreshColumns();
		if (this._triggerChange) {
			that._trigger("groupChange");
			this._triggerChange = false
		}
		that.refreshView()
	};
	_pGroup.refreshView = function() {
		this.that.refreshView()
	};
	_pGroup.collapseAll = function(level) {
		this.expandAll(level, true)
	};
	_pGroup.expandAll = function(level, close) {
		if (this.trigger({
				all: true,
				close: !!close,
				level: level || 0
			}) !== false) {
			this.that.refreshView()
		}
	};
	_pGroup.collapse = function(level) {
		this.expand(level, true)
	};
	_pGroup.expand = function(level, close) {
		if (this.trigger({
				close: !!close,
				level: level || 0
			}) !== false) {
			this.that.refreshView();
		}
	};
	_pGroup.showHideRows = function(initIndx, level, GM) {
		var that = this.that,
			rd, hide = true,
			data = that.pdata;
		for (var i = initIndx, len = data.length; i < len; i++) {
			rd = data[i];
			if (rd.pq_gsummary) {
				if (GM.merge || GM.summaryInTitleRow) {
					if (rd.pq_level >= level) {
						rd.pq_hidden = hide
					}
				} else {
					if (rd.pq_level > level) {
						rd.pq_hidden = hide
					}
				}
			} else {
				if (rd.pq_gtitle) {
					if (rd.pq_level <= level) {
						break
					} else {
						rd.pq_hidden = hide
					}
				} else {
					rd.pq_hidden = hide
				}
			}
		}
	};
	cGroup.beforeTrigger = function(evt, that) {
		return function(state) {
			return that._trigger("beforeGroupExpand", evt, state) === false
		}
	};
	_pGroup.trigger = function(ui) {
		var evt = ui.evt,
			rd = ui.rd,
			_level = ui.level,
			all = ui.all,
			close = ui.close,
			that = this.that,
			level, di, val, i, GM = that.options.groupModel,
			groupIndx = GM.dataIndx,
			collapsed = GM.collapsed,
			_before = cGroup.beforeTrigger(evt, that),
			state = {};
		if (rd) {
			level = rd.pq_level;
			di = groupIndx[level], val = rd[di];
			close = !rd.pq_close;
			state = {
				level: level,
				close: close,
				group: val
			};
			if (_before(state)) {
				return false
			}
			rd.pq_close = close
		} else {
			if (all) {
				state = {
					all: true,
					close: close,
					level: _level
				};
				if (_before(state)) {
					return false
				}
				for (i = _level; i < groupIndx.length; i++) {
					collapsed[i] = close
				}
			} else {
				if (_level != null) {
					state = {
						level: _level,
						close: close
					};
					if (_before(state)) {
						return false
					}
					collapsed[_level] = close
				}
			}
		}
		return that._trigger("group", null, state)
	};
	_pGroup.toggleRow = function(rip, evt) {
		var that = this.that,
			pdata = that.pdata,
			rd = pdata[rip];
		if (this.trigger({
				evt: evt,
				rd: rd
			}) !== false) {
			this.saveState(true)
		}
	};
	_pGroup.saveState = function(refresh) {
		var that = this.that,
			GM = that.options.groupModel;
		if (GM.on && GM.dataIndx.length) {
			var pdata = that.pdata,
				len = pdata.length,
				ndata = new Array(len),
				i = 0;
			for (; i < len; i++) {
				ndata[i] = pdata[i]
			}
			this.pdata = ndata;
			if (refresh) {
				that.refreshView()
			}
		}
	};
	_pGroup._initmerge = function() {
		var that = this.that,
			o = that.options,
			GM = o.groupModel,
			GMdataIndx = GM.dataIndx,
			colIndxs = that.colIndxs,
			merge = GM.merge,
			summaryInTitleRow, tree = this.tree,
			offset = that.rowIndxOffset,
			_tree, node, ci, rip, rip2, items, ri, rd, CMLength = that.colModel.length,
			mc = [],
			pdata = that.pdata;
		for (var lev = 0; lev < tree.length; lev++) {
			_tree = tree[lev];
			ci = colIndxs[GMdataIndx[lev]];
			for (var i = 0, len = _tree.length; i < len; i++) {
				node = _tree[i];
				rip = node.rip;
				if (rip == null) {
					break
				}
				if (merge) {
					rip2 = node.rip2;
					items = rip2 - rip;
					ri = rip + offset;
					mc.push({
						r1: ri,
						rc: items,
						c1: ci,
						cc: 1
					})
				} else {
					ri = rip + offset;
					rd = pdata[rip];
					summaryInTitleRow = GM.summaryInTitleRow;
					if (!summaryInTitleRow || !rd.pq_close && summaryInTitleRow === "collapsed") {
						mc.push({
							r1: ri,
							rc: 1,
							c1: ci,
							cc: CMLength - ci
						})
					}
				}
			}
		}
		if (mc.length) {
			this.mc = o.mergeCells = mc;
			that.iMerge.init()
		} else {
			if (this.mc.length) {
				this.mc.length = 0;
				that.iMerge.init()
			}
		}
	};
	_pGroup._initcollapsed = function() {
		var that = this.that,
			GM = that.options.groupModel,
			merge = GM.merge,
			o_pdata = this.pdata,
			pdata = that.pdata,
			rowData, pq_gtitle, o_rd, o_collapsed, level, collapsed;
		if (!pdata) {
			return
		}
		for (var i = 0, len = pdata.length; i < len; i++) {
			rowData = pdata[i];
			pq_gtitle = rowData.pq_gtitle;
			if (pq_gtitle !== undefined) {
				level = rowData.pq_level;
				collapsed = null;
				if (o_pdata) {
					o_rd = o_pdata[i];
					o_collapsed = o_rd ? o_rd.pq_close : null;
					if (o_collapsed != null) {
						collapsed = rowData.pq_close = o_collapsed
					}
				}
				if (collapsed == null) {
					collapsed = rowData.pq_close
				}
				if (collapsed) {
					this.showHideRows(i + 1, level, GM)
				} else {
					if (merge) {
						rowData.pq_hidden = true
					}
				}
			}
		}
		delete this.pdata
	};
	_pGroup.setSumCols = function(GMdataIndx) {
		var inArray = $.inArray,
			sumCols = [],
			sumDIs = [];
		this.that.colModel.forEach(function(column) {
			var summary = column.summary,
				di;
			if (summary && summary.type) {
				di = column.dataIndx;
				if (inArray(di, GMdataIndx) === -1) {
					sumCols.push(column);
					sumDIs.push(di)
				}
			}
		});
		this._sumCols = sumCols;
		this._sumDIs = sumDIs;
		return [sumCols, sumDIs]
	};
	_pGroup.getSumCols = function() {
		return this._sumCols
	};
	_pGroup.getSumDIs = function() {
		return this._sumDIs
	};
	_pGroup.group = function(getVal) {
		return function group(data, di, column) {
			var obj = {},
				arr = [];
			data.forEach(function(rd) {
				rd.pq_hidden = undefined;
				var title = getVal(rd, di, column),
					indx = obj[title];
				if (indx == null) {
					obj[title] = indx = arr.length;
					arr[indx] = [title, []]
				}
				arr[indx][1].push(rd)
			});
			return arr
		}
	};
	_pGroup.summary = function(sumCols, sumDIs) {
		var pq_aggr = pq.aggregate,
			stype = sumCols.map(function(col) {
				return col.summary.type
			});
		return function summary(arr2, titleRow, summaryRow) {
			sumDIs.forEach(function(di, i) {
				var cells = [],
					summaryCell;
				arr2.forEach(function(rd, j) {
					cells[j] = rd[di]
				});
				summaryCell = pq_aggr[stype[i]](cells, sumCols[i]);
				titleRow[di] = summaryCell;
				summaryRow && (summaryRow[di] = summaryCell)
			})
		}
	};
	_pGroup.flatten = function(columns, group, GM, summary) {
		var GMDataIndx = GM.dataIndx,
			concat = this.concat(),
			tree = this.tree = [],
			GMLen = GMDataIndx.length,
			ndata = [];
		return function flatten(data, _level, parent) {
			if (!GMLen) {
				return data
			}
			var level = _level || 0,
				di = GMDataIndx[level],
				collapsed = GM.collapsed[level],
				calcSummary = GM.calcSummary[level] !== false,
				showSummary = GM.showSummary[level],
				_tree = tree[level] = tree[level] || [],
				arr = group(data, di, columns[di]);
			arr.forEach(function(_arr) {
				var titleRow, arr2 = _arr[1],
					summaryRow = showSummary ? {
						pq_gsummary: true,
						pq_level: level,
						pq_rowcls: "pq-summary-row"
					} : 0,
					items = arr2.length,
					rip = ndata.length;
				titleRow = {
					pq_gtitle: true,
					pq_level: level,
					pq_close: collapsed,
					pq_items: items,
					pq_children: []
				};
				titleRow[di] = _arr[0];
				ndata.push(titleRow);
				parent && parent.push(titleRow);
				calcSummary && summary(arr2, titleRow, summaryRow);
				if (level + 1 < GMLen) {
					flatten(arr2, level + 1, titleRow.pq_children)
				} else {
					ndata = concat(ndata, arr2, titleRow)
				}
				summaryRow && ndata.push(summaryRow);
				_tree.push({
					rip: rip,
					rip2: ndata.length
				})
			});
			return ndata
		}
	};
	_pGroup.concat = function() {
		return function concat(ndata, arr2, titleRow) {
			arr2.forEach(function(rd) {
				ndata.push(rd)
			});
			titleRow.pq_children = arr2;
			return ndata
		}
	};
	_pGroup._getVal = function(ignoreCase) {
		var trim = $.trim;
		return function(rd, dataIndx, column) {
			var val = rd[dataIndx],
				chg = column.groupChange;
			if (chg) {
				chg = pq.getFn(chg);
				return chg(val)
			} else {
				val = trim(val);
				return ignoreCase ? val.toUpperCase() : val
			}
		}
	};
	_pGroup._groupData = function() {
		var self = this,
			that = self.that,
			o = that.options,
			GM = o.groupModel,
			getVal = self._getVal(GM.ignoreCase),
			GMdataIndx = GM.dataIndx,
			pdata = that.pdata,
			columns = that.columns,
			arr = this.setSumCols(GMdataIndx),
			summaryFn = this.summary(arr[0], arr[1]);
		if (GM.grandSummary) {
			var grandSummaryRow = {
				pq_grandsummary: true,
				pq_gsummary: true
			};
			summaryFn(pdata, grandSummaryRow);
			self.summaryData = o.summaryData = [grandSummaryRow]
		} else {
			self.summaryData.length = 0
		}
		that.pdata = this.flatten(columns, this.group(getVal), GM, summaryFn)(pdata)
	};
	var fn = _pq.pqGrid.prototype;
	fn.group = function(ui) {
		var iGV = this.iGroup;
		if (ui == null) {
			return iGV
		} else {
			iGV.expandTo(ui.indx)
		}
	};
	fn.groupOption = function(ui, refresh) {
		var di = ui.dataIndx,
			diLength = di ? di.length : 0,
			iGV = this.iGroup,
			o = this.options,
			GM = o.groupModel,
			GMdataIndx = GM.dataIndx,
			on = ui.on || ui.on == null && GM.on;
		if (on) {
			iGV.init()
		}
		if (GM.on && GMdataIndx.length && (ui.on === false || diLength === 0)) {
			iGV.showRows()
		}
		$.extend(GM, ui);
		iGV.setOption();
		if (refresh !== false) {
			this.refreshView()
		}
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery;
	$(document).on("pqGrid:bootup", function(evt, ui) {
		new cScroll(ui.instance)
	});
	var cScroll = _pq.cScroll = function(that) {
		var self = this,
			$doc = $(document),
			ns = ".pqgrid-csroll";
		self.that = that;
		that.one("refresh", self.oneRefresh(that, self, $doc, ns))
	};
	_pq.cScroll = cScroll;
	var _p = cScroll.prototype;
	_p.oneRefresh = function(that, self, $doc, ns) {
		return function() {
			that.$cont.on("mousedown", function(evt) {
				if (!$(evt.target).closest(".pq-sb").length) {
					$doc.on("mousemove" + ns, function(evt) {
						self.onMouseDrag(evt)
					});
					$doc.on("mouseup" + ns, function() {
						$doc.off(ns)
					})
				}
			})
		}
	};
	_p.onMouseDrag = function(evt) {
		var self = this,
			that = self.that,
			$cont = that.$cont,
			cont_ht = $cont[0].offsetHeight,
			cont_wd = $cont[0].offsetWidth,
			off = $cont.offset(),
			cont_top = off.top,
			cont_left = off.left,
			cont_bot = cont_top + cont_ht,
			cont_right = cont_left + cont_wd,
			pageY = evt.pageY,
			pageX = evt.pageX,
			diffY = pageY - cont_bot,
			diffX = pageX - cont_right,
			diffY2 = cont_top - pageY,
			diffX2 = cont_left - pageX;
		if (pageX > cont_left && pageX < cont_right && (diffY > 0 || diffY2 > 0)) {
			if (diffY > 0) {
				self.scrollV(diffY, true)
			} else {
				if (diffY2 > 0) {
					self.scrollV(diffY2)
				}
			}
		} else {
			if (pageY > cont_top && pageY < cont_bot) {
				if (diffX > 0) {
					self.scrollH(diffX, true)
				} else {
					if (diffX2 > 0) {
						self.scrollH(diffX2)
					}
				}
			}
		}
	};
	_p.scrollH = function(diff, down) {
		var self = this,
			virtualX = self.that.options.virtualX;
		self[virtualX ? "scrollVirtual" : "scrollNV"](diff, down, true)
	};
	_p.scrollV = function(diff, down) {
		var self = this,
			virtualY = self.that.options.virtualY;
		self[virtualY ? "scrollVirtual" : "scrollNV"](diff, down)
	};
	_p.scrollVirtual = function(diff, down, x) {
		var that = this.that,
			scrollBar = x ? that.hscrollbar() : that.vscrollbar(),
			options = scrollBar.options,
			cur_pos = options.cur_pos,
			num_eles = options.num_eles,
			pow = Math.ceil(diff / 10),
			incr = Math.pow(5, pow - 1) * (down ? 1 : -1),
			cur_pos = cur_pos + incr;
		if (cur_pos < 0) {
			cur_pos = 0
		} else {
			if (cur_pos >= num_eles) {
				cur_pos = num_eles - 1
			}
		}
		scrollBar.option("cur_pos", cur_pos).scroll()
	};
	_p.scrollNV = function(diff, down, x) {
		var that = this.that,
			tbl = that.$tbl[0],
			ht = tbl[x ? "offsetWidth" : "offsetHeight"],
			scrollBar = x ? that.hscrollbar() : that.vscrollbar(),
			options = scrollBar.options,
			ratio = options.ratio,
			pos = ratio * ht,
			pos2 = pos + (down ? diff : -diff),
			ratio2 = pos2 / ht;
		if (ratio2 > 1) {
			ratio2 = 1
		} else {
			if (ratio2 < 0) {
				ratio2 = 0
			}
		}
		scrollBar.option("ratio", ratio2).drag()
	}
})(jQuery);
(function($) {
	var _pq = $.paramquery;
	$(document).on("pqGrid:bootup", function(evt, ui) {
		var grid = ui.instance;
		grid.iFillHandle = new cFillHandle(grid)
	});
	_pq.pqGrid.defaults.fillHandle = "all";
	_pq.pqGrid.defaults.autofill = true;
	var cFillHandle = _pq.cFillHandle = function(that) {
		var self = this;
		self.$wrap;
		self.locked;
		self.sel;
		self.that = that;
		that.on("selectChange", self.onSelectChange(self)).on("selectEnd", self.onSelectEnd(self)).on("refresh refreshRow", self.onRefresh(self))
	};
	var _p = cFillHandle.prototype;
	_p.onSelectChange = function(self) {
		return function() {
			this.options.fillHandle && self.create()
		}
	};
	_p.onSelectEnd = function(self) {
		return function() {
			if (this.options.fillHandle) {
				self.setDraggable();
				self.setDoubleClickable()
			}
		}
	};
	_p.onRefresh = function(self) {
		var id;
		return function() {
			if (this.options.fillHandle) {
				clearTimeout(id);
				id = setTimeout(function() {
					if (self.that.element) {
						self.create();
						self.setDraggable()
					}
				}, 300)
			}
		}
	};
	_p.remove = function() {
		var $wrap = this.$wrap;
		$wrap && $wrap.remove()
	};
	_p.create = function() {
		var self = this;
		if (self.locked) {
			return
		}
		self.remove();
		var that = self.that,
			area = that.selection().address();
		if (area.length !== 1) {
			return
		}
		var area = area[0],
			r2 = area.r2,
			c2 = area.c2,
			ui = {
				rowIndx: r2,
				colIndx: c2
			},
			iM = that.iMerge,
			isMerged = iM.ismergedCell(r2, c2),
			uiM_a = isMerged ? iM.getRootCell(r2, c2, "a") : ui,
			$td = that.getCell(uiM_a);
		if (!$td.length) {
			return
		}
		if (that._trigger("beforeFillHandle", null, that.normalize(uiM_a)) !== false) {
			var td = $td[0],
				$cont = $td.closest(".pq-grid-cont-inner"),
				cont = $cont[0],
				topCont = cont.offsetTop,
				leftCont = cont.offsetLeft,
				left = td.offsetLeft + td.offsetWidth - 8 - leftCont,
				top = td.offsetTop + td.offsetHeight - 8 - topCont,
				$wrap = $("<div class='pq-fill-handle'></div>").appendTo($cont);
			$wrap.css({
				position: "absolute",
				top: top,
				left: left,
				height: 10,
				width: 10,
				background: "#333",
				cursor: "crosshair",
				border: "2px solid #fff"
			});
			self.$wrap = $wrap
		}
	};
	_p.setDoubleClickable = function() {
		var self = this,
			$wrap = self.$wrap;
		$wrap && $wrap.on("dblclick", self.onDblClick(self.that, self))
	};
	_p.setDraggable = function() {
		var self = this,
			$wrap = self.$wrap,
			$cont = self.that.$cont;
		$wrap && $wrap.draggable({
			helper: function() {
				return "<div style='height:10px;width:10px;cursor:crosshair;'></div>"
			},
			appendTo: $cont,
			start: function() {
				self.onStart()
			},
			drag: function(evt) {
				self.onDrag(evt)
			},
			stop: function() {
				self.onStop()
			}
		})
	};
	_p.patternDate = function(a, fillUp) {
		var self = this;
		return function(x) {
			var dateObj = new Date(a);
			dateObj.setDate(dateObj.getDate() + (fillUp ? 1 - x : x - 1));
			return self.formatDate(dateObj)
		}
	};
	_p.formatDate = function(dateObj) {
		return dateObj.getMonth() + 1 + "/" + dateObj.getDate() + "/" + dateObj.getFullYear()
	};
	_p.patternDate2 = function(c0, c1) {
		var d0 = new Date(c0),
			d1 = new Date(c1),
			diff, self = this,
			incrDate = d1.getDate() - d0.getDate(),
			incrMonth = d1.getMonth() - d0.getMonth(),
			incrYear = d1.getFullYear() - d0.getFullYear();
		if (!incrMonth && !incrYear || !incrDate && !incrMonth || !incrYear && !incrDate) {
			return function(x) {
				var dateObj = new Date(c0);
				if (incrDate) {
					dateObj.setDate(dateObj.getDate() + incrDate * (x - 1))
				} else {
					if (incrMonth) {
						dateObj.setMonth(dateObj.getMonth() + incrMonth * (x - 1))
					} else {
						dateObj.setFullYear(dateObj.getFullYear() + incrYear * (x - 1))
					}
				}
				return self.formatDate(dateObj)
			}
		}
		d0 = Date.parse(d0);
		diff = Date.parse(d1) - d0;
		return function(x) {
			var dateObj = new Date(d0 + diff * (x - 1));
			return self.formatDate(dateObj)
		}
	};
	_p.pattern = function(cells, dt, fillUp) {
		var a, b, c, len = cells.length,
			date = dt === "date";
		if (len === 1) {
			a = cells[0];
			return date ? this.patternDate(a, fillUp) : function(x) {
				return a + (fillUp ? 1 - x : x - 1)
			}
		}
		if (len === 2) {
			if (date) {
				return this.patternDate2(cells[0], cells[1])
			}
			a = cells[1] - cells[0];
			b = cells[0] - a;
			return function(x) {
				return a * x + b
			}
		}
		if (len === 3) {
			a = (cells[2] - 2 * cells[1] + cells[0]) / 2;
			b = cells[1] - cells[0] - 3 * a;
			c = cells[0] - a - b;
			return function(x) {
				return a * x * x + b * x + c
			}
		}
		return false
	};
	_p.autofillVal = function(sel1, sel2, patternArr) {
		var that = this.that,
			r1 = sel1.r1,
			c1 = sel1.c1,
			r2 = sel1.r2,
			c2 = sel1.c2,
			r22 = sel2.r2,
			r21 = sel2.r1,
			val = [],
			vali, k, i, j, sel3, x, ii = 0;
		if (r21 < r1) {
			x = r22 - r21 + 2;
			for (i = r21; i <= r1 - 1; i++) {
				vali = val[ii++] = [];
				x--;
				k = 0;
				for (j = c1; j <= c2; j++) {
					vali[k] = patternArr[k](x);
					k++
				}
			}
			sel3 = {
				r1: r21,
				r2: r1 - 1,
				c1: c1,
				c2: c2
			}
		} else {
			if (r22 > r2) {
				x = r2 - r1 + 1;
				for (i = r2 + 1; i <= r22; i++) {
					vali = val[ii++] = [];
					x++;
					k = 0;
					for (j = c1; j <= c2; j++) {
						vali[k] = patternArr[k](x);
						k++
					}
				}
				sel3 = {
					r1: r2 + 1,
					r2: r22,
					c1: c1,
					c2: c2
				}
			}
		}
		sel3 && that.range(sel3).value(val);
		return true
	};
	_p.autofill = function(sel1, sel2) {
		var that = this.that,
			CM = that.colModel,
			col, dt, cells, di, i, j, data = that.get_p_data(),
			pattern, patternArr = [],
			r1 = sel1.r1,
			c1 = sel1.c1,
			r2 = sel1.r2,
			c2 = sel1.c2,
			fillUp = sel2.r1 < r1;
		if (sel2.c1 != c1 || sel2.c2 != c2) {
			return
		}
		for (j = c1; j <= c2; j++) {
			col = CM[j];
			dt = col.dataType;
			if (!(dt == "date" || dt == "integer" || dt == "float")) {
				return
			}
			di = col.dataIndx;
			cells = [];
			if (fillUp) {
				for (i = r2; i >= r1; i--) {
					cells.push(data[i][di])
				}
			} else {
				for (i = r1; i <= r2; i++) {
					cells.push(data[i][di])
				}
			}
			if (pattern = this.pattern(cells, dt, fillUp)) {
				patternArr.push(pattern)
			} else {
				return
			}
		}
		return this.autofillVal(sel1, sel2, patternArr)
	};
	_p.onStop = function() {
		var self = this,
			that = self.that,
			autofill = that.options.autofill,
			sel1 = self.sel,
			sel2 = that.selection().address()[0];
		self.locked = false;
		if (!(autofill && self.autofill(sel1, sel2))) {
			that.range(sel1).copy({
				dest: sel2
			})
		}
	};
	_p.onStart = function() {
		this.locked = true;
		this.sel = this.that.selection().address()[0]
	};
	_p.onDrag = function(evt) {
		var self = this,
			that = self.that,
			fillHandle = that.options.fillHandle,
			all = fillHandle == "all",
			hor = all || fillHandle == "horizontal",
			vert = all || fillHandle == "vertical",
			x = evt.clientX - 10,
			y = evt.clientY,
			ele = document.elementFromPoint(x, y),
			$td = $(ele).closest(".pq-grid-cell");
		if ($td.length) {
			var cord = that.getCellIndices({
					$td: $td
				}),
				sel = self.sel,
				r1 = sel.r1,
				c1 = sel.c1,
				r2 = sel.r2,
				c2 = sel.c2,
				range = {
					r1: r1,
					c1: c1,
					r2: r2,
					c2: c2
				},
				update = function(key, val) {
					range[key] = val;
					that.range(range).select()
				},
				ri = cord.rowIndx,
				ci = cord.colIndx;
			if (all && ri <= r2 && ri >= r1 || hor && !vert) {
				if (ci > c2) {
					update("c2", ci)
				} else {
					if (ci < c1) {
						update("c1", ci)
					}
				}
			} else {
				if (vert) {
					if (ri > r2) {
						update("r2", ri)
					} else {
						if (ri < r1) {
							update("r1", ri)
						}
					}
				}
			}
		}
	};
	_p.onDblClick = function(that, self) {
		return function() {
			var o = that.options,
				fillHandle = o.fillHandle;
			if (fillHandle == "all" || fillHandle == "vertical") {
				var sel = that.selection().address()[0],
					rd, c2 = sel.c2,
					ri = sel.r2 + 1,
					data = o.dataModel.data,
					di = that.getColModel()[c2].dataIndx;
				while (rd = data[ri]) {
					if (rd[di] == null || rd[di] === "") {
						ri++
					} else {
						ri--;
						break
					}
				}
				self.onStart();
				that.range({
					r1: sel.r1,
					c1: sel.c1,
					r2: ri,
					c2: c2
				}).select();
				self.onStop()
			}
		}
	}
})(jQuery);