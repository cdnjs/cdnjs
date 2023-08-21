/**
 * Container module
 * @todo Needs description
 */
import { __extends } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { Sprite } from "./Sprite";
import { SpriteState } from "./SpriteState";
import { List } from "./utils/List";
import { MultiDisposer } from "./utils/Disposer";
import { Dictionary, DictionaryDisposer } from "./utils/Dictionary";
import { getInteraction } from "./interaction/Interaction";
import { Rectangle } from "./elements/Rectangle";
import { Percent } from "./utils/Percent";
import { registry } from "./Registry";
import { InterfaceColorSet } from "../core/utils/InterfaceColorSet";
import * as $iter from "./utils/Iterator";
import * as $array from "./utils/Array";
import * as $math from "./utils/Math";
import * as $type from "./utils/Type";
import * as $dom from "./utils/DOM";
import { system } from "./System";
import { options } from "./Options";
;
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * Container can contain multiple sprites and arrange them in various layouts.
 *
 * @see {@link IContainerEvents} for a list of available events
 * @see {@link IContainerAdapters} for a list of available Adapters
 * @important
 */
var Container = /** @class */ (function (_super) {
    __extends(Container, _super);
    /**
     * Constructor
     */
    function Container() {
        var _this = 
        // Init
        _super.call(this) || this;
        /**
         * Container children. (sorted by layout)
         *
         * @ignore Exclude from docs
         */
        _this._childrenByLayout = [];
        /**
         * Container's disposers for its child elements.
         *
         * @ignore Exclude from docs
         */
        _this._childrenDisposers = new Dictionary();
        /**
         * Indicates if this container contains any focused elements, including
         * itself.
         */
        _this.hasFocused = false;
        /**
         * An array of references to elements the state should be set, when it is set
         * on this element.
         */
        _this.setStateOnSprites = [];
        /*
         * @ignore
         */
        _this.layoutInvalid = false;
        _this._absoluteWidth = 0;
        _this._absoluteHeight = 0;
        /**
         * An array of child Sprites that should be ready before this object can
         * fire a "ready" event.
         */
        _this._shouldBeReady = [];
        /**
         * Enables touch tap protection.
         */
        _this._tapToActivate = false;
        /**
         * If `tapToActivate` is used, this setting will determine how long the chart
         * will stay in "active" mode.
         *
         * @default 3000
         * @since 4.4.0
         */
        _this.tapTimeout = 3000;
        _this.className = "Container";
        _this._element = _this.paper.addGroup("g");
        _this.group.add(_this.element);
        _this.setPropertyValue("pixelPerfect", false);
        _this.setPropertyValue("layout", "absolute");
        _this.setPropertyValue("fixedWidthGrid", false);
        _this.setPropertyValue("verticalCenter", "none");
        _this.setPropertyValue("horizontalCenter", "none");
        _this._positionPrecision = 4;
        _this._disposers.push(new DictionaryDisposer(_this._childrenDisposers));
        _this.children.events.on("inserted", _this.handleChildAdded, _this);
        _this.children.events.on("removed", _this.handleChildRemoved, _this);
        _this.applyTheme();
        return _this;
    }
    /**
     * Handles adding of a new child into `children`. Adding new children might
     * affect the whole layout so it needs to be revalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     * @todo Throw an exception on adding a disposed object. Of course it's better NOT TO add disposed objects, so that what we should focus on.
     */
    Container.prototype.handleChildAdded = function (event) {
        this.processChild(event.newValue);
    };
    /**
     * @ignore
     */
    Container.prototype.processChild = function (child) {
        // try solves the problem when somedy adds child directly to children
        try {
            this._childrenDisposers.insertKey(child.uid, new MultiDisposer([
                // it's not enough to listen to POSITION_CHANGED only, as some extra redrawals will happen.
                child.events.on("transformed", this.handleChildTransform, this),
                child.events.on("zIndexChanged", this.sortAndAdd, this)
            ]));
        }
        catch (err) {
            // void
        }
        if (this.element) {
            var group = this.element;
            group.add(child.group);
        }
        child.parent = this;
        child.paper = this.paper;
        this.dispatchImmediately("childadded", { type: "childadded", newValue: child });
        this.invalidate();
    };
    /**
     * @ignore
     */
    Container.prototype.sortAndAdd = function () {
        this.sortChildren();
        this.addChildren();
    };
    /**
     * Handles child removal. Changing size of the child may change the
     * whole layout of the Container, hence layout needs to be invalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     */
    Container.prototype.handleChildRemoved = function (event) {
        var child = event.oldValue;
        // TODO figure out why the key sometimes doesn't exist
        this._childrenDisposers.removeKey(child.uid);
        if (this.element) {
            var group = this.element;
            group.removeElement(child.group);
        }
        if (child.isMeasured) {
            this.invalidateLayout();
        }
        this.dispatchImmediately("childremoved", { type: "childremoved", oldValue: child });
    };
    /**
     * Handles child transformation. Changing size of the child may change the
     * whole layout of the Container, hence layout needs to be invalidated.
     *
     * @ignore Exclude from docs
     * @param event Event object
     */
    Container.prototype.handleChildTransform = function (event) {
        var child = event.target;
        if (child.isMeasured) { // && this.layout != "none" && this.layout != "absolute") {
            this.invalidateLayout();
        }
    };
    /**
     * Invalidates Container's layout, causing it to be re-evaluated again.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.invalidateLayout = function () {
        if (this.layoutInvalid || this.disabled || this.isTemplate || this.layout == "none" || this.__disabled) {
            return;
        }
        this.layoutInvalid = true;
        registry.addToInvalidLayouts(this);
        system.requestFrame();
    };
    /**
     * Invalidates element.
     *
     * Object will be redrawn during the next update cycle.
     *
     * Please note that in most cases elements will auto-invalidate when needed. If
     * everything works, DO NOT use this method. Use it only if some changes do
     * not take otherwise.
     */
    Container.prototype.invalidate = function () {
        _super.prototype.invalidate.call(this);
        this.invalidateLayout();
    };
    /**
     * Invalidates the whole element, including layout AND all its child
     * elements.
     *
     * As this will essentially force all elements to redraw, use only if
     * absolutely necessary.
     */
    Container.prototype.deepInvalidate = function () {
        _super.prototype.invalidate.call(this);
        //this.sortChildren();
        $array.each(this._childrenByLayout, function (child) {
            if (child instanceof Container) {
                child.deepInvalidate();
            }
            else {
                child.invalidate();
            }
        });
        this.invalidateLayout();
    };
    Object.defineProperty(Container.prototype, "children", {
        /**
         * Returns a list of the child [[Sprite]] elements contained in this
         * Container.
         *
         * @return List of child elements (Sprites)
         */
        get: function () {
            // @todo Review if we can add all children to disposers
            if (!this._children) {
                this._children = new List();
                //this._disposers.push(new ListDisposer(this._children));
            }
            return this._children;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "minWidth", {
        /**
         * @return Width (px)
         */
        get: function () {
            return this.getPropertyValue("minWidth");
        },
        /**
         * Minimum width (px) for the Container. A container will not
         * auto-shrink beyond this value, even if child elements are smaller.
         *
         * @param value  Width (px)
         */
        set: function (value) {
            if (this.setPropertyValue("minWidth", value)) {
                this.invalidateLayout();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "minHeight", {
        /**
         * @return Height (px)
         */
        get: function () {
            return this.getPropertyValue("minHeight");
        },
        /**
         * Minimum height (px) for the Container. A container will not
         * auto-shrink beyond this value, even if child elements are smaller.
         *
         * @param value  Height (px)
         */
        set: function (value) {
            if (this.setPropertyValue("minHeight", value)) {
                this.invalidateLayout();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Overrides the original `removeElement` so that Container's actual element
     * is not removed. We do not need to remove element of a Container.
     *
     * We do this because remove element each time will fail the `getBBox`.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.removeElement = function () {
    };
    /**
     * Sorts Container's children: the ones with variable width and height are
     * put at the end of the list (depending on layout type), so that fixed-width
     * ones can be drawn first.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.sortChildren = function () {
        var _this = this;
        this._childrenByLayout = [];
        if (this.layout == "none" || this.layout == "absolute" || !this.layout) {
            //$iter.each(this.children.iterator(), (child) => {
            //	this._childrenByLayout.push(child);
            //});
            this._childrenByLayout = this.children.values;
        }
        else {
            // Assemble fixed-size and relative lists
            var fixed_1 = [];
            var relative_1 = [];
            $iter.each(this.children.iterator(), function (child) {
                if (_this.layout == "horizontal" || _this.layout == "grid") {
                    if (!$type.isNumber(child.percentWidth)) {
                        fixed_1.push(child);
                    }
                    else {
                        relative_1.push(child);
                    }
                }
                else if (_this.layout == "vertical") {
                    if (!$type.isNumber(child.percentHeight)) {
                        fixed_1.push(child);
                    }
                    else {
                        relative_1.push(child);
                    }
                }
                else {
                    fixed_1.push(child);
                }
            });
            // Concat everything into list
            this._childrenByLayout = fixed_1.concat(relative_1);
        }
        this.calculateRelativeSize();
    };
    /**
     * Calculates relative sizes for all Container's children.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    Container.prototype.calculateRelativeSize = function () {
        var _this = this;
        var totalRelativeWidth = 0;
        var totalRelativeHeight = 0;
        $array.each(this._childrenByLayout, function (child) {
            // if child is not measured, we do not care about it at all.
            if (child.isMeasured) {
                if ($type.isNumber(child.percentWidth)) {
                    totalRelativeWidth += child.percentWidth;
                }
                if ($type.isNumber(child.percentHeight)) {
                    totalRelativeHeight += child.percentHeight;
                }
            }
        });
        $array.each(this._childrenByLayout, function (child) {
            if (child.isMeasured) {
                if (_this.layout == "horizontal") {
                    if ($type.isNumber(child.percentWidth)) {
                        child.relativeWidth = child.percentWidth / totalRelativeWidth;
                    }
                    if ($type.isNumber(child.percentHeight)) {
                        child.relativeHeight = child.percentHeight / 100;
                    }
                }
                if (_this.layout == "vertical") {
                    if ($type.isNumber(child.percentHeight)) {
                        child.relativeHeight = child.percentHeight / totalRelativeHeight;
                    }
                    if ($type.isNumber(child.percentWidth)) {
                        child.relativeWidth = child.percentWidth / 100;
                    }
                }
                if (_this.layout == "grid") {
                    if ($type.isNumber(child.percentHeight)) {
                        child.relativeHeight = child.percentHeight / 100;
                    }
                    if ($type.isNumber(child.percentWidth)) {
                        child.relativeWidth = child.percentWidth / 100;
                    }
                }
            }
            if (_this.layout == "absolute" || !child.isMeasured) {
                if ($type.isNumber(child.percentWidth)) {
                    child.relativeWidth = child.percentWidth / 100;
                }
                if ($type.isNumber(child.percentHeight)) {
                    child.relativeHeight = child.percentHeight / 100;
                }
            }
        });
    };
    /**
     * Adds all children to Container's SVG element.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.addChildren = function () {
        /*
          Need this check because a child might be assigned to parent even before element is created, for example a theme
          access scrollbar.thumb
        */
        if (this.element) {
            var zindexed = $array.copy(this.children.values); // not children by layout!
            var sortArray = zindexed.map(function (data, idx) {
                return { idx: idx, data: data };
            });
            sortArray.sort(function (a, b) {
                var ai = (a.data.zIndex || 0);
                var bi = (b.data.zIndex || 0);
                if (ai < bi) {
                    return -1;
                }
                if (ai > bi) {
                    return 1;
                }
                return a.idx - b.idx;
            });
            zindexed = sortArray.map(function (val) {
                return val.data;
            });
            var group_1 = this.element;
            // check, maybe the order is good already
            var isCorrect = true;
            if (group_1.node && group_1.node.childNodes) {
                for (var i = 0, len = group_1.node.childNodes.length; i < len; i++) {
                    if (group_1.node.childNodes[i] != zindexed[i].group.node) {
                        isCorrect = false;
                        break;
                    }
                }
            }
            if (!isCorrect) {
                $array.each(zindexed, function (child) {
                    if (child.group) {
                        group_1.add(child.group);
                    }
                });
                if (this._background) {
                    this.group.addToBack(this._background.group);
                }
                this.invalidateLayout();
            }
        }
    };
    /**
     * Creates a new element of specific type and assigns as a child to the
     * Container.
     *
     * @param Class type for the new element
     * @return New element
     */
    Container.prototype.createChild = function (classType) {
        var sprite = new classType();
        sprite.parent = this;
        return sprite;
    };
    /**
     * Removes all Container's children without actually destroying them.
     *
     * To destroy children use `disposeChildren()` instead.
     */
    Container.prototype.removeChildren = function () {
        // remove all children
        // TODO use iteration instead
        while (this.children.length > 0) {
            var child = this.children.getIndex(0);
            child.parent = undefined;
            this.children.removeValue(child);
        }
    };
    /**
     * Removes and destroys all Container's children.
     *
     * To remove children from Container without destroying them, use
     * `removeChildren()`.
     */
    Container.prototype.disposeChildren = function () {
        // TODO use iteration instead
        while (this.children.length > 0) {
            var child = this.children.getIndex(0);
            child.dispose();
            this.children.removeValue(child);
        }
    };
    Object.defineProperty(Container.prototype, "background", {
        /**
         * @return Background element
         */
        get: function () {
            if (!this._background) {
                this._background = this.createBackground();
                this.processBackground();
            }
            return this._background;
        },
        /**
         * An element to use as container background.
         *
         * @param background  Background element
         */
        set: function (background) {
            if (this._background && this.background != background) {
                this.removeDispose(this._background);
            }
            if (background) {
                this._background = background;
                this._disposers.push(background);
                this.processBackground();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Handles the situation where parent element is resized.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.handleGlobalScale = function () {
        _super.prototype.handleGlobalScale.call(this);
        this.children.each(function (child) {
            child.handleGlobalScale();
        });
    };
    /**
     * Creates and returns a [[Rectangle]] to use as a background for Container.
     *
     * @ignore Exclude from docs
     * @return Background Rectangle element
     */
    Container.prototype.createBackground = function () {
        return new Rectangle();
    };
    /**
     * Decorates background element with required properties.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.processBackground = function () {
        var background = this._background;
        if (background) {
            background.isMeasured = false;
            this._background.fill = new InterfaceColorSet().getFor("background");
            background.parent = this;
            background.isMeasured = false;
            this.children.removeValue(background);
            this._disposers.push(background);
            this.group.addToBack(this._background.group);
        }
    };
    /**
     * Measures the size of container and informs its children of how much size
     * they can occupy, by setting their relative `maxWidth` and `maxHeight`
     * properties.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.validateLayout = function () {
        var _this = this;
        registry.removeFromInvalidLayouts(this);
        this.layoutInvalid = false;
        // prevents from drawing if topparent is 0x0
        /*
        let topParent = this.topParent;
        if (topParent) {
            if (!topParent.maxWidth || !topParent.maxHeight) {
                this._disposers.push(topParent.events.once("maxsizechanged", this.invalidateLayout, this));
            }
        }*/
        this._availableWidth = this.innerWidth;
        this._availableHeight = this.innerHeight;
        var measuredWidth = 0;
        var measuredHeight = 0;
        var allValid = true;
        if (this.children) {
            this.sortChildren();
            // we itterate through list of children, sorted by layout priority. sprites which width non-relative width/height will go first, so we will reduce available width before proceeding to sprites with relative width/height
            $array.each(this._childrenByLayout, function (child) {
                var maxWidth;
                var maxHeight;
                if ($type.isNumber(child.relativeWidth)) {
                    maxWidth = $math.round(_this._availableWidth * child.relativeWidth, 2);
                    if (_this.layout == "horizontal") { // || this.layout == "absolute") {
                        maxWidth -= child.pixelMarginRight + child.pixelMarginLeft;
                    }
                }
                else {
                    if (_this.layout == "horizontal") {
                        if (child.invalid) {
                            child.validate();
                        }
                    }
                }
                if ($type.isNumber(child.relativeHeight)) {
                    maxHeight = $math.round(_this._availableHeight * child.relativeHeight, 2);
                    if (_this.layout == "vertical") { //  || this.layout == "absolute") {
                        maxHeight -= child.pixelMarginTop + child.pixelMarginBottom;
                    }
                }
                else {
                    if (_this.layout == "vertical") {
                        if (child.invalid) {
                            child.validate();
                        }
                    }
                }
                // if child is valid
                if (child.invalid == false) {
                    if ($type.isNumber(child.relativeWidth)) {
                        child.maxWidth = maxWidth;
                    }
                    if ($type.isNumber(child.relativeHeight)) {
                        child.maxHeight = maxHeight;
                    }
                    if (child.isMeasured) {
                        // reduce available width if this is horizontal layout
                        if (_this.layout == "horizontal") {
                            if (!$type.isNumber(child.percentWidth)) {
                                if (child.measuredWidth > 0) {
                                    _this._availableWidth -= child.measuredWidth + child.pixelMarginLeft + child.pixelMarginRight;
                                }
                            }
                        }
                        // reduce available height if this is vertical layout
                        if (_this.layout == "vertical") {
                            if (!$type.isNumber(child.percentHeight)) {
                                if (child.measuredHeight > 0) {
                                    _this._availableHeight -= child.measuredHeight + child.pixelMarginTop + child.pixelMarginBottom;
                                }
                            }
                        }
                        var childMeasuredWidth = child.measuredWidth;
                        var childMeasuredHeight = child.measuredHeight;
                        if (child.align != "none") {
                            childMeasuredWidth += child.pixelMarginLeft + child.pixelMarginRight;
                        }
                        if (child.valign != "none") {
                            childMeasuredHeight += child.pixelMarginTop + child.pixelMarginBottom;
                        }
                        measuredWidth = Math.max(measuredWidth, childMeasuredWidth);
                        measuredHeight = Math.max(measuredHeight, childMeasuredHeight);
                    }
                }
                // if child is not valid
                else {
                    // tell child what maximum width/ height it can occupy
                    if (child.isMeasured) {
                        if ($type.isNumber(child.relativeWidth)) {
                            if (child.maxWidth != maxWidth) { // need to check this because of allValid
                                child.maxWidth = maxWidth;
                                allValid = false;
                            }
                        }
                        if ($type.isNumber(child.relativeHeight)) {
                            if (child.maxHeight != maxHeight) { // need to check this because of allValid
                                child.maxHeight = maxHeight;
                                allValid = false;
                            }
                        }
                    }
                }
            });
        }
        this._absoluteWidth = measuredWidth;
        this._absoluteHeight = measuredHeight;
        // arrange after measuring, only if all children are valid already
        if (allValid) {
            this.arrange();
        }
    };
    /**
     * Arranges children according to layout specs and available space / child
     * sizes.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.arrange = function () {
        var _this = this;
        var children = this.children;
        /*
           in this method we not only arrange children but also find out the size of the container
           it might seem it would be easier to get container size using sprite's measure method,
           however it would return only actual size of the bbox. However as each child meight have
           margins set, we need to check each child - we do it here.

           This method doesn't do anything with DOM, so it's not expensive
        */
        var measuredWidth = 0;
        var measuredHeight = 0;
        //let innerWidth: number = this.innerWidth; //$math.max(this.innerWidth, this._measuredWidth - paddingLeft - paddingRight);
        //let innerHeight: number = this.innerHeight; //$math.max(this.innerHeight, this._measuredHeight - paddingTop - paddingBottom);
        // above is wrong, as if a w/h is not specified, it is 0 and alignment doesn't work at all.
        var innerWidth = $math.max(this.innerWidth, this._absoluteWidth);
        var innerHeight = $math.max(this.innerHeight, this._absoluteHeight);
        var left; // = 0;
        var right; // = innerWidth;
        var top; // = 0;
        var bottom; // = innerHeight;
        var paddingLeft = this.pixelPaddingLeft;
        var paddingRight = this.pixelPaddingRight;
        var paddingTop = this.pixelPaddingTop;
        var paddingBottom = this.pixelPaddingBottom;
        var nextX = 0;
        var nextY = 0;
        var row = 0;
        var column = 0;
        var columnWidth = [];
        var rowHeight = [];
        var maxCellWidth;
        var minCellWidth;
        var columnCount;
        var maxWidth = this.maxWidth;
        var maxHeight = this.maxHeight;
        var minWidth = this.minWidth;
        var minHeight = this.minHeight;
        var childrenCopy = $array.copy(children.values);
        if (this.reverseOrder) {
            childrenCopy.reverse();
        }
        // GRID PRECALCULATIONS
        if (this.layout == "grid") {
            minCellWidth = maxWidth;
            maxCellWidth = 1;
            for (var i = 0, len = childrenCopy.length; i < len; i++) {
                var child = childrenCopy[i];
                if (child.isMeasured && !child.disabled && !child.__disabled) {
                    var childMeasuredWidth = child.measuredWidth;
                    if (childMeasuredWidth < minCellWidth) {
                        minCellWidth = childMeasuredWidth;
                    }
                    if (childMeasuredWidth > maxCellWidth) {
                        maxCellWidth = childMeasuredWidth;
                    }
                }
            }
            minCellWidth = $math.fitToRange(minCellWidth, 1, maxWidth);
            maxCellWidth = $math.fitToRange(maxCellWidth, 1, maxWidth);
            if (this.fixedWidthGrid) {
                columnCount = maxWidth / maxCellWidth;
            }
            else {
                columnCount = maxWidth / minCellWidth; // predicted number of columns, yes it is usually much more than real number, but we fix that later
            }
            columnCount = $math.max(1, Math.floor(columnCount));
            columnCount = $math.min(this.maxColumns, columnCount);
            columnWidth = this.getColumnWidth(childrenCopy, columnCount, maxCellWidth);
        }
        var contentLeft;
        var contentRight;
        var contentTop;
        var contentBottom;
        // we itterate through array of children
        // TODO use iterator instead
        for (var i = 0, len = childrenCopy.length; i < len; i++) {
            var child = childrenCopy[i];
            if (child.isMeasured && !child.disabled && !child.__disabled) {
                var x = undefined; //child.pixelX; // must reset
                var y = undefined; //child.pixelY; // must reset
                var childMarginLeft = child.pixelMarginLeft;
                var childMarginRight = child.pixelMarginRight;
                var childMarginTop = child.pixelMarginTop;
                var childMarginBottom = child.pixelMarginBottom;
                var childWidth = child.measuredWidth;
                var childHeight = child.measuredHeight;
                var childLeft = void 0;
                var childRight = void 0;
                var childTop = void 0;
                var childBottom = void 0;
                switch (this.layout) {
                    case "none":
                        break;
                    // absolute layout
                    case "absolute":
                        // horizontal alignment
                        switch (child.align) {
                            case "left":
                                x = childMarginLeft - child.maxLeft;
                                break;
                            case "center":
                                x = (innerWidth - childWidth) / 2 - child.maxLeft;
                                break;
                            case "right":
                                x = innerWidth - childMarginRight - child.maxRight;
                                break;
                            default:
                                if (!(child.x instanceof Percent)) {
                                    x = child.pixelX;
                                }
                                break;
                        }
                        // vertical alignment
                        switch (child.valign) {
                            case "top":
                                y = childMarginTop - child.maxTop;
                                break;
                            case "middle":
                                y = (innerHeight - childHeight) / 2 - child.maxTop;
                                break;
                            case "bottom":
                                y = innerHeight - childMarginBottom - child.maxBottom;
                                break;
                            default:
                                if (!(child.y instanceof Percent)) {
                                    y = child.pixelY;
                                }
                                break;
                        }
                        break;
                    // vertical layout
                    case "vertical":
                        //if ($type.isNumber(child.relativeHeight)) {
                        //	childHeight = child.maxHeight;
                        //}
                        switch (child.align) {
                            case "left":
                                x = childMarginLeft - child.maxLeft;
                                break;
                            case "center":
                                x = (innerWidth - childWidth) / 2 - child.maxLeft;
                                break;
                            case "right":
                                x = innerWidth - childMarginRight - child.maxRight;
                                break;
                            default:
                                x = child.pixelX;
                                break;
                        }
                        y = nextY + childMarginTop - child.maxTop;
                        nextY = y + child.maxBottom + childMarginBottom;
                        break;
                    // horizontal layout
                    case "horizontal":
                        //if ($type.isNumber(child.relativeHeight)) {
                        //	childHeight = child.maxHeight;
                        //}
                        switch (child.valign) {
                            case "top":
                                y = childMarginTop - child.maxTop;
                                break;
                            case "middle":
                                y = (innerHeight - childHeight) / 2 - child.maxTop;
                                break;
                            case "bottom":
                                y = innerHeight - childMarginBottom - child.maxBottom;
                                break;
                            default:
                                y = child.pixelY;
                                break;
                        }
                        x = nextX + childMarginLeft - child.maxLeft;
                        nextX = x + child.maxRight + childMarginRight;
                        break;
                    case "grid":
                        x = nextX + childMarginLeft - child.maxLeft;
                        switch (child.valign) {
                            case "top":
                                y = nextY + childMarginTop - child.maxTop;
                                break;
                            case "middle":
                                y = nextY + (innerHeight - childHeight) / 2 - child.maxTop;
                                break;
                            case "bottom":
                                y = nextY + innerHeight - childMarginBottom - child.maxBottom;
                                break;
                            default:
                                y = nextY - child.maxTop;
                                break;
                        }
                        nextX += columnWidth[column];
                        rowHeight[row] = $math.max(rowHeight[row], childHeight);
                        column++;
                        var nextColumnWidth = columnWidth[column];
                        if (!$type.isNumber(nextColumnWidth)) {
                            nextColumnWidth = maxCellWidth;
                        }
                        if (nextX > $math.min(this.innerWidth, maxWidth) - nextColumnWidth + 1 && column < columnCount) {
                            columnCount = column;
                            nextX = 0;
                            nextY = 0;
                            row = 0;
                            column = 0;
                            columnWidth = this.getColumnWidth(childrenCopy, columnCount, maxCellWidth);
                            rowHeight = [];
                            i = -1;
                            continue;
                        }
                        if (column >= columnCount) {
                            column = 0;
                            nextY += rowHeight[row];
                            row++;
                            nextX = 0;
                        }
                        break;
                }
                if (this.layout !== "none") {
                    child.moveTo({ x: x, y: y }); // must use moveTo, otherwise x/y set in percent won't work
                    childLeft = x + child.maxLeft - childMarginLeft;
                    childRight = x + child.maxRight + childMarginRight;
                    childTop = y + child.maxTop - childMarginTop;
                    childBottom = y + child.maxBottom + childMarginBottom;
                    if (childRight > right || !$type.isNumber(right)) {
                        right = childRight;
                    }
                    if (childLeft < left || !$type.isNumber(left)) {
                        left = childLeft;
                    }
                    if (childTop < top || !$type.isNumber(top)) {
                        top = childTop;
                    }
                    if (childBottom > bottom || !$type.isNumber(bottom)) {
                        bottom = childBottom;
                    }
                    if (childRight > contentRight || !$type.isNumber(contentRight)) {
                        contentRight = childRight;
                    }
                    if (childLeft < contentLeft || !$type.isNumber(contentLeft)) {
                        contentLeft = childLeft;
                    }
                    if (childTop < contentTop || !$type.isNumber(contentTop)) {
                        contentTop = childTop;
                    }
                    if (childBottom > contentBottom || !$type.isNumber(contentBottom)) {
                        contentBottom = contentBottom;
                    }
                }
            }
            else {
                child.validatePosition();
            }
        }
        if (this.layout == "none") {
            var noneBBox = this.bbox;
            left = noneBBox.x;
            right = noneBBox.x + noneBBox.width;
            top = noneBBox.y;
            bottom = noneBBox.y + noneBBox.height;
        }
        if (!$type.isNumber(left)) {
            left = 0;
            contentLeft = 0;
        }
        if (!$type.isNumber(right)) {
            right = this._availableWidth;
            contentRight = right;
        }
        if (!$type.isNumber(top)) {
            top = 0;
            contentTop = 0;
        }
        if (!$type.isNumber(bottom)) {
            bottom = this._availableHeight;
            contentBottom = bottom;
        }
        if (!$type.isNumber(contentTop)) {
            contentTop = 0;
        }
        if (!$type.isNumber(contentBottom)) {
            contentBottom = contentTop;
        }
        if (!$type.isNumber(contentLeft)) {
            contentLeft = 0;
        }
        if (!$type.isNumber(contentRight)) {
            contentRight = contentLeft;
        }
        measuredWidth = right - left;
        measuredHeight = bottom - top;
        if ($type.isNumber(this.relativeWidth)) {
            measuredWidth = maxWidth - paddingLeft - paddingRight;
            left = 0;
            right = measuredWidth;
        }
        if ($type.isNumber(this.relativeHeight)) {
            measuredHeight = maxHeight - paddingTop - paddingBottom;
            top = 0;
            bottom = measuredHeight;
        }
        if ($type.isNumber(this._pixelWidth)) {
            left = 0;
            measuredWidth = this._pixelWidth - paddingLeft - paddingRight;
        }
        if ($type.isNumber(minWidth) && measuredWidth < minWidth) {
            left = 0;
            measuredWidth = this.minWidth - paddingLeft - paddingRight;
        }
        if ($type.isNumber(this._pixelHeight)) {
            top = 0;
            measuredHeight = this._pixelHeight - paddingTop - paddingBottom;
        }
        if ($type.isNumber(minHeight) && measuredHeight < minHeight) {
            top = 0;
            measuredHeight = minHeight - paddingTop - paddingBottom;
        }
        var measuredContentWidth = contentRight - contentLeft;
        var measuredContentHeight = contentBottom - contentTop;
        /// handle content alignment
        if (this.layout != "none" && (this.contentAlign || this.contentValign) && children.length > 0) {
            var dx_1;
            var dy_1;
            var mwa = measuredWidth;
            var mha = measuredHeight;
            if (mwa < measuredContentWidth) {
                mwa = measuredContentWidth;
            }
            if (mha < measuredContentHeight) {
                mha = measuredContentHeight;
            }
            if (this.contentAlign == "center") {
                dx_1 = (mwa - measuredContentWidth) / 2;
            }
            if (this.contentAlign == "right") {
                dx_1 = mwa - measuredContentWidth;
            }
            if (this.contentValign == "middle") {
                dy_1 = (mha - measuredContentHeight) / 2;
            }
            if (this.contentValign == "bottom") {
                dy_1 = mha - measuredContentHeight;
            }
            if ($type.isNumber(dx_1)) {
                $iter.each(children.iterator(), function (child) {
                    var childLeft = child.maxLeft;
                    var ddx = dx_1;
                    if (_this.layout == "horizontal") {
                        child.x = child.pixelX + ddx;
                    }
                    // individual grid elements can not be aligned vertically, that's why it's different from horizontal
                    if (_this.layout == "grid") {
                        child.x = child.pixelX + ddx;
                    }
                    if (_this.layout == "vertical") {
                        ddx += child.pixelMarginLeft;
                        if (child.align == "none") {
                            child.x = ddx - childLeft;
                        }
                    }
                    if (_this.layout == "absolute") {
                        ddx += child.pixelMarginLeft;
                        if (child.align == "none") {
                            child.x = ddx - childLeft;
                        }
                    }
                });
            }
            if ($type.isNumber(dy_1)) {
                $iter.each(children.iterator(), function (child) {
                    var childTop = child.maxTop;
                    var ddy = dy_1;
                    if (_this.layout == "horizontal") {
                        ddy += child.pixelMarginTop;
                        if (child.valign == "none") {
                            child.y = ddy - childTop;
                        }
                    }
                    // individual grid elements can not be aligned vertically, that's why it's different from horizontal
                    if (_this.layout == "grid") {
                        ddy += child.pixelMarginTop;
                        child.y = ddy - childTop;
                    }
                    if (_this.layout == "vertical") {
                        child.y = child.pixelY + ddy;
                    }
                    if (_this.layout == "absolute") {
                        ddy += child.pixelMarginTop;
                        if (child.valign == "none") {
                            child.y = ddy - childTop;
                        }
                    }
                });
            }
        }
        var oldBBox = this.bbox;
        // this will mess up maxw/maxh set by container layout, we need a separate min/maxwidth for users
        // this prevents invalidating layout in such cases as scrolling category axis, when labels go outside bounds and results transformed event
        // todo: need to check if this doesn't cause other problems.
        //if (this.maxWidth > 0) {
        //measuredWidth = $math.min(measuredWidth, this.maxWidth);
        //measuredWidth = $math.max(measuredWidth, this.minWidth);
        //}
        //if (this.maxHeight > 0) {
        //measuredHeight = $math.min(measuredHeight, this.maxHeight);
        //measuredHeight = $math.max(measuredHeight, this.minHeight);
        //}
        measuredWidth = $math.max(measuredWidth, minWidth);
        measuredHeight = $math.max(measuredHeight, minHeight);
        this.contentWidth = measuredWidth;
        this.contentHeight = measuredHeight;
        // new
        measuredWidth = $math.min(measuredWidth, maxWidth);
        measuredHeight = $math.min(measuredHeight, maxHeight);
        this._bbox = { x: left, y: top, width: measuredWidth, height: measuredHeight };
        var prevLeft = this.maxLeft;
        var prevTop = this.maxTop;
        var prevBotttom = this.maxBottom;
        var prevRight = this.maxRight;
        this.measure();
        if (prevLeft != this.maxLeft || prevRight != this.maxRight || prevTop != this.maxTop || prevBotttom != this.maxBottom) {
            if (this.events.isEnabled("transformed")) {
                var event_1 = {
                    type: "transformed",
                    target: this
                };
                if (oldBBox) {
                    event_1.dummyData = oldBBox.width + " " + measuredWidth + "  " + oldBBox.height + " " + measuredHeight;
                }
                this.events.dispatchImmediately("transformed", event_1);
            }
        }
        this.dispatchImmediately("layoutvalidated");
    };
    /**
     * Positions element according its center settings.
     *
     * @todo Description (review)
     * @ignore Exclude from docs
     */
    Container.prototype.updateCenter = function () {
        _super.prototype.updateCenter.call(this);
        this.updateBackground();
    };
    /**
     * Update the background to fit into specific dimensions.
     *
     * @ignore Exclude from docs
     * @todo Make it protected?
     */
    Container.prototype.updateBackground = function () {
        var background = this._background; // accessing protected, as getter creates instance if it doesn't exist
        if (background) {
            background.x = this.maxLeft;
            background.y = this.maxTop;
            background.width = this.maxRight - this.maxLeft;
            background.height = this.maxBottom - this.maxTop;
        }
    };
    /**
     * Returns widths of all columns in a horizontal Container layout.
     *
     * @ignore Exclude from docs
     * @param columnCount   Number of columns
     * @param maxCellWidth  Maximum width of one grid cell
     * @return An array of column widths
     */
    Container.prototype.getColumnWidth = function (children, columnCount, maxCellWidth) {
        var _this = this;
        var columnWidth = [];
        var column = 0;
        $array.each(children, function (child) {
            if (child.isMeasured && !child.disabled && !child.__disabled) {
                if (_this.fixedWidthGrid) {
                    columnWidth[column] = maxCellWidth;
                }
                else {
                    columnWidth[column] = $math.max(columnWidth[column], child.measuredWidth + child.pixelMarginRight + child.pixelMarginLeft);
                }
                column++;
                if (column == columnCount) {
                    column = 0;
                }
            }
        });
        return columnWidth;
    };
    Object.defineProperty(Container.prototype, "layout", {
        /**
         * @return Layout
         */
        get: function () {
            return this.getPropertyValue("layout");
        },
        /**
         * Container layout.
         *
         * Options: "absolute" (default), "vertical", "horizontal", "grid", "none". "none" is quite the same as "absolute" - the objects will
         * be positioned at their x, y coordinates, the difference is that with "absolute" you can still use align/valign for children and with "none" you can not.
         * Use "none" as much as you can as it's most cpu-saving layout.
         *
         * @default "absolute"
         * @param value Layout
         */
        set: function (value) {
            if (this.setPropertyValue("layout", value)) {
                this.invalidateLayout();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "contentValign", {
        /**
         * @return Vertical alignment
         */
        get: function () {
            return this.getPropertyValue("contentValign");
        },
        /**
         * Vertical alignment of the elements for the vertical Container.
         *
         * This is used when Container is larger than the height of all its children.
         *
         * @param value vertical alignment
         */
        set: function (value) {
            this.setPropertyValue("contentValign", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "contentAlign", {
        /**
         * @return Horizontal alignment
         */
        get: function () {
            return this.getPropertyValue("contentAlign");
        },
        /**
         * Horizontal alignment of the elements for the horizontal Container.
         *
         * This is used when Container is larger than the height of all its children.
         *
         * @param value  Horizontal alignment
         */
        set: function (value) {
            this.setPropertyValue("contentAlign", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "fixedWidthGrid", {
        /**
         * @return Should use fixed width grid?
         */
        get: function () {
            return this.getPropertyValue("fixedWidthGrid");
        },
        /**
         * Controls if the grid of the Container should use fixed width. Fixed width
         * grid will divide available space to all its columns/rows equally, without
         * adapting to actual child sizes or size requirements.
         *
         * @default false
         * @param value  Should use fixed width grid?
         */
        set: function (value) {
            this.setPropertyValue("fixedWidthGrid", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "maxColumns", {
        /**
         * @return Should use fixed width grid?
         */
        get: function () {
            return this.getPropertyValue("maxColumns");
        },
        /**
         * Maximum number of columns (when using `"grid"` layout).
         *
         * @param value  Should use fixed width grid?
         */
        set: function (value) {
            this.setPropertyValue("maxColumns", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "reverseOrder", {
        /**
         * @return Reverse children?
         */
        get: function () {
            return this.getPropertyValue("reverseOrder");
        },
        /**
         * If set to `true`, the children of the container will be drawn in reverse
         * order.
         *
         * @default false
         * @param value  Reverse children?
         */
        set: function (value) {
            this.setPropertyValue("reverseOrder", value, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "setStateOnChildren", {
        /**
         * @return Set state on children
         */
        get: function () {
            return this.getPropertyValue("setStateOnChildren");
        },
        /**
         * Specifies if, when state is applied on this container, the same state
         * should be applied to container's children as well as `background`.
         *
         * @default false
         * @param value  Set state on children
         */
        set: function (value) {
            this.setPropertyValue("setStateOnChildren", value, true);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Checks if point is within bounds of a container.
     *
     * @param point  A coordinate to check
     * @return `true` if it fits within container
     */
    Container.prototype.fitsToBounds = function (point) {
        var x = point.x;
        var y = point.y;
        var deviation = 0.5; // sometimes coordinates are rounded to numbers like .999 so we add deviation here
        if (x >= -deviation && x <= this.pixelWidth + deviation && y >= -deviation && y <= this.pixelHeight + deviation) {
            return true;
        }
        else {
            return false;
        }
    };
    /**
     * Copies all properties from different Container, including background
     * clone.
     *
     * @param source  Source Container to copy from
     */
    Container.prototype.copyFrom = function (source) {
        var _this = this;
        _super.prototype.copyFrom.call(this, source);
        this.layout = source.layout;
        this.setStateOnChildren = source.setStateOnChildren;
        if (source._background) {
            this.background = source._background.clone();
            this.background.copyFrom(source._background); // won't work without this
        }
        $iter.each(source.children.iterator(), function (child) {
            if (child.shouldClone) {
                var clonedChild = child.clone();
                clonedChild.parent = _this;
            }
        });
    };
    Object.defineProperty(Container.prototype, "preloader", {
        /**
         * @return Preloader instance
         */
        get: function () {
            var preloader = this._preloader;
            if (preloader) {
                return preloader;
            }
            else if (this.parent) {
                return this.parent.preloader;
            }
        },
        /**
         * A [[Preloader]] instance to be used when Container is busy.
         *
         * @param preloader  Preloader instance
         */
        set: function (preloader) {
            if (this._preloader) {
                this.removeDispose(this._preloader);
            }
            this._preloader = preloader;
            if (preloader) {
                preloader.parent = this.tooltipContainer;
                this._disposers.push(preloader);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Sets [[Paper]] instance to use to draw elements.
     * @ignore
     * @param paper Paper
     * @return true if paper was changed, false, if it's the same
     */
    Container.prototype.setPaper = function (paper) {
        var _this = this;
        var changed = _super.prototype.setPaper.call(this, paper);
        if (changed) {
            if (this._background) {
                this._background.paper = paper;
                this._background.topParent = this.topParent;
            }
            this.children.each(function (child) {
                child.setPaper(paper);
                child.topParent = _this.topParent;
            });
        }
        return changed;
    };
    /**
     * Removes Container from the system-wide list of invalid Containers.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.removeFromInvalids = function () {
        _super.prototype.removeFromInvalids.call(this);
        registry.removeFromInvalidLayouts(this);
    };
    /**
     * Sets a [[DataItem]] to be used as data for the Container.
     *
     * @todo Description
     * @param dataItem DataItem
     */
    Container.prototype.setDataItem = function (dataItem) {
        // this place is potentially dangerous, as if we set datItem for some dummy container, all children dataItems will be overriden
        // the main reason for doing this is that we need a setDataItem code to be called for each sprite, otherwise property fields won't be
        // applied. Also, getting dataItem from parent all the time is more expensive than saving value.
        if (this._dataItem != dataItem) {
            $iter.each(this.children.iterator(), function (child) {
                child.dataItem = dataItem;
            });
            if (this._background) {
                this._background.dataItem = dataItem;
            }
        }
        _super.prototype.setDataItem.call(this, dataItem);
    };
    /**
     * Measures the element.
     *
     * @ignore Exclude from docs
     */
    Container.prototype.measureElement = function () {
        if (this.disabled || this.isTemplate || this.layout == "none" || this.__disabled) {
            // void
        }
        else {
            this.validateLayout();
        }
    };
    Object.defineProperty(Container.prototype, "fontFamily", {
        /**
         * @return Font family
         */
        get: function () {
            return this.getPropertyValue("fontFamily");
        },
        /**
         * Font family to be used for the text.
         *
         * Parts of the text may override this setting using in-line formatting.
         *
         * @param value Font family value
         */
        set: function (value) {
            if (this.setPropertyValue("fontFamily", value, true)) {
                this.setSVGAttribute({ "font-family": value });
                this.invalidateLabels();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "fontSize", {
        /**
         * @return Font size
         */
        get: function () {
            return this.getPropertyValue("fontSize");
        },
        /**
         * Font size to be used for the text. The size can either be numeric, in
         * pixels, or other measurements.
         *
         * Parts of the text may override this setting using in-line formatting.
         *
         * @param value Font size value
         */
        set: function (value) {
            if (this.setPropertyValue("fontSize", value, true)) {
                this.setSVGAttribute({ "font-size": value });
                this.invalidateLabels();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * When fontSize of fontFamily changes we need to hard-invalidate all Labels of this container to position them properly.
     */
    Container.prototype.invalidateLabels = function () {
        this.children.each(function (child) {
            // can't import Label because of Circular dependencies
            if (child["hardInvalidate"]) {
                child["hardInvalidate"]();
                // this fixes firefox and viewport issue
                child.events.once("validated", child.handleValidate, child, false);
            }
            else if (child instanceof Container) {
                child.invalidateLabels();
            }
        });
    };
    Object.defineProperty(Container.prototype, "fontWeight", {
        /**
         * @return Font weight
         */
        get: function () {
            return this.getPropertyValue("fontWeight");
        },
        /**
         * Font weight to use for text.
         *
         * Parts of the text may override this setting using in-line formatting.
         *
         * @param value Font weight
         */
        set: function (value) {
            this.setPropertyValue("fontWeight", value);
            this.setSVGAttribute({ "font-weight": value });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Container.prototype, "textDecoration", {
        /**
         * @return Decoration
         */
        get: function () {
            return this.getPropertyValue("textDecoration");
        },
        /**
         * A text decoration to use for text.
         *
         * Parts of the text may override this setting using in-line formatting.
         *
         * @param value  Decoration
         */
        set: function (value) {
            this.setPropertyValue("textDecoration", value);
            this.setSVGAttribute({ "text-decoration": value });
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Disposes (destroys) the element and all its children.
     */
    Container.prototype.dispose = function () {
        if (this._background) {
            this._background.dispose();
        }
        this._shouldBeReady = [];
        this.disposeChildren();
        _super.prototype.dispose.call(this);
    };
    /**
     * Applies a [[SpriteState]] on this element.
     *
     * The first parameter can either be a name of the state or a [[SpriteState]]
     * instance.
     *
     * When run, this method will apply SVG properties defined in a
     * [[SpriteState]], but only those that are relevant to this particular
     * element, that is are listed in its respective `properties` array.
     *
     * @see {@link SpriteState}
     * @param value               A state - name key or instance
     * @param transitionDuration  Duration of the transition between current and new state
     * @param easing              An easing function
     */
    Container.prototype.setState = function (value, transitionDuration, easing) {
        var stateName = value;
        if (value instanceof SpriteState) {
            stateName = value.name;
        }
        if (this.setStateOnChildren) {
            $iter.each(this.children.iterator(), function (child) {
                child.setState(stateName, transitionDuration, easing);
                // not good to set it in child setState
                if (stateName != "active") {
                    child.isActive = false;
                }
            });
        }
        if (this._background) {
            this._background.setState(stateName);
        }
        if (this.setStateOnSprites.length) {
            $array.each(this.setStateOnSprites, function (item) {
                item.setState(stateName, transitionDuration, easing);
            });
        }
        return _super.prototype.setState.call(this, value, transitionDuration, easing);
    };
    // otherwise isActive won't work properly with background
    Container.prototype.setActive = function (value) {
        _super.prototype.setActive.call(this, value);
        if (this._background) {
            this._background.isActive = value;
        }
    };
    /**
     * Dispatches ready event. Dispatches when all children are ready.
     */
    Container.prototype.dispatchReady = function () {
        var _this = this;
        if (!this.isReady() && !this.isDisposed()) {
            var allReady_1 = true;
            $iter.eachContinue(this.children.iterator(), function (sprite) {
                if (!sprite.__disabled && !sprite.disabled && !sprite.isReady()) {
                    allReady_1 = false;
                    return false;
                }
                else {
                    return true;
                }
            });
            $array.eachContinue(this._shouldBeReady, function (sprite) {
                if (!sprite.__disabled && !sprite.disabled && !sprite.isReady()) {
                    allReady_1 = false;
                    return false;
                }
                else {
                    return true;
                }
            });
            if (allReady_1) {
                _super.prototype.dispatchReady.call(this);
            }
            else {
                registry.events.once("exitframe", function () {
                    _this.dispatchReady();
                    system.requestFrame();
                }, undefined, false);
            }
        }
    };
    /**
     * Called during the System.update method
     *
     * @ignore Exclude from docs
     */
    Container.prototype._systemUpdate = function (skippedSprites) {
        this.children.each(function (child) {
            if (child.invalid) {
                if (!child._systemCheckIfValidate()) {
                    skippedSprites.push(child);
                }
                else if (child.dataItem && child.dataItem.component && child.dataItem.component.dataInvalid) {
                    skippedSprites.push(child);
                }
                else {
                    child.validate();
                }
            }
        });
        _super.prototype._systemUpdate.call(this, skippedSprites);
    };
    /**
     * Called during the System.validatePositions method
     *
     * @ignore Exclude from docs
     */
    Container.prototype._systemValidatePositions = function () {
        this.children.each(function (sprite) {
            if (sprite.positionInvalid) {
                sprite.validatePosition();
            }
        });
        _super.prototype._systemValidatePositions.call(this);
    };
    /**
     * Called during the System.validateLayouts method
     *
     * @ignore Exclude from docs
     */
    Container.prototype._systemValidateLayouts = function () {
        if (this.layoutInvalid && !this.isDisposed()) {
            this.validateLayout();
        }
    };
    Object.defineProperty(Container.prototype, "tapToActivate", {
        /**
         * @return Enable touch protection?
         */
        get: function () {
            return this._tapToActivate;
        },
        /**
         * If set to `true` the chart's regular touch functionality will be suspended
         * so that the whole page it is located in remains scrollable, even when
         * swiping over the chart's body.
         *
         * User will need to tap the chart in order to activate its regular touch
         * functionality.
         *
         * The chart will remain "active" as long as user keeps interacting with the
         * chart. After `tapTimeout` milliseconds the chart will return to its
         * "protected" mode.
         *
         * @default false
         * @since 4.4.0
         * @param  value  Enable touch protection?
         * @see {@link https://www.amcharts.com/docs/v4/concepts/touch/} For more information.
         */
        set: function (value) {
            if (this._tapToActivate != value) {
                this.setTapToActivate(value);
            }
        },
        enumerable: true,
        configurable: true
    });
    Container.prototype.setTapToActivate = function (value) {
        var _this = this;
        this._tapToActivate = value;
        this.interactions.isTouchProtected = value;
        // setEventDisposer will also remove listeners if value == false
        if (value) {
            this.interactions.setEventDisposer("container-tapToActivate", value, function () { return new MultiDisposer([
                _this.events.on("hit", _this.handleTapToActivate, _this, false),
                _this.events.on("down", _this.initTapTimeout, _this, false),
                _this.events.on("track", _this.initTapTimeout, _this, false),
                //this.events.on("drag", this.initTapTimeout, this, false),
                getInteraction().body.events.on("down", function (ev) {
                    if (!getInteraction().isLocalElement(ev.pointer, _this.paper.svg, _this.uid)) {
                        _this.handleTapToActivateDeactivation();
                    }
                }, _this, false)
            ]); });
        }
        getInteraction();
    };
    /**
     * @todo Ignore on non-touch events
     */
    Container.prototype.handleTapToActivate = function () {
        this.interactions.isTouchProtected = false;
        this.initTapTimeout();
    };
    Container.prototype.handleTapToActivateDeactivation = function () {
        this.interactions.isTouchProtected = true;
    };
    Container.prototype.initTapTimeout = function () {
        var _this = this;
        if (this._tapToActivateTimeout) {
            this._tapToActivateTimeout.dispose();
        }
        if (this.tapToActivate && !this.interactions.isTouchProtected && this.tapTimeout) {
            this._tapToActivateTimeout = this.setTimeout(function () {
                _this.handleTapToActivateDeactivation();
            }, this.tapTimeout);
        }
    };
    /**
     * Moves the whole chart to other HTML container.
     *
     * `htmlElement` can either be a reference to a DOM element, or an id of
     * such element.
     *
     * @since 4.9.24
     * @param  htmlElement  Target element
     */
    Container.prototype.moveHtmlContainer = function (htmlElement) {
        var newContainer = $dom.getElement(htmlElement);
        if (newContainer) {
            this.htmlContainer = newContainer;
            var svgDiv = this.svgContainer;
            svgDiv.htmlElement = newContainer;
            svgDiv.htmlElement.appendChild(svgDiv.SVGContainer);
            svgDiv.initSensor();
            svgDiv.measure();
        }
        else if ($type.isString(htmlElement) && htmlElement != "") {
            system.log("html container '" + htmlElement + "' not found");
            //throw new Error("html container not found");
        }
    };
    /**
     * @ignore
     * @return Has license?
     */
    Container.prototype.hasLicense = function () {
        if (options.commercialLicense) {
            return true;
        }
        for (var i = 0; i < options.licenses.length; i++) {
            if (options.licenses[i].match(/^CH.{5,}/i)) {
                return true;
            }
        }
        return false;
    };
    return Container;
}(Sprite));
export { Container };
/**
 * Register class in system, so that it can be instantiated using its name from
 * anywhere.
 *
 * @ignore
 */
registry.registeredClasses["Container"] = Container;
//# sourceMappingURL=Container.js.map