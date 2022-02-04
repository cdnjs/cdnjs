/**
 * @template A
 * @template B
 * @param {A} target
 * @param {B} properties
 * @return {A & B}
 */
var assign = function assign(target, properties) {
  for (var key in properties) {
    target[key] = properties[key];
  }

  return target;
};

/**
 * Finite State Machine generation utilities
 */
/**
 * Define a basic state machine state. j is the list of character transitions,
 * jr is the list of regex-match transitions, jd is the default state to
 * transition to t is the accepting token type, if any. If this is the terminal
 * state, then it does not emit a token.
 * @template T
 * @property {{ [string]: State<T> }} j
 * @property {[RegExp, State<T>][]} jr
 * @property {State<T>} jd
 * @property {?T} t
 */

var State = /*#__PURE__*/function () {
  /**
   * @param {T} [token] to emit
   */
  function State(token) {
    // this.n = null; // DEBUG: State name
    this.j = {}; // IMPLEMENTATION 1
    // this.j = []; // IMPLEMENTATION 2

    this.jr = [];
    this.jd = null;
    this.t = token;
  }

  var _proto = State.prototype;

  _proto.accepts = function accepts() {
    return !!this.t;
  }
  /**
   * Short for "take transition", this is a method for building/working with
   * state machines.
   *
   * If a state already exists for the given input, returns it.
   *
   * If a token is specified, that state will emit that token when reached by
   * the linkify engine.
   *
   * If no state exists, it will be initialized with some default transitions
   * that resemble existing default transitions.
   *
   * If a state is given for the second argument, that state will be
   * transitioned to on the given input regardless of what that input
   * previously did.
   *
   * @param {string | string[]} input character or token type to transition on
   * @param {State | T} tokenOrState transition to a matching state
   * @returns {State} taken after the given input
   */
  ;

  _proto.tt = function tt(input, tokenOrState) {
    if (input instanceof Array) {
      // Recursive case
      if (input.length === 0) {
        return;
      }

      var _nextState = this.tt(input[0], tokenOrState);

      for (var i = 1; i < input.length; i++) {
        this.tt(input[i], _nextState);
      }

      return _nextState;
    }

    if (tokenOrState && tokenOrState instanceof State) {
      // State, default a basic transition
      this.j[input] = tokenOrState;
      return tokenOrState;
    } // See if there's a direct state transition (not regex or default)


    var token = tokenOrState;
    var nextState = this.j[input];

    if (nextState) {
      if (token) {
        nextState.t = token;
      } // overrwites previous token


      return nextState;
    } // Create a new state for this input


    nextState = makeState(); // Take the transition using the usual default mechanisms

    var templateState = takeT(this, input);

    if (templateState) {
      // Some default state transition, make a prime state based on this one
      assign(nextState.j, templateState.j);
      nextState.jr.append(templateState.jr);
      nextState.jr = templateState.jd;
      nextState.t = token || templateState.t;
    } else {
      nextState.t = token;
    }

    this.j[input] = nextState;
    return nextState;
  };

  return State;
}();
/**
 * Utility function to create state without using new keyword (reduced file size
 * when minified)
 */

var makeState = function
  /*name*/
makeState() {
  var s = new State(); // if (name) { s.n = name; } // DEBUG

  return s;
};
/**
 * Similar to previous except it is an accepting state that emits a token
 * @template T
 * @param {T} token
 */

var makeAcceptingState = function makeAcceptingState(token
/*, name*/
) {
  var s = new State(token); // if (name) { s.n = name; } // DEBUG

  return s;
};
/**
 * Create a transition from startState to nextState via the given character
 * @template T
 * @param {State} startState transition from thie starting state
 * @param {string} input via this input character or other concrete token type
 * @param {State} nextState to this next state
 * @return {State}
 */

var makeT = function makeT(startState, input, nextState) {
  // IMPLEMENTATION 1: Add to object (fast)
  if (!startState.j[input]) {
    startState.j[input] = nextState;
  } // IMPLEMENTATION 2: Add to array (slower)
  // startState.j.push([input, nextState]);


  return startState.j[input];
};
/**
 * @param {State} startState stransition from this starting state
 * @param {RegExp} regex Regular expression to match on input
 * @param {State} nextState transition to this next state if there's are regex match
 */

var makeRegexT = function makeRegexT(startState, regex, nextState) {
  startState.jr.push([regex, nextState]);
};
/**
 * Follow the transition from the given character to the next state
 * @param {State} state
 * @param {string} input character or other concrete token type to transition
 * @returns {?State} the next state, if any
 */

var takeT = function takeT(state, input) {
  // IMPLEMENTATION 1: Object key lookup (faster)
  var nextState = state.j[input];

  if (nextState) {
    return nextState;
  } // IMPLEMENTATION 2: List lookup (slower)
  // Loop through all the state transitions and see if there's a match
  // for (let i = 0; i < state.j.length; i++) {
  //	const val = state.j[i][0];
  //	const nextState = state.j[i][1];
  // 	if (input === val) { return nextState; }
  // }


  for (var i = 0; i < state.jr.length; i++) {
    var regex = state.jr[i][0];
    var _nextState2 = state.jr[i][1]; // note: might be empty to prevent default jump

    if (_nextState2 && regex.test(input)) {
      return _nextState2;
    }
  } // Nowhere left to jump! Return default, if any


  return state.jd;
};
/**
 * Similar to makeT, but takes a list of characters that all transition to the
 * same nextState startState
 * @param {State} startState
 * @param {string[]} chars
 * @param {State} nextState
 */

var makeMultiT = function makeMultiT(startState, chars, nextState) {
  for (var i = 0; i < chars.length; i++) {
    makeT(startState, chars[i], nextState);
  }
};
/**
 * Set up a list of multiple transitions at once. transitions is a list of
 * tuples, where the first element is the transitions character and the second
 * is the state to transition to
 * @param {State} startState
 * @param {[string, State][]} transitions
 */

var makeBatchT = function makeBatchT(startState, transitions) {
  for (var i = 0; i < transitions.length; i++) {
    var input = transitions[i][0];
    var nextState = transitions[i][1]; // if (!nextState.n && typeof input === 'string') { nextState.n = input; } // DEBUG

    makeT(startState, input, nextState);
  }
};
/**
 * For state machines that transition on characters only; given a non-empty
 * target string, generates states (if required) for each consecutive substring
 * of characters starting from the beginning of the string. The final state will
 * have a special value, as specified in options. All other "in between"
 * substrings will have a default end state.
 *
 * This turns the state machine into a Trie-like data structure (rather than a
 * intelligently-designed DFA).
 * @param {State<string>} state
 * @param {string} str
 * @param {State<string>} endState
 * @param {() => State<string>} defaultStateFactory
 * @return {State<string>} the final state
 */

var makeChainT = function makeChainT(state, str, endState, defaultStateFactory) {
  var i = 0,
      len = str.length,
      nextState; // Find the next state without a jump to the next character

  while (i < len && (nextState = state.j[str[i]])) {
    state = nextState;
    i++;
  }

  if (i >= len) {
    return state;
  } // no new tokens were added


  while (i < len - 1) {
    nextState = defaultStateFactory();
    makeT(state, str[i], nextState);
    state = nextState;
    i++;
  }

  makeT(state, str[len - 1], endState); // if (!endState.n) { endState.n === str; } // DEBUG

  return endState;
};

/******************************************************************************
	Text Tokens
	Tokens composed of strings
******************************************************************************/
// A valid web domain token
var WORD = 'WORD'; // only contains a-z

var UWORD = 'UWORD'; // contains letters other than a-z, used for IDN
// Special case of word

var LOCALHOST = 'LOCALHOST'; // Valid top-level domain, special case of WORD (see tlds.js)

var TLD = 'TLD'; // Valid IDN TLD, special case of UWORD (see tlds.js)

var UTLD = 'UTLD'; // The scheme portion of a web URI protocol. Supported types include: `mailto`,
// `file`, and user-defined custom protocols. Limited to schemes that contain
// only letters

var SCHEME = 'SCHEME'; // Similar to SCHEME, except makes distinction for schemes that must always be
// followed by `://`, not just `:`. Supported types include `http`, `https`,
// `ftp`, `ftps`

var SLASH_SCHEME = 'SLASH_SCHEME'; // Similar to SCHEME, except contains -

var COMPOUND_SCHEME = 'COMPOUND_SCHEME'; // Similar to SLASH_SCHEME, except contains -

var COMPOUND_SLASH_SCHEME = 'COMPOUND_SLASH_SCHEME'; // TODO: Move this to keyword plugin
// Arbirary words that can keyword links
// export const KEYWORD = 'KEYWORD'; // simple [0-9a-z]
// export const UKEYWORD = 'UKEYWORD'; // containing [0-9\{Letter}]
// export const COMPOUND_KEYWORD = 'COMPOUND_KEYWORD'; // similar to KEYWORD but can have hyphens
// export const COMPOUND_UKEYWORD = 'COMPOUND_UKEYWORD'; // similar to UKEYWORD but can have hyphens
// Any sequence of digits 0-9

var NUM = 'NUM'; // Any number of consecutive whitespace characters that are not newline

var WS = 'WS'; // New line (unix style)

var NL = 'NL'; // \n
// Opening/closing bracket classes

var OPENBRACE = 'OPENBRACE'; // {

var OPENBRACKET = 'OPENBRACKET'; // [

var OPENANGLEBRACKET = 'OPENANGLEBRACKET'; // <

var OPENPAREN = 'OPENPAREN'; // (

var CLOSEBRACE = 'CLOSEBRACE'; // }

var CLOSEBRACKET = 'CLOSEBRACKET'; // ]

var CLOSEANGLEBRACKET = 'CLOSEANGLEBRACKET'; // >

var CLOSEPAREN = 'CLOSEPAREN'; // )
// Various symbols

var AMPERSAND = 'AMPERSAND'; // &

var APOSTROPHE = 'APOSTROPHE'; // '

var ASTERISK = 'ASTERISK'; // *

var AT = 'AT'; // @

var BACKSLASH = 'BACKSLASH'; // \

var BACKTICK = 'BACKTICK'; // `

var CARET = 'CARET'; // ^

var COLON = 'COLON'; // :

var COMMA = 'COMMA'; // ,

var DOLLAR = 'DOLLAR'; // $

var DOT = 'DOT'; // .

var EQUALS = 'EQUALS'; // =

var EXCLAMATION = 'EXCLAMATION'; // !

var HYPHEN = 'HYPHEN'; // -

var PERCENT = 'PERCENT'; // %

var PIPE = 'PIPE'; // |

var PLUS = 'PLUS'; // +

var POUND = 'POUND'; // #

var QUERY = 'QUERY'; // ?

var QUOTE = 'QUOTE'; // "

var SEMI = 'SEMI'; // ;

var SLASH = 'SLASH'; // /

var TILDE = 'TILDE'; // ~

var UNDERSCORE = 'UNDERSCORE'; // _
// Emoji symbol

var EMOJIS = 'EMOJIS'; // Default token - anything that is not one of the above

var SYM = 'SYM'; // Token collections for grouping similar jumps in the parser

var numeric = [NUM];
var ascii = [WORD, LOCALHOST, TLD, SCHEME, SLASH_SCHEME];
var asciinumeric = ascii.concat(NUM);
var words = ascii.concat(UWORD, UTLD);
var alphanumeric = words.concat(NUM);
var domain = words.concat(COMPOUND_SCHEME, COMPOUND_SLASH_SCHEME, NUM, EMOJIS);
var scheme = [SCHEME, SLASH_SCHEME, COMPOUND_SCHEME, COMPOUND_SLASH_SCHEME]; // Define each property separately to let typescript know that this object is
// open for adding more collections.

var collections = {};
collections.ascii = ascii;
collections.asciinumeric = asciinumeric;
collections.words = words;
collections.alphanumeric = alphanumeric;
collections.domain = domain;
collections.scheme = scheme;
/**
 * @param {string} name Name of text token collections. Will be available in plugins as scanner.tokens.collections.<name>
 * @returns {string[]} the collection
 */

function registerTextTokenCollection(name) {
  if (!(name in collections)) {
    collections[name] = [];
  }

  return collections[name];
}
function collectionsWithToken(name) {
  var collectionNames = [];

  for (var col in collections) {
    if (collections[col].indexOf(name) >= 0) {
      collectionNames.push(col);
    }
  }

  return collectionNames;
}
/**
 * Register a text token that the parser can recognize
 * @param {string} name Token name in all caps (by convention)
 * @param {string[]} collectionNames List of collections into which to add this token. Any previously-unknown collection will be created.
 * @returns {string}
 */

function registerTextToken(name, collectionNames) {
  if (collectionNames === void 0) {
    collectionNames = [];
  }

  for (var i = 0; i < collectionNames.length; i++) {
    var collection = registerTextTokenCollection(collectionNames[i]);
    collection.push(name);
  }

  return name;
}
/**
 * @typedef {{t: string, v: string, s: number, e: number}} Token
 */

var text = /*#__PURE__*/Object.freeze({
	__proto__: null,
	WORD: WORD,
	UWORD: UWORD,
	LOCALHOST: LOCALHOST,
	TLD: TLD,
	UTLD: UTLD,
	SCHEME: SCHEME,
	SLASH_SCHEME: SLASH_SCHEME,
	COMPOUND_SCHEME: COMPOUND_SCHEME,
	COMPOUND_SLASH_SCHEME: COMPOUND_SLASH_SCHEME,
	NUM: NUM,
	WS: WS,
	NL: NL,
	OPENBRACE: OPENBRACE,
	OPENBRACKET: OPENBRACKET,
	OPENANGLEBRACKET: OPENANGLEBRACKET,
	OPENPAREN: OPENPAREN,
	CLOSEBRACE: CLOSEBRACE,
	CLOSEBRACKET: CLOSEBRACKET,
	CLOSEANGLEBRACKET: CLOSEANGLEBRACKET,
	CLOSEPAREN: CLOSEPAREN,
	AMPERSAND: AMPERSAND,
	APOSTROPHE: APOSTROPHE,
	ASTERISK: ASTERISK,
	AT: AT,
	BACKSLASH: BACKSLASH,
	BACKTICK: BACKTICK,
	CARET: CARET,
	COLON: COLON,
	COMMA: COMMA,
	DOLLAR: DOLLAR,
	DOT: DOT,
	EQUALS: EQUALS,
	EXCLAMATION: EXCLAMATION,
	HYPHEN: HYPHEN,
	PERCENT: PERCENT,
	PIPE: PIPE,
	PLUS: PLUS,
	POUND: POUND,
	QUERY: QUERY,
	QUOTE: QUOTE,
	SEMI: SEMI,
	SLASH: SLASH,
	TILDE: TILDE,
	UNDERSCORE: UNDERSCORE,
	EMOJIS: EMOJIS,
	SYM: SYM,
	numeric: numeric,
	ascii: ascii,
	asciinumeric: asciinumeric,
	words: words,
	alphanumeric: alphanumeric,
	domain: domain,
	scheme: scheme,
	collections: collections,
	registerTextTokenCollection: registerTextTokenCollection,
	collectionsWithToken: collectionsWithToken,
	registerTextToken: registerTextToken
});

// THIS FILE IS AUTOMATICALLY GENERATED DO NOT EDIT DIRECTLY
// https://data.iana.org/TLD/tlds-alpha-by-domain.txt
var tlds = 'aaa \
aarp \
abarth \
abb \
abbott \
abbvie \
abc \
able \
abogado \
abudhabi \
ac \
academy \
accenture \
accountant \
accountants \
aco \
actor \
ad \
adac \
ads \
adult \
ae \
aeg \
aero \
aetna \
af \
afl \
africa \
ag \
agakhan \
agency \
ai \
aig \
airbus \
airforce \
airtel \
akdn \
al \
alfaromeo \
alibaba \
alipay \
allfinanz \
allstate \
ally \
alsace \
alstom \
am \
amazon \
americanexpress \
americanfamily \
amex \
amfam \
amica \
amsterdam \
analytics \
android \
anquan \
anz \
ao \
aol \
apartments \
app \
apple \
aq \
aquarelle \
ar \
arab \
aramco \
archi \
army \
arpa \
art \
arte \
as \
asda \
asia \
associates \
at \
athleta \
attorney \
au \
auction \
audi \
audible \
audio \
auspost \
author \
auto \
autos \
avianca \
aw \
aws \
ax \
axa \
az \
azure \
ba \
baby \
baidu \
banamex \
bananarepublic \
band \
bank \
bar \
barcelona \
barclaycard \
barclays \
barefoot \
bargains \
baseball \
basketball \
bauhaus \
bayern \
bb \
bbc \
bbt \
bbva \
bcg \
bcn \
bd \
be \
beats \
beauty \
beer \
bentley \
berlin \
best \
bestbuy \
bet \
bf \
bg \
bh \
bharti \
bi \
bible \
bid \
bike \
bing \
bingo \
bio \
biz \
bj \
black \
blackfriday \
blockbuster \
blog \
bloomberg \
blue \
bm \
bms \
bmw \
bn \
bnpparibas \
bo \
boats \
boehringer \
bofa \
bom \
bond \
boo \
book \
booking \
bosch \
bostik \
boston \
bot \
boutique \
box \
br \
bradesco \
bridgestone \
broadway \
broker \
brother \
brussels \
bs \
bt \
budapest \
bugatti \
build \
builders \
business \
buy \
buzz \
bv \
bw \
by \
bz \
bzh \
ca \
cab \
cafe \
cal \
call \
calvinklein \
cam \
camera \
camp \
cancerresearch \
canon \
capetown \
capital \
capitalone \
car \
caravan \
cards \
care \
career \
careers \
cars \
casa \
case \
cash \
casino \
cat \
catering \
catholic \
cba \
cbn \
cbre \
cbs \
cc \
cd \
center \
ceo \
cern \
cf \
cfa \
cfd \
cg \
ch \
chanel \
channel \
charity \
chase \
chat \
cheap \
chintai \
christmas \
chrome \
church \
ci \
cipriani \
circle \
cisco \
citadel \
citi \
citic \
city \
cityeats \
ck \
cl \
claims \
cleaning \
click \
clinic \
clinique \
clothing \
cloud \
club \
clubmed \
cm \
cn \
co \
coach \
codes \
coffee \
college \
cologne \
com \
comcast \
commbank \
community \
company \
compare \
computer \
comsec \
condos \
construction \
consulting \
contact \
contractors \
cooking \
cookingchannel \
cool \
coop \
corsica \
country \
coupon \
coupons \
courses \
cpa \
cr \
credit \
creditcard \
creditunion \
cricket \
crown \
crs \
cruise \
cruises \
csc \
cu \
cuisinella \
cv \
cw \
cx \
cy \
cymru \
cyou \
cz \
dabur \
dad \
dance \
data \
date \
dating \
datsun \
day \
dclk \
dds \
de \
deal \
dealer \
deals \
degree \
delivery \
dell \
deloitte \
delta \
democrat \
dental \
dentist \
desi \
design \
dev \
dhl \
diamonds \
diet \
digital \
direct \
directory \
discount \
discover \
dish \
diy \
dj \
dk \
dm \
dnp \
do \
docs \
doctor \
dog \
domains \
dot \
download \
drive \
dtv \
dubai \
dunlop \
dupont \
durban \
dvag \
dvr \
dz \
earth \
eat \
ec \
eco \
edeka \
edu \
education \
ee \
eg \
email \
emerck \
energy \
engineer \
engineering \
enterprises \
epson \
equipment \
er \
ericsson \
erni \
es \
esq \
estate \
et \
etisalat \
eu \
eurovision \
eus \
events \
exchange \
expert \
exposed \
express \
extraspace \
fage \
fail \
fairwinds \
faith \
family \
fan \
fans \
farm \
farmers \
fashion \
fast \
fedex \
feedback \
ferrari \
ferrero \
fi \
fiat \
fidelity \
fido \
film \
final \
finance \
financial \
fire \
firestone \
firmdale \
fish \
fishing \
fit \
fitness \
fj \
fk \
flickr \
flights \
flir \
florist \
flowers \
fly \
fm \
fo \
foo \
food \
foodnetwork \
football \
ford \
forex \
forsale \
forum \
foundation \
fox \
fr \
free \
fresenius \
frl \
frogans \
frontdoor \
frontier \
ftr \
fujitsu \
fun \
fund \
furniture \
futbol \
fyi \
ga \
gal \
gallery \
gallo \
gallup \
game \
games \
gap \
garden \
gay \
gb \
gbiz \
gd \
gdn \
ge \
gea \
gent \
genting \
george \
gf \
gg \
ggee \
gh \
gi \
gift \
gifts \
gives \
giving \
gl \
glass \
gle \
global \
globo \
gm \
gmail \
gmbh \
gmo \
gmx \
gn \
godaddy \
gold \
goldpoint \
golf \
goo \
goodyear \
goog \
google \
gop \
got \
gov \
gp \
gq \
gr \
grainger \
graphics \
gratis \
green \
gripe \
grocery \
group \
gs \
gt \
gu \
guardian \
gucci \
guge \
guide \
guitars \
guru \
gw \
gy \
hair \
hamburg \
hangout \
haus \
hbo \
hdfc \
hdfcbank \
health \
healthcare \
help \
helsinki \
here \
hermes \
hgtv \
hiphop \
hisamitsu \
hitachi \
hiv \
hk \
hkt \
hm \
hn \
hockey \
holdings \
holiday \
homedepot \
homegoods \
homes \
homesense \
honda \
horse \
hospital \
host \
hosting \
hot \
hoteles \
hotels \
hotmail \
house \
how \
hr \
hsbc \
ht \
hu \
hughes \
hyatt \
hyundai \
ibm \
icbc \
ice \
icu \
id \
ie \
ieee \
ifm \
ikano \
il \
im \
imamat \
imdb \
immo \
immobilien \
in \
inc \
industries \
infiniti \
info \
ing \
ink \
institute \
insurance \
insure \
int \
international \
intuit \
investments \
io \
ipiranga \
iq \
ir \
irish \
is \
ismaili \
ist \
istanbul \
it \
itau \
itv \
jaguar \
java \
jcb \
je \
jeep \
jetzt \
jewelry \
jio \
jll \
jm \
jmp \
jnj \
jo \
jobs \
joburg \
jot \
joy \
jp \
jpmorgan \
jprs \
juegos \
juniper \
kaufen \
kddi \
ke \
kerryhotels \
kerrylogistics \
kerryproperties \
kfh \
kg \
kh \
ki \
kia \
kim \
kinder \
kindle \
kitchen \
kiwi \
km \
kn \
koeln \
komatsu \
kosher \
kp \
kpmg \
kpn \
kr \
krd \
kred \
kuokgroup \
kw \
ky \
kyoto \
kz \
la \
lacaixa \
lamborghini \
lamer \
lancaster \
lancia \
land \
landrover \
lanxess \
lasalle \
lat \
latino \
latrobe \
law \
lawyer \
lb \
lc \
lds \
lease \
leclerc \
lefrak \
legal \
lego \
lexus \
lgbt \
li \
lidl \
life \
lifeinsurance \
lifestyle \
lighting \
like \
lilly \
limited \
limo \
lincoln \
linde \
link \
lipsy \
live \
living \
lk \
llc \
llp \
loan \
loans \
locker \
locus \
loft \
lol \
london \
lotte \
lotto \
love \
lpl \
lplfinancial \
lr \
ls \
lt \
ltd \
ltda \
lu \
lundbeck \
luxe \
luxury \
lv \
ly \
ma \
macys \
madrid \
maif \
maison \
makeup \
man \
management \
mango \
map \
market \
marketing \
markets \
marriott \
marshalls \
maserati \
mattel \
mba \
mc \
mckinsey \
md \
me \
med \
media \
meet \
melbourne \
meme \
memorial \
men \
menu \
merckmsd \
mg \
mh \
miami \
microsoft \
mil \
mini \
mint \
mit \
mitsubishi \
mk \
ml \
mlb \
mls \
mm \
mma \
mn \
mo \
mobi \
mobile \
moda \
moe \
moi \
mom \
monash \
money \
monster \
mormon \
mortgage \
moscow \
moto \
motorcycles \
mov \
movie \
mp \
mq \
mr \
ms \
msd \
mt \
mtn \
mtr \
mu \
museum \
music \
mutual \
mv \
mw \
mx \
my \
mz \
na \
nab \
nagoya \
name \
natura \
navy \
nba \
nc \
ne \
nec \
net \
netbank \
netflix \
network \
neustar \
new \
news \
next \
nextdirect \
nexus \
nf \
nfl \
ng \
ngo \
nhk \
ni \
nico \
nike \
nikon \
ninja \
nissan \
nissay \
nl \
no \
nokia \
northwesternmutual \
norton \
now \
nowruz \
nowtv \
np \
nr \
nra \
nrw \
ntt \
nu \
nyc \
nz \
obi \
observer \
office \
okinawa \
olayan \
olayangroup \
oldnavy \
ollo \
om \
omega \
one \
ong \
onl \
online \
ooo \
open \
oracle \
orange \
org \
organic \
origins \
osaka \
otsuka \
ott \
ovh \
pa \
page \
panasonic \
paris \
pars \
partners \
parts \
party \
passagens \
pay \
pccw \
pe \
pet \
pf \
pfizer \
pg \
ph \
pharmacy \
phd \
philips \
phone \
photo \
photography \
photos \
physio \
pics \
pictet \
pictures \
pid \
pin \
ping \
pink \
pioneer \
pizza \
pk \
pl \
place \
play \
playstation \
plumbing \
plus \
pm \
pn \
pnc \
pohl \
poker \
politie \
porn \
post \
pr \
pramerica \
praxi \
press \
prime \
pro \
prod \
productions \
prof \
progressive \
promo \
properties \
property \
protection \
pru \
prudential \
ps \
pt \
pub \
pw \
pwc \
py \
qa \
qpon \
quebec \
quest \
racing \
radio \
re \
read \
realestate \
realtor \
realty \
recipes \
red \
redstone \
redumbrella \
rehab \
reise \
reisen \
reit \
reliance \
ren \
rent \
rentals \
repair \
report \
republican \
rest \
restaurant \
review \
reviews \
rexroth \
rich \
richardli \
ricoh \
ril \
rio \
rip \
ro \
rocher \
rocks \
rodeo \
rogers \
room \
rs \
rsvp \
ru \
rugby \
ruhr \
run \
rw \
rwe \
ryukyu \
sa \
saarland \
safe \
safety \
sakura \
sale \
salon \
samsclub \
samsung \
sandvik \
sandvikcoromant \
sanofi \
sap \
sarl \
sas \
save \
saxo \
sb \
sbi \
sbs \
sc \
sca \
scb \
schaeffler \
schmidt \
scholarships \
school \
schule \
schwarz \
science \
scot \
sd \
se \
search \
seat \
secure \
security \
seek \
select \
sener \
services \
ses \
seven \
sew \
sex \
sexy \
sfr \
sg \
sh \
shangrila \
sharp \
shaw \
shell \
shia \
shiksha \
shoes \
shop \
shopping \
shouji \
show \
showtime \
si \
silk \
sina \
singles \
site \
sj \
sk \
ski \
skin \
sky \
skype \
sl \
sling \
sm \
smart \
smile \
sn \
sncf \
so \
soccer \
social \
softbank \
software \
sohu \
solar \
solutions \
song \
sony \
soy \
spa \
space \
sport \
spot \
sr \
srl \
ss \
st \
stada \
staples \
star \
statebank \
statefarm \
stc \
stcgroup \
stockholm \
storage \
store \
stream \
studio \
study \
style \
su \
sucks \
supplies \
supply \
support \
surf \
surgery \
suzuki \
sv \
swatch \
swiss \
sx \
sy \
sydney \
systems \
sz \
tab \
taipei \
talk \
taobao \
target \
tatamotors \
tatar \
tattoo \
tax \
taxi \
tc \
tci \
td \
tdk \
team \
tech \
technology \
tel \
temasek \
tennis \
teva \
tf \
tg \
th \
thd \
theater \
theatre \
tiaa \
tickets \
tienda \
tiffany \
tips \
tires \
tirol \
tj \
tjmaxx \
tjx \
tk \
tkmaxx \
tl \
tm \
tmall \
tn \
to \
today \
tokyo \
tools \
top \
toray \
toshiba \
total \
tours \
town \
toyota \
toys \
tr \
trade \
trading \
training \
travel \
travelchannel \
travelers \
travelersinsurance \
trust \
trv \
tt \
tube \
tui \
tunes \
tushu \
tv \
tvs \
tw \
tz \
ua \
ubank \
ubs \
ug \
uk \
unicom \
university \
uno \
uol \
ups \
us \
uy \
uz \
va \
vacations \
vana \
vanguard \
vc \
ve \
vegas \
ventures \
verisign \
vermögensberater \
vermögensberatung \
versicherung \
vet \
vg \
vi \
viajes \
video \
vig \
viking \
villas \
vin \
vip \
virgin \
visa \
vision \
viva \
vivo \
vlaanderen \
vn \
vodka \
volkswagen \
volvo \
vote \
voting \
voto \
voyage \
vu \
vuelos \
wales \
walmart \
walter \
wang \
wanggou \
watch \
watches \
weather \
weatherchannel \
webcam \
weber \
website \
wed \
wedding \
weibo \
weir \
wf \
whoswho \
wien \
wiki \
williamhill \
win \
windows \
wine \
winners \
wme \
wolterskluwer \
woodside \
work \
works \
world \
wow \
ws \
wtc \
wtf \
xbox \
xerox \
xfinity \
xihuan \
xin \
xxx \
xyz \
yachts \
yahoo \
yamaxun \
yandex \
ye \
yodobashi \
yoga \
yokohama \
you \
youtube \
yt \
yun \
za \
zappos \
zara \
zero \
zip \
zm \
zone \
zuerich \
zw'.split(' '); // Internationalized domain names containing non-ASCII

var utlds = 'ελ \
ευ \
бг \
бел \
дети \
ею \
католик \
ком \
мкд \
мон \
москва \
онлайн \
орг \
рус \
рф \
сайт \
срб \
укр \
қаз \
հայ \
ישראל \
קום \
ابوظبي \
اتصالات \
ارامكو \
الاردن \
البحرين \
الجزائر \
السعودية \
العليان \
المغرب \
امارات \
ایران \
بارت \
بازار \
بيتك \
بھارت \
تونس \
سودان \
سورية \
شبكة \
عراق \
عرب \
عمان \
فلسطين \
قطر \
كاثوليك \
كوم \
مصر \
مليسيا \
موريتانيا \
موقع \
همراه \
پاکستان \
ڀارت \
कॉम \
नेट \
भारत \
भारतम् \
भारोत \
संगठन \
বাংলা \
ভারত \
ভাৰত \
ਭਾਰਤ \
ભારત \
ଭାରତ \
இந்தியா \
இலங்கை \
சிங்கப்பூர் \
భారత్ \
ಭಾರತ \
ഭാരതം \
ලංකා \
คอม \
ไทย \
ລາວ \
გე \
みんな \
アマゾン \
クラウド \
グーグル \
コム \
ストア \
セール \
ファッション \
ポイント \
世界 \
中信 \
中国 \
中國 \
中文网 \
亚马逊 \
企业 \
佛山 \
信息 \
健康 \
八卦 \
公司 \
公益 \
台湾 \
台灣 \
商城 \
商店 \
商标 \
嘉里 \
嘉里大酒店 \
在线 \
大拿 \
天主教 \
娱乐 \
家電 \
广东 \
微博 \
慈善 \
我爱你 \
手机 \
招聘 \
政务 \
政府 \
新加坡 \
新闻 \
时尚 \
書籍 \
机构 \
淡马锡 \
游戏 \
澳門 \
点看 \
移动 \
组织机构 \
网址 \
网店 \
网站 \
网络 \
联通 \
诺基亚 \
谷歌 \
购物 \
通販 \
集团 \
電訊盈科 \
飞利浦 \
食品 \
餐厅 \
香格里拉 \
香港 \
닷넷 \
닷컴 \
삼성 \
한국'.split(' ');

/**
	The scanner provides an interface that takes a string of text as input, and
	outputs an array of tokens instances that can be used for easy URL parsing.

	@module linkify
	@submodule scanner
	@main scanner
*/

var ASCII_LETTER = /[a-z]/;
var LETTER = /(?:[A-Za-z\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16F1-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2183\u2184\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005\u3006\u3031-\u3035\u303B\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6E5\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDE80-\uDE9C\uDEA0-\uDED0\uDF00-\uDF1F\uDF2D-\uDF40\uDF42-\uDF49\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF]|\uD801[\uDC00-\uDC9D\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC60-\uDC76\uDC80-\uDC9E\uDCE0-\uDCF2\uDCF4\uDCF5\uDD00-\uDD15\uDD20-\uDD39\uDD80-\uDDB7\uDDBE\uDDBF\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE60-\uDE7C\uDE80-\uDE9C\uDEC0-\uDEC7\uDEC9-\uDEE4\uDF00-\uDF35\uDF40-\uDF55\uDF60-\uDF72\uDF80-\uDF91]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDD00-\uDD23\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF1C\uDF27\uDF30-\uDF45\uDF70-\uDF81\uDFB0-\uDFC4\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDD03-\uDD26\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDDA\uDDDC\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE80-\uDEAA\uDEB8\uDF00-\uDF1A\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCDF\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDEE0-\uDEF2\uDFB0]|\uD808[\uDC00-\uDF99]|\uD809[\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE70-\uDEBE\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE7F\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDD00-\uDD43\uDD4B]|\uD83B[\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/; // Any Unicode character with letter data type

var EMOJI = /(?:[#\*0-9\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2640\u2642\u2648-\u2653\u265F\u2660\u2663\u2665\u2666\u2668\u267B\u267E\u267F\u2692-\u2697\u2699\u269B\u269C\u26A0\u26A1\u26A7\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDDE6-\uDDFF\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD7A\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA4\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDE8\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED2\uDED5-\uDED7\uDEDD-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3-\uDEFC\uDFE0-\uDFEB\uDFF0]|\uD83E[\uDD0C-\uDD3A\uDD3C-\uDD45\uDD47-\uDDFF\uDE70-\uDE74\uDE78-\uDE7C\uDE80-\uDE86\uDE90-\uDEAC\uDEB0-\uDEBA\uDEC0-\uDEC5\uDED0-\uDED9\uDEE0-\uDEE7\uDEF0-\uDEF6])/; // Any Unicode emoji character

var EMOJI_VARIATION = /\ufe0f/; // Variation selector, follows heart and others

var DIGIT = /\d/;
var SPACE = /\s/;
/**
 * Initialize the scanner character-based state machine for the given start
 * state
 * @param {[string, boolean][]} customSchemes List of custom schemes, where each
 * item is a length-2 tuple with the first element set to the string scheme, and
 * the second element set to `true` if the `://` after the scheme is optional
 * @return {State} scanner starting state
 */

function init$2(customSchemes) {
  if (customSchemes === void 0) {
    customSchemes = [];
  }

  // Frequently used states (name argument removed during minification)
  var Start = makeState();
  var NonAccepting = makeState(); // must never have any transitions

  var Num = makeAcceptingState(NUM);
  var Word = makeAcceptingState(WORD);
  var UWord = makeAcceptingState(UWORD);
  var Emoji = makeAcceptingState(EMOJIS);
  var Ws = makeAcceptingState(WS);
  /**
   * Create a state which emits a word token
   */

  var makeWordState = function makeWordState(name) {
    var state = makeAcceptingState(WORD);
    state.jr = [[ASCII_LETTER, Word]];
    return state;
  };
  /**
   * Same as previous, but specific to non-ASCII alphabet words
   */


  var makeUWordState = function makeUWordState(name) {
    var state = makeAcceptingState(UWORD);
    state.jr = [[ASCII_LETTER, NonAccepting], [LETTER, UWord]];
    return state;
  };
  /**
   * Create a state which does not emit a word but the usual alphanumeric
   * transitions are domains
   */


  var makeNearWordState = function makeNearWordState(token, name) {
    var state = makeWordState();
    state.t = token;
    return state;
  };
  /**
   * Create a state which does not emit a word but the usual alphanumeric
   * transitions are domains
   */


  var makeNearUWordState = function makeNearUWordState(token, name) {
    var state = makeUWordState();
    state.t = token;
    return state;
  }; // States for special URL symbols that accept immediately after start


  makeBatchT(Start, [["'", makeAcceptingState(APOSTROPHE)], ['{', makeAcceptingState(OPENBRACE)], ['[', makeAcceptingState(OPENBRACKET)], ['<', makeAcceptingState(OPENANGLEBRACKET)], ['(', makeAcceptingState(OPENPAREN)], ['}', makeAcceptingState(CLOSEBRACE)], [']', makeAcceptingState(CLOSEBRACKET)], ['>', makeAcceptingState(CLOSEANGLEBRACKET)], [')', makeAcceptingState(CLOSEPAREN)], ['&', makeAcceptingState(AMPERSAND)], ['*', makeAcceptingState(ASTERISK)], ['@', makeAcceptingState(AT)], ['`', makeAcceptingState(BACKTICK)], ['^', makeAcceptingState(CARET)], [':', makeAcceptingState(COLON)], [',', makeAcceptingState(COMMA)], ['$', makeAcceptingState(DOLLAR)], ['.', makeAcceptingState(DOT)], ['=', makeAcceptingState(EQUALS)], ['!', makeAcceptingState(EXCLAMATION)], ['-', makeAcceptingState(HYPHEN)], ['%', makeAcceptingState(PERCENT)], ['|', makeAcceptingState(PIPE)], ['+', makeAcceptingState(PLUS)], ['#', makeAcceptingState(POUND)], ['?', makeAcceptingState(QUERY)], ['"', makeAcceptingState(QUOTE)], ['/', makeAcceptingState(SLASH)], [';', makeAcceptingState(SEMI)], ['~', makeAcceptingState(TILDE)], ['_', makeAcceptingState(UNDERSCORE)], ['\\', makeAcceptingState(BACKSLASH)]]); // Whitespace jumps
  // Tokens of only non-newline whitespace are arbitrarily long

  makeT(Start, '\n', makeAcceptingState(NL));
  makeRegexT(Start, SPACE, Ws); // If any whitespace except newline, more whitespace!

  makeT(Ws, '\n', makeState()); // non-accepting state

  makeRegexT(Ws, SPACE, Ws); // Generates states for top-level domains
  // Note that this is most accurate when tlds are in alphabetical order

  for (var i = 0; i < tlds.length; i++) {
    makeChainT(Start, tlds[i], makeNearWordState(TLD), makeWordState);
  }

  for (var _i = 0; _i < utlds.length; _i++) {
    makeChainT(Start, utlds[_i], makeNearUWordState(UTLD), makeUWordState);
  } // Collect the states generated by different protocls


  var DefaultScheme = makeNearWordState(SCHEME);
  var DefaultSlashScheme = makeNearWordState(SLASH_SCHEME);
  makeChainT(Start, 'file', DefaultScheme, makeWordState);
  makeChainT(Start, 'mailto', DefaultScheme, makeWordState);
  makeChainT(Start, 'ftp', DefaultSlashScheme, makeWordState);
  makeChainT(Start, 'http', DefaultSlashScheme, makeWordState); // Secure (https, ftps) protocols (end with 's')

  makeT(DefaultSlashScheme, 's', DefaultSlashScheme); // Register custom schemes

  var CustomScheme = makeNearWordState(SCHEME);
  var CustomSlashScheme = makeNearWordState(SLASH_SCHEME);
  var CustomCompoundScheme = makeAcceptingState(SCHEME);
  var CustomCompoundSlashScheme = makeAcceptingState(SLASH_SCHEME);
  customSchemes = customSchemes.sort(function (a, b) {
    return a[0] > b[0] ? 1 : -1;
  });

  for (var _i2 = 0; _i2 < customSchemes.length; _i2++) {
    var schemeParts = customSchemes[_i2][0].split('-');

    var schemeState = schemeParts.length === 1 ? customSchemes[_i2][1] ? CustomScheme : CustomSlashScheme : customSchemes[_i2][1] ? CustomCompoundScheme : CustomCompoundSlashScheme;
    var state = Start;

    for (var j = 0; j < schemeParts.length; j++) {
      var defaultStateFactory = j === 0 ? makeWordState : makeState;
      var endState = j === schemeParts.length - 1 ? schemeState : defaultStateFactory();
      state = makeChainT(state, schemeParts[j], endState, defaultStateFactory);

      if (schemeParts.length > 1 && j < schemeParts.length - 1) {
        state = makeT(state, '-', makeState());
      }
    }
  } // Localhost token


  makeChainT(Start, 'localhost', makeNearWordState(LOCALHOST), makeWordState); // Everything else
  // Number and character transitions

  makeRegexT(Start, DIGIT, Num);
  makeRegexT(Start, ASCII_LETTER, Word);
  makeRegexT(Start, LETTER, UWord);
  makeRegexT(Start, EMOJI, Emoji);
  makeRegexT(Start, EMOJI_VARIATION, Emoji); // This one is sketchy

  makeRegexT(Num, DIGIT, Num);
  makeRegexT(Word, ASCII_LETTER, Word);
  makeRegexT(UWord, ASCII_LETTER, NonAccepting);
  makeRegexT(UWord, LETTER, UWord);
  makeRegexT(Emoji, EMOJI, Emoji);
  makeRegexT(Emoji, EMOJI_VARIATION, Emoji); // Account for zero-width joiner for chaining multiple emojis
  // Not sure if these are actu

  var EmojiJoiner = makeState();
  makeT(Emoji, "\u200D", EmojiJoiner);
  makeRegexT(EmojiJoiner, EMOJI, Emoji);
  makeRegexT(EmojiJoiner, EMOJI_VARIATION, Emoji); // Set default transition for start state (some symbol)

  Start.jd = makeAcceptingState(SYM);
  return Start;
}
/**
	Given a string, returns an array of TOKEN instances representing the
	composition of that string.

	@method run
	@param {State} start scanner starting state
	@param {string} str input string to scan
	@return {Token[]} list of tokens, each with a type and value
*/

function run$1(start, str) {
  // State machine is not case sensitive, so input is tokenized in lowercased
  // form (still returns regular case). Uses selective `toLowerCase` because
  // lowercasing the entire string causes the length and character position to
  // vary in some non-English strings with V8-based runtimes.
  var iterable = stringToArray(str.replace(/[A-Z]/g, function (c) {
    return c.toLowerCase();
  }));
  var charCount = iterable.length; // <= len if there are emojis, etc

  var tokens = []; // return value
  // cursor through the string itself, accounting for characters that have
  // width with length 2 such as emojis

  var cursor = 0; // Cursor through the array-representation of the string

  var charCursor = 0; // Tokenize the string

  while (charCursor < charCount) {
    var state = start;
    var nextState = null;
    var tokenLength = 0;
    var latestAccepting = null;
    var sinceAccepts = -1;
    var charsSinceAccepts = -1;

    while (charCursor < charCount && (nextState = takeT(state, iterable[charCursor]))) {
      state = nextState; // Keep track of the latest accepting state

      if (state.accepts()) {
        sinceAccepts = 0;
        charsSinceAccepts = 0;
        latestAccepting = state;
      } else if (sinceAccepts >= 0) {
        sinceAccepts += iterable[charCursor].length;
        charsSinceAccepts++;
      }

      tokenLength += iterable[charCursor].length;
      cursor += iterable[charCursor].length;
      charCursor++;
    } // Roll back to the latest accepting state


    cursor -= sinceAccepts;
    charCursor -= charsSinceAccepts;
    tokenLength -= sinceAccepts; // No more jumps, just make a new token from the last accepting one
    // TODO: If possible, don't output v, instead output range where values ocur

    tokens.push({
      t: latestAccepting.t,
      // token type/name
      v: str.substr(cursor - tokenLength, tokenLength),
      // string value
      s: cursor - tokenLength,
      // start index
      e: cursor // end index (excluding)

    });
  }

  return tokens;
}
/**
 * Convert a String to an Array of characters, taking into account that some
 * characters like emojis take up two string indexes.
 *
 * Adapted from core-js (MIT license)
 * https://github.com/zloirock/core-js/blob/2d69cf5f99ab3ea3463c395df81e5a15b68f49d9/packages/core-js/internals/string-multibyte.js
 *
 * @function stringToArray
 * @param {string} str
 * @returns {string[]}
 */

function stringToArray(str) {
  var result = [];
  var len = str.length;
  var index = 0;

  while (index < len) {
    var first = str.charCodeAt(index);
    var second = void 0;
    var char = first < 0xd800 || first > 0xdbff || index + 1 === len || (second = str.charCodeAt(index + 1)) < 0xdc00 || second > 0xdfff ? str[index] // single character
    : str.slice(index, index + 2); // two-index characters

    result.push(char);
    index += char.length;
  }

  return result;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

/**
 * An object where each key is a valid DOM Event Name such as `click` or `focus`
 * and each value is an event handler function.
 *
 * https://developer.mozilla.org/en-US/docs/Web/API/Element#events
 * @typedef {?{ [event: string]: Function }} EventListeners
 */

/**
 * All formatted properties required to render a link, including `tagName`,
 * `attributes`, `content` and `eventListeners`.
 * @typedef {{ tagName: any, attributes: {[attr: string]: any}, content: string,
 * eventListeners: EventListeners }} IntermediateRepresentation
 */

/**
 * Specify either an object described by the template type `O` or a function.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `O`
 * @template O
 * @typedef {O | ((value: string, type: string, token: MultiToken) => O)} OptObj
 */

/**
 * Specify either a function described by template type `F` or an object.
 *
 * Each key in the object should be a link type (`'url'`, `'hashtag`', etc.). Each
 * value should be a function with template type `F` that is called when the
 * corresponding link type is encountered.
 * @template F
 * @typedef {F | { [type: string]: F}} OptFn
 */

/**
 * Specify either a value with template type `V`, a function that returns `V` or
 * an object where each value resolves to `V`.
 *
 * The function takes a string value (usually the link's href attribute), the
 * link type (`'url'`, `'hashtag`', etc.) and an internal token representation
 * of the link. It should return an object of the template type `V`
 *
 * For the object, each key should be a link type (`'url'`, `'hashtag`', etc.).
 * Each value should either have type `V` or a function that returns V. This
 * function similarly takes a string value and a token.
 *
 * Example valid types for `Opt<string>`:
 *
 * ```js
 * 'hello'
 * (value, type, token) => 'world'
 * { url: 'hello', email: (value, token) => 'world'}
 * ```
 * @template V
 * @typedef {V | ((value: string, type: string, token: MultiToken) => V) | { [type: string]: V | ((value: string, token: MultiToken) => V) }} Opt
 */

/**
 * See available options: https://linkify.js.org/docs/options.html
 * @typedef {{
 * 	defaultProtocol?: string,
 *  events?: OptObj<EventListeners>,
 * 	format?: Opt<string>,
 * 	formatHref?: Opt<string>,
 * 	nl2br?: boolean,
 * 	tagName?: Opt<any>,
 * 	target?: Opt<string>,
 * 	rel?: Opt<string>,
 * 	validate?: Opt<boolean>,
 * 	truncate?: Opt<number>,
 * 	className?: Opt<string>,
 * 	attributes?: OptObj<({ [attr: string]: any })>,
 *  ignoreTags?: string[],
 * 	render?: OptFn<((ir: IntermediateRepresentation) => any)>
 * }} Opts
 */

/**
 * @type Required<Opts>
 */

var defaults = {
  defaultProtocol: 'http',
  events: null,
  format: noop,
  formatHref: noop,
  nl2br: false,
  tagName: 'a',
  target: null,
  rel: null,
  validate: true,
  truncate: Infinity,
  className: null,
  attributes: null,
  ignoreTags: [],
  render: null
};
/**
 * Utility class for linkify interfaces to apply specified
 * {@link Opts formatting and rendering options}.
 *
 * @param {Opts | Options} [opts] Option value overrides.
 * @param {(ir: IntermediateRepresentation) => any} [defaultRender] (For
 *   internal use) default render function that determines how to generate an
 *   HTML element based on a link token's derived tagName, attributes and HTML.
 *   Similar to render option
 */

function Options(opts, defaultRender) {
  if (defaultRender === void 0) {
    defaultRender = null;
  }

  var o = assign({}, defaults);

  if (opts) {
    o = assign(o, opts instanceof Options ? opts.o : opts);
  } // Ensure all ignored tags are uppercase


  var ignoredTags = o.ignoreTags;
  var uppercaseIgnoredTags = [];

  for (var i = 0; i < ignoredTags.length; i++) {
    uppercaseIgnoredTags.push(ignoredTags[i].toUpperCase());
  }
  /** @protected */


  this.o = o;

  if (defaultRender) {
    this.defaultRender = defaultRender;
  }

  this.ignoreTags = uppercaseIgnoredTags;
}
Options.prototype = {
  o: defaults,

  /**
   * @param {IntermediateRepresentation} ir
   * @returns {any}
   */
  defaultRender: function defaultRender(ir) {
    return ir;
  },

  /**
   * Returns true or false based on whether a token should be displayed as a
   * link based on the user options.
   * @param {MultiToken} token
   * @returns {boolean}
   */
  check: function check(token) {
    return this.get('validate', token.toString(), token);
  },
  // Private methods

  /**
   * Resolve an option's value based on the value of the option and the given
   * params. If operator and token are specified and the target option is
   * callable, automatically calls the function with the given argument.
   * @template {keyof Opts} K
   * @param {K} key Name of option to use
   * @param {string} [operator] will be passed to the target option if it's a
   * function. If not specified, RAW function value gets returned
   * @param {MultiToken} [token] The token from linkify.tokenize
   * @returns {Opts[K] | any}
   */
  get: function get(key, operator, token) {
    var isCallable = operator != null;
    var option = this.o[key];

    if (!option) {
      return option;
    }

    if (typeof option === 'object') {
      option = token.t in option ? option[token.t] : defaults[key];

      if (typeof option === 'function' && isCallable) {
        option = option(operator, token);
      }
    } else if (typeof option === 'function' && isCallable) {
      option = option(operator, token.t, token);
    }

    return option;
  },

  /**
   * @template {keyof Opts} L
   * @param {L} key Name of options object to use
   * @param {string} [operator]
   * @param {MultiToken} [token]
   * @returns {Opts[L] | any}
   */
  getObj: function getObj(key, operator, token) {
    var obj = this.o[key];

    if (typeof obj === 'function' && operator != null) {
      obj = obj(operator, token.t, token);
    }

    return obj;
  },

  /**
   * Convert the given token to a rendered element that may be added to the
   * calling-interface's DOM
   * @param {MultiToken} token Token to render to an HTML element
   * @returns {any} Render result; e.g., HTML string, DOM element, React
   *   Component, etc.
   */
  render: function render(token) {
    var ir = token.render(this); // intermediate representation

    var renderFn = this.get('render', null, token) || this.defaultRender;
    return renderFn(ir, token.t, token);
  }
};

function noop(val) {
  return val;
}

var options = /*#__PURE__*/Object.freeze({
	__proto__: null,
	defaults: defaults,
	Options: Options,
	assign: assign
});

/******************************************************************************
	Multi-Tokens
	Tokens composed of arrays of TextTokens
******************************************************************************/

/**
 * @param {string} value
 * @param {Token[]} tokens
 */

function MultiToken(value, tokens) {
  this.t = 'token';
  this.v = value;
  this.tk = tokens;
}
/**
 * Abstract class used for manufacturing tokens of text tokens. That is rather
 * than the value for a token being a small string of text, it's value an array
 * of text tokens.
 *
 * Used for grouping together URLs, emails, hashtags, and other potential
 * creations.
 * @class MultiToken
 * @property {string} t
 * @property {string} v
 * @property {Token[]} tk
 * @abstract
 */

MultiToken.prototype = {
  isLink: false,

  /**
   * Return the string this token represents.
   * @return {string}
   */
  toString: function toString() {
    return this.v;
  },

  /**
   * What should the value for this token be in the `href` HTML attribute?
   * Returns the `.toString` value by default.
   * @param {string} [scheme]
   * @return {string}
  */
  toHref: function toHref(scheme) {
    return this.toString();
  },

  /**
   * @param {Options} options Formatting options
   * @returns {string}
   */
  toFormattedString: function toFormattedString(options) {
    var val = this.toString();
    var truncate = options.get('truncate', val, this);
    var formatted = options.get('format', val, this);
    return truncate && formatted.length > truncate ? formatted.substring(0, truncate) + '…' : formatted;
  },

  /**
   *
   * @param {Options} options
   * @returns {string}
   */
  toFormattedHref: function toFormattedHref(options) {
    return options.get('formatHref', this.toHref(options.get('defaultProtocol')), this);
  },

  /**
   * The start index of this token in the original input string
   * @returns {number}
   */
  startIndex: function startIndex() {
    return this.tk[0].s;
  },

  /**
   * The end index of this token in the original input string (up to this
   * index but not including it)
   * @returns {number}
   */
  endIndex: function endIndex() {
    return this.tk[this.tk.length - 1].e;
  },

  /**
  	Returns an object  of relevant values for this token, which includes keys
  	* type - Kind of token ('url', 'email', etc.)
  	* value - Original text
  	* href - The value that should be added to the anchor tag's href
  		attribute
  		@method toObject
  	@param {string} [protocol] `'http'` by default
  */
  toObject: function toObject(protocol) {
    if (protocol === void 0) {
      protocol = defaults.defaultProtocol;
    }

    return {
      type: this.t,
      value: this.toString(),
      isLink: this.isLink,
      href: this.toHref(protocol),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },

  /**
   *
   * @param {Options} options Formatting option
   */
  toFormattedObject: function toFormattedObject(options) {
    return {
      type: this.t,
      value: this.toFormattedString(options),
      isLink: this.isLink,
      href: this.toFormattedHref(options),
      start: this.startIndex(),
      end: this.endIndex()
    };
  },

  /**
   * Whether this token should be rendered as a link according to the given options
   * @param {Options} options
   * @returns {boolean}
   */
  validate: function validate(options) {
    return options.get('validate', this.toString(), this);
  },

  /**
   * Return an object that represents how this link should be rendered.
   * @param {Options} options Formattinng options
   */
  render: function render(options) {
    var token = this;
    var href = this.toFormattedHref(options);
    var tagName = options.get('tagName', href, token);
    var content = this.toFormattedString(options);
    var attributes = {};
    var className = options.get('className', href, token);
    var target = options.get('target', href, token);
    var rel = options.get('rel', href, token);
    var attrs = options.getObj('attributes', href, token);
    var eventListeners = options.getObj('events', href, token);
    attributes.href = href;

    if (className) {
      attributes.class = className;
    }

    if (target) {
      attributes.target = target;
    }

    if (rel) {
      attributes.rel = rel;
    }

    if (attrs) {
      assign(attributes, attrs);
    }

    return {
      tagName: tagName,
      attributes: attributes,
      content: content,
      eventListeners: eventListeners
    };
  }
}; // Base token
/**
 * Create a new token that can be emitted by the parser state machine
 * @param {string} type readable type of the token
 * @param {object} props properties to assign or override, including isLink = true or false
 * @returns {new (value: string, tokens: Token[]) => MultiToken} new token class
 */

function createTokenClass(type, props) {
  var Token = /*#__PURE__*/function (_MultiToken) {
    _inheritsLoose(Token, _MultiToken);

    function Token(value, tokens) {
      var _this;

      _this = _MultiToken.call(this, value, tokens) || this;
      _this.t = type;
      return _this;
    }

    return Token;
  }(MultiToken);

  for (var p in props) {
    Token.prototype[p] = props[p];
  }

  return Token;
}
/**
	Represents a list of tokens making up a valid email address
*/

var Email = createTokenClass('email', {
  isLink: true,
  toHref: function toHref() {
    return 'mailto:' + this.toString();
  }
});
/**
	Represents some plain text
*/

var Text = createTokenClass('text');
/**
	Multi-linebreak token - represents a line break
	@class Nl
*/

var Nl = createTokenClass('nl');
/**
	Represents a list of text tokens making up a valid URL
	@class Url
*/

var Url = createTokenClass('url', {
  isLink: true,

  /**
  	Lowercases relevant parts of the domain and adds the protocol if
  	required. Note that this will not escape unsafe HTML characters in the
  	URL.
  		@param {string} [scheme] default scheme (e.g., 'https')
  	@return {string} the full href
  */
  toHref: function toHref(scheme) {
    if (scheme === void 0) {
      scheme = defaults.defaultProtocol;
    }

    // Check if already has a prefix scheme
    return this.hasProtocol() ? this.v : scheme + "://" + this.v;
  },

  /**
   * Check whether this URL token has a protocol
   * @return {boolean}
   */
  hasProtocol: function hasProtocol() {
    var tokens = this.tk;
    return tokens.length >= 2 && scheme.indexOf(tokens[0].t) >= 0 && tokens[1].t === COLON;
  }
});

var multi = /*#__PURE__*/Object.freeze({
	__proto__: null,
	MultiToken: MultiToken,
	Base: MultiToken,
	createTokenClass: createTokenClass,
	Email: Email,
	Text: Text,
	Nl: Nl,
	Url: Url
});

/**
	Not exactly parser, more like the second-stage scanner (although we can
	theoretically hotswap the code here with a real parser in the future... but
	for a little URL-finding utility abstract syntax trees may be a little
	overkill).

	URL format: http://en.wikipedia.org/wiki/URI_scheme
	Email format: http://en.wikipedia.org/wiki/EmailAddress (links to RFC in
	reference)

	@module linkify
	@submodule parser
	@main run
*/
/**
 * Generate the parser multi token-based state machine
 * @returns {State} the starting state
 */

function init$1() {
  // The universal starting state.
  var Start = makeState(); // Intermediate states for URLs. Note that domains that begin with a protocol
  // are treated slighly differently from those that don't.

  var Scheme = makeState(); // e.g., 'mailto'

  var SlashScheme = makeState(); // e.g., 'http'

  var SlashSchemeColon = makeState(); // e.g., 'http:'

  var SlashSchemeColonSlash = makeState(); // e.g., 'http:/'

  var UriPrefix = makeState(); // e.g., 'mailto:' or 'http://'

  var Domain = makeState(); // parsed string ends with a potential domain name (A)

  var DomainDot = makeState(); // domain followed by DOT

  var DomainHyphen = makeState(); // domain followed by hyphen

  var DomainDotTld = makeAcceptingState(Url); // Simplest possible URL with no query string

  var DomainDotTldColon = makeState(); // URL followed by colon (potential port number here)

  var DomainDotTldColonPort = makeAcceptingState(Url); // TLD followed by a port number

  var Url$1 = makeAcceptingState(Url); // Long URL with optional port and maybe query string

  var UrlNonaccept = makeState(); // URL followed by some symbols (will not be part of the final URL)

  var UrlOpenbrace = makeState(); // URL followed by {

  var UrlOpenbracket = makeState(); // URL followed by [

  var UrlOpenanglebracket = makeState(); // URL followed by <

  var UrlOpenparen = makeState(); // URL followed by (

  var UrlOpenbraceQ = makeAcceptingState(Url); // URL followed by { and some symbols that the URL can end it

  var UrlOpenbracketQ = makeAcceptingState(Url); // URL followed by [ and some symbols that the URL can end it

  var UrlOpenanglebracketQ = makeAcceptingState(Url); // URL followed by < and some symbols that the URL can end it

  var UrlOpenparenQ = makeAcceptingState(Url); // URL followed by ( and some symbols that the URL can end it

  var UrlOpenbraceSyms = makeState(); // UrlOpenbrace followed by some symbols it cannot end it

  var UrlOpenbracketSyms = makeState(); // UrlOpenbracketQ followed by some symbols it cannot end it

  var UrlOpenanglebracketSyms = makeState(); // UrlOpenanglebracketQ followed by some symbols it cannot end it

  var UrlOpenparenSyms = makeState(); // UrlOpenparenQ followed by some symbols it cannot end it

  var EmailDomain = makeState(); // parsed string starts with local email info + @ with a potential domain name

  var EmailDomainDot = makeState(); // domain followed by DOT

  var EmailDomainHyphen = makeState(); // parsed string starts with local email info + @ with a potential domain name

  var Email$1 = makeAcceptingState(Email); // Possible email address (could have more tlds)

  var EmailColon = makeState(); // URL followed by colon (potential port number here)

  var EmailColonPort = makeAcceptingState(Email); // URL followed by colon and potential port numner

  var Localpart = makeState(); // Local part of the email address

  var LocalpartAt = makeState(); // Local part of the email address plus @

  var LocalpartAtNum = makeState(); // Local part of the email address plus @ plus a number

  var LocalpartDot = makeState(); // Local part of the email address plus '.' (localpart cannot end in .)

  var Nl$1 = makeAcceptingState(Nl); // single new line
  // Make path from start to protocol (with '//')

  makeT(Start, NL, Nl$1);
  makeT(Start, SCHEME, Scheme);
  makeT(Start, SLASH_SCHEME, SlashScheme);
  makeT(Start, COMPOUND_SCHEME, Scheme);
  makeT(Start, COMPOUND_SLASH_SCHEME, SlashScheme); // Most transitions after a UriPrefix will be considered URL tokens

  makeT(Scheme, COLON, UriPrefix);
  makeT(SlashScheme, COLON, SlashSchemeColon);
  makeT(SlashSchemeColon, SLASH, SlashSchemeColonSlash);
  makeT(SlashSchemeColonSlash, SLASH, UriPrefix); // The very first potential domain name + full URL

  makeT(Start, LOCALHOST, DomainDotTld); // Some transitions from this call are ignored because they're already
  // accounted for in the scheme state definitions above

  makeMultiT(Start, domain, Domain); // Account for dots and hyphens. Hyphens are usually parts of domain names
  // (but not TLDs)

  makeT(Domain, DOT, DomainDot);
  makeT(Domain, HYPHEN, DomainHyphen);
  makeMultiT(Domain, domain, Domain);
  makeT(Scheme, DOT, DomainDot);
  makeT(Scheme, HYPHEN, DomainHyphen);
  makeMultiT(Scheme, domain, Domain);
  makeT(SlashScheme, DOT, DomainDot);
  makeT(SlashScheme, HYPHEN, DomainHyphen);
  makeMultiT(SlashScheme, domain, Domain);
  makeT(DomainDot, TLD, DomainDotTld);
  makeT(DomainDot, UTLD, DomainDotTld);
  makeMultiT(DomainDot, domain, Domain); // Hyphen can jump back to a domain name

  makeMultiT(DomainHyphen, domain, Domain);
  makeT(DomainDotTld, DOT, DomainDot);
  makeT(DomainDotTld, HYPHEN, DomainHyphen);
  makeMultiT(DomainDotTld, domain, Domain); // Become real URLs after `SLASH` or `COLON NUM SLASH`
  // Here works with or without scheme:// prefix

  makeT(DomainDotTld, COLON, DomainDotTldColon);
  makeT(DomainDotTld, SLASH, Url$1);
  makeMultiT(DomainDotTldColon, numeric, DomainDotTldColonPort);
  makeT(DomainDotTldColonPort, SLASH, Url$1); // Force URL with scheme prefix followed by anything sane

  makeT(UriPrefix, SLASH, Url$1);
  makeMultiT(UriPrefix, domain, Url$1); // Types of characters the URL can definitely end in

  var qsAccepting = domain.concat([AMPERSAND, ASTERISK, AT, BACKSLASH, BACKTICK, CARET, DOLLAR, EQUALS, HYPHEN, NUM, PERCENT, PIPE, PLUS, POUND, SLASH, SYM, TILDE, UNDERSCORE]); // Types of tokens that can follow a URL and be part of the query string
  // but cannot be the very last characters
  // Characters that cannot appear in the URL at all should be excluded

  var qsNonAccepting = [APOSTROPHE, CLOSEANGLEBRACKET, CLOSEBRACE, CLOSEBRACKET, CLOSEPAREN, COLON, COMMA, DOT, EXCLAMATION, OPENANGLEBRACKET, OPENBRACE, OPENBRACKET, OPENPAREN, QUERY, QUOTE, SEMI]; // These states are responsible primarily for determining whether or not to
  // include the final round bracket.
  // URL, followed by an opening bracket

  makeT(Url$1, OPENBRACE, UrlOpenbrace);
  makeT(Url$1, OPENBRACKET, UrlOpenbracket);
  makeT(Url$1, OPENANGLEBRACKET, UrlOpenanglebracket);
  makeT(Url$1, OPENPAREN, UrlOpenparen); // URL with extra symbols at the end, followed by an opening bracket

  makeT(UrlNonaccept, OPENBRACE, UrlOpenbrace);
  makeT(UrlNonaccept, OPENBRACKET, UrlOpenbracket);
  makeT(UrlNonaccept, OPENANGLEBRACKET, UrlOpenanglebracket);
  makeT(UrlNonaccept, OPENPAREN, UrlOpenparen); // Closing bracket component. This character WILL be included in the URL

  makeT(UrlOpenbrace, CLOSEBRACE, Url$1);
  makeT(UrlOpenbracket, CLOSEBRACKET, Url$1);
  makeT(UrlOpenanglebracket, CLOSEANGLEBRACKET, Url$1);
  makeT(UrlOpenparen, CLOSEPAREN, Url$1);
  makeT(UrlOpenbrace, CLOSEBRACE, Url$1);
  makeT(UrlOpenbracketQ, CLOSEBRACKET, Url$1);
  makeT(UrlOpenanglebracketQ, CLOSEANGLEBRACKET, Url$1);
  makeT(UrlOpenparenQ, CLOSEPAREN, Url$1);
  makeT(UrlOpenbrace, CLOSEBRACE, Url$1);
  makeT(UrlOpenbracketSyms, CLOSEBRACKET, Url$1);
  makeT(UrlOpenanglebracketSyms, CLOSEANGLEBRACKET, Url$1);
  makeT(UrlOpenparenSyms, CLOSEPAREN, Url$1); // URL that beings with an opening bracket, followed by a symbols.
  // Note that the final state can still be `UrlOpenbrace` (if the URL only
  // has a single opening bracket for some reason).

  makeMultiT(UrlOpenbrace, qsAccepting, UrlOpenbrace);
  makeMultiT(UrlOpenbracket, qsAccepting, UrlOpenbracketQ);
  makeMultiT(UrlOpenanglebracket, qsAccepting, UrlOpenanglebracketQ);
  makeMultiT(UrlOpenparen, qsAccepting, UrlOpenparenQ);
  makeMultiT(UrlOpenbrace, qsNonAccepting, UrlOpenbrace);
  makeMultiT(UrlOpenbracket, qsNonAccepting, UrlOpenbracketSyms);
  makeMultiT(UrlOpenanglebracket, qsNonAccepting, UrlOpenanglebracketSyms);
  makeMultiT(UrlOpenparen, qsNonAccepting, UrlOpenparenSyms); // URL that begins with an opening bracket, followed by some symbols

  makeMultiT(UrlOpenbraceQ, qsAccepting, UrlOpenbraceQ);
  makeMultiT(UrlOpenbracketQ, qsAccepting, UrlOpenbracketQ);
  makeMultiT(UrlOpenanglebracketQ, qsAccepting, UrlOpenanglebracketQ);
  makeMultiT(UrlOpenparenQ, qsAccepting, UrlOpenparenQ);
  makeMultiT(UrlOpenbraceQ, qsNonAccepting, UrlOpenbraceQ);
  makeMultiT(UrlOpenbracketQ, qsNonAccepting, UrlOpenbracketQ);
  makeMultiT(UrlOpenanglebracketQ, qsNonAccepting, UrlOpenanglebracketQ);
  makeMultiT(UrlOpenparenQ, qsNonAccepting, UrlOpenparenQ);
  makeMultiT(UrlOpenbraceSyms, qsAccepting, UrlOpenbraceSyms);
  makeMultiT(UrlOpenbracketSyms, qsAccepting, UrlOpenbracketQ);
  makeMultiT(UrlOpenanglebracketSyms, qsAccepting, UrlOpenanglebracketQ);
  makeMultiT(UrlOpenparenSyms, qsAccepting, UrlOpenparenQ);
  makeMultiT(UrlOpenbraceSyms, qsNonAccepting, UrlOpenbraceSyms);
  makeMultiT(UrlOpenbracketSyms, qsNonAccepting, UrlOpenbracketSyms);
  makeMultiT(UrlOpenanglebracketSyms, qsNonAccepting, UrlOpenanglebracketSyms);
  makeMultiT(UrlOpenparenSyms, qsNonAccepting, UrlOpenparenSyms); // Account for the query string

  makeMultiT(Url$1, qsAccepting, Url$1);
  makeMultiT(UrlNonaccept, qsAccepting, Url$1);
  makeMultiT(Url$1, qsNonAccepting, UrlNonaccept);
  makeMultiT(UrlNonaccept, qsNonAccepting, UrlNonaccept); // Email address-specific state definitions
  // Note: We are not allowing '/' in email addresses since this would interfere
  // with real URLs
  // For addresses without the mailto prefix
  // Tokens allowed in the localpart of the email

  var localpartAccepting = [AMPERSAND, APOSTROPHE, ASTERISK, BACKSLASH, BACKTICK, CARET, CLOSEBRACE, DOLLAR, EQUALS, HYPHEN, NUM, OPENBRACE, PERCENT, PIPE, PLUS, POUND, QUERY, SLASH, SYM, TILDE, UNDERSCORE]; // Some of the tokens in `localpartAccepting` are already accounted for here and
  // will not be overwritten

  makeT(Start, TILDE, Localpart);
  makeMultiT(Domain, localpartAccepting, Localpart);
  makeT(Domain, AT, LocalpartAt);
  makeMultiT(DomainDotTld, localpartAccepting, Localpart);
  makeT(DomainDotTld, AT, LocalpartAt);
  makeMultiT(DomainDot, localpartAccepting, Localpart); // Now in localpart of address

  makeMultiT(Localpart, domain, Localpart);
  makeMultiT(Localpart, localpartAccepting, Localpart);
  makeT(Localpart, AT, LocalpartAt); // close to an email address now

  makeT(Localpart, DOT, LocalpartDot);
  makeMultiT(LocalpartDot, domain, Localpart);
  makeMultiT(LocalpartDot, localpartAccepting, Localpart);
  makeT(LocalpartAt, LOCALHOST, Email$1);
  makeMultiT(LocalpartAt, domain, EmailDomain);
  makeMultiT(LocalpartAtNum, domain, EmailDomain);
  makeT(EmailDomain, DOT, EmailDomainDot);
  makeT(EmailDomain, HYPHEN, EmailDomainHyphen);
  makeT(EmailDomainDot, TLD, Email$1);
  makeT(EmailDomainDot, UTLD, Email$1);
  makeMultiT(EmailDomainDot, domain, EmailDomain); // Hyphen can jump back to a domain name

  makeMultiT(EmailDomainHyphen, domain, EmailDomain);
  makeT(Email$1, DOT, EmailDomainDot);
  makeT(Email$1, HYPHEN, EmailDomainHyphen);
  makeMultiT(Email$1, domain, EmailDomain); // Become real URLs after `SLASH` or `COLON NUM SLASH`
  // Here works with or without scheme:// prefix

  makeT(Email$1, COLON, EmailColon);
  makeMultiT(EmailColon, numeric, EmailColonPort);
  return Start;
}
/**
 * Run the parser state machine on a list of scanned string-based tokens to
 * create a list of multi tokens, each of which represents a URL, email address,
 * plain text, etc.
 *
 * @param {State} start parser start state
 * @param {string} input the original input used to generate the given tokens
 * @param {Token[]} tokens list of scanned tokens
 * @returns {MultiToken[]}
 */

function run(start, input, tokens) {
  var len = tokens.length;
  var cursor = 0;
  var multis = [];
  var textTokens = [];

  while (cursor < len) {
    var state = start;
    var secondState = null;
    var nextState = null;
    var multiLength = 0;
    var latestAccepting = null;
    var sinceAccepts = -1;

    while (cursor < len && !(secondState = takeT(state, tokens[cursor].t))) {
      // Starting tokens with nowhere to jump to.
      // Consider these to be just plain text
      textTokens.push(tokens[cursor++]);
    }

    while (cursor < len && (nextState = secondState || takeT(state, tokens[cursor].t))) {
      // Get the next state
      secondState = null;
      state = nextState; // Keep track of the latest accepting state

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
      // No accepting state was found, part of a regular text token add
      // the first text token to the text tokens array and try again from
      // the next
      cursor -= multiLength;

      if (cursor < len) {
        textTokens.push(tokens[cursor]);
        cursor++;
      }
    } else {
      // Accepting state!
      // First close off the textTokens (if available)
      if (textTokens.length > 0) {
        multis.push(parserCreateMultiToken(Text, input, textTokens));
        textTokens = [];
      } // Roll back to the latest accepting state


      cursor -= sinceAccepts;
      multiLength -= sinceAccepts; // Create a new multitoken

      var Multi = latestAccepting.t;
      var subtokens = tokens.slice(cursor - multiLength, cursor);
      multis.push(parserCreateMultiToken(Multi, input, subtokens));
    }
  } // Finally close off the textTokens (if available)


  if (textTokens.length > 0) {
    multis.push(parserCreateMultiToken(Text, input, textTokens));
  }

  return multis;
}
/**
 * Utility function for instantiating a new multitoken with all the relevant
 * fields during parsing.
 * @param {new (value: string, tokens: Token[]) => MultiToken} Multi class to instantiate
 * @param {string} input original input string
 * @param {Token[]} tokens consecutive tokens scanned from input string
 * @returns {MultiToken}
 */

function parserCreateMultiToken(Multi, input, tokens) {
  var startIdx = tokens[0].s;
  var endIdx = tokens[tokens.length - 1].e;
  var value = input.slice(startIdx, endIdx);
  return new Multi(value, tokens);
}

var warn = typeof console !== 'undefined' && console && console.warn || function () {}; // Side-effect initialization state


var INIT = {
  scanner: null,
  parser: null,
  pluginQueue: [],
  customSchemes: [],
  initialized: false
};
/**
 * De-register all plugins and reset the internal state-machine. Used for
 * testing; not required in practice.
 * @private
 */

function reset() {
  INIT.scanner = null;
  INIT.parser = null;
  INIT.pluginQueue = [];
  INIT.customSchemes = [];
  INIT.initialized = false;
}
/**
 * Register a linkify extension plugin
 * @param {string} name of plugin to register
 * @param {Function} plugin function that accepts mutable linkify state
 */

function registerPlugin(name, plugin) {
  if (typeof plugin !== 'function') {
    throw new Error("linkifyjs: Invalid plugin " + plugin + " (expects function)");
  }

  for (var i = 0; i < INIT.pluginQueue.length; i++) {
    if (name === INIT.pluginQueue[i][0]) {
      warn("linkifyjs: plugin \"" + name + "\" already registered - will be overwritten");
      INIT.pluginQueue[i] = [name, plugin];
      return;
    }
  }

  INIT.pluginQueue.push([name, plugin]);

  if (INIT.initialized) {
    warn("linkifyjs: already initialized - will not register plugin \"" + name + "\" until you manually call linkify.init(). To avoid this warning, please register all plugins before invoking linkify the first time.");
  }
}
/**
 * Detect URLs with the following additional protocol. Anything with format
 * "protocol://..." will be considered a link. If `optionalSlashSlash` is set to
 * `true`, anything with format "protocol:..." will be considered a link.
 * @param {string} protocol
 * @param {boolean} [optionalSlashSlash]
 */

function registerCustomProtocol(protocol, optionalSlashSlash) {
  if (optionalSlashSlash === void 0) {
    optionalSlashSlash = false;
  }

  if (INIT.initialized) {
    warn("linkifyjs: already initialized - will not register custom protocol \"" + protocol + "\" until you manually call linkify.init(). To avoid this warning, please register all custom schemes before invoking linkify the first time.");
  }

  if (!/^[a-z]+(-[a-z]+)*$/.test(protocol)) {
    throw new Error('linkifyjs: incorrect protocol format.\n 1. Must only contain lowercase ASCII letters or -\n 2. Cannot start or end with -\n 3. - cannot repeat');
  }

  INIT.customSchemes.push([protocol, optionalSlashSlash]);
}
/**
 * Initialize the linkify state machine. Called automatically the first time
 * linkify is called on a string, but may be called manually as well.
 */

function init() {
  // Initialize state machines
  INIT.scanner = {
    start: init$2(INIT.customSchemes),
    tokens: text
  };
  INIT.parser = {
    start: init$1(),
    tokens: multi
  };
  var utils = {
    createTokenClass: createTokenClass
  }; // Initialize plugins

  for (var i = 0; i < INIT.pluginQueue.length; i++) {
    INIT.pluginQueue[i][1]({
      scanner: INIT.scanner,
      parser: INIT.parser,
      utils: utils
    });
  }

  INIT.initialized = true;
}
/**
 * Parse a string into tokens that represent linkable and non-linkable sub-components
 * @param {string} str
 * @return {MultiToken[]} tokens
 */

function tokenize(str) {
  if (!INIT.initialized) {
    init();
  }

  return run(INIT.parser.start, str, run$1(INIT.scanner.start, str));
}
/**
 * Find a list of linkable items in the given string.
 * @param {string} str string to find links in
 * @param {string} [type] only find links of a specific type, e.g., 'url' or 'email'
 * @param {Opts} [opts] formatting options for final output
*/

function find(str, type, opts) {
  if (type === void 0) {
    type = null;
  }

  if (opts === void 0) {
    opts = null;
  }

  var options = new Options(opts);
  var tokens = tokenize(str);
  var filtered = [];

  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (token.isLink && (!type || token.t === type)) {
      filtered.push(token.toFormattedObject(options));
    }
  }

  return filtered;
}
/**
 * Is the given string valid linkable text of some sort. Note that this does not
 * trim the text for you.
 *
 * Optionally pass in a second `type` param, which is the type of link to test
 * for.
 *
 * For example,
 *
 *     linkify.test(str, 'email');
 *
 * Returns `true` if str is a valid email.
 * @param {string} str string to test for links
 * @param {string} [type] optional specific link type to look for
 * @returns boolean true/false
 */

function test(str, type) {
  if (type === void 0) {
    type = null;
  }

  var tokens = tokenize(str);
  return tokens.length === 1 && tokens[0].isLink && (!type || tokens[0].t === type);
}

export { MultiToken, Options, find, init, options, registerCustomProtocol, registerPlugin, reset, test, tokenize };
