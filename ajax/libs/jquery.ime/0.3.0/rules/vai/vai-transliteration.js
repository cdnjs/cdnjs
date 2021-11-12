( function ( $ ) {
	'use strict';

	var vaiTransliteration = {
		id: 'vai-transliteration',
		name: 'Vai Transliteration',
		description: 'Vai Transliteration, based on the SIL Keyman layout found at https://github.com/keymanapp/keyboards/tree/master/release/sil/sil_vai/source, with extensions',
		date: '2019-05-08',
		URL: 'https://github.com/wikimedia/jquery.ime',
		author: 'Amir E. Aharoni',
		license: 'GPLv3',
		version: '1.0',
		contextLength: 3,
		maxKeyLength: 4,
		patterns: [
			// N.B.: Each series doesn't go exactly according to the sequential
			// Unicode order because this way 'he' would override 'bhe', etc.

			// Punctuation, additional letters, and logograms
			[ '[XN]', '\uA60B' ], // X, N ꘋ - syllable-final ng
			[ '\uA60C=', '=' ], // An equals sign
			[ '=', '\uA60C' ], // Syllable lengthener ꘌ
			[ '\uA60D,', ',' ], // Latin comma
			[ ',', '\uA60D' ], // Vai comma
			[ '\uA60E\\.', '.' ], // Latin full stop
			[ '\\.', '\uA60E' ], // Vai full stop
			[ '\uA60E\uA60E!', '!' ], // Latin exclamation mark
			[ '!', '\uA60E\uA60E' ], // Exclamation mark (double Vai full stop)
			[ '\uA60F\\?', '?' ], // Latin question mark
			[ '\\?', '\uA60F' ], // Vai question mark
			[ 'F\uA5E1\uA60BG', 'FEN', '\uA613' ], // Feeng logogram ꘓ
			[ 'FAH?A', '\uA618' ], // Faa logogram ꘘ

			// Syllables in -ee (e)
			[ 'we', '\uA503' ], // we ꔃ
			[ '\uA503~', '\uA504' ], // we~ ꔄ
			[ 'bhe', '\uA506' ], // bhe ꔆ
			[ 'mbe', '\uA508' ], // mbe ꔈ
			[ 'kpe', '\uA509' ], // kpe ꔉ
			[ 'mgbe', '\uA50A' ], // mgbe ꔊ
			[ 'gbe', '\uA50B' ], // gbe ꔋ
			[ 'fe', '\uA50C' ], // fe ꔌ
			[ 've', '\uA50D' ], // ve ꔍ
			[ 'te', '\uA50E' ], // te ꔎ
			[ 'the', '\uA50F' ], // the ꔏ
			[ 'dhe', '\uA511' ], // dhe ꔑ
			[ 're', '\uA513' ], // re ꔓ
			[ 'n[dD]e', '\uA515' ], // nde, nDe ꔕ
			[ '(dl|D)e', '\uA514' ], // dle, De ꔔ
			[ 'se', '\uA516' ], // se ꔖ
			[ 'she', '\uA517' ], // she ꔗ
			[ 'ze', '\uA518' ], // ze ꔘ
			[ 'zhe', '\uA519' ], // zhe ꔙ
			[ 'ce', '\uA51A' ], // ce ꔚ
			[ 'nje', '\uA51C' ], // nje ꔜ
			[ 'ke', '\uA51E' ], // ke ꔞ
			[ 'nge', '\uA51F' ], // nge ꔟ
			[ 'me', '\uA521' ], // me ꔡ
			[ 'ne', '\uA522' ], // ne ꔢ
			[ 'nye', '\uA523' ], // nye ꔣ
			[ 'he', '\uA502' ], // he ꔂ
			[ 'pe', '\uA505' ], // pe ꔅ
			[ 'be', '\uA507' ], // be ꔇ
			[ 'de', '\uA510' ], // de ꔐ
			[ 'le', '\uA512' ], // le ꔒ
			[ 'je', '\uA51B' ], // je ꔛ
			[ 'ye', '\uA51D' ], // ye ꔝ
			[ 'ge', '\uA520' ], // ge ꔠ

			// Syllables in -i
			[ 'wi', '\uA528' ], // wi ꔨ
			[ '\uA528~', '\uA529' ], // wi~ ꔩ
			[ 'bhi', '\uA52B' ], // bhi ꔫ
			[ '\uA526~', '\uA527' ], // hi~ ꔩ
			[ 'mbi', '\uA52D' ], // mbi ꔭ
			[ 'kpi', '\uA52E' ], // kpi ꔮ
			[ 'mgbi', '\uA52F' ], // mgbi ꔯ
			[ 'gbi', '\uA530' ], // gbi ꔰ
			[ 'fi', '\uA531' ], // fi ꔱ
			[ 'vi', '\uA532' ], // vi ꔲ
			[ 'ti', '\uA533' ], // ti ꔳ
			[ 'thi', '\uA534' ], // thi ꔳ
			[ 'dhi', '\uA536' ], // dhi ꔶ
			[ 'ri', '\uA538' ], // ri ꔸ
			[ 'n[dD]i', '\uA53A' ], // ndi, nDi ꔺ
			[ '(dl|D)i', '\uA539' ], // dli, Di ꔹ
			[ 'si', '\uA53B' ], // si ꔻ
			[ 'shi', '\uA53C' ], // shi ꔼ
			[ 'zi', '\uA53D' ], // zi ꔽ
			[ 'zhi', '\uA53E' ], // zhi ꔾ
			[ 'ci', '\uA53F' ], // ci ꔿ
			[ 'nji', '\uA541' ], // nji ꕁ
			[ 'ki', '\uA543' ], // ki ꕃ
			[ 'ngi', '\uA544' ], // ngi ꕄ
			[ 'mi', '\uA546' ], // mi ꕆ
			[ 'ni', '\uA547' ], // ni ꕇ
			[ 'nyi', '\uA548' ], // nyi ꕈ
			[ 'hi', '\uA526' ], // hi ꔦ
			[ 'pi', '\uA52A' ], // pi ꔪ
			[ 'bi', '\uA52C' ], // bi ꔬ
			[ 'di', '\uA535' ], // di ꔵ
			[ 'li', '\uA537' ], // li ꔷ
			[ 'ji', '\uA540' ], // ji ꕀ
			[ 'yi', '\uA542' ], // yi ꕂ
			[ 'gi', '\uA545' ], // gi ꕅ

			// Syllables in -a
			[ '\uA56C~', '\uA54B' ], // nga~ ꕋ
			[ 'wa', '\uA54E' ], // wi ꕎ
			[ '\uA54E~', '\uA54F' ], // wa~ ꕏ
			[ 'bha', '\uA551' ], // bha ꕑ
			[ '\uA54C~', '\uA54D' ], // ha~ ꕍ
			[ 'mba', '\uA553' ], // mba ꕓ
			[ 'kpa', '\uA554' ], // kpa ꕔ
			[ '\uA554~', '\uA555' ], // kpa ꕕ
			[ 'mgba', '\uA556' ], // mgba ꕖ
			[ 'gba', '\uA557' ], // gba ꕗ
			[ 'fa', '\uA558' ], // fa ꕘ
			[ 'va', '\uA559' ], // va ꕙ
			[ 'ta', '\uA55A' ], // ta ꕚ
			[ 'tha', '\uA55B' ], // tha ꕛ
			[ 'dha', '\uA55D' ], // dha ꕝ
			[ 'ra', '\uA55F' ], // ra ꕟ
			[ 'n[dD]a', '\uA561' ], // nda, nDa ꕡ
			[ '(dl|D)a', '\uA560' ], // dla, Da ꕠ
			[ 'sa', '\uA562' ], // sa ꕢ
			[ 'sha', '\uA563' ], // sha ꕣ
			[ 'za', '\uA564' ], // za ꕤ
			[ 'zha', '\uA565' ], // zha ꕥ
			[ 'ca', '\uA566' ], // ca ꕦ
			[ 'nja', '\uA568' ], // nja ꕨ
			[ 'ka', '\uA56A' ], // ka ꕪ
			[ '\uA56A~', '\uA56B' ], // ka~ ꕫ
			[ 'nga', '\uA56C' ], // nga ꕬ
			[ 'ma', '\uA56E' ], // ma ꕮ
			[ 'na', '\uA56F' ], // na ꕯ
			[ 'nya', '\uA570' ], // nya ꕰ
			[ 'ha', '\uA54C' ], // ha ꕌ
			[ 'pa', '\uA550' ], // pa ꕐ
			[ 'ba', '\uA552' ], // ba ꕒ
			[ 'da', '\uA55C' ], // da ꕜ
			[ 'la', '\uA55E' ], // la ꕞ
			[ 'ja', '\uA567' ], // ja ꕧ
			[ 'ya', '\uA569' ], // ya ꕩ
			[ 'ga', '\uA56D' ], // ga ꕭ

			// Syllables in -oo (o)
			[ 'wo', '\uA574' ], // wo ꕴ
			[ '\uA574~', '\uA575' ], // wo~ ꕵ
			[ 'bho', '\uA577' ], // bho ꕷ
			[ 'mbo', '\uA579' ], // mbo ꕹ
			[ 'kpo', '\uA57A' ], // kpo ꕺ
			[ 'mgbo', '\uA57B' ], // mgbo ꕻ
			[ 'gbo', '\uA57C' ], // gbo ꕼ
			[ 'fo', '\uA57D' ], // fo ꕽ
			[ 'vo', '\uA57E' ], // vo ꕾ
			[ 'to', '\uA57F' ], // to ꕿ
			[ 'tho', '\uA580' ], // tho ꖀ
			[ 'dho', '\uA582' ], // dho ꖂ
			[ 'ro', '\uA584' ], // ro ꖄ
			[ 'n[dD]o', '\uA586' ], // ndo, nDo ꖆ
			[ '(dl|D)o', '\uA585' ], // dlo, Do ꖅ
			[ 'so', '\uA587' ], // so ꖇ
			[ 'sho', '\uA588' ], // sho ꖈ
			[ 'zo', '\uA589' ], // zo ꖉ
			[ 'zho', '\uA58A' ], // zho ꖊ
			[ 'co', '\uA58B' ], // co ꖋ
			[ 'njo', '\uA58D' ], // njo ꖍ
			[ 'ko', '\uA58F' ], // ko ꖏ
			[ 'ngo', '\uA590' ], // ngo ꖐ
			[ 'mo', '\uA592' ], // mo ꖒ
			[ 'no', '\uA593' ], // no ꖓ
			[ 'nyo', '\uA594' ], // nyo ꖔ
			[ 'ho', '\uA573' ], // ho ꕳ
			[ 'po', '\uA576' ], // po ꕶ
			[ 'bo', '\uA578' ], // bo ꕸ
			[ 'do', '\uA581' ], // do ꖁ
			[ 'lo', '\uA583' ], // lo ꖃ
			[ 'jo', '\uA58C' ], // jo ꖌ
			[ 'yo', '\uA58E' ], // yo ꖎ
			[ 'go', '\uA591' ], // go ꖑ

			// Syllables in -u
			[ 'wu', '\uA599' ], // wu ꖕ
			[ '\uA599~', '\uA59A' ], // wu~ ꖖ
			[ 'bhu', '\uA59C' ], // bhu ꖜ
			[ '\uA597~', '\uA598' ], // hu~ ꖘ
			[ 'mbu', '\uA59E' ], // mbu ꖞ
			[ 'kpu', '\uA59F' ], // kpu ꖟ
			[ 'mgbu', '\uA5A0' ], // mgbu ꖠ
			[ 'gbu', '\uA5A1' ], // gbu ꖡ
			[ 'fu', '\uA5A2' ], // fu ꖢ
			[ 'vu', '\uA5A3' ], // vu ꖣ
			[ 'tu', '\uA5A4' ], // tu ꖤ
			[ 'thu', '\uA5A5' ], // thu ꖥ
			[ 'dhu', '\uA5A7' ], // dhu ꖧ
			[ 'ru', '\uA5A9' ], // ru ꖩ
			[ 'n[dD]u', '\uA5AB' ], // ndu, nDu ꖫ
			[ '(dl|D)u', '\uA5AA' ], // dlu, Du ꖪ
			[ 'su', '\uA5AC' ], // su ꖬ
			[ 'shu', '\uA5AD' ], // shu ꖭ
			[ 'zu', '\uA5AE' ], // zu ꖮ
			[ 'zhu', '\uA5AF' ], // zhu ꖯ
			[ 'cu', '\uA5B0' ], // cu ꖰ
			[ 'nju', '\uA5B2' ], // nju ꖲ
			[ 'ku', '\uA5B4' ], // ku ꖴ
			[ 'ngu', '\uA5B5' ], // ngu ꖵ
			[ 'mu', '\uA5B7' ], // mu ꖷ
			[ 'nu', '\uA5B8' ], // nu ꖸ
			[ 'nyu', '\uA5B9' ], // nyu ꖹ
			[ 'hu', '\uA597' ], // hu ꖗ
			[ 'pu', '\uA59B' ], // pu ꖛ
			[ 'bu', '\uA59D' ], // bu ꖝ
			[ 'du', '\uA5A6' ], // du ꖦ
			[ 'lu', '\uA5A8' ], // lu ꖨ
			[ 'ju', '\uA5B1' ], // ju ꖱ
			[ 'yu', '\uA5B3' ], // yu ꖳ
			[ 'gu', '\uA5B6' ], // gu ꖶ

			// Syllables in -o (ɔ)
			[ '\uA5DC~', '\uA5BC' ], // ngx~, ngO~ ꖼ
			[ 'w[xO]', '\uA5BF' ], // wx, wO ꖿ
			[ '\uA5BF~', '\uA5C0' ], // wx~, wO~ ꗀ
			[ 'bh[xO]', '\uA5C2' ], // bhx, bhO ꗂ
			[ '\uA5BD~', '\uA5BE' ], // hx~, hO~ ꖾ
			[ 'mb[xO]', '\uA5C4' ], // mbx, mbO ꗄ
			[ 'kp[xO]', '\uA5C5' ], // kpx, kpO ꗅ
			[ 'mgb[xO]', '\uA5C6' ], // mgbx, mgbO ꗆ
			[ 'gb[xO]', '\uA5C7' ], // gbx, gbO ꗇ
			[ '\uA5C7~', '\uA5C8' ], // gbx~, gbO~ ꗈ
			[ 'f[xO]', '\uA5C9' ], // fx, fO ꗉ
			[ 'v[xO]', '\uA5CA' ], // vx, vO ꗊ
			[ 't[xO]', '\uA5CB' ], // tx, tO ꗋ
			[ 'th[xO]', '\uA5CC' ], // thx, thO ꗌ
			[ 'dh[xO]', '\uA5CE' ], // dhx, dhO ꗎ
			[ 'r[xO]', '\uA5D0' ], // rx, rO ꗐ
			[ 'n[dD][xO]', '\uA5D2' ], // ndx, nDx, ndO nDO ꗒ
			[ '(dl|D)[xO]', '\uA5D1' ], // dlx, Dx, dlO, DO ꗑ
			[ 's[xO]', '\uA5D3' ], // sx, sO ꗓ
			[ 'sh[xO]', '\uA5D4' ], // shx, shO ꗔ
			[ 'z[xO]', '\uA5D5' ], // zx, zO ꗕ
			[ 'zh[xO]', '\uA5D6' ], // zhx, zhO ꗖ
			[ 'c[xO]', '\uA5D7' ], // cx, cO ꗗ
			[ 'nj[xO]', '\uA5D9' ], // njx, njO ꗙ
			[ 'k[xO]', '\uA5DB' ], // kx, kO ꗛ
			[ 'ng[xO]', '\uA5DC' ], // ngx, ngO ꖼ
			[ 'm[xO]', '\uA5DE' ], // mx, mO ꗞ
			[ 'n[xO]', '\uA5DF' ], // nx, nO ꗟ
			[ 'ny[xO]', '\uA5E0' ], // nyx, nyO ꗠ
			[ 'h[xO]', '\uA5BD' ], // hx, hO ꖽ
			[ 'p[xO]', '\uA5C1' ], // px, pO ꗁ
			[ 'b[xO]', '\uA5C3' ], // bx, bO ꗃ
			[ 'd[xO]', '\uA5CD' ], // dx, dO ꗍ
			[ 'l[xO]', '\uA5CF' ], // lx, lO ꗏ
			[ 'j[xO]', '\uA5D8' ], // jx, jO ꗘ
			[ 'y[xO]', '\uA5DA' ], // yx, yO ꗚ
			[ 'g[xO]', '\uA5DD' ], // gx, gO ꗝ

			// Syllables in -e (ɛ)
			[ '\uA604~', 'ng[qE]', '\uA5E3' ], // ngq~, ngE~ ꗣ
			[ 'w[qE]', '\uA5E6' ], // wq, wE ꗦ
			[ '\uA5E6~', '\uA5E7' ], // wq~, wE~ ꗧ
			[ 'bh[qE]', '\uA5E9' ], // bhq, bhE ꗩ
			[ '\uA5E4~', '\uA5E5' ], // hq~, hE~ ꗥ
			[ 'mb[qE]', '\uA5EB' ], // mbq, mbE ꗫ
			[ 'kp[qE]', '\uA5EC' ], // kpq, kpE ꗬ
			[ '\uA5EC~', '\uA5ED' ], // kpq~, kpE~ ꗭ
			[ 'mgb[qE]', '\uA5EE' ], // mgbq, mgbE ꗮ
			[ 'gb[qE]', '\uA5EF' ], // gbq, gbE ꗯ
			[ '\uA5EF~', '\uA5F0' ], // gbq~, gbE~ ꗰ
			[ 'f[qE]', '\uA5F1' ], // fq, fE ꗱ
			[ 'v[qE]', '\uA5F2' ], // vq, vE ꗲ
			[ 't[qE]', '\uA5F3' ], // tq, tE ꗳ
			[ 'th[qE]', '\uA5F4' ], // thq, thE ꗴ
			[ 'dh[qE]', '\uA5F6' ], // dhq, dhE ꗶ
			[ 'r[qE]', '\uA5F8' ], // rq, rE ꗸ
			[ 'n[dD][qE]', '\uA5FA' ], // ndq, nDq, ndE, nDE ꗺ
			[ '(dl|D)[qE]', '\uA5F9' ], // dlq, Dq, dlE, DE ꗹ
			[ 's[qE]', '\uA5FB' ], // sq, sE ꗻ
			[ 'sh[qE]', '\uA5FC' ], // shq, shE ꗼ
			[ 'z[qE]', '\uA5FD' ], // zq, zE ꗽ
			[ 'zh[qE]', '\uA5FE' ], // zhq, zhE ꗾ
			[ 'c[qE]', '\uA5FF' ], // cq, cE ꗿ
			[ 'nj[qE]', '\uA601' ], // njq, njE ꘁ
			[ 'k[qE]', '\uA603' ], // kq, kE ꘃ
			[ 'ngg?[qE]', '\uA604' ], // ngq, ngE ꘄ
			[ '\uA604~', 'gg[qE]', '\uA605' ], // nggq~, nggE~ ꘅ
			[ '\uA606~', '\uA607' ], // gq~, gE~ ꘇ
			[ 'm[qE]', '\uA608' ], // mq, mE ꘈ
			[ 'n[qE]', '\uA609' ], // nq, nE ꘉ
			[ 'ny[qE]', '\uA60A' ], // nyq, nyE ꘊ
			[ 'h[qE]', '\uA5E4' ], // hq, hE ꗥ
			[ 'p[qE]', '\uA5E8' ], // pq, pE ꗨ
			[ 'b[qE]', '\uA5EA' ], // bq, bE ꗪ
			[ 'd[qE]', '\uA5F5' ], // dq, dE ꗵ
			[ 'l[qE]', '\uA5F7' ], // lq, lE ꗷ
			[ 'j[qE]', '\uA600' ], // jq, jE ꘀ
			[ 'y[qE]', '\uA602' ], // yq, yE ꘂ
			[ 'g[qE]', '\uA606' ], // gq, gE ꘆ

			// Vowels
			[ 'e', '\uA500' ], // e ꔀ (Unicode -ee)
			[ 'i', '\uA524' ], // i ꔤ
			[ 'a', '\uA549' ], // a ꕉ
			[ 'o', '\uA571' ], // o ꕱ (Unicode -oo)
			[ 'u', '\uA595' ], // u ꖕ
			[ '[xO]', '\uA5BA' ], // x, O ꖺ (ɔ, Unicode -o)
			[ '[qE]', '\uA5E1' ], // q, E ꗡ (ɛ, Unicode -e)

			// Nasal vowels
			[ '\uA500~', '\uA501' ], // e~ ꔁ
			[ '\uA524~', '\uA525' ], // i~ ꔥ
			[ '\uA549~', '\uA54A' ], // a~ ꕊ
			[ '\uA571~', '\uA572' ], // o~ ꕲ
			[ '\uA595~', '\uA596' ], // u~ ꖖ
			[ '\uA5BA~', '\uA5BB' ], // x~, O~ ꖻ
			[ '\uA5E1~', '\uA5E2' ] // q~, E~ ꗢ
		]
	};

	$.ime.register( vaiTransliteration );
}( jQuery ) );
