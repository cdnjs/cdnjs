/**
* C# patterns
*
* @author Dan Stewart
* @version 1.0.1
*/
Rainbow.extend('csharp', [
	{
        // @see http://msdn.microsoft.com/en-us/library/23954zh5.aspx
		'name': 'constant',
		'pattern': /\b(false|null|true)\b/g
	},
	{
		// @see http://msdn.microsoft.com/en-us/library/x53a06bb%28v=vs.100%29.aspx
		// Does not support putting an @ in front of a keyword which makes it not a keyword anymore.
		'name': 'keyword',
		'pattern': /\b(abstract|add|alias|ascending|as|base|bool|break|byte|case|catch|char|checked|class|const|continue|decimal|default|delegate|descending|double|do|dynamic|else|enum|event|explicit|extern|false|finally|fixed|float|foreach|for|from|get|global|goto|group|if|implicit|int|interface|internal|into|in|is|join|let|lock|long|namespace|new|object|operator|orderby|out|override|params|partial|private|protected|public|readonly|ref|remove|return|sbyte|sealed|select|set|short|sizeof|stackalloc|static|string|struct|switch|this|throw|try|typeof|uint|unchecked|ulong|unsafe|ushort|using|value|var|virtual|void|volatile|where|while|yield)\b/g
	},
    {
        'matches': {
            1: 'keyword',
            2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /(typeof)\s([^\$].*?)(\)|;)/g
    },
    {
        'matches': {
            1: 'keyword.namespace',
            2: {
                'name': 'support.namespace',
                'pattern': /\w+/g
            }
        },
        'pattern': /\b(namespace)\s(.*?);/g
    },
    {
        'matches': {
            1: 'storage.modifier',
            2: 'storage.class',
            3: 'entity.name.class',
            4: 'storage.modifier.extends',
            5: 'entity.other.inherited-class'
        },
        'pattern': /\b(abstract|sealed)?\s?(class)\s(\w+)(\sextends\s)?([\w\\]*)?\s?\{?(\n|\})/g
    },
    {
        'name': 'keyword.static',
        'pattern': /\b(static)\b/g
    },
    {
        'matches': {
            1: 'keyword.new',
			2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }

        },
        'pattern': /\b(new)\s([^\$].*?)(?=\)|\(|;|&)/g
    },
	{
		'name': 'string',
		'pattern': /(")(.*?)\1/g
	},
	{
		'name': 'integer',
		'pattern': /\b(0x[\da-f]+|\d+)\b/g
	},
	{
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|(\/\/)[\s\S]*?$/gm
    },
	{
		'name': 'operator',
		// @see http://msdn.microsoft.com/en-us/library/6a71f45d%28v=vs.100%29.aspx
		// ++ += + -- -= - <<= << <= => >>= >> >= != ! ~ ^ || && &= & ?? :: : *= * |= %= |= == =
		'pattern': /(\+\+|\+=|\+|--|-=|-|&lt;&lt;=|&lt;&lt;|&lt;=|=&gt;|&gt;&gt;=|&gt;&gt;|&gt;=|!=|!|~|\^|\|\||&amp;&amp;|&amp;=|&amp;|\?\?|::|:|\*=|\*|\/=|%=|\|=|==|=)/g
	},
    {
		// @see http://msdn.microsoft.com/en-us/library/ed8yd1ha%28v=vs.100%29.aspx
		'name': 'preprocessor',
		'pattern': /(\#if|\#else|\#elif|\#endif|\#define|\#undef|\#warning|\#error|\#line|\#region|\#endregion|\#pragma)[\s\S]*?$/gm
	}
], true);
