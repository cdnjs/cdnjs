;(function()
{
	// CommonJS
	SyntaxHighlighter = SyntaxHighlighter || (typeof require !== 'undefined'? require('shCore').SyntaxHighlighter : null);

	function Brush()
	{
		// Contributed by Joel 'Jaykul' Bennett, http://PoshCode.org | http://HuddledMasses.org
		var keywords =	'while validateset validaterange validatepattern validatelength validatecount ' +
						'until trap switch return ref process param parameter in if global: '+
						'function foreach for finally filter end elseif else dynamicparam do default ' +
						'continue cmdletbinding break begin alias \\? % #script #private #local #global '+
						'mandatory parametersetname position valuefrompipeline ' +
						'valuefrompipelinebypropertyname valuefromremainingarguments helpmessage ';

		var operators =	' and as band bnot bor bxor casesensitive ccontains ceq cge cgt cle ' +
						'clike clt cmatch cne cnotcontains cnotlike cnotmatch contains ' +
						'creplace eq exact f file ge gt icontains ieq ige igt ile ilike ilt ' +
						'imatch ine inotcontains inotlike inotmatch ireplace is isnot le like ' +
						'lt match ne not notcontains notlike notmatch or regex replace wildcard';
						
		var verbs =		'write where wait use update unregister undo trace test tee take suspend ' +
						'stop start split sort skip show set send select scroll resume restore ' +
						'restart resolve resize reset rename remove register receive read push ' +
						'pop ping out new move measure limit join invoke import group get format ' +
						'foreach export expand exit enter enable disconnect disable debug cxnew ' +
						'copy convertto convertfrom convert connect complete compare clear ' +
						'checkpoint aggregate add';

		// I can't find a way to match the comment based help in multi-line comments, because SH won't highlight in highlights, and javascript doesn't support lookbehind
		var commenthelp = ' component description example externalhelp forwardhelpcategory forwardhelptargetname forwardhelptargetname functionality inputs link notes outputs parameter remotehelprunspace role synopsis';

		this.regexList = [
			{ regex: new RegExp('^\\s*#[#\\s]*\\.('+this.getKeywords(commenthelp)+').*$', 'gim'),			css: 'preprocessor help bold' },		// comment-based help
			{ regex: SyntaxHighlighter.regexLib.singleLinePerlComments,										css: 'comments' },						// one line comments
			{ regex: /(&lt;|<)#[\s\S]*?#(&gt;|>)/gm,														css: 'comments here' },					// multi-line comments
			
			{ regex: new RegExp('@"\\n[\\s\\S]*?\\n"@', 'gm'),												css: 'script string here' },			// double quoted here-strings
			{ regex: new RegExp("@'\\n[\\s\\S]*?\\n'@", 'gm'),												css: 'script string single here' },		// single quoted here-strings
			{ regex: new RegExp('"(?:\\$\\([^\\)]*\\)|[^"]|`"|"")*[^`]"','g'),								css: 'string' },						// double quoted strings
			{ regex: new RegExp("'(?:[^']|'')*'", 'g'),														css: 'string single' },					// single quoted strings
			
			{ regex: new RegExp('[\\$|@|@@](?:(?:global|script|private|env):)?[A-Z0-9_]+', 'gi'),			css: 'variable' },						// $variables
			{ regex: new RegExp('(?:\\b'+verbs.replace(/ /g, '\\b|\\b')+')-[a-zA-Z_][a-zA-Z0-9_]*', 'gmi'),	css: 'functions' },						// functions and cmdlets
			{ regex: new RegExp(this.getKeywords(keywords), 'gmi'),											css: 'keyword' },						// keywords
			{ regex: new RegExp('-'+this.getKeywords(operators), 'gmi'),									css: 'operator value' },				// operators
			{ regex: new RegExp('\\[[A-Z_\\[][A-Z0-9_. `,\\[\\]]*\\]', 'gi'),								css: 'constants' },						// .Net [Type]s
			{ regex: new RegExp('\\s+-(?!'+this.getKeywords(operators)+')[a-zA-Z_][a-zA-Z0-9_]*', 'gmi'),	css: 'color1' },						// parameters	  
		];
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['powershell', 'ps', 'posh'];

	SyntaxHighlighter.brushes.PowerShell = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
