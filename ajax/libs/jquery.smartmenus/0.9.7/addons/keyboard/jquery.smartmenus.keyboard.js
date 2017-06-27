/*!
 * SmartMenus jQuery Plugin Keyboard Addon - v0.1.0 - August 25, 2014
 * http://www.smartmenus.org/
 *
 * Copyright 2014 Vasil Dinkov, Vadikom Web Ltd.
 * http://vadikom.com
 *
 * Licensed MIT
 */

(function($) {

	function getFirstItemLink($ul) {
		return $ul.find('> li > a:not(.disabled)').eq(0);
	}
	function getLastItemLink($ul) {
		return $ul.find('> li > a:not(.disabled)').eq(-1);
	}
	function getNextItemLink($li, noLoop) {
		var $a = $li.nextAll('li').children('a:not(.disabled)').eq(0);
		return noLoop || $a.length ? $a : getFirstItemLink($li.parent());
	}
	function getPreviousItemLink($li, noLoop) {
		var $a = $li.prevAll('li').children('a:not(.disabled)').eq(0);
		return noLoop || $a.length ? $a : getLastItemLink($li.parent());
	}

	// jQuery's .focus() is unreliable in some versions, so we're going to call the links' native JS focus method
	$.fn.focusSM = function() {
		if (this.length && this[0].focus) {
			this[0].focus();
		}
		return this;
	}

	$.extend($.SmartMenus.Keyboard = {}, {
		docKeydown: function(e) {
			var keyCode = e.keyCode;
			if (!/(27|37|38|39|40)/.test(keyCode)) {
				return;
			}
			var $root = $(this),
				obj = $root.data('smartmenus'),
				$target = $(e.target);
			if (!obj || !$target.is('a')) {
				return;
			}
			var $li = $target.parent(),
				$ul = $li.parent(),
				level = $ul.dataSM('level');
			// exit it if this is an A inside a mega drop-down
			if (!level) {
				return;
			}
			// swap left & right keys
			if (obj.opts.rightToLeftSubMenus) {
				if (keyCode == 37) {
					keyCode = 39;
				} else if (keyCode == 39) {
					keyCode = 37;
				}
			}
			switch (keyCode) {
				case 27: // Esc
					if (obj.visibleSubMenus[level]) {
						obj.menuHide(obj.visibleSubMenus[level]);
					} else if (level == 1) {
						if (obj.opts.isPopup) {
							obj.menuHideAll();
						}
						if (obj.opts.keyboardEscapeFocus) {
							try { obj.opts.keyboardEscapeFocus.focusSM(); } catch(e) {};
						// focus next focusable page element
						} else {
							var $lastMenuFocusable = $root.find('a, input, select, button, textarea').eq(-1),
								$allFocusables = $('a, input, select, button, textarea'),
								nextFocusableIndex = $allFocusables.index($lastMenuFocusable[0]) + 1;
							$allFocusables.eq(nextFocusableIndex).focusSM();
						}
					} else {
						$ul.dataSM('parent-a').focusSM();
						obj.menuHide(obj.visibleSubMenus[level - 1]);
					}
					break;
				case 37: // Left
					if (obj.isCollapsible()) {
						break;
					}
 					if (level > 2 || level == 2 && $root.hasClass('sm-vertical')) {
						obj.activatedItems[level - 2].focusSM();
					// move to previous non-disabled parent item (make sure we cycle so it might be the last item)
					} else if (!$root.hasClass('sm-vertical')) {
						getPreviousItemLink(obj.activatedItems[0].parent()).focusSM();
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
						if (level == 1 && !$root.hasClass('sm-vertical') && obj.visibleSubMenus[level] && obj.opts.bottomToTopSubMenus) {
							getLastItemLink(obj.visibleSubMenus[level]).focusSM();
						} else if (level > 1 || $root.hasClass('sm-vertical')) {
							getPreviousItemLink($li).focusSM();
						}
					}
					break;
				case 39: // Right
					if (obj.isCollapsible()) {
						break;
					}
					// move to next non-disabled parent item (make sure we cycle so it might be the last item)
					if ((level == 1 || !obj.visibleSubMenus[level]) && !$root.hasClass('sm-vertical')) {
						getNextItemLink(obj.activatedItems[0].parent()).focusSM();
					} else if (obj.visibleSubMenus[level] && !obj.visibleSubMenus[level].hasClass('mega-menu')) {
						getFirstItemLink(obj.visibleSubMenus[level]).focusSM();
					}
					break;
				case 40: // Down
					if (obj.isCollapsible()) {
						var $firstSubItem,
							$lastItem;
						// move to sub menu if appropriate
						if (obj.visibleSubMenus[level] && !obj.visibleSubMenus[level].hasClass('mega-menu') && ($firstSubItem = getFirstItemLink(obj.visibleSubMenus[level])).length) {
							$firstSubItem.focusSM();
						// if this is the last item of a sub menu, move to the next parent item
						} else if (level > 1 && ($lastItem = getLastItemLink($ul)).length && $target[0] == $lastItem[0]) {
							var $parentItem = obj.activatedItems[level - 2].parent(),
								$nextParentItem = null;
							while ($parentItem.is('li')) {
								if (($nextParentItem = getNextItemLink($parentItem, true)).length) {
									break;
								}
								$parentItem = $parentItem.parent().parent();
							}
							$nextParentItem.focusSM();
						} else {
							getNextItemLink($li).focusSM();
						}
					} else {
						if (level == 1 && !$root.hasClass('sm-vertical') && obj.visibleSubMenus[level] && !obj.opts.bottomToTopSubMenus) {
							getFirstItemLink(obj.visibleSubMenus[level]).focusSM();
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
	$(document).delegate('ul.sm', 'keydown.smartmenus', $.SmartMenus.Keyboard.docKeydown);

	$.extend($.SmartMenus.prototype, {
		keyboardSetEscapeFocus: function($elm) {
			this.opts.keyboardEscapeFocus = $elm;
		},
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

})(jQuery);