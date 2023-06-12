/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { registry, is } from "./Registry";
import { Container } from "./Container";
import { raf } from "./utils/AsyncPending";
import { triggerIdle } from "./utils/AsyncPending";
import * as $array from "./utils/Array";
import * as $object from "./utils/Object";
import * as $log from "./utils/Log";
/**
 * ============================================================================
 * MAIN CLASS
 * ============================================================================
 * @hidden
 */
/**
 * The main class that handles system-wide tasks, like caching, heartbeats, etc.
 * @important
 */
var System = /** @class */ (function () {
    /**
     * Performs initialization of the System object.
     *
     * Called when the first [[Sprite]] object is created.
     *
     * @ignore Exclude from docs
     */
    function System() {
        /**
         * A flag indicating if the system is on pause.
         */
        this._isPaused = false;
        /**
         * Holds the list of currently playing animations.
         *
         * @ignore Exclude from docs
         */
        this.animations = [];
        /**
         * Unique ID of the object.
         */
        this.uid = registry.getUniqueId();
        /**
         * @todo Description
         * @todo Needed?
         * @ignore Exclude from docs
         */
        this.dummyCounter = 0;
        this._frameRequested = false;
        this.updateStepDuration = 45;
        this.time = Date.now();
    }
    /**
     * Reports time elapsed since timer was reset.
     *
     * @ignore Exclude from docs
     * @todo Needed?
     * @param msg    Message to report in console
     * @param reset  Reset time counter
     */
    System.prototype.reportTime = function (msg, reset) {
        if (this.dummyCounter < 6) {
            //console.log(Date.now() - this.time, msg, this.dummyCounter2);
        }
        if (reset) {
            this.time = Date.now();
        }
    };
    /**
     * Performs "heartbeat" operations `frameRate` number of times per second.
     *
     * When the chart element is invalidated, it is not immediately redrawn.
     *
     * Instead it waits for the next `update()` cycle to be re-validated.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    System.prototype.update = function () {
        var _this = this;
        if (this._isPaused) {
            return;
        }
        this._frameRequested = false;
        var time = Date.now();
        registry.dispatchImmediately("enterframe");
        //this.validateLayouts();
        //this.validatePositions();
        /*
                for (let key in registry.invalidLayouts) {
                    this.validateLayouts(key);
                }
                for (let key in registry.invalidPositions) {
                    this.validatePositions(key);
                }
        */
        var skippedComponents = [];
        // data objects first - do all calculations
        // only data is parsed in chunks, thats why we do for loop instead of a while like with other invalid items.
        // important to go backwards, as items are removed!
        // TODO use iterator instead
        for (var key in registry.invalidDatas) {
            if ($object.hasKey(registry.invalidDatas, key)) {
                var invalidData = registry.invalidDatas[key];
                while (invalidData.length > 0) {
                    var component = invalidData[0];
                    var dataProvider = component.dataProvider;
                    if (!component.isDisposed()) {
                        if (dataProvider && dataProvider.dataInvalid) {
                            try {
                                dataProvider.validateData();
                                if (dataProvider.dataValidationProgress < 1) {
                                    break;
                                }
                            }
                            catch (e) {
                                $array.remove(invalidData, dataProvider);
                                dataProvider.raiseCriticalError(e);
                            }
                        }
                        else {
                            try {
                                component.validateData();
                                if (component.dataValidationProgress < 1) {
                                    break;
                                }
                            }
                            catch (e) {
                                $array.remove(invalidData, component);
                                component.raiseCriticalError(e);
                            }
                        }
                    }
                    else {
                        $array.remove(invalidData, component);
                    }
                }
                if (Date.now() - time > this.updateStepDuration) {
                    break;
                }
            }
        }
        while (registry.invalidRawDatas.length > 0) {
            var component = registry.invalidRawDatas[0];
            if (!component.isDisposed()) {
                try {
                    component.validateRawData();
                }
                catch (e) {
                    $array.remove(registry.invalidRawDatas, component);
                    component.raiseCriticalError(e);
                }
            }
            else {
                $array.remove(registry.invalidRawDatas, component);
            }
        }
        // TODO use iterator instead
        while (registry.invalidDataItems.length > 0) {
            var component = registry.invalidDataItems[0];
            var dataProvider = component.dataProvider;
            // this is needed to avoid partial value validation when data is parsed in chunks
            if (component.isDisposed() || component.dataInvalid || (dataProvider && dataProvider.dataInvalid)) {
                // void
            }
            else {
                try {
                    component.validateDataItems();
                }
                catch (e) {
                    $array.remove(registry.invalidDataItems, component);
                    component.raiseCriticalError(e);
                }
            }
            // this might seem too much, as validateValues removes from invalidDataItems aswell, but just to be sure (in case validateData is overriden and no super is called)
            $array.remove(registry.invalidDataItems, component);
        }
        // TODO use iterator instead
        while (registry.invalidDataRange.length > 0) {
            var component = registry.invalidDataRange[0];
            var dataProvider = component.dataProvider;
            if (component.isDisposed() || component.dataInvalid || (dataProvider && dataProvider.dataInvalid)) {
                // void
            }
            else {
                try {
                    component.validateDataRange();
                    if (!component.skipRangeEvent) {
                        component.dispatchImmediately("datarangechanged");
                    }
                    component.skipRangeEvent = false;
                }
                catch (e) {
                    $array.remove(registry.invalidDataRange, component);
                    component.raiseCriticalError(e);
                }
            }
            // this might seem too much, as validateDataRange removes from invalidDataRange aswell, but just to be sure (in case validateData is overriden and no super is called)
            $array.remove(registry.invalidDataRange, component);
        }
        var skippedSprites = [];
        // display objects later
        // TODO use iterator instead
        $object.each(registry.invalidLayouts, function (key) {
            _this.validateLayouts(key);
        });
        $object.each(registry.invalidPositions, function (key) {
            _this.validatePositions(key);
        });
        var hasSkipped = false;
        time = Date.now();
        $object.each(registry.invalidSprites, function (key, invalidSprites) {
            var count = 0;
            while (invalidSprites.length > 0) {
                _this.validateLayouts(key);
                _this.validatePositions(key);
                count++;
                if (count == 5) {
                    if (Date.now() - time > _this.updateStepDuration) {
                        break;
                    }
                    count = 0;
                }
                var sprite = invalidSprites[invalidSprites.length - 1];
                // we need to check this, as validateLayout might validate sprite
                if (sprite && !sprite.isDisposed()) {
                    if (!sprite._systemCheckIfValidate()) {
                        // void
                        skippedSprites.push(sprite);
                    }
                    else {
                        if (!_this.checkIfValidate2(sprite)) {
                            // void
                            skippedSprites.push(sprite);
                        }
                        else {
                            try {
                                sprite._systemUpdate(skippedSprites);
                            }
                            catch (e) {
                                sprite.invalid = false;
                                $array.remove(invalidSprites, sprite);
                                sprite.raiseCriticalError(e);
                            }
                        }
                    }
                    // this might seem too much, but it's ok
                    sprite.invalid = false;
                }
                $array.remove(invalidSprites, sprite);
            }
            registry.invalidSprites[key] = registry.invalidSprites[key].concat(skippedSprites);
        });
        $object.each(registry.invalidSprites, function (key, value) {
            if (value.length > 0) {
                hasSkipped = true;
            }
        });
        $object.each(registry.invalidDatas, function (key, value) {
            if (value.length > 0) {
                hasSkipped = true;
            }
        });
        // TODO make this more efficient
        // TODO don't copy the array
        $array.each($array.copy(this.animations), function (x) {
            x.update();
        });
        //if(!hasSkipped){
        $object.each(registry.invalidLayouts, function (key) {
            _this.validateLayouts(key);
        });
        $object.each(registry.invalidPositions, function (key) {
            _this.validatePositions(key);
        });
        //}
        triggerIdle();
        $object.each(registry.invalidLayouts, function (key) {
            _this.validateLayouts(key);
        });
        $object.each(registry.invalidPositions, function (key) {
            _this.validatePositions(key);
        });
        registry.dispatchImmediately("exitframe");
        if (hasSkipped || this.animations.length > 0 || skippedComponents.length > 0) {
            this.requestFrame();
        }
        if (this.updateStepDuration < 200) {
            var all0_1 = true;
            $object.each(registry.invalidDatas, function (key, value) {
                if (value.length > 0) {
                    all0_1 = false;
                }
            });
            $object.each(registry.invalidSprites, function (key, value) {
                if (value.length > 0) {
                    all0_1 = false;
                }
            });
            if (all0_1) {
                this.updateStepDuration = 200;
            }
        }
    };
    System.prototype.checkIfValidate2 = function (sprite) {
        if (sprite.dataItem && sprite.dataItem.component && sprite.dataItem.component.dataInvalid && !sprite.dataItem.component.isTemplate) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
     * Requests new animation frame
     */
    System.prototype.requestFrame = function () {
        var _this = this;
        if (!this._frameRequested) {
            raf(function () {
                _this.update();
            });
            this._frameRequested = true;
        }
    };
    /**
     * Call this method if you update data or config of a chart that is in
     * hidden container, after revealing the container, so that labels and
     * possibly other elements can correctly arrange themselves.
     *
     * @since 4.7.10
     * @param  container  Target container
     */
    System.prototype.softInvalidate = function (container) {
        var _this = this;
        container.children.each(function (child) {
            if (child instanceof Container) {
                _this.softInvalidate(child);
            }
            if (child.measureFailed) {
                if (is(child, "Label")) {
                    child.hardInvalidate();
                }
                else {
                    child.invalidate();
                }
                child.measureFailed = false;
            }
        });
    };
    /**
     * Triggers position re-validation on all [[Sprite]] elements that have
     * invalid(ated) positions.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    System.prototype.validatePositions = function (id) {
        // invalid positions
        // TODO use iterator instead
        var invalidPositions = registry.invalidPositions[id];
        while (invalidPositions.length > 0) {
            var sprite = invalidPositions[invalidPositions.length - 1];
            if (!sprite.isDisposed()) {
                try {
                    sprite._systemValidatePositions();
                }
                catch (e) {
                    sprite.positionInvalid = false;
                    $array.remove(invalidPositions, sprite);
                    sprite.raiseCriticalError(e);
                }
            }
            else {
                $array.remove(invalidPositions, sprite);
            }
        }
    };
    /**
     * Triggers position re-validation on all [[Container]] elements that have
     * invalid(ated) layouts.
     *
     * @ignore Exclude from docs
     * @todo Maybe should be private?
     */
    System.prototype.validateLayouts = function (id) {
        // invalid positions
        // TODO use iterator instead
        var invalidLayouts = registry.invalidLayouts[id];
        while (invalidLayouts.length > 0) {
            var container = invalidLayouts[invalidLayouts.length - 1];
            if (!container.isDisposed()) {
                try {
                    container.children.each(function (sprite) {
                        sprite._systemValidateLayouts();
                    });
                    container.validateLayout();
                }
                catch (e) {
                    container.layoutInvalid = false;
                    $array.remove(invalidLayouts, container);
                    container.raiseCriticalError(e);
                }
            }
            else {
                $array.remove(invalidLayouts, container);
            }
        }
    };
    /**
     * Outputs string to console if `verbose` is `true`.
     *
     * @param value Message to output to console
     */
    System.prototype.log = function (value) {
        $log.log(value);
    };
    Object.defineProperty(System.prototype, "isPaused", {
        /**
         * @return Is system on pause?
         */
        get: function () {
            return this._isPaused;
        },
        /**
         * Pauses all the processes of all the amCharts objects on the page
         *
         * @return is paused?
         */
        set: function (value) {
            this._isPaused = value;
            if (!value) {
                this._frameRequested = false;
                this.requestFrame();
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * amCharts Version.
     *
     * This follows npm's semver specification.
     *
     * @see {@link https://docs.npmjs.com/misc/semver}
     */
    System.VERSION = "4.10.35";
    return System;
}());
export { System };
/**
 * A singleton global instance of [[System]].
 *
 * All code should use this, rather than instantiating their
 * own System objects.
 */
export var system = new System();
//# sourceMappingURL=System.js.map