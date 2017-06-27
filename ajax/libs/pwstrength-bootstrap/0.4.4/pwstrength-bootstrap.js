/*jslint browser: true, regexp: true, unparam: true */
/*global jQuery */

/*
* jQuery Password Strength plugin for Twitter Bootstrap
*
* Copyright (c) 2008-2013 Tane Piper
* Copyright (c) 2013 Alejandro Blanco
* Dual licensed under the MIT and GPL licenses.
*
*/

(function ($) {
    "use strict";

    var options = {
            errors: [],
            // Options
            minChar: 8,
            bootstrap3: false,
            errorMessages: {
                password_too_short: "<font color='red'>The Password is too short</font>",
                same_as_username: "Your password cannot be the same as your username"
            },
            scores: [17, 26, 40, 50],
            verdicts: ["Weak", "Normal", "Medium", "Strong", "Very Strong"],
            showVerdicts: true,
            showVerdictsInitially: false,
            raisePower: 1.4,
            usernameField: "#username",
            onLoad: undefined,
            onKeyUp: undefined,
            viewports: {
                progress: undefined,
                verdict: undefined,
                errors: undefined
            },
            // Rules stuff
            ruleScores: {
                wordNotEmail: -100,
                wordLength: -100,
                wordSimilarToUsername: -100,
                wordLowercase: 1,
                wordUppercase: 3,
                wordOneNumber: 3,
                wordThreeNumbers: 5,
                wordOneSpecialChar: 3,
                wordTwoSpecialChar: 5,
                wordUpperLowerCombo: 2,
                wordLetterNumberCombo: 2,
                wordLetterNumberCharCombo: 2
            },
            rules: {
                wordNotEmail: true,
                wordLength: true,
                wordSimilarToUsername: true,
                wordLowercase: true,
                wordUppercase: true,
                wordOneNumber: true,
                wordThreeNumbers: true,
                wordOneSpecialChar: true,
                wordTwoSpecialChar: true,
                wordUpperLowerCombo: true,
                wordLetterNumberCombo: true,
                wordLetterNumberCharCombo: true
            },
            validationRules: {
                wordNotEmail: function (options, word, score) {
                    return word.match(/^([\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+\.)*[\w\!\#$\%\&\'\*\+\-\/\=\?\^\`{\|\}\~]+@((((([a-z0-9]{1}[a-z0-9\-]{0,62}[a-z0-9]{1})|[a-z])\.)+[a-z]{2,6})|(\d{1,3}\.){3}\d{1,3}(\:\d{1,5})?)$/i) && score;
                },
                wordLength: function (options, word, score) {
                    var wordlen = word.length,
                        lenScore = Math.pow(wordlen, options.raisePower);
                    if (wordlen < options.minChar) {
                        lenScore = (lenScore + score);
                        options.errors.push(options.errorMessages.password_too_short);
                    }
                    return lenScore;
                },
                wordSimilarToUsername: function (options, word, score) {
                    var username = $(options.usernameField).val();
                    if (username && word.toLowerCase().match(username.toLowerCase())) {
                        options.errors.push(options.errorMessages.same_as_username);
                        return score;
                    }
                    return true;
                },
                wordLowercase: function (options, word, score) {
                    return word.match(/[a-z]/) && score;
                },
                wordUppercase: function (options, word, score) {
                    return word.match(/[A-Z]/) && score;
                },
                wordOneNumber : function (options, word, score) {
                    return word.match(/\d+/) && score;
                },
                wordThreeNumbers : function (options, word, score) {
                    return word.match(/(.*[0-9].*[0-9].*[0-9])/) && score;
                },
                wordOneSpecialChar : function (options, word, score) {
                    return word.match(/.[!,@,#,$,%,\^,&,*,?,_,~]/) && score;
                },
                wordTwoSpecialChar : function (options, word, score) {
                    return word.match(/(.*[!,@,#,$,%,\^,&,*,?,_,~].*[!,@,#,$,%,\^,&,*,?,_,~])/) && score;
                },
                wordUpperLowerCombo : function (options, word, score) {
                    return word.match(/([a-z].*[A-Z])|([A-Z].*[a-z])/) && score;
                },
                wordLetterNumberCombo : function (options, word, score) {
                    return word.match(/([a-zA-Z])/) && word.match(/([0-9])/) && score;
                },
                wordLetterNumberCharCombo : function (options, word, score) {
                    return word.match(/([a-zA-Z0-9].*[!,@,#,$,%,\^,&,*,?,_,~])|([!,@,#,$,%,\^,&,*,?,_,~].*[a-zA-Z0-9])/) && score;
                }
            }
        },

        possibleProgressBarClasses = ["danger", "warning", "success"],

        updateProgressBarHTML = function ($bar, cssPrefix, cssClass, percentage) {
            var aux, i;

            $bar.addClass(cssPrefix + "bar-" + cssClass);
            for (i = 0; i < possibleProgressBarClasses.length; i += 1) {
                aux = possibleProgressBarClasses[i];
                if (aux !== cssClass) {
                    $bar.removeClass(cssPrefix + "bar-" + aux);
                }
            }
            $bar.css("width", percentage);
        },

        initVerdict = function (localOptions, $el, initial) {
            var $verdict;

            if (localOptions.viewports.verdict) {
                $verdict = $el.parent().find(localOptions.viewports.verdict).find(".password-verdict");
            } else {
                $verdict = $el.parent().find(".password-verdict");
            }

            if ($verdict.length === 0) {
                $verdict = $('<span class="password-verdict">' + initial + '</span>');
                if (localOptions.viewports.verdict) {
                    $el.parent().find(localOptions.viewports.verdict).append($verdict);
                } else {
                    $verdict.insertAfter($el);
                }
            }

            return $verdict;
        },

        setProgressBar = function ($el, score) {
            var localOptions = $el.data("pwstrength"),
                progressbar = localOptions.progressbar,
                cssPrefix = "",
                $bar = progressbar.find(".bar"),
                $verdict,
                verdictText;

            if (localOptions.bootstrap3) {
                $bar = progressbar.find(".progress-bar");
                cssPrefix = "progress-";
            }

            if (localOptions.showVerdicts) {
                $verdict = initVerdict(localOptions, $el, "");
            }

            if (score < localOptions.scores[0]) {
                updateProgressBarHTML($bar, cssPrefix, "danger", "5%");
                verdictText = localOptions.verdicts[0];
            } else if (score >= localOptions.scores[0] && score < localOptions.scores[1]) {
                updateProgressBarHTML($bar, cssPrefix, "danger", "25%");
                verdictText = localOptions.verdicts[1];
            } else if (score >= localOptions.scores[1] && score < localOptions.scores[2]) {
                updateProgressBarHTML($bar, cssPrefix, "warning", "50%");
                verdictText = localOptions.verdicts[2];
            } else if (score >= localOptions.scores[2] && score < localOptions.scores[3]) {
                updateProgressBarHTML($bar, cssPrefix, "warning", "75%");
                verdictText = localOptions.verdicts[3];
            } else if (score >= localOptions.scores[3]) {
                updateProgressBarHTML($bar, cssPrefix, "success", "100%");
                verdictText = localOptions.verdicts[4];
            }

            if (localOptions.showVerdicts) {
                $verdict.text(verdictText);
            }
        },

        calculateScore = function ($el) {
            var word = $el.val(),
                totalScore = 0,
                localOptions = $el.data("pwstrength");

            $.each(localOptions.rules, function (rule, active) {
                if (active === true) {
                    var score = localOptions.ruleScores[rule],
                        result = localOptions.validationRules[rule](localOptions, word, score);
                    if (result) {
                        totalScore += result;
                    }
                }
            });
            setProgressBar($el, totalScore);
            return totalScore;
        },

        progressWidget = function (localOptions) {
            var html = '<div class="progress"><div class="';
            if (localOptions.bootstrap3) {
                html += 'progress-';
            }
            return html + 'bar"></div></div>';
        },

        methods = {
            init: function (settings) {
                var self = this,
                    allOptions = $.extend(options, settings);

                return this.each(function (idx, el) {
                    var $el = $(el),
                        progressbar;

                    $el.data("pwstrength", $.extend({}, allOptions));

                    $el.on("keyup", function (event) {
                        var localOptions = $el.data("pwstrength");
                        localOptions.errors = [];
                        calculateScore.call(self, $el);
                        if ($.isFunction(localOptions.onKeyUp)) {
                            localOptions.onKeyUp(event);
                        }
                    });

                    progressbar = $(progressWidget(allOptions));
                    if (allOptions.viewports.progress) {
                        $el.parent().find(allOptions.viewports.progress).append(progressbar);
                    } else {
                        progressbar.insertAfter($el);
                    }
                    progressbar.find(".bar").css("width", "0%");
                    $el.data("pwstrength").progressbar = progressbar;

                    if (allOptions.showVerdictsInitially) {
                        initVerdict(allOptions, $el, allOptions.verdicts[0]);
                    }

                    if ($.isFunction(allOptions.onLoad)) {
                        allOptions.onLoad();
                    }
                });
            },

            destroy: function () {
                this.each(function (idx, el) {
                    var $el = $(el);
                    $el.parent().find("span.password-verdict").remove();
                    $el.parent().find("div.progress").remove();
                    $el.parent().find("ul.error-list").remove();
                    $el.removeData("pwstrength");
                });
            },

            forceUpdate: function () {
                var self = this;
                this.each(function (idx, el) {
                    var $el = $(el),
                        localOptions = $el.data("pwstrength");
                    localOptions.errors = [];
                    calculateScore.call(self, $el);
                });
            },

            outputErrorList: function () {
                this.each(function (idx, el) {
                    var output = '<ul class="error-list">',
                        $el = $(el),
                        errors = $el.data("pwstrength").errors,
                        viewports = $el.data("pwstrength").viewports,
                        verdict;
                    $el.parent().find("ul.error-list").remove();

                    if (errors.length > 0) {
                        $.each(errors, function (i, item) {
                            output += '<li>' + item + '</li>';
                        });
                        output += '</ul>';
                        if (viewports.errors) {
                            $el.parent().find(viewports.errors).html(output);
                        } else {
                            output = $(output);
                            verdict = $el.parent().find("span.password-verdict");
                            if (verdict.length > 0) {
                                el = verdict;
                            }
                            output.insertAfter(el);
                        }
                    }
                });
            },

            addRule: function (name, method, score, active) {
                this.each(function (idx, el) {
                    var localOptions = $(el).data("pwstrength");
                    localOptions.rules[name] = active;
                    localOptions.ruleScores[name] = score;
                    localOptions.validationRules[name] = method;
                });
            },

            changeScore: function (rule, score) {
                this.each(function (idx, el) {
                    $(el).data("pwstrength").ruleScores[rule] = score;
                });
            },

            ruleActive: function (rule, active) {
                this.each(function (idx, el) {
                    $(el).data("pwstrength").rules[rule] = active;
                });
            }
        };

    $.fn.pwstrength = function (method) {
        var result;
        if (methods[method]) {
            result = methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === "object" || !method) {
            result = methods.init.apply(this, arguments);
        } else {
            $.error("Method " +  method + " does not exist on jQuery.pwstrength");
        }
        return result;
    };
}(jQuery));
