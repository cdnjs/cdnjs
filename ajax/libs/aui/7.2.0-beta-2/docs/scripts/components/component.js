import skate from 'skatejs';
import template from 'skatejs-template-html';

/**
 * A web component that renders a properly escaped tag for a given custom element name.
 *
 * Example:
 * <aui-docs-component>aui-inline-dialog</aui-docs-component>
 */
skate('aui-docs-component', {
    template: template('<code>&lt;<content></content>&gt;</code>')
});
