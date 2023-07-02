
/* @jsx jsxDom */

import '../../parent';

export function defaultPrerenderTemplate(_ref) {
    var jsxDom = _ref.jsxDom;

    return jsxDom(
        "html",
        null,
        jsxDom(
            "head",
            null,
            jsxDom(
                "style",
                null,
                "\n                        html, body {\n                            width: 100%;\n                            height: 100%;\n                            overflow: hidden;\n                            top: 0;\n                            left: 0;\n                            margin: 0;\n                            text-align: center;\n                        }\n\n                        .spinner {\n                            position: absolute;\n                            max-height: 60vmin;\n                            max-width: 60vmin;\n                            height: 40px;\n                            width: 40px;\n                            top: 50%;\n                            left: 50%;\n                            transform: translateX(-50%) translateY(-50%);\n                            z-index: 10;\n                        }\n\n                        .spinner .loader {\n                            height: 100%;\n                            width: 100%;\n                            box-sizing: border-box;\n                            border: 3px solid rgba(0, 0, 0, .2);\n                            border-top-color: rgba(33, 128, 192, 0.8);\n                            border-radius: 100%;\n                            animation: rotation .7s infinite linear;\n\n                        }\n\n                        @keyframes rotation {\n                            from {\n                                transform: rotate(0deg)\n                            }\n                            to {\n                                transform: rotate(359deg)\n                            }\n                        }\n                    "
            )
        ),
        jsxDom(
            "body",
            null,
            jsxDom(
                "div",
                { "class": "spinner" },
                jsxDom("div", { id: "loader", "class": "loader" })
            )
        )
    );
}