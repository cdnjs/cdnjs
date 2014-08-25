
/*! 
 * 漢字標準格式 v2.2.3
 * ---
 * Hanzi-optimised CSS Mode
 *
 *
 *
 * Lisence: MIT Lisence
 * Last Modified: 2014/1/1
 *
 */

;jQuery.noConflict

;(function($){
	var version = '2.2.3',

	tests = [],
	rubies,

	unicode = [],

	rendered = 'han-js-rendered',
	classes = [rendered],
	fontfaces = [],


	han = function() {
		$(document).on('ready', function(){

			// `unicode-range`
			classes.push( ( test_for_unicoderange() ? '' : 'no-' ) + 'unicoderange' )

			// The 4(-1) Typefaces
			fontfaces['songti'] = test_for_fontface( 'Han Songti' )
			fontfaces['kaiti'] = test_for_fontface( 'Han Kaiti' )
			fontfaces['fangsong'] = test_for_fontface( 'Han Fangsong' )

			for ( var font in fontfaces ) {
				classes.push( ( fontfaces[font] ? '' : 'no-' ) + 'fontface-' + font )
			}

			// altogether
			$('html').addClass( classes.join(' ') )

			init()
		})
	},


	init = function( range ) {
		if ( !range && $('html').hasClass('no-han-init') )
			return

		var range = range || 'body'

		if ( range !== 'body' && !$(range).hasClass(rendered) )
			$(range).addClass(rendered)
		else if ( range === 'body' && !$('html').hasClass(rendered) )
			$('html').addClass(rendered)



		/* 
		 * 加強漢字註音功能
		 * ---
		 * Enhance `<ruby>` element
		 *
		 * **注意：**需置於`<em>`的hack前。
		 *
		 * **Note:** The necessity of being 
		 * placed before the hack of
		 * the `<em>` element is required.
		 */

		// 語義類別簡化
		$(range).find('ruby, rtc').filter('.pinyin').addClass('romanization')
		$(range).find('ruby, rtc').filter('.mps').addClass('zhuyin')
		$(range).find('ruby, rtc').filter('.romanization').addClass('annotation')

		$(range).find('ruby').each(function() {
			var html = $(this).html(),
				hruby = document.createElement('hruby')

			// 羅馬拼音（在不支援`<ruby>`的瀏覽器下）
			if ( !tests['ruby']() && 
				 !$(this).hasClass('complex') &&
				 !$(this).hasClass('zhuyin') &&
				 !$(this).hasClass('rightangle') ) {

				// 將拼音轉為元素屬性以便CSS產生偽類
				$(this)
				.find('rt')
				.each(function(){
					var anno = $(this).html(),
						prev = this.previousSibling,
						text = prev.nodeValue

					prev.nodeValue = ''

					$(prev).before(
						 $('<rb/>')
						.html( text )
						.attr('annotation', anno)
						.replaceWith(_copy)
					)

					$(this).replaceWith(
						_copy().html(anno)
					)
				})

				$(this)
				.replaceWith(
					$(hruby)
					.html( $(this).html() )
				)

			} else {
				var attr = {}

				// 國語注音、台灣方言音符號
				if ( $(this).hasClass('zhuyin') ) {
					// 將注音轉為元素屬性以便CSS產生偽類
					$(this).find('rt')
					.each(function(){
						_apply_zhuyin(this)
					})

				// 雙行文字註記
				} else if ( $(this).hasClass('complex') ) {
					attr.complex = 'complex'

					_apply_annotation(this)
					

				// 拼音、注音直角顯示
				} else if ( $(this).hasClass('rightangle') ) {
					attr.rightangle = 'rightangle'


					// 國語注音、台灣方言音符號
					$(this).find('rtc.zhuyin')
					.hide()
					.each(function(){
						var t = $(this).prevAll('rbc'),
							c, len, data
						
						$(this).find('rt')
						.each(function(i){
							var rb = t.find('rb:not([annotation])').eq(i)
							_apply_zhuyin(this, rb)
						})
					})

					// 羅馬拼音或文字註記
					_apply_annotation(this)
				}

				// 以`<hruby>`元素替代`<ruby>`，避免UA原生樣式的干擾
				$(this).filter(function(){
					return $(this).hasClass("zhuyin") ||
						   $(this).hasClass("complex") ||
						   $(this).hasClass("rightangle")
				}).replaceWith(
					$(hruby)
					.html( $(this).html() )
					.attr('generic', _get_zhuyin_font(this))
					.attr(attr)
				)
			}
		})



		/* 
		 * 漢拉間隙 
		 * ---
		 * Kerning between Hanzi and Latin Letter
		 *
		 */

		if ( $('html').hasClass('han-la') )
			$(range).each(function(){
				var hanzi = unicode_set('hanzi'),
					latin = unicode_set('latin') + '|' + unicode['punc'][0],
					punc = unicode['punc']

					patterns = [
						'/(' + hanzi + ')(' + latin + '|' + punc[1] + ')/ig',
						'/(' + latin + '|' + punc[2] + ')(' + hanzi + ')/ig'
					]


				patterns.forEach(function( exp ){
					findAndReplaceDOMText(this, {
						find: eval(exp),
						replace: '$1<hanla>$2'
					})
				}, this)

			   findAndReplaceDOMText(this, {
					find: '<hanla>',
					replace: function(){
						return document.createElement('hanla')
					}
				})

			   this.normalize()

				$('* > hanla:first-child').parent().each(function(){
					if ( this.firstChild.nodeType == 1 ) {
						$(this).before( $('<hanla/>') )
						$(this).find('hanla:first-child').remove()
					}
				})
			})



		/* 
		 * 修正相鄰註記元素`<u>`的底線相連問題
		 * ---
		 * fixing the underline-adjacency issue on `<u>` element
		 *
		 */

		if ( $('html').hasClass('han-lab-underline') )
			$(range).find('u').charize('', true, true)
		else
			$(range).find('u').each(function(){
				var next = this.nextSibling

				while ( next != null && ( next.nodeName === "WBR" || next.nodeType == 8 ))
					next = next.nextSibling

				$(next).filter('u').addClass('adjacent')
			})



		/* 強調元素`<em>`的着重號
		 * ---
		 * punctuation: CJK emphasis dots on `<em>` element
		 *
		 */

		$(range).find('em').charize({
			latin: ( tests['textemphasis']() ) ? 'none' : 'individual'
		})
	},



	unicode_set = function( set ) {
		var join = ( set.match(/[hanzi|latin]/) ) ? true : false,
		result = ( join ) ? unicode[set].join('|') : unicode[set]

		return result
	},


	_span = function( className ) {
		var span = document.createElement('span')
		span.className = className

		return span
	},


	_copy = function() {
		return $(document.createElement('copy'))
	},


	_apply_annotation = function( node ) {
		$(node).find('rbc').find('rb')
		.each(function(i){
			$(this).attr('index', i)
		})

		$(node).find('rtc:not(.zhuyin)')
		.hide()
		.each(function(t){
			var c = 0,
				rtc = $(this),
				rbc = $(this).prevAll('rbc'),
				len = $(this).find('rt').length,
				data = []

			$(this).find('rt')
			.each(function(h){
				var anno 	= $(this).html(),
					rbspan 	= $(this).attr('rbspan') || 1,
					i		= c

				c += Number(rbspan)

				data[h] = {
					'annotation': anno,
					'order': (t==0) ? '1' : '2'
				}

				for ( var j=i; j<c; j++ ) {
					rbc.find('rb[index]')
					.eq(j).attr({ 'set': h })
				}
			})

			rbc.find('rb[annotation]')
			.each(function(){
				var rb = $(this).find('rb[index]'),
					first = rb.filter(':first-child').attr('set'),
					last = rb.filter(':last-child').attr('set')

				if ( first === last ) {
					rb.removeAttr('set')
					$(this).attr('set', first)
				}
			})

			for ( var k=0; k<len; k++ ) {
				rbc
				.find('rb[set='+ k +']')
				.wrapAll(
					$('<rb/>')
					.attr( data[k] )
				)
			}
		})

		$(node).find('rb')
		.after(' ')
		.removeAttr('set index')
		.filter('rb[annotation]')
		.each(function(){
			var t = $(this).attr('annotation')
			$(this).after( _copy().html( t ) )
		})
	},


	_get_zhuyin_font = function( node ) {
		var reg = /(sans-serif|monospace)$/,
			generic = $(node).css('font-family'),
        	font = generic.match(reg) ? 'sans-serif' : 'serif'
		
		return font
	},


	_apply_zhuyin = function( node, rb ) {
		var sm 		= unicode['zhuyin']['shengmu'],
			jy 		= unicode['zhuyin']['jieyin'],
			ym 		= unicode['zhuyin']['yunmu'],
			yj 		= unicode['zhuyin']['yunjiao'],
			tone 	= unicode['zhuyin']['diao'],

			prev, text, zi,
			zy = $(node).html(),
			yin, diao, form, length, data

		form = 	( zy.match(eval('/(' + sm + ')/')) ) ? 'shengmu' : ''
		form += ( zy.match(eval('/(' + jy + ')/')) ) ? (( form !== '' ) ? '-' : '') + 'jieyin' : ''
		form += ( zy.match(eval('/(' + ym + ')/')) ) ? (( form !== '' ) ? '-' : '') + 'yunmu' : ''

		yin = zy
			.replace(eval('/(' + tone + ')/g'), '')
			.replace(eval('/(' + yj + '̍)/g'), '')

		length = (yin) ? yin.length : 0

		diao = 	( zy.match(/(\u02D9)/) ) 					? '\u02D9' : 
				( zy.match(/(\u02CA)/) ) 					? '\u02CA' : 
				( zy.match(/([\u02C5\u02C7])/) ) 			? '\u02C7' :
				( zy.match(/(\u02CB)/) ) 					? '\u02CB' : 
				( zy.match(/(\u02EA)/) ) 					? '\u02EA' : 
				( zy.match(/(\u02EB)/) ) 					? '\u02EB' : 
				( zy.match(/(\u31B4[\u0358\u030d])/) ) 		? '\u31B4\u0358' : 
				( zy.match(/(\u31B5[\u0358\u030d])/) ) 		? '\u31B5\u0358' :
				( zy.match(/(\u31B6[\u0358\u030d])/) ) 		? '\u31B6\u0358' :
				( zy.match(/(\u31B7[\u0358\u030d])/) ) 		? '\u31B7\u0358' :
				( zy.match(/(\u31B4)/) ) 					? '\u31B4' : 
				( zy.match(/(\u31B5)/) ) 					? '\u31B5' :
				( zy.match(/(\u31B6)/) ) 					? '\u31B6' :
				( zy.match(/(\u31B7)/) ) 					? '\u31B7' : ''

		data = {
			'zhuyin': zy,
			'yin': yin,
			'diao': diao,
			'length': length,
			'form': form
		}

		if ( rb )
			rb
			.attr(data)
			.append( _copy().html( zy ) )
		else {
			prev = node.previousSibling
			text = prev.nodeValue.split('')
			zi = text.pop()
			prev.nodeValue = text.join('')

			$(node)
			.before( 
				$('<rb/>')
				.attr(data)
				.text( zi )
			)
			.after( ' ' )
			//.replaceWith( '' )
			.replaceWith( _copy().html( zy ) )
		}
	},


	findAndReplaceDOMText = function( a, b ) {
		var b = b

		b.filterElements = function( el ) {
			var name = el.nodeName.toLowerCase(),
				classes = ( el.nodeType == 1 ) ? el.getAttribute('class') : '',
				charized = ( classes && classes.match(/han-js-charized/) != null ) ? true : false

			return name !== 'style' && name !== 'script' && !charized
		}

		return window.findAndReplaceDOMText(a,b)
	},


	inject_element_with_styles = function( rule, callback, nodes, testnames ) {
		var style, ret, node, docOverflow,
	
			docElement = document.documentElement,
			div = document.createElement('div'),
			body = document.body,
			fakeBody = body || document.createElement('body')

	
		style = ['<style id="han-support">', rule, '</style>'].join('')
	
		;(body ? div : fakeBody).innerHTML += style
		fakeBody.appendChild(div)
	
		if ( !body ) {
			fakeBody.style.background = ''
			fakeBody.style.overflow = 'hidden'
			docOverflow = docElement.style.overflow
			docElement.style.overflow = 'hidden'
			docElement.appendChild(fakeBody)
		}
	
		ret = callback(div, rule)
	
		if ( !body ) {
			fakeBody.parentNode.removeChild(fakeBody)
			docElement.style.overflow = docOverflow
		} else
			div.parentNode.removeChild(div)
	
		return !!ret
	},


	write_on_canvas = function( text, font ) {
		var canvasNode = document.createElement('canvas')
		canvasNode.width = '50'
		canvasNode.height = '20'

		canvasNode.style.display = 'none'
		canvasNode.className = 'han_support_tests'
		document.body.appendChild(canvasNode)
		var ctx = canvasNode.getContext('2d')

		ctx.textBaseline = 'top'
		ctx.font = '15px ' + font + ', sans-serif'
		ctx.fillStyle = 'black'
		ctx.strokeStyle = 'black'

		ctx.fillText( text, 0, 0 )

		return ctx
	},


	test_for_fontface = function( test, compare, zi ) {
		if ( !tests['fontface']() )
			return false

		var test = test,
			compare = compare || 'sans-serif',
			zi = zi || '辭Q'

		try {
			var sans = write_on_canvas( zi, compare ),
				test = write_on_canvas( zi, test ),
				support

			for (var j=1; j<=20; j++) {
				for (var i=1; i<=50; i++) {
					var sansData = sans.getImageData(i, j, 1, 1).data,
						testData = test.getImageData(i, j, 1, 1).data,

						alpha = []

					alpha['sans'] = sansData[3]
					alpha['test'] = testData[3]

					if ( support !== 'undefined' && alpha['test'] != alpha['sans'] )
						support = true
					else if ( support )
						break
					if ( i == 20 && j == 20 && !support )
						support = false
				}
			}

			$('canvas.han_support_tests').remove()
			return support
		} catch ( err ) {
			return false
		}
	}


	test_for_unicoderange = function() {
		return !test_for_fontface( 'han-unicode-range', 'Arial, "Droid Sans"', 'a' )
	}


	/**
	 * --------------------------------------------------------
	 * Unicode區段說明（6.2.0）
	 * Unicode blocks
	 * --------------------------------------------------------
	 * 或參考：
	 * http://css.hanzi.co/manual/api/javascript_jiekou-han.unicode
	 * --------------------------------------------------------
	 *
	 ** 以下歸類為「拉丁字母」（`unicode('latin')`）**
	 *
	 * 基本拉丁字母：a-z
	 * 阿拉伯數字：0-9
	 * 拉丁字母補充-1：[\u00C0-\u00FF]
	 * 拉丁字母擴展-A區：[\u0100-\u017F]
	 * 拉丁字母擴展-B區：[\u0180-\u024F]
	 * 拉丁字母附加區：[\u1E00-\u1EFF]
	 *
	 ** 符號：[~!@#&=_\$\%\^\*\-\+\,\.\/(\\)\?\:\'\"\[\]\(\)'"<>‘“”’]
	 *
	 * --------------------------------------------------------
	 *
	 ** 以下歸類為「漢字」（`unicode（'hanzi')`）**
	 *
	 * CJK一般：[\u4E00-\u9FFF]
	 * CJK擴展-A區：[\u3400-\u4DB5]
	 * CJK擴展-B區：[\u20000-\u2A6D6]
	 * CJK Unicode 4.1：[\u9FA6-\u9FBB]、[\uFA70-\uFAD9]
	 * CJK Unicode 5.1：[\u9FBC-\u9FC3]
	 * CJK擴展-C區：[\u2A700-\u2B734]
	 * CJK擴展-D區：[\u2B740-\u2B81D]（急用漢字）
	 * CJK擴展-E區：[\u2B820-\u2F7FF]（**註**：暫未支援）
	 * CJK擴展-F區（**註**：暫未支援）
	 * CJK筆畫區：[\u31C0-\u31E3]
	 * 數字「〇」：[\u3007]
	 * 日文假名：[\u3040-\u309E][\u30A1-\u30FA][\u30FD\u30FE]（**註**：排除片假名中點、長音符）
	 *
	 * CJK相容表意文字：
	 * [\uF900-\uFAFF]（**註**：不使用）
	 * [\uFA0E-\uFA0F\uFA11\uFA13-\uFA14\uFA1F\uFA21\uFA23-\uFA24\uFA27-\uFA29]（**註**：12個例外）
	 * --------------------------------------------------------
	 *
	 ** 符號
	 * [·・︰、，。：；？！—⋯…．·「『（〔【《〈“‘」』）〕】》〉’”–ー—]
	 *
	 ** 其他
	 *
	 * 漢語注音符號、擴充：[\u3105-\u312D][\u31A0-\u31BA]
	 * 國語五聲調（三聲有二種符號）：[\u02D9\u02CA\u02C5\u02C7\u02CB]
	 * 台灣漢語方言音擴充聲調：[\u02EA\u02EB]
	 *
	 */

	unicode['latin'] = [
		'[A-Za-z0-9\u00C0-\u00FF\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF]'
	]

	unicode['punc'] = [
		'[@&=_\,\.\?\!\$\%\^\*\-\+\/]',
		'[\(\\[\'"<‘“]',
		'[\)\\]\'">”’]'
	]

	unicode['hanzi'] = [
		'[\u4E00-\u9FFF]',
		'[\u3400-\u4DB5\u9FA6-\u9FBB\uFA70-\uFAD9\u9FBC-\u9FC3\u3007\u3040-\u309E\u30A1-\u30FA\u30FD\u30FE\uFA0E-\uFA0F\uFA11\uFA13-\uFA14\uFA1F\uFA21\uFA23-\uFA24\uFA27-\uFA29]',
		'[\uD840-\uD868][\uDC00-\uDFFF]|\uD869[\uDC00-\uDEDF]',
		'\uD86D[\uDC00-\uDF3F]|[\uD86A-\uD86C][\uDC00-\uDFFF]|\uD869[\uDF00-\uDFFF]',
		'\uD86D[\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1F]',
		'[\u31C0-\u31E3]'
	]

	unicode['biaodian'] = [
		'[·・︰、，。：；？！—ー⋯…．·／]',
		'[「『（〔【《〈“‘]',
		'[」』）〕】》〉’”]'
	]

	unicode['zhuyin'] = []
	unicode['zhuyin'][0] = '[\u3105-\u312D\u31A0-\u31BA]'
	unicode['zhuyin']['shengmu'] = '[\u3105-\u3119\u312A-\u312C\u31A0-\u31A3]'
	unicode['zhuyin']['jieyin'] = '[\u3127-\u3129]'
	unicode['zhuyin']['yunmu'] = '[\u311A-\u3126\u312D\u31A4-\u31B3\u31B8-\u31BA]'
	unicode['zhuyin']['yunjiao'] = '[\u31B4-\u31B7]'
	unicode['zhuyin']['diao'] = '[\u02D9\u02CA\u02C5\u02C7\u02CB\u02EA\u02EB]'



	/**
	 * tests for HTML5/CSS3 features
	 *
	 */

	/* CSS3 property: `column-width` */
	tests['columnwidth'] = function() {
		var cw = $('<div style="display: none; column-width: 200px; -webkit-column-width: 200px">tester</div>'),

			bool = ( /^200px$/.test( cw.css("-webkit-column-width") ) ||
				/^200px$/.test( cw.css("-moz-column-width") ) ||
				/^200px$/.test( cw.css("-ms-column-width") ) ||
				/^200px$/.test( cw.css("column-width") ) ) ? true : false

		return bool
	}


   /* --------------------------------------------------------
	* test for '@font-face'
	* -------------------------------------------------------- 
	* Originates from Modernizr (http://modernizr.com)
	*/

	tests['fontface'] = function() {
		var bool

		inject_element_with_styles('@font-face {font-family:"font"; src:url("https://")}', function( node, rule ) {
		  var style = document.getElementById('han-support'),
			  sheet = style.sheet || style.styleSheet,
			  cssText = sheet ? (sheet.cssRules && sheet.cssRules[0] ? sheet.cssRules[0].cssText : sheet.cssText || '') : ''

		  bool = /src/i.test(cssText) && cssText.indexOf(rule.split(' ')[0]) === 0
		})

		return bool
	}
			

	tests['ruby'] = function() {
		if ( rubies != null )
			return rubies


		var ruby = document.createElement('ruby'),
			rt = document.createElement('rt'),
			rp = document.createElement('rp'),
			docElement = document.documentElement,
			displayStyleProperty = 'display'

		ruby.appendChild(rp)
		ruby.appendChild(rt)
		docElement.appendChild(ruby)

		  // browsers that support <ruby> hide the <rp> via "display:none"
		rubies = ( getStyle(rp, displayStyleProperty) == 'none' ||
		  // but in IE browsers <rp> has "display:inline" so, the test needs other conditions:
		  getStyle(ruby, displayStyleProperty) == 'ruby'
		  && getStyle(rt, displayStyleProperty) == 'ruby-text' ) ? true : false


		docElement.removeChild(ruby)
		// the removed child node still exists in memory, so ...
		ruby = null
		rt = null
		rp = null

		return rubies


		function getStyle( element, styleProperty ) {
			var result

			if ( window.getComputedStyle )	 // for non-IE browsers
				result = document.defaultView.getComputedStyle(element,null).getPropertyValue(styleProperty)
			else if ( element.currentStyle )   // for IE
				result = element.currentStyle[styleProperty]

			return result
		}
	}


	tests['textemphasis'] = function() {
		var em = $('<span style="display: none; text-emphasis: dot; -moz-text-emphasis: dot; -ms-text-emphasis: dot; -webkit-text-emphasis: dot">tester</span>'),

			bool = ( /^dot$/.test( em.css("-webkit-text-emphasis-style") ) ||
				/^dot$/.test( em.css("text-emphasis-style") ) ||
				/^dot$/.test( em.css("-moz-text-emphasis-style") ) ||
				/^dot$/.test( em.css("-ms-text-emphasis-style") ) ) ? true : false

		return bool
	}


	tests['writingmode'] = function() {
		var wm = $('<div style="display: none; writing-mode: tb-rl; -moz-writing-mode: tb-rl; -ms-writing-mode: tb-rl; -webkit-writing-mode: vertical-rl">tester</div>'),

			bool = ( /^tb-rl$/.test( wm.css("writing-mode") ) ||
					 /^vertical-rl$/.test( wm.css("-webkit-writing-mode") ) || 
					 /^tb-rl$/.test( wm.css("-moz-writing-mode") ) ||
					 /^tb-rl$/.test( wm.css("-ms-writing-mode") ) ) ? true: false

		return bool
	}



	$.fn.extend({
		hanInit: function() {
			return init(this)
		},


		bitouwei: function() {
			return this.each(function(){
				$(this).addClass( 'han-js-bitouwei-rendered' )

				var tou = unicode['biaodian'][0] + unicode['biaodian'][2],
					wei = unicode['biaodian'][1],
					start = unicode['punc'][0] + unicode['punc'][2],
					end = unicode['punc'][1]

				tou = tou.replace(/\]\[/g, '' )
				start = start.replace(/\]\[/g, '' )


				// CJK characters
				findAndReplaceDOMText(this, {
					find: eval( '/(' + wei + ')(' + unicode_set('hanzi') + ')(' + tou + ')/ig' ),
					wrap: _span( 'bitouwei bitouweidian' )
				})

				findAndReplaceDOMText(this, {
					find: eval( '/(' + unicode_set('hanzi') + ')(' + tou + ')/ig' ),
					wrap: _span( 'bitouwei bitoudian' )
				})

				findAndReplaceDOMText(this, {
					find: eval( '/(' + wei + ')(' + unicode_set('hanzi') + ')/ig' ),
					wrap: _span( 'bitouwei biweidian' )
				})


				// Latin letters
				findAndReplaceDOMText(this, {
					find: eval( '/(' + end + ')(' + unicode_set('latin') + '+)(' + start + ')/ig' ),
					wrap: _span( 'bitouwei bitouweidian' )
				})

				findAndReplaceDOMText(this, {
					find: eval( '/(' + unicode_set('latin') + '+)(' + start + ')/ig' ),
					wrap: _span( 'bitouwei bitoudian' )
				})

				findAndReplaceDOMText(this, {
					find: eval( '/(' + end + ')(' + unicode_set('latin') + '+)/ig' ),
					wrap: _span( 'bitouwei biweidian' )
				})
			})
		},


		charize: function( glyph, charClass, innerSpan ){
			var glyph = glyph || {},
			charClass = (charClass == true) ? true : false

			glyph = {
				cjk: glyph.cjk || 'individual',
				bitouwei: (glyph.bitouwei == false) ? false : true,
				latin: glyph.latin || 'group'
			}

			return this.each(function(){
				if ( glyph.bitouwei )
					$(this).bitouwei()


				// CJK characters
				if ( glyph.cjk === 'individual' )
					findAndReplaceDOMText(this, {
						find: eval( '/(' + unicode_set('hanzi') + ')/ig' ),
						wrap: _span( 'char cjk' )
					})


				if ( glyph.cjk === 'individual' || glyph.cjk === 'biaodian' )
					findAndReplaceDOMText(this, {
						find: eval( '/(' + unicode_set('biaodian') + ')/ig' ),
						wrap: _span( 'char cjk biaodian' )
					})


				if ( glyph.cjk === 'group' )
					findAndReplaceDOMText(this, {
						find: eval( '/(' + unicode_set('hanzi') + '+|' + unicode_set('biaodian') + '+)/ig' ),
						wrap: _span( 'char cjk' )
					})


				var latin_regex = ( glyph.latin === 'group' ) ?
					'/(' + unicode_set('latin') + '+)/ig' :
					'/(' + unicode_set('latin') + ')/ig'

				findAndReplaceDOMText(this, {
					find: eval( latin_regex ),
					wrap: _span( 'char latin' )
				})


				findAndReplaceDOMText(this, {
					find: eval( '/(' + unicode_set('punc') + '+)/ig' ),
					wrap: _span( 'char latin punc' )
				})

				findAndReplaceDOMText(this, {
					find: /([\s]+)/ig,
					wrap: _span( 'char space' )
				})


				if ( innerSpan )
					$(this).find('.char').each(function(){
						$(this).html(
							$('<span>').text( $(this).text() )
						)
					})


				if ( charClass ) 
					$(this).addClass('han-js-charized')
			})
		}
	})


	// tests
	for ( var feature in tests ) {
		classes.push( ( tests[feature]() ? '' : 'no-' ) + feature )

		if ( !tester )
			var tester = ''
 
		tester += '	' + feature + ': tests[\'' + feature + '\'](),\n'
	}

	!function(window) {
		eval("tester = ({\n" + tester.replace(/\n$/ig, 
			'\nunicoderange: test_for_unicoderange, \nfont: test_for_fontface\n}') + ")")
	}()



	han()

	window.han = {
		unicode: unicode_set,
		support: tester
	}

})(jQuery)


/**
 * findAndReplaceDOMText v 0.4.0
 * @author James Padolsey http://james.padolsey.com
 * @license http://unlicense.org/UNLICENSE
 *
 * Matches the text of a DOM node against a regular expression
 * and replaces each match (or node-separated portions of the match)
 * in the specified element.
 */
;window.findAndReplaceDOMText = (function() {

	var PORTION_MODE_RETAIN = 'retain';
	var PORTION_MODE_FIRST = 'first';

	var doc = document;
	var toString = {}.toString;

	function isArray(a) {
		return toString.call(a) == '[object Array]';
	}

	function escapeRegExp(s) {
		return String(s).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
	}

	function exposed() {
		// Try deprecated arg signature first:
		return deprecated.apply(null, arguments) || findAndReplaceDOMText.apply(null, arguments);
	}

	function deprecated(regex, node, replacement, captureGroup, elFilter) {
		if ((node && !node.nodeType) && arguments.length <= 2) {
			return false;
		}
		var isReplacementFunction = typeof replacement == 'function';

		if (isReplacementFunction) {
			replacement = (function(original) {
				return function(portion, match) {
					return original(portion.text, match.startIndex);
				};
			}(replacement));
		}

		// Awkward support for deprecated argument signature (<0.4.0)
		var instance = findAndReplaceDOMText(node, {

			find: regex,

			wrap: isReplacementFunction ? null : replacement,
			replace: isReplacementFunction ? replacement : '$' + (captureGroup || '&'),

			prepMatch: function(m, mi) {

				// Support captureGroup (a deprecated feature)

				if (!m[0]) throw 'findAndReplaceDOMText cannot handle zero-length matches';

				if (captureGroup > 0) {
					var cg = m[captureGroup];
					m.index += m[0].indexOf(cg);
					m[0] = cg;
				}
		 
				m.endIndex = m.index + m[0].length;
				m.startIndex = m.index;
				m.index = mi;

				return m;
			},
			filterElements: elFilter
		});

		exposed.revert = function() {
			return instance.revert();
		};

		return true;
	}

	/** 
	 * findAndReplaceDOMText
	 * 
	 * Locates matches and replaces with replacementNode
	 *
	 * @param {Node} node Element or Text node to search within
	 * @param {RegExp} options.find The regular expression to match
	 * @param {String|Element} [options.wrap] A NodeName, or a Node to clone
	 * @param {String|Function} [options.replace='$&'] What to replace each match with
	 * @param {Function} [options.filterElements] A Function to be called to check whether to
	 *  process an element. (returning true = process element,
	 *  returning false = avoid element)
	 */
	function findAndReplaceDOMText(node, options) {
		return new Finder(node, options);
	}

	exposed.Finder = Finder;

	/**
	 * Finder -- encapsulates logic to find and replace.
	 */
	function Finder(node, options) {

		options.portionMode = options.portionMode || PORTION_MODE_RETAIN;

		this.node = node;
		this.options = options;

		// ENable match-preparation method to be passed as option:
		this.prepMatch = options.prepMatch || this.prepMatch;

		this.reverts = [];

		this.matches = this.search();

		if (this.matches.length) {
			this.processMatches();
		}

	}

	Finder.prototype = {

		/**
		 * Searches for all matches that comply with the instance's 'match' option
		 */
		search: function() {

			var match;
			var matchIndex = 0;
			var regex = this.options.find;
			var text = this.getAggregateText();
			var matches = [];

			regex = typeof regex === 'string' ? RegExp(escapeRegExp(regex), 'g') : regex;

			if (regex.global) {
				while (match = regex.exec(text)) {
					matches.push(this.prepMatch(match, matchIndex++));
				}
			} else {
				if (match = text.match(regex)) {
					matches.push(this.prepMatch(match, 0));
				}
			}

			return matches;

		},

		/**
		 * Prepares a single match with useful meta info:
		 */
		prepMatch: function(match, matchIndex) {

			if (!match[0]) {
				throw new Error('findAndReplaceDOMText cannot handle zero-length matches');
			}
	 
			match.endIndex = match.index + match[0].length;
			match.startIndex = match.index;
			match.index = matchIndex;

			return match;
		},

		/**
		 * Gets aggregate text within subject node
		 */
		getAggregateText: function() {

			var elementFilter = this.options.filterElements;

			return getText(this.node);

			/**
			 * Gets aggregate text of a node without resorting
			 * to broken innerText/textContent
			 */
			function getText(node) {

				if (node.nodeType === 3) {
					return node.data;
				}

				if (elementFilter && !elementFilter(node)) {
					return '';
				}

				var txt = '';

				if (node = node.firstChild) do {
					txt += getText(node);
				} while (node = node.nextSibling);

				return txt;

			}

		},

		/** 
		 * Steps through the target node, looking for matches, and
		 * calling replaceFn when a match is found.
		 */
		processMatches: function() {

			var matches = this.matches;
			var node = this.node;
			var elementFilter = this.options.filterElements;

			var startPortion,
				endPortion,
				innerPortions = [],
				curNode = node,
				match = matches.shift(),
				atIndex = 0, // i.e. nodeAtIndex
				matchIndex = 0,
				portionIndex = 0,
				doAvoidNode;

			out: while (true) {

				if (curNode.nodeType === 3) {

					if (!endPortion && curNode.length + atIndex >= match.endIndex) {

						// We've found the ending
						endPortion = {
							node: curNode,
							index: portionIndex++,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex),
							indexInMatch: atIndex - match.startIndex,
							indexInNode: match.startIndex - atIndex, // always zero for end-portions
							endIndexInNode: match.endIndex - atIndex,
							isEnd: true
						};

					} else if (startPortion) {
						// Intersecting node
						innerPortions.push({
							node: curNode,
							index: portionIndex++,
							text: curNode.data,
							indexInMatch: atIndex - match.startIndex,
							indexInNode: 0 // always zero for inner-portions
						});
					}

					if (!startPortion && curNode.length + atIndex > match.startIndex) {
						// We've found the match start
						startPortion = {
							node: curNode,
							index: portionIndex++,
							indexInMatch: 0,
							indexInNode: match.startIndex - atIndex,
							endIndexInNode: match.endIndex - atIndex,
							text: curNode.data.substring(match.startIndex - atIndex, match.endIndex - atIndex)
						};
					}

					atIndex += curNode.data.length;

				}

				doAvoidNode = curNode.nodeType === 1 && elementFilter && !elementFilter(curNode);

				if (startPortion && endPortion) {

					curNode = this.replaceMatch(match, startPortion, innerPortions, endPortion);

					// processMatches has to return the node that replaced the endNode
					// and then we step back so we can continue from the end of the 
					// match:

					atIndex -= (endPortion.node.data.length - endPortion.endIndexInNode);

					startPortion = null;
					endPortion = null;
					innerPortions = [];
					match = matches.shift();
					portionIndex = 0;
					matchIndex++;

					if (!match) {
						break; // no more matches
					}

				} else if (
					!doAvoidNode &&
					(curNode.firstChild || curNode.nextSibling)
				) {
					// Move down or forward:
					curNode = curNode.firstChild || curNode.nextSibling;
					continue;
				}

				// Move forward or up:
				while (true) {
					if (curNode.nextSibling) {
						curNode = curNode.nextSibling;
						break;
					} else if (curNode.parentNode !== node) {
						curNode = curNode.parentNode;
					} else {
						break out;
					}
				}

			}

		},

		/**
		 * Reverts ... TODO
		 */
		revert: function() {
			// Reversion occurs backwards so as to avoid nodes subsequently
			// replaced during the matching phase (a forward process):
			for (var l = this.reverts.length; l--;) {
				this.reverts[l]();
			}
			this.reverts = [];
		},

		prepareReplacementString: function(string, portion, match, matchIndex) {
			var portionMode = this.options.portionMode;
			if (
				portionMode === PORTION_MODE_FIRST &&
				portion.indexInMatch > 0
			) {
				return '';
			}
			string = string.replace(/\$(\d+|&|`|')/g, function($0, t) {
				var replacement;
				switch(t) {
					case '&':
						replacement = match[0];
						break;
					case '`':
						replacement = match.input.substring(0, match.startIndex);
						break;
					case '\'':
						replacement = match.input.substring(match.endIndex);
						break;
					default:
						replacement = match[+t];
				}
				return replacement;
			});

			if (portionMode === PORTION_MODE_FIRST) {
				return string;
			}

			if (portion.isEnd) {
				return string.substring(portion.indexInMatch);
			}

			return string.substring(portion.indexInMatch, portion.indexInMatch + portion.text.length);
		},

		getPortionReplacementNode: function(portion, match, matchIndex) {

			var replacement = this.options.replace || '$&';
			var wrapper = this.options.wrap;

			if (wrapper && wrapper.nodeType) {
				// Wrapper has been provided as a stencil-node for us to clone:
				var clone = doc.createElement('div');
				clone.innerHTML = wrapper.outerHTML || new XMLSerializer().serializeToString(wrapper);
				wrapper = clone.firstChild;
			}

			if (typeof replacement == 'function') {
				replacement = replacement(portion, match, matchIndex);
				if (replacement && replacement.nodeType) {
					return replacement;
				}
				return doc.createTextNode(String(replacement));
			}

			var el = typeof wrapper == 'string' ? doc.createElement(wrapper) : wrapper;

			replacement = doc.createTextNode(
				this.prepareReplacementString(
					replacement, portion, match, matchIndex
				)
			);

			if (!el) {
				return replacement;
			}

			el.appendChild(replacement);

			return el;
		},

		replaceMatch: function(match, startPortion, innerPortions, endPortion) {

			var matchStartNode = startPortion.node;
			var matchEndNode = endPortion.node;

			var preceedingTextNode;
			var followingTextNode;

			if (matchStartNode === matchEndNode) {

				var node = matchStartNode;

				if (startPortion.indexInNode > 0) {
					// Add `before` text node (before the match)
					preceedingTextNode = doc.createTextNode(node.data.substring(0, startPortion.indexInNode));
					node.parentNode.insertBefore(preceedingTextNode, node);
				}

				// Create the replacement node:
				var newNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				node.parentNode.insertBefore(newNode, node);

				if (endPortion.endIndexInNode < node.length) { // ?????
					// Add `after` text node (after the match)
					followingTextNode = doc.createTextNode(node.data.substring(endPortion.endIndexInNode));
					node.parentNode.insertBefore(followingTextNode, node);
				}

				node.parentNode.removeChild(node);

				this.reverts.push(function() {
					if (preceedingTextNode === newNode.previousSibling) {
						preceedingTextNode.parentNode.removeChild(preceedingTextNode);
					}
					if (followingTextNode === newNode.nextSibling) {
						followingTextNode.parentNode.removeChild(followingTextNode);
					}
					newNode.parentNode.replaceChild(node, newNode);
				});

				return newNode;

			} else {
				// Replace matchStartNode -> [innerMatchNodes...] -> matchEndNode (in that order)


				preceedingTextNode = doc.createTextNode(
					matchStartNode.data.substring(0, startPortion.indexInNode)
				);

				followingTextNode = doc.createTextNode(
					matchEndNode.data.substring(endPortion.endIndexInNode)
				);

				var firstNode = this.getPortionReplacementNode(
					startPortion,
					match
				);

				var innerNodes = [];

				for (var i = 0, l = innerPortions.length; i < l; ++i) {
					var portion = innerPortions[i];
					var innerNode = this.getPortionReplacementNode(
						portion,
						match
					);
					portion.node.parentNode.replaceChild(innerNode, portion.node);
					this.reverts.push((function(portion, innerNode) {
						return function() {
							innerNode.parentNode.replaceChild(portion.node, innerNode);
						};
					}(portion, innerNode)));
					innerNodes.push(innerNode);
				}

				var lastNode = this.getPortionReplacementNode(
					endPortion,
					match
				);

				matchStartNode.parentNode.insertBefore(preceedingTextNode, matchStartNode);
				matchStartNode.parentNode.insertBefore(firstNode, matchStartNode);
				matchStartNode.parentNode.removeChild(matchStartNode);

				matchEndNode.parentNode.insertBefore(lastNode, matchEndNode);
				matchEndNode.parentNode.insertBefore(followingTextNode, matchEndNode);
				matchEndNode.parentNode.removeChild(matchEndNode);

				this.reverts.push(function() {
					preceedingTextNode.parentNode.removeChild(preceedingTextNode);
					firstNode.parentNode.replaceChild(matchStartNode, firstNode);
					followingTextNode.parentNode.removeChild(followingTextNode);
					lastNode.parentNode.replaceChild(matchEndNode, lastNode);
				});

				return lastNode;
			}
		}

	};

	return exposed;

}());

