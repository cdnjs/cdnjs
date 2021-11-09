import SimpleKeyboard from "./components/Keyboard";
import Utilities from "./services/Utilities";
export interface KeyboardLayoutObject {
    [key: string]: string[];
}
export declare type KeyboardButtonTheme = {
    class: string;
    buttons: string;
} | null;
export interface KeyboardButtonAttributes {
    attribute: string;
    value: string;
    buttons: string;
}
export interface KeyboardInput {
    [key: string]: string;
}
export declare type KeyboardParams = [KeyboardOptions] | [string | HTMLDivElement, KeyboardOptions];
export declare type CandidateBoxParams = {
    utilities: Utilities;
};
export declare type CandidateBoxShowParams = {
    candidateValue: string;
    targetElement: KeyboardElement;
    onSelect: (selectedCandidate: string, e: MouseEvent) => void;
};
export declare type CandidateBoxRenderParams = {
    candidateListPages: string[][];
    targetElement: KeyboardElement;
    pageIndex: number;
    nbPages: number;
    onItemSelected: (selectedCandidate: string, e: MouseEvent) => void;
};
export declare type KeyboardElement = HTMLDivElement | HTMLButtonElement;
export declare type KeyboardHandlerEvent = any;
export interface KeyboardButtonElements {
    [key: string]: KeyboardElement[];
}
export interface UtilitiesParams {
    getOptions: () => KeyboardOptions;
    getCaretPosition: () => number | null;
    getCaretPositionEnd: () => number | null;
    dispatch: any;
}
export interface PhysicalKeyboardParams {
    getOptions: () => KeyboardOptions;
    dispatch: any;
}
export interface KeyboardOptions {
    /**
     * Modify the keyboard layout.
     */
    layout?: KeyboardLayoutObject;
    /**
     * Specifies which layout should be used.
     */
    layoutName?: string;
    /**
     * Replaces variable buttons (such as `{bksp}`) with a human-friendly name (e.g.: `backspace`).
     */
    display?: {
        [button: string]: string;
    };
    /**
     * By default, when you set the display property, you replace the default one. This setting merges them instead.
     */
    mergeDisplay?: boolean;
    /**
     * A prop to add your own css classes to the keyboard wrapper. You can add multiple classes separated by a space.
     */
    theme?: string;
    /**
     * A prop to add your own css classes to one or several buttons.
     */
    buttonTheme?: KeyboardButtonTheme[];
    /**
     * A prop to add your own attributes to one or several buttons.
     */
    buttonAttributes?: KeyboardButtonAttributes[];
    /**
     * Runs a `console.log` every time a key is pressed. Displays the buttons pressed and the current input.
     */
    debug?: boolean;
    /**
     * Specifies whether clicking the "ENTER" button will input a newline (`\n`) or not.
     */
    newLineOnEnter?: boolean;
    /**
     * Specifies whether clicking the "TAB" button will input a tab character (`\t`) or not.
     */
    tabCharOnTab?: boolean;
    /**
     * Allows you to use a single simple-keyboard instance for several inputs.
     */
    inputName?: string;
    /**
     * `number`: Restrains all of simple-keyboard inputs to a certain length. This should be used in addition to the input element’s maxlengthattribute.
     *
     * `{ [inputName: string]: number }`: Restrains simple-keyboard’s individual inputs to a certain length. This should be used in addition to the input element’s maxlengthattribute.
     */
    maxLength?: any;
    /**
     * When set to true, this option synchronizes the internal input of every simple-keyboard instance.
     */
    syncInstanceInputs?: boolean;
    /**
     * Enable highlighting of keys pressed on physical keyboard.
     */
    physicalKeyboardHighlight?: boolean;
    /**
     * Calls handler for a button highlighted by physicalKeyboardHighlight
     * In other words, this calls keyboard.handleButtonClicked(buttonName) on the highlighted button
     */
    physicalKeyboardHighlightPress?: boolean;
    /**
     * Trigger click on a button's element when using physicalKeyboardHighlightPress
     * In other words, this calls button.click() on the highlighted button
     */
    physicalKeyboardHighlightPressUseClick?: boolean;
    /**
     * Define the text color that the physical keyboard highlighted key should have.
     */
    physicalKeyboardHighlightTextColor?: string;
    /**
     * Define the background color that the physical keyboard highlighted key should have.
     */
    physicalKeyboardHighlightBgColor?: string;
    /**
     * Calling preventDefault for the mousedown events keeps the focus on the input.
     */
    preventMouseDownDefault?: boolean;
    /**
     * Calling preventDefault for the mouseup events.
     */
    preventMouseUpDefault?: boolean;
    /**
     * Stops pointer down events on simple-keyboard buttons from bubbling to parent elements.
     */
    stopMouseDownPropagation?: boolean;
    /**
     * Stops pointer up events on simple-keyboard buttons from bubbling to parent elements.
     */
    stopMouseUpPropagation?: boolean;
    /**
     * Render buttons as a button element instead of a div element.
     */
    useButtonTag?: boolean;
    /**
     * A prop to ensure characters are always be added/removed at the end of the string.
     */
    disableCaretPositioning?: boolean;
    /**
     * Restrains input(s) change to the defined regular expression pattern.
     */
    inputPattern?: any;
    /**
     * Instructs simple-keyboard to use touch events instead of click events.
     */
    useTouchEvents?: boolean;
    /**
     * Enable useTouchEvents automatically when touch device is detected.
     */
    autoUseTouchEvents?: boolean;
    /**
     * Opt out of PointerEvents handling, falling back to the prior mouse event logic.
     */
    useMouseEvents?: boolean;
    /**
     * Disable button hold action.
     */
    disableButtonHold?: boolean;
    /**
     * Adds unicode right-to-left control characters to input return values.
     */
    rtl?: boolean;
    /**
     * Enable input method editor candidate list support.
     */
    enableLayoutCandidates?: boolean;
    /**
     * Character suggestions to be shown on certain key presses
     */
    layoutCandidates?: {
        [key: string]: string;
    };
    /**
     * Exclude buttons from layout
     */
    excludeFromLayout?: {
        [key: string]: string[];
    };
    /**
     * Determine size of layout candidate list
     */
    layoutCandidatesPageSize?: number;
    /**
     * Executes the callback function every time simple-keyboard is rendered (e.g: when you change layouts).
     */
    onRender?: (instance?: SimpleKeyboard) => void;
    /**
     * Executes the callback function once simple-keyboard is rendered for the first time (on initialization).
     */
    onInit?: (instance?: SimpleKeyboard) => void;
    /**
     * Retrieves the current input
     */
    onChange?: (input: string, e?: MouseEvent) => any;
    /**
     * Retrieves all inputs
     */
    onChangeAll?: (inputObj: KeyboardInput, e?: MouseEvent) => any;
    /**
     * Module options can have any format
     */
    [name: string]: any;
}
