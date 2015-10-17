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
 * This class supports validating UIKit form (http://getuikit.com/)
 */
(function($) {
    FormValidation.Framework.UIKit = function(element, options) {
        options = $.extend(true, {
            button: {
                selector: '[type="submit"]',
                // The class for disabled button
                // http://getuikit.com/docs/button.html
                disabled: 'disabled'
            },
            control: {
                valid: 'uk-form-success',
                invalid: 'uk-form-danger'
            },
            err: {
                // http://getuikit.com/docs/text.html#text-styles
                clazz: 'uk-text-danger',
                parent: '^.*(uk-form-controls|uk-width-[\\d+]-[\\d+]).*$'
            },
            // UIKit doesn't support feedback icon
            icon: {
                valid: null,
                invalid: null,
                validating: null,
                feedback: 'fv-control-feedback'
            },
            row: {
                // http://getuikit.com/docs/form.html
                selector: '.uk-form-row',
                valid: 'fv-has-success',
                invalid: 'fv-has-error',
                feedback: 'fv-has-feedback'
            }
        }, options);

        FormValidation.Base.apply(this, [element, options]);
    };

    FormValidation.Framework.UIKit.prototype = $.extend({}, FormValidation.Base.prototype, {
        /**
         * Specific framework might need to adjust the icon position
         *
         * @param {jQuery} $field The field element
         * @param {jQuery} $icon The icon element
         */
        _fixIcon: function($field, $icon) {
            var ns      = this._namespace,
                type    = $field.attr('type'),
                field   = $field.attr('data-' + ns + '-field'),
                row     = this.options.fields[field].row || this.options.row.selector,
                $parent = $field.closest(row);

            if ('checkbox' === type || 'radio' === type) {
                var $fieldParent = $field.parent();
                if ($fieldParent.is('label')) {
                    $icon.insertAfter($fieldParent);
                }
            }

            if ($parent.find('label').length === 0) {
                $icon.addClass('fv-icon-no-label');
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
                // Remove the tooltip if it's already exists
                if ($icon.data('tooltip')) {
                    $icon.data('tooltip').off();
                    $icon.removeData('tooltip');
                }

                $icon
                    .attr('title', message)
                    .css({
                        'cursor': 'pointer'
                    });

                new $.UIkit.tooltip($icon);
                // UIKit auto set the 'tooltip' data for the element
                // so I can retrieve the tooltip later via $icon.data('tooltip')
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
            if ($icon) {
                var tooltip = $icon.data('tooltip');
                if (tooltip) {
                    tooltip.hide();
                    tooltip.off();
                    $icon.off('focus mouseenter')
                         .removeData('tooltip');
                }
                $icon.css({
                    'cursor': ''
                });
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
                var tooltip = $icon.data('tooltip');
                if (tooltip) {
                    tooltip.hide();
                }
                $icon.css({
                    'cursor': ''
                });
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
                $icon.css({
                    'cursor': 'pointer'
                });
                var tooltip = $icon.data('tooltip');
                if (tooltip) {
                    tooltip.show();
                }
            }
        }
    });
}(jQuery));
