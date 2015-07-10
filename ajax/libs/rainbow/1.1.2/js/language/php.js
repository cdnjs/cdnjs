/**
 * PHP patterns
 *
 * @author Craig Campbell
 * @version 1.0.1
 */
Rainbow.extend('php', [
    {
        'name': 'support',
        'pattern': /\becho\b/g
    },
    {
        'matches': {
            1: 'variable.dollar-sign',
            2: 'variable'
        },
        'pattern': /(\$)(\w+)\b/g
    },
    {
        'name': 'keyword.dot',
        'pattern': /\./g
    },
    {
        'name': 'keyword',
        'pattern': /\b(continue|break|end(for(each)?|switch|if)|case|require(_once)?|include(_once)?)\b/g
    },
    {
        'matches': {
            1: 'keyword',
            2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /(instanceof)\s([^\$].*?)(\)|;)/g
    },
    /**
     * @todo limit this to the most commonly used PHP functions since this could grow really big
     */
    {
        'matches': {
            1: 'support.function'
        },
        'pattern': /\b(apc_(fetch|store)|array(_sum|_rand)?|asort|count|empty|explode|file_(get_contents|exists)|get_(called_)?class|getenv|in_array|is_(numeric|array|link)|isset|json_(encode|decode)|mt_rand|rand|rmdir|round|spl_autoload_register|str(tolower|str|pos|_replace)|trigger_error|un(link|set))(?=\()/g
    },
    {
        'name': 'phptag',
        'pattern': /(&lt;\?(php)?|\?&gt;)/g
    },
    {
        'matches': {
            1: 'keyword.namespace',
           2: {
                'name': 'support.namespace',
                'pattern': /\w+/g
            }
        },
        'pattern': /\b(namespace\s)(.*?);/g
    },
    {
        'matches': {
            1: 'keyword.class.description',
            2: 'keyword.class',
            3: 'meta.class-name',
            4: 'keyword.extends',
            5: 'meta.parent.class-name'
        },
        'pattern': /\b(abstract|final)?\s?(class)\s(\w+)(\sextends\s)?([\w\\]*)?\s?\{?\n/g
    },
    {
        'name': 'keyword.static',
        'pattern': /self::/g
    },
    {
        'matches': {
            1: 'keyword',
            2: 'support.magic'
        },
        'pattern': /(function)\s(__.*?)(?=\()/g
    },
    {
        'matches': {
            1: 'keyword.new',
            2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /\b(new)\s([^\$].*?)(?=\)|\(|;)/g
    },
    {
        'matches': {
            1: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /([\w\\]*?)::\b/g
    },
    {
        'matches': {
            2: {
                'name': 'support.class',
                'pattern': /\w+/g
            }
        },
        'pattern': /(\(|,\s?)([\w\\]*?)(?=\s\$)/g
    }
]);
