/**
 * emojiarea - A rich textarea control that supports emojis, WYSIWYG-style.
 * Copyright (c) 2012 DIY Co
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this
 * file except in compliance with the License. You may obtain a copy of the License at:
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF
 * ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 *
 * @author Brian Reavis <brian@diy.org>
 */

/**
 * This file also contains some modifications by Igor Zhukov in order to add
 * custom scrollbars to EmojiMenu See keyword `MODIFICATION` in source code.
 */
(function($, window, document) {

	var ELEMENT_NODE = 1;
	var TEXT_NODE = 3;
	var TAGS_BLOCK = [ 'p', 'div', 'pre', 'form' ];
	var KEY_ESC = 27;
	var KEY_TAB = 9;
	
	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/*
	 * ! MODIFICATION START Options 'spritesheetPath', 'spritesheetDimens',
	 * 'iconSize' added by Andre Staltz.
	 */
	$.emojiarea = {
		assetsPath : '',
		iconSize : 25,
		icons : {},
	};
	var defaultRecentEmojis = ':joy:,:kissing_heart:,:heart:,:heart_eyes:,:blush:,:grin:,:+1:,:relaxed:,:pensive:,:smile:,:sob:,:kiss:,:unamused:,:flushed:,:stuck_out_tongue_winking_eye:,:see_no_evil:,:wink:,:smiley:,:cry:,:stuck_out_tongue_closed_eyes:,:scream:,:rage:,:smirk:,:disappointed:,:sweat_smile:,:kissing_closed_eyes:,:speak_no_evil:,:relieved:,:grinning:,:yum:,:laughing:,:ok_hand:,:neutral_face:,:confused:'
			.split(',');
	/* ! MODIFICATION END */

	$.fn.emojiarea = function(options) {
		options = $.extend({}, options);
		return this
			.each(function () {
				var originalInput = $(this);
				if ('contentEditable' in document.body
					&& options.wysiwyg !== false) {
					var id = getGuid();
					new EmojiArea_WYSIWYG(originalInput, id, $.extend({}, options));
				} else {
					var id = getGuid();
					new EmojiArea_Plain(originalInput, id, options);
				}
				originalInput.attr(
					{
						'data-emojiable': 'converted',
						'data-id': id,
						'data-type': 'original-input'
					});
			});
	};

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	var util = {};

	util.restoreSelection = (function() {
		if (window.getSelection) {
			return function(savedSelection) {
				var sel = window.getSelection();
				sel.removeAllRanges();
				for (var i = 0, len = savedSelection.length; i < len; ++i) {
					sel.addRange(savedSelection[i]);
				}
			};
		} else if (document.selection && document.selection.createRange) {
			return function(savedSelection) {
				if (savedSelection) {
					savedSelection.select();
				}
			};
		}
	})();

	util.saveSelection = (function() {
		if (window.getSelection) {
			return function() {
				var sel = window.getSelection(), ranges = [];
				if (sel.rangeCount) {
					for (var i = 0, len = sel.rangeCount; i < len; ++i) {
						ranges.push(sel.getRangeAt(i));
					}
				}
				return ranges;
			};
		} else if (document.selection && document.selection.createRange) {
			return function() {
				var sel = document.selection;
				return (sel.type.toLowerCase() !== 'none') ? sel.createRange()
						: null;
			};
		}
	})();

	util.replaceSelection = (function() {
		if (window.getSelection) {
			return function(content) {
				var range, sel = window.getSelection();
				var node = typeof content === 'string' ? document
						.createTextNode(content) : content;
				if (sel.getRangeAt && sel.rangeCount) {
					range = sel.getRangeAt(0);
					range.deleteContents();
					//range.insertNode(document.createTextNode(''));
					range.insertNode(node);
					range.setStart(node, 0);

					window.setTimeout(function() {
						range = document.createRange();
						range.setStartAfter(node);
						range.collapse(true);
						sel.removeAllRanges();
						sel.addRange(range);
					}, 0);
				}
			}
		} else if (document.selection && document.selection.createRange) {
			return function(content) {
				var range = document.selection.createRange();
				if (typeof content === 'string') {
					range.text = content;
				} else {
					range.pasteHTML(content.outerHTML);
				}
			}
		}
	})();

	util.insertAtCursor = function(text, el) {
		text = ' ' + text;
		var val = el.value, endIndex, startIndex, range;
		if (typeof el.selectionStart != 'undefined'
				&& typeof el.selectionEnd != 'undefined') {
			startIndex = el.selectionStart;
			endIndex = el.selectionEnd;
			el.value = val.substring(0, startIndex) + text
					+ val.substring(el.selectionEnd);
			el.selectionStart = el.selectionEnd = startIndex + text.length;
		} else if (typeof document.selection != 'undefined'
				&& typeof document.selection.createRange != 'undefined') {
			el.focus();
			range = document.selection.createRange();
			range.text = text;
			range.select();
		}
	};

	util.extend = function(a, b) {
		if (typeof a === 'undefined' || !a) {
			a = {};
		}
		if (typeof b === 'object') {
			for ( var key in b) {
				if (b.hasOwnProperty(key)) {
					a[key] = b[key];
				}
			}
		}
		return a;
	};

	util.escapeRegex = function(str) {
		return (str + '').replace(/([.?*+^$[\]\\(){}|-])/g, '\\$1');
	};

	util.htmlEntities = function(str) {
		return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
				.replace(/>/g, '&gt;').replace(/"/g, '&quot;');
	};

	/*
	 * ! MODIFICATION START This function was added by Igor Zhukov to save
	 * recent used emojis.
	 */
	util.emojiInserted = function(emojiKey, menu) {
		ConfigStorage.get('emojis_recent', function(curEmojis) {
			curEmojis = curEmojis || defaultRecentEmojis || [];

			var pos = curEmojis.indexOf(emojiKey);
			if (!pos) {
				return false;
			}
			if (pos != -1) {
				curEmojis.splice(pos, 1);
			}
			curEmojis.unshift(emojiKey);
			if (curEmojis.length > 42) {
				curEmojis = curEmojis.slice(42);
			}

			ConfigStorage.set({
				emojis_recent : curEmojis
			});
		})
	};
	/* ! MODIFICATION END */

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	var EmojiArea = function() {
	};

	EmojiArea.prototype.setup = function() {
		var self = this;

		this.$editor.on('focus', function() {
			self.hasFocus = true;
		});
		this.$editor.on('blur', function() {
			self.hasFocus = false;
		});

    // Assign a unique instance of an emojiMenu to
    self.emojiMenu = new EmojiMenu(self);

		this.setupButton();
	};

	EmojiArea.prototype.setupButton = function() {
		var self = this;
		var $button = $('[data-id=' + this.id + '][data-type=picker]');

    $button.on('click', function(e) {
      self.emojiMenu.show(self);
		});

		this.$button = $button;
    this.$dontHideOnClick = 'emoji-picker';
	};

	/*
	 * ! MODIFICATION START This function was modified by Andre Staltz so that
	 * the icon is created from a spritesheet.
	 */
	EmojiArea.createIcon = function(emoji, menu) {
		var category = emoji[0];
		var row = emoji[1];
		var column = emoji[2];
		var name = emoji[3];
		var filename = $.emojiarea.assetsPath + '/emoji_spritesheet_!.png';
    var blankGifPath = $.emojiarea.assetsPath + '/blank.gif';
		var iconSize = menu && Config.Mobile ? 26 : $.emojiarea.iconSize
		var xoffset = -(iconSize * column);
		var yoffset = -(iconSize * row);
		var scaledWidth = (Config.EmojiCategorySpritesheetDimens[category][1] * iconSize);
		var scaledHeight = (Config.EmojiCategorySpritesheetDimens[category][0] * iconSize);

		var style = 'display:inline-block;';
		style += 'width:' + iconSize + 'px;';
		style += 'height:' + iconSize + 'px;';
		style += 'background:url(\'' + filename.replace('!', category) + '\') '
				+ xoffset + 'px ' + yoffset + 'px no-repeat;';
		style += 'background-size:' + scaledWidth + 'px ' + scaledHeight
				+ 'px;';
		return '<img src="' + blankGifPath + '" class="img" style="'
				+ style + '" alt="' + util.htmlEntities(name) + '">';
	};
	
	$.emojiarea.createIcon = EmojiArea.createIcon;
	/* ! MODIFICATION END */

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
	/**
	 * Editor (plain-text)
	 * 
	 * @constructor
	 * @param {object}
	 *            $textarea
	 * @param {object}
	 *            options
	 */

	var EmojiArea_Plain = function($textarea, id, options) {
		this.options = options;
		this.$textarea = $textarea;
		this.$editor = $textarea;
    this.id = id;
		this.setup();
	};

	EmojiArea_Plain.prototype.insert = function(emoji) {
		if (!$.emojiarea.icons.hasOwnProperty(emoji))
			return;
		util.insertAtCursor(emoji, this.$textarea[0]);
		/*
		 * MODIFICATION: Following line was added by Igor Zhukov, in order to
		 * save recent emojis
		 */
		util.emojiInserted(emoji, this.menu);
		this.$textarea.trigger('change');
	};

	EmojiArea_Plain.prototype.val = function() {
		if (this.$textarea == '\n')
			return '';
		return this.$textarea.val();
	};

	util.extend(EmojiArea_Plain.prototype, EmojiArea.prototype);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

	/**
	 * Editor (rich)
	 * 
	 * @constructor
	 * @param {object}
	 *            $textarea
	 * @param {object}
	 *            options
	 */

	var EmojiArea_WYSIWYG = function($textarea, id, options) {
		var self = this;

		this.options = options || {};
		if ($($textarea).attr('data-emoji-input') === 'unicode')
			this.options.inputMethod = 'unicode';
		else
			this.options.inputMethod = 'image';
    this.id = id;
		this.$textarea = $textarea;
    this.emojiPopup = options.emojiPopup;
		this.$editor = $('<div>').addClass('emoji-wysiwyg-editor').addClass($($textarea)[0].className);
    this.$editor.data('self', this);

    if ($textarea.attr('maxlength')) {
      this.$editor.attr('maxlength', $textarea.attr('maxlength'));
    }
    var unicodeToImageText = this.emojiPopup.unicodeToImage($textarea.val());
		this.$editor.html(unicodeToImageText);
		this.$editor.attr({
			'data-id': id,
			'data-type': 'input',
			'placeholder': $textarea.attr('placeholder'),
			'contenteditable': 'true',
		});

		/*
		 * ! MODIFICATION START Following code was modified by Igor Zhukov, in
		 * order to improve rich text paste
		 */
		var changeEvents = 'blur change';
		if (!this.options.norealTime) {
			changeEvents += ' keyup';
		}
		this.$editor.on(changeEvents, function(e) {
			return self.onChange.apply(self, [ e ]);
		});
		/* ! MODIFICATION END */

		this.$editor.on('mousedown focus', function() {
			document.execCommand('enableObjectResizing', false, false);
		});
		this.$editor.on('blur', function() {
			document.execCommand('enableObjectResizing', true, true);
		});

    var editorDiv = this.$editor;
		this.$editor.on("change keydown keyup resize scroll", function(e) {

      if(e.which != 8 && editorDiv.text().length + editorDiv.find('img').length >= editorDiv.attr('maxlength'))
      {
        e.preventDefault();
      }
      self.updateBodyPadding(editorDiv);
    });

    $textarea.after("<i class='emoji-picker-icon emoji-picker " + this.options.popupButtonClasses + "' data-id='" + id + "' data-type='picker'></i>");

		$textarea.hide().after(this.$editor);
		this.setup();

		/*
		 * MODIFICATION: Following line was modified by Igor Zhukov, in order to
		 * improve emoji insert behaviour
		 */
		$(document.body).on('mousedown', function() {
			if (self.hasFocus) {
				self.selection = util.saveSelection();
			}
		});
	};

  EmojiArea_WYSIWYG.prototype.updateBodyPadding = function(target) {
    var emojiPicker = $('[data-id=' + this.id + '][data-type=picker]');
    if ($(target).hasScrollbar()) {
      if (!(emojiPicker.hasClass('parent-has-scroll')))
        emojiPicker.addClass('parent-has-scroll');
      if (!($(target).hasClass('parent-has-scroll')))
        $(target).addClass('parent-has-scroll');
    } else {
      if ((emojiPicker.hasClass('parent-has-scroll')))
        emojiPicker.removeClass('parent-has-scroll');
      if (($(target).hasClass('parent-has-scroll')))
        $(target).removeClass('parent-has-scroll');
    }
  };

	EmojiArea_WYSIWYG.prototype.onChange = function(e) {
		this.$textarea.val(this.val()).trigger('change');
	};

	EmojiArea_WYSIWYG.prototype.insert = function(emoji) {
		var content;
		/*
		 * MODIFICATION: Following line was modified by Andre Staltz, to use new
		 * implementation of createIcon function.
		 */
		var insertionContent = '';
		if (this.options.inputMethod == 'unicode') {
			insertionContent = this.emojiPopup.colonToUnicode(emoji);
		} else {
			var $img = $(EmojiArea.createIcon($.emojiarea.icons[emoji]));
			if ($img[0].attachEvent) {
				$img[0].attachEvent('onresizestart', function(e) {
					e.returnValue = false;
				}, false);
			}
			insertionContent = $img[0];
		}

		this.$editor.trigger('focus');
		if (this.selection) {
			util.restoreSelection(this.selection);
		}
		try {
			util.replaceSelection(insertionContent);
		} catch (e) {
		}

		/*
		 * MODIFICATION: Following line was added by Igor Zhukov, in order to
		 * save recent emojis
		 */
		util.emojiInserted(emoji, this.menu);

		this.onChange();
	};

	EmojiArea_WYSIWYG.prototype.val = function() {
		var lines = [];
		var line = [];
    var emojiPopup = this.emojiPopup;

		var flush = function() {
			lines.push(line.join(''));
			line = [];
		};

		var sanitizeNode = function(node) {
			if (node.nodeType === TEXT_NODE) {
				line.push(node.nodeValue);
			} else if (node.nodeType === ELEMENT_NODE) {
				var tagName = node.tagName.toLowerCase();
				var isBlock = TAGS_BLOCK.indexOf(tagName) !== -1;

				if (isBlock && line.length)
					flush();

				if (tagName === 'img') {
					var alt = node.getAttribute('alt') || '';
					if (alt) {
							line.push(alt);
					}
					return;
				} else if (tagName === 'br') {
					flush();
				}

				var children = node.childNodes;
				for (var i = 0; i < children.length; i++) {
					 sanitizeNode(children[i]);
				}

				if (isBlock && line.length)
					flush();
			}
		};

		var children = this.$editor[0].childNodes;
		for (var i = 0; i < children.length; i++) {
			sanitizeNode(children[i]);
		}

		if (line.length)
			flush();

		var returnValue = lines.join('\n');
    return emojiPopup.colonToUnicode(returnValue);
	};

	util.extend(EmojiArea_WYSIWYG.prototype, EmojiArea.prototype);

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

  jQuery.fn.hasScrollbar = function() {
    var scrollHeight = this.get(0).scrollHeight;

    //safari's scrollHeight includes padding
    //if ($.browser.safari)
//      scrollHeight -= parseInt(this.css('padding-top')) + parseInt(this.css('padding-bottom'));
    if (this.outerHeight() < scrollHeight)
      return true;
    else
      return false;
  }

	/**
	 * Emoji Dropdown Menu
	 * 
	 * @constructor
	 * @param {object}
	 *            emojiarea
	 */
	var EmojiMenu = function(emojiarea) {
		var self = this;
    self.id = emojiarea.id;
		var $body = $(document.body);
		var $window = $(window);

		this.visible = false;
		this.emojiarea = emojiarea;
		EmojiMenu.menuZIndex = 5000;
		this.$menu = $('<div>');
		this.$menu.addClass('emoji-menu');
    this.$menu.attr('data-id', self.id);
    this.$menu.attr('data-type', 'menu');
		this.$menu.hide();

		/*
		 * ! MODIFICATION START Following code was modified by Igor Zhukov, in
		 * order to add scrollbars and tail to EmojiMenu Also modified by Andre
		 * Staltz, to include tabs for categories, on the menu header.
		 */
		this.$itemsTailWrap = $('<div class="emoji-items-wrap1"></div>')
				.appendTo(this.$menu);
		this.$categoryTabs = $(
				'<table class="emoji-menu-tabs"><tr>'
						+ '<td><a class="emoji-menu-tab icon-recent" ></a></td>'
						+ '<td><a class="emoji-menu-tab icon-smile" ></a></td>'
						+ '<td><a class="emoji-menu-tab icon-flower"></a></td>'
						+ '<td><a class="emoji-menu-tab icon-bell"></a></td>'
						+ '<td><a class="emoji-menu-tab icon-car"></a></td>'
						+ '<td><a class="emoji-menu-tab icon-grid"></a></td>'
						+ '</tr></table>').appendTo(this.$itemsTailWrap);
		this.$itemsWrap = $(
				'<div class="emoji-items-wrap nano mobile_scrollable_wrap"></div>')
				.appendTo(this.$itemsTailWrap);
		this.$items = $('<div class="emoji-items nano-content">').appendTo(
				this.$itemsWrap);
		/* ! MODIFICATION END */

		$body.append(this.$menu);

		/*
		 * ! MODIFICATION: Following 3 lines were added by Igor Zhukov, in order
		 * to add scrollbars to EmojiMenu
		 */
		
		  if (!Config.Mobile) {
		  this.$itemsWrap.nanoScroller({preventPageScrolling: true, tabIndex:
		  -1}); }
		 
		
		//this.$itemsWrap.nanoScroller({preventPageScrolling: true, tabIndex:* -1});

		$body.on('keydown', function(e) {
			if (e.keyCode === KEY_ESC || e.keyCode === KEY_TAB) {
				self.hide();
			}
		});

		/*
		 * ! MODIFICATION: Following 3 lines were added by Igor Zhukov, in order
		 * to hide menu on message submit with keyboard
		 */
		$body.on('message_send', function(e) {
			self.hide();
		});

		$body.on('mouseup', function(e) {
			/*
			 * ! MODIFICATION START Following code was added by Igor Zhukov, in
			 * order to prevent close on click on EmojiMenu scrollbar
			 */
			e = e.originalEvent || e;
			var target = e.originalTarget || e.target || window;

      if ($(target).hasClass(self.emojiarea.$dontHideOnClick)) {
        return;
      }

			while (target && target != window) {
				target = target.parentNode;
				if (target == self.$menu[0] || self.emojiarea
						&& target == self.emojiarea.$button[0]) {
					return;
				}
			}
			/* ! MODIFICATION END */
			self.hide();
		});

		$window.on('resize', function() {
			if (self.visible)
				self.reposition();
		});

		this.$menu.on('mouseup', 'a', function(e) {
			e.stopPropagation();
			return false;
		});

		this.$menu.on('click', 'a', function(e) {
      self.emojiarea.updateBodyPadding(self.emojiarea.$editor);
			/*
			 * ! MODIFICATION START Following code was modified by Andre Staltz,
			 * to capture clicks on category tabs and change the category
			 * selection.
			 */
			if ($(this).hasClass('emoji-menu-tab')) {
				if (self.getTabIndex(this) !== self.currentCategory) {
					self.selectCategory(self.getTabIndex(this));
				}
				return false;
			}
			/* ! MODIFICATION END */
			var emoji = $('.label', $(this)).text();
			window.setTimeout(function() {
				self.onItemSelected(emoji);
				/*
				 * ! MODIFICATION START Following code was modified by Igor
				 * Zhukov, in order to close only on ctrl-, alt- emoji select
				 */
				if (e.ctrlKey || e.metaKey) {
					self.hide();
				}
				/* ! MODIFICATION END */
			}, 0);
			e.stopPropagation();
			return false;
		});

		/*
		 * MODIFICATION: Following line was modified by Andre Staltz, in order
		 * to select a default category.
		 */
		this.selectCategory(0);
	};

	/*
	 * ! MODIFICATION START Following code was added by Andre Staltz, to
	 * implement category selection.
	 */
	EmojiMenu.prototype.getTabIndex = function(tab) {
		return this.$categoryTabs.find('.emoji-menu-tab').index(tab);
	};

	EmojiMenu.prototype.selectCategory = function(category) {
		var self = this;
		this.$categoryTabs.find('.emoji-menu-tab').each(function(index) {
			if (index === category) {
				this.className += '-selected';
			} else {
				this.className = this.className.replace('-selected', '');
			}
		});
		this.currentCategory = category;
		this.load(category);

		
		 if (!Config.Mobile) { this.$itemsWrap.nanoScroller({ scroll: 'top'
		 }); }
		 
		 
		 
	};
	/* ! MODIFICATION END */

	EmojiMenu.prototype.onItemSelected = function(emoji) {
    if(this.emojiarea.$editor.text().length + this.emojiarea.$editor.find('img').length >= this.emojiarea.$editor.attr('maxlength'))
    {
      return;
    }
		this.emojiarea.insert(emoji);
	};

	/*
	 * MODIFICATION: The following function argument was modified by Andre
	 * Staltz, in order to load only icons from a category. Also function was
	 * modified by Igor Zhukov in order to display recent emojis from
	 * localStorage
	 */
	EmojiMenu.prototype.load = function(category) {
		var html = [];
		var options = $.emojiarea.icons;
		var path = $.emojiarea.assetsPath;
		var self = this;
		if (path.length && path.charAt(path.length - 1) !== '/') {
			path += '/';
		}

		/*
		 * ! MODIFICATION: Following function was added by Igor Zhukov, in order
		 * to add scrollbars to EmojiMenu
		 */
		var updateItems = function() {
			self.$items.html(html.join(''));

			
			  if (!Config.Mobile) { setTimeout(function () {
			  self.$itemsWrap.nanoScroller(); }, 100); }
			 
		}

		if (category > 0) {
			for ( var key in options) {
				/*
				 * MODIFICATION: The following 2 lines were modified by Andre
				 * Staltz, in order to load only icons from the specified
				 * category.
				 */
				if (options.hasOwnProperty(key)
						&& options[key][0] === (category - 1)) {
					html.push('<a href="javascript:void(0)" title="'
							+ util.htmlEntities(key) + '">'
							+ EmojiArea.createIcon(options[key], true)
							+ '<span class="label">' + util.htmlEntities(key)
							+ '</span></a>');
				}
			}
			updateItems();
		} else {
			ConfigStorage.get('emojis_recent', function(curEmojis) {
				curEmojis = curEmojis || defaultRecentEmojis || [];
				var key, i;
				for (i = 0; i < curEmojis.length; i++) {
					key = curEmojis[i]
					if (options[key]) {
						html.push('<a href="javascript:void(0)" title="'
								+ util.htmlEntities(key) + '">'
								+ EmojiArea.createIcon(options[key], true)
								+ '<span class="label">'
								+ util.htmlEntities(key) + '</span></a>');
					}
				}
				updateItems();
			});
		}0
	};

	EmojiMenu.prototype.reposition = function() {
    if (!this.tether) {

      this.tether = new Tether({
        element: '[data-id="' + this.id + '"][data-type="menu"]',
        target: '[data-id="' + this.id + '"][data-type="picker"]',
        attachment: 'left center',
        targetAttachment: 'bottom left',
        offset: '0 12px',
        constraints: [
          {
            to: 'html',
            pin: true
          }
        ]
      });
    }
	};

  EmojiMenu.prototype.hide = function(callback) {
    this.visible = false;
    this.$menu.hide("fast");
  };

  EmojiMenu.prototype.show = function(emojiarea) {
    /*
     * MODIFICATION: Following line was modified by Igor Zhukov, in order to
     * improve EmojiMenu behaviour
     */
    if (this.visible)
      return this.hide();
    this.reposition();
		$(this.$menu).css('z-index', ++EmojiMenu.menuZIndex);
    this.$menu.show("fast");
    /*
     * MODIFICATION: Following 3 lines were added by Igor Zhukov, in order
     * to update EmojiMenu contents
     */
    if (!this.currentCategory) {
      this.load(0);
    }
    this.visible = true;
  };

})(jQuery, window, document);