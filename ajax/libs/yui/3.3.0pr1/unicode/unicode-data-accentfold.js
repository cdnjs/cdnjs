YUI.add('unicode-data-accentfold', function(Y) {

/**
 * <p>
 * An imperfect, incomplete reverse mapping of ASCII characters to
 * case-insensitive regexes that match their most common accented forms.
 * </p>
 *
 * <p>
 * The goal of this module is to provide a pragmatic and generally useful set of
 * accent folding data, since serving and performing lookups on a complete
 * dataset would be impractical in client-side JavaScript.
 * </p>
 *
 * <p>
 * Whenever possible, accent folding should be done on the server, where it's
 * possible to use tools that are both more complete and more performant. It
 * should only be done on the client as an absolute last resort.
 * </p>
 *
 * @module unicode
 * @submodule unicode-data-accentfold
 * @class Unicode.Data.AccentFold
 * @static
 */

// The following tool was very helpful in creating these mappings:
// http://unicode.org/cldr/utility/list-unicodeset.jsp?a=[:toNFKD%3D/^a/:]&abb=on

Y.namespace('Unicode.Data').AccentFold = {
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
