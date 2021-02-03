/**
 * ExportMenu provides functionality for building Export menu
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import exportCSS from "./ExportCSS";
import { Adapter } from "../utils/Adapter";
import { List } from "../utils/List";
import { getInteraction } from "../interaction/Interaction";
import { MutableValueDisposer } from "../utils/Disposer";
import { Language } from "../utils/Language";
import { Validatable } from "../utils/Validatable";
import { keyboard } from "../utils/Keyboard";
import * as $utils from "../utils/Utils";
import * as $iter from "../utils/Iterator";
import * as $dom from "../utils/DOM";
import * as $type from "../utils/Type";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Creates a menu for Export operations.
 *
 * To add an export menu to a chart, set this to a new instance of
 * [[ExportMenu]].
 *
 * ```TypeScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JavaScript
 * chart.exporting.menu = new am4core.ExportMenu();
 * ```
 * ```JSON
 * {
 *   // ...
 *   "exporting": {
 *     "menu": {}
 *   }
 * }
 * ```
 * @important
 */
var ExportMenu = /** @class */ (function (_super) {
    __extends(ExportMenu, _super);
    /**
     * Constructor
     */
    function ExportMenu() {
        var _this = _super.call(this) || this;
        /**
         * An [[Adapter]].
         */
        _this.adapter = new Adapter(_this);
        /**
         * How many milliseconds to hold menu/sub-menu open after it loses focus or
         * hover, before auto-closing it.
         *
         * @default 1000
         */
        _this.closeDelay = 1000;
        /**
         * Close the menu automatically when some export operation is triggered.
         *
         * @default true
         * @since 4.2.2
         */
        _this.closeOnClick = true;
        /**
         * An instance of [[Language]].
         */
        _this._language = new MutableValueDisposer();
        /**
         * What HTML tags to use to build menu.
         */
        _this._menuTag = "ul";
        /**
         * Which tag to use to enclose individual menu items.
         */
        _this._itemTag = "li";
        /**
         * Tag to wrap menu item labels in.
         */
        _this._labelTag = "a";
        /**
         * Tag to use for icons
         */
        _this._iconTag = "img";
        /**
         * Prefix for class names applied to menu elements.
         */
        _this._classPrefix = "amexport";
        /**
         * If set to `true` [[ExportMenu]] will load it's own external CSS when
         * instantiated.
         */
        _this._defaultStyles = true;
        /**
         * Horizontal positioning.
         */
        _this._align = "right";
        /**
         * Vertical positioning.
         */
        _this._verticalAlign = "top";
        /**
         * A tabindex to apply to Export Menu.
         */
        _this._tabindex = 0;
        /**
         * Whether next menu close event should be ignored.
         */
        _this._ignoreNextClose = false;
        /**
         * Default menu items.
         */
        _this._items = [
            {
                "label": "...",
                "menu": [
                    {
                        "label": "Image",
                        "menu": [
                            { "type": "png", "label": "PNG" },
                            { "type": "jpg", "label": "JPG" },
                            { "type": "svg", "label": "SVG" },
                            { "type": "pdf", "label": "PDF" }
                        ]
                    }, {
                        "label": "Data",
                        "menu": [
                            { "type": "json", "label": "JSON" },
                            { "type": "csv", "label": "CSV" },
                            { "type": "xlsx", "label": "XLSX" },
                            { "type": "html", "label": "HTML" },
                            { "type": "pdfdata", "label": "PDF" }
                        ]
                    }, {
                        "label": "Print", "type": "print"
                    }
                ]
            }
        ];
        _this.className = "ExportMenu";
        _this._disposers.push(_this._language);
        _this.invalidate();
        _this.applyTheme();
        return _this;
    }
    /**
     * (Re)draws the Export menu.
     *
     * @ignore Exclude from docs
     */
    ExportMenu.prototype.validate = function () {
        this.draw();
        _super.prototype.validate.call(this);
    };
    /**
     * Draws the menu based on current items.
     *
     * Normally, there's no need to call this explicitly. The chart, if it has
     * export menu enabled, will automatically draw the menu.
     */
    ExportMenu.prototype.draw = function () {
        var _this = this;
        // Create top-level menu item, or clear it
        if (!this._element) {
            this._element = this.createMenuElement(0);
        }
        else {
            this._element.innerHTML = "";
            this._element.className = this.getMenuItemClass(0);
        }
        // See if we're loading external CSS
        // Hide it until CSS is loaded
        if (this.defaultStyles) {
            this._element.style.display = "none";
        }
        // Append to container
        $type.getValue(this._container).appendChild(this._element);
        // Apply adapter to menu items before processing
        var items = this.adapter.apply("items", {
            items: this._items
        }).items;
        for (var len = items.length, i = 0; i < len; i++) {
            this.drawBranch(this._element, items[i], 0);
        }
        // Apply adapter to finalized menu element
        this._element = this.adapter.apply("menuElement", {
            menuElement: this._element
        }).menuElement;
        // Set up global "down" event
        this._disposers.push(getInteraction().body.events.on("down", function (ev) {
            if (!ev.pointer.touch) {
                _this._ignoreNextClose = false;
            }
            _this.close();
        }));
        // Set up global event on ESC press to close the menu
        this._disposers.push(getInteraction().body.events.on("keydown", function (ev) {
            var key = keyboard.getEventKey(ev.event);
            switch (key) {
                case "esc":
                    _this.close();
                    break;
                case "up":
                case "down":
                case "left":
                case "right":
                    if (_this._currentSelection) {
                        ev.event.preventDefault();
                    }
                    _this.moveSelection(key);
                    break;
            }
        }));
        if (this.defaultStyles) {
            this.loadDefaultCSS();
        }
    };
    /**
     * Creates a new branch in export menu. This function is recursive for
     * building multi-level menus.
     *
     * @ignore Exclude from docs
     * @param container Container to put branch elements in
     * @param branch    Menu item
     * @param level     Current nesting level
     */
    ExportMenu.prototype.drawBranch = function (container, branch, level) {
        var _this = this;
        // Apply adapter
        branch = this.adapter.apply("branch", {
            branch: branch,
            level: level
        }).branch;
        // Unsupported?
        // ExportMenu does not check or know for specific browser/system
        // capabilities. It must happen in some other code and applied via Adapter.
        // Export itself will check compatibility, but there might be other plugins
        // that influence it or even add any specific export functionality.
        if (branch.unsupported === true) {
            return;
        }
        // Init ascendants
        if (!branch.ascendants) {
            branch.ascendants = new List();
        }
        // Get type
        var type = branch.type;
        // Create an item
        var element = this.createItemElement(level, type);
        // Create label
        var label;
        // Create icon
        if (branch.icon) {
            label = this.createIconElement(level, type);
            label.src = branch.icon;
            if (branch.label || branch.title) {
                label.title = branch.title || branch.label;
            }
        }
        else if (branch.svg) {
            label = this.createSvgElement(level, type, branch.svg);
            if (branch.label || branch.title) {
                label.title = branch.title || branch.label;
            }
        }
        else {
            label = this.createLabelElement(level, type);
            label.innerHTML = (branch.label ? this.language.translate(branch.label) : "");
            if (branch.title) {
                label.title = branch.title;
            }
        }
        // Apply reader text to label
        var readerLabel = this.getReaderLabel(branch, label.innerHTML);
        label.setAttribute("aria-label", readerLabel);
        // Add Label
        element.appendChild(label);
        // Create interaction object
        // TODO clean this up when it's disposed
        branch.interactions = getInteraction().getInteraction(element);
        branch.element = element;
        // Create interaction manager we can set event listeners to
        if (this.typeClickable(type)) {
            //branch.interactions.clickable = true;
            // TODO clean this up when it's disposed
            branch.interactions.events.on("hit", function (ev) {
                if (_this.events.isEnabled("hit") && !_this.isDisposed()) {
                    var event_1 = {
                        "type": "hit",
                        "event": ev.event,
                        "target": _this,
                        "branch": branch
                    };
                    _this.events.dispatchImmediately("hit", event_1);
                }
            });
            // TODO clean this up when it's disposed
            branch.interactions.events.on("keyup", function (ev) {
                if (keyboard.isKey(ev.event, "enter")) {
                    if (_this.events.isEnabled("enter")) {
                        var event_2 = {
                            "type": "enter",
                            "event": ev.event,
                            "target": _this,
                            "branch": branch
                        };
                        _this.events.dispatchImmediately("enter", event_2);
                    }
                }
            });
        }
        {
            var submenu_1 = this.getSubMenu(branch);
            // Add ENTER event to open sub-menus
            if (submenu_1 != null) {
                // TODO clean this up when it's disposed
                branch.interactions.events.on("keyup", function (ev) {
                    if (keyboard.isKey(ev.event, "enter")) {
                        // This is item has sub-menu, activate the first child on ENTER
                        _this.selectBranch(submenu_1[0]);
                        // Attempt to set focus
                        _this.setFocus(submenu_1[0]);
                    }
                });
                branch.interactions.events.on("hit", function (ev) {
                    _this.selectBranch(branch);
                });
            }
        }
        // Add events
        // TODO clean this up when it's disposed
        branch.interactions.events.on("over", function (ev) {
            if (ev.pointer.touch) {
                // Cancel pending menu closure
                _this._ignoreNextClose = true;
            }
            _this.selectBranch(branch);
            if (_this.events.isEnabled("over")) {
                var event_3 = {
                    "type": "over",
                    "event": ev.event,
                    "target": _this,
                    "branch": branch
                };
                _this.events.dispatchImmediately("over", event_3);
            }
        });
        // TODO clean this up when it's disposed
        branch.interactions.events.on("out", function (ev) {
            if (_this.isDisposed()) {
                return;
            }
            if (!ev.pointer.touch) {
                _this.delayUnselectBranch(branch);
            }
            if (_this.events.isEnabled("out")) {
                var event_4 = {
                    "type": "out",
                    "event": ev.event,
                    "target": _this,
                    "branch": branch
                };
                _this.events.dispatchImmediately("out", event_4);
            }
        });
        // TODO clean this up when it's disposed
        branch.interactions.events.on("focus", function (ev) {
            _this.selectBranch(branch);
        });
        // TODO clean this up when it's disposed
        branch.interactions.events.on("blur", function (ev) {
            _this.delayUnselectBranch(branch);
        });
        // Increment level
        var local_level = level + 1;
        // Has sub-menu?
        if (branch.menu) {
            var submenu = this.createMenuElement(local_level);
            branch.submenuElement = submenu;
            for (var len = branch.menu.length, i = 0; i < len; i++) {
                var ascendants = new List();
                branch.menu[i].ascendants = ascendants;
                if (branch.ascendants.length) {
                    ascendants.copyFrom(branch.ascendants);
                }
                ascendants.push(branch);
                this.drawBranch(submenu, branch.menu[i], local_level);
            }
            // Sub-menu is empty (all items are not supported)
            // Do not draw this menu item at all
            if (submenu.innerHTML == "") {
                return;
            }
            element.appendChild(submenu);
        }
        // Should this item be hidden?
        if (branch.hidden) {
            this.hideBranch(branch);
        }
        // Add id?
        if (branch.id) {
            element.setAttribute("id", branch.id);
        }
        // Background color?
        if (branch.color) {
            element.style.backgroundColor = branch.color.hex;
        }
        // Append to container
        container.appendChild(element);
    };
    /**
     * Creates a menu element to hold its elements in. Usually it's an `<ul>`
     * tag.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @return HTML element reference
     */
    ExportMenu.prototype.createMenuElement = function (level) {
        var element = document.createElement(this.menuTag);
        element.className = this.getMenuItemClass(level);
        // Accessibility
        if (level === 0) {
            element.setAttribute("role", "menubar");
        }
        else {
            element.setAttribute("role", "menu");
        }
        return element;
    };
    /**
     * Generates a class name for the menu element based on its nesting level.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @return Class name(s)
     */
    ExportMenu.prototype.getMenuItemClass = function (level) {
        var className = this.classPrefix + "-menu " + this.classPrefix + "-menu-level-" + level;
        if (level === 0) {
            className += " " + this.classPrefix + "-menu-root " +
                this.classPrefix + "-" + this.align + " " +
                this.classPrefix + "-" + this.verticalAlign;
        }
        return this.adapter.apply("menuClass", {
            className: className,
            level: level
        }).className;
    };
    /**
     * Creates menu item. Usually `<li>` tag. Its label and sub-elements will go
     * into this element.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @param type   Type of the menu item
     * @return HTML element reference
     */
    ExportMenu.prototype.createItemElement = function (level, type) {
        var element = document.createElement(this.itemTag);
        var className = this.classPrefix + "-item " + this.classPrefix
            + "-item-level-" + level
            + " " + this.classPrefix + "-item-" + (type || "blank");
        element.className = this.adapter.apply("itemClass", {
            className: className,
            level: level,
            type: type
        }).className;
        element.setAttribute("role", "menuitem");
        element.setAttribute("tabindex", this.tabindex.toString());
        return element;
    };
    /**
     * Creates a "label" part of the menu item. It could be text or any HTML
     * content.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @param type   Type of the menu item
     * @return An HTML Element
     */
    ExportMenu.prototype.createLabelElement = function (level, type) {
        var element = document.createElement(this.labelTag);
        var className = this.classPrefix + "-label " + this.classPrefix
            + "-label-level-" + level
            + " " + this.classPrefix + "-item-" + (type || "blank");
        if (this.typeClickable(type)) {
            className += " " + this.classPrefix + "-clickable";
        }
        element.className = this.adapter.apply("labelClass", {
            className: className,
            level: level,
            type: type
        }).className;
        // Accessible navigation
        //element.setAttribute("tabindex", this.tabindex.toString());
        //element.setAttribute("role", "menuitem");
        return element;
    };
    /**
     * Creates a "icon" part of the menu item.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @param type   Type of the menu item
     * @return An HTML Element
     */
    ExportMenu.prototype.createIconElement = function (level, type) {
        var element = document.createElement(this.iconTag);
        var className = this.classPrefix + "-icon " + this.classPrefix
            + "-icon-level-" + level
            + " " + this.classPrefix + "-item-" + (type || "blank");
        if (this.typeClickable(type)) {
            className += " " + this.classPrefix + "-clickable";
        }
        element.className = this.adapter.apply("labelClass", {
            className: className,
            level: level,
            type: type
        }).className;
        // Accessible navigation
        element.setAttribute("tabindex", this.tabindex.toString());
        element.setAttribute("role", "menuitem");
        return element;
    };
    /**
     * Creates a a custom element out of raw HTML.
     *
     * @ignore Exclude from docs
     * @param level  Current nesting level
     * @param type   Type of the menu item
     * @return An HTML Element
     */
    ExportMenu.prototype.createSvgElement = function (level, type, svg) {
        var parser = new DOMParser();
        var element = parser.parseFromString(svg, "image/svg+xml").documentElement;
        var className = this.classPrefix + "-icon " + this.classPrefix
            + "-icon-level-" + level
            + " " + this.classPrefix + "-item-" + (type || "blank");
        if (this.typeClickable(type)) {
            className += " " + this.classPrefix + "-clickable";
        }
        element.setAttribute("class", this.adapter.apply("labelClass", {
            className: className,
            level: level,
            type: type
        }).className);
        // Accessible navigation
        element.setAttribute("tabindex", this.tabindex.toString());
        element.setAttribute("role", "menuitem");
        return element;
    };
    /**
     * Destroys the menu and all its elements.
     */
    ExportMenu.prototype.dispose = function () {
        if (!this._disposed) {
            _super.prototype.dispose.call(this);
            if (this._element && this._element.parentNode) {
                this._element.parentNode.removeChild(this._element);
            }
        }
    };
    /**
     * Checks whether menu item type is supposed to be clickable.
     *
     * @ignore Exclude from docs
     * @param type  Menu item type
     * @return Is clickable?
     */
    ExportMenu.prototype.typeClickable = function (type) {
        return $type.hasValue(type);
    };
    /**
     * Checks whether menu item has any sub-items.
     *
     * @ignore Exclude from docs
     * @param branch  A menu item
     * @return Has sub-items?
     */
    ExportMenu.prototype.hasSubMenu = function (branch) {
        return (branch.menu && branch.menu.length) ? true : false;
    };
    /**
     * Returns sub-items (if they exist).
     *
     * @ignore Exclude from docs
     * @param branch  A menu item
     * @return Submenus
     */
    ExportMenu.prototype.getSubMenu = function (branch) {
        if (branch.menu && branch.menu.length) {
            return branch.menu;
        }
    };
    /**
     * Generates and returns an applicable label to be used for screen readers.
     *
     * @ignore Exclude from docs
     * @param item   A menu item instance
     * @param label  Current label
     * @return Reader text
     */
    ExportMenu.prototype.getReaderLabel = function (branch, label) {
        // Strip any HTML from the label
        label = $utils.stripTags(label);
        // Add textual note if the branch is clickable
        if (branch.ascendants.length == 0) {
            label = label == "..." ? this.language.translate("Export") : label;
            label += " [" + this.language.translate("Press ENTER or use arrow keys to navigate") + "]";
        }
        else if (this.hasSubMenu(branch)) {
            label += " [" + this.language.translate("Click, tap or press ENTER to open") + "]";
        }
        else if (branch.type == "print") {
            label = this.language.translate("Click, tap or press ENTER to print.");
        }
        else if (this.typeClickable(branch.type)) {
            label = this.language.translate("Click, tap or press ENTER to export as %1.", undefined, label);
        }
        return this.adapter.apply("rederLabel", {
            label: label,
            branch: branch
        }).label;
    };
    Object.defineProperty(ExportMenu.prototype, "container", {
        /**
         * @return Container
         */
        get: function () {
            return this._container;
        },
        /**
         * Getters and setters
         */
        /**
         * An HTML container to place the Menu in.
         *
         * A container must be an HTML element, because menu itself is HTML, and
         * cannot be placed into SVG.
         *
         * @param container Reference to container element
         * @todo Check if menu is already build. If it is, just move it to a new container
         */
        set: function (container) {
            this._container = container;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "items", {
        /**
         * @return Menu items
         */
        get: function () {
            return this._items;
        },
        /**
         * A list of menu items. Can be nested.
         *
         * @param items  Menu items
         */
        set: function (items) {
            this._items = items;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "tag", {
        /**
         * Sets main menu tag to place menu in.
         *
         * This also sets up how menu items are built.
         *
         * If you set this to "ul", menu items will be wrapped into `<li>` tags.
         *
         * If set to "div", menu items will be wrapped in `<div>` tags.
         *
         * @default "ul"
         * @param tag Tag to use for menu
         */
        set: function (tag) {
            this._menuTag = tag;
            this._itemTag = tag == "ul" ? "li" : "div";
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "menuTag", {
        /**
         * Returns current menu tag.
         *
         * @ignore Exclude from docs
         * @return Menu tag (item that contains sub-items)
         */
        get: function () {
            return this.adapter.apply("menuTag", {
                tag: this._menuTag
            }).tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "itemTag", {
        /**
         * Returns tag to wrap items into.
         *
         * @ignore Exclude from docs
         * @return Item tag
         */
        get: function () {
            return this.adapter.apply("itemTag", {
                tag: this._itemTag
            }).tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "labelTag", {
        /**
         * Returns menu label tag.
         *
         * @ignore Exclude from docs
         * @return Label tag
         */
        get: function () {
            return this.adapter.apply("labelTag", {
                tag: this._labelTag
            }).tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "iconTag", {
        /**
         * Returns icon tag.
         *
         * @ignore Exclude from docs
         * @return Icon tag
         */
        get: function () {
            return this.adapter.apply("iconTag", {
                tag: this._iconTag
            }).tag;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "align", {
        /**
         * @return Horizontal alignment
         */
        get: function () {
            return this.adapter.apply("align", {
                align: this._align
            }).align;
        },
        /**
         * A horizontal alignment for the menu placement.
         *
         * @param value Horizontal alignment
         */
        set: function (value) {
            this._align = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "verticalAlign", {
        /**
         * @return Vertical alignment
         */
        get: function () {
            return this.adapter.apply("verticalAlign", {
                verticalAlign: this._verticalAlign
            }).verticalAlign;
        },
        /**
         * A vertical alignment for the menu placement.
         *
         * @param value Vertical alignment
         */
        set: function (value) {
            this._verticalAlign = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "classPrefix", {
        /**
         * @return Class name prefix
         */
        get: function () {
            return this.adapter.apply("classPrefix", {
                classPrefix: this._classPrefix
            }).classPrefix;
        },
        /**
         * Class name prefix.
         *
         * @default "amexport"
         * @param value Class name prefix
         */
        set: function (value) {
            this._classPrefix = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "defaultStyles", {
        /**
         * @return Should ExportMenu load its own CSS?
         */
        get: function () {
            return this.adapter.apply("defaultStyles", {
                defaultStyles: this._defaultStyles
            }).defaultStyles;
        },
        /**
         * Indicates whether [[ExportMenu]] should load external CSS to style itself.
         *
         * If set to `false`, the menu will not be styled, and will rely on some
         * external CSS.
         *
         * @default true
         * @param Should ExportMenu load its own CSS?
         */
        set: function (value) {
            if (this._defaultStyles != value) {
                this._defaultStyles = value;
                if (value) {
                    this.loadDefaultCSS();
                }
            }
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Loads the default CSS.
     *
     * @ignore Exclude from docs
     */
    ExportMenu.prototype.loadDefaultCSS = function () {
        this._disposers.push(exportCSS($dom.getShadowRoot(this.container), this.classPrefix));
        if (this._element) {
            this._element.style.display = "";
        }
    };
    Object.defineProperty(ExportMenu.prototype, "tabindex", {
        /**
         * @return Tab index
         */
        get: function () {
            return this.adapter.apply("tabindex", {
                tabindex: this._tabindex
            }).tabindex;
        },
        /**
         * A tab index for the menu.
         *
         * Tab index will influence the order in which elements on the chart and
         * the whole page are selected when pressing TAB key.
         *
         * @param value Tab index
         */
        set: function (value) {
            this._tabindex = value;
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ExportMenu.prototype, "language", {
        /**
         * @return A [[Language]] instance to be used
         */
        get: function () {
            var _this = this;
            var language = this._language.get();
            if (language == null) {
                language = new Language();
                // TODO code duplication with `set language()`
                this._language.set(language, language.events.on("localechanged", function (ev) {
                    _this.invalidate();
                }));
            }
            return language;
        },
        /**
         * A [[Language]] instance.
         *
         * @param value An instance of [[Language]]
         */
        set: function (value) {
            var _this = this;
            this._language.set(value, value.events.on("localechanged", function (ev) {
                _this.invalidate();
            }));
            this.invalidate();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Controlling the menu
     */
    /**
     * Removes all active classes from menu items. Useful on touch devices and
     * keyboard navigation where open menu can be closed instantly by clicking or
     * tapping outside it.
     *
     * @ignore Exclude from docs
     */
    ExportMenu.prototype.close = function () {
        var _this = this;
        if (this.isDisposed()) {
            return;
        }
        if (this._ignoreNextClose) {
            this._ignoreNextClose = false;
            return;
        }
        if (this.closeOnClick) {
            this._element.style.pointerEvents = "none";
            setTimeout(function () {
                _this._element.style.pointerEvents = "auto";
            }, 100);
        }
        if (this._currentSelection) {
            this.setBlur(this._currentSelection);
            this._currentSelection = undefined;
        }
        if (this._element) {
            var items = this._element.getElementsByClassName("active");
            for (var len = items.length, i = len - 1; i >= 0; i--) {
                if (items[i]) {
                    $dom.removeClass(items[i], "active");
                }
            }
        }
        this.events.dispatchImmediately("closed", {
            type: "closed",
            target: this
        });
    };
    /**
     * Selects a branch in the menu.
     *
     * Handles closing of currently open branch.
     *
     * @ignore Exclude from docs
     * @param branch Branch to select
     */
    ExportMenu.prototype.selectBranch = function (branch) {
        var _this = this;
        if (this.isDisposed()) {
            return;
        }
        // Cancel previous closure
        if (branch.closeTimeout) {
            this.removeDispose(branch.closeTimeout);
            branch.closeTimeout = undefined;
        }
        // Add active class
        $dom.addClass(branch.element, "active");
        // Set expanded
        if (branch.submenuElement) {
            branch.submenuElement.setAttribute("aria-expanded", "true");
        }
        // Remove current selection
        if (this._currentSelection && this._currentSelection !== branch && this._currentSelection.ascendants) {
            $iter.each($iter.concat($iter.fromArray([this._currentSelection]), this._currentSelection.ascendants.iterator()), function (ascendant) {
                if (!branch.ascendants.contains(ascendant) && branch !== ascendant) {
                    _this.unselectBranch(ascendant, true);
                }
            });
        }
        // Select and/or cancel timeout for current ascendants
        $iter.each(branch.ascendants.iterator(), function (ascendant) {
            if (ascendant.closeTimeout) {
                _this.removeDispose(ascendant.closeTimeout);
                ascendant.closeTimeout = undefined;
            }
            $dom.addClass(ascendant.element, "active");
        });
        // Log current selection
        this._currentSelection = branch;
        // Invoke event
        if (this.events.isEnabled("branchselected")) {
            var event_5 = {
                type: "branchselected",
                target: this,
                branch: branch
            };
            this.events.dispatchImmediately("branchselected", event_5);
        }
    };
    /**
     * Unselects a branch. Also selects a branch one level up if necessary.
     *
     * @ignore Exclude from docs
     * @param branch Branch to unselect
     * @param simple If `true`, only the branch will be unselected without selecting parent branch
     */
    ExportMenu.prototype.unselectBranch = function (branch, simple) {
        if (this.isDisposed()) {
            return;
        }
        // Remove active class
        $dom.removeClass(branch.element, "active");
        // Set expanded
        if (branch.submenuElement) {
            branch.submenuElement.removeAttribute("aria-expanded");
        }
        // Remove current selection
        if (this._currentSelection == branch) {
            this._currentSelection = undefined;
        }
        // Invoke event
        if (this.events.isEnabled("branchunselected")) {
            var event_6 = {
                type: "branchunselected",
                target: this,
                branch: branch
            };
            this.events.dispatchImmediately("branchunselected", event_6);
        }
    };
    /**
     * Delay unselection of a branch. This can still be cancelled in some other
     * place if the branch or its children regain focus.
     *
     * @ignore Exclude from docs
     * @param branch Branch to unselect
     * @param simple If `true`, only the branch will be unselected without selecting parent branch
     */
    ExportMenu.prototype.delayUnselectBranch = function (branch, simple) {
        var _this = this;
        if (this.isDisposed()) {
            return;
        }
        // Schedule branch unselection
        if (branch.closeTimeout) {
            this.removeDispose(branch.closeTimeout);
            branch.closeTimeout = undefined;
        }
        branch.closeTimeout = this.setTimeout(function () {
            _this.unselectBranch(branch, simple);
        }, this.closeDelay);
        // Schedule unselection of all ascendants
        // In case focus went away from the export menu altogether, this will ensure
        // that all items will be closed.
        // In case we're jumping to other menu item, those delayed unselections will
        // be cancelled by `selectBranch`
        if (simple !== true && branch.ascendants) {
            $iter.each(branch.ascendants.iterator(), function (ascendant) {
                _this.delayUnselectBranch(ascendant, true);
            });
        }
    };
    /**
     * Navigates the menu based on which direction kayboard key was pressed.
     *
     * @ignore Exclude from docs
     * @param key A key that was pressed
     */
    ExportMenu.prototype.moveSelection = function (key) {
        if (this.isDisposed()) {
            return;
        }
        // Check if there's a current selection
        if (!this._currentSelection) {
            return;
        }
        var newSelection;
        if (key == "up") {
            // Try moving up in current menu list, or to the last item if already
            // at the top
            newSelection = this.getPrevSibling(this._currentSelection);
        }
        else if (key == "down") {
            // Try moving down in current menu list, or to the top item if already
            // at the bottom
            newSelection = this.getNextSibling(this._currentSelection);
        }
        else if ((key == "left" && this.align == "right") || (key == "right" && this.align == "left")) {
            var menu = this.getSubMenu(this._currentSelection);
            // Go one level-deeper
            if (menu != null) {
                newSelection = menu[0];
            }
        }
        else if ((key == "right" && this.align == "right") || (key == "left" && this.align == "left")) {
            // Go one level-deeper
            newSelection = this.getParentItem(this._currentSelection);
        }
        if (newSelection && newSelection !== this._currentSelection) {
            this.selectBranch(newSelection);
            this.setFocus(newSelection);
            this._currentSelection = newSelection;
        }
    };
    /**
     * Returns all siblings of a menu item, including this same menu item.
     *
     * @ignore Exclude from docs
     * @param branch  Menu item
     * @return List of sibling menu items
     */
    ExportMenu.prototype.getSiblings = function (branch) {
        var parent = this.getParentItem(branch);
        if (parent && parent.menu) {
            return parent.menu;
        }
        else {
            return [];
        }
    };
    /**
     * Returns menu items parent item.
     *
     * @ignore Exclude from docs
     * @param branch  Menu item
     * @return Parent menu item
     */
    ExportMenu.prototype.getParentItem = function (branch) {
        if (branch.ascendants && branch.ascendants.length) {
            return branch.ascendants.getIndex(branch.ascendants.length - 1);
        }
        else {
            return undefined;
        }
    };
    /**
     * Returns next sibling in the same menu branch. If there is no next sibling,
     * the first one is returned. If there is just one item, that item is
     * returned. Unsupported menu items are skipped.
     *
     * @ignore Exclude from docs
     * @param branch  Menu item to search siblings for
     * @return Menu item
     */
    ExportMenu.prototype.getNextSibling = function (branch) {
        var siblings = this.getSiblings(branch);
        if (siblings.length > 1) {
            var next = siblings.indexOf(branch) + 1;
            next = siblings.length == next ? 0 : next;
            return siblings[next].unsupported ? this.getNextSibling(siblings[next]) : siblings[next];
        }
        else {
            return branch;
        }
    };
    /**
     * Returns previous sibling in the same menu branch. If there is no next
     * sibling, the first one is returned. If there is just one item, that item is
     * returned. Unsupported menu items are skipped.
     *
     * @ignore Exclude from docs
     * @param branch  Menu item to search siblings for
     * @return Menu item
     */
    ExportMenu.prototype.getPrevSibling = function (branch) {
        var siblings = this.getSiblings(branch);
        if (siblings.length > 1) {
            var prev = siblings.indexOf(branch) - 1;
            prev = prev == -1 ? siblings.length - 1 : prev;
            return siblings[prev].unsupported ? this.getPrevSibling(siblings[prev]) : siblings[prev];
        }
        else {
            return branch;
        }
    };
    /**
     * Attempts to set focus on particular menu element.
     *
     * @ignore Exclude from docs
     * @param branch Menu item
     */
    ExportMenu.prototype.setFocus = function (branch) {
        if (branch.interactions) {
            try {
                branch.interactions.element.focus();
            }
            catch (e) {
                // nothing
            }
        }
    };
    /**
     * Attempts to remove focus from the menu element.
     *
     * @ignore Exclude from docs
     * @param branch Menu item
     */
    ExportMenu.prototype.setBlur = function (branch) {
        if (branch.interactions) {
            try {
                branch.interactions.element.blur();
            }
            catch (e) {
                // nothing
            }
        }
    };
    /**
     * Hides the whole branch of menu.
     *
     * @param  branch  branch
     */
    ExportMenu.prototype.hideBranch = function (branch) {
        branch.element.style.display = "none";
    };
    /**
     * Show the branch of menu.
     *
     * @param  branch  branch
     */
    ExportMenu.prototype.showBranch = function (branch) {
        branch.element.style.display = "";
    };
    Object.defineProperty(ExportMenu.prototype, "element", {
        /**
         * The main element o fthe menu - usually `<ul>`.
         *
         * @since 4.10.6
         * @return Menu element
         */
        get: function () {
            return this._element;
        },
        enumerable: true,
        configurable: true
    });
    return ExportMenu;
}(Validatable));
export { ExportMenu };
//# sourceMappingURL=ExportMenu.js.map