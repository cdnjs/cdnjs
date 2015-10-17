webshims.validityMessages.lt = {
	"typeMismatch": {
		"defaultMessage": "Prašom įvesti teisingą reikšmę.",
		"email": "Prašom įvesti el. pašto adresą.",
		"url": "Prašom įvesti nuorodą (URL)."
	},
	"badInput": {
		"defaultMessage": "Prašom įvesti teisingą reikšmę.",
		"number": "Prašom įvesti skaičių.",
		"date": "Prašom įvesti datą.",
		"time": "Prašom įvesti laiką.",
		"range": "Neteisingas skaičių rėžis.",
		"month": "Prašom įvesti mėnesį.",
		"datetime-local": "Prašom įvesti datą ir laiką."
	},
	"rangeUnderflow": {
		"defaultMessage": "Reikšmė privalo būti didesnė arba lygi {%min}.",
		"date": "Data turi būti ne ankstesnė negu {%min}.",
		"time": "Laikas turi būti ne ankstesnis negu {%min}.",
		"datetime-local": "Data ir laikas turi būti ne ankstesni negu {%min}.",
		"month": "Mėnuo turi būti {%min} arba vėlesnis."
	},
	"rangeOverflow": {
		"defaultMessage": "Reikšmė privalo būti mažesnė arba lygi {%max}.",
		"date": "Data turi būti ne vėlesnė negu {%max}.",
		"time": "Laikas turi būti ne vėlesnis negu {%max}.",
		"datetime-local": "Data ir laikas turi būti ne vėlesni negu {%max}.",
		"month": "Mėnuo turi būti {%max} arba ankstesnis."
	},
	"stepMismatch": "Neteisinga reikšmė.",
	"tooLong": "Prašom įvesti ne daugiau negu {%maxlength} simbolių. Jūs įvedėte {%valueLen}.",
	"patternMismatch": "Neteisinga lauko {%title} reikšmė.",
	"valueMissing": {
		"defaultMessage": "Šis laukas yra privalomas.",
		"checkbox": "Prašome pažymėti šį žymimąjį laukelį, jis yra privalomas.",
		"select": "Prašom pasirinkti reikšmę iš sąrašo.",
		"radio": "Prašom pasirinkti vieną iš reikšmių."
	}
};

webshims.formcfg.lt = {
  numberFormat: {
		".": ".",
		",": ","
	},
	numberSigns: '.',
	dateSigns: '.',
	timeSigns: ":. ",
	dFormat: ".",
	patterns: {
		d: "yy.mm.dd"
	},
	"month": {
		"currentText": "šį mėnesį"
	},
	date: {
		"closeText": "Uždaryti",
		"clear": "Tuštinti",
		"prevText": "Atgal",
		"nextText": "Kitas",
		"currentText": "Šiandien",
		"monthNames": ["Sausis","Vasaris","Kovas","Balandis","Gegužė","Birželis","Liepa","Rugpjūtis","Rugsėjis","Spalis","Lapkritis","Gruodis"],
		"monthNamesShort": ["Sau","Vas","Kov","Bal","Geg","Bir","Lie","Rugp","Rugs","Spa","Lap","Gruo"],
		"dayNames": ["Sekmadienis","Pirmadienis","Antradienis","Trečiadienis","Ketvirtadienis","Penktadienis","Šeštadienis"],
		"dayNamesShort": ["Sek","Pir","Ant","Tre","Ket","Pen","Šeš"],
		"dayNamesMin": ["S","P","A","T","K","Pn","Š"],
		"weekHeader": "Sav.",
		"firstDay": 1,
		"isRTL": false,
		"showMonthAfterYear": true,
		"yearSuffix": ""
	}
};


//for IE
webshims.validityMessages['lt-LT'] = webshims.validityMessages.lt;
webshims.formcfg['lt-LT'] = webshims.formcfg.lt;
