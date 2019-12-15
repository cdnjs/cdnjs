import hljs from 'highlight.js';

hljs.registerLanguage('soy', function() {
    var soyKeywords = {
        keyword: 'or and not if delpackage alias noAutoescape call literal private data print msg let if elseif else switch case default foreach ifempty for call param css',
        tag: 'template call param namespace sp nil \\r \\n \\t lb rb'
    };

    var param = {
        className: "symbol",
        begin: "\\$[a-zA-Z][a-zA-Z0-9_]*"
    };

    var soyString = {
        className: "string",
        begin: "\"",
        end: "[\"\\n]",
        contains: [
            param
        ]
    };

    var soyStringSingle = {
        className: "string",
        begin: "'",
        end: "['\\n]"
    };

    var soyTags = {
        className: "soyTag",
        begin: "{",
        end: "}",
        keywords: soyKeywords,
        contains: [
            soyString,
            soyStringSingle,
            param,
            {
                className: "title",
                begin: "(namespace |template |call )[a-zA-Z0-9_.]*",
                endsWithParent: true,
                keywords: soyKeywords
            },
            {
                className: "symbol",
                begin: "param [a-zA-Z0-9_.]*",
                end: ":",
                endsWithParent: true,
                returnEnd: true,
                keywords: soyKeywords
            }
        ]
    };

    return {
        keywords: "or and not",
        contains: [
            param,
            soyString,
            soyStringSingle,
            soyTags,
            {
                className: "comment",
                begin: "/\\*",
                end: "\\*/",
                contains: [
                    {
                        className: "attribute",
                        begin: "@param\\??\\W",
                        end: "\\W",
                        excludeBegin: true
                    }
                ]
            }
        ]
    };
});
