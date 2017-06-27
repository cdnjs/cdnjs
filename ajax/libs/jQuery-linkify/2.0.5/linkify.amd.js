define('linkify/utils/class', ['exports'], function (exports) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.inherits = inherits;
    function inherits(parent, child) {
        var props = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];
        var extended = Object.create(parent.prototype);
        for (var p in props) {
            extended[p] = props[p];
        }
        extended.constructor = child;
        child.prototype = extended;
        return child;
    }
});
define('linkify/utils/options', ['exports'], function (exports) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.normalize = normalize;
    exports.resolve = resolve;
    exports.contains = contains;
    function normalize(opts) {
        opts = opts || {};
        var newLine = opts.newLine || false;
        var ignoreTags = opts.ignoreTags || [];
        for (var i = 0; i < ignoreTags.length; i++) {
            ignoreTags[i] = ignoreTags[i].toUpperCase();
        }
        return {
            attributes: opts.linkAttributes || null,
            defaultProtocol: opts.defaultProtocol || 'http',
            events: opts.events || null,
            format: opts.format || noop,
            validate: opts.validate || yes,
            formatHref: opts.formatHref || noop,
            newLine: opts.newLine || false,
            nl2br: !!newLine || opts.nl2br || false,
            tagName: opts.tagName || 'a',
            target: opts.target || typeToTarget,
            linkClass: opts.linkClass || 'linkified',
            ignoreTags: ignoreTags
        };
    }
    function resolve(value) {
        for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            params[_key - 1] = arguments[_key];
        }
        return typeof value === 'function' ? value.apply(undefined, params) : value;
    }
    function contains(arr, value) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] == value) {
                return true;
            }
        }
        return false;
    }
    function noop(val) {
        return val;
    }
    function yes(val) {
        return true;
    }
    function typeToTarget(href, type) {
        return type === 'url' ? '_blank' : null;
    }
});
define('linkify/core/tokens', [
    'exports',
    '../utils/class'
], function (exports, _class) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.multi = exports.text = undefined;
    function createTokenClass() {
        return function (value) {
            if (value) {
                this.v = value;
            }
        };
    }
    var TextToken = createTokenClass();
    TextToken.prototype = {
        toString: function toString() {
            return this.v + '';
        }
    };
    function inheritsToken(value) {
        var props = value ? { v: value } : {};
        return (0, _class.inherits)(TextToken, createTokenClass(), props);
    }
    var DOMAIN = inheritsToken();
    var AT = inheritsToken('@');
    var COLON = inheritsToken(':');
    var DOT = inheritsToken('.');
    var PUNCTUATION = inheritsToken();
    var LOCALHOST = inheritsToken();
    var TNL = inheritsToken('\n');
    var NUM = inheritsToken();
    var PLUS = inheritsToken('+');
    var POUND = inheritsToken('#');
    var PROTOCOL = inheritsToken();
    var QUERY = inheritsToken('?');
    var SLASH = inheritsToken('/');
    var SYM = inheritsToken();
    var TLD = inheritsToken();
    var WS = inheritsToken();
    var OPENBRACE = inheritsToken('{');
    var OPENBRACKET = inheritsToken('[');
    var OPENPAREN = inheritsToken('(');
    var CLOSEBRACE = inheritsToken('}');
    var CLOSEBRACKET = inheritsToken(']');
    var CLOSEPAREN = inheritsToken(')');
    var text = {
        Base: TextToken,
        DOMAIN: DOMAIN,
        AT: AT,
        COLON: COLON,
        DOT: DOT,
        PUNCTUATION: PUNCTUATION,
        LOCALHOST: LOCALHOST,
        NL: TNL,
        NUM: NUM,
        PLUS: PLUS,
        POUND: POUND,
        QUERY: QUERY,
        PROTOCOL: PROTOCOL,
        SLASH: SLASH,
        SYM: SYM,
        TLD: TLD,
        WS: WS,
        OPENBRACE: OPENBRACE,
        OPENBRACKET: OPENBRACKET,
        OPENPAREN: OPENPAREN,
        CLOSEBRACE: CLOSEBRACE,
        CLOSEBRACKET: CLOSEBRACKET,
        CLOSEPAREN: CLOSEPAREN
    };
    function isDomainToken(token) {
        return token instanceof DOMAIN || token instanceof TLD;
    }
    var MultiToken = createTokenClass();
    MultiToken.prototype = {
        type: 'token',
        isLink: false,
        toString: function toString() {
            var result = [];
            for (var i = 0; i < this.v.length; i++) {
                result.push(this.v[i].toString());
            }
            return result.join('');
        },
        toHref: function toHref() {
            return this.toString();
        },
        toObject: function toObject() {
            var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];
            return {
                type: this.type,
                value: this.toString(),
                href: this.toHref(protocol)
            };
        }
    };
    var EMAIL = (0, _class.inherits)(MultiToken, createTokenClass(), {
        type: 'email',
        isLink: true,
        toHref: function toHref() {
            return 'mailto:' + this.toString();
        }
    });
    var TEXT = (0, _class.inherits)(MultiToken, createTokenClass(), { type: 'text' });
    var MNL = (0, _class.inherits)(MultiToken, createTokenClass(), { type: 'nl' });
    var URL = (0, _class.inherits)(MultiToken, createTokenClass(), {
        type: 'url',
        isLink: true,
        toHref: function toHref() {
            var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];
            var hasProtocol = false, hasSlashSlash = false, tokens = this.v, result = [], i = 0;
            while (tokens[i] instanceof PROTOCOL) {
                hasProtocol = true;
                result.push(tokens[i].toString().toLowerCase());
                i++;
            }
            while (tokens[i] instanceof SLASH) {
                hasSlashSlash = true;
                result.push(tokens[i].toString());
                i++;
            }
            while (isDomainToken(tokens[i])) {
                result.push(tokens[i].toString().toLowerCase());
                i++;
            }
            for (; i < tokens.length; i++) {
                result.push(tokens[i].toString());
            }
            result = result.join('');
            if (!(hasProtocol || hasSlashSlash)) {
                result = protocol + '://' + result;
            }
            return result;
        },
        hasProtocol: function hasProtocol() {
            return this.v[0] instanceof PROTOCOL;
        }
    });
    var multi = {
        Base: MultiToken,
        EMAIL: EMAIL,
        NL: MNL,
        TEXT: TEXT,
        URL: URL
    };
    exports.text = text;
    exports.multi = multi;
});
define('linkify/core/state', [
    'exports',
    '../utils/class'
], function (exports, _class) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.stateify = exports.TokenState = exports.CharacterState = undefined;
    function createStateClass() {
        return function (tClass) {
            this.j = [];
            this.T = tClass || null;
        };
    }
    var BaseState = createStateClass();
    BaseState.prototype = {
        defaultTransition: false,
        on: function on(symbol, state) {
            if (symbol instanceof Array) {
                for (var i = 0; i < symbol.length; i++) {
                    this.j.push([
                        symbol[i],
                        state
                    ]);
                }
                return this;
            }
            this.j.push([
                symbol,
                state
            ]);
            return this;
        },
        next: function next(item) {
            for (var i = 0; i < this.j.length; i++) {
                var jump = this.j[i], symbol = jump[0], state = jump[1];
                if (this.test(item, symbol))
                    return state;
            }
            return this.defaultTransition;
        },
        accepts: function accepts() {
            return !!this.T;
        },
        test: function test(item, symbol) {
            return item === symbol;
        },
        emit: function emit() {
            return this.T;
        }
    };
    var CharacterState = (0, _class.inherits)(BaseState, createStateClass(), {
        test: function test(character, charOrRegExp) {
            return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
        }
    });
    var TokenState = (0, _class.inherits)(BaseState, createStateClass(), {
        test: function test(token, tokenClass) {
            return token instanceof tokenClass;
        }
    });
    function stateify(str, start, endToken, defaultToken) {
        var i = 0, len = str.length, state = start, newStates = [], nextState = void 0;
        while (i < len && (nextState = state.next(str[i]))) {
            state = nextState;
            i++;
        }
        if (i >= len)
            return [];
        while (i < len - 1) {
            nextState = new CharacterState(defaultToken);
            newStates.push(nextState);
            state.on(str[i], nextState);
            state = nextState;
            i++;
        }
        nextState = new CharacterState(endToken);
        newStates.push(nextState);
        state.on(str[len - 1], nextState);
        return newStates;
    }
    exports.CharacterState = CharacterState;
    exports.TokenState = TokenState;
    exports.stateify = stateify;
});
define('linkify/core/scanner', [
    'exports',
    './tokens',
    './state'
], function (exports, _tokens, _state) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.start = exports.run = exports.TOKENS = exports.State = undefined;
    var tlds = 'aaa|aarp|abb|abbott|abogado|ac|academy|accenture|accountant|accountants|aco|active|actor|ad|adac|ads|adult|ae|aeg|aero|af|afl|ag|agency|ai|aig|airforce|airtel|al|alibaba|alipay|allfinanz|alsace|am|amica|amsterdam|an|analytics|android|ao|apartments|app|apple|aq|aquarelle|ar|aramco|archi|army|arpa|arte|as|asia|associates|at|attorney|au|auction|audi|audio|author|auto|autos|avianca|aw|ax|axa|az|azure|ba|baidu|band|bank|bar|barcelona|barclaycard|barclays|bargains|bauhaus|bayern|bb|bbc|bbva|bcg|bcn|bd|be|beats|beer|bentley|berlin|best|bet|bf|bg|bh|bharti|bi|bible|bid|bike|bing|bingo|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bms|bmw|bn|bnl|bnpparibas|bo|boats|boehringer|bom|bond|boo|book|boots|bosch|bostik|bot|boutique|br|bradesco|bridgestone|broadway|broker|brother|brussels|bs|bt|budapest|bugatti|build|builders|business|buy|buzz|bv|bw|by|bz|bzh|ca|cab|cafe|cal|call|camera|camp|cancerresearch|canon|capetown|capital|car|caravan|cards|care|career|careers|cars|cartier|casa|cash|casino|cat|catering|cba|cbn|cc|cd|ceb|center|ceo|cern|cf|cfa|cfd|cg|ch|chanel|channel|chase|chat|cheap|chloe|christmas|chrome|church|ci|cipriani|circle|cisco|citic|city|cityeats|ck|cl|claims|cleaning|click|clinic|clinique|clothing|cloud|club|clubmed|cm|cn|co|coach|codes|coffee|college|cologne|com|commbank|community|company|compare|computer|comsec|condos|construction|consulting|contact|contractors|cooking|cool|coop|corsica|country|coupon|coupons|courses|cr|credit|creditcard|creditunion|cricket|crown|crs|cruises|csc|cu|cuisinella|cv|cw|cx|cy|cymru|cyou|cz|dabur|dad|dance|date|dating|datsun|day|dclk|de|dealer|deals|degree|delivery|dell|deloitte|delta|democrat|dental|dentist|desi|design|dev|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|docs|dog|doha|domains|download|drive|dubai|durban|dvag|dz|earth|eat|ec|edeka|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|epson|equipment|er|erni|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|express|fage|fail|fairwinds|faith|family|fan|fans|farm|fashion|fast|feedback|ferrero|fi|film|final|finance|financial|firestone|firmdale|fish|fishing|fit|fitness|fj|fk|flickr|flights|florist|flowers|flsmidth|fly|fm|fo|foo|football|ford|forex|forsale|forum|foundation|fox|fr|fresenius|frl|frogans|frontier|fund|furniture|futbol|fyi|ga|gal|gallery|gallup|game|garden|gb|gbiz|gd|gdn|ge|gea|gent|genting|gf|gg|ggee|gh|gi|gift|gifts|gives|giving|gl|glass|gle|global|globo|gm|gmail|gmbh|gmo|gmx|gn|gold|goldpoint|golf|goo|goog|google|gop|got|gov|gp|gq|gr|grainger|graphics|gratis|green|gripe|group|gs|gt|gu|gucci|guge|guide|guitars|guru|gw|gy|hamburg|hangout|haus|hdfcbank|health|healthcare|help|helsinki|here|hermes|hiphop|hitachi|hiv|hk|hm|hn|hockey|holdings|holiday|homedepot|homes|honda|horse|host|hosting|hoteles|hotmail|house|how|hr|hsbc|ht|hu|hyundai|ibm|icbc|ice|icu|id|ie|ifm|iinet|il|im|immo|immobilien|in|industries|infiniti|info|ing|ink|institute|insurance|insure|int|international|investments|io|ipiranga|iq|ir|irish|is|iselect|ist|istanbul|it|itau|iwc|jaguar|java|jcb|je|jetzt|jewelry|jlc|jll|jm|jmp|jo|jobs|joburg|jot|joy|jp|jpmorgan|jprs|juegos|kaufen|kddi|ke|kerryhotels|kerrylogistics|kerryproperties|kfh|kg|kh|ki|kia|kim|kinder|kitchen|kiwi|km|kn|koeln|komatsu|kp|kpn|kr|krd|kred|kuokgroup|kw|ky|kyoto|kz|la|lacaixa|lamborghini|lamer|lancaster|land|landrover|lanxess|lasalle|lat|latrobe|law|lawyer|lb|lc|lds|lease|leclerc|legal|lexus|lgbt|li|liaison|lidl|life|lifeinsurance|lifestyle|lighting|like|limited|limo|lincoln|linde|link|live|living|lixil|lk|loan|loans|local|locus|lol|london|lotte|lotto|love|lr|ls|lt|ltd|ltda|lu|lupin|luxe|luxury|lv|ly|ma|madrid|maif|maison|makeup|man|management|mango|market|marketing|markets|marriott|mba|mc|md|me|med|media|meet|melbourne|meme|memorial|men|menu|meo|mg|mh|miami|microsoft|mil|mini|mk|ml|mm|mma|mn|mo|mobi|mobily|moda|moe|moi|mom|monash|money|montblanc|mormon|mortgage|moscow|motorcycles|mov|movie|movistar|mp|mq|mr|ms|mt|mtn|mtpc|mtr|mu|museum|mutuelle|mv|mw|mx|my|mz|na|nadex|nagoya|name|natura|navy|nc|ne|nec|net|netbank|network|neustar|new|news|nexus|nf|ng|ngo|nhk|ni|nico|nikon|ninja|nissan|nl|no|nokia|norton|nowruz|np|nr|nra|nrw|ntt|nu|nyc|nz|obi|office|okinawa|om|omega|one|ong|onl|online|ooo|oracle|orange|org|organic|origins|osaka|otsuka|ovh|pa|page|pamperedchef|panerai|paris|pars|partners|parts|party|passagens|pe|pet|pf|pg|ph|pharmacy|philips|photo|photography|photos|physio|piaget|pics|pictet|pictures|pid|pin|ping|pink|pizza|pk|pl|place|play|playstation|plumbing|plus|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|promo|properties|property|protection|ps|pt|pub|pw|pwc|py|qa|qpon|quebec|quest|racing|re|read|realtor|realty|recipes|red|redstone|redumbrella|rehab|reise|reisen|reit|ren|rent|rentals|repair|report|republican|rest|restaurant|review|reviews|rexroth|rich|ricoh|rio|rip|ro|rocher|rocks|rodeo|room|rs|rsvp|ru|ruhr|run|rw|rwe|ryukyu|sa|saarland|safe|safety|sakura|sale|salon|samsung|sandvik|sandvikcoromant|sanofi|sap|sapo|sarl|sas|saxo|sb|sbs|sc|sca|scb|schaeffler|schmidt|scholarships|school|schule|schwarz|science|scor|scot|sd|se|seat|security|seek|select|sener|services|seven|sew|sex|sexy|sfr|sg|sh|sharp|shell|shia|shiksha|shoes|show|shriram|si|singles|site|sj|sk|ski|skin|sky|skype|sl|sm|smile|sn|sncf|so|soccer|social|softbank|software|sohu|solar|solutions|song|sony|soy|space|spiegel|spot|spreadbetting|sr|srl|st|stada|star|starhub|statefarm|statoil|stc|stcgroup|stockholm|storage|store|studio|study|style|su|sucks|supplies|supply|support|surf|surgery|suzuki|sv|swatch|swiss|sx|sy|sydney|symantec|systems|sz|tab|taipei|taobao|tatamotors|tatar|tattoo|tax|taxi|tc|tci|td|team|tech|technology|tel|telecity|telefonica|temasek|tennis|tf|tg|th|thd|theater|theatre|tickets|tienda|tiffany|tips|tires|tirol|tj|tk|tl|tm|tmall|tn|to|today|tokyo|tools|top|toray|toshiba|total|tours|town|toyota|toys|tp|tr|trade|trading|training|travel|travelers|travelersinsurance|trust|trv|tt|tube|tui|tunes|tushu|tv|tvs|tw|tz|ua|ubs|ug|uk|unicom|university|uno|uol|us|uy|uz|va|vacations|vana|vc|ve|vegas|ventures|verisign|versicherung|vet|vg|vi|viajes|video|viking|villas|vin|vip|virgin|vision|vista|vistaprint|viva|vlaanderen|vn|vodka|volkswagen|vote|voting|voto|voyage|vu|vuelos|wales|walter|wang|wanggou|watch|watches|weather|weatherchannel|webcam|weber|website|wed|wedding|weir|wf|whoswho|wien|wiki|williamhill|win|windows|wine|wme|wolterskluwer|work|works|world|ws|wtc|wtf|xbox|xerox|xin|xperia|xxx|xyz|yachts|yahoo|yamaxun|yandex|ye|yodobashi|yoga|yokohama|youtube|yt|za|zara|zero|zip|zm|zone|zuerich|zw'.split('|');
    var NUM = '0123456789'.split('');
    var ALPHANUM = '0123456789abcdefghijklmnopqrstuvwxyz'.split('');
    var WHITESPACE = [
        ' ',
        '\f',
        '\r',
        '\t',
        '\x0B'
    ];
    var COLON = ':';
    var domainStates = [], makeState = function makeState(tokenClass) {
            return new _state.CharacterState(tokenClass);
        };
    var T_DOMAIN = _tokens.text.DOMAIN, T_LOCALHOST = _tokens.text.LOCALHOST, T_NUM = _tokens.text.NUM, T_PROTOCOL = _tokens.text.PROTOCOL, T_TLD = _tokens.text.TLD, T_WS = _tokens.text.WS;
    var S_START = makeState(), S_NUM = makeState(T_NUM), S_DOMAIN = makeState(T_DOMAIN), S_DOMAIN_HYPHEN = makeState(), S_WS = makeState(T_WS);
    S_START.on('@', makeState(_tokens.text.AT)).on('.', makeState(_tokens.text.DOT)).on('+', makeState(_tokens.text.PLUS)).on('#', makeState(_tokens.text.POUND)).on('?', makeState(_tokens.text.QUERY)).on('/', makeState(_tokens.text.SLASH)).on(COLON, makeState(_tokens.text.COLON)).on('{', makeState(_tokens.text.OPENBRACE)).on('[', makeState(_tokens.text.OPENBRACKET)).on('(', makeState(_tokens.text.OPENPAREN)).on('}', makeState(_tokens.text.CLOSEBRACE)).on(']', makeState(_tokens.text.CLOSEBRACKET)).on(')', makeState(_tokens.text.CLOSEPAREN)).on([
        ',',
        ';',
        '!',
        '"'
    ], makeState(_tokens.text.PUNCTUATION));
    S_START.on('\n', makeState(_tokens.text.NL)).on(WHITESPACE, S_WS);
    S_WS.on(WHITESPACE, S_WS);
    for (var i = 0; i < tlds.length; i++) {
        var newStates = (0, _state.stateify)(tlds[i], S_START, T_TLD, T_DOMAIN);
        domainStates.push.apply(domainStates, newStates);
    }
    var partialProtocolFileStates = (0, _state.stateify)('file', S_START, T_DOMAIN, T_DOMAIN), partialProtocolFtpStates = (0, _state.stateify)('ftp', S_START, T_DOMAIN, T_DOMAIN), partialProtocolHttpStates = (0, _state.stateify)('http', S_START, T_DOMAIN, T_DOMAIN);
    domainStates.push.apply(domainStates, partialProtocolFileStates);
    domainStates.push.apply(domainStates, partialProtocolFtpStates);
    domainStates.push.apply(domainStates, partialProtocolHttpStates);
    var S_PROTOCOL_FILE = partialProtocolFileStates.pop(), S_PROTOCOL_FTP = partialProtocolFtpStates.pop(), S_PROTOCOL_HTTP = partialProtocolHttpStates.pop(), S_PROTOCOL_SECURE = makeState(T_DOMAIN), S_FULL_PROTOCOL = makeState(T_PROTOCOL);
    S_PROTOCOL_FTP.on('s', S_PROTOCOL_SECURE).on(COLON, S_FULL_PROTOCOL);
    S_PROTOCOL_HTTP.on('s', S_PROTOCOL_SECURE).on(COLON, S_FULL_PROTOCOL);
    domainStates.push(S_PROTOCOL_SECURE);
    S_PROTOCOL_FILE.on(COLON, S_FULL_PROTOCOL);
    S_PROTOCOL_SECURE.on(COLON, S_FULL_PROTOCOL);
    var partialLocalhostStates = (0, _state.stateify)('localhost', S_START, T_LOCALHOST, T_DOMAIN);
    domainStates.push.apply(domainStates, partialLocalhostStates);
    S_START.on(NUM, S_NUM);
    S_NUM.on('-', S_DOMAIN_HYPHEN).on(NUM, S_NUM).on(ALPHANUM, S_DOMAIN);
    S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
    for (var _i = 0; _i < domainStates.length; _i++) {
        domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(ALPHANUM, S_DOMAIN);
    }
    S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(NUM, S_DOMAIN).on(ALPHANUM, S_DOMAIN);
    S_START.defaultTransition = makeState(_tokens.text.SYM);
    var run = function run(str) {
        var lowerStr = str.replace(/[A-Z]/g, function (c) {
            return c.toLowerCase();
        });
        var len = str.length;
        var tokens = [];
        var cursor = 0;
        while (cursor < len) {
            var state = S_START, secondState = null, nextState = null, tokenLength = 0, latestAccepting = null, sinceAccepts = -1;
            while (cursor < len && (nextState = state.next(lowerStr[cursor]))) {
                secondState = null;
                state = nextState;
                if (state.accepts()) {
                    sinceAccepts = 0;
                    latestAccepting = state;
                } else if (sinceAccepts >= 0) {
                    sinceAccepts++;
                }
                tokenLength++;
                cursor++;
            }
            if (sinceAccepts < 0)
                continue;
            cursor -= sinceAccepts;
            tokenLength -= sinceAccepts;
            var TOKEN = latestAccepting.emit();
            tokens.push(new TOKEN(str.substr(cursor - tokenLength, tokenLength)));
        }
        return tokens;
    };
    var start = S_START;
    exports.State = _state.CharacterState;
    exports.TOKENS = _tokens.text;
    exports.run = run;
    exports.start = start;
});
define('linkify/core/parser', [
    'exports',
    './tokens',
    './state'
], function (exports, _tokens, _state) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.start = exports.run = exports.TOKENS = exports.State = undefined;
    var makeState = function makeState(tokenClass) {
        return new _state.TokenState(tokenClass);
    };
    var TT_DOMAIN = _tokens.text.DOMAIN, TT_AT = _tokens.text.AT, TT_COLON = _tokens.text.COLON, TT_DOT = _tokens.text.DOT, TT_PUNCTUATION = _tokens.text.PUNCTUATION, TT_LOCALHOST = _tokens.text.LOCALHOST, TT_NL = _tokens.text.NL, TT_NUM = _tokens.text.NUM, TT_PLUS = _tokens.text.PLUS, TT_POUND = _tokens.text.POUND, TT_PROTOCOL = _tokens.text.PROTOCOL, TT_QUERY = _tokens.text.QUERY, TT_SLASH = _tokens.text.SLASH, TT_SYM = _tokens.text.SYM, TT_TLD = _tokens.text.TLD, TT_OPENBRACE = _tokens.text.OPENBRACE, TT_OPENBRACKET = _tokens.text.OPENBRACKET, TT_OPENPAREN = _tokens.text.OPENPAREN, TT_CLOSEBRACE = _tokens.text.CLOSEBRACE, TT_CLOSEBRACKET = _tokens.text.CLOSEBRACKET, TT_CLOSEPAREN = _tokens.text.CLOSEPAREN;
    var T_EMAIL = _tokens.multi.EMAIL, T_NL = _tokens.multi.NL, T_TEXT = _tokens.multi.TEXT, T_URL = _tokens.multi.URL;
    var S_START = makeState();
    var S_PROTOCOL = makeState(), S_PROTOCOL_SLASH = makeState(), S_PROTOCOL_SLASH_SLASH = makeState(), S_DOMAIN = makeState(), S_DOMAIN_DOT = makeState(), S_TLD = makeState(T_URL), S_TLD_COLON = makeState(), S_TLD_PORT = makeState(T_URL), S_URL = makeState(T_URL), S_URL_NON_ACCEPTING = makeState(), S_URL_OPENBRACE = makeState(), S_URL_OPENBRACKET = makeState(), S_URL_OPENPAREN = makeState(), S_URL_OPENBRACE_Q = makeState(T_URL), S_URL_OPENBRACKET_Q = makeState(T_URL), S_URL_OPENPAREN_Q = makeState(T_URL), S_URL_OPENBRACE_SYMS = makeState(), S_URL_OPENBRACKET_SYMS = makeState(), S_URL_OPENPAREN_SYMS = makeState(), S_EMAIL_DOMAIN = makeState(), S_EMAIL_DOMAIN_DOT = makeState(), S_EMAIL = makeState(T_EMAIL), S_EMAIL_COLON = makeState(), S_EMAIL_PORT = makeState(T_EMAIL), S_LOCALPART = makeState(), S_LOCALPART_AT = makeState(), S_LOCALPART_DOT = makeState(), S_NL = makeState(T_NL);
    S_START.on(TT_NL, S_NL).on(TT_PROTOCOL, S_PROTOCOL).on(TT_SLASH, S_PROTOCOL_SLASH);
    S_PROTOCOL.on(TT_SLASH, S_PROTOCOL_SLASH);
    S_PROTOCOL_SLASH.on(TT_SLASH, S_PROTOCOL_SLASH_SLASH);
    S_START.on(TT_TLD, S_DOMAIN).on(TT_DOMAIN, S_DOMAIN).on(TT_LOCALHOST, S_TLD).on(TT_NUM, S_DOMAIN);
    S_PROTOCOL_SLASH_SLASH.on(TT_TLD, S_URL).on(TT_DOMAIN, S_URL).on(TT_NUM, S_URL).on(TT_LOCALHOST, S_URL);
    S_DOMAIN.on(TT_DOT, S_DOMAIN_DOT);
    S_EMAIL_DOMAIN.on(TT_DOT, S_EMAIL_DOMAIN_DOT);
    S_DOMAIN_DOT.on(TT_TLD, S_TLD).on(TT_DOMAIN, S_DOMAIN).on(TT_NUM, S_DOMAIN).on(TT_LOCALHOST, S_DOMAIN);
    S_EMAIL_DOMAIN_DOT.on(TT_TLD, S_EMAIL).on(TT_DOMAIN, S_EMAIL_DOMAIN).on(TT_NUM, S_EMAIL_DOMAIN).on(TT_LOCALHOST, S_EMAIL_DOMAIN);
    S_TLD.on(TT_DOT, S_DOMAIN_DOT);
    S_EMAIL.on(TT_DOT, S_EMAIL_DOMAIN_DOT);
    S_TLD.on(TT_COLON, S_TLD_COLON).on(TT_SLASH, S_URL);
    S_TLD_COLON.on(TT_NUM, S_TLD_PORT);
    S_TLD_PORT.on(TT_SLASH, S_URL);
    S_EMAIL.on(TT_COLON, S_EMAIL_COLON);
    S_EMAIL_COLON.on(TT_NUM, S_EMAIL_PORT);
    var qsAccepting = [
        TT_DOMAIN,
        TT_AT,
        TT_LOCALHOST,
        TT_NUM,
        TT_PLUS,
        TT_POUND,
        TT_PROTOCOL,
        TT_SLASH,
        TT_TLD,
        TT_SYM
    ];
    var qsNonAccepting = [
        TT_COLON,
        TT_DOT,
        TT_QUERY,
        TT_PUNCTUATION,
        TT_CLOSEBRACE,
        TT_CLOSEBRACKET,
        TT_CLOSEPAREN,
        TT_OPENBRACE,
        TT_OPENBRACKET,
        TT_OPENPAREN
    ];
    S_URL.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);
    S_URL_NON_ACCEPTING.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);
    S_URL_OPENBRACE.on(TT_CLOSEBRACE, S_URL);
    S_URL_OPENBRACKET.on(TT_CLOSEBRACKET, S_URL);
    S_URL_OPENPAREN.on(TT_CLOSEPAREN, S_URL);
    S_URL_OPENBRACE_Q.on(TT_CLOSEBRACE, S_URL);
    S_URL_OPENBRACKET_Q.on(TT_CLOSEBRACKET, S_URL);
    S_URL_OPENPAREN_Q.on(TT_CLOSEPAREN, S_URL);
    S_URL_OPENBRACE_SYMS.on(TT_CLOSEBRACE, S_URL);
    S_URL_OPENBRACKET_SYMS.on(TT_CLOSEBRACKET, S_URL);
    S_URL_OPENPAREN_SYMS.on(TT_CLOSEPAREN, S_URL);
    S_URL_OPENBRACE.on(qsAccepting, S_URL_OPENBRACE_Q);
    S_URL_OPENBRACKET.on(qsAccepting, S_URL_OPENBRACKET_Q);
    S_URL_OPENPAREN.on(qsAccepting, S_URL_OPENPAREN_Q);
    S_URL_OPENBRACE.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
    S_URL_OPENBRACKET.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
    S_URL_OPENPAREN.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);
    S_URL_OPENBRACE_Q.on(qsAccepting, S_URL_OPENBRACE_Q);
    S_URL_OPENBRACKET_Q.on(qsAccepting, S_URL_OPENBRACKET_Q);
    S_URL_OPENPAREN_Q.on(qsAccepting, S_URL_OPENPAREN_Q);
    S_URL_OPENBRACE_Q.on(qsNonAccepting, S_URL_OPENBRACE_Q);
    S_URL_OPENBRACKET_Q.on(qsNonAccepting, S_URL_OPENBRACKET_Q);
    S_URL_OPENPAREN_Q.on(qsNonAccepting, S_URL_OPENPAREN_Q);
    S_URL_OPENBRACE_SYMS.on(qsAccepting, S_URL_OPENBRACE_Q);
    S_URL_OPENBRACKET_SYMS.on(qsAccepting, S_URL_OPENBRACKET_Q);
    S_URL_OPENPAREN_SYMS.on(qsAccepting, S_URL_OPENPAREN_Q);
    S_URL_OPENBRACE_SYMS.on(qsNonAccepting, S_URL_OPENBRACE_SYMS);
    S_URL_OPENBRACKET_SYMS.on(qsNonAccepting, S_URL_OPENBRACKET_SYMS);
    S_URL_OPENPAREN_SYMS.on(qsNonAccepting, S_URL_OPENPAREN_SYMS);
    S_URL.on(qsAccepting, S_URL);
    S_URL_NON_ACCEPTING.on(qsAccepting, S_URL);
    S_URL.on(qsNonAccepting, S_URL_NON_ACCEPTING);
    S_URL_NON_ACCEPTING.on(qsNonAccepting, S_URL_NON_ACCEPTING);
    var localpartAccepting = [
        TT_DOMAIN,
        TT_NUM,
        TT_PLUS,
        TT_POUND,
        TT_QUERY,
        TT_SYM,
        TT_TLD
    ];
    S_DOMAIN.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT);
    S_TLD.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT);
    S_DOMAIN_DOT.on(localpartAccepting, S_LOCALPART);
    S_LOCALPART.on(localpartAccepting, S_LOCALPART).on(TT_AT, S_LOCALPART_AT).on(TT_DOT, S_LOCALPART_DOT);
    S_LOCALPART_DOT.on(localpartAccepting, S_LOCALPART);
    S_LOCALPART_AT.on(TT_TLD, S_EMAIL_DOMAIN).on(TT_DOMAIN, S_EMAIL_DOMAIN).on(TT_LOCALHOST, S_EMAIL);
    var run = function run(tokens) {
        var len = tokens.length, cursor = 0, multis = [], textTokens = [];
        while (cursor < len) {
            var state = S_START, secondState = null, nextState = null, multiLength = 0, latestAccepting = null, sinceAccepts = -1;
            while (cursor < len && !(secondState = state.next(tokens[cursor]))) {
                textTokens.push(tokens[cursor++]);
            }
            while (cursor < len && (nextState = secondState || state.next(tokens[cursor]))) {
                secondState = null;
                state = nextState;
                if (state.accepts()) {
                    sinceAccepts = 0;
                    latestAccepting = state;
                } else if (sinceAccepts >= 0) {
                    sinceAccepts++;
                }
                cursor++;
                multiLength++;
            }
            if (sinceAccepts < 0) {
                for (var i = cursor - multiLength; i < cursor; i++) {
                    textTokens.push(tokens[i]);
                }
            } else {
                if (textTokens.length > 0) {
                    multis.push(new T_TEXT(textTokens));
                    textTokens = [];
                }
                cursor -= sinceAccepts;
                multiLength -= sinceAccepts;
                var MULTI = latestAccepting.emit();
                multis.push(new MULTI(tokens.slice(cursor - multiLength, cursor)));
            }
        }
        if (textTokens.length > 0) {
            multis.push(new T_TEXT(textTokens));
        }
        return multis;
    };
    var TOKENS = _tokens.multi, start = S_START;
    exports.State = _state.TokenState;
    exports.TOKENS = TOKENS;
    exports.run = run;
    exports.start = start;
});
define('linkify', [
    'exports',
    './linkify/utils/class',
    './linkify/utils/options',
    './linkify/core/scanner',
    './linkify/core/parser'
], function (exports, _class, _options, _scanner, _parser) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.inherits = exports.find = undefined;
    var options = _interopRequireWildcard(_options);
    var scanner = _interopRequireWildcard(_scanner);
    var parser = _interopRequireWildcard(_parser);
    function _interopRequireWildcard(obj) {
        if (obj && obj.__esModule) {
            return obj;
        } else {
            var newObj = {};
            if (obj != null) {
                for (var key in obj) {
                    if (Object.prototype.hasOwnProperty.call(obj, key))
                        newObj[key] = obj[key];
                }
            }
            newObj['default'] = obj;
            return newObj;
        }
    }
    if (!Array.isArray) {
        Array.isArray = function (arg) {
            return Object.prototype.toString.call(arg) === '[object Array]';
        };
    }
    var tokenize = function tokenize(str) {
        return parser.run(scanner.run(str));
    };
    var find = function find(str) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var tokens = tokenize(str), filtered = [];
        for (var i = 0; i < tokens.length; i++) {
            if (tokens[i].isLink && (!type || tokens[i].type === type)) {
                filtered.push(tokens[i].toObject());
            }
        }
        return filtered;
    };
    var test = function test(str) {
        var type = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];
        var tokens = tokenize(str);
        return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].type === type);
    };
    exports.find = find;
    exports.inherits = _class.inherits;
    exports.options = options;
    exports.parser = parser;
    exports.scanner = scanner;
    exports.test = test;
    exports.tokenize = tokenize;
});