/**
 * R language patterns
 *
 * @author Simon Potter
 * @version 1.0
 */
Rainbow.extend('r', [
    /**
     * Note that a valid variable name is of the form:
     * [.a-zA-Z][0-9a-zA-Z._]*
     */
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=|<\-|&lt;-/g
            },
            2: {
                'name': 'string',
                'matches': {
                    'name': 'constant.character.escape',
                    'pattern': /\\('|"){1}/g
                }
            }
        },
        'pattern': /(\(|\s|\[|\=|:)(('|")([^\\\1]|\\.)*?(\3))/gm
    },

    /**
     * Most of these are known via the Language Reference.
     * The built-in constant symbols are known via ?Constants.
     */
    {
        'matches': {
            1: 'constant.language'
        },
        'pattern': /\b(NULL|NA|TRUE|FALSE|T|F|NaN|Inf|NA_integer_|NA_real_|NA_complex_|NA_character_)\b/g
    },
    {
        'matches': {
            1: 'constant.symbol'
        },
        'pattern': /[^0-9a-zA-Z\._](LETTERS|letters|month\.(abb|name)|pi)/g
    },

    /**
     * @todo: The list subsetting operator isn't quite working properly.
     *        It includes the previous variable when it should only match [[
     */
    {
        'name': 'keyword.operator',
        'pattern': /&lt;-|<-|-|==|&lt;=|<=|&gt;>|>=|<|>|&amp;&amp;|&&|&amp;|&|!=|\|\|?|\*|\+|\^|\/|%%|%\/%|\=|%in%|%\*%|%o%|%x%|\$|:|~|\[{1,2}|\]{1,2}/g
    },
    {
        'matches': {
            1: 'storage',
            3: 'entity.function'
        },
        'pattern': /(\s|^)(.*)(?=\s?=\s?function\s\()/g
    },
    {
        'matches': {
            1: 'storage.function'
        },
        'pattern': /[^a-zA-Z0-9._](function)(?=\s*\()/g
    },
    {
        'matches': {
            1: 'namespace',
            2: 'keyword.operator',
            3: 'function.call'
        },
        'pattern': /([a-zA-Z][a-zA-Z0-9._]+)([:]{2,3})([.a-zA-Z][a-zA-Z0-9._]*(?=\s*\())\b/g
    },

    /*
     * Note that we would perhaps match more builtin functions and
     * variables, but there are so many that most are ommitted for now.
     * See ?builtins for more info.
     *
     * @todo: Fix the case where we have a function like tmp.logical().
     *        This should just be a function call, at the moment it's
     *        only partly a function all.
     */
    {
        'name': 'support.function',
        'pattern': /(^|[^0-9a-zA-Z\._])(array|character|complex|data\.frame|double|integer|list|logical|matrix|numeric|vector)(?=\s*\()/g
    }
]);
