"use strict";

;(function() {

	var root = this;
	var previous_emoji = root.EmojiConvertor;


	/**
	 * @global
	 * @namespace
	 */

	var emoji = function(){

		var self = this;

		/**
		 * The set of images to use for graphical emoji.
		 *
		 * @memberof emoji
		 * @type {string}
		 */
		self.img_set = 'apple';

		/**
		 * Configuration details for different image sets. This includes a path to a directory containing the
		 * individual images (`path`) and a URL to sprite sheets (`sheet`). All of these images can be found
		 * in the [emoji-data repository]{@link https://github.com/iamcal/emoji-data}. Using a CDN for these
		 * is not a bad idea.
		 *
		 * @memberof emoji
		 * @type {object}
		 */
		self.img_sets = {
			'apple' : {'path' : '/emoji-data/img-apple-64/', 'sheet' : '/emoji-data/sheet_apple_64.png', 'sheet_size' : 64, 'mask' : 1},
			'google' : {'path' : '/emoji-data/img-google-64/', 'sheet' : '/emoji-data/sheet_google_64.png', 'sheet_size' : 64, 'mask' : 2},
			'twitter' : {'path' : '/emoji-data/img-twitter-64/', 'sheet' : '/emoji-data/sheet_twitter_64.png', 'sheet_size' : 64, 'mask' : 4},
			'emojione' : {'path' : '/emoji-data/img-emojione-64/', 'sheet' : '/emoji-data/sheet_emojione_64.png', 'sheet_size' : 64, 'mask' : 8},
			'facebook' : {'path' : '/emoji-data/img-facebook-64/', 'sheet' : '/emoji-data/sheet_facebook_64.png', 'sheet_size' : 64, 'mask' : 16},
			'messenger' : {'path' : '/emoji-data/img-messenger-64/', 'sheet' : '/emoji-data/sheet_messenger_64.png', 'sheet_size' : 64, 'mask' : 32},
		};

		/**
		 * Use a CSS class instead of specifying a sprite or background image for
		 * the span representing the emoticon. This requires a CSS sheet with
		 * emoticon data-uris.
		 *
		 * @memberof emoji
		 * @type bool
		 * @todo document how to build the CSS stylesheet self requires.
		 */
		self.use_css_imgs = false;

		/**
		 * Instead of replacing emoticons with the appropriate representations,
		 * replace them with their colon string representation.
		 * @memberof emoji
		 * @type bool
		 */
		self.colons_mode = false;
		self.text_mode = false;

		/**
		 * If true, sets the "title" property on the span or image that gets
		 * inserted for the emoticon.
		 * @memberof emoji
		 * @type bool
		 */
		self.include_title = false;

		/**
		 * If true, sets the text of the span or image that gets inserted for the
		 * emoticon.
		 * @memberof emoji
		 * @type bool
		 */
		self.include_text = false;

		/**
		 * If the platform supports native emoticons, use those instead
		 * of the fallbacks.
		 * @memberof emoji
		 * @type bool
		 */
		self.allow_native = true;

		/**
		 * Wrap native with a <span class="emoji-native"></span> to allow styling
		 * @memberof emoji
		 * @type bool
		 */
		self.wrap_native = false;

		/**
		 * Set to true to use CSS sprites instead of individual images on 
		 * platforms that support it.
		 *
		 * @memberof emoji
		 * @type bool
		 */
		self.use_sheet = false;

		/**
		 *
		 * Set to true to avoid black & white native Windows emoji being used.
		 *
		 * @memberof emoji
		 * @type bool
		 */
		self.avoid_ms_emoji = true;

		/**
		 *
		 * Set to true to allow :CAPITALIZATION:
		 *
		 * @memberof emoji
		 * @type bool
		 */
		self.allow_caps = false;


		/**
		 *
		 * Suffix to allow for individual image cache busting
		 *
		 * @memberof emoji
		 * @type string
		 */
		self.img_suffix = '';


		// Keeps track of what has been initialized.
		/** @private */
		self.inits = {};
		self.map = {};

		// discover the environment settings
		self.init_env();

		return self;
	}

	emoji.prototype.noConflict = function(){
		root.EmojiConvertor = previous_emoji;
		return emoji;
	}


	/**
	 * @memberof emoji
	 * @param {string} str A string potentially containing ascii emoticons
	 * (ie. `:)`)
	 *
	 * @returns {string} A new string with all emoticons in `str`
	 * replaced by a representatation that's supported by the current
	 * environtment.
	 */
	emoji.prototype.replace_emoticons = function(str){
		var self = this;
		var colonized = self.replace_emoticons_with_colons(str);
		return self.replace_colons(colonized);
	};

	/**
	 * @memberof emoji
	 * @param {string} str A string potentially containing ascii emoticons
	 * (ie. `:)`)
	 *
	 * @returns {string} A new string with all emoticons in `str`
	 * replaced by their colon string representations (ie. `:smile:`)
	 */
	emoji.prototype.replace_emoticons_with_colons = function(str){
		var self = this;
		self.init_emoticons();
		var _prev_offset = 0;
		var emoticons_with_parens = [];
		var str_replaced = str.replace(self.rx_emoticons, function(m, $1, emoticon, offset){
			var prev_offset = _prev_offset;
			_prev_offset = offset + m.length;

			var has_open_paren = emoticon.indexOf('(') !== -1;
			var has_close_paren = emoticon.indexOf(')') !== -1;

			/*
			 * Track paren-having emoticons for fixing later
			 */
			if ((has_open_paren || has_close_paren) && emoticons_with_parens.indexOf(emoticon) == -1) {
				emoticons_with_parens.push(emoticon);
			}

			/*
			 * Look for preceding open paren for emoticons that contain a close paren
			 * This prevents matching "8)" inside "(around 7 - 8)"
			 */
			if (has_close_paren && !has_open_paren) {
				var piece = str.substring(prev_offset, offset);
				if (piece.indexOf('(') !== -1 && piece.indexOf(')') === -1) return m;
			}

			/*
			 * See if we're in a numbered list
			 * This prevents matching "8)" inside "7) foo\n8) bar"
			 */
			if (m === '\n8)') {
				var before_match = str.substring(0, offset);
				if (/\n?(6\)|7\))/.test(before_match)) return m;
			}

			var val = self.data[self.map.emoticons[emoticon]][3][0];
			return val ? $1+':'+val+':' : m;
		});

		/*
		 * Come back and fix emoticons we ignored because they were inside parens.
		 * It's useful to do self at the end so we don't get tripped up by other,
		 * normal emoticons
		 */
		if (emoticons_with_parens.length) {
			var escaped_emoticons = emoticons_with_parens.map(self.escape_rx);
			var parenthetical_rx = new RegExp('(\\(.+)('+escaped_emoticons.join('|')+')(.+\\))', 'g');

			str_replaced = str_replaced.replace(parenthetical_rx, function(m, $1, emoticon, $2) {
				var val = self.data[self.map.emoticons[emoticon]][3][0];
				return val ? $1+':'+val+':'+$2 : m;
			});
		}

		return str_replaced;
	};

	/**
	 * @memberof emoji
	 * @param {string} str A string potentially containing colon string
	 * representations of emoticons (ie. `:smile:`)
	 *
	 * @returns {string} A new string with all colon string emoticons replaced
	 * with the appropriate representation.
	 */
	emoji.prototype.replace_colons = function(str){
		var self = this;
		self.init_colons();

		return str.replace(self.rx_colons, function(m){
			var idx = m.substr(1, m.length-2);
			if (self.allow_caps) idx = idx.toLowerCase();

			// special case - an emoji with a skintone modified
			if (idx.indexOf('::skin-tone-') > -1){

				var skin_tone = idx.substr(-1, 1);
				var skin_idx = 'skin-tone-'+skin_tone;
				var skin_val = self.map.colons[skin_idx];

				idx = idx.substr(0, idx.length - 13);

				var val = self.map.colons[idx];
				if (val){
					return self.replacement(val, idx, ':', {
						'idx'		: skin_val,
						'actual'	: skin_idx,
						'wrapper'	: ':'
					});
				}else{
					return ':' + idx + ':' + self.replacement(skin_val, skin_idx, ':');
				}
			}else{
				var val = self.map.colons[idx];
				return val ? self.replacement(val, idx, ':') : m;
			}
		});
	};

	/**
	 * @memberof emoji
	 * @param {string} str A string potentially containing unified unicode
	 * emoticons. (ie. 😄)
	 *
	 * @returns {string} A new string with all unicode emoticons replaced with
	 * the appropriate representation for the current environment.
	 */
	emoji.prototype.replace_unified = function(str){
		var self = this;
		self.init_unified();
		return str.replace(self.rx_unified, function(m, p1, p2){

			var val = self.map.unified[p1];
			if (val){
				var idx = null;
				if (p2 == '\uD83C\uDFFB') idx = '1f3fb';
				if (p2 == '\uD83C\uDFFC') idx = '1f3fc';
				if (p2 == '\uD83C\uDFFD') idx = '1f3fd';
				if (p2 == '\uD83C\uDFFE') idx = '1f3fe';
				if (p2 == '\uD83C\uDFFF') idx = '1f3ff';
				if (idx){
					return self.replacement(val, null, null, {
						idx	: idx,
						actual	: p2,
						wrapper	: ''
					});
					}
				return self.replacement(val);
			}

			val = self.map.unified_vars[p1];
			if (val){
				return self.replacement(val[0], null, null, {
					'idx'		: val[1],
					'actual'	: '',
					'wrapper'	: '',
				});
			}

			return m;
		});
	};

	emoji.prototype.addAliases = function(map){
		var self = this;

		self.init_colons();
		for (var i in map){
			self.map.colons[i] = map[i];
		}
	};

	emoji.prototype.removeAliases = function(list){
		var self = this;

		for (var i=0; i<list.length; i++){
			var alias = list[i];

			// first, delete the alias mapping
			delete self.map.colons[alias];

			// now reset it to the default, if one exists
			finder_block: {
				for (var j in self.data){
					for (var k=0; k<self.data[j][3].length; k++){
						if (alias == self.data[j][3][k]){
							self.map.colons[alias] = j;
							break finder_block;
						}
					}
				}
			}
		}
	};


	// Does the actual replacement of a character with the appropriate
	/** @private */
	emoji.prototype.replacement = function(idx, actual, wrapper, variation, is_extra){
		var self = this;

		var full_idx = idx;

		// for emoji with variation modifiers, set `extra` to the standalone output for the
		// modifier (used if we can't combine the glyph) and set variation_idx to key of the
		// variation modifier (used below)
		var extra = '';
		var var_idx = null;
		if (typeof variation === 'object'){
			extra = self.replacement(variation.idx, variation.actual, variation.wrapper, undefined, true);
			var_idx = variation.idx;
		}

		// deal with simple modes (colons and text) first
		wrapper = wrapper || '';
		if (self.colons_mode) return ':'+self.data[idx][3][0]+':'+extra;
		var text_name = (actual) ? wrapper+actual+wrapper : self.data[idx][8] || wrapper+self.data[idx][3][0]+wrapper;
		if (self.text_mode) return text_name + extra;

		// native modes next.
		// for variations selectors, we just need to output them raw, which `extra` will contain.
		self.init_env();
		if (self.replace_mode == 'unified'  && self.allow_native && self.data[idx][0][0]) return self.format_native(self.data[idx][0][0] + extra, !is_extra);
		if (self.replace_mode == 'softbank' && self.allow_native && self.data[idx][1]   ) return self.format_native(self.data[idx][1]    + extra, !is_extra);
		if (self.replace_mode == 'google'   && self.allow_native && self.data[idx][2]   ) return self.format_native(self.data[idx][2]    + extra, !is_extra);

		// finally deal with image modes.
		// variation selectors are more complex here - if the image set and particular emoji supports variations, then
		// use the variation image. otherwise, return it as a separate image (already calculated in `extra`).
		// first we set up the params we'll use if we can't use a variation.
		var img = self.find_image(idx, var_idx);
		var title = self.include_title ? ' title="'+(actual || self.data[idx][3][0])+'"' : '';
		var text  = self.include_text  ? wrapper+(actual || self.data[idx][3][0])+wrapper : '';

		// custom image for this glyph?
		if (self.data[idx][7]){
			img.path = self.data[idx][7];
			img.px = null;
			img.py = null;
			img.is_var = false;
		}

		// if we're displaying a variation, include it in the text and remove the extra
		if (img.is_var){
			extra = '';
			// add variation text
			if (self.include_text && variation && variation.actual && variation.wrapper) {
				text += variation.wrapper+variation.actual+variation.wrapper;
			}
		}

		// output
		if (self.supports_css) {
			if (self.use_sheet && img.px != null && img.py != null){
				var sheet_size = self.sheet_size * (img.sheet_size+2); // size of image in pixels
				var sheet_x = 100 * (((img.px * (img.sheet_size+2)) + 1) / (sheet_size - img.sheet_size));
				var sheet_y = 100 * (((img.py * (img.sheet_size+2)) + 1) / (sheet_size - img.sheet_size));
				var sheet_sz = 100 * (sheet_size / img.sheet_size);

				var style = 'background: url('+img.sheet+');background-position:'+(sheet_x)+'% '+(sheet_y)+'%;background-size:'+sheet_sz+'% '+sheet_sz+'%';
				return '<span class="emoji-outer emoji-sizer"><span class="emoji-inner" style="'+style+'"'+title+' data-codepoints="'+img.full_idx+'">'+text+'</span></span>'+extra;
			}else if (self.use_css_imgs){
				return '<span class="emoji emoji-'+idx+'"'+title+' data-codepoints="'+img.full_idx+'">'+text+'</span>'+extra;
			}else{
				return '<span class="emoji emoji-sizer" style="background-image:url('+img.path+')"'+title+' data-codepoints="'+img.full_idx+'">'+text+'</span>'+extra;
			}
		}
		return '<img src="'+img.path+'" class="emoji" data-codepoints="'+img.full_idx+'" '+title+'/>'+extra;
	};

	// Wraps the output of a native endpoint, if configured
	/** @private */
	emoji.prototype.format_native = function(native, allow_wrap){
		var self = this;

		if (self.wrap_native && allow_wrap){
			return '<span class="emoji-native">'+ native + '</span>';
		}
		return native;
	};

	// Finds the best image to display, taking into account image set precedence and obsoletes
	/** @private */
	emoji.prototype.find_image = function(idx, var_idx){
		var self = this;

		// set up some initial state
		var out = {
			'path'		: '',
			'sheet'		: '',
			'sheet_size'	: 0,
			'px'		: self.data[idx][4],
			'py'		: self.data[idx][5],
			'full_idx'	: idx,
			'is_var'	: false
		};
		var use_mask = self.data[idx][6];

		// can we use a variation?
		if (var_idx && self.variations_data[idx] && self.variations_data[idx][var_idx]){
			var var_data = self.variations_data[idx][var_idx];

			out.px = var_data[1];
			out.py = var_data[2];
			out.full_idx = var_data[0];
			out.is_var = true;
			use_mask = var_data[3];
		}

		// this matches `build/build_image.php` `in emoji-data`, so that sheet and images modes always
		// agree about the image to use.
		var try_order = [self.img_set, 'apple', 'emojione', 'google', 'twitter', 'facebook', 'messenger'];

		// for each image set, see if we have the image we need. otherwise check for an obsolete in
		// that image set
		for (var j=0; j<try_order.length; j++){
			if (use_mask & self.img_sets[try_order[j]].mask){
				out.path = self.img_sets[try_order[j]].path+out.full_idx+'.png' + self.img_suffix;
				// if we're not changing glyph, use our base set for sheets - it has every glyph
				out.sheet = self.img_sets[self.img_set].sheet;
				out.sheet_size = self.img_sets[self.img_set].sheet_size;
				return out;
			}
			if (self.obsoletes_data[out.full_idx]){
				var ob_data = self.obsoletes_data[out.full_idx];

				if (ob_data[3] & self.img_sets[try_order[j]].mask){
					out.path = self.img_sets[try_order[j]].path+ob_data[0]+'.png' + self.img_suffix;
					out.sheet = self.img_sets[try_order[j]].sheet;
					out.sheet_size = self.img_sets[try_order[j]].sheet_size;
					out.px = ob_data[1];
					out.py = ob_data[2];
					return out;
				}
			}
		}

		return out;
	};

	// Initializes the text emoticon data
	/** @private */
	emoji.prototype.init_emoticons = function(){
		var self = this;
		if (self.inits.emoticons) return;
		self.init_colons(); // we require this for the emoticons map
		self.inits.emoticons = 1;
		
		var a = [];
		self.map.emoticons = {};
		for (var i in self.emoticons_data){
			// because we never see some characters in our text except as entities, we must do some replacing
			var emoticon = i.replace(/\&/g, '&amp;').replace(/\</g, '&lt;').replace(/\>/g, '&gt;');
			
			if (!self.map.colons[self.emoticons_data[i]]) continue;

			self.map.emoticons[emoticon] = self.map.colons[self.emoticons_data[i]];
			a.push(self.escape_rx(emoticon));
		}
		self.rx_emoticons = new RegExp(('(^|\\s)('+a.join('|')+')(?=$|[\\s|\\?\\.,!])'), 'g');
	};

	// Initializes the colon string data
	/** @private */
	emoji.prototype.init_colons = function(){
		var self = this;
		if (self.inits.colons) return;
		self.inits.colons = 1;
		self.rx_colons = new RegExp('\:[a-zA-Z0-9-_+]+\:(\:skin-tone-[2-6]\:)?', 'g');
		self.map.colons = {};
		for (var i in self.data){
			for (var j=0; j<self.data[i][3].length; j++){
				self.map.colons[self.data[i][3][j]] = i;
			}
		}
	};

	// initializes the unified unicode emoticon data
	/** @private */
	emoji.prototype.init_unified = function(){
		var self = this;
		if (self.inits.unified) return;
		self.inits.unified = 1;

		var a = [];
		self.map.unified = {};
		self.map.unified_vars = {};

		for (var i in self.data){
			for (var j=0; j<self.data[i][0].length; j++){
				a.push(self.data[i][0][j].replace('*', '\\*'));
				self.map.unified[self.data[i][0][j]] = i;
			}
		}
		for (var i in self.variations_data){
			// skip simple append-style skin tones
			if (self.variations_data[i]['1f3fb'][0] == i+'-1f3fb') continue;

			for (var k in self.variations_data[i]){
				for (var j=0; j<self.variations_data[i][k][4].length; j++){
					a.push(self.variations_data[i][k][4][j].replace('*', '\\*'));
					self.map.unified_vars[self.variations_data[i][k][4][j]] = [i, k];
				}
			}
		}

		a = a.sort(function(a,b){
			 return b.length - a.length;
		});

		self.rx_unified = new RegExp('('+a.join('|')+')(\uD83C[\uDFFB-\uDFFF])?', "g");
	};

	// initializes the environment, figuring out what representation
	// of emoticons is best.
	/** @private */
	emoji.prototype.init_env = function(){
		var self = this;
		if (self.inits.env) return;
		self.inits.env = 1;
		self.replace_mode = 'img';
		self.supports_css = false;
		if (typeof(navigator) !== 'undefined') {
			var ua = navigator.userAgent;
			if (typeof window !== 'undefined' && window.getComputedStyle){
				try {
					var st = window.getComputedStyle(document.body);
					if (st['background-size'] || st['backgroundSize']){
						self.supports_css = true;
					}
				} catch(e){
					// Swallow an exception caused by hidden iFrames on Firefox
					// https://github.com/iamcal/js-emoji/issues/73
					if (ua.match(/Firefox/i)){
						self.supports_css = true;
					}
				}
			}
			if (ua.match(/(iPhone|iPod|iPad|iPhone\s+Simulator)/i)){
				if (ua.match(/OS\s+[12345]/i)){
					self.replace_mode = 'softbank';
					return;
				}
				if (ua.match(/OS\s+[6789]/i)){
					self.replace_mode = 'unified';
					return;
				}
			}
			if (ua.match(/Mac OS X 10[._ ](?:[789]|1\d)/i)){
				self.replace_mode = 'unified';
				return;
			}
			if (!self.avoid_ms_emoji){
				if (ua.match(/Windows NT 6.[1-9]/i) || ua.match(/Windows NT 10.[0-9]/i)){
					if (!ua.match(/Chrome/i) && !ua.match(/MSIE 8/i)){
						self.replace_mode = 'unified';
						return;
					}
				}
			}
		}

		// Need a better way to detect android devices that actually
		// support emoji.
		if (false && ua.match(/Android/i)){
			self.replace_mode = 'google';
			return;
		}
		if (self.supports_css){
			self.replace_mode = 'css';
		}
		// nothing fancy detected - use images
	};
	/** @private */
	emoji.prototype.escape_rx = function(text){
		return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
	};
	emoji.prototype.sheet_size = 51;
	/** @private */
	emoji.prototype.data = {
		"0023-fe0f-20e3":[["\u0023\uFE0F\u20E3","\u0023\u20E3"],"\uE210","\uDBBA\uDC2C",["hash"],0,0,7,0],
		"002a-fe0f-20e3":[["\u002A\uFE0F\u20E3","\u002A\u20E3"],"","",["keycap_star"],0,1,7,0],
		"0030-fe0f-20e3":[["\u0030\uFE0F\u20E3","\u0030\u20E3"],"\uE225","\uDBBA\uDC37",["zero"],0,2,7,0],
		"0031-fe0f-20e3":[["\u0031\uFE0F\u20E3","\u0031\u20E3"],"\uE21C","\uDBBA\uDC2E",["one"],0,3,7,0],
		"0032-fe0f-20e3":[["\u0032\uFE0F\u20E3","\u0032\u20E3"],"\uE21D","\uDBBA\uDC2F",["two"],0,4,7,0],
		"0033-fe0f-20e3":[["\u0033\uFE0F\u20E3","\u0033\u20E3"],"\uE21E","\uDBBA\uDC30",["three"],0,5,7,0],
		"0034-fe0f-20e3":[["\u0034\uFE0F\u20E3","\u0034\u20E3"],"\uE21F","\uDBBA\uDC31",["four"],0,6,7,0],
		"0035-fe0f-20e3":[["\u0035\uFE0F\u20E3","\u0035\u20E3"],"\uE220","\uDBBA\uDC32",["five"],0,7,7,0],
		"0036-fe0f-20e3":[["\u0036\uFE0F\u20E3","\u0036\u20E3"],"\uE221","\uDBBA\uDC33",["six"],0,8,7,0],
		"0037-fe0f-20e3":[["\u0037\uFE0F\u20E3","\u0037\u20E3"],"\uE222","\uDBBA\uDC34",["seven"],0,9,7,0],
		"0038-fe0f-20e3":[["\u0038\uFE0F\u20E3","\u0038\u20E3"],"\uE223","\uDBBA\uDC35",["eight"],0,10,7,0],
		"0039-fe0f-20e3":[["\u0039\uFE0F\u20E3","\u0039\u20E3"],"\uE224","\uDBBA\uDC36",["nine"],0,11,7,0],
		"00a9-fe0f":[["\u00A9\uFE0F","\u00A9"],"\uE24E","\uDBBA\uDF29",["copyright"],0,12,3,0],
		"00ae-fe0f":[["\u00AE\uFE0F","\u00AE"],"\uE24F","\uDBBA\uDF2D",["registered"],0,13,3,0],
		"1f004":[["\uD83C\uDC04"],"\uE12D","\uDBBA\uDC0B",["mahjong"],0,14,63,0],
		"1f0cf":[["\uD83C\uDCCF"],"","\uDBBA\uDC12",["black_joker"],0,15,63,0],
		"1f170-fe0f":[["\uD83C\uDD70\uFE0F","\uD83C\uDD70"],"\uE532","\uDBB9\uDD0B",["a"],0,16,55,0],
		"1f171-fe0f":[["\uD83C\uDD71\uFE0F","\uD83C\uDD71"],"\uE533","\uDBB9\uDD0C",["b"],0,17,55,0],
		"1f17e-fe0f":[["\uD83C\uDD7E\uFE0F","\uD83C\uDD7E"],"\uE535","\uDBB9\uDD0E",["o2"],0,18,55,0],
		"1f17f-fe0f":[["\uD83C\uDD7F\uFE0F","\uD83C\uDD7F"],"\uE14F","\uDBB9\uDFF6",["parking"],0,19,55,0],
		"1f18e":[["\uD83C\uDD8E"],"\uE534","\uDBB9\uDD0D",["ab"],0,20,63,0],
		"1f191":[["\uD83C\uDD91"],"","\uDBBA\uDF84",["cl"],0,21,63,0],
		"1f192":[["\uD83C\uDD92"],"\uE214","\uDBBA\uDF38",["cool"],0,22,63,0],
		"1f193":[["\uD83C\uDD93"],"","\uDBBA\uDF21",["free"],0,23,63,0],
		"1f194":[["\uD83C\uDD94"],"\uE229","\uDBBA\uDF81",["id"],0,24,63,0],
		"1f195":[["\uD83C\uDD95"],"\uE212","\uDBBA\uDF36",["new"],0,25,63,0],
		"1f196":[["\uD83C\uDD96"],"","\uDBBA\uDF28",["ng"],0,26,63,0],
		"1f197":[["\uD83C\uDD97"],"\uE24D","\uDBBA\uDF27",["ok"],0,27,63,0],
		"1f198":[["\uD83C\uDD98"],"","\uDBBA\uDF4F",["sos"],0,28,63,0],
		"1f199":[["\uD83C\uDD99"],"\uE213","\uDBBA\uDF37",["up"],0,29,63,0],
		"1f19a":[["\uD83C\uDD9A"],"\uE12E","\uDBBA\uDF32",["vs"],0,30,63,0],
		"1f1e6-1f1e8":[["\uD83C\uDDE6\uD83C\uDDE8"],"","",["flag-ac"],0,31,63,0],
		"1f1e6-1f1e9":[["\uD83C\uDDE6\uD83C\uDDE9"],"","",["flag-ad"],0,32,63,0],
		"1f1e6-1f1ea":[["\uD83C\uDDE6\uD83C\uDDEA"],"","",["flag-ae"],0,33,63,0],
		"1f1e6-1f1eb":[["\uD83C\uDDE6\uD83C\uDDEB"],"","",["flag-af"],0,34,63,0],
		"1f1e6-1f1ec":[["\uD83C\uDDE6\uD83C\uDDEC"],"","",["flag-ag"],0,35,63,0],
		"1f1e6-1f1ee":[["\uD83C\uDDE6\uD83C\uDDEE"],"","",["flag-ai"],0,36,63,0],
		"1f1e6-1f1f1":[["\uD83C\uDDE6\uD83C\uDDF1"],"","",["flag-al"],0,37,63,0],
		"1f1e6-1f1f2":[["\uD83C\uDDE6\uD83C\uDDF2"],"","",["flag-am"],0,38,63,0],
		"1f1e6-1f1f4":[["\uD83C\uDDE6\uD83C\uDDF4"],"","",["flag-ao"],0,39,63,0],
		"1f1e6-1f1f6":[["\uD83C\uDDE6\uD83C\uDDF6"],"","",["flag-aq"],0,40,63,0],
		"1f1e6-1f1f7":[["\uD83C\uDDE6\uD83C\uDDF7"],"","",["flag-ar"],0,41,63,0],
		"1f1e6-1f1f8":[["\uD83C\uDDE6\uD83C\uDDF8"],"","",["flag-as"],0,42,63,0],
		"1f1e6-1f1f9":[["\uD83C\uDDE6\uD83C\uDDF9"],"","",["flag-at"],0,43,63,0],
		"1f1e6-1f1fa":[["\uD83C\uDDE6\uD83C\uDDFA"],"","",["flag-au"],0,44,63,0],
		"1f1e6-1f1fc":[["\uD83C\uDDE6\uD83C\uDDFC"],"","",["flag-aw"],0,45,63,0],
		"1f1e6-1f1fd":[["\uD83C\uDDE6\uD83C\uDDFD"],"","",["flag-ax"],0,46,63,0],
		"1f1e6-1f1ff":[["\uD83C\uDDE6\uD83C\uDDFF"],"","",["flag-az"],0,47,63,0],
		"1f1e7-1f1e6":[["\uD83C\uDDE7\uD83C\uDDE6"],"","",["flag-ba"],0,48,31,0],
		"1f1e7-1f1e7":[["\uD83C\uDDE7\uD83C\uDDE7"],"","",["flag-bb"],0,49,63,0],
		"1f1e7-1f1e9":[["\uD83C\uDDE7\uD83C\uDDE9"],"","",["flag-bd"],0,50,63,0],
		"1f1e7-1f1ea":[["\uD83C\uDDE7\uD83C\uDDEA"],"","",["flag-be"],1,0,63,0],
		"1f1e7-1f1eb":[["\uD83C\uDDE7\uD83C\uDDEB"],"","",["flag-bf"],1,1,63,0],
		"1f1e7-1f1ec":[["\uD83C\uDDE7\uD83C\uDDEC"],"","",["flag-bg"],1,2,63,0],
		"1f1e7-1f1ed":[["\uD83C\uDDE7\uD83C\uDDED"],"","",["flag-bh"],1,3,63,0],
		"1f1e7-1f1ee":[["\uD83C\uDDE7\uD83C\uDDEE"],"","",["flag-bi"],1,4,63,0],
		"1f1e7-1f1ef":[["\uD83C\uDDE7\uD83C\uDDEF"],"","",["flag-bj"],1,5,63,0],
		"1f1e7-1f1f1":[["\uD83C\uDDE7\uD83C\uDDF1"],"","",["flag-bl"],1,6,61,0],
		"1f1e7-1f1f2":[["\uD83C\uDDE7\uD83C\uDDF2"],"","",["flag-bm"],1,7,63,0],
		"1f1e7-1f1f3":[["\uD83C\uDDE7\uD83C\uDDF3"],"","",["flag-bn"],1,8,31,0],
		"1f1e7-1f1f4":[["\uD83C\uDDE7\uD83C\uDDF4"],"","",["flag-bo"],1,9,63,0],
		"1f1e7-1f1f6":[["\uD83C\uDDE7\uD83C\uDDF6"],"","",["flag-bq"],1,10,61,0],
		"1f1e7-1f1f7":[["\uD83C\uDDE7\uD83C\uDDF7"],"","",["flag-br"],1,11,63,0],
		"1f1e7-1f1f8":[["\uD83C\uDDE7\uD83C\uDDF8"],"","",["flag-bs"],1,12,63,0],
		"1f1e7-1f1f9":[["\uD83C\uDDE7\uD83C\uDDF9"],"","",["flag-bt"],1,13,63,0],
		"1f1e7-1f1fb":[["\uD83C\uDDE7\uD83C\uDDFB"],"","",["flag-bv"],1,14,61,0],
		"1f1e7-1f1fc":[["\uD83C\uDDE7\uD83C\uDDFC"],"","",["flag-bw"],1,15,63,0],
		"1f1e7-1f1fe":[["\uD83C\uDDE7\uD83C\uDDFE"],"","",["flag-by"],1,16,63,0],
		"1f1e7-1f1ff":[["\uD83C\uDDE7\uD83C\uDDFF"],"","",["flag-bz"],1,17,63,0],
		"1f1e8-1f1e6":[["\uD83C\uDDE8\uD83C\uDDE6"],"","",["flag-ca"],1,18,63,0],
		"1f1e8-1f1e8":[["\uD83C\uDDE8\uD83C\uDDE8"],"","",["flag-cc"],1,19,63,0],
		"1f1e8-1f1e9":[["\uD83C\uDDE8\uD83C\uDDE9"],"","",["flag-cd"],1,20,63,0],
		"1f1e8-1f1eb":[["\uD83C\uDDE8\uD83C\uDDEB"],"","",["flag-cf"],1,21,63,0],
		"1f1e8-1f1ec":[["\uD83C\uDDE8\uD83C\uDDEC"],"","",["flag-cg"],1,22,63,0],
		"1f1e8-1f1ed":[["\uD83C\uDDE8\uD83C\uDDED"],"","",["flag-ch"],1,23,63,0],
		"1f1e8-1f1ee":[["\uD83C\uDDE8\uD83C\uDDEE"],"","",["flag-ci"],1,24,63,0],
		"1f1e8-1f1f0":[["\uD83C\uDDE8\uD83C\uDDF0"],"","",["flag-ck"],1,25,63,0],
		"1f1e8-1f1f1":[["\uD83C\uDDE8\uD83C\uDDF1"],"","",["flag-cl"],1,26,63,0],
		"1f1e8-1f1f2":[["\uD83C\uDDE8\uD83C\uDDF2"],"","",["flag-cm"],1,27,63,0],
		"1f1e8-1f1f3":[["\uD83C\uDDE8\uD83C\uDDF3"],"\uE513","\uDBB9\uDCED",["cn","flag-cn"],1,28,63,0],
		"1f1e8-1f1f4":[["\uD83C\uDDE8\uD83C\uDDF4"],"","",["flag-co"],1,29,63,0],
		"1f1e8-1f1f5":[["\uD83C\uDDE8\uD83C\uDDF5"],"","",["flag-cp"],1,30,29,0],
		"1f1e8-1f1f7":[["\uD83C\uDDE8\uD83C\uDDF7"],"","",["flag-cr"],1,31,63,0],
		"1f1e8-1f1fa":[["\uD83C\uDDE8\uD83C\uDDFA"],"","",["flag-cu"],1,32,63,0],
		"1f1e8-1f1fb":[["\uD83C\uDDE8\uD83C\uDDFB"],"","",["flag-cv"],1,33,63,0],
		"1f1e8-1f1fc":[["\uD83C\uDDE8\uD83C\uDDFC"],"","",["flag-cw"],1,34,63,0],
		"1f1e8-1f1fd":[["\uD83C\uDDE8\uD83C\uDDFD"],"","",["flag-cx"],1,35,63,0],
		"1f1e8-1f1fe":[["\uD83C\uDDE8\uD83C\uDDFE"],"","",["flag-cy"],1,36,63,0],
		"1f1e8-1f1ff":[["\uD83C\uDDE8\uD83C\uDDFF"],"","",["flag-cz"],1,37,63,0],
		"1f1e9-1f1ea":[["\uD83C\uDDE9\uD83C\uDDEA"],"\uE50E","\uDBB9\uDCE8",["de","flag-de"],1,38,63,0],
		"1f1e9-1f1ec":[["\uD83C\uDDE9\uD83C\uDDEC"],"","",["flag-dg"],1,39,61,0],
		"1f1e9-1f1ef":[["\uD83C\uDDE9\uD83C\uDDEF"],"","",["flag-dj"],1,40,63,0],
		"1f1e9-1f1f0":[["\uD83C\uDDE9\uD83C\uDDF0"],"","",["flag-dk"],1,41,63,0],
		"1f1e9-1f1f2":[["\uD83C\uDDE9\uD83C\uDDF2"],"","",["flag-dm"],1,42,63,0],
		"1f1e9-1f1f4":[["\uD83C\uDDE9\uD83C\uDDF4"],"","",["flag-do"],1,43,63,0],
		"1f1e9-1f1ff":[["\uD83C\uDDE9\uD83C\uDDFF"],"","",["flag-dz"],1,44,63,0],
		"1f1ea-1f1e6":[["\uD83C\uDDEA\uD83C\uDDE6"],"","",["flag-ea"],1,45,61,0],
		"1f1ea-1f1e8":[["\uD83C\uDDEA\uD83C\uDDE8"],"","",["flag-ec"],1,46,63,0],
		"1f1ea-1f1ea":[["\uD83C\uDDEA\uD83C\uDDEA"],"","",["flag-ee"],1,47,63,0],
		"1f1ea-1f1ec":[["\uD83C\uDDEA\uD83C\uDDEC"],"","",["flag-eg"],1,48,63,0],
		"1f1ea-1f1ed":[["\uD83C\uDDEA\uD83C\uDDED"],"","",["flag-eh"],1,49,61,0],
		"1f1ea-1f1f7":[["\uD83C\uDDEA\uD83C\uDDF7"],"","",["flag-er"],1,50,63,0],
		"1f1ea-1f1f8":[["\uD83C\uDDEA\uD83C\uDDF8"],"\uE511","\uDBB9\uDCEB",["es","flag-es"],2,0,63,0],
		"1f1ea-1f1f9":[["\uD83C\uDDEA\uD83C\uDDF9"],"","",["flag-et"],2,1,63,0],
		"1f1ea-1f1fa":[["\uD83C\uDDEA\uD83C\uDDFA"],"","",["flag-eu"],2,2,63,0],
		"1f1eb-1f1ee":[["\uD83C\uDDEB\uD83C\uDDEE"],"","",["flag-fi"],2,3,63,0],
		"1f1eb-1f1ef":[["\uD83C\uDDEB\uD83C\uDDEF"],"","",["flag-fj"],2,4,63,0],
		"1f1eb-1f1f0":[["\uD83C\uDDEB\uD83C\uDDF0"],"","",["flag-fk"],2,5,61,0],
		"1f1eb-1f1f2":[["\uD83C\uDDEB\uD83C\uDDF2"],"","",["flag-fm"],2,6,63,0],
		"1f1eb-1f1f4":[["\uD83C\uDDEB\uD83C\uDDF4"],"","",["flag-fo"],2,7,63,0],
		"1f1eb-1f1f7":[["\uD83C\uDDEB\uD83C\uDDF7"],"\uE50D","\uDBB9\uDCE7",["fr","flag-fr"],2,8,63,0],
		"1f1ec-1f1e6":[["\uD83C\uDDEC\uD83C\uDDE6"],"","",["flag-ga"],2,9,63,0],
		"1f1ec-1f1e7":[["\uD83C\uDDEC\uD83C\uDDE7"],"\uE510","\uDBB9\uDCEA",["gb","uk","flag-gb"],2,10,63,0],
		"1f1ec-1f1e9":[["\uD83C\uDDEC\uD83C\uDDE9"],"","",["flag-gd"],2,11,63,0],
		"1f1ec-1f1ea":[["\uD83C\uDDEC\uD83C\uDDEA"],"","",["flag-ge"],2,12,63,0],
		"1f1ec-1f1eb":[["\uD83C\uDDEC\uD83C\uDDEB"],"","",["flag-gf"],2,13,61,0],
		"1f1ec-1f1ec":[["\uD83C\uDDEC\uD83C\uDDEC"],"","",["flag-gg"],2,14,63,0],
		"1f1ec-1f1ed":[["\uD83C\uDDEC\uD83C\uDDED"],"","",["flag-gh"],2,15,63,0],
		"1f1ec-1f1ee":[["\uD83C\uDDEC\uD83C\uDDEE"],"","",["flag-gi"],2,16,63,0],
		"1f1ec-1f1f1":[["\uD83C\uDDEC\uD83C\uDDF1"],"","",["flag-gl"],2,17,63,0],
		"1f1ec-1f1f2":[["\uD83C\uDDEC\uD83C\uDDF2"],"","",["flag-gm"],2,18,63,0],
		"1f1ec-1f1f3":[["\uD83C\uDDEC\uD83C\uDDF3"],"","",["flag-gn"],2,19,63,0],
		"1f1ec-1f1f5":[["\uD83C\uDDEC\uD83C\uDDF5"],"","",["flag-gp"],2,20,61,0],
		"1f1ec-1f1f6":[["\uD83C\uDDEC\uD83C\uDDF6"],"","",["flag-gq"],2,21,63,0],
		"1f1ec-1f1f7":[["\uD83C\uDDEC\uD83C\uDDF7"],"","",["flag-gr"],2,22,63,0],
		"1f1ec-1f1f8":[["\uD83C\uDDEC\uD83C\uDDF8"],"","",["flag-gs"],2,23,61,0],
		"1f1ec-1f1f9":[["\uD83C\uDDEC\uD83C\uDDF9"],"","",["flag-gt"],2,24,63,0],
		"1f1ec-1f1fa":[["\uD83C\uDDEC\uD83C\uDDFA"],"","",["flag-gu"],2,25,63,0],
		"1f1ec-1f1fc":[["\uD83C\uDDEC\uD83C\uDDFC"],"","",["flag-gw"],2,26,63,0],
		"1f1ec-1f1fe":[["\uD83C\uDDEC\uD83C\uDDFE"],"","",["flag-gy"],2,27,63,0],
		"1f1ed-1f1f0":[["\uD83C\uDDED\uD83C\uDDF0"],"","",["flag-hk"],2,28,63,0],
		"1f1ed-1f1f2":[["\uD83C\uDDED\uD83C\uDDF2"],"","",["flag-hm"],2,29,61,0],
		"1f1ed-1f1f3":[["\uD83C\uDDED\uD83C\uDDF3"],"","",["flag-hn"],2,30,63,0],
		"1f1ed-1f1f7":[["\uD83C\uDDED\uD83C\uDDF7"],"","",["flag-hr"],2,31,63,0],
		"1f1ed-1f1f9":[["\uD83C\uDDED\uD83C\uDDF9"],"","",["flag-ht"],2,32,63,0],
		"1f1ed-1f1fa":[["\uD83C\uDDED\uD83C\uDDFA"],"","",["flag-hu"],2,33,63,0],
		"1f1ee-1f1e8":[["\uD83C\uDDEE\uD83C\uDDE8"],"","",["flag-ic"],2,34,63,0],
		"1f1ee-1f1e9":[["\uD83C\uDDEE\uD83C\uDDE9"],"","",["flag-id"],2,35,63,0],
		"1f1ee-1f1ea":[["\uD83C\uDDEE\uD83C\uDDEA"],"","",["flag-ie"],2,36,63,0],
		"1f1ee-1f1f1":[["\uD83C\uDDEE\uD83C\uDDF1"],"","",["flag-il"],2,37,63,0],
		"1f1ee-1f1f2":[["\uD83C\uDDEE\uD83C\uDDF2"],"","",["flag-im"],2,38,63,0],
		"1f1ee-1f1f3":[["\uD83C\uDDEE\uD83C\uDDF3"],"","",["flag-in"],2,39,63,0],
		"1f1ee-1f1f4":[["\uD83C\uDDEE\uD83C\uDDF4"],"","",["flag-io"],2,40,63,0],
		"1f1ee-1f1f6":[["\uD83C\uDDEE\uD83C\uDDF6"],"","",["flag-iq"],2,41,63,0],
		"1f1ee-1f1f7":[["\uD83C\uDDEE\uD83C\uDDF7"],"","",["flag-ir"],2,42,63,0],
		"1f1ee-1f1f8":[["\uD83C\uDDEE\uD83C\uDDF8"],"","",["flag-is"],2,43,63,0],
		"1f1ee-1f1f9":[["\uD83C\uDDEE\uD83C\uDDF9"],"\uE50F","\uDBB9\uDCE9",["it","flag-it"],2,44,63,0],
		"1f1ef-1f1ea":[["\uD83C\uDDEF\uD83C\uDDEA"],"","",["flag-je"],2,45,63,0],
		"1f1ef-1f1f2":[["\uD83C\uDDEF\uD83C\uDDF2"],"","",["flag-jm"],2,46,63,0],
		"1f1ef-1f1f4":[["\uD83C\uDDEF\uD83C\uDDF4"],"","",["flag-jo"],2,47,63,0],
		"1f1ef-1f1f5":[["\uD83C\uDDEF\uD83C\uDDF5"],"\uE50B","\uDBB9\uDCE5",["jp","flag-jp"],2,48,63,0],
		"1f1f0-1f1ea":[["\uD83C\uDDF0\uD83C\uDDEA"],"","",["flag-ke"],2,49,63,0],
		"1f1f0-1f1ec":[["\uD83C\uDDF0\uD83C\uDDEC"],"","",["flag-kg"],2,50,63,0],
		"1f1f0-1f1ed":[["\uD83C\uDDF0\uD83C\uDDED"],"","",["flag-kh"],3,0,63,0],
		"1f1f0-1f1ee":[["\uD83C\uDDF0\uD83C\uDDEE"],"","",["flag-ki"],3,1,63,0],
		"1f1f0-1f1f2":[["\uD83C\uDDF0\uD83C\uDDF2"],"","",["flag-km"],3,2,63,0],
		"1f1f0-1f1f3":[["\uD83C\uDDF0\uD83C\uDDF3"],"","",["flag-kn"],3,3,63,0],
		"1f1f0-1f1f5":[["\uD83C\uDDF0\uD83C\uDDF5"],"","",["flag-kp"],3,4,63,0],
		"1f1f0-1f1f7":[["\uD83C\uDDF0\uD83C\uDDF7"],"\uE514","\uDBB9\uDCEE",["kr","flag-kr"],3,5,63,0],
		"1f1f0-1f1fc":[["\uD83C\uDDF0\uD83C\uDDFC"],"","",["flag-kw"],3,6,63,0],
		"1f1f0-1f1fe":[["\uD83C\uDDF0\uD83C\uDDFE"],"","",["flag-ky"],3,7,63,0],
		"1f1f0-1f1ff":[["\uD83C\uDDF0\uD83C\uDDFF"],"","",["flag-kz"],3,8,63,0],
		"1f1f1-1f1e6":[["\uD83C\uDDF1\uD83C\uDDE6"],"","",["flag-la"],3,9,63,0],
		"1f1f1-1f1e7":[["\uD83C\uDDF1\uD83C\uDDE7"],"","",["flag-lb"],3,10,63,0],
		"1f1f1-1f1e8":[["\uD83C\uDDF1\uD83C\uDDE8"],"","",["flag-lc"],3,11,63,0],
		"1f1f1-1f1ee":[["\uD83C\uDDF1\uD83C\uDDEE"],"","",["flag-li"],3,12,63,0],
		"1f1f1-1f1f0":[["\uD83C\uDDF1\uD83C\uDDF0"],"","",["flag-lk"],3,13,63,0],
		"1f1f1-1f1f7":[["\uD83C\uDDF1\uD83C\uDDF7"],"","",["flag-lr"],3,14,63,0],
		"1f1f1-1f1f8":[["\uD83C\uDDF1\uD83C\uDDF8"],"","",["flag-ls"],3,15,63,0],
		"1f1f1-1f1f9":[["\uD83C\uDDF1\uD83C\uDDF9"],"","",["flag-lt"],3,16,63,0],
		"1f1f1-1f1fa":[["\uD83C\uDDF1\uD83C\uDDFA"],"","",["flag-lu"],3,17,63,0],
		"1f1f1-1f1fb":[["\uD83C\uDDF1\uD83C\uDDFB"],"","",["flag-lv"],3,18,63,0],
		"1f1f1-1f1fe":[["\uD83C\uDDF1\uD83C\uDDFE"],"","",["flag-ly"],3,19,63,0],
		"1f1f2-1f1e6":[["\uD83C\uDDF2\uD83C\uDDE6"],"","",["flag-ma"],3,20,63,0],
		"1f1f2-1f1e8":[["\uD83C\uDDF2\uD83C\uDDE8"],"","",["flag-mc"],3,21,63,0],
		"1f1f2-1f1e9":[["\uD83C\uDDF2\uD83C\uDDE9"],"","",["flag-md"],3,22,63,0],
		"1f1f2-1f1ea":[["\uD83C\uDDF2\uD83C\uDDEA"],"","",["flag-me"],3,23,63,0],
		"1f1f2-1f1eb":[["\uD83C\uDDF2\uD83C\uDDEB"],"","",["flag-mf"],3,24,61,0],
		"1f1f2-1f1ec":[["\uD83C\uDDF2\uD83C\uDDEC"],"","",["flag-mg"],3,25,63,0],
		"1f1f2-1f1ed":[["\uD83C\uDDF2\uD83C\uDDED"],"","",["flag-mh"],3,26,63,0],
		"1f1f2-1f1f0":[["\uD83C\uDDF2\uD83C\uDDF0"],"","",["flag-mk"],3,27,63,0],
		"1f1f2-1f1f1":[["\uD83C\uDDF2\uD83C\uDDF1"],"","",["flag-ml"],3,28,63,0],
		"1f1f2-1f1f2":[["\uD83C\uDDF2\uD83C\uDDF2"],"","",["flag-mm"],3,29,63,0],
		"1f1f2-1f1f3":[["\uD83C\uDDF2\uD83C\uDDF3"],"","",["flag-mn"],3,30,63,0],
		"1f1f2-1f1f4":[["\uD83C\uDDF2\uD83C\uDDF4"],"","",["flag-mo"],3,31,63,0],
		"1f1f2-1f1f5":[["\uD83C\uDDF2\uD83C\uDDF5"],"","",["flag-mp"],3,32,63,0],
		"1f1f2-1f1f6":[["\uD83C\uDDF2\uD83C\uDDF6"],"","",["flag-mq"],3,33,61,0],
		"1f1f2-1f1f7":[["\uD83C\uDDF2\uD83C\uDDF7"],"","",["flag-mr"],3,34,63,0],
		"1f1f2-1f1f8":[["\uD83C\uDDF2\uD83C\uDDF8"],"","",["flag-ms"],3,35,63,0],
		"1f1f2-1f1f9":[["\uD83C\uDDF2\uD83C\uDDF9"],"","",["flag-mt"],3,36,63,0],
		"1f1f2-1f1fa":[["\uD83C\uDDF2\uD83C\uDDFA"],"","",["flag-mu"],3,37,63,0],
		"1f1f2-1f1fb":[["\uD83C\uDDF2\uD83C\uDDFB"],"","",["flag-mv"],3,38,63,0],
		"1f1f2-1f1fc":[["\uD83C\uDDF2\uD83C\uDDFC"],"","",["flag-mw"],3,39,63,0],
		"1f1f2-1f1fd":[["\uD83C\uDDF2\uD83C\uDDFD"],"","",["flag-mx"],3,40,63,0],
		"1f1f2-1f1fe":[["\uD83C\uDDF2\uD83C\uDDFE"],"","",["flag-my"],3,41,63,0],
		"1f1f2-1f1ff":[["\uD83C\uDDF2\uD83C\uDDFF"],"","",["flag-mz"],3,42,63,0],
		"1f1f3-1f1e6":[["\uD83C\uDDF3\uD83C\uDDE6"],"","",["flag-na"],3,43,63,0],
		"1f1f3-1f1e8":[["\uD83C\uDDF3\uD83C\uDDE8"],"","",["flag-nc"],3,44,61,0],
		"1f1f3-1f1ea":[["\uD83C\uDDF3\uD83C\uDDEA"],"","",["flag-ne"],3,45,63,0],
		"1f1f3-1f1eb":[["\uD83C\uDDF3\uD83C\uDDEB"],"","",["flag-nf"],3,46,63,0],
		"1f1f3-1f1ec":[["\uD83C\uDDF3\uD83C\uDDEC"],"","",["flag-ng"],3,47,63,0],
		"1f1f3-1f1ee":[["\uD83C\uDDF3\uD83C\uDDEE"],"","",["flag-ni"],3,48,63,0],
		"1f1f3-1f1f1":[["\uD83C\uDDF3\uD83C\uDDF1"],"","",["flag-nl"],3,49,63,0],
		"1f1f3-1f1f4":[["\uD83C\uDDF3\uD83C\uDDF4"],"","",["flag-no"],3,50,63,0],
		"1f1f3-1f1f5":[["\uD83C\uDDF3\uD83C\uDDF5"],"","",["flag-np"],4,0,63,0],
		"1f1f3-1f1f7":[["\uD83C\uDDF3\uD83C\uDDF7"],"","",["flag-nr"],4,1,63,0],
		"1f1f3-1f1fa":[["\uD83C\uDDF3\uD83C\uDDFA"],"","",["flag-nu"],4,2,63,0],
		"1f1f3-1f1ff":[["\uD83C\uDDF3\uD83C\uDDFF"],"","",["flag-nz"],4,3,63,0],
		"1f1f4-1f1f2":[["\uD83C\uDDF4\uD83C\uDDF2"],"","",["flag-om"],4,4,63,0],
		"1f1f5-1f1e6":[["\uD83C\uDDF5\uD83C\uDDE6"],"","",["flag-pa"],4,5,63,0],
		"1f1f5-1f1ea":[["\uD83C\uDDF5\uD83C\uDDEA"],"","",["flag-pe"],4,6,63,0],
		"1f1f5-1f1eb":[["\uD83C\uDDF5\uD83C\uDDEB"],"","",["flag-pf"],4,7,63,0],
		"1f1f5-1f1ec":[["\uD83C\uDDF5\uD83C\uDDEC"],"","",["flag-pg"],4,8,63,0],
		"1f1f5-1f1ed":[["\uD83C\uDDF5\uD83C\uDDED"],"","",["flag-ph"],4,9,63,0],
		"1f1f5-1f1f0":[["\uD83C\uDDF5\uD83C\uDDF0"],"","",["flag-pk"],4,10,63,0],
		"1f1f5-1f1f1":[["\uD83C\uDDF5\uD83C\uDDF1"],"","",["flag-pl"],4,11,63,0],
		"1f1f5-1f1f2":[["\uD83C\uDDF5\uD83C\uDDF2"],"","",["flag-pm"],4,12,61,0],
		"1f1f5-1f1f3":[["\uD83C\uDDF5\uD83C\uDDF3"],"","",["flag-pn"],4,13,63,0],
		"1f1f5-1f1f7":[["\uD83C\uDDF5\uD83C\uDDF7"],"","",["flag-pr"],4,14,63,0],
		"1f1f5-1f1f8":[["\uD83C\uDDF5\uD83C\uDDF8"],"","",["flag-ps"],4,15,63,0],
		"1f1f5-1f1f9":[["\uD83C\uDDF5\uD83C\uDDF9"],"","",["flag-pt"],4,16,63,0],
		"1f1f5-1f1fc":[["\uD83C\uDDF5\uD83C\uDDFC"],"","",["flag-pw"],4,17,63,0],
		"1f1f5-1f1fe":[["\uD83C\uDDF5\uD83C\uDDFE"],"","",["flag-py"],4,18,63,0],
		"1f1f6-1f1e6":[["\uD83C\uDDF6\uD83C\uDDE6"],"","",["flag-qa"],4,19,63,0],
		"1f1f7-1f1ea":[["\uD83C\uDDF7\uD83C\uDDEA"],"","",["flag-re"],4,20,61,0],
		"1f1f7-1f1f4":[["\uD83C\uDDF7\uD83C\uDDF4"],"","",["flag-ro"],4,21,63,0],
		"1f1f7-1f1f8":[["\uD83C\uDDF7\uD83C\uDDF8"],"","",["flag-rs"],4,22,63,0],
		"1f1f7-1f1fa":[["\uD83C\uDDF7\uD83C\uDDFA"],"\uE512","\uDBB9\uDCEC",["ru","flag-ru"],4,23,63,0],
		"1f1f7-1f1fc":[["\uD83C\uDDF7\uD83C\uDDFC"],"","",["flag-rw"],4,24,63,0],
		"1f1f8-1f1e6":[["\uD83C\uDDF8\uD83C\uDDE6"],"","",["flag-sa"],4,25,63,0],
		"1f1f8-1f1e7":[["\uD83C\uDDF8\uD83C\uDDE7"],"","",["flag-sb"],4,26,63,0],
		"1f1f8-1f1e8":[["\uD83C\uDDF8\uD83C\uDDE8"],"","",["flag-sc"],4,27,63,0],
		"1f1f8-1f1e9":[["\uD83C\uDDF8\uD83C\uDDE9"],"","",["flag-sd"],4,28,63,0],
		"1f1f8-1f1ea":[["\uD83C\uDDF8\uD83C\uDDEA"],"","",["flag-se"],4,29,63,0],
		"1f1f8-1f1ec":[["\uD83C\uDDF8\uD83C\uDDEC"],"","",["flag-sg"],4,30,63,0],
		"1f1f8-1f1ed":[["\uD83C\uDDF8\uD83C\uDDED"],"","",["flag-sh"],4,31,63,0],
		"1f1f8-1f1ee":[["\uD83C\uDDF8\uD83C\uDDEE"],"","",["flag-si"],4,32,63,0],
		"1f1f8-1f1ef":[["\uD83C\uDDF8\uD83C\uDDEF"],"","",["flag-sj"],4,33,61,0],
		"1f1f8-1f1f0":[["\uD83C\uDDF8\uD83C\uDDF0"],"","",["flag-sk"],4,34,63,0],
		"1f1f8-1f1f1":[["\uD83C\uDDF8\uD83C\uDDF1"],"","",["flag-sl"],4,35,63,0],
		"1f1f8-1f1f2":[["\uD83C\uDDF8\uD83C\uDDF2"],"","",["flag-sm"],4,36,63,0],
		"1f1f8-1f1f3":[["\uD83C\uDDF8\uD83C\uDDF3"],"","",["flag-sn"],4,37,63,0],
		"1f1f8-1f1f4":[["\uD83C\uDDF8\uD83C\uDDF4"],"","",["flag-so"],4,38,63,0],
		"1f1f8-1f1f7":[["\uD83C\uDDF8\uD83C\uDDF7"],"","",["flag-sr"],4,39,63,0],
		"1f1f8-1f1f8":[["\uD83C\uDDF8\uD83C\uDDF8"],"","",["flag-ss"],4,40,63,0],
		"1f1f8-1f1f9":[["\uD83C\uDDF8\uD83C\uDDF9"],"","",["flag-st"],4,41,63,0],
		"1f1f8-1f1fb":[["\uD83C\uDDF8\uD83C\uDDFB"],"","",["flag-sv"],4,42,63,0],
		"1f1f8-1f1fd":[["\uD83C\uDDF8\uD83C\uDDFD"],"","",["flag-sx"],4,43,63,0],
		"1f1f8-1f1fe":[["\uD83C\uDDF8\uD83C\uDDFE"],"","",["flag-sy"],4,44,63,0],
		"1f1f8-1f1ff":[["\uD83C\uDDF8\uD83C\uDDFF"],"","",["flag-sz"],4,45,63,0],
		"1f1f9-1f1e6":[["\uD83C\uDDF9\uD83C\uDDE6"],"","",["flag-ta"],4,46,63,0],
		"1f1f9-1f1e8":[["\uD83C\uDDF9\uD83C\uDDE8"],"","",["flag-tc"],4,47,63,0],
		"1f1f9-1f1e9":[["\uD83C\uDDF9\uD83C\uDDE9"],"","",["flag-td"],4,48,63,0],
		"1f1f9-1f1eb":[["\uD83C\uDDF9\uD83C\uDDEB"],"","",["flag-tf"],4,49,61,0],
		"1f1f9-1f1ec":[["\uD83C\uDDF9\uD83C\uDDEC"],"","",["flag-tg"],4,50,63,0],
		"1f1f9-1f1ed":[["\uD83C\uDDF9\uD83C\uDDED"],"","",["flag-th"],5,0,63,0],
		"1f1f9-1f1ef":[["\uD83C\uDDF9\uD83C\uDDEF"],"","",["flag-tj"],5,1,63,0],
		"1f1f9-1f1f0":[["\uD83C\uDDF9\uD83C\uDDF0"],"","",["flag-tk"],5,2,63,0],
		"1f1f9-1f1f1":[["\uD83C\uDDF9\uD83C\uDDF1"],"","",["flag-tl"],5,3,63,0],
		"1f1f9-1f1f2":[["\uD83C\uDDF9\uD83C\uDDF2"],"","",["flag-tm"],5,4,63,0],
		"1f1f9-1f1f3":[["\uD83C\uDDF9\uD83C\uDDF3"],"","",["flag-tn"],5,5,63,0],
		"1f1f9-1f1f4":[["\uD83C\uDDF9\uD83C\uDDF4"],"","",["flag-to"],5,6,63,0],
		"1f1f9-1f1f7":[["\uD83C\uDDF9\uD83C\uDDF7"],"","",["flag-tr"],5,7,63,0],
		"1f1f9-1f1f9":[["\uD83C\uDDF9\uD83C\uDDF9"],"","",["flag-tt"],5,8,63,0],
		"1f1f9-1f1fb":[["\uD83C\uDDF9\uD83C\uDDFB"],"","",["flag-tv"],5,9,63,0],
		"1f1f9-1f1fc":[["\uD83C\uDDF9\uD83C\uDDFC"],"","",["flag-tw"],5,10,63,0],
		"1f1f9-1f1ff":[["\uD83C\uDDF9\uD83C\uDDFF"],"","",["flag-tz"],5,11,63,0],
		"1f1fa-1f1e6":[["\uD83C\uDDFA\uD83C\uDDE6"],"","",["flag-ua"],5,12,63,0],
		"1f1fa-1f1ec":[["\uD83C\uDDFA\uD83C\uDDEC"],"","",["flag-ug"],5,13,63,0],
		"1f1fa-1f1f2":[["\uD83C\uDDFA\uD83C\uDDF2"],"","",["flag-um"],5,14,61,0],
		"1f1fa-1f1f3":[["\uD83C\uDDFA\uD83C\uDDF3"],"","",["flag-un"],5,15,22,0],
		"1f1fa-1f1f8":[["\uD83C\uDDFA\uD83C\uDDF8"],"\uE50C","\uDBB9\uDCE6",["us","flag-us"],5,16,63,0],
		"1f1fa-1f1fe":[["\uD83C\uDDFA\uD83C\uDDFE"],"","",["flag-uy"],5,17,63,0],
		"1f1fa-1f1ff":[["\uD83C\uDDFA\uD83C\uDDFF"],"","",["flag-uz"],5,18,63,0],
		"1f1fb-1f1e6":[["\uD83C\uDDFB\uD83C\uDDE6"],"","",["flag-va"],5,19,63,0],
		"1f1fb-1f1e8":[["\uD83C\uDDFB\uD83C\uDDE8"],"","",["flag-vc"],5,20,63,0],
		"1f1fb-1f1ea":[["\uD83C\uDDFB\uD83C\uDDEA"],"","",["flag-ve"],5,21,63,0],
		"1f1fb-1f1ec":[["\uD83C\uDDFB\uD83C\uDDEC"],"","",["flag-vg"],5,22,63,0],
		"1f1fb-1f1ee":[["\uD83C\uDDFB\uD83C\uDDEE"],"","",["flag-vi"],5,23,63,0],
		"1f1fb-1f1f3":[["\uD83C\uDDFB\uD83C\uDDF3"],"","",["flag-vn"],5,24,63,0],
		"1f1fb-1f1fa":[["\uD83C\uDDFB\uD83C\uDDFA"],"","",["flag-vu"],5,25,63,0],
		"1f1fc-1f1eb":[["\uD83C\uDDFC\uD83C\uDDEB"],"","",["flag-wf"],5,26,61,0],
		"1f1fc-1f1f8":[["\uD83C\uDDFC\uD83C\uDDF8"],"","",["flag-ws"],5,27,63,0],
		"1f1fd-1f1f0":[["\uD83C\uDDFD\uD83C\uDDF0"],"","",["flag-xk"],5,28,61,0],
		"1f1fe-1f1ea":[["\uD83C\uDDFE\uD83C\uDDEA"],"","",["flag-ye"],5,29,63,0],
		"1f1fe-1f1f9":[["\uD83C\uDDFE\uD83C\uDDF9"],"","",["flag-yt"],5,30,61,0],
		"1f1ff-1f1e6":[["\uD83C\uDDFF\uD83C\uDDE6"],"","",["flag-za"],5,31,63,0],
		"1f1ff-1f1f2":[["\uD83C\uDDFF\uD83C\uDDF2"],"","",["flag-zm"],5,32,63,0],
		"1f1ff-1f1fc":[["\uD83C\uDDFF\uD83C\uDDFC"],"","",["flag-zw"],5,33,63,0],
		"1f201":[["\uD83C\uDE01"],"\uE203","\uDBBA\uDF24",["koko"],5,34,63,0],
		"1f202-fe0f":[["\uD83C\uDE02\uFE0F","\uD83C\uDE02"],"\uE228","\uDBBA\uDF3F",["sa"],5,35,55,0],
		"1f21a":[["\uD83C\uDE1A"],"\uE216","\uDBBA\uDF3A",["u7121"],5,36,63,0],
		"1f22f":[["\uD83C\uDE2F"],"\uE22C","\uDBBA\uDF40",["u6307"],5,37,63,0],
		"1f232":[["\uD83C\uDE32"],"","\uDBBA\uDF2E",["u7981"],5,38,63,0],
		"1f233":[["\uD83C\uDE33"],"\uE22B","\uDBBA\uDF2F",["u7a7a"],5,39,63,0],
		"1f234":[["\uD83C\uDE34"],"","\uDBBA\uDF30",["u5408"],5,40,63,0],
		"1f235":[["\uD83C\uDE35"],"\uE22A","\uDBBA\uDF31",["u6e80"],5,41,63,0],
		"1f236":[["\uD83C\uDE36"],"\uE215","\uDBBA\uDF39",["u6709"],5,42,63,0],
		"1f237-fe0f":[["\uD83C\uDE37\uFE0F","\uD83C\uDE37"],"\uE217","\uDBBA\uDF3B",["u6708"],5,43,55,0],
		"1f238":[["\uD83C\uDE38"],"\uE218","\uDBBA\uDF3C",["u7533"],5,44,63,0],
		"1f239":[["\uD83C\uDE39"],"\uE227","\uDBBA\uDF3E",["u5272"],5,45,63,0],
		"1f23a":[["\uD83C\uDE3A"],"\uE22D","\uDBBA\uDF41",["u55b6"],5,46,63,0],
		"1f250":[["\uD83C\uDE50"],"\uE226","\uDBBA\uDF3D",["ideograph_advantage"],5,47,63,0],
		"1f251":[["\uD83C\uDE51"],"","\uDBBA\uDF50",["accept"],5,48,63,0],
		"1f300":[["\uD83C\uDF00"],"\uE443","\uDBB8\uDC05",["cyclone"],5,49,63,0],
		"1f301":[["\uD83C\uDF01"],"","\uDBB8\uDC06",["foggy"],5,50,63,0],
		"1f302":[["\uD83C\uDF02"],"\uE43C","\uDBB8\uDC07",["closed_umbrella"],6,0,63,0],
		"1f303":[["\uD83C\uDF03"],"\uE44B","\uDBB8\uDC08",["night_with_stars"],6,1,63,0],
		"1f304":[["\uD83C\uDF04"],"\uE04D","\uDBB8\uDC09",["sunrise_over_mountains"],6,2,63,0],
		"1f305":[["\uD83C\uDF05"],"\uE449","\uDBB8\uDC0A",["sunrise"],6,3,63,0],
		"1f306":[["\uD83C\uDF06"],"\uE146","\uDBB8\uDC0B",["city_sunset"],6,4,63,0],
		"1f307":[["\uD83C\uDF07"],"\uE44A","\uDBB8\uDC0C",["city_sunrise"],6,5,63,0],
		"1f308":[["\uD83C\uDF08"],"\uE44C","\uDBB8\uDC0D",["rainbow"],6,6,63,0],
		"1f309":[["\uD83C\uDF09"],"","\uDBB8\uDC10",["bridge_at_night"],6,7,63,0],
		"1f30a":[["\uD83C\uDF0A"],"\uE43E","\uDBB8\uDC38",["ocean"],6,8,63,0],
		"1f30b":[["\uD83C\uDF0B"],"","\uDBB8\uDC3A",["volcano"],6,9,63,0],
		"1f30c":[["\uD83C\uDF0C"],"","\uDBB8\uDC3B",["milky_way"],6,10,63,0],
		"1f30d":[["\uD83C\uDF0D"],"","",["earth_africa"],6,11,63,0],
		"1f30e":[["\uD83C\uDF0E"],"","",["earth_americas"],6,12,63,0],
		"1f30f":[["\uD83C\uDF0F"],"","\uDBB8\uDC39",["earth_asia"],6,13,63,0],
		"1f310":[["\uD83C\uDF10"],"","",["globe_with_meridians"],6,14,63,0],
		"1f311":[["\uD83C\uDF11"],"","\uDBB8\uDC11",["new_moon"],6,15,63,0],
		"1f312":[["\uD83C\uDF12"],"","",["waxing_crescent_moon"],6,16,63,0],
		"1f313":[["\uD83C\uDF13"],"","\uDBB8\uDC13",["first_quarter_moon"],6,17,63,0],
		"1f314":[["\uD83C\uDF14"],"","\uDBB8\uDC12",["moon","waxing_gibbous_moon"],6,18,63,0],
		"1f315":[["\uD83C\uDF15"],"","\uDBB8\uDC15",["full_moon"],6,19,63,0],
		"1f316":[["\uD83C\uDF16"],"","",["waning_gibbous_moon"],6,20,63,0],
		"1f317":[["\uD83C\uDF17"],"","",["last_quarter_moon"],6,21,63,0],
		"1f318":[["\uD83C\uDF18"],"","",["waning_crescent_moon"],6,22,63,0],
		"1f319":[["\uD83C\uDF19"],"\uE04C","\uDBB8\uDC14",["crescent_moon"],6,23,63,0],
		"1f31a":[["\uD83C\uDF1A"],"","",["new_moon_with_face"],6,24,63,0],
		"1f31b":[["\uD83C\uDF1B"],"","\uDBB8\uDC16",["first_quarter_moon_with_face"],6,25,63,0],
		"1f31c":[["\uD83C\uDF1C"],"","",["last_quarter_moon_with_face"],6,26,63,0],
		"1f31d":[["\uD83C\uDF1D"],"","",["full_moon_with_face"],6,27,63,0],
		"1f31e":[["\uD83C\uDF1E"],"","",["sun_with_face"],6,28,63,0],
		"1f31f":[["\uD83C\uDF1F"],"\uE335","\uDBBA\uDF69",["star2"],6,29,63,0],
		"1f320":[["\uD83C\uDF20"],"","\uDBBA\uDF6A",["stars"],6,30,63,0],
		"1f321-fe0f":[["\uD83C\uDF21\uFE0F","\uD83C\uDF21"],"","",["thermometer"],6,31,23,0],
		"1f324-fe0f":[["\uD83C\uDF24\uFE0F","\uD83C\uDF24"],"","",["mostly_sunny","sun_small_cloud"],6,32,23,0],
		"1f325-fe0f":[["\uD83C\uDF25\uFE0F","\uD83C\uDF25"],"","",["barely_sunny","sun_behind_cloud"],6,33,23,0],
		"1f326-fe0f":[["\uD83C\uDF26\uFE0F","\uD83C\uDF26"],"","",["partly_sunny_rain","sun_behind_rain_cloud"],6,34,23,0],
		"1f327-fe0f":[["\uD83C\uDF27\uFE0F","\uD83C\uDF27"],"","",["rain_cloud"],6,35,23,0],
		"1f328-fe0f":[["\uD83C\uDF28\uFE0F","\uD83C\uDF28"],"","",["snow_cloud"],6,36,23,0],
		"1f329-fe0f":[["\uD83C\uDF29\uFE0F","\uD83C\uDF29"],"","",["lightning","lightning_cloud"],6,37,23,0],
		"1f32a-fe0f":[["\uD83C\uDF2A\uFE0F","\uD83C\uDF2A"],"","",["tornado","tornado_cloud"],6,38,23,0],
		"1f32b-fe0f":[["\uD83C\uDF2B\uFE0F","\uD83C\uDF2B"],"","",["fog"],6,39,23,0],
		"1f32c-fe0f":[["\uD83C\uDF2C\uFE0F","\uD83C\uDF2C"],"","",["wind_blowing_face"],6,40,23,0],
		"1f32d":[["\uD83C\uDF2D"],"","",["hotdog"],6,41,31,0],
		"1f32e":[["\uD83C\uDF2E"],"","",["taco"],6,42,31,0],
		"1f32f":[["\uD83C\uDF2F"],"","",["burrito"],6,43,31,0],
		"1f330":[["\uD83C\uDF30"],"","\uDBB8\uDC4C",["chestnut"],6,44,63,0],
		"1f331":[["\uD83C\uDF31"],"","\uDBB8\uDC3E",["seedling"],6,45,63,0],
		"1f332":[["\uD83C\uDF32"],"","",["evergreen_tree"],6,46,63,0],
		"1f333":[["\uD83C\uDF33"],"","",["deciduous_tree"],6,47,63,0],
		"1f334":[["\uD83C\uDF34"],"\uE307","\uDBB8\uDC47",["palm_tree"],6,48,63,0],
		"1f335":[["\uD83C\uDF35"],"\uE308","\uDBB8\uDC48",["cactus"],6,49,63,0],
		"1f336-fe0f":[["\uD83C\uDF36\uFE0F","\uD83C\uDF36"],"","",["hot_pepper"],6,50,23,0],
		"1f337":[["\uD83C\uDF37"],"\uE304","\uDBB8\uDC3D",["tulip"],7,0,63,0],
		"1f338":[["\uD83C\uDF38"],"\uE030","\uDBB8\uDC40",["cherry_blossom"],7,1,63,0],
		"1f339":[["\uD83C\uDF39"],"\uE032","\uDBB8\uDC41",["rose"],7,2,63,0],
		"1f33a":[["\uD83C\uDF3A"],"\uE303","\uDBB8\uDC45",["hibiscus"],7,3,63,0],
		"1f33b":[["\uD83C\uDF3B"],"\uE305","\uDBB8\uDC46",["sunflower"],7,4,63,0],
		"1f33c":[["\uD83C\uDF3C"],"","\uDBB8\uDC4D",["blossom"],7,5,63,0],
		"1f33d":[["\uD83C\uDF3D"],"","\uDBB8\uDC4A",["corn"],7,6,63,0],
		"1f33e":[["\uD83C\uDF3E"],"\uE444","\uDBB8\uDC49",["ear_of_rice"],7,7,63,0],
		"1f33f":[["\uD83C\uDF3F"],"","\uDBB8\uDC4E",["herb"],7,8,63,0],
		"1f340":[["\uD83C\uDF40"],"\uE110","\uDBB8\uDC3C",["four_leaf_clover"],7,9,63,0],
		"1f341":[["\uD83C\uDF41"],"\uE118","\uDBB8\uDC3F",["maple_leaf"],7,10,63,0],
		"1f342":[["\uD83C\uDF42"],"\uE119","\uDBB8\uDC42",["fallen_leaf"],7,11,63,0],
		"1f343":[["\uD83C\uDF43"],"\uE447","\uDBB8\uDC43",["leaves"],7,12,63,0],
		"1f344":[["\uD83C\uDF44"],"","\uDBB8\uDC4B",["mushroom"],7,13,63,0],
		"1f345":[["\uD83C\uDF45"],"\uE349","\uDBB8\uDC55",["tomato"],7,14,63,0],
		"1f346":[["\uD83C\uDF46"],"\uE34A","\uDBB8\uDC56",["eggplant"],7,15,63,0],
		"1f347":[["\uD83C\uDF47"],"","\uDBB8\uDC59",["grapes"],7,16,63,0],
		"1f348":[["\uD83C\uDF48"],"","\uDBB8\uDC57",["melon"],7,17,63,0],
		"1f349":[["\uD83C\uDF49"],"\uE348","\uDBB8\uDC54",["watermelon"],7,18,63,0],
		"1f34a":[["\uD83C\uDF4A"],"\uE346","\uDBB8\uDC52",["tangerine"],7,19,63,0],
		"1f34b":[["\uD83C\uDF4B"],"","",["lemon"],7,20,63,0],
		"1f34c":[["\uD83C\uDF4C"],"","\uDBB8\uDC50",["banana"],7,21,63,0],
		"1f34d":[["\uD83C\uDF4D"],"","\uDBB8\uDC58",["pineapple"],7,22,63,0],
		"1f34e":[["\uD83C\uDF4E"],"\uE345","\uDBB8\uDC51",["apple"],7,23,63,0],
		"1f34f":[["\uD83C\uDF4F"],"","\uDBB8\uDC5B",["green_apple"],7,24,63,0],
		"1f350":[["\uD83C\uDF50"],"","",["pear"],7,25,63,0],
		"1f351":[["\uD83C\uDF51"],"","\uDBB8\uDC5A",["peach"],7,26,63,0],
		"1f352":[["\uD83C\uDF52"],"","\uDBB8\uDC4F",["cherries"],7,27,63,0],
		"1f353":[["\uD83C\uDF53"],"\uE347","\uDBB8\uDC53",["strawberry"],7,28,63,0],
		"1f354":[["\uD83C\uDF54"],"\uE120","\uDBBA\uDD60",["hamburger"],7,29,63,0],
		"1f355":[["\uD83C\uDF55"],"","\uDBBA\uDD75",["pizza"],7,30,63,0],
		"1f356":[["\uD83C\uDF56"],"","\uDBBA\uDD72",["meat_on_bone"],7,31,63,0],
		"1f357":[["\uD83C\uDF57"],"","\uDBBA\uDD76",["poultry_leg"],7,32,63,0],
		"1f358":[["\uD83C\uDF58"],"\uE33D","\uDBBA\uDD69",["rice_cracker"],7,33,63,0],
		"1f359":[["\uD83C\uDF59"],"\uE342","\uDBBA\uDD61",["rice_ball"],7,34,63,0],
		"1f35a":[["\uD83C\uDF5A"],"\uE33E","\uDBBA\uDD6A",["rice"],7,35,63,0],
		"1f35b":[["\uD83C\uDF5B"],"\uE341","\uDBBA\uDD6C",["curry"],7,36,63,0],
		"1f35c":[["\uD83C\uDF5C"],"\uE340","\uDBBA\uDD63",["ramen"],7,37,63,0],
		"1f35d":[["\uD83C\uDF5D"],"\uE33F","\uDBBA\uDD6B",["spaghetti"],7,38,63,0],
		"1f35e":[["\uD83C\uDF5E"],"\uE339","\uDBBA\uDD64",["bread"],7,39,63,0],
		"1f35f":[["\uD83C\uDF5F"],"\uE33B","\uDBBA\uDD67",["fries"],7,40,63,0],
		"1f360":[["\uD83C\uDF60"],"","\uDBBA\uDD74",["sweet_potato"],7,41,63,0],
		"1f361":[["\uD83C\uDF61"],"\uE33C","\uDBBA\uDD68",["dango"],7,42,63,0],
		"1f362":[["\uD83C\uDF62"],"\uE343","\uDBBA\uDD6D",["oden"],7,43,63,0],
		"1f363":[["\uD83C\uDF63"],"\uE344","\uDBBA\uDD6E",["sushi"],7,44,63,0],
		"1f364":[["\uD83C\uDF64"],"","\uDBBA\uDD7F",["fried_shrimp"],7,45,63,0],
		"1f365":[["\uD83C\uDF65"],"","\uDBBA\uDD73",["fish_cake"],7,46,63,0],
		"1f366":[["\uD83C\uDF66"],"\uE33A","\uDBBA\uDD66",["icecream"],7,47,63,0],
		"1f367":[["\uD83C\uDF67"],"\uE43F","\uDBBA\uDD71",["shaved_ice"],7,48,63,0],
		"1f368":[["\uD83C\uDF68"],"","\uDBBA\uDD77",["ice_cream"],7,49,63,0],
		"1f369":[["\uD83C\uDF69"],"","\uDBBA\uDD78",["doughnut"],7,50,63,0],
		"1f36a":[["\uD83C\uDF6A"],"","\uDBBA\uDD79",["cookie"],8,0,63,0],
		"1f36b":[["\uD83C\uDF6B"],"","\uDBBA\uDD7A",["chocolate_bar"],8,1,63,0],
		"1f36c":[["\uD83C\uDF6C"],"","\uDBBA\uDD7B",["candy"],8,2,63,0],
		"1f36d":[["\uD83C\uDF6D"],"","\uDBBA\uDD7C",["lollipop"],8,3,63,0],
		"1f36e":[["\uD83C\uDF6E"],"","\uDBBA\uDD7D",["custard"],8,4,63,0],
		"1f36f":[["\uD83C\uDF6F"],"","\uDBBA\uDD7E",["honey_pot"],8,5,63,0],
		"1f370":[["\uD83C\uDF70"],"\uE046","\uDBBA\uDD62",["cake"],8,6,63,0],
		"1f371":[["\uD83C\uDF71"],"\uE34C","\uDBBA\uDD6F",["bento"],8,7,63,0],
		"1f372":[["\uD83C\uDF72"],"\uE34D","\uDBBA\uDD70",["stew"],8,8,63,0],
		"1f373":[["\uD83C\uDF73"],"\uE147","\uDBBA\uDD65",["fried_egg","cooking"],8,9,63,0],
		"1f374":[["\uD83C\uDF74"],"\uE043","\uDBBA\uDD80",["fork_and_knife"],8,10,63,0],
		"1f375":[["\uD83C\uDF75"],"\uE338","\uDBBA\uDD84",["tea"],8,11,63,0],
		"1f376":[["\uD83C\uDF76"],"\uE30B","\uDBBA\uDD85",["sake"],8,12,63,0],
		"1f377":[["\uD83C\uDF77"],"","\uDBBA\uDD86",["wine_glass"],8,13,63,0],
		"1f378":[["\uD83C\uDF78"],"\uE044","\uDBBA\uDD82",["cocktail"],8,14,63,0],
		"1f379":[["\uD83C\uDF79"],"","\uDBBA\uDD88",["tropical_drink"],8,15,63,0],
		"1f37a":[["\uD83C\uDF7A"],"\uE047","\uDBBA\uDD83",["beer"],8,16,63,0],
		"1f37b":[["\uD83C\uDF7B"],"\uE30C","\uDBBA\uDD87",["beers"],8,17,63,0],
		"1f37c":[["\uD83C\uDF7C"],"","",["baby_bottle"],8,18,63,0],
		"1f37d-fe0f":[["\uD83C\uDF7D\uFE0F","\uD83C\uDF7D"],"","",["knife_fork_plate"],8,19,23,0],
		"1f37e":[["\uD83C\uDF7E"],"","",["champagne"],8,20,31,0],
		"1f37f":[["\uD83C\uDF7F"],"","",["popcorn"],8,21,31,0],
		"1f380":[["\uD83C\uDF80"],"\uE314","\uDBB9\uDD0F",["ribbon"],8,22,63,0],
		"1f381":[["\uD83C\uDF81"],"\uE112","\uDBB9\uDD10",["gift"],8,23,63,0],
		"1f382":[["\uD83C\uDF82"],"\uE34B","\uDBB9\uDD11",["birthday"],8,24,63,0],
		"1f383":[["\uD83C\uDF83"],"\uE445","\uDBB9\uDD1F",["jack_o_lantern"],8,25,63,0],
		"1f384":[["\uD83C\uDF84"],"\uE033","\uDBB9\uDD12",["christmas_tree"],8,26,63,0],
		"1f385":[["\uD83C\uDF85"],"\uE448","\uDBB9\uDD13",["santa"],8,27,63,0],
		"1f386":[["\uD83C\uDF86"],"\uE117","\uDBB9\uDD15",["fireworks"],8,33,63,0],
		"1f387":[["\uD83C\uDF87"],"\uE440","\uDBB9\uDD1D",["sparkler"],8,34,63,0],
		"1f388":[["\uD83C\uDF88"],"\uE310","\uDBB9\uDD16",["balloon"],8,35,63,0],
		"1f389":[["\uD83C\uDF89"],"\uE312","\uDBB9\uDD17",["tada"],8,36,63,0],
		"1f38a":[["\uD83C\uDF8A"],"","\uDBB9\uDD20",["confetti_ball"],8,37,63,0],
		"1f38b":[["\uD83C\uDF8B"],"","\uDBB9\uDD21",["tanabata_tree"],8,38,63,0],
		"1f38c":[["\uD83C\uDF8C"],"\uE143","\uDBB9\uDD14",["crossed_flags"],8,39,63,0],
		"1f38d":[["\uD83C\uDF8D"],"\uE436","\uDBB9\uDD18",["bamboo"],8,40,63,0],
		"1f38e":[["\uD83C\uDF8E"],"\uE438","\uDBB9\uDD19",["dolls"],8,41,63,0],
		"1f38f":[["\uD83C\uDF8F"],"\uE43B","\uDBB9\uDD1C",["flags"],8,42,63,0],
		"1f390":[["\uD83C\uDF90"],"\uE442","\uDBB9\uDD1E",["wind_chime"],8,43,63,0],
		"1f391":[["\uD83C\uDF91"],"\uE446","\uDBB8\uDC17",["rice_scene"],8,44,63,0],
		"1f392":[["\uD83C\uDF92"],"\uE43A","\uDBB9\uDD1B",["school_satchel"],8,45,63,0],
		"1f393":[["\uD83C\uDF93"],"\uE439","\uDBB9\uDD1A",["mortar_board"],8,46,63,0],
		"1f396-fe0f":[["\uD83C\uDF96\uFE0F","\uD83C\uDF96"],"","",["medal"],8,47,23,0],
		"1f397-fe0f":[["\uD83C\uDF97\uFE0F","\uD83C\uDF97"],"","",["reminder_ribbon"],8,48,23,0],
		"1f399-fe0f":[["\uD83C\uDF99\uFE0F","\uD83C\uDF99"],"","",["studio_microphone"],8,49,23,0],
		"1f39a-fe0f":[["\uD83C\uDF9A\uFE0F","\uD83C\uDF9A"],"","",["level_slider"],8,50,23,0],
		"1f39b-fe0f":[["\uD83C\uDF9B\uFE0F","\uD83C\uDF9B"],"","",["control_knobs"],9,0,23,0],
		"1f39e-fe0f":[["\uD83C\uDF9E\uFE0F","\uD83C\uDF9E"],"","",["film_frames"],9,1,23,0],
		"1f39f-fe0f":[["\uD83C\uDF9F\uFE0F","\uD83C\uDF9F"],"","",["admission_tickets"],9,2,23,0],
		"1f3a0":[["\uD83C\uDFA0"],"","\uDBB9\uDFFC",["carousel_horse"],9,3,63,0],
		"1f3a1":[["\uD83C\uDFA1"],"\uE124","\uDBB9\uDFFD",["ferris_wheel"],9,4,63,0],
		"1f3a2":[["\uD83C\uDFA2"],"\uE433","\uDBB9\uDFFE",["roller_coaster"],9,5,63,0],
		"1f3a3":[["\uD83C\uDFA3"],"","\uDBB9\uDFFF",["fishing_pole_and_fish"],9,6,63,0],
		"1f3a4":[["\uD83C\uDFA4"],"\uE03C","\uDBBA\uDC00",["microphone"],9,7,63,0],
		"1f3a5":[["\uD83C\uDFA5"],"\uE03D","\uDBBA\uDC01",["movie_camera"],9,8,63,0],
		"1f3a6":[["\uD83C\uDFA6"],"\uE507","\uDBBA\uDC02",["cinema"],9,9,63,0],
		"1f3a7":[["\uD83C\uDFA7"],"\uE30A","\uDBBA\uDC03",["headphones"],9,10,63,0],
		"1f3a8":[["\uD83C\uDFA8"],"\uE502","\uDBBA\uDC04",["art"],9,11,63,0],
		"1f3a9":[["\uD83C\uDFA9"],"\uE503","\uDBBA\uDC05",["tophat"],9,12,63,0],
		"1f3aa":[["\uD83C\uDFAA"],"","\uDBBA\uDC06",["circus_tent"],9,13,63,0],
		"1f3ab":[["\uD83C\uDFAB"],"\uE125","\uDBBA\uDC07",["ticket"],9,14,63,0],
		"1f3ac":[["\uD83C\uDFAC"],"\uE324","\uDBBA\uDC08",["clapper"],9,15,63,0],
		"1f3ad":[["\uD83C\uDFAD"],"","\uDBBA\uDC09",["performing_arts"],9,16,63,0],
		"1f3ae":[["\uD83C\uDFAE"],"","\uDBBA\uDC0A",["video_game"],9,17,63,0],
		"1f3af":[["\uD83C\uDFAF"],"\uE130","\uDBBA\uDC0C",["dart"],9,18,63,0],
		"1f3b0":[["\uD83C\uDFB0"],"\uE133","\uDBBA\uDC0D",["slot_machine"],9,19,63,0],
		"1f3b1":[["\uD83C\uDFB1"],"\uE42C","\uDBBA\uDC0E",["8ball"],9,20,63,0],
		"1f3b2":[["\uD83C\uDFB2"],"","\uDBBA\uDC0F",["game_die"],9,21,63,0],
		"1f3b3":[["\uD83C\uDFB3"],"","\uDBBA\uDC10",["bowling"],9,22,63,0],
		"1f3b4":[["\uD83C\uDFB4"],"","\uDBBA\uDC11",["flower_playing_cards"],9,23,63,0],
		"1f3b5":[["\uD83C\uDFB5"],"\uE03E","\uDBBA\uDC13",["musical_note"],9,24,63,0],
		"1f3b6":[["\uD83C\uDFB6"],"\uE326","\uDBBA\uDC14",["notes"],9,25,63,0],
		"1f3b7":[["\uD83C\uDFB7"],"\uE040","\uDBBA\uDC15",["saxophone"],9,26,63,0],
		"1f3b8":[["\uD83C\uDFB8"],"\uE041","\uDBBA\uDC16",["guitar"],9,27,63,0],
		"1f3b9":[["\uD83C\uDFB9"],"","\uDBBA\uDC17",["musical_keyboard"],9,28,63,0],
		"1f3ba":[["\uD83C\uDFBA"],"\uE042","\uDBBA\uDC18",["trumpet"],9,29,63,0],
		"1f3bb":[["\uD83C\uDFBB"],"","\uDBBA\uDC19",["violin"],9,30,63,0],
		"1f3bc":[["\uD83C\uDFBC"],"","\uDBBA\uDC1A",["musical_score"],9,31,63,0],
		"1f3bd":[["\uD83C\uDFBD"],"","\uDBB9\uDFD0",["running_shirt_with_sash"],9,32,63,0],
		"1f3be":[["\uD83C\uDFBE"],"\uE015","\uDBB9\uDFD3",["tennis"],9,33,63,0],
		"1f3bf":[["\uD83C\uDFBF"],"\uE013","\uDBB9\uDFD5",["ski"],9,34,63,0],
		"1f3c0":[["\uD83C\uDFC0"],"\uE42A","\uDBB9\uDFD6",["basketball"],9,35,63,0],
		"1f3c1":[["\uD83C\uDFC1"],"\uE132","\uDBB9\uDFD7",["checkered_flag"],9,36,63,0],
		"1f3c2":[["\uD83C\uDFC2"],"","\uDBB9\uDFD8",["snowboarder"],9,37,63,0],
		"1f3c3-200d-2640-fe0f":[["\uD83C\uDFC3\u200D\u2640\uFE0F","\uD83C\uDFC3\u200D\u2640"],"","",["woman-running"],9,43,23,0],
		"1f3c3-200d-2642-fe0f":[["\uD83C\uDFC3\u200D\u2642\uFE0F","\uD83C\uDFC3\u200D\u2642","\uD83C\uDFC3"],"","",["man-running","runner","running"],9,49,23,0],
		"1f3c4-200d-2640-fe0f":[["\uD83C\uDFC4\u200D\u2640\uFE0F","\uD83C\uDFC4\u200D\u2640"],"","",["woman-surfing"],10,10,23,0],
		"1f3c4-200d-2642-fe0f":[["\uD83C\uDFC4\u200D\u2642\uFE0F","\uD83C\uDFC4\u200D\u2642","\uD83C\uDFC4"],"","",["man-surfing","surfer"],10,16,23,0],
		"1f3c5":[["\uD83C\uDFC5"],"","",["sports_medal"],10,28,31,0],
		"1f3c6":[["\uD83C\uDFC6"],"\uE131","\uDBB9\uDFDB",["trophy"],10,29,63,0],
		"1f3c7":[["\uD83C\uDFC7"],"","",["horse_racing"],10,30,63,0],
		"1f3c8":[["\uD83C\uDFC8"],"\uE42B","\uDBB9\uDFDD",["football"],10,36,63,0],
		"1f3c9":[["\uD83C\uDFC9"],"","",["rugby_football"],10,37,63,0],
		"1f3ca-200d-2640-fe0f":[["\uD83C\uDFCA\u200D\u2640\uFE0F","\uD83C\uDFCA\u200D\u2640"],"","",["woman-swimming"],10,38,23,0],
		"1f3ca-200d-2642-fe0f":[["\uD83C\uDFCA\u200D\u2642\uFE0F","\uD83C\uDFCA\u200D\u2642","\uD83C\uDFCA"],"","",["man-swimming","swimmer"],10,44,23,0],
		"1f3cb-fe0f-200d-2640-fe0f":[["\uD83C\uDFCB\uFE0F\u200D\u2640\uFE0F"],"","",["woman-lifting-weights"],11,5,7,0],
		"1f3cb-fe0f-200d-2642-fe0f":[["\uD83C\uDFCB\uFE0F\u200D\u2642\uFE0F","\uD83C\uDFCB\uFE0F","\uD83C\uDFCB"],"","",["man-lifting-weights","weight_lifter"],11,11,7,0],
		"1f3cc-fe0f-200d-2640-fe0f":[["\uD83C\uDFCC\uFE0F\u200D\u2640\uFE0F"],"","",["woman-golfing"],11,18,7,0],
		"1f3cc-fe0f-200d-2642-fe0f":[["\uD83C\uDFCC\uFE0F\u200D\u2642\uFE0F","\uD83C\uDFCC\uFE0F","\uD83C\uDFCC"],"","",["man-golfing","golfer"],11,24,7,0],
		"1f3cd-fe0f":[["\uD83C\uDFCD\uFE0F","\uD83C\uDFCD"],"","",["racing_motorcycle"],11,31,23,0],
		"1f3ce-fe0f":[["\uD83C\uDFCE\uFE0F","\uD83C\uDFCE"],"","",["racing_car"],11,32,23,0],
		"1f3cf":[["\uD83C\uDFCF"],"","",["cricket_bat_and_ball"],11,33,31,0],
		"1f3d0":[["\uD83C\uDFD0"],"","",["volleyball"],11,34,31,0],
		"1f3d1":[["\uD83C\uDFD1"],"","",["field_hockey_stick_and_ball"],11,35,31,0],
		"1f3d2":[["\uD83C\uDFD2"],"","",["ice_hockey_stick_and_puck"],11,36,31,0],
		"1f3d3":[["\uD83C\uDFD3"],"","",["table_tennis_paddle_and_ball"],11,37,31,0],
		"1f3d4-fe0f":[["\uD83C\uDFD4\uFE0F","\uD83C\uDFD4"],"","",["snow_capped_mountain"],11,38,23,0],
		"1f3d5-fe0f":[["\uD83C\uDFD5\uFE0F","\uD83C\uDFD5"],"","",["camping"],11,39,23,0],
		"1f3d6-fe0f":[["\uD83C\uDFD6\uFE0F","\uD83C\uDFD6"],"","",["beach_with_umbrella"],11,40,23,0],
		"1f3d7-fe0f":[["\uD83C\uDFD7\uFE0F","\uD83C\uDFD7"],"","",["building_construction"],11,41,23,0],
		"1f3d8-fe0f":[["\uD83C\uDFD8\uFE0F","\uD83C\uDFD8"],"","",["house_buildings"],11,42,23,0],
		"1f3d9-fe0f":[["\uD83C\uDFD9\uFE0F","\uD83C\uDFD9"],"","",["cityscape"],11,43,23,0],
		"1f3da-fe0f":[["\uD83C\uDFDA\uFE0F","\uD83C\uDFDA"],"","",["derelict_house_building"],11,44,23,0],
		"1f3db-fe0f":[["\uD83C\uDFDB\uFE0F","\uD83C\uDFDB"],"","",["classical_building"],11,45,23,0],
		"1f3dc-fe0f":[["\uD83C\uDFDC\uFE0F","\uD83C\uDFDC"],"","",["desert"],11,46,23,0],
		"1f3dd-fe0f":[["\uD83C\uDFDD\uFE0F","\uD83C\uDFDD"],"","",["desert_island"],11,47,23,0],
		"1f3de-fe0f":[["\uD83C\uDFDE\uFE0F","\uD83C\uDFDE"],"","",["national_park"],11,48,23,0],
		"1f3df-fe0f":[["\uD83C\uDFDF\uFE0F","\uD83C\uDFDF"],"","",["stadium"],11,49,23,0],
		"1f3e0":[["\uD83C\uDFE0"],"\uE036","\uDBB9\uDCB0",["house"],11,50,63,0],
		"1f3e1":[["\uD83C\uDFE1"],"","\uDBB9\uDCB1",["house_with_garden"],12,0,63,0],
		"1f3e2":[["\uD83C\uDFE2"],"\uE038","\uDBB9\uDCB2",["office"],12,1,63,0],
		"1f3e3":[["\uD83C\uDFE3"],"\uE153","\uDBB9\uDCB3",["post_office"],12,2,63,0],
		"1f3e4":[["\uD83C\uDFE4"],"","",["european_post_office"],12,3,63,0],
		"1f3e5":[["\uD83C\uDFE5"],"\uE155","\uDBB9\uDCB4",["hospital"],12,4,63,0],
		"1f3e6":[["\uD83C\uDFE6"],"\uE14D","\uDBB9\uDCB5",["bank"],12,5,63,0],
		"1f3e7":[["\uD83C\uDFE7"],"\uE154","\uDBB9\uDCB6",["atm"],12,6,63,0],
		"1f3e8":[["\uD83C\uDFE8"],"\uE158","\uDBB9\uDCB7",["hotel"],12,7,63,0],
		"1f3e9":[["\uD83C\uDFE9"],"\uE501","\uDBB9\uDCB8",["love_hotel"],12,8,63,0],
		"1f3ea":[["\uD83C\uDFEA"],"\uE156","\uDBB9\uDCB9",["convenience_store"],12,9,63,0],
		"1f3eb":[["\uD83C\uDFEB"],"\uE157","\uDBB9\uDCBA",["school"],12,10,63,0],
		"1f3ec":[["\uD83C\uDFEC"],"\uE504","\uDBB9\uDCBD",["department_store"],12,11,63,0],
		"1f3ed":[["\uD83C\uDFED"],"\uE508","\uDBB9\uDCC0",["factory"],12,12,63,0],
		"1f3ee":[["\uD83C\uDFEE"],"","\uDBB9\uDCC2",["izakaya_lantern","lantern"],12,13,63,0],
		"1f3ef":[["\uD83C\uDFEF"],"\uE505","\uDBB9\uDCBE",["japanese_castle"],12,14,63,0],
		"1f3f0":[["\uD83C\uDFF0"],"\uE506","\uDBB9\uDCBF",["european_castle"],12,15,63,0],
		"1f3f3-fe0f-200d-1f308":[["\uD83C\uDFF3\uFE0F\u200D\uD83C\uDF08","\uD83C\uDFF3\u200D\uD83C\uDF08"],"","",["rainbow-flag"],12,16,55,0],
		"1f3f3-fe0f":[["\uD83C\uDFF3\uFE0F","\uD83C\uDFF3"],"","",["waving_white_flag"],12,17,23,0],
		"1f3f4-e0067-e0062-e0065-e006e-e0067-e007f":[["\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC65\uDB40\uDC6E\uDB40\uDC67\uDB40\uDC7F"],"","",["flag-england"],12,18,23,0],
		"1f3f4-e0067-e0062-e0073-e0063-e0074-e007f":[["\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC73\uDB40\uDC63\uDB40\uDC74\uDB40\uDC7F"],"","",["flag-scotland"],12,19,23,0],
		"1f3f4-e0067-e0062-e0077-e006c-e0073-e007f":[["\uD83C\uDFF4\uDB40\uDC67\uDB40\uDC62\uDB40\uDC77\uDB40\uDC6C\uDB40\uDC73\uDB40\uDC7F"],"","",["flag-wales"],12,20,23,0],
		"1f3f4":[["\uD83C\uDFF4"],"","",["waving_black_flag"],12,21,31,0],
		"1f3f5-fe0f":[["\uD83C\uDFF5\uFE0F","\uD83C\uDFF5"],"","",["rosette"],12,22,23,0],
		"1f3f7-fe0f":[["\uD83C\uDFF7\uFE0F","\uD83C\uDFF7"],"","",["label"],12,23,23,0],
		"1f3f8":[["\uD83C\uDFF8"],"","",["badminton_racquet_and_shuttlecock"],12,24,31,0],
		"1f3f9":[["\uD83C\uDFF9"],"","",["bow_and_arrow"],12,25,31,0],
		"1f3fa":[["\uD83C\uDFFA"],"","",["amphora"],12,26,31,0],
		"1f3fb":[["\uD83C\uDFFB"],"","",["skin-tone-2"],12,27,31,0],
		"1f3fc":[["\uD83C\uDFFC"],"","",["skin-tone-3"],12,28,31,0],
		"1f3fd":[["\uD83C\uDFFD"],"","",["skin-tone-4"],12,29,31,0],
		"1f3fe":[["\uD83C\uDFFE"],"","",["skin-tone-5"],12,30,31,0],
		"1f3ff":[["\uD83C\uDFFF"],"","",["skin-tone-6"],12,31,31,0],
		"1f400":[["\uD83D\uDC00"],"","",["rat"],12,32,63,0],
		"1f401":[["\uD83D\uDC01"],"","",["mouse2"],12,33,63,0],
		"1f402":[["\uD83D\uDC02"],"","",["ox"],12,34,63,0],
		"1f403":[["\uD83D\uDC03"],"","",["water_buffalo"],12,35,63,0],
		"1f404":[["\uD83D\uDC04"],"","",["cow2"],12,36,63,0],
		"1f405":[["\uD83D\uDC05"],"","",["tiger2"],12,37,63,0],
		"1f406":[["\uD83D\uDC06"],"","",["leopard"],12,38,63,0],
		"1f407":[["\uD83D\uDC07"],"","",["rabbit2"],12,39,63,0],
		"1f408":[["\uD83D\uDC08"],"","",["cat2"],12,40,63,0],
		"1f409":[["\uD83D\uDC09"],"","",["dragon"],12,41,63,0],
		"1f40a":[["\uD83D\uDC0A"],"","",["crocodile"],12,42,63,0],
		"1f40b":[["\uD83D\uDC0B"],"","",["whale2"],12,43,63,0],
		"1f40c":[["\uD83D\uDC0C"],"","\uDBB8\uDDB9",["snail"],12,44,63,0],
		"1f40d":[["\uD83D\uDC0D"],"\uE52D","\uDBB8\uDDD3",["snake"],12,45,63,0],
		"1f40e":[["\uD83D\uDC0E"],"\uE134","\uDBB9\uDFDC",["racehorse"],12,46,63,0],
		"1f40f":[["\uD83D\uDC0F"],"","",["ram"],12,47,63,0],
		"1f410":[["\uD83D\uDC10"],"","",["goat"],12,48,63,0],
		"1f411":[["\uD83D\uDC11"],"\uE529","\uDBB8\uDDCF",["sheep"],12,49,63,0],
		"1f412":[["\uD83D\uDC12"],"\uE528","\uDBB8\uDDCE",["monkey"],12,50,63,0],
		"1f413":[["\uD83D\uDC13"],"","",["rooster"],13,0,63,0],
		"1f414":[["\uD83D\uDC14"],"\uE52E","\uDBB8\uDDD4",["chicken"],13,1,63,0],
		"1f415":[["\uD83D\uDC15"],"","",["dog2"],13,2,63,0],
		"1f416":[["\uD83D\uDC16"],"","",["pig2"],13,3,63,0],
		"1f417":[["\uD83D\uDC17"],"\uE52F","\uDBB8\uDDD5",["boar"],13,4,63,0],
		"1f418":[["\uD83D\uDC18"],"\uE526","\uDBB8\uDDCC",["elephant"],13,5,63,0],
		"1f419":[["\uD83D\uDC19"],"\uE10A","\uDBB8\uDDC5",["octopus"],13,6,63,0],
		"1f41a":[["\uD83D\uDC1A"],"\uE441","\uDBB8\uDDC6",["shell"],13,7,63,0],
		"1f41b":[["\uD83D\uDC1B"],"\uE525","\uDBB8\uDDCB",["bug"],13,8,63,0],
		"1f41c":[["\uD83D\uDC1C"],"","\uDBB8\uDDDA",["ant"],13,9,63,0],
		"1f41d":[["\uD83D\uDC1D"],"","\uDBB8\uDDE1",["bee","honeybee"],13,10,63,0],
		"1f41e":[["\uD83D\uDC1E"],"","\uDBB8\uDDE2",["beetle"],13,11,63,0],
		"1f41f":[["\uD83D\uDC1F"],"\uE019","\uDBB8\uDDBD",["fish"],13,12,63,0],
		"1f420":[["\uD83D\uDC20"],"\uE522","\uDBB8\uDDC9",["tropical_fish"],13,13,63,0],
		"1f421":[["\uD83D\uDC21"],"","\uDBB8\uDDD9",["blowfish"],13,14,63,0],
		"1f422":[["\uD83D\uDC22"],"","\uDBB8\uDDDC",["turtle"],13,15,63,0],
		"1f423":[["\uD83D\uDC23"],"","\uDBB8\uDDDD",["hatching_chick"],13,16,63,0],
		"1f424":[["\uD83D\uDC24"],"\uE523","\uDBB8\uDDBA",["baby_chick"],13,17,63,0],
		"1f425":[["\uD83D\uDC25"],"","\uDBB8\uDDBB",["hatched_chick"],13,18,63,0],
		"1f426":[["\uD83D\uDC26"],"\uE521","\uDBB8\uDDC8",["bird"],13,19,63,0],
		"1f427":[["\uD83D\uDC27"],"\uE055","\uDBB8\uDDBC",["penguin"],13,20,63,0],
		"1f428":[["\uD83D\uDC28"],"\uE527","\uDBB8\uDDCD",["koala"],13,21,63,0],
		"1f429":[["\uD83D\uDC29"],"","\uDBB8\uDDD8",["poodle"],13,22,63,0],
		"1f42a":[["\uD83D\uDC2A"],"","",["dromedary_camel"],13,23,63,0],
		"1f42b":[["\uD83D\uDC2B"],"\uE530","\uDBB8\uDDD6",["camel"],13,24,63,0],
		"1f42c":[["\uD83D\uDC2C"],"\uE520","\uDBB8\uDDC7",["dolphin","flipper"],13,25,63,0],
		"1f42d":[["\uD83D\uDC2D"],"\uE053","\uDBB8\uDDC2",["mouse"],13,26,63,0],
		"1f42e":[["\uD83D\uDC2E"],"\uE52B","\uDBB8\uDDD1",["cow"],13,27,63,0],
		"1f42f":[["\uD83D\uDC2F"],"\uE050","\uDBB8\uDDC0",["tiger"],13,28,63,0],
		"1f430":[["\uD83D\uDC30"],"\uE52C","\uDBB8\uDDD2",["rabbit"],13,29,63,0],
		"1f431":[["\uD83D\uDC31"],"\uE04F","\uDBB8\uDDB8",["cat"],13,30,63,0],
		"1f432":[["\uD83D\uDC32"],"","\uDBB8\uDDDE",["dragon_face"],13,31,63,0],
		"1f433":[["\uD83D\uDC33"],"\uE054","\uDBB8\uDDC3",["whale"],13,32,63,0],
		"1f434":[["\uD83D\uDC34"],"\uE01A","\uDBB8\uDDBE",["horse"],13,33,63,0],
		"1f435":[["\uD83D\uDC35"],"\uE109","\uDBB8\uDDC4",["monkey_face"],13,34,63,0],
		"1f436":[["\uD83D\uDC36"],"\uE052","\uDBB8\uDDB7",["dog"],13,35,63,0],
		"1f437":[["\uD83D\uDC37"],"\uE10B","\uDBB8\uDDBF",["pig"],13,36,63,0],
		"1f438":[["\uD83D\uDC38"],"\uE531","\uDBB8\uDDD7",["frog"],13,37,63,0],
		"1f439":[["\uD83D\uDC39"],"\uE524","\uDBB8\uDDCA",["hamster"],13,38,63,0],
		"1f43a":[["\uD83D\uDC3A"],"\uE52A","\uDBB8\uDDD0",["wolf"],13,39,63,0],
		"1f43b":[["\uD83D\uDC3B"],"\uE051","\uDBB8\uDDC1",["bear"],13,40,63,0],
		"1f43c":[["\uD83D\uDC3C"],"","\uDBB8\uDDDF",["panda_face"],13,41,63,0],
		"1f43d":[["\uD83D\uDC3D"],"","\uDBB8\uDDE0",["pig_nose"],13,42,63,0],
		"1f43e":[["\uD83D\uDC3E"],"","\uDBB8\uDDDB",["feet","paw_prints"],13,43,63,0],
		"1f43f-fe0f":[["\uD83D\uDC3F\uFE0F","\uD83D\uDC3F"],"","",["chipmunk"],13,44,23,0],
		"1f440":[["\uD83D\uDC40"],"\uE419","\uDBB8\uDD90",["eyes"],13,45,63,0],
		"1f441-fe0f-200d-1f5e8-fe0f":[["\uD83D\uDC41\uFE0F\u200D\uD83D\uDDE8\uFE0F"],"","",["eye-in-speech-bubble"],13,46,3,0],
		"1f441-fe0f":[["\uD83D\uDC41\uFE0F","\uD83D\uDC41"],"","",["eye"],13,47,23,0],
		"1f442":[["\uD83D\uDC42"],"\uE41B","\uDBB8\uDD91",["ear"],13,48,63,0],
		"1f443":[["\uD83D\uDC43"],"\uE41A","\uDBB8\uDD92",["nose"],14,3,63,0],
		"1f444":[["\uD83D\uDC44"],"\uE41C","\uDBB8\uDD93",["lips"],14,9,63,0],
		"1f445":[["\uD83D\uDC45"],"","\uDBB8\uDD94",["tongue"],14,10,63,0],
		"1f446":[["\uD83D\uDC46"],"\uE22E","\uDBBA\uDF99",["point_up_2"],14,11,63,0],
		"1f447":[["\uD83D\uDC47"],"\uE22F","\uDBBA\uDF9A",["point_down"],14,17,63,0],
		"1f448":[["\uD83D\uDC48"],"\uE230","\uDBBA\uDF9B",["point_left"],14,23,63,0],
		"1f449":[["\uD83D\uDC49"],"\uE231","\uDBBA\uDF9C",["point_right"],14,29,63,0],
		"1f44a":[["\uD83D\uDC4A"],"\uE00D","\uDBBA\uDF96",["facepunch","punch"],14,35,63,0],
		"1f44b":[["\uD83D\uDC4B"],"\uE41E","\uDBBA\uDF9D",["wave"],14,41,63,0],
		"1f44c":[["\uD83D\uDC4C"],"\uE420","\uDBBA\uDF9F",["ok_hand"],14,47,63,0],
		"1f44d":[["\uD83D\uDC4D"],"\uE00E","\uDBBA\uDF97",["+1","thumbsup"],15,2,63,0],
		"1f44e":[["\uD83D\uDC4E"],"\uE421","\uDBBA\uDFA0",["-1","thumbsdown"],15,8,63,0],
		"1f44f":[["\uD83D\uDC4F"],"\uE41F","\uDBBA\uDF9E",["clap"],15,14,63,0],
		"1f450":[["\uD83D\uDC50"],"\uE422","\uDBBA\uDFA1",["open_hands"],15,20,63,0],
		"1f451":[["\uD83D\uDC51"],"\uE10E","\uDBB9\uDCD1",["crown"],15,26,63,0],
		"1f452":[["\uD83D\uDC52"],"\uE318","\uDBB9\uDCD4",["womans_hat"],15,27,63,0],
		"1f453":[["\uD83D\uDC53"],"","\uDBB9\uDCCE",["eyeglasses"],15,28,63,0],
		"1f454":[["\uD83D\uDC54"],"\uE302","\uDBB9\uDCD3",["necktie"],15,29,63,0],
		"1f455":[["\uD83D\uDC55"],"\uE006","\uDBB9\uDCCF",["shirt","tshirt"],15,30,63,0],
		"1f456":[["\uD83D\uDC56"],"","\uDBB9\uDCD0",["jeans"],15,31,63,0],
		"1f457":[["\uD83D\uDC57"],"\uE319","\uDBB9\uDCD5",["dress"],15,32,63,0],
		"1f458":[["\uD83D\uDC58"],"\uE321","\uDBB9\uDCD9",["kimono"],15,33,63,0],
		"1f459":[["\uD83D\uDC59"],"\uE322","\uDBB9\uDCDA",["bikini"],15,34,63,0],
		"1f45a":[["\uD83D\uDC5A"],"","\uDBB9\uDCDB",["womans_clothes"],15,35,63,0],
		"1f45b":[["\uD83D\uDC5B"],"","\uDBB9\uDCDC",["purse"],15,36,63,0],
		"1f45c":[["\uD83D\uDC5C"],"\uE323","\uDBB9\uDCF0",["handbag"],15,37,63,0],
		"1f45d":[["\uD83D\uDC5D"],"","\uDBB9\uDCF1",["pouch"],15,38,63,0],
		"1f45e":[["\uD83D\uDC5E"],"","\uDBB9\uDCCC",["mans_shoe","shoe"],15,39,63,0],
		"1f45f":[["\uD83D\uDC5F"],"\uE007","\uDBB9\uDCCD",["athletic_shoe"],15,40,63,0],
		"1f460":[["\uD83D\uDC60"],"\uE13E","\uDBB9\uDCD6",["high_heel"],15,41,63,0],
		"1f461":[["\uD83D\uDC61"],"\uE31A","\uDBB9\uDCD7",["sandal"],15,42,63,0],
		"1f462":[["\uD83D\uDC62"],"\uE31B","\uDBB9\uDCD8",["boot"],15,43,63,0],
		"1f463":[["\uD83D\uDC63"],"\uE536","\uDBB9\uDD53",["footprints"],15,44,63,0],
		"1f464":[["\uD83D\uDC64"],"","\uDBB8\uDD9A",["bust_in_silhouette"],15,45,63,0],
		"1f465":[["\uD83D\uDC65"],"","",["busts_in_silhouette"],15,46,63,0],
		"1f466":[["\uD83D\uDC66"],"\uE001","\uDBB8\uDD9B",["boy"],15,47,63,0],
		"1f467":[["\uD83D\uDC67"],"\uE002","\uDBB8\uDD9C",["girl"],16,2,63,0],
		"1f468-200d-1f33e":[["\uD83D\uDC68\u200D\uD83C\uDF3E"],"","",["male-farmer"],16,8,23,0],
		"1f468-200d-1f373":[["\uD83D\uDC68\u200D\uD83C\uDF73"],"","",["male-cook"],16,14,23,0],
		"1f468-200d-1f393":[["\uD83D\uDC68\u200D\uD83C\uDF93"],"","",["male-student"],16,20,23,0],
		"1f468-200d-1f3a4":[["\uD83D\uDC68\u200D\uD83C\uDFA4"],"","",["male-singer"],16,26,23,0],
		"1f468-200d-1f3a8":[["\uD83D\uDC68\u200D\uD83C\uDFA8"],"","",["male-artist"],16,32,23,0],
		"1f468-200d-1f3eb":[["\uD83D\uDC68\u200D\uD83C\uDFEB"],"","",["male-teacher"],16,38,23,0],
		"1f468-200d-1f3ed":[["\uD83D\uDC68\u200D\uD83C\uDFED"],"","",["male-factory-worker"],16,44,23,0],
		"1f468-200d-1f466-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["man-boy-boy"],16,50,23,0],
		"1f468-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC66"],"","",["man-boy"],17,0,23,0],
		"1f468-200d-1f467-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["man-girl-boy"],17,1,23,0],
		"1f468-200d-1f467-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["man-girl-girl"],17,2,23,0],
		"1f468-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC67"],"","",["man-girl"],17,3,23,0],
		"1f468-200d-1f468-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66"],"","",["man-man-boy"],17,4,63,0],
		"1f468-200d-1f468-200d-1f466-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["man-man-boy-boy"],17,5,63,0],
		"1f468-200d-1f468-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67"],"","",["man-man-girl"],17,6,63,0],
		"1f468-200d-1f468-200d-1f467-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["man-man-girl-boy"],17,7,63,0],
		"1f468-200d-1f468-200d-1f467-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC68\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["man-man-girl-girl"],17,8,63,0],
		"1f468-200d-1f469-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66","\uD83D\uDC6A"],"","",["man-woman-boy","family"],17,9,55,0],
		"1f468-200d-1f469-200d-1f466-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["man-woman-boy-boy"],17,10,63,0],
		"1f468-200d-1f469-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67"],"","",["man-woman-girl"],17,11,63,0],
		"1f468-200d-1f469-200d-1f467-200d-1f466":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["man-woman-girl-boy"],17,12,63,0],
		"1f468-200d-1f469-200d-1f467-200d-1f467":[["\uD83D\uDC68\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["man-woman-girl-girl"],17,13,63,0],
		"1f468-200d-1f4bb":[["\uD83D\uDC68\u200D\uD83D\uDCBB"],"","",["male-technologist"],17,14,23,0],
		"1f468-200d-1f4bc":[["\uD83D\uDC68\u200D\uD83D\uDCBC"],"","",["male-office-worker"],17,20,23,0],
		"1f468-200d-1f527":[["\uD83D\uDC68\u200D\uD83D\uDD27"],"","",["male-mechanic"],17,26,23,0],
		"1f468-200d-1f52c":[["\uD83D\uDC68\u200D\uD83D\uDD2C"],"","",["male-scientist"],17,32,23,0],
		"1f468-200d-1f680":[["\uD83D\uDC68\u200D\uD83D\uDE80"],"","",["male-astronaut"],17,38,23,0],
		"1f468-200d-1f692":[["\uD83D\uDC68\u200D\uD83D\uDE92"],"","",["male-firefighter"],17,44,23,0],
		"1f468-200d-2695-fe0f":[["\uD83D\uDC68\u200D\u2695\uFE0F","\uD83D\uDC68\u200D\u2695"],"","",["male-doctor"],17,50,23,0],
		"1f468-200d-2696-fe0f":[["\uD83D\uDC68\u200D\u2696\uFE0F","\uD83D\uDC68\u200D\u2696"],"","",["male-judge"],18,5,23,0],
		"1f468-200d-2708-fe0f":[["\uD83D\uDC68\u200D\u2708\uFE0F","\uD83D\uDC68\u200D\u2708"],"","",["male-pilot"],18,11,23,0],
		"1f468-200d-2764-fe0f-200d-1f468":[["\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC68","\uD83D\uDC68\u200D\u2764\u200D\uD83D\uDC68"],"","",["man-heart-man"],18,17,55,0],
		"1f468-200d-2764-fe0f-200d-1f48b-200d-1f468":[["\uD83D\uDC68\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68","\uD83D\uDC68\u200D\u2764\u200D\uD83D\uDC8B\u200D\uD83D\uDC68"],"","",["man-kiss-man"],18,18,55,0],
		"1f468":[["\uD83D\uDC68"],"\uE004","\uDBB8\uDD9D",["man"],18,19,63,0],
		"1f469-200d-1f33e":[["\uD83D\uDC69\u200D\uD83C\uDF3E"],"","",["female-farmer"],18,25,23,0],
		"1f469-200d-1f373":[["\uD83D\uDC69\u200D\uD83C\uDF73"],"","",["female-cook"],18,31,23,0],
		"1f469-200d-1f393":[["\uD83D\uDC69\u200D\uD83C\uDF93"],"","",["female-student"],18,37,23,0],
		"1f469-200d-1f3a4":[["\uD83D\uDC69\u200D\uD83C\uDFA4"],"","",["female-singer"],18,43,23,0],
		"1f469-200d-1f3a8":[["\uD83D\uDC69\u200D\uD83C\uDFA8"],"","",["female-artist"],18,49,23,0],
		"1f469-200d-1f3eb":[["\uD83D\uDC69\u200D\uD83C\uDFEB"],"","",["female-teacher"],19,4,23,0],
		"1f469-200d-1f3ed":[["\uD83D\uDC69\u200D\uD83C\uDFED"],"","",["female-factory-worker"],19,10,23,0],
		"1f469-200d-1f466-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["woman-boy-boy"],19,16,23,0],
		"1f469-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC66"],"","",["woman-boy"],19,17,23,0],
		"1f469-200d-1f467-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["woman-girl-boy"],19,18,23,0],
		"1f469-200d-1f467-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["woman-girl-girl"],19,19,23,0],
		"1f469-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC67"],"","",["woman-girl"],19,20,23,0],
		"1f469-200d-1f469-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66"],"","",["woman-woman-boy"],19,21,63,0],
		"1f469-200d-1f469-200d-1f466-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC66\u200D\uD83D\uDC66"],"","",["woman-woman-boy-boy"],19,22,63,0],
		"1f469-200d-1f469-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67"],"","",["woman-woman-girl"],19,23,63,0],
		"1f469-200d-1f469-200d-1f467-200d-1f466":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC66"],"","",["woman-woman-girl-boy"],19,24,63,0],
		"1f469-200d-1f469-200d-1f467-200d-1f467":[["\uD83D\uDC69\u200D\uD83D\uDC69\u200D\uD83D\uDC67\u200D\uD83D\uDC67"],"","",["woman-woman-girl-girl"],19,25,63,0],
		"1f469-200d-1f4bb":[["\uD83D\uDC69\u200D\uD83D\uDCBB"],"","",["female-technologist"],19,26,23,0],
		"1f469-200d-1f4bc":[["\uD83D\uDC69\u200D\uD83D\uDCBC"],"","",["female-office-worker"],19,32,23,0],
		"1f469-200d-1f527":[["\uD83D\uDC69\u200D\uD83D\uDD27"],"","",["female-mechanic"],19,38,23,0],
		"1f469-200d-1f52c":[["\uD83D\uDC69\u200D\uD83D\uDD2C"],"","",["female-scientist"],19,44,23,0],
		"1f469-200d-1f680":[["\uD83D\uDC69\u200D\uD83D\uDE80"],"","",["female-astronaut"],19,50,23,0],
		"1f469-200d-1f692":[["\uD83D\uDC69\u200D\uD83D\uDE92"],"","",["female-firefighter"],20,5,23,0],
		"1f469-200d-2695-fe0f":[["\uD83D\uDC69\u200D\u2695\uFE0F","\uD83D\uDC69\u200D\u2695"],"","",["female-doctor"],20,11,23,0],
		"1f469-200d-2696-fe0f":[["\uD83D\uDC69\u200D\u2696\uFE0F","\uD83D\uDC69\u200D\u2696"],"","",["female-judge"],20,17,23,0],
		"1f469-200d-2708-fe0f":[["\uD83D\uDC69\u200D\u2708\uFE0F","\uD83D\uDC69\u200D\u2708"],"","",["female-pilot"],20,23,23,0],
		"1f469-200d-2764-fe0f-200d-1f468":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC68","\uD83D\uDC69\u200D\u2764\u200D\uD83D\uDC68","\uD83D\uDC91"],"","",["woman-heart-man","couple_with_heart"],20,29,23,0],
		"1f469-200d-2764-fe0f-200d-1f469":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC69","\uD83D\uDC69\u200D\u2764\u200D\uD83D\uDC69"],"","",["woman-heart-woman"],20,30,55,0],
		"1f469-200d-2764-fe0f-200d-1f48b-200d-1f468":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC68","\uD83D\uDC69\u200D\u2764\u200D\uD83D\uDC8B\u200D\uD83D\uDC68","\uD83D\uDC8F"],"","",["woman-kiss-man","couplekiss"],20,31,23,0],
		"1f469-200d-2764-fe0f-200d-1f48b-200d-1f469":[["\uD83D\uDC69\u200D\u2764\uFE0F\u200D\uD83D\uDC8B\u200D\uD83D\uDC69","\uD83D\uDC69\u200D\u2764\u200D\uD83D\uDC8B\u200D\uD83D\uDC69"],"","",["woman-kiss-woman"],20,32,55,0],
		"1f469":[["\uD83D\uDC69"],"\uE005","\uDBB8\uDD9E",["woman"],20,33,63,0],
		"1f46b":[["\uD83D\uDC6B"],"\uE428","\uDBB8\uDDA0",["couple","man_and_woman_holding_hands"],20,40,63,0],
		"1f46c":[["\uD83D\uDC6C"],"","",["two_men_holding_hands"],20,41,63,0],
		"1f46d":[["\uD83D\uDC6D"],"","",["two_women_holding_hands"],20,42,63,0],
		"1f46e-200d-2640-fe0f":[["\uD83D\uDC6E\u200D\u2640\uFE0F","\uD83D\uDC6E\u200D\u2640"],"","",["female-police-officer"],20,43,23,0],
		"1f46e-200d-2642-fe0f":[["\uD83D\uDC6E\u200D\u2642\uFE0F","\uD83D\uDC6E\u200D\u2642","\uD83D\uDC6E"],"","",["male-police-officer","cop"],20,49,23,0],
		"1f46f-200d-2640-fe0f":[["\uD83D\uDC6F\u200D\u2640\uFE0F","\uD83D\uDC6F\u200D\u2640","\uD83D\uDC6F"],"","",["woman-with-bunny-ears-partying","dancers"],21,10,23,0],
		"1f46f-200d-2642-fe0f":[["\uD83D\uDC6F\u200D\u2642\uFE0F","\uD83D\uDC6F\u200D\u2642"],"","",["man-with-bunny-ears-partying"],21,11,23,0],
		"1f470":[["\uD83D\uDC70"],"","\uDBB8\uDDA3",["bride_with_veil"],21,13,63,0],
		"1f471-200d-2640-fe0f":[["\uD83D\uDC71\u200D\u2640\uFE0F","\uD83D\uDC71\u200D\u2640"],"","",["blond-haired-woman"],21,19,23,0],
		"1f471-200d-2642-fe0f":[["\uD83D\uDC71\u200D\u2642\uFE0F","\uD83D\uDC71\u200D\u2642","\uD83D\uDC71"],"","",["blond-haired-man","person_with_blond_hair"],21,25,23,0],
		"1f472":[["\uD83D\uDC72"],"\uE516","\uDBB8\uDDA5",["man_with_gua_pi_mao"],21,37,63,0],
		"1f473-200d-2640-fe0f":[["\uD83D\uDC73\u200D\u2640\uFE0F","\uD83D\uDC73\u200D\u2640"],"","",["woman-wearing-turban"],21,43,23,0],
		"1f473-200d-2642-fe0f":[["\uD83D\uDC73\u200D\u2642\uFE0F","\uD83D\uDC73\u200D\u2642","\uD83D\uDC73"],"","",["man-wearing-turban","man_with_turban"],21,49,23,0],
		"1f474":[["\uD83D\uDC74"],"\uE518","\uDBB8\uDDA7",["older_man"],22,10,63,0],
		"1f475":[["\uD83D\uDC75"],"\uE519","\uDBB8\uDDA8",["older_woman"],22,16,63,0],
		"1f476":[["\uD83D\uDC76"],"\uE51A","\uDBB8\uDDA9",["baby"],22,22,63,0],
		"1f477-200d-2640-fe0f":[["\uD83D\uDC77\u200D\u2640\uFE0F","\uD83D\uDC77\u200D\u2640"],"","",["female-construction-worker"],22,28,23,0],
		"1f477-200d-2642-fe0f":[["\uD83D\uDC77\u200D\u2642\uFE0F","\uD83D\uDC77\u200D\u2642","\uD83D\uDC77"],"","",["male-construction-worker","construction_worker"],22,34,23,0],
		"1f478":[["\uD83D\uDC78"],"\uE51C","\uDBB8\uDDAB",["princess"],22,46,63,0],
		"1f479":[["\uD83D\uDC79"],"","\uDBB8\uDDAC",["japanese_ogre"],23,1,63,0],
		"1f47a":[["\uD83D\uDC7A"],"","\uDBB8\uDDAD",["japanese_goblin"],23,2,63,0],
		"1f47b":[["\uD83D\uDC7B"],"\uE11B","\uDBB8\uDDAE",["ghost"],23,3,63,0],
		"1f47c":[["\uD83D\uDC7C"],"\uE04E","\uDBB8\uDDAF",["angel"],23,4,63,0],
		"1f47d":[["\uD83D\uDC7D"],"\uE10C","\uDBB8\uDDB0",["alien"],23,10,63,0],
		"1f47e":[["\uD83D\uDC7E"],"\uE12B","\uDBB8\uDDB1",["space_invader"],23,11,63,0],
		"1f47f":[["\uD83D\uDC7F"],"\uE11A","\uDBB8\uDDB2",["imp"],23,12,63,0],
		"1f480":[["\uD83D\uDC80"],"\uE11C","\uDBB8\uDDB3",["skull"],23,13,63,0],
		"1f481-200d-2640-fe0f":[["\uD83D\uDC81\u200D\u2640\uFE0F","\uD83D\uDC81\u200D\u2640","\uD83D\uDC81"],"","",["woman-tipping-hand","information_desk_person"],23,14,23,0],
		"1f481-200d-2642-fe0f":[["\uD83D\uDC81\u200D\u2642\uFE0F","\uD83D\uDC81\u200D\u2642"],"","",["man-tipping-hand"],23,20,23,0],
		"1f482-200d-2640-fe0f":[["\uD83D\uDC82\u200D\u2640\uFE0F","\uD83D\uDC82\u200D\u2640"],"","",["female-guard"],23,32,23,0],
		"1f482-200d-2642-fe0f":[["\uD83D\uDC82\u200D\u2642\uFE0F","\uD83D\uDC82\u200D\u2642","\uD83D\uDC82"],"","",["male-guard","guardsman"],23,38,23,0],
		"1f483":[["\uD83D\uDC83"],"\uE51F","\uDBB8\uDDB6",["dancer"],23,50,63,0],
		"1f484":[["\uD83D\uDC84"],"\uE31C","\uDBB8\uDD95",["lipstick"],24,5,63,0],
		"1f485":[["\uD83D\uDC85"],"\uE31D","\uDBB8\uDD96",["nail_care"],24,6,63,0],
		"1f486-200d-2640-fe0f":[["\uD83D\uDC86\u200D\u2640\uFE0F","\uD83D\uDC86\u200D\u2640","\uD83D\uDC86"],"","",["woman-getting-massage","massage"],24,12,23,0],
		"1f486-200d-2642-fe0f":[["\uD83D\uDC86\u200D\u2642\uFE0F","\uD83D\uDC86\u200D\u2642"],"","",["man-getting-massage"],24,18,23,0],
		"1f487-200d-2640-fe0f":[["\uD83D\uDC87\u200D\u2640\uFE0F","\uD83D\uDC87\u200D\u2640","\uD83D\uDC87"],"","",["woman-getting-haircut","haircut"],24,30,23,0],
		"1f487-200d-2642-fe0f":[["\uD83D\uDC87\u200D\u2642\uFE0F","\uD83D\uDC87\u200D\u2642"],"","",["man-getting-haircut"],24,36,23,0],
		"1f488":[["\uD83D\uDC88"],"\uE320","\uDBB8\uDD99",["barber"],24,48,63,0],
		"1f489":[["\uD83D\uDC89"],"\uE13B","\uDBB9\uDD09",["syringe"],24,49,63,0],
		"1f48a":[["\uD83D\uDC8A"],"\uE30F","\uDBB9\uDD0A",["pill"],24,50,63,0],
		"1f48b":[["\uD83D\uDC8B"],"\uE003","\uDBBA\uDC23",["kiss"],25,0,63,0],
		"1f48c":[["\uD83D\uDC8C"],"","\uDBBA\uDC24",["love_letter"],25,1,63,0],
		"1f48d":[["\uD83D\uDC8D"],"\uE034","\uDBBA\uDC25",["ring"],25,2,63,0],
		"1f48e":[["\uD83D\uDC8E"],"\uE035","\uDBBA\uDC26",["gem"],25,3,63,0],
		"1f490":[["\uD83D\uDC90"],"\uE306","\uDBBA\uDC28",["bouquet"],25,5,63,0],
		"1f492":[["\uD83D\uDC92"],"\uE43D","\uDBBA\uDC2A",["wedding"],25,7,63,0],
		"1f493":[["\uD83D\uDC93"],"\uE327","\uDBBA\uDF0D",["heartbeat"],25,8,63,0],
		"1f494":[["\uD83D\uDC94"],"\uE023","\uDBBA\uDF0E",["broken_heart"],25,9,63,0,"<\/3"],
		"1f495":[["\uD83D\uDC95"],"","\uDBBA\uDF0F",["two_hearts"],25,10,63,0],
		"1f496":[["\uD83D\uDC96"],"","\uDBBA\uDF10",["sparkling_heart"],25,11,63,0],
		"1f497":[["\uD83D\uDC97"],"\uE328","\uDBBA\uDF11",["heartpulse"],25,12,63,0],
		"1f498":[["\uD83D\uDC98"],"\uE329","\uDBBA\uDF12",["cupid"],25,13,63,0],
		"1f499":[["\uD83D\uDC99"],"\uE32A","\uDBBA\uDF13",["blue_heart"],25,14,63,0,"<3"],
		"1f49a":[["\uD83D\uDC9A"],"\uE32B","\uDBBA\uDF14",["green_heart"],25,15,63,0,"<3"],
		"1f49b":[["\uD83D\uDC9B"],"\uE32C","\uDBBA\uDF15",["yellow_heart"],25,16,63,0,"<3"],
		"1f49c":[["\uD83D\uDC9C"],"\uE32D","\uDBBA\uDF16",["purple_heart"],25,17,63,0,"<3"],
		"1f49d":[["\uD83D\uDC9D"],"\uE437","\uDBBA\uDF17",["gift_heart"],25,18,63,0],
		"1f49e":[["\uD83D\uDC9E"],"","\uDBBA\uDF18",["revolving_hearts"],25,19,63,0],
		"1f49f":[["\uD83D\uDC9F"],"\uE204","\uDBBA\uDF19",["heart_decoration"],25,20,63,0],
		"1f4a0":[["\uD83D\uDCA0"],"","\uDBBA\uDF55",["diamond_shape_with_a_dot_inside"],25,21,63,0],
		"1f4a1":[["\uD83D\uDCA1"],"\uE10F","\uDBBA\uDF56",["bulb"],25,22,63,0],
		"1f4a2":[["\uD83D\uDCA2"],"\uE334","\uDBBA\uDF57",["anger"],25,23,63,0],
		"1f4a3":[["\uD83D\uDCA3"],"\uE311","\uDBBA\uDF58",["bomb"],25,24,63,0],
		"1f4a4":[["\uD83D\uDCA4"],"\uE13C","\uDBBA\uDF59",["zzz"],25,25,63,0],
		"1f4a5":[["\uD83D\uDCA5"],"","\uDBBA\uDF5A",["boom","collision"],25,26,63,0],
		"1f4a6":[["\uD83D\uDCA6"],"\uE331","\uDBBA\uDF5B",["sweat_drops"],25,27,63,0],
		"1f4a7":[["\uD83D\uDCA7"],"","\uDBBA\uDF5C",["droplet"],25,28,63,0],
		"1f4a8":[["\uD83D\uDCA8"],"\uE330","\uDBBA\uDF5D",["dash"],25,29,63,0],
		"1f4a9":[["\uD83D\uDCA9"],"\uE05A","\uDBB9\uDCF4",["hankey","poop","shit"],25,30,63,0],
		"1f4aa":[["\uD83D\uDCAA"],"\uE14C","\uDBBA\uDF5E",["muscle"],25,31,63,0],
		"1f4ab":[["\uD83D\uDCAB"],"","\uDBBA\uDF5F",["dizzy"],25,37,63,0],
		"1f4ac":[["\uD83D\uDCAC"],"","\uDBB9\uDD32",["speech_balloon"],25,38,63,0],
		"1f4ad":[["\uD83D\uDCAD"],"","",["thought_balloon"],25,39,63,0],
		"1f4ae":[["\uD83D\uDCAE"],"","\uDBBA\uDF7A",["white_flower"],25,40,63,0],
		"1f4af":[["\uD83D\uDCAF"],"","\uDBBA\uDF7B",["100"],25,41,63,0],
		"1f4b0":[["\uD83D\uDCB0"],"\uE12F","\uDBB9\uDCDD",["moneybag"],25,42,63,0],
		"1f4b1":[["\uD83D\uDCB1"],"\uE149","\uDBB9\uDCDE",["currency_exchange"],25,43,63,0],
		"1f4b2":[["\uD83D\uDCB2"],"","\uDBB9\uDCE0",["heavy_dollar_sign"],25,44,63,0],
		"1f4b3":[["\uD83D\uDCB3"],"","\uDBB9\uDCE1",["credit_card"],25,45,63,0],
		"1f4b4":[["\uD83D\uDCB4"],"","\uDBB9\uDCE2",["yen"],25,46,63,0],
		"1f4b5":[["\uD83D\uDCB5"],"","\uDBB9\uDCE3",["dollar"],25,47,63,0],
		"1f4b6":[["\uD83D\uDCB6"],"","",["euro"],25,48,63,0],
		"1f4b7":[["\uD83D\uDCB7"],"","",["pound"],25,49,63,0],
		"1f4b8":[["\uD83D\uDCB8"],"","\uDBB9\uDCE4",["money_with_wings"],25,50,63,0],
		"1f4b9":[["\uD83D\uDCB9"],"\uE14A","\uDBB9\uDCDF",["chart"],26,0,63,0],
		"1f4ba":[["\uD83D\uDCBA"],"\uE11F","\uDBB9\uDD37",["seat"],26,1,63,0],
		"1f4bb":[["\uD83D\uDCBB"],"\uE00C","\uDBB9\uDD38",["computer"],26,2,63,0],
		"1f4bc":[["\uD83D\uDCBC"],"\uE11E","\uDBB9\uDD3B",["briefcase"],26,3,63,0],
		"1f4bd":[["\uD83D\uDCBD"],"\uE316","\uDBB9\uDD3C",["minidisc"],26,4,63,0],
		"1f4be":[["\uD83D\uDCBE"],"","\uDBB9\uDD3D",["floppy_disk"],26,5,63,0],
		"1f4bf":[["\uD83D\uDCBF"],"\uE126","\uDBBA\uDC1D",["cd"],26,6,63,0],
		"1f4c0":[["\uD83D\uDCC0"],"\uE127","\uDBBA\uDC1E",["dvd"],26,7,63,0],
		"1f4c1":[["\uD83D\uDCC1"],"","\uDBB9\uDD43",["file_folder"],26,8,63,0],
		"1f4c2":[["\uD83D\uDCC2"],"","\uDBB9\uDD44",["open_file_folder"],26,9,63,0],
		"1f4c3":[["\uD83D\uDCC3"],"","\uDBB9\uDD40",["page_with_curl"],26,10,63,0],
		"1f4c4":[["\uD83D\uDCC4"],"","\uDBB9\uDD41",["page_facing_up"],26,11,63,0],
		"1f4c5":[["\uD83D\uDCC5"],"","\uDBB9\uDD42",["date"],26,12,63,0],
		"1f4c6":[["\uD83D\uDCC6"],"","\uDBB9\uDD49",["calendar"],26,13,63,0],
		"1f4c7":[["\uD83D\uDCC7"],"","\uDBB9\uDD4D",["card_index"],26,14,63,0],
		"1f4c8":[["\uD83D\uDCC8"],"","\uDBB9\uDD4B",["chart_with_upwards_trend"],26,15,63,0],
		"1f4c9":[["\uD83D\uDCC9"],"","\uDBB9\uDD4C",["chart_with_downwards_trend"],26,16,63,0],
		"1f4ca":[["\uD83D\uDCCA"],"","\uDBB9\uDD4A",["bar_chart"],26,17,63,0],
		"1f4cb":[["\uD83D\uDCCB"],"","\uDBB9\uDD48",["clipboard"],26,18,63,0],
		"1f4cc":[["\uD83D\uDCCC"],"","\uDBB9\uDD4E",["pushpin"],26,19,63,0],
		"1f4cd":[["\uD83D\uDCCD"],"","\uDBB9\uDD3F",["round_pushpin"],26,20,63,0],
		"1f4ce":[["\uD83D\uDCCE"],"","\uDBB9\uDD3A",["paperclip"],26,21,63,0],
		"1f4cf":[["\uD83D\uDCCF"],"","\uDBB9\uDD50",["straight_ruler"],26,22,63,0],
		"1f4d0":[["\uD83D\uDCD0"],"","\uDBB9\uDD51",["triangular_ruler"],26,23,63,0],
		"1f4d1":[["\uD83D\uDCD1"],"","\uDBB9\uDD52",["bookmark_tabs"],26,24,63,0],
		"1f4d2":[["\uD83D\uDCD2"],"","\uDBB9\uDD4F",["ledger"],26,25,63,0],
		"1f4d3":[["\uD83D\uDCD3"],"","\uDBB9\uDD45",["notebook"],26,26,63,0],
		"1f4d4":[["\uD83D\uDCD4"],"","\uDBB9\uDD47",["notebook_with_decorative_cover"],26,27,63,0],
		"1f4d5":[["\uD83D\uDCD5"],"","\uDBB9\uDD02",["closed_book"],26,28,63,0],
		"1f4d6":[["\uD83D\uDCD6"],"\uE148","\uDBB9\uDD46",["book","open_book"],26,29,63,0],
		"1f4d7":[["\uD83D\uDCD7"],"","\uDBB9\uDCFF",["green_book"],26,30,63,0],
		"1f4d8":[["\uD83D\uDCD8"],"","\uDBB9\uDD00",["blue_book"],26,31,63,0],
		"1f4d9":[["\uD83D\uDCD9"],"","\uDBB9\uDD01",["orange_book"],26,32,63,0],
		"1f4da":[["\uD83D\uDCDA"],"","\uDBB9\uDD03",["books"],26,33,63,0],
		"1f4db":[["\uD83D\uDCDB"],"","\uDBB9\uDD04",["name_badge"],26,34,63,0],
		"1f4dc":[["\uD83D\uDCDC"],"","\uDBB9\uDCFD",["scroll"],26,35,63,0],
		"1f4dd":[["\uD83D\uDCDD"],"\uE301","\uDBB9\uDD27",["memo","pencil"],26,36,63,0],
		"1f4de":[["\uD83D\uDCDE"],"","\uDBB9\uDD24",["telephone_receiver"],26,37,63,0],
		"1f4df":[["\uD83D\uDCDF"],"","\uDBB9\uDD22",["pager"],26,38,63,0],
		"1f4e0":[["\uD83D\uDCE0"],"\uE00B","\uDBB9\uDD28",["fax"],26,39,63,0],
		"1f4e1":[["\uD83D\uDCE1"],"\uE14B","\uDBB9\uDD31",["satellite_antenna"],26,40,63,0],
		"1f4e2":[["\uD83D\uDCE2"],"\uE142","\uDBB9\uDD2F",["loudspeaker"],26,41,63,0],
		"1f4e3":[["\uD83D\uDCE3"],"\uE317","\uDBB9\uDD30",["mega"],26,42,63,0],
		"1f4e4":[["\uD83D\uDCE4"],"","\uDBB9\uDD33",["outbox_tray"],26,43,63,0],
		"1f4e5":[["\uD83D\uDCE5"],"","\uDBB9\uDD34",["inbox_tray"],26,44,63,0],
		"1f4e6":[["\uD83D\uDCE6"],"","\uDBB9\uDD35",["package"],26,45,63,0],
		"1f4e7":[["\uD83D\uDCE7"],"","\uDBBA\uDF92",["e-mail"],26,46,63,0],
		"1f4e8":[["\uD83D\uDCE8"],"","\uDBB9\uDD2A",["incoming_envelope"],26,47,63,0],
		"1f4e9":[["\uD83D\uDCE9"],"\uE103","\uDBB9\uDD2B",["envelope_with_arrow"],26,48,63,0],
		"1f4ea":[["\uD83D\uDCEA"],"","\uDBB9\uDD2C",["mailbox_closed"],26,49,63,0],
		"1f4eb":[["\uD83D\uDCEB"],"\uE101","\uDBB9\uDD2D",["mailbox"],26,50,63,0],
		"1f4ec":[["\uD83D\uDCEC"],"","",["mailbox_with_mail"],27,0,63,0],
		"1f4ed":[["\uD83D\uDCED"],"","",["mailbox_with_no_mail"],27,1,63,0],
		"1f4ee":[["\uD83D\uDCEE"],"\uE102","\uDBB9\uDD2E",["postbox"],27,2,63,0],
		"1f4ef":[["\uD83D\uDCEF"],"","",["postal_horn"],27,3,63,0],
		"1f4f0":[["\uD83D\uDCF0"],"","\uDBBA\uDC22",["newspaper"],27,4,63,0],
		"1f4f1":[["\uD83D\uDCF1"],"\uE00A","\uDBB9\uDD25",["iphone"],27,5,63,0],
		"1f4f2":[["\uD83D\uDCF2"],"\uE104","\uDBB9\uDD26",["calling"],27,6,63,0],
		"1f4f3":[["\uD83D\uDCF3"],"\uE250","\uDBBA\uDC39",["vibration_mode"],27,7,63,0],
		"1f4f4":[["\uD83D\uDCF4"],"\uE251","\uDBBA\uDC3A",["mobile_phone_off"],27,8,63,0],
		"1f4f5":[["\uD83D\uDCF5"],"","",["no_mobile_phones"],27,9,63,0],
		"1f4f6":[["\uD83D\uDCF6"],"\uE20B","\uDBBA\uDC38",["signal_strength"],27,10,63,0],
		"1f4f7":[["\uD83D\uDCF7"],"\uE008","\uDBB9\uDCEF",["camera"],27,11,63,0],
		"1f4f8":[["\uD83D\uDCF8"],"","",["camera_with_flash"],27,12,31,0],
		"1f4f9":[["\uD83D\uDCF9"],"","\uDBB9\uDCF9",["video_camera"],27,13,63,0],
		"1f4fa":[["\uD83D\uDCFA"],"\uE12A","\uDBBA\uDC1C",["tv"],27,14,63,0],
		"1f4fb":[["\uD83D\uDCFB"],"\uE128","\uDBBA\uDC1F",["radio"],27,15,63,0],
		"1f4fc":[["\uD83D\uDCFC"],"\uE129","\uDBBA\uDC20",["vhs"],27,16,63,0],
		"1f4fd-fe0f":[["\uD83D\uDCFD\uFE0F","\uD83D\uDCFD"],"","",["film_projector"],27,17,23,0],
		"1f4ff":[["\uD83D\uDCFF"],"","",["prayer_beads"],27,18,31,0],
		"1f500":[["\uD83D\uDD00"],"","",["twisted_rightwards_arrows"],27,19,63,0],
		"1f501":[["\uD83D\uDD01"],"","",["repeat"],27,20,63,0],
		"1f502":[["\uD83D\uDD02"],"","",["repeat_one"],27,21,63,0],
		"1f503":[["\uD83D\uDD03"],"","\uDBBA\uDF91",["arrows_clockwise"],27,22,63,0],
		"1f504":[["\uD83D\uDD04"],"","",["arrows_counterclockwise"],27,23,63,0],
		"1f505":[["\uD83D\uDD05"],"","",["low_brightness"],27,24,63,0],
		"1f506":[["\uD83D\uDD06"],"","",["high_brightness"],27,25,63,0],
		"1f507":[["\uD83D\uDD07"],"","",["mute"],27,26,63,0],
		"1f508":[["\uD83D\uDD08"],"","",["speaker"],27,27,63,0],
		"1f509":[["\uD83D\uDD09"],"","",["sound"],27,28,63,0],
		"1f50a":[["\uD83D\uDD0A"],"\uE141","\uDBBA\uDC21",["loud_sound"],27,29,63,0],
		"1f50b":[["\uD83D\uDD0B"],"","\uDBB9\uDCFC",["battery"],27,30,63,0],
		"1f50c":[["\uD83D\uDD0C"],"","\uDBB9\uDCFE",["electric_plug"],27,31,63,0],
		"1f50d":[["\uD83D\uDD0D"],"\uE114","\uDBBA\uDF85",["mag"],27,32,63,0],
		"1f50e":[["\uD83D\uDD0E"],"","\uDBBA\uDF8D",["mag_right"],27,33,63,0],
		"1f50f":[["\uD83D\uDD0F"],"","\uDBBA\uDF90",["lock_with_ink_pen"],27,34,63,0],
		"1f510":[["\uD83D\uDD10"],"","\uDBBA\uDF8A",["closed_lock_with_key"],27,35,63,0],
		"1f511":[["\uD83D\uDD11"],"\uE03F","\uDBBA\uDF82",["key"],27,36,63,0],
		"1f512":[["\uD83D\uDD12"],"\uE144","\uDBBA\uDF86",["lock"],27,37,63,0],
		"1f513":[["\uD83D\uDD13"],"\uE145","\uDBBA\uDF87",["unlock"],27,38,63,0],
		"1f514":[["\uD83D\uDD14"],"\uE325","\uDBB9\uDCF2",["bell"],27,39,63,0],
		"1f515":[["\uD83D\uDD15"],"","",["no_bell"],27,40,63,0],
		"1f516":[["\uD83D\uDD16"],"","\uDBBA\uDF8F",["bookmark"],27,41,63,0],
		"1f517":[["\uD83D\uDD17"],"","\uDBBA\uDF4B",["link"],27,42,63,0],
		"1f518":[["\uD83D\uDD18"],"","\uDBBA\uDF8C",["radio_button"],27,43,63,0],
		"1f519":[["\uD83D\uDD19"],"","\uDBBA\uDF8E",["back"],27,44,63,0],
		"1f51a":[["\uD83D\uDD1A"],"","\uDBB8\uDC1A",["end"],27,45,63,0],
		"1f51b":[["\uD83D\uDD1B"],"","\uDBB8\uDC19",["on"],27,46,63,0],
		"1f51c":[["\uD83D\uDD1C"],"","\uDBB8\uDC18",["soon"],27,47,63,0],
		"1f51d":[["\uD83D\uDD1D"],"\uE24C","\uDBBA\uDF42",["top"],27,48,63,0],
		"1f51e":[["\uD83D\uDD1E"],"\uE207","\uDBBA\uDF25",["underage"],27,49,63,0],
		"1f51f":[["\uD83D\uDD1F"],"","\uDBBA\uDC3B",["keycap_ten"],27,50,63,0],
		"1f520":[["\uD83D\uDD20"],"","\uDBBA\uDF7C",["capital_abcd"],28,0,63,0],
		"1f521":[["\uD83D\uDD21"],"","\uDBBA\uDF7D",["abcd"],28,1,63,0],
		"1f522":[["\uD83D\uDD22"],"","\uDBBA\uDF7E",["1234"],28,2,63,0],
		"1f523":[["\uD83D\uDD23"],"","\uDBBA\uDF7F",["symbols"],28,3,63,0],
		"1f524":[["\uD83D\uDD24"],"","\uDBBA\uDF80",["abc"],28,4,63,0],
		"1f525":[["\uD83D\uDD25"],"\uE11D","\uDBB9\uDCF6",["fire"],28,5,63,0],
		"1f526":[["\uD83D\uDD26"],"","\uDBB9\uDCFB",["flashlight"],28,6,63,0],
		"1f527":[["\uD83D\uDD27"],"","\uDBB9\uDCC9",["wrench"],28,7,63,0],
		"1f528":[["\uD83D\uDD28"],"\uE116","\uDBB9\uDCCA",["hammer"],28,8,63,0],
		"1f529":[["\uD83D\uDD29"],"","\uDBB9\uDCCB",["nut_and_bolt"],28,9,63,0],
		"1f52a":[["\uD83D\uDD2A"],"","\uDBB9\uDCFA",["hocho","knife"],28,10,63,0],
		"1f52b":[["\uD83D\uDD2B"],"\uE113","\uDBB9\uDCF5",["gun"],28,11,63,0],
		"1f52c":[["\uD83D\uDD2C"],"","",["microscope"],28,12,63,0],
		"1f52d":[["\uD83D\uDD2D"],"","",["telescope"],28,13,63,0],
		"1f52e":[["\uD83D\uDD2E"],"","\uDBB9\uDCF7",["crystal_ball"],28,14,63,0],
		"1f52f":[["\uD83D\uDD2F"],"\uE23E","\uDBB9\uDCF8",["six_pointed_star"],28,15,63,0],
		"1f530":[["\uD83D\uDD30"],"\uE209","\uDBB8\uDC44",["beginner"],28,16,63,0],
		"1f531":[["\uD83D\uDD31"],"\uE031","\uDBB9\uDCD2",["trident"],28,17,63,0],
		"1f532":[["\uD83D\uDD32"],"\uE21A","\uDBBA\uDF64",["black_square_button"],28,18,63,0],
		"1f533":[["\uD83D\uDD33"],"\uE21B","\uDBBA\uDF67",["white_square_button"],28,19,63,0],
		"1f534":[["\uD83D\uDD34"],"\uE219","\uDBBA\uDF63",["red_circle"],28,20,63,0],
		"1f535":[["\uD83D\uDD35"],"","\uDBBA\uDF64",["large_blue_circle"],28,21,63,0],
		"1f536":[["\uD83D\uDD36"],"","\uDBBA\uDF73",["large_orange_diamond"],28,22,63,0],
		"1f537":[["\uD83D\uDD37"],"","\uDBBA\uDF74",["large_blue_diamond"],28,23,63,0],
		"1f538":[["\uD83D\uDD38"],"","\uDBBA\uDF75",["small_orange_diamond"],28,24,63,0],
		"1f539":[["\uD83D\uDD39"],"","\uDBBA\uDF76",["small_blue_diamond"],28,25,63,0],
		"1f53a":[["\uD83D\uDD3A"],"","\uDBBA\uDF78",["small_red_triangle"],28,26,63,0],
		"1f53b":[["\uD83D\uDD3B"],"","\uDBBA\uDF79",["small_red_triangle_down"],28,27,63,0],
		"1f53c":[["\uD83D\uDD3C"],"","\uDBBA\uDF01",["arrow_up_small"],28,28,63,0],
		"1f53d":[["\uD83D\uDD3D"],"","\uDBBA\uDF00",["arrow_down_small"],28,29,63,0],
		"1f549-fe0f":[["\uD83D\uDD49\uFE0F","\uD83D\uDD49"],"","",["om_symbol"],28,30,23,0],
		"1f54a-fe0f":[["\uD83D\uDD4A\uFE0F","\uD83D\uDD4A"],"","",["dove_of_peace"],28,31,23,0],
		"1f54b":[["\uD83D\uDD4B"],"","",["kaaba"],28,32,31,0],
		"1f54c":[["\uD83D\uDD4C"],"","",["mosque"],28,33,31,0],
		"1f54d":[["\uD83D\uDD4D"],"","",["synagogue"],28,34,31,0],
		"1f54e":[["\uD83D\uDD4E"],"","",["menorah_with_nine_branches"],28,35,31,0],
		"1f550":[["\uD83D\uDD50"],"\uE024","\uDBB8\uDC1E",["clock1"],28,36,63,0],
		"1f551":[["\uD83D\uDD51"],"\uE025","\uDBB8\uDC1F",["clock2"],28,37,63,0],
		"1f552":[["\uD83D\uDD52"],"\uE026","\uDBB8\uDC20",["clock3"],28,38,63,0],
		"1f553":[["\uD83D\uDD53"],"\uE027","\uDBB8\uDC21",["clock4"],28,39,63,0],
		"1f554":[["\uD83D\uDD54"],"\uE028","\uDBB8\uDC22",["clock5"],28,40,63,0],
		"1f555":[["\uD83D\uDD55"],"\uE029","\uDBB8\uDC23",["clock6"],28,41,63,0],
		"1f556":[["\uD83D\uDD56"],"\uE02A","\uDBB8\uDC24",["clock7"],28,42,63,0],
		"1f557":[["\uD83D\uDD57"],"\uE02B","\uDBB8\uDC25",["clock8"],28,43,63,0],
		"1f558":[["\uD83D\uDD58"],"\uE02C","\uDBB8\uDC26",["clock9"],28,44,63,0],
		"1f559":[["\uD83D\uDD59"],"\uE02D","\uDBB8\uDC27",["clock10"],28,45,63,0],
		"1f55a":[["\uD83D\uDD5A"],"\uE02E","\uDBB8\uDC28",["clock11"],28,46,63,0],
		"1f55b":[["\uD83D\uDD5B"],"\uE02F","\uDBB8\uDC29",["clock12"],28,47,63,0],
		"1f55c":[["\uD83D\uDD5C"],"","",["clock130"],28,48,63,0],
		"1f55d":[["\uD83D\uDD5D"],"","",["clock230"],28,49,63,0],
		"1f55e":[["\uD83D\uDD5E"],"","",["clock330"],28,50,63,0],
		"1f55f":[["\uD83D\uDD5F"],"","",["clock430"],29,0,63,0],
		"1f560":[["\uD83D\uDD60"],"","",["clock530"],29,1,63,0],
		"1f561":[["\uD83D\uDD61"],"","",["clock630"],29,2,63,0],
		"1f562":[["\uD83D\uDD62"],"","",["clock730"],29,3,63,0],
		"1f563":[["\uD83D\uDD63"],"","",["clock830"],29,4,63,0],
		"1f564":[["\uD83D\uDD64"],"","",["clock930"],29,5,63,0],
		"1f565":[["\uD83D\uDD65"],"","",["clock1030"],29,6,63,0],
		"1f566":[["\uD83D\uDD66"],"","",["clock1130"],29,7,63,0],
		"1f567":[["\uD83D\uDD67"],"","",["clock1230"],29,8,63,0],
		"1f56f-fe0f":[["\uD83D\uDD6F\uFE0F","\uD83D\uDD6F"],"","",["candle"],29,9,23,0],
		"1f570-fe0f":[["\uD83D\uDD70\uFE0F","\uD83D\uDD70"],"","",["mantelpiece_clock"],29,10,23,0],
		"1f573-fe0f":[["\uD83D\uDD73\uFE0F","\uD83D\uDD73"],"","",["hole"],29,11,23,0],
		"1f574-fe0f":[["\uD83D\uDD74\uFE0F","\uD83D\uDD74"],"","",["man_in_business_suit_levitating"],29,12,23,0],
		"1f575-fe0f-200d-2640-fe0f":[["\uD83D\uDD75\uFE0F\u200D\u2640\uFE0F"],"","",["female-detective"],29,13,7,0],
		"1f575-fe0f-200d-2642-fe0f":[["\uD83D\uDD75\uFE0F\u200D\u2642\uFE0F","\uD83D\uDD75\uFE0F","\uD83D\uDD75"],"","",["male-detective","sleuth_or_spy"],29,19,7,0],
		"1f576-fe0f":[["\uD83D\uDD76\uFE0F","\uD83D\uDD76"],"","",["dark_sunglasses"],29,26,23,0],
		"1f577-fe0f":[["\uD83D\uDD77\uFE0F","\uD83D\uDD77"],"","",["spider"],29,27,23,0],
		"1f578-fe0f":[["\uD83D\uDD78\uFE0F","\uD83D\uDD78"],"","",["spider_web"],29,28,23,0],
		"1f579-fe0f":[["\uD83D\uDD79\uFE0F","\uD83D\uDD79"],"","",["joystick"],29,29,23,0],
		"1f57a":[["\uD83D\uDD7A"],"","",["man_dancing"],29,30,31,0],
		"1f587-fe0f":[["\uD83D\uDD87\uFE0F","\uD83D\uDD87"],"","",["linked_paperclips"],29,36,23,0],
		"1f58a-fe0f":[["\uD83D\uDD8A\uFE0F","\uD83D\uDD8A"],"","",["lower_left_ballpoint_pen"],29,37,23,0],
		"1f58b-fe0f":[["\uD83D\uDD8B\uFE0F","\uD83D\uDD8B"],"","",["lower_left_fountain_pen"],29,38,23,0],
		"1f58c-fe0f":[["\uD83D\uDD8C\uFE0F","\uD83D\uDD8C"],"","",["lower_left_paintbrush"],29,39,23,0],
		"1f58d-fe0f":[["\uD83D\uDD8D\uFE0F","\uD83D\uDD8D"],"","",["lower_left_crayon"],29,40,23,0],
		"1f590-fe0f":[["\uD83D\uDD90\uFE0F","\uD83D\uDD90"],"","",["raised_hand_with_fingers_splayed"],29,41,23,0],
		"1f595":[["\uD83D\uDD95"],"","",["middle_finger","reversed_hand_with_middle_finger_extended"],29,42,31,0],
		"1f596":[["\uD83D\uDD96"],"","",["spock-hand"],29,48,31,0],
		"1f5a4":[["\uD83D\uDDA4"],"","",["black_heart"],30,3,31,0],
		"1f5a5-fe0f":[["\uD83D\uDDA5\uFE0F","\uD83D\uDDA5"],"","",["desktop_computer"],30,4,23,0],
		"1f5a8-fe0f":[["\uD83D\uDDA8\uFE0F","\uD83D\uDDA8"],"","",["printer"],30,5,23,0],
		"1f5b1-fe0f":[["\uD83D\uDDB1\uFE0F","\uD83D\uDDB1"],"","",["three_button_mouse"],30,6,23,0],
		"1f5b2-fe0f":[["\uD83D\uDDB2\uFE0F","\uD83D\uDDB2"],"","",["trackball"],30,7,23,0],
		"1f5bc-fe0f":[["\uD83D\uDDBC\uFE0F","\uD83D\uDDBC"],"","",["frame_with_picture"],30,8,23,0],
		"1f5c2-fe0f":[["\uD83D\uDDC2\uFE0F","\uD83D\uDDC2"],"","",["card_index_dividers"],30,9,23,0],
		"1f5c3-fe0f":[["\uD83D\uDDC3\uFE0F","\uD83D\uDDC3"],"","",["card_file_box"],30,10,23,0],
		"1f5c4-fe0f":[["\uD83D\uDDC4\uFE0F","\uD83D\uDDC4"],"","",["file_cabinet"],30,11,23,0],
		"1f5d1-fe0f":[["\uD83D\uDDD1\uFE0F","\uD83D\uDDD1"],"","",["wastebasket"],30,12,23,0],
		"1f5d2-fe0f":[["\uD83D\uDDD2\uFE0F","\uD83D\uDDD2"],"","",["spiral_note_pad"],30,13,23,0],
		"1f5d3-fe0f":[["\uD83D\uDDD3\uFE0F","\uD83D\uDDD3"],"","",["spiral_calendar_pad"],30,14,23,0],
		"1f5dc-fe0f":[["\uD83D\uDDDC\uFE0F","\uD83D\uDDDC"],"","",["compression"],30,15,23,0],
		"1f5dd-fe0f":[["\uD83D\uDDDD\uFE0F","\uD83D\uDDDD"],"","",["old_key"],30,16,23,0],
		"1f5de-fe0f":[["\uD83D\uDDDE\uFE0F","\uD83D\uDDDE"],"","",["rolled_up_newspaper"],30,17,23,0],
		"1f5e1-fe0f":[["\uD83D\uDDE1\uFE0F","\uD83D\uDDE1"],"","",["dagger_knife"],30,18,23,0],
		"1f5e3-fe0f":[["\uD83D\uDDE3\uFE0F","\uD83D\uDDE3"],"","",["speaking_head_in_silhouette"],30,19,23,0],
		"1f5e8-fe0f":[["\uD83D\uDDE8\uFE0F","\uD83D\uDDE8"],"","",["left_speech_bubble"],30,20,23,0],
		"1f5ef-fe0f":[["\uD83D\uDDEF\uFE0F","\uD83D\uDDEF"],"","",["right_anger_bubble"],30,21,23,0],
		"1f5f3-fe0f":[["\uD83D\uDDF3\uFE0F","\uD83D\uDDF3"],"","",["ballot_box_with_ballot"],30,22,23,0],
		"1f5fa-fe0f":[["\uD83D\uDDFA\uFE0F","\uD83D\uDDFA"],"","",["world_map"],30,23,23,0],
		"1f5fb":[["\uD83D\uDDFB"],"\uE03B","\uDBB9\uDCC3",["mount_fuji"],30,24,63,0],
		"1f5fc":[["\uD83D\uDDFC"],"\uE509","\uDBB9\uDCC4",["tokyo_tower"],30,25,63,0],
		"1f5fd":[["\uD83D\uDDFD"],"\uE51D","\uDBB9\uDCC6",["statue_of_liberty"],30,26,63,0],
		"1f5fe":[["\uD83D\uDDFE"],"","\uDBB9\uDCC7",["japan"],30,27,63,0],
		"1f5ff":[["\uD83D\uDDFF"],"","\uDBB9\uDCC8",["moyai"],30,28,63,0],
		"1f600":[["\uD83D\uDE00"],"","",["grinning"],30,29,63,0,":D"],
		"1f601":[["\uD83D\uDE01"],"\uE404","\uDBB8\uDF33",["grin"],30,30,63,0],
		"1f602":[["\uD83D\uDE02"],"\uE412","\uDBB8\uDF34",["joy"],30,31,63,0],
		"1f603":[["\uD83D\uDE03"],"\uE057","\uDBB8\uDF30",["smiley"],30,32,63,0,":)"],
		"1f604":[["\uD83D\uDE04"],"\uE415","\uDBB8\uDF38",["smile"],30,33,63,0,":)"],
		"1f605":[["\uD83D\uDE05"],"","\uDBB8\uDF31",["sweat_smile"],30,34,63,0],
		"1f606":[["\uD83D\uDE06"],"","\uDBB8\uDF32",["laughing","satisfied"],30,35,63,0],
		"1f607":[["\uD83D\uDE07"],"","",["innocent"],30,36,63,0],
		"1f608":[["\uD83D\uDE08"],"","",["smiling_imp"],30,37,63,0],
		"1f609":[["\uD83D\uDE09"],"\uE405","\uDBB8\uDF47",["wink"],30,38,63,0,";)"],
		"1f60a":[["\uD83D\uDE0A"],"\uE056","\uDBB8\uDF35",["blush"],30,39,63,0,":)"],
		"1f60b":[["\uD83D\uDE0B"],"","\uDBB8\uDF2B",["yum"],30,40,63,0],
		"1f60c":[["\uD83D\uDE0C"],"\uE40A","\uDBB8\uDF3E",["relieved"],30,41,63,0],
		"1f60d":[["\uD83D\uDE0D"],"\uE106","\uDBB8\uDF27",["heart_eyes"],30,42,63,0],
		"1f60e":[["\uD83D\uDE0E"],"","",["sunglasses"],30,43,63,0],
		"1f60f":[["\uD83D\uDE0F"],"\uE402","\uDBB8\uDF43",["smirk"],30,44,63,0],
		"1f610":[["\uD83D\uDE10"],"","",["neutral_face"],30,45,63,0],
		"1f611":[["\uD83D\uDE11"],"","",["expressionless"],30,46,63,0],
		"1f612":[["\uD83D\uDE12"],"\uE40E","\uDBB8\uDF26",["unamused"],30,47,63,0,":("],
		"1f613":[["\uD83D\uDE13"],"\uE108","\uDBB8\uDF44",["sweat"],30,48,63,0],
		"1f614":[["\uD83D\uDE14"],"\uE403","\uDBB8\uDF40",["pensive"],30,49,63,0],
		"1f615":[["\uD83D\uDE15"],"","",["confused"],30,50,63,0],
		"1f616":[["\uD83D\uDE16"],"\uE407","\uDBB8\uDF3F",["confounded"],31,0,63,0],
		"1f617":[["\uD83D\uDE17"],"","",["kissing"],31,1,63,0],
		"1f618":[["\uD83D\uDE18"],"\uE418","\uDBB8\uDF2C",["kissing_heart"],31,2,63,0],
		"1f619":[["\uD83D\uDE19"],"","",["kissing_smiling_eyes"],31,3,63,0],
		"1f61a":[["\uD83D\uDE1A"],"\uE417","\uDBB8\uDF2D",["kissing_closed_eyes"],31,4,63,0],
		"1f61b":[["\uD83D\uDE1B"],"","",["stuck_out_tongue"],31,5,63,0,":p"],
		"1f61c":[["\uD83D\uDE1C"],"\uE105","\uDBB8\uDF29",["stuck_out_tongue_winking_eye"],31,6,63,0,";p"],
		"1f61d":[["\uD83D\uDE1D"],"\uE409","\uDBB8\uDF2A",["stuck_out_tongue_closed_eyes"],31,7,63,0],
		"1f61e":[["\uD83D\uDE1E"],"\uE058","\uDBB8\uDF23",["disappointed"],31,8,63,0,":("],
		"1f61f":[["\uD83D\uDE1F"],"","",["worried"],31,9,63,0],
		"1f620":[["\uD83D\uDE20"],"\uE059","\uDBB8\uDF20",["angry"],31,10,63,0],
		"1f621":[["\uD83D\uDE21"],"\uE416","\uDBB8\uDF3D",["rage"],31,11,63,0],
		"1f622":[["\uD83D\uDE22"],"\uE413","\uDBB8\uDF39",["cry"],31,12,63,0,":'("],
		"1f623":[["\uD83D\uDE23"],"\uE406","\uDBB8\uDF3C",["persevere"],31,13,63,0],
		"1f624":[["\uD83D\uDE24"],"","\uDBB8\uDF28",["triumph"],31,14,63,0],
		"1f625":[["\uD83D\uDE25"],"\uE401","\uDBB8\uDF45",["disappointed_relieved"],31,15,63,0],
		"1f626":[["\uD83D\uDE26"],"","",["frowning"],31,16,63,0],
		"1f627":[["\uD83D\uDE27"],"","",["anguished"],31,17,63,0],
		"1f628":[["\uD83D\uDE28"],"\uE40B","\uDBB8\uDF3B",["fearful"],31,18,63,0],
		"1f629":[["\uD83D\uDE29"],"","\uDBB8\uDF21",["weary"],31,19,63,0],
		"1f62a":[["\uD83D\uDE2A"],"\uE408","\uDBB8\uDF42",["sleepy"],31,20,63,0],
		"1f62b":[["\uD83D\uDE2B"],"","\uDBB8\uDF46",["tired_face"],31,21,63,0],
		"1f62c":[["\uD83D\uDE2C"],"","",["grimacing"],31,22,63,0],
		"1f62d":[["\uD83D\uDE2D"],"\uE411","\uDBB8\uDF3A",["sob"],31,23,63,0,":'("],
		"1f62e":[["\uD83D\uDE2E"],"","",["open_mouth"],31,24,63,0],
		"1f62f":[["\uD83D\uDE2F"],"","",["hushed"],31,25,63,0],
		"1f630":[["\uD83D\uDE30"],"\uE40F","\uDBB8\uDF25",["cold_sweat"],31,26,63,0],
		"1f631":[["\uD83D\uDE31"],"\uE107","\uDBB8\uDF41",["scream"],31,27,63,0],
		"1f632":[["\uD83D\uDE32"],"\uE410","\uDBB8\uDF22",["astonished"],31,28,63,0],
		"1f633":[["\uD83D\uDE33"],"\uE40D","\uDBB8\uDF2F",["flushed"],31,29,63,0],
		"1f634":[["\uD83D\uDE34"],"","",["sleeping"],31,30,63,0],
		"1f635":[["\uD83D\uDE35"],"","\uDBB8\uDF24",["dizzy_face"],31,31,63,0],
		"1f636":[["\uD83D\uDE36"],"","",["no_mouth"],31,32,63,0],
		"1f637":[["\uD83D\uDE37"],"\uE40C","\uDBB8\uDF2E",["mask"],31,33,63,0],
		"1f638":[["\uD83D\uDE38"],"","\uDBB8\uDF49",["smile_cat"],31,34,63,0],
		"1f639":[["\uD83D\uDE39"],"","\uDBB8\uDF4A",["joy_cat"],31,35,63,0],
		"1f63a":[["\uD83D\uDE3A"],"","\uDBB8\uDF48",["smiley_cat"],31,36,63,0],
		"1f63b":[["\uD83D\uDE3B"],"","\uDBB8\uDF4C",["heart_eyes_cat"],31,37,63,0],
		"1f63c":[["\uD83D\uDE3C"],"","\uDBB8\uDF4F",["smirk_cat"],31,38,63,0],
		"1f63d":[["\uD83D\uDE3D"],"","\uDBB8\uDF4B",["kissing_cat"],31,39,63,0],
		"1f63e":[["\uD83D\uDE3E"],"","\uDBB8\uDF4E",["pouting_cat"],31,40,63,0],
		"1f63f":[["\uD83D\uDE3F"],"","\uDBB8\uDF4D",["crying_cat_face"],31,41,63,0],
		"1f640":[["\uD83D\uDE40"],"","\uDBB8\uDF50",["scream_cat"],31,42,63,0],
		"1f641":[["\uD83D\uDE41"],"","",["slightly_frowning_face"],31,43,31,0],
		"1f642":[["\uD83D\uDE42"],"","",["slightly_smiling_face"],31,44,63,0],
		"1f643":[["\uD83D\uDE43"],"","",["upside_down_face"],31,45,31,0],
		"1f644":[["\uD83D\uDE44"],"","",["face_with_rolling_eyes"],31,46,31,0],
		"1f645-200d-2640-fe0f":[["\uD83D\uDE45\u200D\u2640\uFE0F","\uD83D\uDE45\u200D\u2640","\uD83D\uDE45"],"","",["woman-gesturing-no","no_good"],31,47,23,0],
		"1f645-200d-2642-fe0f":[["\uD83D\uDE45\u200D\u2642\uFE0F","\uD83D\uDE45\u200D\u2642"],"","",["man-gesturing-no"],32,2,23,0],
		"1f646-200d-2640-fe0f":[["\uD83D\uDE46\u200D\u2640\uFE0F","\uD83D\uDE46\u200D\u2640","\uD83D\uDE46"],"","",["woman-gesturing-ok","ok_woman"],32,14,23,0],
		"1f646-200d-2642-fe0f":[["\uD83D\uDE46\u200D\u2642\uFE0F","\uD83D\uDE46\u200D\u2642"],"","",["man-gesturing-ok"],32,20,23,0],
		"1f647-200d-2640-fe0f":[["\uD83D\uDE47\u200D\u2640\uFE0F","\uD83D\uDE47\u200D\u2640"],"","",["woman-bowing"],32,32,23,0],
		"1f647-200d-2642-fe0f":[["\uD83D\uDE47\u200D\u2642\uFE0F","\uD83D\uDE47\u200D\u2642","\uD83D\uDE47"],"","",["man-bowing","bow"],32,38,23,0],
		"1f648":[["\uD83D\uDE48"],"","\uDBB8\uDF54",["see_no_evil"],32,50,63,0],
		"1f649":[["\uD83D\uDE49"],"","\uDBB8\uDF56",["hear_no_evil"],33,0,63,0],
		"1f64a":[["\uD83D\uDE4A"],"","\uDBB8\uDF55",["speak_no_evil"],33,1,63,0],
		"1f64b-200d-2640-fe0f":[["\uD83D\uDE4B\u200D\u2640\uFE0F","\uD83D\uDE4B\u200D\u2640","\uD83D\uDE4B"],"","",["woman-raising-hand","raising_hand"],33,2,23,0],
		"1f64b-200d-2642-fe0f":[["\uD83D\uDE4B\u200D\u2642\uFE0F","\uD83D\uDE4B\u200D\u2642"],"","",["man-raising-hand"],33,8,23,0],
		"1f64c":[["\uD83D\uDE4C"],"\uE427","\uDBB8\uDF58",["raised_hands"],33,20,63,0],
		"1f64d-200d-2640-fe0f":[["\uD83D\uDE4D\u200D\u2640\uFE0F","\uD83D\uDE4D\u200D\u2640","\uD83D\uDE4D"],"","",["woman-frowning","person_frowning"],33,26,23,0],
		"1f64d-200d-2642-fe0f":[["\uD83D\uDE4D\u200D\u2642\uFE0F","\uD83D\uDE4D\u200D\u2642"],"","",["man-frowning"],33,32,23,0],
		"1f64e-200d-2640-fe0f":[["\uD83D\uDE4E\u200D\u2640\uFE0F","\uD83D\uDE4E\u200D\u2640","\uD83D\uDE4E"],"","",["woman-pouting","person_with_pouting_face"],33,44,23,0],
		"1f64e-200d-2642-fe0f":[["\uD83D\uDE4E\u200D\u2642\uFE0F","\uD83D\uDE4E\u200D\u2642"],"","",["man-pouting"],33,50,23,0],
		"1f64f":[["\uD83D\uDE4F"],"\uE41D","\uDBB8\uDF5B",["pray"],34,11,63,0],
		"1f680":[["\uD83D\uDE80"],"\uE10D","\uDBB9\uDFED",["rocket"],34,17,63,0],
		"1f681":[["\uD83D\uDE81"],"","",["helicopter"],34,18,63,0],
		"1f682":[["\uD83D\uDE82"],"","",["steam_locomotive"],34,19,63,0],
		"1f683":[["\uD83D\uDE83"],"\uE01E","\uDBB9\uDFDF",["railway_car"],34,20,63,0],
		"1f684":[["\uD83D\uDE84"],"\uE435","\uDBB9\uDFE2",["bullettrain_side"],34,21,63,0],
		"1f685":[["\uD83D\uDE85"],"\uE01F","\uDBB9\uDFE3",["bullettrain_front"],34,22,63,0],
		"1f686":[["\uD83D\uDE86"],"","",["train2"],34,23,63,0],
		"1f687":[["\uD83D\uDE87"],"\uE434","\uDBB9\uDFE0",["metro"],34,24,63,0],
		"1f688":[["\uD83D\uDE88"],"","",["light_rail"],34,25,63,0],
		"1f689":[["\uD83D\uDE89"],"\uE039","\uDBB9\uDFEC",["station"],34,26,63,0],
		"1f68a":[["\uD83D\uDE8A"],"","",["tram"],34,27,63,0],
		"1f68b":[["\uD83D\uDE8B"],"","",["train"],34,28,63,0],
		"1f68c":[["\uD83D\uDE8C"],"\uE159","\uDBB9\uDFE6",["bus"],34,29,63,0],
		"1f68d":[["\uD83D\uDE8D"],"","",["oncoming_bus"],34,30,63,0],
		"1f68e":[["\uD83D\uDE8E"],"","",["trolleybus"],34,31,63,0],
		"1f68f":[["\uD83D\uDE8F"],"\uE150","\uDBB9\uDFE7",["busstop"],34,32,63,0],
		"1f690":[["\uD83D\uDE90"],"","",["minibus"],34,33,63,0],
		"1f691":[["\uD83D\uDE91"],"\uE431","\uDBB9\uDFF3",["ambulance"],34,34,63,0],
		"1f692":[["\uD83D\uDE92"],"\uE430","\uDBB9\uDFF2",["fire_engine"],34,35,63,0],
		"1f693":[["\uD83D\uDE93"],"\uE432","\uDBB9\uDFF4",["police_car"],34,36,63,0],
		"1f694":[["\uD83D\uDE94"],"","",["oncoming_police_car"],34,37,63,0],
		"1f695":[["\uD83D\uDE95"],"\uE15A","\uDBB9\uDFEF",["taxi"],34,38,63,0],
		"1f696":[["\uD83D\uDE96"],"","",["oncoming_taxi"],34,39,63,0],
		"1f697":[["\uD83D\uDE97"],"\uE01B","\uDBB9\uDFE4",["car","red_car"],34,40,63,0],
		"1f698":[["\uD83D\uDE98"],"","",["oncoming_automobile"],34,41,63,0],
		"1f699":[["\uD83D\uDE99"],"\uE42E","\uDBB9\uDFE5",["blue_car"],34,42,63,0],
		"1f69a":[["\uD83D\uDE9A"],"\uE42F","\uDBB9\uDFF1",["truck"],34,43,63,0],
		"1f69b":[["\uD83D\uDE9B"],"","",["articulated_lorry"],34,44,63,0],
		"1f69c":[["\uD83D\uDE9C"],"","",["tractor"],34,45,63,0],
		"1f69d":[["\uD83D\uDE9D"],"","",["monorail"],34,46,63,0],
		"1f69e":[["\uD83D\uDE9E"],"","",["mountain_railway"],34,47,63,0],
		"1f69f":[["\uD83D\uDE9F"],"","",["suspension_railway"],34,48,63,0],
		"1f6a0":[["\uD83D\uDEA0"],"","",["mountain_cableway"],34,49,63,0],
		"1f6a1":[["\uD83D\uDEA1"],"","",["aerial_tramway"],34,50,63,0],
		"1f6a2":[["\uD83D\uDEA2"],"\uE202","\uDBB9\uDFE8",["ship"],35,0,63,0],
		"1f6a3-200d-2640-fe0f":[["\uD83D\uDEA3\u200D\u2640\uFE0F","\uD83D\uDEA3\u200D\u2640"],"","",["woman-rowing-boat"],35,1,23,0],
		"1f6a3-200d-2642-fe0f":[["\uD83D\uDEA3\u200D\u2642\uFE0F","\uD83D\uDEA3\u200D\u2642","\uD83D\uDEA3"],"","",["man-rowing-boat","rowboat"],35,7,23,0],
		"1f6a4":[["\uD83D\uDEA4"],"\uE135","\uDBB9\uDFEE",["speedboat"],35,19,63,0],
		"1f6a5":[["\uD83D\uDEA5"],"\uE14E","\uDBB9\uDFF7",["traffic_light"],35,20,63,0],
		"1f6a6":[["\uD83D\uDEA6"],"","",["vertical_traffic_light"],35,21,63,0],
		"1f6a7":[["\uD83D\uDEA7"],"\uE137","\uDBB9\uDFF8",["construction"],35,22,63,0],
		"1f6a8":[["\uD83D\uDEA8"],"","\uDBB9\uDFF9",["rotating_light"],35,23,63,0],
		"1f6a9":[["\uD83D\uDEA9"],"","\uDBBA\uDF22",["triangular_flag_on_post"],35,24,63,0],
		"1f6aa":[["\uD83D\uDEAA"],"","\uDBB9\uDCF3",["door"],35,25,63,0],
		"1f6ab":[["\uD83D\uDEAB"],"","\uDBBA\uDF48",["no_entry_sign"],35,26,63,0],
		"1f6ac":[["\uD83D\uDEAC"],"\uE30E","\uDBBA\uDF1E",["smoking"],35,27,63,0],
		"1f6ad":[["\uD83D\uDEAD"],"\uE208","\uDBBA\uDF1F",["no_smoking"],35,28,63,0],
		"1f6ae":[["\uD83D\uDEAE"],"","",["put_litter_in_its_place"],35,29,63,0],
		"1f6af":[["\uD83D\uDEAF"],"","",["do_not_litter"],35,30,63,0],
		"1f6b0":[["\uD83D\uDEB0"],"","",["potable_water"],35,31,63,0],
		"1f6b1":[["\uD83D\uDEB1"],"","",["non-potable_water"],35,32,63,0],
		"1f6b2":[["\uD83D\uDEB2"],"\uE136","\uDBB9\uDFEB",["bike"],35,33,63,0],
		"1f6b3":[["\uD83D\uDEB3"],"","",["no_bicycles"],35,34,63,0],
		"1f6b4-200d-2640-fe0f":[["\uD83D\uDEB4\u200D\u2640\uFE0F","\uD83D\uDEB4\u200D\u2640"],"","",["woman-biking"],35,35,23,0],
		"1f6b4-200d-2642-fe0f":[["\uD83D\uDEB4\u200D\u2642\uFE0F","\uD83D\uDEB4\u200D\u2642","\uD83D\uDEB4"],"","",["man-biking","bicyclist"],35,41,23,0],
		"1f6b5-200d-2640-fe0f":[["\uD83D\uDEB5\u200D\u2640\uFE0F","\uD83D\uDEB5\u200D\u2640"],"","",["woman-mountain-biking"],36,2,23,0],
		"1f6b5-200d-2642-fe0f":[["\uD83D\uDEB5\u200D\u2642\uFE0F","\uD83D\uDEB5\u200D\u2642","\uD83D\uDEB5"],"","",["man-mountain-biking","mountain_bicyclist"],36,8,23,0],
		"1f6b6-200d-2640-fe0f":[["\uD83D\uDEB6\u200D\u2640\uFE0F","\uD83D\uDEB6\u200D\u2640"],"","",["woman-walking"],36,20,23,0],
		"1f6b6-200d-2642-fe0f":[["\uD83D\uDEB6\u200D\u2642\uFE0F","\uD83D\uDEB6\u200D\u2642","\uD83D\uDEB6"],"","",["man-walking","walking"],36,26,23,0],
		"1f6b7":[["\uD83D\uDEB7"],"","",["no_pedestrians"],36,38,63,0],
		"1f6b8":[["\uD83D\uDEB8"],"","",["children_crossing"],36,39,63,0],
		"1f6b9":[["\uD83D\uDEB9"],"\uE138","\uDBBA\uDF33",["mens"],36,40,63,0],
		"1f6ba":[["\uD83D\uDEBA"],"\uE139","\uDBBA\uDF34",["womens"],36,41,63,0],
		"1f6bb":[["\uD83D\uDEBB"],"\uE151","\uDBB9\uDD06",["restroom"],36,42,63,0],
		"1f6bc":[["\uD83D\uDEBC"],"\uE13A","\uDBBA\uDF35",["baby_symbol"],36,43,63,0],
		"1f6bd":[["\uD83D\uDEBD"],"\uE140","\uDBB9\uDD07",["toilet"],36,44,63,0],
		"1f6be":[["\uD83D\uDEBE"],"\uE309","\uDBB9\uDD08",["wc"],36,45,63,0],
		"1f6bf":[["\uD83D\uDEBF"],"","",["shower"],36,46,63,0],
		"1f6c0":[["\uD83D\uDEC0"],"\uE13F","\uDBB9\uDD05",["bath"],36,47,63,0],
		"1f6c1":[["\uD83D\uDEC1"],"","",["bathtub"],37,2,63,0],
		"1f6c2":[["\uD83D\uDEC2"],"","",["passport_control"],37,3,63,0],
		"1f6c3":[["\uD83D\uDEC3"],"","",["customs"],37,4,63,0],
		"1f6c4":[["\uD83D\uDEC4"],"","",["baggage_claim"],37,5,63,0],
		"1f6c5":[["\uD83D\uDEC5"],"","",["left_luggage"],37,6,63,0],
		"1f6cb-fe0f":[["\uD83D\uDECB\uFE0F","\uD83D\uDECB"],"","",["couch_and_lamp"],37,7,23,0],
		"1f6cc":[["\uD83D\uDECC"],"","",["sleeping_accommodation"],37,8,31,0],
		"1f6cd-fe0f":[["\uD83D\uDECD\uFE0F","\uD83D\uDECD"],"","",["shopping_bags"],37,14,23,0],
		"1f6ce-fe0f":[["\uD83D\uDECE\uFE0F","\uD83D\uDECE"],"","",["bellhop_bell"],37,15,23,0],
		"1f6cf-fe0f":[["\uD83D\uDECF\uFE0F","\uD83D\uDECF"],"","",["bed"],37,16,23,0],
		"1f6d0":[["\uD83D\uDED0"],"","",["place_of_worship"],37,17,31,0],
		"1f6d1":[["\uD83D\uDED1"],"","",["octagonal_sign"],37,18,31,0],
		"1f6d2":[["\uD83D\uDED2"],"","",["shopping_trolley"],37,19,31,0],
		"1f6e0-fe0f":[["\uD83D\uDEE0\uFE0F","\uD83D\uDEE0"],"","",["hammer_and_wrench"],37,20,23,0],
		"1f6e1-fe0f":[["\uD83D\uDEE1\uFE0F","\uD83D\uDEE1"],"","",["shield"],37,21,23,0],
		"1f6e2-fe0f":[["\uD83D\uDEE2\uFE0F","\uD83D\uDEE2"],"","",["oil_drum"],37,22,23,0],
		"1f6e3-fe0f":[["\uD83D\uDEE3\uFE0F","\uD83D\uDEE3"],"","",["motorway"],37,23,23,0],
		"1f6e4-fe0f":[["\uD83D\uDEE4\uFE0F","\uD83D\uDEE4"],"","",["railway_track"],37,24,23,0],
		"1f6e5-fe0f":[["\uD83D\uDEE5\uFE0F","\uD83D\uDEE5"],"","",["motor_boat"],37,25,23,0],
		"1f6e9-fe0f":[["\uD83D\uDEE9\uFE0F","\uD83D\uDEE9"],"","",["small_airplane"],37,26,23,0],
		"1f6eb":[["\uD83D\uDEEB"],"","",["airplane_departure"],37,27,31,0],
		"1f6ec":[["\uD83D\uDEEC"],"","",["airplane_arriving"],37,28,31,0],
		"1f6f0-fe0f":[["\uD83D\uDEF0\uFE0F","\uD83D\uDEF0"],"","",["satellite"],37,29,23,0],
		"1f6f3-fe0f":[["\uD83D\uDEF3\uFE0F","\uD83D\uDEF3"],"","",["passenger_ship"],37,30,23,0],
		"1f6f4":[["\uD83D\uDEF4"],"","",["scooter"],37,31,31,0],
		"1f6f5":[["\uD83D\uDEF5"],"","",["motor_scooter"],37,32,31,0],
		"1f6f6":[["\uD83D\uDEF6"],"","",["canoe"],37,33,31,0],
		"1f6f7":[["\uD83D\uDEF7"],"","",["sled"],37,34,23,0],
		"1f6f8":[["\uD83D\uDEF8"],"","",["flying_saucer"],37,35,23,0],
		"1f910":[["\uD83E\uDD10"],"","",["zipper_mouth_face"],37,36,31,0],
		"1f911":[["\uD83E\uDD11"],"","",["money_mouth_face"],37,37,31,0],
		"1f912":[["\uD83E\uDD12"],"","",["face_with_thermometer"],37,38,31,0],
		"1f913":[["\uD83E\uDD13"],"","",["nerd_face"],37,39,31,0],
		"1f914":[["\uD83E\uDD14"],"","",["thinking_face"],37,40,31,0],
		"1f915":[["\uD83E\uDD15"],"","",["face_with_head_bandage"],37,41,31,0],
		"1f916":[["\uD83E\uDD16"],"","",["robot_face"],37,42,31,0],
		"1f917":[["\uD83E\uDD17"],"","",["hugging_face"],37,43,31,0],
		"1f918":[["\uD83E\uDD18"],"","",["the_horns","sign_of_the_horns"],37,44,31,0],
		"1f919":[["\uD83E\uDD19"],"","",["call_me_hand"],37,50,31,0],
		"1f91a":[["\uD83E\uDD1A"],"","",["raised_back_of_hand"],38,5,31,0],
		"1f91b":[["\uD83E\uDD1B"],"","",["left-facing_fist"],38,11,31,0],
		"1f91c":[["\uD83E\uDD1C"],"","",["right-facing_fist"],38,17,31,0],
		"1f91d":[["\uD83E\uDD1D"],"","",["handshake"],38,23,31,0],
		"1f91e":[["\uD83E\uDD1E"],"","",["hand_with_index_and_middle_fingers_crossed"],38,24,31,0],
		"1f91f":[["\uD83E\uDD1F"],"","",["i_love_you_hand_sign"],38,30,23,0],
		"1f920":[["\uD83E\uDD20"],"","",["face_with_cowboy_hat"],38,36,31,0],
		"1f921":[["\uD83E\uDD21"],"","",["clown_face"],38,37,31,0],
		"1f922":[["\uD83E\uDD22"],"","",["nauseated_face"],38,38,31,0],
		"1f923":[["\uD83E\uDD23"],"","",["rolling_on_the_floor_laughing"],38,39,31,0],
		"1f924":[["\uD83E\uDD24"],"","",["drooling_face"],38,40,31,0],
		"1f925":[["\uD83E\uDD25"],"","",["lying_face"],38,41,31,0],
		"1f926-200d-2640-fe0f":[["\uD83E\uDD26\u200D\u2640\uFE0F","\uD83E\uDD26\u200D\u2640"],"","",["woman-facepalming"],38,42,23,0],
		"1f926-200d-2642-fe0f":[["\uD83E\uDD26\u200D\u2642\uFE0F","\uD83E\uDD26\u200D\u2642"],"","",["man-facepalming"],38,48,23,0],
		"1f926":[["\uD83E\uDD26"],"","",["face_palm"],39,3,15,0],
		"1f927":[["\uD83E\uDD27"],"","",["sneezing_face"],39,9,31,0],
		"1f928":[["\uD83E\uDD28"],"","",["face_with_one_eyebrow_raised"],39,10,23,0],
		"1f929":[["\uD83E\uDD29"],"","",["grinning_face_with_star_eyes"],39,11,23,0],
		"1f92a":[["\uD83E\uDD2A"],"","",["grinning_face_with_one_large_and_one_small_eye"],39,12,23,0],
		"1f92b":[["\uD83E\uDD2B"],"","",["face_with_finger_covering_closed_lips"],39,13,23,0],
		"1f92c":[["\uD83E\uDD2C"],"","",["serious_face_with_symbols_covering_mouth"],39,14,23,0],
		"1f92d":[["\uD83E\uDD2D"],"","",["smiling_face_with_smiling_eyes_and_hand_covering_mouth"],39,15,23,0],
		"1f92e":[["\uD83E\uDD2E"],"","",["face_with_open_mouth_vomiting"],39,16,23,0],
		"1f92f":[["\uD83E\uDD2F"],"","",["shocked_face_with_exploding_head"],39,17,23,0],
		"1f930":[["\uD83E\uDD30"],"","",["pregnant_woman"],39,18,31,0],
		"1f931":[["\uD83E\uDD31"],"","",["breast-feeding"],39,24,23,0],
		"1f932":[["\uD83E\uDD32"],"","",["palms_up_together"],39,30,23,0],
		"1f933":[["\uD83E\uDD33"],"","",["selfie"],39,36,31,0],
		"1f934":[["\uD83E\uDD34"],"","",["prince"],39,42,31,0],
		"1f935":[["\uD83E\uDD35"],"","",["man_in_tuxedo"],39,48,31,0],
		"1f936":[["\uD83E\uDD36"],"","",["mother_christmas"],40,3,31,0],
		"1f937-200d-2640-fe0f":[["\uD83E\uDD37\u200D\u2640\uFE0F","\uD83E\uDD37\u200D\u2640"],"","",["woman-shrugging"],40,9,23,0],
		"1f937-200d-2642-fe0f":[["\uD83E\uDD37\u200D\u2642\uFE0F","\uD83E\uDD37\u200D\u2642"],"","",["man-shrugging"],40,15,23,0],
		"1f937":[["\uD83E\uDD37"],"","",["shrug"],40,21,15,0],
		"1f938-200d-2640-fe0f":[["\uD83E\uDD38\u200D\u2640\uFE0F","\uD83E\uDD38\u200D\u2640"],"","",["woman-cartwheeling"],40,27,23,0],
		"1f938-200d-2642-fe0f":[["\uD83E\uDD38\u200D\u2642\uFE0F","\uD83E\uDD38\u200D\u2642"],"","",["man-cartwheeling"],40,33,23,0],
		"1f938":[["\uD83E\uDD38"],"","",["person_doing_cartwheel"],40,39,15,0],
		"1f939-200d-2640-fe0f":[["\uD83E\uDD39\u200D\u2640\uFE0F","\uD83E\uDD39\u200D\u2640"],"","",["woman-juggling"],40,45,7,0],
		"1f939-200d-2642-fe0f":[["\uD83E\uDD39\u200D\u2642\uFE0F","\uD83E\uDD39\u200D\u2642"],"","",["man-juggling"],41,0,7,0],
		"1f939":[["\uD83E\uDD39"],"","",["juggling"],41,6,31,0],
		"1f93a":[["\uD83E\uDD3A"],"","",["fencer"],41,12,31,0],
		"1f93c-200d-2640-fe0f":[["\uD83E\uDD3C\u200D\u2640\uFE0F","\uD83E\uDD3C\u200D\u2640"],"","",["woman-wrestling"],41,13,23,0],
		"1f93c-200d-2642-fe0f":[["\uD83E\uDD3C\u200D\u2642\uFE0F","\uD83E\uDD3C\u200D\u2642"],"","",["man-wrestling"],41,14,23,0],
		"1f93c":[["\uD83E\uDD3C"],"","",["wrestlers"],41,15,15,0],
		"1f93d-200d-2640-fe0f":[["\uD83E\uDD3D\u200D\u2640\uFE0F","\uD83E\uDD3D\u200D\u2640"],"","",["woman-playing-water-polo"],41,16,23,0],
		"1f93d-200d-2642-fe0f":[["\uD83E\uDD3D\u200D\u2642\uFE0F","\uD83E\uDD3D\u200D\u2642"],"","",["man-playing-water-polo"],41,22,23,0],
		"1f93d":[["\uD83E\uDD3D"],"","",["water_polo"],41,28,15,0],
		"1f93e-200d-2640-fe0f":[["\uD83E\uDD3E\u200D\u2640\uFE0F","\uD83E\uDD3E\u200D\u2640"],"","",["woman-playing-handball"],41,34,23,0],
		"1f93e-200d-2642-fe0f":[["\uD83E\uDD3E\u200D\u2642\uFE0F","\uD83E\uDD3E\u200D\u2642"],"","",["man-playing-handball"],41,40,23,0],
		"1f93e":[["\uD83E\uDD3E"],"","",["handball"],41,46,15,0],
		"1f940":[["\uD83E\uDD40"],"","",["wilted_flower"],42,1,31,0],
		"1f941":[["\uD83E\uDD41"],"","",["drum_with_drumsticks"],42,2,31,0],
		"1f942":[["\uD83E\uDD42"],"","",["clinking_glasses"],42,3,31,0],
		"1f943":[["\uD83E\uDD43"],"","",["tumbler_glass"],42,4,31,0],
		"1f944":[["\uD83E\uDD44"],"","",["spoon"],42,5,31,0],
		"1f945":[["\uD83E\uDD45"],"","",["goal_net"],42,6,31,0],
		"1f947":[["\uD83E\uDD47"],"","",["first_place_medal"],42,7,31,0],
		"1f948":[["\uD83E\uDD48"],"","",["second_place_medal"],42,8,31,0],
		"1f949":[["\uD83E\uDD49"],"","",["third_place_medal"],42,9,31,0],
		"1f94a":[["\uD83E\uDD4A"],"","",["boxing_glove"],42,10,31,0],
		"1f94b":[["\uD83E\uDD4B"],"","",["martial_arts_uniform"],42,11,31,0],
		"1f94c":[["\uD83E\uDD4C"],"","",["curling_stone"],42,12,23,0],
		"1f950":[["\uD83E\uDD50"],"","",["croissant"],42,13,31,0],
		"1f951":[["\uD83E\uDD51"],"","",["avocado"],42,14,31,0],
		"1f952":[["\uD83E\uDD52"],"","",["cucumber"],42,15,31,0],
		"1f953":[["\uD83E\uDD53"],"","",["bacon"],42,16,31,0],
		"1f954":[["\uD83E\uDD54"],"","",["potato"],42,17,31,0],
		"1f955":[["\uD83E\uDD55"],"","",["carrot"],42,18,31,0],
		"1f956":[["\uD83E\uDD56"],"","",["baguette_bread"],42,19,31,0],
		"1f957":[["\uD83E\uDD57"],"","",["green_salad"],42,20,31,0],
		"1f958":[["\uD83E\uDD58"],"","",["shallow_pan_of_food"],42,21,31,0],
		"1f959":[["\uD83E\uDD59"],"","",["stuffed_flatbread"],42,22,31,0],
		"1f95a":[["\uD83E\uDD5A"],"","",["egg"],42,23,31,0],
		"1f95b":[["\uD83E\uDD5B"],"","",["glass_of_milk"],42,24,31,0],
		"1f95c":[["\uD83E\uDD5C"],"","",["peanuts"],42,25,31,0],
		"1f95d":[["\uD83E\uDD5D"],"","",["kiwifruit"],42,26,31,0],
		"1f95e":[["\uD83E\uDD5E"],"","",["pancakes"],42,27,31,0],
		"1f95f":[["\uD83E\uDD5F"],"","",["dumpling"],42,28,23,0],
		"1f960":[["\uD83E\uDD60"],"","",["fortune_cookie"],42,29,23,0],
		"1f961":[["\uD83E\uDD61"],"","",["takeout_box"],42,30,23,0],
		"1f962":[["\uD83E\uDD62"],"","",["chopsticks"],42,31,23,0],
		"1f963":[["\uD83E\uDD63"],"","",["bowl_with_spoon"],42,32,23,0],
		"1f964":[["\uD83E\uDD64"],"","",["cup_with_straw"],42,33,23,0],
		"1f965":[["\uD83E\uDD65"],"","",["coconut"],42,34,23,0],
		"1f966":[["\uD83E\uDD66"],"","",["broccoli"],42,35,23,0],
		"1f967":[["\uD83E\uDD67"],"","",["pie"],42,36,23,0],
		"1f968":[["\uD83E\uDD68"],"","",["pretzel"],42,37,23,0],
		"1f969":[["\uD83E\uDD69"],"","",["cut_of_meat"],42,38,23,0],
		"1f96a":[["\uD83E\uDD6A"],"","",["sandwich"],42,39,23,0],
		"1f96b":[["\uD83E\uDD6B"],"","",["canned_food"],42,40,23,0],
		"1f980":[["\uD83E\uDD80"],"","",["crab"],42,41,31,0],
		"1f981":[["\uD83E\uDD81"],"","",["lion_face"],42,42,31,0],
		"1f982":[["\uD83E\uDD82"],"","",["scorpion"],42,43,31,0],
		"1f983":[["\uD83E\uDD83"],"","",["turkey"],42,44,31,0],
		"1f984":[["\uD83E\uDD84"],"","",["unicorn_face"],42,45,31,0],
		"1f985":[["\uD83E\uDD85"],"","",["eagle"],42,46,31,0],
		"1f986":[["\uD83E\uDD86"],"","",["duck"],42,47,31,0],
		"1f987":[["\uD83E\uDD87"],"","",["bat"],42,48,31,0],
		"1f988":[["\uD83E\uDD88"],"","",["shark"],42,49,31,0],
		"1f989":[["\uD83E\uDD89"],"","",["owl"],42,50,31,0],
		"1f98a":[["\uD83E\uDD8A"],"","",["fox_face"],43,0,31,0],
		"1f98b":[["\uD83E\uDD8B"],"","",["butterfly"],43,1,31,0],
		"1f98c":[["\uD83E\uDD8C"],"","",["deer"],43,2,31,0],
		"1f98d":[["\uD83E\uDD8D"],"","",["gorilla"],43,3,31,0],
		"1f98e":[["\uD83E\uDD8E"],"","",["lizard"],43,4,31,0],
		"1f98f":[["\uD83E\uDD8F"],"","",["rhinoceros"],43,5,31,0],
		"1f990":[["\uD83E\uDD90"],"","",["shrimp"],43,6,31,0],
		"1f991":[["\uD83E\uDD91"],"","",["squid"],43,7,31,0],
		"1f992":[["\uD83E\uDD92"],"","",["giraffe_face"],43,8,23,0],
		"1f993":[["\uD83E\uDD93"],"","",["zebra_face"],43,9,23,0],
		"1f994":[["\uD83E\uDD94"],"","",["hedgehog"],43,10,23,0],
		"1f995":[["\uD83E\uDD95"],"","",["sauropod"],43,11,23,0],
		"1f996":[["\uD83E\uDD96"],"","",["t-rex"],43,12,23,0],
		"1f997":[["\uD83E\uDD97"],"","",["cricket"],43,13,23,0],
		"1f9c0":[["\uD83E\uDDC0"],"","",["cheese_wedge"],43,14,31,0],
		"1f9d0":[["\uD83E\uDDD0"],"","",["face_with_monocle"],43,15,23,0],
		"1f9d1":[["\uD83E\uDDD1"],"","",["adult"],43,16,23,0],
		"1f9d2":[["\uD83E\uDDD2"],"","",["child"],43,22,23,0],
		"1f9d3":[["\uD83E\uDDD3"],"","",["older_adult"],43,28,23,0],
		"1f9d4":[["\uD83E\uDDD4"],"","",["bearded_person"],43,34,23,0],
		"1f9d5":[["\uD83E\uDDD5"],"","",["person_with_headscarf"],43,40,23,0],
		"1f9d6-200d-2640-fe0f":[["\uD83E\uDDD6\u200D\u2640\uFE0F","\uD83E\uDDD6\u200D\u2640"],"","",["woman_in_steamy_room"],43,46,23,0],
		"1f9d6-200d-2642-fe0f":[["\uD83E\uDDD6\u200D\u2642\uFE0F","\uD83E\uDDD6\u200D\u2642","\uD83E\uDDD6"],"","",["man_in_steamy_room","person_in_steamy_room"],44,1,23,0],
		"1f9d7-200d-2640-fe0f":[["\uD83E\uDDD7\u200D\u2640\uFE0F","\uD83E\uDDD7\u200D\u2640","\uD83E\uDDD7"],"","",["woman_climbing","person_climbing"],44,13,23,0],
		"1f9d7-200d-2642-fe0f":[["\uD83E\uDDD7\u200D\u2642\uFE0F","\uD83E\uDDD7\u200D\u2642"],"","",["man_climbing"],44,19,23,0],
		"1f9d8-200d-2640-fe0f":[["\uD83E\uDDD8\u200D\u2640\uFE0F","\uD83E\uDDD8\u200D\u2640","\uD83E\uDDD8"],"","",["woman_in_lotus_position","person_in_lotus_position"],44,31,23,0],
		"1f9d8-200d-2642-fe0f":[["\uD83E\uDDD8\u200D\u2642\uFE0F","\uD83E\uDDD8\u200D\u2642"],"","",["man_in_lotus_position"],44,37,23,0],
		"1f9d9-200d-2640-fe0f":[["\uD83E\uDDD9\u200D\u2640\uFE0F","\uD83E\uDDD9\u200D\u2640","\uD83E\uDDD9"],"","",["female_mage","mage"],44,49,23,0],
		"1f9d9-200d-2642-fe0f":[["\uD83E\uDDD9\u200D\u2642\uFE0F","\uD83E\uDDD9\u200D\u2642"],"","",["male_mage"],45,4,23,0],
		"1f9da-200d-2640-fe0f":[["\uD83E\uDDDA\u200D\u2640\uFE0F","\uD83E\uDDDA\u200D\u2640","\uD83E\uDDDA"],"","",["female_fairy","fairy"],45,16,23,0],
		"1f9da-200d-2642-fe0f":[["\uD83E\uDDDA\u200D\u2642\uFE0F","\uD83E\uDDDA\u200D\u2642"],"","",["male_fairy"],45,22,23,0],
		"1f9db-200d-2640-fe0f":[["\uD83E\uDDDB\u200D\u2640\uFE0F","\uD83E\uDDDB\u200D\u2640","\uD83E\uDDDB"],"","",["female_vampire","vampire"],45,34,23,0],
		"1f9db-200d-2642-fe0f":[["\uD83E\uDDDB\u200D\u2642\uFE0F","\uD83E\uDDDB\u200D\u2642"],"","",["male_vampire"],45,40,23,0],
		"1f9dc-200d-2640-fe0f":[["\uD83E\uDDDC\u200D\u2640\uFE0F","\uD83E\uDDDC\u200D\u2640"],"","",["mermaid"],46,1,23,0],
		"1f9dc-200d-2642-fe0f":[["\uD83E\uDDDC\u200D\u2642\uFE0F","\uD83E\uDDDC\u200D\u2642","\uD83E\uDDDC"],"","",["merman","merperson"],46,7,23,0],
		"1f9dd-200d-2640-fe0f":[["\uD83E\uDDDD\u200D\u2640\uFE0F","\uD83E\uDDDD\u200D\u2640"],"","",["female_elf"],46,19,23,0],
		"1f9dd-200d-2642-fe0f":[["\uD83E\uDDDD\u200D\u2642\uFE0F","\uD83E\uDDDD\u200D\u2642","\uD83E\uDDDD"],"","",["male_elf","elf"],46,25,23,0],
		"1f9de-200d-2640-fe0f":[["\uD83E\uDDDE\u200D\u2640\uFE0F","\uD83E\uDDDE\u200D\u2640"],"","",["female_genie"],46,37,23,0],
		"1f9de-200d-2642-fe0f":[["\uD83E\uDDDE\u200D\u2642\uFE0F","\uD83E\uDDDE\u200D\u2642","\uD83E\uDDDE"],"","",["male_genie","genie"],46,38,23,0],
		"1f9df-200d-2640-fe0f":[["\uD83E\uDDDF\u200D\u2640\uFE0F","\uD83E\uDDDF\u200D\u2640"],"","",["female_zombie"],46,40,23,0],
		"1f9df-200d-2642-fe0f":[["\uD83E\uDDDF\u200D\u2642\uFE0F","\uD83E\uDDDF\u200D\u2642","\uD83E\uDDDF"],"","",["male_zombie","zombie"],46,41,23,0],
		"1f9e0":[["\uD83E\uDDE0"],"","",["brain"],46,43,23,0],
		"1f9e1":[["\uD83E\uDDE1"],"","",["orange_heart"],46,44,23,0],
		"1f9e2":[["\uD83E\uDDE2"],"","",["billed_cap"],46,45,23,0],
		"1f9e3":[["\uD83E\uDDE3"],"","",["scarf"],46,46,23,0],
		"1f9e4":[["\uD83E\uDDE4"],"","",["gloves"],46,47,23,0],
		"1f9e5":[["\uD83E\uDDE5"],"","",["coat"],46,48,23,0],
		"1f9e6":[["\uD83E\uDDE6"],"","",["socks"],46,49,23,0],
		"203c-fe0f":[["\u203C\uFE0F","\u203C"],"","\uDBBA\uDF06",["bangbang"],46,50,55,0],
		"2049-fe0f":[["\u2049\uFE0F","\u2049"],"","\uDBBA\uDF05",["interrobang"],47,0,55,0],
		"2122-fe0f":[["\u2122\uFE0F","\u2122"],"\uE537","\uDBBA\uDF2A",["tm"],47,1,55,0],
		"2139-fe0f":[["\u2139\uFE0F","\u2139"],"","\uDBBA\uDF47",["information_source"],47,2,55,0],
		"2194-fe0f":[["\u2194\uFE0F","\u2194"],"","\uDBBA\uDEF6",["left_right_arrow"],47,3,55,0],
		"2195-fe0f":[["\u2195\uFE0F","\u2195"],"","\uDBBA\uDEF7",["arrow_up_down"],47,4,55,0],
		"2196-fe0f":[["\u2196\uFE0F","\u2196"],"\uE237","\uDBBA\uDEF2",["arrow_upper_left"],47,5,55,0],
		"2197-fe0f":[["\u2197\uFE0F","\u2197"],"\uE236","\uDBBA\uDEF0",["arrow_upper_right"],47,6,55,0],
		"2198-fe0f":[["\u2198\uFE0F","\u2198"],"\uE238","\uDBBA\uDEF1",["arrow_lower_right"],47,7,55,0],
		"2199-fe0f":[["\u2199\uFE0F","\u2199"],"\uE239","\uDBBA\uDEF3",["arrow_lower_left"],47,8,55,0],
		"21a9-fe0f":[["\u21A9\uFE0F","\u21A9"],"","\uDBBA\uDF83",["leftwards_arrow_with_hook"],47,9,55,0],
		"21aa-fe0f":[["\u21AA\uFE0F","\u21AA"],"","\uDBBA\uDF88",["arrow_right_hook"],47,10,55,0],
		"231a":[["\u231A"],"","\uDBB8\uDC1D",["watch"],47,11,63,0],
		"231b":[["\u231B"],"","\uDBB8\uDC1C",["hourglass"],47,12,63,0],
		"2328-fe0f":[["\u2328\uFE0F","\u2328"],"","",["keyboard"],47,13,23,0],
		"23cf-fe0f":[["\u23CF\uFE0F","\u23CF"],"","",["eject"],47,14,23,0],
		"23e9":[["\u23E9"],"\uE23C","\uDBBA\uDEFE",["fast_forward"],47,15,63,0],
		"23ea":[["\u23EA"],"\uE23D","\uDBBA\uDEFF",["rewind"],47,16,63,0],
		"23eb":[["\u23EB"],"","\uDBBA\uDF03",["arrow_double_up"],47,17,63,0],
		"23ec":[["\u23EC"],"","\uDBBA\uDF02",["arrow_double_down"],47,18,63,0],
		"23ed-fe0f":[["\u23ED\uFE0F","\u23ED"],"","",["black_right_pointing_double_triangle_with_vertical_bar"],47,19,23,0],
		"23ee-fe0f":[["\u23EE\uFE0F","\u23EE"],"","",["black_left_pointing_double_triangle_with_vertical_bar"],47,20,23,0],
		"23ef-fe0f":[["\u23EF\uFE0F","\u23EF"],"","",["black_right_pointing_triangle_with_double_vertical_bar"],47,21,23,0],
		"23f0":[["\u23F0"],"","\uDBB8\uDC2A",["alarm_clock"],47,22,63,0],
		"23f1-fe0f":[["\u23F1\uFE0F","\u23F1"],"","",["stopwatch"],47,23,23,0],
		"23f2-fe0f":[["\u23F2\uFE0F","\u23F2"],"","",["timer_clock"],47,24,23,0],
		"23f3":[["\u23F3"],"","\uDBB8\uDC1B",["hourglass_flowing_sand"],47,25,63,0],
		"23f8-fe0f":[["\u23F8\uFE0F","\u23F8"],"","",["double_vertical_bar"],47,26,23,0],
		"23f9-fe0f":[["\u23F9\uFE0F","\u23F9"],"","",["black_square_for_stop"],47,27,23,0],
		"23fa-fe0f":[["\u23FA\uFE0F","\u23FA"],"","",["black_circle_for_record"],47,28,23,0],
		"24c2-fe0f":[["\u24C2\uFE0F","\u24C2"],"","\uDBB9\uDFE1",["m"],47,29,55,0],
		"25aa-fe0f":[["\u25AA\uFE0F","\u25AA"],"","\uDBBA\uDF6E",["black_small_square"],47,30,55,0],
		"25ab-fe0f":[["\u25AB\uFE0F","\u25AB"],"","\uDBBA\uDF6D",["white_small_square"],47,31,55,0],
		"25b6-fe0f":[["\u25B6\uFE0F","\u25B6"],"\uE23A","\uDBBA\uDEFC",["arrow_forward"],47,32,55,0],
		"25c0-fe0f":[["\u25C0\uFE0F","\u25C0"],"\uE23B","\uDBBA\uDEFD",["arrow_backward"],47,33,55,0],
		"25fb-fe0f":[["\u25FB\uFE0F","\u25FB"],"","\uDBBA\uDF71",["white_medium_square"],47,34,55,0],
		"25fc-fe0f":[["\u25FC\uFE0F","\u25FC"],"","\uDBBA\uDF72",["black_medium_square"],47,35,55,0],
		"25fd":[["\u25FD"],"","\uDBBA\uDF6F",["white_medium_small_square"],47,36,63,0],
		"25fe":[["\u25FE"],"","\uDBBA\uDF70",["black_medium_small_square"],47,37,63,0],
		"2600-fe0f":[["\u2600\uFE0F","\u2600"],"\uE04A","\uDBB8\uDC00",["sunny"],47,38,55,0],
		"2601-fe0f":[["\u2601\uFE0F","\u2601"],"\uE049","\uDBB8\uDC01",["cloud"],47,39,55,0],
		"2602-fe0f":[["\u2602\uFE0F","\u2602"],"","",["umbrella"],47,40,23,0],
		"2603-fe0f":[["\u2603\uFE0F","\u2603"],"","",["snowman"],47,41,23,0],
		"2604-fe0f":[["\u2604\uFE0F","\u2604"],"","",["comet"],47,42,23,0],
		"260e-fe0f":[["\u260E\uFE0F","\u260E"],"\uE009","\uDBB9\uDD23",["phone","telephone"],47,43,55,0],
		"2611-fe0f":[["\u2611\uFE0F","\u2611"],"","\uDBBA\uDF8B",["ballot_box_with_check"],47,44,55,0],
		"2614":[["\u2614"],"\uE04B","\uDBB8\uDC02",["umbrella_with_rain_drops"],47,45,63,0],
		"2615":[["\u2615"],"\uE045","\uDBBA\uDD81",["coffee"],47,46,63,0],
		"2618-fe0f":[["\u2618\uFE0F","\u2618"],"","",["shamrock"],47,47,23,0],
		"261d-fe0f":[["\u261D\uFE0F","\u261D"],"\uE00F","\uDBBA\uDF98",["point_up"],47,48,55,0],
		"2620-fe0f":[["\u2620\uFE0F","\u2620"],"","",["skull_and_crossbones"],47,49,23,0],
		"2622-fe0f":[["\u2622\uFE0F","\u2622"],"","",["radioactive_sign"],47,50,23,0],
		"2623-fe0f":[["\u2623\uFE0F","\u2623"],"","",["biohazard_sign"],48,0,23,0],
		"2626-fe0f":[["\u2626\uFE0F","\u2626"],"","",["orthodox_cross"],48,1,23,0],
		"262a-fe0f":[["\u262A\uFE0F","\u262A"],"","",["star_and_crescent"],48,2,23,0],
		"262e-fe0f":[["\u262E\uFE0F","\u262E"],"","",["peace_symbol"],48,3,23,0],
		"262f-fe0f":[["\u262F\uFE0F","\u262F"],"","",["yin_yang"],48,4,23,0],
		"2638-fe0f":[["\u2638\uFE0F","\u2638"],"","",["wheel_of_dharma"],48,5,23,0],
		"2639-fe0f":[["\u2639\uFE0F","\u2639"],"","",["white_frowning_face"],48,6,23,0],
		"263a-fe0f":[["\u263A\uFE0F","\u263A"],"\uE414","\uDBB8\uDF36",["relaxed"],48,7,55,0],
		"2640-fe0f":[["\u2640\uFE0F","\u2640"],"","",["female_sign"],48,8,22,0],
		"2642-fe0f":[["\u2642\uFE0F","\u2642"],"","",["male_sign"],48,9,22,0],
		"2648":[["\u2648"],"\uE23F","\uDBB8\uDC2B",["aries"],48,10,63,0],
		"2649":[["\u2649"],"\uE240","\uDBB8\uDC2C",["taurus"],48,11,63,0],
		"264a":[["\u264A"],"\uE241","\uDBB8\uDC2D",["gemini"],48,12,63,0],
		"264b":[["\u264B"],"\uE242","\uDBB8\uDC2E",["cancer"],48,13,63,0],
		"264c":[["\u264C"],"\uE243","\uDBB8\uDC2F",["leo"],48,14,63,0],
		"264d":[["\u264D"],"\uE244","\uDBB8\uDC30",["virgo"],48,15,63,0],
		"264e":[["\u264E"],"\uE245","\uDBB8\uDC31",["libra"],48,16,63,0],
		"264f":[["\u264F"],"\uE246","\uDBB8\uDC32",["scorpius"],48,17,63,0],
		"2650":[["\u2650"],"\uE247","\uDBB8\uDC33",["sagittarius"],48,18,63,0],
		"2651":[["\u2651"],"\uE248","\uDBB8\uDC34",["capricorn"],48,19,63,0],
		"2652":[["\u2652"],"\uE249","\uDBB8\uDC35",["aquarius"],48,20,63,0],
		"2653":[["\u2653"],"\uE24A","\uDBB8\uDC36",["pisces"],48,21,63,0],
		"2660-fe0f":[["\u2660\uFE0F","\u2660"],"\uE20E","\uDBBA\uDF1B",["spades"],48,22,55,0],
		"2663-fe0f":[["\u2663\uFE0F","\u2663"],"\uE20F","\uDBBA\uDF1D",["clubs"],48,23,55,0],
		"2665-fe0f":[["\u2665\uFE0F","\u2665"],"\uE20C","\uDBBA\uDF1A",["hearts"],48,24,55,0],
		"2666-fe0f":[["\u2666\uFE0F","\u2666"],"\uE20D","\uDBBA\uDF1C",["diamonds"],48,25,55,0],
		"2668-fe0f":[["\u2668\uFE0F","\u2668"],"\uE123","\uDBB9\uDFFA",["hotsprings"],48,26,55,0],
		"267b-fe0f":[["\u267B\uFE0F","\u267B"],"","\uDBBA\uDF2C",["recycle"],48,27,55,0],
		"267f":[["\u267F"],"\uE20A","\uDBBA\uDF20",["wheelchair"],48,28,63,0],
		"2692-fe0f":[["\u2692\uFE0F","\u2692"],"","",["hammer_and_pick"],48,29,23,0],
		"2693":[["\u2693"],"","\uDBB9\uDCC1",["anchor"],48,30,63,0],
		"2694-fe0f":[["\u2694\uFE0F","\u2694"],"","",["crossed_swords"],48,31,23,0],
		"2695-fe0f":[["\u2695\uFE0F","\u2695"],"","",["staff_of_aesculapius"],48,32,22,0],
		"2696-fe0f":[["\u2696\uFE0F","\u2696"],"","",["scales"],48,33,23,0],
		"2697-fe0f":[["\u2697\uFE0F","\u2697"],"","",["alembic"],48,34,23,0],
		"2699-fe0f":[["\u2699\uFE0F","\u2699"],"","",["gear"],48,35,23,0],
		"269b-fe0f":[["\u269B\uFE0F","\u269B"],"","",["atom_symbol"],48,36,23,0],
		"269c-fe0f":[["\u269C\uFE0F","\u269C"],"","",["fleur_de_lis"],48,37,23,0],
		"26a0-fe0f":[["\u26A0\uFE0F","\u26A0"],"\uE252","\uDBBA\uDF23",["warning"],48,38,55,0],
		"26a1":[["\u26A1"],"\uE13D","\uDBB8\uDC04",["zap"],48,39,63,0],
		"26aa":[["\u26AA"],"","\uDBBA\uDF65",["white_circle"],48,40,63,0],
		"26ab":[["\u26AB"],"","\uDBBA\uDF66",["black_circle"],48,41,63,0],
		"26b0-fe0f":[["\u26B0\uFE0F","\u26B0"],"","",["coffin"],48,42,23,0],
		"26b1-fe0f":[["\u26B1\uFE0F","\u26B1"],"","",["funeral_urn"],48,43,23,0],
		"26bd":[["\u26BD"],"\uE018","\uDBB9\uDFD4",["soccer"],48,44,63,0],
		"26be":[["\u26BE"],"\uE016","\uDBB9\uDFD1",["baseball"],48,45,63,0],
		"26c4":[["\u26C4"],"\uE048","\uDBB8\uDC03",["snowman_without_snow"],48,46,63,0],
		"26c5":[["\u26C5"],"","\uDBB8\uDC0F",["partly_sunny"],48,47,63,0],
		"26c8-fe0f":[["\u26C8\uFE0F","\u26C8"],"","",["thunder_cloud_and_rain"],48,48,23,0],
		"26ce":[["\u26CE"],"\uE24B","\uDBB8\uDC37",["ophiuchus"],48,49,63,0],
		"26cf-fe0f":[["\u26CF\uFE0F","\u26CF"],"","",["pick"],48,50,23,0],
		"26d1-fe0f":[["\u26D1\uFE0F","\u26D1"],"","",["helmet_with_white_cross"],49,0,23,0],
		"26d3-fe0f":[["\u26D3\uFE0F","\u26D3"],"","",["chains"],49,1,23,0],
		"26d4":[["\u26D4"],"","\uDBBA\uDF26",["no_entry"],49,2,63,0],
		"26e9-fe0f":[["\u26E9\uFE0F","\u26E9"],"","",["shinto_shrine"],49,3,23,0],
		"26ea":[["\u26EA"],"\uE037","\uDBB9\uDCBB",["church"],49,4,63,0],
		"26f0-fe0f":[["\u26F0\uFE0F","\u26F0"],"","",["mountain"],49,5,23,0],
		"26f1-fe0f":[["\u26F1\uFE0F","\u26F1"],"","",["umbrella_on_ground"],49,6,23,0],
		"26f2":[["\u26F2"],"\uE121","\uDBB9\uDCBC",["fountain"],49,7,63,0],
		"26f3":[["\u26F3"],"\uE014","\uDBB9\uDFD2",["golf"],49,8,63,0],
		"26f4-fe0f":[["\u26F4\uFE0F","\u26F4"],"","",["ferry"],49,9,23,0],
		"26f5":[["\u26F5"],"\uE01C","\uDBB9\uDFEA",["boat","sailboat"],49,10,63,0],
		"26f7-fe0f":[["\u26F7\uFE0F","\u26F7"],"","",["skier"],49,11,23,0],
		"26f8-fe0f":[["\u26F8\uFE0F","\u26F8"],"","",["ice_skate"],49,12,23,0],
		"26f9-fe0f-200d-2640-fe0f":[["\u26F9\uFE0F\u200D\u2640\uFE0F"],"","",["woman-bouncing-ball"],49,13,7,0],
		"26f9-fe0f-200d-2642-fe0f":[["\u26F9\uFE0F\u200D\u2642\uFE0F","\u26F9\uFE0F","\u26F9"],"","",["man-bouncing-ball","person_with_ball"],49,19,7,0],
		"26fa":[["\u26FA"],"\uE122","\uDBB9\uDFFB",["tent"],49,26,63,0],
		"26fd":[["\u26FD"],"\uE03A","\uDBB9\uDFF5",["fuelpump"],49,27,63,0],
		"2702-fe0f":[["\u2702\uFE0F","\u2702"],"\uE313","\uDBB9\uDD3E",["scissors"],49,28,55,0],
		"2705":[["\u2705"],"","\uDBBA\uDF4A",["white_check_mark"],49,29,63,0],
		"2708-fe0f":[["\u2708\uFE0F","\u2708"],"\uE01D","\uDBB9\uDFE9",["airplane"],49,30,55,0],
		"2709-fe0f":[["\u2709\uFE0F","\u2709"],"","\uDBB9\uDD29",["email","envelope"],49,31,55,0],
		"270a":[["\u270A"],"\uE010","\uDBBA\uDF93",["fist"],49,32,63,0],
		"270b":[["\u270B"],"\uE012","\uDBBA\uDF95",["hand","raised_hand"],49,38,63,0],
		"270c-fe0f":[["\u270C\uFE0F","\u270C"],"\uE011","\uDBBA\uDF94",["v"],49,44,55,0],
		"270d-fe0f":[["\u270D\uFE0F","\u270D"],"","",["writing_hand"],49,45,23,0],
		"270f-fe0f":[["\u270F\uFE0F","\u270F"],"","\uDBB9\uDD39",["pencil2"],49,46,55,0],
		"2712-fe0f":[["\u2712\uFE0F","\u2712"],"","\uDBB9\uDD36",["black_nib"],49,47,55,0],
		"2714-fe0f":[["\u2714\uFE0F","\u2714"],"","\uDBBA\uDF49",["heavy_check_mark"],49,48,55,0],
		"2716-fe0f":[["\u2716\uFE0F","\u2716"],"","\uDBBA\uDF53",["heavy_multiplication_x"],49,49,55,0],
		"271d-fe0f":[["\u271D\uFE0F","\u271D"],"","",["latin_cross"],49,50,23,0],
		"2721-fe0f":[["\u2721\uFE0F","\u2721"],"","",["star_of_david"],50,0,23,0],
		"2728":[["\u2728"],"\uE32E","\uDBBA\uDF60",["sparkles"],50,1,63,0],
		"2733-fe0f":[["\u2733\uFE0F","\u2733"],"\uE206","\uDBBA\uDF62",["eight_spoked_asterisk"],50,2,55,0],
		"2734-fe0f":[["\u2734\uFE0F","\u2734"],"\uE205","\uDBBA\uDF61",["eight_pointed_black_star"],50,3,55,0],
		"2744-fe0f":[["\u2744\uFE0F","\u2744"],"","\uDBB8\uDC0E",["snowflake"],50,4,55,0],
		"2747-fe0f":[["\u2747\uFE0F","\u2747"],"","\uDBBA\uDF77",["sparkle"],50,5,55,0],
		"274c":[["\u274C"],"\uE333","\uDBBA\uDF45",["x"],50,6,63,0],
		"274e":[["\u274E"],"","\uDBBA\uDF46",["negative_squared_cross_mark"],50,7,63,0],
		"2753":[["\u2753"],"\uE020","\uDBBA\uDF09",["question"],50,8,63,0],
		"2754":[["\u2754"],"\uE336","\uDBBA\uDF0A",["grey_question"],50,9,63,0],
		"2755":[["\u2755"],"\uE337","\uDBBA\uDF0B",["grey_exclamation"],50,10,63,0],
		"2757":[["\u2757"],"\uE021","\uDBBA\uDF04",["exclamation","heavy_exclamation_mark"],50,11,63,0],
		"2763-fe0f":[["\u2763\uFE0F","\u2763"],"","",["heavy_heart_exclamation_mark_ornament"],50,12,23,0],
		"2764-fe0f":[["\u2764\uFE0F","\u2764"],"\uE022","\uDBBA\uDF0C",["heart"],50,13,55,0,"<3"],
		"2795":[["\u2795"],"","\uDBBA\uDF51",["heavy_plus_sign"],50,14,63,0],
		"2796":[["\u2796"],"","\uDBBA\uDF52",["heavy_minus_sign"],50,15,63,0],
		"2797":[["\u2797"],"","\uDBBA\uDF54",["heavy_division_sign"],50,16,63,0],
		"27a1-fe0f":[["\u27A1\uFE0F","\u27A1"],"\uE234","\uDBBA\uDEFA",["arrow_right"],50,17,55,0],
		"27b0":[["\u27B0"],"","\uDBBA\uDF08",["curly_loop"],50,18,63,0],
		"27bf":[["\u27BF"],"\uE211","\uDBBA\uDC2B",["loop"],50,19,63,0],
		"2934-fe0f":[["\u2934\uFE0F","\u2934"],"","\uDBBA\uDEF4",["arrow_heading_up"],50,20,55,0],
		"2935-fe0f":[["\u2935\uFE0F","\u2935"],"","\uDBBA\uDEF5",["arrow_heading_down"],50,21,55,0],
		"2b05-fe0f":[["\u2B05\uFE0F","\u2B05"],"\uE235","\uDBBA\uDEFB",["arrow_left"],50,22,55,0],
		"2b06-fe0f":[["\u2B06\uFE0F","\u2B06"],"\uE232","\uDBBA\uDEF8",["arrow_up"],50,23,55,0],
		"2b07-fe0f":[["\u2B07\uFE0F","\u2B07"],"\uE233","\uDBBA\uDEF9",["arrow_down"],50,24,55,0],
		"2b1b":[["\u2B1B"],"","\uDBBA\uDF6C",["black_large_square"],50,25,63,0],
		"2b1c":[["\u2B1C"],"","\uDBBA\uDF6B",["white_large_square"],50,26,63,0],
		"2b50":[["\u2B50"],"\uE32F","\uDBBA\uDF68",["star"],50,27,63,0],
		"2b55":[["\u2B55"],"\uE332","\uDBBA\uDF44",["o"],50,28,63,0],
		"3030-fe0f":[["\u3030\uFE0F","\u3030"],"","\uDBBA\uDF07",["wavy_dash"],50,29,55,0],
		"303d-fe0f":[["\u303D\uFE0F","\u303D"],"\uE12C","\uDBBA\uDC1B",["part_alternation_mark"],50,30,55,0],
		"3297-fe0f":[["\u3297\uFE0F","\u3297"],"\uE30D","\uDBBA\uDF43",["congratulations"],50,31,55,0],
		"3299-fe0f":[["\u3299\uFE0F","\u3299"],"\uE315","\uDBBA\uDF2B",["secret"],50,32,55,0]
	};
	/** @private */
	emoji.prototype.emoticons_data = {
		":o)":"monkey_face",
		"<\/3":"broken_heart",
		"=)":"smiley",
		"=-)":"smiley",
		"C:":"smile",
		"c:":"smile",
		":D":"smile",
		":-D":"smile",
		":>":"laughing",
		":->":"laughing",
		";)":"wink",
		";-)":"wink",
		"8)":"sunglasses",
		":|":"neutral_face",
		":-|":"neutral_face",
		":\\":"confused",
		":-\\":"confused",
		":\/":"confused",
		":-\/":"confused",
		":*":"kissing_heart",
		":-*":"kissing_heart",
		":p":"stuck_out_tongue",
		":-p":"stuck_out_tongue",
		":P":"stuck_out_tongue",
		":-P":"stuck_out_tongue",
		":b":"stuck_out_tongue",
		":-b":"stuck_out_tongue",
		";p":"stuck_out_tongue_winking_eye",
		";-p":"stuck_out_tongue_winking_eye",
		";b":"stuck_out_tongue_winking_eye",
		";-b":"stuck_out_tongue_winking_eye",
		";P":"stuck_out_tongue_winking_eye",
		";-P":"stuck_out_tongue_winking_eye",
		"):":"disappointed",
		":(":"disappointed",
		":-(":"disappointed",
		">:(":"angry",
		">:-(":"angry",
		":'(":"cry",
		"D:":"anguished",
		":o":"open_mouth",
		":-o":"open_mouth",
		":O":"open_mouth",
		":-O":"open_mouth",
		":)":"slightly_smiling_face",
		"(:":"slightly_smiling_face",
		":-)":"slightly_smiling_face",
		"<3":"heart"
	};
	/** @private */
	emoji.prototype.variations_data = {
		"1f385":{"1f3fb":["1f385-1f3fb",8,28,63,["\uD83C\uDF85\uD83C\uDFFB"]],"1f3fc":["1f385-1f3fc",8,29,63,["\uD83C\uDF85\uD83C\uDFFC"]],"1f3fd":["1f385-1f3fd",8,30,63,["\uD83C\uDF85\uD83C\uDFFD"]],"1f3fe":["1f385-1f3fe",8,31,63,["\uD83C\uDF85\uD83C\uDFFE"]],"1f3ff":["1f385-1f3ff",8,32,63,["\uD83C\uDF85\uD83C\uDFFF"]]},
		"1f3c2":{"1f3fb":["1f3c2-1f3fb",9,38,55,["\uD83C\uDFC2\uD83C\uDFFB"]],"1f3fc":["1f3c2-1f3fc",9,39,55,["\uD83C\uDFC2\uD83C\uDFFC"]],"1f3fd":["1f3c2-1f3fd",9,40,55,["\uD83C\uDFC2\uD83C\uDFFD"]],"1f3fe":["1f3c2-1f3fe",9,41,55,["\uD83C\uDFC2\uD83C\uDFFE"]],"1f3ff":["1f3c2-1f3ff",9,42,55,["\uD83C\uDFC2\uD83C\uDFFF"]]},
		"1f3c3-200d-2640-fe0f":{"1f3fb":["1f3c3-1f3fb-200d-2640-fe0f",9,44,7,["\uD83C\uDFC3\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f3c3-1f3fc-200d-2640-fe0f",9,45,7,["\uD83C\uDFC3\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f3c3-1f3fd-200d-2640-fe0f",9,46,7,["\uD83C\uDFC3\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f3c3-1f3fe-200d-2640-fe0f",9,47,7,["\uD83C\uDFC3\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f3c3-1f3ff-200d-2640-fe0f",9,48,7,["\uD83C\uDFC3\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f3c3-200d-2642-fe0f":{"1f3fb":["1f3c3-1f3fb-200d-2642-fe0f",9,50,7,["\uD83C\uDFC3\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83C\uDFC3\uD83C\uDFFB"]],"1f3fc":["1f3c3-1f3fc-200d-2642-fe0f",10,0,7,["\uD83C\uDFC3\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83C\uDFC3\uD83C\uDFFC"]],"1f3fd":["1f3c3-1f3fd-200d-2642-fe0f",10,1,7,["\uD83C\uDFC3\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83C\uDFC3\uD83C\uDFFD"]],"1f3fe":["1f3c3-1f3fe-200d-2642-fe0f",10,2,7,["\uD83C\uDFC3\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83C\uDFC3\uD83C\uDFFE"]],"1f3ff":["1f3c3-1f3ff-200d-2642-fe0f",10,3,7,["\uD83C\uDFC3\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83C\uDFC3\uD83C\uDFFF"]]},
		"1f3c4-200d-2640-fe0f":{"1f3fb":["1f3c4-1f3fb-200d-2640-fe0f",10,11,7,["\uD83C\uDFC4\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f3c4-1f3fc-200d-2640-fe0f",10,12,7,["\uD83C\uDFC4\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f3c4-1f3fd-200d-2640-fe0f",10,13,7,["\uD83C\uDFC4\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f3c4-1f3fe-200d-2640-fe0f",10,14,7,["\uD83C\uDFC4\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f3c4-1f3ff-200d-2640-fe0f",10,15,7,["\uD83C\uDFC4\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f3c4-200d-2642-fe0f":{"1f3fb":["1f3c4-1f3fb-200d-2642-fe0f",10,17,7,["\uD83C\uDFC4\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83C\uDFC4\uD83C\uDFFB"]],"1f3fc":["1f3c4-1f3fc-200d-2642-fe0f",10,18,7,["\uD83C\uDFC4\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83C\uDFC4\uD83C\uDFFC"]],"1f3fd":["1f3c4-1f3fd-200d-2642-fe0f",10,19,7,["\uD83C\uDFC4\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83C\uDFC4\uD83C\uDFFD"]],"1f3fe":["1f3c4-1f3fe-200d-2642-fe0f",10,20,7,["\uD83C\uDFC4\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83C\uDFC4\uD83C\uDFFE"]],"1f3ff":["1f3c4-1f3ff-200d-2642-fe0f",10,21,7,["\uD83C\uDFC4\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83C\uDFC4\uD83C\uDFFF"]]},
		"1f3c7":{"1f3fb":["1f3c7-1f3fb",10,31,63,["\uD83C\uDFC7\uD83C\uDFFB"]],"1f3fc":["1f3c7-1f3fc",10,32,63,["\uD83C\uDFC7\uD83C\uDFFC"]],"1f3fd":["1f3c7-1f3fd",10,33,63,["\uD83C\uDFC7\uD83C\uDFFD"]],"1f3fe":["1f3c7-1f3fe",10,34,63,["\uD83C\uDFC7\uD83C\uDFFE"]],"1f3ff":["1f3c7-1f3ff",10,35,63,["\uD83C\uDFC7\uD83C\uDFFF"]]},
		"1f3ca-200d-2640-fe0f":{"1f3fb":["1f3ca-1f3fb-200d-2640-fe0f",10,39,7,["\uD83C\uDFCA\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f3ca-1f3fc-200d-2640-fe0f",10,40,7,["\uD83C\uDFCA\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f3ca-1f3fd-200d-2640-fe0f",10,41,7,["\uD83C\uDFCA\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f3ca-1f3fe-200d-2640-fe0f",10,42,7,["\uD83C\uDFCA\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f3ca-1f3ff-200d-2640-fe0f",10,43,7,["\uD83C\uDFCA\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f3ca-200d-2642-fe0f":{"1f3fb":["1f3ca-1f3fb-200d-2642-fe0f",10,45,7,["\uD83C\uDFCA\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83C\uDFCA\uD83C\uDFFB"]],"1f3fc":["1f3ca-1f3fc-200d-2642-fe0f",10,46,7,["\uD83C\uDFCA\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83C\uDFCA\uD83C\uDFFC"]],"1f3fd":["1f3ca-1f3fd-200d-2642-fe0f",10,47,7,["\uD83C\uDFCA\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83C\uDFCA\uD83C\uDFFD"]],"1f3fe":["1f3ca-1f3fe-200d-2642-fe0f",10,48,7,["\uD83C\uDFCA\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83C\uDFCA\uD83C\uDFFE"]],"1f3ff":["1f3ca-1f3ff-200d-2642-fe0f",10,49,7,["\uD83C\uDFCA\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83C\uDFCA\uD83C\uDFFF"]]},
		"1f3cb-fe0f-200d-2640-fe0f":{"1f3fb":["1f3cb-1f3fb-200d-2640-fe0f",11,6,7,["\uD83C\uDFCB\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f3cb-1f3fc-200d-2640-fe0f",11,7,7,["\uD83C\uDFCB\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f3cb-1f3fd-200d-2640-fe0f",11,8,7,["\uD83C\uDFCB\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f3cb-1f3fe-200d-2640-fe0f",11,9,7,["\uD83C\uDFCB\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f3cb-1f3ff-200d-2640-fe0f",11,10,7,["\uD83C\uDFCB\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f3cb-fe0f-200d-2642-fe0f":{"1f3fb":["1f3cb-1f3fb-200d-2642-fe0f",11,12,7,["\uD83C\uDFCB\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f3cb-1f3fc-200d-2642-fe0f",11,13,7,["\uD83C\uDFCB\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f3cb-1f3fd-200d-2642-fe0f",11,14,7,["\uD83C\uDFCB\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f3cb-1f3fe-200d-2642-fe0f",11,15,7,["\uD83C\uDFCB\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f3cb-1f3ff-200d-2642-fe0f",11,16,7,["\uD83C\uDFCB\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f3cc-fe0f-200d-2640-fe0f":{"1f3fb":["1f3cc-1f3fb-200d-2640-fe0f",11,19,7,["\uD83C\uDFCC\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f3cc-1f3fc-200d-2640-fe0f",11,20,7,["\uD83C\uDFCC\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f3cc-1f3fd-200d-2640-fe0f",11,21,7,["\uD83C\uDFCC\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f3cc-1f3fe-200d-2640-fe0f",11,22,7,["\uD83C\uDFCC\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f3cc-1f3ff-200d-2640-fe0f",11,23,7,["\uD83C\uDFCC\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f3cc-fe0f-200d-2642-fe0f":{"1f3fb":["1f3cc-1f3fb-200d-2642-fe0f",11,25,7,["\uD83C\uDFCC\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f3cc-1f3fc-200d-2642-fe0f",11,26,7,["\uD83C\uDFCC\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f3cc-1f3fd-200d-2642-fe0f",11,27,7,["\uD83C\uDFCC\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f3cc-1f3fe-200d-2642-fe0f",11,28,7,["\uD83C\uDFCC\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f3cc-1f3ff-200d-2642-fe0f",11,29,7,["\uD83C\uDFCC\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f442":{"1f3fb":["1f442-1f3fb",13,49,63,["\uD83D\uDC42\uD83C\uDFFB"]],"1f3fc":["1f442-1f3fc",13,50,63,["\uD83D\uDC42\uD83C\uDFFC"]],"1f3fd":["1f442-1f3fd",14,0,63,["\uD83D\uDC42\uD83C\uDFFD"]],"1f3fe":["1f442-1f3fe",14,1,63,["\uD83D\uDC42\uD83C\uDFFE"]],"1f3ff":["1f442-1f3ff",14,2,63,["\uD83D\uDC42\uD83C\uDFFF"]]},
		"1f443":{"1f3fb":["1f443-1f3fb",14,4,63,["\uD83D\uDC43\uD83C\uDFFB"]],"1f3fc":["1f443-1f3fc",14,5,63,["\uD83D\uDC43\uD83C\uDFFC"]],"1f3fd":["1f443-1f3fd",14,6,63,["\uD83D\uDC43\uD83C\uDFFD"]],"1f3fe":["1f443-1f3fe",14,7,63,["\uD83D\uDC43\uD83C\uDFFE"]],"1f3ff":["1f443-1f3ff",14,8,63,["\uD83D\uDC43\uD83C\uDFFF"]]},
		"1f446":{"1f3fb":["1f446-1f3fb",14,12,63,["\uD83D\uDC46\uD83C\uDFFB"]],"1f3fc":["1f446-1f3fc",14,13,63,["\uD83D\uDC46\uD83C\uDFFC"]],"1f3fd":["1f446-1f3fd",14,14,63,["\uD83D\uDC46\uD83C\uDFFD"]],"1f3fe":["1f446-1f3fe",14,15,63,["\uD83D\uDC46\uD83C\uDFFE"]],"1f3ff":["1f446-1f3ff",14,16,63,["\uD83D\uDC46\uD83C\uDFFF"]]},
		"1f447":{"1f3fb":["1f447-1f3fb",14,18,63,["\uD83D\uDC47\uD83C\uDFFB"]],"1f3fc":["1f447-1f3fc",14,19,63,["\uD83D\uDC47\uD83C\uDFFC"]],"1f3fd":["1f447-1f3fd",14,20,63,["\uD83D\uDC47\uD83C\uDFFD"]],"1f3fe":["1f447-1f3fe",14,21,63,["\uD83D\uDC47\uD83C\uDFFE"]],"1f3ff":["1f447-1f3ff",14,22,63,["\uD83D\uDC47\uD83C\uDFFF"]]},
		"1f448":{"1f3fb":["1f448-1f3fb",14,24,63,["\uD83D\uDC48\uD83C\uDFFB"]],"1f3fc":["1f448-1f3fc",14,25,63,["\uD83D\uDC48\uD83C\uDFFC"]],"1f3fd":["1f448-1f3fd",14,26,63,["\uD83D\uDC48\uD83C\uDFFD"]],"1f3fe":["1f448-1f3fe",14,27,63,["\uD83D\uDC48\uD83C\uDFFE"]],"1f3ff":["1f448-1f3ff",14,28,63,["\uD83D\uDC48\uD83C\uDFFF"]]},
		"1f449":{"1f3fb":["1f449-1f3fb",14,30,63,["\uD83D\uDC49\uD83C\uDFFB"]],"1f3fc":["1f449-1f3fc",14,31,63,["\uD83D\uDC49\uD83C\uDFFC"]],"1f3fd":["1f449-1f3fd",14,32,63,["\uD83D\uDC49\uD83C\uDFFD"]],"1f3fe":["1f449-1f3fe",14,33,63,["\uD83D\uDC49\uD83C\uDFFE"]],"1f3ff":["1f449-1f3ff",14,34,63,["\uD83D\uDC49\uD83C\uDFFF"]]},
		"1f44a":{"1f3fb":["1f44a-1f3fb",14,36,63,["\uD83D\uDC4A\uD83C\uDFFB"]],"1f3fc":["1f44a-1f3fc",14,37,63,["\uD83D\uDC4A\uD83C\uDFFC"]],"1f3fd":["1f44a-1f3fd",14,38,63,["\uD83D\uDC4A\uD83C\uDFFD"]],"1f3fe":["1f44a-1f3fe",14,39,63,["\uD83D\uDC4A\uD83C\uDFFE"]],"1f3ff":["1f44a-1f3ff",14,40,63,["\uD83D\uDC4A\uD83C\uDFFF"]]},
		"1f44b":{"1f3fb":["1f44b-1f3fb",14,42,63,["\uD83D\uDC4B\uD83C\uDFFB"]],"1f3fc":["1f44b-1f3fc",14,43,63,["\uD83D\uDC4B\uD83C\uDFFC"]],"1f3fd":["1f44b-1f3fd",14,44,63,["\uD83D\uDC4B\uD83C\uDFFD"]],"1f3fe":["1f44b-1f3fe",14,45,63,["\uD83D\uDC4B\uD83C\uDFFE"]],"1f3ff":["1f44b-1f3ff",14,46,63,["\uD83D\uDC4B\uD83C\uDFFF"]]},
		"1f44c":{"1f3fb":["1f44c-1f3fb",14,48,63,["\uD83D\uDC4C\uD83C\uDFFB"]],"1f3fc":["1f44c-1f3fc",14,49,63,["\uD83D\uDC4C\uD83C\uDFFC"]],"1f3fd":["1f44c-1f3fd",14,50,63,["\uD83D\uDC4C\uD83C\uDFFD"]],"1f3fe":["1f44c-1f3fe",15,0,63,["\uD83D\uDC4C\uD83C\uDFFE"]],"1f3ff":["1f44c-1f3ff",15,1,63,["\uD83D\uDC4C\uD83C\uDFFF"]]},
		"1f44d":{"1f3fb":["1f44d-1f3fb",15,3,63,["\uD83D\uDC4D\uD83C\uDFFB"]],"1f3fc":["1f44d-1f3fc",15,4,63,["\uD83D\uDC4D\uD83C\uDFFC"]],"1f3fd":["1f44d-1f3fd",15,5,63,["\uD83D\uDC4D\uD83C\uDFFD"]],"1f3fe":["1f44d-1f3fe",15,6,63,["\uD83D\uDC4D\uD83C\uDFFE"]],"1f3ff":["1f44d-1f3ff",15,7,63,["\uD83D\uDC4D\uD83C\uDFFF"]]},
		"1f44e":{"1f3fb":["1f44e-1f3fb",15,9,63,["\uD83D\uDC4E\uD83C\uDFFB"]],"1f3fc":["1f44e-1f3fc",15,10,63,["\uD83D\uDC4E\uD83C\uDFFC"]],"1f3fd":["1f44e-1f3fd",15,11,63,["\uD83D\uDC4E\uD83C\uDFFD"]],"1f3fe":["1f44e-1f3fe",15,12,63,["\uD83D\uDC4E\uD83C\uDFFE"]],"1f3ff":["1f44e-1f3ff",15,13,63,["\uD83D\uDC4E\uD83C\uDFFF"]]},
		"1f44f":{"1f3fb":["1f44f-1f3fb",15,15,63,["\uD83D\uDC4F\uD83C\uDFFB"]],"1f3fc":["1f44f-1f3fc",15,16,63,["\uD83D\uDC4F\uD83C\uDFFC"]],"1f3fd":["1f44f-1f3fd",15,17,63,["\uD83D\uDC4F\uD83C\uDFFD"]],"1f3fe":["1f44f-1f3fe",15,18,63,["\uD83D\uDC4F\uD83C\uDFFE"]],"1f3ff":["1f44f-1f3ff",15,19,63,["\uD83D\uDC4F\uD83C\uDFFF"]]},
		"1f450":{"1f3fb":["1f450-1f3fb",15,21,63,["\uD83D\uDC50\uD83C\uDFFB"]],"1f3fc":["1f450-1f3fc",15,22,63,["\uD83D\uDC50\uD83C\uDFFC"]],"1f3fd":["1f450-1f3fd",15,23,63,["\uD83D\uDC50\uD83C\uDFFD"]],"1f3fe":["1f450-1f3fe",15,24,63,["\uD83D\uDC50\uD83C\uDFFE"]],"1f3ff":["1f450-1f3ff",15,25,63,["\uD83D\uDC50\uD83C\uDFFF"]]},
		"1f466":{"1f3fb":["1f466-1f3fb",15,48,63,["\uD83D\uDC66\uD83C\uDFFB"]],"1f3fc":["1f466-1f3fc",15,49,63,["\uD83D\uDC66\uD83C\uDFFC"]],"1f3fd":["1f466-1f3fd",15,50,63,["\uD83D\uDC66\uD83C\uDFFD"]],"1f3fe":["1f466-1f3fe",16,0,63,["\uD83D\uDC66\uD83C\uDFFE"]],"1f3ff":["1f466-1f3ff",16,1,63,["\uD83D\uDC66\uD83C\uDFFF"]]},
		"1f467":{"1f3fb":["1f467-1f3fb",16,3,63,["\uD83D\uDC67\uD83C\uDFFB"]],"1f3fc":["1f467-1f3fc",16,4,63,["\uD83D\uDC67\uD83C\uDFFC"]],"1f3fd":["1f467-1f3fd",16,5,63,["\uD83D\uDC67\uD83C\uDFFD"]],"1f3fe":["1f467-1f3fe",16,6,63,["\uD83D\uDC67\uD83C\uDFFE"]],"1f3ff":["1f467-1f3ff",16,7,63,["\uD83D\uDC67\uD83C\uDFFF"]]},
		"1f468-200d-1f33e":{"1f3fb":["1f468-1f3fb-200d-1f33e",16,9,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDF3E"]],"1f3fc":["1f468-1f3fc-200d-1f33e",16,10,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDF3E"]],"1f3fd":["1f468-1f3fd-200d-1f33e",16,11,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDF3E"]],"1f3fe":["1f468-1f3fe-200d-1f33e",16,12,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDF3E"]],"1f3ff":["1f468-1f3ff-200d-1f33e",16,13,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDF3E"]]},
		"1f468-200d-1f373":{"1f3fb":["1f468-1f3fb-200d-1f373",16,15,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDF73"]],"1f3fc":["1f468-1f3fc-200d-1f373",16,16,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDF73"]],"1f3fd":["1f468-1f3fd-200d-1f373",16,17,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDF73"]],"1f3fe":["1f468-1f3fe-200d-1f373",16,18,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDF73"]],"1f3ff":["1f468-1f3ff-200d-1f373",16,19,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDF73"]]},
		"1f468-200d-1f393":{"1f3fb":["1f468-1f3fb-200d-1f393",16,21,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDF93"]],"1f3fc":["1f468-1f3fc-200d-1f393",16,22,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDF93"]],"1f3fd":["1f468-1f3fd-200d-1f393",16,23,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDF93"]],"1f3fe":["1f468-1f3fe-200d-1f393",16,24,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDF93"]],"1f3ff":["1f468-1f3ff-200d-1f393",16,25,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDF93"]]},
		"1f468-200d-1f3a4":{"1f3fb":["1f468-1f3fb-200d-1f3a4",16,27,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFA4"]],"1f3fc":["1f468-1f3fc-200d-1f3a4",16,28,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDFA4"]],"1f3fd":["1f468-1f3fd-200d-1f3a4",16,29,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDFA4"]],"1f3fe":["1f468-1f3fe-200d-1f3a4",16,30,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDFA4"]],"1f3ff":["1f468-1f3ff-200d-1f3a4",16,31,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDFA4"]]},
		"1f468-200d-1f3a8":{"1f3fb":["1f468-1f3fb-200d-1f3a8",16,33,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFA8"]],"1f3fc":["1f468-1f3fc-200d-1f3a8",16,34,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDFA8"]],"1f3fd":["1f468-1f3fd-200d-1f3a8",16,35,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDFA8"]],"1f3fe":["1f468-1f3fe-200d-1f3a8",16,36,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDFA8"]],"1f3ff":["1f468-1f3ff-200d-1f3a8",16,37,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDFA8"]]},
		"1f468-200d-1f3eb":{"1f3fb":["1f468-1f3fb-200d-1f3eb",16,39,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFEB"]],"1f3fc":["1f468-1f3fc-200d-1f3eb",16,40,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDFEB"]],"1f3fd":["1f468-1f3fd-200d-1f3eb",16,41,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDFEB"]],"1f3fe":["1f468-1f3fe-200d-1f3eb",16,42,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDFEB"]],"1f3ff":["1f468-1f3ff-200d-1f3eb",16,43,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDFEB"]]},
		"1f468-200d-1f3ed":{"1f3fb":["1f468-1f3fb-200d-1f3ed",16,45,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83C\uDFED"]],"1f3fc":["1f468-1f3fc-200d-1f3ed",16,46,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83C\uDFED"]],"1f3fd":["1f468-1f3fd-200d-1f3ed",16,47,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83C\uDFED"]],"1f3fe":["1f468-1f3fe-200d-1f3ed",16,48,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83C\uDFED"]],"1f3ff":["1f468-1f3ff-200d-1f3ed",16,49,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83C\uDFED"]]},
		"1f468-200d-1f4bb":{"1f3fb":["1f468-1f3fb-200d-1f4bb",17,15,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDCBB"]],"1f3fc":["1f468-1f3fc-200d-1f4bb",17,16,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDCBB"]],"1f3fd":["1f468-1f3fd-200d-1f4bb",17,17,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDCBB"]],"1f3fe":["1f468-1f3fe-200d-1f4bb",17,18,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDCBB"]],"1f3ff":["1f468-1f3ff-200d-1f4bb",17,19,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDCBB"]]},
		"1f468-200d-1f4bc":{"1f3fb":["1f468-1f3fb-200d-1f4bc",17,21,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDCBC"]],"1f3fc":["1f468-1f3fc-200d-1f4bc",17,22,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDCBC"]],"1f3fd":["1f468-1f3fd-200d-1f4bc",17,23,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDCBC"]],"1f3fe":["1f468-1f3fe-200d-1f4bc",17,24,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDCBC"]],"1f3ff":["1f468-1f3ff-200d-1f4bc",17,25,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDCBC"]]},
		"1f468-200d-1f527":{"1f3fb":["1f468-1f3fb-200d-1f527",17,27,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDD27"]],"1f3fc":["1f468-1f3fc-200d-1f527",17,28,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDD27"]],"1f3fd":["1f468-1f3fd-200d-1f527",17,29,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDD27"]],"1f3fe":["1f468-1f3fe-200d-1f527",17,30,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDD27"]],"1f3ff":["1f468-1f3ff-200d-1f527",17,31,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDD27"]]},
		"1f468-200d-1f52c":{"1f3fb":["1f468-1f3fb-200d-1f52c",17,33,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDD2C"]],"1f3fc":["1f468-1f3fc-200d-1f52c",17,34,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDD2C"]],"1f3fd":["1f468-1f3fd-200d-1f52c",17,35,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDD2C"]],"1f3fe":["1f468-1f3fe-200d-1f52c",17,36,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDD2C"]],"1f3ff":["1f468-1f3ff-200d-1f52c",17,37,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDD2C"]]},
		"1f468-200d-1f680":{"1f3fb":["1f468-1f3fb-200d-1f680",17,39,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDE80"]],"1f3fc":["1f468-1f3fc-200d-1f680",17,40,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDE80"]],"1f3fd":["1f468-1f3fd-200d-1f680",17,41,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDE80"]],"1f3fe":["1f468-1f3fe-200d-1f680",17,42,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDE80"]],"1f3ff":["1f468-1f3ff-200d-1f680",17,43,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDE80"]]},
		"1f468-200d-1f692":{"1f3fb":["1f468-1f3fb-200d-1f692",17,45,23,["\uD83D\uDC68\uD83C\uDFFB\u200D\uD83D\uDE92"]],"1f3fc":["1f468-1f3fc-200d-1f692",17,46,23,["\uD83D\uDC68\uD83C\uDFFC\u200D\uD83D\uDE92"]],"1f3fd":["1f468-1f3fd-200d-1f692",17,47,23,["\uD83D\uDC68\uD83C\uDFFD\u200D\uD83D\uDE92"]],"1f3fe":["1f468-1f3fe-200d-1f692",17,48,23,["\uD83D\uDC68\uD83C\uDFFE\u200D\uD83D\uDE92"]],"1f3ff":["1f468-1f3ff-200d-1f692",17,49,23,["\uD83D\uDC68\uD83C\uDFFF\u200D\uD83D\uDE92"]]},
		"1f468-200d-2695-fe0f":{"1f3fb":["1f468-1f3fb-200d-2695-fe0f",18,0,7,["\uD83D\uDC68\uD83C\uDFFB\u200D\u2695\uFE0F"]],"1f3fc":["1f468-1f3fc-200d-2695-fe0f",18,1,7,["\uD83D\uDC68\uD83C\uDFFC\u200D\u2695\uFE0F"]],"1f3fd":["1f468-1f3fd-200d-2695-fe0f",18,2,7,["\uD83D\uDC68\uD83C\uDFFD\u200D\u2695\uFE0F"]],"1f3fe":["1f468-1f3fe-200d-2695-fe0f",18,3,7,["\uD83D\uDC68\uD83C\uDFFE\u200D\u2695\uFE0F"]],"1f3ff":["1f468-1f3ff-200d-2695-fe0f",18,4,7,["\uD83D\uDC68\uD83C\uDFFF\u200D\u2695\uFE0F"]]},
		"1f468-200d-2696-fe0f":{"1f3fb":["1f468-1f3fb-200d-2696-fe0f",18,6,7,["\uD83D\uDC68\uD83C\uDFFB\u200D\u2696\uFE0F"]],"1f3fc":["1f468-1f3fc-200d-2696-fe0f",18,7,7,["\uD83D\uDC68\uD83C\uDFFC\u200D\u2696\uFE0F"]],"1f3fd":["1f468-1f3fd-200d-2696-fe0f",18,8,7,["\uD83D\uDC68\uD83C\uDFFD\u200D\u2696\uFE0F"]],"1f3fe":["1f468-1f3fe-200d-2696-fe0f",18,9,7,["\uD83D\uDC68\uD83C\uDFFE\u200D\u2696\uFE0F"]],"1f3ff":["1f468-1f3ff-200d-2696-fe0f",18,10,7,["\uD83D\uDC68\uD83C\uDFFF\u200D\u2696\uFE0F"]]},
		"1f468-200d-2708-fe0f":{"1f3fb":["1f468-1f3fb-200d-2708-fe0f",18,12,7,["\uD83D\uDC68\uD83C\uDFFB\u200D\u2708\uFE0F"]],"1f3fc":["1f468-1f3fc-200d-2708-fe0f",18,13,7,["\uD83D\uDC68\uD83C\uDFFC\u200D\u2708\uFE0F"]],"1f3fd":["1f468-1f3fd-200d-2708-fe0f",18,14,7,["\uD83D\uDC68\uD83C\uDFFD\u200D\u2708\uFE0F"]],"1f3fe":["1f468-1f3fe-200d-2708-fe0f",18,15,7,["\uD83D\uDC68\uD83C\uDFFE\u200D\u2708\uFE0F"]],"1f3ff":["1f468-1f3ff-200d-2708-fe0f",18,16,7,["\uD83D\uDC68\uD83C\uDFFF\u200D\u2708\uFE0F"]]},
		"1f468":{"1f3fb":["1f468-1f3fb",18,20,63,["\uD83D\uDC68\uD83C\uDFFB"]],"1f3fc":["1f468-1f3fc",18,21,63,["\uD83D\uDC68\uD83C\uDFFC"]],"1f3fd":["1f468-1f3fd",18,22,63,["\uD83D\uDC68\uD83C\uDFFD"]],"1f3fe":["1f468-1f3fe",18,23,63,["\uD83D\uDC68\uD83C\uDFFE"]],"1f3ff":["1f468-1f3ff",18,24,63,["\uD83D\uDC68\uD83C\uDFFF"]]},
		"1f469-200d-1f33e":{"1f3fb":["1f469-1f3fb-200d-1f33e",18,26,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDF3E"]],"1f3fc":["1f469-1f3fc-200d-1f33e",18,27,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF3E"]],"1f3fd":["1f469-1f3fd-200d-1f33e",18,28,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDF3E"]],"1f3fe":["1f469-1f3fe-200d-1f33e",18,29,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDF3E"]],"1f3ff":["1f469-1f3ff-200d-1f33e",18,30,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDF3E"]]},
		"1f469-200d-1f373":{"1f3fb":["1f469-1f3fb-200d-1f373",18,32,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDF73"]],"1f3fc":["1f469-1f3fc-200d-1f373",18,33,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF73"]],"1f3fd":["1f469-1f3fd-200d-1f373",18,34,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDF73"]],"1f3fe":["1f469-1f3fe-200d-1f373",18,35,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDF73"]],"1f3ff":["1f469-1f3ff-200d-1f373",18,36,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDF73"]]},
		"1f469-200d-1f393":{"1f3fb":["1f469-1f3fb-200d-1f393",18,38,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDF93"]],"1f3fc":["1f469-1f3fc-200d-1f393",18,39,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDF93"]],"1f3fd":["1f469-1f3fd-200d-1f393",18,40,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDF93"]],"1f3fe":["1f469-1f3fe-200d-1f393",18,41,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDF93"]],"1f3ff":["1f469-1f3ff-200d-1f393",18,42,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDF93"]]},
		"1f469-200d-1f3a4":{"1f3fb":["1f469-1f3fb-200d-1f3a4",18,44,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFA4"]],"1f3fc":["1f469-1f3fc-200d-1f3a4",18,45,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDFA4"]],"1f3fd":["1f469-1f3fd-200d-1f3a4",18,46,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDFA4"]],"1f3fe":["1f469-1f3fe-200d-1f3a4",18,47,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDFA4"]],"1f3ff":["1f469-1f3ff-200d-1f3a4",18,48,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDFA4"]]},
		"1f469-200d-1f3a8":{"1f3fb":["1f469-1f3fb-200d-1f3a8",18,50,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFA8"]],"1f3fc":["1f469-1f3fc-200d-1f3a8",19,0,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDFA8"]],"1f3fd":["1f469-1f3fd-200d-1f3a8",19,1,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDFA8"]],"1f3fe":["1f469-1f3fe-200d-1f3a8",19,2,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDFA8"]],"1f3ff":["1f469-1f3ff-200d-1f3a8",19,3,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDFA8"]]},
		"1f469-200d-1f3eb":{"1f3fb":["1f469-1f3fb-200d-1f3eb",19,5,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFEB"]],"1f3fc":["1f469-1f3fc-200d-1f3eb",19,6,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDFEB"]],"1f3fd":["1f469-1f3fd-200d-1f3eb",19,7,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDFEB"]],"1f3fe":["1f469-1f3fe-200d-1f3eb",19,8,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDFEB"]],"1f3ff":["1f469-1f3ff-200d-1f3eb",19,9,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDFEB"]]},
		"1f469-200d-1f3ed":{"1f3fb":["1f469-1f3fb-200d-1f3ed",19,11,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83C\uDFED"]],"1f3fc":["1f469-1f3fc-200d-1f3ed",19,12,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83C\uDFED"]],"1f3fd":["1f469-1f3fd-200d-1f3ed",19,13,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83C\uDFED"]],"1f3fe":["1f469-1f3fe-200d-1f3ed",19,14,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83C\uDFED"]],"1f3ff":["1f469-1f3ff-200d-1f3ed",19,15,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83C\uDFED"]]},
		"1f469-200d-1f4bb":{"1f3fb":["1f469-1f3fb-200d-1f4bb",19,27,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDCBB"]],"1f3fc":["1f469-1f3fc-200d-1f4bb",19,28,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDCBB"]],"1f3fd":["1f469-1f3fd-200d-1f4bb",19,29,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDCBB"]],"1f3fe":["1f469-1f3fe-200d-1f4bb",19,30,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDCBB"]],"1f3ff":["1f469-1f3ff-200d-1f4bb",19,31,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDCBB"]]},
		"1f469-200d-1f4bc":{"1f3fb":["1f469-1f3fb-200d-1f4bc",19,33,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDCBC"]],"1f3fc":["1f469-1f3fc-200d-1f4bc",19,34,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDCBC"]],"1f3fd":["1f469-1f3fd-200d-1f4bc",19,35,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDCBC"]],"1f3fe":["1f469-1f3fe-200d-1f4bc",19,36,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDCBC"]],"1f3ff":["1f469-1f3ff-200d-1f4bc",19,37,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDCBC"]]},
		"1f469-200d-1f527":{"1f3fb":["1f469-1f3fb-200d-1f527",19,39,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDD27"]],"1f3fc":["1f469-1f3fc-200d-1f527",19,40,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDD27"]],"1f3fd":["1f469-1f3fd-200d-1f527",19,41,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDD27"]],"1f3fe":["1f469-1f3fe-200d-1f527",19,42,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDD27"]],"1f3ff":["1f469-1f3ff-200d-1f527",19,43,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDD27"]]},
		"1f469-200d-1f52c":{"1f3fb":["1f469-1f3fb-200d-1f52c",19,45,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDD2C"]],"1f3fc":["1f469-1f3fc-200d-1f52c",19,46,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDD2C"]],"1f3fd":["1f469-1f3fd-200d-1f52c",19,47,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDD2C"]],"1f3fe":["1f469-1f3fe-200d-1f52c",19,48,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDD2C"]],"1f3ff":["1f469-1f3ff-200d-1f52c",19,49,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDD2C"]]},
		"1f469-200d-1f680":{"1f3fb":["1f469-1f3fb-200d-1f680",20,0,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDE80"]],"1f3fc":["1f469-1f3fc-200d-1f680",20,1,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDE80"]],"1f3fd":["1f469-1f3fd-200d-1f680",20,2,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDE80"]],"1f3fe":["1f469-1f3fe-200d-1f680",20,3,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDE80"]],"1f3ff":["1f469-1f3ff-200d-1f680",20,4,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDE80"]]},
		"1f469-200d-1f692":{"1f3fb":["1f469-1f3fb-200d-1f692",20,6,23,["\uD83D\uDC69\uD83C\uDFFB\u200D\uD83D\uDE92"]],"1f3fc":["1f469-1f3fc-200d-1f692",20,7,23,["\uD83D\uDC69\uD83C\uDFFC\u200D\uD83D\uDE92"]],"1f3fd":["1f469-1f3fd-200d-1f692",20,8,23,["\uD83D\uDC69\uD83C\uDFFD\u200D\uD83D\uDE92"]],"1f3fe":["1f469-1f3fe-200d-1f692",20,9,23,["\uD83D\uDC69\uD83C\uDFFE\u200D\uD83D\uDE92"]],"1f3ff":["1f469-1f3ff-200d-1f692",20,10,23,["\uD83D\uDC69\uD83C\uDFFF\u200D\uD83D\uDE92"]]},
		"1f469-200d-2695-fe0f":{"1f3fb":["1f469-1f3fb-200d-2695-fe0f",20,12,7,["\uD83D\uDC69\uD83C\uDFFB\u200D\u2695\uFE0F"]],"1f3fc":["1f469-1f3fc-200d-2695-fe0f",20,13,7,["\uD83D\uDC69\uD83C\uDFFC\u200D\u2695\uFE0F"]],"1f3fd":["1f469-1f3fd-200d-2695-fe0f",20,14,7,["\uD83D\uDC69\uD83C\uDFFD\u200D\u2695\uFE0F"]],"1f3fe":["1f469-1f3fe-200d-2695-fe0f",20,15,7,["\uD83D\uDC69\uD83C\uDFFE\u200D\u2695\uFE0F"]],"1f3ff":["1f469-1f3ff-200d-2695-fe0f",20,16,7,["\uD83D\uDC69\uD83C\uDFFF\u200D\u2695\uFE0F"]]},
		"1f469-200d-2696-fe0f":{"1f3fb":["1f469-1f3fb-200d-2696-fe0f",20,18,7,["\uD83D\uDC69\uD83C\uDFFB\u200D\u2696\uFE0F"]],"1f3fc":["1f469-1f3fc-200d-2696-fe0f",20,19,7,["\uD83D\uDC69\uD83C\uDFFC\u200D\u2696\uFE0F"]],"1f3fd":["1f469-1f3fd-200d-2696-fe0f",20,20,7,["\uD83D\uDC69\uD83C\uDFFD\u200D\u2696\uFE0F"]],"1f3fe":["1f469-1f3fe-200d-2696-fe0f",20,21,7,["\uD83D\uDC69\uD83C\uDFFE\u200D\u2696\uFE0F"]],"1f3ff":["1f469-1f3ff-200d-2696-fe0f",20,22,7,["\uD83D\uDC69\uD83C\uDFFF\u200D\u2696\uFE0F"]]},
		"1f469-200d-2708-fe0f":{"1f3fb":["1f469-1f3fb-200d-2708-fe0f",20,24,7,["\uD83D\uDC69\uD83C\uDFFB\u200D\u2708\uFE0F"]],"1f3fc":["1f469-1f3fc-200d-2708-fe0f",20,25,7,["\uD83D\uDC69\uD83C\uDFFC\u200D\u2708\uFE0F"]],"1f3fd":["1f469-1f3fd-200d-2708-fe0f",20,26,7,["\uD83D\uDC69\uD83C\uDFFD\u200D\u2708\uFE0F"]],"1f3fe":["1f469-1f3fe-200d-2708-fe0f",20,27,7,["\uD83D\uDC69\uD83C\uDFFE\u200D\u2708\uFE0F"]],"1f3ff":["1f469-1f3ff-200d-2708-fe0f",20,28,7,["\uD83D\uDC69\uD83C\uDFFF\u200D\u2708\uFE0F"]]},
		"1f469":{"1f3fb":["1f469-1f3fb",20,34,63,["\uD83D\uDC69\uD83C\uDFFB"]],"1f3fc":["1f469-1f3fc",20,35,63,["\uD83D\uDC69\uD83C\uDFFC"]],"1f3fd":["1f469-1f3fd",20,36,63,["\uD83D\uDC69\uD83C\uDFFD"]],"1f3fe":["1f469-1f3fe",20,37,63,["\uD83D\uDC69\uD83C\uDFFE"]],"1f3ff":["1f469-1f3ff",20,38,63,["\uD83D\uDC69\uD83C\uDFFF"]]},
		"1f46e-200d-2640-fe0f":{"1f3fb":["1f46e-1f3fb-200d-2640-fe0f",20,44,7,["\uD83D\uDC6E\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f46e-1f3fc-200d-2640-fe0f",20,45,7,["\uD83D\uDC6E\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f46e-1f3fd-200d-2640-fe0f",20,46,7,["\uD83D\uDC6E\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f46e-1f3fe-200d-2640-fe0f",20,47,7,["\uD83D\uDC6E\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f46e-1f3ff-200d-2640-fe0f",20,48,7,["\uD83D\uDC6E\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f46e-200d-2642-fe0f":{"1f3fb":["1f46e-1f3fb-200d-2642-fe0f",20,50,7,["\uD83D\uDC6E\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDC6E\uD83C\uDFFB"]],"1f3fc":["1f46e-1f3fc-200d-2642-fe0f",21,0,7,["\uD83D\uDC6E\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDC6E\uD83C\uDFFC"]],"1f3fd":["1f46e-1f3fd-200d-2642-fe0f",21,1,7,["\uD83D\uDC6E\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDC6E\uD83C\uDFFD"]],"1f3fe":["1f46e-1f3fe-200d-2642-fe0f",21,2,7,["\uD83D\uDC6E\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDC6E\uD83C\uDFFE"]],"1f3ff":["1f46e-1f3ff-200d-2642-fe0f",21,3,7,["\uD83D\uDC6E\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDC6E\uD83C\uDFFF"]]},
		"1f470":{"1f3fb":["1f470-1f3fb",21,14,63,["\uD83D\uDC70\uD83C\uDFFB"]],"1f3fc":["1f470-1f3fc",21,15,63,["\uD83D\uDC70\uD83C\uDFFC"]],"1f3fd":["1f470-1f3fd",21,16,63,["\uD83D\uDC70\uD83C\uDFFD"]],"1f3fe":["1f470-1f3fe",21,17,63,["\uD83D\uDC70\uD83C\uDFFE"]],"1f3ff":["1f470-1f3ff",21,18,63,["\uD83D\uDC70\uD83C\uDFFF"]]},
		"1f471-200d-2640-fe0f":{"1f3fb":["1f471-1f3fb-200d-2640-fe0f",21,20,7,["\uD83D\uDC71\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f471-1f3fc-200d-2640-fe0f",21,21,7,["\uD83D\uDC71\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f471-1f3fd-200d-2640-fe0f",21,22,7,["\uD83D\uDC71\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f471-1f3fe-200d-2640-fe0f",21,23,7,["\uD83D\uDC71\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f471-1f3ff-200d-2640-fe0f",21,24,7,["\uD83D\uDC71\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f471-200d-2642-fe0f":{"1f3fb":["1f471-1f3fb-200d-2642-fe0f",21,26,7,["\uD83D\uDC71\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDC71\uD83C\uDFFB"]],"1f3fc":["1f471-1f3fc-200d-2642-fe0f",21,27,7,["\uD83D\uDC71\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDC71\uD83C\uDFFC"]],"1f3fd":["1f471-1f3fd-200d-2642-fe0f",21,28,7,["\uD83D\uDC71\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDC71\uD83C\uDFFD"]],"1f3fe":["1f471-1f3fe-200d-2642-fe0f",21,29,7,["\uD83D\uDC71\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDC71\uD83C\uDFFE"]],"1f3ff":["1f471-1f3ff-200d-2642-fe0f",21,30,7,["\uD83D\uDC71\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDC71\uD83C\uDFFF"]]},
		"1f472":{"1f3fb":["1f472-1f3fb",21,38,63,["\uD83D\uDC72\uD83C\uDFFB"]],"1f3fc":["1f472-1f3fc",21,39,63,["\uD83D\uDC72\uD83C\uDFFC"]],"1f3fd":["1f472-1f3fd",21,40,63,["\uD83D\uDC72\uD83C\uDFFD"]],"1f3fe":["1f472-1f3fe",21,41,63,["\uD83D\uDC72\uD83C\uDFFE"]],"1f3ff":["1f472-1f3ff",21,42,63,["\uD83D\uDC72\uD83C\uDFFF"]]},
		"1f473-200d-2640-fe0f":{"1f3fb":["1f473-1f3fb-200d-2640-fe0f",21,44,7,["\uD83D\uDC73\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f473-1f3fc-200d-2640-fe0f",21,45,7,["\uD83D\uDC73\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f473-1f3fd-200d-2640-fe0f",21,46,7,["\uD83D\uDC73\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f473-1f3fe-200d-2640-fe0f",21,47,7,["\uD83D\uDC73\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f473-1f3ff-200d-2640-fe0f",21,48,7,["\uD83D\uDC73\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f473-200d-2642-fe0f":{"1f3fb":["1f473-1f3fb-200d-2642-fe0f",21,50,7,["\uD83D\uDC73\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDC73\uD83C\uDFFB"]],"1f3fc":["1f473-1f3fc-200d-2642-fe0f",22,0,7,["\uD83D\uDC73\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDC73\uD83C\uDFFC"]],"1f3fd":["1f473-1f3fd-200d-2642-fe0f",22,1,7,["\uD83D\uDC73\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDC73\uD83C\uDFFD"]],"1f3fe":["1f473-1f3fe-200d-2642-fe0f",22,2,7,["\uD83D\uDC73\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDC73\uD83C\uDFFE"]],"1f3ff":["1f473-1f3ff-200d-2642-fe0f",22,3,7,["\uD83D\uDC73\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDC73\uD83C\uDFFF"]]},
		"1f474":{"1f3fb":["1f474-1f3fb",22,11,63,["\uD83D\uDC74\uD83C\uDFFB"]],"1f3fc":["1f474-1f3fc",22,12,63,["\uD83D\uDC74\uD83C\uDFFC"]],"1f3fd":["1f474-1f3fd",22,13,63,["\uD83D\uDC74\uD83C\uDFFD"]],"1f3fe":["1f474-1f3fe",22,14,63,["\uD83D\uDC74\uD83C\uDFFE"]],"1f3ff":["1f474-1f3ff",22,15,63,["\uD83D\uDC74\uD83C\uDFFF"]]},
		"1f475":{"1f3fb":["1f475-1f3fb",22,17,63,["\uD83D\uDC75\uD83C\uDFFB"]],"1f3fc":["1f475-1f3fc",22,18,63,["\uD83D\uDC75\uD83C\uDFFC"]],"1f3fd":["1f475-1f3fd",22,19,63,["\uD83D\uDC75\uD83C\uDFFD"]],"1f3fe":["1f475-1f3fe",22,20,63,["\uD83D\uDC75\uD83C\uDFFE"]],"1f3ff":["1f475-1f3ff",22,21,63,["\uD83D\uDC75\uD83C\uDFFF"]]},
		"1f476":{"1f3fb":["1f476-1f3fb",22,23,63,["\uD83D\uDC76\uD83C\uDFFB"]],"1f3fc":["1f476-1f3fc",22,24,63,["\uD83D\uDC76\uD83C\uDFFC"]],"1f3fd":["1f476-1f3fd",22,25,63,["\uD83D\uDC76\uD83C\uDFFD"]],"1f3fe":["1f476-1f3fe",22,26,63,["\uD83D\uDC76\uD83C\uDFFE"]],"1f3ff":["1f476-1f3ff",22,27,63,["\uD83D\uDC76\uD83C\uDFFF"]]},
		"1f477-200d-2640-fe0f":{"1f3fb":["1f477-1f3fb-200d-2640-fe0f",22,29,7,["\uD83D\uDC77\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f477-1f3fc-200d-2640-fe0f",22,30,7,["\uD83D\uDC77\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f477-1f3fd-200d-2640-fe0f",22,31,7,["\uD83D\uDC77\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f477-1f3fe-200d-2640-fe0f",22,32,7,["\uD83D\uDC77\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f477-1f3ff-200d-2640-fe0f",22,33,7,["\uD83D\uDC77\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f477-200d-2642-fe0f":{"1f3fb":["1f477-1f3fb-200d-2642-fe0f",22,35,7,["\uD83D\uDC77\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDC77\uD83C\uDFFB"]],"1f3fc":["1f477-1f3fc-200d-2642-fe0f",22,36,7,["\uD83D\uDC77\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDC77\uD83C\uDFFC"]],"1f3fd":["1f477-1f3fd-200d-2642-fe0f",22,37,7,["\uD83D\uDC77\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDC77\uD83C\uDFFD"]],"1f3fe":["1f477-1f3fe-200d-2642-fe0f",22,38,7,["\uD83D\uDC77\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDC77\uD83C\uDFFE"]],"1f3ff":["1f477-1f3ff-200d-2642-fe0f",22,39,7,["\uD83D\uDC77\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDC77\uD83C\uDFFF"]]},
		"1f478":{"1f3fb":["1f478-1f3fb",22,47,63,["\uD83D\uDC78\uD83C\uDFFB"]],"1f3fc":["1f478-1f3fc",22,48,63,["\uD83D\uDC78\uD83C\uDFFC"]],"1f3fd":["1f478-1f3fd",22,49,63,["\uD83D\uDC78\uD83C\uDFFD"]],"1f3fe":["1f478-1f3fe",22,50,63,["\uD83D\uDC78\uD83C\uDFFE"]],"1f3ff":["1f478-1f3ff",23,0,63,["\uD83D\uDC78\uD83C\uDFFF"]]},
		"1f47c":{"1f3fb":["1f47c-1f3fb",23,5,63,["\uD83D\uDC7C\uD83C\uDFFB"]],"1f3fc":["1f47c-1f3fc",23,6,63,["\uD83D\uDC7C\uD83C\uDFFC"]],"1f3fd":["1f47c-1f3fd",23,7,63,["\uD83D\uDC7C\uD83C\uDFFD"]],"1f3fe":["1f47c-1f3fe",23,8,63,["\uD83D\uDC7C\uD83C\uDFFE"]],"1f3ff":["1f47c-1f3ff",23,9,63,["\uD83D\uDC7C\uD83C\uDFFF"]]},
		"1f481-200d-2640-fe0f":{"1f3fb":["1f481-1f3fb-200d-2640-fe0f",23,15,7,["\uD83D\uDC81\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDC81\uD83C\uDFFB"]],"1f3fc":["1f481-1f3fc-200d-2640-fe0f",23,16,7,["\uD83D\uDC81\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDC81\uD83C\uDFFC"]],"1f3fd":["1f481-1f3fd-200d-2640-fe0f",23,17,7,["\uD83D\uDC81\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDC81\uD83C\uDFFD"]],"1f3fe":["1f481-1f3fe-200d-2640-fe0f",23,18,7,["\uD83D\uDC81\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDC81\uD83C\uDFFE"]],"1f3ff":["1f481-1f3ff-200d-2640-fe0f",23,19,7,["\uD83D\uDC81\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDC81\uD83C\uDFFF"]]},
		"1f481-200d-2642-fe0f":{"1f3fb":["1f481-1f3fb-200d-2642-fe0f",23,21,7,["\uD83D\uDC81\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f481-1f3fc-200d-2642-fe0f",23,22,7,["\uD83D\uDC81\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f481-1f3fd-200d-2642-fe0f",23,23,7,["\uD83D\uDC81\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f481-1f3fe-200d-2642-fe0f",23,24,7,["\uD83D\uDC81\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f481-1f3ff-200d-2642-fe0f",23,25,7,["\uD83D\uDC81\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f482-200d-2640-fe0f":{"1f3fb":["1f482-1f3fb-200d-2640-fe0f",23,33,7,["\uD83D\uDC82\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f482-1f3fc-200d-2640-fe0f",23,34,7,["\uD83D\uDC82\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f482-1f3fd-200d-2640-fe0f",23,35,7,["\uD83D\uDC82\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f482-1f3fe-200d-2640-fe0f",23,36,7,["\uD83D\uDC82\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f482-1f3ff-200d-2640-fe0f",23,37,7,["\uD83D\uDC82\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f482-200d-2642-fe0f":{"1f3fb":["1f482-1f3fb-200d-2642-fe0f",23,39,7,["\uD83D\uDC82\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDC82\uD83C\uDFFB"]],"1f3fc":["1f482-1f3fc-200d-2642-fe0f",23,40,7,["\uD83D\uDC82\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDC82\uD83C\uDFFC"]],"1f3fd":["1f482-1f3fd-200d-2642-fe0f",23,41,7,["\uD83D\uDC82\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDC82\uD83C\uDFFD"]],"1f3fe":["1f482-1f3fe-200d-2642-fe0f",23,42,7,["\uD83D\uDC82\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDC82\uD83C\uDFFE"]],"1f3ff":["1f482-1f3ff-200d-2642-fe0f",23,43,7,["\uD83D\uDC82\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDC82\uD83C\uDFFF"]]},
		"1f483":{"1f3fb":["1f483-1f3fb",24,0,63,["\uD83D\uDC83\uD83C\uDFFB"]],"1f3fc":["1f483-1f3fc",24,1,63,["\uD83D\uDC83\uD83C\uDFFC"]],"1f3fd":["1f483-1f3fd",24,2,63,["\uD83D\uDC83\uD83C\uDFFD"]],"1f3fe":["1f483-1f3fe",24,3,63,["\uD83D\uDC83\uD83C\uDFFE"]],"1f3ff":["1f483-1f3ff",24,4,63,["\uD83D\uDC83\uD83C\uDFFF"]]},
		"1f485":{"1f3fb":["1f485-1f3fb",24,7,63,["\uD83D\uDC85\uD83C\uDFFB"]],"1f3fc":["1f485-1f3fc",24,8,63,["\uD83D\uDC85\uD83C\uDFFC"]],"1f3fd":["1f485-1f3fd",24,9,63,["\uD83D\uDC85\uD83C\uDFFD"]],"1f3fe":["1f485-1f3fe",24,10,63,["\uD83D\uDC85\uD83C\uDFFE"]],"1f3ff":["1f485-1f3ff",24,11,63,["\uD83D\uDC85\uD83C\uDFFF"]]},
		"1f486-200d-2640-fe0f":{"1f3fb":["1f486-1f3fb-200d-2640-fe0f",24,13,7,["\uD83D\uDC86\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDC86\uD83C\uDFFB"]],"1f3fc":["1f486-1f3fc-200d-2640-fe0f",24,14,7,["\uD83D\uDC86\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDC86\uD83C\uDFFC"]],"1f3fd":["1f486-1f3fd-200d-2640-fe0f",24,15,7,["\uD83D\uDC86\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDC86\uD83C\uDFFD"]],"1f3fe":["1f486-1f3fe-200d-2640-fe0f",24,16,7,["\uD83D\uDC86\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDC86\uD83C\uDFFE"]],"1f3ff":["1f486-1f3ff-200d-2640-fe0f",24,17,7,["\uD83D\uDC86\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDC86\uD83C\uDFFF"]]},
		"1f486-200d-2642-fe0f":{"1f3fb":["1f486-1f3fb-200d-2642-fe0f",24,19,7,["\uD83D\uDC86\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f486-1f3fc-200d-2642-fe0f",24,20,7,["\uD83D\uDC86\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f486-1f3fd-200d-2642-fe0f",24,21,7,["\uD83D\uDC86\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f486-1f3fe-200d-2642-fe0f",24,22,7,["\uD83D\uDC86\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f486-1f3ff-200d-2642-fe0f",24,23,7,["\uD83D\uDC86\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f487-200d-2640-fe0f":{"1f3fb":["1f487-1f3fb-200d-2640-fe0f",24,31,7,["\uD83D\uDC87\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDC87\uD83C\uDFFB"]],"1f3fc":["1f487-1f3fc-200d-2640-fe0f",24,32,7,["\uD83D\uDC87\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDC87\uD83C\uDFFC"]],"1f3fd":["1f487-1f3fd-200d-2640-fe0f",24,33,7,["\uD83D\uDC87\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDC87\uD83C\uDFFD"]],"1f3fe":["1f487-1f3fe-200d-2640-fe0f",24,34,7,["\uD83D\uDC87\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDC87\uD83C\uDFFE"]],"1f3ff":["1f487-1f3ff-200d-2640-fe0f",24,35,7,["\uD83D\uDC87\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDC87\uD83C\uDFFF"]]},
		"1f487-200d-2642-fe0f":{"1f3fb":["1f487-1f3fb-200d-2642-fe0f",24,37,7,["\uD83D\uDC87\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f487-1f3fc-200d-2642-fe0f",24,38,7,["\uD83D\uDC87\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f487-1f3fd-200d-2642-fe0f",24,39,7,["\uD83D\uDC87\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f487-1f3fe-200d-2642-fe0f",24,40,7,["\uD83D\uDC87\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f487-1f3ff-200d-2642-fe0f",24,41,7,["\uD83D\uDC87\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f4aa":{"1f3fb":["1f4aa-1f3fb",25,32,63,["\uD83D\uDCAA\uD83C\uDFFB"]],"1f3fc":["1f4aa-1f3fc",25,33,63,["\uD83D\uDCAA\uD83C\uDFFC"]],"1f3fd":["1f4aa-1f3fd",25,34,63,["\uD83D\uDCAA\uD83C\uDFFD"]],"1f3fe":["1f4aa-1f3fe",25,35,63,["\uD83D\uDCAA\uD83C\uDFFE"]],"1f3ff":["1f4aa-1f3ff",25,36,63,["\uD83D\uDCAA\uD83C\uDFFF"]]},
		"1f575-fe0f-200d-2640-fe0f":{"1f3fb":["1f575-1f3fb-200d-2640-fe0f",29,14,7,["\uD83D\uDD75\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f575-1f3fc-200d-2640-fe0f",29,15,7,["\uD83D\uDD75\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f575-1f3fd-200d-2640-fe0f",29,16,7,["\uD83D\uDD75\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f575-1f3fe-200d-2640-fe0f",29,17,7,["\uD83D\uDD75\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f575-1f3ff-200d-2640-fe0f",29,18,7,["\uD83D\uDD75\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f575-fe0f-200d-2642-fe0f":{"1f3fb":["1f575-1f3fb-200d-2642-fe0f",29,20,7,["\uD83D\uDD75\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f575-1f3fc-200d-2642-fe0f",29,21,7,["\uD83D\uDD75\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f575-1f3fd-200d-2642-fe0f",29,22,7,["\uD83D\uDD75\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f575-1f3fe-200d-2642-fe0f",29,23,7,["\uD83D\uDD75\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f575-1f3ff-200d-2642-fe0f",29,24,7,["\uD83D\uDD75\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f57a":{"1f3fb":["1f57a-1f3fb",29,31,31,["\uD83D\uDD7A\uD83C\uDFFB"]],"1f3fc":["1f57a-1f3fc",29,32,31,["\uD83D\uDD7A\uD83C\uDFFC"]],"1f3fd":["1f57a-1f3fd",29,33,31,["\uD83D\uDD7A\uD83C\uDFFD"]],"1f3fe":["1f57a-1f3fe",29,34,31,["\uD83D\uDD7A\uD83C\uDFFE"]],"1f3ff":["1f57a-1f3ff",29,35,31,["\uD83D\uDD7A\uD83C\uDFFF"]]},
		"1f595":{"1f3fb":["1f595-1f3fb",29,43,31,["\uD83D\uDD95\uD83C\uDFFB"]],"1f3fc":["1f595-1f3fc",29,44,31,["\uD83D\uDD95\uD83C\uDFFC"]],"1f3fd":["1f595-1f3fd",29,45,31,["\uD83D\uDD95\uD83C\uDFFD"]],"1f3fe":["1f595-1f3fe",29,46,31,["\uD83D\uDD95\uD83C\uDFFE"]],"1f3ff":["1f595-1f3ff",29,47,31,["\uD83D\uDD95\uD83C\uDFFF"]]},
		"1f596":{"1f3fb":["1f596-1f3fb",29,49,31,["\uD83D\uDD96\uD83C\uDFFB"]],"1f3fc":["1f596-1f3fc",29,50,31,["\uD83D\uDD96\uD83C\uDFFC"]],"1f3fd":["1f596-1f3fd",30,0,31,["\uD83D\uDD96\uD83C\uDFFD"]],"1f3fe":["1f596-1f3fe",30,1,31,["\uD83D\uDD96\uD83C\uDFFE"]],"1f3ff":["1f596-1f3ff",30,2,31,["\uD83D\uDD96\uD83C\uDFFF"]]},
		"1f645-200d-2640-fe0f":{"1f3fb":["1f645-1f3fb-200d-2640-fe0f",31,48,7,["\uD83D\uDE45\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDE45\uD83C\uDFFB"]],"1f3fc":["1f645-1f3fc-200d-2640-fe0f",31,49,7,["\uD83D\uDE45\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDE45\uD83C\uDFFC"]],"1f3fd":["1f645-1f3fd-200d-2640-fe0f",31,50,7,["\uD83D\uDE45\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDE45\uD83C\uDFFD"]],"1f3fe":["1f645-1f3fe-200d-2640-fe0f",32,0,7,["\uD83D\uDE45\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDE45\uD83C\uDFFE"]],"1f3ff":["1f645-1f3ff-200d-2640-fe0f",32,1,7,["\uD83D\uDE45\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDE45\uD83C\uDFFF"]]},
		"1f645-200d-2642-fe0f":{"1f3fb":["1f645-1f3fb-200d-2642-fe0f",32,3,7,["\uD83D\uDE45\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f645-1f3fc-200d-2642-fe0f",32,4,7,["\uD83D\uDE45\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f645-1f3fd-200d-2642-fe0f",32,5,7,["\uD83D\uDE45\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f645-1f3fe-200d-2642-fe0f",32,6,7,["\uD83D\uDE45\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f645-1f3ff-200d-2642-fe0f",32,7,7,["\uD83D\uDE45\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f646-200d-2640-fe0f":{"1f3fb":["1f646-1f3fb-200d-2640-fe0f",32,15,7,["\uD83D\uDE46\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDE46\uD83C\uDFFB"]],"1f3fc":["1f646-1f3fc-200d-2640-fe0f",32,16,7,["\uD83D\uDE46\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDE46\uD83C\uDFFC"]],"1f3fd":["1f646-1f3fd-200d-2640-fe0f",32,17,7,["\uD83D\uDE46\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDE46\uD83C\uDFFD"]],"1f3fe":["1f646-1f3fe-200d-2640-fe0f",32,18,7,["\uD83D\uDE46\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDE46\uD83C\uDFFE"]],"1f3ff":["1f646-1f3ff-200d-2640-fe0f",32,19,7,["\uD83D\uDE46\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDE46\uD83C\uDFFF"]]},
		"1f646-200d-2642-fe0f":{"1f3fb":["1f646-1f3fb-200d-2642-fe0f",32,21,7,["\uD83D\uDE46\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f646-1f3fc-200d-2642-fe0f",32,22,7,["\uD83D\uDE46\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f646-1f3fd-200d-2642-fe0f",32,23,7,["\uD83D\uDE46\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f646-1f3fe-200d-2642-fe0f",32,24,7,["\uD83D\uDE46\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f646-1f3ff-200d-2642-fe0f",32,25,7,["\uD83D\uDE46\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f647-200d-2640-fe0f":{"1f3fb":["1f647-1f3fb-200d-2640-fe0f",32,33,7,["\uD83D\uDE47\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f647-1f3fc-200d-2640-fe0f",32,34,7,["\uD83D\uDE47\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f647-1f3fd-200d-2640-fe0f",32,35,7,["\uD83D\uDE47\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f647-1f3fe-200d-2640-fe0f",32,36,7,["\uD83D\uDE47\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f647-1f3ff-200d-2640-fe0f",32,37,7,["\uD83D\uDE47\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f647-200d-2642-fe0f":{"1f3fb":["1f647-1f3fb-200d-2642-fe0f",32,39,7,["\uD83D\uDE47\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDE47\uD83C\uDFFB"]],"1f3fc":["1f647-1f3fc-200d-2642-fe0f",32,40,7,["\uD83D\uDE47\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDE47\uD83C\uDFFC"]],"1f3fd":["1f647-1f3fd-200d-2642-fe0f",32,41,7,["\uD83D\uDE47\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDE47\uD83C\uDFFD"]],"1f3fe":["1f647-1f3fe-200d-2642-fe0f",32,42,7,["\uD83D\uDE47\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDE47\uD83C\uDFFE"]],"1f3ff":["1f647-1f3ff-200d-2642-fe0f",32,43,7,["\uD83D\uDE47\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDE47\uD83C\uDFFF"]]},
		"1f64b-200d-2640-fe0f":{"1f3fb":["1f64b-1f3fb-200d-2640-fe0f",33,3,7,["\uD83D\uDE4B\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDE4B\uD83C\uDFFB"]],"1f3fc":["1f64b-1f3fc-200d-2640-fe0f",33,4,7,["\uD83D\uDE4B\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDE4B\uD83C\uDFFC"]],"1f3fd":["1f64b-1f3fd-200d-2640-fe0f",33,5,7,["\uD83D\uDE4B\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDE4B\uD83C\uDFFD"]],"1f3fe":["1f64b-1f3fe-200d-2640-fe0f",33,6,7,["\uD83D\uDE4B\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDE4B\uD83C\uDFFE"]],"1f3ff":["1f64b-1f3ff-200d-2640-fe0f",33,7,7,["\uD83D\uDE4B\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDE4B\uD83C\uDFFF"]]},
		"1f64b-200d-2642-fe0f":{"1f3fb":["1f64b-1f3fb-200d-2642-fe0f",33,9,7,["\uD83D\uDE4B\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f64b-1f3fc-200d-2642-fe0f",33,10,7,["\uD83D\uDE4B\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f64b-1f3fd-200d-2642-fe0f",33,11,7,["\uD83D\uDE4B\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f64b-1f3fe-200d-2642-fe0f",33,12,7,["\uD83D\uDE4B\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f64b-1f3ff-200d-2642-fe0f",33,13,7,["\uD83D\uDE4B\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f64c":{"1f3fb":["1f64c-1f3fb",33,21,63,["\uD83D\uDE4C\uD83C\uDFFB"]],"1f3fc":["1f64c-1f3fc",33,22,63,["\uD83D\uDE4C\uD83C\uDFFC"]],"1f3fd":["1f64c-1f3fd",33,23,63,["\uD83D\uDE4C\uD83C\uDFFD"]],"1f3fe":["1f64c-1f3fe",33,24,63,["\uD83D\uDE4C\uD83C\uDFFE"]],"1f3ff":["1f64c-1f3ff",33,25,63,["\uD83D\uDE4C\uD83C\uDFFF"]]},
		"1f64d-200d-2640-fe0f":{"1f3fb":["1f64d-1f3fb-200d-2640-fe0f",33,27,7,["\uD83D\uDE4D\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDE4D\uD83C\uDFFB"]],"1f3fc":["1f64d-1f3fc-200d-2640-fe0f",33,28,7,["\uD83D\uDE4D\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDE4D\uD83C\uDFFC"]],"1f3fd":["1f64d-1f3fd-200d-2640-fe0f",33,29,7,["\uD83D\uDE4D\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDE4D\uD83C\uDFFD"]],"1f3fe":["1f64d-1f3fe-200d-2640-fe0f",33,30,7,["\uD83D\uDE4D\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDE4D\uD83C\uDFFE"]],"1f3ff":["1f64d-1f3ff-200d-2640-fe0f",33,31,7,["\uD83D\uDE4D\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDE4D\uD83C\uDFFF"]]},
		"1f64d-200d-2642-fe0f":{"1f3fb":["1f64d-1f3fb-200d-2642-fe0f",33,33,7,["\uD83D\uDE4D\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f64d-1f3fc-200d-2642-fe0f",33,34,7,["\uD83D\uDE4D\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f64d-1f3fd-200d-2642-fe0f",33,35,7,["\uD83D\uDE4D\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f64d-1f3fe-200d-2642-fe0f",33,36,7,["\uD83D\uDE4D\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f64d-1f3ff-200d-2642-fe0f",33,37,7,["\uD83D\uDE4D\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f64e-200d-2640-fe0f":{"1f3fb":["1f64e-1f3fb-200d-2640-fe0f",33,45,7,["\uD83D\uDE4E\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83D\uDE4E\uD83C\uDFFB"]],"1f3fc":["1f64e-1f3fc-200d-2640-fe0f",33,46,7,["\uD83D\uDE4E\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83D\uDE4E\uD83C\uDFFC"]],"1f3fd":["1f64e-1f3fd-200d-2640-fe0f",33,47,7,["\uD83D\uDE4E\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83D\uDE4E\uD83C\uDFFD"]],"1f3fe":["1f64e-1f3fe-200d-2640-fe0f",33,48,7,["\uD83D\uDE4E\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83D\uDE4E\uD83C\uDFFE"]],"1f3ff":["1f64e-1f3ff-200d-2640-fe0f",33,49,7,["\uD83D\uDE4E\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83D\uDE4E\uD83C\uDFFF"]]},
		"1f64e-200d-2642-fe0f":{"1f3fb":["1f64e-1f3fb-200d-2642-fe0f",34,0,7,["\uD83D\uDE4E\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f64e-1f3fc-200d-2642-fe0f",34,1,7,["\uD83D\uDE4E\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f64e-1f3fd-200d-2642-fe0f",34,2,7,["\uD83D\uDE4E\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f64e-1f3fe-200d-2642-fe0f",34,3,7,["\uD83D\uDE4E\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f64e-1f3ff-200d-2642-fe0f",34,4,7,["\uD83D\uDE4E\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f64f":{"1f3fb":["1f64f-1f3fb",34,12,63,["\uD83D\uDE4F\uD83C\uDFFB"]],"1f3fc":["1f64f-1f3fc",34,13,63,["\uD83D\uDE4F\uD83C\uDFFC"]],"1f3fd":["1f64f-1f3fd",34,14,63,["\uD83D\uDE4F\uD83C\uDFFD"]],"1f3fe":["1f64f-1f3fe",34,15,63,["\uD83D\uDE4F\uD83C\uDFFE"]],"1f3ff":["1f64f-1f3ff",34,16,63,["\uD83D\uDE4F\uD83C\uDFFF"]]},
		"1f6a3-200d-2640-fe0f":{"1f3fb":["1f6a3-1f3fb-200d-2640-fe0f",35,2,7,["\uD83D\uDEA3\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f6a3-1f3fc-200d-2640-fe0f",35,3,7,["\uD83D\uDEA3\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f6a3-1f3fd-200d-2640-fe0f",35,4,7,["\uD83D\uDEA3\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f6a3-1f3fe-200d-2640-fe0f",35,5,7,["\uD83D\uDEA3\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f6a3-1f3ff-200d-2640-fe0f",35,6,7,["\uD83D\uDEA3\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f6a3-200d-2642-fe0f":{"1f3fb":["1f6a3-1f3fb-200d-2642-fe0f",35,8,7,["\uD83D\uDEA3\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDEA3\uD83C\uDFFB"]],"1f3fc":["1f6a3-1f3fc-200d-2642-fe0f",35,9,7,["\uD83D\uDEA3\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDEA3\uD83C\uDFFC"]],"1f3fd":["1f6a3-1f3fd-200d-2642-fe0f",35,10,7,["\uD83D\uDEA3\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDEA3\uD83C\uDFFD"]],"1f3fe":["1f6a3-1f3fe-200d-2642-fe0f",35,11,7,["\uD83D\uDEA3\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDEA3\uD83C\uDFFE"]],"1f3ff":["1f6a3-1f3ff-200d-2642-fe0f",35,12,7,["\uD83D\uDEA3\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDEA3\uD83C\uDFFF"]]},
		"1f6b4-200d-2640-fe0f":{"1f3fb":["1f6b4-1f3fb-200d-2640-fe0f",35,36,7,["\uD83D\uDEB4\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f6b4-1f3fc-200d-2640-fe0f",35,37,7,["\uD83D\uDEB4\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f6b4-1f3fd-200d-2640-fe0f",35,38,7,["\uD83D\uDEB4\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f6b4-1f3fe-200d-2640-fe0f",35,39,7,["\uD83D\uDEB4\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f6b4-1f3ff-200d-2640-fe0f",35,40,7,["\uD83D\uDEB4\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f6b4-200d-2642-fe0f":{"1f3fb":["1f6b4-1f3fb-200d-2642-fe0f",35,42,7,["\uD83D\uDEB4\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDEB4\uD83C\uDFFB"]],"1f3fc":["1f6b4-1f3fc-200d-2642-fe0f",35,43,7,["\uD83D\uDEB4\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDEB4\uD83C\uDFFC"]],"1f3fd":["1f6b4-1f3fd-200d-2642-fe0f",35,44,7,["\uD83D\uDEB4\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDEB4\uD83C\uDFFD"]],"1f3fe":["1f6b4-1f3fe-200d-2642-fe0f",35,45,7,["\uD83D\uDEB4\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDEB4\uD83C\uDFFE"]],"1f3ff":["1f6b4-1f3ff-200d-2642-fe0f",35,46,7,["\uD83D\uDEB4\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDEB4\uD83C\uDFFF"]]},
		"1f6b5-200d-2640-fe0f":{"1f3fb":["1f6b5-1f3fb-200d-2640-fe0f",36,3,7,["\uD83D\uDEB5\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f6b5-1f3fc-200d-2640-fe0f",36,4,7,["\uD83D\uDEB5\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f6b5-1f3fd-200d-2640-fe0f",36,5,7,["\uD83D\uDEB5\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f6b5-1f3fe-200d-2640-fe0f",36,6,7,["\uD83D\uDEB5\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f6b5-1f3ff-200d-2640-fe0f",36,7,7,["\uD83D\uDEB5\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f6b5-200d-2642-fe0f":{"1f3fb":["1f6b5-1f3fb-200d-2642-fe0f",36,9,7,["\uD83D\uDEB5\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDEB5\uD83C\uDFFB"]],"1f3fc":["1f6b5-1f3fc-200d-2642-fe0f",36,10,7,["\uD83D\uDEB5\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDEB5\uD83C\uDFFC"]],"1f3fd":["1f6b5-1f3fd-200d-2642-fe0f",36,11,7,["\uD83D\uDEB5\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDEB5\uD83C\uDFFD"]],"1f3fe":["1f6b5-1f3fe-200d-2642-fe0f",36,12,7,["\uD83D\uDEB5\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDEB5\uD83C\uDFFE"]],"1f3ff":["1f6b5-1f3ff-200d-2642-fe0f",36,13,7,["\uD83D\uDEB5\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDEB5\uD83C\uDFFF"]]},
		"1f6b6-200d-2640-fe0f":{"1f3fb":["1f6b6-1f3fb-200d-2640-fe0f",36,21,7,["\uD83D\uDEB6\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f6b6-1f3fc-200d-2640-fe0f",36,22,7,["\uD83D\uDEB6\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f6b6-1f3fd-200d-2640-fe0f",36,23,7,["\uD83D\uDEB6\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f6b6-1f3fe-200d-2640-fe0f",36,24,7,["\uD83D\uDEB6\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f6b6-1f3ff-200d-2640-fe0f",36,25,7,["\uD83D\uDEB6\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f6b6-200d-2642-fe0f":{"1f3fb":["1f6b6-1f3fb-200d-2642-fe0f",36,27,7,["\uD83D\uDEB6\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83D\uDEB6\uD83C\uDFFB"]],"1f3fc":["1f6b6-1f3fc-200d-2642-fe0f",36,28,7,["\uD83D\uDEB6\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83D\uDEB6\uD83C\uDFFC"]],"1f3fd":["1f6b6-1f3fd-200d-2642-fe0f",36,29,7,["\uD83D\uDEB6\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83D\uDEB6\uD83C\uDFFD"]],"1f3fe":["1f6b6-1f3fe-200d-2642-fe0f",36,30,7,["\uD83D\uDEB6\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83D\uDEB6\uD83C\uDFFE"]],"1f3ff":["1f6b6-1f3ff-200d-2642-fe0f",36,31,7,["\uD83D\uDEB6\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83D\uDEB6\uD83C\uDFFF"]]},
		"1f6c0":{"1f3fb":["1f6c0-1f3fb",36,48,63,["\uD83D\uDEC0\uD83C\uDFFB"]],"1f3fc":["1f6c0-1f3fc",36,49,63,["\uD83D\uDEC0\uD83C\uDFFC"]],"1f3fd":["1f6c0-1f3fd",36,50,63,["\uD83D\uDEC0\uD83C\uDFFD"]],"1f3fe":["1f6c0-1f3fe",37,0,63,["\uD83D\uDEC0\uD83C\uDFFE"]],"1f3ff":["1f6c0-1f3ff",37,1,63,["\uD83D\uDEC0\uD83C\uDFFF"]]},
		"1f6cc":{"1f3fb":["1f6cc-1f3fb",37,9,23,["\uD83D\uDECC\uD83C\uDFFB"]],"1f3fc":["1f6cc-1f3fc",37,10,23,["\uD83D\uDECC\uD83C\uDFFC"]],"1f3fd":["1f6cc-1f3fd",37,11,23,["\uD83D\uDECC\uD83C\uDFFD"]],"1f3fe":["1f6cc-1f3fe",37,12,23,["\uD83D\uDECC\uD83C\uDFFE"]],"1f3ff":["1f6cc-1f3ff",37,13,23,["\uD83D\uDECC\uD83C\uDFFF"]]},
		"1f918":{"1f3fb":["1f918-1f3fb",37,45,31,["\uD83E\uDD18\uD83C\uDFFB"]],"1f3fc":["1f918-1f3fc",37,46,31,["\uD83E\uDD18\uD83C\uDFFC"]],"1f3fd":["1f918-1f3fd",37,47,31,["\uD83E\uDD18\uD83C\uDFFD"]],"1f3fe":["1f918-1f3fe",37,48,31,["\uD83E\uDD18\uD83C\uDFFE"]],"1f3ff":["1f918-1f3ff",37,49,31,["\uD83E\uDD18\uD83C\uDFFF"]]},
		"1f919":{"1f3fb":["1f919-1f3fb",38,0,31,["\uD83E\uDD19\uD83C\uDFFB"]],"1f3fc":["1f919-1f3fc",38,1,31,["\uD83E\uDD19\uD83C\uDFFC"]],"1f3fd":["1f919-1f3fd",38,2,31,["\uD83E\uDD19\uD83C\uDFFD"]],"1f3fe":["1f919-1f3fe",38,3,31,["\uD83E\uDD19\uD83C\uDFFE"]],"1f3ff":["1f919-1f3ff",38,4,31,["\uD83E\uDD19\uD83C\uDFFF"]]},
		"1f91a":{"1f3fb":["1f91a-1f3fb",38,6,31,["\uD83E\uDD1A\uD83C\uDFFB"]],"1f3fc":["1f91a-1f3fc",38,7,31,["\uD83E\uDD1A\uD83C\uDFFC"]],"1f3fd":["1f91a-1f3fd",38,8,31,["\uD83E\uDD1A\uD83C\uDFFD"]],"1f3fe":["1f91a-1f3fe",38,9,31,["\uD83E\uDD1A\uD83C\uDFFE"]],"1f3ff":["1f91a-1f3ff",38,10,31,["\uD83E\uDD1A\uD83C\uDFFF"]]},
		"1f91b":{"1f3fb":["1f91b-1f3fb",38,12,31,["\uD83E\uDD1B\uD83C\uDFFB"]],"1f3fc":["1f91b-1f3fc",38,13,31,["\uD83E\uDD1B\uD83C\uDFFC"]],"1f3fd":["1f91b-1f3fd",38,14,31,["\uD83E\uDD1B\uD83C\uDFFD"]],"1f3fe":["1f91b-1f3fe",38,15,31,["\uD83E\uDD1B\uD83C\uDFFE"]],"1f3ff":["1f91b-1f3ff",38,16,31,["\uD83E\uDD1B\uD83C\uDFFF"]]},
		"1f91c":{"1f3fb":["1f91c-1f3fb",38,18,31,["\uD83E\uDD1C\uD83C\uDFFB"]],"1f3fc":["1f91c-1f3fc",38,19,31,["\uD83E\uDD1C\uD83C\uDFFC"]],"1f3fd":["1f91c-1f3fd",38,20,31,["\uD83E\uDD1C\uD83C\uDFFD"]],"1f3fe":["1f91c-1f3fe",38,21,31,["\uD83E\uDD1C\uD83C\uDFFE"]],"1f3ff":["1f91c-1f3ff",38,22,31,["\uD83E\uDD1C\uD83C\uDFFF"]]},
		"1f91e":{"1f3fb":["1f91e-1f3fb",38,25,31,["\uD83E\uDD1E\uD83C\uDFFB"]],"1f3fc":["1f91e-1f3fc",38,26,31,["\uD83E\uDD1E\uD83C\uDFFC"]],"1f3fd":["1f91e-1f3fd",38,27,31,["\uD83E\uDD1E\uD83C\uDFFD"]],"1f3fe":["1f91e-1f3fe",38,28,31,["\uD83E\uDD1E\uD83C\uDFFE"]],"1f3ff":["1f91e-1f3ff",38,29,31,["\uD83E\uDD1E\uD83C\uDFFF"]]},
		"1f91f":{"1f3fb":["1f91f-1f3fb",38,31,23,["\uD83E\uDD1F\uD83C\uDFFB"]],"1f3fc":["1f91f-1f3fc",38,32,23,["\uD83E\uDD1F\uD83C\uDFFC"]],"1f3fd":["1f91f-1f3fd",38,33,23,["\uD83E\uDD1F\uD83C\uDFFD"]],"1f3fe":["1f91f-1f3fe",38,34,23,["\uD83E\uDD1F\uD83C\uDFFE"]],"1f3ff":["1f91f-1f3ff",38,35,23,["\uD83E\uDD1F\uD83C\uDFFF"]]},
		"1f926-200d-2640-fe0f":{"1f3fb":["1f926-1f3fb-200d-2640-fe0f",38,43,7,["\uD83E\uDD26\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f926-1f3fc-200d-2640-fe0f",38,44,7,["\uD83E\uDD26\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f926-1f3fd-200d-2640-fe0f",38,45,7,["\uD83E\uDD26\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f926-1f3fe-200d-2640-fe0f",38,46,7,["\uD83E\uDD26\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f926-1f3ff-200d-2640-fe0f",38,47,7,["\uD83E\uDD26\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f926-200d-2642-fe0f":{"1f3fb":["1f926-1f3fb-200d-2642-fe0f",38,49,7,["\uD83E\uDD26\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f926-1f3fc-200d-2642-fe0f",38,50,7,["\uD83E\uDD26\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f926-1f3fd-200d-2642-fe0f",39,0,7,["\uD83E\uDD26\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f926-1f3fe-200d-2642-fe0f",39,1,7,["\uD83E\uDD26\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f926-1f3ff-200d-2642-fe0f",39,2,7,["\uD83E\uDD26\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f926":{"1f3fb":["1f926-1f3fb",39,4,15,["\uD83E\uDD26\uD83C\uDFFB"]],"1f3fc":["1f926-1f3fc",39,5,15,["\uD83E\uDD26\uD83C\uDFFC"]],"1f3fd":["1f926-1f3fd",39,6,15,["\uD83E\uDD26\uD83C\uDFFD"]],"1f3fe":["1f926-1f3fe",39,7,15,["\uD83E\uDD26\uD83C\uDFFE"]],"1f3ff":["1f926-1f3ff",39,8,15,["\uD83E\uDD26\uD83C\uDFFF"]]},
		"1f930":{"1f3fb":["1f930-1f3fb",39,19,31,["\uD83E\uDD30\uD83C\uDFFB"]],"1f3fc":["1f930-1f3fc",39,20,31,["\uD83E\uDD30\uD83C\uDFFC"]],"1f3fd":["1f930-1f3fd",39,21,31,["\uD83E\uDD30\uD83C\uDFFD"]],"1f3fe":["1f930-1f3fe",39,22,31,["\uD83E\uDD30\uD83C\uDFFE"]],"1f3ff":["1f930-1f3ff",39,23,31,["\uD83E\uDD30\uD83C\uDFFF"]]},
		"1f931":{"1f3fb":["1f931-1f3fb",39,25,23,["\uD83E\uDD31\uD83C\uDFFB"]],"1f3fc":["1f931-1f3fc",39,26,23,["\uD83E\uDD31\uD83C\uDFFC"]],"1f3fd":["1f931-1f3fd",39,27,23,["\uD83E\uDD31\uD83C\uDFFD"]],"1f3fe":["1f931-1f3fe",39,28,23,["\uD83E\uDD31\uD83C\uDFFE"]],"1f3ff":["1f931-1f3ff",39,29,23,["\uD83E\uDD31\uD83C\uDFFF"]]},
		"1f932":{"1f3fb":["1f932-1f3fb",39,31,23,["\uD83E\uDD32\uD83C\uDFFB"]],"1f3fc":["1f932-1f3fc",39,32,23,["\uD83E\uDD32\uD83C\uDFFC"]],"1f3fd":["1f932-1f3fd",39,33,23,["\uD83E\uDD32\uD83C\uDFFD"]],"1f3fe":["1f932-1f3fe",39,34,23,["\uD83E\uDD32\uD83C\uDFFE"]],"1f3ff":["1f932-1f3ff",39,35,23,["\uD83E\uDD32\uD83C\uDFFF"]]},
		"1f933":{"1f3fb":["1f933-1f3fb",39,37,31,["\uD83E\uDD33\uD83C\uDFFB"]],"1f3fc":["1f933-1f3fc",39,38,31,["\uD83E\uDD33\uD83C\uDFFC"]],"1f3fd":["1f933-1f3fd",39,39,31,["\uD83E\uDD33\uD83C\uDFFD"]],"1f3fe":["1f933-1f3fe",39,40,31,["\uD83E\uDD33\uD83C\uDFFE"]],"1f3ff":["1f933-1f3ff",39,41,31,["\uD83E\uDD33\uD83C\uDFFF"]]},
		"1f934":{"1f3fb":["1f934-1f3fb",39,43,31,["\uD83E\uDD34\uD83C\uDFFB"]],"1f3fc":["1f934-1f3fc",39,44,31,["\uD83E\uDD34\uD83C\uDFFC"]],"1f3fd":["1f934-1f3fd",39,45,31,["\uD83E\uDD34\uD83C\uDFFD"]],"1f3fe":["1f934-1f3fe",39,46,31,["\uD83E\uDD34\uD83C\uDFFE"]],"1f3ff":["1f934-1f3ff",39,47,31,["\uD83E\uDD34\uD83C\uDFFF"]]},
		"1f935":{"1f3fb":["1f935-1f3fb",39,49,31,["\uD83E\uDD35\uD83C\uDFFB"]],"1f3fc":["1f935-1f3fc",39,50,31,["\uD83E\uDD35\uD83C\uDFFC"]],"1f3fd":["1f935-1f3fd",40,0,31,["\uD83E\uDD35\uD83C\uDFFD"]],"1f3fe":["1f935-1f3fe",40,1,31,["\uD83E\uDD35\uD83C\uDFFE"]],"1f3ff":["1f935-1f3ff",40,2,31,["\uD83E\uDD35\uD83C\uDFFF"]]},
		"1f936":{"1f3fb":["1f936-1f3fb",40,4,31,["\uD83E\uDD36\uD83C\uDFFB"]],"1f3fc":["1f936-1f3fc",40,5,31,["\uD83E\uDD36\uD83C\uDFFC"]],"1f3fd":["1f936-1f3fd",40,6,31,["\uD83E\uDD36\uD83C\uDFFD"]],"1f3fe":["1f936-1f3fe",40,7,31,["\uD83E\uDD36\uD83C\uDFFE"]],"1f3ff":["1f936-1f3ff",40,8,31,["\uD83E\uDD36\uD83C\uDFFF"]]},
		"1f937-200d-2640-fe0f":{"1f3fb":["1f937-1f3fb-200d-2640-fe0f",40,10,7,["\uD83E\uDD37\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f937-1f3fc-200d-2640-fe0f",40,11,7,["\uD83E\uDD37\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f937-1f3fd-200d-2640-fe0f",40,12,7,["\uD83E\uDD37\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f937-1f3fe-200d-2640-fe0f",40,13,7,["\uD83E\uDD37\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f937-1f3ff-200d-2640-fe0f",40,14,7,["\uD83E\uDD37\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f937-200d-2642-fe0f":{"1f3fb":["1f937-1f3fb-200d-2642-fe0f",40,16,7,["\uD83E\uDD37\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f937-1f3fc-200d-2642-fe0f",40,17,7,["\uD83E\uDD37\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f937-1f3fd-200d-2642-fe0f",40,18,7,["\uD83E\uDD37\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f937-1f3fe-200d-2642-fe0f",40,19,7,["\uD83E\uDD37\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f937-1f3ff-200d-2642-fe0f",40,20,7,["\uD83E\uDD37\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f937":{"1f3fb":["1f937-1f3fb",40,22,15,["\uD83E\uDD37\uD83C\uDFFB"]],"1f3fc":["1f937-1f3fc",40,23,15,["\uD83E\uDD37\uD83C\uDFFC"]],"1f3fd":["1f937-1f3fd",40,24,15,["\uD83E\uDD37\uD83C\uDFFD"]],"1f3fe":["1f937-1f3fe",40,25,15,["\uD83E\uDD37\uD83C\uDFFE"]],"1f3ff":["1f937-1f3ff",40,26,15,["\uD83E\uDD37\uD83C\uDFFF"]]},
		"1f938-200d-2640-fe0f":{"1f3fb":["1f938-1f3fb-200d-2640-fe0f",40,28,7,["\uD83E\uDD38\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f938-1f3fc-200d-2640-fe0f",40,29,7,["\uD83E\uDD38\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f938-1f3fd-200d-2640-fe0f",40,30,7,["\uD83E\uDD38\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f938-1f3fe-200d-2640-fe0f",40,31,7,["\uD83E\uDD38\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f938-1f3ff-200d-2640-fe0f",40,32,7,["\uD83E\uDD38\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f938-200d-2642-fe0f":{"1f3fb":["1f938-1f3fb-200d-2642-fe0f",40,34,7,["\uD83E\uDD38\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f938-1f3fc-200d-2642-fe0f",40,35,7,["\uD83E\uDD38\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f938-1f3fd-200d-2642-fe0f",40,36,7,["\uD83E\uDD38\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f938-1f3fe-200d-2642-fe0f",40,37,7,["\uD83E\uDD38\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f938-1f3ff-200d-2642-fe0f",40,38,7,["\uD83E\uDD38\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f938":{"1f3fb":["1f938-1f3fb",40,40,15,["\uD83E\uDD38\uD83C\uDFFB"]],"1f3fc":["1f938-1f3fc",40,41,15,["\uD83E\uDD38\uD83C\uDFFC"]],"1f3fd":["1f938-1f3fd",40,42,15,["\uD83E\uDD38\uD83C\uDFFD"]],"1f3fe":["1f938-1f3fe",40,43,15,["\uD83E\uDD38\uD83C\uDFFE"]],"1f3ff":["1f938-1f3ff",40,44,15,["\uD83E\uDD38\uD83C\uDFFF"]]},
		"1f939-200d-2640-fe0f":{"1f3fb":["1f939-1f3fb-200d-2640-fe0f",40,46,7,["\uD83E\uDD39\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f939-1f3fc-200d-2640-fe0f",40,47,7,["\uD83E\uDD39\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f939-1f3fd-200d-2640-fe0f",40,48,7,["\uD83E\uDD39\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f939-1f3fe-200d-2640-fe0f",40,49,7,["\uD83E\uDD39\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f939-1f3ff-200d-2640-fe0f",40,50,7,["\uD83E\uDD39\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f939-200d-2642-fe0f":{"1f3fb":["1f939-1f3fb-200d-2642-fe0f",41,1,7,["\uD83E\uDD39\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f939-1f3fc-200d-2642-fe0f",41,2,7,["\uD83E\uDD39\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f939-1f3fd-200d-2642-fe0f",41,3,7,["\uD83E\uDD39\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f939-1f3fe-200d-2642-fe0f",41,4,7,["\uD83E\uDD39\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f939-1f3ff-200d-2642-fe0f",41,5,7,["\uD83E\uDD39\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f939":{"1f3fb":["1f939-1f3fb",41,7,31,["\uD83E\uDD39\uD83C\uDFFB"]],"1f3fc":["1f939-1f3fc",41,8,31,["\uD83E\uDD39\uD83C\uDFFC"]],"1f3fd":["1f939-1f3fd",41,9,31,["\uD83E\uDD39\uD83C\uDFFD"]],"1f3fe":["1f939-1f3fe",41,10,31,["\uD83E\uDD39\uD83C\uDFFE"]],"1f3ff":["1f939-1f3ff",41,11,31,["\uD83E\uDD39\uD83C\uDFFF"]]},
		"1f93d-200d-2640-fe0f":{"1f3fb":["1f93d-1f3fb-200d-2640-fe0f",41,17,7,["\uD83E\uDD3D\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f93d-1f3fc-200d-2640-fe0f",41,18,7,["\uD83E\uDD3D\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f93d-1f3fd-200d-2640-fe0f",41,19,7,["\uD83E\uDD3D\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f93d-1f3fe-200d-2640-fe0f",41,20,7,["\uD83E\uDD3D\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f93d-1f3ff-200d-2640-fe0f",41,21,7,["\uD83E\uDD3D\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f93d-200d-2642-fe0f":{"1f3fb":["1f93d-1f3fb-200d-2642-fe0f",41,23,7,["\uD83E\uDD3D\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f93d-1f3fc-200d-2642-fe0f",41,24,7,["\uD83E\uDD3D\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f93d-1f3fd-200d-2642-fe0f",41,25,7,["\uD83E\uDD3D\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f93d-1f3fe-200d-2642-fe0f",41,26,7,["\uD83E\uDD3D\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f93d-1f3ff-200d-2642-fe0f",41,27,7,["\uD83E\uDD3D\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f93d":{"1f3fb":["1f93d-1f3fb",41,29,15,["\uD83E\uDD3D\uD83C\uDFFB"]],"1f3fc":["1f93d-1f3fc",41,30,15,["\uD83E\uDD3D\uD83C\uDFFC"]],"1f3fd":["1f93d-1f3fd",41,31,15,["\uD83E\uDD3D\uD83C\uDFFD"]],"1f3fe":["1f93d-1f3fe",41,32,15,["\uD83E\uDD3D\uD83C\uDFFE"]],"1f3ff":["1f93d-1f3ff",41,33,15,["\uD83E\uDD3D\uD83C\uDFFF"]]},
		"1f93e-200d-2640-fe0f":{"1f3fb":["1f93e-1f3fb-200d-2640-fe0f",41,35,7,["\uD83E\uDD3E\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f93e-1f3fc-200d-2640-fe0f",41,36,7,["\uD83E\uDD3E\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f93e-1f3fd-200d-2640-fe0f",41,37,7,["\uD83E\uDD3E\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f93e-1f3fe-200d-2640-fe0f",41,38,7,["\uD83E\uDD3E\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f93e-1f3ff-200d-2640-fe0f",41,39,7,["\uD83E\uDD3E\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f93e-200d-2642-fe0f":{"1f3fb":["1f93e-1f3fb-200d-2642-fe0f",41,41,7,["\uD83E\uDD3E\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f93e-1f3fc-200d-2642-fe0f",41,42,7,["\uD83E\uDD3E\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f93e-1f3fd-200d-2642-fe0f",41,43,7,["\uD83E\uDD3E\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f93e-1f3fe-200d-2642-fe0f",41,44,7,["\uD83E\uDD3E\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f93e-1f3ff-200d-2642-fe0f",41,45,7,["\uD83E\uDD3E\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f93e":{"1f3fb":["1f93e-1f3fb",41,47,15,["\uD83E\uDD3E\uD83C\uDFFB"]],"1f3fc":["1f93e-1f3fc",41,48,15,["\uD83E\uDD3E\uD83C\uDFFC"]],"1f3fd":["1f93e-1f3fd",41,49,15,["\uD83E\uDD3E\uD83C\uDFFD"]],"1f3fe":["1f93e-1f3fe",41,50,15,["\uD83E\uDD3E\uD83C\uDFFE"]],"1f3ff":["1f93e-1f3ff",42,0,15,["\uD83E\uDD3E\uD83C\uDFFF"]]},
		"1f9d1":{"1f3fb":["1f9d1-1f3fb",43,17,23,["\uD83E\uDDD1\uD83C\uDFFB"]],"1f3fc":["1f9d1-1f3fc",43,18,23,["\uD83E\uDDD1\uD83C\uDFFC"]],"1f3fd":["1f9d1-1f3fd",43,19,23,["\uD83E\uDDD1\uD83C\uDFFD"]],"1f3fe":["1f9d1-1f3fe",43,20,23,["\uD83E\uDDD1\uD83C\uDFFE"]],"1f3ff":["1f9d1-1f3ff",43,21,23,["\uD83E\uDDD1\uD83C\uDFFF"]]},
		"1f9d2":{"1f3fb":["1f9d2-1f3fb",43,23,23,["\uD83E\uDDD2\uD83C\uDFFB"]],"1f3fc":["1f9d2-1f3fc",43,24,23,["\uD83E\uDDD2\uD83C\uDFFC"]],"1f3fd":["1f9d2-1f3fd",43,25,23,["\uD83E\uDDD2\uD83C\uDFFD"]],"1f3fe":["1f9d2-1f3fe",43,26,23,["\uD83E\uDDD2\uD83C\uDFFE"]],"1f3ff":["1f9d2-1f3ff",43,27,23,["\uD83E\uDDD2\uD83C\uDFFF"]]},
		"1f9d3":{"1f3fb":["1f9d3-1f3fb",43,29,23,["\uD83E\uDDD3\uD83C\uDFFB"]],"1f3fc":["1f9d3-1f3fc",43,30,23,["\uD83E\uDDD3\uD83C\uDFFC"]],"1f3fd":["1f9d3-1f3fd",43,31,23,["\uD83E\uDDD3\uD83C\uDFFD"]],"1f3fe":["1f9d3-1f3fe",43,32,23,["\uD83E\uDDD3\uD83C\uDFFE"]],"1f3ff":["1f9d3-1f3ff",43,33,23,["\uD83E\uDDD3\uD83C\uDFFF"]]},
		"1f9d4":{"1f3fb":["1f9d4-1f3fb",43,35,23,["\uD83E\uDDD4\uD83C\uDFFB"]],"1f3fc":["1f9d4-1f3fc",43,36,23,["\uD83E\uDDD4\uD83C\uDFFC"]],"1f3fd":["1f9d4-1f3fd",43,37,23,["\uD83E\uDDD4\uD83C\uDFFD"]],"1f3fe":["1f9d4-1f3fe",43,38,23,["\uD83E\uDDD4\uD83C\uDFFE"]],"1f3ff":["1f9d4-1f3ff",43,39,23,["\uD83E\uDDD4\uD83C\uDFFF"]]},
		"1f9d5":{"1f3fb":["1f9d5-1f3fb",43,41,23,["\uD83E\uDDD5\uD83C\uDFFB"]],"1f3fc":["1f9d5-1f3fc",43,42,23,["\uD83E\uDDD5\uD83C\uDFFC"]],"1f3fd":["1f9d5-1f3fd",43,43,23,["\uD83E\uDDD5\uD83C\uDFFD"]],"1f3fe":["1f9d5-1f3fe",43,44,23,["\uD83E\uDDD5\uD83C\uDFFE"]],"1f3ff":["1f9d5-1f3ff",43,45,23,["\uD83E\uDDD5\uD83C\uDFFF"]]},
		"1f9d6-200d-2640-fe0f":{"1f3fb":["1f9d6-1f3fb-200d-2640-fe0f",43,47,7,["\uD83E\uDDD6\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f9d6-1f3fc-200d-2640-fe0f",43,48,7,["\uD83E\uDDD6\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f9d6-1f3fd-200d-2640-fe0f",43,49,7,["\uD83E\uDDD6\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f9d6-1f3fe-200d-2640-fe0f",43,50,7,["\uD83E\uDDD6\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f9d6-1f3ff-200d-2640-fe0f",44,0,7,["\uD83E\uDDD6\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f9d6-200d-2642-fe0f":{"1f3fb":["1f9d6-1f3fb-200d-2642-fe0f",44,2,7,["\uD83E\uDDD6\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83E\uDDD6\uD83C\uDFFB"]],"1f3fc":["1f9d6-1f3fc-200d-2642-fe0f",44,3,7,["\uD83E\uDDD6\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83E\uDDD6\uD83C\uDFFC"]],"1f3fd":["1f9d6-1f3fd-200d-2642-fe0f",44,4,7,["\uD83E\uDDD6\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83E\uDDD6\uD83C\uDFFD"]],"1f3fe":["1f9d6-1f3fe-200d-2642-fe0f",44,5,7,["\uD83E\uDDD6\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83E\uDDD6\uD83C\uDFFE"]],"1f3ff":["1f9d6-1f3ff-200d-2642-fe0f",44,6,7,["\uD83E\uDDD6\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83E\uDDD6\uD83C\uDFFF"]]},
		"1f9d7-200d-2640-fe0f":{"1f3fb":["1f9d7-1f3fb-200d-2640-fe0f",44,14,7,["\uD83E\uDDD7\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83E\uDDD7\uD83C\uDFFB"]],"1f3fc":["1f9d7-1f3fc-200d-2640-fe0f",44,15,7,["\uD83E\uDDD7\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83E\uDDD7\uD83C\uDFFC"]],"1f3fd":["1f9d7-1f3fd-200d-2640-fe0f",44,16,7,["\uD83E\uDDD7\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83E\uDDD7\uD83C\uDFFD"]],"1f3fe":["1f9d7-1f3fe-200d-2640-fe0f",44,17,7,["\uD83E\uDDD7\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83E\uDDD7\uD83C\uDFFE"]],"1f3ff":["1f9d7-1f3ff-200d-2640-fe0f",44,18,7,["\uD83E\uDDD7\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83E\uDDD7\uD83C\uDFFF"]]},
		"1f9d7-200d-2642-fe0f":{"1f3fb":["1f9d7-1f3fb-200d-2642-fe0f",44,20,7,["\uD83E\uDDD7\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f9d7-1f3fc-200d-2642-fe0f",44,21,7,["\uD83E\uDDD7\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f9d7-1f3fd-200d-2642-fe0f",44,22,7,["\uD83E\uDDD7\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f9d7-1f3fe-200d-2642-fe0f",44,23,7,["\uD83E\uDDD7\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f9d7-1f3ff-200d-2642-fe0f",44,24,7,["\uD83E\uDDD7\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f9d8-200d-2640-fe0f":{"1f3fb":["1f9d8-1f3fb-200d-2640-fe0f",44,32,7,["\uD83E\uDDD8\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83E\uDDD8\uD83C\uDFFB"]],"1f3fc":["1f9d8-1f3fc-200d-2640-fe0f",44,33,7,["\uD83E\uDDD8\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83E\uDDD8\uD83C\uDFFC"]],"1f3fd":["1f9d8-1f3fd-200d-2640-fe0f",44,34,7,["\uD83E\uDDD8\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83E\uDDD8\uD83C\uDFFD"]],"1f3fe":["1f9d8-1f3fe-200d-2640-fe0f",44,35,7,["\uD83E\uDDD8\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83E\uDDD8\uD83C\uDFFE"]],"1f3ff":["1f9d8-1f3ff-200d-2640-fe0f",44,36,7,["\uD83E\uDDD8\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83E\uDDD8\uD83C\uDFFF"]]},
		"1f9d8-200d-2642-fe0f":{"1f3fb":["1f9d8-1f3fb-200d-2642-fe0f",44,38,7,["\uD83E\uDDD8\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f9d8-1f3fc-200d-2642-fe0f",44,39,7,["\uD83E\uDDD8\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f9d8-1f3fd-200d-2642-fe0f",44,40,7,["\uD83E\uDDD8\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f9d8-1f3fe-200d-2642-fe0f",44,41,7,["\uD83E\uDDD8\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f9d8-1f3ff-200d-2642-fe0f",44,42,7,["\uD83E\uDDD8\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f9d9-200d-2640-fe0f":{"1f3fb":["1f9d9-1f3fb-200d-2640-fe0f",44,50,7,["\uD83E\uDDD9\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83E\uDDD9\uD83C\uDFFB"]],"1f3fc":["1f9d9-1f3fc-200d-2640-fe0f",45,0,7,["\uD83E\uDDD9\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83E\uDDD9\uD83C\uDFFC"]],"1f3fd":["1f9d9-1f3fd-200d-2640-fe0f",45,1,7,["\uD83E\uDDD9\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83E\uDDD9\uD83C\uDFFD"]],"1f3fe":["1f9d9-1f3fe-200d-2640-fe0f",45,2,7,["\uD83E\uDDD9\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83E\uDDD9\uD83C\uDFFE"]],"1f3ff":["1f9d9-1f3ff-200d-2640-fe0f",45,3,7,["\uD83E\uDDD9\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83E\uDDD9\uD83C\uDFFF"]]},
		"1f9d9-200d-2642-fe0f":{"1f3fb":["1f9d9-1f3fb-200d-2642-fe0f",45,5,7,["\uD83E\uDDD9\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f9d9-1f3fc-200d-2642-fe0f",45,6,7,["\uD83E\uDDD9\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f9d9-1f3fd-200d-2642-fe0f",45,7,7,["\uD83E\uDDD9\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f9d9-1f3fe-200d-2642-fe0f",45,8,7,["\uD83E\uDDD9\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f9d9-1f3ff-200d-2642-fe0f",45,9,7,["\uD83E\uDDD9\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f9da-200d-2640-fe0f":{"1f3fb":["1f9da-1f3fb-200d-2640-fe0f",45,17,7,["\uD83E\uDDDA\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83E\uDDDA\uD83C\uDFFB"]],"1f3fc":["1f9da-1f3fc-200d-2640-fe0f",45,18,7,["\uD83E\uDDDA\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83E\uDDDA\uD83C\uDFFC"]],"1f3fd":["1f9da-1f3fd-200d-2640-fe0f",45,19,7,["\uD83E\uDDDA\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83E\uDDDA\uD83C\uDFFD"]],"1f3fe":["1f9da-1f3fe-200d-2640-fe0f",45,20,7,["\uD83E\uDDDA\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83E\uDDDA\uD83C\uDFFE"]],"1f3ff":["1f9da-1f3ff-200d-2640-fe0f",45,21,7,["\uD83E\uDDDA\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83E\uDDDA\uD83C\uDFFF"]]},
		"1f9da-200d-2642-fe0f":{"1f3fb":["1f9da-1f3fb-200d-2642-fe0f",45,23,7,["\uD83E\uDDDA\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f9da-1f3fc-200d-2642-fe0f",45,24,7,["\uD83E\uDDDA\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f9da-1f3fd-200d-2642-fe0f",45,25,7,["\uD83E\uDDDA\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f9da-1f3fe-200d-2642-fe0f",45,26,7,["\uD83E\uDDDA\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f9da-1f3ff-200d-2642-fe0f",45,27,7,["\uD83E\uDDDA\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f9db-200d-2640-fe0f":{"1f3fb":["1f9db-1f3fb-200d-2640-fe0f",45,35,7,["\uD83E\uDDDB\uD83C\uDFFB\u200D\u2640\uFE0F","\uD83E\uDDDB\uD83C\uDFFB"]],"1f3fc":["1f9db-1f3fc-200d-2640-fe0f",45,36,7,["\uD83E\uDDDB\uD83C\uDFFC\u200D\u2640\uFE0F","\uD83E\uDDDB\uD83C\uDFFC"]],"1f3fd":["1f9db-1f3fd-200d-2640-fe0f",45,37,7,["\uD83E\uDDDB\uD83C\uDFFD\u200D\u2640\uFE0F","\uD83E\uDDDB\uD83C\uDFFD"]],"1f3fe":["1f9db-1f3fe-200d-2640-fe0f",45,38,7,["\uD83E\uDDDB\uD83C\uDFFE\u200D\u2640\uFE0F","\uD83E\uDDDB\uD83C\uDFFE"]],"1f3ff":["1f9db-1f3ff-200d-2640-fe0f",45,39,7,["\uD83E\uDDDB\uD83C\uDFFF\u200D\u2640\uFE0F","\uD83E\uDDDB\uD83C\uDFFF"]]},
		"1f9db-200d-2642-fe0f":{"1f3fb":["1f9db-1f3fb-200d-2642-fe0f",45,41,7,["\uD83E\uDDDB\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["1f9db-1f3fc-200d-2642-fe0f",45,42,7,["\uD83E\uDDDB\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["1f9db-1f3fd-200d-2642-fe0f",45,43,7,["\uD83E\uDDDB\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["1f9db-1f3fe-200d-2642-fe0f",45,44,7,["\uD83E\uDDDB\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["1f9db-1f3ff-200d-2642-fe0f",45,45,7,["\uD83E\uDDDB\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"1f9dc-200d-2640-fe0f":{"1f3fb":["1f9dc-1f3fb-200d-2640-fe0f",46,2,7,["\uD83E\uDDDC\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f9dc-1f3fc-200d-2640-fe0f",46,3,7,["\uD83E\uDDDC\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f9dc-1f3fd-200d-2640-fe0f",46,4,7,["\uD83E\uDDDC\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f9dc-1f3fe-200d-2640-fe0f",46,5,7,["\uD83E\uDDDC\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f9dc-1f3ff-200d-2640-fe0f",46,6,7,["\uD83E\uDDDC\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f9dc-200d-2642-fe0f":{"1f3fb":["1f9dc-1f3fb-200d-2642-fe0f",46,8,7,["\uD83E\uDDDC\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83E\uDDDC\uD83C\uDFFB"]],"1f3fc":["1f9dc-1f3fc-200d-2642-fe0f",46,9,7,["\uD83E\uDDDC\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83E\uDDDC\uD83C\uDFFC"]],"1f3fd":["1f9dc-1f3fd-200d-2642-fe0f",46,10,7,["\uD83E\uDDDC\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83E\uDDDC\uD83C\uDFFD"]],"1f3fe":["1f9dc-1f3fe-200d-2642-fe0f",46,11,7,["\uD83E\uDDDC\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83E\uDDDC\uD83C\uDFFE"]],"1f3ff":["1f9dc-1f3ff-200d-2642-fe0f",46,12,7,["\uD83E\uDDDC\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83E\uDDDC\uD83C\uDFFF"]]},
		"1f9dd-200d-2640-fe0f":{"1f3fb":["1f9dd-1f3fb-200d-2640-fe0f",46,20,7,["\uD83E\uDDDD\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["1f9dd-1f3fc-200d-2640-fe0f",46,21,7,["\uD83E\uDDDD\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["1f9dd-1f3fd-200d-2640-fe0f",46,22,7,["\uD83E\uDDDD\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["1f9dd-1f3fe-200d-2640-fe0f",46,23,7,["\uD83E\uDDDD\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["1f9dd-1f3ff-200d-2640-fe0f",46,24,7,["\uD83E\uDDDD\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"1f9dd-200d-2642-fe0f":{"1f3fb":["1f9dd-1f3fb-200d-2642-fe0f",46,26,7,["\uD83E\uDDDD\uD83C\uDFFB\u200D\u2642\uFE0F","\uD83E\uDDDD\uD83C\uDFFB"]],"1f3fc":["1f9dd-1f3fc-200d-2642-fe0f",46,27,7,["\uD83E\uDDDD\uD83C\uDFFC\u200D\u2642\uFE0F","\uD83E\uDDDD\uD83C\uDFFC"]],"1f3fd":["1f9dd-1f3fd-200d-2642-fe0f",46,28,7,["\uD83E\uDDDD\uD83C\uDFFD\u200D\u2642\uFE0F","\uD83E\uDDDD\uD83C\uDFFD"]],"1f3fe":["1f9dd-1f3fe-200d-2642-fe0f",46,29,7,["\uD83E\uDDDD\uD83C\uDFFE\u200D\u2642\uFE0F","\uD83E\uDDDD\uD83C\uDFFE"]],"1f3ff":["1f9dd-1f3ff-200d-2642-fe0f",46,30,7,["\uD83E\uDDDD\uD83C\uDFFF\u200D\u2642\uFE0F","\uD83E\uDDDD\uD83C\uDFFF"]]},
		"26f9-fe0f-200d-2640-fe0f":{"1f3fb":["26f9-1f3fb-200d-2640-fe0f",49,14,7,["\u26F9\uD83C\uDFFB\u200D\u2640\uFE0F"]],"1f3fc":["26f9-1f3fc-200d-2640-fe0f",49,15,7,["\u26F9\uD83C\uDFFC\u200D\u2640\uFE0F"]],"1f3fd":["26f9-1f3fd-200d-2640-fe0f",49,16,7,["\u26F9\uD83C\uDFFD\u200D\u2640\uFE0F"]],"1f3fe":["26f9-1f3fe-200d-2640-fe0f",49,17,7,["\u26F9\uD83C\uDFFE\u200D\u2640\uFE0F"]],"1f3ff":["26f9-1f3ff-200d-2640-fe0f",49,18,7,["\u26F9\uD83C\uDFFF\u200D\u2640\uFE0F"]]},
		"26f9-fe0f-200d-2642-fe0f":{"1f3fb":["26f9-1f3fb-200d-2642-fe0f",49,20,7,["\u26F9\uD83C\uDFFB\u200D\u2642\uFE0F"]],"1f3fc":["26f9-1f3fc-200d-2642-fe0f",49,21,7,["\u26F9\uD83C\uDFFC\u200D\u2642\uFE0F"]],"1f3fd":["26f9-1f3fd-200d-2642-fe0f",49,22,7,["\u26F9\uD83C\uDFFD\u200D\u2642\uFE0F"]],"1f3fe":["26f9-1f3fe-200d-2642-fe0f",49,23,7,["\u26F9\uD83C\uDFFE\u200D\u2642\uFE0F"]],"1f3ff":["26f9-1f3ff-200d-2642-fe0f",49,24,7,["\u26F9\uD83C\uDFFF\u200D\u2642\uFE0F"]]},
		"270a":{"1f3fb":["270a-1f3fb",49,33,63,["\u270A\uD83C\uDFFB"]],"1f3fc":["270a-1f3fc",49,34,63,["\u270A\uD83C\uDFFC"]],"1f3fd":["270a-1f3fd",49,35,63,["\u270A\uD83C\uDFFD"]],"1f3fe":["270a-1f3fe",49,36,63,["\u270A\uD83C\uDFFE"]],"1f3ff":["270a-1f3ff",49,37,63,["\u270A\uD83C\uDFFF"]]},
		"270b":{"1f3fb":["270b-1f3fb",49,39,63,["\u270B\uD83C\uDFFB"]],"1f3fc":["270b-1f3fc",49,40,63,["\u270B\uD83C\uDFFC"]],"1f3fd":["270b-1f3fd",49,41,63,["\u270B\uD83C\uDFFD"]],"1f3fe":["270b-1f3fe",49,42,63,["\u270B\uD83C\uDFFE"]],"1f3ff":["270b-1f3ff",49,43,63,["\u270B\uD83C\uDFFF"]]}
	};
	/** @private */
	emoji.prototype.obsoletes_data = {
		"1f3c3-200d-2642-fe0f":["1f3c3",10,4,47],
		"1f3c3-1f3fb-200d-2642-fe0f":["1f3c3-1f3fb",10,5,47],
		"1f3c3-1f3fc-200d-2642-fe0f":["1f3c3-1f3fc",10,6,47],
		"1f3c3-1f3fd-200d-2642-fe0f":["1f3c3-1f3fd",10,7,47],
		"1f3c3-1f3fe-200d-2642-fe0f":["1f3c3-1f3fe",10,8,47],
		"1f3c3-1f3ff-200d-2642-fe0f":["1f3c3-1f3ff",10,9,47],
		"1f3c4-200d-2642-fe0f":["1f3c4",10,22,47],
		"1f3c4-1f3fb-200d-2642-fe0f":["1f3c4-1f3fb",10,23,47],
		"1f3c4-1f3fc-200d-2642-fe0f":["1f3c4-1f3fc",10,24,47],
		"1f3c4-1f3fd-200d-2642-fe0f":["1f3c4-1f3fd",10,25,47],
		"1f3c4-1f3fe-200d-2642-fe0f":["1f3c4-1f3fe",10,26,47],
		"1f3c4-1f3ff-200d-2642-fe0f":["1f3c4-1f3ff",10,27,47],
		"1f3ca-200d-2642-fe0f":["1f3ca",10,50,47],
		"1f3ca-1f3fb-200d-2642-fe0f":["1f3ca-1f3fb",11,0,47],
		"1f3ca-1f3fc-200d-2642-fe0f":["1f3ca-1f3fc",11,1,47],
		"1f3ca-1f3fd-200d-2642-fe0f":["1f3ca-1f3fd",11,2,47],
		"1f3ca-1f3fe-200d-2642-fe0f":["1f3ca-1f3fe",11,3,47],
		"1f3ca-1f3ff-200d-2642-fe0f":["1f3ca-1f3ff",11,4,47],
		"1f3cb-fe0f-200d-2642-fe0f":["1f3cb-fe0f",11,17,7],
		"1f3cc-fe0f-200d-2642-fe0f":["1f3cc-fe0f",11,30,7],
		"1f468-200d-1f469-200d-1f466":["1f46a",20,39,47],
		"1f46e-200d-2642-fe0f":["1f46e",21,4,47],
		"1f46e-1f3fb-200d-2642-fe0f":["1f46e-1f3fb",21,5,47],
		"1f46e-1f3fc-200d-2642-fe0f":["1f46e-1f3fc",21,6,47],
		"1f46e-1f3fd-200d-2642-fe0f":["1f46e-1f3fd",21,7,47],
		"1f46e-1f3fe-200d-2642-fe0f":["1f46e-1f3fe",21,8,47],
		"1f46e-1f3ff-200d-2642-fe0f":["1f46e-1f3ff",21,9,47],
		"1f46f-200d-2640-fe0f":["1f46f",21,12,47],
		"1f471-200d-2642-fe0f":["1f471",21,31,47],
		"1f471-1f3fb-200d-2642-fe0f":["1f471-1f3fb",21,32,47],
		"1f471-1f3fc-200d-2642-fe0f":["1f471-1f3fc",21,33,47],
		"1f471-1f3fd-200d-2642-fe0f":["1f471-1f3fd",21,34,47],
		"1f471-1f3fe-200d-2642-fe0f":["1f471-1f3fe",21,35,47],
		"1f471-1f3ff-200d-2642-fe0f":["1f471-1f3ff",21,36,47],
		"1f473-200d-2642-fe0f":["1f473",22,4,47],
		"1f473-1f3fb-200d-2642-fe0f":["1f473-1f3fb",22,5,47],
		"1f473-1f3fc-200d-2642-fe0f":["1f473-1f3fc",22,6,47],
		"1f473-1f3fd-200d-2642-fe0f":["1f473-1f3fd",22,7,47],
		"1f473-1f3fe-200d-2642-fe0f":["1f473-1f3fe",22,8,47],
		"1f473-1f3ff-200d-2642-fe0f":["1f473-1f3ff",22,9,47],
		"1f477-200d-2642-fe0f":["1f477",22,40,47],
		"1f477-1f3fb-200d-2642-fe0f":["1f477-1f3fb",22,41,47],
		"1f477-1f3fc-200d-2642-fe0f":["1f477-1f3fc",22,42,47],
		"1f477-1f3fd-200d-2642-fe0f":["1f477-1f3fd",22,43,47],
		"1f477-1f3fe-200d-2642-fe0f":["1f477-1f3fe",22,44,47],
		"1f477-1f3ff-200d-2642-fe0f":["1f477-1f3ff",22,45,47],
		"1f481-200d-2640-fe0f":["1f481",23,26,47],
		"1f481-1f3fb-200d-2640-fe0f":["1f481-1f3fb",23,27,47],
		"1f481-1f3fc-200d-2640-fe0f":["1f481-1f3fc",23,28,47],
		"1f481-1f3fd-200d-2640-fe0f":["1f481-1f3fd",23,29,47],
		"1f481-1f3fe-200d-2640-fe0f":["1f481-1f3fe",23,30,47],
		"1f481-1f3ff-200d-2640-fe0f":["1f481-1f3ff",23,31,47],
		"1f482-200d-2642-fe0f":["1f482",23,44,47],
		"1f482-1f3fb-200d-2642-fe0f":["1f482-1f3fb",23,45,47],
		"1f482-1f3fc-200d-2642-fe0f":["1f482-1f3fc",23,46,47],
		"1f482-1f3fd-200d-2642-fe0f":["1f482-1f3fd",23,47,47],
		"1f482-1f3fe-200d-2642-fe0f":["1f482-1f3fe",23,48,47],
		"1f482-1f3ff-200d-2642-fe0f":["1f482-1f3ff",23,49,47],
		"1f486-200d-2640-fe0f":["1f486",24,24,47],
		"1f486-1f3fb-200d-2640-fe0f":["1f486-1f3fb",24,25,47],
		"1f486-1f3fc-200d-2640-fe0f":["1f486-1f3fc",24,26,47],
		"1f486-1f3fd-200d-2640-fe0f":["1f486-1f3fd",24,27,47],
		"1f486-1f3fe-200d-2640-fe0f":["1f486-1f3fe",24,28,47],
		"1f486-1f3ff-200d-2640-fe0f":["1f486-1f3ff",24,29,47],
		"1f487-200d-2640-fe0f":["1f487",24,42,47],
		"1f487-1f3fb-200d-2640-fe0f":["1f487-1f3fb",24,43,47],
		"1f487-1f3fc-200d-2640-fe0f":["1f487-1f3fc",24,44,47],
		"1f487-1f3fd-200d-2640-fe0f":["1f487-1f3fd",24,45,47],
		"1f487-1f3fe-200d-2640-fe0f":["1f487-1f3fe",24,46,47],
		"1f487-1f3ff-200d-2640-fe0f":["1f487-1f3ff",24,47,47],
		"1f469-200d-2764-fe0f-200d-1f48b-200d-1f468":["1f48f",25,4,45],
		"1f469-200d-2764-fe0f-200d-1f468":["1f491",25,6,45],
		"1f575-fe0f-200d-2642-fe0f":["1f575-fe0f",29,25,7],
		"1f645-200d-2640-fe0f":["1f645",32,8,47],
		"1f645-1f3fb-200d-2640-fe0f":["1f645-1f3fb",32,9,47],
		"1f645-1f3fc-200d-2640-fe0f":["1f645-1f3fc",32,10,47],
		"1f645-1f3fd-200d-2640-fe0f":["1f645-1f3fd",32,11,47],
		"1f645-1f3fe-200d-2640-fe0f":["1f645-1f3fe",32,12,47],
		"1f645-1f3ff-200d-2640-fe0f":["1f645-1f3ff",32,13,47],
		"1f646-200d-2640-fe0f":["1f646",32,26,47],
		"1f646-1f3fb-200d-2640-fe0f":["1f646-1f3fb",32,27,47],
		"1f646-1f3fc-200d-2640-fe0f":["1f646-1f3fc",32,28,47],
		"1f646-1f3fd-200d-2640-fe0f":["1f646-1f3fd",32,29,47],
		"1f646-1f3fe-200d-2640-fe0f":["1f646-1f3fe",32,30,47],
		"1f646-1f3ff-200d-2640-fe0f":["1f646-1f3ff",32,31,47],
		"1f647-200d-2642-fe0f":["1f647",32,44,47],
		"1f647-1f3fb-200d-2642-fe0f":["1f647-1f3fb",32,45,47],
		"1f647-1f3fc-200d-2642-fe0f":["1f647-1f3fc",32,46,47],
		"1f647-1f3fd-200d-2642-fe0f":["1f647-1f3fd",32,47,47],
		"1f647-1f3fe-200d-2642-fe0f":["1f647-1f3fe",32,48,47],
		"1f647-1f3ff-200d-2642-fe0f":["1f647-1f3ff",32,49,47],
		"1f64b-200d-2640-fe0f":["1f64b",33,14,47],
		"1f64b-1f3fb-200d-2640-fe0f":["1f64b-1f3fb",33,15,47],
		"1f64b-1f3fc-200d-2640-fe0f":["1f64b-1f3fc",33,16,47],
		"1f64b-1f3fd-200d-2640-fe0f":["1f64b-1f3fd",33,17,47],
		"1f64b-1f3fe-200d-2640-fe0f":["1f64b-1f3fe",33,18,47],
		"1f64b-1f3ff-200d-2640-fe0f":["1f64b-1f3ff",33,19,47],
		"1f64d-200d-2640-fe0f":["1f64d",33,38,47],
		"1f64d-1f3fb-200d-2640-fe0f":["1f64d-1f3fb",33,39,47],
		"1f64d-1f3fc-200d-2640-fe0f":["1f64d-1f3fc",33,40,47],
		"1f64d-1f3fd-200d-2640-fe0f":["1f64d-1f3fd",33,41,47],
		"1f64d-1f3fe-200d-2640-fe0f":["1f64d-1f3fe",33,42,47],
		"1f64d-1f3ff-200d-2640-fe0f":["1f64d-1f3ff",33,43,47],
		"1f64e-200d-2640-fe0f":["1f64e",34,5,47],
		"1f64e-1f3fb-200d-2640-fe0f":["1f64e-1f3fb",34,6,47],
		"1f64e-1f3fc-200d-2640-fe0f":["1f64e-1f3fc",34,7,47],
		"1f64e-1f3fd-200d-2640-fe0f":["1f64e-1f3fd",34,8,47],
		"1f64e-1f3fe-200d-2640-fe0f":["1f64e-1f3fe",34,9,47],
		"1f64e-1f3ff-200d-2640-fe0f":["1f64e-1f3ff",34,10,47],
		"1f6a3-200d-2642-fe0f":["1f6a3",35,13,47],
		"1f6a3-1f3fb-200d-2642-fe0f":["1f6a3-1f3fb",35,14,15],
		"1f6a3-1f3fc-200d-2642-fe0f":["1f6a3-1f3fc",35,15,15],
		"1f6a3-1f3fd-200d-2642-fe0f":["1f6a3-1f3fd",35,16,15],
		"1f6a3-1f3fe-200d-2642-fe0f":["1f6a3-1f3fe",35,17,15],
		"1f6a3-1f3ff-200d-2642-fe0f":["1f6a3-1f3ff",35,18,15],
		"1f6b4-200d-2642-fe0f":["1f6b4",35,47,47],
		"1f6b4-1f3fb-200d-2642-fe0f":["1f6b4-1f3fb",35,48,47],
		"1f6b4-1f3fc-200d-2642-fe0f":["1f6b4-1f3fc",35,49,47],
		"1f6b4-1f3fd-200d-2642-fe0f":["1f6b4-1f3fd",35,50,47],
		"1f6b4-1f3fe-200d-2642-fe0f":["1f6b4-1f3fe",36,0,47],
		"1f6b4-1f3ff-200d-2642-fe0f":["1f6b4-1f3ff",36,1,47],
		"1f6b5-200d-2642-fe0f":["1f6b5",36,14,47],
		"1f6b5-1f3fb-200d-2642-fe0f":["1f6b5-1f3fb",36,15,47],
		"1f6b5-1f3fc-200d-2642-fe0f":["1f6b5-1f3fc",36,16,47],
		"1f6b5-1f3fd-200d-2642-fe0f":["1f6b5-1f3fd",36,17,47],
		"1f6b5-1f3fe-200d-2642-fe0f":["1f6b5-1f3fe",36,18,47],
		"1f6b5-1f3ff-200d-2642-fe0f":["1f6b5-1f3ff",36,19,47],
		"1f6b6-200d-2642-fe0f":["1f6b6",36,32,47],
		"1f6b6-1f3fb-200d-2642-fe0f":["1f6b6-1f3fb",36,33,47],
		"1f6b6-1f3fc-200d-2642-fe0f":["1f6b6-1f3fc",36,34,47],
		"1f6b6-1f3fd-200d-2642-fe0f":["1f6b6-1f3fd",36,35,47],
		"1f6b6-1f3fe-200d-2642-fe0f":["1f6b6-1f3fe",36,36,47],
		"1f6b6-1f3ff-200d-2642-fe0f":["1f6b6-1f3ff",36,37,47],
		"1f9d6-200d-2642-fe0f":["1f9d6",44,7,21],
		"1f9d6-1f3fb-200d-2642-fe0f":["1f9d6-1f3fb",44,8,21],
		"1f9d6-1f3fc-200d-2642-fe0f":["1f9d6-1f3fc",44,9,21],
		"1f9d6-1f3fd-200d-2642-fe0f":["1f9d6-1f3fd",44,10,21],
		"1f9d6-1f3fe-200d-2642-fe0f":["1f9d6-1f3fe",44,11,21],
		"1f9d6-1f3ff-200d-2642-fe0f":["1f9d6-1f3ff",44,12,21],
		"1f9d7-200d-2640-fe0f":["1f9d7",44,25,21],
		"1f9d7-1f3fb-200d-2640-fe0f":["1f9d7-1f3fb",44,26,21],
		"1f9d7-1f3fc-200d-2640-fe0f":["1f9d7-1f3fc",44,27,21],
		"1f9d7-1f3fd-200d-2640-fe0f":["1f9d7-1f3fd",44,28,21],
		"1f9d7-1f3fe-200d-2640-fe0f":["1f9d7-1f3fe",44,29,21],
		"1f9d7-1f3ff-200d-2640-fe0f":["1f9d7-1f3ff",44,30,21],
		"1f9d8-200d-2640-fe0f":["1f9d8",44,43,21],
		"1f9d8-1f3fb-200d-2640-fe0f":["1f9d8-1f3fb",44,44,21],
		"1f9d8-1f3fc-200d-2640-fe0f":["1f9d8-1f3fc",44,45,21],
		"1f9d8-1f3fd-200d-2640-fe0f":["1f9d8-1f3fd",44,46,21],
		"1f9d8-1f3fe-200d-2640-fe0f":["1f9d8-1f3fe",44,47,21],
		"1f9d8-1f3ff-200d-2640-fe0f":["1f9d8-1f3ff",44,48,21],
		"1f9d9-200d-2640-fe0f":["1f9d9",45,10,21],
		"1f9d9-1f3fb-200d-2640-fe0f":["1f9d9-1f3fb",45,11,21],
		"1f9d9-1f3fc-200d-2640-fe0f":["1f9d9-1f3fc",45,12,21],
		"1f9d9-1f3fd-200d-2640-fe0f":["1f9d9-1f3fd",45,13,21],
		"1f9d9-1f3fe-200d-2640-fe0f":["1f9d9-1f3fe",45,14,21],
		"1f9d9-1f3ff-200d-2640-fe0f":["1f9d9-1f3ff",45,15,21],
		"1f9da-200d-2640-fe0f":["1f9da",45,28,21],
		"1f9da-1f3fb-200d-2640-fe0f":["1f9da-1f3fb",45,29,5],
		"1f9da-1f3fc-200d-2640-fe0f":["1f9da-1f3fc",45,30,5],
		"1f9da-1f3fd-200d-2640-fe0f":["1f9da-1f3fd",45,31,5],
		"1f9da-1f3fe-200d-2640-fe0f":["1f9da-1f3fe",45,32,5],
		"1f9da-1f3ff-200d-2640-fe0f":["1f9da-1f3ff",45,33,5],
		"1f9db-200d-2640-fe0f":["1f9db",45,46,21],
		"1f9db-1f3fb-200d-2640-fe0f":["1f9db-1f3fb",45,47,5],
		"1f9db-1f3fc-200d-2640-fe0f":["1f9db-1f3fc",45,48,5],
		"1f9db-1f3fd-200d-2640-fe0f":["1f9db-1f3fd",45,49,5],
		"1f9db-1f3fe-200d-2640-fe0f":["1f9db-1f3fe",45,50,5],
		"1f9db-1f3ff-200d-2640-fe0f":["1f9db-1f3ff",46,0,5],
		"1f9dc-200d-2642-fe0f":["1f9dc",46,13,21],
		"1f9dc-1f3fb-200d-2642-fe0f":["1f9dc-1f3fb",46,14,21],
		"1f9dc-1f3fc-200d-2642-fe0f":["1f9dc-1f3fc",46,15,21],
		"1f9dc-1f3fd-200d-2642-fe0f":["1f9dc-1f3fd",46,16,21],
		"1f9dc-1f3fe-200d-2642-fe0f":["1f9dc-1f3fe",46,17,21],
		"1f9dc-1f3ff-200d-2642-fe0f":["1f9dc-1f3ff",46,18,21],
		"1f9dd-200d-2642-fe0f":["1f9dd",46,31,21],
		"1f9dd-1f3fb-200d-2642-fe0f":["1f9dd-1f3fb",46,32,21],
		"1f9dd-1f3fc-200d-2642-fe0f":["1f9dd-1f3fc",46,33,21],
		"1f9dd-1f3fd-200d-2642-fe0f":["1f9dd-1f3fd",46,34,21],
		"1f9dd-1f3fe-200d-2642-fe0f":["1f9dd-1f3fe",46,35,21],
		"1f9dd-1f3ff-200d-2642-fe0f":["1f9dd-1f3ff",46,36,21],
		"1f9de-200d-2642-fe0f":["1f9de",46,39,21],
		"1f9df-200d-2642-fe0f":["1f9df",46,42,21],
		"26f9-fe0f-200d-2642-fe0f":["26f9-fe0f",49,25,7]
	};


	// export
	if (typeof exports !== 'undefined'){
		if (typeof module !== 'undefined' && module.exports){
			exports = module.exports = emoji;
		}
		exports.EmojiConvertor = emoji;
	}else if (typeof define === 'function' && define.amd){
		define(function() { return emoji; })
	}else{
		root.EmojiConvertor = emoji;
	}

}).call(function(){
	return this || (typeof window !== 'undefined' ? window : global);
}());
