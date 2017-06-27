/*
 * jQuery UI Nested Sortable
 * v 1.3.3 / 12 apr 2011
 * http://mjsarfatti.com/sandbox/nestedSortable
 *
 * Depends:
 *	 jquery.ui.sortable.js 1.8+
 *
 * License CC BY-SA 3.0
 * Copyright 2010-2011, Manuele J Sarfatti
 */

(function($) {

	$.widget("ui.nestedSortable", $.extend({}, $.ui.sortable.prototype, {

		options: {
			tabSize: 20,
			disableNesting: 'ui-nestedSortable-no-nesting',
			errorClass: 'ui-nestedSortable-error',
			listType: 'ol',
			maxLevels: 0,
			noJumpFix: 0
		},

		_create: function(){
			if (this.noJumpFix == false)
				this.element.height(this.element.height());
			this.element.data('sortable', this.element.data('nestedSortable'));
			return $.ui.sortable.prototype._create.apply(this, arguments);
		},



		_mouseDrag: function(event) {

			//Compute the helpers position
			this.position = this._generatePosition(event);
			this.positionAbs = this._convertPositionTo("absolute");

			if (!this.lastPositionAbs) {
				this.lastPositionAbs = this.positionAbs;
			}

			//Do scrolling
			if(this.options.scroll) {
				var o = this.options, scrolled = false;
				if(this.scrollParent[0] != document && this.scrollParent[0].tagName != 'HTML') {

					if((this.overflowOffset.top + this.scrollParent[0].offsetHeight) - event.pageY < o.scrollSensitivity)
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop + o.scrollSpeed;
					else if(event.pageY - this.overflowOffset.top < o.scrollSensitivity)
						this.scrollParent[0].scrollTop = scrolled = this.scrollParent[0].scrollTop - o.scrollSpeed;

					if((this.overflowOffset.left + this.scrollParent[0].offsetWidth) - event.pageX < o.scrollSensitivity)
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft + o.scrollSpeed;
					else if(event.pageX - this.overflowOffset.left < o.scrollSensitivity)
						this.scrollParent[0].scrollLeft = scrolled = this.scrollParent[0].scrollLeft - o.scrollSpeed;

				} else {

					if(event.pageY - $(document).scrollTop() < o.scrollSensitivity)
						scrolled = $(document).scrollTop($(document).scrollTop() - o.scrollSpeed);
					else if($(window).height() - (event.pageY - $(document).scrollTop()) < o.scrollSensitivity)
						scrolled = $(document).scrollTop($(document).scrollTop() + o.scrollSpeed);

					if(event.pageX - $(document).scrollLeft() < o.scrollSensitivity)
						scrolled = $(document).scrollLeft($(document).scrollLeft() - o.scrollSpeed);
					else if($(window).width() - (event.pageX - $(document).scrollLeft()) < o.scrollSensitivity)
						scrolled = $(document).scrollLeft($(document).scrollLeft() + o.scrollSpeed);

				}

				if(scrolled !== false && $.ui.ddmanager && !o.dropBehaviour)
					$.ui.ddmanager.prepareOffsets(this, event);
			}

			//Regenerate the absolute position used for position checks
			this.positionAbs = this._convertPositionTo("absolute");

			//Set the helper position
			if(!this.options.axis || this.options.axis != "y") this.helper[0].style.left = this.position.left+'px';
			if(!this.options.axis || this.options.axis != "x") this.helper[0].style.top = this.position.top+'px';

			//Rearrange
			for (var i = this.items.length - 1; i >= 0; i--) {

				//Cache variables and intersection, continue if no intersection
				var item = this.items[i], itemElement = item.item[0], intersection = this._intersectsWithPointer(item);
				if (!intersection) continue;

				if(itemElement != this.currentItem[0] //cannot intersect with itself
					&&	this.placeholder[intersection == 1 ? "next" : "prev"]()[0] != itemElement //no useless actions that have been done before
					&&	!$.contains(this.placeholder[0], itemElement) //no action if the item moved is the parent of the item checked
					&& (this.options.type == 'semi-dynamic' ? !$.contains(this.element[0], itemElement) : true)
					//&& itemElement.parentNode == this.placeholder[0].parentNode // only rearrange items within the same container
				) {

					this.direction = intersection == 1 ? "down" : "up";

					if (this.options.tolerance == "pointer" || this._intersectsWithSides(item)) {
						this._rearrange(event, item);
					} else {
						break;
					}

					// Clear emtpy ul's/ol's
					this._clearEmpty(itemElement);

					this._trigger("change", event, this._uiHash());
					break;
				}
			}

			var parentItem = (this.placeholder[0].parentNode.parentNode && $(this.placeholder[0].parentNode.parentNode).closest('.ui-sortable').length) ? $(this.placeholder[0].parentNode.parentNode) : null;
			var level = this._getLevel(this.placeholder);
			var childLevels = this._getChildLevels(this.helper);
			var previousItem = this.placeholder[0].previousSibling ? $(this.placeholder[0].previousSibling) : null;
			if (previousItem != null) {
				while (previousItem[0].nodeName.toLowerCase() != 'li' || previousItem[0] == this.currentItem[0]) {
					if (previousItem[0].previousSibling) {
						previousItem = $(previousItem[0].previousSibling);
					} else {
						previousItem = null;
						break;
					}
				}
			}

			newList = document.createElement(o.listType);

			this.beyondMaxLevels = 0;

			// If the item is moved to the left, send it to its parent level
			if (parentItem != null && this.positionAbs.left < parentItem.offset().left) {
				parentItem.after(this.placeholder[0]);
				this._clearEmpty(parentItem[0]);
				this._trigger("change", event, this._uiHash());
			}
			// If the item is below another one and is moved to the right, make it a children of it
			else if (previousItem != null && this.positionAbs.left > previousItem.offset().left + o.tabSize) {
				this._isAllowed(previousItem, level+childLevels+1);
				if (previousItem[0].children[1] == null) {
					previousItem[0].appendChild(newList);
				}
				previousItem[0].children[1].appendChild(this.placeholder[0]);
				this._trigger("change", event, this._uiHash());
			}
			else {
				this._isAllowed(parentItem, level+childLevels);
			}

			//Post events to containers
			this._contactContainers(event);

			//Interconnect with droppables
			if($.ui.ddmanager) $.ui.ddmanager.drag(this, event);

			//Call callbacks
			this._trigger('sort', event, this._uiHash());

			this.lastPositionAbs = this.positionAbs;
			return false;

		},

		_mouseStop: function(event, noPropagation) {

			// If the item is in a position not allowed, send it back
			if (this.beyondMaxLevels) {
				var parent = this.placeholder[0].parentNode.parentNode;
				for (var i = this.beyondMaxLevels-1; i > 0; i--) {
					parent = parent.parentNode.parentNode;
				}
				this.placeholder.removeClass(this.options.errorClass);
				$(parent).after(this.placeholder[0]);
				this._trigger("change", event, this._uiHash());
			}

			$.ui.sortable.prototype._mouseStop.apply(this, arguments);

		},

		serialize: function(o) {

			var items = this._getItemsAsjQuery(o && o.connected);
			var str = []; o = o || {};

			$(items).each(function() {
				var res = ($(o.item || this).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
				var pid = ($(o.item || this).parent(o.listType).parent('li').attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
				if(res) str.push((o.key || res[1]+'['+(o.key && o.expression ? res[1] : res[2])+']')+'='+(pid ? (o.key && o.expression ? pid[1] : pid[2]) : 'root'));
			});

			if(!str.length && o.key) {
				str.push(o.key + '=');
			}

			return str.join('&');

		},

		toHierarchy: function(o) {

			o = o || {};
			var sDepth = o.startDepthCount || 0;
			var ret = [];

			$(this.element).children('li').each(function() {
				var level = _recursiveItems($(this));
				ret.push(level);
			});

			return ret;

			function _recursiveItems(li) {
				var id = ($(li).attr(o.attribute || 'id') || '').match(o.expression || (/(.+)[-=_](.+)/));
				if (id != null) {
					var item = {"id" : id[2]};
					if ($(li).children(o.listType).children('li').length > 0) {
						item.children = [];
						$(li).children(o.listType).children('li').each(function() {
							var level = _recursiveItems($(this));
							item.children.push(level);
						});
					}
					return item;
				}
			}
        },

		toArray: function(o) {

			o = o || {};
			var sDepth = o.startDepthCount || 0;
			var ret = [];
			var left = 2;

			ret.push({"item_id": 'root', "parent_id": 'none', "depth": sDepth, "left": '1', "right": ($('li', this.element).length + 1) * 2});

			$(this.element).children('li').each(function() {
				left = _recursiveArray(this, sDepth + 1, left);
			});

			function _sortByLeft(a,b) {
				return a['left'] - b['left'];
			}
			ret = ret.sort(_sortByLeft);

			return ret;

			function _recursiveArray(item, depth, left) {

				right = left + 1;

				if ($(item).children(o.listType).children('li').length > 0) {
					depth ++;
					$(item).children(o.listType).children('li').each(function() {
						right = _recursiveArray($(this), depth, right);
					});
					depth --;
				}

				id = ($(item).attr(o.attribute || 'id')).match(o.expression || (/(.+)[-=_](.+)/));

				if (depth === sDepth + 1) pid = 'root';
				else {
					parentItem = ($(item).parent(o.listType).parent('li').attr('id')).match(o.expression || (/(.+)[-=_](.+)/));
					pid = parentItem[2];
				}

				if (id != null) {
						ret.push({"item_id": id[2], "parent_id": pid, "depth": depth, "left": left, "right": right});
				}

				return left = right + 1;
			}

		},

		_clear: function(event, noPropagation) {

			$.ui.sortable.prototype._clear.apply(this, arguments);

			// Clean last empty ul/ol
			for (var i = this.items.length - 1; i >= 0; i--) {
				var item = this.items[i].item[0];
				this._clearEmpty(item);
			}
			return true;

		},

		_clearEmpty: function(item) {

			if (item.children[1] && item.children[1].children.length == 0) {
				item.removeChild(item.children[1]);
			}

		},

		_getLevel: function(item) {

				var level = 1;

				if (this.options.listType) {
						var list = item.closest(this.options.listType);
						while (!list.is('.ui-sortable')/* && level < this.options.maxLevels*/) {
								level++;
								list = list.parent().closest(this.options.listType);
						}
				}

				return level;
		},

		_getChildLevels: function(item) {

				levels = item.find(this.options.items).filter(this.options.items+':first-child').length;

				return levels;
		},

		_isAllowed: function(parentItem, levels) {
			var o = this.options
			// Are we trying to nest under a no-nest or are we nesting too deep?
			if (parentItem == null || !(parentItem.hasClass(o.disableNesting))) {
				if (o.maxLevels < levels && o.maxLevels != 0) {
					this.placeholder.addClass(o.errorClass);
					this.beyondMaxLevels = levels - o.maxLevels;
				} else {
					this.placeholder.removeClass(o.errorClass);
					this.beyondMaxLevels = 0;
				}
			} else {
				this.placeholder.addClass(o.errorClass);
				this.beyondMaxLevels = (levels - o.maxLevels) > 0 ? levels - o.maxLevels : 1;
			}
		}

	}));

	$.ui.nestedSortable.prototype.options = $.extend({}, $.ui.sortable.prototype.options, $.ui.nestedSortable.prototype.options);

})(jQuery);