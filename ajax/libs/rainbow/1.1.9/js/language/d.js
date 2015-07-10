/**
* D patterns
*
* @author Matthew Brennan Jones
* @version 1.0.0
*/
Rainbow.extend('d', [
    {
        'name': 'constant',
        'pattern': /\b(false|null|true)\b/g
    },
    {
        // http://dlang.org/lex.html
        'name': 'keyword',
        'pattern': /\b(abstract|alias|align|asm|assert|auto|body|bool|break|byte|case|cast|catch|cdouble|cent|cfloat|char|class|const|continue|creal|dchar|debug|default|delegate|delete|deprecated|do|double|else|enum|export|extern|false|final|finally|float|for|foreach|foreach_reverse|function|goto|idouble|if|ifloat|immutable|import|in|inout|int|interface|invariant|ireal|is|lazy|long|macro|mixin|module|new|nothrow|null|out|override|package|pragma|private|protected|public|pure|real|ref|return|scope|shared|short|size_t|static|string|struct|super|switch|synchronized|template|this|throw|true|try|typedef|typeid|typeof|ubyte|ucent|uint|ulong|union|unittest|ushort|version|void|volatile|wchar|while|with|__FILE__|__LINE__|__gshared|__traits|__vector|__parameters)\b/g
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
        'pattern': /("|')(.*?)\1/g
    },
    {
        'name': 'integer',
        'pattern': /\b(0x[\da-f]+|\d+)\b/g
    },
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|\/\+[\s\S]*?\+\/|(\/\/)[\s\S]*?$/gm
    },
    {
        // http://dlang.org/operatoroverloading.html
        'name': 'operator',
        //  / /= . .. ... & &= && | |= || - -= -- + += ++ < <= << <<= <> <>= > >= >>= >>>= >> >>> ! != !<> !<>= !< !<= !> !>= ( ) [ ] { } ? , ; : $ = == * *= % %= ^ ^= ^^ ^^= ~ ~= @ => #
        'pattern': /(\/|\/=|.|..|...|&amp;|&amp;=|&amp;&amp;|\||\|=|\|\||\-|\-=|\-\-|\+|\+=|\+\+|&lt;|&lt;=|&lt;&lt;|&lt;&lt;=|&lt;&gt;|&lt;&gt;=|&gt;|&gt;=|&gt;&gt;=|&gt;&gt;&gt;=|&gt;&gt;|&gt;&gt;&gt;|!|!=|!&lt;&gt;|!&lt;&gt;=|!&lt;|!&lt;=|!&gt;|!&gt;=|\(|\)|[|]|\{|\}|\?|,|;|:|\$|=|==|\*|\*=|%|%=|\^|\^=|\^\^|\^\^=|~|~=|@|=&gt;|\#)/g
    }
], true);

