angular.module('angular-clipboard', [])
    .directive('clipboard', ['$document', function ($document) {
        return {
            restrict: 'A',
            scope: {
                onCopied: '&',
                onError: '&',
                text: '='
            },
            link: function (scope, element) {
                function createNode(text) {
                    var node = $document[0].createElement('span');
                    node.style.position = 'absolute';
                    node.style.left = '-10000px';
                    node.textContent = text;
                    return node;
                }

                function copyNode(node) {
                    var selection = $document[0].getSelection();
                    selection.removeAllRanges();

                    var range = $document[0].createRange();
                    range.selectNodeContents(node);
                    selection.addRange(range);

                    $document[0].execCommand('copy');
                    selection.removeAllRanges();
                }

                function copyText(text) {
                    var node = createNode(text);
                    $document[0].body.appendChild(node);
                    copyNode(node);
                    $document[0].body.removeChild(node);
                }

                element.on('click', function (event) {
                    try {
                        copyText(scope.text);
                        if (scope.onCopied) {
                            scope.onCopied();
                        }
                    } catch (err) {
                        if (scope.onError) {
                            scope.onError({err: err});
                        }
                    }
                });
            }
        };
    }]);