(function () {
    /**
     * CustomHtml
     * Creates a new instance of CustomHtml extension.
     *
     * Licensed under the MIT license.
     * Copyright (c) 2014 jillix
     *
     * @name CustomHtml
     * @function
     * @param {Object} options An object containing the extension configuration. The
     * following fields should be provided:
     *  - buttonText: the text of the button (default: `</>`)
     *  - htmlToInsert: the HTML code that should be inserted
     */
    function CustomHtml(options) {
        this.button = document.createElement('button');
        this.button.className = 'medium-editor-action';
        if (this.button.innerText) {
            this.button.innerText = options.buttonText || "</>";
        } else {
            this.button.textContent = options.buttonText || "</>";
        }
        this.button.onclick = this.onClick.bind(this);
        this.options = options;
    }

    CustomHtml.insertHtmlAtCaret = function(html) {
        var sel, range;
        if (window.getSelection) {
            // IE9 and non-IE
            sel = window.getSelection();
            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();

                // Range.createContextualFragment() would be useful here but is
                // only relatively recently standardized and is not supported in
                // some browsers (IE9, for one)
                var el = document.createElement("div");
                el.innerHTML = html;
                var frag = document.createDocumentFragment(), node, lastNode;
                while ((node = el.firstChild)) {
                    lastNode = frag.appendChild(node);
                }
                range.insertNode(frag);

                // Preserve the selection
                if (lastNode) {
                    range = range.cloneRange();
                    range.setStartAfter(lastNode);
                    range.collapse(true);
                    sel.removeAllRanges();
                    sel.addRange(range);
                }
            }
        } else if (document.selection && document.selection.type != "Control") {
            // IE < 9
            document.selection.createRange().pasteHTML(html);
        }
    };

    /**
     * onClick
     * The click event handler that calls `insertHtmlAtCaret` method.
     *
     * @name onClick
     * @function
     */
    CustomHtml.prototype.onClick = function () {
        CustomHtml.insertHtmlAtCaret(this.options.htmlToInsert);
    };

    /**
     * getButton
     * This function is called by the Medium Editor and returns the button that is
     * added in the toolbar
     *
     * @name getButton
     * @function
     * @return {HTMLButtonElement} The button that is attached in the Medium Editor
     * toolbar
     */
    CustomHtml.prototype.getButton = function () {
        return this.button;
    };

    // declare public object
    window.CustomHtml = CustomHtml;
})();
