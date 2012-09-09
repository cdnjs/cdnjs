;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		this.regexList = [
			{ regex: /^\+\+\+ .*$/gm,	css: 'color2' },	// new file
			{ regex: /^\-\-\- .*$/gm,	css: 'color2' },	// old file
			{ regex: /^\s.*$/gm,		css: 'color1' },	// unchanged
			{ regex: /^@@.*@@.*$/gm,	css: 'variable' },	// location
			{ regex: /^\+.*$/gm,		css: 'string' },	// additions
			{ regex: /^\-.*$/gm,		css: 'color3' }		// deletions
			];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['diff', 'patch'];

	SyntaxHighlighter.brushes.Diff = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
