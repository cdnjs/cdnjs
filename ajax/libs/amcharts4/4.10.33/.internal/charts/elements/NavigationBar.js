/**
 * Functionality for drawing simple NavigationBar.
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Component } from "../../core/Component";
import { DataItem } from "../../core/DataItem";
import { ListTemplate, ListDisposer } from "../../core/utils/List";
import { TextLink } from "../../core/elements/TextLink";
import { Triangle } from "../../core/elements/Triangle";
import { registry } from "../../core/Registry";
import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { percent } from "../../core/utils/Percent";
import * as $iter from "../../core/utils/Iterator";
/**
 * ============================================================================
 * DATA ITEM
 * ============================================================================
 * @hidden
 */
/**
 * Defines a [[DataItem]] for [[NavigationBar]].
 *
 * @see {@link DataItem}
 */
var NavigationBarDataItem = /** @class */ (function (_super) {
    __extends(NavigationBarDataItem, _super);
    /**
     * Constructor
     */
    function NavigationBarDataItem() {
        var _this = _super.call(this) || this;
        _this.className = "NavigationBarDataItem";
        _this.applyTheme();
        return _this;
    }
    Object.defineProperty(NavigationBarDataItem.prototype, "name", {
        /**
         * @return Name
         */
        get: function () {
            return this.properties["name"];
        },
        /**
         * Name of the navigation bar item.
         *
         * @param value  Name
         */
        set: function (value) {
            this.setProperty("name", value);
        },
        enumerable: true,
        configurable: true
    });
    return NavigationBarDataItem;
}(DataItem));
export { NavigationBarDataItem };
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * NavigationBar class can be used to create a multi-level breadcrumb-style
 * navigation control.
 *
 * @see {@link INavigationBarEvents} for a list of available events
 * @see {@link INavigationBarAdapters} for a list of available Adapters
 * @todo Implement better
 * @important
 */
var NavigationBar = /** @class */ (function (_super) {
    __extends(NavigationBar, _super);
    /**
     * Constructor
     */
    function NavigationBar() {
        var _this = 
        // Init
        _super.call(this) || this;
        _this.className = "NavigationBar";
        var interfaceColors = new InterfaceColorSet();
        var textLink = new TextLink();
        textLink.valign = "middle";
        textLink.paddingTop = 8;
        textLink.paddingBottom = 8;
        _this.paddingBottom = 2;
        _this.links = new ListTemplate(textLink);
        _this._disposers.push(new ListDisposer(_this.links));
        _this._disposers.push(textLink);
        _this._linksIterator = new $iter.ListIterator(_this.links, function () { return _this.links.create(); });
        _this._linksIterator.createNewItems = true;
        var triangle = new Triangle();
        triangle.direction = "right";
        triangle.width = 8;
        triangle.height = 12;
        triangle.fill = interfaceColors.getFor("alternativeBackground");
        triangle.fillOpacity = 0.5;
        triangle.valign = "middle";
        triangle.marginLeft = 10;
        triangle.marginRight = 10;
        _this.separators = new ListTemplate(triangle);
        _this._disposers.push(new ListDisposer(_this.separators));
        _this._disposers.push(triangle);
        var activeLink = new TextLink();
        _this.activeLink = activeLink;
        activeLink.copyFrom(textLink);
        activeLink.valign = "middle";
        activeLink.fontWeight = "bold";
        _this.width = percent(100);
        _this.layout = "grid";
        _this.dataFields.name = "name";
        // Apply theme
        _this.applyTheme();
        return _this;
    }
    /**
     * Completely redraws the navigation bar.
     *
     * @ignore Exclude from docs
     */
    NavigationBar.prototype.validateDataElements = function () {
        this.removeChildren();
        this._linksIterator.reset();
        _super.prototype.validateDataElements.call(this);
        //@todo: dispose
    };
    /**
     * Creates a visual element for a data item (nav item).
     *
     * @ignore Exclude from docs
     * @param dataItem  Data item
     */
    NavigationBar.prototype.validateDataElement = function (dataItem) {
        _super.prototype.validateDataElement.call(this, dataItem);
        var textLink;
        if (dataItem.index < this.dataItems.length - 1) {
            textLink = this._linksIterator.getLast();
            textLink.parent = this;
            var separator = this.separators.create();
            separator.parent = this;
            separator.valign = "middle";
        }
        else {
            textLink = this.activeLink;
            textLink.events.copyFrom(this.links.template.events);
            textLink.hide(0);
            textLink.show();
            textLink.parent = this;
        }
        textLink.dataItem = dataItem;
        textLink.text = dataItem.name;
        textLink.validate();
    };
    return NavigationBar;
}(Component));
export { NavigationBar };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["NavigationBar"] = NavigationBar;
registry.registeredClasses["NavigationBarDataItem"] = NavigationBarDataItem;
//# sourceMappingURL=NavigationBar.js.map