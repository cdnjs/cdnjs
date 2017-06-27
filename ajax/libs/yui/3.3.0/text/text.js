YUI.add('text-accentfold', function(Y) {

/**
 * Text utilities.
 *
 * @module text
 * @since 3.3.0
 */

/**
 * Provides a basic accent folding implementation that converts common accented
 * letters (like "á") to their non-accented forms (like "a").
 *
 * @module text
 * @submodule text-accentfold
 */

/**
 * <p>
 * Provides a basic accent folding implementation that converts common accented
 * letters (like "á") to their non-accented forms (like "a").
 * </p>
 *
 * <p>
 * This implementation is not comprehensive, and should only be used as a last
 * resort when accent folding can't be done on the server. A comprehensive
 * accent folding implementation would require much more character data to be
 * sent to the browser, resulting in a significant performance penalty. This
 * implementation strives for a compromise between usefulness and performance.
 * </p>
 *
 * <p>
 * Accent folding is a destructive operation that can't be reversed, and may
 * change or destroy the actual meaning of the text depending on the language.
 * It should not be used on strings that will later be displayed to a user,
 * unless this is done with the understanding that linguistic meaning may be
 * lost and that you may in fact confuse or insult the user by doing so.
 * </p>
 *
 * <p>
 * When used for matching, accent folding is likely to produce erroneous matches
 * for languages in which characters with diacritics are considered different
 * from their base characters, or where correct folding would map to other
 * character sequences than just stripped characters. For example, in German
 * "ü" is a character that's clearly different from "u" and should match "ue"
 * instead. The word "betrügen" means "to defraud", while "betrugen" is the past
 * tense of "to behave". The name "Müller" is expected to match "Mueller", but
 * not "Muller". On the other hand, accent folding falls short for languages
 * where different base characters are expected to match. In Japanese, for
 * example, hiragana and katakana characters with the same pronunciation ("あ"
 * and "ア") are commonly treated as equivalent for lookups, but accent folding
 * treats them as different.
 * </p>
 *
 * @class Text.AccentFold
 * @static
 */

var YArray   = Y.Array,
    Text     = Y.Text,
    FoldData = Text.Data.AccentFold,

AccentFold = {
    // -- Public Static Methods ------------------------------------------------

    /**
     * Returns <code>true</code> if the specified string contains one or more
     * characters that can be folded, <code>false</code> otherwise.
     *
     * @method canFold
     * @param {String} string String to test.
     * @return {Boolean}
     * @static
     */
    canFold: function (string) {
        var letter;

        for (letter in FoldData) {
            if (FoldData.hasOwnProperty(letter) &&
                    string.search(FoldData[letter]) !== -1) {
                return true;
            }
        }

        return false;
    },

    /**
     * Compares the accent-folded versions of two strings and returns
     * <code>true</code> if they're the same, <code>false</code> otherwise. If
     * a custom comparison function is supplied, the accent-folded strings will
     * be passed to that function for comparison.
     *
     * @method compare
     * @param {String} a First string to compare.
     * @param {String} b Second string to compare.
     * @param {Function} func (optional) Custom comparison function. Should
     *   return a truthy or falsy value.
     * @return {Boolean} Results of the comparison.
     * @static
     */
    compare: function (a, b, func) {
        var aFolded = AccentFold.fold(a),
            bFolded = AccentFold.fold(b);

        return func ? !!func(aFolded, bFolded) : aFolded === bFolded;
    },

    /**
     * <p>
     * Returns a copy of <em>haystack</em> containing only the strings for which
     * the supplied function returns <code>true</code>.
     * </p>
     *
     * <p>
     * While comparisons will be made using accent-folded strings, the returned
     * array of matches will contain the original strings that were passed in.
     * </p>
     *
     * @method filter
     * @param {Array} haystack Array of strings to filter.
     * @param {Function} func Comparison function. Will receive an accent-folded
     *   haystack string as an argument, and should return a truthy or falsy
     *   value.
     * @return {Array} Filtered copy of <em>haystack</em>.
     * @static
     */
    filter: function (haystack, func) {
        return YArray.filter(haystack, function (item) {
            return func(AccentFold.fold(item));
        });
    },

    /**
     * Accent-folds the specified string or array of strings and returns a copy
     * in which common accented letters have been converted to their closest
     * non-accented, lowercase forms.
     *
     * @method fold
     * @param {String|Array} input String or array of strings to be folded.
     * @return {String|Array} Folded string or array of strings.
     * @static
     */
    fold: function (input) {
        if (Y.Lang.isArray(input)) {
            return YArray.map(input, AccentFold.fold);
        }

        input = input.toLowerCase();

        Y.Object.each(FoldData, function (regex, letter) {
            input = input.replace(regex, letter);
        });

        return input;
    }
};

Text.AccentFold = AccentFold;


}, '@VERSION@' ,{requires:['array-extras', 'text-data-accentfold']});
YUI.add('text-data-accentfold', function(Y) {

// The following tool was very helpful in creating these mappings:
// http://unicode.org/cldr/utility/list-unicodeset.jsp?a=[:toNFKD%3D/^a/:]&abb=on

Y.namespace('Text.Data').AccentFold = {
    0: /[⁰₀⓪０]/gi,
    1: /[¹₁①１]/gi,
    2: /[²₂②２]/gi,
    3: /[³₃③３]/gi,
    4: /[⁴₄④４]/gi,
    5: /[⁵₅⑤５]/gi,
    6: /[⁶₆⑥６]/gi,
    7: /[⁷₇⑦７]/gi,
    8: /[⁸₈⑧８]/gi,
    9: /[⁹₉⑨９]/gi,
    a: /[ªà-åāăąǎǟǡǻȁȃȧᵃḁẚạảấầẩẫậắằẳẵặⓐａ]/gi,
    b: /[ᵇḃḅḇⓑｂ]/gi,
    c: /[çćĉċčᶜḉⓒｃ]/gi,
    d: /[ďᵈḋḍḏḑḓⅾⓓｄ]/gi,
    e: /[è-ëēĕėęěȅȇȩᵉḕḗḙḛḝẹẻẽếềểễệₑℯⓔｅ]/gi,
    f: /[ᶠḟⓕｆ]/gi,
    g: /[ĝğġģǧǵᵍḡℊⓖｇ]/gi,
    h: /[ĥȟʰḣḥḧḩḫẖℎⓗｈ]/gi,
    i: /[ì-ïĩīĭįĳǐȉȋᵢḭḯỉịⁱℹⅰⓘｉ]/gi,
    j: /[ĵǰʲⓙⱼｊ]/gi,
    k: /[ķǩᵏḱḳḵⓚｋ]/gi,
    l: /[ĺļľŀǉˡḷḹḻḽℓⅼⓛｌ]/gi,
    m: /[ᵐḿṁṃⅿⓜｍ]/gi,
    n: /[ñńņňǹṅṇṉṋⁿⓝｎ]/gi,
    o: /[ºò-öōŏőơǒǫǭȍȏȫȭȯȱᵒṍṏṑṓọỏốồổỗộớờởỡợₒℴⓞｏ]/gi,
    p: /[ᵖṕṗⓟｐ]/gi,
    q: /[ʠⓠｑ]/gi,
    r: /[ŕŗřȑȓʳᵣṙṛṝṟⓡｒ]/gi,
    s: /[śŝşšſșˢṡṣṥṧṩẛⓢｓ]/gi,
    t: /[ţťțᵗṫṭṯṱẗⓣｔ]/gi,
    u: /[ù-üũūŭůűųưǔǖǘǚǜȕȗᵘᵤṳṵṷṹṻụủứừửữựⓤｕ]/gi,
    v: /[ᵛᵥṽṿⅴⓥｖ]/gi,
    w: /[ŵʷẁẃẅẇẉẘⓦｗ]/gi,
    x: /[ˣẋẍₓⅹⓧｘ]/gi,
    y: /[ýÿŷȳʸẏẙỳỵỷỹⓨｙ]/gi,
    z: /[źżžᶻẑẓẕⓩｚ]/gi
};


}, '@VERSION@' );
YUI.add('text-data-wordbreak', function(Y) {

Y.namespace('Text.Data').WordBreak = {
    // The UnicodeSet utility is helpful for enumerating the specific code
    // points covered by each of these regular expressions:
    // http://unicode.org/cldr/utility/list-unicodeset.jsp
    //
    // The code sets from which these regexes were derived can be generated
    // by the UnicodeSet utility using the links here:
    // http://unicode.org/cldr/utility/properties.jsp?a=Word_Break#Word_Break

    aletter     : '[A-Za-zªµºÀ-ÖØ-öø-ˁˆ-ˑˠ-ˤˬˮͰ-ʹͶͷͺ-ͽΆΈ-ΊΌΎ-ΡΣ-ϵϷ-ҁҊ-ԧԱ-Ֆՙա-ևא-תװ-׳ؠ-يٮٯٱ-ۓەۥۦۮۯۺ-ۼۿܐܒ-ܯݍ-ޥޱߊ-ߪߴߵߺࠀ-ࠕࠚࠤࠨࡀ-ࡘऄ-हऽॐक़-ॡॱ-ॷॹ-ॿঅ-ঌএঐও-নপ-রলশ-হঽৎড়ঢ়য়-ৡৰৱਅ-ਊਏਐਓ-ਨਪ-ਰਲਲ਼ਵਸ਼ਸਹਖ਼-ੜਫ਼ੲ-ੴઅ-ઍએ-ઑઓ-નપ-રલળવ-હઽૐૠૡଅ-ଌଏଐଓ-ନପ-ରଲଳଵ-ହଽଡ଼ଢ଼ୟ-ୡୱஃஅ-ஊஎ-ஐஒ-கஙசஜஞடணதந-பம-ஹௐఅ-ఌఎ-ఐఒ-నప-ళవ-హఽౘౙౠౡಅ-ಌಎ-ಐಒ-ನಪ-ಳವ-ಹಽೞೠೡೱೲഅ-ഌഎ-ഐഒ-ഺഽൎൠൡൺ-ൿඅ-ඖක-නඳ-රලව-ෆༀཀ-ཇཉ-ཬྈ-ྌႠ-Ⴥა-ჺჼᄀ-ቈቊ-ቍቐ-ቖቘቚ-ቝበ-ኈኊ-ኍነ-ኰኲ-ኵኸ-ኾዀዂ-ዅወ-ዖዘ-ጐጒ-ጕጘ-ፚᎀ-ᎏᎠ-Ᏼᐁ-ᙬᙯ-ᙿᚁ-ᚚᚠ-ᛪᛮ-ᛰᜀ-ᜌᜎ-ᜑᜠ-ᜱᝀ-ᝑᝠ-ᝬᝮ-ᝰᠠ-ᡷᢀ-ᢨᢪᢰ-ᣵᤀ-ᤜᨀ-ᨖᬅ-ᬳᭅ-ᭋᮃ-ᮠᮮᮯᯀ-ᯥᰀ-ᰣᱍ-ᱏᱚ-ᱽᳩ-ᳬᳮ-ᳱᴀ-ᶿḀ-ἕἘ-Ἕἠ-ὅὈ-Ὅὐ-ὗὙὛὝὟ-ώᾀ-ᾴᾶ-ᾼιῂ-ῄῆ-ῌῐ-ΐῖ-Ίῠ-Ῥῲ-ῴῶ-ῼⁱⁿₐ-ₜℂℇℊ-ℓℕℙ-ℝℤΩℨK-ℭℯ-ℹℼ-ℿⅅ-ⅉⅎⅠ-ↈⒶ-ⓩⰀ-Ⱞⰰ-ⱞⱠ-ⳤⳫ-ⳮⴀ-ⴥⴰ-ⵥⵯⶀ-ⶖⶠ-ⶦⶨ-ⶮⶰ-ⶶⶸ-ⶾⷀ-ⷆⷈ-ⷎⷐ-ⷖⷘ-ⷞⸯ々〻〼ㄅ-ㄭㄱ-ㆎㆠ-ㆺꀀ-ꒌꓐ-ꓽꔀ-ꘌꘐ-ꘟꘪꘫꙀ-ꙮꙿ-ꚗꚠ-ꛯꜗ-ꜟꜢ-ꞈꞋ-ꞎꞐꞑꞠ-ꞩꟺ-ꠁꠃ-ꠅꠇ-ꠊꠌ-ꠢꡀ-ꡳꢂ-ꢳꣲ-ꣷꣻꤊ-ꤥꤰ-ꥆꥠ-ꥼꦄ-ꦲꧏꨀ-ꨨꩀ-ꩂꩄ-ꩋꬁ-ꬆꬉ-ꬎꬑ-ꬖꬠ-ꬦꬨ-ꬮꯀ-ꯢ가-힣ힰ-ퟆퟋ-ퟻﬀ-ﬆﬓ-ﬗיִײַ-ﬨשׁ-זּטּ-לּמּנּסּףּפּצּ-ﮱﯓ-ﴽﵐ-ﶏﶒ-ﷇﷰ-ﷻﹰ-ﹴﹶ-ﻼＡ-Ｚａ-ｚﾠ-ﾾￂ-ￇￊ-ￏￒ-ￗￚ-ￜ]', 
    midnumlet   : "['\\.‘’․﹒＇．]",
    midletter   : '[:··״‧︓﹕：]',
    midnum      : '[,;;։،؍٬߸⁄︐︔﹐﹔，；]',
    numeric     : '[0-9٠-٩٫۰-۹߀-߉०-९০-৯੦-੯૦-૯୦-୯௦-௯౦-౯೦-೯൦-൯๐-๙໐-໙༠-༩၀-၉႐-႙០-៩᠐-᠙᥆-᥏᧐-᧙᪀-᪉᪐-᪙᭐-᭙᮰-᮹᱀-᱉᱐-᱙꘠-꘩꣐-꣙꤀-꤉꧐-꧙꩐-꩙꯰-꯹]',
    cr          : '\\r',
    lf          : '\\n',
    newline     : '[\u000B\u000C\u0085\u2028\u2029]',
    extend      : '[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0900-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C01-\u0C03\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C82\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D02\u0D03\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B6-\u17D3\u17DD\u180B-\u180D\u18A9\u1920-\u192B\u1930-\u193B\u19B0-\u19C0\u19C8\u19C9\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAA\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2\u1DC0-\u1DE6\u1DFC-\u1DFF\u200C\u200D\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA67C\uA67D\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C4\uA8E0-\uA8F1\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE26\uFF9E\uFF9F]',
    format      : '[\u00AD\u0600-\u0603\u06DD\u070F\u17B4\u17B5\u200E\u200F\u202A-\u202E\u2060-\u2064\u206A-\u206F\uFEFF\uFFF9-\uFFFB]',
    katakana    : '[〱-〵゛゜゠-ヺー-ヿㇰ-ㇿ㋐-㋾㌀-㍗ｦ-ﾝ]',
    extendnumlet: '[_‿⁀⁔︳︴﹍-﹏＿]',
    punctuation : '[!-#%-*,-\\/:;?@\\[-\\]_{}¡«·»¿;·՚-՟։֊־׀׃׆׳״؉؊،؍؛؞؟٪-٭۔܀-܍߷-߹࠰-࠾࡞।॥॰෴๏๚๛༄-༒༺-༽྅࿐-࿔࿙࿚၊-၏჻፡-፨᐀᙭᙮᚛᚜᛫-᛭᜵᜶។-៖៘-៚᠀-᠊᥄᥅᨞᨟᪠-᪦᪨-᪭᭚-᭠᯼-᯿᰻-᰿᱾᱿᳓‐-‧‰-⁃⁅-⁑⁓-⁞⁽⁾₍₎〈〉❨-❵⟅⟆⟦-⟯⦃-⦘⧘-⧛⧼⧽⳹-⳼⳾⳿⵰⸀-⸮⸰⸱、-〃〈-】〔-〟〰〽゠・꓾꓿꘍-꘏꙳꙾꛲-꛷꡴-꡷꣎꣏꣸-꣺꤮꤯꥟꧁-꧍꧞꧟꩜-꩟꫞꫟꯫﴾﴿︐-︙︰-﹒﹔-﹡﹣﹨﹪﹫！-＃％-＊，-／：；？＠［-］＿｛｝｟-･]'
};


}, '@VERSION@' );
YUI.add('text-wordbreak', function(Y) {

/**
 * Provides utility methods for splitting strings on word breaks and determining
 * whether a character index represents a word boundary.
 *
 * @module text
 * @submodule text-wordbreak
 */

/**
 * <p>
 * Provides utility methods for splitting strings on word breaks and determining
 * whether a character index represents a word boundary, using the generic word
 * breaking algorithm defined in the Unicode Text Segmentation guidelines
 * (<a href="http://unicode.org/reports/tr29/#Word_Boundaries">Unicode Standard
 * Annex #29</a>).
 * </p>
 *
 * <p>
 * This algorithm provides a reasonable default for many languages. However, it
 * does not cover language or context specific requirements, and it does not
 * provide meaningful results at all for languages that don't use spaces between
 * words, such as Chinese, Japanese, Thai, Lao, Khmer, and others. Server-based
 * word breaking services usually provide significantly better results with
 * better performance.
 * </p>
 *
 * @class Text.WordBreak
 * @static
 */

var Text   = Y.Text,
    WBData = Text.Data.WordBreak,

// Constants representing code point classifications.
ALETTER      = 0,
MIDNUMLET    = 1,
MIDLETTER    = 2,
MIDNUM       = 3,
NUMERIC      = 4,
CR           = 5,
LF           = 6,
NEWLINE      = 7,
EXTEND       = 8,
FORMAT       = 9,
KATAKANA     = 10,
EXTENDNUMLET = 11,
OTHER        = 12,

// RegExp objects generated from code point data. Each regex matches a single
// character against a set of Unicode code points. The index of each item in
// this array must match its corresponding code point constant value defined
// above.
SETS = [
    new RegExp(WBData.aletter),
    new RegExp(WBData.midnumlet),
    new RegExp(WBData.midletter),
    new RegExp(WBData.midnum),
    new RegExp(WBData.numeric),
    new RegExp(WBData.cr),
    new RegExp(WBData.lf),
    new RegExp(WBData.newline),
    new RegExp(WBData.extend),
    new RegExp(WBData.format),
    new RegExp(WBData.katakana),
    new RegExp(WBData.extendnumlet)
],

EMPTY_STRING = '',
PUNCTUATION  = new RegExp('^' + WBData.punctuation + '$'),
WHITESPACE   = /\s/,

WordBreak = {
    // -- Public Static Methods ------------------------------------------------

    /**
     * Splits the specified string into an array of individual words.
     *
     * @method getWords
     * @param {String} string String to split.
     * @param {Object} options (optional) Options object containing zero or more
     *   of the following properties:
     *
     * <dl>
     *   <dt>ignoreCase (Boolean)</dt>
     *   <dd>
     *     If <code>true</code>, the string will be converted to lowercase
     *     before being split. Default is <code>false</code>.
     *   </dd>
     *
     *   <dt>includePunctuation (Boolean)</dt>
     *   <dd>
     *     If <code>true</code>, the returned array will include punctuation
     *     characters. Default is <code>false</code>.
     *   </dd>
     *
     *   <dt>includeWhitespace (Boolean)</dt>
     *   <dd>
     *     If <code>true</code>, the returned array will include whitespace
     *     characters. Default is <code>false</code>.
     *   </dd>
     * </dl>
     * @return {Array} Array of words.
     * @static
     */
    getWords: function (string, options) {
        var i     = 0,
            map   = WordBreak._classify(string),
            len   = map.length,
            word  = [],
            words = [],
            chr,
            includePunctuation,
            includeWhitespace;

        if (!options) {
            options = {};
        }

        if (options.ignoreCase) {
            string = string.toLowerCase();
        }

        includePunctuation = options.includePunctuation;
        includeWhitespace  = options.includeWhitespace;

        // Loop through each character in the classification map and determine
        // whether it precedes a word boundary, building an array of distinct
        // words as we go.
        for (; i < len; ++i) {
            chr = string.charAt(i);

            // Append this character to the current word.
            word.push(chr);

            // If there's a word boundary between the current character and the
            // next character, append the current word to the words array and
            // start building a new word. 
            if (WordBreak._isWordBoundary(map, i)) {
                word = word.join(EMPTY_STRING);

                if (word &&
                        (includeWhitespace  || !WHITESPACE.test(word)) &&
                        (includePunctuation || !PUNCTUATION.test(word))) {
                    words.push(word);
                }

                word = [];
            }
        }

        return words;
    },

    /**
     * Returns an array containing only unique words from the specified string.
     * For example, the string <code>'foo bar baz foo'</code> would result in
     * the array <code>['foo', 'bar', 'baz']</code>.
     *
     * @method getUniqueWords
     * @param {String} string String to split.
     * @param {Object} options (optional) Options (see <code>getWords()</code>
     *   for details).
     * @return {Array} Array of unique words.
     * @static
     */
    getUniqueWords: function (string, options) {
        return Y.Array.unique(WordBreak.getWords(string, options));
    },

    /**
     * <p>
     * Returns <code>true</code> if there is a word boundary between the
     * specified character index and the next character index (or the end of the
     * string).
     * </p>
     *
     * <p>
     * Note that there are always word breaks at the beginning and end of a
     * string, so <code>isWordBoundary('', 0)</code> and
     * <code>isWordBoundary('a', 0)</code> will both return <code>true</code>.
     * </p>
     *
     * @method isWordBoundary
     * @param {String} string String to test.
     * @param {Number} index Character index to test within the string.
     * @return {Boolean} <code>true</code> for a word boundary,
     *   <code>false</code> otherwise.
     * @static
     */
    isWordBoundary: function (string, index) {
        return WordBreak._isWordBoundary(WordBreak._classify(string), index);
    },

    // -- Protected Static Methods ---------------------------------------------

    /**
     * Returns a character classification map for the specified string.
     *
     * @method _classify
     * @param {String} string String to classify.
     * @return {Array} Classification map.
     * @protected
     * @static
     */
    _classify: function (string) {
        var chr,
            map          = [],
            i            = 0,
            j,
            set,
            stringLength = string.length,
            setsLength   = SETS.length,
            type;

        for (; i < stringLength; ++i) {
            chr  = string.charAt(i);
            type = OTHER;

            for (j = 0; j < setsLength; ++j) {
                set = SETS[j];

                if (set && set.test(chr)) {
                    type = j;
                    break;
                }
            }

            map.push(type);
        }

        return map;
    },

    /**
     * <p>
     * Returns <code>true</code> if there is a word boundary between the
     * specified character index and the next character index (or the end of the
     * string).
     * </p>
     *
     * <p>
     * Note that there are always word breaks at the beginning and end of a
     * string, so <code>_isWordBoundary('', 0)</code> and
     * <code>_isWordBoundary('a', 0)</code> will both return <code>true</code>.
     * </p>
     *
     * @method _isWordBoundary
     * @param {Array} map Character classification map generated by
     *   <code>_classify</code>.
     * @param {Number} index Character index to test.
     * @return {Boolean}
     * @protected
     * @static
     */
    _isWordBoundary: function (map, index) {
        var prevType,
            type     = map[index],
            nextType = map[index + 1],
            nextNextType;

        if (index < 0 || (index > map.length - 1 && index !== 0)) {
            return false;
        }

        // WB5. Don't break between most letters.
        if (type === ALETTER && nextType === ALETTER) {
            return false;
        }

        nextNextType = map[index + 2];

        // WB6. Don't break letters across certain punctuation.
        if (type === ALETTER &&
                (nextType === MIDLETTER || nextType === MIDNUMLET) &&
                nextNextType === ALETTER) {
            return false;
        }

        prevType = map[index - 1];

        // WB7. Don't break letters across certain punctuation.
        if ((type === MIDLETTER || type === MIDNUMLET) &&
                nextType === ALETTER &&
                prevType === ALETTER) {
            return false;
        }

        // WB8/WB9/WB10. Don't break inside sequences of digits or digits
        // adjacent to letters.
        if ((type === NUMERIC || type === ALETTER) &&
                (nextType === NUMERIC || nextType === ALETTER)) {
            return false;
        }

        // WB11. Don't break inside numeric sequences like "3.2" or
        // "3,456.789".
        if ((type === MIDNUM || type === MIDNUMLET) &&
                nextType === NUMERIC &&
                prevType === NUMERIC) {
            return false;
        }

        // WB12. Don't break inside numeric sequences like "3.2" or
        // "3,456.789".
        if (type === NUMERIC &&
                (nextType === MIDNUM || nextType === MIDNUMLET) &&
                nextNextType === NUMERIC) {
            return false;
        }

        // WB4. Ignore format and extend characters.
        if (type === EXTEND || type === FORMAT ||
                prevType === EXTEND || prevType === FORMAT ||
                nextType === EXTEND || nextType === FORMAT) {
            return false;
        }

        // WB3. Don't break inside CRLF.
        if (type === CR && nextType === LF) {
            return false;
        }

        // WB3a. Break before newlines (including CR and LF).
        if (type === NEWLINE || type === CR || type === LF) {
            return true;
        }

        // WB3b. Break after newlines (including CR and LF).
        if (nextType === NEWLINE || nextType === CR || nextType === LF) {
            return true;
        }

        // WB13. Don't break between Katakana characters.
        if (type === KATAKANA && nextType === KATAKANA) {
            return false;
        }

        // WB13a. Don't break from extenders.
        if (nextType === EXTENDNUMLET &&
                (type === ALETTER || type === NUMERIC || type === KATAKANA ||
                type === EXTENDNUMLET)) {
            return false;
        }

        // WB13b. Don't break from extenders.
        if (type === EXTENDNUMLET &&
                (nextType === ALETTER || nextType === NUMERIC ||
                nextType === KATAKANA)) {
            return false;
        }

        // Break after any character not covered by the rules above.
        return true;
    }
};

Text.WordBreak = WordBreak;


}, '@VERSION@' ,{requires:['array-extras', 'text-data-wordbreak']});


YUI.add('text', function(Y){}, '@VERSION@' ,{use:['text-accentfold', 'text-wordbreak']});

