import { StyleRule } from "../utils/DOM";
import { Dictionary } from "../utils/Dictionary";
import { MultiDisposer, CounterDisposer } from "../utils/Disposer";
import { InterfaceColorSet } from "../utils/InterfaceColorSet";
var rules = new Dictionary();
/**
 * Default CSS for Popup.
 *
 * @ignore Exclude from docs
 * @param prefix  Prefix for CSS classes
 * @return Disposer for the CSS definition
 */
export default function (element, prefix) {
    if (!prefix) {
        prefix = "ampopup";
    }
    var cs = new InterfaceColorSet();
    var fg = cs.getFor("text");
    var bg = cs.getFor("background");
    bg.alpha = 0.8;
    var abg = cs.getFor("alternativeBackground");
    abg.alpha = 0.05;
    var counter = rules.insertKeyIfEmpty(prefix, function () {
        var disposer = new MultiDisposer([
            new StyleRule(element, "." + prefix, {
                //"width": "100%",
                //"height": "100%",
                "overflow": "visible",
                "position": "absolute",
                "top": "0",
                "left": "0",
                "z-index": "2000"
            }),
            new StyleRule(element, "." + prefix + "-curtain", {
                "width": "100%",
                "height": "100%",
                "position": "absolute",
                "top": "0",
                "left": "0",
                "z-index": "2001",
                "background-color": bg.hex,
                "opacity": "0.5"
            }),
            new StyleRule(element, "." + prefix + "-header", {
                "display": "block",
                "width": "100%",
                "min-height": "1.8em",
                "background": abg.rgba
            }),
            new StyleRule(element, "." + prefix + "-title", {
                "font-weight": "bold",
                "font-size": "110%",
                "padding": "0.5em 1.2em 0.5em 1em"
            }),
            new StyleRule(element, "." + prefix + "-content", {
                /*"width": "100%",
                "height": "100%",*/
                // "padding": "2em 1em 1em 1em",
                "background": bg.hex,
                "background-color": bg.rgba,
                "color": fg.hex,
                "display": "inline-block",
                "position": "absolute",
                "top": "0",
                "left": "0",
                "max-width": "90%",
                "max-height": "90%",
                "overflow": "auto",
                "z-index": "2002"
            }),
            new StyleRule(element, "." + prefix + "-inside", {
                "padding": "1em"
            }),
            new StyleRule(element, "." + prefix + "-close", {
                "display": "block",
                "position": "absolute",
                "top": "0.3em",
                "right": "0.3em",
                "background-color": "rgb(100, 100, 100)",
                "background": "rgba(100, 100, 100, 0.1) url(data:image/svg+xml;charset=utf-8;base64,PHN2ZyBoZWlnaHQ9IjUxMiIgdmVyc2lvbj0iMSIgdmlld0JveD0iMCAwIDUxMiA1MTIiIHdpZHRoPSI1MTIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PHBhdGggZD0iTTQ0NS4yIDEwOS4ybC00Mi40LTQyLjRMMjU2IDIxMy42IDEwOS4yIDY2LjhsLTQyLjQgNDIuNEwyMTMuNiAyNTYgNjYuOCA0MDIuOGw0Mi40IDQyLjRMMjU2IDI5OC40bDE0Ni44IDE0Ni44IDQyLjQtNDIuNEwyOTguNCAyNTYiLz48L3N2Zz4=) no-repeat center",
                "background-size": "80%",
                "width": "1.2em",
                "height": "1.2em",
                "cursor": "pointer"
            }),
        ]);
        return new CounterDisposer(function () {
            rules.removeKey(prefix);
            disposer.dispose();
        });
    });
    return counter.increment();
}
//# sourceMappingURL=PopupCSS.js.map