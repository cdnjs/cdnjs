import { __read, __spread } from "tslib";
/**
 * ============================================================================
 * IMPORTS
 * ============================================================================
 * @hidden
 */
import { system } from "../System";
import { registry } from "../Registry";
import { Container } from "../Container";
import { Component } from "../Component";
import { Paper } from "../rendering/Paper";
import { SVGContainer, svgContainers } from "../rendering/SVGContainer";
import { FocusFilter } from "../rendering/filters/FocusFilter";
import { Preloader } from "../elements/Preloader";
import { AmChartsLogo } from "../elements/AmChartsLogo";
import { Tooltip } from "../elements/Tooltip";
import { Disposer, MultiDisposer } from "../utils/Disposer";
import { percent } from "./Percent";
import { options } from "../Options";
import * as $array from "./Array";
import * as $type from "./Type";
import * as $dom from "./DOM";
import * as $utils from "./Utils";
import * as $log from "./Log";
/**
 * ============================================================================
 * INSTANTIATION FUNCTIONS
 * ============================================================================
 * @hidden
 */
/**
 * Creates all HTML and SVG containers needed for the chart instance, as well
 * as the new [[Sprite]] (as specified in `classType` parameter).
 *
 * @param htmlElement  A container to creat elements in
 * @param classType    A class definition of the new element to create
 * @return Newly-created Sprite object
 */
function createChild(htmlElement, classType) {
    var htmlContainer = $dom.getElement(htmlElement);
    // If there's no container available yet, we create a fake one
    var tmpContainer = false;
    if (!htmlContainer) {
        htmlContainer = document.createElement("div");
        htmlContainer.style.width = "200px";
        htmlContainer.style.height = "200px";
        htmlContainer.style.top = "0";
        htmlContainer.style.left = "0";
        htmlContainer.style.visibility = "hidden";
        htmlContainer.style.position = "absolute";
        document.body.appendChild(htmlContainer);
        tmpContainer = true;
    }
    if (htmlContainer) {
        htmlContainer.innerHTML = "";
        //htmlContainer.style.overflow = "hidden";
        var svgDiv_1 = new SVGContainer(htmlContainer);
        var paper = new Paper(svgDiv_1.SVGContainer, "svg-" + (svgContainers.length - 1));
        // the approach with masks is chosen because overflow:visible is set on SVG element in order tooltips could go outside
        // svg area - this is often needed when working with small charts.
        // main container which holds content container and tooltips container
        var container_1 = new Container();
        container_1.htmlContainer = htmlContainer;
        container_1.svgContainer = svgDiv_1;
        container_1.width = percent(100);
        container_1.height = percent(100);
        container_1.background.fillOpacity = 0;
        container_1.paper = paper;
        paper.append(container_1.group);
        // Set up moving to proper element container if it's not yet ready at call time
        if (tmpContainer) {
            $dom.ready(function () {
                container_1.moveHtmlContainer(htmlElement);
            });
        }
        // this is set from parent container, but this one doesn't have, so do it manually.
        container_1.relativeWidth = 1;
        container_1.relativeHeight = 1;
        svgDiv_1.container = container_1;
        // creating classType instance
        var sprite_1 = container_1.createChild(classType);
        sprite_1.topParent = container_1;
        var uid = sprite_1.uid;
        registry.invalidSprites[uid] = [];
        registry.invalidDatas[uid] = [];
        registry.invalidPositions[uid] = [];
        registry.invalidLayouts[uid] = [];
        container_1.baseId = uid;
        sprite_1.isBaseSprite = true;
        sprite_1.focusFilter = new FocusFilter();
        registry.baseSprites.push(sprite_1);
        registry.baseSpritesByUid[uid] = sprite_1;
        sprite_1.maskRectangle = { x: 0, y: 0, width: Math.max(svgDiv_1.width || 0, 0), height: Math.max(svgDiv_1.height || 0, 0) };
        // this solves issues with display:none, as all children are measured as 0x0
        container_1.events.on("maxsizechanged", function (event) {
            if (event.previousWidth == 0 || event.previousHeight == 0) {
                container_1.deepInvalidate();
            }
            if (sprite_1.maskRectangle) {
                sprite_1.maskRectangle = { x: 0, y: 0, width: Math.max(svgDiv_1.width || 0, 0), height: Math.max(svgDiv_1.height || 0, 0) };
            }
        });
        var loopTimer_1 = null;
        // Checks to see whether the chart was properly disposed or not
        var loop_1 = function () {
            if (!sprite_1.isDisposed()) {
                if ($dom.getRoot(sprite_1.dom) == null) {
                    if (options.autoDispose) {
                        container_1.htmlContainer = undefined;
                        svgDiv_1.htmlElement = undefined;
                        sprite_1.dispose();
                    }
                    else {
                        $log.warn("Chart was not disposed", sprite_1.uid);
                    }
                    loopTimer_1 = null;
                }
                else {
                    loopTimer_1 = window.setTimeout(loop_1, 1000);
                }
            }
            else {
                loopTimer_1 = null;
            }
        };
        loop_1();
        sprite_1.addDisposer(new Disposer(function () {
            if (loopTimer_1 !== null) {
                clearTimeout(loopTimer_1);
            }
            $array.remove(registry.baseSprites, sprite_1);
            registry.baseSpritesByUid[sprite_1.uid] = undefined;
        }));
        // TODO figure out a better way of doing this
        sprite_1.addDisposer(container_1);
        // tooltip container
        var tooltipContainer_1 = container_1.createChild(Container);
        tooltipContainer_1.topParent = container_1;
        tooltipContainer_1.width = percent(100);
        tooltipContainer_1.height = percent(100);
        tooltipContainer_1.isMeasured = false;
        container_1.tooltipContainer = tooltipContainer_1;
        sprite_1.tooltip = new Tooltip();
        sprite_1.tooltip.hide(0);
        sprite_1.tooltip.setBounds({ x: 0, y: 0, width: tooltipContainer_1.maxWidth, height: tooltipContainer_1.maxHeight });
        tooltipContainer_1.events.on("maxsizechanged", function () {
            $type.getValue(sprite_1.tooltip).setBounds({ x: 0, y: 0, width: tooltipContainer_1.maxWidth, height: tooltipContainer_1.maxHeight });
        }, undefined, false);
        //@todo: maybe we don't need to create one by default but only on request?
        var preloader_1 = new Preloader();
        preloader_1.events.on("inited", function () {
            preloader_1.__disabled = true;
        }, undefined, false);
        container_1.preloader = preloader_1;
        //if (!options.commercialLicense) {
        if (sprite_1 instanceof Container && !sprite_1.hasLicense()) {
            var logo_1 = tooltipContainer_1.createChild(AmChartsLogo);
            tooltipContainer_1.events.on("maxsizechanged", function (ev) {
                if ((tooltipContainer_1.maxWidth <= 100) || (tooltipContainer_1.maxHeight <= 50)) {
                    logo_1.hide();
                }
                else if (logo_1.isHidden || logo_1.isHiding) {
                    logo_1.show();
                }
            }, undefined, false);
            sprite_1.logo = logo_1;
            logo_1.align = "left";
            logo_1.valign = "bottom";
        }
        $utils.used(sprite_1.numberFormatter); // need to create one.
        // Set this as an autonomouse instance
        // Controls like Preloader, Export will use this.
        container_1.isStandaloneInstance = true;
        if (options.onlyShowOnViewport) {
            if (!$dom.isElementInViewport(htmlContainer, options.viewportTarget)) {
                sprite_1.__disabled = true;
                sprite_1.tooltipContainer.__disabled = true;
                var disposers = [
                    $dom.addEventListener(window, "DOMContentLoaded", function () { viewPortHandler(sprite_1); }),
                    $dom.addEventListener(window, "load", function () { viewPortHandler(sprite_1); }),
                    $dom.addEventListener(window, "resize", function () { viewPortHandler(sprite_1); }),
                    $dom.addEventListener(window, "scroll", function () { viewPortHandler(sprite_1); })
                ];
                if (options.viewportTarget) {
                    var targets = $type.isArray(options.viewportTarget) ? options.viewportTarget : options.viewportTarget ? [options.viewportTarget] : [];
                    for (var i = 0; i < targets.length; i++) {
                        var target = targets[i];
                        disposers.push($dom.addEventListener(target, "resize", function () { viewPortHandler(sprite_1); }));
                        disposers.push($dom.addEventListener(target, "scroll", function () { viewPortHandler(sprite_1); }));
                    }
                }
                var disposer = new MultiDisposer(disposers);
                sprite_1.addDisposer(disposer);
                sprite_1.vpDisposer = disposer;
            }
            else if (options.queue) {
                addToQueue(sprite_1);
            }
        }
        else if (options.queue) {
            addToQueue(sprite_1);
        }
        return sprite_1;
    }
    else {
        system.log("html container not found");
        throw new Error("html container not found");
    }
}
/**
 * Disposes all of the currently active charts.
 */
export function disposeAllCharts() {
    while (registry.baseSprites.length !== 0) {
        registry.baseSprites.pop().dispose();
    }
}
export function addToQueue(sprite) {
    if (registry.queue.indexOf(sprite) == -1) {
        sprite.__disabled = true;
        sprite.tooltipContainer.__disabled = true;
        sprite.events.disableType("appeared");
        if (registry.queue.length == 0) {
            registry.events.once("exitframe", function () {
                queueHandler(sprite);
            });
            system.requestFrame();
        }
        sprite.addDisposer(new Disposer(function () {
            removeFromQueue(sprite);
        }));
        registry.queue.push(sprite);
    }
}
export function removeFromQueue(sprite) {
    var index = registry.queue.indexOf(sprite);
    if (index >= 0) {
        registry.queue.splice(registry.queue.indexOf(sprite), 1);
        var nextSprite = registry.queue[index];
        if (nextSprite) {
            queueHandler(nextSprite);
        }
    }
}
/**
 * Checks whether the chart was not initialized fully due to setting
 * of `onlyShowOnViewport`. If it hasn't and is now in the viewport
 * the chart will be initialized.
 *
 * @since 4.9.12
 * @param  sprite  Top-level chart object
 */
export function viewPortHandler(sprite) {
    if (sprite.__disabled && $dom.isElementInViewport(sprite.htmlContainer, options.viewportTarget)) {
        if (sprite.vpDisposer) {
            sprite.vpDisposer.dispose();
        }
        addToQueue(sprite);
    }
}
export function queueHandler(sprite) {
    if (sprite && sprite.tooltipContainer) {
        sprite.__disabled = false;
        sprite.tooltipContainer.__disabled = false;
        sprite.events.enableType("appeared");
        sprite.dispatch("removedfromqueue");
        if (sprite.showOnInit) {
            sprite.events.on("appeared", function () {
                removeFromQueue(sprite);
            });
        }
        if (sprite.vpDisposer) {
            sprite.vpDisposer.dispose();
        }
        if (sprite instanceof Container) {
            sprite.invalidateLabels();
        }
        if (sprite.tooltipContainer) {
            sprite.tooltipContainer.invalidateLayout();
        }
        if (sprite instanceof Component) {
            sprite.invalidateData();
            sprite.reinit();
            sprite.events.once("datavalidated", function () {
                if (sprite.showOnInit) {
                    sprite.appear();
                }
                else {
                    removeFromQueue(sprite);
                }
            });
        }
        else {
            sprite.reinit();
            sprite.events.once("inited", function () {
                removeFromQueue(sprite);
            });
            if (sprite.showOnInit) {
                sprite.appear();
            }
        }
    }
}
/**
 * A shortcut to creating a chart instance.
 *
 * The first argument is either a reference to or an id of a DOM element to be
 * used as a container for the chart.
 *
 * The second argument is the type reference of the chart type. (for plain
 * JavaScript users this can also be a string indicating chart type)
 *
 * ```TypeScript
 * let chart = am4core.create("chartdiv", am4charts.PieChart);
 * ```
 * ```JavaScript
 * // Can pass in chart type reference like this:
 * var chart = am4core.create("chartdiv", am4charts.PieChart);
 *
 * // ... or chart class type as a string:
 * var chart = am4core.create("chartdiv", "PieChart");
 * ```
 *
 * @param htmlElement  Reference or id of the target container element
 * @param classType    Class type of the target chart type
 * @return Chart instance
 */
export function create(htmlElement, classType) {
    // This is a nasty hack for the benefit of vanilla JS users, who do not
    // enjoy benefits of type-check anyway.
    // We're allowing passing in a name of the class rather than type reference
    // itself.
    var classError;
    if ($type.isString(classType)) {
        if ($type.hasValue(registry.registeredClasses[classType])) {
            classType = registry.registeredClasses[classType];
        }
        else {
            classType = registry.registeredClasses["Container"];
            classError = new Error("Class [" + classType + "] is not loaded.");
        }
    }
    // Create the chart
    var chart = createChild(htmlElement, classType);
    // Error?
    if (classError) {
        chart.raiseCriticalError(classError);
    }
    return chart;
}
/**
 * A shortcut to creating a chart from a config object.
 *
 * Example:
 *
 * ```TypeScript
 * let chart am4core.createFromConfig({ ... }, "chartdiv", am4charts.XYChart );
 * ```
 * ```JavaScript
 * var chart am4core.createFromConfig({ ... }, "chartdiv", "XYChart" );
 * ```
 *
 * If `chartType` parameter is not supplied it must be set in a config object,
 * via reference to chart type, e.g.:
 *
 * ```TypeScript
 * {
 *   "type": am4charts.XYChart,
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": am4charts.XYChart,
 *   // ...
 * }
 * ```
 *
 * Or via string: (if you are using JavaScript)
 *
 * ```TypeScript
 * {
 *   "type": "XYChart",
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": "XYChart",
 *   // ...
 * }
 * ```
 *
 * A `container` can either be a reference to an HTML container to put chart
 * in, or it's unique id.
 *
 * If `container` is not specified, it must be included in the config object:
 *
 * ```TypeScript
 * {
 *   "type": "XYChart",
 *   "container": "chartdiv",
 *   // ...
 * }
 * ```
 * ```JavaScript
 * {
 *   "type": "XYChart",
 *   "container": "chartdiv",
 *   // ...
 * }
 * ```
 *
 * @param config       Config object in property/value pairs
 * @param htmlElement  Container reference or ID
 * @param objectType   Chart type
 * @return A newly created chart instance
 * @todo Throw exception if type is not correct
 */
export function createFromConfig(config, htmlElement, classType) {
    // Extract chart type from config if necessary
    if (!$type.hasValue(classType)) {
        classType = config.type;
        delete config.type;
    }
    // Extract element from config if necessary
    if (!$type.hasValue(htmlElement)) {
        htmlElement = config.container;
        delete config.container;
    }
    // Check if we need to extract actual type reference
    var finalType;
    var classError;
    if ($type.isString(classType) && $type.hasValue(registry.registeredClasses[classType])) {
        finalType = registry.registeredClasses[classType];
    }
    else if (typeof classType !== "function") {
        finalType = Container;
        classError = new Error("Class [" + classType + "] is not loaded.");
    }
    else {
        finalType = classType;
    }
    // Create the chart
    var chart = createChild(htmlElement, finalType);
    // Set config
    if (classError) {
        chart.raiseCriticalError(classError);
    }
    else {
        chart.config = config;
    }
    return chart;
}
/**
 * Useful in creating real queues form mult-chart creation.
 *
 * Accepts a reference to a function which crates and returns actual chart
 * object.
 *
 * It returns a `Promise` which you can use to catch chart instance once it's
 * created.
 *
 * ```TypeScript
 * am4core.createDeferred(function(div) {
 *   // Create first chart
 *   let chart = am4core.create(div, am4charts.XYChart);
 *   // ...
 *   return chart;
 * }, "chartdiv1").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 *
 * am4core.createDeferred(function(div) {
 *   // Create second chart
 *   let chart = am4core.create(div, am4charts.PieChart);
 *   // ...
 *   return chart;
 * }, "chartdiv2").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 * ```
 * ```JavaScript
 * am4core.createDeferred(function(div) {
 *   // Create first chart
 *   var chart = am4core.create(div, am4charts.XYChart);
 *   // ...
 *   return chart;
 * }, "chartdiv1").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 *
 * am4core.createDeferred(function(div) {
 *   // Create second chart
 *   var chart = am4core.create(div, am4charts.PieChart);
 *   // ...
 *   return chart;
 * }, "chartdiv2").then(chart) {
 *   // `chart` variable holds an instance of the chart
 *   console.log("Chart ready", chart);
 * }
 * ```
 *
 * @see {@link https://www.amcharts.com/docs/v4/concepts/performance/#Deferred_daisy_chained_instantiation} for more information
 * @since 4.10.0
 * @param  callback  Callback function that creates chart
 * @param  scope     Scope to call callback in
 * @param  ...rest   Parameters to pass into callback
 * @return           Promise with chart instance
 */
export function createDeferred(callback, scope) {
    var rest = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        rest[_i - 2] = arguments[_i];
    }
    return new Promise(function (resolve, reject) {
        registry.deferred.push({
            scope: scope,
            callback: callback,
            args: rest,
            resolve: resolve
        });
        if (registry.deferred.length == 1) {
            processNextDeferred();
        }
    });
}
function processNextDeferred() {
    var _a;
    var next = registry.deferred[0];
    if (next) {
        var sprite_2 = (_a = next.callback).call.apply(_a, __spread([next.scope], next.args));
        sprite_2.events.on("ready", function () {
            next.resolve(sprite_2);
            registry.deferred.shift();
            if (options.deferredDelay) {
                setTimeout(processNextDeferred, options.deferredDelay);
            }
            else {
                processNextDeferred();
            }
        });
    }
}
/**
 * Applies a theme to System, and subsequently all chart instances created
 * from that point forward.
 *
 * amCharts supports multiple themes. Calling `useTheme` multiple times will
 * make the System apply multiple themes, rather than overwrite previously
 * set one.
 *
 * This enables combining features from multiple themes on the same chart.
 * E.g.:
 *
 * ```TypeScript
 * am4core.useTheme(am4themes.material);
 * am4core.useTheme(am4themes.animated);
 * ```
 * ```JavaScript
 * am4core.useTheme(am4themes.material);
 * am4core.useTheme(am4themes.animated);
 * ```
 *
 * The above will apply both the Material color and animation options to all
 * charts created.
 *
 * @param value  A reference to a theme
 */
export function useTheme(value) {
    if (registry.themes.indexOf(value) === -1) {
        registry.themes.push(value);
    }
}
/**
 * Removes a theme from "active themes" list, so it won't get applied to any
 * charts created subsequently.
 *
 * @param value  A reference to a theme
 */
export function unuseTheme(value) {
    $array.remove(registry.themes, value);
}
/**
 * Removes all "active" themes. Any charts created subsequently will not have
 * any theme applied to them.
 */
export function unuseAllThemes() {
    registry.themes = [];
}
/**
 * Adds a license, e.g.:
 *
 * ```TypeScript
 * am4core.addLicense("xxxxxxxx");
 * ```
 * ```JavaScript
 * am4core.addLicense("xxxxxxxx");
 * ```
 *
 * Multiple licenses can be added to cover for multiple products.
 *
 * @since 4.5.16
 * @param  license  License key
 */
export function addLicense(license) {
    options.licenses.push(license);
}
//# sourceMappingURL=Instance.js.map