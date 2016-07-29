require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

var braceParser = function (input, group, reps, sep, dic) {
    dic = dic || require("./en_US");
    var tempRes = "", matchIndex = 1;
    var result = input, matches = [], token, replacement = [], regex;
    matchIndex = 0;
    group = group.replace("}", "");
    group = group.replace("{", "");
    var repetitions=reps.pop();
    var separator=sep.pop();
    var newGroup = '';


    // Check for shorthand codes
    //[rep:10][sep:\N]{\C}
    regex = /\\\w+/g;
    i = 0;
    var replaceGroup='';
    while (matches = regex.exec(group)) {
        var groupCopy = group;
        while (i < repetitions) {
            if(matches[0]==="\\C"){  replaceGroup+=require("./randomString")(1); }
            i++;
        }

        groupCopy=groupCopy.replace("\\C", replaceGroup );
        if("undefined" != typeof separator){
            if (separator.toLowerCase() === "n") groupCopy += separator.replace("n", "\n");
            else if (separator.toLowerCase()  === "s") groupCopy += separator.replace("s", " ");
            else groupCopy += separator;
        }
        return groupCopy;

    }

    // Check for token patterns
    regex = /<(.*?)>/g;
    i = 0;
    while (i < repetitions) {
        while (matches = regex.exec(group)) {
            groupCopy = group;
            re = new RegExp("\\w+", "g");
            token = matches[1].match(re);
            if (dic().tokens.indexOf(token[0]) != -1) {
                if("undefined" != typeof separator){
                    if (separator === "n") groupCopy += separator.replace("n", "\n");
                    else if (separator === "s") groupCopy += separator.replace("s", " ");
                    else groupCopy += separator;
                }
            }
        }
        newGroup += "undefined" == typeof groupCopy ? "" : groupCopy;

        i++;
    }
    //console.log(group);
    return "undefined" != typeof newGroup ? newGroup : group;
};

module.exports = braceParser;

},{"./en_US":3,"./randomString":6}],2:[function(require,module,exports){

var capitalize = function (s,_case) {
    if(_case==="upper")
        return s.toUpperCase();
    else if(_case==="lower")
        return s.toLowerCase();
    else if(_case==="word")
        return s.toWordCase();
    else if(_case==="title")
        return s.toTitleCase();
    else if(_case==="sentence")
        return s.toSentenceCase();
    else if(_case==="none")
        return s;
    else
        return s[0].toUpperCase() + s.slice(1); //default && first
};

module.exports = capitalize;

},{}],3:[function(require,module,exports){
var en_US = function () { 
var dic={};

dic.tokens=["preposition","firstname","abstract", "activity", "adj", "adv", "color", "conj", "country", "emo", "em", "x", "face", "firstname", "greet", "surname", "nonsense", "noun", "sound", "title", "place", "prefix", "prepos", "pron", "quality", "rel", "sconj", "substance", "timeadv", "timenoun", "unit", "verbimg", "say", "verb", "vocal", "preposition", "yn"];
dic.amount = amount={};
var amount_all  = ["a few", "a bunch of", "some", "many more"];
dic.amount.all = amount_all;
dic.tokens.push("amount");

dic.faced = faced={};
var faced_all  = ["smiled", "frowned", "grimaced", "grinned evilly", "grinned cheekily", "sneered", "puckered", "smirked", "snarled", "snickered", "pouted"];
dic.faced.all = faced_all;
dic.tokens.push("faced");

dic.pron_female = pron_female={};
var pron_female_all  =  ["her/she/herself/her/hers"];
dic.pron_female.all = pron_female_all;
dic.tokens.push("pron_female");

dic.alien = {};
var alien_race  = ["Badoon/Badoons","Brood/The Broods","Celestials/The Celestials","Kree/The Kree"];
dic.alien.all = alien_race;
dic.alien.races = alien_race;
dic.alien.subs=["plural"];
dic.tokens.push("alien");var abstract={};
dic.abstract=abstract;
dic.abstract.concept=["belief/beliefs","concept/concepts","conception/conceptions","conclusion/conclusions","hypothesis/hypotheses","idea/ideas","impression/impressions","law/laws","lie/lies","notion/notions","opinion/opinions","philosophy/philosophies","plan/plans","proposal/proposals","scheme/schemes","theory/theories","thought/thoughts","vision/visions"];
dic.abstract.social=["agreement/agreements","conflict/conflicts","consensus/consensuses","disagreement/disagreements","feud/feuds","fight/fights","friendship/friendships","relationship/relationships","rivalry/rivalries","romance/romances","understanding/understandings"];
dic.abstract.all=[].concat(dic.abstract.concept,dic.abstract.social);
dic.abstract.subs=["singular","plural"];
dic.abstract.filters=["concept","social"];
var activity={};
dic.activity=activity;
dic.activity.game=["Baseball","Basketball","Football","Golf","Soccer","Tennis","Battlefield","Call of Duty","Contra","Counter-Strike","Doom","Half-Life","Halo","Hitman","Left 4 Dead","Morrowind","Oblivion","Pong","Skyrim","Sonic the Hedgehog","Super Mario Bros.","The Legend of Zelda","World of Warcraft"];
dic.activity.sport=["Baseball","Basketball","Football","Golf","Soccer","Tennis"];
dic.activity.video=["Battlefield","Call of Duty","Contra","Counter-Strike","Doom","Half-Life","Halo","Hitman","Left 4 Dead","Morrowind","Oblivion","Pong","Skyrim","Sonic the Hedgehog","Super Mario Bros.","The Legend of Zelda","World of Warcraft"];
dic.activity.all=[].concat(dic.activity.game,dic.activity.sport,dic.activity.video);
dic.activity.subs=["default"];
dic.activity.filters=["game","sport","video"];
var adj={};
dic.adj=adj;
dic.adj.appearance=["ancient/ancience","attractive/attractiveness","battered/batteredness","bearded/beardedness","beautiful/beauty","bent/deformation","black/blackness","blinding/brightness","brown/brownness","bubbly/bubbliness","colorful/color","colossal/colossality","corrugated/corrugation","crooked/crookedness","crusty/crustiness","cubic/cubic shape","dazzling/sparkle","delicate/delicateness","dirty/dirt","dry/dryness","dusty/dustiness","emaciated/emaciation","enormous/enormousness","exposed/exposure","filthy/filth","floppy/floppiness","fluffy/fluffiness","foamy/foaminess","funny-looking/funny looks","furrowed/furrowedness","furry/furriness","fuzzy/fuzziness","gigantic/impressive size","glamourous/glamour","glittery/glitter","glossy/glossiness","golden/golden luster","green/greenness","grey/greyness","grimy/griminess","hulking/hulkingness","humongous/humongousness","invisible/invisibility","iridescent/iridescence","jagged/jaggedness","lickable/lickability","limp/limpness","mammoth/mammothness","menthol/menthol goodness","microscopic/microscopicness","moldy/moldiness","monochromatic/monochromaticness","mossy/mossiness","muscular/beefiness","naked/nakedness","narrow/narrowness","nude/nudity","orbital/roundness","papery/paperiness","petite/petiteness","plump/plumpness","powdery/powderiness","pretty/prettiness","purple/purpleness","ragged/raggedness","ratty/rattiness","red/redness","red-hot/glowing-red heat","revealing/nakedness","shady/shadiness","short/shortness","shriveled/raisins","slender/slenderness","slippery/slipperiness","sloppy/sloppiness","smoggy/smogginess","smoky/smokiness","soapy/soapiness","sopping/wetness","sparkling/sparkle","spiky/spikiness","spotless/cleanliness","stout/stoutness","sweaty/sweatiness","symmetrical/symmetry","tall/height","thick/thickness","towering/height","transparent/transparence","ugly/ugliness","uneven/unevenness","veiny/veininess","weedy/weediness","wet/moisture","white/whiteness","whopping/whoppingness","wide/wideness","wide-eyed/wideness","windy/windiness","wooden/woodness","wooly/wooliness","wrinkly/raisins","flaccid/flaccidness"];
dic.adj.emotion=["aggravated/aggression","angry/anger","arrogant/arrogance","ashamed/shame","awed/awe","bittersweet/bittersweetness","blissful/bliss","bored/boredom","cheeky/cheekiness","contemptuous/contempt","content/contentfulness","cranky/crankiness","devilish/devilishness","disappointed/disappointment","emo/emo-ness","envious/envy","evil/evil","flirty/flirtiness","frightened/fright","furious/fury","gay/gayness","gleeful/glee","groggy/grogginess","guilty/guilt","happy/happiness","hateful/hate","horrified/horror","humiliated/humility","hungry/hunger","impatient/impatience","indifferent/indifference","interested/interest","jealous/envy","joyful/joy","longing/longing","loving/love","lustful/lust","mad/madness","naughty/naughtiness","optimistic/optimism","pleasured/pleasure","proud/pride","raging/rage","remorseful/remorse","sad/sadness","severe/severity","shocked/shock","sly/slyness","smug/smugness","sorrowful/sorrow","sullen/sullenness","surprised/surprise","thankful/thankfulness","tormented/torment"];
dic.adj.nationality=["African/African heritage","African-American/African-Americanness","American/American heritage","Australian/Australian heritage","British/British heritage","Canadian/Canadian heritage","Chinese/Chinese heritage","French/French heritage","German/German heritage","Irish/Irish heritage","Italian/Italian heritage","Japanese/Japanese heritage","Korean/Korean heritage","Mexican/Mexican heritage","Norwegian/Norwegian heritage","Russian/Russian heritage","Spanish/Spanish heritage"];
dic.adj.weather=["cloudy/cloudiness","foggy/fogginess","moonlit/moonlight","rainy/raininess","snowy/snowiness","starry/starriness","sunny/sunniness"];
dic.adj.defeat=["vanquished/vanquish","defeated/defeat"];
dic.adj.victory=["triumphous/triumph","victorious/victory"];
dic.adj.nsfw=["erect/erectness","sexy/sex appeal","ravishing/rock-solid arousal","horny/horniness","kinky/kinkiness","trashy/trashiness","sexual/sexuality"];
dic.adj.all=["absolute/absoluteness","academic/academicness","acidic/acidity","acoustic/loudness","active/activity","adaptable/adaptability","additional/extra cheese","adequate/adequacy","administrative/domination","advantageous/advantage","advisable/wisdom","aggressive/agressiveness","alien/alienness","all-natural/all-naturalness","amazing/amazingness","ambitious/ambition","amiable/phallus","appealing/appeal","appetizing/appetizingness","artsy/artsiness","assertive/assetiveness","astounding/astoundingness","athletic/athleticness","awesome/awesomeness","awful/terror","barbeque/barbequeness","bashful/bashfulness","beloved/belovedness","bilious/biliousness","blasphemous/blasphemy","bloodthirsty/bloodthirstiness","bloody/bloodiness","blue/blueness","bold/boldness","bouncy/bounciness","bountiful/bountifulness","brave/bravery","breathtaking/breathtakingness","bulging/bulges","busted/bustedness","buttery/butteriness","captivating/captivation","casual/casualness","celestial/celestial power","certified/certification","charitable/charitability","charming/charm","cheerful/cheer","childish/immaturity","chilly/chill","chrome-plated/chrome-platedness","clever/cleverness","cold/coldness","comely/comeliness","complimentary/complimentariness","Confederate/Confederateness","considerate/consideration","constitutional/constitutionalness","contaminated/contamination","cooperative/cooperation","corny/corniness","courageous/courage","crackly/crackliness","crapulous/crapulousness","cream-filled/creaminess","creamy/creaminess","creative/creativity","criminal/criminality","critical/criticalness","cuddly/cuddliness","cultural/culture","damp/dampness","dangerous/danger","daring/dare","dashing/dashingness","dead/deadness","deadly/deadliness","deep/depth","defiant/defiance","delectable/delectableness","delicious/deliciousness","delightful/delightfulness","delinquent/delinquency","deluxe/deluxeness","derogatory/derogatoriness","direful/direfulness","disagreeable/disagreement","disgusting/disgust","disjointed/disjointedness","disloyal/disloyalty","disorganized/disorder","distorted/distortion","divine/divinity","dizzy/dizziness","domestic/domesticness","dominant/dominance","dreadful/dreadfulness","dreamy/dreaminess","dreary/dreariness","dripping/drippingness","drippy/drippiness","drooling/sliminess","ductile/ductileness","dumb/dumbness","durable/durability","eccentric/eccentricity","edgy/edginess","educated/education","electric/electricity","elegant/elegance","enticing/enticingness","epic/epicness","ergonomic/ergonomicness","essential/essentialness","ethical/ethicalness","exhausted/fatigue","exotic/exoticness","exploding/explosiveness","explosive/explosiveness","expressive/expression","exquisite/exquisiteness","extreme/extremity","fabulous/fabulousness","family-friendly/family-friendliness","famous/fame","fanciful/fancy","fantastic/fantasticness","fantastical/fantasticness","fast/speed","fat/fatness","fatherly/fatherliness","feasible/feasibility","feckless/fecklessness","fertile/fertility","festive/festiveness","finger-licking/finger-lickingness","firm/firmness","fishy/fishiness","flabbergasted/confusion","flaming/fire","flammable/flammability","flappy/flappiness","flavorful/flavor","fleshy/fleshiness","flexible/flexibility","fluttering/light-weightedness","forgiving/forgiveness","formal/formality","formidable/formidableness","fortunate/fortune","fragrant/fragrance","freaky/freakiness","fresh/freshness","frictional/friction","frosty/frostiness","fruity/fruitiness","funny/humorousness","gallant/gallantness","gassy/gassiness","gelatinous/gelatinous goodness","gentle/gentleness","ghetto/ghettoness","glassy/glassiness","glorious/gloriousness","gourmet/gourmetness","graceful/grace","grainy/graininess","grassy/grassiness","greasy/grasiness","groovy/grooviness","gross/grossness","hairy/hairiness","hard/hardness","hardcore/hardcoreness","harmless/harmlessness","hazardous/hazardousness","headless/headlessness","heavy/heaviness","heinous/heinousness","highbrow/highbrowness","high-flying/aerodynamics","historical/historicalness","holy/holiness","honest/honesty","horrid/horridness","horrifying/horror","humid/humidity","humorous/humor","hyper/energy","icy/iciness","identical/identity","illiterate/illiteracy","immaculate/immaculateness","immense/immensity","impish/impishness","impressive/impressiveness","inadvisable/inadvisable nature","incredible/incredibility","indestructible/involunurability","infeasible/infeasibility","infectious/infectiousness","informative/informativeness","insane/insanity","intellectual/intellect","intelligent/intelligence","intense/intensity","intentional/intention","interracial/interracialness","intriguing/interest","invigorating/invigoratingness","irrational/irrationality","irregular/irregularity","irritated/anger","itchy/itchiness","jazzy/jazziness","jelly-belly/jelly-bellyness","jiggly/jiggliness","jittery/jitteriness","jovial/cheer","jubilant/happiness","juicy/juiciness","juvenile/juvenileness","keen/keenness","large/largeness","legitimate/legitimacy","light-hearted/light-heartedness","livid/anger","logical/logical","long/longness","lovely/loveliness","loyal/loyalty","lubricated/lubrication","lumpy/lumpiness","luscious/lusciousness","luxurious/luxuriousness","magical/magic","magnificent/magnificence","major-league/major-leagueness","malleable/malleability","manly/manliness","marvelous/marvelousness","masculine/masculinity","meaningful/meaning","mellow/mellowness","melodic/melodicness","menacing/menace","merciful/mercy","messy/messiness","metallic/luster","miserly/misery","moist/moisture","monsterous/largeness","musical/music","mysterious/mystery","mythical/mythicalness","nasty/nastiness","nifty/niftiness","noisy/noisiness","nutritious/nutrition","nutty/nuttiness","obstinate/stubbornness","odd/oddness","odorous/odor","offensive/offensiveness","old/age","old-fashioned/old-fashionedness","oozing/excretory wetness","organic/organicness","organized/order","outlandish/outlandishness","outrageous/outrage","outstanding/amazement","over-whelmed/domination","painful/pain","passionate/passion","pathetic/lameness","patient/patience","patriotic/patrioticness","peckish/peckishness","penetrative/penetrative power","peppery/pepperiness","perfect/perfection","perplexed/confusion","pharmaceutical/pharmaceuticalness","philosophical/philosophy","piggy/pigginess","pitiful/pity","pleasant/pleasant nature","pleasurable/pleasurability","plentiful/plentifulness","poisonous/toxicity","political/politicalness","polluted/pollution","popular/popularity","possible/possibility","potent/potency","potential/potential","powerful/power","pregnant/pregnancy","professional/professionalism","profitable/proifitability","proper/properness","pulsating/pumpiness","punctual/punctuality","puzzled/confusion","queer/queerness","questionable/questionability","radical/radishes","radioactive/radioactivity","raging/rage","rambunctious/wildness","rational/rationality","raunchy/raunchiness","rebellious/rebelliousness","refreshing/refreshingness","regal/regalness","religious/religiousness","resonant/resonance","retro/retroness","revolting/revoltingness","righteous/righteousness","ripped/wear","rock-hard/rock-hardness","rocky/rockiness","romantic/romance","rough/roughness","rowdy/rowdiness","royal/royalty","rude/rudeness","rustic/rusticness","salty/saltiness","sandy/sandiness","satisfactory/satisfaction","savage/savageness","savory/flavor","scary/scariness","scholarly/scholarliness","scornful/scorn","seductive/seductiveness","sensational/sensationalism","sensible/sensibility","serene/serenity","sharp/sharpness","shiny/shininess","shocking/shock","sickening/sickness","significant/significance","silky/silkiness","silly/silliness","sinful/sin","sizzling/fizzly shizzliness","skeptical/skepticism","skinny/skininess","slammin/worth","sleek/sleekness","slick/slickness","slimy/sliminess","slippy/slippiness","slow/slowness","slurpee/slurpiness","small/smallness","smart/smartness","smooth/smoothness","snappy/snappiness","sneaky/sneakiness","snobbish/snobbishness","sociopathic/sociopathicness","soft/softness","soothing/soothingness","sophisticated/sophistication","speculative/speculation","speedy/speediness","spicy/spiciness","spidery/spideriness","spine-tingling/tingliness","splendid/splendidness","splintered/splinters","spontaneous/spontaneity","squeamish/squeamishness","squirrely/furriness","squishy/squishiness","standard/standardness","steamy/steaminess","sterile/sterility","sticky/stickiness","stimulating/stimulus","stinky/stinkiness","stormy/storminess","strange/strangeness","stretchy/stretchiness","strict/strictness","sublime/sublimeness","submissive/submissiveness","succulant/deliciousness","super/superness","superb/superbness","superfluous/superfluousness","supple/softness","supplementary/supplementariness","sure/sureness","surprising/surprise","swift/lightning speed","tactical/tacticalness","tangy/tanginess","tasty/tastiness","tattered/wear","tender/tenderness","terrible/terror","terrifying/scariness","threatening/intimidation","thrilling/thrill","throbbing/throbbing pleasure","ticklish/ticklishness","tight-lipped/tight lips","toasty/toastiness","torturous/torturousness","traditional/tradition","treacherous/treachery","tropical/tropicalness","troubling/trouble","trustworthy/trustworthiness","unbelievable/falseness","unconstitutional/unconstitutionalness","unethical/unethicalness","unfortunate/misfortune","unlikely/unlikelihood","unlimited/unlimitedness","unpleasant/unpleasant nature","unstable/instability","velvety/velvety goodness","vibrating/vibration","Victorian/Victorianness","vulnerable/vulnerability","waddly/waddliness","warm/warmth","wasted/wastedness","water-tight/virginity","watery/wateriness","wavy/waviness","weightless/weightlessness","well-loved/sweet love","well-used/thoroughness","whole-grain/whole-graininess","wholesome/wholesomeness","wicked/wickedness","wild/wildness","wobbly/wobbliness","woody/woodiness","young/youth","yummy/yumminess","zen/zenness","zesty/zestiness"].concat(dic.adj.appearance,dic.adj.emotion,dic.adj.nationality,dic.adj.weather,dic.adj.defeat,dic.adj.victory);
dic.adj.subs=["normal","ness"];
dic.adj.filters=["appearance","emotion","nationality","weather","defeat","victory","nsfw"];
var adv={};
dic.adv=adv;
dic.adv.emotion=["angrily","anxiously","arrogantly","cautiously","enviously","evilly","frantically","gladly","gleefully","greedily","grudgingly","grumpily","happily","hollowly","patiently","regretfully","sadly","shamefully","terrifyingly","warily"];
dic.adv.sexy=["delightedly","forcibly","hungrily","lovingly","romantically","roughly","side to side","slowly","smoothly","sweetly","up and down"];
dic.adv.all=["absentmindedly","accidentally","actively","adventurously","anally","animatedly","appreciatively","ardently","artfully","awkwardly","beautifully","bitterly","blissfully","boldly","bravely","brightly","briskly","buoyantly","busily","calmly","carefully","carelessly","casually","closely","coaxingly","coldly","comfortably","continually","cooly","correctly","courageously","crossly","crunchily","curiously","daintily","deeply","defiantly","deliberately","delicately","deliciously","densely","determinedly","diligently","discreetly","dreamily","eagerly","earnestly","efficiently","effortlessly","elegantly","energetically","enthusiastically","excitedly","expertly","explosively","faithfully","fearlessly","ferociously","fervently","fiercely","firmly","fleetingly","fluidly","forgivingly","formally","generously","genuinely","gloriously","grandly","gravely","greatly","harmonically","hastily","hatefully","heartily","heavily","honestly","hurriedly","illegally","immediately","imperfectly","inappropriately","indubitably","intensely","intensively","intentionally","intently","intuitively","joyfully","justly","keenly","kindly","laboriously","lightly","loudly","magestically","magically","majestically","meekly","mercifully","merrily","methodically","mildly","modestly","mortally","musically","mysteriously","naturally","neatly","necessarily","nimbly","noisily","nonchalantly","objectively","obscenely","partially","peacefully","perfectly","persistently","pointedly","professionally","promptly","proudly","purposefully","quickly","quietly","rapidly","rashly","readily","rebelliously","recklessly","restlessly","richly","royally","saggingly","sarcastically","secretly","sharply","silently","single-handedly","slickly","slimily","sloppily","sluggishly","smartly","snugly","solemnly","speedily","spiritedly","spontaneously","stealthily","strenuously","strictly","strongly","stubbornly","suspiciously","sympathetically","systematically","terribly","thickly","thirstily","thoroughly","thoughtlessly","ticklishly","to kingdom come","torturously","truly","unbelievably","unnecessarily","urgently","victoriously","vigilantly","vigorously","violently","weakly","wetly","wholeheartedly","wildly","wisely","with haste"].concat(dic.adv.emotion,dic.adv.sexy);
dic.adv.subs=["default"];
dic.adv.filters=["emotion","sexy"];
var color={};
dic.color=color;
dic.color.primary=["blue/bluish","green/greenish","red/reddish"];
dic.color.secondary=["cyan/cyan-ish","magenta/magenta-ish","yellow/yellowish"];
dic.color.all=["black/blackish","brown/brownish","crimson/crimsonish","gold/goldish","grey/greyish","lavender/lavenderish","lime green/lime-green-ish","maroon/maroonish","orange/orangish","pink/pinkish","purple/purplish","silver/silverish","turquoise/turquoise-ish","white/whitish"].concat(dic.color.primary,dic.color.secondary);
dic.color.subs=["default","ish"];
dic.color.filters=["primary","secondary"];
var conj={};
dic.conj=conj;
dic.conj.all=["and","but","for","nor","or","so","yet"].concat();
dic.conj.subs=["default"];
dic.conj.filters=[];
var country={};
dic.country=country;
dic.country.africa=["Democratic Republic of the Congo","Egypt","Ghana","Kenya","Libya","Madagascar","Morocco","Niger","Nigeria","Republic of the Congo","Rwanda","Somalia","South Africa","Sudan"];
dic.country.middleeast=["Afghanistan","Iran","Iraq","Israel","Pakistan","Saudi Arabia","Syria","United Arab Emirates","Australia","Guam","New Zealand","Papua New Guinea","Philippines","Samoa","Solomon Islands","Argentina","Brazil","Chile","Colombia","Peru","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Armenia","Aruba","Ashmore and Cartier Islands","Azerbaijan","Bahrain","Bangladesh","Barbados","Bassas da India","Belarus","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","British Indian Ocean Territory","British Virgin Islands","Brunei","Burkina Faso","Burma","Burundi","Cameroon","Cape Verde","Cayman Islands","Central African Republic","Chad","Christmas Island","Clipperton Island","Cocos Islands","Comoros","Cook Islands","Coral Sea Islands","Cote d'Ivoire","Croatia","Czech Republic","Dhekelia","Djibouti","Dominican Republic","Ecuador","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Federated States of Micronesia","Fiji","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","Gaza Strip","Georgia","Gibraltar","Glorioso Islands","Greenland","Grenada","Guadeloupe","Guernsey","Guinea","Guinea-Bissau","Guyana","Heard Island and McDonald Islands","Holy See","Iceland","Isle of Man","Jan Mayen","Jersey","Jordan","Juan de Nova Island","Kazakhstan","Kiribati","Kuwait","Laos","Lebanon","Lesotho","Liberia","Liechtenstein","Macau","Macedonia","Malawi","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Moldova","Monaco","Montserrat","Mozambique","Namibia","Nauru","Navassa Island","Netherlands Antilles","New Caledonia","Niue","Norfolk Island","Northern Mariana Islands","Oman","Palau","Paracel Islands","Paraguay","Pitcairn Islands","Puerto Rico","Qatar","Reunion","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","South Georgia and the South Sandwich Islands","Spratly Islands","Sri Lanka","Suriname","Svalbard","Swaziland","Tajikistan","Tanzania","The Bahamas","The Gambia","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tromelin Island","Tunisia","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
dic.country.asia=["Cambodia","China","Hong Kong","India","Japan","Kyrgyzstan","Malaysia","Mongolia","Nepal","North Korea","Singapore","South Korea","Taiwan","Thailand","Russia"];
dic.country.oceania=["Indonesia","Australia","Guam","New Zealand","Papua New Guinea","Philippines","Samoa","Solomon Islands"];
dic.country.centralamerica=["Costa Rica","Guatemala","Haiti","Honduras","Nicaragua","Panama","Albania","Austria","Belgium","Bulgaria","Denmark","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Latvia","Lithuania","Luxembourg","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","United Kingdom","Iran","Iraq","Israel","Pakistan","Saudi Arabia","Syria","United Arab Emirates","Australia","Guam","New Zealand","Papua New Guinea","Philippines","Samoa","Solomon Islands","Argentina","Brazil","Chile","Colombia","Peru","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Armenia","Aruba","Ashmore and Cartier Islands","Azerbaijan","Bahrain","Bangladesh","Barbados","Bassas da India","Belarus","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","British Indian Ocean Territory","British Virgin Islands","Brunei","Burkina Faso","Burma","Burundi","Cameroon","Cape Verde","Cayman Islands","Central African Republic","Chad","Christmas Island","Clipperton Island","Cocos Islands","Comoros","Cook Islands","Coral Sea Islands","Cote d'Ivoire","Croatia","Czech Republic","Dhekelia","Djibouti","Dominican Republic","Ecuador","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Federated States of Micronesia","Fiji","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","Gaza Strip","Georgia","Gibraltar","Glorioso Islands","Greenland","Grenada","Guadeloupe","Guernsey","Guinea","Guinea-Bissau","Guyana","Heard Island and McDonald Islands","Holy See","Iceland","Isle of Man","Jan Mayen","Jersey","Jordan","Juan de Nova Island","Kazakhstan","Kiribati","Kuwait","Laos","Lebanon","Lesotho","Liberia","Liechtenstein","Macau","Macedonia","Malawi","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Moldova","Monaco","Montserrat","Mozambique","Namibia","Nauru","Navassa Island","Netherlands Antilles","New Caledonia","Niue","Norfolk Island","Northern Mariana Islands","Oman","Palau","Paracel Islands","Paraguay","Pitcairn Islands","Puerto Rico","Qatar","Reunion","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","South Georgia and the South Sandwich Islands","Spratly Islands","Sri Lanka","Suriname","Svalbard","Swaziland","Tajikistan","Tanzania","The Bahamas","The Gambia","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tromelin Island","Tunisia","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
dic.country.europe=["Albania","Austria","Belgium","Bulgaria","Denmark","Finland","France","Germany","Greece","Hungary","Ireland","Italy","Latvia","Lithuania","Luxembourg","Netherlands","Norway","Poland","Portugal","Romania","Slovakia","Slovenia","Spain","Sweden","Switzerland","Turkey","United Kingdom"];
dic.country.eurasia=["Russia"];
dic.country.southamerica=["Argentina","Brazil","Chile","Colombia","Peru","Algeria","American Samoa","Andorra","Angola","Anguilla","Antarctica","Antigua and Barbuda","Armenia","Aruba","Ashmore and Cartier Islands","Azerbaijan","Bahrain","Bangladesh","Barbados","Bassas da India","Belarus","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia and Herzegovina","Botswana","Bouvet Island","British Indian Ocean Territory","British Virgin Islands","Brunei","Burkina Faso","Burma","Burundi","Cameroon","Cape Verde","Cayman Islands","Central African Republic","Chad","Christmas Island","Clipperton Island","Cocos Islands","Comoros","Cook Islands","Coral Sea Islands","Cote d'Ivoire","Croatia","Czech Republic","Dhekelia","Djibouti","Dominican Republic","Ecuador","El Salvador","Equatorial Guinea","Eritrea","Estonia","Ethiopia","Europa Island","Falkland Islands","Faroe Islands","Federated States of Micronesia","Fiji","French Guiana","French Polynesia","French Southern and Antarctic Lands","Gabon","Gaza Strip","Georgia","Gibraltar","Glorioso Islands","Greenland","Grenada","Guadeloupe","Guernsey","Guinea","Guinea-Bissau","Guyana","Heard Island and McDonald Islands","Holy See","Iceland","Isle of Man","Jan Mayen","Jersey","Jordan","Juan de Nova Island","Kazakhstan","Kiribati","Kuwait","Laos","Lebanon","Lesotho","Liberia","Liechtenstein","Macau","Macedonia","Malawi","Maldives","Mali","Malta","Marshall Islands","Martinique","Mauritania","Mauritius","Mayotte","Moldova","Monaco","Montserrat","Mozambique","Namibia","Nauru","Navassa Island","Netherlands Antilles","New Caledonia","Niue","Norfolk Island","Northern Mariana Islands","Oman","Palau","Paracel Islands","Paraguay","Pitcairn Islands","Puerto Rico","Qatar","Reunion","Saint Helena","Saint Kitts and Nevis","Saint Lucia","Saint Pierre and Miquelon","Saint Vincent and the Grenadines","San Marino","Sao Tome and Principe","Senegal","Serbia and Montenegro","Seychelles","Sierra Leone","South Georgia and the South Sandwich Islands","Spratly Islands","Sri Lanka","Suriname","Svalbard","Swaziland","Tajikistan","Tanzania","The Bahamas","The Gambia","Timor-Leste","Togo","Tokelau","Tonga","Trinidad and Tobago","Tromelin Island","Tunisia","Turkmenistan","Turks and Caicos Islands","Tuvalu","Uganda","Ukraine","Uruguay","Uzbekistan","Vanuatu","Venezuela","Vietnam","Virgin Islands","Wake Island","Wallis and Futuna","West Bank","Western Sahara","Yemen","Zambia","Zimbabwe"];
dic.country.all=[].concat(dic.country.africa,dic.country.middleeast,dic.country.asia,dic.country.oceania,dic.country.centralamerica,dic.country.europe,dic.country.eurasia,dic.country.southamerica);
dic.country.subs=["default"];
dic.country.filters=["africa","middleeast","asia","oceania","centralamerica","europe","eurasia","southamerica"];
var em={};
dic.em=em;
dic.em.all=["absolutely","extremely","incredibly","majorly","most","oh so","positively","quite","rather","really","super","thoroughly","unbelievably","very"].concat();
dic.em.subs=["default"];
dic.em.filters=[];
var emo={};
dic.emo=emo;
dic.emo.all=["anger","anticipation","awe","bewilderment","bliss","boredom","confusion","contempt","contentment","despair","disappointment","ecstasy","envy","excitement","fright","fury","gratitude","guilt","happiness","hatred","horror","humility","hunger","interest","irritation","joy","longing","love","lust","madness","melancholy","optimism","pain","passion","pity","pleasure","pride","rage","remorse","sadness","satisfaction","shame","shock","smugness","sorrow","surprise","terror","torment"].concat();
dic.emo.subs=["default"];
dic.emo.filters=[];
var face={};
dic.face=face;
dic.face.all=["blank face","cheeky grin","evil grin","frown","grimace","grin","poker face","pout","pout lip","pucker","smile","smirk","snarl","sneer","snicker","toothy grin","trollface","visage"].concat();
dic.face.subs=["default"];
dic.face.filters=[];
var firstname={};
dic.firstname=firstname;
dic.firstname.female=["Alice","Amanda","Bertha","Betty","Britney","Christina","Crystal","Debbie","Delores","Ember","Gabrielle","Gloria","Heidi","Helen","Jacki","Jane","Jennifer","Jessica","Karen","Kat","Kate","Kimberly","Kristin","Laura","Lauren","Linda","Lindsey","Maggie","Marge","Maria","Martha","Mary","Megan","Michelle","Papa","Rebecca","Renae","Ruth","Sadie","Sandra","Sara","Saralyn","Scarlett","Stacey","Stephanie","Susan","Tiffany","Tina","Valerie","Varlerie","Vicki","Adrian","Alex","Jamie","Jessie","Jordan","Quinn","Sam","Sidney","Tracy"];
dic.firstname.male=["Abbot","Abe","Abeeku","Abu","Acton","Adair","Addae","Ade","Adeben","Adish","Adjatay","Adjo","Adwin","Agu","Aidric","Ajamu","Ajani","Akbar","Akello","Akia","Akins","Akintunde","Akuna","Alan","Alastair","Albert","Albion","Aldan","Alden","Aldis","Alfred","Algernon","Alick","Allard","Alvar","Ambar","Anane","Ande","Andwele","Andy","Ansley","Anson","Aragorn","Arash","Arathorn","Arden","Argyle","Ariabod","Armani","Art","Arwan","Arya","Asante","Ash","Ashanti","Ashford","Asho","Ashton","Atherton","Athumani","Atish","Atticus","Aubrey","August","Austin","Axton","Ayele","Ayinde","Ayzize","Azibo","Baback","Badru","Bahari","Bailey","Baker","Baldwin","Balthasar","Bandele","Banji","Barack/B","Baraz","Barbod","Bardia","Bardolf","Barid","Barke","Barnaby","Barney","Baron","Barrett","Barrington","Barton","Bast","Baxter","Beauchamp","Beauregard","Beck","Beckett","Beckham","Belay","Bem","Benham","Benjamin","Benny","Benson","Bently","Benton","Berke","Berta","Beverly","Bevis","Bian","Bill","Billybob/B","Binda","Birch","Birungi","Bishop","Blake","Blaze","Boniface","Bono","Booker","Boston","Brad","Bradley","Bradshaw","Braima","Brandon","Brantley","Brenton","Brett","Brewster","Breyson","Brian","Briar","Brice","Bridger","Brighton","Bringham","Bristol","Brock","Bronson","Brook","Bruce","Bryan","Buckley","Burgess","Burris","Burton","Byron","Caldwell","Caledon","Calico","Camara","Camden","Canon","Carlton","Carrington","Carter","Carver","Cash","Caspian","Cecil","Celtic","Chad","Chadwick","Chainey","Chandler","Charleston","Charlie","Charlton","Chauncey","Chay","Chester","Chet","Chiazam","Chikezie","Chimelu","Chincha","Chinelo","Chinua","Chip","Clarence","Clark","Clayton","Cleaveland","Cleavon","Clement","Clifford","Clifton","Clint","Clinton","Clive","Cody/C","Colby","Coleman","Collin/C","Colton","Conrad","Conroy","Corbin","Cornell","Cosmo","Cotton","Craig","Crawford","Creighton","Crimson","Crosby","Dalton","Danny/D","Dareh","Darius","Darrel","Darrius","Darryl","Darwin","Dash","Dastan","Daughtry","Davu","Dawson","Deacon","Deka","Dennis","Derek","Derring","Devon","Dexter","Dexton","Diamond","Dick","Dixon","Don","Donnie","Dorsey","Doug","Dracen","Drake","Dryden","Dudley","Duke","Dustin","Dwayne","Dwight","Dyson","Earl","Easton","Eastwood","Ed","Edd","Eddy","Edgar","Edgerton","Edison","Edmund","Edric","Edward","Edwin","Egbert","Elden","Elias","Elliot","Ellis","Elmer","Elmo","Elton","Elvin","Elvis/E","Elwood","Emerson","Emmet","Ernie","Errol","Erv","Ervin","Erwin","Eugene","Euroa","Fairfax","Falcon","Farley","Ferguson","Ferris","Filbert","Fisher","Fitzwilliam","Fletcher","Floyd","Forbes","Ford","Forrest","Foster","Fraley","Francis","Frank","Frederick","Frenchie","Fulbright","Gage","Galahad","Gale","Gardner","Garland","Garrison","Garth","Gary","Gavin","Gaylord","George","Gidja","Gilbert","Godfrey","Gordon","Graham","Graydon","Greg","Griff","Grover","Gul","Gulliver","Gus","Harry","Ian","Jahan","Jake/J","Jamier/J","Jeff","Jela","Jengo","John/J","Joshua","Justin","Kaawa","Kabili","Kamran","Kanaifu","Kandoro","Kaveh","Kaysar","Keith/K","Ken","Kermit","Keto","Kevin","Khalfan","Kiango","Kijani","Kinta","Kondo","Kumba","Kyle","Lee","Louie/L","Luke/L","Malcolm","Mani","Masih","Max/M","Meghdad","Menelin","Michael","Mickey/M","Milad","Mitchell/M","Moses/M","Nasha","Naveed","Navid","Nicholas","Nick/N","Nuru","Omeo","Onyx","Paratyl","Parham","Parker","Penda","Penha","Ponto","Pouria","Quoba","Radwan","Rex/R","Rick","Robin","Roger","Ronald/R","Roshan","Safari","Saman","Sardar","Sarmad","Sasquatch/S","Scott/S","Sean/S","Shadan","Shahan","Shahin","Shahryar","Shapur","Sher","Shonuff","Snuggles/S","Stan/S","Steve","Taworri","Teangi","Thimba","Thono","Thor","Tim/T","Timmy/T","Todd","Tom","Tony","Tristan","Tyipa","Vanshay","Victor","Vijay/V","Wilbur","William","Yamparti","Yarran","Yoyko","Zachy/Z","Adrian","Alex","Jamie","Jessie","Jordan","Quinn","Sam","Sidney","Tracy"];
dic.firstname.all=[].concat(dic.firstname.female,dic.firstname.male);
dic.firstname.subs=["default","abbr"];
dic.firstname.filters=["female","male"];
var greet={};
dic.greet=greet;
dic.greet.all=["ahoy","aloha","good afternoon","good day","good evening","good morning","good night","greetings","guten Tag","hello","hey","hey buddy","hola","how's it going","how's it hanging","konichi wa","salutations","sup","what's happening","what's new","what's up","whazzup","yo"].concat();
dic.greet.subs=["default"];
dic.greet.filters=[];
var nonsense={};
dic.nonsense=nonsense;
dic.nonsense.all=["zap/zappity/zapple","zop/zoppity/zopple","zip/zippity/zipple","zoop/zoopity/zoople","zoob/zoobity/zooble","bap/bappity/bapple","bop/boppity/bopple","bip/bippity/bipple","boop/boopity/boople","boob/boobity/booble"].concat();
dic.nonsense.subs=["normal","ity","le"];
dic.nonsense.filters=[];
var noun={};
dic.noun=noun;
dic.noun.animal=["beagle/beagles","bulldog/bulldogs","dog/dogs","poodle/poodles","rottweiler/rottweilers","beetle/beetles","cricket/crickets","grasshopper/grasshoppers","locust/locusts","bird/birds","seagull/seagulls","hawk/hawks","vulture/vultures","woodpecker/woodpeckers","crow/crows","raven/ravens","chickadee/chickadees","chicken/chickens","finch/finches","rooster/roosters","turkey/turkeys","hummingbird/hummingbirds","bluebird/blurbirds","goldfinch/goldfinches","eagle/eagles","owl/owls","parrot/parrots","peacock/peacocks","dove/doves","flamingo/flamingos","pigeon/pigeons","pelican/pelicans","grouse/grouse","swan/swans","goose/geese","magpie/magpies","penguin/penguins","erect-crested penguin/erect-crested penguins","emperor penguin/emperor penguins","king penguin/king penguins","gentoo penguin/gentoo penguins","adelie penguin/adelie penguins","rockhopper penguin/rockhopper penguins","macaroni penguin/macaroni penguins","yellow-eyed penguin/yellow-eyed penguins","fairy penguin/fairy penguins","African penguin/African penguins","Magellanic penguin/Magellanic penguins","chinstrap penguin/chinstrap penguins","Humboldt penguin/Humboldt penguins","anaconda/anacondas","ant/ants","baboon/baboons","bass/basses","bat/bats","blowfish/blowfish","bull/bulls","butler/butlers","cat/cats","chihuahua/chihuahuas","cockroach/cockroaches","deer/deer","demon/demons","devil/devils","donkey/donkeys","fish/fishes","frog/frogs","goat/goats","gorilla/gorillas","hedgehog/hedgehogs","horse/horses","hyena/hyenas","jaguar/jaguars","landlord/landlords","leech/leeches","lemur/lemurs","lion/lions","lizard/lizards","llama/llamas","mammoth/mammoths","mayor/mayors","moose/moose","newt/newts","octopus/octopi","ogre/ogres","otter/otters","pony/ponies","porcupine/porcupines","quokka/quokkas","rat/rats","skunk/skunks","sphinx/sphinxes","squid/squids","squirrel/squirrels","tadpole/tadpoles","tiger/tigers","titan/titans","toad/toads","turtle/turtles","tyrannosaurus rex/tyrannosaurus rexes","velociraptor/velociraptors","viking/vikings","weasel/weasels","wolf/wolves","xerus/xeruses","yak/yaks","yeti/yetis","zebra/zebras","bitch/bitches"];
dic.noun.dog=["beagle/beagles","bulldog/bulldogs","dog/dogs","poodle/poodles","rottweiler/rottweilers"];
dic.noun.insect=["beetle/beetles","cricket/crickets","grasshopper/grasshoppers","locust/locusts"];
dic.noun.bird=["bird/birds","seagull/seagulls","hawk/hawks","vulture/vultures","woodpecker/woodpeckers","crow/crows","raven/ravens","chickadee/chickadees","chicken/chickens","finch/finches","rooster/roosters","turkey/turkeys","hummingbird/hummingbirds","bluebird/blurbirds","goldfinch/goldfinches","eagle/eagles","owl/owls","parrot/parrots","peacock/peacocks","dove/doves","flamingo/flamingos","pigeon/pigeons","pelican/pelicans","grouse/grouse","swan/swans","goose/geese","magpie/magpies","penguin/penguins","erect-crested penguin/erect-crested penguins","emperor penguin/emperor penguins","king penguin/king penguins","gentoo penguin/gentoo penguins","adelie penguin/adelie penguins","rockhopper penguin/rockhopper penguins","macaroni penguin/macaroni penguins","yellow-eyed penguin/yellow-eyed penguins","fairy penguin/fairy penguins","African penguin/African penguins","Magellanic penguin/Magellanic penguins","chinstrap penguin/chinstrap penguins","Humboldt penguin/Humboldt penguins"];
dic.noun.penguin=["penguin/penguins","erect-crested penguin/erect-crested penguins","emperor penguin/emperor penguins","king penguin/king penguins","gentoo penguin/gentoo penguins","adelie penguin/adelie penguins","rockhopper penguin/rockhopper penguins","macaroni penguin/macaroni penguins","yellow-eyed penguin/yellow-eyed penguins","fairy penguin/fairy penguins","African penguin/African penguins","Magellanic penguin/Magellanic penguins","chinstrap penguin/chinstrap penguins","Humboldt penguin/Humboldt penguins"];
dic.noun.article=["boot/boots","shoe/shoes","slipper/slippers","sock/socks","zipper/zippers","belt/belts","boxers/boxers","bra/bras","dress/dresses","girdle/girdles","hat/hats","jacket/jackets","kilt/kilts","pantaloons/pantaloons","pants/pants","shirt/shirts","skirt/skirts","suit/suits","sweatshirt/sweatshirts","top hat/top hats","tuxedo/tuxedoes","underwear/underwear","vest/vests","panties/panties","thong/thongs"];
dic.noun.clothes=["boot/boots","shoe/shoes","slipper/slippers","sock/socks","zipper/zippers"];
dic.noun.ball=["baseball/baseballs","basketball/basketballs","beach ball/beach balls","boulder/boulders","tennis ball/tennis balls"];
dic.noun.round=["golf ball/golf balls","kidney/kidneys","tit/tits","boob/boobs"];
dic.noun.food=["meatball/meatballs","apple/apples","apricot/apricots","blueberry/blueberries","coconut/coconuts","grape/grapes","grape/grapes","grapefruit/grapefruits","kiwi/kiwis","kumquat/kumquats","lemon/lemons","lime/limes","nectarine/nectarines","orange/oranges","pineapple/pineapples","prune/prunes","raspberry/raspberries","strawberry/strawberries","tangerine/tangerines","tomato/tomatoes","watermelon/watermelons","almond/almonds","biscuit/biscuits","bread/bread","corn/corns","cornflake/cornflakes","fudge/fudge","hazelnut/hazelnuts","marshmallow/marshmallows","meatloaf/meatloaves","onion/onions","peanut/peanuts","potato/potatoes","pretzel/pretzels","spinach/spinach","walnut/walnuts"];
dic.noun.body=["afro/afros","armpit/armpits","beak/beaks","body/bodies","bone/bones","chin/chins","cornea/corneas","dimple/dimples","duodenum/duodenums","elbow/elbows","epidermis/epidermises","esophagus/esophaguses","face/faces","fanny/fannies","femur/femurs","fibula/fibulas","gallbladder/gallbladders","goatee/goatees","head/heads","heart/hearts","horn/horns","jowl/jowls","kneecap/kneecaps","knuckle/knuckles","lip/lips","loin/loins","mandible/mandibles","mustache/mustaches","navel/navels","neck/necks","nose/noses","nostril/nostrils","pancreas/pancreases","rump/rumps","scapula/scapulas","skin/skin","snout/snouts","stinger/stingers","throat/throats","toe/toes","toenail/toenails","tooth/teeth","unibrow/unibrows","uvula/uvulas","whisker/whiskers","micropenis/micropenises","pussy/pussies","vagflap/vagflaps","cuntflap/cuntflaps","cunt/cunts","anus/anuses","sphincter/sphincters","tit/tits","taint/taints","foreskin/foreskins","boob/boobs","boner/boners","dick/dicks","cock/cocks","asshole/assholes","ballsack/ballsacks","testicle/testicles","scrotum/scrotums","pube/pubes","penis/penises","vagina/vaginas","pussy/pussies","chesticle/chesticles","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.long=["finger/fingers","leg/legs","tentacle/tentacles","tongue/tongues","umbilical cord/umbilical cords","blowtorch/blowtorches","bunsen burner/bunsen burners","hammer/hammers","jackhammer/jackhammers","screwdriver/screwdrivers","spoon/spoons","wand/wands","wrench/wrenches","baton/batons","broomstick/broomsticks","dart/darts","harpoon/harpoons","telephone pole/telephone poles","torch/torches","banana/bananas","banister/banisters","broom/brooms","candle/candles","cannon/cannons","chain/chains","cigarette/cigarettes","crack pipe/crack pipes","cucumber/cucumbers","extension cord/extension cords","jalapeno/jalapenos","knife/knives","lightbulb/lightbulbs","panhandle/panhandles","pickle/pickles","plunger/plungers","pole/poles","rocket/rockets","ruler/rulers","sausage/sausages","silo/silos","spork/sporks","staple/staples","toothbrush/toothbrushes","toothpick/toothpicks","tree/trees","turd/turds","umbrella/umbrellas","flamethrower/flamethrowers","fork/forks","machete/machetes","pitchfork/pitchforks","spear/spears","sword/swords","shotgun/shotguns","battering ram/battering rams","double dildo/double dildos","boner/boners","dick/dicks","cock/cocks","penis/penises","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.hole=["mouth/mouths","anus/anuses","sphincter/sphincters","goatse/goatses","asshole/assholes","vagina/vaginas","pussy/pussies"];
dic.noun.container=["bag/bags","balloon/balloons","barrel/barrels","basket/baskets","bong/bongs","bottle/bottles","bowl/bowls","box/boxes","carton/cartons","case/cases","cell/cells","chest/chests","coffin/coffins","container/containers","cup/cups","drawer/drawers","flask/flasks","freezer/freezers","garbage can/garbage cans","glass/glasses","jar/jars","kettle/kettles","oven/ovens","package/packages","package/packages","packet/packets","pickle jar/pickle jars","pipe/pipes","pitcher/pitchers","pocket/pockets","pot/pots","pouch/pouches","purse/purses","sack/sacks","shot glass/shot glasses","skillet/skillets","suitcase/suitcases","test tube/test tubes","toilet/toilets","trashcan/trashcans","trunk/trunks","tub/tubs","turkey baster/turkey basters","vat/vats","vial/vials","wallet/wallets","well/wells"];
dic.noun.weapon=["bottle/bottles","drill/drills","shovel/shovels","baton/batons","broomstick/broomsticks","dart/darts","harpoon/harpoons","telephone pole/telephone poles","torch/torches","bomb/bombs","chainsaw/chainsaws","lawn mower/lawn mowers","pickaxe/pickaxes","stapler/staplers","stun gun/stun guns","brick/bricks","bullet/bullets","cleat/cleats","dagger/daggers","lampstand/lampstands","musket/muskets","nail/nails","needle/needles","pipe/pipes","battering ram/battering rams"];
dic.noun.drug=["bath salts/bath salts","cocaine/cocaine","crack/crack","extacy/extacy","heroin/heroin","LSD/LSD","marijuana/marijuana","mescaline/mescaline","meth/meth","PCP/PCP","roofie/roofies","shroom/shrooms","smack/smack"];
dic.noun.fruit=["apple/apples","apricot/apricots","blueberry/blueberries","coconut/coconuts","grape/grapes","grape/grapes","grapefruit/grapefruits","kiwi/kiwis","kumquat/kumquats","lemon/lemons","lime/limes","nectarine/nectarines","orange/oranges","pineapple/pineapples","prune/prunes","raspberry/raspberries","strawberry/strawberries","tangerine/tangerines","tomato/tomatoes","watermelon/watermelons","baby/babies"];
dic.noun.surface=["bed/beds","chair/chairs","desk/desks","bedsheet/bedsheets","carpet/carpets","ceiling/ceilings","door/doors","floor/floors","patio/patios","roof/roofs","tabletop/tabletops","wall/walls","window/windows"];
dic.noun.furniture=["chair/chairs","coffee table/coffee tables","couch/couches","lawn chair/lawn chairs","nightstand/nightstands","recliner/recliners","rocking chair/rocking chairs"];
dic.noun.job=["accountant/accountants","actor/actors","archaeologist/archaeologists","armorer/armorers","artist/artists","assassin/assassins","athlete/athletes","babysitter/babysitters","bachelor/bachelors","banker/bankers","bartender/bartenders","biologist/biologists","burglar/burglars","butler/butlers","carpenter/carpenters","celebrity/celebrities","chef/chefs","circus performer/circus performers","clown/clowns","constable/constables","construction worker/construction workers","cop/cops","dentist/dentists","doctor/doctors","explorer/explorers","FBI agent/FBI agents","fireman/firemen","fortune teller/fortune tellers","gambler/gamblers","gangster/gangsters","golfer/golfers","guitarist/guitarists","haberdasher/haberdashers","hippie/hippies","hobbit/hobbits","hunter/hunters","journalist/journalists","juggler/jugglers","lawyer/lawyers","magician/magicians","mailman/mailmen","mechanic/mechanics","movie star/movie stars","ninja/ninjas","nurse/nurses","paramedic/paramedics","physician/physicians","pianist/pianists","pirate/pirates","plumber/plumbers","policeman/policemen","politician/politicians","pope/popes","president/presidents","prince/princes","princess/princesses","principal/principals","rapper/rappers","reporter/reporters","salesman/salesmen","scientist/scientists","senator/senators","serial killer/serial killers","singer/singers","sky diver/sky divers","snake charmer/snake charmers","spelunker/spelunkers","stock broker/stock brokers","surgeon/surgeons","tanner/tanners","taxidermist/taxidermists","teacher/teachers","urologist/urologists","vampire/vampires","waiter/waiters","waitress/waitresses","wizard/wizards"];
dic.noun.liquid=["acid/acids","beer/beers","bleach/bleach","cream/creams","diarrhea/diarrhea","earwax/earwax","grease/grease","lotion/lotions","oil/oils","olive oil/olive oil","pudding/puddings","rain/rains","saliva/saliva","sauce/sauces","slime/slime","snot/snots","soap/soaps","soup/soups","sweat/sweats","tar/tar","toothpaste/toothpastes","urine/urine","vodka/vodka","water/water","wine/wines","yogurt/yogurts"];
dic.noun.tool=["blowtorch/blowtorches","bunsen burner/bunsen burners","hammer/hammers","jackhammer/jackhammers","screwdriver/screwdrivers","spoon/spoons","wand/wands","wrench/wrenches","arrow/arrows","pencil/pencils","bomb/bombs","chainsaw/chainsaws","lawn mower/lawn mowers","pickaxe/pickaxes","stapler/staplers","stun gun/stun guns","blender/blenders","can opener/can openers","cattle prod/cattle prods","drug/drugs","firecracker/firecrackers","hacksaw/hacksaws","iron maiden/iron maidens","jockstrap/jockstraps","ladder/ladders","leaf blower/leaf blowers","loincloth/loincloths","microscope/microscopes","nutcracker/nutcrackers","pan/pans","phone/phones","pistol/pistols","pot/pots","robot/robots","rumpus/rumpuses","shopping cart/shopping carts","squeegee/squeegees","vacuum/vacuums","horsewhip/horsewhips","razor/razors","wheelbarrow/wheelbarrows","battering ram/battering rams","nipple clamp/nipple clamps","butthair/butthairs"];
dic.noun.person=["child/children","dude/dudes","elf/elves","lady/ladies","man/men","teen/teens","woman/women"];
dic.noun.plant=["clover/clovers","daisy/daisies","dandelion/dandelions","fern/ferns","hedge/hedges","maple tree/maple trees","marigold/marigolds","pumpkin/pumpkins","stinging nettle/stinging nettles","thistle/thistles","tulip/tulips"];
dic.noun.shape=["circle/circles","oval/ovals","square/squares","triangle/triangles"];
dic.noun.vehicle=["aircraft carrier/aircraft carriers","airplane/airplanes","blimp/blimps","boat/boats","hot rod/hot rods","minivan/minivans","motorcycle/motorcycles","semi/semis","submarine/submarines","train/trains","truck/trucks"];
dic.noun.sex=["cuntrocket/cuntrockets","micropenis/micropenises","cuntwaffle/cuntwaffles","blue waffle/blue waffles","dildo/dildos","double dildo/double dildos","dinocock/dinococks","pussy/pussies","vagflap/vagflaps","cuntflap/cuntflaps","cunt/cunts","anus/anuses","sphincter/sphincters","tit/tits","taint/taints","foreskin/foreskins","goatse/goatses","boob/boobs","boner/boners","dick/dicks","cock/cocks","ballsack/ballsacks","testicle/testicles","scrotum/scrotums","penis/penises","vagina/vaginas","pussy/pussies","willy/willies","prick/pricks","manhood/manhoods"];
dic.noun.nsfw=["shit/shits","poo-poo/poo-poos","yeast/yeast infections","poop/poops","motherfucker/motherfuckers"];
dic.noun.all=["anthill/anthills","asymptote/asymptotes","avocado/avocados","banjo/banjos","basket/baskets","battery/batteries","bench/benches","bingo/bingos","booger/boogers","book/books","bulge/bulges","button/buttons","cabbage/cabbages","caboose/cabooses","candy cane/candy canes","canister/canisters","car/cars","carcass/carcasses","card/cards","carpet/carpets","cement/cement","cheeseburger/cheeseburgers","chicken wing/chicken wings","clock/clocks","cocktail/cocktails","Communist/Communists","constitution/constitutions","cork/corks","cramp/cramps","credit card/credit cards","cuckoo/cuckoos","Democrat/Democrats","diaper/diapers","dictionary/dictionaries","dime/dimes","dingleberry/dingleberries","disco ball/disco balls","dishrag/dishrags","doll/dolls","dollar bill/dollar bills","doodle/doodles","duct tape/duct tape","dynamite/dynamites","earwax/earwax","enigma/enigmas","eraser/erasers","fan/fans","fart/farts","feces/feces","fetus/fetuses","flapjack/flapjacks","flowerpot/flowerpots","fog/fogs","football/footballs","frosting/frostings","garden/gardens","gearshift/gearshifts","ghost/ghosts","giblet/giblets","globe/globes","grass/grasses","hemorroid/hemorroids","hole/holes","horseradish/horseradishes","hubcap/hubcaps","jelly bean/jelly beans","joint/joints","kettle/kettles","keyboard/keyboards","kite/kites","laptop/laptops","leaf/leaves","lemonade/lemonades","loaf/loaves","log/logs","lube/lubes","lump/lumps","magnifying glass/magnifying glasses","manhole/manholes","manure/manure","mask/masks","meat/meats","mirror/mirrors","mohawk/mohawks","moist towelette/moist towelettes","money/money","monster/monsters","muffin/muffins","nerd/nerds","nickel/nickels","ointment/ointments","papaya/papayas","pedestrian/pedestrians","peninsula/peninsulas","penny/pennies","peppermint/peppermints","pizza/pizzas","plug/plugs","pope/popes","popsicle/popsicles","president/presidents","puppet/puppets","pylon/pylons","rabies/rabies","radish/radishes","ragamuffin/ragamuffins","raisin/raisins","Republican/Republicans","ridge/ridges","rock/rocks","rotisserie/rotisseries","rubber/rubbers","scab/scabs","scuba/scubas","sharpie/sharpies","shrub/shrubs","shuttlecock/shuttlecocks","snorkel/snorkels","sofa/sofas","sponge/sponges","stone/stones","swag/swag","tampon/tampons","tea bag/tea bags","teapot/teapots","teddy bear/teddy bears","tire/tires","towel/towels","towelette/towelettes","treasure/treasures","truffle/truffles","truth/truths","tuber/tubers","urinal/urinals","ventricle/ventricles","waffle/waffles","wall/walls","wedgie/wedgies","wig/wigs","wool/wool","wrinkle/wrinkles","zygote/zygotes"].concat(dic.noun.animal,dic.noun.dog,dic.noun.insect,dic.noun.bird,dic.noun.penguin,dic.noun.article,dic.noun.clothes,dic.noun.ball,dic.noun.round,dic.noun.food,dic.noun.body,dic.noun.long,dic.noun.hole,dic.noun.container,dic.noun.weapon,dic.noun.drug,dic.noun.fruit,dic.noun.surface,dic.noun.furniture,dic.noun.job,dic.noun.liquid,dic.noun.tool,dic.noun.person,dic.noun.plant,dic.noun.shape,dic.noun.vehicle,dic.noun.sex);
dic.noun.subs=["singular","plural"];
dic.noun.filters=["animal","dog","insect","bird","penguin","article","clothes","ball","round","food","body","long","hole","container","weapon","drug","fruit","surface","furniture","job","liquid","tool","person","plant","shape","vehicle","sex","nsfw"];
var place={};
dic.place=place;
dic.place.indoor=["asylum/asylums","bar/bars","barn/barns","bomb shelter/bomb shelters","castle/castles","church/churches","coffeeshop/coffeeshops","conservatory/conservatories","cottage/cottages","courthouse/courthouses","distillery/distilleries","factory/factories","firehouse/firehouses","fort/forts","funeral home/funeral homes","homeless shelter/homeless shelters","hospital/hospitals","hostel/hostels","hotel/hostels","jail/jails","laboratory/laboratories","library/libraries","mall/malls","mansion/mansions","morgue/morgues","nightclub/nightclubs","nursery/nurseries","outhouse/outhouses","palace/palaces","post office/post offices","prison/prisons","pub/pubs","safehouse/safehouses","school/schools","shack/shacks","shanty/shanties","stable/stables","stadium/stadiums","store/stores","studio/studios","tent/tents","theater/theaters","tomb/tombs","tower/towers","warehouse/warehouses","cave/caves","ditch/ditches","forest/forests","land/lands","meadow/meadows","nest/nests","abyss/abysses","alley/alleys","ambulance/ambulances","apartment/apartments","arcade/arcades","attic/attics","bank/banks","basement/basements","bathroom/bathrooms","bedroom/bedrooms","boat/boats","bus/buses","cage/cages","car/cars","carnival/carnivals","classroom/classrooms","closet/closets","company/companies","dispensary/dispensaries","dungeon/dungeons","festival/festivals","firetruck/firetrucks","garage/garages","garden/gardens","house/houses","kitchen/kitchens","office/offices","opera/operas","port-a-potty/port-a-potties","ring/rings","sanctuary/sanctuaries","sauna/saunas","shop/shops","skyway/skyways","stand/stands","station/stations","town/towns","trailer/trailers","van/vans","wonderland/wonderlands"];
dic.place.building=["asylum/asylums","bar/bars","barn/barns","bomb shelter/bomb shelters","castle/castles","church/churches","coffeeshop/coffeeshops","conservatory/conservatories","cottage/cottages","courthouse/courthouses","distillery/distilleries","factory/factories","firehouse/firehouses","fort/forts","funeral home/funeral homes","homeless shelter/homeless shelters","hospital/hospitals","hostel/hostels","hotel/hostels","jail/jails","laboratory/laboratories","library/libraries","mall/malls","mansion/mansions","morgue/morgues","nightclub/nightclubs","nursery/nurseries","outhouse/outhouses","palace/palaces","post office/post offices","prison/prisons","pub/pubs","safehouse/safehouses","school/schools","shack/shacks","shanty/shanties","stable/stables","stadium/stadiums","store/stores","studio/studios","tent/tents","theater/theaters","tomb/tombs","tower/towers","warehouse/warehouses"];
dic.place.natural=["cave/caves","ditch/ditches","forest/forests","land/lands","meadow/meadows","nest/nests","beach/beaches","crater/craters","grassy plain/grassy plains","hill/hills","hilltop/hilltops","island/islands","lakeside/lakesides","mountain/mountains","valley/valleys","volcano/volcanoes","wasteland/wastelands"];
dic.place.outdoor=["beach/beaches","crater/craters","grassy plain/grassy plains","hill/hills","hilltop/hilltops","island/islands","lakeside/lakesides","mountain/mountains","valley/valleys","volcano/volcanoes","wasteland/wastelands","amusement park/amusement parks","battlefield/battlefields","cemetery/cemeteries","dance floor/dance floors","farm/farms","field/fields","graveyard/graveyards","highway/highways","park/parks","playground/playgrounds","railroad/railroads","road/roads","rooftop/rooftops","street/streets"];
dic.place.all=[].concat(dic.place.indoor,dic.place.building,dic.place.natural,dic.place.outdoor);
dic.place.subs=["singular","plural"];
dic.place.filters=["indoor","building","natural","outdoor"];
var prefix={};
dic.prefix=prefix;
dic.prefix.position=["endo","extra","intra","mid","over","post","pre","under"];
dic.prefix.quantity=["bi","mono","octo","penta","quad","tri"];
dic.prefix.all=["a","anti","auto","circum","contra","exo","fore","homo","hyper","in","mega","mini","mis","non","omni","pseudo","psycho","pyro","semi","sub","super","trans","un","uni"].concat(dic.prefix.position,dic.prefix.quantity);
dic.prefix.subs=["default"];
dic.prefix.filters=["position","quantity"];
var prepos={};
dic.prepos=prepos;
dic.prepos.space=["aboard","about","above","across","against","along","amid","among","around","as","at","behind","below","beneath","beside","besides","between","beyond","by","down","from","in","inside","into","near","of","off","on","onto","opposite","outside","over","past","round","through","to","toward","towards","under","underneath","up","upon","versus","via","with","within","without"];
dic.prepos.time=["after","before","despite","during","following","for","regarding","since","until"];
dic.prepos.all=[].concat(dic.prepos.space,dic.prepos.time);
dic.prepos.subs=["default"];
dic.prepos.filters=["space","time"];
var preposition={};
dic.preposition=preposition;
dic.preposition.all=["alongside","inside of","using","with","with the help of","without"].concat();
dic.preposition.subs=["default"];
dic.preposition.filters=[];
var pron={};
dic.pron=pron;
dic.pron.female=["her/she/herself/her/hers"];
dic.pron.male=["him/he/himself/his/his"];
dic.pron.neutral=["it/it/itself/its/its"];
dic.pron.all=[].concat(dic.pron.female,dic.pron.male,dic.pron.neutral);
dic.pron.subs=["acc","nom","self","poss","s"];
dic.pron.filters=["female","male","neutral"];
var quality={};
dic.quality=quality;
dic.quality.human=["age/older/younger/oldest","ethnicity/more ethnic/less ethnic/most ethnic","gender/sexier/more gender neutral/sexiest","honesty/more thuthful/less truthful/most truthful","race/racier/less racier/raciest"];
dic.quality.physical=["color/more colorful/duller/most colorful","force/harder/softer/hardest","girth/girthier/less girthy/girthiest","height/taller/shorter/tallest","length/longer/shorter/longest","luminosity/brighter/darker/brightest","power level/more powerful/weaker/most powerful","size/bigger/smaller/biggest","speed/faster/slower/fastest","weight/heavier/lighter/heaviest","wetness/wetter/drier/wettest","width/wider/skinnier/widest"];
dic.quality.all=[].concat(dic.quality.human,dic.quality.physical);
dic.quality.subs=["property","more","less","est"];
dic.quality.filters=["human","physical"];
var rel={};
dic.rel=rel;
dic.rel.female=["aunt/aunts","daddy/daddies","daughter/daughters","girl/girls","girlfriend/girlfriends","granddaughter/granddaughters","grandma/grandmas","mommy/mommies","mother/mothers","sister/sisters","stepmother/stepmothers","wife/wives","woman/women"];
dic.rel.male=["boy/boys","boyfriend/boyfriends","brother/brothers","father/fathers","godfather/godfathers","grandpa/grandpas","grandson/grandsons","husband/husbands","man/men","son/sons","stepfather/stepfathers","uncle/uncles"];
dic.rel.neutral=["baby/babies","boss/bosses","buddy/buddies","child/children","colleague/colleagues","cousin/cousins","fella/fellas","friend/friends","master/masters"];
dic.rel.all=[].concat(dic.rel.female,dic.rel.male,dic.rel.neutral);
dic.rel.subs=["singular","plural"];
dic.rel.filters=["female","male","neutral"];
var say={};
dic.say=say;
dic.say.all=["announce/announcing/announced/announces/announcer/announced/announcing","bawl/bawling/bawled/bawls/bawler/bawled/bawling","beep/beeping/beeped/beeps/beeper/beeped/beeping","breathe/breathing/breathed/breathes/breather/breathed/breathing","burp/burping/burped/burps/burper/burped/burping","cackle/cackling/cackled/cackles/cackler/cackled/cackling","call/calling/called/calls/caller/called/calling","croak/croaking/croaked/croaks/croaker/croaked/croaking","cry/crying/cried/cries/cryer/cried/crying","declare/declaring/declared/declares/declarer/declared/declaration","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","exclaim/exclaiming/exclaimed/exclaims/exclaimer/exclaimed/exclamation","grunt/grunting/grunted/grunts/grunter/grunted/grunting","hiss/hissing/hissed/hisses/hisser/hissed/hissing","hoot/hooting/hooted/hoots/hooter/hooted/hooting","laugh/laughing/laughed/laughs/laugher/laughed/laughter","moan/moaning/moaned/moans/moaner/moaned/moaning","mumble/mumbling/mumbled/mumbles/mumbler/mumbled/mumbling","mutter/muttering/muttered/mutters/mutterer/muttered/muttering","roar/roaring/roared/roars/roarer/roared/roaring","say/saying/said/says/sayer/said/saying","scream/screaming/screamed/screams/screamer/screamed/screaming","screech/screeching/screeched/screeches/screecher/screeched/screeching","shoot/shooting/shot/shoots/shooter/shot/shooting","shout/shouting/shouted/shouts/shouter/shouted/shouting","shriek/shrieking/shrieked/shrieks/shrieker/shrieked/shrieking","snap/snapping/snapped/snaps/snapper/snapped/snapping","snicker/snickering/snickered/snickers/snickerer/snickered/snickering","snort/snorting/snorted/snorts/snorter/snorted/snorting","spit/spitting/spat/spits/spitter/spat/spitting","squeal/squealing/squealed/squeals/squealer/squealed/squealing","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","swear/swearing/swore/swears/swearer/sworn/swearing","wail/wailing/wailed/wails/wailer/wailed/wailing","whimper/whimpering/whimpered/whimpers/whimperer/whimpered/whimpering","whine/whining/whined/whines/whiner/whined/whining","whisper/whispering/whispered/whispers/whisperer/whispered/whispering","yell/yelling/yelled/yells/yeller/yelled/yelling"].concat();
dic.say.subs=["simple","ing","ed","s","er","pp","noun"];
dic.say.filters=[];
var sconj={};
dic.sconj=sconj;
dic.sconj.all=["after","although","as","as if","as long as","as much as","as soon as","as though","because","before","even","even if","even though","if","if only","if then","if when","in order that","inasmuch","just as","lest","now","now since","now that","now when","once","provided","provided that","rather than","since","so that","supposing","than","that","though","til","unless","until","when","whenever","where","where if","whereas","wherever","whether","which","while","who","whoever","why"].concat();
dic.sconj.subs=["default"];
dic.sconj.filters=[];
var sound={};
dic.sound=sound;
dic.sound.all=["bang/bangs","beep/beeps","boom/booms","clang/clangs","crack/cracks","crash/crashes","flap/flaps","flutter/flutters","foom/fooms","note/notes","pop/pops","pound/pounds","rap/raps","roar/roars","rumble/rumbles","scrape/scrapes","screech/screeches","shatter/shatters","shudder/shudders","slap/slaps","squeal/squeals","squelch/squelches","swoosh/swooshes","tap/taps","thump/thumps","tick/ticks","toot/toots","wail/wails"].concat();
dic.sound.subs=["singular","plural"];
dic.sound.filters=[];
var substance={};
dic.substance=substance;
dic.substance.liquid=["acid","beer","blood","earwax","extra-virgin olive oil","gasoline","grease","ink","ketchup","lava","lemonade","liquid nitrogen","magma","mayonnaise","molten iron","mustard","oil","olive oil","orange juice","paint","plasma","sap","soy sauce","sweat","tears","tomato sauce","vinegar","vodka","vomit","water","wine","cum","lube","crotch juice","pee","piss","pisswater","diarrhea","jizz","urine"];
dic.substance.nsfw=["happiness","dick cheese"];
dic.substance.all=["antimatter","corn","dark matter","flour","oatmeal","sand","snow","spaghetti"].concat(dic.substance.liquid);
dic.substance.subs=["default"];
dic.substance.filters=["liquid","nsfw"];
var surname={};
dic.surname=surname;
dic.surname.all=["Adams","Allan","Allen","Anderson","Andrews","Avery","Bailey","Baker","Barron","Barry","Bauer","Baxter","Bell","Bennett","Bentley","Benton","Best","Bingley","Blackburn","Bond","Brooks","Brown","Bryant","Butler","Campbell","Carter","Chang","Chen","Church","Clark","Collins","Cook","Cooke","Cooper","Cox","Cyrus","Davis","Dick","Dudley","Edwards","Estes","Evans","Farrell","Foley","Forbes","Gamble","Garcia","Gay","Gentry","Glass","Glenn","Gonzalez","Gray","Green","Griff","Guthrie","Hall","Harris","Hartman","Hayne","Hendricks","Herman","Hernandez","Hewitt","Hill","Hinton","Horne","Howard","Howe","Huber","Hurst","Jackson","Jacobs","Jenkins","Johnson","Jones","Joyner","Kaye","Kelly","Kemp","Kerr","Key","King","Knox","Lee","Leon","Lewis","Little","Long","Lopez","Machler","Martin","Martinez","Maynard","McDonald","Meadows","Meyer","Middleton","Miller","Mitchell","Moore","Morgan","Morin","Morris","Mueller","Murdock","Murphy","Nelson","Nixon","Noel","Olson","Osborn","Palin","Parker","Peck","Pederson","Pennington","Perry","Petty","Phillips","Pollock","Pratt","Presley","Price","Prince","Randolph","Reed","Richardson","Rivera","Rivers","Roberts","Robinson","Rodriguez","Rogers","Rosario","Ross","Roth","Russell","Russo","Sampson","Sanchez","Sanders","Schroeder","Serrano","Sexton","Shaw","Simmons","Smith","Solomon","Stark","Stein","Sterling","Stewart","Stout","Strong","Taylor","Thomas","Thompson","Tillman","Torres","Turner","Underthun","Underwood","Vang","Vanyo","Velentine","Walker","Walls","Wang","Ward","Washington","Watson","Werdal","White","Wilson","Wood","Woodard","Wooten","Wright","Young"].concat();
dic.surname.subs=["default"];
dic.surname.filters=[];
var timeadv={};
dic.timeadv=timeadv;
dic.timeadv.frequency=["again","all the time","barely","biweekly","centenially","daily","every night","every now and then","every Tuesday","for 10 weeks","for 36 hours","frequently","from now on","hardly","instantly","never","never again","occasionally","often","on Mondays","once a month","once a week","once again","once in a while","perpetually","profusely","repeatedly","several times","sometimes","this time","until further notice","usually","yesterday"];
dic.timeadv.time=["a day ago","a month ago","a week ago","a year ago","an hour ago","billions of years ago","just 5 minutes ago","millions of years ago","trillions of years ago","now","presently","today","tonight","1 day later","1 hour later","1 month later","1 week later","10 years later","5 minutes later","5 years later","6 months later","a year later","at sunrise","at sunset","at the full moon","later","recently"];
dic.timeadv.past=["a day ago","a month ago","a week ago","a year ago","an hour ago","billions of years ago","just 5 minutes ago","millions of years ago","trillions of years ago"];
dic.timeadv.present=["now","presently","today","tonight"];
dic.timeadv.all=[].concat(dic.timeadv.frequency,dic.timeadv.time,dic.timeadv.past,dic.timeadv.present);
dic.timeadv.subs=["default"];
dic.timeadv.filters=["frequency","time","past","present"];
var timenoun={};
dic.timenoun=timenoun;
dic.timenoun.dayofweek=["Friday/Fridays","Monday/Mondays","Saturday/Saturdays","Sunday/Sundays","Thursday/Thursdays","Tuesday/Tuesdays","Wednesday/Wednesdays"];
dic.timenoun.holiday=["Black Friday/Black Fridays","Boxing Day/Boxing Days","Christmas/Christmasses","Easter/Easters","Father's Day/Father's Days","Groundhog Day/Groundhog Days","Halloween/Halloweens","Hanukkah/Hanukkahs","Kwanzaa/Kwanzaas","Labor Day/Labor Days","Labor Day/Labor Days","Mother's Day/Mother's Days","New Year's Day/New Year's Days","New Year's Eve/New Year's Eves","Thanksgiving/Thanksgivings","Valentine's Day/Valentine's Days"];
dic.timenoun.month=["April/Aprils","August/Augusts","December/Decembers","February/Februaries","January/Januaries","July/Julies","June/Junes","March/Marches","May/Mays","November/Novembers","October/Octobers","September/Septembers"];
dic.timenoun.timeofday=["afternoon/afternoons","dawn/dawns","day/days","dusk/dusks","evening/evenings","midnight/midnights","morning/mornings","night/nights","noon/noons"];
dic.timenoun.unit=["century/centuries","day/days","hour/hours","millisecond/milliseconds","minute/minutes","month/months","second/seconds","year/years"];
dic.timenoun.all=[].concat(dic.timenoun.dayofweek,dic.timenoun.holiday,dic.timenoun.month,dic.timenoun.timeofday,dic.timenoun.unit);
dic.timenoun.subs=["singular","plural"];
dic.timenoun.filters=["dayofweek","holiday","month","timeofday","unit"];
var title={};
dic.title=title;
dic.title.all=["Colonel","Daddy","Dojo","Dr.","Governor","Granny","Honorable","King","Madam","Mama","Master","Mayor","Mistress","Moist","Mr.","Mrs.","Ms","Old","Papa","Prince","Professor","Queen","Sensei","Sergeant","Sir"].concat();
dic.title.subs=["default"];
dic.title.filters=[];
var unit={};
dic.unit=unit;
dic.unit.energy=["kilojoule/kilojoules/kJ","joule/joules/J"];
dic.unit.factor=["kilojoule/kilojoules/kJ","centimeter/centimeters/cm","kilometer/kilometers/km","milliliter/milliliters/mL","kilogram/kilograms/kg","megaton/megatons/Mt"];
dic.unit.large=["kilojoule/kilojoules/kJ","kilometer/kilometers/km","kilogram/kilograms/kg","megaton/megatons/Mt"];
dic.unit.potential=["kilovolt/kilovolts/kV","millivolt/millivolts/mV"];
dic.unit.power=["kilowatt/kilowatts/kW","megawatt/megawatts/MW","milliwatt/milliwatts/mW"];
dic.unit.capacitance=["microfarad/microfarads/μF"];
dic.unit.current=["milliampere/milliamperes/mA"];
dic.unit.small=["centimeter/centimeters/cm","milliliter/milliliters/mL"];
dic.unit.length=["foot/feet/ft","inch/inches/in","light-year/light-years/ly","meter/meters/m","mile/miles/mi","yard/yards/y"];
dic.unit.volume=["bucket/buckets/bucket","cubic centimeter/cubic centimeters/cc","cup/cups/c","gallon/gallons/gal","liter/liters/L","pint/pints/pt","quart/quarts/qt","tablespoon/tablespoons/tbsp","teaspoon/teaspoons/tsp"];
dic.unit.weight=["gram/grams/g","ounce/ounces/oz","pound/pounds/lb","ton/tons/t"];
dic.unit.all=[].concat(dic.unit.energy,dic.unit.factor,dic.unit.large,dic.unit.potential,dic.unit.power,dic.unit.capacitance,dic.unit.current,dic.unit.small,dic.unit.length,dic.unit.volume,dic.unit.weight);
dic.unit.subs=["singular","plural","abbr"];
dic.unit.filters=["energy","factor","large","potential","power","capacitance","current","small","length","volume","weight"];
var verb={};
dic.verb=verb;
dic.verb.transitive=["chew/chewing/chewed/chews/chewer/chewed/chewing","eat/eating/ate/eats/eater/eaten/eating","masticate/masticating/masticated/masticates/masticater/masticated/mastication","feed/feeding/fed/feeds/feeder/fed/feeding","plunge/plunging/plunged/plunges/plunger/plunged/plunging","ram/ramming/rammed/rams/rammer/rammed/ramming","bake/baking/baked/bakes/baker/baked/baking","bathe/bathing/bathed/bathes/bather/bathed/bathing","boil/boiling/boiled/boils/boiler/boiled/boiling","breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding","burn/burning/burned/burns/burner/burnt/burning","cook/cooking/cooked/cooks/cooker/cooked/cooking","cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling","cut/cutting/cut/cuts/cutter/cut/cutting","dig/digging/dug/digs/digger/dug/digging","fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling","flatten/flattening/flattened/flattens/flattener/flattened/flattening","flick/flicking/flicked/flicks/flicker/flicked/flicking","freeze/freezing/froze/freezes/freezer/frozen/freezing","hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping","jerk/jerking/jerked/jerks/jerker/jerked/jerking","kiss/kissing/kissed/kisses/kisser/kissed/kissing","moan/moaning/moaned/moans/moaner/moaned/moaning","plaster/plastering/plastered/plasters/plasterer/plastered/plastering","pull/pulling/pulled/pulls/puller/pulled/pulling","rattle/rattling/rattled/rattles/rattler/rattled/rattling","roll/rolling/rolled/rolls/roller/rolled/rolling","rot/rotting/rotted/rots/rotter/rotten/rotting","rustle/rustling/rustled/rustles/rustler/rustled/rustling","scorch/scorching/scorched/scorches/scorcher/scorched/scorching","scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing","sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture","shave/shaving/shaved/shaves/shaver/shaved/shaving","smoke/smoking/smoked/smokes/smoker/smoked/smoking","snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling","soak/soaking/soaked/soaks/soaker/soaked/soaking","strain/straining/strained/strains/strainer/strained/straining","swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing","tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling","vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration","waste/wasting/wasted/wastes/waster/wasted/wasting","yank/yanking/yanked/yanks/yanker/yanked/yanking","convict/convicting/convicted/convicts/convicter/convicted/conviction","legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization","prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution","sue/suing/sued/sues/suer/sued/suing","jet-spray/jet-spraying/jet-sprayed/jet-sprays/jet-sprayer/jet-sprayed/jet-spraying","pour/pouring/poured/pours/pourer/poured/pouring","shower/showering/showered/showers/showerer/showered/showering","smear/smearing/smeared/smears/smearer/smeared/smearing","splatter/splattering/splattered/splatters/splatterer/splattered/splattering","spray/spraying/sprayed/sprays/sprayer/sprayed/spraying","articulate/articulating/articulated/articulates/articulator/articulated/articulation","barbeque/barbequing/barbequed/barbeques/barbequer/barbequed/barbequing","blast/blasting/blasted/blasts/blaster/blasted/blasting","caress/caressing/caressed/caresses/caresser/caressed/caressing","chop/chopping/chopped/chops/chopper/chopped/chopping","clean/cleaning/cleaned/cleans/cleaner/cleaned/cleaning","click/clicking/clicked/clicks/clicker/clicked/clicking","clip/clipping/clipped/clips/clipper/clipped/clipping","crumple/crumpling/crumpled/crumples/crumpler/crumpled/crumpling","crush/crushing/crushed/crushes/crusher/crushed/crushing","cultivate/cultivating/cultivated/cultivates/cultivater/cultivated/cultivation","deep-fry/deep-frying/deep-fried/deep-fries/deep-frier/deep-fried/deep-frying","dice/dicing/diced/dices/dicer/diced/dicing","discipline/disciplining/disciplined/disciplines/discipliner/disciplined/discipline","dishonor/dishonoring/dishonored/dishonors/dishonorer/dishonored/dishonoring","draft/drafting/drafted/drafts/drafter/drafted/drafting","dry-freeze/dry-freezing/dry-froze/dry-freezes/dry-freezer/dry-frozen/dry-freezing","eliminate/eliminating/eliminated/eliminates/eliminater/eliminated/elimination","embrace/embracing/embraced/embraces/embracer/embraced/embrace","examine/examining/examined/examines/examiner/examined/examination","exploit/exploiting/exploited/exploits/exploiter/exploited/exploitation","extend/extending/extended/extends/extender/extended/extending","extrapolate/extrapolating/extrapolated/extrapolates/extrapolator/extrapolated/extrapolation","extrude/extruding/extruded/extrudes/extruder/extruded/extruding","fight/fighting/fought/fights/fighter/fighted/fighting","flap/flapping/flapped/flaps/flapper/flapped/flapping","gargle/gargling/gargled/gargles/gargler/gargled/gargling","glue/gluing/glued/glues/gluer/glued/gluing","grate/grating/grated/grates/grater/grated/grating","grind/grinding/grinded/grinds/grinder/ground/grinding","grip/gripping/gripped/grips/gripper/gripped/gripping","groom/grooming/groomed/grooms/groomer/groomed/grooming","handle/handling/handled/handles/handler/handled/handling","hug/hugging/hugged/hugs/hugger/hugged/hugging","hunt/hunting/hunted/hunts/hunter/hunted/hunting","hypnotize/hypnotizing/hypnotized/hypnotizes/hypnotist/hypnotized/hypnosis","infest/infesting/infested/infests/infester/infested/infestation","invigorate/invigorating/invigorated/invigorates/invigorator/invigorated/invigoration","iron/ironing/ironed/irons/ironer/ironed/ironing","kill/killing/killed/kills/killer/killed/killing","loosen/loosening/loosened/loosens/loosener/loosened/loosening","manipulate/manipulating/manipulated/manipulates/manipulator/manipulated/manipulation","marinate/marinating/marinated/marinates/marinater/marinated/marination","massage/massaging/massaged/massages/massager/massaged/massage","mist/misting/misted/mists/mister/misted/misting","misuse/misusing/misused/misuses/misuser/misused/misuse","moisten/moistening/moistened/moistens/moistener/moistened/moisturization","oil/oiling/oiled/oils/oiler/oiled/oiling","organize/organizing/organized/organizes/organizer/organized/organization","penetrate/penetrating/penetrated/penetrates/penetrator/penetrated/penetration","pickle/pickling/pickled/pickles/pickler/pickled/pickling","pillage/pillaging/pillaged/pillages/pillager/pillaged/pillaging","polish/polishing/polished/polishes/polisher/polished/polishing","pop/popping/popped/pops/popper/popped/popping","probe/probing/probed/probes/proper/probed/probing","puff/puffing/puffed/puffs/puffer/puffed/puffing","punish/punishing/punished/punishes/punisher/punished/punishment","quantify/quantifying/quantified/quantifies/quantifier/quantified/quantification","recycle/recycling/recycled/recycles/recycler/recycled/recycling","rub/rubbing/rubbed/rubs/rubber/rubbed/rubbing","salt/salting/salted/salts/salter/salted/salting","sanitize/sanitizing/sanitized/sanitizes/sanitizer/sanitized/sanitization","scold/scolding/scolded/scolds/scolder/scolded/scolding","scrunch/scrunching/scrunched/scrunches/scruncher/scrunched/scrunching","season/seasoning/seasoned/seasons/seasoner/seasoned/seasoning","slit/slitting/slit/slits/slitter/slit/slitting","squeeze/squeezing/squeezed/squeezes/squeezer/squeezed/squeezing","squelch/squelching/squelched/squelches/squelcher/squelched/squelching","stew/stewing/stewed/stews/stewer/stewed/stewing","stimulate/stimulating/stimulated/stimulates/stimulator/stimulated/stimulation","stir/stirring/stirred/stirs/stirrer/stirred/stirring","strap/strapping/strapped/straps/strapper/strapped/strapping","strategize/strategizing/strategized/strategizes/strategizer/strategized/strategizing","streamline/streamlining/streamlined/streamlines/streamliner/streamlined/streamlining","strike/striking/struck/strikes/striker/stricken/striking","stuff/stuffing/stuffed/stuffs/stuffer/stuffed/stuffing","suckle/suckling/suckled/suckles/suckler/suckled/suckling","superglue/supergluing/superglued/superglues/supergluer/superglued/supergluing","swipe/swiping/swiped/swipes/swiper/swiped/swiping","tap/tapping/tapped/taps/tapper/tapped/tapping","tape/taping/taped/tapes/taper/taped/taping","tighten/tightening/tightened/tightens/tightener/tightened/tightening","toke/toking/toked/tokes/toker/toked/toking","touch/touching/touched/touches/toucher/touched/touching","transcribe/transcribing/transcribed/transcribes/transcriber/transcribed/transcribing","tune/tuning/tuned/tunes/tuner/tuned/tunings","uproot/uprooting/uprooted/uproots/uprooter/uprooted/uprooting","withdraw/withdrawing/withdrew/withdraws/withdrawer/withdrawn/withdrawing","wrinkle/wrinkling/wrinkled/wrinkles/wrinkler/wrinkled/wrinkling","zip/zipping/zipped/zips/zipper/zipped/zipping","cripple/crippling/crippled/cripples/crippler/crippled/crippling","harass/harassing/harassed/harasses/harasser/harassed/harassment","liquefy/liquefying/liquefied/liquefies/liquefier/liquefied/liquefication","nab/nabbing/nabbed/nabs/nabber/nabbed/nabbing","nail/nailing/nailed/nails/nailer/nailed/nailing","rob/robbing/robbed/robs/robber/robbed/robbery","shred/shredding/shredded/shreds/shredder/shredded/shredding","vaporize/vaporizing/vaporized/vaporizes/vaporizer/vaporized/vaporization","snoop/snooping/snooped/snoops/snooper/snooped/snooping","erect/erecting/erected/erects/erector/erected/erection","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","fertilize/fertilizing/fertilized/fertilizes/fertilizer/fertilized/fertilization","please/pleasing/pleased/pleases/pleaser/pleasted/pleasing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","mount/mounting/mounted/mounts/mounter/mounted/mounting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","fellate/fellating/fellated/fellates/fellater/fellated/fellatio","titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking","turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification","grope/groping/groped/gropes/groper/groped/groping","defecate/defecating/defecated/defecates/defecator/defecated/defecation","finger/fingering/fingered/fingers/fingerer/fingered/fingering"];
dic.verb.intransitive=["lick/licking/licked/licks/licker/licked/licking","slurp/slurping/slurped/slurps/slurper/slurped/slurping","snort/snorting/snorted/snorts/snorter/snorted/snorting","snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling","crouch/crouching/crouched/crouches/croucher/crouched/crouching","lay/laying/laid/lays/layer/laid/laying","sit/sitting/sat/sits/sitter/sat/sitting","squat/squatting/squatted/squats/squatter/squatted/squatting","stand/standing/stood/stands/stander/stood/standing","fume/fuming/fumed/fumes/fumer/fumed/fuming","lather/lathering/lathered/lathers/latherer/lathered/lathering","pray/praying/prayed/prays/prayer/prayed/prayer","bake/baking/baked/bakes/baker/baked/baking","bathe/bathing/bathed/bathes/bather/bathed/bathing","boil/boiling/boiled/boils/boiler/boiled/boiling","breastfeed/breastfeeding/breastfed/breastfeeds/breastfeeder/breastfed/breastfeeding","burn/burning/burned/burns/burner/burnt/burning","cook/cooking/cooked/cooks/cooker/cooked/cooking","cuddle/cuddling/cuddled/cuddles/cuddler/cuddled/cuddling","cut/cutting/cut/cuts/cutter/cut/cutting","dig/digging/dug/digs/digger/dug/digging","fiddle/fiddling/fiddled/fiddles/fiddler/fiddled/fiddling","flatten/flattening/flattened/flattens/flattener/flattened/flattening","flick/flicking/flicked/flicks/flicker/flicked/flicking","freeze/freezing/froze/freezes/freezer/frozen/freezing","hiccup/hiccuping/hiccuped/hiccups/hiccuper/hiccuped/hiccuping","jerk/jerking/jerked/jerks/jerker/jerked/jerking","kiss/kissing/kissed/kisses/kisser/kissed/kissing","moan/moaning/moaned/moans/moaner/moaned/moaning","plaster/plastering/plastered/plasters/plasterer/plastered/plastering","pull/pulling/pulled/pulls/puller/pulled/pulling","rattle/rattling/rattled/rattles/rattler/rattled/rattling","roll/rolling/rolled/rolls/roller/rolled/rolling","rot/rotting/rotted/rots/rotter/rotten/rotting","rustle/rustling/rustled/rustles/rustler/rustled/rustling","scorch/scorching/scorched/scorches/scorcher/scorched/scorching","scrub/scrubbing/scrubbed/scrubs/scrubber/scrubbed/scrubbing","sculpt/sculpting/sculpted/sculpts/sculptor/sculpted/sculpture","shave/shaving/shaved/shaves/shaver/shaved/shaving","smoke/smoking/smoked/smokes/smoker/smoked/smoking","snuggle/snuggling/snuggled/snuggles/snuggler/snuggled/snuggling","soak/soaking/soaked/soaks/soaker/soaked/soaking","strain/straining/strained/strains/strainer/strained/straining","swallow/swallowing/swallowed/swallows/swallower/swallowed/swallowing","tinkle/tinkling/tinkled/tinkles/tinkler/tinkled/tinkling","vibrate/vibrating/vibrated/vibrates/vibrator/vibrated/vibration","waste/wasting/wasted/wastes/waster/wasted/wasting","yank/yanking/yanked/yanks/yanker/yanked/yanking","drain/draining/drained/drains/drainer/drained/draining","drip/dripping/dripped/drips/dripper/dripped/dripping","paint/painting/painted/paints/painter/painted/painting","piss/pissing/pissed/pisses/pisser/pissed/pissing","splash/splashing/splashed/splashes/splasher/splashed/splashing","sprinkle/sprinkling/sprinkled/sprinkles/sprinkler/sprinkled/sprinkling","spurt/spurting/spurted/spurts/spurter/spurted/spurting","sputter/sputtering/sputtered/sputters/sputterer/sputtered/sputtering","squirt/squirting/squirted/squirts/squirter/squirted/squirting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration","twerk/twerking/twerked/twerks/twerker/twerked/twerking","defecate/defecating/defecated/defecates/defecator/defecated/defecation","urinate/urinating/urinated/urinates/urinator/urinated/urination"];
dic.verb.eat=["lick/licking/licked/licks/licker/licked/licking","slurp/slurping/slurped/slurps/slurper/slurped/slurping","snort/snorting/snorted/snorts/snorter/snorted/snorting","snuffle/snuffling/snuffled/snuffles/snuffler/snuffled/snuffling","sniff/sniffing/sniffed/sniffs/sniffer/sniffed/sniffing","nip/nipping/nipped/nips/nipper/nipped/nipping"];
dic.verb.pose=["crouch/crouching/crouched/crouches/croucher/crouched/crouching","lay/laying/laid/lays/layer/laid/laying","sit/sitting/sat/sits/sitter/sat/sitting","squat/squatting/squatted/squats/squatter/squatted/squatting","stand/standing/stood/stands/stander/stood/standing"];
dic.verb.like=["like/liking/liked/likes/liker/liked/like","need/needing/needed/needs/needer/needed/need","want/wanting/wanted/wants/wanter/wanted/want"];
dic.verb.dislike=["loathe/loathing/loathed/loathes/loather/loathed/loathe","dislike/disliking/disliked/dislikes/disliker/disliked/dislike","despise/despising/despised/despises/despiser/despised/despise"];
dic.verb.climb=["climb/climbing/climbed/climbes/climber/climbed/climbing","descend/descending/descended/descends/descender/descended/descending"];
dic.verb.up=["climb/climbing/climbed/climbes/climber/climbed/climbing"];
dic.verb.down=["descend/descending/descended/descends/descender/descended/descending"];
dic.verb.motion=["cram/cramming/crammed/crams/crammer/crammed/cramming","inject/injecting/injected/injects/injector/injected/injection","poke/poking/poked/pokes/poker/poked/poking","prod/prodding/prodded/prods/prodder/prodded/prodding","screw/screwing/screwed/screws/screwer/screwed/screwing","stick/sticking/stuck/sticks/sticker/stuck/sticking","wedge/wedging/wedged/wedges/wedger/wedged/wedging","bang/banging/banged/bangs/banger/banged/banging","bind/binding/bound/binds/binder/bound/binding","blow/blowing/blew/blows/blower/blown/blowing","crank/cranking/cranked/cranks/cranker/cranked/cranking","crunch/crunching/crunched/crunches/cruncher/crunched/crunching","eject/ejecting/ejected/ejects/ejector/ejected/ejection","fly/flying/flew/flies/flier/flown/flying","force/forcing/forced/forces/forcer/forced/forcing","hack/hacking/hacked/hacks/hacker/hacked/hacking","hurl/hurling/hurled/hurls/hurler/hurled/hurling","kick/kicking/kicked/kicks/kicker/kicked/kicking","knead/kneading/kneaded/kneads/kneader/kneaded/kneading","move/moving/moved/moves/mover/moved/moving","press/pressing/pressed/presses/presser/pressed/pressing","pump/pumping/pumped/pumps/pumper/pumped/pumping","rip/ripping/ripped/rips/ripper/ripped/ripping","serve/serving/served/serves/server/served/serving","shake/shaking/shook/shakes/shaker/shaken/shaking","shoot/shooting/shot/shoots/shooter/shot/shooting","slam/slamming/slammed/slams/slammer/slammed/slamming","slip/slipping/slipped/slips/slipper/slipped/slipping","smack/smacking/smacked/smacks/smacker/smacked/smacking","squish/squishing/squished/squishes/squisher/squished/squishing","staple/stapling/stapled/staples/stapler/stapled/stapling","stomp/stomping/stomped/stomps/stomper/stomped/stomping","throw/throwing/threw/throws/thrower/thrown/throwing","tremble/trembling/trembled/trembles/trembler/trembled/trembling","twang/twanging/twanged/twangs/twanger/twanged/twanging","twist/twisting/twisted/twists/twister/twisted/twisting","waddle/waddling/waddled/woddles/woddler/waddled/waddling","wiggle/wiggling/wiggled/wiggles/wiggler/wiggled/wiggling","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration","twerk/twerking/twerked/twerks/twerker/twerked/twerking"];
dic.verb.insert=["cram/cramming/crammed/crams/crammer/crammed/cramming","inject/injecting/injected/injects/injector/injected/injection","poke/poking/poked/pokes/poker/poked/poking","prod/prodding/prodded/prods/prodder/prodded/prodding","screw/screwing/screwed/screws/screwer/screwed/screwing","stick/sticking/stuck/sticks/sticker/stuck/sticking","wedge/wedging/wedged/wedges/wedger/wedged/wedging","feed/feeding/fed/feeds/feeder/fed/feeding","plunge/plunging/plunged/plunges/plunger/plunged/plunging","ram/ramming/rammed/rams/rammer/rammed/ramming","nail/nailing/nailed/nails/nailer/nailed/nailing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting"];
dic.verb.political=["amend/amending/amended/amends/amender/amended/amendment","elect/electing/elected/elects/electer/elected/election","impeach/impeaching/impeached/impeaches/impeacher/impeached/impeachment","inaugurate/inaugurating/inaugurated/inaugurates/inaugurater/inaugurated/inauguration","ratify/ratifying/ratified/ratifies/ratifier/ratified/ratification","veto/vetoing/vetoed/vetoes/vetoer/vetoed/vetoing"];
dic.verb.move=["push/pushing/pushed/pushes/pusher/pushed/pushing","gyrate/gyrating/gyrated/gyrates/gyrator/gyrated/gyration"];
dic.verb.legal=["convict/convicting/convicted/convicts/convicter/convicted/conviction","legalize/legalizing/legalized/legalizes/legalizer/legalized/legalization","prosecute/prosecuting/prosecuted/prosecutes/prosecuter/prosecuted/prosecution","sue/suing/sued/sues/suer/sued/suing"];
dic.verb.liquid=["jet-spray/jet-spraying/jet-sprayed/jet-sprays/jet-sprayer/jet-sprayed/jet-spraying","pour/pouring/poured/pours/pourer/poured/pouring","shower/showering/showered/showers/showerer/showered/showering","smear/smearing/smeared/smears/smearer/smeared/smearing","splatter/splattering/splattered/splatters/splatterer/splattered/splattering","spray/spraying/sprayed/sprays/sprayer/sprayed/spraying","cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","defecate/defecating/defecated/defecates/defecator/defecated/defecation","urinate/urinating/urinated/urinates/urinator/urinated/urination"];
dic.verb.violent=["amputate/amputating/amputated/amputates/amputator/amputated/amputation","assault/assaulting/assaulted/assaults/assaulter/assaulted/assault","attack/attacking/attacked/attacks/attacker/attacked/attack","bite/biting/bit/bites/biter/bitten/biting","bludgeon/bludgeoning/bludgeoned/bludgeons/bludgeoner/bludgeoned/bludgeoning","cremate/cremating/cremated/cremates/cremater/cremated/cremation","dangle/dangling/dangled/dangles/dangler/dangled/dangling","dominate/dominating/dominated/dominates/dominator/dominated/domination","explode/exploding/exploded/explodes/exploder/exploded/explosion","fart/farting/farted/farts/farter/farted/farting","gouge/gouging/gouged/gouges/gouger/gouged/gouging","grab/grabbing/grabbed/grabs/grabber/grabbed/grabbing","hammer/hammering/hammered/hammers/hammerer/hammered/hammering","hang/hanging/hung/hangs/hanger/hanged/hanging","headbutt/headbutting/headbutted/headbutts/headbutter/headbutted/headbutting","injure/injuring/injured/injures/injurer/injured/injury","kidnap/kidnapping/kidnapped/kidnaps/kidnapper/kidnapped/kidnapping","maim/maiming/maimed/maims/maimer/maimed/maiming","manhandle/manhandling/manhandled/manhandles/manhandler/manhandled/manhandling","pinch/pinching/pinched/pinches/pincher/pinched/pinching","pluck/plucking/plucked/plucks/plucker/plucked/plucking","punch/punching/punched/punches/puncher/punched/punching","scratch/scratching/scratched/scratches/scratcher/scratched/scratching","shove/shoving/shoved/shoves/shover/shoved/shoving","slap/slapping/slapped/slaps/slapper/slapped/slapping","slash/slashing/slashed/slashes/slasher/slashed/slashing","snip/snipping/snipped/snips/snipper/snipped/snipping","spank/spanking/spanked/spanks/spanker/spanked/spanking","throttle/throttling/throttled/throttles/throttler/throttled/throttling","tickle/tickling/tickled/tickles/tickler/tickled/tickling","vomit/vomiting/vomited/vomits/vomiter/vomited/vomiting","whip/whipping/whipped/whips/whipper/whipped/whipping","grope/groping/groped/gropes/groper/groped/groping"];
dic.verb.death=["behead/beheading/beheaded/beheads/beheader/beheaded/beheading","decapitate/decapitating/decapitated/decapitates/decapitater/decapitated/decapitation","dissect/dissecting/dissected/dissects/dissector/dissected/dissection","electrocute/electrocuting/electrocuted/electrocutes/electrocuter/electrocuted/electrocution","impale/impaling/impaled/impales/impaler/impaled/impalement","implode/imploding/imploded/implodes/imploder/imploded/implosion","mangle/mangling/mangled/mangles/mangler/mangled/mangling","maul/mauling/mauled/mauls/mauler/mauled/mauling","mutilate/mutilating/mutilated/mutilates/mutilater/mutilated/mutilation","pierce/piercing/pierced/pierces/piercer/pierced/piercing","shatter/shattering/shattered/shatters/shatterer/shattered/shattering","skewer/skewering/skewered/skewers/skewerer/skewered/skewering","stab/stabbing/stabbed/stabs/stabber/stabbed/stabbing","strangle/strangling/strangled/strangles/strangler/strangled/strangulation"];
dic.verb.defeat=["defeat/defeating/defeated/defeat/defeater/defeaten/defeating","vanquish/vanquishing/vanquished/vanquish/vanquisher/vanquished/vanquishing"];
dic.verb.victory=["beat/beating/beat/beat/beater/beat/beating","succeed/succeeding/succeeded/succeed/succeeder/succeeded/succeeding"];
dic.verb.walk=["crawl/crawling/crawled/crawls/crawler/crawled/crawling","gallop/galloping/galloped/gallops/galloper/galloped/galloping","joust/jousting/jousted/jousts/jouster/jousted/jousting","march/marching/marched/marches/marcher/marched/marching","run/running/ran/runs/runner/run/running","skip/skipping/skipped/skips/skipper/skipped/skipping","sleepwalk/sleepwalking/sleepwalked/sleepwalks/sleepwalker/sleepwalked/sleepwalking","slouch/slouching/slouched/slouches/sloucher/slouched/slouching","sprint/sprinting/sprinted/sprints/sprinter/sprinted/sprinting","stampede/stampeding/stampeded/stampedes/stampeder/stampeded/stampeding","strut/strutting/strutted/struts/strutter/strutted/strutting","tiptoe/tiptoeing/tiptoed/tiptoes/tiptoer/tiptoed/tiptoeing","trot/trotting/trotted/trots/trotter/trotted/trotting","walk/walking/walked/walks/walker/walked/walking"];
dic.verb.sex=["cockblast/cockblasting/cockflasted/cockblasts/cockblaster/cockblasted/cockblasting","ejaculate/ejaculating/ejaculated/ejaculates/ejaculator/ejaculated/ejaculation","please/pleasing/pleased/pleases/pleaser/pleasted/pleasing","thrust/thrusting/thrust/thrusts/thruster/thrusted/thrusting","mount/mounting/mounted/mounts/mounter/mounted/mounting","fuck/fucking/fucked/fucks/fucker/fucked/fucking","masturbate/masturbating/masturbated/masturbates/masturbator/masturbated/masturbation","fellate/fellating/fellated/fellates/fellater/fellated/fellatio","titfuck/titfucking/titfucked/titucks/titfucker/titfucked/titfucking","turbohump/turbohumping/turbohumped/turbohumps/turbohumper/turbohumped/turbohumpification"];
dic.verb.all=["abduct/abducting/abducted/abducts/abductor/abducted/abduction","abolish/abolishing/abolished/abolishes/abolisher/abolished/abolishment","apprehend/apprehending/apprehended/apprehends/apprehender/apprehended/apprehension","authenticate/authenticating/authenticated/authenticates/authenticator/authenticated/authentication","bless/blessing/blessed/blesses/blesser/blessed/blessing","chill/chilling/chilled/chills/chiller/chilled/chilling","choke/choking/choked/chokes/choker/choked/choking","commandeer/commandeering/commandeered/commandeers/commandeerer/commandeered/commandeering","conserve/conserving/conserved/conserves/conserver/conserved/conservation","crash/crashing/crashed/crashes/crasher/crashed/crashing","customize/customizing/customized/customizes/customizer/customized/customization","decorate/decorating/decorated/decorates/decorator/decorated/decoration","donate/donating/donated/donates/donater/donated/donation","dramatize/dramatizing/dramatized/dramatizes/dramatizer/dramatized/dramatization","forecast/forecasting/forecasted/forecasts/forecaster/forecasted/forecasting","hoist/hostng/hoisted/hoists/hoister/hoisted/hoisting","jimmy/jimmying/jimmied/jimmies/jimmier/jimmied/jimmying","jingle/jingling/jingled/jingles/jingler/jingled/jingling","lecture/lecturing/lectured/lectures/lecturer/lectured/lecturing","liquidate/liquidating/liquidated/liquidates/liquidator/liquidated/liquidation","petition/petitioning/petitioned/petitions/petitioner/petitioned/petitioning","preen/preening/preened/preens/preener/preened/preening","purify/purifying/purified/purifies/purifier/purified/purification","rapture/rapturing/raptured/raptures/rapturer/raptured/rapture","report/reporting/reported/reports/reporter/reported/reporting","ride/riding/rode/rides/rider/ridden/riding","sharpen/sharpening/sharpened/sharpens/sharpener/sharpened/sharpening","spelunk/spelunking/spelunked/spelunks/spelunker/spelunked/spelunking","toast/toasting/toasted/toasts/toaster/toasted/toasting","whisper/whispering/whispered/whispers/whisperer/whispered/whispering"].concat(dic.verb.transitive,dic.verb.intransitive,dic.verb.eat,dic.verb.pose,dic.verb.like,dic.verb.dislike,dic.verb.climb,dic.verb.up,dic.verb.down,dic.verb.motion,dic.verb.insert,dic.verb.political,dic.verb.move,dic.verb.legal,dic.verb.liquid,dic.verb.violent,dic.verb.death,dic.verb.defeat,dic.verb.victory,dic.verb.walk,dic.verb.sex);
dic.verb.subs=["simple","ing","ed","s","er","pp","noun"];
dic.verb.filters=["transitive","intransitive","eat","pose","like","dislike","climb","up","down","motion","insert","political","move","legal","liquid","violent","death","defeat","victory","walk","sex"];
var verbimg={};
dic.verbimg=verbimg;
dic.verbimg.all=["blacken/blackening/blackened/blackens/blackener","bleed/bleeding/bled/bleeds/bleeder","bloat/bloating/bloated/bloats/bloater","bloom/blooming/bloomed/blooms/bloomer","blossom/blossoming/blossomed/blossoms/blossomer","bubble/bubbling/bubbled/bubbles/bubbler","burn/burning/burned/burns/burner","churn/churning/churned/churns/churner","crack/cracking/cracked/cracks/cracker","crumple/crumpling/crumpled/crumples/crumpler","darken/darkening/darkened/darkens/darkener","fester/festering/festered/festers/festerer","fizz/fizzing/fizzed/fizzes/fizzer","flap/flapping/flapped/flaps/flapper","flash/flashing/flashed/flashes/flasher","flutter/fluttering/fluttered/flutters/flutterer","froth/frothing/frothed/froths/frother","gleam/gleaming/gleamed/gleams/gleamer","glow/glowing/glowed/glows/glower","grow/growing/grew/grows/grower","harden/hardening/hardened/hardens/hardener","lighten/lightening/lightened/lightens/lightener","radiate/radiating/radiated/radiates/radiator","ripple/rippling/rippled/ripples/rippler","rise/rising/rose/rises/riser","shake/shaking/shook/shakes/shaker","shimmer/shimmering/shimmered/shimmers/shimmerer","shine/shining/shone/shines/shiner","shiver/shivering/shivered/shivers/shiverer","shrink/shrinking/shrunk/shrinks/shrinker","shudder/shuddering/shuddered/shudders/shudderer","smolder/smoldering/smoldered/smolders/smolderer","soften/softening/softened/softens/softener","sparkle/sparkling/sparkled/sparkles/sparkler","steam/steaming/steamed/steams/steamer","twinkle/twinkling/twinkled/twinkles/twinkler","twist/twisting/twisted/twists/twister","wave/waving/waved/waves/waver","whiten/whitening/whitened/whitens/whitener","wiggle/wiggling/wiggled/wiggles/wiggler","wilt/wilting/wilted/wilts/wilter"].concat();
dic.verbimg.subs=["normal","ing","ed","s","er"];
dic.verbimg.filters=[];
var vocal={};
dic.vocal=vocal;
dic.vocal.all=["aargh","ahem","ahhhh","boo hoo","eeeeeeee","eeek","ha ha ha","mmmmmm","muahahaha","oof","oooh","ouch","ugh","uhhhm","wow","yikes"].concat();
dic.vocal.subs=["default"];
dic.vocal.filters=[];
var x={};
dic.x=x;
dic.x.all=["ahhhhh mahh gahh","alas","aw shucks","awesome","beautiful","Bingo","boy oh boy oh boy","bravo","by golly","damn","dear dear","dear me","disgraceful","epic","ermahgerd","excellent","finish him","gasp","geez","good heavens","good lord","hella good","holy cow","holy moley","hurrah","I'll be damned","I'm gonna faint","jolly good","K.O.","LOL","mine eyes are deceiving me","my leg","my my","my oh my","no way","oh boy","oh dear","oh glorious day","oh gog","oh hell yes","oh joy","oh my","oh my goodness","oh wow","oho","omgomgomg","rats","ROFL","run for your lives","thanks, Obama","this can't be","this is delicious","this is the end","trololol","what","what in the world","what the hell","whoa","wicked","woot","wow","WTF"].concat();
dic.x.subs=["default"];
dic.x.filters=[];
var yn={};
dic.yn=yn;
dic.yn.no=["absolutely not","certainly not","definitely not","hell no","impossible","most certainly not","negative","no","no way","nooooo","nope","not at all","obviously not","oh no","that can't be","there's no way"];
dic.yn.yes=["absolutely","affirmative","certainly","definitely","hell yes","I couldn't agree more","indeed","obviously","oh yes","undeniably","undoubtedly","without a doubt","ya","yayaya","yep","yeppers","yes","yes/yes"];
dic.yn.all=[].concat(dic.yn.no,dic.yn.yes);
dic.yn.subs=["default"];
dic.yn.filters=["no","yes"];
return dic; 
}; 
module.exports=en_US; 

},{}],4:[function(require,module,exports){

var getCase = function (tokenStream) {
    var _case = 0;
    var cases = ["default", "none", "lower", "upper", "title", "word", "first", "sentence"];
    var token, matches, re;
    while (matches = /(\[.*?\])/g.exec(tokenStream)) {
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (["case"].indexOf(token[0]) != -1) {
            if (token[0] === "case") {
                if (cases.indexOf(token[1] != -1)) {
                    _case = cases.indexOf(token[1]);
                }
            }
        }
        return cases[_case];
    }
    return cases[0];
};
module.exports = getCase;

},{}],5:[function(require,module,exports){
var lexer = function (input, dic) {
    dic = dic || require("./en_US");
    var tempRes="";
    var result = input, matches, token, replacement = [],regex = /\<(.*?)\>/g;
    while (matches = regex.exec(input)) {
        // We accept a number of keywords, and they all correlate to the entries in the DIC files
        // First, get the DIC token
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        // Match against valid keywords in valid_tokens
        if (dic().tokens.indexOf(token[0]) != -1) {
            // Now we're ready to pass the token to the parser. It should
            // include the token and any modifiers and subs
            // result = lexer(this, matches, result);

            tempRes = require("./replaceToken")( matches, result, 1, dic);
            result = result.replace(matches[0], function () {
                return tempRes;
            });
        }
    }
    return result;
};
module.exports=lexer;

},{"./en_US":3,"./replaceToken":7}],6:[function(require,module,exports){
var randomString = function (l, chars) {
    chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    //chars = chars || 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    var rndString = '';
    for (var i = 0; i < l; i++) {
        var rndPos = Math.floor(Math.random() * chars.length);
        rndString += chars.substring(rndPos, rndPos + 1);
    }
    return rndString;
};
module.exports = randomString;

},{}],7:[function(require,module,exports){
var replaceToken = function (matches, input, matchIndex, dic) {
    dic = dic || require('./en_US');
    var result, modifier = 0, re = new RegExp("\\w+", "g");
    var token = matches[matchIndex].match(re)[0];
    var indexPos = matches.index;
    var matched = matches[matchIndex].match(re);
    // matches[0] contains the token. It can be noun, verb, adj etc.
    // we already know it's valid, because this function doesn't get
    // called unless it is.
    // Let's check if there's any qualifiers or modifiers
    if (token.length > 1) {
        // There are two types. Filters and subs. Let's see what we got
        var mysubs = myfilters = [];
        var dictionary = [];
        if (matched.length > 1) {
            matched.forEach(function (entry, idx) {
                if (idx > 0) {
                    if ("undefined" != typeof dic()[token].filters) {
                        if (dic()[token].filters.indexOf(entry) > -1) {
                            // Filters are categories of the token, so <adj emotion> will
                            // set filters valid for emotion for the token adj
                            myfilters.push(entry);
                        }
                    }
                    if ("undefined" != typeof dic()[token].subs) {
                        if (dic()[token].subs.indexOf(entry) > -1) {
                            // Subs are grammatical instructions
                            modifier = dic()[token].subs.indexOf(entry);
                        }
                    }
                }
                // So.. now we got the token, the filters and the subs. Let's do some magic
            });
        }
    }
    if (myfilters.length <= 0) {
        if ("undefined" != typeof dic()[token].all) {
            dictionary = dictionary.concat(dic()[token].all);
        }
    } else {
        dictionary = dictionary.concat(dic()[token][myfilters.pop()]);

        //myfilters.forEach(function (e) {
        //    dictionary = dictionary.concat(dic()[token][e]);
        //});
    }

    if (modifier === 0) {
        matched.forEach(function (e) {
            if (e.toLowerCase() === "modifier") {
                modifier = 1;
            }
        });
    }

    var rand, newToken, replacement = [];
    re = new RegExp(matches[0], 'g');

    rand = Math.floor(Math.random() * dictionary.length);
    if (dictionary[rand].match(/\//) <= 0) {
        newToken = dictionary[rand];
    } else {
        newToken = dictionary[rand].split("/")[modifier];
    }
    replacement.push(newToken);

    rand = Math.floor(Math.random() * dictionary.length);
    return replacement[0];
};
module.exports=replaceToken;

},{"./en_US":3}],"rant":[function(require,module,exports){
String.prototype.toTitleCase = function() {
    var i, j, str, lowers, uppers;
    str = this.replace(/([^\W_]+[^\s-]*) */g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });

    // Certain minor words should be left lowercase unless  they are the first or last words in the string
    lowers = ['A', 'An', 'The', 'And', 'But', 'Or', 'For', 'Nor', 'As', 'At',
        'By', 'For', 'From', 'In', 'Into', 'Near', 'Of', 'On', 'Onto', 'To', 'With'];
    for (i = 0, j = lowers.length; i < j; i++)
        str = str.replace(new RegExp('\\s' + lowers[i] + '\\s', 'g'),
            function(txt) {
                return txt.toLowerCase();
            });

    // Certain words should be left uppercase
    uppers = ['Id', 'Tv', 'Lsd'];
    for (i = 0, j = uppers.length; i < j; i++)
        str = str.replace(new RegExp('\\b' + uppers[i] + '\\b', 'g'),
            uppers[i].toUpperCase());

    return str;
};

String.prototype.toWordCase = function() {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

String.prototype.toSentenceCase = function() {
    var re = /(^\s*\w{1}|\.\s*\w{1})/gi;
    return this.replace(re, function(str) {
        return str.toUpperCase();
    });
};



function rant(inputStream, dic) {
    dic = dic || require('./en_US');
    var outputStream = inputStream, re;
    var regex = /\<(.*?)\>/g;
    var matches, token, indexPos;
    var replacement, i = 0, tags = {};
    var repetitions = [];
    var separator = [];
    var stringCase = require("./getCase")(inputStream);
    outputStream = inputStream.toLowerCase(), regex = /(\[.*?\])/g;
    while (matches = regex.exec(inputStream)) {
        // [rep:4][sep:\s]{\8,x}
        re = new RegExp("\\w+", "g");
        token = matches[1].match(re);
        if (token[0] === "sep") {
            separator.push(token[1]);
            //separator=matches[0].match(/[^[\](sep:)]+(?=])/)[0];
        }
        if (token[0] === "rep") {
            repetitions.push(token[1]);
        }
    }
    repetitions.reverse();
    separator.reverse();

    // remove the brackets
    while (matches = regex.exec(inputStream)) {
        inputStream = inputStream.replace(/(\[.*?\])/g, '');
    }

    // instructions in the brackets will only be applied to tokens matched in curly braces
    regex = /(\{.*?\})/;
    var res = "";
    var curlymatch;

    while (curlymatch = regex.exec(inputStream)) {
        replacement = require("./braceParser")(inputStream, curlymatch[1], repetitions, separator, dic);
        inputStream = inputStream.replace(curlymatch[1], replacement);
    }

    // lexer matches (anything inside arrow notation)
    outputStream = require("./lexer")(inputStream, dic);
    return require("./capitalize")(outputStream, stringCase);
}

module.exports = rant;

},{"./braceParser":1,"./capitalize":2,"./en_US":3,"./getCase":4,"./lexer":5}]},{},["rant"]);
