(function (root, factory) {
    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define(['angular'], factory);
    } else if (typeof module === 'object' && module.exports) {
        module.exports = factory(require('angular'));
    } else {
        root.angularClipboard = factory(root.angular);
  }
}(this, function (angular) {

return angular.module('angular-clipboard', [])
    .factory('clipboard', ['$document', function ($document) {
        function createNode(text) {
            var node = $document[0].createElement('textarea');
            node.style.position = 'absolute';
            node.style.left = '-10000px';
            node.textContent = text;
            return node;
        }

        function copyNode(node) {
            try {
                // Set inline style to override css styles
                $document[0].body.style.webkitUserSelect = 'initial';

                var selection = $document[0].getSelection();
                selection.removeAllRanges();
                node.select();

                if(!$document[0].execCommand('copy')) {
                    throw('failure copy');
                }
                selection.removeAllRanges();
            } finally {
                // Reset inline style
                $document[0].body.style.webkitUserSelect = '';
            }
        }

        function copyText(text) {
            var node = createNode(text);
            $document[0].body.appendChild(node);
            copyNode(node);
            $document[0].body.removeChild(node);
        }

        return {
            copyText: copyText,
            supported: 'queryCommandSupported' in document && document.queryCommandSupported('copy')
        };
    }])
    .directive('clipboard', ['clipboard', function (clipboard) {
        return {
            restrict: 'A',
            scope: {
                onCopied: '&',
                onError: '&',
                text: '=',
                supported: '=?'
            },
            link: function (scope, element) {
                scope.supported = clipboard.supported;

                element.on('click', function (event) {
                    try {
                        clipboard.copyText(scope.text);
                        if (angular.isFunction(scope.onCopied)) {
                            scope.$evalAsync(scope.onCopied());
                        }
                    } catch (err) {
                        if (angular.isFunction(scope.onError)) {
                            scope.$evalAsync(scope.onError({err: err}));
                        }
                    }
                });
            }
        };
    }]);

}));
