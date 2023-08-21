import { StyleRule } from "../../core/utils/DOM";
//import { InterfaceColorSet } from "../../core/utils/InterfaceColorSet";
import { Dictionary } from "../../core/utils/Dictionary";
import { MultiDisposer, CounterDisposer } from "../../core/utils/Disposer";
var rules = new Dictionary();
/**
 * A dynamically-loadable CSS module for Export menu.
 *
 * @ignore Exclude from docs
 * @param prefix  Prefix to addtach to class names
 * @return A MultiDisposer with style rules
 */
export default function (element, prefix) {
    var newPrefix = (prefix ? prefix : "amstock-dataset-selector");
    //let colorSet = new InterfaceColorSet();
    var counter = rules.insertKeyIfEmpty(newPrefix, function () {
        var disposer = new MultiDisposer([
            // === Common ===========================================================
            new StyleRule(element, "." + newPrefix + "-wrapper", {
                "padding": "0.2em 1em 0 0.4em",
                "margin-bottom": "1em"
            }),
            new StyleRule(element, "." + newPrefix + "-wrapper *", {
                "box-sizing": "border-box"
            }),
            new StyleRule(element, "." + newPrefix + "-wrapper input", {
                "width": "100%",
                //"padding": "0.1em 0.2em",
                "font-size": "inherit"
            }),
            // === Horizontal positions =============================================
            new StyleRule(element, "." + newPrefix + "-top ." + newPrefix + "-range-wrapper, ." + newPrefix + "-bottom ." + newPrefix + "-range-wrapper", {
                "float": "left"
            }),
            new StyleRule(element, "." + newPrefix + "-top ." + newPrefix + "-period-wrapper, ." + newPrefix + "-bottom ." + newPrefix + "-period-wrapper", {
                "float": "right"
            }),
            new StyleRule(element, "." + newPrefix + "-top input, ." + newPrefix + "-bottom input", {
                "margin": "0 1em 0 0.3em",
                "max-width": "100px"
            }),
            new StyleRule(element, "." + newPrefix + "-top button, ." + newPrefix + "-bottom button", {
                "margin": "0 0 0 0.4em"
            }),
            // === Vertical positions ===============================================
            new StyleRule(element, "." + newPrefix + "-left ." + newPrefix + "-title, ." + newPrefix + "-right ." + newPrefix + "-title", {
                "display": "block"
            }),
            new StyleRule(element, "." + newPrefix + "-left input, ." + newPrefix + "-right input", {
                "width": "100%",
                "margin": "0.2em 0 0.6em 0"
            }),
            new StyleRule(element, "." + newPrefix + "-left button, ." + newPrefix + "-right button", {
                "width": "25%",
                "margin": "0.2em 0.2em 0.2em 0"
            }),
        ]);
        return new CounterDisposer(function () {
            rules.removeKey(newPrefix);
            disposer.dispose();
        });
    });
    return counter.increment();
}
//# sourceMappingURL=RangeSelectorCSS.js.map