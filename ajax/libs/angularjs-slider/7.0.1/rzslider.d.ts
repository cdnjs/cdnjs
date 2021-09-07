/**
 * Typescript type definition file.
 */

import * as angular from "angular";

declare module "angular" {
    export namespace RzSlider {
        type RzLabelType = "model"|"high"|"floor"|"ceil"|"tick-value";
        type RzPointerType = "min"|"max";
        type RzCallback = (id: string, modelValue: number, highValue: number, pointerType: "min"|"max") => void;
        type RzTranslate = (value: number, sliderId: string, label: RzLabelType) => string;

        /** RZ slider options typing */
        interface RzOptions {
            /** Number (defaults to 0): Minimum value for a slider. */
            floor?: number;
            /** Number (defaults to rz-slider-modelvalue): Maximum value for a slider. */
            ceil?: number;
            /** Number (defaults to 1): Step between each value. */
            step?: number;
            /** Number (defaults to 0): The precision to display values with. The toFixed() is used internally for this. */
            precision?: number;
            /** Number (defaults to null): The minimum value authorized on the slider. */
            minLimit?: number;
            /** Number (defaults to null): The maximum value authorized on the slider. */
            maxLimit?: number;
            /**
             * Object(defaults to null): Has two _Number_ properties, _from_ and _to_ that determine
             * the bounds of an area that is not authorized for values. _Applies to range slider only._
             */
            restrictedRange?: { from: number, to: number } 
            /** Number (defaults to null): The minimum range authorized on the slider. Applies to range slider only. */
            minRange?: number;
            /** Number (defaults to null): The maximum range authorized on the slider. Applies to range slider only. */
            maxRange?: number;
            /**
             * Boolean (defaults to false): Set to true to have a push behavior. When the min handle goes above the max,
             * the max is moved as well (and vice-versa). The range between min and max is defined by the step option
             * (defaults to 1) and can also be override by the minRange option. Applies to range slider only.
             */
            pushRange?: boolean;
            /**
             * Custom translate function. Use this if you want to translate values displayed on the slider.
             * sliderId can be used to determine the slider for which we are translating the value.
             * label is a string that can take the following values:
             * 'model': the model label
             * 'high': the high label
             * 'floor': the floor label
             * 'ceil': the ceil label
             * 'tick-value': the ticks labels
             */
            translate?: RzTranslate;
            /**
             * Function(value, sliderId): Use to display legend under ticks. The function will be called with each tick
             * value and returned content will be displayed under the tick as a legend. If the returned value is null,
             * then no legend is displayed under the corresponding tick.
             */
            getLegend?: (value: number, sliderId: string) => string;
            /**
             * Any (defaults to null): If you want to use the same translate function for several sliders,
             * just set the id to anything you want, and it will be passed to the translate(value, sliderId)
             * function as a second argument.
             */
            id?: string;
            /**
             * Array: If you want to display a slider with non linear/number steps. Just pass an array with each slider
             * value and that's it; the floor, ceil and step settings of the slider will be computed automatically.
             * By default, the rz-slider-model and rz-slider-high values will be the value of the selected item in the stepsArray.
             * They can also be bound to the index of the selected item by setting the bindIndexForStepsArray option to true.
             *
             * stepsArray can also be an array of objects like:
             * [
             * {value: 'A'}, // the display value will be *A*
             * {value: 10, legend: 'Legend for 10'} // the display value will be 10 and a legend will be displayed under the corresponding tick.
             * ]
             */
            stepsArray?: number[] | Array<{value: number; legend?: string}>;
            /**
             * Boolean (defaults to false): Set to true to bind the index of the selected item to rz-slider-model and rz-slider-high.
             * (This was the default behavior prior to 4.0).
             */
            bindIndexForStepsArray?: boolean;
            /** Boolean (defaults to false): When set to true and using a range slider, the range can be dragged by the selection bar. Applies to range slider only. */
            draggableRange?: boolean;
            /** Boolean (defaults to false): Same as draggableRange but the slider range can't be changed. Applies to range slider only. */
            draggableRangeOnly?: boolean;
            /** Boolean (defaults to false): Set to true to always show the selection bar before the slider handle. */
            showSelectionBar?: boolean;
            /** Boolean (defaults to false): Set to true to always show the selection bar after the slider handle. */
            showSelectionBarEnd?: boolean;
            /** Boolean (defaults to false): Only for range slider. Set to true to visualize in different colour the areas on the left/right (top/bottom for vertical range slider) of selection bar between the handles. */
            showOuterSelectionBars?: boolean;
            /** Number (defaults to null): Set a number to draw the selection bar between this value and the slider handle. */
            showSelectionBarFromValue?: number;
            /**
             * Function(value) or Function(minVal, maxVal) (defaults to null): Function that returns the current color of the
             * selection bar. If your color won't changed, don't use this option but set it through CSS. If the returned color
             * depends on a model value (either rzScopeModelor 'rzSliderHigh), you should use the argument passed to the function.
             * Indeed, when the function is called, there is no certainty that the model has already been updated.
             */
            getSelectionBarColor?: (minVal: number, maxVal?: number) => string;
            /** Function(value) (defaults to null): Function that returns the color of a tick. showTicks must be enabled. */
            getTickColor?: (value: number) => string;
            /**
             * Function(value, pointerType) (defaults to null): Function that returns the current color of a pointer.
             * If your color won't changed, don't use this option but set it through CSS. If the returned color depends
             * on a model value (either rzScopeModelor 'rzSliderHigh), you should use the argument passed to the function.
             * Indeed, when the function is called, there is no certainty that the model has already been updated.
             * To handle range slider pointers independently, you should evaluate pointerType within the given function
             * where "min" stands for rzScopeModel and "max" for rzScopeHigh values.
             */
            getPointerColor?: (value: number, pointerType: RzPointerType) => string;
            /** Boolean (defaults to false): Set to true to hide pointer labels */
            hidePointerLabels?: boolean;
            /** Boolean (defaults to false): Set to true to hide min / max labels */
            hideLimitLabels?: boolean;
            /** Boolean (defaults to true): Set to false to disable the auto- hiding behavior of the limit labels. */
            autoHideLimitLabels?: boolean;
            /** Boolean (defaults to false): Set to true to make the slider read-only. */
            readOnly?: boolean;
            /** Boolean (defaults to false): Set to true to disable the slider. */
            disabled?: boolean;
            /**
             * Number in ms (defaults to 350): Internally, a throttle function (See http://underscorejs.org/#throttle) is used
             * when the model or high values of the slider are changed from outside the slider. This is to prevent from re-rendering
             * the slider too many times in a row. interval is the number of milliseconds to wait between two updates of the slider.
             */
            interval?: number;
            /** Boolean or Number (defaults to false): Set to true to display a tick for each step of the slider. Set an integer to display ticks at intermediate positions. */
            showTicks?: boolean | number;
            /** Boolean or Number (defaults to false): Set to true to display a tick and the step value for each step of the slider. Set an integer to display ticks and the step value at intermediate positions. */
            showTicksValues?: boolean | number;
            /** Array (defaults to null): Use to display ticks at specific positions. The array contains the index of the ticks that should be displayed. For example, [0, 1, 5] will display a tick for the first, second and sixth values. It also supports the { value: 0, legend: 'Bad' } format to display a legend for each tick. */
            ticksArray?: number[] | Array<{value: number; legend?: string}>;
            /** Function(value) (defaults to null): (requires angular-ui bootstrap) Used to display a tooltip when a tick is hovered. Set to a function that returns the tooltip content for a given value. */
            ticksTooltip?: (value: number) => string;
            /** Function(value) (defaults to null): Same as ticksTooltip but for ticks values. */
            ticksValuesTooltip?: (value: number) => string;
            /** Number (defaults to 1): If you display the slider in an element that uses transform: scale(0.5), set the scale value to 2 so that the slider is rendered properly and the events are handled correctly. */
            scale?: number;
            /** Boolean (defaults to true): Set to true to force the value to be rounded to the step, even when modified from the outside.. When set to false, if the model values are modified from outside the slider, they are not rounded and can be between two steps. */
            enforceStep?: boolean;
            /** Boolean (defaults to false): Set to true to round the rzSliderModel and rzSliderHigh to the slider range even when modified from outside the slider. When set to false, if the model values are modified from outside the slider, they are not rounded but they are still rendered properly on the slider. */
            enforceRange?: boolean;
            /** Boolean (defaults to false): Set to true to prevent to user from switching the min and max handles. Applies to range slider only. */
            noSwitching?: boolean;
            /** Boolean (defaults to false): Set to true to only bind events on slider handles. */
            onlyBindHandles?: boolean;
            /** Boolean (defaults to true): Set to true to keep the slider labels inside the slider bounds. */
            boundPointerLabels?: boolean;
            /** Boolean (defaults to false): Set to true to merge the range labels if they are the same. For instance, if min and max are 50, the label will be "50 - 50" if mergeRangeLabelsIfSame: false, else "50". */
            mergeRangeLabelsIfSame?: boolean;
            /** String (defaults to ' - '): Separator to use when the labels overlap. For instance, if min and max are -1 and 1, the label will be "-1 .. 1" if `labelOverlapSeparator: ' .. '`. */
            labelOverlapSeparator?: string;
            /** Function(sliderId, modelValue, highValue, pointerType): Function to be called when a slider update is started. If an id was set in the options, then it's passed to this callback. This callback is called before any update on the model. pointerType is either 'min' or 'max' depending on which handle is used. */
            onStart?: RzCallback;
            /**
             * Function to be called when rz-slider-model or rz-slider-high change. If an id was set in the options,
             * then it's passed to this callback. pointerType is either 'min' or 'max' depending
             * on which handle is used.
             */
            onChange?: RzCallback;
            /** Function(sliderId, modelValue, highValue, pointerType): Function to be called when a slider update is ended. If an id was set in the options, then it's passed to this callback. pointerType is either 'min' or 'max' depending on which handle is used. */
            onEnd?: RzCallback;
            /** Boolean (defaults to false): Set to true to show graphs right to left. If vertical is true it will be from top to bottom and left / right arrow functions reversed. */
            rightToLeft?: boolean;
            /**
             * Boolean (defaults to false): Set to true to display the slider vertically. The slider will take the full height of its parent.
             * Changing this value at runtime is not currently supported.
             */
            vertical?: boolean;
            /**
             * Boolean (defaults to true): Handles are focusable (on click or with tab) and can be modified using the following keyboard controls:
             *   - Left/bottom arrows: -1
             *   - Right/top arrows: +1
             *   - Page-down: -10%
             *   - Page-up: +10%
             *   - Home: minimum value
             *   - End: maximum value
             */
            keyboardSupport?: boolean;
            /**
             * Boolean (defaults to false): Set to true to reverse keyboard navigation:
             *  - Right/top arrows: -1
             *  - Left/bottom arrows: +1
             *  - Page-up: -10%
             *  - Page-down: +10%
             *  - End: minimum value
             *  - Home: maximum value
             */
            reversedControls?: boolean;
            /** Object (default to null): The properties defined in this object will be exposed in the slider template under custom.X. */
            customTemplateScope?: any;
            /** Boolean (defaults to false): Set to true to use a logarithmic scale to display the slider. */
            logScale?: boolean;
            /** Function(val, minVal, maxVal): percent: Function that returns the position on the slider for a given value.The position must be a percentage between 0 and 1. */
            customValueToPosition?: (val: number, minVal: number, maxVal: number) => number;
            /** Function(percent, minVal, maxVal): value: Function that returns the value for a given position on the slider. The position is a percentage between 0 and 1. */
            customPositionToValue?: (percent: number, minVal: number, maxVal: number) => number;
            /** Object(default to null): Use to display the selection bar as a gradient. The given object must contain from and to properties which are colors. */
            selectionBarGradient?: {from: string, to: string};
            /** String(default to null): Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute. */
            ariaLabel?: string;
            /** String(default to null): Use to add a label directly to the slider(s) for accessibility. Adds the aria-label attribute. */
            ariaLabelHigh?: string;
            /** String(default to null): Use instead of ariaLabel and ariaLabelHigh to reference the id of an element which will be used to label the slider(s). Adds the aria-labelledby attribute. */
            ariaLabelledBy?: string;
            /** String(default to null): Use instead of ariaLabel and ariaLabelHigh to reference the id of an element which will be used to label the slider(s). Adds the aria-labelledby attribute. */
            ariaLabelledByHigh?: string;
            /** Boolean (defaults to false): Set to true to disable slider animation. */
            disableAnimation?: boolean;
        }
    }
}
