/*!
 * angular-fontselect v0.7.4
 * https://github.com/Jimdo/angular-fontselect
 *
 * A fontselect directive for AngularJS
 *
 * Copyright 2014, Jimdo, Hannes Diercks <hannes.diercks@jimdo.com>
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
  var PAGE_SIZE_DEFAULT = 10;
  
  /** @const */
  var DIR_PARTIALS = 'src/partials/';
  
  /** @const */
  var NAME_CONTROLLER = '.controller';
  
  /** @const */
  var NAME_FONTSSERVICE = 'jdFontselect.fonts';
  
  /** @const */
  var DEFAULT_WEBSAFE_FONTS = [
    {
      name: 'Arial',
      key: 'arial',
      category: 'sansserif',
      stack: 'Arial, "Helvetica Neue", Helvetica, sans-serif',
      popularity: 3,
      lastModified: '2014-01-28'
    },
    {
      name: 'Consolas',
      key: 'consolas',
      category: 'sans-serif',
      stack: 'Consolas, "Lucida Console", Monaco, monospace',
      popularity: 1,
      lastModified: '2014-02-04'
    },
    {
      name: 'Courier New',
      key: 'couriernew',
      category: 'serif',
      stack: '"Courier New", Courier, "Lucida Sans Typewriter", "Lucida Typewriter", monospace',
      popularity: 1,
      lastModified: '2014-01-28'
    },
    {
      name: 'Georgia',
      key: 'georgia',
      category: 'serif',
      stack: 'Georgia, Palatino, "Palatino Linotype", Times, "Times New Roman", serif',
      popularity: 2,
      lastModified: '2014-02-04'
    },
    {
      name: 'Helvetica',
      key: 'helvetica',
      category: 'sansserif',
      stack: 'Helvetica, "Helvetica Neue", Arial, sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Impact',
      key: 'impact',
      category: 'display',
      stack: 'Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Lucida Sans',
      key: 'lucidasans',
      category: 'sansserif',
      stack: '"Lucida Sans", "Lucida Grande", "Lucida Sans Unicode", sans-serif',
      popularity: 3,
      lastModified: '2014-02-04'
    },
    {
      name: 'Palatino',
      key: 'palatino',
      category: 'serif',
      stack: 'Palatino, "Palatino Linotype", Georgia, Times, "Times New Roman", serif',
      popularity: 2,
      lastModified: '2014-02-04'
    },
    {
      name: 'Tahoma',
      key: 'tahoma',
      category: 'sansserif',
      stack: 'Tahoma, Verdana, Geneva, sans-serif',
      popularity: 6,
      lastModified: '2014-02-04'
    },
    {
      name: 'Trebuchet',
      key: 'trebuchet',
      category: 'sansserif',
      stack: '"Trebuchet MS", "Lucida Sans Unicode", "Lucida Grande", "Lucida Sans", Arial, sans-serif',
      popularity: 6,
      lastModified: '2014-02-04'
    },
    {
      name: 'Verdana',
      key: 'verdana',
      category: 'sansserif',
      stack: 'Verdana, Geneva, sans-serif',
      popularity: 6,
      lastModified: '2014-01-28'
    },
    {
      name: 'Times New Roman',
      key: 'timesnewroman',
      category: 'serif',
      stack: 'TimesNewRoman, "Times New Roman", Times, Baskerville, Georgia, serif',
      popularity: 2,
      lastModified: '2014-01-28'
    },
    {
      name: 'Brush Script',
      key: 'brushscript',
      category: 'handwriting',
      stack: '"Brush Script MT", cursive',
      popularity: 5,
      lastModified: '2014-01-29'
    }
  ];
  
  /** @const */
  var DEFAULT_CATEGORIES = [
    {
      key: 'sansserif',
      fallback: 'sans-serif'
    },
    {
      key: 'serif',
      fallback: 'serif'
    },
    {
      key: 'handwriting',
      fallback: 'cursive'
    },
    {
      key: 'display',
      fallback: 'cursive'
    },
    {
      key: 'other',
      fallback: 'sans-serif'
    }
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
  var SUPPORT_KHMER = false;
  
  /** @const */
  var METHOD_GET = 'get';
  
  /** @const */
  var URL_GOOGLE_FONTS_API = 'https://www.googleapis.com/webfonts/v1/webfonts';
  
  /** @const */
  var URL_GOOGLE_FONTS_CSS = 'http://fonts.googleapis.com/css';
  
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
      devanagari: 'Devanagari'
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
    googleApiKey: false
  });

  // src/js/helper.google-font-categories.js
  /** @const */
  var GOOGLE_FONT_CATEGORIES = {
    handwriting: [
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
    ],
    sansserif: [
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
    ],
    display: [
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
    ],
    serif: [
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
    ],
    other: [
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
    ]
  };

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

  // src/js/service.fonts.js
  var _fontsServiceDeps = ['$http', '$q', 'jdFontselectConfig', '$filter'];
  
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
      self._fontInitiators = [];
      self._asyncFontSearches = {};
  
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
  
      if (angular.isObject(self._asyncFontSearches[fontObj.stack])) {
        self._asyncFontSearches[fontObj.stack].forEach(function(callback) {
          callback(fontObj);
        });
        delete self._asyncFontSearches[fontObj.stack];
      }
  
      self._fonts.push(fontObj);
    },
  
    searchFonts: function(object) {
      var self = this;
  
      return self.$filter('filter')(self._fonts, object);
    },
  
    searchFont: function(object) {
      var self = this;
  
      var fonts = self.searchFonts(object);
  
      if (fonts.length > 0) {
        fonts = fonts[0];
      } else {
        return false;
      }
  
      return fonts;
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
  
    getFontByStack: function(stack) {
      var self = this;
  
      var font = self.searchFont({stack: stack});
  
      if (!font) {
        throw new Error ('Font with stack "' + stack + '" not found.');
      }
  
      return font;
    },
  
    getFontByStackAsync: function(stack) {
      var self = this;
      var d = self.$q.defer();
  
      try {
        var font = self.getFontByStack(stack);
        d.resolve(font);
      } catch (e) {
        if (!angular.isArray(self._asyncFontSearches[stack])) {
          self._asyncFontSearches[stack] = [];
        }
        self._asyncFontSearches[stack].push(d.resolve);
      }
  
      self._initPromises.push(d.promise);
      return d.promise;
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
  
    getSubsets: function() {
      return this._subsets;
    },
  
    getProviders: function() {
      return this._providers;
    },
  
    getUsage: function() {
      return this._usedProviders;
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
      var subsets = [];
      var url = URL_GOOGLE_FONTS_CSS;
  
      if (googleFonts.length) {
        var googleNames = [];
  
        for (var i = 0, l = googleFonts.length; i < l; i++) {
          googleNames.push(googleFonts[i].name);
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
  
    _initGoogleFonts: function() {
      var self = this;
  
      if (!self.jdFontselectConfig.googleApiKey || _googleFontsInitiated) {
        return;
      }
  
      _googleFontsInitiated = true;
  
      var deferred = self.$q.defer();
      self._initPromises.push(deferred.promise);
  
      self.$http({
        method: METHOD_GET,
        url: URL_GOOGLE_FONTS_API,
        params: {
          sort: 'popularity',
          key: self.jdFontselectConfig.googleApiKey
        }
      }).success(function(response) {
        var amount = response.items.length;
        var ready = amount - 1;
  
        angular.forEach(response.items, function(font, i) {
          var category = self._getGoogleFontCat(font.family);
          if (SUPPORT_KHMER || font.subsets.length === 1 && font.subsets[0] === 'khmer') {
            return;
          }
  
          self.add({
            subsets: font.subsets,
            variants: font.variants,
            name: font.family,
            popularity: amount - i,
            key: _createKey(font.family),
            lastModified: font.lastModified,
            stack: '"' + font.family + '", ' + category.fallback,
            category: category.key
          }, PROVIDER_GOOGLE);
  
          if (ready === i) {
            deferred.resolve();
          }
        });
      }).error(deferred.reject);
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
      return categories[5];
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
        WebFont.load({
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
  
  fontselectModule.factory(NAME_FONTSSERVICE, ['$injector', function($injector) {
    return $injector.instantiate(FontsService);
  }]);

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
        onInit: '&?'
      },
      restrict: 'E',
      templateUrl: DIR_PARTIALS + 'fontselect.html',
      replace: true,
      controller: ['$scope', '$element', '$timeout', function($scope, $element, $timeout) {
        $scope.fonts = fontsService.getAllFonts();
        $scope.id = id++;
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
  
        function isDescendant(parent, child) {
          var node = child;
          while (node !== null) {
            if (node === parent) {
              return true;
            }
            node = node.parentNode;
          }
          return false;
        }
  
        function close() {
          $scope.toggle();
          $scope.$digest();
        }
  
        $scope.reverseSort = function() {
          var sort = $scope.current.sort;
  
          sort.direction = !sort.direction;
        };
  
        $scope.toggle = function() {
          $scope.active = !$scope.active;
  
          if (!$scope.active) {
            $scope.searching = false;
          }
        };
  
        $scope.toggleSearch = function() {
          $scope.active = true;
  
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
  
        $scope.resetSearch = function() {
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
  
        document.addEventListener('click', function(event) {
          if ($scope.active && !isDescendant($element[0], event.target)) {
            close();
          }
        });
  
        document.addEventListener('keyup', function(event) {
          if ($scope.active && event.keyCode === KEY_ESCAPE) {
            close();
          }
        });
  
        $scope.setCategoryFilter = function(category) {
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
  
        /* INITIALIZE */
        if (angular.isObject($scope.current)) {
          setState($scope.current);
        }
  
        if ($scope.stack.length) {
          try {
            var font = fontsService.getFontByStack($scope.stack);
            /* Since we're setting the font now before watchers are initiated, we need to update usage by ourself. */
            fontsService.updateUsage(font);
            setState({font: font});
          } catch (e) {
            fontsService.getFontByStackAsync($scope.stack).then(function(font) {
              setState({font: font});
            });
          }
        }
  
        $scope.onInit({$scope: $scope, $element: $element});
      }],
  
      link: function(scope) {
        scope.$watch('current.font', function(newFont, oldFont) {
          if (!angular.isObject(scope.current)) {
            scope.reset();
          }
  
          if (oldFont !== newFont) {
            scope.tryUnfocusSearch();
  
            if (angular.isObject(scope.current.font)) {
              newFont = scope.current.font;
            }
  
            if (angular.isObject(oldFont) && oldFont.used) {
              fontsService.updateUsage(oldFont, false);
            }
            if (angular.isObject(newFont)) {
              fontsService.updateUsage(newFont);
            }
  
            scope._setSelected(newFont);
            fontsService.updateImports();
          }
        });
  
        scope.$watch('current.subsets', function(newSubsets, oldSubsets) {
          if (newSubsets !== oldSubsets) {
            fontsService.updateImports();
          }
        }, true);
  
        scope.$watch('stack', function(newStack, oldStack) {
          var font;
  
          if (newStack === oldStack || (scope.current.font && newStack === scope.current.font.stack)) {
            return;
          }
  
          if (newStack && newStack.length) {
            font = fontsService.getFontByStack(newStack);
          }
  
          if (font) {
            scope.current.font = font;
          } else {
            scope.reset();
          }
        });
      }
    };
  }]);

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
        text: '=',
        active: '='
      },
      restrict: 'E',
      templateUrl: DIR_PARTIALS + 'fontlist.html',
      replace: true,
      controller: NAME_JDFONTLIST_CONTROLLER
    };
  });
  
  fontselectModule.controller(NAME_JDFONTLIST_CONTROLLER, [
    '$scope',
    '$rootScope',
    '$filter',
    'jdFontselect.fonts',  function($scope, $rootScope, $filter, fontsService) {    var _filteredFonts = [];
      var _sortedFonts;
      var _categorizedFonts;
      var _fontsInSubsets;
      var _fontsInProviders;
      var _lastPageCount = 0;
      var _sortCache = {};
  
      var page = $scope.page = $scope.meta.page = {
        size: PAGE_SIZE_DEFAULT,
        count: 0,
        current: 0
      };
      var fontmeta = $scope.meta.fonts = {
        total: 0,
        current: 0
      };
  
      function isOnCurrentPage(index) {
        var currentMinIndex = page.current * page.size;
  
        return index >= currentMinIndex && index < currentMinIndex + page.size;
      }
  
      $scope.keyfocus = function(direction, amount) {
        var index = _filteredFonts.indexOf($scope.current.font);
        var pageoffset = page.size * page.current;
        var onPage = isOnCurrentPage(index);
  
        if (angular.isUndefined(amount)) {
          amount = 1;
        }
  
        index += (direction === DIRECTION_PREVIOUS ? -amount : amount);
  
        if (!onPage && _filteredFonts[index + pageoffset]) {
          index += pageoffset;
        }
  
        if (_filteredFonts[index]) {
          $scope.current.font = _filteredFonts[index];
  
          page.current = Math.floor(index / page.size);
  
          $rootScope.$digest();
        }
      };
  
      document.addEventListener('keydown', function(event) {
        if (!$scope.active) {
          return;
        }
  
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
      });
  
      /**
       * Set the current page
       *
       * @param {Number} currentPage
       * @return {void}
       */
      $scope.setCurrentPage = function(currentPage) {
        page.current = currentPage;
      };
  
      /**
       * Go to the next or previous page.
       *
       * @param  {String} direction 'next' or 'prev'
       * @return {void}
       */
      $scope.paginate = function(direction) {
        if (!$scope.paginationButtonActive(direction)) {
          return;
        }
  
        page.current += (direction === DIRECTION_PREVIOUS ? -1 : 1);
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
          (direction === DIRECTION_NEXT && page.current < page.count - 1) ||
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
       * Apply the current filters to our internal font object.
       *
       * Ensure we only apply filters when the filter parameters
       * or the source have changed.
       *
       * @return {Array}
       */
      $scope.getFilteredFonts = function() {
        if (!angular.isArray($scope.fonts)) {
          _filteredFonts = [];
        } else {
          var direction = $scope.current.sort.attr.dir;
  
          /* Apply all filters if the source is new. */
          if ($scope.fonts.length !== _sortCache.sourceCache) {
            _sortCache.sourceCache = $scope.fonts.length;
            /* ESKALATE! */
            _sortCache.providers = null;
          }
  
          if (_sortCache.providers !== JSON.stringify($scope.current.providers)) {
            _sortCache.providers = JSON.stringify($scope.current.providers);
            _sortCache.subsets = null;
  
            _fontsInProviders = $scope.fonts.filter(function(font) {
              return $scope.current.providers[font.provider];
            });
          }
  
          if (_sortCache.subsets !== JSON.stringify($scope.current.subsets)) {
            _sortCache.subsets = JSON.stringify($scope.current.subsets);
            _sortCache.sortdir = null;
  
            _fontsInSubsets = $filter('hasAllSubsets')(
              _fontsInProviders,
              $scope.current.subsets
            );
          }
  
          if (_sortCache.sortattr !== $scope.current.sort.attr.key ||
            _sortCache.sortdir !== $scope.current.sort.direction)
          {
            _sortCache.sortattr = $scope.current.sort.attr.key;
            _sortCache.sortdir = $scope.current.sort.direction;
            _sortCache.category = null;
  
            _sortedFonts = $filter('orderBy')(
              _fontsInSubsets,
              $scope.current.sort.attr.key,
              $scope.current.sort.direction ? direction : !direction
            );
          }
  
          if (_sortCache.category !== $scope.current.category) {
            _sortCache.category = $scope.current.category;
            _sortCache.search = null;
  
            _categorizedFonts = $filter('filter')(_sortedFonts, {category: $scope.current.category}, true);
          }
  
          /* check if the source is the same */
          if (_sortCache.search !== $scope.current.search) {
            _sortCache.search = $scope.current.search;
            var search = $scope.current.search || '';
  
            if (search.length) {
              _filteredFonts = _priorize(
                $filter('fuzzySearch')(_categorizedFonts, {name: search}),
                search.toLowerCase()
              );
            } else {
              _filteredFonts = _categorizedFonts;
            }
          }
  
        }
  
        fontmeta.total = $scope.fonts.length;
        fontmeta.current = _filteredFonts.length;
  
        return _filteredFonts;
      };
  
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
  
        if (_filteredFonts.length) {
          page.count = Math.ceil(_filteredFonts.length / page.size);
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
  
        var currentFont = $scope.current.font;
  
        /* check if the current font is anywhere on our current pages */
        var index = _filteredFonts.indexOf(currentFont);
  
        /* If we have a font selected and it's inside the filter we use */
        if (currentFont && index >= 0) {
          /* go to this page */
          page.current = Math.ceil((index + 1) / page.size) - 1;
        } else {
          /* Just go to the last page if the current does not exist */
          if (page.current > page.count) {
            page.current = 0;
          }
        }
      }
  
      /* Initiate! */
      fontsService._initGoogleFonts();
    }
  ]);

  // src/js/directive.font.js
  fontselectModule.directive('jdFont', ['jdFontselect.fonts', function(fontsService) {
    return {
      templateUrl: DIR_PARTIALS + 'font.html',
      restrict: 'E',
      replace: true,
      controller: ['$scope', function($scope) {
        fontsService.load($scope.font);
      }]
    };
  }]);

  // src/js/directive.current-href.js
  fontselectModule.directive('jdFontselectCurrentHref', [NAME_FONTSSERVICE, function(fontsService) {
    return {
      templateUrl: DIR_PARTIALS + 'current-href.html',
      restrict: 'A',
      replace: true,
      controller: ['$scope', function($scope) {
        $scope.urls = fontsService.getImports();
      }]
    };
  }]);

  // src/js/directive.meta.js
  var NAME_JDMETA = 'jdMeta';
  
  fontselectModule.directive(NAME_JDMETA, function() {
    return {
      restrict: 'E',
      templateUrl: DIR_PARTIALS + 'meta.html',
      replace: true
    };
  });

  // src/partials/all.js
  angular.module('jdFontselect').run(['$templateCache', function($templateCache) {
    'use strict';
  
    $templateCache.put('src/partials/current-href.html',
      "<link ng-href={{url}} ng-repeat=\"url in urls\">"
    );
  
  
    $templateCache.put('src/partials/font.html',
      "<li><input type=radio ng-model=current.font ng-value=font name=jdfs-{{id}}-font id=jdfs-{{id}}-font-{{font.key}}><label ng-class=\"{'jdfs-active jdfs-highlight': current.font.name == font.name}\" for=jdfs-{{id}}-font-{{font.key}} style=\"font-family: {{font.stack}}\">{{font.name}}</label></li>"
    );
  
  
    $templateCache.put('src/partials/fontlist.html',
      "<div class=jdfs-fontlistcon ng-class=\"{'jdfs-active': isActive()}\"><button class=\"jdfs-fontpagination jdfs-fontpagination-prev\" ng-click=\"paginate('prev')\" ng-class=\"{'jdfs-disabled': !paginationButtonActive('prev')}\" ng-disabled=\"!paginationButtonActive('prev')\">{{text.page.prev}}</button><ul class=jdfs-fontlist><li ng-if=\"getFilteredFonts().length === 0\" class=jdfs-fontlist-noresults>{{text.noResultsLabel}}</li><jd-font ng-repeat=\"font in getFilteredFonts() | startFrom: page.current * page.size | limitTo: page.size\"></ul><button class=\"jdfs-fontpagination jdfs-fontpagination-next\" ng-click=\"paginate('next')\" ng-class=\"{'jdfs-disabled': !paginationButtonActive('next')}\" ng-disabled=\"!paginationButtonActive('next')\">{{text.page.next}}</button></div>"
    );
  
  
    $templateCache.put('src/partials/fontselect.html',
      "<div class=jdfs-main id=jd-fontselect-{{id}}><button ng-click=toggleSearch() ng-class=\"{'jdfs-highlight': searching}\" class=jdfs-search-indicator>{{text.searchToggleLabel}}</button><button ng-click=toggleSearch() class=jdfs-toggle-search ng-show=!searching><span class=jdfs-font-name style=\"font-family: {{current.font.stack}}\">{{current.font.name || text.toggleSearchLabel}}</span></button><input class=jdfs-search placeholder={{text.search}} name=jdfs-{{id}}-search ng-show=searching ng-model=current.search><button class=jdfs-reset-search ng-click=resetSearch() ng-show=\"searching && current.search.length > 0\">x</button><button class=jdfs-toggle ng-click=toggle() ng-class=\"{'jdfs-highlight': active}\">{{active ? text.toggleCloseLabel : text.toggleOpenLabel}}</button><div class=jdfs-window ng-show=active><jd-fontlist fsid=id text=text meta=meta current=current fonts=fonts active=active></jd-fontlist><div class=jdfs-footer-con><a class=\"jdfs-footer-tab-toggle jdfs-styles-label\" ng-click=toggleStyles() ng-class=\"{'jdfs-footer-tab-open': stylesActive}\">{{text.styleLabel}}</a><a class=\"jdfs-footer-tab-toggle jdfs-settings-label\" ng-click=toggleSettings() ng-class=\"{'jdfs-footer-tab-open': settingsActive}\">{{text.settingsLabel}}</a><div class=jdfs-footer><div class=jdfs-styles ng-show=stylesActive><button class=\"jdfs-filterbtn jdfs-fontstyle-{{category.key}}\" ng-repeat=\"category in categories\" ng-class=\"{'jdfs-active jdfs-highlight': category.key == current.category}\" ng-click=setCategoryFilter(category.key) ng-model=current.category>{{text.category[category.key] || toName(category.key)}}</button></div><div class=jdfs-settings ng-show=settingsActive><div class=jdfs-provider-list><h4 class=jdfs-settings-headline>{{text.providerLabel}}</h4><div ng-repeat=\"(provider, active) in current.providers\" class=jdfs-provider ng-class=\"{'jdfs-active jdfs-highlight': current.providers[provider]}\"><input ng-model=current.providers[provider] type=checkbox id=jdfs-{{id}}-provider-{{provider}}><label for=jdfs-{{id}}-provider-{{provider}}>{{text.provider[provider] || toName(provider)}}</label></div></div><div class=jdfs-subsets><h4 class=jdfs-settings-headline>{{text.subsetLabel}}</h4><div ng-repeat=\"(key, name) in current.subsets\" class=jdfs-subset ng-class=\"{'jdfs-active jdfs-highlight': current.subsets[key]}\"><input ng-model=current.subsets[key] type=checkbox id=jdfs-{{id}}-subset-{{key}}><label for=jdfs-{{id}}-subset-{{key}}>{{text.subset[key] || toName(key)}}</label></div></div></div></div></div><jd-meta meta=meta></jd-meta><button ng-click=toggle() class=jdfs-close><span>{{text.closeButton}}</span></button></div></div>"
    );
  
  
    $templateCache.put('src/partials/meta.html',
      "<div class=jdfs-meta><div class=jdfs-fontcount>{{text.fontFabel}}<span ng-if=\"meta.fonts.current == meta.fonts.total\">{{meta.fonts.total}}</span><span ng-if=\"meta.fonts.total && meta.fonts.current != meta.fonts.total\">{{meta.fonts.current}}/{{meta.fonts.total}}</span><span ng-if=!meta.fonts.total>…</span></div><div class=jdfs-pagecon>{{text.pageLabel}}<span class=jdfs-page-current>{{meta.page.current + 1}}</span>/<span class=jdfs-page-count>{{meta.page.count}}</span></div></div>"
    );
  
  }]);
})(angular);
