/*!
 * SmartMenus jQuery Plugin Keyboard Addon - v0.3.1 - November 1, 2016
 * http://www.smartmenus.org/
 *
 * Copyright Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery', 'jquery.smartmenus'], factory);
	} else if (typeof module === 'object' && typeof module.exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		// Global jQuery
		factory(jQuery);
	}
} (function($) {

	function getFirstItemLink($ul) {
		// make sure we also allow the link to be nested deeper inside the LI's (e.g. in a heading)
		return $ul.find('> li > a:not(.disabled), > li > :not(ul) a:not(.disabled)').eq(0);
	}
	function getLastItemLink($ul) {
		return $ul.find('> li > a:not(.disabled), > li > :not(ul) a:not(.disabled)').eq(-1);
	}
	function getNextItemLink($li, noLoop) {
		var $a = $li.nextAll('li').find('> a:not(.disabled), > :not(ul) a:not(.disabled)').eq(0);
		return noLoop || $a.length ? $a : getFirstItemLink($li.parent());
	}
	function getPreviousItemLink($li, noLoop) {
		// bug workaround: elements are returned in reverse order just in jQuery 1.8.x
		var $a = $li.prevAll('li').find('> a:not(.disabled), > :not(ul) a:not(.disabled)').eq(/^1\.8\./.test($.fn.jquery) ? 0 : -1);
		return noLoop || $a.length ? $a : getLastItemLink($li.parent());
	}

	// jQuery's .focus() is unreliable in some versions, so we're going to call the links' native JS focus method
	$.fn.focusSM = function() {
		if (this.length && this[0].focus) {
			this[0].focus();
		}
		return this;
	};

	$.extend($.SmartMenus.Keyboard = {}, {
		docKeydown: function(e) {
			var keyCode = e.keyCode;
			if (!/^(37|38|39|40)$/.test(keyCode)) {
				return;
			}
			var $root = $(this),
				obj = $root.data('smartmenus'),
				$target = $(e.target);
			// exit if this is an A inside a mega drop-down
			if (!obj || !$target.is('a') || !obj.handleItemEvents($target)) {
				return;
			}
			var $li = $target.closest('li'),
				$ul = $li.parent(),
				level = $ul.dataSM('level');
			// swap left & right keys
			if ($root.hasClass('sm-rtl')) {
				if (keyCode == 37) {
					keyCode = 39;
				} else if (keyCode == 39) {
					keyCode = 37;
				}
			}
			switch (keyCode) {
				case 37: // Left
					if (obj.isCollapsible()) {
						break;
					}
					if (level > 2 || level == 2 && $root.hasClass('sm-vertical')) {
						obj.activatedItems[level - 2].focusSM();
					// move to previous non-disabled parent item (make sure we cycle so it might be the last item)
					} else if (!$root.hasClass('sm-vertical')) {
						getPreviousItemLink((obj.activatedItems[0] || $target).closest('li')).focusSM();
					}
					break;
				case 38: // Up
					if (obj.isCollapsible()) {
						var $firstItem;
						// if this is the first item of a sub menu, move to the parent item
						if (level > 1 && ($firstItem = getFirstItemLink($ul)).length && $target[0] == $firstItem[0]) {
							obj.activatedItems[level - 2].focusSM();
						} else {
							getPreviousItemLink($li).focusSM();
						}
					} else {
						if (level == 1 && !$root.hasClass('sm-vertical') && obj.opts.bottomToTopSubMenus) {
							if (!obj.activatedItems[0] && $target.dataSM('sub')) {
								if (obj.opts.showOnClick) {
									obj.clickActivated = true;
								}
								obj.itemActivate($target);
								if ($target.dataSM('sub').is(':visible')) {
									obj.focusActivated = true;
								}
							}
							if (obj.activatedItems[0] && obj.activatedItems[0].dataSM('sub') && obj.activatedItems[0].dataSM('sub').is(':visible') && !obj.activatedItems[0].dataSM('sub').hasClass('mega-menu')) {
								getLastItemLink(obj.activatedItems[0].dataSM('sub')).focusSM();
							}
						} else if (level > 1 || $root.hasClass('sm-vertical')) {
							getPreviousItemLink($li).focusSM();
						}
					}
					break;
				case 39: // Right
					if (obj.isCollapsible()) {
						break;
					}
					if (level == 1 && $root.hasClass('sm-vertical')) {
						if (!obj.activatedItems[0] && $target.dataSM('sub')) {
							if (obj.opts.showOnClick) {
								obj.clickActivated = true;
							}
							obj.itemActivate($target);
							if ($target.dataSM('sub').is(':visible')) {
								obj.focusActivated = true;
							}
						}
						if (obj.activatedItems[0] && obj.activatedItems[0].dataSM('sub') && obj.activatedItems[0].dataSM('sub').is(':visible') && !obj.activatedItems[0].dataSM('sub').hasClass('mega-menu')) {
							getFirstItemLink(obj.activatedItems[0].dataSM('sub')).focusSM();
						}
					// move to next non-disabled parent item (make sure we cycle so it might be the last item)
					} else if ((level == 1 || obj.activatedItems[level - 1] && (!obj.activatedItems[level - 1].dataSM('sub') || !obj.activatedItems[level - 1].dataSM('sub').is(':visible') || obj.activatedItems[level - 1].dataSM('sub').hasClass('mega-menu'))) && !$root.hasClass('sm-vertical')) {
						getNextItemLink((obj.activatedItems[0] || $target).closest('li')).focusSM();
					} else if (obj.activatedItems[level - 1] && obj.activatedItems[level - 1].dataSM('sub') && obj.activatedItems[level - 1].dataSM('sub').is(':visible') && !obj.activatedItems[level - 1].dataSM('sub').hasClass('mega-menu')) {
						getFirstItemLink(obj.activatedItems[level - 1].dataSM('sub')).focusSM();
					}
					break;
				case 40: // Down
					if (obj.isCollapsible()) {
						var $firstSubItem,
							$lastItem;
						// move to sub menu if appropriate
						if (obj.activatedItems[level - 1] && obj.activatedItems[level - 1].dataSM('sub') && obj.activatedItems[level - 1].dataSM('sub').is(':visible') && !obj.activatedItems[level - 1].dataSM('sub').hasClass('mega-menu') && ($firstSubItem = getFirstItemLink(obj.activatedItems[level - 1].dataSM('sub'))).length) {
							$firstSubItem.focusSM();
						// if this is the last item of a sub menu, move to the next parent item
						} else if (level > 1 && ($lastItem = getLastItemLink($ul)).length && $target[0] == $lastItem[0]) {
							var $parentItem = obj.activatedItems[level - 2].closest('li'),
								$nextParentItem = null;
							while ($parentItem.is('li') && !($nextParentItem = getNextItemLink($parentItem, true)).length) {
								$parentItem = $parentItem.parent().parent();
							}
							if ($nextParentItem.length) {
								$nextParentItem.focusSM();
							} else {
								getFirstItemLink($root).focusSM();
							}
						} else {
							getNextItemLink($li).focusSM();
						}
					} else {
						if (level == 1 && !$root.hasClass('sm-vertical') && !obj.opts.bottomToTopSubMenus) {
							if (!obj.activatedItems[0] && $target.dataSM('sub')) {
								if (obj.opts.showOnClick) {
									obj.clickActivated = true;
								}
								obj.itemActivate($target);
								if ($target.dataSM('sub').is(':visible')) {
									obj.focusActivated = true;
								}
							}
							if (obj.activatedItems[0] && obj.activatedItems[0].dataSM('sub') && obj.activatedItems[0].dataSM('sub').is(':visible') && !obj.activatedItems[0].dataSM('sub').hasClass('mega-menu')) {
								getFirstItemLink(obj.activatedItems[0].dataSM('sub')).focusSM();
							}
						} else if (level > 1 || $root.hasClass('sm-vertical')) {
							getNextItemLink($li).focusSM();
						}
					}
					break;
			}
			e.stopPropagation();
			e.preventDefault();
		}
	});

	// hook it
	$(document).delegate('ul.sm, ul.navbar-nav:not([data-sm-skip])', 'keydown.smartmenus', $.SmartMenus.Keyboard.docKeydown);

	$.extend($.SmartMenus.prototype, {
		keyboardSetHotkey: function(keyCode, modifiers) {
			var self = this;
			$(document).bind('keydown.smartmenus' + this.rootId, function(e) {
				if (keyCode == e.keyCode) {
					var procede = true;
					if (modifiers) {
						if (typeof modifiers == 'string') {
							modifiers = [modifiers];
						}
						$.each(['ctrlKey', 'shiftKey', 'altKey', 'metaKey'], function(index, value) {
							if ($.inArray(value, modifiers) >= 0 && !e[value] || $.inArray(value, modifiers) < 0 && e[value]) {
								procede = false;
								return false;
							}
						});
					}
					if (procede) {
						getFirstItemLink(self.$root).focusSM();
						e.stopPropagation();
						e.preventDefault();
					}
				}
			});
		}
	});

	return $;
}));