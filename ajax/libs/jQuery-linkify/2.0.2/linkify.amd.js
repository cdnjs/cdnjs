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
define('linkify/core/tokens', ['exports'], function (exports) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var TextToken = function () {
        function TextToken(value) {
            _classCallCheck(this, TextToken);
            this.v = value;
        }
        TextToken.prototype.toString = function toString() {
            return this.v + '';
        };
        return TextToken;
    }();
    var DOMAIN = function (_TextToken) {
        _inherits(DOMAIN, _TextToken);
        function DOMAIN() {
            _classCallCheck(this, DOMAIN);
            return _possibleConstructorReturn(this, _TextToken.apply(this, arguments));
        }
        return DOMAIN;
    }(TextToken);
    var AT = function (_TextToken2) {
        _inherits(AT, _TextToken2);
        function AT() {
            _classCallCheck(this, AT);
            return _possibleConstructorReturn(this, _TextToken2.call(this, '@'));
        }
        return AT;
    }(TextToken);
    var COLON = function (_TextToken3) {
        _inherits(COLON, _TextToken3);
        function COLON() {
            _classCallCheck(this, COLON);
            return _possibleConstructorReturn(this, _TextToken3.call(this, ':'));
        }
        return COLON;
    }(TextToken);
    var DOT = function (_TextToken4) {
        _inherits(DOT, _TextToken4);
        function DOT() {
            _classCallCheck(this, DOT);
            return _possibleConstructorReturn(this, _TextToken4.call(this, '.'));
        }
        return DOT;
    }(TextToken);
    var PUNCTUATION = function (_TextToken5) {
        _inherits(PUNCTUATION, _TextToken5);
        function PUNCTUATION() {
            _classCallCheck(this, PUNCTUATION);
            return _possibleConstructorReturn(this, _TextToken5.apply(this, arguments));
        }
        return PUNCTUATION;
    }(TextToken);
    var LOCALHOST = function (_TextToken6) {
        _inherits(LOCALHOST, _TextToken6);
        function LOCALHOST() {
            _classCallCheck(this, LOCALHOST);
            return _possibleConstructorReturn(this, _TextToken6.apply(this, arguments));
        }
        return LOCALHOST;
    }(TextToken);
    var TNL = function (_TextToken7) {
        _inherits(TNL, _TextToken7);
        function TNL() {
            _classCallCheck(this, TNL);
            return _possibleConstructorReturn(this, _TextToken7.call(this, '\n'));
        }
        return TNL;
    }(TextToken);
    var NUM = function (_TextToken8) {
        _inherits(NUM, _TextToken8);
        function NUM() {
            _classCallCheck(this, NUM);
            return _possibleConstructorReturn(this, _TextToken8.apply(this, arguments));
        }
        return NUM;
    }(TextToken);
    var PLUS = function (_TextToken9) {
        _inherits(PLUS, _TextToken9);
        function PLUS() {
            _classCallCheck(this, PLUS);
            return _possibleConstructorReturn(this, _TextToken9.call(this, '+'));
        }
        return PLUS;
    }(TextToken);
    var POUND = function (_TextToken10) {
        _inherits(POUND, _TextToken10);
        function POUND() {
            _classCallCheck(this, POUND);
            return _possibleConstructorReturn(this, _TextToken10.call(this, '#'));
        }
        return POUND;
    }(TextToken);
    var PROTOCOL = function (_TextToken11) {
        _inherits(PROTOCOL, _TextToken11);
        function PROTOCOL() {
            _classCallCheck(this, PROTOCOL);
            return _possibleConstructorReturn(this, _TextToken11.apply(this, arguments));
        }
        return PROTOCOL;
    }(TextToken);
    var QUERY = function (_TextToken12) {
        _inherits(QUERY, _TextToken12);
        function QUERY() {
            _classCallCheck(this, QUERY);
            return _possibleConstructorReturn(this, _TextToken12.call(this, '?'));
        }
        return QUERY;
    }(TextToken);
    var SLASH = function (_TextToken13) {
        _inherits(SLASH, _TextToken13);
        function SLASH() {
            _classCallCheck(this, SLASH);
            return _possibleConstructorReturn(this, _TextToken13.call(this, '/'));
        }
        return SLASH;
    }(TextToken);
    var SYM = function (_TextToken14) {
        _inherits(SYM, _TextToken14);
        function SYM() {
            _classCallCheck(this, SYM);
            return _possibleConstructorReturn(this, _TextToken14.apply(this, arguments));
        }
        return SYM;
    }(TextToken);
    var TLD = function (_TextToken15) {
        _inherits(TLD, _TextToken15);
        function TLD() {
            _classCallCheck(this, TLD);
            return _possibleConstructorReturn(this, _TextToken15.apply(this, arguments));
        }
        return TLD;
    }(TextToken);
    var WS = function (_TextToken16) {
        _inherits(WS, _TextToken16);
        function WS() {
            _classCallCheck(this, WS);
            return _possibleConstructorReturn(this, _TextToken16.apply(this, arguments));
        }
        return WS;
    }(TextToken);
    var OPENBRACE = function (_TextToken17) {
        _inherits(OPENBRACE, _TextToken17);
        function OPENBRACE() {
            _classCallCheck(this, OPENBRACE);
            return _possibleConstructorReturn(this, _TextToken17.call(this, '{'));
        }
        return OPENBRACE;
    }(TextToken);
    var OPENBRACKET = function (_TextToken18) {
        _inherits(OPENBRACKET, _TextToken18);
        function OPENBRACKET() {
            _classCallCheck(this, OPENBRACKET);
            return _possibleConstructorReturn(this, _TextToken18.call(this, '['));
        }
        return OPENBRACKET;
    }(TextToken);
    var OPENPAREN = function (_TextToken19) {
        _inherits(OPENPAREN, _TextToken19);
        function OPENPAREN() {
            _classCallCheck(this, OPENPAREN);
            return _possibleConstructorReturn(this, _TextToken19.call(this, '('));
        }
        return OPENPAREN;
    }(TextToken);
    var CLOSEBRACE = function (_TextToken20) {
        _inherits(CLOSEBRACE, _TextToken20);
        function CLOSEBRACE() {
            _classCallCheck(this, CLOSEBRACE);
            return _possibleConstructorReturn(this, _TextToken20.call(this, '}'));
        }
        return CLOSEBRACE;
    }(TextToken);
    var CLOSEBRACKET = function (_TextToken21) {
        _inherits(CLOSEBRACKET, _TextToken21);
        function CLOSEBRACKET() {
            _classCallCheck(this, CLOSEBRACKET);
            return _possibleConstructorReturn(this, _TextToken21.call(this, ']'));
        }
        return CLOSEBRACKET;
    }(TextToken);
    var CLOSEPAREN = function (_TextToken22) {
        _inherits(CLOSEPAREN, _TextToken22);
        function CLOSEPAREN() {
            _classCallCheck(this, CLOSEPAREN);
            return _possibleConstructorReturn(this, _TextToken22.call(this, ')'));
        }
        return CLOSEPAREN;
    }(TextToken);
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
    var MultiToken = function () {
        function MultiToken(value) {
            _classCallCheck(this, MultiToken);
            this.v = value;
            this.type = 'token';
            this.isLink = false;
        }
        MultiToken.prototype.toString = function toString() {
            var result = [];
            for (var i = 0; i < this.v.length; i++) {
                result.push(this.v[i].toString());
            }
            return result.join('');
        };
        MultiToken.prototype.toHref = function toHref() {
            return this.toString();
        };
        MultiToken.prototype.toObject = function toObject() {
            var protocol = arguments.length <= 0 || arguments[0] === undefined ? 'http' : arguments[0];
            return {
                type: this.type,
                value: this.toString(),
                href: this.toHref(protocol)
            };
        };
        return MultiToken;
    }();
    var EMAIL = function (_MultiToken) {
        _inherits(EMAIL, _MultiToken);
        function EMAIL(value) {
            _classCallCheck(this, EMAIL);
            var _this23 = _possibleConstructorReturn(this, _MultiToken.call(this, value));
            _this23.type = 'email';
            _this23.isLink = true;
            return _this23;
        }
        EMAIL.prototype.toHref = function toHref() {
            return 'mailto:' + this.toString();
        };
        return EMAIL;
    }(MultiToken);
    var TEXT = function (_MultiToken2) {
        _inherits(TEXT, _MultiToken2);
        function TEXT(value) {
            _classCallCheck(this, TEXT);
            var _this24 = _possibleConstructorReturn(this, _MultiToken2.call(this, value));
            _this24.type = 'text';
            return _this24;
        }
        return TEXT;
    }(MultiToken);
    var MNL = function (_MultiToken3) {
        _inherits(MNL, _MultiToken3);
        function MNL(value) {
            _classCallCheck(this, MNL);
            var _this25 = _possibleConstructorReturn(this, _MultiToken3.call(this, value));
            _this25.type = 'nl';
            return _this25;
        }
        return MNL;
    }(MultiToken);
    var URL = function (_MultiToken4) {
        _inherits(URL, _MultiToken4);
        function URL(value) {
            _classCallCheck(this, URL);
            var _this26 = _possibleConstructorReturn(this, _MultiToken4.call(this, value));
            _this26.type = 'url';
            _this26.isLink = true;
            return _this26;
        }
        URL.prototype.toHref = function toHref() {
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
        };
        URL.prototype.hasProtocol = function hasProtocol() {
            return this.v[0] instanceof PROTOCOL;
        };
        return URL;
    }(MultiToken);
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
define('linkify/core/state', ['exports'], function (exports) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    function _possibleConstructorReturn(self, call) {
        if (!self) {
            throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        }
        return call && (typeof call === 'object' || typeof call === 'function') ? call : self;
    }
    function _inherits(subClass, superClass) {
        if (typeof superClass !== 'function' && superClass !== null) {
            throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
        }
        subClass.prototype = Object.create(superClass && superClass.prototype, {
            constructor: {
                value: subClass,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        if (superClass)
            Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
    }
    function _classCallCheck(instance, Constructor) {
        if (!(instance instanceof Constructor)) {
            throw new TypeError('Cannot call a class as a function');
        }
    }
    var BaseState = function () {
        function BaseState(tClass) {
            _classCallCheck(this, BaseState);
            this.j = [];
            this.T = tClass || null;
        }
        BaseState.prototype.on = function on(symbol, state) {
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
        };
        BaseState.prototype.next = function next(item) {
            for (var i = 0; i < this.j.length; i++) {
                var jump = this.j[i], symbol = jump[0], state = jump[1];
                if (this.test(item, symbol))
                    return state;
            }
            return false;
        };
        BaseState.prototype.accepts = function accepts() {
            return !!this.T;
        };
        BaseState.prototype.test = function test(item, symbol) {
            return item === symbol;
        };
        BaseState.prototype.emit = function emit() {
            return this.T;
        };
        return BaseState;
    }();
    var CharacterState = function (_BaseState) {
        _inherits(CharacterState, _BaseState);
        function CharacterState() {
            _classCallCheck(this, CharacterState);
            return _possibleConstructorReturn(this, _BaseState.apply(this, arguments));
        }
        CharacterState.prototype.test = function test(character, charOrRegExp) {
            return character === charOrRegExp || charOrRegExp instanceof RegExp && charOrRegExp.test(character);
        };
        return CharacterState;
    }(BaseState);
    var TokenState = function (_BaseState2) {
        _inherits(TokenState, _BaseState2);
        function TokenState() {
            _classCallCheck(this, TokenState);
            return _possibleConstructorReturn(this, _BaseState2.apply(this, arguments));
        }
        TokenState.prototype.test = function test(token, tokenClass) {
            return token instanceof tokenClass;
        };
        return TokenState;
    }(BaseState);
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
    var tlds = 'abogado|ac|academy|accountants|active|actor|ad|adult|ae|aero|af|ag|agency|ai|airforce|al|allfinanz|alsace|am|an|android|ao|aq|aquarelle|ar|archi|army|arpa|as|asia|associates|at|attorney|au|auction|audio|autos|aw|ax|axa|az|ba|band|bar|bargains|bayern|bb|bd|be|beer|berlin|best|bf|bg|bh|bi|bid|bike|bio|biz|bj|black|blackfriday|bloomberg|blue|bm|bmw|bn|bnpparibas|bo|boo|boutique|br|brussels|bs|bt|budapest|build|builders|business|buzz|bv|bw|by|bz|bzh|ca|cab|cal|camera|camp|cancerresearch|capetown|capital|caravan|cards|care|career|careers|casa|cash|cat|catering|cc|cd|center|ceo|cern|cf|cg|ch|channel|cheap|christmas|chrome|church|ci|citic|city|ck|cl|claims|cleaning|click|clinic|clothing|club|cm|cn|co|coach|codes|coffee|college|cologne|com|community|company|computer|condos|construction|consulting|contractors|cooking|cool|coop|country|cr|credit|creditcard|cricket|crs|cruises|cu|cuisinella|cv|cw|cx|cy|cymru|cz|dad|dance|dating|day|de|deals|degree|delivery|democrat|dental|dentist|desi|diamonds|diet|digital|direct|directory|discount|dj|dk|dm|dnp|do|domains|durban|dvag|dz|eat|ec|edu|education|ee|eg|email|emerck|energy|engineer|engineering|enterprises|equipment|er|es|esq|estate|et|eu|eurovision|eus|events|everbank|exchange|expert|exposed|fail|farm|fashion|feedback|fi|finance|financial|firmdale|fish|fishing|fitness|fj|fk|flights|florist|flsmidth|fly|fm|fo|foo|forsale|foundation|fr|frl|frogans|fund|furniture|futbol|ga|gal|gallery|gb|gbiz|gd|ge|gent|gf|gg|gh|gi|gift|gifts|gives|gl|glass|gle|global|globo|gm|gmail|gmo|gmx|gn|google|gop|gov|gp|gq|gr|graphics|gratis|green|gripe|gs|gt|gu|guide|guitars|guru|gw|gy|hamburg|haus|healthcare|help|here|hiphop|hiv|hk|hm|hn|holdings|holiday|homes|horse|host|hosting|house|how|hr|ht|hu|ibm|id|ie|il|im|immo|immobilien|in|industries|info|ing|ink|institute|insure|int|international|investments|io|iq|ir|irish|is|it|je|jetzt|jm|jo|jobs|joburg|jp|juegos|kaufen|ke|kg|kh|ki|kim|kitchen|kiwi|km|kn|koeln|kp|kr|krd|kred|kw|ky|kz|la|lacaixa|land|latrobe|lawyer|lb|lc|lds|lease|legal|lgbt|li|life|lighting|limited|limo|link|lk|loans|local|london|lotto|lr|ls|lt|ltda|lu|luxe|luxury|lv|ly|ma|madrid|maison|management|mango|market|marketing|mc|md|me|media|meet|melbourne|meme|memorial|menu|mg|mh|miami|mil|mini|mk|ml|mm|mn|mo|mobi|moda|moe|monash|money|mormon|mortgage|moscow|motorcycles|mov|mp|mq|mr|ms|mt|mu|museum|mv|mw|mx|my|mz|na|nagoya|name|navy|nc|ne|net|network|neustar|new|nexus|nf|ng|ngo|nhk|ni|ninja|nl|no|np|nr|nra|nrw|nu|nyc|nz|okinawa|om|ong|onl|ooo|org|organic|otsuka|ovh|pa|paris|partners|parts|party|pe|pf|pg|ph|pharmacy|photo|photography|photos|physio|pics|pictures|pink|pizza|pk|pl|place|plumbing|pm|pn|pohl|poker|porn|post|pr|praxi|press|pro|prod|productions|prof|properties|property|ps|pt|pub|pw|py|qa|qpon|quebec|re|realtor|recipes|red|rehab|reise|reisen|reit|ren|rentals|repair|report|republican|rest|restaurant|reviews|rich|rio|rip|ro|rocks|rodeo|rs|rsvp|ru|ruhr|rw|ryukyu|sa|saarland|sarl|sb|sc|sca|scb|schmidt|schule|science|scot|sd|se|services|sexy|sg|sh|shiksha|shoes|si|singles|sj|sk|sl|sm|sn|so|social|software|sohu|solar|solutions|soy|space|spiegel|sr|st|su|supplies|supply|support|surf|surgery|suzuki|sv|sx|sy|sydney|systems|sz|taipei|tatar|tattoo|tax|tc|td|technology|tel|tf|tg|th|tienda|tips|tirol|tj|tk|tl|tm|tn|to|today|tokyo|tools|top|town|toys|tp|tr|trade|training|travel|trust|tt|tui|tv|tw|tz|ua|ug|uk|university|uno|uol|us|uy|uz|va|vacations|vc|ve|vegas|ventures|versicherung|vet|vg|vi|viajes|villas|vision|vlaanderen|vn|vodka|vote|voting|voto|voyage|vu|wales|wang|watch|webcam|website|wed|wedding|wf|whoswho|wien|wiki|williamhill|wme|work|works|world|ws|wtc|wtf|xxx|xyz|yachts|yandex|ye|yoga|yokohama|youtube|yt|za|zip|zm|zone|zw'.split('|');
    var REGEXP_NUM = /[0-9]/, REGEXP_ALPHANUM = /[a-z0-9]/, COLON = ':';
    var domainStates = [], makeState = function makeState(tokenClass) {
            return new _state.CharacterState(tokenClass);
        };
    var T_DOMAIN = _tokens.text.DOMAIN, T_LOCALHOST = _tokens.text.LOCALHOST, T_NUM = _tokens.text.NUM, T_PROTOCOL = _tokens.text.PROTOCOL, T_TLD = _tokens.text.TLD, T_WS = _tokens.text.WS;
    var S_START = makeState(), S_NUM = makeState(T_NUM), S_DOMAIN = makeState(T_DOMAIN), S_DOMAIN_HYPHEN = makeState(), S_WS = makeState(T_WS);
    S_START.on('@', makeState(_tokens.text.AT)).on('.', makeState(_tokens.text.DOT)).on('+', makeState(_tokens.text.PLUS)).on('#', makeState(_tokens.text.POUND)).on('?', makeState(_tokens.text.QUERY)).on('/', makeState(_tokens.text.SLASH)).on(COLON, makeState(_tokens.text.COLON)).on('{', makeState(_tokens.text.OPENBRACE)).on('[', makeState(_tokens.text.OPENBRACKET)).on('(', makeState(_tokens.text.OPENPAREN)).on('}', makeState(_tokens.text.CLOSEBRACE)).on(']', makeState(_tokens.text.CLOSEBRACKET)).on(')', makeState(_tokens.text.CLOSEPAREN)).on(/[,;!]/, makeState(_tokens.text.PUNCTUATION));
    S_START.on(/\n/, makeState(_tokens.text.NL)).on(/\s/, S_WS);
    S_WS.on(/[^\S\n]/, S_WS);
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
    S_START.on(REGEXP_NUM, S_NUM);
    S_NUM.on('-', S_DOMAIN_HYPHEN).on(REGEXP_NUM, S_NUM).on(REGEXP_ALPHANUM, S_DOMAIN);
    S_DOMAIN.on('-', S_DOMAIN_HYPHEN).on(REGEXP_ALPHANUM, S_DOMAIN);
    for (var _i = 0; _i < domainStates.length; _i++) {
        domainStates[_i].on('-', S_DOMAIN_HYPHEN).on(REGEXP_ALPHANUM, S_DOMAIN);
    }
    S_DOMAIN_HYPHEN.on('-', S_DOMAIN_HYPHEN).on(REGEXP_NUM, S_DOMAIN).on(REGEXP_ALPHANUM, S_DOMAIN);
    S_START.on(/./, makeState(_tokens.text.SYM));
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
    var S_PROTOCOL = makeState(), S_PROTOCOL_SLASH = makeState(), S_PROTOCOL_SLASH_SLASH = makeState(), S_DOMAIN = makeState(), S_DOMAIN_DOT = makeState(), S_TLD = makeState(T_URL), S_TLD_COLON = makeState(), S_TLD_PORT = makeState(T_URL), S_URL = makeState(T_URL), S_URL_SYMS = makeState(), S_URL_OPENBRACE = makeState(), S_URL_OPENBRACKET = makeState(), S_URL_OPENPAREN = makeState(), S_URL_OPENBRACE_Q = makeState(T_URL), S_URL_OPENBRACKET_Q = makeState(T_URL), S_URL_OPENPAREN_Q = makeState(T_URL), S_URL_OPENBRACE_SYMS = makeState(), S_URL_OPENBRACKET_SYMS = makeState(), S_URL_OPENPAREN_SYMS = makeState(), S_EMAIL_DOMAIN = makeState(), S_EMAIL_DOMAIN_DOT = makeState(), S_EMAIL = makeState(T_EMAIL), S_EMAIL_COLON = makeState(), S_EMAIL_PORT = makeState(T_EMAIL), S_LOCALPART = makeState(), S_LOCALPART_AT = makeState(), S_LOCALPART_DOT = makeState(), S_NL = makeState(T_NL);
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
        TT_TLD
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
        TT_OPENPAREN,
        TT_SYM
    ];
    S_URL.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);
    S_URL_SYMS.on(TT_OPENBRACE, S_URL_OPENBRACE).on(TT_OPENBRACKET, S_URL_OPENBRACKET).on(TT_OPENPAREN, S_URL_OPENPAREN);
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
    S_URL_SYMS.on(qsAccepting, S_URL);
    S_URL.on(qsNonAccepting, S_URL_SYMS);
    S_URL_SYMS.on(qsNonAccepting, S_URL_SYMS);
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
    './linkify/utils/options',
    './linkify/core/scanner',
    './linkify/core/parser'
], function (exports, _options, _scanner, _parser) {
    'use strict';
    try { Object.defineProperty(exports, '__esModule', { value: true }); } catch (e) { exports['__esModule'] = true; }
    exports.tokenize = exports.test = exports.scanner = exports.parser = exports.options = exports.find = undefined;
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
    exports.options = options;
    exports.parser = parser;
    exports.scanner = scanner;
    exports.test = test;
    exports.tokenize = tokenize;
});