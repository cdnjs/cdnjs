

export var script = {
    global: function global() {
        return window.document;
    },
    register: function register(component, document) {

        function render(element) {

            if (!element || !element.tagName || element.tagName.toLowerCase() !== 'script') {
                return;
            }

            // $FlowFixMe
            if (!element.attributes.type || element.attributes.type.value !== 'application/x-component' || !element.parentNode) {
                return;
            }

            var tag = element.getAttribute('data-component');

            if (!tag || tag !== component.tag) {
                return;
            }

            component.log('instantiate_script_component');

            var props = element.innerText ? eval('(' + element.innerText + ')') // eslint-disable-line no-eval, security/detect-eval-with-expression
            : {};

            var container = document.createElement('div');

            if (!element.parentNode) {
                throw new Error('Element has no parent');
            }

            element.parentNode.replaceChild(container, element);

            // $FlowFixMe
            component.render(props, container);
        }

        function scan() {
            var scriptTags = Array.prototype.slice.call(document.getElementsByTagName('script'));

            for (var _i2 = 0, _length2 = scriptTags == null ? 0 : scriptTags.length; _i2 < _length2; _i2++) {
                var element = scriptTags[_i2];
                render(element);
            }
        }

        scan();
        document.addEventListener('DOMContentLoaded', scan);
        window.addEventListener('load', scan);

        document.addEventListener('DOMNodeInserted', function (event) {
            // $FlowFixMe
            render(event.target);
        });
    }
};