'use strict';

import skate from 'skatejs';

function getIndentLength(str) {
    if (str) {
        return str.match(/^\s*/)[0].length;
    }
}

function getLang (element) {
    const type = element.getAttribute('type');
    return type.split('/')[1];
}

function setIndentLength (len) {
    return len > 0 ? new Array(len + 1).join(' ') : '';
}

// Map our naming of code types to appropriate CodeMirror styles.
const langMap = {
    'js': 'javascript',
    'html': 'xml',
    'css': 'css'
};

/**
 * A web component that renders javascript, html and other languages as a code listing using highlightjs
 *
 * Example:
 * <noscript is="aui-docs-code" type="html">
 *  <button class="aui-button aui-button-primary">Button</button>
 * </noscript>
 *
 * # Attributes
 *  - type: a highlighting language to use, can be one of `text/css`, `text/handlebars` (sometimes used instead of soy), `text/js`, `text/html`.
 *          **Note:** `text/javascript` cannot be used, or the javascript will be executed. Use `text/js` instead.
 *  - lines: (boolean attribute) whether or not to include line numbers in the output.
 */
export default skate('aui-docs-code', {
    // We extend <noscript> since it is the only element that will preserve the
    // raw contents of the custom element (e.g., avoids boolean attributes from
    // being expanded into foo="") and we're able to avoid skating the example
    // contents for code listings, and it also does not block when the browser
    // encounters it.
    extends: 'noscript',
    created: function (element) {
        const oldElement = element;
        const rawHtml = element.innerHTML;

        const lang = getLang(element);
        const mode = langMap[lang] || '';

        const lines = rawHtml.split('\n');

        if (lang === 'javascript') {
            console.error('To avoid JavaScript evaluation by the browser, noscript[is="aui-docs-code"] elements must not have type="text/javascript".');
        }

        const wrapper = document.createElement('div');
        wrapper.className = 'aui-code-block-wrapper';
        element = document.createElement('aui-code-block');

        // Trim leading empty lines.
        if (!lines[0].trim()) {
            lines.splice(0, 1);
        }

        // Trim trailing empty lines
        if (!lines[lines.length - 1].trim()) {
            lines.splice(lines.length - 1, 1);
        }

        const baseIndent = getIndentLength(lines[0]);
        const textarea = document.createElement('textarea');
        let content = [];

        lines.forEach(function (line) {
            const indent = getIndentLength(line) - baseIndent;

            line = line.trim();
            line = line.replace(/&gt;/g, '>');
            line = line.replace(/&lt;/g, '<');
            line = line.replace(/&amp;/g, '&');

            content.push(setIndentLength(indent) + line);
        });

        textarea.textContent = content.join('\n').replace(/\s*$/, '');
        element.appendChild(textarea);
        wrapper.appendChild(element);

        if (oldElement) {
            oldElement.parentNode.insertBefore(wrapper, oldElement);
        }

        oldElement._codeMirror = CodeMirror.fromTextArea(textarea,  // eslint-disable-line no-undef
            {
                mode,
                readOnly: true,
                cursorBlinkRate: 0,
                styleSelectedText: true,
                theme: 'stash-default'
            });
    },
    prototype: {
        refresh: function () {
            if (this._codeMirror) {
                this._codeMirror.refresh();
            }
            return this;
        }
    }
});
