var TAGS = {
	_ : ['<em>','</em>'],
	__ : ['<strong>','</strong>'],
	'\n\n' : ['<br />\n\n', false],
	'>' : ['<blockquote>','</blockquote>'],
	'*' : ['<ul>','</ul>'],
	'#' : ['<ol>','</ol>']
};

var ESCAPED = /[^\\](\\\\)*\\$/;

/** Given a parser context and a Markdown token, returns an opening or closing tag corresponding to the token's type.
 *	@private
 */
function tag(context, token) {
	var norm = token.replace(/\*/g,'_').replace(/^( {2}\n\n*|\n{2,})/g,'\n\n'),
		end = context[context.length-1]===token,
		desc = TAGS[norm];
	if (!desc) { return token; }
	if (desc[1]===false) { return desc[0]; }
	context[end?'pop':'push'](token);
	return desc[ end ? 1 : 0 ];
}

/** Outdent a string based on the first indented line's leading whitespace
 *	@private
 */
function outdent(str) {
	return str.replace(new RegExp('^'+(str.match(/^(\t| )+/) || '')[0], 'gm'), '');
}

/** Encode special attribute characters to HTML entities in a String.
 *	@private
 */
function encodeAttr(str) {
	return str.replace(/"/g, '&quot;');
}

/** Trim leading/trailing newlines only
 *	@private
 */
function trim(str) {
	return str.replace(/^\n+|\n+$/g, '');
}

function parse(md) {
	// eslint-disable-next-line
	var tokenizer = /(?:^```(\w*)\n([\s\S]*?)\n```$)|((?:(?:^|\n+)(?:\t|  {2,}).+)+\n*)|((?:(?:^|\n)([>*+-]|\d+\.)\s+.*)+)|(?:\!\[([^\]]*?)\]\(([^\)]+?)\))|(\[)|(\](?:\(([^\)]+?)\))?)|(?:(?:^|\n+)([^\s].*)\n(\-{3,}|={3,})(?:\n+|$))|(?:(?:^|\n+)(#{1,3})\s*(.+)(?:\n+|$))|(?:`([^`].*?)`)|(  \n\n*|\n{2,}|__|\*\*|[_*])/gm,
		context = [],
		out = '',
		last = 0,
		links = {},
		chunk, prev, token, inner, t;

	md = trim(md).replace(/^\[(.+?)\]:\s*(.+)$/gm, function (s, name, url) {
		links[name.toLowerCase()] = url;
		return '';
	});

	while ( (token=tokenizer.exec(md)) ) {
		prev = md.substring(last, token.index);
		last = tokenizer.lastIndex;
		chunk = token[0];
		if (ESCAPED.test(prev)) {
			// escaped
		}
		// Code/Indent blocks:
		else if (token[2] || token[3]) {
			chunk = '\n<pre class="code '+(token[3]?'poetry':token[1].toLowerCase())+'">'+outdent(trim(token[2] || token[3]))+'</pre>\n';
		}
		// > Quotes, -* lists:
		else if (token[5]) {
			t = token[5];
			if (t.charAt(t.length-1)==='.') {
				t = '.';
				token[4] = token[4].replace(/^\d+/gm, '');
			}
			inner = parse(outdent(token[4].replace(/^\s*[>*+.-]/gm, '')));
			if (t!=='>') {
				t = t==='.' ? '#' : '*';
				inner = inner.replace(/^(.*)$/gm, '\t<li>$1</li>');
			}
			chunk = '\n'+TAGS[t][0]+'\n' + inner + '\n'+TAGS[t][1]+'\n';
		}
		// Images:
		else if (token[7]) {
			chunk = "<img src=\"" + (encodeAttr(token[7])) + "\" alt=\"" + (encodeAttr(token[6])) + "\">";
		}
		// Links:
		else if (token[9]) {
			out = out.replace('<a>', ("<a href=\"" + (encodeAttr(token[10] || links[prev.toLowerCase()])) + "\">"));
			chunk = '</a>';
		}
		else if (token[8]) {
			chunk = '<a>';
		}
		// Headings:
		else if (token[11] || token[13]) {
			t = 'h' + (token[13] ? token[13].length : (token[12][0]==='='?1:2));
			chunk = '\n\n<'+t+'>' + parse(token[11] || token[14]) + '</'+t+'>\n';
		}
		// `code`:
		else if (token[15]) {
			chunk = '<code>'+token[15]+'</code>';
		}
		// Inline formatting: *em*, **strong** & friends
		else if (token[16]) {
			chunk = tag(context, token[16]);
		}
		out += prev;
		out += chunk;
	}

	out += md.substring(last);

	while ((token=context.pop())) {
		out += tag(context, token);
	}

	return trim(out);
}

export default parse;
//# sourceMappingURL=snarkdown.es.js.map
