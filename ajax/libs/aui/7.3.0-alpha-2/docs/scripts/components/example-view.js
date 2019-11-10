'use strict';

import clipboard from 'clipboard-js';
import './code';
import Sandy from 'sandy';
import skate from 'skatejs';
import trimWhitespace from 'trim-extra-html-whitespace';

/**
 * A web component that renders full working examples using <aui-docs-code>, with the ability to post the code
 * blocks to jsbin, jsfiddle, and codepen.
 * Also includes a button that enables the example to be viewed in various sandboxing websites (jsbin, jsfiddle etc.)
 *
 * Example:
 * <aui-docs-example>
 *      <noscript is="aui-docs-code" type="text/html">
 *          some HTML
 *      </noscript>
 * </aui-docs-example>
 *
 * The contents of the <aui-docs-example> should be a collection <noscript is="aui-docs-code"> elements.
 *
 * # Attributes
 * - live-demo: (boolean attribute) if set, render the demo in the docs with a live executing example.
 *
 * # Hiding code blocks from demos
 * If you wish to hide a code block for docs display, but need the code for the demo (live or jsbin), you can remove the
 * `is="aui-docs-code"` attribute from the noscript tag, which will prevent rendering of the code listing on the docs pages.
 */

skate('aui-docs-example', {
    created: function (el) {
        addLiveDemoHtmlAndCss(el);
    },
    attached: function (el) {
        skate.init(el);
        addLiveDemoJavaScript(el);
        addExampleActions(el);
    }
});

function addLiveDemoHtmlAndCss(el) {
    if (!el.hasAttribute('live-demo')) {
        return;
    }

    let languages = getLanguageContents(el);

    if (languages.html) {
        const liveDemo = document.createElement('aui-code-block');
        liveDemo.className = 'aui-live-demo';
        liveDemo.innerHTML = languages.html;

        const heading = document.createElement('h6');
        heading.textContent = 'Example';
        liveDemo.insertBefore(heading, liveDemo.firstChild);

        const liveDemoWrapper = document.createElement('div');
        liveDemoWrapper.className = 'aui-code-block-wrapper';
        liveDemoWrapper.appendChild(liveDemo);
        el.insertBefore(liveDemoWrapper, el.childNodes[0]);
    }

    if (languages.css) {
        let cssScript = document.createElement('style');
        cssScript.innerHTML = languages.css;
        document.head.appendChild(cssScript);
    }
}

function addLiveDemoJavaScript(el) {
    if (!el.hasAttribute('live-demo')) {
        return;
    }

    let languages = getLanguageContents(el);
    if (languages.js) {
        let jsScript = document.createElement('script');
        jsScript.appendChild(document.createTextNode(languages.js));
        document.head.appendChild(jsScript);
    }
}

function addExampleActions(el) {
    const codeBlock = el.querySelector('aui-code-block');
    codeBlock.parentNode.insertBefore(createExampleActions(el), codeBlock);
}

function createExampleActions(el) {
    let id = AJS.id('aui-docs-example-actions-dropdown');
    const supportsClipboard = document.queryCommandSupported("copy");
    const clipboardAction = supportsClipboard ? '<li><a data-docs-example-destination="clipboard" href="#">Copy to clipboard</a></li>' : '';
    let exampleActionsContent = `
        <div class="aui-buttons">
            <button class="aui-button aui-button-split-main aui-button-light" data-docs-example-destination="codepen"><span class="aui-icon aui-icon-small aui-iconfont-edit">Edit icon</span> Edit in codepen</button>
            <button class="aui-button aui-dropdown2-trigger aui-button-split-more aui-button-light" aria-haspopup="true" aria-controls="${id}" aria-expanded="false">Split more</button>
        </div>
        <div id="${id}" class="aui-dropdown2 aui-style-default aui-layer" aria-hidden="true">
            <ul class="aui-list-truncate">
                <li><a data-docs-example-destination="jsfiddle" href="#">Edit in jsfiddle</a></li>
                ${clipboardAction}
            </ul>
        </div>
    `;

    let exampleActions = document.createElement('div');
    exampleActions.className = 'aui-docs-example-actions';
    exampleActions.innerHTML = exampleActionsContent;


    function exampleButtonClickHandler(e) {
        let languages = getLanguageContents(el);
        const destination = e.target.getAttribute('data-docs-example-destination');
        if (destination === 'clipboard') {
            copyToClipboard(languages);
        } else {
            let sandyExample = createSandyExample(languages.html, languages.js, languages.css);
            sandyExample.pushTo(e.target.getAttribute('data-docs-example-destination'));
        }
        e.preventDefault();
    }

    let buttons = exampleActions.querySelectorAll('[data-docs-example-destination]');

    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener('click', exampleButtonClickHandler);
    }

    return exampleActions;
}

function copyToClipboard (languages) {
    let copyToClipboard = '';
    if (languages.css) {
        copyToClipboard += `<style>\n${trimWhitespace(languages.css)}\n</style>\n`;
    }
    if (languages.html) {
        copyToClipboard += `${trimWhitespace(languages.html)}\n`;
    }
    if (languages.js) {
        copyToClipboard += `<script>\n${trimWhitespace(languages.js)}\n</script>`;
    }
    clipboard.copy(copyToClipboard);
}

function getCodeElements(el, lang) {
    return el.querySelectorAll('[type="text/' + lang + '"]');
}

function getLanguageContents(el) {
    let languages = {};
    let cssScripts = getCodeElements(el, 'css');
    let htmlScripts = getCodeElements(el, 'html');
    let jsScripts = getCodeElements(el, 'js');

    languages.css = getInnerContent(cssScripts);
    languages.html = getInnerContent(htmlScripts);
    languages.js = getInnerContent(jsScripts);

    return languages;
}

function getInnerContent(elements) {
    if (elements.length > 0) {
        let content = '';
        Array.prototype.forEach.call(elements, function (element) {
            content += element.textContent + '\n';
        });
        return content;
    }
    return null;
}

function createSandyExample(html, js, css) {
    let config = {
        dependencies: getDependencies()
    };

    if (html) {
        config.html = {content: html};
    }

    if (css) {
        config.css = {content: css};
    }

    if (js) {
        config.js = {content: js};
    }

    return new Sandy(config);
}

function getDependencies() {
    let distLocation = getDistLocation();
    return [
        '//cdnjs.cloudflare.com/ajax/libs/jquery/2.2.4/jquery.js',
        '//cdnjs.cloudflare.com/ajax/libs/jquery-migrate/1.4.1/jquery-migrate.js',
        // Minified version of sinon doesn't quite work: https://github.com/cjohansen/Sinon.JS/issues/332
        '//cdnjs.cloudflare.com/ajax/libs/sinon.js/1.15.4/sinon.js',
        distLocation + '/js/aui.js',
        distLocation + '/js/aui-experimental.js',
        distLocation + '/js/aui-datepicker.js',
        distLocation + '/css/aui.css',
        distLocation + '/css/aui-experimental.css'
    ];
}

function getDistLocation() {
    //Inserted by the template at run time based on the presence / absence of the --debug flag
    return document.getElementById('dist-location').innerHTML;
}
