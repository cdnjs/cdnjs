/*
 * Tagging input element
 * @module Ink.UI.TagField_1
 * @version 1
 */
Ink.createModule("Ink.UI.TagField","1",["Ink.Dom.Element_1", "Ink.Dom.Event_1", "Ink.Dom.Css_1", "Ink.Dom.Browser_1", "Ink.UI.Droppable_1", "Ink.Util.Array_1", "Ink.Dom.Selector_1", "Ink.UI.Common_1"],function( InkElement, InkEvent, Css, Browser, Droppable, InkArray, Selector, Common) {
    'use strict';

    var enterKey = 13;
    var backspaceKey = 8;
    var isTruthy = function (val) {return !!val;};

    /**
     * Use this class to have a field where a user can input several tags into a single text field. A good example is allowing the user to describe a blog post or a picture through tags, for later searching.
     *
     * The markup is as follows:
     *
     *           <input class="ink-tagfield" type="text" value="initial,value">
     *
     * By applying this UI class to the above input, you get a tag field with the tags "initial" and "value". The class preserves the original input element. It remains hidden and is updated with new tag information dynamically, so regular HTML form logic still applies.
     *
     * Below "input" refers to the current value of the input tag (updated as the user enters text, of course), and "output" refers to the value which this class writes back to said input tag.
     *
     * @class Ink.UI.TagField
     * @version 1
     * @constructor
     * @param {String|DOMElement}   element                         Selector or DOM Input Element.
     * @param {Object}              [options]                       Options object
     * @param {String|Array}        [options.tags]                  Initial tags in the input
     * @param {Boolean}             [options.allowRepeated]         Flag to allow user to input several tags. Defaults to true.
     * @param {RegExp}              [options.separator]             Split the input by this RegExp. Defaults to /[,;(space)]+/g (spaces, commas and semicolons)
     * @param {String}              [options.outSeparator]          Use this string to separate each tag from the next in the output. Defaults to ','.
     * @param {Boolean}             [options.autoSplit]             Flag to activate tag creation when the user types a separator. Defaults to true.
     * @param {Integer}             [options.maxTags]               Maximum number of tags allowed. Set to -1 for no limit. Defaults to -1.
     * @example
     */
    function TagField(element, options) {
        this.init(element, options);
    }

    TagField.prototype = {
        /**
         * Init function called by the constructor
         * 
         * @method _init
         * @private
         */
        init: function(element, options) {
            element = this._element = Common.elOrSelector(element, 'Ink.UI.TagField');
            var o = this._options = Common.options('Ink.UI.TagField', {
                tags: ['String', []],
                tagQuery: ['Object', null],
                tagQueryAsync: ['Object', null],
                allowRepeated: ['Boolean', false],
                maxTags: ['Integer', -1],
                outSeparator: ['String', ','],
                separator: ['String', /[,; ]+/g],
                autoSplit: ['Boolean', true]
            }, options || {}, this._element);

            if (typeof o.separator === 'string') {
                o.separator = new RegExp(o.separator, 'g');
            }

            if (typeof o.tags === 'string') {
                // coerce to array using the separator
                o.tags = this._readInput(o.tags);
            }

            Css.addClassName(this._element, 'hide-all');

            this._viewElm = InkElement.create('div', {
                className: 'ink-tagfield',
                insertAfter: this._element
            });

            this._input = InkElement.create('input', {
                type: 'text',
                className: 'new-tag-input',
                insertBottom: this._viewElm
            });

            var tags = [].concat(o.tags, this._tagsFromMarkup(this._element));

            this._tags = [];

            InkArray.each(tags, Ink.bindMethod(this, '_addTag'));

            InkEvent.observe(this._input, 'keyup', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'change', Ink.bindEvent(this._onKeyUp, this));
            InkEvent.observe(this._input, 'keydown', Ink.bindEvent(this._onKeyDown, this));
            InkEvent.observe(this._input, 'blur', Ink.bindEvent(this._onBlur, this));
            InkEvent.observe(this._viewElm, 'click', Ink.bindEvent(this._refocus, this));

            Common.registerInstance(this, this._element);
        },

        destroy: function () {
            InkElement.remove(this._viewElm);
            Css.removeClassName(this._element, 'hide-all');
        },

        _tagsFromMarkup: function (element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                return this._readInput(element.value);
            } else if (tagname === 'select') {
                return InkArray.map(element.getElementsByTagName('option'), function (option) {
                    return InkElement.textContent(option);
                });
            } else {
                throw new Error('Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _tagsToMarkup: function (tags, element) {
            var tagname = element.tagName.toLowerCase();
            if (tagname === 'input') {
                if (this._options.separator) {
                    element.value = tags.join(this._options.outSeparator);
                }
            } else if (tagname === 'select') {
                element.innerHTML = '';
                InkArray.each(tags, function (tag) {
                    var opt = InkElement.create('option', {selected: 'selected'});
                    InkElement.setTextContent(opt, tag);
                    element.appendChild(opt);
                });
            } else {
                throw new Error('TagField: Cannot read tags from a ' + tagname + ' tag. Unknown tag');
            }
        },

        _addTag: function (tag) {
            if (this._options.maxTags !== -1 &&
                    this._tags.length >= this._options.maxTags) {
                return;
            }
            if ((!this._options.allowRepeated &&
                    InkArray.inArray(tag, this._tags, tag)) || !tag) {
                return false;
            }
            var elm = InkElement.create('span', {
                className: 'ink-tag',
                setTextContent: tag + ' '
            });

            var remove = InkElement.create('span', {
                className: 'remove fa fa-times',
                insertBottom: elm
            });
            InkEvent.observe(remove, 'click', Ink.bindEvent(this._removeTag, this, null));

            var spc = document.createTextNode(' ');

            this._tags.push(tag);
            this._viewElm.insertBefore(elm, this._input);
            this._viewElm.insertBefore(spc, this._input);
            this._tagsToMarkup(this._tags, this._element);
        },

        _readInput: function (text) {
            if (this._options.separator) {
                return InkArray.filter(text.split(this._options.separator), isTruthy);
            } else {
                return [text];
            }
        },

        _onKeyUp: function () {  // TODO control input box size
            if (!this._options.autoSplit) {
                return;
            }
            var split = this._input.value.split(this._options.separator);
            if (split.length <= 1) {
                return;
            }
            var last = split[split.length - 1];
            split = split.splice(0, split.length - 1);
            split = InkArray.filter(split, isTruthy);
            
            InkArray.each(split, Ink.bind(this._addTag, this));
            this._input.value = last;
        },

        _onKeyDown: function (event) {
            if (event.which === enterKey) {
                return this._onEnterKeyDown(event);
            } else if (event.which === backspaceKey) {
                return this._onBackspaceKeyDown();
            } else if (this._removeConfirm) {
                // user pressed another key, cancel removal from a backspace key
                this._unsetRemovingVisual(this._tags.length - 1);
            }
        },

        /**
         * When the user presses backspace twice on the empty input, we delete the last tag on the field.
         * @method onBackspaceKeyDown
         * @private
         */
        _onBackspaceKeyDown: function () {
            if (this._input.value) { return; }

            if (this._removeConfirm) {
                this._unsetRemovingVisual(this._tags.length - 1);
                this._removeTag(this._tags.length - 1);
                this._removeConfirm = null;
            } else {
                this._setRemovingVisual(this._tags.length - 1);
            }
        },

        _onEnterKeyDown: function (event) {
            var tag = this._input.value;
            if (tag) {
                this._addTag(tag);
                this._input.value = '';
            }
            InkEvent.stopDefault(event);
        },

        _onBlur: function () {
            this._addTag(this._input.value);
            this._input.value = '';
        },

        /* For when the user presses backspace.
         * Set the style of the tag so that it seems like it's going to be removed
         * if they press backspace again. */
        _setRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            Css.addClassName(elm, 'tag-deleting');

            this._removeRemovingVisualTimeout = setTimeout(Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex), 4000);
            InkEvent.observe(this._input, 'blur', Ink.bindMethod(this, '_unsetRemovingVisual', tagIndex));
            this._removeConfirm = true;
        },
        _unsetRemovingVisual: function (tagIndex) {
            var elm = this._viewElm.children[tagIndex];
            if (elm) {
                Css.removeClassName(elm, 'tag-deleting');
                clearTimeout(this._removeRemovingVisualTimeout);
            }
            this._removeConfirm = null;
        },

        _removeTag: function (event) {
            var index;
            if (typeof event === 'object') {  // click event on close button
                var elm = InkEvent.element(event).parentNode;
                index = InkElement.parentIndexOf(this._viewElm, elm);
            } else if (typeof event === 'number') {  // manual removal
                index = event;
            }
            this._tags = InkArray.remove(this._tags, index, 1);
            InkElement.remove(this._viewElm.children[index]);
            this._tagsToMarkup(this._tags, this._element);
        },

        _refocus: function (event) {
            this._input.focus();
            InkEvent.stop(event);
            return false;
        }
    };
    return TagField;
});
