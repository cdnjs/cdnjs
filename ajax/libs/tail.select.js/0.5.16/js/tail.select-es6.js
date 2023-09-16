/*
 |  tail.select - The vanilla solution to make your HTML select fields AWESOME!
 |  @file       ./js/tail.select-es6.js
 |  @author     SamBrishes <sam@pytes.net>
 |  @version    0.5.15 - Beta
 |
 |  @website    https://github.com/pytesNET/tail.select
 |  @license    X11 / MIT License
 |  @copyright  Copyright © 2014 - 2019 SamBrishes, pytesNET <info@pytes.net>
 */
/*
 |  EXPERIMENTAL ECMAScript 2015 (ES6) EDITION
 |  It is NOT-RECOMMENDED to use this version on productively websites!
 */
var {select, options} = (function(root){
    const w = root;
    const d = root.document;

    const que = "querySelector";
    const queA = "querySelectorAll";
    const parE = "parentElement";
    const hAttr = "hasAttribute";
    const gAttr = "getAttribute";
    const sAttr = "setAttribute";
    const rAttr = "removeAttribute";

    // Internal Helper Methods
    function create(tag, classes){
        let r = d.createElement(tag);
        r.className = (classes && classes.join)? classes.join(" "): classes || "";
        return r;
    }

    /*
     |  SELECT CONSTRUCTOR
     |  @since  0.5.12 [0.3.0]
     */
    const select = function(el, config){
        el = (typeof(el) == "string")? d[queA](el): el;
        if(el instanceof NodeList || el instanceof HTMLCollection || el instanceof Array){
            let _r = Array.prototype.map.call(el, item => {
                return new select(item, Object.assign({}, config));
            });
            return (_r.length === 1)? _r[0]: ((_r.length === 0)? false: _r);
        }
        if(!(el instanceof Element) || !(this instanceof select)){
            return !(el instanceof Element)? false: new select(el, config);
        }

        // Check Element
        if(select.inst[el[gAttr]("data-tail-select")]){
            return select.inst[el[gAttr]("data-tail-select")];
        }
        if(el[gAttr]("data-select")){
            let test = JSON.parse(el[gAttr]("data-select").replace(/\'/g, '"'));
            config = (test instanceof Object)? Object.assign(config, test): config;
        }

        // Get Element Options
        let placeholder = el[gAttr]("placeholder") || el[gAttr]("data-placeholder"),
            fb1 = "bindSourceSelect", fb2 = "sourceHide"; // Fallbacks
        config = (typeof(config) == "object")? config: {};
        config.multiple = ("multiple" in config)? config.multiple: el.multiple;
        config.disabled = ("disabled" in config)? config.disabled: el.disabled;
        config.placeholder = placeholder || config.placeholder || null;
        config.width = (config.width === "auto")? el.offsetWidth + 50: config.width;
        config.sourceBind = (fb1 in config)? config[fb1]: config.sourceBind || false;
        config.sourceHide = (fb2 in config)? config[fb2]: config.sourceHide || true;
        config.multiLimit = (config.multiLimit >= 0)? config.multiLimit: Infinity;

        // Init Instance
        this.e = el;
        this.id = ++select.count;
        this.con = Object.assign({}, select.defaults, config);
        this.events = {};
        select.inst["tail-" + this.id] = this;
        return this.init().bind();
    };
    select.version = "0.5.15";
    select.status = "experimental";
    select.count = 0;
    select.inst = {};

    /*
     |  STORAGE :: DEFAULT OPTIONS
     */
    select.defaults = {
        animate: true,              // [0.3.0]      Boolean
        classNames: null,           // [0.2.0]      Boolean, String, Array, null
        csvOutput: false,           // [0.3.4]      Boolean
        csvSeparator: ",",          // [0.3.4]      String
        descriptions: false,        // [0.3.0]      Boolean
        deselect: false,            // [0.3.0]      Boolean
        disabled: false,            // [0.5.0]      Boolean
        height: 350,                // [0.2.0]      Integer, null
        hideDisabled: false,        // [0.3.0]      Boolean
        hideSelected: false,        // [0.3.0]      Boolean
        items: {},                  // [0.3.0]      Object
        locale: "en",               // [0.5.0]      String
        linguisticRules: {          // [0.5.9]      Object
            "е": "ё",
            "a": "ä",
            "o": "ö",
            "u": "ü",
            "ss": "ß"
        },
        multiple: false,            // [0.2.0]      Boolean
        multiLimit: Infinity,       // [0.3.0]      Integer, Infinity
        multiPinSelected: false,    // [0.5.0]      Boolean
        multiContainer: false,      // [0.3.0]      Boolean, String
        multiShowCount: true,       // [0.3.0]      Boolean
        multiShowLimit: false,      // [0.5.0]      Boolean
        multiSelectAll: false,      // [0.4.0]      Boolean
        multiSelectGroup: true,     // [0.4.0]      Boolean
        openAbove: null,            // [0.3.0]      Boolean, null
        placeholder: null,          // [0.2.0]      String, null
        search: false,              // [0.3.0]      Boolean
        searchConfig: [             // [0.5.13]     Array
            "text", "value"
        ],
        searchFocus: true,          // [0.3.0]      Boolean
        searchMarked: true,         // [0.3.0]      Boolean
        searchMinLength: 1,         // [0.5.13]     Integer
        searchDisabled: true,       // [0.5.5]      Boolean
        sortItems: false,           // [0.3.0]      String, Function, false
        sortGroups: false,          // [0.3.0]      String, Function, false
        sourceBind: false,          // [0.5.0]      Boolean
        sourceHide: true,           // [0.5.0]      Boolean
        startOpen: false,           // [0.3.0]      Boolean
        stayOpen: false,            // [0.3.0]      Boolean
        width: null,                // [0.2.0]      Integer, String, null
        cbComplete: undefined,      // [0.5.0]      Function
        cbEmpty: undefined,         // [0.5.0]      Function
        cbLoopItem: undefined,      // [0.4.0]      Function
        cbLoopGroup: undefined      // [0.4.0]      Function
    };

    /*
     |  STORAGE :: STRINGS
     */
    select.strings = {
        de: {
            all: "Alle",
            none: "Keine",
            actionAll: "Alle auswählen",
            actionNone: "Alle abwählen",
            empty: "Keine Optionen verfügbar",
            emptySearch: "Keine Optionen gefunden",
            limit: "Keine weiteren Optionen wählbar",
            placeholder: "Wähle eine Option...",
            placeholderMulti: "Wähle bis zu :limit Optionen...",
            search: "Tippen zum suchen",
            disabled: "Dieses Feld ist deaktiviert"
        },
        en: {
            all: "All",
            none: "None",
            actionAll: "Select All",
            actionNone: "Unselect All",
            empty: "No Options available",
            emptySearch: "No Options found",
            limit: "You can't select more Options",
            placeholder: "Select an Option...",
            placeholderMulti: "Select up to :limit Options...",
            search: "Type in to search...",
            disabled: "This Field is disabled"
        },
        es: {
            all: "Todos",
            none: "Ninguno",
            actionAll: "Seleccionar todo",
            actionNone: "Descartar todo",
            empty: "No hay opciones disponibles",
            emptySearch: "No se encontraron opciones",
            limit: "No puedes seleccionar mas opciones",
            placeholder: "Selecciona una opción...",
            placeholderMulti: "Selecciona hasta :límite de opciones...",
            search: "Escribe dentro para buscar...",
            disabled: "Este campo esta deshabilitado"
        },
        fi: {
            all: "Kaikki",
            none: "Ei mitään",
            actionAll: "Valitse kaikki",
            actionNone: "Poista kaikki valinnat",
            empty: "Ei vaihtoehtoja",
            emptySearch: "Etsimääsi vaihtoehtoa ei löytynyt",
            limit: "Muita vaihtoehtoja ei voi valita",
            placeholder: "Valitse...",
            placeholderMulti: "Valitse maksimissaan :limit...",
            search: "Hae tästä...",
            disabled: "Kenttä on poissa käytöstä"
        },
        fr: {
            all: "Tous",
            none: "Aucun",
            actionAll: "Sélectionner tout",
            actionNone: "Sélectionner aucun",
            empty: "Aucune option disponible",
            emptySearch: "Aucune option trouvée",
            limit: "Aucune autre option sélectionnable",
            placeholder: "Choisissez une option ...",
            placeholderMulti: "Choisissez jusqu'à :limit option(s) ...",
            search: "Rechercher ...",
            disabled: "Ce champs est désactivé"
        },
        it: {
            all: "Tutti",
            none: "Nessuno",
            actionAll: "Seleziona Tutto",
            actionNone: "Deseleziona Tutto",
            empty: "Nessuna voce disponibile",
            emptySearch: "Nessuna voce trovata",
            limit: "Non puoi selezionare più Voci",
            placeholder: "Seleziona una Voce",
            placeholderMulti: "Selezione limitata a :limit Voci...",
            search: "Digita per cercare...",
            disabled: "Questo Campo è disabilitato"
        },
        no: {
            all: "Alle",
            none: "Ingen",
            actionAll: "Velg alle",
            actionNone: "Velg ingen",
            empty: "Ingen valg tilgjengelig",
            emptySearch: "Ingen valg funnet",
            limit: "Du kan ikke velge flere",
            placeholder: "Velg...",
            placeholderMulti: "Velg opptil :limit...",
            search: "Søk...",
            disabled: "Dette feltet er deaktivert"
        },
        pt_BR: {
            all: "Todas",
            none: "Nenhuma",
            actionAll: "Selecionar todas",
            actionNone: "Desmarcar todas",
            empty: "Nenhuma opção disponível",
            emptySearch: "Nenhuma opção encontrada",
            limit: "Não é possível selecionar outra opção",
            placeholder: "Escolha uma opção ...",
            placeholderMulti: "Escolha até: :limit opção(ões) ...",
            search: "Buscar ...",
            disabled: "Campo desativado"
        },
        ru: {
            all: "Все",
            none: "Ничего",
            actionAll: "Выбрать все",
            actionNone: "Отменить все",
            empty: "Нет доступных вариантов",
            emptySearch: "Ничего не найдено",
            limit: "Вы не можете выбрать больше вариантов",
            placeholder: "Выберите вариант...",
            placeholderMulti: function(args){
                let strings = ["варианта", "вариантов", "вариантов"], cases = [2, 0, 1, 1, 1, 2], num = args[":limit"];
                let string = strings[(num%100 > 4 && num%100 < 20)? 2: cases[(num%10 < 5)? num%10: 5]];
                return "Выбор до :limit " + string + " ...";
            },
            search: "Начните набирать для поиска ...",
            disabled: "Поле отключено"
        },
        tr: {
            all: "Tümü",
            none: "Hiçbiri",
            actionAll: "Tümünü Seç",
            actionNone: "Hiçbirini Seçme",
            empty: "Seçenek yok",
            emptySearch: "Seçenek bulunamadı",
            limit: "Daha fazla Seçenek seçemezsiniz",
            placeholder: "Bir Seçenek seçin...",
            placeholderMulti: "En fazla :limit Seçenek seçin...",
            search: "Aramak için yazın...",
            disabled: "Bu Alan kullanılamaz"
        },
        modify(locale, id, string){
            if(!(locale in this)){
                return false;
            }
            if((id instanceof Object)){
                for(let key in id){
                    this.modify(locale, key, id[key]);
                }
            } else {
                this[locale][id] = (typeof(string) == "string")? string: this[locale][id];
            }
            return true;
        },
        register(locale, object){
            if(typeof(locale) != "string" || !(object instanceof Object)){
                return false;
            }
            this[locale] = object;
            return true;
        }
    };

    /*
     |  TAIL.SELECT HANDLER
     */
    select.prototype = {
        /*
         |  INERNAL :: TRANSLATE
         |  @since  0.5.8 [0.5.8]
         */
        _e(string, replace, def){
            if(!(string in this.__)){
                return (!def)? string: def;
            }

            string = this.__[string];
            if(typeof(string) === "function"){
                string = string.call(this, replace);
            }
            if(typeof(replace) === "object"){
                for(let key in replace){
                    string = string.replace(key, replace[key]);
                }
            }
            return string;
        },

        /*
         |  INTERNAL :: INIT SELECT FIELD
         |  @since  0.5.13 [0.3.0]
         */
        init(){
            let classes = ["tail-select"], con = this.con,
                regexp = /^[0-9.]+(?:cm|mm|in|px|pt|pc|em|ex|ch|rem|vw|vh|vmin|vmax|\%)$/i;

            // Init Variables
            this.__ = Object.assign({}, select.strings.en, select.strings[con.locale] || {});
            this._init = true;
            this._query = false;

            // Init ClassNames
            classes = classes.concat((con.classNames === true)? this.e.className: con.classNames);
            if(con.hideSelected){    classes.push("hide-selected"); }
            if(con.hideDisabled){    classes.push("hide-disabled"); }
            if(con.multiLimit == 0){ classes.push("disabled");      }
            if(con.multiple){        classes.push("multiple");      }
            if(con.deselect){        classes.push("deselect");      }
            if(con.disabled){        classes.push("disabled");      }

            // Build :: Select
            this.select = create("DIV", classes);
            if(this.e.getAttribute("tabindex") !== null){
                this.select.setAttribute("tabindex", this.e.getAttribute("tabindex"));
            } else {
                this.select.setAttribute("tabindex", 0);
            }
            if(con.width && regexp.test(con.width)){
                this.select.style.width = con.width;
            } else if(con.width && !isNaN(parseFloat(con.width, 10))){
                this.select.style.width = con.width + "px";
            }

            // Build :: Label
            this.label = create("DIV", "select-label");
            this.label.addEventListener("click", (ev) => { this.toggle(); });
            this.select.appendChild(this.label);

            // Build :: Dropdown
            this.dropdown = create("DIV", "select-dropdown");
            if(!isNaN(parseInt(con.height, 10))){
                this.dropdown.style.maxHeight = parseInt(con.height, 10) + "px";
            }
            if(con.search){
                this.search = create("DIV", "dropdown-search");
                this.search.innerHTML = `<input type="text" class="search-input" placeholder="${this._e("search")}" />`;
                this.search.children[0].addEventListener("input", (ev) => {
                    this.query((ev.target.value.length > con.searchMinLength)? ev.target.value: undefined);
                });
                this.dropdown.appendChild(this.search);
            }
            this.select.appendChild(this.dropdown);

            // Build :: CSV Input
            this.csvInput = create("INPUT", "select-search");
            this.csvInput.type = "hidden";
            if(con.csvOutput){
                this.csvInput.name = this.e.name;
                this.e[rAttr]("name");
                this.select.appendChild(this.csvInput);
            }

            // Prepare Container
            if(con.multiple && con.multiContainer){
                if(d[que](con.multiContainer)){
                    this.container = d[que](con.multiContainer);
                    this.container.classList.add("tail-select-container");
                } else if(con.multiContainer === true){
                    this.container = this.label;
                    this.container.classList.add("tail-select-container");
                }
            }

            // Prepare Options
            this.options = new options(this.e, this);
            Array.prototype.map.call(this.e.options, (opt) => {this.options.set(opt, false);});
            Object.keys(con.items).forEach((key) => {
                let value = (con.items[key].join)? con.items[key]: {value: con.items[key]};
                let {value: a, group: b, selected: c, disabled: d, description: e} = value;
                this.options.add(con.items[key].key || key, a, b, c, d, e);
            });
            this.query();

            // Append and Return
            if(this.e.nextElementSibling){
                this.e[parE].insertBefore(this.select, this.e.nextElementSibling);
            } else {
                this.e[parE].appendChild(this.select);
            }
            if(con.sourceHide){
                if(this.e.style.display == "none"){
                    this.select.style.display = "none";
                    this.e.setAttribute("data-select-hidden", "display");
                } else if(this.e.style.visibility == "hidden"){
                    this.select.style.visibiltiy = "hidden";
                    this.e.setAttribute("data-select-hidden", "visibility");
                } else {
                    this.e.style.display = "none";
                    this.e.setAttribute("data-select-hidden", "0");
                }
            }
            this._init = false
            this.e[sAttr]("data-tail-select", "tail-" + this.id);
            (con.cbComplete || function(){ }).call(this, this.select);
            return (con.startOpen)? this.open(this.con.animate): this;
        },

        /*
         |  INTERNAL :: EVENT LISTENER
         |  @since  0.5.13 [0.3.0]
         */
        bind(){
            d.addEventListener("keydown", (ev) => {
                let key = (ev.keyCode || ev.which), opt, inner, e, temp, tmp;
                let space = (key == 32 && self.select === document.activeElement);
                if(!space ||(!this.select.classList.contains("active") || [13, 27, 38, 40].indexOf(key) < 0)){
                    return false;
                }
                ev.preventDefault();
                ev.stopPropagation();

                // Space
                if(key === 32){
                    return this.open(self.con.animate);
                }

                // Enter || Escape
                if(key == 13){
                    if((opt = this.dropdown[que](".dropdown-option.hover:not(.disabled)"))){
                        this.options.select(opt);
                    }
                }
                if(key == 27 || key == 13){
                    return this.close(this.con.animate);
                }

                // Top || Down
                if((opt = this.dropdown[que](".dropdown-option.hover:not(.disabled)"))){
                    opt.classList.remove("hover");
                    e = [((key == 40)? "next": "previous") + "ElementSibling"];
                    do {
                        if((temp = opt[e]) !== null && opt.tagName == "LI"){
                            opt = temp;
                        } else if((temp = opt[parE][e]) !== null && temp.children.length > 0 && temp.tagName == "UL"){
                            opt = temp.children[(key == 40)? 0: temp.children.length-1];
                        } else {
                            opt = false;
                        }
                        if(opt && (!/dropdown-option/.test(opt.className) || /disabled/.test(opt.className))){
                            continue;
                        }
                        break;
                    } while(true);
                }
                if(!opt && key == 40){
                    opt = this.dropdown[que](".dropdown-option:not(.disabled)");
                } else if(!opt && key == 38){
                    tmp = self.dropdown.querySelectorAll(".dropdown-option:not(.disabled)");
                    opt = tmp[tmp.length - 1];
                }
                if(opt && (inner = this.dropdown[que](".dropdown-inner"))){
                    let pos = (function(el){
                        let _r = {top: el.offsetTop, height: el.offsetHeight};
                        while((el = el[parE]) != inner){
                            _r.top += el.offsetTop;
                        }
                        return _r;
                    })(opt);
                    opt.classList.add("hover");
                    if((pos.top+(pos.height*2)) > (inner.offsetHeight+inner.scrollTop)){
                        inner.scrollBy(0, (pos.top+(pos.height*2))-(inner.offsetHeight+inner.scrollTop));
                    } else if((pos.top-pos.height) < inner.scrollTop){
                        inner.scrollBy(0, -Math.abs(inner.scrollTop-pos.top+pos.height));
                    }
                }
                return true;
            });

            // Close
            d.addEventListener("click", (ev) => {
                let test = !this.select.classList.contains("active") || this.select.classList.contains("idle");
                if(test || this.con.stayOpen){
                    return false;
                }
                let result = [this.e, this.select, this.container].filter((el) => {
                    return (el && (el.contains(ev.target) || el == ev.target));
                });
                return (result.length == 0)? this.close(this.con.animate): false;
            });

            // Bind Source Select
            if(!this.con.sourceBind){
                return true;
            }
            this.e.addEventListener("change", (ev) => {
                if(event.detail != undefined){
                    return false;
                }
                event.preventDefault();
                event.stopPropagation();
                if(!this.multiple && this.selectedIndex){
                    this.options.select(this.e.options[this.selectedIndex]);
                } else {
                    let u = [].concat(self.options.selected);
                    let s = Array.from(this.e[queA]("option:checked")).filter((item) => {
                        if(u.indexOf(item) >= 0){
                            u.splice(u.indexOf(item), 1);
                            return false;
                        }
                        return true;
                    });
                    this.options.walk("unselect", u);
                    this.options.walk("select", s);
                }
            });
            return true;
        },

        /*
         |  INTERNAL :: INTERNAL CALLBACK
         |  @since  0.5.14 [0.3.0]
         */
        callback(item, state, _force){
            let rkey = item.key.replace(/('|\\)/g, "\\$1"),
                rgrp = item.group.replace(/('|\\)/g, "\\$1"),
                rsel = `[data-key='${rkey}'][data-group='${rgrp}']`;
            if(state == "rebuild"){ return this.query(); }

            // Set Element-Item States
            let element = this.dropdown[que](rsel);
            if(element && ["select", "disable"].indexOf(state) >= 0){
                element.classList.add((state == "select"? "selected": "disabled"));
            } else if(element && ["unselect", "enable"].indexOf(state) >= 0){
                element.classList.remove((state == "unselect"? "selected": "disabled"));
            }

            // Handle
            this.update(item);
            return (!_force)? this.trigger("change", item, state): true;
        },

        /*
         |  INTERNAL :: TRIGGER EVENT HANDLER
         |  @since  0.5.2 [0.4.0]
         */
        trigger(event){
            if(this._init){ return false; }
            let obj = {bubbles: false, cancelable: true, detail: {args: arguments, self: this}};
            if(event == "change" && arguments[2] && arguments[2].indexOf("select") >= 0){
                this.e.dispatchEvent(new CustomEvent("input", obj));
                this.e.dispatchEvent(new CustomEvent("change", obj));
            }
            this.select.dispatchEvent(new CustomEvent("tail::" + event, obj));

            let args = [...arguments], pass; args.shift();
            (this.events[event] || []).forEach((item) => {
                pass = [].concat(args);
                pass.push(item.args || null);
                (item.cb || function(){ }).apply(this, pass);
            });
            return true;
        },

        /*
         |  INTERNAL :: CALCULATE DROPDOWN
         |  @since  0.5.4 [0.5.0]
         */
        calc(){
            let clone = this.dropdown.cloneNode(true), height = this.con.height, search = 0,
                inner = this.dropdown[que](".dropdown-inner");

            // Calculate Dropdown Height
            clone = this.dropdown.cloneNode(true);
            clone.style.cssText = "height:auto;min-height:auto;max-height:none;opacity:0;display:block;visibility:hidden;";
            clone.style.maxHeight = this.con.height + "px";
            clone.className += " cloned";
            this.dropdown[parE].appendChild(clone);
            height = (height > clone.clientHeight)? clone.clientHeight: height;
            if(this.con.search){
                search = clone[que](".dropdown-search").clientHeight;
            }
            this.dropdown[parE].removeChild(clone);

            // Calculate Viewport
            let pos = this.select.getBoundingClientRect(),
                bottom = w.innerHeight-(pos.top+pos.height),
                view = ((height+search) > bottom)? pos.top > bottom: false;
            if(this.con.openAbove === true || (this.con.openAbove !== false && view)){
                view = true, height = Math.min((height), pos.top-10);
                this.select.classList.add("open-top");
            } else {
                view = false, height = Math.min((height), bottom-10);
                this.select.classList.remove("open-top");
            }
            if(inner){
                this.dropdown.style.maxHeight = height + "px";
                inner.style.maxHeight = (height-search) + "px";
            }
            return this;
        },

        /*
         |  API :: QUERY OPTIONS
         |  @since  0.5.15 [0.5.0]
         */
        query(search, conf){
            let tp, ul, a1, a2;                             // Pre-Definition
            let con = this.con;                             // Shorties
            let root = create("DIV", "dropdown-inner"),     // Contexts
                func = (!search)? "walker": "finder",
                args = (!search)?[con.sortItems, con.sortGroups]: [search, conf];

            // Option Walker
            this._query = (typeof(search) == "string")? search: false;
            for(let item of this.options[func].apply(this.options, args)){
                if(item === false){
                    continue;
                }
                if(!ul || (ul && ul[gAttr]("data-group") !== item.group)){
                    tp = (con.cbLoopGroup || this.cbGroup).call(this, item.group, search, root);
                    if(tp instanceof Element){
                        ul = tp;
                        ul[sAttr]("data-group", item.group);
                        root.appendChild(ul);
                    } else { break; }
                }

                // Create Item
                let li = (con.cbLoopItem || this.cbItem).call(this, item, ul, search, root);
                if(li === null){ continue; }
                if(li === false){ break; }
                li[sAttr]("data-key", item.key);
                li[sAttr]("data-group", item.group);
                li.addEventListener("click", (ev) => {
                    if(!li[gAttr]("data-key")){ return false; }
                    if(this.options.toggle(li[gAttr]("data-key"), li[gAttr]("data-group"))){
                        if(!con.stayOpen && !con.multiple){ this.close(this.con.animate); }
                    }
                });
                ul.appendChild(li);
            }

            // Empty
            let count = root[queA]("*[data-key]").length;
            if(count == 0){
                (this.con.cbEmpty || function(element){
                    let li = create("SPAN", "dropdown-empty");
                    li.innerText = this._e("empty");
                    element.appendChild(li);
                }).call(this, root, search);
            }

            // Select All
            if(count > 0 && con.multiple && con.multiLimit == Infinity && con.multiSelectAll){
                a1 = create("BUTTON", "tail-all"), a2 = create("BUTTON", "tail-none");
                a1.innerText = this._e("actionAll");
                a1.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    this.options.walk("select", this.dropdown.querySelectorAll(".dropdown-inner .dropdown-option"));
                });
                a2.innerText = this._e("actionNone");
                a2.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    this.options.walk("unselect", this.dropdown.querySelectorAll(".dropdown-inner .dropdown-option"));
                });

                // Add Element
                let li = create("SPAN", "dropdown-action");
                li.appendChild(a1);
                li.appendChild(a2);
                root.insertBefore(li, root.children[0]);
            }

            // Add and Return
            let data = this.dropdown[que](".dropdown-inner");
            this.dropdown[(data? "replace": "append") + "Child"](root, data);
            if(this.select.classList.contains("active")){
                this.calc();
            }
            return this.updateCSV().updateLabel();
        },

        /*
         |  API :: CALLBACK -> CREATE GROUP
         |  @since  0.5.8 [0.4.0]
         */
        cbGroup(group, search){
            let ul = create("UL", "dropdown-optgroup"), self = this, a1, a2;
            if(group == "#"){ return ul; }
            ul.innerHTML = `<li class="optgroup-title"><b>${group}</b></li>`;
            if(this.con.multiple && this.con.multiLimit == Infinity && this.con.multiSelectAll){
                a1 = create("BUTTON", "tail-none"), a2 = create("BUTTON", "tail-all");
                a1.innerText = this._e("none");
                a1.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    this.options.all("unselect", ev.target[parE][parE][gAttr]("data-group"));
                });
                a2.innerText = this._e("all");
                a2.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    this.options.all("select", ev.target[parE][parE][gAttr]("data-group"));
                });
                ul.children[0].appendChild(a1);
                ul.children[0].appendChild(a2);
            }
            return ul;
        },

        /*
         |  API :: CALLBACK -> CREATE ITEM
         |  @since  0.5.13 [0.4.0]
         */
        cbItem(item, optgroup, search){
            let {value: v, selected: s, disabled: d} = item;
            let li = create("LI", "dropdown-option" + (s? " selected": "") + (d? " disabled": ""));

            if(search && search.length > 0 && this.con.searchMarked){
                search = this.options.applyLinguisticRules(search);
                li.innerHTML = v.replace(new RegExp(`(${search})`, "i"), "<mark>$1</mark>");
            } else {
                li.innerText = v;
            }
            if(this.con.descriptions && item.description){
                li.innerHTML += `<span class="option-description">${item.description}</span>`;
            }
            return li;
        },

        /*
         |  API :: UPDATE EVERYTHING
         |  @since  0.5.0 [0.5.0]
         */
        update(item){
            return this.updateLabel().updateContainer(item).updatePin(item).updateCSV(item);
        },

        /*
         |  API :: UPDATE LABEL
         |  @since  0.5.8 [0.5.0]
         */
        updateLabel(label){
            if(this.container == this.label && this.options.selected.length > 0){
                if(this.label[que](".label-inner")){
                    this.label.removeChild(this.label[que](".label-inner"));
                }
                if(this.label[que](".label-count")){
                    this.label.removeChild(this.label[que](".label-count"));
                }
                return this;
            }
            let c = this.con, len = this.options.selected.length, limit;
            if(typeof(label) != "string"){
                if(c.disabled){
                    label = "disabled";
                } else if(this.dropdown[queA]("*[data-key]").length == 0){
                    label = "empty" + (this.select.classList.contains("in-search")? "Search": "");
                } else if(c.multiLimit <= len){
                    label = "limit";
                } else if(!c.multiple && this.options.selected.length > 0){
                    label = this.options.selected[0].innerText;
                } else if(typeof(c.placeholder) == "string"){
                    label = c.placeholder;
                } else {
                    label = "placeholder" + (c.multiple && c.multiLimit < Infinity? "Multi": "");
                }
            }

            // Set HTML
            label = this._e(label, {":limit": c.multiLimit}, label);
            label = `<span class="label-inner">${label}</span>`;
            limit = (c.multiShowLimit && c.multiLimit < Infinity);
            if(c.multiple && c.multiShowCount){
                label = `<span class="label-count">:c</span>\n${label}`;
                label = label.replace(":c", len + (limit? (" / " + c.multiLimit): ""));
            }
            this.label.innerHTML = label;
            return this;
        },

        /*
         |  API :: UPDATE CONTAINER
         |  @since  0.5.0 [0.5.0]
         */
        updateContainer(item){
            if(!this.container || !this.con.multiContainer){
                return this;
            }
            let s = `[data-group='${item.group}'][data-key='${item.key}']`;
            if(this.container[que](s)){
                if(!item.selected){
                    this.container.removeChild(this.container[que](s));
                }
                return this;
            }

            // Create Item
            if(item.selected){
                let hndl = create("DIV", "select-handle");
                hndl.innerText = item.value;
                hndl[sAttr]("data-key", item.key);
                hndl[sAttr]("data-group", item.group);
                hndl.addEventListener("click", (ev) => {
                    ev.preventDefault();
                    ev.stopPropagation();
                    this.options.unselect(ev.target[gAttr]("data-key"), ev.target[gAttr]("data-group"));
                });
                this.container.appendChild(hndl);
            }
            return this;
        },

        /*
         |  API :: UPDATE PIN POSITION
         |  @since  0.5.3 [0.5.0]
         */
        updatePin(item){
            let inner = this.dropdown[que](".dropdown-inner ul");
            if(!this.con.multiPinSelected || !inner || this._query !== false){
                return this;
            }

            // Create Item
            option = this.dropdown[que](`li[data-key='${item.key}'][data-group='${item.group}']`);
            if(item.selected){
                inner.insertBefore(option, inner.children[0]);
            } else {
                let grp = this.dropdown[que](`ul[data-group='${item.group}']`),
                    prev = this.options[item.index-1], found = false;
                while(prev && prev.group == item.group){
                    if(found = grp[que](`li[data-key='${prev.key}']`)){
                        break;
                    }
                    prev = this.options[prev.index-1];
                }
                if(found && found.nextElementSibling){
                    grp.insertBefore(option, found.nextElementSibling);
                } else {
                    grp.appendChild(option);
                }
            }
            return this;
        },

        /*
         |  API :: UPDATE CSV INPUT
         |  @since  0.5.0 [0.5.0]
         */
        updateCSV(item){
            if(!this.csvInput || !this.con.csvOutput){
                return this;
            }
            let sel = this.options.selected.map((item) => item.value);
            this.csvInput.value = sel.join(this.con.csvSeparator || ",");
            return this;
        },

        /*
         |  PUBLIC :: OPEN DROPDOWN
         |  @since  0.5.0 [0.3.0]
         */
        open(animate){
            if(/active|idle/.test(this.select.className) || this.con.disabled){
                return false;
            }
            this.calc();

            // Final Function
            let final = function(){
                this.select.classList.add("active");
                this.select.classList.remove("idle");
                this.dropdown.style.height = "auto";
                this.dropdown.style.overflow = "visible";
                this.label[rAttr]("style");
                if(this.con.search && this.con.searchFocus){
                    this.dropdown[que]("input").focus();
                }
                this.trigger.call(this, "open");
            }, self = this, e = this.dropdown.style;

            // Open
            if(this.con.animate && animate !== false){
                this.label.style.zIndex = 25;
                this.dropdown.style.cssText += "height:0;display:block;overflow:hidden;";
                this.select.classList.add("idle");
                let animate = () => {
                    let h = parseInt(e.height, 10), m = parseInt(e.maxHeight, 10);
                    if(h >= m){ return final.call(self); }
                    e.height = ((h+50 > m)? m: h+50) + "px";
                    setTimeout(animate, 20);
                }; animate();
            } else {
                e.cssText = `height:${e.maxHeight};display:block;overflow:hidden;`;
                final.call(this);
            }
            return this;
        },

        /*
         |  PUBLIC :: CLOSE DROPDOWN
         |  @since  0.5.0 [0.3.0]
         */
        close(animate){
            if(!this.select.classList.contains("active") || this.select.classList.contains("idle")){
                return false;
            }
            let final = function(){
                this.select.classList.remove("idle", "active");
                this.dropdown[rAttr]("style");
                this.dropdown[que](".dropdown-inner")[rAttr]("style");
                this.trigger.call(this, "close");
            }, self = this, e = this.dropdown;

            // Close
            if(this.con.animate && animate !== false){
                this.select.classList.add("idle");
                this.dropdown.style.overflow = "hidden";
                let animate = () => {
                    if((parseInt(e.offsetHeight, 10)-50) <= 0){ return final.call(self); }
                    e.style.height = (parseInt(e.offsetHeight, 10)-50) + "px";
                    setTimeout(animate, 20);
                }; animate();
            } else {
                final.call(this);
            }
            return this;
        },

        /*
         |  PUBLIC :: TOGGLE DROPDOWN
         |  @since  0.5.0 [0.3.0]
         */
        toggle(animate){
            if(this.select.classList.contains("active")){
                return this.close(animate);
            }
            return !this.select.classList.contains("idle")? this.open(animate): this;
        },

        /*
         |  PUBLIC :: REMOVE SELECT
         |  @since  0.5.0 [0.3.0]
         */
        remove(){
            this.e[rAttr]("data-tail-select");
            if(this.e[hAttr]("data-select-hidden")){
                if(this.e[gAttr]("data-select-hidden") == "0"){
                    this.e.style.removeProperty("display");
                }
                this.e[rAttr]("data-select-hidden");
            }
            Array.from(this.e[queA]("[data-select-option='add']"), (item) => {
                item.parentElement.removeChild(item);
            });
            Array.from(this.e[queA]("[data-select-optgroup='add']"), (item) => {
                item.parentElement.removeChild(item);
            });
            this.e.name = (this.csvInput.hasAttribute("name"))? this.csvInput.name: this.e.name;
            this.select[parE].removeChild(this.select);
            if(this.container){
                Array.from(this.container[queA](".select-handle"), (item) => {
                    item.parentElement.removeChild(item);
                });
            }
            return this;
        },

        /*
         |  PUBLIC :: RELOAD SELECT
         |  @since  0.5.0 [0.3.0]
         */
        reload(){
            return this.remove().init();
        },

        /*
         |  PUBLIC :: GET|SET CONFIG
         |  @since  0.5.15 [0.4.0]
         */
        config(key, value, rebuild){
            if(key instanceof Object){
                for(let k in key){ this.config(k, key[k], false); }
                return this.reload()? this.con: this.con;
            }
            if(typeof(key) == "undefined"){
                return this.con;
            } else if(!(key in this.con)){
                return false;
            }

            // Set | Return
            if(typeof(value) == "undefined"){
                return this.con[key];
            }
            this.con[key] = value;
            if(rebuild !== false){
                this.reload();
            }
            return this;
        },
        enable(update){
            this.select.classList.remove("disabled");
            this.e.disabled = false;
            this.con.disabled = false;
            return (update === false)? this: this.reload();
        },
        disable(update){
            this.select.classList.add("disabled");
            this.e.disabled = true;
            this.con.disabled = true;
            return (update === false)? this: this.reload();
        },

        /*
         |  PUBLIC :: CUSTOM EVENT LISTENER
         |  @since  0.5.0 [0.4.0]
         |
         |  @param  string  'open', 'close', 'change'
         |  @param  callb.  A custom callback function.
         |  @param  array   An array with own arguments, which should pass to the callback too.
         */
        on(event, callback, args){
            if(["open", "close", "change"].indexOf(event) < 0 || typeof(callback) != "function"){
                return false;
            }
            if(!(event in this.events)){
                this.events[event] = [];
            }
            this.events[event].push({cb: callback, args: (args instanceof Array)? args: []});
            return this;
        },


        /*
         |  PUBLIC :: VALUE
         |  @since  0.5.13 [0.5.13]
         */
        value(){
            if(this.options.selected.length == 0){
                return null;
            }
            if(this.con.multiple){
                return this.options.selected.map((opt) => opt.value);
            }
            return this.options.selected[0].value;
        }
    };

    /*
     |  OPTIONS CONSTRUCTOR
     |  @since  0.5.12 [0.3.0]
     */
    const options = select.options = function(select, parent){
        if(!(this instanceof options)){
            return new options(select, parent);
        }
        this.self = parent;
        this.element = select;
        this.length = 0;
        this.selected = [];
        this.disabled = [];
        this.items = {"#": {}};
        this.groups = {};
        return this;
    }

    /*
     |  TAIL.OPTIONS HANDLER
     */
    options.prototype = {
        /*
         |  INTERNAL :: REPLACE TYPOs
         |  @since  0.5.0 [0.3.0]
         */
        _r(state){
            return state.replace("disabled", "disable").replace("enabled", "enable")
                        .replace("selected", "select").replace("unselected", "unselect");
        },

        /*
         |  GET AN EXISTING OPTION
         |  @since  0.5.7 [0.3.0]
         */
        get(key, grp){
            if(typeof(key) == "object" && key.key && key.group){
                grp = key.group || grp;
                key = key.key;
            } else if(key instanceof Element){
                if(key.tagName == "OPTION"){
                    grp = key[parE].label || "#";
                    key = key.value || key.innerText;
                } else if(key[hAttr]("data-key")){
                    grp = key[gAttr]("data-group") || key[parE][gAttr]("data-group") || "#";
                    key = key[gAttr]("data-key");
                }
            } else if(typeof(key) != "string"){
                return false;
            }
            key = (/^[0-9]+$/.test(key))? "_" + key: key;
            return (grp in this.items)? this.items[grp][key]: false;
        },

        /*
         |  SET AN EXISTING OPTION
         |  @since  0.5.15 [0.3.0]
         */
        set(opt, rebuild){
            let key = opt.value || opt.innerText, grp = opt[parE].label || "#";
            if(!(grp in this.items)){
                this.items[grp] = {};
                this.groups[grp] = opt[parE];
            }
            if(key in this.items[grp]){
                return false;
            }
            let id = (/^[0-9]+$/.test(key))? "_" + key: key;

            // Validate Selection
            let con = this.self.con;
            if(con.multiple && this.selected.length >= con.multiLimit){
                opt.selected = false;
            }
            if(opt.selected && con.deselect && (!opt[hAttr]("selected") || con.multiLimit == 0)){
                opt.selected = false;
                opt.parentElement.selectedIndex = -1;
            }

            // Sanitize Description
            if(opt[hAttr]("data-description")){
                let span = create("SPAN");
                span.innerHTML = opt[gAttr]("data-description");
                opt[sAttr]("data-description", span.innerHTML);
            }

            // Add Item
            this.items[grp][id] = {
                key: key,
                value: opt.text,
                description: opt[gAttr]("data-description") || null,
                group: grp,
                option: opt,
                optgroup: (grp != "#")? this.groups[grp]: undefined,
                selected: opt.selected,
                disabled: opt.disabled,
                hidden: opt.hidden || false
            };
            this.length++;
            if(opt.selected){ this.select(this.items[grp][id]); }
            if(opt.disabled){ this.disable(this.items[grp][id]); }
            return (rebuild)? this.self.callback(this.items[grp][key], "rebuild"): true;
        },

        /*
         |  CREATE A NEW OPTION
         |  @since  0.5.3 [0.3.0]
         */
        add(key, value, group, selected, disabled, description, rebuild){
            if(key instanceof Object){
                for(let k in key){
                    let {value: a, group: b, selected: c, disabled: d, description: e} = key[k];
                    this.add(key[k].key || k, a, b, c, d, e, false);
                }
                return this.self.query();
            }
            if(this.get(key, group)){
                return false;
            }

            // Check Group
            group = (typeof(group) == "string")? group: "#";
            if(group !== "#" && !(group in this.groups)){
                let optgroup = create("OPTGROUP");
                optgroup.label = group;
                optgroup[sAttr]("data-select-optgroup", "add");
                this.element.appendChild(optgroup);
                this.items[group] = {};
                this.groups[group] = optgroup;
            }

            // Validate Selection
            let con = this.self.con;
            if(con.multiple && this.selected.length >= con.multiLimit){
                selected = false;
            }
            disabled = !!disabled;

            // Create Option
            let option = d.createElement("OPTION");
            option.value = key;
            option.selected = selected;
            option.disabled = disabled;
            option.innerText = value;
            option[sAttr]("data-select-option", "add");
            if(description && description.length > 0){
                option[sAttr]("data-description", description);
            }

            // Add Option and Return
            ((group == "#")? this.element: this.groups[group]).appendChild(option);
            return this.set(option, rebuild);
        },

        /*
         |  MOVE AN EXISTING OPTION
         |  @since  0.5.0 [0.5.0]
         */
        move(item, group, new_group, rebuild){
            if(!(item = this.get(item, group))){ return false; }

            // Create Group
            if(new_group !== "#" && !(new_group in this.groups)){
                let optgroup = create("OPTGROUP");
                optgroup.label = new_group;
                this.element.appendChild(optgroup);
                this.items[new_group] = {};
                this.groups[new_group] = optgroup;
                this.groups[new_group].appendChild(item.option);
            }

            // Move To Group
            delete this.items[item.group][item.key];
            item.group = new_group;
            item.optgroup = this.groups[new_group] || undefined;
            this.items[new_group][item.key] = item;
            return (rebuild)? this.self.query(): true;
        },

        /*
         |  REMOVE AN EXISTING OPTION
         |  @since  0.5.7 [0.3.0]
         */
        remove(item, group, rebuild){
            if(!(item = this.get(item, group))){ return false; }
            if(item.selected){ this.unselect(item); }
            if(item.disabled){ this.enable(item); }

            // Remove Data
            item.option[parE].removeChild(item.option);
            let id = (/^[0-9]+$/.test(item.key))? "_" + item.key: item.key;
            delete this.items[item.group][id];
            this.length--;

            // Remove Optgroup
            if(Object.keys(this.items[item.group]).length === 0){
                delete this.items[item.group];
                delete this.groups[item.group];
            }
            return (rebuild)? this.self.query(): true;
        },

        /*
         |  CHECK AN EXISTING OPTION
         |  @since  0.5.0 [0.3.0]
         */
        is(state, item, group){
            state = this._r(state), item = this.get(item, group);
            if(!item || ["select", "unselect", "disable", "enable"].indexOf(state) < 0){
                return null;
            }
            if(state == "disable" || state == "enable"){
                return (state == "disable")? item.disabled: !item.disabled;
            } else if(state == "select" || state == "unselect"){
                return (state == "select")? item.selected: !item.selected;
            }
            return false;
        },

        /*
         |  INTERACT WITH AN OPTION
         |  @since  0.5.0 [0.3.0]
         */
        handle(state, item, group, _force){
            state = this._r(state), item = this.get(item, group);
            if(!item || ["select", "unselect", "disable", "enable"].indexOf(state) < 0){
                return null;
            }

            // Disable || Enable
            if(state == "disable" || state == "enable"){
                if(!(item.option in this.disabled) && state == "disable"){
                    this.disabled.push(item.option);
                } else if((item.option in this.disabled) && state == "enable"){
                    this.disabled.splice(this.disabled.indexOf(item.option), 1);
                }
                item.disabled = (state == "disable");
                item.option.disabled = (state == "disable");
                return this.self.callback.call(this.self, item, state);
            }

            // Select || Unselect
            let dis = (this.self.select.classList.contains("disabled") || item.disabled || item.option.disabled),
                lmt = (this.self.con.multiple && this.self.con.multiLimit <= this.selected.length),
                sgl = (!this.self.con.multiple && this.selected.indexOf(item.option) > 0),
                del = (this.self.con.multiLimit == 0 && this.self.con.deselect == true),
                uns = (!this.self.con.multiple && !this.self.con.deselect) && _force !== true;
            if(state == "select"){
                if(dis || lmt ||  del || sgl){
                    return false;
                }
                if(!this.self.con.multiple){
                    for(let i in this.selected){
                        this.unselect(this.selected[i], undefined, true);
                    }
                }
                if(this.selected.indexOf(item.option) < 0){
                    this.selected.push(item.option);
                }
            } else if(state == "unselect"){
                if(dis || uns){
                    return false;
                }
                this.selected.splice(this.selected.indexOf(item.option), 1);
            }
            item.selected = (state == "select");
            item.option.selected = (state == "select");
            item.option[(state.length > 6? "remove": "set") + "Attribute"]("selected", "selected");
            return this.self.callback.call(this.self, item, state);
        },
        enable(key, group){
            return this.handle("enable", key, group);
        },
        disable(key, group){
            return this.handle("disable", key, group);
        },
        select(key, group){
            return this.handle("select", key, group);
        },
        unselect(key, group, _force){
            return this.handle("unselect", key, group, _force);
        },
        toggle(item, group){
            if(!(item = this.get(item, group))){ return false; }
            return this.handle((item.selected? "unselect": "select"), item, group);
        },

        /*
         |  INVERT CURRENT <STATE>
         |  @since  0.5.15 [0.3.0]
         */
        invert(state){
            state = this._r(state);
            if(["enable", "disable"].indexOf(state) >= 0){
                let invert = this.disabled, action = (state == "enable")? "disable": "enable";
            } else if(["select", "unselect"].indexOf(state) >= 0){
                let invert = this.selected, action = (state == "select")? "unselect": "select";
            }
            let convert = Array.from(this).filter((item) => { !(item in invert); });

            // Loop
            [].concat(invert).forEach((item) => { this.handle(action, item); });
            [].concat(convert).forEach((item) => { this.handle(state, item); });
            return true;
        },

        /*
         |  SET <STATE> ON ALL OPTIONs
         |  @since  0.5.0 [0.5.0]
         */
        all(state, group){
            let list = this;
            if(group in this.items){
                list = Object.keys(this.items[group]);
            } else if(["unselect", "enable"].indexOf(state) >= 0){
                list = (state == "unselect")? this.selected: this.disabled;
            }
            [].concat(Array.from(list)).forEach((item) => { this.handle(state, item, group); });
            return true;
        },

        /*
         |  SET <STATE> FOR A BUNCH OF OPTIONs
         |  @since  0.5.4 [0.5.3]
         */
        walk(state, items, args){
            if(items instanceof Array || items.length){
                for(let l = items.length, i = 0; i < l; i++){
                    this.handle.apply(this, [state, items[i], null].concat(args));
                }
            } else if(items instanceof Object){
                if(items.forEach){
                    items.forEach((e) => { this.handle.apply(this, [state, value, null].concat(args)); });
                } else {
                    for(let key in items){
                        if(typeof(items[key]) != "string" && typeof(items[key]) != "number" && !(items[key] instanceof Element)){
                            continue;
                        }
                        this.handle.apply(this, [state, items[key], (key in this.items? key: null)]).concat(args);
                    }
                }
            }
            return this;
        },

        /*
         |  APPLY LINGUSTIC RULES
         |  @since  0.5.13 [0.5.13]
         */
        applyLinguisticRules(search, casesensitive){
            let rules = this.self.con.linguisticRules,
                values = Object.keys(rules).map(key => "(" + key + "|[" + rules[key] + "])");

            // Prepare Rules
            if(casesensitive){
                values = values.concat(values.map(s => s.toUpperCase())); 
            }

            return search.replace(
                new RegExp(values.join("|"), casesensitive? "g": "ig"), 
                (m, ...args) => values[args.indexOf(m)]
            );
        },

        /*
         |  FIND SOME OPTIONs - ARRAY EDITION
         |  @since  0.5.15 [0.3.0]
         */
        find(search, config){
            let self = this, matches, has = {};

            // GetConfig
            if(!config){
                config = this.self.con.searchConfig;
            }

            // Config Callback
            if(typeof config === "function"){
                matches = config.bind(this, search);
            }

            // Config Handler
            else {
                config = (config instanceof Array)? config: [config];
                config.forEach(c => { if(typeof(c) === "string"){ has[c] = true; } });
                has.any = (!has.any)? has.attributes && has.value: has.any;

                // Cleanup & Prepare
                if(!has.regex || has.text){
                    search = search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
                }
                if(!has.exactglyphes){
                    search = this.self.options.applyLinguisticRules(search, has.case);
                }
                if(has.word){
                    search = '\\b' + search + '\\b';
                }

                // Search
                var regex = new RegExp(search, (!has.case)? "mi": "m"),
                    sfunc = (opt) => regex.test(opt.text || opt.value);
                
                // Handle
                if(has.any){
                    matches = (opt) => sfunc(opt) || [...opt.attributes].some(m);
                } else if(has.attributes){
                    matches = (opt) => [...opt.attributes].some(m);
                } else {
                    matches = sfunc;
                }

                if(!this.self.con.searchDisabled){
                    let temp = matches;
                    matches = (opt) => !opt.disabled && temp(opt);
                }
            }

            // Hammer Time
            return [...this.self.e.options].filter(matches).map(opt => {
                return opt.hidden? false: this.get(opt)
            });
        },

        /*
         |  FIND SOME OPTIONs - WALKER EDITION
         |  @since  0.5.5 [0.3.0]
         */
        *finder(search, config){
            let list = this.find(search, config), item;
            while((item = list.shift()) !== undefined){
                yield item;
            }
        },

        /*
         |  NEW OPTIONS WALKER
         |  @since  0.5.15 [0.4.0]
         */
        *walker(orderi, orderg){
            let groups = Object.keys(this.groups);
            if(orderg == "ASC"){
                groups.sort();
            } else if(orderg == "DESC"){
                groups.sort().reverse();
            } else if(typeof(orderg) == "function"){
                groups = orderg.call(this, groups);
            }
            groups.unshift("#");

            for(let l = groups.length, i = 0; i < l; i++){
                let grp = groups[i];
                if(!(grp in this.items)){
                    break;
                }

                let keys = Object.keys(this.items[grp]);
                if(orderi == "ASC"){
                    keys.sort();
                } else if(orderi == "DESC"){
                    keys.sort().reverse();
                } else if(typeof(orderi) == "function"){
                    keys = orderi.call(this, keys);
                }

                for(let l = keys.length, i = 0; i < l; i++){
                    if(this.items[grp][keys[i]].hidden === true){
                        continue;
                    }
                    yield this.items[grp][keys[i]];
                }
            }
        }
    }
    return {select: select, options: options};
})(window || this);
export {select, options};
