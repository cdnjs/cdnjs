/* globals Prism */
(function ($, Prism) {
    'use strict';

    // My plugin default options
    var defaultOptions = {
        enableLineHighlight: true,
        languageNames: {
            // For updated list of languages
            // see https://github.com/PrismJS/prism/blob/master/plugins/show-language/prism-show-language.js
            'html': 'HTML',
            'xml': 'XML',
            'svg': 'SVG',
            'mathml': 'MathML',
            'ssml': 'SSML',
            'css': 'CSS',
            'clike': 'C-like',
            'js': 'JavaScript',
            'abap': 'ABAP',
            'abnf': 'Augmented Backus–Naur form',
            'al': 'AL',
            'antlr4': 'ANTLR4',
            'g4': 'ANTLR4',
            'apacheconf': 'Apache Configuration',
            'apl': 'APL',
            'aql': 'AQL',
            'arff': 'ARFF',
            'asciidoc': 'AsciiDoc',
            'adoc': 'AsciiDoc',
            'asm6502': '6502 Assembly',
            'aspnet': 'ASP.NET (C#)',
            'autohotkey': 'AutoHotkey',
            'autoit': 'AutoIt',
            'basic': 'BASIC',
            'bbcode': 'BBcode',
            'bnf': 'Backus–Naur form',
            'rbnf': 'Routing Backus–Naur form',
            'conc': 'Concurnas',
            'csharp': 'C#',
            'cs': 'C#',
            'dotnet': 'C#',
            'cpp': 'C++',
            'cil': 'CIL',
            'coffee': 'CoffeeScript',
            'cmake': 'CMake',
            'csp': 'Content-Security-Policy',
            'css-extras': 'CSS Extras',
            'dax': 'DAX',
            'django': 'Django/Jinja2',
            'jinja2': 'Django/Jinja2',
            'dns-zone-file': 'DNS zone file',
            'dns-zone': 'DNS zone file',
            'dockerfile': 'Docker',
            'ebnf': 'Extended Backus–Naur form',
            'ejs': 'EJS',
            'etlua': 'Embedded Lua templating',
            'erb': 'ERB',
            'excel-formula': 'Excel Formula',
            'xlsx': 'Excel Formula',
            'xls': 'Excel Formula',
            'fsharp': 'F#',
            'firestore-security-rules': 'Firestore security rules',
            'ftl': 'FreeMarker Template Language',
            'gcode': 'G-code',
            'gdscript': 'GDScript',
            'gedcom': 'GEDCOM',
            'glsl': 'GLSL',
            'gml': 'GameMaker Language',
            'gamemakerlanguage': 'GameMaker Language',
            'graphql': 'GraphQL',
            'hs': 'Haskell',
            'hcl': 'HCL',
            'hlsl': 'HLSL',
            'http': 'HTTP',
            'hpkp': 'HTTP Public-Key-Pins',
            'hsts': 'HTTP Strict-Transport-Security',
            'ichigojam': 'IchigoJam',
            'iecst': 'Structured Text (IEC 61131-3)',
            'inform7': 'Inform 7',
            'javadoc': 'JavaDoc',
            'javadoclike': 'JavaDoc-like',
            'javastacktrace': 'Java stack trace',
            'jq': 'JQ',
            'jsdoc': 'JSDoc',
            'js-extras': 'JS Extras',
            'js-templates': 'JS Templates',
            'json': 'JSON',
            'jsonp': 'JSONP',
            'json5': 'JSON5',
            'latex': 'LaTeX',
            'tex': 'TeX',
            'context': 'ConTeXt',
            'lilypond': 'LilyPond',
            'ly': 'LilyPond',
            'emacs': 'Lisp',
            'elisp': 'Lisp',
            'emacs-lisp': 'Lisp',
            'llvm': 'LLVM IR',
            'lolcode': 'LOLCODE',
            'md': 'Markdown',
            'markup-templating': 'Markup templating',
            'matlab': 'MATLAB',
            'mel': 'MEL',
            'moon': 'MoonScript',
            'n1ql': 'N1QL',
            'n4js': 'N4JS',
            'n4jsd': 'N4JS',
            'nand2tetris-hdl': 'Nand To Tetris HDL',
            'nasm': 'NASM',
            'neon': 'NEON',
            'nginx': 'nginx',
            'nsis': 'NSIS',
            'objectivec': 'Objective-C',
            'objc': 'Objective-C',
            'ocaml': 'OCaml',
            'opencl': 'OpenCL',
            'parigp': 'PARI/GP',
            'objectpascal': 'Object Pascal',
            'pcaxis': 'PC-Axis',
            'px': 'PC-Axis',
            'peoplecode': 'PeopleCode',
            'pcode': 'PeopleCode',
            'php': 'PHP',
            'phpdoc': 'PHPDoc',
            'php-extras': 'PHP Extras',
            'plsql': 'PL/SQL',
            'powerquery': 'PowerQuery',
            'pq': 'PowerQuery',
            'mscript': 'PowerQuery',
            'powershell': 'PowerShell',
            'properties': '.properties',
            'protobuf': 'Protocol Buffers',
            'py': 'Python',
            'q': 'Q (kdb+ database)',
            'qml': 'QML',
            'rkt': 'Racket',
            'jsx': 'React JSX',
            'tsx': 'React TSX',
            'renpy': 'Ren\'py',
            'rest': 'reST (reStructuredText)',
            'robotframework': 'Robot Framework',
            'robot': 'Robot Framework',
            'rb': 'Ruby',
            'sas': 'SAS',
            'sass': 'Sass (Sass)',
            'scss': 'Sass (Scss)',
            'shell-session': 'Shell session',
            'solidity': 'Solidity (Ethereum)',
            'solution-file': 'Solution file',
            'sln': 'Solution file',
            'soy': 'Soy (Closure Template)',
            'sparql': 'SPARQL',
            'rq': 'SPARQL',
            'splunk-spl': 'Splunk SPL',
            'sqf': 'SQF: Status Quo Function (Arma 3)',
            'sql': 'SQL',
            'tap': 'TAP',
            'toml': 'TOML',
            'tt2': 'Template Toolkit 2',
            'trig': 'TriG',
            'ts': 'TypeScript',
            't4-cs': 'T4 Text Templates (C#)',
            't4': 'T4 Text Templates (C#)',
            't4-vb': 'T4 Text Templates (VB)',
            't4-templating': 'T4 templating',
            'uscript': 'UnrealScript',
            'uc': 'UnrealScript',
            'vbnet': 'VB.Net',
            'vhdl': 'VHDL',
            'vim': 'vim',
            'visual-basic': 'Visual Basic',
            'vb': 'Visual Basic',
            'wasm': 'WebAssembly',
            'wiki': 'Wiki markup',
            'xeoracube': 'XeoraCube',
            'xojo': 'Xojo (REALbasic)',
            'xquery': 'XQuery',
            'yaml': 'YAML',
            'yml': 'YAML'
        }
    };

    function highlightIt(text, language, lineHighlight) {
        return [
            '<pre class="language-' + language + '" ' + (lineHighlight ? 'data-line="' + lineHighlight + '"' : '') + '>',
            '<code class="language-' + language + '">' + Prism.highlight(text, Prism.languages[language]) + '</code>',
            '</pre>',
        ].join('');
    }

    function escapeHtml(html) {
        return $('<div/>').text(html).html();
    }

    function buildHighlightOptions(trumbowyg) {
        var languageNames = trumbowyg.o.plugins.highlight.languageNames;
        var languageNameKeys = Object.keys(languageNames);
        var prismLanguageKeys = Object.keys(Prism.languages);

        var options = prismLanguageKeys.filter(function (languageKey) {
          return languageNameKeys.indexOf(languageKey) >= 0;
        }).map(function (languageKey) {
            return {
                id: languageKey,
                name: languageNames[languageKey]
            };
        }).sort(function(a, b){
            // Sort languages by name
            return a.name.localeCompare(b.name);
        }).map(function( language){
            // Generate a list of options
            return '<option value="' + escapeHtml(language.id) + '">' + escapeHtml(language.name) + '</option>';
        }).join('');

        return options;
    }

    function buildLineHighlightFieldIfEnabled(trumbowyg) {
        if (trumbowyg.o.plugins.highlight.enableLineHighlight === false) {
            return '';
        }

        return '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">' +
            '   <input placeholder="' + trumbowyg.lang.highlightLine +
            '" class="' + trumbowyg.o.prefix + 'highlight-form-control trumbowyg-line-highlight"/>' +
            '</div>';
    }

    // If my plugin is a button
    function buildButtonDef(trumbowyg) {
        return {
            fn: function () {
                var $modal = trumbowyg.openModal('Code', [
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <select class="' + trumbowyg.o.prefix + 'highlight-form-control language" autofocus>',
                    buildHighlightOptions(trumbowyg),
                    '   </select>',
                    '</div>',
                    '<div class="' + trumbowyg.o.prefix + 'highlight-form-group">',
                    '   <textarea class="' + trumbowyg.o.prefix + 'highlight-form-control code"></textarea>',
                    '</div>',
                    buildLineHighlightFieldIfEnabled(trumbowyg),
                ].join('\n')),
                $language = $modal.find('.language'),
                $code = $modal.find('.code'),
                $lineHighlight = $modal.find('.trumbowyg-line-highlight');

                // Listen clicks on modal box buttons
                $modal.on('tbwconfirm', function () {
                    trumbowyg.restoreRange();
                    trumbowyg.execCmd('insertHTML', highlightIt($code.val(), $language.val(), $lineHighlight.val()));
                    trumbowyg.execCmd('insertHTML', '<p><br></p>');

                    trumbowyg.closeModal();
                });

                $modal.on('tbwcancel', function () {
                    trumbowyg.closeModal();
                });
            }
        };
    }

    $.extend(true, $.trumbowyg, {
        // Add some translations
        langs: {
            // jshint camelcase:false
            en: {
                highlight: 'Code syntax highlight',
                highlightLine: 'Highlight lines, e.g.: 1,3-5'
            },
            az: {
                highlight: 'Kod birləşməsini vurğulamaq',
                highlightLine: 'Sətirləri vurğulamaq, məsələn: 1,3-5'
            },
            by: {
                highlight: 'Падсветка сінтаксісу кода',
                highlightLine: 'Падсвятліць радкі, напр.: 1,3-5'
            },
            es: {
                highlight: 'Resaltado de sintaxis de código',
                highlightLine: 'Resaltar lineas, ej: 1,3-5'
            },
            et: {
                highlight: 'Koodi esiletoomine',
                highlightLine: 'Koodiread, näiteks: 1,3-5'
            },
            hu: {
                highlight: 'Kód kiemelés'
            },
            ko: {
                highlight: '코드 문법 하이라이트'
            },
            pt_br: {
                highlight: 'Realçar sintaxe de código'
            },
            ru: {
                highlight: 'Подсветка синтаксиса кода',
                highlightLine: 'Подсветить строки, напр.: 1,3-5'
            },
            sl: {
                highlight: 'Označi sintakso kode',
                highlightLine: 'Označi številko vrstice, npr.: 1,3-5'
            },
            tr: {
                highlight: 'Kod sözdizimini vurgula',
                highlightLine: 'Vurgu çizgileri, örneğin: 1,3-5'
            },
            // jshint camelcase:true
        },
        // Add our plugin to Trumbowyg registered plugins
        plugins: {
            highlight: {
                init: function (trumbowyg) {
                    // Fill current Trumbowyg instance with my plugin default options
                    trumbowyg.o.plugins.highlight = $.extend(true, {},
                        defaultOptions,
                        trumbowyg.o.plugins.highlight || {}
                    );

                    // If my plugin is a button
                    trumbowyg.addBtnDef('highlight', buildButtonDef(trumbowyg));
                }
            }
        }
    });
})(jQuery, Prism);
