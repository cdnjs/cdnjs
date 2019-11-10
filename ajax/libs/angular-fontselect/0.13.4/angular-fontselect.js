/*!
 * angular-fontselect v0.13.4
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2016, Jimdo GmbH
 * Released under the MIT license
 */
(function(angular, undefined) {
  'use strict';

  // src/js/helper.module.js
  var fontselectModule = angular.module('jdFontselect', []);

  // src/js/helper.defaults.js
  /** @const */
  var PROVIDER_WEBSAFE = 'websafe';

  /** @const */
  var PROVIDER_GOOGLE = 'google';

  /** @const */
  var PROVIDERS = {};
  PROVIDERS[PROVIDER_WEBSAFE] = true;
  PROVIDERS[PROVIDER_GOOGLE] = true;

  /** @const */
  var CATEGORY_SANS_SERIF = 'sansserif';

  /** @const */
  var CATEGORY_SERIF = 'serif';

  /** @const */
  var CATEGORY_HANDWRITING = 'handwriting';

  /** @const */
  var CATEGORY_DISPLAY = 'display';

  /** @const */
  var CATEGORY_OTHER = 'other';

  /** @const */
  var PAGE_SIZE_DEFAULT = 10;

  /** @const */
  var DIR_PARTIALS = 'src/partials/';

  /** @const */
  var NAME_CONTROLLER = 'Controller';

  /** @const */
  var NAME_FONTSSERVICE = 'jdFontselectFonts';

  /** @const */
  var CLOSE_EVENT = 'jdFontselectEventClose';

  /** @const */
  var DO_CLOSE_EVENT = 'jdFontselectEventDoClose';

  /** @const */
  var OPEN_EVENT = 'jdFontselectEventOpen';

  /** @const */
  var DEFAULT_WEBSAFE_FONTS = [
    {
      name: 'Arial',
      key: 'arial',
      category: CATEGORY_SANS_SERIF,
      stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      popularity: 3,
      lastModified: '2014-01-28'
    },
    {
      name: 'Consolas',
      key: 'consolas',
      category: CATEGORY_SANS_SERIF,
      stack: 'Consolas, "Lucida Console", Monaco, monospace',
      popularity: 1,
      lastModified: '2014-02-04'
    },
    {
      name: 'Courier New',
      key: 'couriernew',
      category: CATEGORY_SERIF,
      stack: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
      popularity: 1,
      lastModified: '2014-01-28'
    },
    {
      name: 'Georgia',
      key: 'georgia',
      category: CATEGORY_SERIF,
      stack: 'Georgia, Palatino, "Palatino Linotype", Times, "Times New Roman", serif',
      popularity: 2,
      lastModified: '2014-02-04'
    },
    {
      name: 'Helvetica',
      key: 'helvetica',
      category: CATEGORY_SANS_SERIF,
      stack: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Impact',
      key: 'impact',
      category: CATEGORY_DISPLAY,
      stack: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Lucida Sans',
      key: 'lucidasans',
      category: CATEGORY_SANS_SERIF,
      stack: '"Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Palatino',
      key: 'palatino',
      category: CATEGORY_SERIF,
      stack: 'Palatino, "Palatino Linotype", Georgia, Times, "Times New Roman", serif',
      popularity: 2,
      lastModified: '2014-02-04'
    },
    {
      name: 'Tahoma',
      key: 'tahoma',
      category: CATEGORY_SANS_SERIF,
      stack: 'Tahoma, Verdana, Geneva, sans-serif',
      popularity: 6,
      lastModified: '2014-02-04'
    },
    {
      name: 'Trebuchet',
      key: 'trebuchet',
      category: CATEGORY_SANS_SERIF,
      stack: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
      popularity: 6,
      lastModified: '2014-02-04'
    },
    {
      name: 'Verdana',
      key: 'verdana',
      category: CATEGORY_SANS_SERIF,
      stack: 'Verdana, Geneva, sans-serif',
      popularity: 6,
      lastModified: '2014-01-28'
    },
    {
      name: 'Times New Roman',
      key: 'timesnewroman',
      category: CATEGORY_SERIF,
      stack: 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
      popularity: 2,
      lastModified: '2014-01-28'
    },
    {
      name: 'Brush Script',
      key: 'brushscript',
      category: CATEGORY_HANDWRITING,
      stack: '"Brush Script MT", cursive',
      popularity: 5,
      lastModified: '2014-01-29'
    }
  ];

  var CATEGORY_OBJECTS = {};
  CATEGORY_OBJECTS[CATEGORY_SANS_SERIF] = {
    key: CATEGORY_SANS_SERIF,
    fallback: 'sans-serif'
  };
  CATEGORY_OBJECTS[CATEGORY_SERIF] = {
    key: CATEGORY_SERIF,
    fallback: 'serif'
  };
  CATEGORY_OBJECTS[CATEGORY_HANDWRITING] = {
    key: CATEGORY_HANDWRITING,
    fallback: 'cursive'
  };
  CATEGORY_OBJECTS[CATEGORY_DISPLAY] = {
    key: CATEGORY_DISPLAY,
    fallback: 'fantasy'
  };
  CATEGORY_OBJECTS[CATEGORY_OTHER] = {
    key: CATEGORY_OTHER,
    fallback: 'sans-serif'
  };

  /** @const */
  var DEFAULT_CATEGORIES = [
    CATEGORY_OBJECTS[CATEGORY_SANS_SERIF],
    CATEGORY_OBJECTS[CATEGORY_SERIF],
    CATEGORY_OBJECTS[CATEGORY_HANDWRITING],
    CATEGORY_OBJECTS[CATEGORY_DISPLAY],
    CATEGORY_OBJECTS[CATEGORY_OTHER]
  ];

  /** @const */
  var DIRECTION_NEXT = 'next';

  /** @const */
  var DIRECTION_PREVIOUS = 'prev';

  /** @const */
  var REQUIRED_FONT_OBJECT_KEYS = [
    'name',
    'key',
    'stack'
  ];

  /** @const */
  var METHOD_GET = 'get';

  /** @const */
  var URL_GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';

  /** @const */
  var URL_GOOGLE_FONTS_CSS = 'https://fonts.googleapis.com/css';

  /** @const */
  var SUBSET_CYRILLIC = 'cyrillic';

  /** @const */
  var SUBSET_CYRILLIC_EXT = 'cyrillic-ext';

  /** @const */
  var SUBSET_GREEK = 'greek';

  /** @const */
  var SUBSET_GREEK_EXT = 'greek-ext';

  /** @const */
  var SUBSET_LATIN = 'latin';

  /** @const */
  var SUBSET_LATIN_EXT = 'latin-ext';

  /** @const */
  var SUBSET_VIETNAMESE = 'vietnamese';

  /** @const */
  var SUBSET_PRIORITY = [
    SUBSET_LATIN,
    SUBSET_LATIN_EXT,
    SUBSET_GREEK,
    SUBSET_GREEK_EXT,
    SUBSET_CYRILLIC,
    SUBSET_CYRILLIC_EXT,
    SUBSET_VIETNAMESE
  ];

  /** @const */
  var VALUE_NO_FONT_STACK = false;

  /** @const */
  var VARIANTS_REGULAR = ['regular', '400', '300', '500'];

  /** @const */
  var VARIANTS_LIGHT = ['light', '100', '200'];

  /** @const */
  var VARIANTS_BOLD = ['bold', '600', '700', '800', '900'];

  /** @const */
  var VARIANTS_ITALIC = ['italic', '400italic', '300italic', '500italic'];

  /** @const */
  var VARIANTS_LIGHT_ITALIC = ['lightitalic', '100italic', '200italic'];

  /** @const */
  var VARIANTS_BOLD_ITALIC = ['bolditalic', '600italic', '700italic', '800italic', '900italic'];

  /** @const */
  var VARIANT_PRIORITY = VARIANTS_REGULAR.concat(
    VARIANTS_LIGHT,
    VARIANTS_BOLD,
    VARIANTS_ITALIC,
    VARIANTS_LIGHT_ITALIC,
    VARIANTS_BOLD_ITALIC
  );

  /** @const */
  var KEY_ESCAPE = 27;

  /** @const */
  var KEY_ENTER = 13;

  /** @const */
  var KEY_UP = 38;

  /** @const */
  var KEY_DOWN = 40;

  /** @const */
  var KEY_LEFT = 37;

  /** @const */
  var KEY_RIGHT = 39;

  /** @const */
  var SCROLL_BUFFER = 30;

  /** @const */
  var SORT_ATTRIBUTES = [
    {
      key: 'name',
      dir: false
    },
    {
      key: 'popularity',
      dir: true
    },
    {
      key: 'lastModified',
      dir: true
    }
  ];

  /** @const */
  var STATE_DEFAULTS = {
    sort: {
      attr: undefined,
      direction: true
    },
    providers: PROVIDERS,
    category: undefined,
    font: undefined,
    search: '',
    subsets: {
      latin: true
    }
  };

  /** @const */
  var TEXT_DEFAULTS = {
    toggleOpenLabel: 'open',
    toggleCloseLabel: 'close',
    searchToggleLabel: 'Search',
    search: 'Search by Fontname',
    toggleSearchLabel: 'Choose Font',
    providerLabel: 'Providers',
    subsetLabel: 'Subsets',
    styleLabel: 'Categories',
    settingsLabel: 'Settings',
    noResultsLabel: 'No Fonts found.',
    pageLabel: 'Page: ',
    fontFabel: 'Fonts: ',
    closeButton: 'Close',
    allFontsListHeadline: 'All Fonts',
    curatedFontsListHeadline: 'Curated Fonts',
    page: {
      prev: '▲',
      next: '▼'
    },
    provider: {
      websafe: 'Websafe Fonts',
      google: 'Google Fonts'
    },
    category: {
      serif: 'Serif',
      sansserif: 'Sans Serif',
      display: 'Display',
      handwriting: 'Handwriting',
      other: 'Other'
    },
    subset: {
      cyrillic: 'Cyrillic',
      'cyrillic-ext': 'Cyrillic Extended',
      greek: 'Greek',
      'greek-ext': 'Greek Extended',
      latin: 'Latin',
      'latin-ext': 'Latin Extended',
      vietnamese: 'Vietnamese',
      devanagari: 'Devanagari',
      khmer: 'Khmer'
    },
    sort: {
      popularity: 'Popularity',
      name: 'Alphabet',
      lastModified: 'Latest'
    },
    sortdir: {
      desc: '▼',
      asc: '▲'
    }
  };

  fontselectModule.constant('jdFontselectConfig', {
    googleApiKey: window._jdFontselectGoogleApiKey || false
  });

  var FONTLIST_ENTRY_TYPE_HEADLINE = 'HEADLINE';
  var FONTLIST_ENTRY_TYPE_FONT = 'FONT';
  var FONTLIST_ENTRY_TYPE_TEXT = 'TEXT';

  // src/js/helper.google-font-categories.js
  /** @const */
  var GOOGLE_FONT_CATEGORIES = {};
  GOOGLE_FONT_CATEGORIES[CATEGORY_HANDWRITING] = [
      'Patrick Hand SC',
      'Grand Hotel',
      'Calligraffitti',
      'Coming Soon',
      'Crafty Girls',
      'Homemade Apple',
      'Just Another Hand',
      'Montez',
      'Permanent Marker',
      'Rancho',
      'Redressed',
      'Rochester',
      'Rock Salt',
      'Satisfy',
      'Schoolbell',
      'Sunshiney',
      'Walter Turncoat',
      'Yellowtail',
      'Aguafina Script',
      'Aladin',
      'Alex Brush',
      'Allura',
      'Amatic SC',
      'Annie Use Your Telescope',
      'Architects Daughter',
      'Arizonia',
      'Bad Script',
      'Berkshire Swash',
      'Bilbo',
      'Bilbo Swash Caps',
      'Bonbon',
      'Butterfly Kids',
      'Cedarville Cursive',
      'Clicker Script',
      'Condiment',
      'Cookie',
      'Courgette',
      'Covered By Your Grace',
      'Damion',
      'Dancing Script',
      'Dawning of a New Day',
      'Delius',
      'Delius Swash Caps',
      'Delius Unicase',
      'Devonshire',
      'Dr Sugiyama',
      'Eagle Lake',
      'Engagement',
      'Euphoria Script',
      'Felipa',
      'Fondamento',
      'Give You Glory',
      'Gloria Hallelujah',
      'Gochi Hand',
      'Great Vibes',
      'Handlee',
      'Herr Von Muellerhoff',
      'Indie Flower',
      'Italianno',
      'Jim Nightshade',
      'Julee',
      'Just Me Again Down Here',
      'Kaushan Script',
      'Kristi',
      'La Belle Aurore',
      'League Script',
      'Leckerli One',
      'Loved by the King',
      'Lovers Quarrel',
      'Marck Script',
      'Meddon',
      'Meie Script',
      'Merienda',
      'Merienda One',
      'Mervale Script',
      'Miama',
      'Miss Fajardose',
      'Miss Saint Delafield',
      'Molle',
      'Monsieur La Doulaise',
      'Mr Bedford',
      'Mr Bedfort',
      'Mr Dafoe',
      'Mr De Haviland',
      'Mrs Saint Delafield',
      'Mrs Sheppards',
      'Neucha',
      'Niconne',
      'Norican',
      'Nothing You Could Do',
      'Over the Rainbow',
      'Pacifico',
      'Parisienne',
      'Patrick Hand',
      'Pecita',
      'Petit Formal Script',
      'Pinyon Script',
      'Princess Sofia',
      'Quintessential',
      'Qwigley',
      'Reenie Beanie',
      'Romanesco',
      'Rouge Script',
      'Ruge Boogie',
      'Ruthie',
      'Sacramento',
      'Shadows Into Light',
      'Shadows Into Light Two',
      'Short Stack',
      'Sofia',
      'Stalemate',
      'Sue Ellen Francisco',
      'Swanky and Moo Moo',
      'Tangerine',
      'The Girl Next Door',
      'Vibur',
      'Waiting for the Sunrise',
      'Yesteryear',
      'Zeyada',
      'Domine',
      'Donegal One'
  ];
  GOOGLE_FONT_CATEGORIES[CATEGORY_SANS_SERIF] = [
      'Wendy One',
      'Tauri',
      'Sintony',
      'Pathway Gothic One',
      'Noto Sans',
      'Monda',
      'Merriweather Sans',
      'Exo 2',
      'Aclonica',
      'Alef',
      'Alegreya Sans',
      'Alegreya Sans SC',
      'Denk One',
      'Droid Sans',
      'Droid Sans Mono',
      'Open Sans',
      'Open Sans Condensed',
      'Roboto',
      'Roboto Condensed',
      'Syncopate',
      'ABeeZee',
      'Abel',
      'Acme',
      'Actor',
      'Advent Pro',
      'Aldrich',
      'Allerta',
      'Allerta Stencil',
      'Amaranth',
      'Anaheim',
      'Andika',
      'Anonymous Pro',
      'Antic',
      'Anton',
      'Archivo Black',
      'Archivo Narrow',
      'Arimo',
      'Armata',
      'Asap',
      'Asul',
      'Average Sans',
      'Basic',
      'Belleza',
      'BenchNine',
      'Bubbler One',
      'Cabin',
      'Cabin Condensed',
      'Cagliostro',
      'Candal',
      'Cantarell',
      'Cantora One',
      'Capriola',
      'Carme',
      'Carrois Gothic',
      'Carrois Gothic SC',
      'Changa',
      'Chau Philomene One',
      'Chivo',
      'Coda Caption',
      'Convergence',
      'Cousine',
      'Cuprum',
      'Days One',
      'Didact Gothic',
      'Doppio One',
      'Dorsa',
      'Dosis',
      'Duru Sans',
      'Economica',
      'Electrolize',
      'Englebert',
      'Exo',
      'Federo',
      'Fjalla One',
      'Francois One',
      'Fresca',
      'Gafata',
      'Galdeano',
      'Geo',
      'Gudea',
      'Hammersmith One',
      'Hermeneus One',
      'Homenaje',
      'Imprima',
      'Inconsolata',
      'Inder',
      'Istok Web',
      'Jockey One',
      'Josefin Sans',
      'Josefin Sans Std Light',
      'Julius Sans One',
      'Jura',
      'Karla',
      'Kite One',
      'Krona One',
      'Lato',
      'Lekton',
      'Magra',
      'Mako',
      'Marmelad',
      'Marvel',
      'Maven Pro',
      'Merge One',
      'Metrophobic',
      'Michroma',
      'Molengo',
      'Montserrat',
      'Montserrat Alternates',
      'Montserrat Subrayada',
      'Mouse Memoirs',
      'Muli',
      'News Cycle',
      'Nobile',
      'Numans',
      'Nunito',
      'Orbitron',
      'Orienta',
      'Oswald',
      'Oxygen',
      'Oxygen Mono',
      'Paytone One',
      'Philosopher',
      'Play',
      'Pontano Sans',
      'Port Lligat Sans',
      'PT Mono',
      'PT Sans',
      'PT Sans Caption',
      'PT Sans Narrow',
      'Puritan',
      'Quantico',
      'Quattrocento Sans',
      'Questrial',
      'Quicksand',
      'Raleway',
      'Rambla',
      'Rationale',
      'Ropa Sans',
      'Rosario',
      'Ruda',
      'Ruluko',
      'Rum Raisin',
      'Russo One',
      'Sansation',
      'Scada',
      'Seymour One',
      'Shanti',
      'Share Tech',
      'Share Tech Mono',
      'Signika',
      'Signika Negative',
      'Six Caps',
      'Snippet',
      'Source Code Pro',
      'Source Sans Pro',
      'Spinnaker',
      'Strait',
      'Strong',
      'Telex',
      'Tenor Sans',
      'Terminal Dosis',
      'Terminal Dosis Light',
      'Text Me One',
      'Titillium Web',
      'Tuffy',
      'Varela',
      'Varela Round',
      'Viga',
      'Voltaire',
      'Wire One',
      'Yanone Kaffeesatz',
      'Ubuntu',
      'Ubuntu Condensed',
      'Ubuntu Mono'
  ];
  GOOGLE_FONT_CATEGORIES[CATEGORY_DISPLAY] = [
      'Rubik One',
      'Rubik Mono One',
      'Vampiro One',
      'Snowburst One',
      'Purple Purse',
      'New Rocker',
      'Milonga',
      'Margarine',
      'Lily Script One',
      'Kavoon',
      'Hanalei',
      'Hanalei Fill',
      'Fruktur',
      'Freckle Face',
      'Elsie',
      'Elsie Swash Caps',
      'Cherry Cream Soda',
      'Chewy',
      'Creepster Caps',
      'Crushed',
      'Fontdiner Swanky',
      'Irish Grover',
      'Irish Growler',
      'Kranky',
      'Luckiest Guy',
      'Maiden Orange',
      'Mountains of Christmas',
      'Slackey',
      'Smokum',
      'Special Elite',
      'Unkempt',
      'Abril Fatface',
      'Akronim',
      'Alfa Slab One',
      'Allan',
      'Almendra Display',
      'Amarante',
      'Arbutus',
      'Asset',
      'Astloch',
      'Atomic Age',
      'Aubrey',
      'Audiowide',
      'Autour One',
      'Averia Gruesa Libre',
      'Averia Libre',
      'Averia Sans Libre',
      'Averia Serif Libre',
      'Bangers',
      'Baumans',
      'Bevan',
      'Bigelow Rules',
      'Bigshot One',
      'Black Ops One',
      'Boogaloo',
      'Bowlby One',
      'Bowlby One SC',
      'Bubblegum Sans',
      'Buda',
      'Butcherman',
      'Butcherman Caps',
      'Cabin Sketch',
      'Caesar Dressing',
      'Carter One',
      'Ceviche One',
      'Changa One',
      'Chango',
      'Chela One',
      'Chelsea Market',
      'Cherry Swash',
      'Chicle',
      'Cinzel Decorative',
      'Clara',
      'Coda',
      'Codystar',
      'Combo',
      'Comfortaa',
      'Concert One',
      'Contrail One',
      'Corben',
      'Creepster',
      'Croissant One',
      'Diplomata',
      'Diplomata SC',
      'Dynalight',
      'Eater',
      'Eater Caps',
      'Emblema One',
      'Emilys Candy',
      'Erica One',
      'Ewert',
      'Expletus Sans',
      'Fascinate',
      'Fascinate Inline',
      'Faster One',
      'Federant',
      'Finger Paint',
      'Flamenco',
      'Flavors',
      'Forum',
      'Fredericka the Great',
      'Fredoka One',
      'Frijole',
      'Fugaz One',
      'Galindo',
      'Geostar',
      'Geostar Fill',
      'Germania One',
      'Glass Antiqua',
      'Goblin One',
      'Gorditas',
      'Graduate',
      'Gravitas One',
      'Griffy',
      'Gruppo',
      'Happy Monkey',
      'Henny Penny',
      'Iceberg',
      'Iceland',
      'Jacques Francois Shadow',
      'Jolly Lodger',
      'Joti One',
      'Keania One',
      'Kelly Slab',
      'Kenia',
      'Knewave',
      'Lancelot',
      'Lemon',
      'Lemon One',
      'Life Savers',
      'Lilita One',
      'Limelight',
      'Lobster',
      'Lobster Two',
      'Londrina Outline',
      'Londrina Shadow',
      'Londrina Sketch',
      'Londrina Solid',
      'Love Ya Like A Sister',
      'Macondo',
      'Macondo Swash Caps',
      'McLaren',
      'MedievalSharp',
      'Medula One',
      'Megrim',
      'Metal Mania',
      'Metamorphous',
      'Miltonian',
      'Miltonian Tattoo',
      'Miniver',
      'Modern Antiqua',
      'Monofett',
      'Monoton',
      'Mystery Quest',
      'Nixie One',
      'Nosifer',
      'Nosifer Caps',
      'Nova Cut',
      'Nova Flat',
      'Nova Mono',
      'Nova Oval',
      'Nova Round',
      'Nova Script',
      'Nova Slim',
      'Nova Square',
      'Offside',
      'Oldenburg',
      'Oleo Script',
      'Oleo Script Swash Caps',
      'Oregano',
      'Original Surfer',
      'Overlock',
      'Overlock SC',
      'Paprika',
      'Passero One',
      'Passion One',
      'Patua One',
      'Peralta',
      'Piedra',
      'Pirata One',
      'Plaster',
      'Playball',
      'Poetsen One',
      'Poiret One',
      'Poller One',
      'Pompiere',
      'Press Start 2P',
      'Prosto One',
      'Racing Sans One',
      'Raleway Dots',
      'Rammetto One',
      'Ranchers',
      'Revalia',
      'Ribeye',
      'Ribeye Marrow',
      'Righteous',
      'Risque',
      'Ruslan Display',
      'Rye',
      'Sail',
      'Salsa',
      'Sancreek',
      'Sansita One',
      'Sarina',
      'Seaweed Script',
      'Sevillana',
      'Share',
      'Shojumaru',
      'Sigmar One',
      'Simonetta',
      'Sirin Stencil',
      'Skranji',
      'Smythe',
      'Sniglet',
      'Sofadi One',
      'Sonsie One',
      'Spicy Rice',
      'Spirax',
      'Squada One',
      'Stalinist One',
      'Stalin One',
      'Stardos Stencil',
      'Stint Ultra Condensed',
      'Stint Ultra Expanded',
      'Supermercado One',
      'Titan One',
      'Trade Winds',
      'Trochut',
      'Tulpen One',
      'Uncial Antiqua',
      'Underdog',
      'Unica One',
      'UnifrakturCook',
      'UnifrakturMaguntia',
      'Unlock',
      'Vast Shadow',
      'Voces',
      'VT323',
      'Wallpoet',
      'Warnes',
      'Wellfleet',
      'Yeseva One'
  ];
  GOOGLE_FONT_CATEGORIES[CATEGORY_SERIF] = [
      'Roboto Slab',
      'Noto Serif',
      'Libre Baskerville',
      'Gabriela',
      'Fauna One',
      'Droid Serif',
      'jsMath cmbx10',
      'jsMath cmex10',
      'jsMath cmmi10',
      'jsMath cmr10',
      'jsMath cmsy10',
      'jsMath cmti10',
      'Ultra',
      'Adamina',
      'Alegreya',
      'Alegreya SC',
      'Alice',
      'Alike',
      'Alike Angular',
      'Almendra',
      'Almendra SC',
      'Amethysta',
      'Amiri',
      'Andada',
      'Andada SC',
      'Antic Didone',
      'Antic Slab',
      'Arapey',
      'Arbutus Slab',
      'Artifika',
      'Arvo',
      'Average',
      'Balthazar',
      'Belgrano',
      'Bentham',
      'Bitter',
      'Brawler',
      'Bree Serif',
      'Buenard',
      'Cambo',
      'Cantata One',
      'Cardo',
      'Caudex',
      'Cinzel',
      'Copse',
      'Coustard',
      'Crete Round',
      'Crimson Text',
      'Cutive',
      'Cutive Mono',
      'Della Respira',
      'EB Garamond',
      'Enriqueta',
      'Esteban',
      'Fanwood Text',
      'Fenix',
      'Fjord One',
      'Gentium Basic',
      'Gentium Book Basic',
      'Gilda Display',
      'Glegoo',
      'Goudy Bookletter 1911',
      'Habibi',
      'Headland One',
      'Holtwood One SC',
      'IM Fell Double Pica',
      'IM Fell Double Pica SC',
      'IM Fell DW Pica',
      'IM Fell DW Pica SC',
      'IM Fell English',
      'IM Fell English SC',
      'IM Fell French Canon',
      'IM Fell French Canon SC',
      'IM Fell Great Primer',
      'IM Fell Great Primer SC',
      'Inika',
      'Italiana',
      'Jacques Francois',
      'Josefin Slab',
      'Judson',
      'Junge',
      'Kameron',
      'Kotta One',
      'Kreon',
      'Ledger',
      'Linden Hill',
      'Lora',
      'Lusitana',
      'Lustria',
      'Marcellus',
      'Marcellus SC',
      'Marko One',
      'Mate',
      'Mate SC',
      'Merriweather',
      'Montaga',
      'Neuton',
      'Noticia Text',
      'OFL Sorts Mill Goudy TT',
      'Old Standard TT',
      'Oranienbaum',
      'Ovo',
      'Petrona',
      'Playfair Display',
      'Playfair Display SC',
      'Podkova',
      'Poly',
      'Port Lligat Slab',
      'Prata',
      'Prociono',
      'PT Serif',
      'PT Serif Caption',
      'Quando',
      'Quattrocento',
      'Radley',
      'Rokkitt',
      'Rosarivo',
      'Rufina',
      'Sanchez',
      'Sedan',
      'Sedan SC',
      'Sorts Mill Goudy',
      'Stoke',
      'Tienne',
      'Tinos',
      'Trocchi',
      'Trykker',
      'Unna',
      'Vidaloka',
      'Volkhov',
      'Vollkorn'
  ];
  GOOGLE_FONT_CATEGORIES[CATEGORY_OTHER] = [
      'Angkor',
      'Battambang',
      'Bayon',
      'Bokor',
      'Chenla',
      'Content',
      'Dangrek',
      'Fasthand',
      'Freehand',
      'GFS Didot',
      'GFS Neohellenic',
      'Hanuman',
      'Kantumruy',
      'Kdam Thmor',
      'Khmer',
      'Koulen',
      'Metal',
      'Moul',
      'Moulpali',
      'Nokora',
      'Odor Mean Chey',
      'Preahvihear',
      'Siemreap',
      'Suwannaphum',
      'Taprom'
  ];

  // src/js/helper.functions.js
  function _createKey(name) {
    return name.toLowerCase().replace(/[^a-z]+/g, '-');
  }

  function _createName(key) {
    var words = key.replace('-', ' ').split(' ');

    for (var i = 0, l = words.length; i < l; i++) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }

    return words.join(' ');
  }

  function _objLength(object) {
    var size = 0, key;
    for (key in object) {
      if (object.hasOwnProperty(key)) {
        size++;
      }
    }

    return size;
  }

  function _isDescendant(parent, child) {
    var node = child;
    while (node !== null) {
      if (node === parent) {
        return true;
      }
      node = node.parentNode;
    }
    return false;
  }

  // src/js/directive.current-href.js
  fontselectModule.directive('jdFontselectCurrentHref', [NAME_FONTSSERVICE, function(fontsService) {
    return {
      templateUrl: 'current-href.html',
      restrict: 'A',
      replace: true,
      controller: ['$scope', function($scope) {
        $scope.urls = fontsService.getImports();
      }]
    };
  }]);

  // src/js/directive.font.js
  fontselectModule.directive('jdFont', [NAME_FONTSSERVICE, function(fontsService) {
    return {
      scope: {
        font: '=',
        current: '='
      },
      templateUrl: 'font.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', function($scope) {
        fontsService.load($scope.font);
      }]
    };
  }]);

  // src/js/directive.fontlist-entry.js
  var NAME_JDFONTLIST_ENTRY = 'jdFontlistEntry';

  fontselectModule.directive(NAME_JDFONTLIST_ENTRY, function() {
    return {
      scope: {
        entry: '=',
        current: '='
      },
      restrict: 'E',
      templateUrl: 'fontlist-entry.html',
      replace: true,
      link: function($scope) {
        $scope.isHeadline = $scope.entry.type === FONTLIST_ENTRY_TYPE_HEADLINE;
        $scope.isFont = $scope.entry.type === FONTLIST_ENTRY_TYPE_FONT;
        $scope.isText = $scope.entry.type === FONTLIST_ENTRY_TYPE_TEXT;
      }
    };
  });

  // src/js/directive.fontlist.js
  var NAME_JDFONTLIST = 'jdFontlist';
  var NAME_JDFONTLIST_CONTROLLER = NAME_JDFONTLIST + NAME_CONTROLLER;

  fontselectModule.directive(NAME_JDFONTLIST, function() {
    return {
      scope: {
        id: '=fsid',
        fonts: '=',
        meta: '=',
        current: '=',
        text: '='
      },
      restrict: 'E',
      templateUrl: 'fontlist.html',
      replace: true,
      controller: NAME_JDFONTLIST_CONTROLLER
    };
  });

  fontselectModule.controller(NAME_JDFONTLIST_CONTROLLER, [
    '$scope',
    '$rootScope',
    '$filter',
    NAME_FONTSSERVICE,
    '$element',
    '$document',
    'jdfsCuratedFonts',  function($scope, $rootScope, $filter, fontsService, $element, $document, jdfsCuratedFonts) {    var _fontlistEntries = [];
      var _lastPageCount = 0;
      var _scrollBuffer = 0;

      var ALL_FONTS_FILTER_STATE = {
        forceNext: false,
        fontsInProviders: [],
        fontsInSubsets: [],
        sortedFonts: [],
        categorizedFonts: [],
        searchedFonts: [],
        sortCache: { search: $scope.current.search }
      };

      var CURATED_FONTS_FILTER_STATE = angular.copy(ALL_FONTS_FILTER_STATE);

      var defaultPage = {
        size: PAGE_SIZE_DEFAULT,
        count: 0,
        current:  0,
        currentAbs: 0
      };

      var page = $scope.page = $scope.meta.page = angular.extend({}, defaultPage, $scope.meta.page);

      var fontmeta = $scope.meta.fonts = {
        total: 0,
        current: 0
      };

      function isOnCurrentPage(index) {
        var currentMinIndex = page.current * page.size;

        return index >= currentMinIndex && index < currentMinIndex + page.size;
      }

      $scope.keyfocus = function(direction, amount) {
        var index = -1;
        var i, l = _fontlistEntries.length;
        for (i = 0; i < l; i++) {
          if (_fontlistEntries[i].content === $scope.current.font) {
            index = i;
            break;
          }
        }

        var pageoffset = page.size * page.current;
        var onPage = isOnCurrentPage(index);

        if (angular.isUndefined(amount)) {
          amount = 1;
        }

        index += (direction === DIRECTION_PREVIOUS ? -amount : amount);

        if (!onPage && _fontlistEntries[index + pageoffset]) {
          index += pageoffset;
        }

        while (_fontlistEntries[index] && _fontlistEntries[index].type !== FONTLIST_ENTRY_TYPE_FONT) {
          index += (direction === DIRECTION_PREVIOUS ? -1 : 1);
        }

        if (_fontlistEntries[index]) {
          $scope.current.font = _fontlistEntries[index].content;

          page.currentAbs = page.current = Math.floor(index / page.size);

          $rootScope.$digest();
        }
      };

      function keyDownHandler(event) {
        function prevent() {
          event.preventDefault();
          return false;
        }

        var key = event.keyCode;

        if (key === KEY_DOWN) {
          $scope.keyfocus(DIRECTION_NEXT);
          return prevent();
        } else if (key === KEY_UP) {
          $scope.keyfocus(DIRECTION_PREVIOUS);
          return prevent();
        }

        if (document.activeElement.tagName === 'INPUT' && document.activeElement.value) {
          return;
        }

        var amount = page.size;
        if (key === KEY_RIGHT) {
          if (!$scope.current.font) {
            amount++;
          }
          $scope.keyfocus(DIRECTION_NEXT, amount);
          return prevent();
        } else if (key === KEY_LEFT) {
          $scope.keyfocus(DIRECTION_PREVIOUS, page.size);
          return prevent();
        }
      }

      function getDeltaFromEvent(event) {
        var delta = event.wheelDeltaY || event.wheelDelta ||
          event.deltaY * -1;

        if (!isFinite(delta) &&
          !angular.isUndefined(event.originalEvent)) {
          delta = getDeltaFromEvent(event.originalEvent);
        }

        return delta;
      }

      var wheelHandler = function(event) {
        if (!event.target) {
          return;
        }

        if (_isDescendant($element[0], event.target)) {
          event.preventDefault();
          event.stopPropagation();

          var subpage = 1 / page.size;
          var delta = getDeltaFromEvent(event);
          var absDelta = Math.abs(delta);

          /* For touch-pads etc., we buffer small movements */
          if (absDelta > 1 && absDelta < SCROLL_BUFFER) {
            _scrollBuffer += delta;
            if (Math.abs(_scrollBuffer) < SCROLL_BUFFER) {
              return;
            }
            _scrollBuffer = 0;
          }

          if (delta !== 0 && $scope.paginate(delta > 0 ? -subpage : subpage) !== false) {
            $scope.$digest();
          }
        }
      };

      $scope.$on(OPEN_EVENT, function() {
        $document.on('keydown', keyDownHandler);
        $document.on('wheel', wheelHandler);
        $document.on('mousewheel', wheelHandler);
        $document.on('DOMMouseScroll', wheelHandler);
      });

      $scope.$on(CLOSE_EVENT, function() {
        $document.off('keydown', keyDownHandler);
        $document.off('wheel', wheelHandler);
        $document.off('mousewheel', wheelHandler);
        $document.off('DOMMouseScroll', wheelHandler);
      });

      /**
       * Set the current page
       *
       * @param {Number} currentPage
       * @return {void}
       */
      $scope.setCurrentPage = function(currentPage) {
        page.currentAbs = page.current = currentPage;
      };

      /**
       * Go to the next or previous page.
       *
       * @param  {Number} amount subpage steps
       * @param  {Object} $event jQuery scroll event
       * @return {void}
       */
      $scope.paginate = function(amount, $event) {
        if ($event && $event.preventDefault) {
          $event.preventDefault();
        }

        var direction = amount;
        if (angular.isNumber(amount)) {
          if (amount === 0) {
            return false;
          }
          direction = amount < 0 ? DIRECTION_PREVIOUS : DIRECTION_NEXT;
        } else {
          amount = _getAmountFromDirection(direction);
        }

        if (!$scope.paginationButtonActive(direction)) {
          return false;
        }

        if (page.current + amount < 0) {
          page.currentAbs = page.current = 0;
        } else {
          page.current += amount;
          page.currentAbs = Math.floor(page.current);
        }

        return page.current;
      };

      /**
       * Check if the pagination button is active
       *
       * @param  {String} direction 'next' or 'prev'
       * @return {Boolean}
       */
      $scope.paginationButtonActive = function(direction) {
        _updatePageCount();
        _updateCurrentPage();

        return (
          (direction === DIRECTION_NEXT && (page.current + 1) * page.size < _fontlistEntries.length) ||
          (direction === DIRECTION_PREVIOUS && page.current > 0)
        );
      };

      /**
       * Get an array with the length similar to the
       * amount of pages we have. (So we can use it in a repeater)
       *
       * Also update the current page and the current amount of pages.
       *
       * @return {Array}
       */
      $scope.getPages = function() {
        _updatePageCount();
        var pages = new Array(page.count);

        _updateCurrentPage();

        /* Display the page buttons only if we have at least two pages. */
        if (pages.length <= 1) {
          return [];
        }
        return pages;
      };

      /**
       * Apply the current provider filter to the given font list
       * @param {Array} fonts
       * @return {Array}
       */
      function _filterProviders(fonts, filterState) {
        var providersString = JSON.stringify($scope.current.providers);
        if (filterState.forceNext || filterState.sortCache.providers !== providersString) {
          filterState.sortCache.providers = providersString;
          filterState.forceNext = true;

          filterState.fontsInProviders = fonts.filter(function(font) {
            return $scope.current.providers[font.provider];
          });
        }

        return filterState.fontsInProviders;
      }



      /**
       * Apply current subset filters to given font list
       * @param  {Array} fonts
       * @return {Array}
       */
      function _filterSubsets(fonts, filterState) {
        var subSetString = JSON.stringify($scope.current.subsets);
        if (filterState.forceNext || filterState.sortCache.subsets !== subSetString) {
          filterState.sortCache.subsets = subSetString;
          filterState.forceNext = true;

          filterState.fontsInSubsets = $filter('hasAllSubsets')(
            fonts,
            $scope.current.subsets
          );
        }

        return filterState.fontsInSubsets;
      }

      /**
       * Apply current sort to given font list
       * @param  {Array} fonts
       * @return {Array}
       */
      function _filterSort(fonts, filterState) {
        var attrDirection = $scope.current.sort.attr.dir;
        var direction = $scope.current.sort.direction;

        if (filterState.forceNext ||
          filterState.sortCache.sortattr !== $scope.current.sort.attr.key ||
          filterState.sortCache.sortdir !== direction)
        {
          filterState.sortCache.sortattr = $scope.current.sort.attr.key;
          filterState.sortCache.sortdir = direction;
          filterState.forceNext = true;

          filterState.sortedFonts = $filter('orderBy')(
            fonts,
            $scope.current.sort.attr.key,
            $scope.current.sort.direction ? attrDirection : !attrDirection
          );
        }

        return filterState.sortedFonts;
      }

      /**
       * Apply current category filters to given font list.
       * @param  {Array} fonts
       * @return {Array}
       */
      function _filterCategory(fonts, filterState) {
        var category = $scope.current.category;
        if (filterState.forceNext || filterState.sortCache.category !== category) {
          filterState.sortCache.category = category;
          filterState.forceNext = true;

          if (angular.isUndefined(category)) {
            filterState.categorizedFonts = fonts;
          } else {
            filterState.categorizedFonts = $filter('filter')(fonts, {category: category}, true);
          }
        }

        return filterState.categorizedFonts;
      }

      /**
       * Apply current search to given font list.
       * @param  {Array} fonts
       * @return {Array}
       */
      function _filterSearch(fonts, filterState) {
        var search = $scope.current.search || '';
        var searchTermChanged = filterState.sortCache.search !== search;
        if (filterState.forceNext || searchTermChanged) {
          filterState.sortCache.search = search;
          filterState.forceNext = true;

          /* Unset category filter so every font is visible. */
          if (searchTermChanged) {
            $scope.current.category = undefined;
          }

          if (search.length) {
            filterState.searchedFonts = _priorize(
              $filter('fuzzySearch')(fonts, {name: search}),
              search.toLowerCase()
            );
          } else {
            filterState.searchedFonts = fonts;
          }
        }

        return filterState.searchedFonts;
      }

      var EMPTY_FILTERED_FONTS = [];

      function filterFontList(fonts, filterState) {
        filterState.forceNext = filterState.sortCache.fontAmount !== fonts.length;
        filterState.sortCache.fontAmount = fonts.length;

        var queue = [
          _filterProviders,
          _filterSubsets,
          _filterSort,
          _filterSearch,
          _filterCategory
        ];

        var filteredList = fonts;
        for (var i = 0, l = queue.length; i < l; i++) {
          filteredList = queue[i](filteredList, filterState);
        }

        return filteredList;
      }

      function convertFontToFontlistEntry(font) {
        return {
          type: FONTLIST_ENTRY_TYPE_FONT,
          content: font
        };
      }

      function createHeadlineEntry(content) {
        return {
          type: FONTLIST_ENTRY_TYPE_HEADLINE,
          content: content
        };
      }

      function createTextEntry(content) {
        return {
          type: FONTLIST_ENTRY_TYPE_TEXT,
          content: content
        };
      }

      var entryMap = new WeakMap();

      $scope.getFontlistEntries = function() {
        var filteredFonts = filterFontList($scope.fonts || EMPTY_FILTERED_FONTS, ALL_FONTS_FILTER_STATE);
        if (!entryMap.has(filteredFonts)) {

          var fontlistEntries = [];
          if (filteredFonts.length === 0) {
            fontlistEntries.push(createTextEntry($scope.text.noResultsLabel));
          } else {
            fontlistEntries = filteredFonts.map(convertFontToFontlistEntry);

            if (jdfsCuratedFonts.length !== 0) {
              var filteredCuratedFonts = filterFontList(jdfsCuratedFonts, CURATED_FONTS_FILTER_STATE);
              fontlistEntries = [createHeadlineEntry($scope.text.curatedFontsListHeadline)]
                .concat(filteredCuratedFonts.map(convertFontToFontlistEntry))
                .concat([createHeadlineEntry($scope.text.allFontsListHeadline)])
                .concat(fontlistEntries);
            }
          }

          fontmeta.total = $scope.fonts.length;
          fontmeta.current = filteredFonts.length;

          _fontlistEntries = fontlistEntries;
          entryMap.set(filteredFonts, fontlistEntries);
        }

        return entryMap.get(filteredFonts);
      };

      /**
       * Convert 'prev' and 'last' to -1 and 1
       * @param  {Number|String} direction
       * @return {Number}
       */
      function _getAmountFromDirection(direction) {
        if (angular.isNumber(direction)) {
          return direction;
        }
        return (direction === DIRECTION_PREVIOUS ? -1 : 1);
      }

      /**
       * Sort a list of fonts by matching them against a given search
       * @param  {Array} fonts
       * @param  {String} search
       * @return {Array}
       */
      function _priorize(fonts, search) {
        if (fonts.length > 1) {
          var rgx = new RegExp('[' + search + ']+');

          fonts.sort(function(a, b) {
            var nameA = a.name.toLowerCase();
            var nameB = b.name.toLowerCase();
            var firstCharA = nameA[0];
            var firstCharB = nameB[0];

            /* Prioritize by first character... */
            if (firstCharA !== firstCharB) {
              if (firstCharA === search[0]) {
                return -1;
              } else if (firstCharB === search[0]) {
                return 1;
              }
            }

            /* Prioritize by amount of matches. */
            return (nameA.replace(rgx, '').length < nameB.replace(rgx, '').length) ? -1 : 1;
          });
        }

        return fonts;
      }

      /**
       * Calculate the amount of pages we have.
       *
       * @return {void}
       */
      function _updatePageCount() {
        _lastPageCount = page.count;

        if (!angular.isArray($scope.fonts)) {
          return 0;
        }

        if (_fontlistEntries.length) {
          page.count = Math.ceil(_fontlistEntries.length / page.size);
        }
      }

      /**
       * Whenever the amount of pages is changing:
       * Make sure we're not staying on a page that does not exist.
       * And if we have a font selected, try to stay on the page of
       * that font.
       *
       * @return {void}
       */
      function _updateCurrentPage() {
        /* do nothing if the amount of pages hasn't change */
        if (_lastPageCount === page.count) {
          return;
        }

        $scope.setCurrentPage(0);
      }
    }
  ]);

  // src/js/directive.fontselect.js
  var id = 1;

  fontselectModule.directive('jdFontselect', [NAME_FONTSSERVICE, function(fontsService) {
    return {
      scope: {
        current: '=?state',
        stack: '=?',
        name: '=?',
        rawText: '@?text',
        text: '=?textObj',
        onInit: '&?',
        onOpen: '&?',
        onClose: '&?',
        onChange: '&?',
        idSuffix: '@?'
      },
      restrict: 'E',
      templateUrl: 'fontselect.html',
      replace: true,

      controller: [
        '$scope',
        '$element',
        '$timeout',
        '$document',
        '$rootScope',
        function(
          $scope,
          $element,
          $timeout,
          $document,
          $rootScope
      ) {
        $scope.fonts = fontsService.getAllFonts();
        $scope.id = id++;
        $scope.suffixedId = $scope.idSuffix ? $scope.idSuffix : $scope.id;
        $scope.stylesActive = true;
        $scope.settingsActive = false;
        $scope.active = false;
        $scope.searching = false;
        $scope.categories = fontsService.getCategories();
        $scope.sortAttrs = SORT_ATTRIBUTES;
        $scope.name = '';
        $scope.meta = {};
        if (angular.isUndefined($scope.stack)) {
          $scope.stack = VALUE_NO_FONT_STACK;
        }

        $scope.text = angular.extend(angular.copy(TEXT_DEFAULTS), $scope.text || {});
        if ($scope.rawText) {
          $scope.text = angular.extend($scope.text , $scope.$eval($scope.rawText) || {});
        }

        function setState(extend) {
          var globalSubsets, globalProviders;
          $scope.current = angular.extend(
            angular.copy(STATE_DEFAULTS),
            extend || {}
          );

          if (!$scope.current.sort.attr) {
            $scope.current.sort.attr = SORT_ATTRIBUTES[0];
          }

          if (angular.isObject($scope.current.font)) {
            $scope.stack = $scope.current.font.stack;
            $scope.name = $scope.current.font.name;
          }

          globalSubsets = fontsService.getSubsets();
          $scope.current.subsets = _objLength(globalSubsets) ?
            globalSubsets : fontsService.setSubsets($scope.current.subsets);

          globalProviders = fontsService.getProviders();
          $scope.current.providers = _objLength(globalProviders) ?
            globalProviders : fontsService.setProviders($scope.current.providers);
        }

        function outsideClickHandler(event) {
          if ($scope.active && !_isDescendant($element[0], event.target)) {
            $scope.toggle();
            $rootScope.$digest();
          }
        }

        function escapeKeyHandler(event) {
          if ($scope.active && event.keyCode === KEY_ESCAPE) {
            $scope.toggle();
            $rootScope.$digest();
          }
        }

        function open() {
          $document.on('click', outsideClickHandler);
          $document.on('keyup', escapeKeyHandler);

          $scope.$broadcast(OPEN_EVENT);
          if (angular.isFunction($scope.onOpen)) {
            $scope.onOpen({$scope: $scope});
          }
        }

        function close() {
          $document.off('keyup', escapeKeyHandler);
          $document.off('click', outsideClickHandler);

          $scope.$broadcast(CLOSE_EVENT);
          if (angular.isFunction($scope.onClose)) {
            $scope.onClose({$scope: $scope});
          }
        }

        $scope.$on(DO_CLOSE_EVENT, function() {
          if ($scope.active) {
            $scope.toggle();
            $scope.$apply();
          }
        });

        $scope.reverseSort = function() {
          var sort = $scope.current.sort;

          sort.direction = !sort.direction;
        };

        $scope.toggle = function($event) {
          if ($event && $event.preventDefault) {
            $event.preventDefault();
          }

          $scope.active = !$scope.active;

          if (!$scope.active) {
            $scope.searching = false;
            close();
          } else {
            $timeout(open);
          }
        };

        $scope.toggleSearch = function($event) {
          $event.preventDefault();

          if (!$scope.active) {
            $scope.toggle();
          }

          $scope.searching = !$scope.searching;

          if ($scope.searching) {
            $scope.setFocus();
          }
        };

        $scope.tryUnfocusSearch = function() {
          if ($scope.searching && $scope.current.search.length === 0) {
            $scope.searching = false;
          }
        };

        $scope.resetSearch = function($event) {
          $event.preventDefault();

          $scope.current.search = '';
          if ($scope.searching) {
            $scope.setFocus();
          }
        };

        $scope.toName = _createName;

        $scope.setFocus = function() {
          $timeout(function() {
            $element[0].querySelector('.jdfs-search').focus();
          });
        };

        $scope.setCategoryFilter = function(category, $event) {
          if ($event && $event.preventDefault) {
            $event.preventDefault();
          }

          var current = $scope.current;

          if (current.category === category) {
            current.category = undefined;
          } else {
            current.category = category;
          }
        };

        $scope.reset = function() {
          setState();
        };

        $scope._setSelected = function(font) {
          if (angular.isObject(font)) {
            $scope.name = font.name;
            $scope.stack = font.stack;
          } else {
            $scope.name = '';
            $scope.stack = VALUE_NO_FONT_STACK;
          }
        };

        $scope.toggleSettings = function() {
          $scope.settingsActive = true;
          $scope.stylesActive = false;
        };

        $scope.toggleStyles = function() {
          $scope.stylesActive = true;
          $scope.settingsActive = false;
        };

        $scope.$on('$destroy', close);

        /* Initiate! */
        fontsService._initGoogleFonts();

        if (angular.isObject($scope.current)) {
          setState($scope.current);
        }

        if ($scope.stack.length) {
          try {
            var font = fontsService.getFontByStack($scope.stack);
            /* Since we're setting the font now before watchers are initiated, we need to update usage by ourself. */
            fontsService.updateUsage(font);
            fontsService.load(font);
            setState({font: font});
          } catch (e) {
            fontsService.getFontByStackAsync($scope.stack, false).then(function(font) {
              if (angular.isObject(font)) {
                setState({font: font});
              }
            });
          }
        }

        if (angular.isFunction($scope.onInit)) {
          $scope.onInit({$scope: $scope});
        }

        $scope.$watch('current.font', function(newFont, oldFont) {
          if (!angular.isObject($scope.current)) {
            $scope.reset();
          }

          if (oldFont !== newFont) {
            $scope.tryUnfocusSearch();

            if (angular.isObject($scope.current.font)) {
              newFont = $scope.current.font;
            }

            if (angular.isObject(oldFont) && oldFont.used) {
              fontsService.updateUsage(oldFont, false);
            }
            if (angular.isObject(newFont)) {
              fontsService.updateUsage(newFont);
              fontsService.load(newFont);
            }

            $scope._setSelected(newFont);
            fontsService.updateImports();
            if (angular.isFunction($scope.onChange)) {
              $scope.onChange({font: newFont});
            }
          }
        });

        $scope.$watch('current.subsets', function(newSubsets, oldSubsets) {
          if (newSubsets !== oldSubsets) {
            fontsService.updateImports();
          }
        }, true);

        $scope.$watch('stack', function(newStack, oldStack) {
          var font;

          if (newStack === oldStack || ($scope.current.font && newStack === $scope.current.font.stack)) {
            return;
          }

          try {
            if (newStack && newStack.length) {
              font = fontsService.getFontByStack(newStack, false);
            }

            if (font) {
              $scope.current.font = font;
            } else {
              $scope.reset();
            }
          } catch (e) {
            $scope.reset();
          }
        });
      }]
    };
  }]);

  // src/js/directive.meta.js
  var NAME_JDMETA = 'jdMeta';

  fontselectModule.directive(NAME_JDMETA, function() {
    return {
      restrict: 'E',
      templateUrl: 'meta.html',
      replace: true
    };
  });

  // src/js/factory.webfont.js
  fontselectModule.factory('jdfsWebFont', function() {
    var jdfsWebFont = {
      getFontLoader: function() {
        if (typeof window.WebFont === 'undefined') {
          throw new Error('WebFontLoader is not available.' +
            'Please include angular-fontselect/dist/libs/webfontloader.js');
        }

        return window.WebFont;
      }
    };

    return jdfsWebFont;
  });

  // src/js/filter.fuzzy-search.js
  /**
   * Fuzzy search filter for angular.
   * Remove all entries from list that do not contain the
   * characters of our search (in the right sequence)
   *
   * Allow a configurable amount of typos (default: 1)
   *
   * @author Tim Sebastian <tim.sebastian@jimdo.com>
   * @author Hannes Diercks <hannes.diercks@jimdo.com>
   */
  fontselectModule.filter('fuzzySearch', function() {
    /** @const */
    var DEFAULTS = {
      teAmount: 0,
      tePercent: 0.3
    };

    return function(inputs, search, options) {
      if (!angular.isArray(inputs) || angular.isUndefined(search)) {
        return inputs;
      }

      var strict = true;
      var searches = [];

      options = angular.extend(DEFAULTS, options);

      function getRegex(str) {
        return new RegExp(str.replace(/./g, function(i) {return '([^' + i + ']*?(?:' + i + '))?'; }),'i');
      }

      var filter = function(input, matcher, length) {
        var matches = (input.match(matcher)||[]).filter(function(match, i) { return i !== 0 && match; });

        var errorAmountIsOk = (matches.length + options.teAmount) >= length;
        var errorPercentageIsOk = matches.length / length >= 1 - options.tePercent;

        return errorAmountIsOk || errorPercentageIsOk;
      };

      if (angular.isString(search)) {
        var rgx = getRegex(search);

        strict = false;

        angular.forEach(inputs[0], function(val, key) {
          if (key.substring(0, 1) === '$') {
            return;
          }
          searches.push({
            key: key,
            search: rgx,
            length: search.length
          });
        });
      } else if (angular.isObject(search)) {
        var valid = false;
        angular.forEach(search, function(s, k) {
          if (angular.isUndefined(s)) {
            return;
          }
          valid = true;
          searches.push({
            key: k,
            search: getRegex(s),
            length: s.length
          });
        });

        if (!valid) {
          return inputs;
        }
      }

      inputs = inputs.filter(function(input) {
        for (var i = 0, l = searches.length; i < l; i++) {
          var src = searches[i],
              searchVal = input[src.key] || '',
              ok = filter(searchVal, src.search, src.length);

          if (strict && !ok) {
            return false;
          } else if(ok) {
            return true;
          }
        }

        return false;
      });

      return inputs;
    };
  });

  // src/js/filter.has-all-subsets.js
  fontselectModule.filter('hasAllSubsets', function() {
    return function(input, subsets) {
      if (!angular.isArray(input)) {
        return input;
      }

      function hasAllSubsets(font) {
        var allOK = true;

        angular.forEach(subsets, function(active, key) {
          if (!active || !allOK) {
            return;
          }

          if (font.subsets.indexOf(key) < 0) {
            allOK = false;
          }
        });

        return allOK;
      }

      return input.filter(function(font) {
        if (angular.isUndefined(font.subsets)) {
          // TODO: ERROR
          // console.error('Font ' + font.name + ' is missing subset information.');
          return true;
        }

        return angular.isObject(font) && hasAllSubsets(font);
      });
    };
  });

  // src/js/filter.stack-search.js
  /**
   * Get fonts by matching stacks.
   *
   * @author Tim Sebastian <tim.sebastian@jimdo.com>
   * @author Hannes Diercks <hannes.diercks@jimdo.com>
   */
  fontselectModule.filter('stackSearch', function() {
    var listCache = {};

    function createInputId(input) {
      return '' + input.length + input[0].key + input[input.length - 1].key;
    }

    function stackSearchFilter(input, inputStack) {
      var inputId, list, normalizedInputStack;
      if (!angular.isArray(input) || !input.length) {
        return input;
      }

      if (!angular.isString(inputStack)) {
        return [];
      }

      inputStack = inputStack.toLowerCase();

      normalizedInputStack = stackSearchFilter.normalizeStack(inputStack);

      inputId = createInputId(input);
      if (listCache[inputId]) {
        list = listCache[inputId];
      } else {
        list = listCache[inputId] = stackSearchFilter.createWeightedFontList(input);
      }

      for (var i = 0, l = normalizedInputStack.length; i < l; i++) {
        if (list[normalizedInputStack[i]]) {
          return list[normalizedInputStack[i]].fonts;
        }
      }

      return [];
    }

    stackSearchFilter.normalizeStack = function(stack) {
      var normalizedStack = [];
      angular.forEach(stack.split(','), function(token) {
        normalizedStack.push(token.replace(/^[ '"]*|[ '"]*$/g, ''));
      });
      return normalizedStack;
    };

    stackSearchFilter.createWeightedFontList = function(input) {
      var list = {};

      input.forEach(function(fontObj) {
        var normalizedStack = stackSearchFilter.normalizeStack(fontObj.stack.toLowerCase());
        normalizedStack.forEach(function(stackfont, index){
          if (!list[stackfont] || list[stackfont].pos > index) {
            list[stackfont] = {
              fonts: [fontObj],
              pos: index
            };
          } else if(list[stackfont].pos === index) {
            list[stackfont].fonts.push(fontObj);
          }
        });
      });

      return list;
    };

    return stackSearchFilter;
  });

  // src/js/filter.start-from.js
  /* From: http://tech.small-improvements.com/2013/09/10/angularjs-performance-with-large-lists/ */
  fontselectModule.filter('startFrom', function() {
    return function(input, start) {
      if (!angular.isArray(input)) {
        return input;
      }

      return input.slice(start);
    };
  });

  // src/js/provider.curatedFonts.js
  fontselectModule.provider('jdfsCuratedFonts', function jdfsCuratedFontsProvider() {
    var curatedFontKeys = [];

    this.setCuratedFontKeys = function (curatedKeys) {
      curatedFontKeys = curatedKeys;
    };

    function getCuratedFontObjects(fonts, curatedFontKeys) {
      return fonts.filter(function(font) {
        return curatedFontKeys.indexOf(font.provider + '.' + font.key) !== -1;
      }).map(function(font) {
        return angular.copy(font);
      });
    }

    this.$get = [NAME_FONTSSERVICE, function jdfsCuratedFontsFactory(fontService) {
      return getCuratedFontObjects(fontService.getAllFonts(), curatedFontKeys);
    }];
  });

  // src/js/service.fonts.js
  var _fontsServiceDeps = ['$http', '$q', 'jdFontselectConfig', '$filter', 'jdfsWebFont'];

  var _googleFontsInitiated = false;

  function FontsService() {
    var self = this;

    for (var i = 0, l = _fontsServiceDeps.length; i <l; i++) {
      self[_fontsServiceDeps[i]] = arguments[i];
    }

    self._init();

    return self;
  }

  FontsService.$inject = _fontsServiceDeps;

  FontsService.prototype = {
    _init: function() {
      var self = this;

      self._fonts = self._fonts || [];
      self._map = {};
      self._subsets = angular.copy(STATE_DEFAULTS.subsets);
      self._providers = angular.copy(STATE_DEFAULTS.providers);
      self._imports = {};
      self._usedProviders = {};
      self._initPromises = [];
      self._asyncProviderQueue = [];
      self._fontInitiators = {};

      self.registerProvider(PROVIDER_GOOGLE, angular.bind(self, self._loadGoogleFont));
      self.registerProvider(PROVIDER_WEBSAFE, function() {});

      self._addDefaultFonts();
    },

    getAllFonts: function() {
      return this._fonts;
    },

    ready: function(callback) {
      var promise = this.$q.all(this._initPromises);
      if (angular.isFunction(callback)) {
        promise.then(callback);
      }
      return promise;
    },

    add: function(fontObj, provider) {
      var self = this;

      if (!angular.isString(provider)) {
        provider = angular.isString(fontObj.provider) ? fontObj.provider : PROVIDER_WEBSAFE;
      }

      fontObj.provider = provider;

      /* Set provider as "fall-back" in the font-stack, so we can use the stack as unique key */
      fontObj.stack += ', "' + provider + '"';

      if (!self.isValidFontObject(fontObj)) {
        throw 'Invalid font object.';
      }

      if (!angular.isObject(self._map[provider])) {
        self._map[provider] = {};
      }

      if (angular.isArray(fontObj.subsets)) {
        self.setSubsets(fontObj.subsets);
      }

      self._fonts.push(fontObj);

      return fontObj;
    },

    searchFonts: function(object) {
      var self = this;

      return self.$filter('filter')(self._fonts, object);
    },

    searchFont: function(object) {
      var self = this;

      var fonts = self.searchFonts(object);

      if (fonts.length === 1) {
        return fonts[0];
      } else if (fonts.length > 0) {
        return self._getBestFontForSearch(fonts, object);
      } else {
        return;
      }
    },

    getFontByKey: function(key, provider) {
      var self = this;

      if (!provider) {
        throw 'Provider is not set.';
      }

      var font = self.searchFont({key: key, provider: provider});

      if (!font) {
        throw 'Font "' + key + '" not found in "' + provider + '".';
      }

      return font;
    },

    getFontByStack: function(stack, strict) {
      strict = typeof strict === 'boolean' ? strict : true;
      var fonts, self = this;

      if (strict) {
        var font = self.searchFont({stack: stack});
        fonts = font ? [font] : [];
      } else {
        fonts = self.$filter('stackSearch')(self._fonts, stack);
      }

      if (!fonts.length) {
        throw new Error ('Font with stack "' + stack + '" not found.');
      }

      return fonts[0];
    },

    getFontByStackAsync: function(stack, strict) {
      strict = typeof strict === 'boolean' ? strict : true;
      var self = this;
      var d = self.$q.defer();
      var index = null;

      self.$q.all(self._asyncProviderQueue).then(function() {
        try {
          var font = self.getFontByStack(stack, strict);
          d.resolve(font);
        } catch (e) {
          if (strict) {
            d.reject(e);
            delete self._initPromises[index];
          } else {
            d.resolve();
          }
        }
      }, d.reject);

      index = self._initPromises.push(d.promise) - 1;
      return d.promise;
    },

    getFontsByStacksAsync: function(stacks, strict) {
      strict = typeof strict === 'boolean' ? strict : true;
      var self = this;
      var queue = [];

      angular.forEach(stacks, function(stack) {
        queue.push(self.getFontByStackAsync(stack, strict));
      });

      var all = self.$q.all(queue);

      if (strict) {
        return all;
      } else {
        var d = self.$q.defer();
        all.then(function(fonts) {
          var result = [];
          angular.forEach(fonts, function(font) {
            if (angular.isObject(font)) {
              result.push(font);
            }
          });
          d.resolve(result);
        }, d.reject);
        return d.promise;
      }
    },

    removeFont: function(font, provider) {
      var self = this;

      if (angular.isString(font) && !provider) {
        throw 'Provider is not set.';
      }

      try {
        if (angular.isString(font)) {
          font = self.getFontByKey(font, provider);
        }

        var index = self._fonts.indexOf(font);
        var retVal = 0;

        if (index >= 0) {
          retVal = self._fonts.splice(index, 1).length;
        }
        return retVal;
      } catch (e) {
        return 0;
      }
    },

    isValidFontObject: function(fontObj) {
      if (!angular.isObject(fontObj)) {
        return false;
      }

      var valid = true;

      angular.forEach(REQUIRED_FONT_OBJECT_KEYS, function(key) {
        if (angular.isUndefined(fontObj[key])) {
          valid = false;
        }
      });

      return valid;
    },

    getCategories: function() {
      return DEFAULT_CATEGORIES;
    },

    getImports: function() {
      return this._imports;
    },

    /**
     * getImportsForStacks([
     *   "'Roboto', sans-serif, 'google'",
     *   "'Own font', serif"
     * ]);
     */
    getImportsForStacks: function(fontStacks, strict) {
      var self = this;
      var d = self.$q.defer();

      if (!angular.isArray(fontStacks)) {
        d.reject(new Error('No stacks given'));
      } else {
        var fonts = [];
        self.getFontsByStacksAsync(fontStacks, strict).then(function(fontsByStack) {
          fonts = fontsByStack;
        })['finally'](function() {
          d.resolve(self.getUrlsFor(fonts));
        });
      }

      return d.promise;
    },

    getSubsets: function() {
      return this._subsets;
    },

    getProviders: function() {
      return this._providers;
    },

    getUsage: function() {
      return this._usedProviders;
    },

    /**
     * Get a usage object from a list of font stacks
     *
     * getUsageForStacks([
     *   "'Roboto', sans-serif, 'google'",
     *   "'Own font', serif, 'custom'"
     * ]);
     *
     * @param {Array} fontStacks
     * @return {Object}
     */
    getUsageForStacks: function(fontStacks) {
      var self = this;
      var normalize = self.$filter('stackSearch').normalizeStack;
      var existingProviders = self.getProviders();
      var usage = {};

      if (!angular.isArray(fontStacks)) {
        return usage;
      }

      angular.forEach(fontStacks, function(stack) {
        if (!stack) { return; }

        var normalizedStack = normalize(stack);
        var provider = normalizedStack[normalizedStack.length - 1];
        if (!usage[provider] && !angular.isUndefined(existingProviders[provider])) {
          usage[provider] = true;
        }
      });

      return usage;
    },

    setSubsets: function(subsets, options) {
      var self = this;
      return self._setSelects(
        self._subsets,
        subsets,
        self._setSelectOptions(options)
      );
    },

    setProviders: function(providers, options) {
      var self = this;
      return self._setSelects(
        self._providers,
        providers,
        self._setSelectOptions(options)
      );
    },

    setImports: function(imports, options) {
      var self = this;
      return self._setSelects(
        self._imports,
        imports,
        self._setSelectOptions(options, {update: true})
      );
    },

    setUsage: function(usage, options) {
      var self = this;
      return self._setSelects(
        self._usedProviders,
        usage,
        self._setSelectOptions(options, {update: true})
      );
    },

    registerProvider: function(name, fontInitiator) {
      var self = this;

      var provider = {};
      provider[name] = false;
      self.setProviders(provider);
      self._usedProviders[name] = false;
      self._fontInitiators[name] = fontInitiator;
    },

    /* http://stackoverflow.com/questions/3446170/escape-string-for-use-in-javascript-regex */
    _escapeRegExp: function(str) {
      return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, '\\$&');
    },

    _getBestFontForSearch: function(fonts, search) {
      var self = this;

      fonts.sort(function(a, b) {
        var rankA = 0;
        var rankB = 0;
        angular.forEach(search, function(value, key) {
          if (angular.isString(value)) {
            var rgx = new RegExp(self._escapeRegExp(value));

            if (rgx.test(a[key]) && rgx.test(b[key])) {
              var restA = a[key].replace(value, '').length;
              var restB = b[key].replace(value, '').length;

              if (restA < restB) {
                rankA++;
              } else if (restB < restA) {
                rankB++;
              }
              return;
            }
          }

          if (a[key] === value) {
            rankA++;
          }
          if (b[key] === value) {
            rankB++;
          }
        });

        if (rankA > rankB) {
          return -1;
        } else if(rankB > rankA) {
          return 1;
        } else {
          return 0;
        }
      });

      return fonts[0];
    },

    _setSelectOptions: function(options, additional) {
      if (typeof options === 'boolean') {
        options = {additive: options};
      }

      if (!angular.isObject(additional)) {
        additional = {};
      }

      options = angular.extend({
        additive: true,
        update: false
      }, options, additional);

      return options;
    },

    _setSelects: function(target, srcs, options) {
      if (angular.isUndefined(srcs)) {
        return target;
      }

      if (!angular.isObject(options)) {
        options = this._setSelectOptions(options);
      }

      if (angular.isArray(srcs)) {
        var srcsObj = {};
        for (var i = 0, l = srcs.length; i < l; i++) {
          srcsObj[srcs[i]] = false;
        }
        srcs = srcsObj;
      }

      /* If we aren't additive, remove all keys that are not present in srcs */
      if (!options.additive) {
        angular.forEach(target, function(active, src) {
          if (!srcs[src]) {
            delete target[src];
          }
        });
      }

      angular.forEach(srcs, function(active, src) {
        if (options.update || angular.isUndefined(target[src])) {
          target[src] = active;
        }
      });

      return target;
    },

    updateImports: function() {
      this.setImports(this.getUrls());
    },

    load: function(font) {
      if (font.loaded) {
        return;
      }

      font.loaded = true;
      this._fontInitiators[font.provider](font);
    },

    getUrls: function() {
      var self = this;
      var googleUrl = self.getGoogleUrl();
      var urls = {};

      if (googleUrl) {
        urls[PROVIDER_GOOGLE] = googleUrl;
      }

      return urls;
    },

    getUrlsFor: function(fonts) {
      var self = this;
      var googleFonts = self.$filter('filter')(fonts, {provider: PROVIDER_GOOGLE});
      var googleUrl = self.getGoogleUrlFor(googleFonts);
      var urls = {};

      if (googleUrl) {
        urls[PROVIDER_GOOGLE] = googleUrl;
      }

      return urls;
    },

    updateUsage: function(font, wasActivated) {
      var self = this;

      if (!angular.isNumber(font.used) || font.used < 0) {
        font.used = 0;
      }
      font.used += wasActivated === false ? -1 : 1;

      self._updateProvicerUsage();
    },


    _updateProvicerUsage: function() {
      var self = this;
      var filter = self.$filter('filter');
      var usedFonts = self.getUsedFonts();

      angular.forEach(self._providers, function(active, provider) {
        self._usedProviders[provider] = !!filter(
          usedFonts,
          {provider: provider}
        ).length;
      });
    },

    getUsedFonts: function() {
      var self = this;

      return self.$filter('filter')(self._fonts, {used: true}, function(used) {
        return !!used;
      });
    },

    getGoogleUrl: function() {
      var self = this;
      var googleFonts = self.$filter('filter')(self.getUsedFonts(), {provider: PROVIDER_GOOGLE});
      return self.getGoogleUrlFor(googleFonts);
    },

    getGoogleUrlFor: function(googleFonts) {
      var self = this;
      var subsets = [];
      var url = URL_GOOGLE_FONTS_CSS;

      if (googleFonts.length) {
        var googleNames = [];
        var variant;

        for (var i = 0, l = googleFonts.length; i < l; i++) {
          variant = googleFonts[i].variants ? ':' + self._getBestVariantOf(googleFonts[i].variants) : '';
          googleNames.push(googleFonts[i].name + variant);
        }

        url += '?family=' + window.escape(googleNames.join('|'));

        angular.forEach(self._subsets, function(active, key) {
          if (active) {
            subsets.push(key);
          }
        });

        if (subsets.length) {
          url += '&subset=' + subsets.join(',');
        }

        return url;
      } else {
        return false;
      }
    },

    _remap: function(provider, from) {
      var self = this;
      var fonts = self._fonts[provider];

      if (!angular.isNumber(from)) {
        from = 0;
      }

      for (var i = from, l = fonts.length; i < l; i++) {
        self._map[provider][fonts[i].key] = i;
      }
    },

    _getBestOf: function(things, prios) {
      for (var i = 0, l = prios.length; i < l; i++) {
        var thing = prios[i];
        if (things.indexOf(thing) >= 0) {
          return thing;
        }
      }
      return things[0];
    },

    _getBestVariantOf: function(variants) {
      return this._getBestOf(variants, VARIANT_PRIORITY);
    },

    _getBestSubsetOf: function(subsets) {
      return this._getBestOf(subsets, SUBSET_PRIORITY);
    },

    _initGoogleFonts: function(force) {
      var self = this;

      if (!self.jdFontselectConfig.googleApiKey || (!force && _googleFontsInitiated)) {
        return;
      }

      var googleFontsUrl = self.jdFontselectConfig.googleApiUrl || URL_GOOGLE_FONTS_API;

      _googleFontsInitiated = true;

      var d = self.$q.defer();
      self._initPromises.push(d.promise);
      self._asyncProviderQueue.push(d.promise);

      self.$http({
        method: METHOD_GET,
        url: googleFontsUrl,
        params: {
          sort: 'popularity',
          key: self.jdFontselectConfig.googleApiKey
        }
      }).success(function(response) {
        var amount = response.items.length;
        var ready = amount - 1;
        var fonts = [];

        angular.forEach(response.items, function(font, i) {
          var category = self._getGoogleFontCat(font.family);

          fonts.push(self.add({
            subsets: font.subsets,
            variants: font.variants,
            name: font.family,
            popularity: amount - i,
            key: _createKey(font.family),
            lastModified: font.lastModified,
            stack: '"' + font.family + '", ' + category.fallback,
            category: category.key
          }, PROVIDER_GOOGLE));

          if (ready === i) {
            d.resolve(fonts);
          }
        });
      }).error(d.reject);
    },

    _getGoogleFontCat: function(font) {
      var self = this;

      var categories = self.getCategories();
      for (var i = 0, l = categories.length; i < l; i++) {
        var category = categories[i];

        if (typeof GOOGLE_FONT_CATEGORIES[category.key] === 'undefined') {
          continue;
        }

        if (GOOGLE_FONT_CATEGORIES[category.key].indexOf(font) >= 0) {
          return category;
        }
      }

      // console.error('Category not Found:', font);
      return CATEGORY_OBJECTS[CATEGORY_OTHER];
    },

    _addDefaultFonts: function() {
      var self = this;

      angular.forEach(DEFAULT_WEBSAFE_FONTS, function(font) {
        self.add(font);
      });
    },

    _loadGoogleFont: function(font) {
      var self = this;
      try {
        self.jdfsWebFont.getFontLoader().load({
          google: {
            families: [font.name + ':' + self._getBestVariantOf(font.variants)],
            text: font.name,
            subsets: font.subsets,
            subset: self._getBestSubsetOf(font.subsets)
          }
        });
      } catch (e) {
        self.removeFont(font, PROVIDER_GOOGLE);
      }
    }
  };

  fontselectModule.service(NAME_FONTSSERVICE, FontsService);

  // /node_modules/grunt-angular-toolbox/.tmp/ng_templates.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';

    $templateCache.put('current-href.html',
      "<link ng-href={{url}} ng-repeat=\"url in urls\">"
    );


    $templateCache.put('font.html',
      "<label class=jdfs-fontlist-font ng-class=\"{'jdfs-active jdfs-highlight': current.font.name == font.name}\" for=jdfs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\"><input type=radio ng-model=current.font ng-value=font name=jdfs-{{id}}-font id=jdfs-{{id}}-font-{{font.key}}> {{font.name}}</label>"
    );


    $templateCache.put('fontlist-entry.html',
      "<ng-switch on=entry.type><li ng-switch-when=FONT><jd-font current=current font=entry.content></jd-font></li><li ng-switch-when=HEADLINE class=jdfs-fontlist-headline>{{entry.content}}</li><li ng-switch-when=TEXT class=jdfs-fontlist-text>{{entry.content}}</li></ng-switch>"
    );


    $templateCache.put('fontlist.html',
      "<div class=jdfs-fontlistcon ng-class=\"{'jdfs-active': isActive()}\"><button class=\"jdfs-fontpagination jdfs-fontpagination-prev\" ng-click=\"paginate('prev', $event)\" ng-class=\"{'jdfs-disabled': !paginationButtonActive('prev')}\" ng-disabled=\"!paginationButtonActive('prev')\">{{text.page.prev}}</button><ul class=jdfs-fontlist><jd-fontlist-entry current=current entry=entry ng-repeat=\"entry in getFontlistEntries() | startFrom: page.current * page.size | limitTo: page.size\"></jd-fontlist-entry></ul><button class=\"jdfs-fontpagination jdfs-fontpagination-next\" ng-click=\"paginate('next', $event)\" ng-class=\"{'jdfs-disabled': !paginationButtonActive('next')}\" ng-disabled=\"!paginationButtonActive('next')\">{{text.page.next}}</button></div>"
    );


    $templateCache.put('fontselect.html',
      "<div class=jdfs-main id=jd-fontselect-{{suffixedId}}><button ng-click=toggleSearch($event) ng-class=\"{'jdfs-highlight': searching}\" class=jdfs-search-indicator>{{text.searchToggleLabel}}</button> <button ng-click=toggleSearch($event) class=jdfs-toggle-search id=jd-fontselect-{{suffixedId}}-toggle-search ng-show=!searching><span class=jdfs-font-name style=\"font-family: {{current.font.stack}}\">{{current.font.name || text.toggleSearchLabel}}</span></button> <input class=jdfs-search placeholder={{text.search}} name=jdfs-{{id}}-search ng-show=searching ng-model=current.search> <button class=jdfs-reset-search ng-click=resetSearch($event) ng-show=\"searching && current.search.length > 0\">x</button> <button class=jdfs-toggle ng-click=toggle($event) id=jd-fontselect-{{suffixedId}}-toggle ng-class=\"{'jdfs-highlight': active}\">{{active ? text.toggleCloseLabel : text.toggleOpenLabel}}</button><div class=jdfs-window ng-if=active><jd-fontlist fsid=id text=text meta=meta current=current fonts=fonts></jd-fontlist><div class=jdfs-footer-con><a class=\"jdfs-footer-tab-toggle jdfs-styles-label\" ng-click=toggleStyles() ng-class=\"{'jdfs-footer-tab-open': stylesActive}\">{{text.styleLabel}}</a> <a class=\"jdfs-footer-tab-toggle jdfs-settings-label\" ng-click=toggleSettings() ng-class=\"{'jdfs-footer-tab-open': settingsActive}\">{{text.settingsLabel}}</a><div class=jdfs-footer><div class=jdfs-styles ng-show=stylesActive><button class=\"jdfs-filterbtn jdfs-fontstyle-{{category.key}}\" ng-repeat=\"category in categories\" ng-class=\"{'jdfs-active jdfs-highlight': category.key == current.category}\" ng-click=\"setCategoryFilter(category.key, $event)\" ng-model=current.category>{{text.category[category.key] || toName(category.key)}}</button></div><div class=jdfs-settings ng-show=settingsActive><div class=jdfs-provider-list><h4 class=jdfs-settings-headline>{{text.providerLabel}}</h4><div ng-repeat=\"(provider, active) in current.providers\" class=jdfs-provider ng-class=\"{'jdfs-active jdfs-highlight': current.providers[provider]}\"><input ng-model=current.providers[provider] type=checkbox id=jdfs-{{id}}-provider-{{provider}}><label for=jdfs-{{id}}-provider-{{provider}}>{{text.provider[provider] || toName(provider)}}</label></div></div><div class=jdfs-subsets><h4 class=jdfs-settings-headline>{{text.subsetLabel}}</h4><div ng-repeat=\"(key, name) in current.subsets\" class=jdfs-subset ng-class=\"{'jdfs-active jdfs-highlight': current.subsets[key]}\"><input ng-model=current.subsets[key] type=checkbox id=jdfs-{{id}}-subset-{{key}}><label for=jdfs-{{id}}-subset-{{key}}>{{text.subset[key] || toName(key)}}</label></div></div></div></div></div><jd-meta meta=meta></jd-meta><button ng-click=toggle($event) class=jdfs-close><span>{{text.closeButton}}</span></button></div></div>"
    );


    $templateCache.put('meta.html',
      "<div class=jdfs-meta><div class=jdfs-fontcount>{{text.fontFabel}} <span ng-if=\"meta.fonts.current == meta.fonts.total\">{{meta.fonts.total}}</span> <span ng-if=\"meta.fonts.total && meta.fonts.current != meta.fonts.total\">{{meta.fonts.current}}/{{meta.fonts.total}}</span> <span ng-if=!meta.fonts.total>…</span></div><div class=jdfs-pagecon>{{text.pageLabel}} <span class=jdfs-page-current>{{meta.page.currentAbs + 1}}</span>/<span class=jdfs-page-count>{{meta.page.count}}</span></div></div>"
    );

  }]);
})(window.angular);
