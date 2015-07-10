/**
 * Generic language patterns
 *
 * @author Craig Campbell
 * @version 1.0.3
 */
Rainbow.extend([
    {
        'matches': {
            1: {
                'name': 'keyword.operator',
                'pattern': /\=/g
            },
            2: 'string'
        },
        'pattern': /(\(|\s|\[|\=)(('|")[\s\S]*?(\3))/gm
    },
    {
        'name': 'comment',
        'pattern': /\/\*[\s\S]*?\*\/|(\/\/|\#)[\s\S]*?$/gm
    },
    {
        'name': 'constant.numeric',
        'pattern': /\b(0x[\da-f]+|\d+)\b/gi
    },
    {
        'name': 'constant',
        'pattern': /\b[A-Z0-9_]{2,}\b/g
    },
    {
        'matches': {
            1: 'keyword'
        },
        'pattern': /\b(and|array|as|bool(ean)?|c(atch|har|lass|onst)|d(ef|elete|ie|o(uble)?)|e(cho|lse(if)?|xit|xtends)|f(inally|loat|or(each)?|unction)|global|if|import|int(eger)?|long|new|object|or|pr(int|ivate|otected)|public|return|self|st(ring|ruct|atic)|switch|th(en|is|row)|try|except|(un)?signed|var|void|while)(?=\(|\b)/gi
    },
    {
        'name': 'constant.language',
        'pattern': /true|false|null/g
    },
    {
        'name': 'keyword.operator',
        'pattern': /\+|\!|\-|&(gt|lt|amp);|\||\*|\=/g
    },
    {
        'matches': {
            1: 'function.call'
        },
        'pattern': /(\w+?)(?=\()/g
    },
    {
        'matches': {
            1: 'keyword',
            2: 'meta.function'
        },
        'pattern': /(function)\s(.*?)(?=\()/g
    }
]);
