(function (w) {
	'use strict';

	var TABLE_NAME = 'hljs-ln',
	    LINE_NAME = 'hljs-ln-line',
	    CODE_BLOCK_NAME = 'hljs-ln-code',
	    NUMBERS_BLOCK_NAME = 'hljs-ln-numbers',
	    NUMBER_LINE_NAME = 'hljs-ln-n',
	    DATA_ATTR_NAME = 'data-line-number';

	// https://wcoder.github.io/notes/string-format-for-string-formating-in-javascript
	String.prototype.format = String.prototype.f = function () {
		var args = arguments;
		return this.replace(/\{(\d+)\}/g, function(m, n){
			return args[n] ? args[n] : m;
		});
	};

	if (typeof w.hljs === 'undefined') {
		console.error('highlight.js not detected!');
	} else {
		w.hljs.initLineNumbersOnLoad = initLineNumbersOnLoad;
		w.hljs.lineNumbersBlock = lineNumbersBlock;

		addStyles();
	}

	function addStyles () {
		var css = document.createElement('style');
		css.type = 'text/css';
		css.innerHTML = ('.{0}{border-collapse:collapse}' +
		                 '.{0} td{padding:0}' +
		                 '.{1}:before{content:attr({2})}').format(TABLE_NAME, NUMBER_LINE_NAME, DATA_ATTR_NAME);
		document.getElementsByTagName('head')[0].appendChild(css);
	}

	function initLineNumbersOnLoad () {
		if (document.readyState === 'complete') {
			documentReady();
		} else {
			w.addEventListener('DOMContentLoaded', documentReady);
		}
	}

	function documentReady () {
		try {
			var blocks = document.querySelectorAll('code.hljs');

			for (var i in blocks) {
				if (blocks.hasOwnProperty(i)) {
					lineNumbersBlock(blocks[i]);
				}
			}
		} catch (e) {
			console.error('LineNumbers error: ', e);
		}
	}

	function lineNumbersBlock (element) {
		if (typeof element !== 'object') return;

		var lines = getLines(element.innerHTML);

		if (lines.length > 1) {
			var html = '';

			for (var i = 0; i < lines.length; i++) {
				html += ('<tr><td class="{0}"><div class="{1} {2}" {3}="{5}"></div></td>' +
				         '<td class="{4}"><div class="{1}">{6}</div></td></tr>').format(
				             NUMBERS_BLOCK_NAME,
				             LINE_NAME,
				             NUMBER_LINE_NAME,
				             DATA_ATTR_NAME,
				             CODE_BLOCK_NAME,
				             i + 1,
				             lines[i].length > 0 ? lines[i] : ' ');
			}

			element.innerHTML = '<table class="{0}">{1}</table>'.format(TABLE_NAME, html);
		}
	}

	function getLines(text) {
		if (text.length === 0) return [];
		return text.split(/\r\n|\r|\n/g);
	}

}(window));