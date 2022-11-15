/*/* ===========================================================
 * trumbowyg.history.js v1.0
 * history plugin for Trumbowyg
 * http://alex-d.github.com/Trumbowyg
 * ===========================================================
 * Author : Sven Dunemann [dunemann@forelabs.eu]
 */

(function ($) {
    'use strict';
    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                history: {
                    redo: 'Redo',
                    undo: 'Undo'
                }
            },
            sl: {
                history: {
                    redo: 'Ponovno uveljavi',
                    undo: 'Razveljavi'
                }
            },
            by: {
                history: {
                    redo: 'Паўтарыць',
                    undo: 'Скасаваць'
                }
            },
            da: {
                history: {
                    redo: 'Annuller fortryd',
                    undo: 'Fortryd'
                }
            },
            de: {
                history: {
                    redo: 'Wiederholen',
                    undo: 'Rückgängig'
                }
            },
            et: {
                history: {
                    redo: 'Võta tagasi',
                    undo: 'Tee uuesti'
                }
            },
            fr: {
                history: {
                    redo: 'Annuler',
                    undo: 'Rétablir'
                }
            },
            hu: {
                history: {
                    redo: 'Visszállít',
                    undo: 'Visszavon'
                }
            },
            ko: {
                history: {
                    redo: '다시 실행',
                    undo: '되돌리기'
                }
            },
            pt_br: {
                history: {
                    redo: 'Refazer',
                    undo: 'Desfazer'
                }
            },
            ru: {
                history: {
                    redo: 'Повторить',
                    undo: 'Отменить'
                }
            },
            tr: {
                history: {
                    redo: 'Geri al',
                    undo: 'Yinele'
                }
            },
            zh_tw: {
               history: {
                   redo: '重做',
                   undo: '復原'
               }
            },
            // jshint camelcase:true
        },
        plugins: {
            history: {
                destroy: function (t) {
                    t.$c.off('tbwinit.history tbwchange.history');
                },
                init: function (t) {
                    t.o.plugins.history = $.extend(true, {
                        _stack: [],
                        _index: -1,
                        _focusEl: undefined
                    }, t.o.plugins.history || {});

                    var btnBuildDefRedo = {
                        title: t.lang.history.redo,
                        ico: 'redo',
                        key: 'Y',
                        fn: function () {
                            if (t.o.plugins.history._index < t.o.plugins.history._stack.length - 1) {
                                t.o.plugins.history._index += 1;
                                var index = t.o.plugins.history._index;
                                var newState = t.o.plugins.history._stack[index];

                                t.execCmd('html', newState);
                                // because of some semantic optimisations we have to save the state back
                                // to history
                                t.o.plugins.history._stack[index] = t.$ed.html();

                                carretToEnd();
                                toggleButtonStates();
                            }
                        }
                    };

                    var btnBuildDefUndo = {
                        title: t.lang.history.undo,
                        ico: 'undo',
                        key: 'Z',
                        fn: function () {
                            if (t.o.plugins.history._index > 0) {
                                t.o.plugins.history._index -= 1;
                                var index = t.o.plugins.history._index,
                                    newState = t.o.plugins.history._stack[index];

                                t.execCmd('html', newState);
                                // because of some semantic optimisations we have to save the state back
                                // to history
                                t.o.plugins.history._stack[index] = t.$ed.html();

                                carretToEnd();
                                toggleButtonStates();
                            }
                        }
                    };

                    var pushToHistory = function () {
                        var index = t.o.plugins.history._index,
                            stack = t.o.plugins.history._stack,
                            latestState = stack.slice(-1)[0] || '<p></p>',
                            prevState = stack[index],
                            newState = t.$ed.html(),
                            focusEl = t.doc.getSelection().focusNode,
                            focusElText = '',
                            latestStateTagsList,
                            newStateTagsList,
                            prevFocusEl = t.o.plugins.history._focusEl;

                        latestStateTagsList = $('<div>' + latestState + '</div>').find('*').map(function () {
                            return this.localName;
                        });
                        newStateTagsList = $('<div>' + newState + '</div>').find('*').map(function () {
                            return this.localName;
                        });
                        if (focusEl) {
                            t.o.plugins.history._focusEl = focusEl;
                            focusElText = focusEl.outerHTML || focusEl.textContent;
                        }

                        if (newState !== prevState) {
                            // a new stack entry is defined when current insert ends on a whitespace character
                            // or count of node elements has been changed
                            // or focused element differs from previous one
                            if (focusElText.slice(-1).match(/\s/) ||
                                !arraysAreIdentical(latestStateTagsList, newStateTagsList) ||
                                t.o.plugins.history._index <= 0 || focusEl !== prevFocusEl)
                            {
                                t.o.plugins.history._index += 1;
                                // remove newer entries in history when something new was added
                                // because timeline was changes with interaction
                                t.o.plugins.history._stack = stack.slice(
                                    0, t.o.plugins.history._index
                                );
                                // now add new state to modified history
                                t.o.plugins.history._stack.push(newState);
                            } else {
                                // modify last stack entry
                                t.o.plugins.history._stack[index] = newState;
                            }

                            toggleButtonStates();
                        }
                    };

                    var toggleButtonStates = function () {
                        var index = t.o.plugins.history._index,
                            stackSize = t.o.plugins.history._stack.length,
                            undoState = (index > 0),
                            redoState = (stackSize !== 0 && index !== stackSize - 1);

                        toggleButtonState('historyUndo', undoState);
                        toggleButtonState('historyRedo', redoState);
                    };

                    var toggleButtonState = function (btn, enable) {
                        var button = t.$box.find('.trumbowyg-' + btn + '-button');

                        if (enable) {
                            button.removeClass('trumbowyg-disable');
                        } else if (!button.hasClass('trumbowyg-disable')) {
                            button.addClass('trumbowyg-disable');
                        }
                    };

                    var arraysAreIdentical = function (a, b) {
                        if (a === b) {
                            return true;
                        }
                        if (a == null || b == null) {
                            return false;
                        }
                        if (a.length !== b.length) {
                            return false;
                        }

                        for (var i = 0; i < a.length; i += 1) {
                            if (a[i] !== b[i]) {
                                return false;
                            }
                        }
                        return true;
                    };

                    var carretToEnd = function () {
                        var node = t.doc.getSelection().focusNode,
                            range = t.doc.createRange();

                        if (node.childNodes.length > 0) {
                            range.setStartAfter(node.childNodes[node.childNodes.length - 1]);
                            range.setEndAfter(node.childNodes[node.childNodes.length - 1]);
                            t.doc.getSelection().removeAllRanges();
                            t.doc.getSelection().addRange(range);
                        }
                    };

                    t.$c.on('tbwinit.history tbwchange.history', pushToHistory);

                    t.addBtnDef('historyRedo', btnBuildDefRedo);
                    t.addBtnDef('historyUndo', btnBuildDefUndo);
                }
            }
        }
    });
})(jQuery);
