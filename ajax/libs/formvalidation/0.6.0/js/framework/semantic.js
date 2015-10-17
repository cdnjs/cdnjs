/*!
 * FormValidation (http://formvalidation.io)
 * The best jQuery plugin to validate form fields. Support Bootstrap, Foundation, Pure, SemanticUI, UIKit frameworks
 *
 * @version     v0.6.0, built on 2015-01-06 2:20:11 PM
 * @author      https://twitter.com/nghuuphuoc
 * @copyright   (c) 2013 - 2015 Nguyen Huu Phuoc
 * @license     http://formvalidation.io/license/
 */
/**
 * This class supports validating SemanticUI form (http://semantic-ui.com/)
 */
(function($) {
    FormValidation.Framework.Semantic = function(element, options) {
        options = $.extend(true, {
            button: {
                selector: '[type="submit"]',
                // CSS class of disabled button
                // http://semantic-ui.com/elements/button.html#disabled
                disabled: 'disabled'
            },
            control: {
                valid: '',
                invalid: ''
            },
            err: {
                // http://semantic-ui.com/elements/label.html#pointing
                clazz: 'ui red pointing label transition',
                parent: '^.*(field|column).*$'
            },
            // When using feedback icon, the input must place inside 'ui input icon' element
            //  <div class="ui input icon">
            //      <input type="text" />
            //  </div>
            // See http://semantic-ui.com/elements/input.html#icon
            icon: {
                // http://semantic-ui.com/elements/icon.html
                valid: null,        // 'checkmark icon'
                invalid: null,      // 'remove icon'
                validating: null,   // 'refresh icon'
                feedback: 'fv-control-feedback'
            },
            row: {
                // http://semantic-ui.com/collections/form.html
                selector: '.field',
                valid: 'fv-has-success',
                invalid: 'error',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.Semantic.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
            var type = $field.attr('type');
            if ('checkbox' === type || 'radio' === type) {
                var $fieldParent = $field.parent();
                if ($fieldParent.hasClass(type)) {
                    $icon.insertAfter($fieldParent);
                }
            }
        },

        /**
         * Create a tooltip or popover
         * It will be shown when focusing on the field
         *
         * @param {jQuery} $field The field element
         * @param {String} message The message
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _createTooltip: function($field, message, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                // Remove the popup if it's already exists
                if ($icon.popup('exists')) {
                    $icon.popup('remove popup')
                         .popup('destroy');
                }

                // http://semantic-ui.com/modules/popup.html
                switch (type) {
                    case 'popover':
                        $icon
                            .css({
                                'cursor': 'pointer'
                            })
                            .popup({
                                content: message,
                                position: 'top center'
                            });
                        break;

                    case 'tooltip':
                    /* falls through */
                    default:
                        $icon
                            .css({
                                'cursor': 'pointer'
                            })
                            .popup({
                                content: message,
                                position: 'top center',
                                variation: 'inverted'
                            });
                        break;
                }
            }
        },

        /**
         * Destroy the tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _destroyTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon && $icon.popup('exists')) {
                $icon
                    .css({
                        'cursor': ''
                    })
                    .popup('remove popup')
                    .popup('destroy');
            }
        },

        /**
         * Hide a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _hideTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.popup('hide');
            }
        },

        /**
         * Show a tooltip or popover
         *
         * @param {jQuery} $field The field element
         * @param {String} type Can be 'tooltip' or 'popover'
         */
        _showTooltip: function($field, type) {
            var $icon = $field.data('fv.icon');
            if ($icon) {
                $icon.popup('show');
            }
        }
    });
}(jQuery));
