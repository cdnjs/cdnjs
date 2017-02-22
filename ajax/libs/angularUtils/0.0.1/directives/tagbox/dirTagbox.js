/**
 * Version 0.1.3
 *
 * A directive to enable tagging auto-complete on an input or textarea.
 *
 * For documentation, see the README.md file in this directory
 *
 * Created by Michael on 27/03/14.
 * Copyright Michael Bromley 2014
 * Available under the MIT license.
 */

(function() {

    angular.module('angularUtils.directives.dirTagBox', [])

        .directive('dirTagbox', function dirTagbox($compile, $parse) {
            return {
                restrict: 'A',
                scope: {
                    tags: '=dirTagbox',
                    callback: '&dirOnTagSelect'
                },
                link: function dirTagboxLinkingFn(scope, element, attrs) {

                    var TOKEN = attrs.dirTagtoken !== undefined ? attrs.dirTagtoken : '';

                    var input = element;
                    var isValidInputType = (input[0].nodeName === 'INPUT' && (input[0].type === 'text' || input[0].type === 'search' || input[0].type === 'email'));
                    if (input[0].nodeName !== 'TEXTAREA' && !isValidInputType) {
                        return;
                    }

                    // create wrapper div
                    var wrapper = angular.element('<div class="dir-tagbox-wrapper" style="position: relative; display: inline-block"></div>');
                    input.wrap(wrapper);

                    // create the suggestions div
                    var suggestions = makeSuggestionsBox();
                    input.parent().append(suggestions);

                    scope.candidateHashtag = "?";
                    scope.candidate = {
                        start: 0,
                        end: 0
                    };
                    scope.selectedIndex = null;
                    scope.filteredTags = [];
                    scope.isFocussed = ('autofocus' in input[0]);
                    var mouseIsOverSuggestions = false;

                    suggestions.on('click', function(e) {
                        var selectedTag = e.target.innerHTML.substring(TOKEN.length);
                        insertSelectedTag(selectedTag);
                        input[0].focus();
                        scope.$apply(function() {
                            scope.candidateHashtag = "?";
                        });
                    });

                    suggestions.on('mouseover', function() {
                        mouseIsOverSuggestions = true;
                        scope.$apply(function() {
                            scope.selectedIndex = null;
                        });
                    });
                    suggestions.on('mouseout', function() {
                        mouseIsOverSuggestions = false;
                    });

                    input.on('focus', function() {
                        scope.$apply(function() {
                            scope.isFocussed = true;
                        });
                    });

                    input.on('blur', function() {
                        if (!mouseIsOverSuggestions) {
                            scope.$apply(function() {
                                scope.isFocussed = false;
                            });
                        }
                    });

                    input.on('keyup', function() {
                        // is the caret inside a hashtag?
                        var candidateChanged = false;
                        var currentCaretIndex = getCaret(input[0]);
                        var text = input.val();
                        var regexp;
                        if (TOKEN !== '') {
                            regexp = new RegExp('\\B' + TOKEN + '\\w+', 'g');
                        } else {
                            regexp = new RegExp('\\b\\w+', 'g');
                        }
                        var match;
                        while ((match = regexp.exec(text)) !== null) {
                            var startOfHashtag = match.index;
                            var endOfHashtag = startOfHashtag + match[0].length;

                            if (startOfHashtag <= currentCaretIndex && currentCaretIndex <= endOfHashtag) {
                                candidateChanged =  match[0].substring(TOKEN.length);
                                scope.candidate.start = startOfHashtag;
                                scope.candidate.end = endOfHashtag;
                            }
                        }
                        scope.$apply(function() {
                            scope.candidateHashtag = candidateChanged ? candidateChanged : "?";
                        });
                    });

                    input.on('keydown', function(e) {
                        var listLength = scope.filteredTags.length;
                        if (0 < listLength) {
                            var currentIndex;
                            var nextIndex = null;

                            if (e.keyCode === 40) {
                                // down arrow pressed
                                e.preventDefault();
                                currentIndex = scope.selectedIndex === null ? -1 : parseInt(scope.selectedIndex, 10);
                                nextIndex = currentIndex === listLength - 1 ? 0 : currentIndex + 1;
                            } else if (e.keyCode === 38) {
                                // up arrow pressed
                                e.preventDefault();
                                currentIndex = scope.selectedIndex === null ? 0 : parseInt(scope.selectedIndex, 10);
                                nextIndex = currentIndex === 0 ? listLength - 1 : currentIndex - 1;
                            } else if (e.keyCode === 13) {
                                // enter key pressed
                                e.preventDefault();
                                var selectedTag = scope.filteredTags[scope.selectedIndex];
                                insertSelectedTag(selectedTag);
                            }

                            scope.$apply(function() {
                                scope.selectedIndex = nextIndex;
                            });
                        }
                    });

                    function makeSuggestionsBox() {
                        var suggestions =angular.element(
                            '<div class="suggestions-container" ng-show="isFocussed && 0 < filteredTags.length" tabindex="-1">' +
                                '<div class="suggestion" ng-class="{selected: $index == selectedIndex}" ng-repeat="tag in filteredTags = (tags | startsWith : candidateHashtag)">' + TOKEN + '{{ tag }}</div>' +
                                '</div>');
                        suggestions.css({
                            'position': 'absolute',
                            'width': input[0].offsetWidth + 'px',
                            'left': input[0].offsetLeft + 'px',
                            'max-height': '200px',
                            'overflow': 'auto',
                            'z-index': 100
                        });
                        $compile(suggestions)(scope);
                        return suggestions;
                    }

                    function insertSelectedTag(selectedTag) {
                        var output,
                            inputVal = input.val();

                        if (typeof selectedTag === 'undefined') {
                            output = inputVal;
                        } else {
                            output = inputVal.substring(0, scope.candidate.start) + TOKEN + selectedTag + inputVal.substring(scope.candidate.end);
                        }

                        scope.$parent.$apply(function() {
                            if (attrs.ngModel) {
                                var setter = $parse(attrs.ngModel).assign;
                                setter(scope.$parent, output);
                            }
                            input.val(output);
                        });

                        if(scope.callback) {
                            scope.callback();
                        }
                    }

                    /**
                     * function taken from http://stackoverflow.com/a/263796/772859
                     * @param el
                     * @returns {*}
                     */
                    function getCaret(el) {
                        if (el.selectionStart) {
                            return el.selectionStart;
                        } else if (document.selection) {
                            el.focus();

                            var r = document.selection.createRange();
                            if (r === null) {
                                return 0;
                            }

                            var re = el.createTextRange(),
                                rc = re.duplicate();
                            re.moveToBookmark(r.getBookmark());
                            rc.setEndPoint('EndToStart', re);

                            return rc.text.length;
                        }
                        return 0;
                    }
                }
            };
        })

    /**
     * Note - this filter is included since the default Angular `filter` filter will match a string that appears anywhere in the target string, but typically in a tag autocomplete, we only care about
     * matching the start of the string.
     */
        .filter('startsWith', function() {
            return function(array, search) {
                var matches = [];
                for(var i = 0; i < array.length; i++) {
                    if (array[i].toLowerCase().indexOf(search.toLowerCase()) === 0 &&
                        search.length < array[i].length) {
                        matches.push(array[i]);
                    }
                }
                return matches;
            };
        });

})();