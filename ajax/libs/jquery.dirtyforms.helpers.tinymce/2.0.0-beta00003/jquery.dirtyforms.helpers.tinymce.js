/*!
TinyMCE helper module (for jQuery Dirty Forms) | v2.0.0-beta00003 | github.com/snikch/jquery.dirtyforms
(c) 2015 Mal Curtis
License MIT
*/

// Support for UMD: https://github.com/umdjs/umd/blob/master/jqueryPluginCommonjs.js
// This allows for tools such as Browserify to compose the components together into a single HTTP request.
(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // Node/CommonJS
        module.exports = factory(require('jquery'), window, document);
    } else {
        // Browser globals
        factory(jQuery, window, document);
    }
}(function ($, window, document, undefined) {
    // Use ECMAScript 5's strict mode
    "use strict";

    var tinymceSelector = ':tinymce:not(.dirty-forms-temp)',
        ignoreSelector = '.mceEditor a,.mceMenu a,[name^="mce_"]';

    // Create a new object, with an isDirty method
    var tinymce = {
        // Dirty Forms properties and methods
        ignoreSelector: ignoreSelector,
        isDirty: function ($node) {
            var isDirty = false;
            if (hasTinyMCE($node)) {
                // Search the current node and all descendant nodes that match the selector
                $node.filter(tinymceSelector).add($node.find(tinymceSelector)).each(function () {
                    var $field = $(this);

                    $.DirtyForms.dirtylog('Checking node ' + $field.attr('id'));
                    if (typeof $field.data('df-tinymce-orig') === 'undefined') {
                        // For Dirty Forms < 2.0 and TinyMCE elements that were added via AJAX,
                        // we default to using TinyMCE's isDirty behavior (which is stateless).
                        if ($field.tinymce().isDirty()) {
                            isDirty = true;
                            $.DirtyForms.dirtylog('Node was totally dirty.');
                            // Return false to stop iterating.
                            return false;
                        }
                    } else {
                        // For Dirty Forms >= 2.0, we compare hash codes with the original content
                        var content = getTinyMceContent($field);
                        $.DirtyForms.dirtylog('TinyMCE content: ' + content);
                        var hash = getHashCode(content);
                        $.DirtyForms.dirtylog('TinyMCE hash: ' + hash);
                        var originalHash = $field.data('df-tinymce-orig');
                        $.DirtyForms.dirtylog('Original TinyMCE hash: ' + originalHash);

                        if (hash !== originalHash) {
                            isDirty = true;
                            $.DirtyForms.dirtylog('Node was totally dirty.');
                            // Return false to stop iterating.
                            return false;
                        }
                    }
                });
            }
            return isDirty;
        },
        setClean: function ($node) {
            if (hasTinyMCE($node)) {

                // Search the current node and all descendant nodes that match the selector
                $node.filter(tinymceSelector).add($node.find(tinymceSelector)).each(function () {
                    var $field = $(this);

                    // Set TinyMCE clean
                    if ($field.tinymce().isDirty()) {
                        $.DirtyForms.dirtylog('Resetting isDirty on node ' + $field.attr('id'));
                        $field.tinymce().isNotDirty = 1; //Force not dirty state
                    }

                    // Forget the original value and reset to the current state
                    storeOriginalValue($field);
                });
            }
        },
        rescan: function ($node) {
            if (hasTinyMCE($node)) {
                $node.filter(tinymceSelector).add($node.find(tinymceSelector)).each(function () {
                    var $field = $(this);

                    if (typeof $field.data('df-tinymce-orig') !== 'undefined') {
                        storeOriginalValue($field);
                    }
                });
            }
        },

        // Patch for Dirty Forms < 2.0
        ignoreAnchorSelector: ignoreSelector
    };

    // Push the new object onto the helpers array
    $.DirtyForms.helpers.push(tinymce);

    // Fix: tinymce throws an error if the selector doesn't match anything
    // (such as when there are no textareas on the current page)
    var hasTinyMCE = function ($node) {
        try {
            return $node.filter(tinymceSelector).length > 0 || $node.find(tinymceSelector).length > 0;
        }
        catch (e) {
            return false;
        }
    };

    var getTinyMceContent = function ($field) {
        // Hack: TinyMCE puts an extra <br> tag at the end of a paragraph when it is edited, so ignore that case.
        return $field.tinymce().getContent({ format: 'raw' }).replace(/<br><\/p>/mg, '</p>');
    };

    var storeOriginalValue = function ($field) {
        var content = getTinyMceContent($field);
        $.DirtyForms.dirtylog('Original TinyMCE content: ' + content);

        var hash = getHashCode(content);
        $.DirtyForms.dirtylog('Original TinyMCE hash: ' + hash);

        $field.data('df-tinymce-orig', hash);
    };

    // When TinyMCE is found, store the original value as a hash so we can see if there are changes later.
    var init = function ($node) {
        if (hasTinyMCE($node)) {
            $node.filter(tinymceSelector).add($node.find(tinymceSelector)).each(function () {
                storeOriginalValue($(this));
            });
        }
    };

    $(document).bind('scan.dirtyforms', function (ev) {
        // Hack: TinyMCE doesn't have a global init event. So, we create a new 
        // TinyMCE editor within an invisible div and respond to its init event. 
        // There doesn't seem to be a reasonable way
        // to remove the control again, so we simply ignore it.
        var $form = $(ev.target);
        var $editor = $('<div style="display:none;" class="dirty-forms-temp"></div>');
        $form.append($editor);
        $editor.tinymce({
            oninit: function () {
                init($form);
            }
        });
    });

    // Simple way to hash a string: http://stackoverflow.com/questions/7616461/generate-a-hash-from-string-in-javascript-jquery
    var getHashCode = function (str) {
        var hash = 0, i, chr, len;
        if (str.length === 0) return hash;
        for (i = 0, len = str.length; i < len; i++) {
            chr = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + chr;
            hash |= 0; // Convert to 32bit integer
        }
        return hash;
    };
}));