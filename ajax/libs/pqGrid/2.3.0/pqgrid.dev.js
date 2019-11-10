/**
 * ParamQuery Pro v2.3.0
 *
 * Copyright (c) 2012-2017 Paramvir Dhindsa (http://paramquery.com)
 * Released under GPL v3 license
 * http://paramquery.com/license
 *
 */
(function($) {
	var pq = $.paramquery = $.paramquery || {};
	$.paramquery.pqgrid = $.paramquery.pqgrid || {};
	pq.xmlToArray = function(data, obj) {
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
	pq.xmlToJson = function(data, obj) {
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
	pq.tableToArray = function(tbl) {
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
	pq.formatCurrency = function(val) {
		if (isNaN(val)) {
			return val
		}
		val = Math.round(val * 10) / 10;
		val = val + "";
		if (val.indexOf(".") == -1) {
			val = val + ".0"
		}
		var len = val.length;
		var fp = val.substring(0, len - 2),
			lp = val.substring(len - 2, len),
			arr = fp.match(/\d/g).reverse(),
			arr2 = [];
		for (var i = 0; i < arr.length; i++) {
			if (i > 0 && i % 3 == 0) {
				arr2.push(",")
			}
			arr2.push(arr[i])
		}
		arr2 = arr2.reverse();
		fp = arr2.join("");
		return fp + lp
	};
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
	}
})(jQuery);
(function($) {
	var fnPG = {};
	fnPG.options = {
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
	fnPG._create = function() {
		var that = this,
			options = this.options;
		this.element.addClass("pq-pager");
		this.first = $("<button type='button' title='" + options.strFirstPage + "'></button>", {}).appendTo(this.element).button({
			icons: {
				primary: "ui-icon-seek-first"
			},
			text: false
		}).bind("click.paramquery", function(evt) {
			if (that.options.curPage > 1) {
				that._onChange(evt, 1)
			}
		});
		this.prev = $("<button type='button' title='" + options.strPrevPage + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-seek-prev"
			},
			text: false
		}).bind("click", function(evt) {
			if (that.options.curPage > 1) {
				var curPage = that.options.curPage - 1;
				that._onChange(evt, curPage)
			}
		});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.pageHolder = $("<span class='pq-page-placeholder'></span>").appendTo(this.element);
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.next = $("<button type='button' title='" + this.options.strNextPage + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-seek-next"
			},
			text: false
		}).bind("click", function(evt) {
			var val = that.options.curPage + 1;
			that._onChange(evt, val)
		});
		this.last = $("<button type='button' title='" + this.options.strLastPage + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-seek-end"
			},
			text: false
		}).bind("click", function(evt) {
			var val = that.options.totalPages;
			that._onChange(evt, val)
		});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.rPPHolder = $("<span class='pq-page-placeholder'></span>").appendTo(this.element);
		this.$refresh = $("<button type='button' title='" + this.options.strRefresh + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-refresh"
			},
			text: false
		}).bind("click", function(evt) {
			if (that._trigger("beforeRefresh", evt) === false) {
				return false
			}
			that._trigger("refresh", evt)
		});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.$msg = $("<span class='pq-pager-msg'></span>").appendTo(this.element);
		this._refresh()
	};
	fnPG._refreshPage = function() {
		var that = this;
		this.pageHolder.empty();
		var options = this.options,
			strPage = options.strPage,
			arr = strPage.split(" "),
			str = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			var ele = arr[i];
			if (ele == "{0}") {
				str.push("<input type='text' tabindex='0' class='ui-corner-all' />")
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
		this.page = $temp.filter("input").bind("change", function(evt) {
			var $this = $(this),
				val = $this.val();
			if (isNaN(val) || val < 1) {
				$this.val(options.curPage);
				return false
			}
			val = parseInt(val);
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
			options = this.options;
		this.first.attr("title", options.strFirstPage);
		this.prev.attr("title", options.strPrevPage);
		this.next.attr("title", options.strNextPage);
		this.last.attr("title", options.strLastPage);
		this.$refresh.attr("title", options.strRefresh);
		this.rPPHolder.empty();
		if (options.strRpp) {
			var opts = options.rPPOptions,
				strRpp = options.strRpp;
			if (strRpp.indexOf("{0}") != -1) {
				var selectArr = ["<select class='ui-corner-all'>"];
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
		if (options.curPage >= options.totalPages) {
			this.next.button({
				disabled: true
			});
			this.last.button({
				disabled: true
			})
		} else {
			this.next.button({
				disabled: false
			});
			this.last.button({
				disabled: false
			})
		} if (options.curPage <= 1) {
			this.first.button({
				disabled: true
			});
			this.prev.button({
				disabled: true
			})
		} else {
			this.first.button({
				disabled: false
			});
			this.prev.button({
				disabled: false
			})
		}
		this.page.val(options.curPage);
		this.$total.text(options.totalPages);
		if (this.options.totalRecords > 0) {
			var rPP = options.rPP;
			var curPage = options.curPage;
			var totalRecords = options.totalRecords;
			var begIndx = (curPage - 1) * rPP;
			var endIndx = curPage * rPP;
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
	fnPG._destroy = function() {
		this.element.empty().removeClass("pq-pager").enableSelection()
	};
	fnPG._setOption = function(key, value) {
		if (key == "curPage" || key == "totalPages") {
			value = parseInt(value)
		}
		this._super.call(this, key, value)
	};
	fnPG._setOptions = function() {
		this._super.apply(this, arguments);
		this._refresh()
	};
	$.widget("paramquery.pqPager", fnPG);
	$.paramquery.pqPager.regional = {};
	$.paramquery.pqPager.regional.en = fnPG._regional
})(jQuery);
(function($) {
	var fnSB = {};
	fnSB.options = {
		length: 200,
		num_eles: 3,
		cur_pos: 0,
		ratio: 0,
		timeout: 350,
		pace: "optimum",
		direction: "vertical",
		theme: false
	};
	fnSB._destroy = function() {
		this.element.removeClass("pq-sb-vert pq-sb-vert-t pq-sb-vert-wt").enableSelection().removeClass("pq-sb-horiz pq-sb-horiz-t pq-sb-horiz-wt").unbind("click.pq-scrollbar").empty();
		this.element.removeData()
	};
	fnSB._create = function() {
		this._createLayout()
	};
	fnSB._createLayout = function() {
		var that = this,
			options = this.options,
			direction = options.direction,
			theme = options.theme;
		var ele = this.element.empty();
		if (direction == "vertical") {
			ele.removeClass("pq-sb-vert-t pq-sb-vert-wt").addClass("pq-sb-vert");
			if (theme) {
				ele.addClass("pq-sb-vert-t");
				ele.html(["<div class='top-btn pq-sb-btn ui-state-default ui-corner-top'>", "<div class='ui-icon ui-icon-triangle-1-n'></div></div>", "<div class='pq-sb-slider ui-corner-all ui-state-default'>", "</div>", "<div class='bottom-btn pq-sb-btn ui-state-default ui-corner-bottom'>", "<div class='ui-icon ui-icon-triangle-1-s'></div></div>"].join(""))
			} else {
				ele.addClass("pq-sb-vert-wt");
				ele.html(["<div class='top-btn pq-sb-btn'></div>", "<div class='pq-sb-slider'>", "<div class='vert-slider-top'></div>", "<div class='vert-slider-bg'></div>", "<div class='vert-slider-center'></div>", "<div class='vert-slider-bg'></div>", "<div class='vert-slider-bottom'></div>", "</div>", "<div class='bottom-btn pq-sb-btn'></div>"].join(""))
			}
		} else {
			ele.removeClass("pq-sb-horiz-t pq-sb-horiz-wt").addClass("pq-sb-horiz");
			if (theme) {
				ele.addClass("pq-sb-horiz-t");
				ele.html(["<div class='left-btn pq-sb-btn ui-state-default ui-corner-left'>", "<div class='ui-icon ui-icon-triangle-1-w'></div></div>", "<div class='pq-sb-slider pq-sb-slider-h ui-state-default ui-corner-all'>", "</div>", "<div class='right-btn pq-sb-btn ui-state-default ui-corner-right'>", "<div class='ui-icon ui-icon-triangle-1-e'></div></div>"].join(""))
			} else {
				ele.addClass("pq-sb-horiz-wt");
				ele.width(this.width);
				ele.html(["<div class='left-btn pq-sb-btn'></div>", "<div class='pq-sb-slider pq-sb-slider-h'>", "<span class='horiz-slider-left'></span>", "<span class='horiz-slider-bg'></span>", "<span class='horiz-slider-center'></span>", "<span class='horiz-slider-bg'></span>", "<span class='horiz-slider-right'></span>", "</div>", "<div class='right-btn pq-sb-btn'></div>"].join(""))
			}
		}
		ele.disableSelection().unbind(".pq-scrollbar").on("mouseup.pq-scrollbar", function(evt) {
			that._mouseup(evt)
		}).on("mousedown.pq-scrollbar", function(evt) {
			if (options.disabled) {
				return
			}
			if (that.$slider.is(":hidden")) {
				return
			}
			if (direction == "vertical") {
				var clickY = evt.pageY,
					top_this = that.element.offset().top,
					bottom_this = top_this + options.length,
					$slider = that.$slider,
					topSlider = $slider.offset().top,
					heightSlider = $slider.height(),
					botSlider = topSlider + heightSlider;
				if (clickY < topSlider && clickY > top_this + 17) {
					that.mousedownInterval = window.setInterval(function() {
						if (clickY >= $slider.offset().top) {
							window.clearInterval(that.mousedownInterval);
							that.mousedownInterval = null
						} else {
							that._pageUp(evt)
						}
					}, 0)
				} else {
					if (clickY > botSlider && clickY < bottom_this - 17) {
						that.mousedownInterval = window.setInterval(function() {
							if ((clickY <= $slider.offset().top + heightSlider)) {
								window.clearInterval(that.mousedownInterval);
								that.mousedownInterval = null
							} else {
								that._pageDown(evt)
							}
						}, 0)
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
		if (theme) {
			$slider.attr("tabindex", "0")
		}
		this._bindSliderEvents($slider);
		this.$top_btn = $("div.top-btn,div.left-btn", this.element).click(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.decr_cur_pos(evt);
			evt.preventDefault();
			return false
		}).mousedown(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.mousedownTimeout = window.setTimeout(function() {
				that.mousedownInterval = window.setInterval(function() {
					that.decr_cur_pos(evt)
				}, 0)
			}, that.options.timeout)
		}).bind("mouseup mouseout", function(evt) {
			that._mouseup(evt)
		});
		this.$bottom_btn = $("div.bottom-btn,div.right-btn", this.element).click(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.incr_cur_pos(evt);
			evt.preventDefault();
			return false
		}).mousedown(function(evt) {
			if (that.options.disabled) {
				return
			}
			that.mousedownTimeout = window.setTimeout(function() {
				that.mousedownInterval = window.setInterval(function() {
					that.incr_cur_pos(evt)
				}, 0)
			}, that.options.timeout)
		}).bind("mouseup mouseout", function(evt) {
			that._mouseup(evt)
		});
		this._refresh()
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
				that.topWhileDrag = null
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
				that._updateCurPosAndTrigger(evt);
				that.dragging = false
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
											that._pageDown(evt)
										} else {
											if (keyCode == KC.PAGE_UP) {
												that._pageUp(evt)
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
				var ratio = o.ratio - (1 / (o.num_eles - 1));
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
				var ratio = o.ratio + (1 / (o.num_eles - 1));
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
			var bot = (top + o.length - 34 - this.slider_length);
			this.$slider.draggable("option", "containment", [0, top, 0, bot])
		} else {
			top = this.element.offset().left + 17;
			bot = (top + o.length - 34 - this.slider_length);
			this.$slider.draggable("option", "containment", [top, 0, bot, 0])
		}
	};
	fnSB._refresh = function() {
		var o = this.options;
		if (o.num_eles <= 1) {
			this.element.css("display", "none")
		} else {
			this.element.css("display", "")
		}
		this._validateCurPos();
		this.$slider.css("display", "");
		if (o.direction == "vertical") {
			this.element.height(o.length);
			this._setSliderBgLength();
			this.scroll_space = o.length - 34 - this.slider_length;
			if (this.scroll_space < 4 || o.num_eles <= 1) {
				this.$slider.css("display", "none")
			}
			this.updateSliderPos(o.cur_pos)
		} else {
			this.element.width(o.length);
			this._setSliderBgLength();
			this.scroll_space = o.length - 34 - this.slider_length;
			if (this.scroll_space < 4 || o.num_eles <= 1) {
				this.$slider.css("display", "none")
			}
			this.updateSliderPos(o.cur_pos)
		}
	};
	fnSB._setSliderBgLength = function() {
		var o = this.options,
			theme = o.theme,
			outerHeight = o.length,
			innerHeight = o.num_eles * 40 + outerHeight,
			avail_space = outerHeight - 34,
			slider_height = avail_space * outerHeight / innerHeight,
			slider_bg_ht = Math.round((slider_height - (8 + 3 + 3)) / 2);
		if (slider_bg_ht < 1) {
			slider_bg_ht = 1
		}
		this.slider_length = 8 + 3 + 3 + (2 * slider_bg_ht);
		if (o.direction == "vertical") {
			if (theme) {
				this.$slider.height(this.slider_length - 2)
			} else {
				$("div.vert-slider-bg", this.element).height(slider_bg_ht);
				this.$slider.height(this.slider_length)
			}
		} else {
			if (theme) {
				this.$slider.width(this.slider_length - 2)
			} else {
				$(".horiz-slider-bg", this.element).width(slider_bg_ht);
				this.$slider.width(this.slider_length)
			}
		}
	};
	fnSB._updateCurPosAndTrigger = function(evt, top) {
		var that = this,
			o = this.options,
			direction = o.direction,
			$slider = that.$slider;
		if (top == null) {
			top = (direction == "vertical") ? parseInt($slider[0].style.top, 10) : parseInt($slider[0].style.left, 10)
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
			var top = (direction == "vertical") ? parseInt($slider[0].style.top, 10) : parseInt($slider[0].style.left, 10);
			if (that.prev_top == top) {
				that._updateCurPosAndTrigger(evt, top);
				window.clearInterval(that.timer);
				that.timer = null
			}
			that.prev_top = top
		}, 20)
	};
	fnSB.setNumEles = function(num_eles) {
		this.options.num_eles = num_eles;
		this.updateSliderPos()
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
			$slider = that.$slider,
			scroll_space = o.length - 34 - this.slider_length;
		if (ratio == null) {
			throw ("ration N/A")
		}
		var top = (ratio * scroll_space) + 17;
		if (direction == "vertical") {
			$slider.css("top", top)
		} else {
			$slider.css("left", top)
		}
	};
	fnSB._updateSliderPosCurPos = function() {
		var o = this.options;
		var sT = (this.scroll_space * (o.cur_pos)) / (o.num_eles - 1);
		if (o.direction == "vertical") {
			this.$slider.css("top", 17 + sT)
		} else {
			this.$slider.css("left", 17 + sT)
		}
	};
	fnSB.updateSliderPos = function() {
		var o = this.options;
		if (o.steps === undefined) {
			throw ("assert failed. steps N/A")
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
	fnSB._pageDown = function(evt) {
		this._trigger("pageDown", evt, null)
	};
	fnSB._pageUp = function(evt) {
		this._trigger("pageUp", evt, null)
	};
	fnSB._setOption = function(key, value) {
		if (key == "disabled") {
			this._super.call(this, key, value);
			if (value == true) {
				this.$slider.draggable("disable")
			} else {
				this.$slider.draggable("enable")
			}
		} else {
			if (key == "theme") {
				this._super.call(this, key, value);
				this._createLayout()
			} else {
				if (key == "ratio") {
					if (value >= 0 && value <= 1) {
						this._super.call(this, key, value)
					} else {}
				} else {
					this._super.call(this, key, value)
				}
			}
		}
	};
	fnSB._setOptions = function() {
		this._super.apply(this, arguments);
		this._refresh()
	};
	$.widget("paramquery.pqScrollBar", fnSB)
})(jQuery);
(function($) {
	var cClass = function() {};
	cClass.prototype.belongs = function(evt) {
		if (evt.target == this.that.element[0]) {
			return true
		}
	};
	$.paramquery.cClass = cClass;
	var cGenerateView = function(that) {
		this.that = that;
		this.hidearrHS1 = [];
		this.options = that.options;
		this.offset = null
	};
	$.paramquery.cGenerateView = cGenerateView;
	var _pGenerateView = cGenerateView.prototype;
	_pGenerateView.generateView = function(objP) {
		var self = this,
			that = this.that,
			o = that.options,
			freezeCols = o.freezeCols,
			virtualX = o.virtualX,
			virtualY = o.virtualY,
			CM = that.colModel,
			initV, finalV, initH = that.initH,
			finalH = that.finalH,
			GM = o.groupModel,
			pqpanes = that.pqpanes;
		if (objP) {
			var strTbl = this._generateTables(null, null, objP),
				$cont = objP.$cont;
			$cont.empty();
			if (pqpanes.v) {
				$cont.append(["<div class='pq-cont-inner'>", strTbl, "</div>", "<div class='pq-cont-inner'>", strTbl, "</div>"].join(""))
			} else {
				$cont.append("<div class='pq-cont-inner'>" + strTbl + "</div>")
			}
			var $div_child = $cont.children("div"),
				$tbl = $div_child.children("table"),
				tblHt = $tbl[0].scrollHeight - 1;
			$cont.height(tblHt);
			if (pqpanes.v) {
				var $cont_l = $($div_child[0]),
					wdTbl = $tbl[0].scrollWidth,
					$cont_r = $($div_child[1]);
				var $tbl_r = $($tbl[1]);
				var wd = calcWidthCols.call(that, -1, freezeCols);
				var lft = calcWidthCols.call(that, freezeCols, initH);
				$cont_l.css({
					width: wd,
					zIndex: 1
				});
				$cont_r.css({
					left: wd - 1,
					width: wdTbl,
					position: "absolute",
					height: tblHt
				});
				$tbl_r.css({
					left: (-1 * (lft + wd))
				})
			}
			if (!that.tables) {
				that.tables = []
			}
			var indx = -1;
			for (var l = 0; l < that.tables.length; l++) {
				var cont = that.tables[l].cont;
				if (cont == objP.$cont[0]) {
					indx = l
				}
			}
			if (indx == -1) {
				that.tables.push({
					$tbl: $tbl,
					cont: objP.$cont[0]
				})
			} else {
				that.tables[indx].$tbl = $tbl
			}
		} else {
			that._bufferObj_calcInitFinal();
			initV = that.initV;
			finalV = that.finalV;
			var data = (GM ? that.dataGM : that.pdata);
			var $cont = that.$cont;
			if (o.editModel.indices != null) {
				that.blurEditor({
					force: true
				})
			}
			var strTbl = self._generateTables(initV, finalV, objP);
			$cont.empty();
			if (that.totalVisibleRows === 0) {
				$cont.append("<div class='pq-cont-inner pq-grid-norows' >" + o.strNoRows + "</div>")
			} else {
				if (pqpanes.h && pqpanes.v) {
					$cont.append(["<div class='pq-cont-inner'>", strTbl, "</div>", "<div class='pq-cont-inner'>", strTbl, "</div>", "<div class='pq-cont-inner'>", strTbl, "</div>", "<div class='pq-cont-inner'>", strTbl, "</div>"].join(""))
				} else {
					if (pqpanes.h || pqpanes.v) {
						$cont.append(["<div class='pq-cont-inner'>", strTbl, "</div>", "<div class='pq-cont-inner'>", strTbl, "</div>"].join(""))
					} else {
						$cont.append("<div class='pq-cont-inner'>" + strTbl + "</div>")
					}
				}
			}
			that.$tbl = $cont.children("div").children("table");
			that._fixTableViewPort();
			that._trigger("afterTable", null, {
				dataModel: o.dataModel,
				colModel: CM,
				pageData: data,
				initV: initV,
				finalV: finalV,
				initH: initH,
				finalH: finalH
			})
		}
		that._saveDims();
		this.scrollView();
		if (!objP) {
			that._trigger("refresh", null, {
				dataModel: o.dataModel,
				colModel: CM,
				pageData: data,
				initV: initV,
				finalV: finalV,
				initH: initH,
				finalH: finalH
			})
		}
		that._saveDims();
		this.scrollView()
	};
	_pGenerateView.scrollView = function() {
		var that = this.that,
			o = this.options,
			virtualX = o.virtualX,
			virtualY = o.virtualY;
		if (!virtualX) {
			that.$hscroll.pqScrollBar("drag")
		}
		if (!virtualY) {
			that.$vscroll.pqScrollBar("drag")
		}
	};
	_pGenerateView.setPanes = function() {
		var that = this.that,
			$cont = that.$cont,
			pqpanes = that.pqpanes,
			$div_child = $cont.children("div"),
			$tbl = that.$tbl,
			o = that.options,
			freezeCols = parseInt(o.freezeCols),
			initH = that.initH,
			wd, lft, ht;
		if ($tbl && $tbl.length) {
			var wdTbl = $tbl[0].scrollWidth;
			if (pqpanes.h && pqpanes.v) {
				var $cont_lt = $($div_child[0]),
					$cont_rt = $($div_child[1]),
					$tbl_rt = $($tbl[1]),
					$cont_lb = $($div_child[2]),
					$tbl_lb = $($tbl[2]),
					$cont_rb = $($div_child[3]),
					$tbl_rb = $($tbl[3]);
				wd = calcWidthCols.call(that, -1, freezeCols);
				var ht = that.calcHeightFrozenRows();
				$cont_lt.css({
					width: wd,
					height: ht,
					zIndex: 2
				});
				$cont_rt.css({
					left: wd,
					width: wdTbl,
					height: ht,
					position: "absolute"
				});
				$tbl_rt.css({
					left: (-1 * wd)
				});
				$cont_lb.css({
					width: wd,
					zIndex: 1,
					top: ht,
					position: "absolute"
				});
				$tbl_lb.css({
					top: -ht
				});
				$cont_rb.css({
					left: wd,
					width: wdTbl,
					zIndex: 1,
					top: ht,
					position: "absolute"
				});
				$tbl_rb.css({
					top: -ht,
					left: (-1 * wd)
				})
			} else {
				if (pqpanes.v) {
					var $cont_l = $($div_child[0]);
					var $cont_r = $($div_child[1]);
					var $tbl_r = $($tbl[1]);
					wd = calcWidthCols.call(that, -1, freezeCols);
					lft = calcWidthCols.call(that, freezeCols, initH);
					$cont_l.css({
						width: wd,
						zIndex: 1
					});
					$cont_r.css({
						left: wd,
						width: wdTbl,
						position: "absolute"
					});
					$tbl_r.css({
						left: (-1 * (lft + wd))
					})
				} else {
					if (pqpanes.h) {
						var $cont_t = $($div_child[0]);
						var $cont_b = $($div_child[1]);
						var $tbl_b = $($tbl[1]);
						ht = that.calcHeightFrozenRows();
						$cont_t.css({
							height: ht,
							zIndex: 1
						});
						$cont_b.css({
							width: wdTbl,
							top: ht,
							position: "absolute"
						});
						$tbl_b.css({
							top: (-1 * ht)
						})
					} else {}
				}
			}
		}
	};
	_pGenerateView._generateTables = function(initV, finalV, objP) {
		var that = this.that,
			thisColModel = that.colModel,
			CMLength = thisColModel.length,
			o = that.options,
			virtualX = o.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			numberCell = o.numberCell,
			columnBorders = o.columnBorders,
			rowBorders = o.rowBorders,
			wrap = o.wrap,
			SM = o.scrollModel,
			GM = o.groupModel,
			hidearrHS = that.hidearrHS,
			freezeCols = o.freezeCols,
			freezeRows = parseInt(o.freezeRows),
			lastFrozenRow = false,
			row = 0,
			finalRow = (objP) ? objP.data.length - 1 : finalV,
			prevGroupVal = "",
			GMtrue = GM ? true : false,
			TVM = o.treeModel,
			data = (objP && objP.data) ? objP.data : (GMtrue ? that.dataGM : (that.pdata)),
			offset = that.rowIndxOffset;
		if (!objP && (initV == null || finalRow == null)) {
			return
		}
		if (!objP) {
			that._trigger("beforeTableView", null, {
				pageData: data,
				initV: initV,
				finalV: finalV,
				initH: initH,
				finalH: finalH,
				colModel: thisColModel
			})
		}
		var tblClass = "pq-grid-table ";
		if (columnBorders) {
			tblClass += "pq-td-border-right "
		}
		if (rowBorders) {
			tblClass += "pq-td-border-bottom "
		}
		if (wrap) {
			tblClass += "pq-wrap "
		} else {
			tblClass += "pq-no-wrap "
		}
		var buffer = ["<table class='" + tblClass + "' cellpadding=0 cellspacing=0 >"];
		this.hidearrHS1 = [];
		if (1 === 1) {
			buffer.push("<tr class='pq-row-hidden'>");
			if (numberCell.show) {
				var wd = numberCell.width + 1;
				buffer.push("<td style='width:" + wd + "px;' ></td>")
			}
			for (var col = 0; col <= finalH; col++) {
				if (col < initH && col >= freezeCols && (virtualX || objP)) {
					col = initH;
					if (col > finalH) {
						throw ("initH>finalH");
						break
					}
				}
				var column = thisColModel[col];
				if (column.hidden) {
					continue
				}
				wd = column.outerWidth;
				buffer.push("<td style='width:", wd, "px;' pq-col-indx='", col, "'></td>")
			}
			buffer.push("</tr>")
		}
		this.offsetRow = null;
		for (var row = 0; row <= finalRow; row++) {
			if (row < initV && row >= freezeRows) {
				row = initV
			}
			var rowData = data[row],
				rowIndxPage = GMtrue ? (rowData.rowIndx - offset) : row,
				rowHidden = (rowData) ? rowData.pq_hidden : false;
			if (rowHidden) {
				continue
			}
			var lastFrozenRow = (that.lastFrozenRow === rowIndxPage);
			if (GM && rowData.groupTitle) {
				this._generateTitleRow(GM, rowData, buffer, lastFrozenRow)
			} else {
				if (GM && rowData.groupSummary) {
					this._generateSummaryRow(rowData.data, thisColModel, buffer, lastFrozenRow)
				} else {
					var nestedshow = (rowData.pq_detail && rowData.pq_detail.show);
					this._generateRow(rowData, rowIndxPage, thisColModel, buffer, objP, lastFrozenRow, nestedshow);
					if (nestedshow) {
						this._generateDetailRow(rowData, rowIndxPage, thisColModel, buffer, objP, lastFrozenRow)
					}
				}
			}
		}
		that.scrollMode = false;
		buffer.push("</table>");
		var str = buffer.join("");
		return str
	};
	_pGenerateView._renderCell = function(objP, _dataCell) {
		var that = this.that,
			options = this.options,
			rowData = objP.rowData,
			column = objP.column,
			type = column.type,
			dataIndx = column.dataIndx,
			cellData = rowData[dataIndx];
		if (!rowData) {
			return
		}
		var dataCell;
		if (_dataCell != undefined) {
			dataCell = _dataCell
		} else {
			if (type == "checkBoxSelection") {
				dataCell = "<input type='checkbox' " + (cellData ? "checked='checked'" : "") + " />"
			} else {
				if (type == "detail") {
					var DTM = options.detailModel;
					var hicon = (cellData && cellData.show) ? DTM.expandIcon : DTM.collapseIcon;
					dataCell = "<div class='ui-icon " + hicon + "'></div>"
				} else {
					dataCell = cellData
				}
			}
		} if (dataCell === "" || dataCell == undefined) {
			dataCell = "&nbsp;"
		}
		var str = "",
			TVM;
		if (objP.tree && (TVM = options.treeModel) && TVM.labelIndx == dataIndx) {
			var isLeaf = rowData.pq_leaf,
				level = rowData.pq_level,
				expanded = !rowData.pq_collapse,
				treeMarginLeft = (level + 1) * TVM.indent,
				leafClass = "";
			if (isLeaf) {
				leafClass = TVM.leafIcon
			} else {
				if (expanded) {
					leafClass = TVM.expandIcon + " pq-tree-expand-icon"
				} else {
					leafClass = TVM.collapseIcon + " pq-tree-expand-icon"
				}
			}
			var strTree = ["<div class='pq-tree-icon-container' style='width:", treeMarginLeft, "px;'>", "<div class='ui-icon ", leafClass, " pq-tree-icon' ></div></div>"].join("");
			str = "<div class='" + cls + "'>" + strTree + dataCell + "</div>"
		} else {
			str = dataCell
		}
		return str
	};
	_pGenerateView.renderCell = function(objP) {
		var that = this.that,
			o = this.options,
			rowData = objP.rowData,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			column = objP.column,
			colIndx = objP.colIndx,
			dataIndx = column.dataIndx,
			freezeCols = o.freezeCols,
			columnBorders = o.columnBorders,
			attr = "pq-col-indx='" + colIndx + "'",
			cellSelection = false;
		var cls = "pq-grid-cell ";
		if (column.align == "right") {
			cls += " pq-align-right"
		} else {
			if (column.align == "center") {
				cls += " pq-align-center"
			}
		} if (colIndx == freezeCols - 1 && columnBorders) {
			cls += " pq-last-freeze-col"
		}
		var ccls = column.cls;
		if (ccls) {
			cls = cls + " " + ccls
		}
		var pq_cellselect = rowData.pq_cellselect;
		if (pq_cellselect) {
			cellSelection = pq_cellselect[dataIndx]
		}
		if (cellSelection) {
			cls = cls + " pq-cell-select ui-state-highlight"
		}
		var dataCell;
		if (column.render) {
			dataCell = column.render.call(that.element[0], {
				data: that.pdata,
				dataModel: o.dataModel,
				rowData: rowData,
				cellData: rowData[dataIndx],
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndx,
				colIndx: colIndx,
				column: column,
				dataIndx: dataIndx
			})
		}
		var pq_cellcls = rowData.pq_cellcls;
		if (pq_cellcls) {
			var cellClass = pq_cellcls[dataIndx];
			if (cellClass) {
				cls += " " + cellClass
			}
		}
		var pq_cellattr = rowData.pq_cellattr;
		if (pq_cellattr) {
			var cellattr = pq_cellattr[dataIndx];
			if (cellattr) {
				for (var key in cellattr) {
					var val = cellattr[key];
					if (key == "title") {
						val = val.replace(/\"/g, "&quot;")
					}
					attr += " " + key + '="' + val + '"'
				}
			}
		}
		var str = ["<td class='", cls, "' ", attr, " >", this._renderCell(objP, dataCell), "</td>"].join("");
		return str
	};
	_pGenerateView.refreshRow = function(rowIndxPage, CM, buffer) {
		var that = this.that,
			rowData = that.pdata[rowIndxPage];
		var lastFrozenRow = (that.lastFrozenRow === rowIndxPage),
			nestedshow = (rowData.pq_detail && rowData.pq_detail.show);
		this._generateRow(rowData, rowIndxPage, CM, buffer, null, lastFrozenRow, nestedshow)
	};
	_pGenerateView._generateRow = function(rowData, rowIndx, CM, buffer, objP, lastFrozenRow, nestedshow) {
		var row_cls = "pq-grid-row";
		if (lastFrozenRow) {
			row_cls += " pq-last-freeze-row"
		}
		if (nestedshow) {
			row_cls += " pq-detail-master"
		}
		var that = this.that,
			o = this.options,
			freezeCols = o.freezeCols,
			numberCell = o.numberCell,
			TVM = o.treeModel,
			tree = TVM.labelIndx ? true : false,
			virtualX = o.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			offset = this.offset;
		if (o.stripeRows && (rowIndx / 2 == parseInt(rowIndx / 2))) {
			row_cls += " pq-grid-oddRow"
		}
		if (rowData.pq_rowselect) {
			row_cls += " pq-row-select ui-state-highlight"
		}
		var pq_rowcls = rowData.pq_rowcls;
		if (pq_rowcls != null) {
			row_cls += " " + pq_rowcls
		}
		var rowattr = rowData.pq_rowattr,
			attr = "";
		if (rowattr) {
			for (var key in rowattr) {
				var val = rowattr[key];
				val = val.replace('"', "&quot;");
				attr += key + '="' + val + '"'
			}
		}
		buffer.push("<tr pq-row-indx='", rowIndx, "' class='", row_cls, "' ", attr, " >");
		if (numberCell.show) {
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", ((objP) ? "&nbsp;" : (rowIndx + 1)), "</td>"].join(""))
		}
		var objRender = {
			rowIndx: rowIndx + offset,
			rowIndxPage: rowIndx,
			rowData: rowData
		};
		for (var col = 0; col <= finalH; col++) {
			if (col < initH && col >= freezeCols && (virtualX || objP)) {
				col = initH;
				if (col > finalH) {
					throw ("initH>finalH");
					break
				}
			}
			var column = CM[col];
			if (column.hidden) {
				continue
			}
			objRender.column = column;
			objRender.colIndx = col;
			objRender.tree = tree;
			buffer.push(this.renderCell(objRender))
		}
		buffer.push("</tr>");
		return buffer
	};
	var fn = {
		widgetEventPrefix: "pqgrid"
	};
	fn.options = {
		cancel: "input,textarea,button,select,option,.ui-resizable-handle,div[contenteditable],.pq-draggable",
		distance: 3,
		collapsible: {
			on: true,
			toggle: true,
			collapsed: false,
			_collapsed: false,
			refreshAfterExpand: true,
			css: {
				zIndex: 1000
			}
		},
		colModel: null,
		columnBorders: true,
		dataModel: {
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
			clicksToEdit: 1,
			filterKeys: true,
			keyUpDown: true,
			reInt: /^([\-]?[1-9][0-9]*|[\-]?[0-9]?)$/,
			reFloat: /^[\-]?[0-9]*\.?[0-9]*$/,
			onBlur: "validate",
			saveKey: $.ui.keyCode.ENTER,
			onSave: "next",
			allowInvalid: false,
			invalidClass: "pq-cell-red-tr pq-has-tooltip",
			warnClass: "pq-cell-blue-tr pq-has-tooltip",
			validate: true
		},
		editor: {
			select: false,
			type: "textbox"
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
		calcDataIndxFromColIndx: true,
		height: 400,
		hoverMode: "null",
		_maxColWidth: "100%",
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
		scrollModel: {
			pace: "fast",
			horizontal: true,
			autoFit: false,
			theme: false
		},
		selectionModel: {
			fireSelectChange: true,
			type: "cell",
			mode: "block"
		},
		swipeModel: {
			on: true,
			speed: 50,
			ratio: 0.15,
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
	fn._regional = {
		strAdd: "Add",
		strDelete: "Delete",
		strEdit: "Edit",
		strLoading: "Loading",
		strNextResult: "Next Result",
		strNoRows: "No rows to display.",
		strNothingFound: "Nothing found",
		strPrevResult: "Previous Result",
		strSearch: "Search",
		strSelectedmatches: "Selected {0} of {1} match(es)"
	};
	$.extend(fn.options, fn._regional);
	fn._destroyResizable = function() {
		if (this.element.data("resizable")) {
			this.element.resizable("destroy")
		}
	};
	fn._disable = function() {
		if (this.$disable == null) {
			this.$disable = $("<div class='pq-grid-disable'></div>").css("opacity", 0.2).appendTo(this.element)
		}
	};
	fn._enable = function() {
		if (this.$disable) {
			this.element[0].removeChild(this.$disable[0]);
			this.$disable = null
		}
	};
	fn._destroy = function() {
		this._destroyResizable();
		this._destroyDraggable();
		this._mouseDestroy();
		this.element.off(this.eventNamespace);
		$(window).unbind(this.eventNamespace);
		$(document).unbind(this.eventNamespace);
		this.element.empty().css("height", "").css("width", "").removeClass("pq-grid ui-widget ui-widget-content ui-corner-all").removeData()
	};
	fn.destroy = function() {
		this._super();
		window.clearInterval(this._refreshEditorPosTimer);
		if (this.autoResizeTimeout) {
			clearTimeout(this.autoResizeTimeout)
		}
		for (var key in this) {
			delete this[key]
		}
		$.fragments = {}
	};
	fn.decidePanes = function() {
		this.pqpanes = {
			v: false,
			h: false,
			vH: false
		};
		var pqpanes = this.pqpanes,
			o = this.options,
			virtualX = o.virtualX,
			virtualXHeader = o.virtualXHeader,
			virtualY = o.virtualY,
			flexHeight = o.height == "flex",
			flexWidth = o.width == "flex",
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
			if (virtualXHeader === false) {
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
					if (virtualXHeader === false) {
						pqpanes.vH = true
					}
				}
			}
		}
	};
	fn.collapse = function(objP) {
		var that = this,
			ele = this.element,
			o = this.options,
			CP = o.collapsible,
			$icon = CP.$collapse.children("span"),
			postCollapse = function() {
				$icon.addClass("ui-icon-circle-triangle-s").removeClass("ui-icon-circle-triangle-n");
				if (ele.hasClass("ui-resizable")) {
					ele.resizable("destroy")
				}
				that.$toolbar.pqToolbar("disable");
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
				CP._collapsed = false;
				CP.collapsed = false;
				that._refreshResizable();
				if (CP.refreshAfterExpand) {
					that.refresh()
				}
				$icon.addClass("ui-icon-circle-triangle-n").removeClass("ui-icon-circle-triangle-s");
				that.$toolbar.pqToolbar("enable");
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
	fn._createCollapse = function() {
		var that = this,
			$top = this.$top,
			o = this.options,
			CP = o.collapsible;
		if (!CP.$stripe) {
			var $stripe = $(["<div class='pq-slider-icon' style='z-index:5;' >", "</div>"].join("")).appendTo($top);
			CP.$stripe = $stripe
		}
		if (CP.on) {
			if (!CP.$collapse) {
				CP.$collapse = $(["<div style='float:left;' class='pq-collapse'>", "<span class='ui-icon ui-icon-circle-triangle-n' style='float:left;'></span>", "</div>"].join("")).appendTo(CP.$stripe).mouseover(function(evt) {
					$(this).addClass("ui-state-hover")
				}).mouseout(function(evt) {
					$(this).removeClass("ui-state-hover")
				}).click(function(evt) {
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
		} if (CP.collapsed && !CP._collapsed) {
			that.collapse({
				animate: false
			})
		} else {
			if (!CP.collapsed && CP._collapsed) {
				that.expand({
					animate: false
				})
			}
		} if (CP.toggle) {
			if (!CP.$toggle) {
				CP.$toggle = $(["<div style='float:left;' class='pq-max'>", "<span class='ui-icon ui-icon-arrow-4-diag' style='float:left;'></span>", "</div>"].join("")).prependTo(CP.$stripe).mouseover(function(evt) {
					$(this).addClass("ui-state-hover")
				}).mouseout(function(evt) {
					$(this).removeClass("ui-state-hover")
				}).click(function(evt) {
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
	fn._create = function() {
		var that = this;
		this.decidePanes();
		this.setEditorPosTimer();
		this.iGenerateView = new cGenerateView(this);
		this.iKeyNav = new cKeyNav(this);
		this.iRefreshColumn = new cRefreshColumn(this);
		this.iIsValid = new cIsValid(this);
		this.rowHeight = 22;
		this.hidearr = [];
		this.hidearrHS = [];
		this.tables = [];
		var that = this,
			o = this.options;
		this.$tbl = null;
		this._refreshGridWidthAndHeight();
		this._calcThisColModel();
		this.iSort = new $.paramquery.cSort(this);
		this.iSort._refreshSorters();
		this._initTypeColumns();
		var element = this.element;
		element.empty().addClass("pq-grid ui-widget ui-widget-content" + (o.roundCorners ? " ui-corner-all" : "")).append(["<div class='pq-grid-top ui-widget-header", (o.roundCorners ? " ui-corner-top" : ""), "'>", "<div class='pq-grid-title", (o.roundCorners ? " ui-corner-top" : ""), "'>&nbsp;</div>", "</div>", "<div class='pq-grid-inner' >", "<div class='pq-header-outer ui-widget-header'>", "</div>", "<div class='pq-cont-right' >", "<div class='pq-cont' tabindex='0'></div>", "</div>", "</div>", "<div class='pq-grid-bottom ui-widget-header", (o.roundCorners ? " ui-corner-bottom" : ""), "'>", "<div class='pq-grid-footer'>&nbsp;</div>", "</div>"].join(""));
		this._trigger("render", null, {
			dataModel: this.options.dataModel,
			colModel: this.colModel
		});
		this.$top = $("div.pq-grid-top", element);
		this.$title = $("div.pq-grid-title", element);
		if (!o.showTitle) {
			this.$title.css("display", "none")
		}
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
		this.$toolbar = $("div.pq-grid-toolbar", element);
		this.$grid_inner = $("div.pq-grid-inner", element);
		this.$header_o = $("div.pq-header-outer", this.$grid_inner);
		if (!o.showTop) {
			this.$top.css("display", "none")
		}
		this.$bottom = $("div.pq-grid-bottom", element);
		if (!o.showBottom) {
			this.$bottom.css("display", "none")
		}
		this.$footer = $("div.pq-grid-footer", element);
		this.$cont_o = $("div.pq-cont-right", this.$grid_inner);
		this.$cont_fixed = $("div.pq-cont-fixed", this.$grid_inner);
		var $cont = this.$cont = $("div.pq-cont", this.$grid_inner);
		$(window).bind("resize" + that.eventNamespace + " orientationchange" + that.eventNamespace, function(evt, ui) {
			that._onWindowResize(evt, ui)
		});
		$cont.on("click", "td.pq-grid-cell", function(evt) {
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
		$cont.on("mousedown", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseDown(evt)
			}
		});
		$cont.on("mousedown", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseDown(evt)
			}
		});
		$cont.on("mousedown", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
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
		$cont.bind("mousewheel DOMMouseScroll", function(evt) {
			return that._onMouseWheel(evt)
		});
		var prevVScroll = 0;
		this.$hvscroll = $("<div class='pq-hvscroll-square ui-widget-content'></div>").appendTo(this.$grid_inner);
		this.$vscroll = $("<div class='pq-vscroll'></div>").appendTo(this.$grid_inner);
		this.prevVScroll = 0;
		var scrollModel = o.scrollModel;
		if (scrollModel.lastColumn === undefined) {
			if (o.virtualX) {
				scrollModel.lastColumn = "auto"
			}
		}
		this.$vscroll.pqScrollBar({
			pace: scrollModel.pace,
			theme: scrollModel.theme,
			steps: o.virtualY,
			direction: "vertical",
			cur_pos: 0,
			pageDown: function(evt, ui) {
				that.iKeyNav.pageDown()
			},
			pageUp: function(evt, ui) {
				that.iKeyNav.pageUp()
			},
			drag: function(evt, obj) {
				var virtualY = o.virtualY;
				if (!virtualY) {
					var ratio = obj.ratio;
					that._syncViewWithScrollBarVert(ratio)
				}
			},
			scroll: function(evt, obj) {
				var virtualY = o.virtualY;
				if (virtualY) {
					that.scrollMode = true;
					that.setFlexWHCallback(function() {
						that.iGenerateView.generateView()
					});
					var num_eles;
					if (evt.originalEvent && evt.originalEvent.type == "drag") {
						num_eles = that._setScrollVNumEles()
					} else {
						num_eles = that._setScrollVNumEles(true)
					} if (num_eles <= 1) {
						that._setScrollHLength();
						that._setScrollHVLength()
					}
				}
			}
		});
		var prevHScroll = 0;
		this.$hscroll = $("<div class='pq-hscroll'></div>").appendTo(this.$grid_inner);
		this.$hscroll.pqScrollBar({
			direction: "horizontal",
			pace: scrollModel.pace,
			theme: scrollModel.theme,
			steps: o.virtualX,
			cur_pos: 0,
			drag: function(evt, obj) {
				var virtualX = o.virtualX;
				if (!virtualX) {
					that._syncViewWithScrollBarHor(obj.ratio)
				}
			},
			scroll: function(evt, obj) {
				var virtualX = o.virtualX,
					virtualXHeader = o.virtualXHeader,
					header = virtualXHeader === false ? false : true;
				if (virtualX) {
					that.refresh({
						header: header
					})
				}
				if (virtualXHeader === false) {
					that._syncViewWithScrollBarHorHeader(obj.cur_pos)
				}
			}
		});
		element.height("");
		this.disableSelection();
		if (window.opera) {
			this.$grid_inner.bind("keypress.pq-grid", {
				that: this
			}, function(evt) {
				if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
					that._onKeyPressDown(evt)
				}
			})
		} else {
			this.$grid_inner.bind("keydown.pq-grid", {
				that: this
			}, function(evt) {
				if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
					that._onKeyPressDown(evt)
				}
			})
		}
		this._refreshOptions();
		this._refreshTitle();
		this.iRows = new $.paramquery.cRows(this);
		this.iCells = new $.paramquery.cCells(this);
		this.generateLoading();
		this._initPager();
		this._refreshResizable();
		this._refreshDraggable();
		this._mouseInit()
	};
	fn.toggle = function() {
		var o = this.options,
			CP = o.collapsible,
			$grid = this.element,
			state, $doc = $(document.body);
		if ($grid.css("position") == "fixed") {
			var eleObj = this.maxim.eleObj,
				docObj = this.maxim.docObj;
			o.height = eleObj.height;
			o.width = eleObj.width;
			$grid.css({
				position: eleObj.position,
				left: eleObj.left,
				top: eleObj.top,
				margin: eleObj.margin,
				zIndex: eleObj.zIndex
			});
			$doc.css({
				height: docObj.height,
				width: docObj.width,
				overflow: docObj.overflow
			});
			$("html").css({
				overflow: "visible"
			});
			window.scrollTo(docObj.scrollLeft, docObj.scrollTop);
			state = "min"
		} else {
			var eleObj = {
				height: o.height,
				width: o.width,
				position: $grid.css("position"),
				left: $grid.css("left"),
				top: $grid.css("top"),
				margin: $grid.css("margin"),
				zIndex: $grid.css("zIndex")
			};
			o.height = "100%-2";
			o.width = "100%-2";
			$grid.css($.extend({
				position: "fixed",
				left: 0,
				top: 0,
				margin: 0
			}, CP.css));
			var docObj = {
				height: $doc.height(),
				width: $doc.width(),
				overflow: $doc.css("overflow"),
				scrollLeft: $(window).scrollLeft(),
				scrollTop: $(window).scrollTop()
			};
			$(document.body).css({
				height: 0,
				width: 0,
				overflow: "hidden"
			});
			$("html").css({
				overflow: "hidden"
			});
			window.scrollTo(0, 0);
			this.maxim = {
				eleObj: eleObj,
				docObj: docObj
			};
			state = "max"
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
		var that = this,
			o = this.options;
		if (o.virtualX && o.virtualY) {
			return false
		}
		if (!evt.target) {
			return false
		}
		if ($(evt.target).closest(".pq-grid")[0] == this.element[0]) {
			if (o.height == "flex" && o.width == "flex") {
				return false
			}
			var SW = o.swipeModel;
			if (SW.on == false || (SW.on == "touch" && !$.support.touch)) {
				return false
			}
			return true
		}
		return false
	};
	fn._saveDims = function() {
		var $cont = this.$cont;
		$cont.data("offsetWidth", $cont[0].offsetWidth);
		$cont.data("offsetHeight", $cont[0].offsetHeight);
		var $tblb = this.$tbl;
		if ($tblb) {
			for (var i = 0; i < $tblb.length; i++) {
				var tbl = $tblb[i],
					$tbl = $(tbl);
				$tbl.data("offsetHeight", tbl.offsetHeight);
				$tbl.data("scrollWidth", tbl.scrollWidth)
			}
		}
		var $tblh = this.$tbl_header;
		if ($tblh) {
			for (var i = 0; i < $tblh.length; i++) {
				var tbl = $tblh[i],
					$tblParent = $(tbl).parent();
				$tblParent.data("offsetHeight", tbl.offsetHeight);
				$tblParent.data("scrollWidth", tbl.scrollWidth)
			}
		}
	};
	fn._mousePQUp = function(evt) {
		$(document).unbind("mouseup." + this.eventNamespace, this._mousePQUpDelegate);
		this._trigger("mousePQUp", evt, null)
	};
	fn._mouseDown = function(evt) {
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
		$(document).bind("mouseup." + this.eventNamespace, this._mousePQUpDelegate);
		return this._super.call(this, evt)
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
	fn._refreshGridWidthAndHeight = function() {
		var o = this.options,
			wd, ht, widthPercent = ((o.width + "").indexOf("%") > -1) ? true : false,
			heightPercent = ((o.height + "").indexOf("%") > -1) ? true : false,
			element = this.element;
		if (widthPercent || heightPercent) {
			var parent = element.parent();
			if (!parent.length) {
				return
			}
			var wdParent, htParent;
			if (parent[0] == document.body || element.css("position") == "fixed") {
				wdParent = $(window).width();
				htParent = (window.innerHeight ? window.innerHeight : $(window).height())
			} else {
				wdParent = parent.width();
				htParent = parent.height()
			}
			var superParent = null,
				calcOffset = function(val) {
					var re = /(-|\+)([0-9]+)/;
					var match = re.exec(val);
					if (match && match.length == 3) {
						return parseInt(match[1] + match[2])
					} else {
						return 0
					}
				}, widthOffset = widthPercent ? calcOffset(o.width) : 0,
				heightOffset = heightPercent ? calcOffset(o.height) : 0;
			if (wdParent == 0) {
				while (parent[0].tagName.toUpperCase() != "BODY") {
					var newParent = parent.parent();
					if (newParent[0] == null) {
						superParent = parent;
						break
					} else {
						parent = newParent
					}
				}
				if (superParent) {
					var position = superParent.css("position"),
						left = superParent.css("left"),
						top = superParent.css("top");
					superParent.css({
						position: "absolute",
						left: "-2000",
						top: "-2000"
					}).appendTo($(document.body));
					parent = element.parent();
					if (widthPercent) {
						wdParent = parent.width()
					}
					if (heightPercent) {
						htParent = parent.height()
					}
					superParent.css({
						position: position,
						left: left,
						top: top
					})
				}
			}
			if (widthPercent) {
				wd = (parseInt(o.width) * wdParent / 100) + widthOffset
			}
			if (heightPercent) {
				ht = (parseInt(o.height) * htParent / 100) + heightOffset
			}
		}
		if (!widthPercent) {
			wd = o.width
		}
		if (!heightPercent) {
			ht = o.height
		}
		if (wd != "auto" && wd < o.minWidth) {
			wd = o.minWidth
		}
		if (ht < o.minHeight) {
			ht = o.minHeight
		}
		element.width(wd);
		element.height(ht)
	};
	var lastParentHeight, lastParentWidth;
	fn._onWindowResize = function(evt, ui) {
		var o = this.options,
			$grid = this.element,
			$parent = $grid.parent(),
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
		} if (lastParentHeight != null && (newParentHeight == lastParentHeight) && newParentWidth == lastParentWidth) {
			return
		} else {
			lastParentHeight = newParentHeight;
			lastParentWidth = newParentWidth
		} if ($.support.touch && o.editModel.indices && $(document.activeElement).is(".pq-editor-focus")) {
			return
		}
		var that = this,
			timer = o.autoSizeInterval,
			timer = (timer === undefined) ? 0 : timer;
		if (this.autoResizeTimeout) {
			clearTimeout(this.autoResizeTimeout);
			delete this.autoResizeTimeout
		}
		this.autoResizeTimeout = window.setTimeout(function() {
			that._refreshAfterResize();
			delete that.autoResizeTimeout
		}, timer)
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
				if (o.height == "flex") {
					return true
				}
				num = wheelDelta / 120
			} else {
				if (evt.detail) {
					num = evt.detail * -1 / 3
				}
			}
		}
		var $scroll = horizontal ? that.$hscroll : that.$vscroll;
		var soptions = $scroll.pqScrollBar("option"),
			cur_pos = parseInt(soptions.cur_pos),
			num_eles = parseInt(soptions.num_eles);
		if ((horizontal && o.virtualX) || (!horizontal && o.virtualY)) {
			if (num > 0) {
				num = Math[num < 1 ? "ceil" : "floor"](num)
			} else {
				num = Math[num < -1 ? "ceil" : "floor"](num)
			}
			var new_pos = cur_pos - num;
			if (new_pos >= 0) {
				$scroll.pqScrollBar("option", "cur_pos", cur_pos - num);
				$scroll.pqScrollBar("scroll")
			}
		} else {
			var ratio = soptions.ratio;
			var new_ratio = ratio - (num / (num_eles - 1));
			if (new_ratio > 1) {
				new_ratio = 1
			} else {
				if (new_ratio < 0) {
					new_ratio = 0
				}
			}
			$scroll.pqScrollBar("option", "ratio", new_ratio);
			$scroll.pqScrollBar("drag")
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
		}, options = this.options;
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
	$.paramquery.getValueFromDataType = function(val, dataType, validation) {
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
		} if (isNaN(val2) || val2 == null) {
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
				return $.paramquery.getValueFromDataType(val, dataType, true)
			}, rowData = objP.rowData;
		if (!rowData) {
			throw ("rowData required.")
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
											if (type == "regexp") {
												if ((new RegExp(reqVal)).test(value)) {
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
													var ret = type.call(that.element[0], obj2);
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
			} if (!_valid) {
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
			o = that.options,
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
				rowData: rowData,
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
		} if (allowInvalid || warn) {
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
				rowIndx = (rowIndx == null) ? that.getRowIndx({
					rowData: rowData
				}).rowIndx : rowIndx;
				if (rowIndx == null) {
					return objvalid
				}
				if (!valueDef) {
					that.goToPage({
						rowIndx: rowIndx
					});
					that.editCell({
						rowIndx: rowIndx,
						dataIndx: dataIndx
					})
				} else {
					if ($(ae).hasClass("pq-editor-focus")) {
						var indices = o.editModel.indices;
						if (indices) {
							var rowIndx2 = indices.rowIndx,
								dataIndx2 = indices.dataIndx;
							if (rowIndx != null && rowIndx != rowIndx2) {
								throw ("incorrect usage of isValid rowIndx: " + rowIndx)
							}
							if (dataIndx != dataIndx2) {
								throw ("incorrect usage of isValid dataIndx: " + dataIndx)
							}
							that.editCell({
								rowIndx: rowIndx2,
								dataIndx: dataIndx
							})
						}
					}
				}
				var cell = that.getEditCell();
				if (cell && cell.$cell) {
					var $cell = cell.$cell;
					$cell.attr("title", msg);
					try {
						$cell.tooltip("destroy")
					} catch (ex) {}
					$cell.tooltip({
						position: {
							my: "left center+5",
							at: "right center"
						},
						content: function() {
							var strIcon = (icon == "") ? "" : ("<span class='ui-icon " + icon + " pq-tooltip-icon'></span>");
							return strIcon + msg
						},
						open: function(evt, ui) {
							if (cls) {
								ui.tooltip.addClass(cls)
							}
							if (style) {
								var olds = ui.tooltip.attr("style");
								ui.tooltip.attr("style", olds + ";" + style).css("zIndex", $cell.zIndex() + 5)
							}
							if (css) {
								ui.tooltip.css(css)
							}
						}
					}).tooltip("open")
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
		var that = this.that,
			objP = objP || {}, allowInvalid = objP.allowInvalid,
			checkEditable = objP.checkEditable,
			allowInvalid = (allowInvalid == null) ? false : allowInvalid,
			dataIndx = objP.dataIndx;
		if (dataIndx != null) {
			var column = that.columns[dataIndx],
				rowData = objP.rowData || that.getRowData(objP),
				valueDef = objP.hasOwnProperty("value"),
				value = (valueDef) ? objP.value : rowData[dataIndx],
				objValid = this.isValidCell({
					rowData: rowData,
					checkEditable: checkEditable,
					rowIndx: objP.rowIndx,
					value: value,
					valueDef: valueDef,
					column: column,
					allowInvalid: allowInvalid
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
							allowInvalid: allowInvalid
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
						if (that.isEditableRow({
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
						allowInvalid: allowInvalid
					});
					if (allowInvalid === false) {
						if (!objRet.valid) {
							return objRet
						}
					} else {
						cells = cells.concat(objRet.cells)
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
	fn.isEditableRow = function(objP) {
		var o = this.options,
			gEditable = o.editable;
		if (gEditable != null) {
			if (typeof gEditable == "function") {
				var rowIndx = objP.rowIndx,
					rowData = objP.rowData || this.getRowData({
						rowIndx: rowIndx
					});
				return gEditable.call(this.element[0], {
					rowData: rowData,
					rowIndx: rowIndx
				})
			} else {
				return gEditable
			}
		} else {
			return true
		}
	};
	fn.isEditableCell = function(objP) {
		var colIndx = objP.colIndx,
			dataIndx = objP.dataIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			column = this.colModel[colIndx],
			dataIndx = (dataIndx == null) ? column.dataIndx : dataIndx,
			cEditable = column.editable;
		if (objP.checkVisible && column.hidden) {
			return false
		}
		if (cEditable != null) {
			if (typeof cEditable == "function") {
				var rowIndx = objP.rowIndx,
					rowData = objP.rowData || this.getRowData(objP);
				return cEditable.call(this.element[0], {
					rowIndx: rowIndx,
					rowData: rowData,
					column: column,
					dataIndx: dataIndx
				})
			} else {
				return cEditable
			}
		} else {
			return true
		}
	};
	fn._getRowPQData = function(rowIndxPage, key, rowData) {
		var rowData = (rowData == null) ? this.pdata[rowIndxPage] : rowData;
		return rowData ? rowData[key] : null
	};
	fn._setRowPQData = function(rowIndxPage, objP, rowData) {
		var rowData = (rowData == null) ? this.pdata[rowIndxPage] : rowData;
		if (!rowData) {
			return
		}
		for (var key in objP) {
			rowData[key] = objP[key]
		}
	};
	fn._onContMouseDown = function(evt) {
		this.blurEditor({
			blurIfFocus: true
		});
		var that = this;
		var DM = that.options.dataModel;
		var objP = {
			dataModel: DM
		};
		if (that._trigger("contMouseDown", evt, objP) === false) {
			return false
		}
		var $target = $(evt.target),
			$td = $target.closest(".pq-grid-cell"),
			$tr = $target.closest(".pq-grid-row");
		if (!$td.length && !$tr.length) {
			this.$cont.attr("tabindex", 0).focus()
		}
		return true
	};
	fn._onCellMouseDown = function(evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices({
			$td: $td
		});
		objP.$td = $td;
		objP.dataModel = that.options.dataModel;
		if (that._trigger("cellMouseDown", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onRowMouseDown = function(evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var objP = that.getRowIndx({
			$tr: $tr
		});
		objP.$tr = $tr;
		objP.dataModel = that.options.dataModel;
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
	fn._onCellMouseUp = function(evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices({
			$td: $td
		});
		objP.$td = $td;
		objP.dataModel = that.options.dataModel;
		if (that._trigger("cellMouseUp", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onRowMouseUp = function(evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var objP = that.getRowIndx({
			$tr: $tr
		});
		if (that._trigger("rowMouseUp", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onClickCell = function(evt) {
		var that = this,
			thisOptions = this.options,
			CM = this.colModel,
			EM = thisOptions.editModel,
			SM = thisOptions.selectionModel;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices({
			$td: $td
		});
		var rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = rowIndxPage + offset,
			colIndx = objP.colIndx;
		objP.rowIndx = rowIndx;
		if (colIndx == null) {
			return
		}
		var column = CM[colIndx],
			dataIndx = column.dataIndx;
		objP.dataIndx = dataIndx;
		objP.evt = evt;
		if (that._trigger("cellClick", evt, {
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
		if (EM.clicksToEdit == 1 && this.isEditableRow({
			rowIndx: rowIndx
		}) && this.isEditableCell({
			colIndx: colIndx,
			rowIndx: rowIndx
		})) {
			that.editCell(objP);
			return
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
	fn._refreshOptions = function() {
		this._refreshDataOptions()
	};
	fn._refreshDataOptions = function() {};
	fn.enableSelection = function() {
		this.$cont.enableSelection()
	};
	fn.disableSelection = function() {
		this.$cont.disableSelection();
		this.$header_o.find("tr.pq-grid-title-row").disableSelection()
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
		var DM = this.options.pageModel;
		var that = this;
		var obj2 = {
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
								apply: true
							})
						}
					})
				} else {
					that.refreshView()
				}
			},
			refresh: function(evt) {
				that.refreshDataAndView()
			}
		};
		if (DM.type) {
			this.$footer.pqPager(obj2)
		} else {}
	};
	fn._refreshHideArrHS = function() {
		var that = this,
			CM = this.colModel,
			hidearrHS = that.hidearrHS,
			initH = that.initH,
			finalH = that.finalH,
			freezeCols = parseInt(this.options.freezeCols);
		for (var i = 0; i < freezeCols; i++) {
			hidearrHS[i] = false
		}
		for (var i = freezeCols; i < initH; i++) {
			hidearrHS[i] = true
		}
		for (var i = initH; i <= finalH; i++) {
			hidearrHS[i] = false
		}
		for (var i = finalH + 1, len = CM.length; i < len; i++) {
			hidearrHS[i] = true
		}
	};
	fn.generateLoading = function() {
		if (this.$loading) {
			this.$loading.remove()
		}
		this.$loading = $("<div class='pq-loading'></div>").appendTo(this.element);
		$(["<div class='pq-loading-bg'></div><div class='pq-loading-mask ui-state-highlight'><div>", this.options.strLoading, "...</div></div>"].join("")).appendTo(this.$loading);
		this.$loading.find("div.pq-loading-bg").css("opacity", 0.2)
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
	fn.refreshDataFromDataModel = function() {
		this._trigger("beforeRefreshData", null, {});
		var thisOptions = this.options,
			DM = thisOptions.dataModel,
			PM = thisOptions.pageModel,
			DMdata = DM.data,
			paging = PM.type;
		this.rowIndxOffset = 0;
		if (DMdata == null || DMdata.length == 0) {
			if (paging) {
				PM.curPage = 0;
				PM.totalPages = 0;
				PM.totalRecords = 0
			}
			this.pdata = DMdata;
			return
		}
		if (paging && paging == "local") {
			PM.totalRecords = DMdata.length;
			PM.totalPages = Math.ceil(DMdata.length / PM.rPP);
			if (PM.curPage > PM.totalPages) {
				PM.curPage = PM.totalPages
			}
			if (PM.curPage < 1 && PM.totalPages > 0) {
				PM.curPage = 1
			}
			var begIndx = (PM.curPage - 1) * PM.rPP;
			var endIndx = PM.curPage * PM.rPP;
			if (endIndx > DMdata.length) {
				endIndx = DMdata.length
			}
			this.pdata = DMdata.slice(begIndx, endIndx)
		} else {
			if (paging == "remote") {
				var totalPages = Math.ceil(PM.totalRecords / PM.rPP);
				PM.totalPages = totalPages;
				if (totalPages && !PM.curPage) {
					PM.curPage = 1
				}
				var endIndx = PM.rPP;
				if (endIndx > DMdata.length) {
					endIndx = DMdata.length
				}
				this.pdata = DMdata.slice(0, endIndx)
			} else {
				if (thisOptions.backwardCompat) {
					this.pdata = DMdata.slice(0)
				} else {
					this.pdata = DMdata
				}
			}
		} if (paging == "local" || paging == "remote") {
			this.rowIndxOffset = (PM.rPP * (PM.curPage - 1))
		}
	};
	$.paramquery.filter = function() {
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
			getAllConditions: (function() {
				var arr = [];
				for (var key in conditions) {
					arr.push(key)
				}
				return arr
			})(),
			getConditions: function(type) {
				var arr = [];
				for (var key in conditions) {
					if (conditions[key][type]) {
						arr.push(key)
					}
				}
				return arr
			},
			getTRConditions: (function() {
				var arr = [];
				for (var key in conditions) {
					if (conditions[key].TR) {
						arr.push(key)
					}
				}
				return arr
			})(),
			getWTRConditions: (function() {
				var arr = [];
				for (var key in conditions) {
					if (!conditions[key].TR) {
						arr.push(key)
					}
				}
				return arr
			})()
		}
	}();
	$.paramquery.filter.rules = {};
	$.paramquery.filter.rules.en = {
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
	fn.getQueryStringSort = function() {
		var sorters = this.iSort.sorters,
			sortBy = "",
			options = this.options,
			sql = options.sql,
			stringify = options.stringify;
		if (sql) {
			for (var i = 0; i < sorters.length; i++) {
				var sorter = sorters[i],
					dataIndx = sorter.dataIndx,
					dir = sorter.dir == "up" ? "asc" : "desc";
				sortBy += (i > 0 ? ", " : "") + dataIndx + " " + dir
			}
			return sortBy
		} else {
			if (sorters.length) {
				if (stringify === false) {
					return sorters
				} else {
					return JSON.stringify(sorters)
				}
			} else {
				return ""
			}
		}
	};
	fn.getQueryStringCRUD = function() {
		return ""
	};
	fn.getQueryStringFilter = function() {
		var thisOptions = this.options,
			sql = thisOptions.sql,
			stringify = thisOptions.stringify,
			FM = thisOptions.filterModel,
			FMmode = FM.mode,
			CM = this.colModel,
			arrS = this.getFilterData({
				CM: CM,
				location: "remote"
			}),
			filter = "";
		if (FM && FM.on && arrS) {
			if (sql) {
				filter = [];
				for (var j = 0; j < arrS.length; j++) {
					var f = arrS[j],
						condition = f.condition,
						dataIndx = f.dataIndx,
						text = $.trim(f.value);
					if (condition === "contain") {
						filter.push(dataIndx + " like '%" + text + "%'")
					} else {
						if (condition === "notcontain") {
							filter.push(dataIndx + " not like '%" + text + "%'")
						} else {
							if (condition === "begin") {
								filter.push(dataIndx + " like '" + text + "%'")
							} else {
								if (condition === "end") {
									filter.push(dataIndx + " like '%" + text + "'")
								} else {
									if (condition === "equal") {
										filter.push(dataIndx + "='" + text + "'")
									} else {
										if (condition === "notequal") {
											filter.push(dataIndx + "!='" + text + "'")
										} else {
											if (condition === "empty") {
												filter.push("isnull(" + dataIndx + ",'')=''")
											} else {
												if (condition === "notempty") {
													filter.push("isnull(" + dataIndx + ",'')!=''")
												} else {
													if (condition === "less") {
														filter.push(dataIndx + "<'" + text + "'")
													} else {
														if (condition === "great") {
															filter.push(dataIndx + ">'" + text + "'")
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
				filter = filter.join(" " + FMmode + " ")
			} else {
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
		}
		return filter
	};
	fn.remoteRequest = function(objP) {
		if (this.loading) {
			this.xhr.abort()
		}
		var that = this,
			url = "",
			dataURL = "",
			thisOptions = this.options,
			raiseFilterEvent = false,
			thisColModel = this.colModel,
			DM = thisOptions.dataModel,
			FM = thisOptions.filterModel,
			PM = thisOptions.pageModel;
		if (typeof DM.getUrl == "function") {
			var objk = {
				colModel: thisColModel,
				dataModel: DM,
				groupModel: thisOptions.groupModel,
				pageModel: PM,
				filterModel: FM
			};
			var objURL = DM.getUrl.call(this.element[0], objk);
			if (objURL && objURL.url) {
				url = objURL.url
			}
			if (objURL && objURL.data) {
				dataURL = objURL.data
			}
		} else {
			if (typeof DM.url == "string") {
				url = DM.url;
				var sortQueryString = {}, filterQueryString = {}, pageQueryString = {};
				if (DM.sorting == "remote") {
					var sortingQS = this.getQueryStringSort();
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
					filterQS = this.getQueryStringFilter();
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
					postData = postData.call(this.element[0], {
						colModel: thisColModel,
						dataModel: DM
					})
				}
				dataURL = $.extend({
					pq_datatype: DM.dataType
				}, filterQueryString, pageQueryString, sortQueryString, postData, postDataOnce)
			}
		} if (!url) {
			return
		}
		this.loading = true;
		this.showLoading();
		this.xhr = $.ajax({
			url: url,
			dataType: DM.dataType,
			async: (DM.async == null) ? true : DM.async,
			cache: DM.cache,
			contentType: DM.contentType,
			type: DM.method,
			data: dataURL,
			beforeSend: function(jqXHR, settings) {
				if (typeof DM.beforeSend == "function") {
					return DM.beforeSend.call(that.element[0], jqXHR, settings)
				}
			},
			success: function(responseObj, textStatus, jqXHR) {
				if (typeof DM.getData == "function") {
					var retObj = DM.getData.call(that.element[0], responseObj, textStatus, jqXHR);
					DM.data = retObj.data;
					if (PM.type && PM.type == "remote") {
						if (retObj.curPage) {
							PM.curPage = retObj.curPage
						}
						if (retObj.totalRecords) {
							PM.totalRecords = retObj.totalRecords
						}
					}
				} else {
					DM.data = responseObj.data;
					if (PM.type && PM.type == "remote") {
						if (responseObj.curPage) {
							PM.curPage = responseObj.curPage
						}
						if (responseObj.totalRecords) {
							PM.totalRecords = responseObj.totalRecords
						}
					}
				}
				that.hideLoading();
				that.loading = false;
				if (objP && objP.callback) {
					objP.callback()
				}
				that._trigger("load", null, {
					dataModel: DM,
					colModel: thisColModel
				});
				if (raiseFilterEvent) {
					that._trigger("filter", null, {
						type: "remote",
						dataModel: DM,
						colModel: thisColModel,
						filterModel: FM
					})
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				that.hideLoading();
				that.loading = false;
				if (typeof DM.error == "function") {
					DM.error.call(that.element[0], jqXHR, textStatus, errorThrown)
				} else {
					if (errorThrown != "abort") {
						throw ("Error : " + errorThrown)
					}
				}
			}
		})
	};
	fn.setFlexWHCallback = function(fn) {
		var that = this;
		fn.call(that);
		var o = this.options;
		if (o.height == "flex") {
			this._setGridHeightFromTable()
		}
		if (o.width == "flex") {
			this._setGridWidthFromTable()
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
			this.$title.removeClass("pq-draggable");
			ele.unwrap(".pq-wrapper")
		}
	};
	fn._refreshDraggable = function() {
		var o = this.options,
			ele = this.element,
			$title = this.$title;
		if (o.draggable) {
			$title.addClass("pq-draggable");
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
			widthPercent = ((o.width + "").indexOf("%") > -1),
			heightPercent = ((o.height + "").indexOf("%") > -1),
			autoWidth = (o.width == "auto"),
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
							opacity: 0.5,
							background: "#ccc",
							border: "1px solid steelblue"
						})
					},
					resize: function(evt, ui) {},
					stop: function(evt, ui) {
						var $ele = that.element,
							width = o.width,
							height = o.height,
							widthPercent = ((width + "").indexOf("%") > -1),
							heightPercent = ((height + "").indexOf("%") > -1),
							autoWidth = (width == "auto"),
							flexWidth = width == "flex",
							flexHeight = height == "flex",
							refreshRQ = false;
						if (!heightPercent && !flexHeight) {
							refreshRQ = true;
							o.height = $ele.height()
						}
						if (!widthPercent && !autoWidth && !flexWidth) {
							refreshRQ = true;
							o.width = $ele.width()
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
		var o = this.options,
			wd = o.width,
			ht = o.height,
			widthPercent = ((wd + "").indexOf("%") != -1) ? true : false,
			autoWidth = (wd === "auto"),
			heightPercent = ((ht + "").indexOf("%") != -1) ? true : false;
		if (widthPercent || autoWidth || heightPercent) {
			this.refresh()
		}
	};
	fn.refresh = function(objP) {
		this._refresh(objP)
	};
	fn._refreshDataIndices = function() {
		var isJSON = (this.getDataType() == "JSON") ? true : false,
			columns = {}, colIndxs = {}, validations = {};
		var CM = this.colModel,
			CMLength = CM.length;
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx;
			if (dataIndx == null) {
				dataIndx = isJSON ? "dataIndx_" + i : i;
				column.dataIndx = dataIndx
			}
			columns[dataIndx] = column;
			colIndxs[dataIndx] = i;
			var valids = column.validations;
			if (valids) {
				validations[dataIndx] = validations
			}
		}
		this.columns = columns;
		this.colIndxs = colIndxs;
		this.validations = validations
	};
	fn.refreshView = function(obj) {
		if (this.options.editModel.indices != null) {
			this.blurEditor({
				force: true
			})
		}
		this.refreshDataFromDataModel();
		this.refresh(obj)
	};
	fn._refresh = function(objP) {
		objP = objP || {};
		var header = objP.header,
			table = objP.table,
			$grid = this.element;
		if (!$grid[0].offsetWidth) {
			return
		}
		this.$grid_inner[0].scrollTop = 0;
		var o = this.options;
		this.decidePanes();
		o.collapsible._collapsed = false;
		var that = this;
		this._refreshGridWidthAndHeight();
		this.iRefreshColumn.refreshColumnWidths();
		this._setScrollHNumEles();
		this._bufferObj_calcInitFinalH();
		this._refreshHideArrHS();
		if (header !== false) {
			this._createHeader()
		} else {
			this._refreshHeader()
		}
		this._refreshHeaderSortIcons();
		this._refreshPager();
		this._setInnerGridHeight();
		this._setRightGridHeight();
		$grid.height("");
		this.setFlexWHCallback(function() {
			if (table !== false) {
				that.iGenerateView.generateView()
			} else {
				that._saveDims();
				that.iGenerateView.scrollView()
			}
		});
		this._refreshScrollbars();
		this._refreshFreezeLine();
		this._createCollapse();
		o.dataModel.postDataOnce = undefined
	};
	fn._refreshScrollbars = function(objP) {
		this._setScrollHLength();
		this._setScrollVLength();
		this._setScrollVNumEles(true);
		this._setScrollHLength();
		this._setScrollHVLength()
	};
	fn._setScrollHVLength = function() {
		var options = this.options;
		if (this.$hscroll.is(":hidden") || options.height == "flex" || options.width == "flex") {
			this.$hvscroll.css("visibility", "hidden")
		}
	};
	fn._refreshPager = function() {
		var options = this.options,
			DM = options.pageModel,
			$footer = this.$footer,
			paging = DM.type ? true : false,
			rPP = DM.rPP,
			totalRecords = DM.totalRecords;
		if (paging) {
			var obj = options.pageModel;
			if ($footer.hasClass("pq-pager") == false) {
				this._initPager()
			}
			$footer.pqPager("option", obj);
			if (totalRecords > rPP) {
				this.$bottom.css("display", "")
			}
		} else {
			if ($footer.hasClass("pq-pager")) {
				$footer.pqPager("destroy")
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
	fn._addRowsData = function(obj) {
		var newdata = obj.data,
			data = this.options.dataModel.data,
			rowIndx = obj.rowIndx;
		if (data == null) {
			data = []
		}
		if (rowIndx == null) {
			for (var i = 0, len = newdata.length; i < len; i++) {
				var rowData = newdata[i];
				data.push(rowData)
			}
		} else {
			if (rowIndx < data.length) {
				for (var i = 0, len = newdata.length; i < len; i++) {
					var rowData = newdata[i];
					data.splice(rowIndx, 0, rowData);
					rowIndx++
				}
			} else {
				return false
			}
		}
		return true
	};
	fn.addRows = function(obj) {
		if (this._addRowsData(obj)) {
			this.refreshDataFromDataModel();
			this.refresh();
			return true
		} else {
			return false
		}
	};
	fn.refreshDataAndView = function(objP) {
		var DM = this.options.dataModel;
		this.iSort._refreshSorters();
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
	fn.getColIndx = function(obj) {
		var dataIndx = obj.dataIndx;
		if (dataIndx === undefined) {
			throw ("dataIndx NA")
		}
		var thisColModel = this.colModel;
		for (var i = 0, len = thisColModel.length; i < len; i++) {
			if (thisColModel[i].dataIndx == dataIndx) {
				return i
			}
		}
	};
	fn.getColumn = function(obj) {
		if (obj.dataIndx == null) {
			throw ("dataIndx N/A")
		}
		return this.columns[obj.dataIndx]
	};
	fn._onDataAvailable = function() {};
	fn._setOption = function(key, value) {
		var options = this.options;
		if (key === "height" && value == "flex") {
			this._super.call(this, key, value);
			var $vscroll = this.$vscroll;
			if (value && $vscroll && $vscroll.hasClass("pq-sb-vert")) {
				if (options.virtualY) {
					$vscroll.pqScrollBar("option", "cur_pos", 0)
				} else {
					$vscroll.pqScrollBar("option", "ratio", 0)
				}
			}
		} else {
			if (key === "width" && value == "flex") {
				this._super.call(this, key, value);
				var $hscroll = this.$hscroll;
				if (value && $hscroll && $hscroll.hasClass("pq-sb-horiz")) {
					if (options.virtualX) {
						$hscroll.pqScrollBar("option", "cur_pos", 0)
					} else {
						$hscroll.pqScrollBar("option", "ratio", 0)
					}
				}
			} else {
				if (key == "title") {
					this._super.call(this, key, value);
					this._refreshTitle()
				} else {
					if (key == "roundCorners") {
						this._super.call(this, key, value);
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
						if (key == "freezeCols") {
							value = parseInt(value);
							if (!isNaN(value) && value >= 0 && value <= this.colModel.length - 2) {
								this._super.call(this, key, value)
							}
						} else {
							if (key == "freezeRows") {
								value = parseInt(value);
								if (!isNaN(value) && value >= 0) {
									this._super.call(this, key, value)
								}
							} else {
								if (key == "resizable") {
									this._super.call(this, key, value);
									this._refreshResizable()
								} else {
									if (key == "draggable") {
										this._super.call(this, key, value);
										this._refreshDraggable()
									} else {
										if (key == "scrollModel") {
											this._super.call(this, key, value)
										} else {
											if (key == "dataModel") {
												this._super.call(this, key, value)
											} else {
												if (key == "pageModel") {
													this._super.call(this, key, value)
												} else {
													if (key === "selectionModel") {
														this._super.call(this, key, value)
													} else {
														if (key === "colModel" || key == "columnTemplate") {
															this._super.call(this, key, value);
															this._calcThisColModel()
														} else {
															if (key === "disabled") {
																this._super.call(this, key, value);
																if (value === true) {
																	this._disable()
																} else {
																	this._enable()
																}
															} else {
																if (key === "numberCell") {
																	this._super.call(this, key, value);
																	this.decidePanes()
																} else {
																	if (key === "strLoading") {
																		this._super.call(this, key, value);
																		this._refreshLoadingString()
																	} else {
																		if (key === "showTop") {
																			this._super.call(this, key, value);
																			if (value === true) {
																				this.$top.css("display", "")
																			} else {
																				this.$top.css("display", "none")
																			}
																		} else {
																			if (key === "showTitle") {
																				this._super.call(this, key, value);
																				if (value === true) {
																					this.$title.css("display", "")
																				} else {
																					this.$title.css("display", "none")
																				}
																			} else {
																				if (key === "showToolbar") {
																					this._super.call(this, key, value);
																					if (value === true) {
																						this.$toolbar.css("display", "")
																					} else {
																						this.$toolbar.css("display", "none")
																					}
																				} else {
																					if (key == "toolbar") {
																						this._super.call(this, key, value);
																						this.$toolbar.remove();
																						this._super.call(this, key, value);
																						this._createToolbar()
																					} else {
																						if (key === "collapsible") {
																							this._super.call(this, key, value);
																							this._createCollapse()
																						} else {
																							if (key === "showBottom") {
																								this._super.call(this, key, value);
																								if (value === true) {
																									this.$bottom.css("display", "")
																								} else {
																									this.$bottom.css("display", "none")
																								}
																							} else {
																								this._super.call(this, key, value)
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
	};
	fn._setOptions = function() {
		this._super.apply(this, arguments)
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
			this.$div_focus = $(["<div class='pq-editor-outer'>", "<div class='pq-editor-inner'>", "</div>", "</div>"].join("")).appendTo($parent);
			this.$div_focus.css("zIndex", $parent.zIndex() + 5)
		}
		var obj = $.extend({
			all: true
		}, EM.indices);
		var $td = this.getCell(obj);
		$td.css("height", $td.height());
		$td.empty();
		this.refreshEditorPos()
	};
	fn._removeCellRowOutline = function(objP) {
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
			this.refreshCell(obj)
		}
	};
	fn.refreshEditorPos = function() {
		var o = this.options,
			EM = o.editModel,
			cellBW = EM.cellBorderWidth,
			$div_focus = this.$div_focus,
			$td = this.getCell(EM.indices);
		if (!$td) {
			return false
		}
		var wd = $td[0].offsetWidth - (cellBW ? (cellBW * 2) : 1);
		var ht = $td[0].offsetHeight - (cellBW ? (cellBW * 2) : 1),
			offset = this.element.offset(),
			tdOffset = $td.offset(),
			lft = tdOffset.left - offset.left - 1,
			top = tdOffset.top - offset.top - 1;
		$div_focus.css({
			height: ht,
			width: wd,
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
	fn._onHeaderCellClick = function(colIndx, evt) {
		var that = this,
			column = that.colModel[colIndx],
			thisOptions = this.options,
			DM = thisOptions.dataModel,
			dataIndx = column.dataIndx,
			dataType = column.dataType;
		if (that._trigger("headerCellClick", evt, {
			column: column,
			colIndx: colIndx,
			dataIndx: dataIndx
		}) === false) {
			return
		}
		if (!thisOptions.sortable) {
			return
		}
		if (column.sortable == false) {
			return
		}
		this.sort({
			colIndx: colIndx,
			column: column,
			dataIndx: dataIndx
		})
	};
	fn._selectRow = function(rowIndx, evt) {
		this.selectRow(rowIndx, evt)
	};
	fn._findfirstUnhiddenColIndx = function() {
		for (var i = 0; i < this.colModel.length; i++) {
			if (!this.colModel[i].hidden) {
				return i
			}
		}
	};
	fn.selectRow = function(obj) {
		var evt = obj.evt;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.iRows.replace(obj) == false) {
				return false
			}
		} else {
			if (this.iRows.add(obj) == false) {
				return false
			}
		}
		return true
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
		} if (tbl) {
			return $(tbl)
		}
	};
	fn.scrollCell = function(obj) {
		this.scrollRow(obj);
		this.scrollColumn(obj)
	};
	fn.scrollY = function(curPos) {
		this.$vscroll.pqScrollBar("option", "cur_pos", curPos).pqScrollBar("scroll")
	};
	fn.scrollRow = function(obj) {
		var thisOptions = this.options;
		if (!this.pdata || obj.rowIndxPage >= this.pdata.length) {
			return false
		}
		if (thisOptions.virtualY) {
			this._scrollRowVirtualY(obj)
		} else {
			this._scrollRowNonVirtualY(obj)
		}
	};
	fn._scrollRowNonVirtualY = function(obj) {
		var thisOptions = this.options,
			rowIndxPage = obj.rowIndxPage,
			nested = (this.iHierarchy ? true : false),
			rowIndx = obj.rowIndx,
			contHt = this.$cont.data("offsetHeight") - this._getScollBarHorizontalHeight(),
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - this.rowIndxOffset) : rowIndxPage,
			freezeRows = parseInt(thisOptions.freezeRows);
		if (rowIndxPage < freezeRows) {
			return
		}
		var $tbl = this.get$Tbl(rowIndxPage),
			$tr = this.getRow({
				rowIndxPage: rowIndxPage
			}),
			tr = $tr[0];
		if (!tr) {
			return
		}
		var offset1 = tr.offsetTop + parseInt($tbl.css("marginTop")),
			trHt = tr.offsetHeight;
		if (nested) {
			var $tr_next = $tr.next("tr.pq-detail-child");
			if ($tr_next && $tr_next.length) {
				trHt += $tr_next[0].offsetHeight
			}
		}
		var offset2 = tr.offsetTop + $tbl[0].offsetTop;
		if (tr.offsetTop < (-1 * $tbl[0].offsetTop)) {
			var marginTop = (-1 * tr.offsetTop) - parseInt($tbl.css("top"));
			$tbl.css("marginTop", marginTop);
			this._syncScrollBarVert()
		} else {
			if (offset1 + trHt >= contHt) {
				var marginTop = contHt - trHt - tr.offsetTop;
				$tbl.css("marginTop", marginTop);
				this._syncScrollBarVert()
			}
		}
	};
	fn._scrollRowVirtualY = function(obj) {
		var thisOptions = this.options,
			rowIndxPage = obj.rowIndxPage,
			nested = (this.iHierarchy ? true : false),
			rowIndx = obj.rowIndx,
			scrollCurPos = this.scrollCurPos,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - this.rowIndxOffset) : rowIndxPage,
			freezeRows = parseInt(thisOptions.freezeRows);
		if (rowIndxPage < freezeRows) {
			return
		}
		var calcCurPos = this._calcCurPosFromRowIndxPage(rowIndxPage);
		if (calcCurPos == null) {
			return
		}
		if (calcCurPos < scrollCurPos) {
			this.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
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
			this.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
		} else {
			var td_bottom = tr.offsetTop + tr.offsetHeight,
				htCont = this.$cont[0].offsetHeight,
				marginTop = tbl_marginTop,
				htSB = this._getScollBarHorizontalHeight(),
				$tr_prev = $tr_first.prev("tr");
			if ($tr_prev.hasClass("pq-row-hidden") || $tr_prev.hasClass("pq-last-freeze-row")) {
				return
			} else {
				if (td_bottom > htCont - htSB - marginTop) {
					var diff = td_bottom - (htCont - htSB - marginTop);
					var $trs = $tbl.children().children("tr");
					var ht = 0,
						indx = 0;
					var $tr_next;
					if (freezeRows) {
						$tr_next = $trs.filter("tr.pq-last-freeze-row").last().next();
						if ($tr_next.length == 0) {
							$tr_next = $trs.filter("tr.pq-row-hidden").next()
						}
					} else {
						$tr_next = $trs.filter("tr.pq-row-hidden").next()
					}
					do {
						ht += $tr_next[0].offsetHeight;
						if ($tr_next[0] == $tr[0]) {
							break
						} else {
							if (!nested || ($tr_next.hasClass("pq-detail-child") == false)) {
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
					var num_eles = this.$vscroll.pqScrollBar("option", "num_eles");
					if (num_eles < cur_pos + 1) {
						num_eles = cur_pos + 1
					}
					this.$vscroll.pqScrollBar("option", {
						num_eles: num_eles,
						cur_pos: cur_pos
					}).pqScrollBar("scroll")
				}
			}
		}
	};
	fn.getTableForVertScroll = function() {
		var that = this,
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
	fn.getTableForHorScroll = function() {
		var that = this,
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
		} if (this.tables.length) {
			var $tbl2 = this.tables[0].$tbl;
			if (pqpanes.v) {
				tbl.push($tbl2[1])
			} else {
				tbl.push($tbl2[0])
			}
		}
		return $(tbl)
	};
	fn.getTableHeaderForHorScroll = function() {
		var that = this,
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
	fn._syncViewWithScrollBarVert = function(ratio) {
		if (ratio == null) {
			return
		}
		var that = this,
			$tbl = that.getTableForVertScroll();
		if (!$tbl || !$tbl.length) {
			return
		}
		var o = this.options;
		if (o.editModel.indices) {
			this.blurEditor({
				force: true
			})
		}
		var tblHt = $tbl.data("offsetHeight"),
			contHt = that.$cont.data("offsetHeight") - that._getScollBarHorizontalHeight(),
			excess = tblHt - contHt,
			marginTop = excess * ratio,
			marginTop = (-1 * marginTop) - 1;
		if (!tblHt || !contHt) {
			if (o.debug) {
				throw "_syncViewWithScrollBarVert !tblHt || !contHt"
			}
		}
		if (marginTop > -1) {
			marginTop = -1
		}
		$tbl.css({
			marginTop: marginTop
		})
	};
	fn._syncViewWithScrollBarHor = function(ratio) {
		if (ratio == null) {
			return
		}
		var that = this,
			$tbl = that.getTableForHorScroll();
		var $tbl_h = that.getTableHeaderForHorScroll();
		if (!$tbl && !$tbl_h) {
			return
		}
		var o = this.options;
		if (o.editModel.indices) {
			this.blurEditor({
				force: true
			})
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h,
			tblWd = $tbl_r.data("scrollWidth"),
			contWd = that.$cont.data("offsetWidth") - that._getSBWidth(),
			excess = tblWd - contWd,
			marginLeft = excess * ratio,
			marginLeft = (-1 * marginLeft);
		if (!tblWd || !contWd) {
			return
		}
		if (marginLeft > 0) {
			marginLeft = 0
		}
		if ($tbl) {
			$tbl.css("marginLeft", marginLeft)
		}
		if ($tbl_h) {
			$tbl_h.css("marginLeft", marginLeft)
		}
	};
	fn._syncViewWithScrollBarHorHeader = function(cur_pos) {
		if (cur_pos == null) {
			return
		}
		var that = this,
			$tbl_h = that.getTableHeaderForHorScroll();
		if (!$tbl_h) {
			return
		}
		var o = this.options,
			freezeCols = o.freezeCols;
		if (o.editModel.indices) {
			this.blurEditor({
				force: true
			})
		}
		var $tbl_r = $tbl_h,
			tblWd = $tbl_r.data("scrollWidth"),
			contWd = that.$cont.data("offsetWidth") - that._getSBWidth(),
			marginLeft = calcWidthCols.call(this, freezeCols, cur_pos + freezeCols),
			marginLeft = (-1 * marginLeft);
		if (!tblWd || !contWd) {
			return
		}
		if (marginLeft > 0) {
			marginLeft = 0
		}
		$tbl_h.css("marginLeft", marginLeft)
	};
	fn._syncScrollBarVert = function() {
		var that = this,
			$tbl = that.getTableForVertScroll();
		if (!$tbl || !$tbl.length) {
			return
		}
		var tblHt = $tbl.data("offsetHeight"),
			contHt = that.$cont.data("offsetHeight") - that._getScollBarHorizontalHeight(),
			excess = tblHt - contHt,
			marginTop = (-1 * parseInt($tbl.css("marginTop"))),
			ratio = (marginTop - 1) / (excess - 1);
		if (ratio >= 0 && ratio <= 1) {
			if (that.$vscroll.hasClass("pq-sb-vert")) {
				that.$vscroll.pqScrollBar("option", "ratio", ratio)
			}
		}
	};
	fn._syncScrollBarHor = function() {
		var that = this,
			$tbl = that.getTableForHorScroll(),
			$tbl_h = that.getTableHeaderForHorScroll();
		if (!$tbl && !$tbl_h) {
			return
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h;
		var tblWd = $tbl_r.data("scrollWidth"),
			contWd = that.$cont.data("offsetWidth") - that._getSBWidth(),
			excess = tblWd - contWd,
			marginLeft = (-1 * parseInt($tbl_r.css("marginLeft"))),
			ratio = (marginLeft / excess);
		if (ratio >= 0 && ratio <= 1) {
			if (that.$hscroll.hasClass("pq-sb-horiz")) {
				that.$hscroll.pqScrollBar("option", "ratio", ratio)
			}
		}
	};
	fn._scrollColumnNonVirtual = function(objP) {
		var colIndx = objP.colIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: objP.dataIndx
			}) : colIndx,
			freezeCols = this.options.freezeCols;
		if (colIndx < freezeCols) {
			return
		}
		var td_right = this._calcRightEdgeCol(colIndx).width,
			td_left = this._calcRightEdgeCol(colIndx - 1).width,
			wdFrozen = this._calcRightEdgeCol(freezeCols - 1).width,
			wdSB = this._getSBWidth(),
			$tbl = this.getTableForHorScroll(),
			$tbl_h = this.getTableHeaderForHorScroll(),
			contWd = this.$cont[0].offsetWidth - wdSB,
			marginLeft, offsetLeft;
		if ($tbl) {
			marginLeft = parseInt($tbl.css("marginLeft"));
			offsetLeft = $tbl[0].offsetLeft
		} else {
			if ($tbl_h) {
				marginLeft = parseInt($tbl_h.css("marginLeft"));
				offsetLeft = $tbl_h[0].offsetLeft - wdFrozen
			} else {
				return
			}
		} if (td_right + marginLeft > contWd) {
			marginLeft = (contWd - td_right);
			if ($tbl) {
				$tbl.css("marginLeft", marginLeft)
			}
			if ($tbl_h) {
				$tbl_h.css("marginLeft", marginLeft)
			}
			this._syncScrollBarHor()
		} else {
			if (td_left < (-1 * offsetLeft)) {
				marginLeft = (-1 * td_left) + wdFrozen;
				if ($tbl) {
					$tbl.css("marginLeft", marginLeft)
				}
				if ($tbl_h) {
					$tbl_h.css("marginLeft", marginLeft)
				}
				this._syncScrollBarHor()
			}
		}
	};
	fn._scrollColumnVirtual = function(objP) {
		var colIndx = objP.colIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: objP.dataIndx
			}) : colIndx,
			freezeCols = this.options.freezeCols;
		var td_right = this._calcRightEdgeCol(colIndx).width,
			wdSB = this._getSBWidth(),
			contWd = this.$cont[0].offsetWidth - wdSB;
		if (td_right > contWd) {
			var diff = calcWidthCols.call(this, -1, colIndx + 1) - (contWd),
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
			this.$hscroll.pqScrollBar("option", "cur_pos", initH).pqScrollBar("scroll");
			return true
		} else {
			if (this.hidearrHS[colIndx]) {
				this.hidearrHS[colIndx] = false;
				var cur_pos = colIndx - freezeCols - this._calcNumHiddenUnFrozens(colIndx);
				this.$hscroll.pqScrollBar("option", "cur_pos", cur_pos).pqScrollBar("scroll");
				return true
			}
		}
		return false
	};
	fn.scrollColumn = function(objP) {
		var o = this.options,
			virtualX = o.virtualX;
		if (virtualX) {
			return this._scrollColumnVirtual(objP)
		} else {
			return this._scrollColumnNonVirtual(objP)
		}
	};
	fn.selection = function(obj) {
		var method = obj.method,
			type = obj.type;
		if (type == "row") {
			return this["iRows"][method](obj)
		} else {
			if (type == "cell") {
				return this["iCells"][method](obj)
			}
		}
		return
	};
	fn._bringPageIntoView = function(obj) {
		var rowIndx = obj.rowIndx,
			that = this;
		var DM = this.options.pageModel;
		if (DM.type == "local" && rowIndx >= 0) {
			var curPage = DM.curPage;
			var rPP = DM.rPP;
			var begIndx = (curPage - 1) * rPP;
			var endIndx = curPage * rPP;
			if (rowIndx >= begIndx && rowIndx < endIndx) {} else {
				DM.curPage = Math.ceil((rowIndx + 1) / rPP);
				this.refreshDataFromDataModel();
				this.refresh()
			}
		}
	};
	fn.goToPage = function(obj) {
		var DM = this.options.pageModel;
		if (DM.type == "local" || DM.type == "remote") {
			var rowIndx = obj.rowIndx,
				rPP = DM.rPP,
				page = (obj.page == null) ? Math.ceil((rowIndx + 1) / rPP) : obj.page,
				curPage = DM.curPage;
			if (page != curPage) {
				DM.curPage = page;
				if (DM.type == "local") {
					this.refreshDataFromDataModel();
					this.refresh()
				} else {
					this.refreshDataAndView()
				}
			}
		}
	};
	fn.setSelection = function(obj) {
		if (obj == null) {
			this.iRows.removeAll({
				raiseEvent: true
			});
			this.iCells.removeAll({
				raiseEvent: true
			});
			return false
		}
		var data = this.pdata,
			rowIndx, rowIndxPage;
		if (obj.rowData) {
			var obj2 = this.getRowIndx(obj);
			rowIndx = obj2.rowIndx
		} else {
			var offset = this.rowIndxOffset,
				rowIndx = obj.rowIndx,
				rowIndxPage = obj.rowIndxPage,
				rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx
		}
		var colIndx = (obj.colIndx == null && obj.dataIndx !== undefined) ? this.getColIndx({
			dataIndx: obj.dataIndx
		}) : obj.colIndx,
			evt = obj.evt;
		if (rowIndx < 0 || colIndx < 0 || colIndx >= this.colModel.length) {
			return false
		}
		if (data == null || data.length == 0) {
			return false
		}
		obj.rowIndx = rowIndx;
		obj.colIndx = colIndx;
		this._bringPageIntoView(obj);
		rowIndxPage = rowIndx - this.rowIndxOffset;
		obj.rowIndxPage = rowIndxPage;
		this.scrollRow({
			rowIndxPage: rowIndxPage
		});
		if (colIndx == null) {
			return this._selectRow(obj)
		} else {
			this.scrollColumn({
				colIndx: colIndx
			});
			return this.selectCell(obj)
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
			rowData = this.pdata[rowIndxPage],
			DM = o.dataModel,
			oldVal;
		if (rowData == null) {
			return null
		} else {
			oldVal = rowData[dataIndx]
		} if (rowIndxPage != null) {
			var newVal = this.getEditCellData();
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
				var newRow = {};
				newRow[dataIndx] = newVal;
				var ret = this.updateRow({
					row: newRow,
					rowIndx: rowIndx,
					refresh: false,
					silent: true,
					source: "edit",
					checkEditable: false
				});
				if (ret === false) {
					return false
				}
				this._trigger("cellSave", evt, objCell);
				var that = this;
				if (o.height == "flex") {
					that._setGridHeightFromTable();
					that._fixIEFooterIssue()
				} else {
					if (objP) {
						that.scrollRow({
							rowIndxPage: rowIndxPage
						})
					}
				}
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
			paging = PM.type,
			allowInvalid = ui.allowInvalid,
			allowInvalid = allowInvalid == null ? EM.allowInvalid : allowInvalid,
			invalidClass = EM.invalidClass,
			TM = options.trackModel,
			track = ui.track,
			track = (track == null) ? ((options.track == null) ? TM.on : options.track) : track,
			history = ui.history,
			history = (history == null) ? HM.on : history,
			checkEditable = ui.checkEditable,
			checkEditable = (checkEditable == null) ? true : checkEditable,
			checkEditableAdd = ui.checkEditableAdd,
			checkEditableAdd = (checkEditableAdd == null) ? checkEditable : checkEditableAdd,
			columns = this.columns,
			colIndxs = this.colIndxs,
			source = ui.source,
			offset = this.rowIndxOffset,
			getValueFromDataType = $.paramquery.getValueFromDataType,
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
				if (!oldRow || !rowData) {
					throw ("assert failed: oldRow and rowData required while update")
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
			} if (type == "add") {
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
					if (rowCheckEditable && column.editable != null && (that.isEditableCell({
						rowIndx: rowIndx,
						colIndx: colIndx,
						dataIndx: dataIndx
					}) === false)) {
						delete newRow[dataIndx];
						continue
					}
					var dataType = column.dataType,
						newVal = getValueFromDataType(newRow[dataIndx], dataType),
						oldVal = rowData ? rowData[dataIndx] : undefined,
						oldVal = (oldVal !== undefined) ? getValueFromDataType(oldVal, dataType) : undefined;
					newRow[dataIndx] = newVal;
					if (validate && column.validations) {
						if (source == "edit" && allowInvalid === false) {
							var objRet = this.isValid({
								dataIndx: dataIndx,
								rowIndx: rowIndx,
								value: newVal
							});
							if (objRet.valid == false && !objRet.warn) {
								return false
							}
						} else {
							var wRow = (type == "add") ? newRow : rowData,
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
						if (source == "edit") {
							return null
						}
						delete newRow[dataIndx];
						continue
					}
				}
				if (type == "update") {
					oldRow[dataIndx] = oldVal
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
			return false
		}
		if (history) {
			that.iHistory.increment();
			that.iHistory.push({
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
					this.iUCData.update({
						rowData: rowData,
						row: newRow,
						refresh: false
					})
				}
				for (var dataIndx in newRow) {
					var newVal = newRow[dataIndx];
					rowData[dataIndx] = newVal
				}
			} else {
				if (type == "add") {
					if (track) {
						this.iUCData.add({
							rowData: newRow
						})
					}
					if (rowIndx == null && rowIndxPage == null) {
						data.push(newRow)
					} else {
						var rowIndxPage = rowIndx - offset,
							indx = (paging == "remote") ? rowIndxPage : rowIndx;
						data.splice(indx, 0, newRow)
					} if (paging == "remote") {
						PM.totalRecords++
					}
				} else {
					if (type == "delete") {
						var rowIndxObj = that.getRowIndx({
							rowData: rowData
						}),
							uf = rowIndxObj.uf,
							rowIndx = rowIndxObj.rowIndx;
						if (track) {
							this.iUCData["delete"]({
								rowIndx: rowIndx,
								rowData: rowData
							})
						}
						var rowIndxPage = rowIndx - offset,
							indx = (paging == "remote") ? rowIndxPage : rowIndx;
						if (uf) {
							DM.dataUF.splice(indx, 1)
						} else {
							var remArr = data.splice(indx, 1);
							if (remArr && remArr.length && paging == "remote") {
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
	fn._fixTableViewPort = function() {
		var ele = this.element[0];
		ele.scrollTop = 0;
		ele.scrollLeft = 0;
		var header = this.$header_o[0];
		header.scrollLeft = 0;
		header.scrollTop = 0;
		this.iGenerateView.setPanes()
	};
	fn._fixIEFooterIssue = function() {
		$(".pq-grid-footer").css({
			position: "absolute"
		});
		$(".pq-grid-footer").css({
			position: "relative"
		})
	};
	fn.refreshColumn = function(obj) {
		var CM = this.colModel,
			colIndx = obj.colIndx,
			dataIndx = obj.dataIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			dataIndx = (dataIndx == null) ? CM[colIndx] : dataIndx,
			offset = this.rowIndxOffset;
		obj.colIndx = colIndx;
		var initV = this.initV,
			finalV = this.finalV;
		for (var row = initV; row <= finalV; row++) {
			var rowIndxPage = row;
			obj.rowIndx = rowIndxPage + offset;
			obj.rowIndxPage = rowIndxPage;
			obj.colIndx = colIndx;
			obj.column = CM[colIndx];
			obj.skip = true;
			this.refreshCell(obj)
		}
		this._fixTableViewPort();
		this._refreshScrollbars();
		this._trigger("refreshColumn", null, {
			dataModel: this.options.dataModel,
			colModel: CM,
			initV: initV,
			finalV: finalV,
			colIndx: colIndx,
			dataIndx: dataIndx
		})
	};
	fn.refreshCell = function(obj) {
		if (!this.pdata) {
			return
		}
		var offset = this.rowIndxOffset,
			skip = obj.skip,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx,
			rowIndxPage = obj.rowIndxPage = (rowIndxPage == null) ? rowIndx - offset : rowIndxPage,
			dataIndx = obj.dataIndx,
			colIndx = obj.colIndx,
			colIndx = obj.colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			$td = this.getCell({
				all: true,
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			}),
			column = obj.column,
			CM = this.colModel,
			column = obj.column = column ? column : CM[colIndx],
			o = this.options,
			TVM = o.treeModel,
			rowData = this.pdata[rowIndxPage];
		if (!rowData) {
			return
		}
		var objRender = obj;
		objRender.tree = TVM.labelIndx ? true : false, objRender.rowData = rowData;
		if ($td && $td.length > 0) {
			var tdStr = this.iGenerateView.renderCell(objRender);
			$td.replaceWith(tdStr);
			if (!skip) {
				this._fixTableViewPort();
				this._refreshScrollbars();
				this._trigger("refreshCell", null, {
					dataModel: this.options.dataModel,
					colModel: CM,
					rowData: rowData,
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					dataIndx: dataIndx
				})
			}
		}
	};
	fn.refreshRow = function(obj) {
		if (!this.pdata) {
			return
		}
		var that = this,
			offset = this.rowIndxOffset,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? rowIndx - offset : rowIndxPage,
			$trOld = this.getRow({
				all: true,
				rowIndxPage: rowIndxPage
			}),
			CM = this.colModel,
			rowData = this.pdata[rowIndxPage];
		var refreshFocus = false,
			ae = document.activeElement,
			$ae = $(ae);
		if (ae == $trOld[0] || ($trOld.length > 1 && ae == $trOld[1])) {
			refreshFocus = true
		}
		if (!rowData || !$trOld || !$trOld.length) {
			return null
		}
		var buffer = [];
		that.iGenerateView.refreshRow(rowIndxPage, CM, buffer);
		var trStr = buffer.join("");
		$trOld.replaceWith(trStr);
		this._fixTableViewPort();
		this._refreshScrollbars();
		if (refreshFocus) {
			var $trNew = this.getRow({
				all: true,
				rowIndxPage: rowIndxPage
			});
			$trNew.attr("tabindex", 0).focus()
		}
		this._trigger("refreshRow", null, {
			rowData: rowData,
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage
		});
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
				this._removeCellRowOutline(objP);
				EM.indices = null
			}
		}
		that._quitEditMode = null
	};
	fn._fixIE = function() {
		var cont = this.$cont[0];
		cont.scrollLeft = 0;
		cont.scrollTop = 0
	};
	fn.getData = function() {
		return this.pdata
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
	fn.selectCell = function(obj) {
		var evt = obj.evt;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.iCells.replace(obj) == false) {
				return false
			}
		} else {
			if (this.iCells.add(obj) === false) {
				return false
			}
		}
		return true
	};
	fn.getEditCell = function() {
		var EM = this.options.editModel;
		if (EM.indices) {
			var $td = this.getCell(EM.indices);
			var $cell = this.$div_focus.children(".pq-editor-inner");
			var $editor = $cell.find(".pq-editor-focus");
			return {
				$td: $td,
				$cell: $cell,
				$editor: $editor
			}
		} else {
			return null
		}
	};
	fn.editCell = function(obj) {
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
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
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
	fn._editCell = function(objP) {
		var that = this,
			evt = objP.evt,
			offset = this.rowIndxOffset,
			rowIndxPage = objP.rowIndxPage,
			rowIndx = objP.rowIndx,
			rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? rowIndx - offset : rowIndxPage,
			colIndx = objP.colIndx,
			dataIndx = objP.dataIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			CM = this.colModel,
			column = CM[colIndx],
			dataIndx = column.dataIndx,
			ceditor = column.editor,
			o = this.options,
			EM = o.editModel,
			geditor = o.editor,
			editor = ceditor ? $.extend({}, geditor, ceditor) : geditor,
			rowData = that.pdata[rowIndxPage],
			contentEditable = false;
		if (!this.pdata || rowIndxPage >= this.pdata.length) {
			return false
		}
		if (EM.indices) {
			var indxOld = EM.indices;
			if (indxOld.rowIndxPage == rowIndxPage && indxOld.colIndx == colIndx) {
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
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			colIndx: colIndx,
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
		var cellData = rowData[dataIndx],
			inp;
		var edtype = editor.type,
			edSelect = (objP.select == null) ? editor.select : objP.select,
			edInit = editor.init,
			edcls = editor.cls ? editor.cls : "",
			cls = "pq-editor-focus " + edcls,
			cls2 = cls + " pq-cell-editor ",
			attr = editor.attr ? editor.attr : "",
			edstyle = editor.style,
			edstyle = (edstyle ? edstyle : ""),
			styleCE = edstyle ? ("style='" + edstyle + "'") : "",
			cellWd = $cell.width() - 8,
			style = "style='width:" + cellWd + "px;" + edstyle + "'",
			styleChk = edstyle ? ("style='" + edstyle + "'") : "";
		var objCall = {
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage,
			$cell: $cell,
			cellData: cellData,
			rowData: rowData,
			cls: cls,
			dataIndx: dataIndx,
			column: column
		};
		if (typeof edtype == "function") {
			inp = edtype.call(that.element[0], objCall)
		} else {
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
							var options = editor.options;
							var options = options ? options : [];
							if (typeof options === "function") {
								options = options.call(that.element[0], {
									column: column,
									rowData: rowData
								})
							}
							var attrSelect = [attr, " class='", cls2, "' ", style, " name='", dataIndx, "'"].join("");
							inp = $.paramquery.select({
								options: options,
								attr: attrSelect,
								prepend: editor.prepend,
								labelIndx: editor.labelIndx,
								valueIndx: editor.valueIndx,
								groupIndx: editor.groupIndx
							})
						} else {
							inp = "<input class='" + cls2 + "' " + attr + " " + style + " type=text name='" + dataIndx + "' />"
						}
					}
					$(inp).appendTo($cell).width(cellWd).val(cellData)
				} else {
					inp = "<div contenteditable='true' tabindx='0' " + styleCE + " " + attr + " class='pq-editor-default " + cls + "'></div>";
					$cell.html(inp);
					$cell.children().html(cellData);
					contentEditable = true
				}
			}
		} if (typeof edInit == "function") {
			edInit.call(that.element[0], objCall)
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
			colIndx: colIndx,
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage,
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
				saveOnBlur = (onBlur == "save"),
				validateOnBlur = (onBlur == "validate"),
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
			var silent = (force || saveOnBlur || !validateOnBlur);
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
				var $focus = that.element.find(".pq-editor-focus");
				$focus.focus()
			}
		}, 0);
		that.element[0].scrollLeft = 0;
		that.element[0].scrollTop = 0;
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
	fn.getRow = function(obj) {
		var rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx,
			offset = this.rowIndxOffset,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			$tbl = (obj.all) ? this.$tbl : this.get$Tbl(rowIndxPage),
			$tr;
		if ($tbl && $tbl.length) {
			var $tbody = $tbl.children("tbody");
			if (rowIndxPage != null) {
				$tr = $tbody.children("tr[pq-row-indx=" + rowIndxPage + "]");
				if ($tr.length > $tbl.length) {
					$tr = $tr.filter(".pq-detail-master")
				}
			}
		}
		return $tr
	};
	fn.getCell = function(obj) {
		var rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - this.rowIndxOffset) : rowIndxPage,
			colIndx = obj.colIndx,
			dataIndx = obj.dataIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			$tbl = (obj.all) ? this.$tbl : this.get$Tbl(rowIndxPage, colIndx),
			$td;
		if ($tbl != undefined) {
			var $td = $tbl.children().children("tr[pq-row-indx=" + rowIndxPage + "]").children("td[pq-col-indx=" + colIndx + "]");
			if ($td.length == 0) {
				return null
			}
		}
		return $td
	};
	fn.getCellHeader = function(obj) {
		var colIndx = obj.colIndx,
			dataIndx = obj.dataIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			$tbl = this.$tbl_header,
			$td, options = this.options,
			freezeCols = options.freezeCols;
		if ($tbl != undefined) {
			if ($tbl.length > 1) {
				if (colIndx >= freezeCols) {
					$tbl = $($tbl[1])
				} else {
					$tbl = $($tbl[0])
				}
			}
			var $td = $tbl.children().children("tr.pq-grid-title-row:last").children("td[pq-col-indx=" + colIndx + "]")
		}
		if ($td.length == 0 || $td[0].style.visibility == "hidden") {
			return null
		}
		return $td
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
			obj = o.editModel.indices;
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
			dataIndx = column.dataIndx,
			$div_focus = this.$div_focus,
			$cell = $div_focus.children(".pq-editor-inner"),
			dataCell;
		var getData = editor.getData;
		if (typeof getData == "function") {
			dataCell = editor.getData.call(this.element[0], {
				$cell: $cell,
				dataIndx: dataIndx,
				rowIndx: rowIndx,
				rowIndxPage: rowIndxPage,
				column: column
			})
		} else {
			var edtype = editor.type;
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
						dataCell = $ed.val()
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
			return {
				rowIndxPage: null,
				colIndx: null
			}
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
			dataIndx = this.colModel[colIndx].dataIndx
		}
		return {
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndx,
			colIndx: colIndx,
			dataIndx: dataIndx
		}
	};
	fn.getRowsByClass = function(obj) {
		var options = this.options,
			DM = options.dataModel,
			PM = options.pageModel,
			paging = PM.type,
			remotePaging = (paging == "remote") ? true : false,
			offset = this.rowIndxOffset,
			data = DM.data,
			rows = [];
		if (data == null) {
			return rows
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			obj.rowData = rowData;
			if (this.hasClass(obj)) {
				var row = {
					rowData: rowData
				};
				if (remotePaging) {
					row.rowIndx = (i + offset)
				} else {
					row.rowIndx = i
				}
				rows.push(row)
			}
		}
		return rows
	};
	fn.getCellsByClass = function(obj) {
		var options = this.options,
			DM = options.dataModel,
			PM = options.pageModel,
			paging = PM.type,
			remotePaging = (paging == "remote") ? true : false,
			offset = this.rowIndxOffset,
			data = DM.data,
			CM = this.colModel,
			CMLength = CM.length,
			cells = [],
			getCellsByClass = function(ui) {
				for (var j = 0; j < CMLength; j++) {
					var column = CM[j],
						dataIndx = column.dataIndx;
					ui.dataIndx = dataIndx;
					if (this.hasClass(ui)) {
						var cell = {
							rowData: rowData,
							dataIndx: dataIndx,
							colIndx: j
						};
						if (remotePaging) {
							cell.rowIndx = (i + offset)
						} else {
							cell.rowIndx = i
						}
						cells.push(cell)
					}
				}
			};
		if (data == null) {
			return cells
		}
		if (obj.rowIndx != null || obj.rowIndxPage != null || obj.rowData != null) {
			obj.rowData = obj.rowData || this.getRowData(obj);
			getCellsByClass(obj)
		} else {
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				obj.rowData = rowData;
				getCellsByClass(obj)
			}
		}
		return cells
	};
	fn.data = function(objP) {
		var dataIndx = objP.dataIndx,
			data = objP.data,
			readOnly = (data == null || typeof data == "string") ? true : false,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return null
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
			attr = objP.attr,
			readOnly = (attr == null || typeof attr == "string") ? true : false,
			offset = this.rowIndxOffset,
			refresh = objP.refresh,
			rowData = objP.rowData || this.getRowData(objP);
		if (!rowData) {
			return null
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
			var finalAttr = $.extend(rowData.pq_rowattr, attr);
			rowData.pq_rowattr = finalAttr;
			if (refresh !== false && rowIndx != null) {
				var $tr = this.getRow({
					rowIndxPage: (rowIndx - offset)
				});
				if ($tr) {
					$tr.attr(finalAttr)
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
			var finalAttr = $.extend(rowData.pq_cellattr[dataIndx], attr);
			rowData.pq_cellattr[dataIndx] = finalAttr;
			if (refresh !== false && rowIndx != null) {
				var $td = this.getCell({
					rowIndxPage: (rowIndx - offset),
					dataIndx: dataIndx
				});
				if ($td) {
					$td.attr(finalAttr)
				}
			}
		}
	};
	fn.removeData = function(objP) {
		var dataIndx = objP.dataIndx,
			data = objP.data,
			data = (data == null) ? [] : data,
			datas = (typeof data == "string") ? data.split(" ") : data,
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
			attr = objP.attr,
			attr = (attr == null) ? [] : attr,
			attrs = (typeof attr == "string") ? attr.split(" ") : attr,
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
				} if (!attrlen || $.isEmptyObject(rowattr)) {
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
				} if (!attrlen || $.isEmptyObject(a)) {
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
	$.paramquery.uniqueArray = function(arr) {
		var newarr = [],
			inArray = $.inArray;
		for (var i = 0, len = arr.length; i < len; i++) {
			var str = arr[i];
			if (inArray(str, newarr) == -1) {
				newarr.push(str)
			}
		}
		return newarr
	};
	fn.addClass = function(objP) {
		var rowIndx = objP.rowIndx,
			dataIndx = objP.dataIndx,
			uniqueArray = $.paramquery.uniqueArray,
			objcls = objP.cls,
			offset = this.rowIndxOffset,
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
			var rowcls = rowData.pq_rowcls,
				newcls;
			if (rowcls) {
				newcls = rowcls + " " + objcls
			} else {
				newcls = objcls
			}
			newcls = uniqueArray(newcls.split(/\s+/)).join(" ");
			rowData.pq_rowcls = newcls;
			if (refresh !== false && rowIndx != null) {
				var $tr = this.getRow({
					rowIndxPage: (rowIndx - offset)
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
				if (refresh !== false && rowIndx != null) {
					var $td = this.getCell({
						rowIndxPage: (rowIndx - offset),
						dataIndx: dataIndx
					});
					if ($td) {
						$td.addClass(objcls)
					}
				}
			}
		}
	};
	fn.removeClass = function(objP) {
		var rowIndx = objP.rowIndx,
			rowData = this.getRowData(objP),
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
			rowData = obj.rowData;
		if (rowData) {
			var options = this.options,
				DM = options.dataModel,
				PM = options.pageModel,
				paging = PM.type,
				remotePaging = (paging == "remote") ? true : false,
				data = DM.data,
				uf = false,
				dataUF = DM.dataUF,
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
				var offset = this.rowIndxOffset,
					rowIndxPage = (remotePaging) ? i : (i - offset),
					rowIndx = (remotePaging) ? (i + offset) : i;
				return {
					rowIndxPage: (uf ? undefined : rowIndxPage),
					uf: uf,
					rowIndx: rowIndx
				}
			} else {
				return {}
			}
		} else {
			if ($tr == null || $tr.length == 0) {
				return {
					rowIndxPage: null
				}
			}
			var rowIndxPage = $tr.attr("pq-row-indx");
			if (rowIndxPage == null) {
				return {
					rowIndxPage: null
				}
			}
			rowIndxPage = parseInt(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage,
				rowIndx: rowIndxPage + this.rowIndxOffset
			}
		}
	};
	var cKeyNav = function(that) {
		this.options = that.options;
		this.that = that;
		var self = this;
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase(),
			eventNamespace = that.eventNamespace;
		that.element.on(widgetEventPrefix + "celleditkeyup" + eventNamespace, function(evt, ui) {
			return self.filterKeys(evt, ui)
		})
	};
	var _pKeyNav = cKeyNav.prototype;
	_pKeyNav._incrRowIndx = function(rowIndxPage, noRows) {
		var that = this.that,
			newRowIndx = rowIndxPage,
			noRows = (noRows == null) ? 1 : noRows,
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
			noRows = (noRows == null) ? 1 : noRows,
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
	fn.addColumn = function(column, columnData) {
		var thisOptions = this.options,
			thisOptionsColModel = thisOptions.colModel,
			data = thisOptions.dataModel.data;
		thisOptionsColModel.push(column);
		this._calcThisColModel();
		for (var i = 0; i < data.length; i++) {
			var rowData = data[i];
			rowData.push("")
		}
	};
	fn.rowNextSelect = function() {
		var sel = this.selection({
			type: "row",
			method: "getSelection"
		}),
			rowIndx, rowIndxPage, offset = this.rowIndxOffset;
		if (sel && sel[0]) {
			rowIndx = sel[0].rowIndx;
			rowIndxPage = rowIndx - offset;
			rowIndxPage = this.iKeyNav._incrRowIndx(rowIndxPage)
		}
		if (rowIndxPage != null) {
			this.setSelection(null);
			this._setSelection({
				rowIndxPage: rowIndxPage
			})
		}
		return rowIndxPage
	};
	fn.rowPrevSelect = function() {
		var sel = this.selection({
			type: "row",
			method: "getSelection"
		}),
			rowIndx, rowIndxPage, offset = this.rowIndxOffset;
		if (sel && sel[0]) {
			rowIndx = sel[0].rowIndx;
			rowIndxPage = rowIndx - offset;
			rowIndxPage = this.iKeyNav._decrRowIndx(rowIndxPage)
		}
		if (rowIndxPage != null) {
			this.setSelection(null);
			this.setSelection({
				rowIndxPage: rowIndxPage
			})
		}
		return rowIndxPage
	};
	_pKeyNav._incrIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.pdata),
			CM = that.colModel,
			CMLength = CM.length;
		if (colIndx == null) {
			if (rowIndxPage == lastRowIndxPage) {
				return null
			}
			rowIndxPage = this._incrRowIndx(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage
			}
		}
		var column;
		do {
			colIndx++;
			if (colIndx >= CMLength) {
				if (rowIndxPage == lastRowIndxPage) {
					return null
				}
				rowIndxPage = this._incrRowIndx(rowIndxPage);
				colIndx = 0
			}
			column = CM[colIndx]
		} while (column && column.hidden);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._decrIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.pdata);
		if (colIndx == null) {
			if (rowIndxPage == firstRowIndxPage) {
				return null
			}
			rowIndxPage = this._decrRowIndx(rowIndxPage);
			return {
				rowIndxPage: rowIndxPage
			}
		}
		var column;
		do {
			colIndx--;
			if (colIndx < 0) {
				if (rowIndxPage == firstRowIndxPage) {
					return null
				}
				rowIndxPage = this._decrRowIndx(rowIndxPage);
				colIndx = CMLength - 1
			}
			column = CM[colIndx]
		} while (column && column.hidden);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._incrEditIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			column, offset = that.rowIndxOffset,
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.pdata);
		do {
			colIndx++;
			if (colIndx >= CMLength) {
				if (rowIndxPage == lastRowIndxPage) {
					return null
				}
				do {
					rowIndxPage = this._incrRowIndx(rowIndxPage);
					var rowIndx = rowIndxPage + offset,
						isEditableRow = that.isEditableRow({
							rowIndx: rowIndx
						});
					if (rowIndxPage == lastRowIndxPage && isEditableRow == false) {
						return null
					}
				} while (isEditableRow == false);
				colIndx = 0
			}
			column = CM[colIndx];
			var rowIndx = rowIndxPage + offset,
				isEditableCell = that.isEditableCell({
					rowIndx: rowIndx,
					colIndx: colIndx,
					checkVisible: true
				})
		} while (column && (column.hidden || isEditableCell == false));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._decrEditIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			column, offset = that.rowIndxOffset,
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.pdata);
		do {
			colIndx--;
			if (colIndx < 0) {
				if (rowIndxPage == firstRowIndxPage) {
					return null
				}
				do {
					rowIndxPage = this._decrRowIndx(rowIndxPage);
					var rowIndx = rowIndxPage + offset,
						isEditableRow = that.isEditableRow({
							rowIndx: rowIndx
						});
					if (rowIndxPage == firstRowIndxPage && isEditableRow == false) {
						return null
					}
				} while (isEditableRow == false);
				colIndx = CMLength - 1
			}
			column = CM[colIndx];
			var rowIndx = rowIndxPage + offset,
				isEditableCell = that.isEditableCell({
					rowIndx: rowIndx,
					colIndx: colIndx,
					checkVisible: true
				})
		} while (column && (column.hidden || isEditableCell == false));
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._incrEditRowIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			offset = that.rowIndxOffset,
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.pdata);
		if (rowIndxPage == lastRowIndxPage) {
			return null
		}
		do {
			rowIndxPage = this._incrRowIndx(rowIndxPage);
			var rowIndx = rowIndxPage + offset,
				isEditableRow = that.isEditableRow({
					rowIndx: rowIndx
				}),
				isEditableCell = that.isEditableCell({
					rowIndx: rowIndx,
					colIndx: colIndx
				}),
				isEditable = (isEditableRow && isEditableCell);
			if (rowIndxPage == lastRowIndxPage && !isEditable) {
				return null
			}
		} while (!isEditable);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	_pKeyNav._decrEditRowIndx = function(rowIndxPage, colIndx) {
		var that = this.that,
			offset = that.rowIndxOffset,
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.pdata);
		if (rowIndxPage == firstRowIndxPage) {
			return null
		}
		do {
			rowIndxPage = this._decrRowIndx(rowIndxPage);
			var rowIndx = rowIndxPage + offset,
				isEditableRow = that.isEditableRow({
					rowIndx: rowIndx
				}),
				isEditableCell = that.isEditableCell({
					rowIndx: rowIndx,
					colIndx: colIndx
				}),
				isEditable = (isEditableRow && isEditableCell);
			if (rowIndxPage == firstRowIndxPage && !isEditable) {
				return null
			}
		} while (!isEditable);
		return {
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		}
	};
	fn._onKeyPressDown = function(evt) {
		var $header = $(evt.target).closest(".pq-grid-header");
		if ($header.length > 0) {
			if (this._trigger("headerKeyDown", evt, {
				dataModel: this.options.dataModel
			}) == false) {
				return false
			} else {
				return true
			}
		} else {
			var ret = this.iKeyNav._bodyKeyPressDown(evt);
			if (ret === false) {
				return false
			}
			if (this._trigger("keyDown", evt, {
				dataModel: this.options.dataModel
			}) == false) {
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
			thisOptions = this.options,
			SM = thisOptions.selectionModel,
			EM = thisOptions.editModel,
			CM = that.colModel,
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
			var obj;
			if (evt.shiftKey) {
				obj = this._decrEditIndx(rowIndxPage, colIndx)
			} else {
				obj = this._incrEditIndx(rowIndxPage, colIndx)
			}
			rowIndxPage = obj ? obj.rowIndxPage : rowIndxPage;
			colIndx = obj ? obj.colIndx : colIndx
		}
		if (SM.type == "row") {
			that.setSelection(null);
			that.setSelection({
				rowIndxPage: rowIndxPage
			});
			that.scrollColumn({
				colIndx: colIndx
			})
		} else {
			if (SM.type == "cell") {
				that.setSelection(null);
				that.setSelection({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				})
			} else {
				that.scrollRow({
					rowIndxPage: rowIndxPage
				});
				that.scrollColumn({
					colIndx: colIndx
				})
			}
		} if (objP.edit !== false) {
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
	_pKeyNav._keyPressInEdit = function(evt, objP) {
		var that = this.that,
			o = that.options;
		var EMIndx = o.editModel.indices,
			objP = objP ? objP : {}, FK = objP.FK,
			column = EMIndx.column,
			allowedKeys = ["Backspace", "Left", "Right", "Up", "Down", "Del", "Home", "End"],
			dataType = column.dataType;
		if (evt.key && $.inArray(evt.key, allowedKeys) !== -1) {
			return true
		}
		if (that._trigger("editorKeyPress", evt, $.extend({}, EMIndx)) === false) {
			return false
		}
		if (FK && (dataType == "float" || dataType == "integer")) {
			var charsPermit = ((dataType == "float") ? "0123456789.-" : "0123456789-"),
				charC = evt.charCode,
				charC = (charC ? charC : evt.keyCode),
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
			objP = objP ? objP : {}, FK = objP.FK,
			EM = o.editModel,
			EMIndices = EM.indices;
		that._trigger("editorKeyUp", evt, $.extend({}, EMIndices));
		var column = EMIndices.column,
			dataType = column.dataType;
		if (FK && (dataType == "float" || dataType == "integer")) {
			var $this = $(evt.target),
				re = (dataType == "integer") ? EM.reInt : EM.reFloat;
			var byVal = this.getValText($this);
			var oldVal = $this.data("oldVal");
			var newVal = $this[byVal]();
			if (re.test(newVal) == false) {
				if (re.test(oldVal)) {
					$this[byVal](oldVal)
				} else {
					var val = (dataType == "float") ? parseFloat(oldVal) : parseInt(oldVal);
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
			SM = o.selectionModel,
			gEM = o.editModel,
			obj = $.extend({}, EMIndx),
			rowIndxPage = obj.rowIndxPage,
			colIndx = obj.colIndx,
			column = obj.column,
			cEM = column.editModel,
			EM = cEM ? $.extend({}, gEM, cEM) : gEM;
		var byVal = this.getValText($this);
		$this.data("oldVal", $this[byVal]());
		if (that._trigger("cellEditKeyDown", evt, obj) == false) {
			return false
		}
		if (that._trigger("editorKeyDown", evt, obj) == false) {
			return false
		}
		if (evt.keyCode == keyCodes.TAB) {
			var obj = {
				rowIndxPage: rowIndxPage,
				colIndx: colIndx,
				incr: true
			};
			return this._saveAndMove(obj, evt)
		} else {
			if (evt.keyCode == EM.saveKey) {
				var obj;
				if (EM.onSave == "next") {
					obj = {
						rowIndxPage: rowIndxPage,
						colIndx: colIndx,
						incr: true
					}
				} else {
					obj = {
						rowIndxPage: rowIndxPage,
						colIndx: colIndx,
						edit: false
					}
				}
				return this._saveAndMove(obj, evt)
			} else {
				if (evt.keyCode == keyCodes.ESCAPE) {
					that.quitEditMode({
						evt: evt
					});
					if (SM.type == "cell") {
						var $td = that.getCell({
							rowIndxPage: rowIndxPage,
							colIndx: colIndx
						});
						$td.attr("tabindex", 0).focus()
					} else {
						if (SM.type == "row") {
							var $tr = that.getRow({
								rowIndxPage: rowIndxPage
							});
							$($tr[0]).attr("tabindex", 0).focus()
						}
					}
					evt.preventDefault();
					return false
				} else {
					if (evt.keyCode == keyCodes.PAGE_UP || evt.keyCode == keyCodes.PAGE_DOWN) {
						evt.preventDefault();
						return false
					} else {
						if (EM.keyUpDown) {
							if (evt.keyCode == keyCodes.DOWN) {
								var obj = this._incrEditRowIndx(rowIndxPage, colIndx);
								return this._saveAndMove(obj, evt)
							} else {
								if (evt.keyCode == keyCodes.UP) {
									var obj = this._decrEditRowIndx(rowIndxPage, colIndx);
									return this._saveAndMove(obj, evt)
								}
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
			rowIndx = objP.rowIndx,
			colIndx = objP.colIndx,
			SM = that.options.selectionModel,
			evt = objP.evt;
		if (evt.shiftKey && SM.mode != "single") {
			if (SM.type == "row") {
				that.scrollRow({
					rowIndx: rowIndx
				});
				that.iRows.extendSelection({
					rowIndx: rowIndx,
					evt: evt
				})
			} else {
				if (SM.type == "cell") {
					that.scrollCell({
						rowIndx: rowIndx,
						colIndx: colIndx
					});
					that.iCells.extendSelection({
						rowIndx: rowIndx,
						colIndx: colIndx,
						evt: evt
					})
				}
			}
		} else {
			that.setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				evt: evt,
				setFirst: true
			})
		}
	};
	_pKeyNav._bodyKeyPressDown = function(evt) {
		var that = this.that,
			self = this,
			cellLastSel, rowLastSel, offset = that.rowIndxOffset,
			thisOptions = this.options,
			CM = that.colModel,
			SM = thisOptions.selectionModel,
			EM = thisOptions.editModel,
			ctrlMeta = (evt.ctrlKey || evt.metaKey),
			rowIndx, colIndx;
		var keyCodes = $.ui.keyCode,
			keyCode = evt.keyCode;
		if (EM.indices) {
			that.$div_focus.find(".pq-cell-focus").focus();
			return
		} else {
			if (SM.type == "row") {
				if (ctrlMeta) {
					rowLastSel = that.iRows.getFocusSelection({
						old: true
					})
				} else {
					rowLastSel = that.iRows.getFocusSelection({
						old: false
					})
				} if (rowLastSel == null) {
					return
				}
				var rowIndx = rowLastSel.rowIndx,
					rowIndxPage = rowIndx - offset;
				if (rowIndx == null) {
					return
				}
				if (that._trigger("rowKeyDown", evt, {
					rowData: that.pdata[rowIndxPage],
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage
				}) == false) {
					return false
				}
			} else {
				if (SM.type == "cell") {
					if (ctrlMeta) {
						cellLastSel = that.iCells.getFocusSelection({
							old: true
						})
					} else {
						cellLastSel = that.iCells.getFocusSelection({
							old: false
						})
					} if (cellLastSel == null) {
						return
					}
					var obj = cellLastSel,
						rowIndx = obj.rowIndx,
						rowIndxPage = rowIndx - offset,
						dataIndx = obj.dataIndx,
						colIndx = that.getColIndx({
							dataIndx: dataIndx
						});
					if (rowIndx == null || colIndx == null) {
						return
					}
					if (that._trigger("cellKeyDown", evt, {
						rowData: that.pdata[rowIndxPage],
						rowIndx: rowIndx,
						rowIndxPage: rowIndxPage,
						colIndx: colIndx,
						dataIndx: dataIndx,
						column: CM[colIndx]
					}) == false) {
						return false
					}
					if (evt.cancelBubble) {
						return
					}
				} else {
					return
				}
			}
		} if (keyCode == keyCodes.LEFT) {
			var obj = this._decrIndx(rowIndxPage, colIndx);
			if (obj) {
				rowIndx = obj.rowIndxPage + offset;
				this.select({
					rowIndx: rowIndx,
					colIndx: obj.colIndx,
					evt: evt
				})
			}
			evt.preventDefault();
			return
		} else {
			if (keyCode == keyCodes.RIGHT) {
				var obj = this._incrIndx(rowIndxPage, colIndx);
				if (obj) {
					rowIndx = obj.rowIndxPage + offset;
					this.select({
						rowIndx: rowIndx,
						colIndx: obj.colIndx,
						evt: evt
					})
				}
				evt.preventDefault();
				return
			} else {
				if (keyCode == keyCodes.UP) {
					rowIndxPage = this._decrRowIndx(rowIndxPage);
					if (rowIndxPage != null) {
						rowIndx = rowIndxPage + offset;
						this.select({
							rowIndx: rowIndx,
							colIndx: colIndx,
							evt: evt
						})
					}
					evt.preventDefault();
					return
				} else {
					if (keyCode == keyCodes.DOWN) {
						rowIndxPage = this._incrRowIndx(rowIndxPage);
						if (rowIndxPage != null) {
							rowIndx = rowIndxPage + offset;
							this.select({
								rowIndx: rowIndx,
								colIndx: colIndx,
								evt: evt
							})
						}
						evt.preventDefault();
						return
					} else {
						if (keyCode == keyCodes.PAGE_DOWN || keyCode == keyCodes.SPACE) {
							var objPageDown = this.pageDown(rowIndxPage);
							if (objPageDown) {
								rowIndxPage = objPageDown.rowIndxPage;
								if (rowIndxPage != null) {
									rowIndx = rowIndxPage + offset;
									this.select({
										rowIndx: rowIndx,
										colIndx: colIndx,
										evt: evt
									})
								}
							}
							evt.preventDefault();
							return
						} else {
							if (keyCode == keyCodes.PAGE_UP) {
								var objPageUp = this.pageUp(rowIndxPage);
								if (objPageUp) {
									rowIndxPage = objPageUp.rowIndxPage;
									if (rowIndxPage != null) {
										rowIndx = rowIndxPage + offset;
										this.select({
											rowIndx: rowIndx,
											colIndx: colIndx,
											evt: evt
										})
									}
								}
								evt.preventDefault();
								return
							} else {
								if (keyCode == keyCodes.HOME) {
									if (SM.type == "row" || ctrlMeta) {
										rowIndx = that._getFirstVisibleRowIndxPage(that.pdata) + offset;
										this.select({
											rowIndx: rowIndx,
											colIndx: colIndx,
											evt: evt
										})
									} else {
										if (SM.type == "cell") {
											colIndx = that._getFirstVisibleColIndx();
											this.select({
												rowIndx: rowIndx,
												colIndx: colIndx,
												evt: evt
											})
										}
									}
									evt.preventDefault();
									return
								} else {
									if (keyCode == keyCodes.END) {
										if (SM.type == "row" || ctrlMeta) {
											rowIndx = that._getLastVisibleRowIndxPage(that.pdata) + offset;
											this.select({
												rowIndx: rowIndx,
												colIndx: colIndx,
												evt: evt
											})
										} else {
											if (SM.type == "cell") {
												colIndx = that._getLastVisibleColIndx();
												this.select({
													rowIndx: rowIndx,
													colIndx: colIndx,
													evt: evt
												})
											}
										}
										evt.preventDefault();
										return
									} else {
										if (keyCode == keyCodes.ENTER) {
											if (SM.type == "row") {
												var $tr, $td;
												if (rowLastSel != null) {
													that.editFirstCellInRow({
														rowIndx: rowIndxPage + offset
													})
												}
											} else {
												if (cellLastSel != null) {
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
														}
													}
												}
											}
											evt.preventDefault();
											return
										} else {
											if (ctrlMeta && keyCode == "65") {
												if (SM.type == "row" && SM.mode != "single") {
													that.iRows.selectAll({
														all: SM.all
													})
												} else {
													if (SM.type == "cell" && SM.mode != "single") {
														that.iCells.selectAll({
															all: SM.all
														})
													}
												}
												evt.preventDefault();
												return
											} else {
												if (EM.pressToEdit && keyCode >= 32 && keyCode <= 127 && !ctrlMeta) {
													if (cellLastSel != null) {
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
													}
												} else {}
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
	};
	_pKeyNav.incrPageSize = function() {
		var that = this.that,
			$tbl = that.$tbl,
			$trs = $tbl.children("tbody").children("tr.pq-grid-row").not(".pq-group-row,.pq-summary-row"),
			htCont = that.$cont[0].offsetHeight,
			marginTop = parseInt($tbl.css("marginTop")),
			htSB = that._getScollBarHorizontalHeight(),
			htContR = htCont - htSB - marginTop;
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
			contHt = that.$cont[0].offsetHeight - that._getScollBarHorizontalHeight();
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
			counter = (counter > 0) ? counter - 1 : counter;
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
			o = that.options;
		var soptions = that.$vscroll.pqScrollBar("option"),
			old_cur_pos = soptions.cur_pos,
			num_eles = soptions.num_eles,
			ratio = soptions.ratio;
		if (o.virtualY) {
			if (old_cur_pos < num_eles - 1) {
				var rowIndxPage = this.incrPageSize().rowIndxPage,
					calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
				if (calcCurPos == null) {
					return
				}
				that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
			}
		} else {
			if (rowIndxPage != null) {
				rowIndxPage = this.pageNonVirtual(rowIndxPage, "nextAll")
			} else {
				if (ratio < 1) {
					var contHt = that.$cont.data("offsetHeight") - that._getScollBarHorizontalHeight();
					that.iMouseSelection.updateTableY(-1 * contHt);
					that._syncScrollBarVert()
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
			o = that.options;
		var soptions = that.$vscroll.pqScrollBar("option"),
			old_cur_pos = soptions.cur_pos,
			ratio = soptions.ratio;
		if (o.virtualY) {
			if (old_cur_pos > 0) {
				var rowIndxPage = this.decrPageSize().rowIndxPage,
					calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
				if (calcCurPos == null) {
					return
				}
				that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
			}
		} else {
			if (rowIndxPage != null) {
				rowIndxPage = this.pageNonVirtual(rowIndxPage, "prevAll")
			} else {
				if (ratio > 0) {
					var contHt = that.$cont[0].offsetHeight - that._getScollBarHorizontalHeight();
					that.iMouseSelection.updateTableY(contHt);
					that._syncScrollBarVert()
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
			$trs = $tbl.children("tbody").children("tr.pq-grid-row").not(".pq-group-row,.pq-summary-row"),
			freezeRows = that.options.freezeRows,
			rowIndxPage = 0;
		if ($trs.length) {
			var $tr, tr;
			if (freezeRows) {
				$tr = $trs.filter("tr.pq-last-freeze-row");
				if ($tr.length) {
					$tr = $tr.next()
				}
			} else {
				if ($trs.length >= 2) {
					$tr = $($trs[1])
				}
			} if ($tr && $tr.length) {
				var rowIndxPage = that.getRowIndx({
					$tr: $tr
				}).rowIndxPage;
				rowIndxPage = rowIndxPage - that.pageSize + 4;
				if (rowIndxPage < 0) {
					rowIndxPage = 0
				}
			}
		}
		return {
			rowIndxPage: rowIndxPage
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
		var len = (colIndx != null) ? colIndx : this.colModel.length;
		for (var i = freezeCols; i < len; i++) {
			if (this.colModel[i].hidden) {
				num_hidden++
			}
		}
		return num_hidden
	};
	fn._setScrollHLength = function() {
		var options = this.options;
		if (!options.scrollModel.horizontal) {
			this.$hscroll.css("visibility", "hidden");
			this.$hvscroll.css("visibility", "hidden");
			return
		} else {
			this.$hscroll.css("visibility", "");
			this.$hvscroll.css("visibility", "")
		}
		var wd = this.$cont[0].offsetWidth;
		var thisColModel = this.colModel;
		var wdSB = this._getSBWidth();
		if (wdSB == 0) {
			this.$hscroll.css("right", 0)
		} else {
			this.$hscroll.css("right", "")
		}
		wd -= wdSB;
		this.$hscroll.pqScrollBar("option", "length", wd)
	};
	fn._setScrollHNumEles = function() {
		var options = this.options,
			SM = options.scrollModel,
			num_eles = 0;
		if (options.width != "flex") {
			if (SM.lastColumn == "fullScroll") {
				num_eles = this.colModel.length - options.freezeCols - this._calcNumHiddenUnFrozens()
			} else {
				num_eles = this.calcColsOutsideCont(this.colModel) + 1
			}
		}
		this.$hscroll.pqScrollBar("option", "num_eles", num_eles)
	};
	fn.calcColsOutsideCont = function(model) {
		var numberCell = this.options.numberCell,
			tbl = (this.$tbl) ? this.$tbl[this.$tbl.length - 1] : null,
			tblWd = tbl ? tbl.scrollWidth : 0,
			freezeCols = this.options.freezeCols,
			contWd = this.$cont[0].offsetWidth - this._getSBWidth();
		tblWd = 0;
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
		var tblremainingWidth = tblWd;
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
	fn._getScollBarHorizontalHeight = function() {
		var htSB = 17,
			$hscroll = this.$hscroll;
		if ($hscroll.css("visibility") == "hidden" || this.options.scrollModel.horizontal == false || $hscroll.css("display") == "none") {
			htSB = 0
		}
		return htSB
	};
	fn._getSBWidth = function() {
		var wdSB = 17,
			$vscroll = this.$vscroll;
		if (this.initV == null || $vscroll.css("visibility") == "hidden" || this.options.height == "flex" || $vscroll.css("display") == "none") {
			wdSB = 0
		}
		return wdSB
	};
	fn._setScrollVNumEles = function(fullRefresh) {
		var that = this,
			$vscroll = this.$vscroll,
			nested = (this.iHierarchy ? true : false),
			options = $vscroll.pqScrollBar("option"),
			num_eles = parseInt(options.num_eles),
			cur_pos = parseInt(options.cur_pos),
			thisOptions = this.options;
		var htSB = this._getScollBarHorizontalHeight(),
			htCont = this.$cont[0].offsetHeight,
			htView = htCont - htSB + 1,
			GM = thisOptions.groupModel,
			data = (GM) ? this.dataGM : this.pdata;
		var totalVisibleRows = data ? this.totalVisibleRows : 0;
		var tbl, $tbl, htTbl = 0;
		if (this.$tbl && this.$tbl.length > 0) {
			tbl = this.$tbl[this.$tbl.length - 1];
			htTbl = tbl.offsetHeight;
			$tbl = $(tbl)
		}
		if (htTbl > 0 && htTbl > htView) {
			var $trs = $tbl.children().children("tr");
			var ht = 0,
				visibleRows = 0;
			for (var i = 0; i < $trs.length; i++) {
				var tr = $trs[i];
				ht += tr.offsetHeight;
				if (ht >= htView) {
					if (nested && $(tr).hasClass("pq-detail-child")) {
						visibleRows--;
						visibleRows = (visibleRows > 1) ? (visibleRows - 1) : 1
					} else {
						visibleRows = (visibleRows > 1) ? (visibleRows - 1) : 0
					}
					break
				} else {
					if (nested) {
						if ($(tr).hasClass("pq-detail-child") == false) {
							visibleRows++
						}
					} else {
						visibleRows++
					}
				}
			}
			if (visibleRows == 0) {
				visibleRows = $trs.length - 1
			}
			num_eles = totalVisibleRows - visibleRows + 1
		} else {
			num_eles = cur_pos + 1
		} if (num_eles > totalVisibleRows) {
			num_eles = totalVisibleRows
		}
		if (fullRefresh) {
			that.$vscroll.pqScrollBar("option", "num_eles", num_eles)
		} else {
			that.$vscroll.pqScrollBar("setNumEles", num_eles)
		}
		return num_eles
	};
	fn._getFirstVisibleRowIndxPage = function(data) {
		for (var i = 0, len = data.length; i < len; i++) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				return i
			}
		}
	};
	fn._getLastVisibleRowIndxPage = function(data) {
		for (var i = data.length - 1; i >= 0; i--) {
			var hidden = data[i].pq_hidden;
			if (!hidden) {
				return i
			}
		}
		return null
	};
	fn._getFirstVisibleColIndx = function() {
		var CM = this.colModel,
			CMLength = CM.length;
		for (var i = 0; i < CMLength; i++) {
			var hidden = CM[i].hidden;
			if (!hidden) {
				return i
			}
		}
		return null
	};
	fn._getLastVisibleColIndx = function() {
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
	fn._getTotalVisibleRows = function(cur_pos, freezeRows, rows, data) {
		var tvRows = 0,
			dataLength = (data) ? data.length : 0,
			initV = freezeRows,
			finalV = 0,
			visible = 0,
			lastFrozenRow = null,
			initFound = false,
			finalFound = false,
			nesting = (this.iHierarchy) ? true : false,
			o = this.options,
			DTMoff = o.detailModel.offset,
			htTotal = 0,
			rowHeight = 22,
			htCont = nesting ? this.$cont[0].offsetHeight : undefined;
		if (data == null || dataLength == 0) {
			return {
				initV: lastFrozenRow,
				finalV: lastFrozenRow,
				tvRows: tvRows,
				lastFrozenRow: lastFrozenRow
			}
		}
		for (var i = 0, len = ((dataLength > freezeRows) ? freezeRows : dataLength); i < len; i++) {
			var rowData = data[i],
				hidden = rowData.pq_hidden;
			if (!hidden) {
				lastFrozenRow = i;
				tvRows++;
				if (nesting) {
					var cellData = rowData.pq_detail;
					if (cellData && cellData.show) {
						var ht = (cellData.height || 0);
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
		rows = rows - tvRows;
		for (var i = freezeRows, len = dataLength; i < len; i++) {
			var rowData = data[i],
				hidden = rowData.pq_hidden;
			if (!initFound) {
				if (hidden) {
					initV++
				} else {
					if (visible == cur_pos) {
						initFound = true;
						finalV = initV;
						visible = 0
					} else {
						initV++;
						visible++
					}
				}
			} else {
				if (!finalFound) {
					if (hidden) {
						finalV++
					} else {
						if (visible == rows) {
							finalFound = true
						} else {
							finalV++;
							visible++
						}
					}
				}
			} if (!hidden) {
				tvRows++;
				if (nesting && initFound) {
					var cellData = rowData.pq_detail;
					if (cellData && cellData.show) {
						var ht = (cellData.height || 0);
						if (ht > DTMoff) {
							ht = DTMoff
						}
						htTotal += ht + rowHeight
					} else {
						htTotal += rowHeight
					} if (htTotal > htCont) {
						finalFound = true
					}
				}
			}
		}
		if (initV >= dataLength) {
			initV = dataLength - 1
		}
		if (finalV < initV) {
			finalV = initV
		}
		return {
			initV: initV,
			finalV: finalV,
			tvRows: tvRows,
			lastFrozenRow: lastFrozenRow
		}
	};
	fn._setScrollVLength = function() {
		var cont_ht = this.$cont.height();
		var htSB = this._getScollBarHorizontalHeight();
		this.$vscroll.css("bottom", htSB);
		var len = (cont_ht - htSB);
		this.$vscroll.pqScrollBar("option", "length", len);
		return
	};
	fn._setInnerGridHeight = function() {
		var options = this.options;
		if (options.height == "flex") {
			return
		}
		var ht = (this.element.height() - ((options.showTop) ? this.$top[0].offsetHeight : 0) - this.$bottom[0].offsetHeight);
		this.$grid_inner.height(ht + "px")
	};
	fn._setRightGridHeight = function() {
		var options = this.options,
			$header = this.$header,
			ht_hd = 0;
		if ($header) {
			ht_hd = $header[0].offsetHeight;
			this.$header_o.height(ht_hd - 2)
		} else {
			this.$header_o.height(0)
		} if (options.height == "flex") {
			return
		}
		this.$vscroll.css("visibility", "");
		if (this.$tbl) {
			this.$tbl.css("marginBottom", 0)
		}
		var ht = (this.element.height() - this.$header_o[0].offsetHeight - ((options.showTop) ? this.$top[0].offsetHeight : 0) - this.$bottom[0].offsetHeight);
		var ht_contFixed = 0;
		this.$cont.height((ht - ht_contFixed) + "px")
	};
	fn._setGridHeightFromTable = function() {
		var htTbl = 0;
		var htSB = this._getScollBarHorizontalHeight(),
			$tbl = this.$tbl;
		if ($tbl && $tbl.length) {
			htTbl = ($tbl[0].offsetHeight - 1);
			$tbl.css("marginBottom", htSB)
		} else {
			htTbl = 22
		}
		var htCombined = htTbl + htSB;
		this.$cont.height("");
		this.element.height("");
		this.$grid_inner.height("");
		this.$vscroll.css("visibility", "hidden")
	};
	fn._setGridWidthFromTable = function() {
		var tbl_width;
		var wdSB = this._getSBWidth();
		if (this.$tbl && this.$tbl[0] && this.$tbl[0].scrollWidth > 0) {
			tbl_width = this.$tbl[0].scrollWidth;
			this.element.width((tbl_width + wdSB) + "px")
		} else {
			tbl_width = calcWidthCols.call(this, -1, this.colModel.length);
			this.element.width((tbl_width) + "px")
		}
	};
	fn._bufferObj_minRowsPerGrid = function() {
		var ht = this.$cont[0].offsetHeight;
		return Math.ceil(ht / this.rowHeight)
	};
	fn._calcCurPosFromRowIndxPage = function(rowIndxPage) {
		var thisOptions = this.options,
			GM = thisOptions.groupModel,
			data = GM ? this.dataGM : this.pdata,
			freezeRows = thisOptions.freezeRows;
		if (rowIndxPage < freezeRows) {
			return 0
		}
		var cur_pos = 0,
			j = freezeRows;
		for (var i = freezeRows, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (GM && (rowData.groupSummary || rowData.groupTitle)) {} else {
				if (j == rowIndxPage) {
					break
				}
				j++
			}
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
			data = this.pdata,
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
	fn._bufferObj_calcInitFinal = function() {
		var thisOptions = this.options,
			virtualY = thisOptions.virtualY,
			freezeRows = thisOptions.freezeRows,
			flexHeight = thisOptions.height == "flex",
			GM = thisOptions.groupModel,
			GMtrue = (GM) ? true : false,
			data = GMtrue ? this.dataGM : this.pdata,
			TVM = thisOptions.treeModel;
		if (data == null || data.length == 0) {
			var objTVR = this._getTotalVisibleRows(cur_pos, freezeRows, noRowsInView, data);
			this.totalVisibleRows = objTVR.tvRows;
			this.initV = objTVR.initV;
			this.finalV = objTVR.finalV;
			this.lastFrozenRow = objTVR.lastFrozenRow
		} else {
			if (!virtualY) {
				var objTVR = this._getTotalVisibleRows(0, freezeRows, noRowsInView, data);
				this.lastFrozenRow = objTVR.lastFrozenRow;
				this.totalVisibleRows = objTVR.tvRows;
				this.initV = 0;
				this.finalV = data.length - 1;
				return
			} else {
				var options = this.$vscroll.pqScrollBar("option"),
					cur_pos = parseInt(options.cur_pos);
				if (isNaN(cur_pos) || cur_pos < 0) {
					throw ("cur_pos NA")
				}
				this.scrollCurPos = cur_pos;
				var noRowsInView = this._bufferObj_minRowsPerGrid();
				this.pageSize = noRowsInView;
				var objTVR = this._getTotalVisibleRows(cur_pos, freezeRows, noRowsInView, data);
				this.totalVisibleRows = objTVR.tvRows;
				this.initV = objTVR.initV;
				this.lastFrozenRow = objTVR.lastFrozenRow;
				if (flexHeight) {
					this.finalV = data.length - 1
				} else {
					this.finalV = objTVR.finalV
				}
			}
		}
	};
	fn._bufferObj_calcInitFinalH = function() {
		var options = this.options,
			virtualX = options.virtualX,
			CM = this.colModel,
			CMLength = CM.length;
		if (!virtualX) {
			this.initH = 0;
			this.finalH = CMLength - 1;
			return
		}
		if (options.virtualXHeader === false) {
			this.initHH = 0;
			this.finalHH = CMLength - 1
		}
		var cur_pos = parseInt(this.$hscroll.pqScrollBar("option", "cur_pos")),
			freezeCols = parseInt(options.freezeCols),
			flexWidth = options.width == "flex",
			initH = freezeCols,
			indx = 0;
		for (var i = freezeCols; i < CMLength; i++) {
			if (CM[i].hidden) {
				initH++
			} else {
				if (indx == cur_pos) {
					break
				} else {
					initH++;
					indx++
				}
			}
		}
		if (initH > CMLength - 1) {
			initH = CMLength - 1
		}
		this.initH = initH;
		if (flexWidth || !virtualX) {
			this.finalH = CMLength - 1
		} else {
			var wd = calcWidthCols.call(this, -1, freezeCols),
				wdCont = this.$cont[0].offsetWidth - this._getSBWidth();
			for (var i = initH; i < CMLength; i++) {
				var column = CM[i];
				if (!column.hidden) {
					var wdCol = column.outerWidth;
					if (!wdCol) {
						if (options.debug) {
							throw ("outerwidth N/A")
						}
					}
					wd += wdCol;
					if (wd > wdCont) {
						break
					}
				}
			}
			var finalH = i;
			if (finalH > CMLength - 1) {
				finalH = CMLength - 1
			}
			this.finalH = finalH
		}
	};
	var calcWidthCols = function(colIndx1, colIndx2, _direct) {
		var wd = 0,
			o = this.options,
			columnBorders = o.columnBorders,
			cbWidth = (columnBorders ? 1 : 0),
			numberCell = o.numberCell,
			CM = this.colModel;
		if (colIndx1 == -1) {
			if (numberCell.show) {
				if (_direct) {
					wd += parseInt(numberCell.width) + 1
				} else {
					wd += numberCell.outerWidth
				}
			}
			colIndx1 = 0
		}
		if (_direct) {
			for (var i = colIndx1; i < colIndx2; i++) {
				var column = CM[i],
					hidden = column.hidden;
				if (!hidden) {
					if (!column._width) {
						throw ("assert failed")
					}
					wd += column._width + cbWidth
				}
			}
		} else {
			for (var i = colIndx1; i < colIndx2; i++) {
				var column = CM[i];
				if (!column.hidden) {
					wd += column.outerWidth
				}
			}
		}
		return wd
	};
	$.paramquery.pqgrid.calcWidthCols = calcWidthCols;
	fn.calcHeightFrozenRows = function() {
		var $tbl = this.$tbl,
			ht = 0;
		if ($tbl && $tbl.length) {
			var $tr = $($tbl[0]).find("tr.pq-last-freeze-row");
			if ($tr && $tr.length) {
				var tr = $tr[0];
				ht = tr.offsetTop + tr.offsetHeight
			} else {
				ht = 0
			}
		}
		return ht
	};
	fn._calcRightEdgeCol = function(colIndx) {
		var wd = 0,
			cols = 0,
			CM = this.colModel,
			hidearrHS = this.hidearrHS,
			numberCell = this.options.numberCell;
		if (numberCell.show) {
			wd += numberCell.outerWidth;
			cols++
		}
		for (var i = 0; i <= colIndx; i++) {
			var column = CM[i];
			if (!column.hidden && hidearrHS[i] == false) {
				wd += column.outerWidth;
				cols++
			}
		}
		return {
			width: wd,
			cols: cols
		}
	};
	fn._refreshFreezeLine = function() {
		var thisOptions = this.options,
			numberCell = thisOptions.numberCell,
			$container = this.$cont_o,
			freezeCols = thisOptions.freezeCols;
		if (this.$freezeLine) {
			this.$freezeLine.remove()
		}
		if (freezeCols) {
			var lft = calcWidthCols.call(this, -1, (freezeCols)) - 1;
			if (isNaN(lft) || lft == 0) {} else {
				if (lft > 0 && numberCell.show && lft == numberCell.width) {} else {
					this.$freezeLine = $("<div class='pq-grid-vert-freezeline' ></div>").appendTo($container);
					var ht = $container[0].offsetHeight;
					this.$freezeLine.css({
						height: ht,
						left: lft
					})
				}
			}
		}
	};
	fn._getDragHelper = function(evt) {
		var o = this.options,
			freezeCols = parseInt(o.freezeCols),
			$target = $(evt.currentTarget);
		this.$cl = $("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		this.$clleft = $("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		var indx = parseInt($target.attr("pq-grid-col-indx"));
		var ht = this.$grid_inner.outerHeight();
		this.$cl.height(ht);
		this.$clleft.height(ht);
		var ele = $("td[pq-grid-col-indx=" + indx + "]", this.$header)[0];
		var lft = ele.offsetLeft;
		if (this.pqpanes.vH) {
			if (indx >= freezeCols) {
				lft += this.$header[1].offsetLeft
			}
		} else {
			lft += this.$header[0].offsetLeft
		}
		this.$clleft.css({
			left: lft
		});
		lft = lft + ele.offsetWidth;
		this.$cl.css({
			left: lft
		})
	};
	fn._setDragLimits = function(colIndx) {
		if (colIndx < 0) {
			return
		}
		var that = this,
			CM = this.colModel,
			column = CM[colIndx],
			o = this.options,
			numberCell = o.numberCell,
			$head = that.$header_left;
		if (colIndx >= o.freezeCols && that.pqpanes.vH) {
			$head = that.$header_right
		}
		var $pQuery_col = $head.find("td[pq-grid-col-indx='" + colIndx + "']");
		var cont_left = $pQuery_col.offset().left + column._minWidth;
		var cont_right = cont_left + column._maxWidth - column._minWidth;
		var $pQuery_drag = $head.find("div.pq-grid-col-resize-handle[pq-grid-col-indx=" + colIndx + "]");
		$pQuery_drag.draggable("option", "containment", [cont_left, 0, cont_right, 0])
	};
	fn.nestedCols = function(colMarr, _depth, _hidden) {
		var len = colMarr.length;
		var arr = [];
		if (_depth == null) {
			_depth = 1
		}
		var new_depth = _depth,
			colSpan = 0,
			width = 0,
			childCount = 0;
		for (var i = 0; i < len; i++) {
			var colM = colMarr[i];
			if (_hidden === true || _hidden === false) {
				colM.hidden = _hidden
			}
			if (colM.colModel != null && colM.colModel.length > 0) {
				var obj = this.nestedCols(colM.colModel, _depth + 1, colM.hidden);
				arr = arr.concat(obj.colModel);
				if (obj.colSpan > 0) {
					if (obj.depth > new_depth) {
						new_depth = obj.depth
					}
					colM.colSpan = obj.colSpan;
					colSpan += obj.colSpan
				} else {
					colM.colSpan = 0;
					colM.hidden = true
				}
				colM.childCount = obj.childCount;
				childCount += obj.childCount
			} else {
				if (colM.hidden) {
					colM.colSpan = 0
				} else {
					colM.colSpan = 1;
					colSpan++
				}
				colM.childCount = 0;
				childCount++;
				arr.push(colM)
			}
		}
		return {
			depth: new_depth,
			colModel: arr,
			colSpan: colSpan,
			width: width,
			childCount: childCount
		}
	};
	fn.getHeadersCells = function() {
		var optColModel = this.options.colModel,
			thisColModelLength = this.colModel.length,
			depth = this.depth;
		var arr = [];
		for (var row = 0; row < depth; row++) {
			arr[row] = [];
			var k = 0;
			var colSpanSum = 0,
				childCountSum = 0;
			for (var col = 0; col < thisColModelLength; col++) {
				var colModel;
				if (row == 0) {
					colModel = optColModel[k]
				} else {
					var parentColModel = arr[row - 1][col];
					var children = parentColModel.colModel;
					if (children == null || children.length == 0) {
						colModel = parentColModel
					} else {
						var diff = (col - parentColModel.leftPos);
						var colSpanSum2 = 0,
							childCountSum2 = 0;
						var tt = 0;
						for (var t = 0; t < children.length; t++) {
							childCountSum2 += (children[t].childCount > 0) ? children[t].childCount : 1;
							if (diff < childCountSum2) {
								tt = t;
								break
							}
						}
						colModel = children[tt]
					}
				}
				var childCount = (colModel.childCount) ? colModel.childCount : 1;
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
		this.headerCells = arr;
		return arr
	};
	fn.getDataType = function() {
		var CM = this.colModel;
		if (CM && CM[0]) {
			var dataIndx = CM[0].dataIndx;
			if (typeof dataIndx == "string") {
				return "JSON"
			} else {
				return "ARRAY"
			}
		}
		throw ("dataType unknown")
	};
	fn.assignRowSpan = function() {
		var optColModel = this.options.colModel,
			thisColModelLength = this.colModel.length,
			headerCells = this.headerCells,
			depth = this.depth;
		for (var col = 0; col < thisColModelLength; col++) {
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
	fn._calcThisColModel = function() {
		var o = this.options,
			CMT = o.columnTemplate,
			oCM = o.colModel;
		var obj = this.nestedCols(oCM);
		this.colModel = obj.colModel;
		this.depth = obj.depth;
		var CM = this.colModel,
			CMLength = CM.length;
		if (CMT) {
			for (var i = 0; i < CMLength; i++) {
				var column = CM[i];
				var proxyColumn = $.extend({}, CMT, column, true);
				$.extend(column, proxyColumn, true)
			}
		}
		this.getHeadersCells();
		this.assignRowSpan();
		this._refreshDataIndices()
	};
	var cRefreshColumn = function(that) {
		this.that = that
	};
	var _pRefreshColumn = cRefreshColumn.prototype;
	_pRefreshColumn._computeOuterWidths = function() {
		var that = this.that,
			o = that.options,
			columnBorders = o.columnBorders,
			CBWidth = ((columnBorders) ? 1 : 0),
			numberCell = o.numberCell,
			thisColModel = that.colModel,
			outerWidths = that.outerWidths,
			CMLength = thisColModel.length;
		for (var i = 0; i < CMLength; i++) {
			var column = thisColModel[i];
			column.outerWidth = column._width + CBWidth
		}
		if (numberCell.show) {
			numberCell.outerWidth = numberCell.width + 1
		}
	};
	_pRefreshColumn.autoFit = function() {
		var that = this.that,
			o = that.options,
			cbWidth = o.columnBorders ? 1 : 0,
			CM = that.colModel,
			$cont = that.$cont,
			CMLength = CM.length;
		var wdAllCols = calcWidthCols.call(that, -1, CMLength, true);
		var wdCont = $cont[0].offsetWidth - that._getSBWidth();
		if (wdAllCols != wdCont) {
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
	_pRefreshColumn.autoLastColumn = function() {
		var that = this.that,
			o = that.options,
			cbWidth = o.columnBorders ? 1 : 0,
			CM = that.colModel,
			CMLength = CM.length,
			freezeCols = o.freezeCols,
			$cont = that.$cont,
			wdCont = $cont[0].offsetWidth - that._getSBWidth(),
			wd1 = calcWidthCols.call(that, -1, freezeCols, true);
		var rem = wdCont - wd1,
			_found = false,
			lastColIndx = that._getLastVisibleColIndx();
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
	_pRefreshColumn.numericVal = function(width, totalWidth) {
		if ((width + "").indexOf("%") > -1) {
			return (parseInt(width) * totalWidth / 100)
		} else {
			return parseInt(width)
		}
	};
	_pRefreshColumn.refreshColumnWidths = function() {
		var that = this.that,
			o = that.options,
			numberCell = o.numberCell,
			flexWidth = o.width == "flex",
			columnBorders = o.columnBorders,
			cbWidth = columnBorders ? 1 : 0,
			CM = that.colModel,
			SM = o.scrollModel,
			SMLastColumn = SM.lastColumn,
			autoFit = SM.autoFit,
			$cont = that.$cont,
			CMLength = CM.length,
			sbWidth = that._getSBWidth(),
			minColWidth = o._minColWidth,
			maxColWidth = o._maxColWidth;
		if (!$cont || !$cont[0].offsetWidth) {
			return
		}
		var contWd = $cont[0].offsetWidth;
		var numberCellWidth = 0;
		if (numberCell.show) {
			if (numberCell.width < numberCell.minWidth) {
				numberCell.width = numberCell.minWidth
			}
			numberCell.outerWidth = numberCell.width + 1;
			numberCellWidth = numberCell.outerWidth
		}
		var availWidth = contWd - sbWidth - numberCellWidth,
			minColWidth = Math.floor(this.numericVal(minColWidth, availWidth)),
			maxColWidth = Math.ceil(this.numericVal(maxColWidth, availWidth)),
			rem = 0;
		if (availWidth < 5 || isNaN(availWidth)) {
			if (o.debug) {
				throw ("availWidth N/A")
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
				colWidthPercent = ((colWidth + "").indexOf("%") > -1) ? true : null,
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
				} if (wd < colMinWidth) {
					wd = colMinWidth
				} else {
					if (wd > colMaxWidth) {
						wd = colMaxWidth
					}
				}
				column._width = wd
			} else {
				column._width = colMinWidth
			} if (!colWidthPercent) {
				column.width = column._width
			}
			column._minWidth = colMinWidth;
			column._maxWidth = colMaxWidth
		}
		if ($cont && flexWidth == false) {
			if (autoFit) {
				this.autoFit()
			}
			if (SMLastColumn == "auto") {
				this.autoLastColumn()
			}
		}
		this._computeOuterWidths()
	};
	fn._createHeader = function() {
		var that = this,
			o = this.options,
			hwrap = o.hwrap,
			freezeCols = parseInt(o.freezeCols),
			numberCell = o.numberCell,
			thisColModel = this.colModel,
			depth = this.depth,
			virtualX = o.virtualX,
			virtualXHeader = o.virtualXHeader,
			initH = (virtualXHeader === false) ? that.initHH : that.initH,
			finalH = (virtualXHeader === false) ? that.finalHH : that.finalH,
			headerCells = this.headerCells,
			hidearrHS = this.hidearrHS,
			$header = this.$header,
			$header_o = this.$header_o;
		if (finalH == null) {
			throw ("finalH required for _createHeader")
		}
		if (o.showHeader === false) {
			if ($header) {
				$header.empty()
			}
			$header_o.css("display", "none");
			return
		} else {
			$header_o.css("display", "")
		}
		var tblClass = "pq-grid-header-table ";
		if (hwrap) {
			tblClass += "pq-wrap "
		} else {
			tblClass += "pq-no-wrap "
		}
		var buffer = ["<table class='" + tblClass + "' cellpadding=0 cellspacing=0 >"];
		if (depth >= 1) {
			buffer.push("<tr>");
			if (numberCell.show) {
				buffer.push("<td style='width:" + (numberCell.width + 1) + "px;' ></td>")
			}
			for (var col = 0; col <= finalH; col++) {
				if (col < initH && col >= freezeCols && virtualX) {
					col = initH;
					if (col > finalH) {
						throw ("initH>finalH")
					}
				}
				var column = thisColModel[col];
				if (column.hidden) {
					continue
				}
				var wd = column.outerWidth;
				buffer.push("<td style='width:" + wd + "px;' pq-col-indx=" + col + "></td>")
			}
			buffer.push("</tr>")
		}
		var const_cls = "pq-grid-col ";
		for (var row = 0; row < depth; row++) {
			buffer.push("<tr class='pq-grid-title-row'>");
			if (row == 0 && numberCell.show) {
				buffer.push(["<td pq-grid-col-indx='-1' class='pq-grid-number-col' rowspan='", depth, "'>", "<div class='pq-td-div'>", numberCell.title ? numberCell.title : "&nbsp;", "</div></td>"].join(""))
			}
			for (var col = 0; col <= finalH; col++) {
				if (col < initH && col >= freezeCols && virtualX) {
					col = initH;
					if (col > finalH) {
						throw ("initH>finalH");
						break
					}
				}
				this._createHeaderCell(row, col, headerCells, buffer, const_cls, freezeCols, initH, depth)
			}
			buffer.push("</tr>")
		}
		this.ovCreateHeader(buffer, const_cls);
		buffer.push("</table>");
		var str = buffer.join("");
		$header_o.empty();
		if (this.pqpanes.vH) {
			$header_o.append(["<span class='pq-grid-header pq-grid-header-left ui-state-default'>", str, "</span>", "<span class='pq-grid-header ui-state-default'>", str, "</span>"].join(""))
		} else {
			$header_o.append(["<span class='pq-grid-header ui-state-default'>", str, "</span>"].join(""))
		}
		var $header = this.$header = $(".pq-grid-header", $header_o);
		this.$tbl_header = $header.children("table");
		var wd = calcWidthCols.call(this, -1, freezeCols);
		var $header_left = this.$header_left = $($header[0]);
		if (this.pqpanes.vH) {
			var $header_left = this.$header_left = $($header[0]);
			var $header_right = this.$header_right = $($header[1]);
			$header_left.css({
				width: wd,
				zIndex: 10
			});
			var lft = calcWidthCols.call(this, freezeCols, initH);
			$header_right.css({
				left: (-1 * lft) + "px"
			})
		}
		$header.click(function(evt) {
			return that._onHeaderClick(evt)
		});
		this._refreshResizeColumn(initH, finalH, thisColModel);
		this._trigger("refreshHeader", null, null)
	};
	fn._onHeaderClick = function(evt) {
		var that = this;
		if (that.iDragColumns && that.iDragColumns.status != "stop") {
			return
		}
		var $target = $(evt.target),
			$div = $target.closest(".pq-g-ficon");
		if ($div.length) {
			var colIndx = $div.attr("pq-col-indx");
			evt.stopImmediatePropagation();
			return that.iHeaderIconSearch.createDOM(colIndx, $div, evt)
		}
		var $td = $target.closest("td.pq-grid-col");
		if ($td.length) {
			evt.stopImmediatePropagation();
			var colIndx = $td.attr("pq-grid-col-indx");
			if (colIndx == null) {
				return
			}
		} else {
			return
		}
		return that._onHeaderCellClick(colIndx, evt)
	};
	fn._createHeaderCell = function(row, col, headerCells, buffer, const_cls, freezeCols, initH, depth) {
		var column = headerCells[row][col],
			colSpan = column.colSpan,
			halign = column.halign,
			align = column.align,
			title = column.title,
			title = title ? title : "";
		if (row > 0 && column == headerCells[row - 1][col]) {
			return
		} else {
			if (col > 0 && column == headerCells[row][col - 1]) {
				return
			}
		} if (column.hidden) {
			return
		}
		var cls = const_cls;
		if (halign != null) {
			cls += " pq-align-" + halign
		} else {
			if (align != null) {
				cls += " pq-align-" + align
			}
		} if (col == freezeCols - 1 && depth == 1) {
			cls += " pq-last-freeze-col"
		}
		if (col <= freezeCols - 1) {
			cls += " pq-left-col"
		} else {
			if (col >= initH) {
				cls += " pq-right-col"
			}
		}
		var ccls = column.cls;
		if (ccls) {
			cls = cls + " " + ccls
		}
		var colIndx = "",
			dataIndx = "";
		if (column.colModel == null || column.colModel.length == 0) {
			colIndx = "pq-grid-col-indx='" + col + "'"
		}
		var rowIndxDD = "pq-row-indx=" + row;
		var colIndxDD = "pq-col-indx=" + col;
		buffer.push(["<td ", colIndx, " ", colIndxDD, " ", rowIndxDD, " ", dataIndx, " class='", cls, "' rowspan=", column.rowSpan, " colspan=", colSpan, ">", "<div class='pq-td-div'>", title, "<span class='pq-col-sort-icon'>&nbsp;</span></div></td>"].join(""))
	};
	fn._refreshHeader = function() {
		var CM = this.colModel,
			initH = this.initH,
			finalH = this.finalH,
			$tr = $("table.pq-grid-header-table tr:first");
		for (var i = initH; i <= finalH; i++) {
			var $td = $tr.find("td[pq-col-indx=" + i + "]"),
				column = CM[i];
			$td.width(column.outerWidth)
		}
	};
	fn.ovCreateHeader = function() {};
	fn._refreshResizeColumn = function(initH, finalH, model) {
		var that = this,
			options = this.options,
			virtualX = options.virtualX,
			FMficon = options.filterModel.ficon ? true : false,
			numberCell = options.numberCell,
			hd_ht = that.$header.height(),
			freezeCols = parseInt(options.freezeCols),
			buffer1 = [],
			buffer2 = [];
		if (numberCell.show && numberCell.resizable) {
			var pq_col = that.$header_left.find("td.pq-grid-number-col")[0];
			lft = parseInt(pq_col.offsetLeft) + (pq_col.offsetWidth - 10);
			buffer1.push("<div pq-grid-col-indx='-1' style='left:", lft, "px;height:", hd_ht, "px;' class='pq-grid-col-resize-handle'>&nbsp;</div>")
		}
		for (var i = 0; i <= finalH; i++) {
			if (i < initH && i >= freezeCols) {
				i = initH;
				if (i > finalH) {
					throw ("initH>finalH")
				}
			}
			var column = model[i];
			if (column.hidden) {
				continue
			}
			var cficon = column.ficon,
				ficon = (cficon || (cficon == null && FMficon)),
				$head, buffer = buffer1,
				pq_col, lftCol, lft;
			if ((column.resizable !== false) || ficon) {
				$head = that.$header_left;
				if (this.pqpanes.vH && i >= freezeCols) {
					$head = that.$header_right;
					buffer = buffer2
				}
				pq_col = $head.find("td[pq-grid-col-indx=" + i + "]")[0];
				lftCol = parseInt(pq_col.offsetLeft);
				lft = lftCol + (pq_col.offsetWidth - 5)
			}
			if (column.resizable !== false) {
				buffer.push("<div pq-grid-col-indx='", i, "' style='left:", lft, "px;height:", hd_ht, "px;' class='pq-grid-col-resize-handle'>&nbsp;</div>")
			}
		}
		that.$header_left.append(buffer1.join(""));
		if (buffer2.length) {
			that.$header_right.append(buffer2.join(""))
		}
		var drag_left, drag_new_left, cl_left;
		var $pQuery_handles = that.$header.find(".pq-grid-col-resize-handle").draggable({
			axis: "x",
			helper: function(evt, ui) {
				var $target = $(evt.target);
				var indx = parseInt($target.attr("pq-grid-col-indx"));
				that._setDragLimits(indx);
				that._getDragHelper(evt, ui);
				return $target
			},
			start: function(evt, ui) {
				drag_left = ui.position.left;
				cl_left = parseInt(that.$cl[0].style.left)
			},
			drag: function(evt, ui) {
				drag_new_left = ui.position.left;
				var dx = (drag_new_left - drag_left);
				that.$cl[0].style.left = cl_left + dx + "px"
			},
			stop: function(evt, ui) {
				return that._refreshResizeColumnStop(evt, ui, model, drag_left)
			}
		})
	};
	fn._refreshResizeColumnStop = function(evt, ui, model, drag_left) {
		var that = this,
			thisOptions = this.options,
			numberCell = thisOptions.numberCell;
		that.$clleft.remove();
		that.$cl.remove();
		var drag_new_left = ui.position.left;
		var dx = (drag_new_left - drag_left);
		var $target = $(ui.helper),
			colIndx = parseInt($target.attr("pq-grid-col-indx")),
			column;
		if (colIndx == -1) {
			column = null;
			var oldWidth = parseInt(numberCell.width);
			var newWidth = oldWidth + dx;
			numberCell.width = newWidth
		} else {
			column = model[colIndx];
			var oldWidth = parseInt(column.width);
			var newWidth = oldWidth + dx;
			column.width = newWidth;
			column._resized = true
		}
		that.refresh();
		that._trigger("columnResize", evt, {
			colIndx: colIndx,
			column: column,
			dataIndx: (column ? column.dataIndx : null),
			oldWidth: oldWidth,
			newWidth: column ? column.width : numberCell.width
		})
	};
	fn._refreshHeaderSortIcons = function() {
		var DM = this.options.dataModel;
		if (DM.sortIndx == undefined) {
			return
		}
		var $header = this.$header;
		var $pQuery_cols = $header.find(".pq-grid-col");
		$pQuery_cols.removeClass("pq-col-sort-asc pq-col-sort-desc ui-state-active");
		$header.find(".pq-col-sort-icon").removeClass("ui-icon ui-icon-triangle-1-n ui-icon-triangle-1-s");
		var sortIndx = DM.sortIndx;
		var colIndx = this.getColIndx({
			dataIndx: sortIndx
		});
		var addClass = "ui-state-active pq-col-sort-" + (DM.sortDir == "up" ? "asc" : "desc");
		var cls2 = "ui-icon ui-icon-triangle-1-" + (DM.sortDir == "up" ? "n" : "s");
		$header.find(".pq-grid-col[pq-grid-col-indx=" + colIndx + "]").addClass(addClass);
		$header.find(".pq-grid-col[pq-grid-col-indx=" + colIndx + "] .pq-col-sort-icon").addClass(cls2)
	};
	fn.createTable = function(objP) {
		this.iGenerateView.generateView(objP)
	};
	$.widget("paramquery._pqGrid", $.ui.mouse, fn)
})(jQuery);
(function($) {
	var cClass = $.paramquery.cClass;
	var calcWidthCols = $.paramquery.pqgrid.calcWidthCols;
	var fn = {};
	fn.getFocusElement = function() {
		var ae = document.activeElement;
		if (ae) {
			var $ae = $(ae),
				$grid = $ae.closest(".pq-grid");
			if ($grid.length) {
				if ($grid[0] == this.element[0]) {
					return {
						$ae: $ae,
						$grid: $grid
					}
				} else {
					return {
						$ae: $ae,
						$childGrid: $grid
					}
				}
			}
		}
	};
	fn.inViewPort = function($tdr) {
		var that = this,
			cont = that.$cont[0],
			htCont = cont.offsetHeight - that._getScollBarHorizontalHeight(),
			wdCont = cont.offsetWidth - that._getSBWidth() + 1,
			tdr = $tdr[0],
			$tbl = $(tdr.offsetParent),
			marginTop = parseInt($tbl.css("marginTop")),
			marginLeft = parseInt($tbl.css("marginLeft"));
		if (htCont >= (tdr.offsetTop + tdr.offsetHeight + marginTop)) {
			if (tdr.nodeName.toUpperCase() == "TD") {
				if (wdCont >= (tdr.offsetLeft + tdr.offsetWidth + marginLeft)) {
					return true
				}
			} else {
				return true
			}
		}
	};

	function cHierarchy(that) {
		var self = this;
		this.that = that;
		this.type = "detail";
		this.refreshComplete = true;
		this.detachView = false;
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase(),
			eventNamespace = that.eventNamespace;
		that.element.on(widgetEventPrefix + "cellclick" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.cellClick(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "cellkeydown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt) && evt.keyCode == $.ui.keyCode.ENTER) {
				return self.cellClick(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "aftertable" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.aftertable(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "beforetableview" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.beforeTableView(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "beforerefreshdata" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.beforeRefreshData(evt, ui)
			}
		})
	}
	var _pHierarchy = cHierarchy.prototype = new cClass;
	_pHierarchy.aftertable = function(evt, ui) {
		var that = this.that,
			initDetail = that.options.detailModel.init,
			data = that.pdata;
		if (!this.refreshComplete) {
			return
		}
		this.refreshComplete = false;
		var $trs = that.$tbl.children("tbody").children("tr.pq-detail-child");
		for (var i = 0; i < $trs.length; i++) {
			var tr = $trs[i],
				$tr = $(tr),
				rowIndxPage = $tr.attr("pq-row-indx"),
				rowData = data[rowIndxPage],
				$grid = rowData.pq_detail["child"];
			if (!$grid) {
				if (typeof initDetail == "function") {
					$grid = initDetail.call(that.element[0], {
						rowData: rowData
					});
					rowData.pq_detail["child"] = $grid
				}
			}
			var $header = $grid.find(".pq-header-outer");
			$tr.children("td.pq-detail-child").append($grid);
			if ($header.height() == 0) {
				try {
					$grid.pqGrid("refresh")
				} catch (ex) {}
			}
		}
		this.refreshComplete = true;
		this.detachView = false
	};
	_pHierarchy.beforeTableView = function(evt, ui) {
		if (!this.detachView) {
			this.detachInitView(evt, ui)
		}
	};
	_pHierarchy.beforeRefreshData = function(evt, ui) {
		if (!this.detachView) {
			this.detachInitView(evt, ui)
		}
	};
	_pHierarchy.detachInitView = function(evt, ui) {
		var that = this.that,
			data = that.pdata;
		if (!data || !data.length) {
			return
		}
		var $trs = that.$tbl.children("tbody").children("tr.pq-grid-row");
		var prevRI, $temp, htTemp;
		for (var i = 0; i < $trs.length; i++) {
			var tr = $trs[i],
				$tr = $(tr),
				rowIndxPage = $tr.attr("pq-row-indx"),
				rowData = data[rowIndxPage];
			if (rowIndxPage == null || rowIndxPage == prevRI) {
				continue
			} else {
				prevRI = rowIndxPage
			} if (rowData.pq_detail) {
				$temp = null;
				htTemp = 0;
				if (rowData.pq_detail["child"]) {
					var $next = $tr.next();
					if ($next.hasClass("pq-detail-child")) {
						var $child = $next.children("td.pq-detail-child").children();
						if ($child.length) {
							htTemp = $child[0].offsetHeight;
							$temp = $child.detach()
						}
					}
				}
				if ($temp && $temp.length) {
					rowData.pq_detail["child"] = $temp;
					rowData.pq_detail["height"] = htTemp
				}
			}
		}
		this.detachView = true
	};
	_pHierarchy.cellClick = function(evt, ui) {
		var that = this.that,
			column = ui.column,
			rowData = ui.rowData,
			rowIndx = ui.rowIndx,
			type = this.type;
		if (column && column.type === type) {
			var dataIndx = "pq_detail";
			if (rowData[dataIndx] == null) {
				that.rowExpand({
					rowIndx: rowIndx,
					scrollRow: true
				})
			} else {
				if (rowData[dataIndx]["show"] === false) {
					that.rowExpand({
						rowIndx: rowIndx,
						scrollRow: true
					})
				} else {
					that.rowCollapse({
						rowIndx: rowIndx,
						scrollRow: true
					})
				}
			}
		}
	};
	fn.rowExpand = function(objP) {
		var rowData = this.getRowData(objP),
			detM = this.options.detailModel,
			dataIndx = "pq_detail";
		if (rowData == null) {
			return
		}
		if (rowData[dataIndx] == null) {
			rowData[dataIndx] = {
				show: true
			}
		} else {
			if (rowData[dataIndx]["show"] === false) {
				rowData[dataIndx]["show"] = true
			}
		} if (!detM.cache) {
			var $temp = rowData[dataIndx]["child"];
			if ($temp) {
				$temp.remove();
				rowData[dataIndx]["child"] = null;
				rowData[dataIndx]["height"] = 0
			}
		}
		this.refresh();
		if (objP.scrollRow) {
			var rowIndx = objP.rowIndx;
			this.scrollRow({
				rowIndx: rowIndx
			})
		}
	};
	fn.rowInvalidate = function(objP) {
		var rowData = this.getRowData(objP),
			dataIndx = "pq_detail";
		var $temp = rowData[dataIndx]["child"];
		$temp.remove();
		rowData[dataIndx]["child"] = null
	};
	fn.rowCollapse = function(objP) {
		var rowData = this.getRowData(objP),
			detM = this.options.detailModel,
			dataIndx = "pq_detail";
		if (rowData == null || rowData[dataIndx] == null) {
			return
		} else {
			if (rowData[dataIndx]["show"] === true) {
				if (!detM.cache) {
					var $temp = rowData[dataIndx]["child"];
					if ($temp) {
						$temp.remove();
						rowData[dataIndx]["child"] = null;
						rowData[dataIndx]["height"] = 0
					}
				}
				rowData[dataIndx]["show"] = false;
				this.refresh();
				if (objP.scrollRow) {
					var rowIndx = objP.rowIndx;
					this.scrollRow({
						rowIndx: rowIndx
					})
				}
			}
		}
	};
	var cHeaderSearch = function(that) {
		this.that = that;
		var self = this;
		this.dataHS = {};
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase(),
			eventNamespace = that.eventNamespace;
		that.element.on(widgetEventPrefix + "headerkeydown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				var $src = $(evt.originalEvent.target);
				if ($src.hasClass("pq-search-hd-field")) {
					return self.onKeyDown(evt, ui, $src)
				} else {
					return true
				}
			}
		});
		that.element.on(widgetEventPrefix + "createheader" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onCreateHeader()
			}
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
			$inp, selector = ".pq-search-hd-field[name='" + dataIndx + "']",
			$tbl_right = $(that.$tbl_header[(that.$tbl_header.length == 2) ? 1 : 0]);
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
				} if ($inp) {
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
				} if (colIndx < 0 || colIndx >= CM.length) {
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
			that._fixTableViewPort();
			var $inp = $(e.target);
			var dataIndx = $inp.attr("name");
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
		var $trs = that.$header.find(".pq-grid-header-search");
		for (var i = 0; i < $trs.length; i++) {
			$($trs[i]).on("focusin", handleFocus)
		}
	};
	_pHeaderSearch._onCreateHeader = function() {
		var self = this,
			that = this.that,
			options = that.options,
			columnBorders = options.columnBorders,
			FM = options.filterModel;
		if (!FM.header) {
			return
		}
		this._bindFocus();
		var CM = that.colModel,
			initH = that.initH,
			finalH = that.finalH,
			freezeCols = options.freezeCols,
			virtualX = options.virtualX,
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
		for (var i = 0; i <= finalH; i++) {
			if (i < initH && i >= freezeCols && virtualX) {
				i = initH;
				if (i > finalH) {
					throw ("initH>finalH")
				}
			}
			var column = CM[i];
			if (column.hidden) {
				continue
			}
			var filter = column.filter;
			if (!filter) {
				continue
			}
			var dataIndx = column.dataIndx,
				$tbl_h = $tbl_left;
			if (i >= freezeCols && $tbl_header.length > 1) {
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
					$ele.val(value);
					var wd = this.getWidth(column, columnBorders);
					$ele.css({
						width: wd
					})
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
	_pHeaderSearch.getWidth = function(column, columnBorders) {
		var wd = parseInt(column.width) + ((columnBorders) ? 1 : 0),
			wd = wd - 15;
		return wd
	};
	_pHeaderSearch.createDOM = function(buffer, td_const_cls) {
		var that = this.that,
			self = this,
			initH = that.initH,
			finalH = that.finalH,
			thisOptions = that.options,
			freezeCols = thisOptions.freezeCols,
			virtualX = thisOptions.virtualX,
			CM = that.colModel,
			zIndex = that.element.zIndex() + 5,
			columnBorders = thisOptions.columnBorders,
			dataHS = this.dataHS,
			numberCell = thisOptions.numberCell;
		buffer.push("<tr class='pq-grid-header-search'>");
		if (numberCell.show) {
			buffer.push(["<td pq-grid-col-indx='-1' class='pq-grid-number-col' rowspan='1'>", "<div class='pq-grid-header-table-div'>&nbsp;</div></td>"].join(""))
		}
		for (var i = 0; i <= finalH; i++) {
			if (i < initH && i >= freezeCols && virtualX) {
				i = initH;
				if (i > finalH) {
					throw ("initH>finalH")
				}
			}
			var column = CM[i];
			if (column.hidden) {
				continue
			}
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
					wd = this.getWidth(column, columnBorders),
					cls = filter.cls,
					cls = "pq-search-hd-field " + (cls ? cls : ""),
					style = filter.style,
					style = style ? style : "",
					style = style + "z-index:" + zIndex + ";",
					attr = filter.attr,
					attr = attr ? attr : "",
					strS = "",
					wdhalf;
				if (condition == "between") {
					var value2 = filter.value2,
						value2 = (value2 != null) ? value2 : "",
						wdhalf = ((wd / 2) - 9)
				}
				if (type === "textbox") {
					value = value ? value : "";
					cls = cls + " ui-corner-all pq-search-txt";
					if (condition == "between") {
						strS = this._input(dataIndx, value, wdhalf, cls + " pq-from", style, attr);
						strS += "-" + this._input(dataIndx, value2, wdhalf, cls + " pq-to", style, attr)
					} else {
						strS = this._input(dataIndx, value, wd, cls, style, attr)
					}
				} else {
					if (type === "textarea") {
						value = value ? value : "";
						cls = cls + " ui-corner-all pq-search-txt";
						if (condition == "between") {
							strS = this._textarea(dataIndx, value, wdhalf, cls, style, attr);
							strS += "-" + this._textarea(dataIndx, value2, wdhalf, cls, style, attr)
						} else {
							strS = this._textarea(dataIndx, value, wd, cls, style, attr)
						}
					} else {
						if (type === "select") {
							if (filter.cache) {
								strS = filter.cache;
								strS = strS.replace(/z-index:\d;/, "z-index:" + zIndex + ";")
							} else {
								var opts = filter.options;
								if (typeof opts === "function") {
									opts = opts.call(that.element[0], {
										column: column,
										value: value,
										dataIndx: dataIndx,
										cls: cls,
										style: style,
										attr: attr
									})
								}
								cls = cls + " ui-corner-all";
								var attrSelect = ["name='", dataIndx, "' class='", cls, "' style='width:", wd, "px;", style, "' ", attr].join("");
								strS = $.paramquery.select({
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
								var checked = (value == null || value == false) ? "" : "checked=checked";
								strS = ["<input ", checked, " name='", dataIndx, "' type=checkbox class='" + cls + "' style='" + style + "' " + attr + "/>"].join("")
							} else {
								if (typeof type == "string") {
									strS = type
								} else {
									if (typeof type == "function") {
										strS = type.call(that.element[0], {
											width: wd,
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
				buffer.push(["<td class='", td_cls, "'><div class='pq-grid-header-table-div' style='padding:0px 2px;' >", "", strS, "</div></td>"].join(""))
			} else {
				buffer.push(["<td class='", td_cls, "'><div class='pq-grid-header-table-div' >", "&nbsp;", "</div></td>"].join(""))
			}
		}
		buffer.push("</tr>")
	};
	_pHeaderSearch._input = function(dataIndx, value, wd, cls, style, attr) {
		return ['<input value="', value, "\" name='", dataIndx, "' type=text style='width:", wd, "px;" + style + "' class='" + cls + "' " + attr + " />"].join("")
	};
	_pHeaderSearch._textarea = function(dataIndx, value, wd, cls, style, attr) {
		return ["<textarea name='", dataIndx, "' style='width:", wd, "px;" + style + "' class='" + cls + "' " + attr + " >", value, "</textarea>"].join("")
	};
	$.paramquery.select = function(objP) {
		var attr = objP.attr,
			opts = objP.options,
			groupIndx = objP.groupIndx,
			labelIndx = objP.labelIndx,
			valueIndx = objP.valueIndx,
			prepend = objP.prepend,
			groupV, groupVLast;
		var buffer = ["<select ", attr, " >"];
		if (prepend) {
			for (var key in prepend) {
				buffer.push('<option value="', key, '">', prepend[key], "</option>")
			}
		}
		if (groupIndx) {
			if (opts && opts.length) {
				for (var i = 0, len = opts.length; i < len; i++) {
					var option = opts[i],
						value = option[valueIndx];
					if (value == null) {
						continue
					}
					groupV = option[groupIndx];
					if (groupVLast != groupV) {
						if (groupVLast != null) {
							buffer.push("</optgroup>")
						}
						buffer.push('<optgroup label="', groupV, '">');
						groupVLast = groupV
					}
					if (valueIndx != labelIndx) {
						var label = option[labelIndx];
						buffer.push('<option value="', value, '">', label, "</option>")
					} else {
						buffer.push("<option>", value, "</option>")
					}
				}
				buffer.push("</optgroup>")
			}
		} else {
			if (opts && opts.length) {
				for (var i = 0, len = opts.length; i < len; i++) {
					var option = opts[i];
					if (labelIndx != null && valueIndx != null) {
						var value = option[valueIndx];
						if (value == null) {
							continue
						}
						if (labelIndx == valueIndx) {
							buffer.push("<option>", value, "</option>")
						} else {
							var label = option[labelIndx];
							buffer.push('<option value="', value, '">', label, "</option>")
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
					this.removeAttr("checked")
				} else {
					if (val === false) {
						val = null;
						this.prop("indeterminate", true);
						this.removeAttr("checked")
					} else {
						val = true;
						this.attr("checked", "checked")
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
					this.removeAttr("checked")
				} else {
					if (val) {
						this.attr("checked", "checked")
					} else {
						this.removeAttr("checked")
					}
				}
				return this
			}
		} else {
			return this.data("pq_value")
		}
	};
	var _pGenerateView = {};
	_pGenerateView._generateTitleRow = function(GM, rowObj, buffer, lastFrozenRow) {
		var that = this.that,
			thisOptions = that.options,
			numberCell = thisOptions.numberCell,
			groupTitle = rowObj.groupTitle,
			GMTitle = GM.title,
			groupLevel = rowObj.level,
			GMRowIndx = rowObj.GMRowIndx,
			GMIcon = GM.icon,
			GMIcon = GMIcon ? GMIcon[groupLevel] : null,
			GMIcon = (GMIcon && GMIcon.length && GMIcon.length == 2 && typeof GMIcon.push === "function") ? GMIcon : ["ui-icon-minus", "ui-icon-plus"];
		if (GMTitle && GMTitle[groupLevel] != null) {
			if (GMTitle[groupLevel] === false) {
				return
			}
			groupTitle = GMTitle[groupLevel].replace("{0}", groupTitle);
			groupTitle = groupTitle.replace("{1}", rowObj.items)
		} else {
			groupTitle = groupTitle + " - " + rowObj.items + " item(s)"
		}
		buffer.push(["<tr class='pq-group-row pq-grid-row", (lastFrozenRow ? " pq-last-freeze-row" : ""), "' title=\"", rowObj.groupTitle, "\" level='", groupLevel, "' GMRowIndx='", GMRowIndx, "'>"].join(""));
		if (numberCell.show) {
			buffer.push("<td class='pq-grid-number-cell ui-state-default'>&nbsp;</td>")
		}
		var icon = GMIcon[0];
		if (rowObj.collapsed) {
			icon = GMIcon[1]
		}
		buffer.push("<td class='pq-grid-cell' colSpan='100' >", "<div class='pq-td-div' style='margin-left:", (groupLevel * 16), "px;'>", "<span class='ui-icon ", icon, "'></span>", groupTitle, "</div></td>");
		buffer.push("</tr>")
	};
	_pGenerateView._generateSummaryRow = function(rowData, thisColModel, buffer, lastFrozenRow) {
		var row_cls = "pq-summary-row pq-grid-row" + (lastFrozenRow ? " pq-last-freeze-row" : ""),
			that = this.that,
			thisOptions = that.options,
			virtualX = thisOptions.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			freezeCols = thisOptions.freezeCols,
			numberCell = thisOptions.numberCell,
			columnBorders = thisOptions.columnBorders,
			wrap = thisOptions.wrap,
			offset = this.offset;
		var const_cls = "pq-grid-cell ";
		var row_str = "<tr class='" + row_cls + "'>";
		buffer.push(row_str);
		if (numberCell.show) {
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", "&nbsp;</td>"].join(""))
		}
		for (var col = 0; col <= finalH; col++) {
			if (col < initH && col >= freezeCols && virtualX) {
				col = initH;
				if (col > finalH) {
					throw ("initH>finalH")
				}
			}
			var column = thisColModel[col],
				dataIndx = column.dataIndx;
			if (column.hidden) {
				continue
			}
			var strStyle = "";
			var cls = const_cls;
			if (column.align == "right") {
				cls += " pq-align-right"
			} else {
				if (column.align == "center") {
					cls += " pq-align-center"
				}
			} if (col == freezeCols - 1 && columnBorders) {
				cls += " pq-last-freeze-col"
			}
			if (column.cls) {
				cls = cls + " " + column.cls
			}
			var valCell = (rowData[dataIndx] == null) ? "&nbsp;" : rowData[dataIndx];
			var str = ["<td class='", cls, "' style='", strStyle, "' >", valCell, "</td>"].join("");
			buffer.push(str)
		}
		buffer.push("</tr>");
		return buffer
	};
	_pGenerateView._generateDetailRow = function(rowData, rowIndx, thisColModel, buffer, objP, lastFrozenRow) {
		var row_cls = "pq-grid-row pq-detail-child";
		if (lastFrozenRow) {
			row_cls += " pq-last-freeze-row"
		}
		var that = this.that,
			thisOptions = that.options,
			numberCell = thisOptions.numberCell,
			CMLength = thisColModel.length,
			offset = this.offset;
		var const_cls = "pq-grid-cell ";
		if (!thisOptions.wrap || objP) {
			const_cls += "pq-wrap-text "
		}
		if (thisOptions.stripeRows && (rowIndx / 2 == parseInt(rowIndx / 2))) {
			row_cls += " pq-grid-oddRow"
		}
		if (rowData.pq_rowselect) {
			row_cls += " pq-row-select ui-state-highlight"
		}
		var pq_rowcls = rowData.pq_rowcls;
		if (pq_rowcls != null) {
			row_cls += " " + pq_rowcls
		}
		buffer.push("<tr pq-row-indx='" + rowIndx + "' class='" + row_cls + "' >");
		if (numberCell.show) {
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", "&nbsp;</td>"].join(""))
		}
		buffer.push("<td class='" + const_cls + " pq-detail-child' colSpan='20'></td>");
		buffer.push("</tr>");
		return buffer
	};
	var cGroupView = function(that) {
		this.that = that
	};
	var _pGroupView = cGroupView.prototype;
	_pGroupView._refreshDataFromDataModel = function() {
		this._groupData();
		this.initcollapsed()
	};
	_pGroupView.bindEvents = function() {
		var self = this;
		this.that.$cont.on("click", "tr.pq-group-row", function(evt) {
			return self.onClickGroupRow(evt)
		})
	};
	_pGroupView.showHideRows = function(initIndx, level, hide) {
		var arr = [],
			that = this.that,
			data = that.dataGM;
		for (var i = initIndx, len = data.length; i < len; i++) {
			var rowObj = data[i],
				rowData = rowObj;
			if (rowData.groupSummary) {
				if (rowObj.level < level) {
					break
				} else {
					rowObj.pq_hidden = hide
				}
			} else {
				if (rowData.groupTitle) {
					if (rowObj.collapsed) {
						arr.push({
							indx: i,
							level: rowObj.level
						})
					}
					if (rowObj.level <= level) {
						break
					} else {
						rowObj.pq_hidden = hide
					}
				} else {
					rowObj.pq_hidden = hide
				}
			}
		}
		return arr
	};
	_pGroupView.onClickGroupRow = function(evt) {
		var $tr = $(evt.currentTarget),
			that = this.that;
		var level = parseInt($tr.attr("level")),
			GMRowIndx = parseInt($tr.attr("GMRowIndx")),
			data = that.dataGM,
			collapsed = true,
			rowObj = data[GMRowIndx];
		if (!rowObj.collapsed) {
			rowObj.collapsed = true;
			collapsed = true
		} else {
			rowObj.collapsed = false;
			collapsed = false
		} if (collapsed) {
			this.showHideRows(GMRowIndx + 1, level, true)
		} else {
			var arr = this.showHideRows(GMRowIndx + 1, level, false);
			for (var j = 0; j < arr.length; j++) {
				var indx = arr[j].indx;
				var level = arr[j].level;
				this.showHideRows(indx + 1, level, true)
			}
		}
		that.refresh()
	};
	_pGroupView.initcollapsed = function() {
		var that = this.that,
			data = that.dataGM;
		if (!data) {
			return
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i],
				groupTitle = rowData.groupTitle;
			if (groupTitle !== undefined) {
				var level = rowData.level,
					collapsed = rowData.collapsed;
				if (collapsed) {
					this.showHideRows(i + 1, level, true)
				}
			}
		}
	};
	_pGroupView.max = function(arr, dataType) {
		var ret;
		if (dataType == "integer" || dataType == "float") {
			ret = Math.max.apply(Math, arr);
			if (dataType === "float") {
				ret = ret.toFixed(2)
			}
		} else {
			if (dataType == "date") {
				arr = arr.sort(function(a, b) {
					a = Date.parse(a);
					b = Date.parse(b);
					return (a - b)
				});
				ret = arr[arr.length - 1]
			} else {
				arr = arr.sort();
				ret = arr[arr.length - 1]
			}
		}
		return ret
	};
	_pGroupView.min = function(arr, dataType) {
		var ret;
		if (dataType == "integer" || dataType == "float") {
			ret = Math.min.apply(Math, arr);
			if (dataType === "float") {
				ret = ret.toFixed(2)
			}
		} else {
			if (dataType == "date") {
				arr = arr.sort(function(a, b) {
					a = Date.parse(a);
					b = Date.parse(b);
					return (a - b)
				});
				ret = arr[0]
			} else {
				arr = arr.sort();
				ret = arr[0]
			}
		}
		return ret
	};
	_pGroupView.count = function(arr) {
		return arr.length
	};
	_pGroupView.sum = function(arr, dataType) {
		var s = 0,
			fn;
		if (dataType === "float") {
			fn = parseFloat
		} else {
			if (dataType === "integer") {
				fn = parseInt
			} else {
				fn = function(val) {
					return val
				}
			}
		}
		for (var i = 0, len = arr.length; i < len; i++) {
			s += fn(arr[i])
		}
		if (dataType === "float") {
			s = s.toFixed(2)
		}
		return s
	};
	_pGroupView._groupData = function() {
		var that = this.that,
			data = that.pdata,
			thisOptions = that.options,
			GM = thisOptions.groupModel,
			PM = thisOptions.pageModel,
			CM = that.colModel,
			rowOffset = (PM.type) ? ((PM.curPage - 1) * PM.rPP) : 0,
			CMLength = CM.length,
			GMdataIndx = GM.dataIndx,
			GMLength = GMdataIndx.length,
			GMcollapsed = GM.collapsed,
			groupSummaryShow = [];
		for (var u = 0; u < GMLength; u++) {
			groupSummaryShow[u] = false;
			for (var v = 0; v < CMLength; v++) {
				var column = CM[v],
					summary = column.summary;
				if (!summary) {
					continue
				}
				var summaryType = summary.type;
				if (!summaryType || typeof summaryType.push != "function") {
					continue
				}
				if (summaryType[u]) {
					groupSummaryShow[u] = true;
					break
				}
			}
		}
		if (GM && data && data.length > 0) {
			var dataGM = [],
				titleIndx = [],
				groupVal = [],
				prevGroupVal = [],
				cols = [];
			for (var u = 0; u < GMLength; u++) {
				prevGroupVal[u] = "";
				groupVal[u] = "";
				cols[u] = {}
			}
			for (var i = 0, len = data.length; i <= len; i++) {
				var rowData = data[i];
				var changeGroup = false,
					changeGroupIndx = null;
				for (var u = 0; u < GMLength; u++) {
					groupVal[u] = (i < len) ? $.trim(rowData[GMdataIndx[u]]) : "";
					if (prevGroupVal[u] != groupVal[u]) {
						changeGroup = true
					}
					if (changeGroup && changeGroupIndx == null) {
						changeGroupIndx = u
					}
				}
				if (changeGroup) {
					for (var l = 0; l < GMLength; l++) {
						prevGroupVal[l] = groupVal[l]
					}
					if (i > 0) {
						for (var u = GMLength - 1; u >= changeGroupIndx; u--) {
							if (groupSummaryShow[u]) {
								var groupRowData = [];
								for (var f = 0; f < CMLength; f++) {
									var column = CM[f],
										summary = column.summary,
										summaryType = (summary) ? (summary.type ? summary.type[u] : null) : null;
									if (summaryType) {
										var dataIndx = column.dataIndx,
											summaryCellData = "",
											summaryTitle = summary.title ? summary.title[u] : null,
											sText = "{0}";
										if (typeof summaryType == "function") {
											summaryCellData = summaryType(cols[u][dataIndx], column.dataType)
										} else {
											sText = summaryType + ": {0}";
											summaryCellData = this[summaryType](cols[u][dataIndx], column.dataType)
										} if (summaryTitle) {
											sText = summaryTitle
										}
										groupRowData[dataIndx] = sText.replace("{0}", summaryCellData)
									}
								}
								dataGM.push({
									groupSummary: true,
									level: u,
									data: groupRowData
								})
							}
						}
						for (var m = changeGroupIndx; m < GMLength; m++) {
							dataGM[titleIndx[m]].items = cols[m][CM[0].dataIndx].length
						}
					}
					if (i == len) {
						break
					}
					for (var z = GMLength - 1; z >= changeGroupIndx; z--) {
						for (var e = 0; e < CMLength; e++) {
							var column = CM[e];
							cols[z][column.dataIndx] = []
						}
					}
					for (var m = changeGroupIndx; m < GMLength; m++) {
						dataGM.push({
							groupTitle: groupVal[m],
							level: m,
							GMRowIndx: dataGM.length,
							collapsed: (GMcollapsed && (GMcollapsed[m] != null)) ? GMcollapsed[m] : false
						});
						titleIndx[m] = dataGM.length - 1
					}
				}
				if (i == len) {
					break
				}
				rowData.rowIndx = i + rowOffset;
				rowData.pq_hidden = false;
				dataGM.push(rowData);
				for (var k = 0; k < CMLength; k++) {
					var column = CM[k],
						dataIndx = column.dataIndx;
					for (var u = 0; u < GMLength; u++) {
						cols[u][dataIndx].push(rowData[dataIndx])
					}
				}
			}
			that.dataGM = dataGM
		} else {
			that.dataGM = null
		}
	};
	var cDragColumns = function(that) {
		this.that = that;
		this.$drag_helper = null;
		var dragColumns = that.options.dragColumns,
			topIcon = dragColumns.topIcon,
			bottomIcon = dragColumns.bottomIcon,
			self = this;
		this.status = "stop";
		this.$arrowTop = $("<div class='pq-arrow-down ui-icon " + topIcon + "'></div>").appendTo(that.element);
		this.$arrowBottom = $("<div class='pq-arrow-up ui-icon " + bottomIcon + "' ></div>").appendTo(that.element);
		this.hideArrows();
		if (dragColumns && dragColumns.enabled) {
			that.$header_o.on("mousedown", "td.pq-grid-col", function(evt, ui) {
				if ($(evt.target).is("input,select,textarea")) {
					return
				}
				if (!evt.pq_composed) {
					self.setDraggables(evt, ui);
					evt.pq_composed = true;
					var e = $.Event("mousedown", evt);
					$(evt.target).trigger(e)
				}
			})
		}
	};
	var _pDragColumns = cDragColumns.prototype;
	_pDragColumns.showFeedback = function($td, leftDrop) {
		var that = this.that;
		var td = $td[0];
		var offParent = td.offsetParent.offsetParent;
		var left = td.offsetLeft + offParent.offsetLeft + ((!leftDrop) ? td.offsetWidth : 0) - 8;
		var top = that.$grid_inner[0].offsetTop + td.offsetTop - 16;
		var top2 = that.$grid_inner[0].offsetTop + that.$header[0].offsetHeight;
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
	_pDragColumns.setDraggables = function(evt, ui) {
		var $td = $(evt.currentTarget),
			that = this.that,
			dragColumns = that.options.dragColumns,
			rejectIcon = dragColumns.rejectIcon,
			self = this;
		if ($td.hasClass("ui-draggable")) {
			return
		}
		if (!that.getHeaderColumnFromTD($td)) {
			return
		}
		$td.draggable({
			distance: 10,
			cursorAt: {
				top: -18,
				left: -10
			},
			helper: function() {
				var $this = $(this);
				self.status = "helper";
				self._setupDroppables($this);
				that.$header.find(".pq-grid-col-resize-handle").hide();
				var colIndx = $this.attr("pq-col-indx");
				var rowIndx = $this.attr("pq-row-indx");
				$this.droppable("destroy");
				var column = that.headerCells[rowIndx][colIndx];
				var $drag_helper = $("<div class='pq-col-drag-helper ui-widget-content ui-corner-all' ><span class='pq-drag-icon ui-icon " + rejectIcon + "'></span>" + column.title + "</div>");
				self.$drag_helper = $drag_helper;
				return $drag_helper[0]
			},
			zIndex: "1000",
			appendTo: that.element,
			revert: "invalid",
			drag: function(evt, ui) {
				self.status = "drag";
				var $td = $("td.pq-drop-hover", that.$header);
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
					if (that.$toolbar.hasClass("pq-drop-hover")) {
						self.updateDragHelper(true)
					} else {
						self.updateDragHelper()
					}
				}
			},
			stop: function(evt, ui) {
				self.status = "stop";
				that.$header.find(".pq-grid-col-resize-handle").show();
				self.hideArrows()
			}
		})
	};
	_pDragColumns._columnIndexOf = function(colModel, column) {
		for (var i = 0, len = colModel.length; i < len; i++) {
			if (colModel[i] == column) {
				return i
			}
		}
		return -1
	};
	_pDragColumns._setupDroppables = function($td) {
		var that = this.that,
			o = that.options,
			self = this;
		var objDrop = {
			hoverClass: "pq-drop-hover ui-state-highlight",
			tolerance: "pointer",
			drop: function(evt, ui) {
				if (that.dropPending) {
					return
				}
				var colIndxDrag = parseInt(ui.draggable.attr("pq-col-indx"));
				var rowIndxDrag = parseInt(ui.draggable.attr("pq-row-indx"));
				var colIndxDrop = parseInt($(this).attr("pq-col-indx"));
				var rowIndxDrop = $(this).attr("pq-row-indx");
				var optCM = that.options.colModel;
				var headerCells = that.headerCells;
				var columnDrag = headerCells[rowIndxDrag][colIndxDrag];
				var colModelDrag, colModelDrop;
				if (rowIndxDrag == 0) {
					colModelDrag = optCM
				} else {
					colModelDrag = headerCells[rowIndxDrag - 1][colIndxDrag].colModel
				} if (rowIndxDrop == 0) {
					colModelDrop = optCM
				} else {
					colModelDrop = headerCells[rowIndxDrop - 1][colIndxDrop].colModel
				}
				var columnDrop = headerCells[rowIndxDrop][colIndxDrop];
				var indxDrag = self._columnIndexOf(colModelDrag, columnDrag);
				var column = colModelDrag.splice(indxDrag, 1)[0];
				var indxDrop = self._columnIndexOf(colModelDrop, columnDrop);
				var decr = (self.leftDrop) ? 1 : 0;
				colModelDrop.splice(indxDrop + 1 - decr, 0, column);
				that.dropPending = true;
				window.setTimeout(function() {
					that._calcThisColModel();
					that.refresh();
					that.dropPending = false
				}, 0)
			}
		};
		var $tds = that.$header_left.find("td.pq-left-col");
		var $tds2 = that.pqpanes.v ? that.$header_right.find("td.pq-right-col") : that.$header_left.find("td.pq-right-col");
		$tds = $tds.add($tds2);
		$tds.each(function(i, td) {
			var $td = $(td);
			if ($td.hasClass("ui-droppable")) {
				return
			}
			$td.droppable(objDrop)
		});
		return
	};
	fn.options = {
		detailModel: {
			cache: true,
			offset: 100,
			expandIcon: "ui-icon-triangle-1-se",
			collapseIcon: "ui-icon-triangle-1-e"
		},
		dragColumns: {
			enabled: true,
			acceptIcon: "ui-icon-check",
			rejectIcon: "ui-icon-closethick",
			topIcon: "ui-icon-circle-arrow-s",
			bottomIcon: "ui-icon-circle-arrow-n"
		},
		track: null,
		treeModel: {
			collapsed: true,
			indent: 15,
			leafIcon: "ui-icon-radio-off",
			expandIcon: "ui-icon-triangle-1-se",
			collapseIcon: "ui-icon-triangle-1-e"
		},
		filterModel: {
			on: true,
			mode: "AND",
			header: false
		}
	};
	fn._create = function() {
		$.extend($.paramquery.cGenerateView.prototype, _pGenerateView);
		var that = this,
			o = this.options;
		this.iHistory = new $.paramquery.cHistory(this);
		this.iGroupView = new cGroupView(this);
		this.iHeaderSearch = new cHeaderSearch(this);
		this.iUCData = new $.paramquery.cUCData(this);
		this.iMouseSelection = new $.paramquery.cMouseSelection(this);
		this._super.apply(this);
		this.iGroupView.bindEvents();
		this.iDragColumns = new cDragColumns(this);
		this._createToolbar();
		this.refreshDataAndView({
			header: true
		});
		this.refresh({
			table: true
		});
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase(),
			widgetName = that.widgetName;
		that.element.one(widgetEventPrefix + "load." + widgetName, function(evt, ui) {
			that.refresh()
		})
	};
	fn._createToolbar = function() {
		var that = this,
			options = this.options,
			toolbar = options.toolbar;
		if (toolbar) {
			var tb = toolbar,
				cls = tb.cls,
				cls = cls ? cls : "",
				style = tb.style,
				style = style ? style : "",
				attr = tb.attr,
				attr = attr ? attr : "",
				items = tb.items;
			var $toolbar = $("<div class='" + cls + "' style='" + style + "' " + attr + " ></div>").appendTo($(".pq-grid-top", this.element));
			$toolbar.pqToolbar({
				items: items,
				gridInstance: this
			});
			if (!options.showToolbar) {
				$toolbar.css("display", "none")
			}
			this.$toolbar = $toolbar
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
	fn._createHeader = function() {
		this._super.apply(this);
		if (this.options.showHeader) {
			this._trigger("createHeader")
		}
	};
	fn.exportExcel = function(obj) {
		obj.format = "xml";
		return $.paramquery.pqgrid.exportToExcel.call(this, obj)
	};
	fn.exportCsv = function(obj) {
		obj.format = "csv";
		return $.paramquery.pqgrid.exportToExcel.call(this, obj)
	};
	fn.filter = function(objP) {
		var that = this,
			thisOptions = this.options,
			apply = (objP.apply === undefined) ? true : objP.apply,
			sort = (objP.sort === undefined) ? true : objP.sort,
			DM = thisOptions.dataModel,
			FM = thisOptions.filterModel;
		if (objP != undefined) {
			var replace = (objP.oper == "replace") ? true : false,
				rules = objP.data,
				CM = this.colModel,
				CM = (!apply) ? $.extend(true, [], CM) : CM,
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
						} if (condition) {
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
											arrOpts = value.split(",s*")
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
			return that._onDataAvailable(obj2)
		}
	};
	fn._initTypeColumns = function() {
		var CM = this.colModel;
		for (var i = 0, len = CM.length; i < len; i++) {
			var column = CM[i],
				type = column.type;
			if (type === "checkBoxSelection") {
				new $.paramquery.cCheckBoxColumn(this, column)
			} else {
				if (type === "detail") {
					column.dataIndx = "pq_detail";
					this.iHierarchy = new cHierarchy(this)
				}
			}
		}
	};
	fn.refreshDataFromDataModel = function() {
		this._super.apply(this);
		var thisOptions = this.options,
			GM = thisOptions.groupModel,
			GMTrue = (GM) ? true : false;
		if (GMTrue) {
			this.iGroupView._refreshDataFromDataModel()
		}
	};
	var cSort = $.paramquery.cSort = function(that) {
		this.that = that
	};
	var _pSort = cSort.prototype;
	_pSort._refreshSorters = function(pDataIndx) {
		var that = this.that,
			thisOptions = that.options,
			DM = thisOptions.dataModel,
			DMsortIndx = DM.sortIndx,
			multiSort = $.isArray(DMsortIndx),
			GM = thisOptions.groupModel,
			GMdataIndx = GM ? GM.dataIndx : null,
			GMDir = GM ? GM.dir : null,
			foundInGMIndx = -1,
			sorters = [];
		if (GM) {
			for (var i = 0; i < GMdataIndx.length; i++) {
				var gDataIndx = GMdataIndx[i];
				if (gDataIndx == pDataIndx) {
					foundInGMIndx = i
				}
				sorters.push({
					dataIndx: gDataIndx,
					dir: (GMDir && GMDir[i]) ? GMDir[i] : "up"
				})
			}
		}
		if (foundInGMIndx !== -1) {
			var dir = sorters[foundInGMIndx].dir;
			var newDir = (dir === "up") ? "down" : "up";
			sorters[foundInGMIndx].dir = newDir;
			GMDir[foundInGMIndx] = newDir
		} else {
			if (pDataIndx != null) {
				if (multiSort) {
					var indx = $.inArray(pDataIndx, DM.sortIndx);
					if (indx != -1) {
						if (DM.sortDir[indx] == "up") {
							DM.sortDir[indx] = "down"
						} else {
							if (DMsortIndx.length == 1) {
								DM.sortDir[indx] = "up"
							} else {
								DM.sortIndx.splice(indx, 1);
								DM.sortDir.splice(indx, 1)
							}
						}
					} else {
						var len = DM.sortIndx.length;
						DM.sortIndx[len] = pDataIndx;
						DM.sortDir[len] = "up"
					}
				} else {
					if (DM.sortIndx == pDataIndx) {
						DM.sortDir = (DM.sortDir == "up") ? "down" : "up"
					} else {
						DM.sortIndx = pDataIndx;
						DM.sortDir = "up"
					}
				}
			}
		} if (DM.sortIndx != null) {
			if (multiSort) {
				for (var i = 0; i < DMsortIndx.length; i++) {
					var dataIndx = DMsortIndx[i];
					if (this.inSorters(sorters, dataIndx) == -1) {
						sorters.push({
							dataIndx: dataIndx,
							dir: DM.sortDir[i]
						})
					}
				}
			} else {
				if (this.inSorters(sorters, DM.sortIndx) == -1) {
					sorters.push({
						dataIndx: DM.sortIndx,
						dir: DM.sortDir
					})
				}
			}
		}
		this.sorters = sorters
	};
	_pSort.inSorters = function(sorters, dataIndx) {
		var found = -1;
		for (var i = 0; i < sorters.length; i++) {
			var sorter = sorters[i];
			if (sorter.dataIndx == dataIndx) {
				found = i;
				break
			}
		}
		return found
	};
	_pSort._sortLocalData = function(data) {
		var that = this.that,
			thisOptions = that.options,
			DM = thisOptions.dataModel,
			CM = that.colModel,
			sorters = this.sorters;
		for (var i = 0; i < sorters.length; i++) {
			var sorter = sorters[i],
				dataIndx = sorter.dataIndx,
				colIndx = that.getColIndx({
					dataIndx: dataIndx
				}),
				dataType = CM[colIndx].dataType;
			sorter.dataType = dataType
		}
		return this.__sortLocalData(sorters, data)
	};
	_pSort.__sortLocalData = function(sorters, data) {
		if (data == null || data.length == 0) {
			return
		}
		if (!sorters || !sorters.length) {
			return data
		}

		function sort_integer(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			val1 = val1 ? parseInt(val1, 10) : 0;
			val2 = val2 ? parseInt(val2, 10) : 0;
			return ((val1 - val2) * dir)
		}

		function sort_date(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			val1 = val1 ? Date.parse(val1) : 0;
			val2 = val2 ? Date.parse(val2) : 0;
			return ((val1 - val2) * dir)
		}

		function sort_custom(obj1, obj2, dataIndx, dir, dataType) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			return (dataType(val1, val2) * dir)
		}

		function sort_float(obj1, obj2, dataIndx, dir) {
			var val1 = (obj1[dataIndx] + "").replace(/,/g, "");
			var val2 = (obj2[dataIndx] + "").replace(/,/g, "");
			val1 = val1 ? parseFloat(val1) : 0;
			val2 = val2 ? parseFloat(val2) : 0;
			return ((val1 - val2) * dir)
		}

		function sort_string(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			val1 = val1 ? val1 : "";
			val2 = val2 ? val2 : "";
			var ret = 0;
			if (val1 > val2) {
				ret = 1
			} else {
				if (val1 < val2) {
					ret = -1
				}
			}
			return (ret * dir)
		}

		function sort_stringi(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			val1 = val1 ? val1.toUpperCase() : "";
			val2 = val2 ? val2.toUpperCase() : "";
			var ret = 0;
			if (val1 > val2) {
				ret = 1
			} else {
				if (val1 < val2) {
					ret = -1
				}
			}
			return (ret * dir)
		}

		function sort_bool(obj1, obj2, dataIndx, dir) {
			var val1 = obj1[dataIndx];
			var val2 = obj2[dataIndx];
			var ret = 0;
			if ((val1 && !val2) || (val1 === false && val2 === null)) {
				ret = 1
			} else {
				if ((val2 && !val1) || (val2 === false && val1 === null)) {
					ret = -1
				}
			}
			return (ret * dir)
		}

		function innerSort() {
			var arrFn = [],
				arrDataIndx = [],
				arrDir = [],
				sortersLength = sorters.length;

			function sort_composite(obj1, obj2) {
				var ret = 0;
				for (var i = 0; i < sortersLength; i++) {
					ret = arrFn[i](obj1, obj2, arrDataIndx[i], arrDir[i]);
					if (ret != 0) {
						break
					}
				}
				return ret
			}
			for (var i = 0; i < sortersLength; i++) {
				var sorter = sorters[i],
					dataIndx = sorter.dataIndx,
					dir = (sorter.dir == "up") ? 1 : -1,
					dataType = sorter.dataType;
				arrDataIndx[i] = dataIndx;
				arrDir[i] = dir;
				if (dataType == "integer") {
					arrFn[i] = sort_integer
				} else {
					if (dataType == "float") {
						arrFn[i] = sort_float
					} else {
						if (typeof dataType == "function") {
							arrFn[i] = (function(dataType) {
								return function(obj1, obj2, dataIndx, dir) {
									return sort_custom(obj1, obj2, dataIndx, dir, dataType)
								}
							})(dataType)
						} else {
							if (dataType == "date") {
								arrFn[i] = sort_date
							} else {
								if (dataType == "stringi") {
									arrFn[i] = sort_stringi
								} else {
									if (dataType == "bool") {
										arrFn[i] = sort_bool
									} else {
										arrFn[i] = sort_string
									}
								}
							}
						}
					}
				}
			}
			data = data.sort(sort_composite)
		}
		innerSort();
		return data
	};
	fn._refreshHeaderSortIcons = function() {
		var thisOptions = this.options,
			DM = thisOptions.dataModel,
			sorters = this.iSort.sorters,
			thisColModel = this.colModel;
		var $header = this.$header;
		if (!$header) {
			return
		}
		var $pQuery_cols = $header.find(".pq-grid-col");
		$pQuery_cols.removeClass("pq-col-sort-asc pq-col-sort-desc ui-state-active");
		$header.find(".pq-col-sort-icon").removeClass("ui-icon ui-icon-triangle-1-n ui-icon-triangle-1-s");
		for (var i = 0; i < sorters.length; i++) {
			var sorter = sorters[i];
			var dataIndx = sorter.dataIndx;
			var colIndx = this.getColIndx({
				dataIndx: dataIndx
			});
			var dir = sorter.dir;
			var addClass = "ui-state-active pq-col-sort-" + (dir == "up" ? "asc" : "desc");
			var cls2 = "ui-icon ui-icon-triangle-1-" + (dir == "up" ? "n" : "s");
			$header.find(".pq-grid-col[pq-grid-col-indx=" + colIndx + "]").addClass(addClass);
			$header.find(".pq-grid-col[pq-grid-col-indx=" + colIndx + "] .pq-col-sort-icon").addClass(cls2)
		}
	};
	fn.getHeaderColumnFromTD = function($td) {
		var colIndx = $td.attr("pq-grid-col-indx");
		if (colIndx == null) {
			return
		}
		var column = this.colModel[colIndx];
		return column
	};
	fn.getIndxInSorters = function(dataIndx) {
		var sorters = this.sorters;
		for (var i = 0, len = sorters.length; i < len; i++) {
			if (sorters[i].dataIndx == dataIndx) {
				return i
			}
		}
		return -1
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
				url: this.url + ((queryStr != null) ? queryStr : "")
			}
		}
	};
	fn.getDataPage = function() {
		return this.pdata
	};
	fn.getData = function(objP) {
		var dataIndices = objP.dataIndx,
			dILen = dataIndices.length,
			data = objP.data,
			DM = this.options.dataModel,
			DMData = DM.data,
			DMDataUF = DM.dataUF,
			arr = [],
			pr = function(data) {
				for (var i = 0, len = data.length; i < len; i++) {
					var rowData = data[i];
					var row = {};
					for (var j = 0; j < dILen; j++) {
						var dataIndx = dataIndices[j];
						row[dataIndx] = rowData[dataIndx]
					}
					arr.push(row)
				}
			};
		if (data) {
			pr(data)
		} else {
			if (DMData) {
				pr(DMData)
			}
			if (DMDataUF) {
				pr(DMDataUF)
			}
		}
		var sorters = [];
		for (var j = 0; j < dILen; j++) {
			var dataIndx = dataIndices[j];
			var column = this.getColumn({
				dataIndx: dataIndx
			});
			sorters.push({
				dataIndx: dataIndx,
				dir: "up",
				dataType: column.dataType
			})
		}
		arr = this.iSort.__sortLocalData(sorters, arr);
		var arr2 = [],
			item2 = undefined;
		for (var i = 0; i < arr.length; i++) {
			var rowData = arr[i];
			var item = JSON.stringify(rowData);
			if (item !== item2) {
				arr2.push(rowData);
				item2 = item
			}
		}
		return arr2
	};
	fn.getFilterData = function(objP) {
		var CM = objP.CM;
		if (!CM) {
			throw ("CM N/A")
		}
		var CMLength = CM.length,
			location = objP.location,
			FM = this.options.filterModel,
			FMmultiple = FM.multiple,
			conditions = $.paramquery.filter.getAllConditions,
			TRconditions = $.paramquery.filter.getTRConditions,
			arrS = [],
			isCorrect = function(condition, value, value2) {
				if (condition == "between") {
					if ((value == null || value === "") && (value2 == null || value2 === "")) {
						return false
					} else {
						return true
					}
				} else {
					if ($.inArray(condition, conditions) != -1) {
						if ((value == null || value === "")) {
							if ($.inArray(condition, TRconditions) != -1) {
								return false
							}
						}
						return true
					} else {
						return true
					}
				}
			}, getValue = function(cd, dataType) {
				if (location == "remote") {
					cd = (cd == null) ? "" : cd;
					return cd.toString()
				} else {
					return cFilterData.convert(cd, dataType)
				}
			};
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx,
				dataType = column.dataType,
				dataType = (!dataType || typeof dataType == "function") ? "string" : dataType,
				filter = column.filter;
			if (FMmultiple) {
				var cFM = column.filterModel;
				if (cFM && cFM.on) {
					var filters = [],
						cMode = cFM.mode,
						cFilters = cFM.filters;
					for (var j = 0; j < cFilters.length; j++) {
						var filter = cFilters[j],
							value = filter.value,
							condition = filter.condition;
						if (isCorrect(condition, value)) {
							value = getValue(value, dataType);
							filters.push({
								value: value,
								condition: condition
							})
						}
					}
					arrS.push({
						dataIndx: dataIndx,
						mode: cMode,
						dataType: dataType,
						filters: filters
					})
				}
			} else {
				if (filter && filter.on) {
					var value = filter.value,
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
						arrS.push({
							dataIndx: dataIndx,
							value: value,
							value2: value2,
							condition: condition,
							dataType: dataType,
							cbFn: (location == "remote") ? "" : cFilterData.conditions[condition]
						})
					}
				}
			}
		}
		return arrS
	};
	var cFilterData = function(that) {
		this.that = that
	};
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
			if (cd.indexOf(value) == 0) {
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
			if (lastIndx != -1 && (lastIndx + value.length == cd.length)) {
				return true
			}
		},
		notend: function(cd, value) {
			var lastIndx = cd.lastIndexOf(value);
			if (lastIndx != -1 && (lastIndx + value.length == cd.length)) {} else {
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
		cd = (cd == null) ? "" : cd;
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
			cd = (cd == null) ? "" : cd
		} else {
			cd = cFilterData.convert(cd, dataType)
		}
		var found = cbFn(cd, value, value2) ? true : false;
		return found
	};
	_pFilterData.isMatchCellMultiple = function(s, rowData) {
		var dataIndx = s.dataIndx,
			dataType = s.dataType,
			smode = s.mode,
			filters = s.filters,
			flen = filters.length;
		if (flen == 0) {
			return true
		}
		for (var i = 0; i < flen; i++) {
			var f = filters[i],
				value = f.value,
				condition = f.condition,
				cd = rowData[dataIndx],
				found = this.isMatchRule(cd, condition, value, dataType);
			if (smode == "OR" && found) {
				return true
			}
			if (smode == "AND" && !found) {
				return false
			}
		}
		if (flen === 1) {
			return found
		} else {
			if (smode == "AND") {
				return true
			} else {
				if (smode == "OR") {
					return false
				}
			}
		}
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
	fn.filterLocalData = function(objP) {
		objP = objP ? objP : {};
		var apply = objP.apply,
			CM = (apply === false) ? objP.CM : this.colModel,
			arrS = this.getFilterData({
				CM: CM
			}),
			options = this.options,
			DM = options.dataModel,
			data1 = DM.data,
			data2 = DM.dataUF,
			arr1 = [],
			arr2 = [],
			FM = options.filterModel,
			FMmultiple = FM.multiple,
			FMmode = FM ? FM.mode : null;
		var iFD = new cFilterData();
		if (FMmultiple) {
			iFD.isMatchCell = iFD.isMatchCellMultiple
		} else {
			iFD.isMatchCell = iFD.isMatchCellSingle
		} if (FM.on && FMmode) {
			if (data1) {
				for (var i = 0, len = data1.length; i < len; i++) {
					var rowData = data1[i];
					if (iFD.isMatchRow(rowData, arrS, FMmode)) {
						arr1.push(rowData)
					} else {
						arr2.push(rowData)
					}
				}
			}
			if (data2) {
				for (var i = 0, len = data2.length; i < len; i++) {
					var rowData = data2[i];
					if (iFD.isMatchRow(rowData, arrS, FMmode)) {
						arr1.push(rowData)
					} else {
						arr2.push(rowData)
					}
				}
			}
		} else {
			if (data1) {
				for (var i = 0, len = data1.length; i < len; i++) {
					var rowData = data1[i];
					arr1.push(rowData)
				}
			}
			if (data2) {
				for (var i = 0, len = data2.length; i < len; i++) {
					var rowData = data2[i];
					arr1.push(rowData)
				}
			}
		} if (apply) {
			DM.data = arr1;
			DM.dataUF = arr2;
			this._trigger("filter", null, {
				type: "local",
				dataModel: DM,
				colModel: CM,
				filterModel: FM
			})
		}
		return {
			data: arr1,
			dataUF: arr2
		}
	};
	fn._onDataAvailable = function(objP) {
		objP = objP ? objP : {};
		var options = this.options,
			apply = objP.apply,
			source = objP.source,
			sort = objP.sort,
			data = [],
			FM = options.filterModel,
			DM = options.dataModel,
			location = DM.location;
		if (apply !== false) {
			this._trigger("dataAvailable", objP.evt, {
				dataModel: DM,
				source: source
			})
		}
		if (FM && FM.on && ((location == "local" && FM.type != "remote") || (location == "remote" && FM.type == "local"))) {
			data = this.filterLocalData(objP).data
		} else {
			data = DM.data
		} if (DM.sorting && DM.sorting == "local") {
			if (sort !== false) {
				data = this.iSort._sortLocalData(data)
			}
		}
		if (apply === false) {
			return data
		} else {
			DM.data = data
		}
		this.refreshView(objP)
	};
	fn.sort = function(obj) {
		var that = this,
			options = this.options,
			colIndx = obj.colIndx,
			EM = options.editModel,
			dataIndx = obj.dataIndx,
			evt = obj.evt,
			DM = options.dataModel;
		if (colIndx == null && dataIndx == null) {
			dataIndx = DM.sortIndx;
			if (dataIndx == null) {
				return
			}
		}
		colIndx = (colIndx == null) ? this.getColIndx({
			dataIndx: dataIndx
		}) : colIndx;
		var column = this.colModel[colIndx];
		dataIndx = (dataIndx == null) ? column.dataIndx : dataIndx;
		if (that._trigger("beforeSort", evt, {
			dataModel: DM,
			column: column,
			dataIndx: dataIndx
		}) == false) {
			return
		}
		if (EM.indices) {
			that.blurEditor({
				force: true
			})
		}
		this.iSort._refreshSorters(dataIndx);
		if (DM.sorting == "local") {
			this.iSort._sortLocalData(DM.data);
			this.refreshView()
		} else {
			if (DM.sorting == "remote") {
				this.remoteRequest({
					callback: function() {
						that._trigger("sort", evt, {
							dataModel: DM,
							column: column,
							dataIndx: dataIndx
						});
						that._onDataAvailable()
					}
				})
			}
		}
	};
	fn._setScrollVLength = function(data) {
		var GM = this.options.groupModel;
		data = (GM) ? this.dataGM : data;
		this._super.call(this, data)
	};
	$.widget("paramquery.pqGrid", $.paramquery._pqGrid, fn);
	$.paramquery.pqGrid.regional = {};
	$.paramquery.pqGrid.regional.en = fn._regional
})(jQuery);
(function($) {
	$.paramquery = ($.paramquery == null) ? {} : $.paramquery;
	$.paramquery.pqgrid = ($.paramquery.pqgrid == null) ? {} : $.paramquery.pqgrid;
	$.paramquery.pqgrid.exportToExcel = function(obj) {
		var that = this,
			urlPost = (obj.urlPost === undefined) ? obj.url : obj.urlPost,
			urlExcel = obj.url,
			sheetName = (obj.sheetName == null) ? "pqGrid" : obj.sheetName,
			format = obj.format,
			getXMLContent = function() {
				var CM = that.colModel,
					CMLength = CM.length,
					options = that.options,
					DM = options.dataModel,
					data = DM.data,
					dataLength = data.length,
					response = [];
				var header = [];
				for (var i = 0; i < CMLength; i++) {
					var column = CM[i];
					if (column.copy !== false) {
						header.push('<Column ss:AutoFitWidth="1"  ss:Width="' + column._width + '" />')
					}
				}
				header.push("<Row>");
				for (var i = 0; i < CMLength; i++) {
					var column = CM[i];
					if (column.copy !== false) {
						header.push('<Cell><Data ss:Type="String">' + column.title + "</Data></Cell>")
					}
				}
				header.push("</Row>");
				header = header.join("\n");
				for (var i = 0; i < dataLength; i++) {
					var rowData = data[i];
					response.push("<Row>");
					for (var j = 0; j < CMLength; j++) {
						var column = CM[j];
						if (column.copy !== false) {
							var dataIndx = column.dataIndx;
							response.push('<Cell><Data ss:Type="String"><![CDATA[' + rowData[dataIndx] + "]]></Data></Cell>")
						}
					}
					response.push("</Row>")
				}
				response = response.join("\n");
				var excelDoc = ['<?xml version="1.0"?>', '<?mso-application progid="Excel.Sheet"?>', '<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"', ' xmlns:o="urn:schemas-microsoft-com:office:office"', ' xmlns:x="urn:schemas-microsoft-com:office:excel"', ' xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"', ' xmlns:html="http://www.w3.org/TR/REC-html40">', '<Worksheet ss:Name="', sheetName, '">', "<Table>", header, response, "</Table>", "</Worksheet>", "</Workbook>"];
				return excelDoc.join("\n")
			}, getCSVContent = function() {
				var CM = that.colModel,
					CMLength = CM.length,
					options = that.options,
					DM = options.dataModel,
					data = DM.data,
					dataLength = data.length,
					csvRows = [],
					header = [],
					response = [];
				for (var i = 0; i < CMLength; i++) {
					var column = CM[i];
					if (column.copy !== false) {
						var title = column.title.replace(/\"/g, '""');
						header.push('"' + title + '"')
					}
				}
				csvRows.push(header.join(","));
				for (var i = 0; i < dataLength; i++) {
					var rowData = data[i];
					for (var j = 0; j < CMLength; j++) {
						var column = CM[j];
						if (column.copy !== false) {
							var dataIndx = column.dataIndx;
							var cellData = rowData[dataIndx] + "";
							cellData = cellData.replace(/\"/g, '""');
							response.push('"' + cellData + '"')
						}
					}
					csvRows.push(response.join(","));
					response = []
				}
				return csvRows.join("\n")
			};
		var data = (format == "xml") ? getXMLContent() : getCSVContent();
		$.ajax({
			url: urlPost,
			type: "POST",
			cache: false,
			data: {
				extension: format,
				excel: data
			},
			success: function(filename) {
				var url = urlExcel + (((urlExcel.indexOf("?") > 0) ? "&" : "?") + "filename=" + filename);
				$(document.body).append("<iframe height='0' width='0' frameborder='0'  src=" + url + "></iframe>")
			}
		})
	}
})(jQuery);
(function($) {
	var pq_options = $.paramquery.pqGrid.prototype.options;
	var trackModel = {
		on: false,
		dirtyClass: "pq-cell-dirty"
	};
	pq_options.trackModel = pq_options.trackModel || trackModel;
	var cUCData = $.paramquery.cUCData = function(that) {
		this.that = that;
		this.udata = [];
		this.ddata = [];
		this.adata = [];
		this.options = that.options;
		var self = this,
			eventNamespace = that.eventNamespace,
			widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "dataavailable" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt) && ui.source != "filter") {
				self.udata = [];
				self.ddata = [];
				self.adata = []
			}
		})
	};
	var _pUCData = cUCData.prototype = new $.paramquery.cClass;
	_pUCData.add = function(obj) {
		var that = this.that,
			adata = this.adata,
			rowData = obj.rowData,
			TM = this.options.trackModel,
			dirtyClass = TM.dirtyClass,
			recId = that.getRecId({
				rowData: rowData
			});
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i];
			if (recId != null && rec.recId == recId) {
				throw ("primary key violation")
			}
			if (rec.rowData == rowData) {
				throw ("same data can't be added twice.")
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
			getVal = $.paramquery.getValueFromDataType,
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
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			paging = that.options.pageModel.type,
			indx = (paging == "remote") ? rowIndxPage : rowIndx,
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
	_pUCData.getChangesValue = function() {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			mydata = {
				updateList: [],
				addList: [],
				deleteList: []
			}, mupdateList = [],
			updateList = [],
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
		for (var i = 0; i < udata.length; i++) {
			var rec = udata[i],
				rowData = rec.rowData;
			if ($.inArray(rowData, mdeleteList) != -1) {
				continue
			}
			if ($.inArray(rowData, mupdateList) == -1) {
				var row = {};
				for (var key in rowData) {
					if (key.indexOf("pq_") != 0) {
						row[key] = rowData[key]
					}
				}
				mupdateList.push(rowData);
				updateList.push(row)
			}
		}
		for (var i = 0; i < adata.length; i++) {
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
		mydata.updateList = updateList;
		mydata.addList = addList;
		mydata.deleteList = deleteList;
		return mydata
	};
	_pUCData.getChanges = function() {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata,
			mydata = {
				updateList: [],
				addList: [],
				deleteList: []
			}, updateList = [],
			addList = [],
			deleteList = [];
		for (var i = 0, len = ddata.length; i < len; i++) {
			var rec = ddata[i],
				rowData = rec.rowData;
			deleteList.push(rowData)
		}
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				rowData = rec.rowData;
			if ($.inArray(rowData, deleteList) != -1) {
				continue
			}
			if ($.inArray(rowData, updateList) == -1) {
				updateList.push(rowData)
			}
		}
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i],
				rowData = rec.rowData;
			addList.push(rowData)
		}
		mydata.updateList = updateList;
		mydata.addList = addList;
		mydata.deleteList = deleteList;
		return mydata
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
		var CM = this.that.colModel,
			CMLength = CM.length,
			adata = this.adata,
			inArray = $.inArray,
			adataLen = adata.length,
			getVal = $.paramquery.getValueFromDataType,
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
						if (hidden || (dataIndx == recIndx)) {
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
						var newRow = {}, oldRow = {};
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
					for (var k = 0; k < CMLength; k++) {
						var column = CM[k],
							dataIndx = column.dataIndx
					}
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
			ddataLen = ddata.length,
			rowLen = rows.length,
			foundRowData = [];
		for (var i = 0; i < ddataLen; i++) {
			var rowData = ddata[i].rowData;
			for (var j = 0; j < rowLen; j++) {
				var row = rows[j];
				if (rowData[recIndx] == row[recIndx]) {
					foundRowData.push(rowData)
				}
			}
		}
		var newddata = [];
		for (var i = 0; i < ddataLen; i++) {
			var rowData = ddata[i].rowData;
			if ($.inArray(rowData, foundRowData) == -1) {
				newddata.push(ddata[i])
			}
		}
		this.ddata = newddata
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
		this.ddata = []
	};
	_pUCData.commit = function(objP) {
		var that = this.that,
			history = objP ? objP.history : null,
			history = (history == null) ? false : history,
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
				oldRow = {}, newRow = rec.oldRow;
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
			refreshView = (objP && (objP.refresh != null)) ? objP.refresh : true,
			objType = (objP && (objP.type != null)) ? objP.type : null,
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
	var fnGrid = $.paramquery.pqGrid.prototype;
	fnGrid.getChanges = function(obj) {
		this.blurEditor({
			force: true
		});
		if (obj) {
			var format = obj.format;
			if (format) {
				if (format == "byVal") {
					return this.iUCData.getChangesValue()
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
	fnGrid._getRowIndx = function() {
		var that = this;
		var arr = that.selection({
			type: "row",
			method: "getSelection"
		});
		if (arr && arr.length > 0) {
			var rowIndx = arr[0].rowIndx,
				offset = that.rowIndxOffset,
				PM = that.options.pageModel,
				paging = PM.type,
				rowIndxPage = rowIndx - offset,
				rPP = PM.rPP;
			if (paging) {
				if (rowIndxPage >= 0 && rowIndxPage < rPP) {
					return rowIndx
				}
			} else {
				return rowIndx
			}
		} else {
			return null
		}
	};
	fnGrid.updateRow = function(objP) {
		var that = this,
			rowIndx = objP.rowIndx,
			newRow = objP.row,
			rowData = objP.rowData || that.getRowData({
				rowIndx: rowIndx
			});
		if (!rowData) {
			return false
		}
		var oldRow = {};
		for (var dataIndx in newRow) {
			oldRow[dataIndx] = rowData[dataIndx]
		}
		var ret = this._digestData({
			source: objP.source || "update",
			history: objP.history,
			checkEditable: objP.checkEditable,
			track: objP.track,
			allowInvalid: objP.allowInvalid,
			rowList: [{
				newRow: newRow,
				oldRow: oldRow,
				rowData: rowData,
				rowIndx: rowIndx,
				type: "update"
			}]
		});
		if (ret === false) {
			return false
		}
		if (objP.refresh !== false) {
			that.refreshRow({
				rowIndx: rowIndx
			})
		}
	};
	fnGrid.updateElseAdd = function(objP) {
		var that = this,
			rowIndx = objP.rowIndx,
			row = objP.row,
			rowData = that.getRowData({
				rowIndx: rowIndx
			});
		if (rowData == null) {
			objP.rowData = row;
			that.addRow(objP)
		} else {
			that.updateRow(objP)
		}
	};
	fnGrid._fillForm = function(obj) {
		var that = this,
			DM = that.options.dataModel,
			PM = that.options.pageModel,
			paging = PM.type,
			data = DM.data,
			CM = that.colModel,
			offset = that.rowIndxOffset,
			rowIndxPage = (obj.rowIndxPage == null) ? obj.rowIndx - offset : obj.rowIndxPage,
			rowIndx = (obj.rowIndx == null) ? rowIndxPage + offset : obj.rowIndx,
			indx = (paging == "remote") ? rowIndxPage : rowIndx,
			rowData = data[indx];
		this.rowData = rowData;
		this.$crudDialog.dialog("option", "title", "Edit Record (" + (rowIndx + 1) + ")");
		var $frm = this.$crudForm;
		for (var i = 0; i < CM.length; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx,
				val = rowData[dataIndx];
			$frm.find("*[name='" + dataIndx + "']").val(val)
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
		var objRowData = obj.rowData;
		if (objRowData != null) {
			return objRowData
		}
		var options = this.options,
			DM = options.dataModel,
			PM = options.pageModel,
			paging = PM.type,
			recIndx = DM.recIndx,
			recId = obj.recId,
			data = DM.data;
		if (recId != null) {
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				if (rowData[recIndx] == recId) {
					return rowData
				}
			}
		} else {
			var rowIndx = obj.rowIndx,
				rowIndxPage = obj.rowIndxPage,
				offset = this.rowIndxOffset,
				rowIndx = (rowIndx != null) ? rowIndx : rowIndxPage + offset,
				rowIndxPage = (rowIndxPage != null) ? rowIndxPage : rowIndx - offset,
				indx = (paging == "remote") ? rowIndxPage : rowIndx,
				rowData = data ? data[indx] : null;
			return rowData
		}
		return null
	};
	fnGrid.deleteRow = function(objP) {
		var that = this,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndxPage != null) ? rowIndxPage + offset : rowIndx;
		if (rowIndx != null) {
			var rowData = objP.rowData || this.getRowData({
				rowIndx: rowIndx
			});
			this._digestData({
				source: objP.source || "delete",
				history: objP.history,
				track: objP.track,
				rowList: [{
					rowIndx: rowIndx,
					rowData: rowData,
					oldRow: rowData,
					type: "delete"
				}]
			});
			if (objP.refresh !== false) {
				that.refreshView()
			}
		}
	};
	fnGrid.addRow = function(objP) {
		var that = this,
			rowData = objP.rowData || objP.row,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndxPage != null) ? rowIndxPage + offset : rowIndx,
			o = that.options,
			DM = o.dataModel,
			data = DM.data;
		if (rowData == null) {
			return null
		}
		if (data == null) {
			DM.data = [];
			data = DM.data
		}
		var ret = this._digestData({
			source: objP.source || "add",
			history: objP.history,
			track: objP.track,
			checkEditable: objP.checkEditable,
			rowList: [{
				newRow: rowData,
				rowIndx: rowIndx,
				type: "add"
			}]
		});
		if (ret === false) {
			return false
		}
		if (objP.refresh !== false) {
			this.refreshView()
		}
		if (rowIndx == null) {
			return data.length - 1
		} else {
			return rowIndx
		}
	}
})(jQuery);
(function($) {
	var fnTB = {};
	fnTB.options = {
		items: [],
		gridInstance: null
	};
	fnTB._create = function() {
		var self = this,
			options = this.options,
			that = options.gridInstance,
			CM = that.colModel,
			items = options.items,
			element = this.element,
			$grid = element.closest(".pq-grid");
		element.addClass("pq-toolbar");
		for (var i = 0, len = items.length; i < len; i++) {
			var item = items[i],
				type = item.type,
				icon = item.icon,
				options = item.options,
				text = item.label,
				listener = item.listener,
				listeners = listener ? [listener] : item.listeners,
				itemcls = item.cls,
				cls = "ui-corner-all " + (itemcls ? itemcls : ""),
				itemstyle = item.style,
				style = itemstyle ? 'style="' + itemstyle + '"' : "",
				itemattr = item.attr,
				attr = itemattr ? itemattr : "",
				$ctrl;
			if (type == "textbox") {
				$ctrl = $("<input type='text' class='" + cls + "' " + attr + " " + style + ">").appendTo(element)
			} else {
				if (type == "checkbox") {
					$ctrl = $("<input type='checkbox' class='" + cls + "' " + attr + " " + style + ">").appendTo(element)
				} else {
					if (type == "separator") {
						$("<span class='pq-separator '" + cls + "' " + attr + " " + style + "></span>").appendTo(element)
					} else {
						if (type == "button") {
							var options = item.options ? item.options : {};
							$.extend(options, {
								text: text ? true : false,
								icons: {
									primary: icon
								}
							});
							$ctrl = $("<button type='button' class='" + cls + "' " + attr + " " + style + ">" + text + "</button>").button(options).appendTo(element)
						} else {
							if (type == "select") {
								var options = item.options ? item.options : [];
								if (typeof options === "function") {
									options = options.call(that.element[0], {
										colModel: CM
									})
								}
								inp = $.paramquery.select({
									options: options,
									attr: " class='" + cls + "' " + attr + " " + style,
									prepend: item.prepend,
									groupIndx: item.groupIndx,
									valueIndx: item.valueIndx,
									labelIndx: item.labelIndx
								});
								$ctrl = $(inp).appendTo(element)
							} else {
								if (typeof type == "string") {
									$ctrl = $(type).appendTo(element)
								} else {
									if (typeof type == "function") {
										var inp = type.call(that.element[0], {
											colModel: CM,
											cls: cls
										});
										$ctrl = $(inp).appendTo(element)
									}
								}
							}
						}
					}
				}
			} if (listeners) {
				for (var j = 0; j < listeners.length; j++) {
					var listener = listeners[j];
					for (var event in listener) {
						$ctrl.bind(event, listener[event])
					}
				}
			}
		}
	};
	fnTB._destroy = function() {
		this.element.empty().removeClass("pq-toolbar").enableSelection()
	};
	fnTB._disable = function() {
		if (this.$disable == null) {
			this.$disable = $("<div class='pq-grid-disable'></div>").css("opacity", 0.2).appendTo(this.element)
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
	$.widget("paramquery.pqToolbar", fnTB)
})(jQuery);
(function($) {
	var cSelection = function() {
		this.focusSelection = null
	};
	var _pSelection = cSelection.prototype;
	_pSelection.triggerSelectChange = function(objP) {
		var that = this.that,
			SM = that.options.selectionModel;
		if (SM.fireSelectChange) {
			var rowSel = that.iRows.getSelection(),
				cellSel = that.iCells.getSelection(),
				evt = objP.evt,
				ui = objP.ui;
			var ui2 = {
				rows: rowSel,
				cells: cellSel
			};
			ui = (ui == null) ? ui2 : $.extend(ui2, ui);
			that._trigger("selectChange", evt, ui)
		}
	};
	_pSelection.getOldRowSel = function() {
		var that = this.that,
			lastSel;
		if ((lastSel = this.focusSelection) && this.isSelected(lastSel)) {
			var objP = that.getRowIndx(lastSel);
			objP.rowData = lastSel.rowData;
			return objP
		}
	};
	_pSelection.getOldCellSel = function() {
		var that = this.that,
			lastSel;
		if ((lastSel = this.focusSelection) && this.isSelected(lastSel)) {
			var rowData = lastSel.rowData;
			var objP = that.getRowIndx({
				rowData: rowData
			});
			objP.rowData = rowData;
			objP.dataIndx = lastSel.dataIndx;
			return objP
		}
	};
	_pSelection.getNewRowSel = function() {
		var that = this.that,
			$ae = document.activeElement ? $(document.activeElement) : null;
		if ($ae && $ae.hasClass("pq-grid-row")) {
			var $grid = $ae.closest(".pq-grid");
			if ($grid[0] == that.element[0]) {
				var objP = that.getRowIndx({
					$tr: $ae
				});
				objP.$tr = $ae;
				return objP
			}
		}
	};
	_pSelection.getNewCellSel = function() {
		var that = this.that,
			$ae = document.activeElement ? $(document.activeElement) : null;
		if ($ae && $ae.hasClass("pq-grid-cell")) {
			var $grid = $ae.closest(".pq-grid");
			if ($grid[0] == that.element[0]) {
				var objP = that.getCellIndices({
					$td: $ae
				});
				objP.$td = $ae;
				return objP
			}
		}
	};
	_pSelection.getFocusSelection = function(objP) {
		if (this instanceof cRows) {
			if (objP && objP.old === true) {
				return this.getOldRowSel()
			} else {
				return this.getNewRowSel()
			}
		} else {
			if (this instanceof cCells) {
				if (objP && objP.old === true) {
					return this.getOldCellSel()
				} else {
					return this.getNewCellSel()
				}
			}
		}
	};
	_pSelection.getFirstSelection = function() {
		var fs = this.firstSelection;
		if (fs && this.isSelected(fs)) {
			return fs
		} else {
			this.refresh();
			var selection = this.selection;
			if (selection.length) {
				this.firstSelection = selection[0];
				return selection[0]
			}
		}
	};
	_pSelection.getLastSelection = function() {
		var ls = this.lastSelection;
		if (ls) {
			var that = this.that,
				rowData = ls.rowData,
				rowData2 = that.getRowData({
					rowIndx: rowIndx
				});
			if (rowData == rowData2 && this.isSelected(ls)) {
				return ls
			} else {
				return false
			}
		} else {
			return null
		}
	};
	_pSelection.getLastSelectionCurPage = function() {
		var ls = this.lastSelection;
		if (ls && this.isSelected(ls)) {
			var rowIndx = ls.rowIndx,
				PM = this.that.options.pageModel;
			if (PM.type) {
				var curPage = PM.curPage,
					rPP = PM.rPP;
				if (Math.ceil((rowIndx + 1) / rPP) == curPage) {
					return ls
				} else {
					return null
				}
			} else {
				return ls
			}
		} else {
			return null
		}
	};
	_pSelection.getSelection = function() {
		this.refresh();
		return this.selection
	};
	_pSelection.getSelectionCurPage = function() {
		var that = this.that,
			selection = this.getSelection(),
			selection2 = [],
			options = that.options,
			PM = options.pageModel;
		if (PM.type) {
			var curPage = PM.curPage,
				rPP = PM.rPP;
			for (var i = 0; i < selection.length; i++) {
				var sel = selection[i],
					rowIndx = sel.rowIndx;
				if (Math.ceil((rowIndx + 1) / rPP) == curPage) {
					selection2.push(sel)
				}
			}
			return selection2
		} else {
			return selection
		}
	};
	_pSelection.inViewRow = function(rowIndxPage) {
		var that = this.that,
			options = this.options,
			GM = options.groupModel,
			offset = that.rowIndxOffset,
			freezeRows = options.freezeRows;
		var initV = that.initV,
			finalV = that.finalV;
		if (rowIndxPage < freezeRows) {
			return true
		}
		if (GM) {
			var data = that.dataGM;
			if (data && data.length) {
				for (var i = initV; i <= finalV; i++) {
					var rowDataGM = data[i],
						rowIndxP = rowDataGM.rowIndx - offset;
					if (rowIndxP != null && rowIndxP == rowIndxPage) {
						return true
					}
				}
			}
			return false
		} else {
			return (rowIndxPage >= initV && rowIndxPage <= finalV)
		}
	};
	_pSelection.setDirty = function() {};
	var cRows = function(that) {
		this.that = that;
		this.options = that.options;
		this.selection = []
	};
	$.paramquery.cRows = cRows;
	var cCells = function(that) {
		this.options = that.options;
		this.that = that;
		this.selection = []
	};
	$.paramquery.cCells = cCells;
	var _pC = cCells.prototype = new cSelection;
	var _pR = cRows.prototype = new cSelection;
	_pR.extendSelection = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			mode = that.options.selectionModel.mode,
			evt = objP.evt;
		var rowFirstSel = this.getFirstSelection();
		if (rowFirstSel == null) {
			that.setSelection({
				rowIndx: rowIndx
			});
			return
		}
		if (mode != "single") {
			var rowIndx1 = rowFirstSel.rowIndx,
				initRowIndx = rowIndx1,
				finalRowIndx = rowIndx;
			if (rowIndx1 > rowIndx) {
				initRowIndx = rowIndx;
				finalRowIndx = rowIndx1
			}
			this.selectRange({
				initRowIndx: initRowIndx,
				finalRowIndx: finalRowIndx,
				evt: evt
			});
			this.add({
				rowIndx: rowIndx
			})
		}
	};
	_pR.refresh = function() {
		this.selection = [];
		var that = this.that,
			options = that.options,
			DM = options.dataModel,
			PM = options.pageModel,
			paging = PM.type,
			remote = (paging == "remote") ? true : false,
			offset = that.rowIndxOffset,
			selection = [],
			data = DM.data;
		if (!data) {
			return
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData.pq_rowselect) {
				var rowIndx = (remote) ? (i + offset) : i;
				selection.push({
					rowIndx: rowIndx,
					rowData: rowData
				})
			}
		}
		this.selection = selection
	};
	_pR.replace = function(obj) {
		var rowIndx = obj.rowIndx,
			offset = (obj.offset == null) ? this.that.getRowIndxOffset() : obj.offset,
			rowIndxPage = rowIndx - offset,
			$tr = obj.$tr,
			evt = obj.evt;
		obj.offset = offset;
		obj.rowIndxPage = rowIndxPage;
		this.removeAll({
			raiseEvent: true
		});
		this.add(obj)
	};
	_pR.indexOf = function(obj) {
		this.refresh();
		var rowIndx = obj.rowIndx,
			selectedRows = this.selection;
		for (var i = 0; i < selectedRows.length; i++) {
			if (selectedRows[i].rowIndx == rowIndx) {
				return i
			}
		}
		return -1
	};
	_pR.isSelected = function(objP) {
		var that = this.that,
			rowData = objP.rowData || that.getRowData(objP);
		return (rowData) ? ((rowData.pq_rowselect == null) ? false : rowData.pq_rowselect) : null
	};
	_pR._boundRow = function(obj) {
		var rowIndxPage = obj.rowIndxPage,
			that = this.that,
			$tr = (obj.$tr == null) ? that.getRow({
				rowIndxPage: rowIndxPage
			}) : obj.$tr;
		if ($tr == null || $tr.length == 0) {
			return false
		}
		$tr.addClass("pq-row-select ui-state-highlight");
		return $tr
	};
	_pR.selectRange = function(objP) {
		var that = this.that,
			initRowIndx = objP.initRowIndx,
			finalRowIndx = objP.finalRowIndx,
			evt = objP.evt,
			rowSelection = this.getSelection(),
			rowSelection2 = rowSelection.slice(0);
		var arr = [];
		for (var i = 0; i < rowSelection2.length; i++) {
			var rowS = rowSelection2[i],
				row = rowS.rowIndx;
			if (row < initRowIndx || row > finalRowIndx) {
				arr.push({
					rowIndx: row,
					rowData: rowS.rowData
				})
			}
		}
		this.remove({
			rows: arr,
			evt: evt
		});
		arr = [];
		if (initRowIndx > finalRowIndx) {
			var temp = initRowIndx;
			initRowIndx = finalRowIndx;
			finalRowIndx = temp
		}
		for (var row = initRowIndx; row <= finalRowIndx; row++) {
			arr.push({
				rowIndx: row,
				evt: evt
			})
		}
		this.add({
			rows: arr,
			evt: evt
		})
	};
	_pC._addToData = function(objP) {
		var dataIndx = objP.dataIndx,
			rowData = this.that.getRowData(objP);
		if (!rowData.pq_cellselect) {
			rowData.pq_cellselect = {}
		}
		rowData.pq_cellselect[dataIndx] = true
	};
	_pC.extendSelection = function(objP) {
		var that = this.that,
			lastSel = this.getFirstSelection(),
			rowIndx = objP.rowIndx,
			colIndx = objP.colIndx,
			mode = that.options.selectionModel.mode,
			evt = objP.evt;
		if (lastSel == null) {
			that.setSelection({
				rowIndx: rowIndx,
				colIndx: colIndx
			});
			return
		}
		var rowIndx1 = lastSel.rowIndx,
			colIndx1 = that.getColIndx({
				dataIndx: lastSel.dataIndx
			}),
			initRowIndx = rowIndx1,
			finalRowIndx = rowIndx,
			initColIndx = colIndx1,
			finalColIndx = colIndx;
		if (rowIndx1 > rowIndx) {
			initRowIndx = rowIndx;
			finalRowIndx = rowIndx1
		}
		if (mode == "range") {
			if (rowIndx1 > rowIndx) {
				initColIndx = colIndx;
				finalColIndx = colIndx1
			}
			if (rowIndx == rowIndx1 && colIndx < colIndx1) {
				initColIndx = colIndx;
				finalColIndx = colIndx1
			}
			this.selectRange({
				initRowIndx: initRowIndx,
				initColIndx: initColIndx,
				finalRowIndx: finalRowIndx,
				finalColIndx: finalColIndx,
				evt: evt
			});
			this.add({
				rowIndx: rowIndx,
				colIndx: colIndx
			})
		} else {
			if (mode == "block") {
				if (colIndx1 > colIndx) {
					initColIndx = colIndx;
					finalColIndx = colIndx1
				}
				this.selectBlock({
					initRowIndx: initRowIndx,
					initColIndx: initColIndx,
					finalRowIndx: finalRowIndx,
					finalColIndx: finalColIndx,
					evt: evt
				});
				this.add({
					rowIndx: rowIndx,
					colIndx: colIndx
				})
			}
		}
	};
	_pC._removeFromData = function(objP) {
		var rowData = objP.rowData;
		if (rowData && rowData.pq_cellselect) {
			delete rowData.pq_cellselect[objP.dataIndx]
		}
	};
	_pC.removeAll = function() {
		this.refresh();
		var cells = this.selection.slice(0);
		var self = this;
		self.remove({
			cells: cells
		});
		this.lastSelection = null
	};
	_pR.removeAll = function(objP) {
		if (objP && objP.page != null) {
			throw ("objP.page not supported in removeAll")
		}
		var that = this.that,
			all = (objP && objP.all != null) ? objP.all : true;
		this.refresh();
		var rows = this.selection.slice(0);
		if (all) {
			this.remove({
				rows: rows
			});
			this.lastSelection = null
		} else {
			var rows2 = [],
				offset = that.rowIndxOffset,
				curPageData = that.pdata,
				curPageDataLen = curPageData ? curPageData.length : 0;
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i],
					rowIndx = row.rowIndx,
					rowIndxPage = rowIndx - offset;
				if (rowIndxPage >= 0) {
					if (rowIndxPage < curPageDataLen) {
						rows2.push(row)
					} else {
						break
					}
				}
			}
			this.remove({
				rows: rows2
			})
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
		dataIndx = (dataIndx == null) ? that.colModel[colIndx].dataIndx : dataIndx;
		if (rowData.pq_cellselect) {
			if (rowData.pq_cellselect[dataIndx]) {
				return true
			}
		}
		return false
	};
	_pC.refresh = function() {
		this.selection = [];
		var that = this.that,
			DM = that.options.dataModel,
			PM = that.options.pageModel,
			data = DM.data,
			selection = [],
			paging = PM.type,
			remote = (paging == "remote") ? true : false,
			offset = that.rowIndxOffset,
			CM = this.that.colModel,
			CMLength = CM.length;
		if (!data) {
			return
		}
		var colIndxs = [],
			columns = [],
			dataIndxs = [];
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx;
			dataIndxs[i] = dataIndx;
			colIndxs[dataIndx] = i;
			columns[dataIndx] = column
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			var pq_cellselect = rowData.pq_cellselect;
			if (pq_cellselect) {
				var rowIndx = (remote) ? (i + offset) : i;
				for (var j = 0; j < CMLength; j++) {
					var dataIndx = dataIndxs[j];
					if (pq_cellselect[dataIndx]) {
						selection.push({
							rowIndx: rowIndx,
							rowData: rowData,
							dataIndx: dataIndx,
							colIndx: j,
							column: CM[j]
						})
					}
				}
			}
		}
		this.selection = selection
	};
	_pC.replace = function(obj) {
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			offset = (obj.offset == null) ? this.that.getRowIndxOffset() : obj.offset,
			rowIndxPage = rowIndx - offset,
			$td = obj.$td,
			evt = obj.evt;
		obj.rowIndxPage = rowIndxPage;
		obj.offset = offset;
		this.removeAll({
			raiseEvent: true
		});
		this.add(obj)
	};
	_pC.inViewCell = function(rowIndxPage, colIndx) {
		var that = this.that,
			options = this.options,
			freezeCols = options.freezeCols;
		if (this.inViewRow(rowIndxPage)) {
			return (colIndx < freezeCols || colIndx >= that.initH && colIndx <= that.finalH)
		} else {
			return false
		}
	};
	_pC._add = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			rowData = objP.rowData || that.getRowData(objP),
			offset = that.rowIndxOffset,
			success, rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			colIndx = objP.colIndx,
			dataIndx = objP.dataIndx,
			colIndx = (colIndx == null) ? that.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			column = that.colModel[colIndx],
			dataIndx = (dataIndx == null) ? column.dataIndx : dataIndx,
			evt = objP.evt,
			isSelected = this.isSelected({
				rowData: rowData,
				dataIndx: dataIndx
			});
		if (isSelected == null) {
			return false
		}
		var inView = this.inViewCell(rowIndxPage, colIndx);
		if (isSelected === false) {
			if (inView) {
				var $td = that.getCell({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				});
				if ($td) {
					$td.addClass("pq-cell-select ui-state-highlight")
				}
			}
			this._addToData({
				rowData: rowData,
				dataIndx: dataIndx
			});
			if (objP.trigger !== false) {
				that._trigger("cellSelect", evt, {
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					dataIndx: dataIndx,
					column: column,
					rowData: rowData
				})
			}
			success = true
		}
		this.lastSelection = {
			rowIndx: rowIndx,
			dataIndx: dataIndx,
			rowData: rowData
		};
		if (objP.focus !== false && inView) {
			if (!$td || !$td.length) {
				$td = that.getCell({
					rowIndxPage: rowIndxPage,
					dataIndx: dataIndx
				})
			}
			if ($td && $td.length) {
				$td.attr("tabindex", "0");
				$td.focus();
				that._fixTableViewPort();
				this.focusSelection = {
					rowData: rowData,
					rowIndx: rowIndx,
					dataIndx: dataIndx
				}
			}
		}
		if (objP.setFirst) {
			this.firstSelection = {
				rowIndx: rowIndx,
				rowData: rowData,
				dataIndx: dataIndx
			}
		}
		if (success) {
			return {
				rowIndx: rowIndx,
				rowData: rowData,
				dataIndx: dataIndx,
				colIndx: colIndx,
				column: column
			}
		}
	};
	_pR._add = function(objP) {
		var that = this.that,
			success, rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			rowData = (rowData == null) ? that.getRowData(objP) : rowData,
			$tr = objP.$tr,
			evt = objP.evt,
			isSelected = this.isSelected({
				rowData: rowData
			});
		objP.rowIndxPage = rowIndxPage;
		if (isSelected == null) {
			return false
		}
		var inView = this.inViewRow(rowIndxPage);
		if (isSelected === false) {
			if (inView) {
				var ret = this._boundRow(objP),
					$tr = ret
			}
			rowData.pq_rowselect = true;
			if (objP.trigger !== false) {
				that._trigger("rowSelect", evt, {
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage,
					rowData: rowData,
					$tr: $tr
				})
			}
			success = true
		}
		this.lastSelection = {
			rowIndx: rowIndx,
			rowData: rowData
		};
		if (objP.focus !== false && inView) {
			if (!$tr || !$tr.length) {
				$tr = that.getRow({
					rowIndxPage: rowIndxPage
				})
			}
			if ($tr) {
				$tr = $($tr[0]);
				$tr.attr("tabindex", "0");
				$tr.focus();
				that._fixTableViewPort();
				this.focusSelection = {
					rowData: rowData,
					rowIndx: rowIndx
				}
			}
		}
		if (objP.setFirst) {
			this.firstSelection = {
				rowIndx: rowIndx,
				rowData: rowData
			}
		}
		if (success) {
			return {
				rowIndx: rowIndx,
				rowData: rowData
			}
		}
	};
	_pC.add = function(objP) {
		var that = this.that,
			evt = objP.evt,
			cells = objP.cells,
			ret = false,
			cells2 = [];
		if (cells && typeof cells.push == "function") {
			for (var i = 0, len = cells.length; i < len; i++) {
				var cell = cells[i];
				cell.trigger = false;
				ret = this._add(cell);
				if (ret) {
					cells2.push(ret)
				}
			}
			if (cells2.length) {
				ret = true;
				that._trigger("cellSelect", evt, {
					cells: cells2
				})
			}
		} else {
			ret = this._add(objP)
		} if (ret) {
			that._fixIE();
			this.triggerSelectChange({
				evt: evt
			})
		}
	};
	_pR.add = function(objP) {
		var that = this.that,
			evt = objP.evt,
			rows = objP.rows,
			ret = false,
			rows2 = [];
		if (rows && typeof rows.push == "function") {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				ret = this._add(row);
				if (ret) {
					rows2.push(ret)
				}
			}
			if (rows2.length) {
				ret = true;
				that._trigger("rowSelect", evt, {
					rows: rows2
				})
			}
		} else {
			ret = this._add(objP)
		} if (ret) {
			that._fixIE();
			this.triggerSelectChange({
				evt: evt
			})
		}
	};
	_pC._remove = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			rowData = objP.rowData || that.getRowData(objP),
			colIndx = objP.colIndx,
			dataIndx = objP.dataIndx,
			colIndx = (colIndx == null) ? that.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			column = objP.column,
			column = (column == null) ? that.colModel[colIndx] : column,
			dataIndx = (dataIndx == null) ? column.dataIndx : dataIndx,
			evt = objP.evt,
			isSelected = this.isSelected({
				rowData: rowData,
				dataIndx: dataIndx
			});
		if (isSelected) {
			if (this.inViewCell(rowIndxPage, colIndx)) {
				var $td = that.getCell({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					all: true
				});
				if ($td) {
					$td.removeClass("pq-cell-select ui-state-highlight");
					$td.removeAttr("tabindex")
				}
			}
			this._removeFromData({
				rowData: rowData,
				dataIndx: dataIndx
			});
			if (objP.trigger !== false) {
				that._trigger("cellUnSelect", evt, {
					rowIndx: rowIndx,
					colIndx: colIndx,
					dataIndx: dataIndx,
					rowData: rowData
				})
			}
			return {
				rowIndx: rowIndx,
				rowData: rowData,
				dataIndx: dataIndx,
				colIndx: colIndx,
				column: column
			}
		}
	};
	_pR._remove = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			rowData = objP.rowData,
			rowData = (rowData == null) ? that.getRowData(objP) : rowData,
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
					$tr.removeClass("pq-row-select ui-state-highlight");
					$tr.removeAttr("tabindex")
				}
			}
			rowData.pq_rowselect = false;
			if (objP.trigger !== false) {
				that._trigger("rowUnSelect", evt, {
					rowIndx: rowIndx,
					rowData: rowData,
					$tr: $tr
				})
			}
			return {
				rowIndx: rowIndx,
				rowData: rowData
			}
		}
	};
	_pC.remove = function(objP) {
		var cells = objP.cells,
			evt = objP.evt,
			ret = false;
		if (cells && typeof cells.push == "function") {
			var cells2 = [];
			for (var i = 0, len = cells.length; i < len; i++) {
				var cell = cells[i];
				cell.trigger = false;
				ret = this._remove(cell);
				if (ret) {
					cells2.push(ret)
				}
			}
			if (cells2.length) {
				ret = true;
				this.that._trigger("cellUnSelect", evt, {
					cells: cells2
				})
			}
		} else {
			ret = this._remove(objP)
		} if (ret) {
			this.triggerSelectChange({
				evt: evt
			})
		}
	};
	_pR.remove = function(objP) {
		var rows = objP.rows,
			evt = objP.evt,
			ret = false;
		if (rows && typeof rows.push == "function") {
			var rows2 = [];
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				ret = this._remove(row);
				if (ret) {
					rows2.push(ret)
				}
			}
			if (rows2.length) {
				ret = true;
				this.that._trigger("rowUnSelect", evt, {
					rows: rows2
				})
			}
		} else {
			ret = this._remove(objP)
		} if (ret) {
			this.triggerSelectChange({
				evt: evt
			})
		}
	};
	_pC.indexOf = function(obj) {
		this.refresh();
		var rowIndx = obj.rowIndx,
			that = this.that,
			dataIndx = (obj.dataIndx == null) ? that.colModel[obj.colIndx].dataIndx : obj.dataIndx;
		obj.dataIndx = dataIndx;
		var selectedCells = this.selection;
		for (var i = 0; i < selectedCells.length; i++) {
			var sCell = selectedCells[i];
			if (sCell.rowIndx == rowIndx && sCell.dataIndx == dataIndx) {
				return i
			}
		}
		return -1
	};
	_pC.selectAll = function(objP) {
		var that = this.that,
			all = (objP && objP.all) ? true : false,
			data = all ? this.options.dataModel.data : that.pdata,
			offset = that.rowIndxOffset,
			CM = that.colModel,
			CMLength = CM.length,
			cells = [],
			addCell = function(rowData, rowIndx) {
				for (var j = 0; j < CMLength; j++) {
					var column = CM[j];
					if (column.hidden) {
						continue
					}
					var cell = {
						rowIndx: rowIndx,
						rowData: rowData,
						colIndx: j,
						dataIndx: column.dataIndx,
						focus: false
					};
					cells.push(cell)
				}
			};
		if (!data) {
			return
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i]
		}
		if (all) {
			var paging = this.options.pageModel.type,
				remote = (paging == "remote") ? true : false;
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i],
					rowIndx = i;
				if (remote) {
					rowIndx = i + offset
				}
				addCell(rowData, rowIndx)
			}
		} else {
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i],
					rowIndxPage = i,
					rowIndx = rowIndxPage + offset;
				addCell(rowData, rowIndx)
			}
		}
		var self = this;
		self.add({
			cells: cells
		})
	};
	_pR.selectAll = function(objP) {
		var that = this.that,
			all = (objP && objP.all) ? true : false,
			data = all ? this.options.dataModel.data : that.pdata,
			rows = [];
		if (!data) {
			return
		}
		if (all) {
			var paging = this.options.pageModel.type,
				remote = (paging == "remote") ? true : false;
			for (var i = 0, len = data.length; i < len; i++) {
				var obj = {
					rowData: data[i],
					focus: false
				};
				if (remote) {
					obj.rowIndxPage = i
				} else {
					obj.rowIndx = i
				}
				rows.push(obj)
			}
		} else {
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				rows.push({
					rowIndxPage: i,
					rowData: rowData,
					focus: false
				})
			}
		}
		this.add({
			rows: rows
		})
	};
	_pC.selectRange = function(objP) {
		var that = this.that,
			initRowIndx = objP.initRowIndx,
			initColIndx = objP.initColIndx,
			finalRowIndx = objP.finalRowIndx,
			finalColIndx = objP.finalColIndx,
			CM = that.colModel,
			CMLength = CM.length,
			cellSelection = this.getSelection(),
			cellSelection2 = cellSelection.slice(0),
			arrSel = [];
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = that.getColIndx({
					dataIndx: dataIndx
				});
			if (row < initRowIndx || row > finalRowIndx) {
				arrSel.push({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				})
			} else {
				if (row == initRowIndx && col < initColIndx) {
					arrSel.push({
						rowIndx: row,
						colIndx: col,
						dataIndx: dataIndx
					})
				} else {
					if (row == finalRowIndx && col > finalColIndx) {
						arrSel.push({
							rowIndx: row,
							colIndx: col,
							dataIndx: dataIndx
						})
					}
				}
			}
		}
		this.remove({
			cells: arrSel
		});
		arrSel = [];
		for (var col = 0; col < CMLength; col++) {
			var column = CM[col];
			if (column.hidden) {
				continue
			}
			var dataIndx = column.dataIndx;
			var row = initRowIndx;
			do {
				if (row == initRowIndx && col < initColIndx) {} else {
					if (row == finalRowIndx && col > finalColIndx) {
						break
					} else {
						arrSel.push({
							rowIndx: row,
							colIndx: col,
							dataIndx: dataIndx,
							focus: false
						})
					}
				}
				row++
			} while (row <= finalRowIndx)
		}
		this.add({
			cells: arrSel
		})
	};
	_pC.selectBlock = function(objP) {
		var that = this.that,
			initRowIndx = objP.initRowIndx,
			initColIndx = objP.initColIndx,
			finalRowIndx = objP.finalRowIndx,
			finalColIndx = objP.finalColIndx,
			evt = objP.evt,
			cellSelection = this.getSelection(),
			cellSelection2 = cellSelection.slice(0),
			CM = that.colModel,
			arrSel = [];
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = that.getColIndx({
					dataIndx: dataIndx
				});
			if (col < initColIndx || col > finalColIndx) {
				arrSel.push({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				})
			} else {
				if (row < initRowIndx || row > finalRowIndx) {
					arrSel.push({
						rowIndx: row,
						colIndx: col,
						dataIndx: dataIndx
					})
				}
			}
		}
		this.remove({
			cells: arrSel
		});
		arrSel = [];
		for (var col = initColIndx; col <= finalColIndx; col++) {
			var column = CM[col];
			var dataIndx = column.dataIndx;
			if (column.hidden) {
				continue
			}
			var row = initRowIndx;
			do {
				arrSel.push({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx,
					focus: false
				});
				row++
			} while (row <= finalRowIndx)
		}
		this.add({
			cells: arrSel,
			evt: evt
		})
	}
})(jQuery);
(function($) {
	var cCheckBoxColumn = $.paramquery.cCheckBoxColumn = function(that, column) {
		var self = this;
		this.that = that;
		this.options = that.options;
		this.column = column;
		this.cb = column.cb = column.cb || {
			all: false,
			header: true
		};
		this.dataIndx = column.dataIndx;
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase(),
			element = that.element,
			eventNamespace = that.eventNamespace;
		element.on(widgetEventPrefix + "dataavailable" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onDataAvailable(evt, ui)
			}
		});
		element.on(widgetEventPrefix + "cellclick" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.cellClick(evt, ui)
			}
		});
		if (this.cb.reverse) {
			element.on(widgetEventPrefix + "rowselect" + eventNamespace, function(evt, ui) {
				if (self.belongs(evt)) {
					return self.rowSelect(evt, ui)
				}
			});
			element.on(widgetEventPrefix + "rowunselect" + eventNamespace, function(evt, ui) {
				if (self.belongs(evt)) {
					return self.rowUnSelect(evt, ui)
				}
			})
		}
		element.on(widgetEventPrefix + "cellkeydown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.cellKeyDown(evt, ui)
			}
		});
		element.on(widgetEventPrefix + "refresh" + eventNamespace + " " + widgetEventPrefix + "refreshrow" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self.refreshHeader(evt, ui)
			}
		})
	};
	var _pCheckBC = cCheckBoxColumn.prototype = new $.paramquery.cClass;
	_pCheckBC.hasHeaderChkBox = function() {
		return this.cb.header
	};
	_pCheckBC.setValCBox = function() {
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			options = this.options,
			dataIndx = this.dataIndx,
			cbAll = this.cb.all,
			data = cbAll ? options.dataModel.data : that.pdata,
			val = null,
			selFound = 0,
			unSelFound = 0;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData[dataIndx]) {
				selFound++
			} else {
				unSelFound++
			}
		}
		if (selFound == len) {
			val = true
		} else {
			if (unSelFound == len) {
				val = false
			}
		}
		this.$inp.pqval({
			val: val
		})
	};
	_pCheckBC.onHeaderClick = function(evt) {
		var that = this.that,
			self = this,
			$inp = $(evt.currentTarget).find("input"),
			column = this.column,
			dataIndx = column.dataIndx,
			colIndx = that.getColIndx({
				dataIndx: dataIndx
			}),
			cbAll = this.cb.all,
			data = cbAll ? that.options.dataModel.data : that.pdata,
			ui = {
				column: column,
				dataIndx: dataIndx,
				source: "header"
			}, inpT = $(evt.target).is("input") ? true : false,
			inpChk = $inp.is(":checked"),
			finalChk = inpChk;
		if (!inpT) {
			finalChk = !inpChk
		}
		if (finalChk) {
			if (that._trigger("beforeCheck", evt, ui) === false) {
				return false
			}
			if (!inpT) {
				$inp.pqval({
					val: true
				})
			}
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				rowData[dataIndx] = true
			}
			that.$cont.find("td[pq-col-indx=" + colIndx + "] input").prop("checked", true);
			if (that._trigger("check", evt, ui) !== false) {
				self.selectAllRows()
			}
		} else {
			if (that._trigger("beforeunCheck", evt, ui) === false) {
				return false
			}
			if (!inpT) {
				$inp.pqval({
					val: false
				})
			}
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				rowData[dataIndx] = false
			}
			that.$cont.find("td[pq-col-indx=" + colIndx + "] input").prop("checked", false);
			if (that._trigger("unCheck", evt, ui) !== false) {
				self.unSelectAllRows()
			}
		}
	};
	_pCheckBC.refreshHeader = function(evt, ui) {
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			data = that.pdata;
		if (!data) {
			return
		}
		var self = this,
			$td = that.getCellHeader({
				dataIndx: this.dataIndx
			});
		if (!$td) {
			return
		}
		$td.html("<input type='checkbox'/>");
		var $inp = this.$inp = $td.find("input");
		$td.click(function(evt) {
			return self.onHeaderClick(evt)
		});
		this.setValCBox()
	};
	_pCheckBC.selectAllRows = function() {
		var that = this.that,
			all = this.cb.all;
		that.iRows.selectAll({
			all: all
		})
	};
	_pCheckBC.unSelectAllRows = function() {
		var that = this.that,
			all = this.cb.all;
		that.iRows.removeAll({
			all: all
		})
	};
	_pCheckBC._onDataAvailable = function() {
		var that = this.that,
			o = this.options,
			data = o.dataModel.data,
			remote = o.pageModel.type == "remote" ? true : false,
			ro = remote ? that.rowIndxOffset : 0,
			column = this.column,
			dataIndx = column.dataIndx;
		if (dataIndx != null && data) {
			var rows = [];
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				if (rowData[dataIndx]) {
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
			}) !== false) {
				for (var i = 0; i < len; i++) {
					var rowData = data[i];
					if (rowData[dataIndx]) {
						rowData.pq_rowselect = true
					}
				}
			}
		}
	};
	_pCheckBC.cellClick = function(evt, ui) {
		if (ui.dataIndx === this.dataIndx) {
			return this.raiseEvent(evt, ui)
		}
	};
	_pCheckBC.rowSelect = function(evt, ui) {
		var that = this.that,
			rows = ui.rows,
			rowData = ui.rowData,
			dataIndx = this._findSelectionIndx();
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
			dataIndx = this._findSelectionIndx();
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
	_pCheckBC.raiseEvent = function(evt, ui) {
		var that = this.that,
			rowData = ui.rowData,
			inpT = $(evt.originalEvent.target).is("input") ? true : false,
			rowIndx = ui.rowIndx,
			dataIndx = ui.dataIndx;
		if (!rowData[dataIndx]) {
			if (that._trigger("beforeCheck", evt, ui) === false) {
				return false
			}
			rowData[dataIndx] = true;
			if (!inpT) {
				var $inp = that.getCell(ui).find("input");
				$inp.pqval({
					val: true
				})
			}
			if (that._trigger("check", evt, ui) !== false) {
				that.iRows.add({
					rowIndx: rowIndx
				})
			}
		} else {
			if (that._trigger("beforeunCheck", evt, ui) === false) {
				return false
			}
			rowData[dataIndx] = false;
			if (!inpT) {
				var $inp = that.getCell(ui).find("input");
				$inp.pqval({
					val: false
				})
			}
			if (that._trigger("unCheck", evt, ui) !== false) {
				that.iRows.remove({
					rowIndx: rowIndx
				})
			}
		}
		this.setValCBox();
		if (!inpT) {
			return false
		}
	};
	_pCheckBC.cellKeyDown = function(evt, ui) {
		if (ui.dataIndx = this.dataIndx) {
			if (evt.keyCode == 13 || evt.keyCode == 32) {
				return this.raiseEvent(evt, ui)
			}
		}
	}
})(jQuery);
(function($) {
	function cMouseSelection(that) {
		this.that = that;
		var self = this,
			element = that.element,
			prefix = that.widgetEventPrefix.toLowerCase(),
			eventNamespace = that.eventNamespace;
		element.on(prefix + "contmousedown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onContMouseDown(evt, ui)
			}
		});
		element.on(prefix + "mousedrag" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt) && self.swipedown) {
				return self._onMouseDrag(evt, ui)
			}
		});
		element.on(prefix + "mousestop" + eventNamespace, function(evt, ui) {
			return self._onMouseStop(evt, ui)
		});
		element.on(prefix + "mousepqup." + eventNamespace, function(evt, ui) {
			return self._onMousePQUp(evt, ui)
		});
		element.on(prefix + "rowmousedown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onRowMouseDown(evt, ui)
			}
		});
		element.on(prefix + "cellmousedown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onCellMouseDown(evt, ui)
			}
		});
		element.on(prefix + "beforetableview" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._beforeTableView(evt, ui)
			}
		});
		element.on(prefix + "refresh" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onRefresh(evt, ui)
			}
		});
		element.on(prefix + "cellmouseenter" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onCellMouseEnter(evt, ui)
			}
		});
		element.on(prefix + "rowmouseenter" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onRowMouseEnter(evt, ui)
			}
		})
	}
	$.paramquery.cMouseSelection = cMouseSelection;
	var _pMouseSelection = cMouseSelection.prototype = new $.paramquery.cClass;
	_pMouseSelection._beforeTableView = function(evt, ui) {
		var that = this.that,
			objFE = that.getFocusElement();
		this.lastFocus = null;
		if (objFE && objFE.$grid) {
			var $ae = objFE.$ae;
			if ($ae.hasClass("pq-grid-row")) {
				var obj = that.getRowIndx({
					$tr: $ae
				});
				this.lastFocus = obj
			} else {
				if ($ae.hasClass("pq-grid-cell")) {
					var obj = that.getCellIndices({
						$td: $ae
					});
					this.lastFocus = obj
				}
			}
		}
	};
	_pMouseSelection._onRefresh = function(evt, ui) {
		var that = this.that,
			objLF = this.lastFocus,
			$tdr;
		if (objLF) {
			if (objLF.dataIndx != null) {
				$tdr = that.getCell(objLF)
			} else {
				$tdr = that.getRow(objLF)
			} if ($tdr && $tdr.length) {
				if (that.inViewPort($tdr)) {
					$tdr.attr("tabindex", "0").focus()
				}
				return
			}
		}
		return
	};
	_pMouseSelection._onCellMouseDown = function(evt, ui) {
		var that = this.that,
			rowIndx = ui.rowIndx,
			colIndx = ui.colIndx,
			SM = that.options.selectionModel,
			type = SM.type,
			mode = SM.mode;
		if (type != "cell") {
			return
		}
		if (colIndx == null) {
			return
		}
		if (evt.shiftKey) {
			that.iCells.extendSelection({
				rowIndx: rowIndx,
				colIndx: colIndx,
				mode: mode,
				evt: evt
			});
			evt.preventDefault()
		} else {
			if ((evt.ctrlKey || evt.metaKey) && mode != "single") {
				if (that.iCells.isSelected({
					rowIndx: rowIndx,
					colIndx: colIndx
				})) {
					that.iCells.remove({
						rowIndx: rowIndx,
						colIndx: colIndx
					})
				} else {
					that.setSelection({
						rowIndx: rowIndx,
						colIndx: colIndx
					})
				}
			} else {
				this.mousedown = {
					rowIndx: rowIndx,
					colIndx: colIndx
				};
				that.setSelection(null);
				that.setSelection({
					rowIndx: rowIndx,
					colIndx: colIndx,
					setFirst: true
				})
			}
		}
		return true
	};
	_pMouseSelection._onCellMouseEnter = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type,
			pq = $.paramquery,
			mode = SM.mode;
		if (type == "cell" && this.mousedown) {
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
			that.iCells.extendSelection({
				rowIndx: r2,
				colIndx: c2,
				evt: evt
			})
		}
	};
	_pMouseSelection._onRowMouseEnter = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type;
		if (type == "row" && this.mousedown) {
			var m = this.mousedown;
			var r1 = this.mousedown.r1,
				r2 = ui.rowIndx;
			if (r1 == r2) {
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
			that.iRows.extendSelection({
				rowIndx: r2,
				evt: evt
			})
		}
	};
	_pMouseSelection._onRowMouseDown = function(evt, ui) {
		var that = this.that,
			self = this,
			rowIndx = ui.rowIndx,
			SM = that.options.selectionModel,
			mode = SM.mode,
			type = SM.type;
		if (type != "row") {
			return
		}
		if (rowIndx == null) {
			return
		}
		if (evt.shiftKey) {
			that.iRows.extendSelection({
				rowIndx: rowIndx,
				evt: evt
			});
			evt.preventDefault()
		} else {
			if ((evt.ctrlKey || evt.metaKey) && mode != "single") {
				if (that.iRows.isSelected({
					rowIndx: rowIndx
				})) {
					that.iRows.remove({
						rowIndx: rowIndx
					})
				} else {
					that.setSelection({
						rowIndx: rowIndx
					})
				}
			} else {
				this.mousedown = {
					r1: rowIndx,
					y1: evt.pageY,
					x1: evt.pageX
				};
				that.setSelection(null);
				that.setSelection({
					rowIndx: rowIndx,
					setFirst: true
				})
			}
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
		self.intID = null
	};
	_pMouseSelection._onMouseStop = function(evt, ui) {
		var self = this,
			that = this.that;
		if (this.swipedownPrev) {
			var SW = that.options.swipeModel,
				sdP = this.swipedownPrev,
				ts1 = sdP.ts,
				ts2 = (new Date()).getTime(),
				tsdiff = ts2 - ts1,
				x1 = sdP.x,
				y1 = sdP.y,
				x2 = evt.pageX,
				y2 = evt.pageY,
				xdiff = x2 - x1,
				ydiff = y2 - y1,
				distance = Math.sqrt(xdiff * xdiff + ydiff * ydiff),
				ratio = (distance / tsdiff);
			if (ratio > SW.ratio) {
				var count = 0,
					count2 = SW.repeat;
				self._stopSwipe();
				self.intID = window.setInterval(function() {
					count += SW.speed;
					count2--;
					if (count2 <= 0) {
						self._stopSwipe(true)
					}
					var pageX = x2 + (count * xdiff / tsdiff),
						pageY = y2 + (count * ydiff / tsdiff);
					self._onMouseDrag({
						pageX: pageX,
						pageY: pageY
					})
				}, 50)
			} else {
				self.swipedown = null;
				self.swipedownPrev = null
			}
		}
	};
	_pMouseSelection._onMouseDrag = function(evt, ui) {
		var that = this.that,
			pq = $.paramquery,
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
				ts: (new Date()).getTime()
			};
			if (that.$td_edit) {
				that.quitEditMode({
					silent: true
				})
			}
			if (!o.virtualY) {
				this._scrollVertSmooth(y1, y2);
				that._syncScrollBarVert()
			}
			if (!o.virtualX) {
				this._scrollHorSmooth(x1, x2);
				that._syncScrollBarHor()
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
			$tbl = that.getTableForVertScroll(),
			$cont = that.$cont,
			sbHt = that._getScollBarHorizontalHeight(),
			contHeight = $cont.data("offsetHeight") - sbHt;
		if (!$tbl || !$tbl.length) {
			return false
		}
		var tblHeight = $tbl.data("offsetHeight"),
			marginTop = parseInt($tbl.css("marginTop")) + diffY;
		if (marginTop >= 0) {
			$tbl.css({
				marginTop: -1
			})
		} else {
			if ((diffY < 0) && contHeight - tblHeight - marginTop > 0) {
				if (contHeight - $tbl[0].offsetHeight - marginTop > 0) {
					var new_marginTop = contHeight - $tbl[0].offsetHeight;
					if (new_marginTop < 0) {
						$tbl.css({
							marginTop: new_marginTop
						})
					}
				} else {
					$tbl.css({
						marginTop: marginTop
					})
				}
			} else {
				$tbl.css({
					marginTop: marginTop
				})
			}
		}
		return true
	};
	_pMouseSelection._scrollVertSmooth = function(y1, y2) {
		if (y1 == y2) {
			return
		}
		this.updateTableY(y2 - y1)
	};
	_pMouseSelection._scrollHorSmooth = function(x1, x2) {
		if (x1 == x2) {
			return
		}
		var that = this.that,
			diffX = x2 - x1,
			$tbl = that.getTableForHorScroll(),
			$tbl_h = that.getTableHeaderForHorScroll(),
			$cont = that.$cont,
			sbWd = that._getSBWidth(),
			contWd = $cont.data("offsetWidth") - sbWd;
		if (!$tbl && !$tbl_h) {
			return
		}
		var $tbl_r = $tbl ? $tbl : $tbl_h,
			tblWd = $tbl_r.data("scrollWidth"),
			marginLeft = parseInt($tbl_r.css("marginLeft")) + diffX;
		if (marginLeft > 0) {
			if ($tbl) {
				$tbl.css({
					marginLeft: 0
				})
			}
			if ($tbl_h) {
				$tbl_h.css({
					marginLeft: 0
				})
			}
		} else {
			if (contWd - tblWd - marginLeft > 0) {
				if (contWd - tblWd <= 0) {
					if ($tbl) {
						$tbl.css("marginLeft", contWd - tblWd)
					}
					if ($tbl_h) {
						$tbl_h.css("marginLeft", contWd - tblWd)
					}
				}
			} else {
				if ($tbl) {
					$tbl.css("marginLeft", marginLeft)
				}
				if ($tbl_h) {
					$tbl_h.css("marginLeft", marginLeft)
				}
			}
		}
	}
})(jQuery);
(function($) {
	var iExcel = null,
		pasteProgress = false,
		copyProgress = false,
		gMemory = "",
		_pgrid = $.paramquery.pqGrid.prototype,
		pq_options = _pgrid.options,
		copyModel = {
			on: true,
			header: true,
			zIndex: 10000
		}, pasteModel = {
			on: true,
			compare: "byVal",
			select: true,
			validate: true,
			allowInvalid: true,
			type: "replace"
		};
	_pgrid.copy = function() {
		iExcel = new cExcel(this);
		iExcel.copy();
		iExcel = null
	};
	_pgrid.paste = function() {
		iExcel = new cExcel(this);
		iExcel.paste();
		iExcel = null
	};
	pq_options.pasteModel = pq_options.pasteModel || pasteModel;
	pq_options.copyModel = pq_options.copyModel || copyModel;
	var cExcel = function(that, $ae) {
		var obj;
		this.that = that;
		if ($ae && $ae.hasClass("pq-grid-row")) {
			this.rowIndx = that.getRowIndx({
				$tr: $ae
			}).rowIndx;
			this.dataIndx = null
		} else {
			if ($ae && $ae.hasClass("pq-grid-cell")) {
				obj = that.getCellIndices({
					$td: $ae
				});
				this.rowIndx = obj.rowIndx;
				this.dataIndx = obj.dataIndx
			} else {
				this.rowIndx = null;
				this.dataIndx = null
			}
		}
	};
	var _pExcel = cExcel.prototype;
	_pExcel.createClipBoard = function() {
		var $div = $("#pq-grid-excel-div"),
			CPM = this.that.options.copyModel,
			$text = $("#pq-grid-excel");
		if ($text.length == 0) {
			$div = $("<div id='pq-grid-excel-div'  style='position:fixed;top:20px;left:20px;height:1px;width:1px;overflow:hidden;z-index:" + CPM.zIndex + ";'/>").appendTo(document.body);
			$text = $("<textarea id='pq-grid-excel' autocomplete='off'  style='overflow:hidden;height:10000px;width:10000px;opacity:0' />").appendTo($div);
			$text.css({
				opacity: 0
			})
		}
		$text.select()
	};
	_pExcel.destroyClipBoard = function() {
		var that = this.that,
			$tdr;
		var obj = that.iCells.getFocusSelection({
			old: true
		});
		if (obj) {
			$tdr = that.getCell({
				rowIndx: obj.rowIndx,
				dataIndx: obj.dataIndx
			})
		} else {
			obj = that.iRows.getFocusSelection({
				old: true
			});
			if (obj) {
				$tdr = that.getRow({
					rowIndx: obj.rowIndx
				})
			}
		}
		var pageTop = $(window).scrollTop(),
			pageLeft = $(window).scrollLeft();
		if ($tdr) {
			$tdr.attr("tabindex", 0).focus()
		} else {
			that.$cont.focus()
		}
		var pageTop2 = $(window).scrollTop(),
			pageLeft2 = $(window).scrollLeft();
		if (pageTop != pageTop2 || pageLeft != pageLeft2) {
			window.scrollTo(pageLeft, pageTop)
		}
	};
	_pExcel.clearClipBoard = function() {
		var $text = $("#pq-grid-excel");
		$text.val("")
	};
	_pExcel.copy = function() {
		var $text = $("#pq-grid-excel"),
			that = this.that,
			o = that.options,
			CPM = o.copyModel,
			CM = that.colModel,
			CMLength = CM.length,
			selArr = [],
			buffer = [];
		if (!CPM.on) {
			return
		}
		selArr = that.iRows.getSelection();
		for (var i = 0, len = selArr.length; i < len; i++) {
			var sel = selArr[i],
				rowData = sel.rowData,
				rowBuffer = [];
			for (var j = 0; j < CMLength; j++) {
				var column = CM[j];
				if (column.copy === false) {
					continue
				}
				rowBuffer.push(rowData[column.dataIndx])
			}
			var str = rowBuffer.join("\t");
			buffer.push(str)
		}
		selArr = that.iCells.getSelection();
		var rowData = null,
			rowIndx = null,
			prevRowIndx = null,
			rowBuffer = [];
		for (var i = 0, len = selArr.length; i < len; i++) {
			var sel = selArr[i],
				rowIndx = sel.rowIndx,
				rowData = sel.rowData,
				column = sel.column,
				dataIndx = sel.dataIndx;
			if (column.copy === false) {
				continue
			}
			if (prevRowIndx != null && rowIndx != prevRowIndx) {
				var str = rowBuffer.join("\t");
				rowBuffer = [];
				buffer.push(str);
				prevRowIndx = rowIndx
			} else {
				if (prevRowIndx == null) {
					prevRowIndx = rowIndx
				}
			}
			rowBuffer.push(rowData[dataIndx])
		}
		buffer.push(rowBuffer.join("\t"));
		var str = buffer.join("\n");
		if ($text.length) {
			$text.val(str);
			$text.select()
		}
		gMemory = str
	};
	_pExcel.paste = function() {
		var that = this.that,
			$text = $("#pq-grid-excel"),
			text = $text.length ? $text.val() : gMemory,
			text = text.replace(/\n$/, ""),
			rows = text.split("\n"),
			rows_length = rows.length,
			cells_length, CM = that.colModel,
			o = that.options,
			PSTM = o.pasteModel,
			SMType = "row",
			CMLength = CM.length;
		if (!PSTM.on) {
			return
		}
		if (text.length == 0 || rows_length == 0) {
			return
		}
		var ui = {
			rows: rows
		};
		if (that._trigger("beforePaste", null, ui) === false) {
			return false
		}
		var PMtype = PSTM.type,
			selRowIndx, selColIndx, selEndRowIndx, selEndColIndx;
		var selArr = that.iRows.getSelectionCurPage();
		if (!selArr || !selArr.length) {
			SMType = "cell";
			selArr = that.iCells.getSelectionCurPage()
		}
		if (selArr && selArr.length) {
			selRowIndx = selArr[0].rowIndx;
			selEndRowIndx = selArr[selArr.length - 1].rowIndx;
			if (SMType == "cell") {
				selColIndx = that.getColIndx({
					dataIndx: selArr[0].dataIndx
				});
				selEndColIndx = that.getColIndx({
					dataIndx: selArr[selArr.length - 1].dataIndx
				})
			}
		} else {
			selRowIndx = 0;
			selEndRowIndx = 0;
			selColIndx = 0;
			selEndColIndx = 0
		}
		var selRowIndx2, selEndRowIndx2, modeV, updateAddOp;
		if (PMtype == "replace") {
			selRowIndx2 = selRowIndx;
			updateAddOp = "updateElseAdd";
			modeV = ((selEndRowIndx - selRowIndx + 1) < rows_length) ? "extend" : "repeat"
		} else {
			if (PMtype == "append") {
				selRowIndx2 = selEndRowIndx + 1;
				modeV = "extend";
				updateAddOp = "addRow"
			} else {
				if (PMtype == "prepend") {
					selRowIndx2 = selRowIndx;
					modeV = "extend";
					updateAddOp = "addRow"
				}
			}
		}
		var modeH, lenV = (modeV == "extend") ? rows_length : (selEndRowIndx - selRowIndx + 1),
			lenH, lenHCopy;
		var ii = 0,
			rowList = [],
			rowsAffected = 0;
		for (var i = 0; i < lenV; i++) {
			var row = rows[ii],
				rowIndx = i + selRowIndx2,
				rowData = (PMtype == "replace") ? that.getRowData({
					rowIndx: rowIndx
				}) : null,
				oldRow = rowData ? {} : null,
				newRow = {};
			if (row === undefined && modeV === "repeat") {
				ii = 0;
				row = rows[ii]
			}
			ii++;
			var cells = row.split("\t");
			if (!lenH) {
				if (SMType == "cell") {
					cells_length = cells.length;
					modeH = ((selEndColIndx - selColIndx + 1) < cells.length) ? "extend" : "repeat";
					lenH = (modeH == "extend") ? cells_length : (selEndColIndx - selColIndx + 1);
					if (isNaN(lenH)) {
						throw ("lenH NaN. assert failed.")
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
				hidden = 0,
				lenHCopy = lenH;
			for (var j = 0; j < lenHCopy; j++) {
				var colIndx = j + selColIndx,
					column = CM[colIndx],
					cell = cells[jj],
					dataIndx = column.dataIndx;
				if (column.hidden) {
					if (modeH == "extend") {
						if (lenHCopy + selColIndx < CMLength) {
							lenHCopy++
						}
					}
					continue
				} else {
					if (cell === undefined && modeH === "repeat") {
						jj = 0;
						cell = cells[jj]
					}
					jj++;
					newRow[dataIndx] = cell;
					if (oldRow) {
						oldRow[dataIndx] = rowData[dataIndx]
					}
				}
			}
			if ($.isEmptyObject(newRow) == false) {
				var type = "update";
				if (rowData == null) {
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
		var ui = {
			rowList: rowList,
			source: "paste",
			allowInvalid: PSTM.allowInvalid,
			validate: PSTM.validate
		};
		that._digestData(ui);
		if (PSTM.select) {
			if (SMType == "cell") {
				that.iCells.selectBlock({
					initRowIndx: selRowIndx2,
					finalRowIndx: selRowIndx2 + rowsAffected - 1,
					initColIndx: selColIndx,
					finalColIndx: (modeH == "extend") ? selColIndx + lenH - 1 + hidden : selEndColIndx
				})
			} else {
				that.iRows.selectRange({
					initRowIndx: selRowIndx2,
					finalRowIndx: selRowIndx2 + rowsAffected - 1
				})
			}
		}
		that.refreshView();
		var ui = {
			rows: rows
		};
		that._trigger("paste", null, ui)
	};
	$(document).unbind(".pqExcel").bind("keydown.pqExcel", function(evt) {
		if (evt.ctrlKey || evt.metaKey) {
			var $ae = $(evt.target);
			if (!$ae.hasClass("pq-grid-row") && !$ae.hasClass("pq-grid-cell") && !$ae.is("#pq-grid-excel") && !$ae.is("div.pq-cont")) {
				return
			}
			var $grid = $ae.closest(".pq-grid");
			if (iExcel || ($ae.length && $grid.length)) {
				if (!iExcel) {
					try {
						var that = $grid.pqGrid("getInstance").grid
					} catch (ex) {
						return true
					}
					iExcel = new cExcel(that, $ae);
					iExcel.createClipBoard()
				}
				if (evt.keyCode == "67" || evt.keyCode == "99") {
					copyProgress = true;
					iExcel.copy()
				} else {
					if (evt.keyCode == "86" || evt.keyCode == "118") {
						pasteProgress = true;
						iExcel.clearClipBoard();
						window.setTimeout(function() {
							if (iExcel) {
								iExcel.paste();
								iExcel.destroyClipBoard();
								iExcel = null
							}
							pasteProgress = false
						}, 0)
					} else {
						var $text = $("#pq-grid-excel");
						if ($text.length) {
							var ae = document.activeElement;
							if (ae == $text[0]) {
								iExcel.that._onKeyPressDown(evt)
							}
						}
					}
				}
			} else {}
		}
	}).bind("keyup.pqExcel", function(evt) {
		var keyCode = evt.keyCode;
		if (!pasteProgress && iExcel && !(evt.ctrlKey || evt.metaKey) && ($.inArray(keyCode, [17, 91, 93, 224]) != -1)) {
			iExcel.destroyClipBoard();
			iExcel = null
		}
		copyProgress = false
	})
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
		var eventNamespace = that.eventNamespace,
			widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "keydown" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onKeyDown(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "dataavailable" + eventNamespace, function(evt, ui) {
			if (self.belongs(evt) && ui.source != "filter") {
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
		}, ctrlMeta = (evt.ctrlKey || evt.metaKey);
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
			records.splice(counter, (records.length - counter))
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
	_pHistory.undo = function() {
		var prevCanRedo = this.canRedo();
		var that = this.that,
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
					rowListFinal.push({
						type: "delete",
						rowData: newRow
					})
				} else {
					if (type == "delete") {
						rowListFinal.push({
							type: "add",
							rowIndx: rowIndx,
							newRow: rowData
						})
					}
				}
			}
		}
		var ret = that._digestData({
			history: false,
			source: "undo",
			checkEditable: HM.checkEditable,
			checkEditableAdd: HM.checkEditableAdd,
			allowInvalid: HM.allowInvalid,
			rowList: rowListFinal
		});
		that.refreshView();
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
		var record = records[counter],
			rowList = record.rowList,
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
					rowListFinal.push({
						type: "add",
						rowIndx: rowIndx,
						newRow: newRow
					})
				} else {
					if (type == "delete") {
						rowListFinal.push({
							type: "delete",
							rowData: rowData
						})
					}
				}
			}
		}
		var ret = that._digestData({
			history: false,
			source: "redo",
			checkEditable: HM.checkEditable,
			checkEditableAdd: HM.checkEditableAdd,
			allowInvalid: HM.allowInvalid,
			rowList: rowListFinal
		});
		that.refreshView();
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
	var _p = $.ui.autocomplete.prototype;
	var _renderMenu = _p._renderMenu;
	var _renderItem = _p._renderItem;
	_p._renderMenu = function(ul, items) {
		_renderMenu.call(this, ul, items);
		var o = this.options,
			SI = o.selectItem;
		if (SI && SI.on) {
			var cls = SI.cls,
				cls = (cls === undefined) ? "ui-state-highlight" : cls;
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
						style = (style === undefined) ? "font-weight:bold;" : style,
						cls = HI.cls,
						cls = (cls === undefined) ? "" : cls;
					text = text.replace(re, "<span style='" + style + "' class='" + cls + "'>$1</span>");
					li.find("a").html(text)
				}
			}
		}
		return li
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
					var strIcon = (icon == "") ? "" : ("<span class='ui-icon " + icon + " pq-tooltip-icon'></span>");
					return strIcon + title
				} else {
					return $td.attr("title")
				}
			}
		}
	};
	fn._create = function() {
		this._superApply();
		var $ele = this.element,
			eventNamespace = this.eventNamespace;
		$ele.on("pqtooltipopen" + eventNamespace, function(evt, ui) {
			var $grid = $(evt.target),
				$td = $(evt.originalEvent.target);
			$td.on("remove", function(evt) {
				$grid.pqTooltip("close", evt, true)
			});
			ui.tooltip.css("zIndex", $td.zIndex() + 5);
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
