/**
 * ParamQuery Pro v2.0.4
 *
 * Copyright (c) 2012-2015 Paramvir Dhindsa (http://paramquery.com)
 * Released under GPL v3 license
 * http://paramquery.com/license
 *
 */
(function($) {
	$.paramquery = $.paramquery || {};
	$.paramquery.pqgrid = $.paramquery.pqgrid || {};
	$.paramquery.xmlToArray = function(data, obj) {
		var itemParent = obj.itemParent;
		var itemNames = obj.itemNames;
		var arr = [];
		var $items = $(data).find(itemParent);
		$items.each(function(i, item) {
			var $item = $(item);
			var arr2 = [];
			$(itemNames).each(function(j, itemName) {
				arr2.push($item.find(itemName).text())
			});
			arr.push(arr2)
		});
		return arr
	};
	$.paramquery.xmlToJson = function(data, obj) {
		var itemParent = obj.itemParent;
		var itemNames = obj.itemNames;
		var arr = [];
		var $items = $(data).find(itemParent);
		$items.each(function(i, item) {
			var $item = $(item);
			var arr2 = {};
			for (var j = 0, len = itemNames.length; j < len; j++) {
				var itemName = itemNames[j];
				arr2[itemName] = $item.find(itemName).text()
			}
			arr.push(arr2)
		});
		return arr
	};
	$.paramquery.tableToArray = function(tbl) {
		var $tbl = $(tbl);
		var colModel = [];
		var data = [];
		var cols = [];
		var widths = [];
		var $trfirst = $tbl.find("tr:first");
		var $trsecond = $tbl.find("tr:eq(1)");
		$trfirst.find("th,td").each(function(i, td) {
			var $td = $(td);
			var title = $td.html();
			var width = $td.width();
			var dataType = "string";
			var $tdsec = $trsecond.find("td:eq(" + i + ")");
			var val = $tdsec.text();
			var align = $tdsec.attr("align");
			val = val.replace(/,/g, "");
			if (parseInt(val) == val && (parseInt(val) + "").length == val.length) {
				dataType = "integer"
			} else {
				if (parseFloat(val) == val) {
					dataType = "float"
				}
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
		$tbl.find("tr").each(function(i, tr) {
			if (i == 0) {
				return
			}
			var $tr = $(tr);
			var arr2 = [];
			$tr.find("td").each(function(j, td) {
				arr2.push($.trim($(td).html()))
			});
			data.push(arr2)
		});
		return {
			data: data,
			colModel: colModel
		}
	};
	$.paramquery.formatCurrency = function(val) {
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
	$.paramquery.validation = {
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
				if (that._trigger("change", evt, {
					curPage: 1
				}) !== false) {
					that.option({
						curPage: 1
					})
				}
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
				if (that._trigger("change", evt, {
					curPage: curPage
				}) !== false) {
					that.option({
						curPage: curPage
					})
				}
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
			if (that._trigger("change", evt, {
				curPage: val
			}) !== false) {
				that.option({
					curPage: val
				})
			}
		});
		this.last = $("<button type='button' title='" + this.options.strLastPage + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-seek-end"
			},
			text: false
		}).bind("click", function(evt) {
			var val = that.options.totalPages;
			if (that._trigger("change", evt, {
				curPage: val
			}) !== false) {
				that.option({
					curPage: val
				})
			}
		});
		$("<span class='pq-separator'></span>").appendTo(this.element);
		this.rPPHolder = $("<span class='pq-page-placeholder'></span>").appendTo(this.element);
		this.$refresh = $("<button type='button' title='" + this.options.strRefresh + "'></button>").appendTo(this.element).button({
			icons: {
				primary: "ui-icon-refresh"
			},
			text: false
		}).bind("click", function(evt) {
			if (that._trigger("refresh", evt) !== false) {}
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
			if (that._trigger("change", evt, {
				curPage: val
			}) !== false) {
				that.option({
					curPage: val
				})
			} else {
				$this.val(options.curPage);
				return false
			}
		});
		this.$total = $temp.filter("span.total")
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
				var val = $(this).val();
				if (that._trigger("change", evt, {
					rPP: val
				}) !== false) {
					that.options.rPP = val;
					return false
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
		$.Widget.prototype._setOption.call(this, key, value)
	};
	fnPG._setOptions = function() {
		$.Widget.prototype._setOptions.apply(this, arguments);
		this._refresh()
	};
	$.widget("paramquery.pqPager", fnPG);
	$.paramquery.pqPager.regional = {};
	$.paramquery.pqPager.regional.en = fnPG._regional;
	$.paramquery.pqPager.setDefaults = function(obj) {
		for (var key in obj) {
			fnPG.options[key] = obj[key]
		}
		$.widget("paramquery.pqPager", fnPG);
		$(".pq-pager").each(function(i, pager) {
			$(pager).pqPager("option", obj)
		})
	}
})(jQuery);
(function($) {
	var fnSB = {};
	fnSB.options = {
		length: 200,
		num_eles: 3,
		cur_pos: 0,
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
		ele.disableSelection().on("mouseup.pq-scrollbar", function(evt) {
			that.sbmouseup = true
		}).on("mousedown.pq-scrollbar", function(evt) {
			that.sbmouseup = false;
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
						if (that.sbmouseup || (clickY >= $slider.offset().top)) {
							window.clearInterval(that.mousedownInterval);
							that.mousedownInterval = null
						} else {
							that._pageUp(evt)
						}
					}, 0)
				} else {
					if (clickY > botSlider && clickY < bottom_this - 17) {
						that.mousedownInterval = window.setInterval(function() {
							if (that.sbmouseup || (clickY <= $slider.offset().top + heightSlider)) {
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
			if (that.options.disabled) {
				return
			}
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
			if (that.options.disabled) {
				return
			}
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
				that.dragging = false;
				that._refresh()
			}
		}).on("keydown", function(evt) {
			var keyCode = evt.keyCode,
				options = that.options,
				cur_pos = options.cur_pos,
				num_eles = options.num_eles,
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
								if (cur_pos > 0) {
									options.cur_pos = 0;
									that.updateSliderPos();
									that.scroll(evt)
								}
							} else {
								if (keyCode == KC.END) {
									if (cur_pos < num_eles) {
										options.cur_pos = num_eles;
										that.updateSliderPos();
										that.scroll(evt)
									}
								} else {
									if (options.direction == "vertical") {
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
			options = that.options;
		if (options.cur_pos > 0) {
			options.cur_pos--;
			that.updateSliderPos();
			that.scroll(evt)
		}
	};
	fnSB.incr_cur_pos = function(evt) {
		var that = this,
			options = that.options;
		if (options.cur_pos < options.num_eles - 1) {
			options.cur_pos++
		}
		that.updateSliderPos();
		that.scroll(evt)
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
		var thisOptions = this.options;
		if (thisOptions.direction == "vertical") {
			var top = this.element.offset().top + 17;
			var bot = (top + thisOptions.length - 34 - this.slider_length);
			this.$slider.draggable("option", "containment", [0, top, 0, bot])
		} else {
			top = this.element.offset().left + 17;
			bot = (top + thisOptions.length - 34 - this.slider_length);
			this.$slider.draggable("option", "containment", [top, 0, bot, 0])
		}
	};
	fnSB._refresh = function() {
		var thisOptions = this.options;
		if (thisOptions.num_eles <= 1) {
			this.element.css("display", "none")
		} else {
			this.element.css("display", "")
		}
		this._validateCurPos();
		this.$slider.css("display", "");
		if (thisOptions.direction == "vertical") {
			this.element.height(thisOptions.length);
			this._setSliderBgLength();
			this.scroll_space = thisOptions.length - 34 - this.slider_length;
			if (this.scroll_space < 4 || thisOptions.num_eles <= 1) {
				this.$slider.css("display", "none")
			}
			this.updateSliderPos(thisOptions.cur_pos)
		} else {
			this.element.width(thisOptions.length);
			this._setSliderBgLength();
			this.scroll_space = thisOptions.length - 34 - this.slider_length;
			if (this.scroll_space < 4 || thisOptions.num_eles <= 1) {
				this.$slider.css("display", "none")
			}
			this.updateSliderPos(thisOptions.cur_pos)
		}
	};
	fnSB._setSliderBgLength = function() {
		var thisOptions = this.options,
			theme = thisOptions.theme,
			outerHeight = thisOptions.length,
			innerHeight = thisOptions.num_eles * 40 + outerHeight,
			avail_space = outerHeight - 34,
			slider_height = avail_space * outerHeight / innerHeight,
			slider_bg_ht = Math.round((slider_height - (8 + 3 + 3)) / 2);
		if (slider_bg_ht < 1) {
			slider_bg_ht = 1
		}
		this.slider_length = 8 + 3 + 3 + 2 * slider_bg_ht;
		if (thisOptions.direction == "vertical") {
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
			thisOptions = this.options,
			direction = thisOptions.direction,
			$slider = that.$slider;
		if (top == null) {
			top = (direction == "vertical") ? parseInt($slider[0].style.top, 10) : parseInt($slider[0].style.left, 10)
		}
		var scroll_space = thisOptions.length - 34 - ((direction == "vertical") ? $slider[0].offsetHeight : $slider[0].offsetWidth);
		var cur_pos = (top - 17) * (thisOptions.num_eles - 1) / scroll_space;
		cur_pos = Math.round(cur_pos);
		if (thisOptions.cur_pos != cur_pos) {
			if (this.dragging) {
				if (this.topWhileDrag != null) {
					if (this.topWhileDrag < top && thisOptions.cur_pos > cur_pos) {
						return
					} else {
						if (this.topWhileDrag > top && thisOptions.cur_pos < cur_pos) {
							return
						}
					}
				}
				this.topWhileDrag = top
			}
			that.options.cur_pos = cur_pos;
			this.scroll(evt)
		}
	};
	fnSB._setNormalPace = function(evt) {
		if (this.timer) {
			window.clearInterval(this.timer);
			this.timer = null
		}
		var that = this,
			thisOptions = this.options,
			direction = thisOptions.direction;
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
		var thisOptions = this.options;
		if (thisOptions.cur_pos >= thisOptions.num_eles) {
			thisOptions.cur_pos = thisOptions.num_eles - 1
		}
		if (thisOptions.cur_pos < 0) {
			thisOptions.cur_pos = 0
		}
	};
	fnSB.updateSliderPos = function() {
		var thisOptions = this.options;
		var sT = (this.scroll_space * (thisOptions.cur_pos)) / (thisOptions.num_eles - 1);
		if (thisOptions.direction == "vertical") {
			this.$slider.css("top", 17 + sT)
		} else {
			this.$slider.css("left", 17 + sT)
		}
	};
	fnSB.scroll = function(evt) {
		var thisOptions = this.options;
		this._trigger("scroll", evt, {
			cur_pos: thisOptions.cur_pos,
			num_eles: thisOptions.num_eles
		})
	};
	fnSB._pageDown = function(evt) {
		this._trigger("pageDown", evt, null)
	};
	fnSB._pageUp = function(evt) {
		this._trigger("pageUp", evt, null)
	};
	fnSB._setOption = function(key, value) {
		$.Widget.prototype._setOption.call(this, key, value);
		if (key == "disabled") {
			if (value == true) {
				this.$slider.draggable("disable")
			} else {
				this.$slider.draggable("enable")
			}
		} else {
			if (key == "theme") {
				this._createLayout()
			}
		}
	};
	fnSB._setOptions = function() {
		$.Widget.prototype._setOptions.apply(this, arguments);
		this._refresh()
	};
	$.widget("paramquery.pqScrollBar", fnSB)
})(jQuery);
(function($) {
	$("body").delegate(".pq-editor-focus", "focus", function() {
		$(".pq-grid").find(".pq-cont").enableSelection()
	});
	$("body").delegate(".pq-editor-focus", "blur", function() {
		$(".pq-grid").find(".pq-cont").disableSelection()
	});
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
		this.offset = null
	};
	$.paramquery.cGenerateView = cGenerateView;
	var _pGenerateView = cGenerateView.prototype;
	_pGenerateView.generateView = function(objP) {
		var that = this.that,
			thisOptions = that.options,
			virtualX = thisOptions.virtualX,
			numberCell = thisOptions.numberCell,
			CM = that.colModel,
			initH = that.initH,
			finalH = that.finalH,
			GM = thisOptions.groupModel,
			freezeCols = parseInt(thisOptions.freezeCols),
			freezeRows = parseInt(thisOptions.freezeRows),
			wd, lft;
		if (objP) {
			var str = this._generateTables(null, null, objP);
			objP.$cont.empty();
			var $tbl = $(str);
			objP.$cont.append($tbl);
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
			var init = that.init;
			this.init = that.init;
			var finalRow = that["final"];
			this["final"] = that["final"];
			var str2 = this._generateTables(init, finalRow, objP);
			if (that.$td_edit != null) {
				that.quitEditMode({
					silent: true
				})
			}
			that.$cont.empty();
			if (that.totalVisibleRows === 0) {
				that.$cont.append("<div class='pq-cont-inner pq-grid-norows' >" + thisOptions.strNoRows + "</div>")
			} else {
				if (!virtualX && (freezeCols || numberCell.show)) {
					that.$cont.append("<div class='pq-cont-inner'>" + str2 + "</div><div class='pq-cont-inner'>" + str2 + "</div>")
				} else {
					that.$cont.append("<div class='pq-cont-inner'>" + str2 + "</div>")
				}
			}
			var $div_child = that.$cont.children("div");
			if ($div_child.length == 2) {
				var $cont_l = $($div_child[0]);
				var $cont_r = $($div_child[1]);
				$tbl = that.$cont.children().children("table");
				that.$tbl = $tbl;
				var $tbl_r = $($tbl[1]);
				wd = calcWidthCols.call(that, -1, freezeCols);
				$cont_l.css({
					width: wd,
					zIndex: 1
				});
				lft = calcWidthCols.call(that, freezeCols, initH);
				$cont_r.css({
					left: wd + "px",
					width: that.$tbl[0].scrollWidth,
					position: "absolute"
				});
				$tbl_r.css({
					left: (-1 * (lft + wd)) + "px"
				})
			} else {
				$tbl = that.$tbl = that.$cont.children().children("table");
				var $cont = $($div_child[0]);
				lft = calcWidthCols.call(that, freezeCols, initH);
				if (!virtualX) {
					$tbl.css({
						left: "-" + (lft) + "px"
					})
				}
			}
			that._fixTableViewPort();
			that._trigger("refresh", null, {
				dataModel: thisOptions.dataModel,
				colModel: CM,
				pageData: (GM ? that.dataGM : that.data),
				initV: that.init,
				finalV: that["final"],
				initH: initH,
				finalH: finalH
			})
		}
	};
	_pGenerateView._generateTables = function(init, _final, objP) {
		var that = this.that,
			thisColModel = that.colModel,
			CMLength = thisColModel.length,
			thisOptions = that.options,
			virtualX = thisOptions.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			numberCell = thisOptions.numberCell,
			columnBorders = thisOptions.columnBorders,
			rowBorders = thisOptions.rowBorders,
			SM = thisOptions.scrollModel,
			GM = thisOptions.groupModel,
			hidearrHS = that.hidearrHS,
			freezeCols = thisOptions.freezeCols,
			freezeRows = parseInt(thisOptions.freezeRows),
			lastFrozenRow = false,
			outerWidths = that.outerWidths,
			row = 0,
			finalRow = (objP) ? objP.data.length - 1 : _final,
			prevGroupVal = "",
			GMtrue = GM ? true : false,
			TVM = thisOptions.treeModel,
			data = (objP && objP.data) ? objP.data : (GMtrue ? that.dataGM : (that.data)),
			offset = that.rowIndxOffset;
		if (!objP && (init == null || finalRow == null)) {
			that.$cont.empty();
			that.$tbl = null;
			return
		}
		if (!objP) {
			that._trigger("beforeTableView", null, {
				pageData: data,
				initV: init,
				finalV: _final,
				initH: initH,
				finalH: finalH,
				colModel: thisColModel
			})
		}
		var tblClass = "pq-grid-table ";
		if (columnBorders) {
			tblClass += "pq-grid-td-border-right "
		}
		if (rowBorders) {
			tblClass += "pq-grid-td-border-bottom "
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
				if ((virtualX || objP) && hidearrHS[col]) {
					this.hidearrHS1.push(col);
					continue
				}
				var column = thisColModel[col];
				if (column.hidden) {
					continue
				}
				wd = outerWidths[col];
				buffer.push("<td style='width:" + wd + "px;' pq-top-col-indx=" + col + "></td>")
			}
			buffer.push("</tr>")
		}
		this.offsetRow = null;
		for (var row = 0; row <= finalRow; row++) {
			if (row < init && row >= freezeRows) {
				row = init
			}
			var rowObj = data[row],
				rowData = rowObj,
				rowIndxPage = GMtrue ? (rowObj.rowIndx - offset) : row,
				rowHidden = (rowObj) ? rowObj.pq_hidden : false;
			if (rowHidden) {
				continue
			}
			lastFrozenRow = false;
			if (freezeRows && that.lastFrozenRow == row) {
				lastFrozenRow = true
			}
			if (this.offsetRow == null && rowIndxPage != null) {
				that.offsetRow = (row - rowIndxPage)
			}
			if (GM && rowObj.groupTitle) {
				this._generateTitleRow(GM, rowObj, buffer, lastFrozenRow)
			} else {
				if (GM && rowObj.groupSummary) {
					this._generateSummaryRow(rowObj.data, thisColModel, buffer, lastFrozenRow)
				} else {
					var nestedData = rowData.pq_detail,
						nestedshow = false;
					if (nestedData && nestedData.show) {
						nestedshow = true
					}
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
		if (objP) {
			objP.$cont.empty();
			var $tbl = $(str);
			objP.$cont.append($tbl);
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
		} else {}
		return str
	};
	_pGenerateView._renderCell = function(objP) {
		var that = this.that,
			options = that.options,
			DM = options.dataModel,
			rowIndxPage = objP.rowIndxPage,
			rowIndx = objP.rowIndx,
			rowData = objP.rowData,
			colIndx = objP.colIndx,
			$td = objP.$td,
			column = objP.column,
			type = column.type,
			dataIndx = column.dataIndx,
			cellData = rowData[dataIndx],
			wrap = objP.wrap;
		if (!rowData) {
			return
		}
		var dataCell;
		if (type == "checkBoxSelection") {
			dataCell = "<input type='checkbox' " + (cellData ? "checked='checked'" : "") + " />"
		} else {
			if (type == "detail") {
				var DTM = options.detailModel;
				var hicon = (cellData && cellData.show) ? DTM.expandIcon : DTM.collapseIcon;
				dataCell = "<div class='ui-icon " + hicon + "'></div>"
			} else {
				if (column.render) {
					dataCell = column.render.call(that.element, {
						data: that.data,
						dataModel: DM,
						rowData: rowData,
						cellData: cellData,
						rowIndxPage: rowIndxPage,
						rowIndx: rowIndx,
						colIndx: colIndx,
						column: column,
						dataIndx: dataIndx
					})
				} else {
					dataCell = cellData
				}
			}
		} if (dataCell === "" || dataCell == undefined) {
			dataCell = "&nbsp;"
		}
		var cls = "pq-td-div";
		if (wrap == false) {
			cls += " pq-wrap-text"
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
			str = "<div class='" + cls + "'>" + dataCell + "</div>"
		} if ($td != undefined) {
			$td.html(str)
		}
		return str
	};
	_pGenerateView._generateRow = function(rowData, rowIndx, thisColModel, buffer, objP, lastFrozenRow, nestedshow) {
		var row_cls = "pq-grid-row";
		if (lastFrozenRow) {
			row_cls += " pq-last-freeze-row"
		}
		if (nestedshow) {
			row_cls += " pq-detail-master"
		}
		var that = this.that,
			thisOptions = that.options,
			freezeCols = thisOptions.freezeCols,
			numberCell = thisOptions.numberCell,
			TVM = thisOptions.treeModel,
			tree = TVM.labelIndx ? true : false,
			columnBorders = thisOptions.columnBorders,
			wrap = thisOptions.wrap,
			CMLength = thisColModel.length,
			virtualX = thisOptions.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			offset = this.offset,
			hidearrHS = that.hidearrHS,
			customData = thisOptions.customData;
		var const_cls = "pq-grid-cell ";
		if (!thisOptions.wrap || objP) {
			const_cls += "pq-wrap-text "
		}
		var objRender = {
			rowIndx: rowIndx + offset,
			rowIndxPage: rowIndx,
			rowData: rowData,
			wrap: wrap,
			customData: customData
		};
		if (thisOptions.stripeRows && (rowIndx / 2 == parseInt(rowIndx / 2))) {
			row_cls += " pq-grid-oddRow"
		}
		if (rowData.pq_rowselect) {
			row_cls += " pq-row-select ui-state-highlight"
		}
		var cellClass;
		var pq_rowcls = rowData.pq_rowcls;
		var pq_cellcls = rowData.pq_cellcls;
		if (pq_rowcls != null) {
			row_cls += " " + pq_rowcls
		}
		buffer.push("<tr pq-row-indx='" + rowIndx + "' class='" + row_cls + "' >");
		if (numberCell.show) {
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", "<div class='pq-td-div'>", ((objP) ? "&nbsp;" : (rowIndx + 1)), "</div></td>"].join(""))
		}
		for (var col = 0; col <= finalH; col++) {
			if (col < initH && col >= freezeCols && (virtualX || objP)) {
				col = initH;
				if (col > finalH) {
					throw ("initH>finalH");
					break
				}
			}
			var column = thisColModel[col],
				dataIndx = column.dataIndx;
			if (column.hidden) {
				continue
			}
			objRender.column = column;
			objRender.colIndx = col;
			objRender.dataIndx = dataIndx;
			var cellSelection = false;
			if (1 === 1) {
				var pq_cellselect = rowData.pq_cellselect;
				if (pq_cellselect) {
					cellSelection = pq_cellselect[dataIndx]
				}
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
			if (cellSelection) {
				cls = cls + " pq-cell-select ui-state-highlight"
			}
			if (pq_cellcls) {
				var cellClass = pq_cellcls[dataIndx];
				if (cellClass) {
					cls += " " + cellClass
				}
			}
			var indxStr = "pq-col-indx='" + col + "'";
			if (objP) {
				indxStr += " pq-dataIndx='" + dataIndx + "'"
			}
			var colSpan = "";
			objRender.tree = tree;
			var str = ["<td ", colSpan, " class='", cls, "' style='", strStyle, "' ", indxStr, " >", this._renderCell(objRender), "</td>"].join("");
			buffer.push(str)
		}
		buffer.push("</tr>");
		return buffer
	};
	var fn = {
		widgetEventPrefix: "pqgrid"
	};
	fn.options = {
		collapsible: true,
		colModel: null,
		columnBorders: true,
		customData: null,
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
			cellBorderWidth: 1,
			clicksToEdit: 1,
			filterKeys: true,
			keyUpDown: true,
			saveKey: "",
			select: false
		},
		editor: {
			type: "contenteditable"
		},
		validation: {
			icon: "ui-icon-alert",
			cls: "ui-state-error"
		},
		flexHeight: false,
		flexWidth: false,
		freezeCols: 0,
		freezeRows: 0,
		getDataIndicesFromColIndices: true,
		height: 400,
		hoverMode: "row",
		minWidth: 50,
		numberCell: {
			width: 30,
			title: "",
			resizable: false,
			minWidth: 30,
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
			lastColumn: "auto",
			autoFit: false,
			theme: false
		},
		selectionModel: {
			type: "row",
			mode: "range"
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
		width: 600,
		wrap: true
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
	fn._destroyDraggable = function() {
		if (this.element.data("draggable")) {
			this.element.draggable("destroy")
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
		this.element.empty();
		this.element.css("height", "");
		this.element.css("width", "");
		this.element.removeClass("pq-grid ui-widget ui-widget-content ui-corner-all").removeData()
	};
	fn._findCellFromEvtCoords = function(evt) {
		throw ("not in use");
		if (this.$tbl == null) {
			return null
		}
		var $div = $(evt.target).closest(".pq-editor-border-edit");
		if ($div.length > 0) {
			return null
		}
		var top = evt.pageY - this.$cont.offset().top;
		var left = evt.pageX - this.$cont.offset().left;
		var $trs = this.$tbl.find("tr.pq-grid-row");
		var indx = 0,
			rowIndxPage = 0,
			colIndx = 0;
		for (var i = 1; i < $trs.length; i++) {
			if ($trs[i].offsetTop > top) {
				break
			} else {
				indx++
			}
		}
		var $tr = $($trs[indx]);
		rowIndxPage = parseInt($tr.attr("pq-row-indx"));
		var $tds = $tr.find("td.pq-grid-cell");
		var indx = 0,
			_found = false;
		for (var i = 0; i < $tds.length; i++) {
			var td = $tds[i];
			if (td.offsetLeft < left && td.offsetLeft + td.offsetWidth > left) {
				_found = true;
				break
			} else {
				if (td.offsetLeft > left) {
					break
				} else {
					indx++
				}
			}
		}
		if (!_found) {
			return null
		}
		var $td = $($tds[indx]);
		if ($td[0].nodeName.toUpperCase() != "TD") {
			$td = $(evt.target).parent("td")
		}
		colIndx = parseInt($td.attr("pq-col-indx"));
		if (isNaN(colIndx)) {
			return null
		}
		return {
			$td: $td,
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndxPage + this.rowIndxOffset,
			colIndx: colIndx,
			dataIndx: this.colModel[colIndx].dataIndx
		}
	};
	fn._createSlidingTop = function() {
		var that = this,
			$top = this.$top,
			slideup = false,
			htCapture = 0,
			$collapsible = $(["<div class='pq-slider-icon' style='z-index:5;' >", "<span class='ui-icon ui-icon-circle-triangle-n'></span>", "</div>"].join("")).appendTo($top),
			$icon = $collapsible.children("span");
		$collapsible.mouseover(function(evt) {
			$collapsible.addClass("ui-state-hover")
		}).mouseout(function(evt) {
			$collapsible.removeClass("ui-state-hover")
		}).click(function(evt) {
			var ele = that.element,
				thisOptions = that.options;
			if (slideup) {
				ele.animate({
					height: htCapture
				}, function() {
					that.refresh();
					$icon.addClass("ui-icon-circle-triangle-n").removeClass("ui-icon-circle-triangle-s");
					that.$toolbar.pqToolbar("enable")
				});
				slideup = false
			} else {
				htCapture = (thisOptions.flexHeight) ? ele[0].offsetHeight : thisOptions.height;
				htCapture = parseInt(htCapture) + "px";
				ele.animate({
					height: "23px"
				}, function() {
					$icon.addClass("ui-icon-circle-triangle-s").removeClass("ui-icon-circle-triangle-n");
					if (ele.hasClass("ui-resizable")) {
						ele.resizable("destroy")
					}
					that.$toolbar.pqToolbar("disable")
				});
				slideup = true
			}
		});
		this.$collapsible = $collapsible
	};
	if ($.paramquery.pqg_incr == null) {
		$.paramquery.pqg_incr = 0
	}
	fn._create = function() {
		var that = this;
		this.iGenerateView = new cGenerateView(this);
		this.iKeyNav = new cKeyNav(this);
		this.cols = [];
		this.widths = [];
		this.outerWidths = [];
		this.rowHeight = 22;
		this.hidearr = [];
		this.hidearrHS = [];
		this.tables = [];
		var that = this,
			thisOptions = this.options;
		this.$tbl = null;
		this._calcThisColModel();
		this.iSort = new $.paramquery.cSort(this);
		this.iSort._refreshSorters();
		this._initTypeColumns();
		$.paramquery.pqg_incr++;
		var pqg_incr = $.paramquery.pqg_incr;
		this.element.empty().addClass("pq-grid ui-widget ui-widget-content" + (thisOptions.roundCorners ? " ui-corner-all" : "")).append(["<div class='pq-grid-top ui-widget-header", (thisOptions.roundCorners ? " ui-corner-top" : ""), "'>", "<div class='pq-grid-title", (thisOptions.roundCorners ? " ui-corner-top" : ""), "'>&nbsp;</div></div>", "<div class='pq-grid-inner' ><div class='pq-grid-right'>", "<div class='pq-header-outer ui-widget-header'>", "<span class='pq-grid-header ui-state-default'></span><span class='pq-grid-header ui-state-default'></span>", "</div>", "<div class='pq-cont-right' >", "<div class='pq-cont pq-cont-", pqg_incr, "'></div>", "</div>", "</div></div>", "<div class='pq-grid-bottom ui-widget-header", (thisOptions.roundCorners ? " ui-corner-bottom" : ""), "'>", "<div class='pq-grid-footer'>&nbsp;</div>", "</div>"].join(""));
		this._trigger("render", null, {
			dataModel: this.options.dataModel,
			colModel: this.colModel
		});
		this.$top = $("div.pq-grid-top", this.element);
		this.$title = $("div.pq-grid-title", this.element);
		if (!thisOptions.showTitle) {
			this.$title.css("display", "none")
		}
		if (thisOptions.collapsible) {
			this._createSlidingTop()
		}
		this.$toolbar = $("div.pq-grid-toolbar", this.element);
		this.$grid_inner = $("div.pq-grid-inner", this.element);
		this.$grid_right = $(".pq-grid-right", this.element);
		this.$header_o = $("div.pq-header-outer", this.$grid_right);
		if (!thisOptions.showTop) {
			this.$top.css("display", "none")
		}
		this.$header = $(".pq-grid-header", this.$grid_right);
		this.$header_left = $(this.$header[0]);
		this.$header_right = $(this.$header[1]);
		this.$bottom = $("div.pq-grid-bottom", this.element);
		if (!thisOptions.showBottom) {
			this.$bottom.css("display", "none")
		}
		this.$footer = $("div.pq-grid-footer", this.element);
		this.$cont_o = $("div.pq-cont-right", this.$grid_right);
		this.$cont_fixed = $("div.pq-cont-fixed", this.$grid_right);
		this.$cont = $("div.pq-cont", this.$grid_right);
		this.$cont.on("click", function(evt) {
			that._onClickCont(evt)
		});
		this.$cont.on("click", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onClickCell(evt)
			}
		});
		this.$cont.on("click", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onClickRow(evt)
			}
		});
		this.$cont.on("contextmenu", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRightClickCell(evt)
			}
		});
		this.$cont.on("contextmenu", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRightClickRow(evt)
			}
		});
		this.$cont.on("dblclick", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onDblClickCell(evt)
			}
		});
		this.$cont.on("dblclick", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onDblClickRow(evt)
			}
		});
		this.$cont.on("mousedown", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseDown(evt)
			}
		});
		this.$cont.on("mousedown", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseDown(evt)
			}
		});
		this.$cont.on("mousemove", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseMove(evt)
			}
		});
		this.$cont.on("mousemove", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseMove(evt)
			}
		});
		this.$cont.on("mouseup", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseUp(evt)
			}
		});
		this.element.on("mouseup", function(evt) {
			if (that._trigger("mouseUp", evt, {
				dataModel: that.options.dataModel
			}) == false) {
				return false
			}
		});
		this.$cont.on("mouseenter", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseEnter(evt, $(this))
			}
		});
		this.$cont.on("mouseenter", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseEnter(evt, $(this))
			}
		});
		this.$cont.on("mouseleave", "td.pq-grid-cell", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onCellMouseLeave(evt, $(this))
			}
		});
		this.$cont.on("mouseleave", "tr.pq-grid-row", function(evt) {
			if ($(evt.target).closest(".pq-grid")[0] == that.element[0]) {
				return that._onRowMouseLeave(evt, $(this))
			}
		});
		this.$cont.bind("mousewheel DOMMouseScroll", function(evt) {
			return that._onMouseWheel(evt)
		});
		var prevVScroll = 0;
		this.$hvscroll = $("<div class='pq-hvscroll-square ui-widget-content'></div>").appendTo(this.$grid_inner);
		this.$vscroll = $("<div class='pq-vscroll'></div>").appendTo(this.$grid_inner);
		this.prevVScroll = 0;
		var scrollModel = thisOptions.scrollModel;
		this.$vscroll.pqScrollBar({
			pace: scrollModel.pace,
			theme: scrollModel.theme,
			direction: "vertical",
			cur_pos: 0,
			pageDown: function(evt, ui) {
				that.iKeyNav.pageDown()
			},
			pageUp: function(evt, ui) {
				that.iKeyNav.pageUp()
			},
			scroll: function(evt, obj) {
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
		});
		var prevHScroll = 0;
		this.$hscroll = $("<div class='pq-hscroll'></div>").appendTo(this.$grid_inner);
		this.$hscroll.pqScrollBar({
			direction: "horizontal",
			pace: scrollModel.pace,
			theme: scrollModel.theme,
			cur_pos: 0,
			scroll: function(evt, obj) {
				that.refresh()
			}
		});
		this._refreshGridWidth();
		this.element.height(thisOptions.height);
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
		this._refreshDataIndices();
		this.iRows = new $.paramquery.cRows(this);
		this.iCells = new $.paramquery.cCells(this);
		this.generateLoading();
		this._initPager()
	};
	fn._refreshGridWidth = function() {
		var thisOptions = this.options,
			wd2, element = this.element;
		if ((thisOptions.width + "").indexOf("%") != -1) {
			var parent = element.parent(),
				wd = parent.width(),
				superParent = null;
			if (wd == 0) {
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
					wd = element.parent().width();
					superParent.css({
						position: position,
						left: left,
						top: top
					})
				}
			}
			var wd2 = parseInt(thisOptions.width) * wd / 100
		} else {
			wd2 = thisOptions.width
		}
		element.width(wd2);
		element.width(element.width())
	};
	fn._onMouseWheel = function(evt) {
		if (this.options.flexHeight) {
			return true
		}
		var that = this;
		var num = 0;
		var evt = evt.originalEvent;
		if (evt.wheelDelta) {
			num = evt.wheelDelta / 120
		} else {
			if (evt.detail) {
				num = evt.detail * -1 / 3
			}
		}
		var cur_pos = parseInt(that.$vscroll.pqScrollBar("option", "cur_pos"));
		var new_pos = cur_pos - num;
		if (new_pos >= 0) {
			that.$vscroll.pqScrollBar("option", "cur_pos", cur_pos - num).pqScrollBar("scroll")
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
			rowData: that.data[rowIndxPage]
		}) == false) {
			return false
		}
		if (that.options.editModel.clicksToEdit > 1 && this.isEditableRow({
			rowIndx: rowIndx
		}) && this.isEditableCell({
			colIndx: colIndx,
			rowIndx: rowIndx
		})) {
			that._editCell($td)
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
			rowData: that.data[rowIndxPage]
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
			rowData: that.data[rowIndxPage]
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
			rowData: that.data[rowIndxPage]
		}) == false) {
			return false
		}
	};
	fn._isValid = function(obj) {
		var that = this,
			rowData = obj.rowData,
			value = $.trim(obj.value),
			column = obj.column,
			dataIndx = column.dataIndx,
			gValid = this.options.validation,
			valids = column.validations;
		if (valids && valids.length > 0) {
			for (var j = 0; j < valids.length; j++) {
				var valid = valids[j],
					valid = $.extend({}, gValid, valid),
					type = valid.type,
					msg = valid.msg,
					msg = msg ? msg : "&nbsp;",
					icon = valid.icon,
					cls = valid.cls,
					cls = cls ? cls : "",
					style = "padding:3px 10px;" + valid.style,
					css = valid.css,
					_valid = true,
					invalid = {
						valid: false,
						msg: msg,
						dataIndx: dataIndx
					}, reqVal = valid.value;
				if (type == "minLen" && value.length < reqVal) {
					_valid = false
				} else {
					if (type == "maxLen" && value.length > reqVal) {
						_valid = false
					} else {
						if (type == "gt" && value <= reqVal) {
							_valid = false
						} else {
							if (type == "gte" && value < reqVal) {
								_valid = false
							} else {
								if (type == "lt" && value >= reqVal) {
									_valid = false
								} else {
									if (type == "lte" && value > reqVal) {
										_valid = false
									} else {
										if (type == "regexp" && (new RegExp(reqVal)).test(value) == false) {
											_valid = false
										} else {
											if (typeof type == "function") {
												var obj2 = {
													column: column,
													value: value,
													rowData: rowData,
													msg: msg
												};
												if (type.call(that.element, obj2) == false) {
													_valid = false;
													if (obj2.msg != msg) {
														msg = obj2.msg
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
					var rowIndx = this.getRowIndx({
						rowData: rowData
					}).rowIndx;
					if (rowIndx != null) {
						this.goToPage({
							rowIndx: rowIndx
						});
						this.scrollRow({
							rowIndx: rowIndx
						});
						this.editCell({
							rowIndx: rowIndx,
							dataIndx: dataIndx
						})
					}
					var cell = this.getEditCell();
					if (cell && cell.$cell) {
						var $cell = cell.$cell;
						$cell.attr("title", msg);
						try {
							$cell.tooltip("destroy")
						} catch (ex) {}
						$cell.tooltip({
							position: {
								my: "left top",
								at: "right top"
							},
							content: function() {
								var $this = $(this),
									strIcon = (icon == "") ? "" : ("<span class='ui-icon " + icon + " pq-tooltip-icon'></span>");
								return strIcon + msg
							},
							open: function(evt, ui) {
								if (cls) {
									ui.tooltip.addClass(cls)
								}
								if (style) {
									var olds = ui.tooltip.attr("style");
									ui.tooltip.attr("style", olds + ";" + style)
								}
								if (css) {
									ui.tooltip.css(css)
								}
							}
						}).tooltip("open");
						$cell.find(".pq-editor-focus").focus()
					}
					return invalid
				}
			}
		}
		return {
			valid: true
		}
	};
	fn.isValid = function(obj) {
		var rowList = obj.rowList,
			rowData = this.getRowData(obj),
			dataIndx = obj.dataIndx;
		if (dataIndx == null) {
			var CM = this.colModel;
			for (var i = 0, len = CM.length; i < len; i++) {
				var column = CM[i],
					hidden = column.hidden;
				if (hidden) {
					continue
				}
				var dataIndx = column.dataIndx,
					value = rowData[dataIndx],
					isValid = this._isValid({
						rowData: rowData,
						value: value,
						column: column
					});
				if (!isValid.valid) {
					return isValid
				}
			}
		} else {
			var column = this.getColumn({
				dataIndx: dataIndx
			}),
				value = (obj.value === undefined) ? rowData[dataIndx] : obj.value,
				isValid = this._isValid({
					rowData: rowData,
					value: value,
					column: column
				});
			if (!isValid.valid) {
				return isValid
			}
		}
		return {
			valid: true
		}
	};
	fn.isEditableRow = function(objP) {
		var thisOptions = this.options,
			gEditable = thisOptions.editable;
		if (gEditable != null) {
			if (typeof gEditable == "function") {
				var rowIndx = objP.rowIndx,
					rowData = thisOptions.dataModel.data[rowIndx];
				return gEditable.call(this.element, {
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
					rowData = this.getRowData(objP);
				return cEditable.call(this.element, {
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
		var rowData = (rowData == null) ? this.data[rowIndxPage] : rowData;
		return rowData ? rowData[key] : null
	};
	fn._setRowPQData = function(rowIndxPage, objP, rowData) {
		var rowData = (rowData == null) ? this.data[rowIndxPage] : rowData;
		if (!rowData) {
			return
		}
		for (var key in objP) {
			rowData[key] = objP[key]
		}
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
			that = this;
		if (that._trigger("cellMouseEnter", evt, {
			$td: $td,
			dataModel: that.options.dataModel
		}) == false) {
			return false
		}
		if (that.options.hoverMode == "cell") {
			that.highlightCell($td)
		}
		return true
	};
	fn._onRowMouseEnter = function(evt, $this) {
		var $tr = $this,
			that = this;
		var objRI = that.getRowIndx({
			$tr: $tr
		});
		var rowIndxPage = objRI.rowIndxPage;
		if (that._trigger("rowMouseEnter", evt, {
			$tr: $tr,
			dataModel: that.options.dataModel
		}) == false) {
			return false
		}
		if (that.options.hoverMode == "row") {
			that.highlightRow(rowIndxPage)
		}
		return true
	};
	fn._onCellMouseLeave = function(evt, $this) {
		var $td = $this,
			that = this;
		if (that._trigger("cellMouseLeave", evt, {
			$td: $td,
			dataModel: that.options.dataModel
		}) == false) {
			return false
		}
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
		if (that._trigger("rowMouseLeave", evt, {
			$tr: $tr,
			dataModel: that.options.dataModel
		}) == false) {
			return false
		}
		if (that.options.hoverMode == "row") {
			that.unHighlightRow(rowIndxPage)
		}
		return true
	};
	fn._onCellMouseMove = function(evt) {
		var that = this;
		var $td = $(evt.currentTarget);
		var objP = that.getCellIndices({
			$td: $td
		});
		objP.$td = $td;
		objP.dataModel = that.options.dataModel;
		if (that._trigger("cellMouseMove", evt, objP) == false) {
			return false
		}
		return true
	};
	fn._onRowMouseMove = function(evt) {
		var that = this;
		var $tr = $(evt.currentTarget);
		var objP = that.getRowIndx({
			$tr: $tr
		});
		objP.$tr = $tr;
		objP.dataModel = that.options.dataModel;
		if (that._trigger("rowMouseMove", evt, objP) == false) {
			return false
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
			rowData: that.data[rowIndxPage]
		}) == false) {
			return false
		}
		if (EM.clicksToEdit == 1 && this.isEditableRow({
			rowIndx: rowIndx
		}) && this.isEditableCell({
			colIndx: colIndx,
			rowIndx: rowIndx
		})) {
			window.setTimeout(function() {
				that.editCell(objP)
			}, 0);
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
			rowData: that.data[rowIndxPage]
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
			data: this.data,
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
		this.$header.find("tr.pq-grid-title-row").disableSelection()
	};
	fn._isEditCell = function(evt) {
		var $targ = $(evt.target);
		var $div = $targ.closest("div.pq-editor-border-edit");
		if ($div && $div.length > 0) {
			return true
		}
		return false
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
			rPP: DM.rPP,
			rPPOptions: DM.rPPOptions,
			change: function(evt, ui) {
				that.quitEditMode();
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
			this.data = DMdata;
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
			this.data = DMdata.slice(begIndx, endIndx)
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
				this.data = DMdata.slice(0, endIndx)
			} else {
				this.data = DMdata.slice(0)
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
			var objURL = DM.getUrl.call(this.element, objk);
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
					postData = postData.call(this.element, {
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
					return DM.beforeSend.call(that.element, jqXHR, settings)
				}
			},
			success: function(responseObj, textStatus, jqXHR) {
				if (typeof DM.getData == "function") {
					var retObj = DM.getData.call(that.element, responseObj, textStatus, jqXHR);
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
				if (objP && objP.callback) {
					objP.callback()
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				that.hideLoading();
				that.loading = false;
				if (typeof DM.error == "function") {
					DM.error.call(that.element, jqXHR, textStatus, errorThrown)
				} else {
					if (errorThrown != "abort") {
						throw ("Error : " + errorThrown)
					}
				}
			}
		})
	};
	fn._fixFireFoxContentEditableIssue = function() {
		if (window.postMessage) {}
	};
	fn.setFlexWHCallback = function(fn) {
		var that = this;
		fn.call(that);
		if (this.options.flexHeight) {
			this.setGridHeightFromTable()
		}
		if (this.options.flexWidth) {
			this._setGridWidthFromTable()
		}
	};
	fn._refreshTitle = function() {
		this.$title.html(this.options.title)
	};
	fn._refreshDraggable = function() {
		if (this.options.draggable) {
			this.$title.addClass("draggable");
			this.element.draggable({
				handle: this.$title,
				start: function(evt, ui) {}
			})
		} else {
			this._destroyDraggable()
		}
	};
	fn._refreshResizable = function() {
		var that = this;
		if (this.options.resizable) {
			this.element.resizable({
				helper: "ui-state-highlight",
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
					that.options.height = that.element.height();
					that.options.width = that.element.width();
					that._refresh();
					that.element.css("position", "relative")
				}
			})
		} else {
			this._destroyResizable()
		}
	};
	fn.refresh = function(objP) {
		this._refresh(objP)
	};
	fn._refreshDataIndices = function() {
		if (this.options.getDataIndicesFromColIndices == false) {
			return
		}
		var CM = this.colModel,
			CMLength = CM.length;
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i];
			if (column.dataIndx == null) {
				column.dataIndx = i
			}
		}
	};
	fn.refreshView = function(obj) {
		if (this.$td_edit != null) {
			this.quitEditMode({
				silent: true
			})
		}
		this.refreshDataFromDataModel();
		this._refresh(obj)
	};
	fn._refresh = function(objP) {
		var that = this;
		this._refreshGridWidth();
		this._refreshDataIndices();
		this._refreshResizable();
		this._refreshDraggable();
		this._refreshColumnWidths();
		this._computeOuterWidths();
		this._setScrollHNumEles();
		this._bufferObj_calcInitFinalH();
		this._refreshHideArrHS();
		if (!objP || objP.header !== false) {
			this._createHeader()
		}
		this._refreshHeaderSortIcons();
		this._setInnerGridHeight();
		this._setRightGridHeight();
		this.setFlexWHCallback(function() {
			that.iGenerateView.generateView();
			that._computeOuterWidths()
		});
		this._setScrollHLength();
		this._setScrollVLength();
		this._setScrollVNumEles(true);
		this._setScrollHLength();
		this._setScrollHVLength();
		this._refreshPager();
		this._refreshFreezeLine();
		this.disableSelection();
		this.options.dataModel.postDataOnce = undefined
	};
	fn._setScrollHVLength = function() {
		var options = this.options;
		if (this.$hscroll.is(":hidden") || options.flexHeight || options.flexWidth) {
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
	fn._refreshViewAfterDataSort = function() {
		this._refresh()
	};
	fn.refreshSortingDataAndView = function() {
		this._refreshSortingDataAndView({
			sorting: true
		})
	};
	fn.getThis = function() {
		return {
			that: this
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
		if (obj.dataIndx === undefined) {
			throw ("dataIndx N/A")
		}
		var dataIndx = obj.dataIndx;
		var thisColModel = this.colModel;
		for (var i = 0, len = thisColModel.length; i < len; i++) {
			var column = thisColModel[i];
			if (column.dataIndx == dataIndx) {
				return column
			}
		}
		return null
	};
	fn._onDataAvailable = function() {};
	fn._computeOuterWidths = function() {
		var thisOptions = this.options,
			columnBorders = thisOptions.columnBorders,
			numberCell = thisOptions.numberCell,
			thisColModel = this.colModel,
			outerWidths = this.outerWidths,
			thisColModelLength = thisColModel.length;
		for (var i = 0; i < thisColModelLength; i++) {
			var column = thisColModel[i];
			outerWidths[i] = parseInt(column.width) + ((columnBorders) ? 1 : 0)
		}
		if (numberCell.show) {
			this.numberCell_outerWidth = numberCell.width + 1
		}
		return
	};
	fn._setOption = function(key, value) {
		var options = this.options;
		if (key == "height") {
			this.element.height(value);
			this._super.call(this, key, value)
		} else {
			if (key == "width") {
				this._super.call(this, key, value);
				this._refreshGridWidth()
			} else {
				if (key == "title") {
					this._super.call(this, key, value);
					this._refreshTitle()
				} else {
					if (key == "roundCorners") {
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
							if (!isNaN(value) && value >= 0 && parseInt(value) <= this.colModel.length - 2) {
								options.freezeCols = parseInt(value);
								this._refreshFreezeLine();
								this._setScrollHLength();
								this._super.call(this, key, value)
							}
						} else {
							if (key == "resizable") {
								this._super.call(this, key, value)
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
												var obj = value;
												for (var key in obj) {
													this.options.selectionModel[key] = obj[key]
												}
											} else {
												if (key === "colModel") {
													this._super.call(this, key, value);
													this._calcThisColModel();
													this._refresh()
												} else {
													if (key === "disabled") {
														if (value === true) {
															this._disable()
														} else {
															this._enable()
														}
													} else {
														if (key === "numberCell") {
															this._super.call(this, key, value)
														} else {
															if (key === "customData") {
																this._super.call(this, key, value)
															} else {
																if (key === "strLoading") {
																	this._super.call(this, key, value);
																	this._refreshLoadingString()
																} else {
																	if (key === "showTop") {
																		if (value === true) {
																			this.$top.css("display", "")
																		} else {
																			this.$top.css("display", "none")
																		}
																	} else {
																		if (key === "showTitle") {
																			if (value === true) {
																				this.$title.css("display", "")
																			} else {
																				this.$title.css("display", "none")
																			}
																		} else {
																			if (key === "showToolbar") {
																				if (value === true) {
																					this.$toolbar.css("display", "")
																				} else {
																					this.$toolbar.css("display", "none")
																				}
																			} else {
																				if (key == "toolbar") {
																					this.$toolbar.remove();
																					this._super.call(this, key, value);
																					this._createToolbar()
																				} else {
																					if (key === "collapsible") {
																						if (value === true) {
																							if (!this.$collapsible) {
																								this._createSlidingTop()
																							}
																							this.$collapsible.css("display", "")
																						} else {
																							if (this.$collapsible) {
																								this.$collapsible.css("display", "none")
																							}
																						}
																					} else {
																						if (key === "showBottom") {
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
	};
	fn._setOptions = function() {
		this._super.apply(this, arguments)
	};
	fn._generateCellRowOutline = function(obj) {
		var $td = obj.$td,
			$tr = obj.$tr,
			rowIndxStart = obj.rowIndxStart,
			cellBW = this.options.editModel.cellBorderWidth,
			colIndxStart = obj.colIndxStart,
			rowIndxEnd = obj.rowIndxEnd,
			colIndxEnd = obj.colIndxEnd,
			that = this;
		if ($tr) {
			var wd = that._calcRightEdgeCol(that.colModel.length - 1);
			wd -= 4;
			var ht = $tr[0].offsetHeight - 4;
			var $table = $($tr[0].offsetParent);
			var offsetParent = $table[0].offsetParent;
			var lft = $tr[0].offsetLeft + $table[0].offsetLeft;
			var top = $tr[0].offsetTop + $table[0].offsetTop;
			that._generateCellHighlighter(offsetParent, lft, top, wd, ht)
		} else {
			if ($td) {
				var $table = $($td[0].offsetParent);
				var offsetParent = $table[0].offsetParent;
				var wd = $td[0].offsetWidth - (cellBW ? (cellBW * 2) : 1);
				var ht = $td[0].offsetHeight - (cellBW ? (cellBW * 2) : 1);
				var lft = $td[0].offsetLeft + $table[0].offsetLeft + offsetParent.offsetLeft;
				var top = $td[0].offsetTop + $table[0].offsetTop - this.$cont.scrollTop();
				that._generateCellHighlighter(offsetParent, lft, top, wd, ht, $td)
			}
		}
	};
	fn._removeCellRowOutline = function(objP) {
		if (objP && objP.old && this.$div_focus_old) {
			var $editor = this.$div_focus_old.find(".pq-editor-focus");
			if ($editor[0] && $editor[0] == document.activeElement) {
				if (this.options.debug) {
					throw ("assert failed")
				}
			}
			this.$div_focus_old.remove();
			this.$div_focus_old = null
		} else {
			if (this.$div_focus) {
				var $editor = this.$div_focus.find(".pq-editor-focus");
				if ($editor[0] == document.activeElement) {
					$editor.blur()
				}
				this.$div_focus.remove();
				this.$div_focus = null
			}
		}
	};
	fn._generateCellHighlighter = function(offsetParent, lft, top, wd, ht, $td) {
		var cellBW = this.options.editModel.cellBorderWidth,
			$div_focus = this.$div_focus;
		if ($div_focus) {
			this.$div_focus_old = $div_focus
		}
		this.$div_focus = $("<div class='pq-editor-border'></div>").appendTo(this.$cont_o);
		this.$div_focus.css({
			left: lft,
			top: top,
			height: ht,
			width: wd,
			borderWidth: cellBW
		})
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
		var rowIndx = obj.rowIndx,
			evt = obj.evt,
			offset = obj.offset;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.iRows.replace(obj) == false) {
				return false
			}
		} else {
			if (this.iRows.add(obj) == false) {
				return false
			}
		} if (evt != null) {}
		return true
	};
	fn.scrollY = function(rowIndx) {
		this.$vscroll.pqScrollBar("option", "cur_pos", rowIndx).pqScrollBar("scroll")
	};
	fn._get$Tbl = function(rowIndxPage, colIndx) {
		return this.$tbl
	};
	fn.scrollCell = function(obj) {
		this.scrollRow(obj);
		this.scrollColumn(obj)
	};
	fn.scrollRow = function(obj) {
		var rowIndxPage = obj.rowIndxPage,
			nested = (this.iHierarchy ? true : false),
			rowIndx = obj.rowIndx,
			scrollCurPos = this.scrollCurPos,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - this.rowIndxOffset) : rowIndxPage,
			thisOptions = this.options,
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
		var $tbl = this._get$Tbl(rowIndxPage);
		var $trs = $tbl.children("tbody").children("tr[pq-row-indx=" + rowIndxPage + "]"),
			$tr = $trs.last(),
			$tr_first = $tr;
		if ($trs.length > 1) {
			$tr_first = $trs.first()
		}
		if ($tr[0] == undefined) {
			this.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
		} else {
			var td_bottom = $tr[0].offsetTop + $tr[0].offsetHeight,
				htCont = this.$cont[0].offsetHeight,
				marginTop = parseInt($tbl.css("marginTop")),
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
	fn._bringCellToView = function(objP) {
		if (objP.rowIndxPage == null || objP.colIndx == null) {
			throw "rowIndxPage/colIndx NA"
		}
		var rowIndxPage = objP.rowIndxPage,
			colIndx = objP.colIndx,
			tdneedsRefresh = false,
			freezeCols = this.options.freezeCols;
		var $td;
		if (this.hidearrHS[colIndx]) {
			this.hidearrHS[colIndx] = false;
			var cur_pos = colIndx - freezeCols - this._calcNumHiddenUnFrozens(colIndx);
			this.$hscroll.pqScrollBar("option", "cur_pos", cur_pos).pqScrollBar("scroll");
			tdneedsRefresh = true
		} else {
			var $td = this.getCell(objP);
			if ($td == null || $td.length == 0) {
				return false
			}
			var td_right = this._calcRightEdgeCol(colIndx).width;
			var wdSB = this._getScollBarVerticalWidth();
			if (td_right > this.$cont[0].offsetWidth - wdSB) {
				var diff = calcWidthCols.call(this, -1, colIndx + 1) - (this.$cont[0].offsetWidth - wdSB);
				var $tds = $td.parent("tr").children("td");
				var CM = this.colModel,
					outerWidths = this.outerWidths,
					CMLength = CM.length;
				var wd = 0,
					initH = 0;
				for (var i = freezeCols; i < CMLength; i++) {
					if (!CM[i].hidden) {
						wd += outerWidths[i]
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
				tdneedsRefresh = true
			}
		} if (tdneedsRefresh) {
			var $td = this.getCell({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
			return $td
		} else {
			return $td
		}
	};
	fn.scrollColumn = function(objP) {
		var colIndx = objP.colIndx,
			colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: objP.dataIndx
			}) : colIndx,
			freezeCols = this.options.freezeCols;
		var td_right = this._calcRightEdgeCol(colIndx).width,
			wdSB = this._getScollBarVerticalWidth(),
			cont_wd = this.$cont[0].offsetWidth;
		if (td_right > cont_wd - wdSB) {
			var diff = calcWidthCols.call(this, -1, colIndx + 1) - (cont_wd - wdSB),
				CM = this.colModel,
				outerWidths = this.outerWidths,
				CMLength = CM.length,
				wd = 0,
				initH = 0;
			for (var i = freezeCols; i < CMLength; i++) {
				if (!CM[i].hidden) {
					wd += outerWidths[i]
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
	fn.selection = function(obj) {
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			method = obj.method,
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
				this._refreshViewAfterDataSort()
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
					this._refresh()
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
		var data = this.data,
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
			this._bringCellToView({
				rowIndxPage: rowIndxPage,
				colIndx: colIndx
			});
			return this.selectCell(obj)
		}
	};
	fn.getColModel = function() {
		return this.colModel
	};
	fn.saveEditCell = function(objP) {
		if (this.$td_edit == null) {
			return
		}
		var $td = this.$td_edit,
			evt = objP ? objP.evt : null,
			obj = this.getCellIndices({
				$td: $td
			}),
			offset = this.rowIndxOffset,
			colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = rowIndxPage + offset,
			thisColModel = this.colModel,
			column = thisColModel[colIndx],
			dataIndx = column.dataIndx,
			rowData = this.data[rowIndxPage],
			options = this.options,
			DM = options.dataModel,
			oldVal;
		if (rowData == null) {
			return
		} else {
			oldVal = rowData[dataIndx]
		}
		obj.rowIndx = rowIndx;
		obj.column = column;
		obj.dataIndx = dataIndx;
		if (rowIndxPage != null) {
			var newVal = this._getEditCellData(obj);
			if (newVal == "<br>") {
				newVal = ""
			}
			if (oldVal == null && newVal === "") {
				newVal = null
			}
			var objCell = {
				rowIndx: rowIndx,
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
			if (newVal != oldVal) {
				rowData[dataIndx] = newVal;
				this._trigger("cellSave", evt, objCell);
				if (options.track) {
					var rowData = this.getRowData({
						rowIndx: rowIndx
					});
					this.iUCData.update({
						rowData: rowData,
						dataIndx: dataIndx,
						oldVal: oldVal,
						newVal: newVal
					})
				}
				this.refreshCell(obj);
				this._fixTableViewPort();
				var that = this;
				if (options.flexHeight) {
					that.setGridHeightFromTable();
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
	fn._fixTableViewPort = function() {
		var cont = this.$cont[0];
		cont.scrollTop = 0;
		cont.scrollLeft = 0
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
		var customData = this.options.customData,
			colIndx = (obj.colIndx == null) ? this.getColIndx({
				dataIndx: obj.dataIndx
			}) : obj.colIndx,
			offset = this.getRowIndxOffset();
		obj.colIndx = colIndx;
		for (var row = this.init; row <= this["final"]; row++) {
			var rowIndxPage = row;
			obj.rowIndx = rowIndxPage + offset;
			obj.rowIndxPage = rowIndxPage;
			var column = this.colModel[colIndx];
			obj.$td = this.getCell(obj);
			obj.rowData = this.data[rowIndxPage];
			obj.customData = customData;
			obj.column = column;
			this.iGenerateView._renderCell(obj)
		}
	};
	fn.refreshCell = function(obj) {
		if (!this.data) {
			return
		}
		var offset = this.rowIndxOffset,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx,
			rowIndxPage = obj.rowIndxPage = (rowIndxPage == null) ? rowIndx - offset : rowIndxPage,
			dataIndx = obj.dataIndx,
			colIndx = obj.colIndx,
			colIndx = obj.colIndx = (colIndx == null) ? this.getColIndx({
				dataIndx: dataIndx
			}) : colIndx,
			$td = obj.$td = (obj.$td == null) ? this.getCell(obj) : obj.$td,
			column = obj.column = this.colModel[colIndx],
			TVM = this.options.treeModel,
			rowData = this.data[rowIndxPage];
		if (!rowData) {
			return
		}
		var objRender = obj;
		objRender.tree = TVM.labelIndx ? true : false, objRender.rowData = rowData;
		objRender.customData = this.options.customData;
		if ($td && $td.length > 0) {
			this.iGenerateView._renderCell(objRender)
		}
	};
	fn.refreshRow = function(obj) {
		if (!this.data) {
			return
		}
		var thisOptions = this.options,
			offset = this.rowIndxOffset,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = (rowIndx == null) ? rowIndxPage + offset : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? rowIndx - offset : rowIndxPage,
			$trOld = (obj.$tr == null) ? this.getRow(obj) : obj.$tr,
			CM = this.colModel,
			rowData = this.data[rowIndxPage];
		if (!rowData) {
			return
		}
		var buffer = [];
		this.iGenerateView._generateRow(rowData, rowIndxPage, CM, buffer, null);
		var trStr = buffer.join("");
		$trOld.replaceWith(trStr);
		this._trigger("refresh", null, {
			type: "row",
			dataModel: thisOptions.dataModel,
			colModel: CM,
			rowData: rowData,
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage
		});
		return
	};
	fn.quitEditMode = function(objP) {
		var that = this,
			old = false,
			silent = false,
			fireOnly = false,
			SM = this.options.selectionModel,
			evt = undefined;
		if (objP) {
			old = objP.old;
			silent = objP.silent;
			fireOnly = objP.fireOnly;
			evt = objP.evt
		}
		var $td = old ? this.$td_edit_old : this.$td_edit;
		if ($td) {
			var rowIndx, rowIndxPage, colIndx, column, dataIndx, setNull = function() {
					if (old) {
						that.$td_edit_old = null
					} else {
						that.$td_edit = null
					}
				};
			if (!old) {
				this.disableSelection()
			}
			var obj = this.getCellIndices({
				$td: $td
			});
			if (obj && obj.rowIndx != null) {
				rowIndx = obj.rowIndx;
				rowIndxPage = rowIndx - this.offsetRowIndx, colIndx = obj.colIndx;
				column = this.colModel[colIndx];
				dataIndx = column.dataIndx
			} else {
				setNull();
				return
			} if (!old && !fireOnly) {
				if (SM.type == "cell") {
					$td.attr("tabindex", "0").focus()
				} else {
					if (SM.type == "row") {
						$td.parent("tr.pq-grid-row").attr("tabindex", "0").focus()
					}
				}
			}
			if (!silent && !old) {
				this._trigger("quitEditMode", evt, {
					$td: $td,
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage,
					colIndx: colIndx,
					column: column,
					dataIndx: dataIndx,
					rowData: this.data[rowIndxPage]
				})
			}
			if (!fireOnly) {
				this._removeCellRowOutline(objP);
				setNull()
			}
		}
	};
	fn.getData = function() {
		return this.data
	};
	fn.getViewPortRowsIndx = function() {
		return {
			beginIndx: this.init,
			endIndx: this["final"]
		}
	};
	fn.getRowIndxOffset = function() {
		return this.rowIndxOffset
	};
	fn.selectCell = function(obj) {
		var rowIndx = obj.rowIndx,
			colIndx = obj.colIndx,
			evt = obj.evt;
		if (evt && (evt.type == "keydown" || evt.type == "keypress")) {
			if (this.iCells.replace(obj) == false) {
				return false
			}
		} else {
			if (this.iCells.add(obj) == false) {
				return false
			}
		} if (evt != null) {}
		return true
	};
	fn._setGridFocus = function() {
		var that = this;
		var focusReq = true;
		window.setTimeout(function() {
			if (that.$td_edit == null) {
				if (focusReq) {
					focusReq = false
				}
			}
		}, 0)
	};
	fn.getEditCell = function() {
		if (this.$td_edit) {
			return {
				$td: this.$td_edit,
				$cell: this.$div_focus
			}
		} else {
			return null
		}
	};
	fn.editCell = function(obj) {
		var $td = this.getCell(obj);
		if ($td != null && $td.length > 0) {
			this._editCell($td);
			return $td
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
		var offset = this.rowIndxOffset,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			colIndx = this.getFirstEditableColIndx({
				rowIndx: rowIndx
			});
		if (colIndx != -1) {
			this.scrollRow({
				rowIndxPage: rowIndxPage
			});
			var $td = this._bringCellToView({
				colIndx: colIndx,
				rowIndxPage: rowIndxPage
			});
			if ($td && $td.length > 0) {
				this._editCell($td)
			}
		}
	};
	fn._editCell = function($td) {
		var that = this;
		var obj = that.getCellIndices({
			$td: $td
		});
		var rowIndxPage = obj.rowIndxPage,
			offset = this.rowIndxOffset,
			rowIndx = rowIndxPage + offset,
			colIndx = obj.colIndx,
			column = this.colModel[colIndx],
			ceditor = column.editor,
			geditor = this.options.editor,
			editor = ceditor ? $.extend({}, geditor, ceditor) : geditor,
			rowData = that.data[rowIndxPage],
			contentEditable = false,
			dataIndx = column.dataIndx;
		if (this.$td_edit) {
			if (this.$td_edit[0] == $td[0]) {
				return false
			} else {
				this.$td_edit_old = this.$td_edit;
				this.quitEditMode({
					fireOnly: true
				})
			}
		}
		this.$td_edit = $td;
		this._generateCellRowOutline({
			$td: $td
		});
		var $cell = this.$div_focus.addClass("pq-editor-border-edit");
		if (column.align == "right") {
			$cell.addClass("pq-align-right")
		} else {
			if (column.align == "center") {
				$cell.addClass("pq-align-center")
			} else {
				$cell.addClass("pq-align-left")
			}
		}
		var cellWd = $cell.width() - 8,
			cellData = rowData[dataIndx],
			inp;
		var edtype = editor.type,
			edSelect = editor.select,
			edcls = editor.cls ? editor.cls : "",
			cls = "pq-editor-focus " + edcls,
			cls2 = cls + " pq-cell-editor ",
			attr = editor.attr ? editor.attr : "",
			edstyle = editor.style,
			edstyle = (edstyle ? edstyle : ""),
			styleCE = edstyle ? ("style='" + edstyle + "'") : "",
			style = "style='width:" + cellWd + "px;" + edstyle + "'",
			styleChk = edstyle ? ("style='" + edstyle + "'") : "";
		if (typeof edtype == "function") {
			inp = edtype.call(that.element, {
				$cell: $cell,
				cellData: cellData,
				rowData: rowData,
				cls: cls,
				dataIndx: dataIndx,
				data: editor.data,
				column: column
			})
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
								options = options.call(that.element, {
									column: column,
									rowData: rowData
								})
							}
							var attrSelect = [attr, " class='", cls2, "' ", style, " name='", dataIndx, "'"].join("");
							inp = $.paramquery.select({
								options: options,
								attr: attrSelect,
								labelIndx: editor.labelIndx,
								valueIndx: editor.valueIndx,
								groupIndx: editor.groupIndx
							})
						} else {
							inp = "<input class='" + cls2 + "' " + attr + " " + style + " type=text name='" + dataIndx + "' />"
						}
					}
					$cell.html(inp);
					$cell.children().val(cellData)
				} else {
					inp = "<div contenteditable='true' tabindx='0' " + styleCE + " " + attr + " class='pq-grid-editor-default " + cls + "'></div>";
					$cell.html(inp);
					$cell.children().html(cellData);
					contentEditable = true
				}
			}
		}
		var that = this;
		if (that.$td_edit != null) {
			var $cell = that.$div_focus,
				$focus = $cell.children(".pq-editor-focus");
			$focus.focus();
			$focus.bind("keydown", function(evt) {
				that.iKeyNav._bodyKeyPressDownInEdit(evt)
			});
			if (that._trigger("cellEditFocus", null, {
				$cell: $cell,
				$editor: $focus,
				dataIndx: dataIndx,
				column: column,
				rowIndx: rowIndx,
				rowData: rowData
			}) == false) {
				return false
			}
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
		}
		if (that.$td_edit_old) {
			that.quitEditMode({
				old: true
			})
		}
	};
	fn.getRow = function(obj) {
		var rowIndxPage = obj.rowIndxPage,
			rowIndx = obj.rowIndx,
			offset = this.rowIndxOffset,
			DM = this.options.dataModel;
		var $tr, $tbl = this.$tbl;
		if ($tbl != undefined) {
			var $tbody = $tbl.children("tbody");
			if (rowIndxPage != null) {
				$tr = $tbody.children("tr[pq-row-indx=" + rowIndxPage + "]")
			} else {
				if (rowIndx != null) {
					$tr = $tbody.children("tr[pq-row-indx=" + (rowIndx - offset) + "]")
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
			$tbl = this.$tbl,
			$td, thisOptions = this.options,
			freezeCols = thisOptions.freezeCols;
		if ($tbl != undefined) {
			if ($tbl.length > 1) {
				if (colIndx >= freezeCols) {
					$tbl = $($tbl[1])
				} else {
					$tbl = $($tbl[0])
				}
			}
			var $td = $tbl.children().children("tr[pq-row-indx=" + rowIndxPage + "]").children("td[pq-col-indx=" + colIndx + "]")
		}
		if ($td.length == 0 || $td[0].style.visibility == "hidden") {
			return null
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
			var $td = $tbl.children().children("tr:last").children("td[pq-col-indx=" + colIndx + "]")
		}
		if ($td.length == 0 || $td[0].style.visibility == "hidden") {
			return null
		}
		return $td
	};
	fn.getEditCellData = function() {
		if (this.$td_edit) {
			var obj = this.getCellIndices({
				$td: this.$td_edit
			});
			return this._getEditCellData(obj)
		} else {
			return null
		}
	};
	fn._getEditCellData = function(obj) {
		if (obj.colIndx == undefined || obj.rowIndxPage == undefined) {
			throw ("colIndx, rowIndxpage N/A")
		}
		var colIndx = obj.colIndx,
			rowIndxPage = obj.rowIndxPage,
			rowIndx = (obj.rowIndx != null) ? obj.rowIndx : rowIndxPage + this.rowIndxOffset,
			column = (obj.column) ? obj.column : this.colModel[colIndx],
			ceditor = column.editor,
			geditor = this.options.editor,
			editor = ceditor ? $.extend({}, geditor, ceditor) : geditor,
			dataIndx = column.dataIndx,
			$cell = (obj.$cell) ? obj.$cell : this.$div_focus,
			dataCell;
		var getData = editor.getData;
		if (typeof getData == "function") {
			dataCell = editor.getData.call(this.element, {
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
		var rowIndxPage = $tr.attr("pq-row-indx");
		if (rowIndxPage == null) {
			return {
				rowIndxPage: null,
				colIndx: null
			}
		}
		rowIndxPage = parseInt(rowIndxPage);
		var colIndx = $td.attr("pq-col-indx");
		if (colIndx == null) {
			return {
				rowIndxPage: rowIndxPage,
				colIndx: null
			}
		}
		colIndx = parseInt(colIndx);
		return {
			rowIndxPage: rowIndxPage,
			rowIndx: rowIndxPage + this.rowIndxOffset,
			colIndx: colIndx,
			dataIndx: this.colModel[colIndx].dataIndx
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
	fn.addClass = function(objP) {
		var rowIndx = objP.rowIndx,
			dataIndx = objP.dataIndx,
			objcls = objP.cls,
			offset = this.rowIndxOffset,
			rowData = this.getRowData(objP);
		if (!rowData) {
			return
		}
		if (rowIndx == null) {
			rowIndx = this.getRowIndx({
				rowData: rowData
			}).rowIndx
		}
		var classes = objcls.split(" ");
		for (var i = 0; i < classes.length; i++) {
			var cls = classes[i];
			if (dataIndx == null && this.hasClass({
				rowData: rowData,
				cls: cls
			}) === false) {
				var str = rowData.pq_rowcls;
				if (str) {
					rowData.pq_rowcls = $.trim(str) + " " + cls
				} else {
					rowData.pq_rowcls = cls
				} if (rowIndx != null && objP.refresh !== false) {
					var $tr = this.getRow({
						rowIndxPage: (rowIndx - offset)
					});
					if ($tr) {
						$tr.addClass(cls)
					}
				}
			} else {
				if (this.hasClass({
					rowData: rowData,
					dataIndx: dataIndx,
					cls: cls
				}) === false) {
					var objCls = rowData.pq_cellcls;
					if (objCls) {
						var oldCls = objCls[dataIndx];
						if (oldCls) {
							objCls[dataIndx] = $.trim(oldCls) + " " + cls
						} else {
							objCls[dataIndx] = cls
						}
					} else {
						var objCls = {};
						objCls[dataIndx] = cls;
						rowData.pq_cellcls = objCls
					} if (rowIndx != null && objP.refresh !== false) {
						var $td = this.getCell({
							rowIndxPage: (rowIndx - offset),
							dataIndx: dataIndx
						});
						if ($td) {
							$td.addClass(cls)
						}
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
			pq_cellcls = (dataIndx != null && rowData) ? rowData.pq_cellcls : null,
			rowClass = rowData ? rowData.pq_rowcls : null;
		if (rowData == null) {
			return
		}
		if (rowIndx == null) {
			rowIndx = this.getRowIndx({
				rowData: rowData
			}).rowIndx
		}
		if (dataIndx == null) {
			if (rowClass) {
				rowData.pq_rowcls = this._removeClass(rowClass, cls)
			}
			if (rowIndx != null && objP.refresh !== false) {
				var $tr = this.getRow({
					rowIndx: rowIndx
				});
				if ($tr) {
					$tr.removeClass(cls)
				}
			}
		} else {
			if (pq_cellcls) {
				var cellClass = pq_cellcls[dataIndx];
				if (cellClass) {
					rowData.pq_cellcls[dataIndx] = this._removeClass(cellClass, cls)
				}
				if (rowIndx != null && objP.refresh !== false) {
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
		if (str) {
			var arr = str.split(" "),
				arr2 = str2.split(" "),
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
				_found = false;
			if (data) {
				for (var i = 0, len = data.length; i < len; i++) {
					if (data[i] == rowData) {
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
					rowIndxPage: rowIndxPage,
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
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "celleditkeydown", function(evt, ui) {
			return self.filterKeys(evt, ui)
		})
	};
	var _pKeyNav = cKeyNav.prototype;
	_pKeyNav._incrRowIndx = function(rowIndxPage, noRows) {
		var that = this.that,
			newRowIndx = rowIndxPage,
			noRows = (noRows == null) ? 1 : noRows,
			data = that.data,
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
			data = that.data,
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
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.data),
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
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.data);
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
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.data);
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
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.data);
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
			lastRowIndxPage = that._getLastVisibleRowIndxPage(that.data);
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
			firstRowIndxPage = that._getFirstVisibleRowIndxPage(that.data);
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
	_pKeyNav._saveAndMove = function(obj, evt) {
		var that = this.that,
			thisOptions = this.options,
			SM = thisOptions.selectionModel;
		if (that.saveEditCell({
			evt: evt
		}) == false) {
			evt.preventDefault();
			return false
		}
		if (obj == null) {
			evt.preventDefault();
			return false
		}
		var rowIndxPage = obj.rowIndxPage,
			colIndx = obj.colIndx;
		if (SM.type == "row") {
			that.setSelection(null);
			that.setSelection({
				rowIndxPage: rowIndxPage
			});
			that._bringCellToView({
				rowIndxPage: rowIndxPage,
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
				that._bringCellToView({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
				})
			}
		}
		var $td2 = that.getCell({
			rowIndxPage: rowIndxPage,
			colIndx: colIndx
		});
		if ($td2 && $td2.length > 0) {
			that._editCell($td2)
		}
		evt.preventDefault();
		return false
	};
	_pKeyNav._bodyKeyPressDownInEdit = function(evt) {
		var that = this.that;
		if (!that.$td_edit) {
			return
		}
		var thisOptions = this.options,
			offset = that.rowIndxOffset,
			keyCodes = $.ui.keyCode,
			CM = that.colModel,
			gEM = thisOptions.editModel,
			$td = $(that.$td_edit[0]),
			obj = that.getCellIndices({
				$td: $td
			}),
			rowIndxPage = obj.rowIndxPage,
			rowIndx = rowIndxPage + offset,
			colIndx = obj.colIndx,
			column = CM[colIndx],
			cEM = column.editModel,
			EM = cEM ? $.extend({}, gEM, cEM) : gEM;
		if (that._trigger("cellEditKeyDown", evt, {
			rowData: that.data[rowIndxPage],
			$cell: that.$div_focus,
			rowIndx: rowIndx,
			rowIndxPage: rowIndxPage,
			colIndx: colIndx,
			$td: $td,
			dataIndx: column.dataIndx,
			column: column
		}) == false) {
			return false
		}
		if (evt.keyCode == keyCodes.TAB) {
			var obj;
			if (evt.shiftKey) {
				obj = this._decrEditIndx(rowIndxPage, colIndx)
			} else {
				obj = this._incrEditIndx(rowIndxPage, colIndx)
			}
			return this._saveAndMove(obj, evt)
		} else {
			if (evt.keyCode == EM.saveKey) {
				var obj = this._incrEditIndx(rowIndxPage, colIndx);
				return this._saveAndMove(obj, evt)
			} else {
				if (evt.keyCode == keyCodes.ESCAPE) {
					that.quitEditMode({
						evt: evt
					});
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
	_pKeyNav.filterKeys = function(evt, ui) {
		var that = this.that,
			FK = this.options.editModel.filterKeys;
		var column = ui.column,
			dataType = column.dataType,
			cEM = column.editModel;
		if (cEM && cEM.filterKeys != undefined) {
			FK = cEM.filterKeys
		}
		if (!FK) {
			return
		}
		if (dataType == "float" || dataType == "integer") {
			var $this = $(evt.originalEvent.target),
				nodeName = $this[0].nodeName.toLowerCase(),
				re = (dataType == "integer") ? /^[\-]?[0-9]*$/ : /^[\-]?[0-9]*\.?[0-9]*$/;
			var valsarr = ["input", "textarea", "select"],
				byVal = "text";
			if ($.inArray(nodeName, valsarr) != -1) {
				byVal = "val"
			}
			var oldVal = $this[byVal]();
			window.setTimeout(function() {
				var newVal = $this[byVal]();
				if (re.test(newVal) == false) {
					$this[byVal](oldVal)
				}
			}, 0)
		}
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
	_pKeyNav.createTextbox = function() {
		var $text = $("textarea#pq-grid-excel");
		if ($text.length == 0) {
			$text = $("<textarea id='pq-grid-excel' />").appendTo(document.body)
		}
	};
	_pKeyNav._bodyKeyPressDown = function(evt) {
		var that = this.that,
			self = this,
			cellLastSel, rowLastSel, offset = that.rowIndxOffset,
			thisOptions = this.options,
			CM = that.colModel,
			SM = thisOptions.selectionModel,
			rowIndx, colIndx;
		var keyCodes = $.ui.keyCode;
		if (that.$td_edit) {
			that.$td_edit.find(".pq-cell-focus").focus();
			return
		} else {
			if (SM.type == "row") {
				if (evt.ctrlKey) {
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
					rowData: that.data[rowIndxPage],
					rowIndx: rowIndx,
					rowIndxPage: rowIndxPage
				}) == false) {
					return false
				}
			} else {
				if (SM.type == "cell") {
					if (evt.ctrlKey) {
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
						rowData: that.data[rowIndxPage],
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
		} if (evt.keyCode == keyCodes.LEFT) {
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
			if (evt.keyCode == keyCodes.RIGHT) {
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
				if (evt.keyCode == keyCodes.UP) {
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
					if (evt.keyCode == keyCodes.DOWN) {
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
						if (evt.keyCode == keyCodes.PAGE_DOWN || evt.keyCode == keyCodes.SPACE) {
							var objPageDown = this.pageDown();
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
							if (evt.keyCode == keyCodes.PAGE_UP) {
								var objPageUp = this.pageUp();
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
								if (evt.keyCode == keyCodes.HOME) {
									if (SM.type == "row" || evt.ctrlKey) {
										rowIndx = that._getFirstVisibleRowIndxPage(that.data) + offset;
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
									if (evt.keyCode == keyCodes.END) {
										if (SM.type == "row" || evt.ctrlKey) {
											rowIndx = that._getLastVisibleRowIndxPage(that.data) + offset;
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
										if (evt.keyCode == keyCodes.ENTER) {
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
															that._editCell($td)
														}
													}
												}
											}
											evt.preventDefault();
											return
										} else {
											if (evt.ctrlKey && evt.keyCode == "65") {
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
	_pKeyNav.pageDown = function() {
		var that = this.that,
			rowIndxPage = this.incrPageSize().rowIndxPage,
			calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
		if (calcCurPos == null) {
			return
		}
		var soptions = that.$vscroll.pqScrollBar("option"),
			old_cur_pos = soptions.cur_pos,
			num_eles = soptions.num_eles;
		if (old_cur_pos < num_eles - 1) {
			that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
		}
		return {
			rowIndxPage: rowIndxPage,
			curPos: calcCurPos
		}
	};
	_pKeyNav.pageUp = function() {
		var that = this.that,
			rowIndxPage = this.decrPageSize().rowIndxPage,
			calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
		if (calcCurPos == null) {
			return
		}
		var soptions = that.$vscroll.pqScrollBar("option"),
			old_cur_pos = soptions.cur_pos,
			num_eles = soptions.num_eles;
		if (old_cur_pos > 0) {
			that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll")
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
		var wdSB = this._getScollBarVerticalWidth();
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
		if (!options.flexWidth) {
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
			outerWidths = this.outerWidths,
			contWd = this.$cont[0].offsetWidth - this._getScollBarVerticalWidth();
		tblWd = 0;
		if (numberCell.show) {
			tblWd += this.numberCell_outerWidth
		}
		for (var i = 0; i < model.length; i++) {
			var column = model[i];
			if (!column.hidden) {
				tblWd += outerWidths[i]
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
				wd += outerWidths[i];
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
	fn._getScollBarVerticalWidth = function() {
		var wdSB = 17,
			$vscroll = this.$vscroll;
		if (this.init == null || $vscroll.css("visibility") == "hidden" || this.options.flexHeight || $vscroll.css("display") == "none") {
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
			data = (GM) ? this.dataGM : this.data;
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
			init = freezeRows,
			_final = 0,
			visible = 0,
			lastFrozenRow = null,
			initFound = false,
			finalFound = false,
			nesting = (this.iHierarchy) ? true : false,
			DTMoff = this.options.detailModel.offset,
			htTotal = 0,
			rowHeight = 22,
			htCont = nesting ? this.$cont[0].offsetHeight : undefined;
		if (data == null || dataLength == 0) {
			return {
				init: lastFrozenRow,
				_final: lastFrozenRow,
				tvRows: tvRows
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
		this.lastFrozenRow = lastFrozenRow;
		if (dataLength < freezeRows) {
			return {
				init: lastFrozenRow,
				_final: lastFrozenRow,
				tvRows: tvRows
			}
		}
		rows = rows - tvRows;
		for (var i = freezeRows, len = dataLength; i < len; i++) {
			var rowData = data[i],
				hidden = rowData.pq_hidden;
			if (!initFound) {
				if (hidden) {
					init++
				} else {
					if (visible == cur_pos) {
						initFound = true;
						_final = init;
						visible = 0
					} else {
						init++;
						visible++
					}
				}
			} else {
				if (!finalFound) {
					if (hidden) {
						_final++
					} else {
						if (visible == rows) {
							finalFound = true
						} else {
							_final++;
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
		if (init >= dataLength) {
			init = dataLength - 1
		}
		if (_final < init) {
			_final = init
		}
		return {
			init: init,
			_final: _final,
			tvRows: tvRows
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
		if (options.flexHeight) {
			return
		}
		var ht = (this.element.height() - ((options.showTop) ? this.$top[0].offsetHeight : 0) - this.$bottom[0].offsetHeight);
		this.$grid_inner.height(ht + "px")
	};
	fn._setRightGridHeight = function() {
		var options = this.options;
		var ht_hd = this.$header[0].offsetHeight;
		this.$header_o.height(ht_hd - 2);
		if (options.flexHeight) {
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
	fn.setGridHeightFromTable = function() {
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
		var wdSB = this._getScollBarVerticalWidth();
		if (this.$tbl && this.$tbl[0] && this.$tbl[0].scrollWidth > 0) {
			tbl_width = this.$tbl[0].scrollWidth;
			this.element.width((tbl_width + wdSB) + "px")
		} else {
			tbl_width = calcWidthCols.call(this, -1, this.colModel.length);
			this.element.width((tbl_width) + "px")
		}
	};
	fn._setRightGridWidth = function() {};
	fn._bufferObj_getInit = function() {
		return this.init
	};
	fn._bufferObj_getFinal = function() {
		return this["final"]
	};
	fn._bufferObj_minRowsPerGrid = function() {
		var ht = this.$cont[0].offsetHeight;
		return Math.ceil(ht / this.rowHeight)
	};
	fn._calcCurPosFromRowIndxPage = function(rowIndxPage) {
		var thisOptions = this.options,
			GM = thisOptions.groupModel,
			data = GM ? this.dataGM : this.data,
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
	fn._bufferObj_calcInitFinal = function() {
		var thisOptions = this.options,
			freezeRows = thisOptions.freezeRows,
			flexHeight = thisOptions.flexHeight,
			GM = thisOptions.groupModel,
			GMtrue = (GM) ? true : false,
			data = GMtrue ? this.dataGM : this.data,
			TVM = thisOptions.treeModel;
		if (data == null || data.length == 0) {
			var objTVR = this._getTotalVisibleRows(cur_pos, freezeRows, noRowsInView, data);
			this.totalVisibleRows = objTVR.tvRows;
			this.init = objTVR.init;
			this["final"] = objTVR._final
		} else {
			var options = this.$vscroll.pqScrollBar("option"),
				cur_pos = parseInt(options.cur_pos);
			if (isNaN(cur_pos) || cur_pos < 0) {
				throw ("cur_pos NA");
				this.init = 0
			}
			this.scrollCurPos = cur_pos;
			var noRowsInView = this._bufferObj_minRowsPerGrid();
			this.pageSize = noRowsInView;
			var objTVR = this._getTotalVisibleRows(cur_pos, freezeRows, noRowsInView, data);
			this.totalVisibleRows = objTVR.tvRows;
			this.init = objTVR.init;
			if (flexHeight) {
				this["final"] = data.length - 1
			} else {
				this["final"] = objTVR._final
			}
		}
	};
	fn._bufferObj_calcInitFinalH = function() {
		var cur_pos = parseInt(this.$hscroll.pqScrollBar("option", "cur_pos")),
			options = this.options,
			freezeCols = parseInt(options.freezeCols),
			flexWidth = options.flexWidth,
			virtualX = options.virtualX,
			initH = freezeCols,
			indx = 0,
			CM = this.colModel,
			outerWidths = this.outerWidths,
			CMLength = CM.length;
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
				wdCont = this.$cont[0].offsetWidth - this._getScollBarVerticalWidth();
			for (var i = initH; i < CMLength; i++) {
				var column = CM[i];
				if (!column.hidden) {
					var wdCol = outerWidths[i];
					if (!wdCol) {
						throw ("width N/A")
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
			options = this.options,
			columnBorders = options.columnBorders,
			numberCell = options.numberCell,
			outerWidths = this.outerWidths,
			CM = this.colModel;
		if (colIndx1 == -1) {
			if (numberCell.show) {
				if (_direct) {
					wd += parseInt(numberCell.width) + 1
				} else {
					wd += this.numberCell_outerWidth
				}
			}
			colIndx1 = 0
		}
		if (_direct) {
			for (var i = colIndx1; i < colIndx2; i++) {
				var column = CM[i],
					hidden = column.hidden;
				if (!hidden) {
					wd += parseInt(column.width) + (columnBorders ? 1 : 0)
				}
			}
		} else {
			for (var i = colIndx1; i < colIndx2; i++) {
				if (!CM[i].hidden) {
					wd += outerWidths[i]
				}
			}
		}
		return wd
	};
	$.paramquery.pqgrid.calcWidthCols = calcWidthCols;
	fn._calcHeightRows = function(rowIndx1, rowIndx2) {
		var ht = 0;
		var row = rowIndx1;
		do {
			if (row >= rowIndx2) {
				break
			}
			var $tr = this.getRow({
				rowIndxPage: row
			});
			if ($tr && $tr[0]) {
				ht += $tr[0].offsetHeight
			}
			row++
		} while (1 == 1);
		return ht
	};
	fn._calcRightEdgeCol = function(colIndx) {
		var wd = 0,
			cols = 0,
			CM = this.colModel,
			hidearrHS = this.hidearrHS,
			outerWidths = this.outerWidths,
			numberCell = this.options.numberCell;
		if (numberCell.show) {
			wd += this.numberCell_outerWidth;
			cols++
		}
		for (var i = 0; i <= colIndx; i++) {
			if (!CM[i].hidden && hidearrHS[i] == false) {
				wd += outerWidths[i];
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
		var $target = $(evt.currentTarget);
		this.$cl = $("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		this.$clleft = $("<div class='pq-grid-drag-bar'></div>").appendTo(this.$grid_inner);
		var indx = parseInt($target.attr("pq-grid-col-indx"));
		var ht = this.$grid_inner.outerHeight();
		this.$cl.height(ht);
		this.$clleft.height(ht);
		var ele = $("td[pq-grid-col-indx=" + indx + "]", this.$header)[0];
		var lft = ele.offsetLeft + ((indx > this.options.freezeCols) ? parseInt(this.$header[1].offsetLeft) : 0);
		this.$clleft.css({
			left: lft
		});
		lft = lft + ele.offsetWidth;
		this.$cl.css({
			left: lft
		})
	};
	fn._setDragLimits = function(indx) {
		var that = this,
			thisOptions = this.options,
			numberCell = thisOptions.numberCell;
		var $head = that.$header_left;
		if (indx >= thisOptions.freezeCols) {
			$head = that.$header_right
		}
		var $pQuery_drag = $head.find("div.pq-grid-col-resize-handle[pq-grid-col-indx=" + indx + "]");
		var $pQuery_col = $head.find("td[pq-grid-col-indx='" + indx + "']");
		var cont_left = $pQuery_col.offset().left + thisOptions.minWidth;
		if (indx == -1) {
			cont_left = $pQuery_col.offset().left + numberCell.minWidth
		}
		var wdSB = 17;
		if (thisOptions.flexHeight || this.$vscroll.css("visibility") == "hidden") {
			wdSB = 0
		}
		var cont_right = that.$cont.offset().left + that.$cont[0].offsetWidth - wdSB + 20;
		$pQuery_drag.draggable("option", "containment", [cont_left, 0, cont_right, 0])
	};
	fn._getOrderIndx = function(indx) {
		var columnOrder = this.options.columnOrder;
		if (columnOrder != null) {
			return columnOrder[indx]
		} else {
			return indx
		}
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
			if (_hidden == true) {
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
				if (typeof dataIndx == "number") {
					return "ARRAY"
				}
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
		var obj = this.nestedCols(this.options.colModel);
		this.colModel = obj.colModel;
		this.depth = obj.depth;
		this.getHeadersCells();
		this.assignRowSpan();
		this._refreshColumnWidths();
		this._computeOuterWidths()
	};
	fn._refreshWidthsAutoFit = function() {
		var thisOptions = this.options,
			CM = this.colModel,
			$cont = this.$cont,
			CMLength = CM.length,
			minWidth = thisOptions.minWidth;
		var wdAllCols = calcWidthCols.call(this, -1, CMLength, true);
		var wdCont = $cont[0].offsetWidth - this._getScollBarVerticalWidth();
		if (wdAllCols != wdCont) {
			var diff = wdAllCols - wdCont,
				availWds = [];
			for (var i = 0; i < CMLength; i++) {
				var column = CM[i],
					hidden = column.hidden;
				if (!hidden) {
					var colMinWidth = column.minWidth,
						colMinWidth = (colMinWidth ? parseInt(colMinWidth) : minWidth),
						availWd = parseInt(column.width) - colMinWidth;
					if (availWd > 0 || diff < 0) {
						availWds.push({
							availWd: availWd,
							colIndx: i
						})
					}
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
					colWd = column.width;
				if (availWd > part) {
					var wd = colWd - part;
					diff = diff - part;
					column.width = wd
				} else {
					var wd = colWd - availWd;
					diff = diff - availWd;
					column.width = wd
				}
			}
		}
	};
	fn._refreshColumnWidths = function() {
		var thisOptions = this.options,
			numberCell = thisOptions.numberCell,
			freezeCols = thisOptions.freezeCols,
			flexWidth = thisOptions.flexWidth,
			columnBorders = thisOptions.columnBorders,
			CM = this.colModel,
			SM = thisOptions.scrollModel,
			SMLastColumn = SM.lastColumn,
			autoFit = SM.autoFit,
			$cont = this.$cont,
			CMLength = CM.length,
			minWidth = thisOptions.minWidth;
		if (numberCell.show) {
			if (numberCell.width < numberCell.minWidth) {
				numberCell.width = numberCell.minWidth
			}
		}
		for (var i = 0; i < CMLength; i++) {
			var column = CM[i],
				hidden = column.hidden;
			if (hidden) {
				continue
			}
			var colWidth = column.width,
				colMinWidth = column.minWidth,
				colMinWidth = (colMinWidth ? parseInt(colMinWidth) : minWidth);
			if (colWidth != undefined) {
				var wd = parseInt(colWidth);
				if (wd < colMinWidth) {
					wd = colMinWidth
				}
				column.width = wd
			} else {
				column.width = colMinWidth
			}
		}
		if ($cont && flexWidth == false) {
			if (autoFit) {
				this._refreshWidthsAutoFit()
			}
			if (SMLastColumn == "auto") {
				var wdCont = $cont[0].offsetWidth - this._getScollBarVerticalWidth();
				var wd1 = calcWidthCols.call(this, -1, freezeCols, true);
				var rem = wdCont - wd1,
					_found = false,
					lastColIndx = this._getLastVisibleColIndx();
				if (lastColIndx == null) {
					return
				}
				var lastColumn = CM[lastColIndx],
					lastColWd = parseInt(lastColumn.width),
					lastColMinWidth = lastColumn.minWidth,
					lastColMinWidth = (lastColMinWidth ? parseInt(lastColMinWidth) : minWidth);
				for (var i = CMLength - 1; i >= freezeCols; i--) {
					var column = CM[i];
					if (column.hidden) {
						continue
					}
					var outerWd = column.width + (columnBorders ? 1 : 0);
					rem = rem - outerWd;
					if (rem < 0) {
						_found = true;
						if (lastColWd + rem >= lastColMinWidth) {
							lastColumn.width = lastColWd + rem
						} else {
							var newWidth = lastColWd + outerWd + rem;
							if (newWidth >= lastColMinWidth) {
								lastColumn.width = newWidth
							} else {}
						}
						break
					}
				}
				if (!_found) {
					if (lastColWd + rem >= lastColMinWidth) {
						lastColumn.width = lastColWd + rem
					} else {
						lastColumn.width = lastColMinWidth
					}
				}
			}
		}
	};
	fn._createHeader = function() {
		var that = this,
			thisOptions = this.options,
			freezeCols = parseInt(thisOptions.freezeCols),
			numberCell = thisOptions.numberCell,
			thisColModel = this.colModel,
			outerWidths = this.outerWidths,
			CMLength = thisColModel.length,
			depth = this.depth,
			virtualX = thisOptions.virtualX,
			initH = that.initH,
			finalH = that.finalH,
			columnBorders = thisOptions.columnBorders,
			headerCells = this.headerCells,
			hidearrHS1 = [],
			hidearrHS = this.hidearrHS,
			$header = this.$header;
		if (thisOptions.showHeader === false) {
			$header.empty();
			this.$header_o.css("display", "none");
			return
		} else {
			this.$header_o.css("display", "")
		}
		var buffer = ["<table class='pq-grid-header-table' cellpadding=0 cellspacing=0>"];
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
				var wd = outerWidths[col];
				buffer.push("<td style='width:" + wd + "px;'></td>")
			}
			buffer.push("</tr>")
		}
		var const_cls = "pq-grid-col " + ((thisOptions.hwrap === false) ? " pq-wrap-text " : "");
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
				var column = headerCells[row][col],
					colSpan = column.colSpan,
					halign = column.halign,
					align = column.align,
					title = column.title,
					title = title ? title : "";
				if (row > 0 && column == headerCells[row - 1][col]) {
					continue
				} else {
					if (col > 0 && column == headerCells[row][col - 1]) {
						continue
					}
				} if (column.hidden) {
					continue
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
				var colIndx = "",
					dataIndx = "";
				if (column.colModel == null || column.colModel.length == 0) {
					colIndx = "pq-grid-col-indx='" + col + "'"
				}
				var rowIndxDD = "pq-row-indx=" + row;
				var colIndxDD = "pq-col-indx=" + col;
				buffer.push(["<td ", colIndx, " ", colIndxDD, " ", rowIndxDD, " ", dataIndx, " class='", cls, "' rowspan=", column.rowSpan, " colspan=", colSpan, ">                    <div class='pq-td-div'>", title, "<span class='pq-col-sort-icon'>&nbsp;</span></div></td>"].join(""))
			}
			buffer.push("</tr>")
		}
		this.ovCreateHeader(buffer, const_cls);
		buffer.push("</table>");
		var str = buffer.join("");
		$header.empty();
		$header.append(str);
		this.$tbl_header = $header.children("table");
		var $header_left = $($header[0]);
		var $header_right = $($header[1]);
		var wd = calcWidthCols.call(this, -1, freezeCols);
		$header_left.css({
			width: wd,
			zIndex: 1
		});
		if (!virtualX) {
			var lft = calcWidthCols.call(this, freezeCols, initH);
			$header_right.css({
				left: (-1 * lft) + "px"
			})
		}
		$header.click(function(evt) {
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
		});
		this._refreshResizeColumn(initH, finalH, thisColModel);
		this._trigger("refreshHeader", null, null)
	};
	fn.ovCreateHeader = function() {};
	fn._refreshResizeColumn = function(initH, finalH, model) {
		var that = this,
			options = this.options,
			FMficon = options.filterModel.ficon ? true : false,
			numberCell = options.numberCell,
			hd_ht = that.$header.height(),
			freezeCols = parseInt(options.freezeCols);
		if (numberCell.show && numberCell.resizable) {
			var $handle = $("<div pq-grid-col-indx='-1' class='pq-grid-col-resize-handle'>&nbsp;</div>").appendTo(that.$header_left);
			var pq_col = that.$header_left.find("td.pq-grid-number-col")[0];
			lft = parseInt(pq_col.offsetLeft) + (pq_col.offsetWidth - 10);
			$handle.css({
				left: lft,
				height: hd_ht
			})
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
				$head, pq_col, lftCol, lft;
			if ((column.resizable !== false) || ficon) {
				$head = that.$header_left;
				if (i >= freezeCols) {
					$head = that.$header_right
				}
				pq_col = $head.find("td[pq-grid-col-indx=" + i + "]")[0];
				lftCol = parseInt(pq_col.offsetLeft);
				lft = lftCol + (pq_col.offsetWidth - 5)
			}
			if (column.resizable !== false) {
				var $handle = $("<div pq-grid-col-indx='" + i + "' class='pq-grid-col-resize-handle'>&nbsp;</div>").appendTo($head);
				$handle.css({
					left: lft,
					height: hd_ht
				})
			}
			if (ficon) {
				var cFM = column.filterModel;
				var icon = "";
				if (cFM && cFM.on) {
					icon = "ui-state-error"
				}
				var lftIcon = lft - 12;
				if ((!column.halign && column.align == "right") || column.halign == "right") {
					lftIcon = lftCol
				}
				$("<div class='" + icon + " pq-g-ficon' pq-col-indx='" + i + "' tabindex=1><div class='ui-icon ui-icon-search'></div></div>").css({
					left: lftIcon,
					height: hd_ht
				}).appendTo($head)
			}
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
			column.width = newWidth
		}
		that._refresh();
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
	fn._refreshOtherTables = function() {
		return;
		var thisColModel = this.colModel,
			noColumns = thisColModel.length,
			freezeCols = this.options.freezeCols,
			columnBorders = this.options.columBorders;
		for (var i = 0; i < this.tables.length; i++) {
			var tblObj = this.tables[i];
			var $tbl = tblObj.$tbl,
				$tr = $tbl.find("tr:first");
			for (var col = 0; col < noColumns; col++) {
				var column = thisColModel[col],
					dataIndx = column.dataIndx;
				if (column.hidden) {
					var $td = $tr.find("td[pq-dataIndx='" + dataIndx + "']");
					if ($td.length > 1) {
						var $tds = $tbl.find("td[pq-dataIndx='" + dataIndx + "']").remove();
						tblObj.$tds.add($tds)
					}
				} else {
					if (this.hidearrHS[col]) {
						var $td = $tr.find("td[pq-dataIndx='" + dataIndx + "']");
						if ($td.css("visibility") != "hidden") {}
					}
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
				if (cellSelection) {
					cls = cls + " pq-cell-select"
				}
				var str = "<td class='" + cls + "' style='" + strStyle + "' pq-col-indx='" + col + "'>				" + this.iGenerateView._renderCell(objRender) + "</td>";
				buffer.push(str)
			}
			for (var k = 0; k < hidearrHS1.length; k++) {
				var col = hidearrHS1[k];
				var column = thisColModel[col];
				objRender.column = column;
				objRender.colIndx = col;
				var strStyle = "";
				strStyle += "visibility:hidden;";
				var cls = const_cls;
				if (column.align == "right") {
					cls += " pq-align-right"
				} else {
					if (column.align == "center") {
						cls += " pq-align-center"
					}
				}
				var str = "<td class='" + cls + "' style='" + strStyle + "' pq-col-indx='" + col + "'>				" + this.iGenerateView._renderCell(objRender) + "</td>";
				buffer.push(str)
			}
		}
	};
	$.widget("paramquery._pqGrid", fn);
	$.measureTime = function(fn, nameofFunc) {
		var initTime = (new Date()).getTime();
		fn();
		var finalTime = (new Date()).getTime();
		var cnt = finalTime - initTime
	}
})(jQuery);
(function($) {
	var cClass = $.paramquery.cClass;
	var calcWidthCols = $.paramquery.pqgrid.calcWidthCols;
	var fn = {};

	function cMouseSelection(that) {
		this.that = that;
		var self = this,
			widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "cellmousedown", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._onCellMouseDown(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "rowmousedown", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._onRowMouseDown(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "cellmousemove", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._onCellMouseMoveSheet(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "rowmousemove", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._onRowMouseMoveSheet(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "beforetableview", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._beforeTableView(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "refresh", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self._onRefresh(evt, ui)
			}
		});
		$(document).bind("mouseup.cMouseSelection", function(evt, ui) {
			return self._onDocumentMouseUp(evt, ui)
		})
	}
	var _pMouseSelection = cMouseSelection.prototype;
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
			htCont = cont.offsetHeight - that._getScollBarHorizontalHeight() + 1,
			wdCont = cont.offsetWidth - that._getScollBarVerticalWidth() + 1,
			tdr = $tdr[0];
		if (htCont >= (tdr.offsetTop + tdr.offsetHeight)) {
			if (tdr.nodeName.toUpperCase() == "TD") {
				if (wdCont >= (tdr.offsetLeft + tdr.offsetWidth)) {
					return true
				}
			} else {
				return true
			}
		}
	};
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
			if (evt.ctrlKey && mode != "single") {
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
				that.iCells.add({
					rowIndx: rowIndx,
					colIndx: colIndx,
					setFirst: true
				})
			}
		}
		return true
	};
	_pMouseSelection._onRowMouseDown = function(evt, ui) {
		var that = this.that,
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
			if (evt.ctrlKey && mode != "single") {
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
					y1: evt.pageY
				};
				that.setSelection(null);
				that.iRows.add({
					rowIndx: rowIndx,
					setFirst: true
				})
			}
		}
		return true
	};
	_pMouseSelection._onCellMouseMoveSheet = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type,
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
			that.iCells.extendSelection({
				rowIndx: r2,
				colIndx: c2,
				evt: evt
			})
		}
	};
	_pMouseSelection._onRowMouseMoveSheet = function(evt, ui) {
		var that = this.that,
			SM = that.options.selectionModel,
			type = SM.type,
			mode = SM.mode;
		if (SM.swipe && this.mousedown) {
			var m = this.mousedown,
				vSBOptions = that.$vscroll.pqScrollBar("option"),
				num_eles = vSBOptions.num_eles,
				cur_pos = vSBOptions.cur_pos,
				initV = that.init,
				y1 = m.y1,
				y2 = evt.pageY;
			if (y2 - y1 > 22 && initV > 0) {
				var rowIndxPage = that.iKeyNav._decrRowIndx(initV);
				var calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
				if (calcCurPos == null) {
					return
				}
				that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll");
				m.y1 = y2
			} else {
				if (y1 - y2 > 22 && cur_pos < num_eles) {
					var rowIndxPage = that.iKeyNav._incrRowIndx(that.init);
					var calcCurPos = that._calcCurPosFromRowIndxPage(rowIndxPage);
					if (calcCurPos == null) {
						return
					}
					that.$vscroll.pqScrollBar("option", "cur_pos", calcCurPos).pqScrollBar("scroll");
					m.y1 = y2
				}
			}
		} else {
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
				that.iRows.extendSelection({
					rowIndx: r2,
					evt: evt
				})
			}
		}
	};
	_pMouseSelection._onDocumentMouseUp = function(evt, ui) {
		this.mousedown = null;
		return true
	};

	function cHierarchy(that) {
		var self = this;
		this.that = that;
		this.type = "detail";
		this.refreshComplete = true;
		this.detachView = false;
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "cellclick", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self.cellClick(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "cellkeydown", function(evt, ui) {
			if (evt.target == that.element[0] && evt.keyCode == $.ui.keyCode.ENTER) {
				return self.cellClick(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "refresh", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self.refresh(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "beforetableview", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self.beforeTableView(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "beforerefreshdata", function(evt, ui) {
			if (evt.target == that.element[0]) {
				return self.beforeRefreshData(evt, ui)
			}
		})
	}
	var _pHierarchy = cHierarchy.prototype;
	_pHierarchy.refresh = function(evt, ui) {
		var that = this.that,
			initDetail = that.options.detailModel.init,
			data = that.data;
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
					$grid = initDetail.call(that.element, {
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
			data = that.data;
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
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "headerkeydown", function(evt, ui) {
			if (self.belongs(evt)) {
				var $src = $(evt.originalEvent.target);
				if ($src.hasClass("pq-search-hd-field")) {
					return self.onKeyDown(evt, ui, $src)
				} else {
					return true
				}
			}
		});
		that.element.on(widgetEventPrefix + "createheader", function(evt, ui) {
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

		function attachEvent(ele) {
			if (ele.addEventListener) {
				ele.addEventListener("focus", handleFocus, true)
			} else {
				ele.onfocusin = function() {
					var e = window.event;
					e.target = e.srcElement;
					handleFocus(e)
				}
			}
		}
		var $eles = this.that.$header.find(".pq-grid-header-search");
		for (var i = 0; i < $eles.length; i++) {
			attachEvent($eles[i])
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
		$tbl_left.find(selector).css("visibility", "hidden");
		for (var i = 0; i < freezeCols; i++) {
			var column = CM[i];
			var dIndx = column.dataIndx;
			var selector = "*[name='" + dIndx + "']";
			$tbl_left.find(selector).css("visibility", "visible");
			$tbl_right.find(selector).css("visibility", "hidden")
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
				$tbl;
			if (i < freezeCols) {
				$tbl = $tbl_left
			} else {
				$tbl = $tbl_right
			}
			var $ele = $tbl.find("*[name='" + dataIndx + "']");
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
										strS = type.call(that, {
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
					if (value == null || value == "") {
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
						if (value == "" || value == null) {
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
			buffer.push("<td class='pq-grid-number-cell ui-state-default'><div class='pq-td-div'></div></td>")
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
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", "<div class='pq-td-div'>&nbsp;</div></td>"].join(""))
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
			var str = ["<td class='", cls, "' style='", strStyle, "' >", "<div class='pq-td-div'>", valCell, "</div></td>"].join("");
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
			buffer.push(["<td class='pq-grid-number-cell ui-state-default'>", "<div class='pq-td-div'>&nbsp;</div></td>"].join(""))
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
		that._refresh()
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
			data = that.data,
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
			that.$header.on("touchstart mousedown", "td.pq-grid-col", function(evt, ui) {
				if ($.support.touch) {
					if (evt.type == "touchstart") {
						var touch = evt.originalEvent.touches[0];
						if (touch.pq_composed) {
							return
						}
						evt.preventDefault();
						self.setDraggables(evt, ui);
						var evt2 = document.createEvent("UIEvent");
						evt2.initUIEvent("touchstart", true, true);
						evt2.view = window;
						evt2.altKey = false;
						evt2.ctrlKey = false;
						evt2.shiftKey = false;
						evt2.metaKey = false;
						evt2.touches = [{
							pageX: evt.pageX,
							pageY: evt.pageY,
							pq_composed: true
						}];
						evt2.changedTouches = [{
							pageX: evt.pageX,
							pageY: evt.pageY,
							pq_composed: true
						}];
						evt.target.dispatchEvent(evt2)
					}
				} else {
					if (!evt.pq_composed) {
						self.setDraggables(evt, ui);
						evt.pq_composed = true;
						var e = $.Event("mousedown", evt);
						$(evt.target).trigger(e)
					}
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
	_pDragColumns.refreshSorting = function() {
		var that = this.that;
		window.setTimeout(function() {
			var arr = that.$toolbar.sortable("toArray", {
				attribute: "sorter"
			});
			that.sorters = [];
			for (var i = 0, len = arr.length; i < len; i++) {
				that.sorters.push(eval("(" + arr[i] + ")"))
			}
			that.sortLocalData(that.sorters, that.data);
			that.refresh()
		}, 0)
	};
	_pDragColumns._setupDroppables = function($td) {
		var that = this.that,
			self = this;
		var objDrop = {
			hoverClass: "pq-drop-hover ui-state-highlight",
			tolerance: "pointer",
			drop: function(evt, ui) {
				if (that.dropPending) {
					return
				}
				var colIndxDrag = parseInt(ui.draggable.attr("pq-col-indx"), 10);
				var rowIndxDrag = parseInt(ui.draggable.attr("pq-row-indx"), 10);
				var colIndxDrop = parseInt($(this).attr("pq-col-indx"), 10);
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
					that._refresh();
					that.dropPending = false
				}, 0)
			}
		};
		var $tds = that.$header_left.find("td.pq-left-col");
		var $tds2 = that.$header_right.find("td.pq-right-col");
		$tds = $tds.add($tds2);
		$tds.each(function(i, td) {
			var $td = $(td);
			if ($td.hasClass("ui-droppable")) {
				return
			}
			$td.droppable(objDrop)
		});
		return;
		var column = that.getHeaderColumnFromTD($td);
		var dataIndx = column.dataIndx;
		if (that.getIndxInSorters(dataIndx) != -1) {
			if (that.$toolbar.hasClass("ui-droppable")) {
				that.$toolbar.droppable("destroy")
			}
			return
		}
		that.$toolbar.droppable({
			hoverClass: "pq-drop-hover ui-state-highlight",
			tolerance: "pointer",
			drop: function(evt, ui) {
				var colIndxDrag = parseInt(ui.draggable.attr("pq-col-indx"), 10);
				var rowIndxDrag = parseInt(ui.draggable.attr("pq-row-indx"), 10);
				var optCM = that.options.colModel;
				var headerCells = that.headerCells;
				var columnDrag = headerCells[rowIndxDrag][colIndxDrag];
				var colModelDrag;
				if (rowIndxDrag == 0) {
					colModelDrag = optCM
				} else {
					colModelDrag = headerCells[rowIndxDrag - 1][colIndxDrag].colModel
				}
				var indxDrag = self._columnIndexOf(colModelDrag, columnDrag);
				var column = colModelDrag[indxDrag];
				var dataIndx = column.dataIndx;
				var dataType = column.dataType;
				that.sorters.push({
					dataIndx: dataIndx,
					dataType: dataType,
					dir: "up"
				});
				$("<span class='pq-sortable' sorter=\"{dataIndx:" + dataIndx + ",dataType:'" + dataType + "',dir:'up'}\">" + column.title + "</span>").appendTo(that.$toolbar).button({
					icons: {
						primary: "ui-icon-triangle-1-n",
						secondary: "ui-icon-close"
					}
				}).mouseover(function(evt) {
					var $target = $(evt.target);
					if ($target.is("span.ui-icon-close")) {
						$target.css("outline", "1px solid black")
					}
				}).mouseout(function(evt) {
					var $target = $(evt.target);
					if ($target.is("span.ui-icon-close")) {
						$target.css("outline", "")
					}
				}).click(function(evt) {
					var $button = $(this);
					if ($(evt.target).is("span.ui-icon-close")) {
						window.setTimeout(function() {
							$button.button("destroy");
							$button.remove();
							self.refreshSorting()
						}, 0)
					} else {
						var sorter = eval("(" + $button.attr("sorter") + ")");
						if (sorter.dir == "up") {
							sorter.dir = "down";
							$button.button({
								icons: {
									primary: "ui-icon-triangle-1-s",
									secondary: "ui-icon-close"
								}
							})
						} else {
							sorter.dir = "up";
							$button.button({
								icons: {
									primary: "ui-icon-triangle-1-n",
									secondary: "ui-icon-close"
								}
							})
						}
						var sorterStr = "{dataIndx:" + sorter.dataIndx + ",dataType:'" + sorter.dataType + "',dir:'" + sorter.dir + "'}";
						$button.attr("sorter", sorterStr);
						self.refreshSorting()
					}
				});
				self.refreshSorting();
				window.setTimeout(function() {
					that.$toolbar.droppable("destroy")
				}, 0)
			}
		})
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
		track: false,
		treeModel: {
			collapsed: true,
			indent: 15,
			leafIcon: "ui-icon-radio-off",
			expandIcon: "ui-icon-triangle-1-se",
			collapseIcon: "ui-icon-triangle-1-e"
		},
		virtualX: true,
		filterModel: {
			on: true,
			mode: "AND",
			header: false
		}
	};
	fn._create = function() {
		$.extend($.paramquery.cGenerateView.prototype, _pGenerateView);
		var that = this,
			thisOptions = this.options;
		this.iGroupView = new cGroupView(this);
		this.iHeaderSearch = new cHeaderSearch(this);
		this.iUCData = new $.paramquery.cUCData(this);
		this.pqSheet = {};
		new cMouseSelection(this);
		this._super.apply(this);
		this.iGroupView.bindEvents();
		this.pqSheet = {};
		this.iDragColumns = new cDragColumns(this);
		this._createToolbar();
		this.refreshHeader();
		this.refreshDataAndView({
			header: false
		});
		this.refresh();
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.one(widgetEventPrefix + "load", function(evt, ui) {
			that._refresh({
				header: false
			})
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
			return that._onDataAvailable(obj2)
		}
	};
	fn._initTypeColumns = function() {
		var CM = this.colModel;
		for (var i = 0, len = CM.length; i < len; i++) {
			var column = CM[i];
			if (column.type === "checkBoxSelection") {
				new $.paramquery.cCheckBoxColumn(this, column.dataIndx)
			} else {
				if (column.type === "detail") {
					column.dataIndx = "pq_detail";
					this.iHierarchy = new cHierarchy(this)
				}
			}
		}
	};
	fn.refreshHeader = function() {
		this._createHeader()
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
		$.measureTime(innerSort, "innerSort");
		return data
	};
	fn._refreshHeaderSortIcons = function() {
		var thisOptions = this.options,
			DM = thisOptions.dataModel,
			sorters = this.iSort.sorters,
			thisColModel = this.colModel;
		var $header = this.$header;
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
	fn._simulateEvent = function(event, simulatedType) {
		if (event.originalEvent.touches.length > 1) {
			return
		}
		event.preventDefault();
		var touch = event.originalEvent.changedTouches[0],
			simulatedEvent = document.createEvent("MouseEvents");
		simulatedEvent.initMouseEvent(simulatedType, true, true, window, 1, touch.screenX, touch.screenY, touch.clientX, touch.clientY, false, false, false, false, 0, null);
		event.target.dispatchEvent(simulatedEvent)
	};
	fn._getTblSingle = function(rowIndxPage, colIndx) {
		var $tbl = this.$tbl,
			colIndx = (colIndx != null) ? colIndx : 0,
			thisOptions = this.options,
			freezeCols = thisOptions.freezeCols,
			freezeRows = thisOptions.freezeRows;
		if ($tbl != undefined) {
			if ($tbl.length == 4) {
				if (rowIndxPage >= freezeRows && colIndx >= freezeCols) {
					$tbl = $($tbl[3])
				} else {
					if (rowIndxPage >= freezeRows && colIndx < freezeCols) {
						$tbl = $($tbl[2])
					} else {
						if (rowIndxPage < freezeRows && colIndx >= freezeCols) {
							$tbl = $($tbl[1])
						} else {
							$tbl = $($tbl[0])
						}
					}
				}
			} else {
				if ($tbl.length == 2) {
					if (rowIndxPage >= freezeRows && colIndx >= freezeCols) {
						$tbl = $($tbl[1])
					} else {
						$tbl = $($tbl[0])
					}
				} else {
					$tbl = $($tbl[0])
				}
			}
		}
		return $tbl
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
	fn._onLoad = function() {
		this.options.dataModel.postData = ""
	};
	fn._onRefreshSheet = function() {
		var data = this.$dragSeries.data();
		if (data) {
			var rowIndx = data.rowIndx,
				colIndx = data.colIndx,
				left = data.left,
				top = data.top;
			this.bb(rowIndx, colIndx)
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
		return this.data
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
			sort = objP.sort,
			data = [],
			FM = options.filterModel,
			DM = options.dataModel,
			location = DM.location;
		if (apply !== false) {
			this._trigger("dataAvailable", objP.evt, {
				dataModel: DM
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
		if (that.$td_edit != null) {
			that.quitEditMode()
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
					if (!column.hidden) {
						header.push('<Column ss:AutoFitWidth="1"  ss:Width="' + column.width + '" />')
					}
				}
				header.push("<Row>");
				for (var i = 0; i < CMLength; i++) {
					var column = CM[i];
					if (!column.hidden) {
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
						if (!column.hidden) {
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
					if (!column.hidden) {
						var title = column.title.replace(/\"/g, '""');
						header.push('"' + title + '"')
					}
				}
				csvRows.push(header.join(","));
				for (var i = 0; i < dataLength; i++) {
					var rowData = data[i];
					for (var j = 0; j < CMLength; j++) {
						var column = CM[j];
						if (!column.hidden) {
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
	var cUCData = $.paramquery.cUCData = function(that) {
		this.that = that;
		this.udata = [];
		this.ddata = [];
		this.adata = []
	};
	var _pUCData = cUCData.prototype;
	_pUCData.add = function(obj) {
		var that = this.that,
			adata = this.adata,
			rowData = obj.rowData,
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
		var obj = {
			recId: recId,
			rowData: rowData
		};
		adata.push(obj)
	};
	_pUCData.update = function(objP) {
		var that = this.that,
			rowData = that.getRowData(objP),
			recId = that.getRecId({
				rowData: rowData
			}),
			dataIndx = objP.dataIndx,
			oldVal = objP.oldVal,
			newVal = objP.newVal,
			udata = this.udata,
			_found = false;
		if (recId == null) {
			return
		}
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i];
			if (rec.rowData == rowData && rec.dataIndx == dataIndx) {
				_found = true;
				if (rec.oldVal == newVal) {
					udata.splice(i, 1);
					var obj = {
						rowData: rowData,
						dataIndx: dataIndx,
						cls: "pq-cell-dirty"
					};
					that.removeClass(obj)
				} else {
					rec.newVal = newVal
				}
				break
			}
		}
		if (!_found) {
			var obj = {
				rowData: rowData,
				recId: recId,
				dataIndx: dataIndx,
				newVal: newVal,
				oldVal: oldVal
			};
			udata.push(obj);
			var obj = {
				rowData: rowData,
				dataIndx: dataIndx,
				cls: "pq-cell-dirty"
			};
			that.addClass(obj)
		}
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
			rowData: rowData
		})
	};
	_pUCData.isDirty = function() {
		var that = this.that,
			udata = this.udata,
			adata = this.adata,
			ddata = this.ddata;
		if (udata.length || adata.length || ddata.length) {
			return true
		} else {
			return false
		}
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
		for (var i = 0; i < udata.length; i++) {
			var rec = udata[i],
				rowData = rec.rowData;
			if ($.inArray(rowData, deleteList) != -1) {
				continue
			}
			if ($.inArray(rowData, updateList) == -1) {
				updateList.push(rowData)
			}
		}
		for (var i = 0; i < adata.length; i++) {
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
			adataLen = adata.length,
			rowLen = rows.length,
			foundRowData = [];
		for (var j = 0; j < rowLen; j++) {
			var row = rows[j];
			for (var i = 0; i < adataLen; i++) {
				var rowData = adata[i].rowData,
					_found = true;
				for (var k = 0; k < CMLength; k++) {
					var column = CM[k],
						hidden = column.hidden,
						dataIndx = column.dataIndx;
					if (hidden || (dataIndx == recIndx)) {
						continue
					}
					var cellData = rowData[dataIndx],
						cellData = (cellData == null) ? "" : cellData + "",
						cell = row[dataIndx],
						cell = (cell == null) ? "" : cell + "";
					if (cellData != cell) {
						_found = false;
						break
					}
				}
				if (_found) {
					rowData[recIndx] = row[recIndx];
					foundRowData.push(rowData)
				}
			}
		}
		var newadata = [];
		for (var i = 0; i < adataLen; i++) {
			var rowData = adata[i].rowData;
			if ($.inArray(rowData, foundRowData) == -1) {
				newadata.push(adata[i])
			}
		}
		this.adata = newadata
	};
	_pUCData.commitUpdate = function(rows, recIndx) {
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			udata = this.udata,
			udataLen = udata.length,
			rowLen = rows.length,
			foundRowData = [];
		for (var i = 0; i < udataLen; i++) {
			var rowData = udata[i].rowData;
			if ($.inArray(rowData, foundRowData) != -1) {
				continue
			}
			for (var j = 0; j < rowLen; j++) {
				var row = rows[j];
				if (rowData[recIndx] == row[recIndx]) {
					foundRowData.push(rowData);
					for (var k = 0; k < CMLength; k++) {
						var column = CM[k],
							hidden = column.hidden,
							dataIndx = column.dataIndx;
						if (row[dataIndx] !== undefined) {
							rowData[dataIndx] = row[dataIndx]
						}
						that.removeClass({
							rowData: rowData,
							dataIndx: dataIndx,
							cls: "pq-cell-dirty",
							refresh: false
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
		this.udata = newudata
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
			udata = this.udata;
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				dataIndx = rec.dataIndx,
				rowData = rec.rowData;
			that.removeClass({
				rowData: rowData,
				dataIndx: dataIndx,
				cls: "pq-cell-dirty"
			})
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
			DM = that.options.dataModel,
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
					this.commitAdd(rows, recIndx)
				} else {
					this.commitAddAll()
				}
			} else {
				if (objType == "update") {
					if (rows) {
						this.commitUpdate(rows, recIndx)
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
		that.refreshView()
	};
	_pUCData.rollbackAdd = function(PM, data) {
		var adata = this.adata,
			paging = PM.type;
		for (var i = 0, len = adata.length; i < len; i++) {
			var rec = adata[i],
				rowData = rec.rowData;
			for (var j = 0, len2 = data.length; j < len2; j++) {
				if (data[j] == rowData) {
					var remA = data.splice(j, 1);
					if (remA && remA.length && paging == "remote") {
						PM.totalRecords--
					}
					break
				}
			}
		}
		this.adata = []
	};
	_pUCData.rollbackDelete = function(PM, data) {
		var ddata = this.ddata,
			paging = PM.type;
		for (var i = ddata.length - 1; i >= 0; i--) {
			var rec = ddata[i],
				indx = rec.indx,
				rowData = rec.rowData;
			data.splice(indx, 0, rowData);
			if (paging == "remote") {
				PM.totalRecords++
			}
		}
		this.ddata = []
	};
	_pUCData.rollbackUpdate = function(PM, data) {
		var that = this.that,
			udata = this.udata;
		for (var i = 0, len = udata.length; i < len; i++) {
			var rec = udata[i],
				recId = rec.recId,
				rowData = rec.rowData,
				dataIndx = rec.dataIndx;
			if (recId == null) {
				continue
			}
			rowData[dataIndx] = rec.oldVal;
			that.removeClass({
				rowData: rowData,
				dataIndx: dataIndx,
				cls: "pq-cell-dirty",
				refresh: false
			})
		}
		this.udata = []
	};
	_pUCData.rollback = function(objP) {
		var that = this.that,
			DM = that.options.dataModel,
			PM = that.options.pageModel,
			refreshView = (objP && (objP.refresh != null)) ? objP.refresh : true,
			objType = (objP && (objP.type != null)) ? objP.type : null,
			data = DM.data;
		if (objType == null || objType == "update") {
			this.rollbackUpdate(PM, data)
		}
		if (objType == null || objType == "delete") {
			this.rollbackDelete(PM, data)
		}
		if (objType == null || objType == "add") {
			this.rollbackAdd(PM, data)
		}
		if (refreshView) {
			that.refreshView()
		}
	};
	var fnGrid = $.paramquery.pqGrid.prototype;
	fnGrid.getChanges = function(obj) {
		this.quitEditMode();
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
		this.quitEditMode();
		this.iUCData.rollback(obj)
	};
	fnGrid.isDirty = function() {
		return this.iUCData.isDirty()
	};
	fnGrid.commit = function(obj) {
		this.quitEditMode();
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
			options = that.options,
			track = options.track,
			track = (objP.track != null) ? objP.track : track,
			rowIndx = objP.rowIndx,
			row = objP.row,
			requireRefresh = false,
			rowData = that.getRowData({
				rowIndx: rowIndx
			});
		var obj = {
			rowData: rowData
		};
		for (var dataIndx in row) {
			var oldVal = rowData[dataIndx],
				newVal = row[dataIndx];
			if (newVal !== oldVal) {
				requireRefresh = true;
				if (track) {
					obj.dataIndx = dataIndx;
					obj.oldVal = oldVal;
					obj.newVal = newVal;
					this.iUCData.update(obj)
				}
				rowData[dataIndx] = newVal
			}
		}
		if (requireRefresh) {
			that.refreshRow({
				rowIndx: rowIndx
			})
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
		return recId
	};
	fnGrid.getCellData = function(obj) {
		var rowData = this.getRowData(obj),
			dataIndx = obj.dataIndx;
		return rowData[dataIndx]
	};
	fnGrid.getRowData = function(obj) {
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
				rowData = data[indx];
			return rowData
		}
	};
	fnGrid.deleteRow = function(obj) {
		var that = this,
			rowIndx = obj.rowIndx,
			effect = obj.effect,
			options = that.options,
			DM = options.dataModel,
			PM = options.pageModel,
			paging = PM.type;
		if (rowIndx != null) {
			var indx = (paging == "remote") ? (rowIndx - this.rowIndxOffset) : rowIndx,
				data = DM.data,
				track = options.track,
				track = (obj.track != null) ? obj.track : track;
			if (track) {
				this.iUCData["delete"]({
					rowIndx: rowIndx
				})
			}
			if (effect) {
				var that = this,
					$tr = this.getRow({
						rowIndx: rowIndx
					});
				if ($tr) {
					$tr.effect("fade", null, 350, function() {
						var complete = obj.complete;
						if (complete && typeof complete == "function") {
							complete.call(that)
						}
						var remArr = data.splice(indx, 1);
						if (remArr && remArr.length && paging == "remote") {
							PM.totalRecords--
						}
						that.refreshView()
					})
				}
			} else {
				var remArr = data.splice(indx, 1);
				if (remArr && remArr.length && paging == "remote") {
					PM.totalRecords--
				}
				this.refreshView()
			}
		}
	};
	fnGrid._onDialogOpen = function() {
		var that = this,
			self = this,
			$dialog = this.$crudDialog.parent(".ui-dialog");
		$(".pq-dialog-buttonset", $dialog).remove();
		if (this.crudEditMode == false) {
			return
		}
		var $div = $("<div style='' class='pq-dialog-buttonset'></div>").prependTo($(".ui-dialog-buttonpane", $dialog));
		this.prev = $("<button type='button' class='ui-corner-left'></button>").appendTo($div).button({
			icons: {
				primary: "ui-icon-circle-triangle-w"
			},
			text: false
		}).bind("click", function(evt) {
			var rowIndxPage = that.rowPrevSelect();
			self._fillForm({
				rowIndxPage: rowIndxPage
			})
		});
		this.prev.removeClass("ui-corner-all");
		this.next = $("<button type='button' class='ui-corner-right'></button>").appendTo($div).button({
			icons: {
				primary: "ui-icon-circle-triangle-e"
			},
			text: false
		}).bind("click", function(evt) {
			var rowIndxPage = that.rowNextSelect();
			self._fillForm({
				rowIndxPage: rowIndxPage
			})
		});
		this.next.removeClass("ui-corner-all")
	};
	fnGrid.getFormData = function($frm) {
		var that = this,
			rowData = {}, CM = that.colModel;
		for (var i = 0; i < CM.length; i++) {
			var column = CM[i],
				dataIndx = column.dataIndx,
				$fld = $frm.find("*[name='" + dataIndx + "']");
			rowData[dataIndx] = $fld.val()
		}
		return rowData
	};
	fnGrid.addRow = function(obj) {
		var self = this;
		return self._addLocal(obj)
	};
	fnGrid._addLocal = function(obj) {
		var that = this,
			rowData = obj.rowData,
			rowIndx = obj.rowIndx,
			rowIndxPage = obj.rowIndxPage,
			thatOptions = that.options,
			DM = thatOptions.dataModel,
			PM = thatOptions.pageModel,
			paging = PM.type,
			track = thatOptions.track,
			track = (obj.track != null) ? obj.track : track,
			data = DM.data;
		if (rowData == null) {
			return null
		}
		if (data == null) {
			DM.data = [];
			data = DM.data
		}
		if (track) {
			this.iUCData.add({
				rowData: rowData
			})
		}
		if (rowIndx == null && rowIndxPage == null) {
			data.push(rowData)
		} else {
			var offset = this.rowIndxOffset,
				rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
				rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
				indx = (paging == "remote") ? rowIndxPage : rowIndx;
			data.splice(indx, 0, rowData)
		} if (paging == "remote") {
			PM.totalRecords++
		}
		if (!obj.refresh !== false) {
			this.refreshView()
		}
		if (rowIndx == null) {
			return data.length - 1
		} else {
			return rowIndx
		}
	};
	fnGrid._addRemote = function(obj) {
		var that = this,
			rowData = obj.rowData;
		rowData.pq_oper = "add";
		that.options.dataModel.postDataOnce = rowData
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
				listeners = item.listeners,
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
							$ctrl = $("<button type='button' class='" + cls + "' " + attr + " " + style + ">" + text + "</button>").button({
								text: text ? true : false,
								icons: {
									primary: icon
								}
							}).appendTo(element)
						} else {
							if (type == "select") {
								var options = item.options ? item.options : [];
								if (typeof options === "function") {
									options = options.call(that.element, {
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
										var inp = type.call(that, {
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
			DM = options.dataModel,
			PM = options.pageModel;
		if (PM.type) {
			var curPage = DM.curPage,
				rPP = DM.rPP;
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
			data = DM.data;
		if (!data) {
			return
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData.pq_rowselect) {
				var rowIndx = (remote) ? (i + offset) : i;
				this.selection.push({
					rowIndx: rowIndx,
					rowData: rowData
				})
			}
		}
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
			rowData = that.getRowData(objP);
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
		for (var i = 0; i < rowSelection2.length; i++) {
			var rowS = rowSelection2[i],
				row = rowS.rowIndx;
			if (row < initRowIndx || row > finalRowIndx) {
				this.remove({
					rowIndx: row
				})
			}
		}
		if (initRowIndx > finalRowIndx) {
			var temp = initRowIndx;
			initRowIndx = finalRowIndx;
			finalRowIndx = temp
		}
		for (var row = initRowIndx; row <= finalRowIndx; row++) {
			this.add({
				rowIndx: row,
				focus: false
			})
		}
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
		this.remove({
			cells: cells
		});
		this.lastSelection = null
	};
	_pR.removeAll = function(objP) {
		var that = this.that,
			page = objP ? objP.page : false;
		this.refresh();
		var rows = this.selection.slice(0);
		if (page) {
			var rows2 = [],
				offset = that.rowIndxOffset,
				curPageData = that.data,
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
		} else {
			this.remove({
				rows: rows
			});
			this.lastSelection = null
		}
	};
	_pC.isSelected = function(objP) {
		var that = this.that,
			rowData = that.getRowData(objP),
			dataIndx = objP.dataIndx,
			dataIndx = (dataIndx == null) ? that.colModel[objP.colIndx].dataIndx : dataIndx;
		if (rowData == null) {
			return null
		}
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
			paging = PM.type,
			remote = (paging == "remote") ? true : false,
			offset = that.rowIndxOffset;
		if (!data) {
			return
		}
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			var pq_cellselect = rowData.pq_cellselect;
			if (pq_cellselect) {
				var rowIndx = (remote) ? (i + offset) : i;
				for (var dataIndx in pq_cellselect) {
					if (pq_cellselect[dataIndx]) {
						this.selection.push({
							rowIndx: rowIndx,
							rowData: rowData,
							dataIndx: dataIndx
						})
					}
				}
			}
		}
		this.isDirty = false
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
	_pC.inView = function(rowIndxPage, colIndx) {
		var that = this.that,
			options = this.options,
			freezeRows = options.freezeRows,
			freezeCols = options.freezeCols;
		return ((rowIndxPage < freezeRows || rowIndxPage >= that.init && rowIndxPage <= that["final"]) && (colIndx < freezeCols || colIndx >= that.initH && colIndx <= that.finalH))
	};
	_pC._add = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			rowData = objP.rowData,
			offset = that.rowIndxOffset,
			success, rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			rowData = (rowData == null) ? that.getRowData(objP) : rowData,
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
		var inView = this.inView(rowIndxPage, colIndx);
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
	_pR.inView = function(rowIndxPage) {
		var that = this.that,
			options = this.options,
			freezeRows = options.freezeRows;
		return ((rowIndxPage < freezeRows || rowIndxPage >= that.init && rowIndxPage <= that["final"]))
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
		var inView = this.inView(rowIndxPage);
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
			cells2 = [];
		if (cells && typeof cells.push == "function") {
			for (var i = 0, len = cells.length; i < len; i++) {
				var cell = cells[i];
				cell.trigger = false;
				var ret = this._add(cell);
				if (ret) {
					cells2.push(ret)
				}
			}
			if (cells2.length) {
				that._trigger("cellSelect", evt, {
					cells: cells2
				})
			}
		} else {
			this._add(objP)
		}
	};
	_pR.add = function(objP) {
		var that = this.that,
			evt = objP.evt,
			rows = objP.rows,
			rows2 = [];
		if (rows && typeof rows.push == "function") {
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				var ret = this._add(row);
				if (ret) {
					rows2.push(ret)
				}
			}
			if (rows2.length) {
				that._trigger("rowSelect", evt, {
					rows: rows2
				})
			}
		} else {
			this._add(objP)
		}
	};
	_pC._remove = function(objP) {
		var that = this.that,
			rowIndx = objP.rowIndx,
			rowIndxPage = objP.rowIndxPage,
			offset = that.rowIndxOffset,
			rowIndx = (rowIndx == null) ? (rowIndxPage + offset) : rowIndx,
			rowIndxPage = (rowIndxPage == null) ? (rowIndx - offset) : rowIndxPage,
			rowData = (rowData == null) ? that.getRowData(objP) : rowData,
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
		if (isSelected) {
			if (this.inView(rowIndxPage, colIndx)) {
				var $td = that.getCell({
					rowIndxPage: rowIndxPage,
					colIndx: colIndx
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
			rowData = (rowData == null) ? that.getRowData(objP) : rowData,
			$tr = objP.$tr,
			evt = objP.evt,
			isSelected = this.isSelected({
				rowData: rowData
			});
		if (isSelected) {
			if (this.inView(rowIndxPage)) {
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
		var cells = objP.cells;
		if (cells && typeof cells.push == "function") {
			var cells2 = [];
			for (var i = 0, len = cells.length; i < len; i++) {
				var cell = cells[i];
				cell.trigger = false;
				var ret = this._remove(cell);
				if (ret) {
					cells2.push(ret)
				}
			}
			if (cells2.length) {
				this.that._trigger("cellUnSelect", objP.evt, {
					cells: cells2
				})
			}
		} else {
			this._remove(objP)
		}
	};
	_pR.remove = function(objP) {
		var rows = objP.rows;
		if (rows && typeof rows.push == "function") {
			var rows2 = [];
			for (var i = 0, len = rows.length; i < len; i++) {
				var row = rows[i];
				row.trigger = false;
				var ret = this._remove(row);
				if (ret) {
					rows2.push(ret)
				}
			}
			if (rows2.length) {
				this.that._trigger("rowUnSelect", objP.evt, {
					rows: rows2
				})
			}
		} else {
			this._remove(objP)
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
			data = all ? this.options.dataModel.data : that.data,
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
		this.add({
			cells: cells
		})
	};
	_pR.selectAll = function(objP) {
		var that = this.that,
			all = (objP && objP.all) ? true : false,
			data = all ? this.options.dataModel.data : that.data,
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
			cellSelection = this.getSelection(),
			cellSelection2 = cellSelection.slice(0);
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = that.getColIndx({
					dataIndx: dataIndx
				});
			if (row < initRowIndx || row > finalRowIndx) {
				this.remove({
					rowIndx: row,
					colIndx: col,
					dataIndx: dataIndx
				})
			} else {
				if (row == initRowIndx && col < initColIndx) {
					this.remove({
						rowIndx: row,
						colIndx: col,
						dataIndx: dataIndx
					})
				} else {
					if (row == finalRowIndx && col > finalColIndx) {
						this.remove({
							rowIndx: row,
							colIndx: col,
							dataIndx: dataIndx
						})
					}
				}
			}
		}
		for (var col = 0; col < that.colModel.length; col++) {
			var column = that.colModel[col];
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
						this.add({
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
	};
	_pC.selectBlock = function(objP) {
		var that = this.that,
			initRowIndx = objP.initRowIndx,
			initColIndx = objP.initColIndx,
			finalRowIndx = objP.finalRowIndx,
			finalColIndx = objP.finalColIndx,
			cellSelection = this.getSelection(),
			cellSelection2 = cellSelection.slice(0);
		for (var i = 0; i < cellSelection2.length; i++) {
			var cellS = cellSelection2[i],
				row = cellS.rowIndx,
				dataIndx = cellS.dataIndx,
				col = that.getColIndx({
					dataIndx: dataIndx
				});
			if (col < initColIndx || col > finalColIndx) {
				this.remove({
					rowIndx: row,
					dataIndx: dataIndx,
					colIndx: col
				})
			} else {
				if (row < initRowIndx || row > finalRowIndx) {
					this.remove({
						rowIndx: row,
						dataIndx: dataIndx,
						colIndx: col
					})
				}
			}
		}
		var arrSel = [],
			CM = that.colModel;
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
			} while (row <= finalRowIndx);
			this.add({
				cells: arrSel
			})
		}
	}
})(jQuery);
(function($) {
	var cCheckBoxColumn = $.paramquery.cCheckBoxColumn = function(that, cbDataIndx) {
		var self = this;
		this.that = that;
		this.options = that.options;
		this.type = "checkBoxSelection";
		this.cbDataIndx = cbDataIndx;
		var widgetEventPrefix = that.widgetEventPrefix.toLowerCase();
		that.element.on(widgetEventPrefix + "dataavailable", function(evt, ui) {
			if (self.belongs(evt)) {
				return self._onDataAvailable(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "cellclick", function(evt, ui) {
			if (self.belongs(evt)) {
				return self.cellClick(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "rowselect", function(evt, ui) {
			if (self.belongs(evt)) {
				return self.rowSelect(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "rowunselect", function(evt, ui) {
			if (self.belongs(evt)) {
				return self.rowUnSelect(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "cellkeydown", function(evt, ui) {
			if (self.belongs(evt)) {
				return self.cellKeyDown(evt, ui)
			}
		});
		that.element.on(widgetEventPrefix + "refreshheader", function(evt, ui) {
			if (self.belongs(evt)) {
				return self.refreshHeader(evt, ui)
			}
		})
	};
	var _pCheckBC = cCheckBoxColumn.prototype = new $.paramquery.cClass;
	_pCheckBC.hasHeaderChkBox = function() {
		var SM = this.options.selectionModel;
		if (SM.cbHeader === false) {
			return false
		} else {
			return true
		}
	};
	_pCheckBC.setValCBox = function() {
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			options = this.options,
			cbAll = options.selectionModel.cbAll,
			data = cbAll ? options.dataModel.data : that.data,
			val = null,
			selFound = 0,
			unSelFound = 0;
		for (var i = 0, len = data.length; i < len; i++) {
			var rowData = data[i];
			if (rowData.pq_rowselect) {
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
	_pCheckBC.refreshHeader = function(evt, ui) {
		if (!this.hasHeaderChkBox()) {
			return
		}
		var that = this.that,
			data = that.data;
		if (!data) {
			return
		}
		var self = this,
			$td = that.getCellHeader({
				dataIndx: this.cbDataIndx
			});
		$td.html("<input type='checkbox'/>");
		var $inp = this.$inp = $td.find("input").click(function(evt) {
			if ($(this).is(":checked")) {
				self.selectAllRows()
			} else {
				self.unSelectAllRows()
			}
			evt.stopPropagation()
		});
		this.setValCBox()
	};
	_pCheckBC.selectAllRows = function() {
		var that = this.that,
			all = this.options.selectionModel.cbAll;
		that.iRows.selectAll({
			all: all
		})
	};
	_pCheckBC.unSelectAllRows = function() {
		var that = this.that,
			all = this.options.selectionModel.cbAll;
		if (all) {
			that.iRows.removeAll()
		} else {
			that.iRows.removeAll({
				page: true
			})
		}
	};
	_pCheckBC._onDataAvailable = function() {
		var that = this.that,
			data = this.options.dataModel.data,
			dataIndx = this._findSelectionIndx();
		if (dataIndx != null && data) {
			for (var i = 0, len = data.length; i < len; i++) {
				var rowData = data[i];
				if (rowData[dataIndx]) {
					rowData.pq_rowselect = true
				}
			}
		}
	};
	_pCheckBC._findSelectionIndx = function() {
		if (this.cbDataIndx) {
			return this.cbDataIndx
		}
	};
	_pCheckBC.cellClick = function(evt, ui) {
		var that = this.that,
			rowIndx = ui.rowIndx,
			rowData = ui.rowData,
			column = ui.column,
			type = this.type;
		if (column && column.type === type) {
			var dataIndx = column.dataIndx;
			if (!rowData[dataIndx]) {
				that.iRows.add({
					rowIndx: rowIndx
				})
			} else {
				that.iRows.remove({
					rowIndx: rowIndx
				})
			}
			evt.stopPropagation();
			return false
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
	_pCheckBC.cellKeyDown = function(evt, ui) {
		var that = this.that,
			rowIndx = ui.rowIndx,
			column = ui.column,
			rowData = rowData,
			type = this.type;
		if (column && column.type === type) {
			var dataIndx = column.dataIndx,
				rowIndx = ui.rowIndx;
			if (evt.keyCode == 13 || evt.keyCode == 32) {
				if (!rowData[dataIndx]) {
					that.selection({
						type: "row",
						method: "add",
						rowIndx: rowIndx
					})
				} else {
					that.selection({
						type: "row",
						method: "remove",
						rowIndx: rowIndx
					})
				}
				evt.stopPropagation();
				evt.preventDefault();
				return false
			}
		}
	}
})(jQuery);
(function($) {
	var cExcel = function(that, $ae) {
		this.that = that;
		this.$ae = $ae
	};
	var _pExcel = cExcel.prototype;
	_pExcel.createClipBoard = function() {
		var $ae = this.$ae,
			$text = $("textarea#pq-grid-excel");
		if ($text.length == 0) {
			$text = $("<textarea id='pq-grid-excel' />").appendTo(document.body)
		}
		var off = $ae.offset(),
			left = off.left,
			top = off.top;
		$text.css({
			position: "absolute",
			left: left,
			top: top,
			display: "",
			height: 1,
			width: 1,
			borderWidth: 0
		});
		$text.focus()
	};
	_pExcel.destroyClipBoard = function() {
		var $text = $("textarea#pq-grid-excel");
		if ($text.length) {
			var ae = document.activeElement;
			if (ae == $text[0]) {
				this.$ae.focus()
			}
			$text.css("display", "none")
		}
	};
	_pExcel.clearClipBoard = function() {
		var $text = $("textarea#pq-grid-excel");
		$text.val("")
	};
	_pExcel.copy = function() {
		var $text = $("textarea#pq-grid-excel");
		var that = this.that,
			CM = that.colModel,
			CMLength = CM.length,
			type = that.options.selectionModel.type,
			selArr = [],
			buffer = [];
		selArr = that.iRows.getSelection();
		for (var i = 0, len = selArr.length; i < len; i++) {
			var sel = selArr[i],
				rowData = that.getRowData(sel),
				rowBuffer = [];
			for (var j = 0; j < CMLength; j++) {
				var column = CM[j];
				if (column.hidden) {
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
				rowIndx = sel.rowIndx;
			if (rowIndx == prevRowIndx) {
				continue
			}
			var rowData = that.getRowData(sel);
			for (var j = 0; j < CMLength; j++) {
				var column = CM[j];
				if (column.hidden) {
					continue
				}
				var dataIndx = column.dataIndx;
				if (that.iCells.isSelected({
					rowData: rowData,
					dataIndx: dataIndx
				})) {
					rowBuffer.push(rowData[dataIndx])
				} else {}
			}
			var str = rowBuffer.join("\t");
			rowBuffer = [];
			buffer.push(str);
			prevRowIndx = rowIndx
		}
		$text.val(buffer.join("\n"));
		$text.select()
	};
	var iExcel = null;
	$(window).unbind(".pqExcel").bind("keydown.pqExcel", function(evt) {
		if (evt.ctrlKey) {
			var $ae = $(document.activeElement);
			if (!$ae.hasClass("pq-grid-row") && !$ae.hasClass("pq-grid-cell") && !$ae.is("textarea#pq-grid-excel")) {
				return
			}
			var $grid = $ae.closest(".pq-grid");
			if (iExcel || ($ae.length && $grid.length)) {
				if (!iExcel) {
					try {
						var that = $grid.pqGrid("getThis").that
					} catch (ex) {
						return true
					}
					iExcel = new cExcel(that, $ae);
					iExcel.createClipBoard()
				}
				if (evt.keyCode == "67" || evt.keyCode == "99") {
					iExcel.copy()
				} else {
					var $text = $("textarea#pq-grid-excel");
					if ($text.length) {
						var ae = document.activeElement;
						if (ae == $text[0]) {
							iExcel.that._onKeyPressDown(evt)
						}
					}
				}
			}
		}
	}).bind("keyup.pqExcel", function(evt) {
		if (iExcel && !evt.ctrlKey && evt.keyCode == 17) {
			iExcel.destroyClipBoard();
			iExcel = null
		}
	})
})(jQuery);
