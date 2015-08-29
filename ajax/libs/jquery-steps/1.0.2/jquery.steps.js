/*! 
 * jQuery Steps v1.0.2 - 10/15/2013
 * Copyright (c) 2013 Rafael Staib (http://www.jquery-steps.com)
 * Licensed under MIT http://www.opensource.org/licenses/MIT
 */
;(function ($, undefined)
{
var _uniqueId = 0;

var _cookiePrefix = "jQu3ry_5teps_St@te_";

var _tabSuffix = "-t-";

var _tabpanelSuffix = "-p-";

var _titleSuffix = "-h-";

var _indexOutOfRangeErrorMessage = "Index out of range.";

var _missingCorrespondingElementErrorMessage = "One or more corresponding step {0} are missing.";

function addStepToCache(wizard, step)
{
    getSteps(wizard).push(step);
}

function analyzeData(wizard, options, state)
{
    var stepTitles = wizard.children(options.headerTag),
        stepContents = wizard.children(options.bodyTag);

   
    if (stepTitles.length > stepContents.length)
    {
        throwError(_missingCorrespondingElementErrorMessage, "contents");
    }
    else if (stepTitles.length < stepContents.length)
    {
        throwError(_missingCorrespondingElementErrorMessage, "titles");
    }
        
    var startIndex = options.startIndex;

    state.stepCount = stepTitles.length;

   
    if (options.saveState && $.cookie)
    {
        var savedState = $.cookie(_cookiePrefix + getUniqueId(wizard));
       
        var savedIndex = parseInt(savedState, 0);
        if (!isNaN(savedIndex) && savedIndex < state.stepCount)
        {
            startIndex = savedIndex;
        }
    }

    state.currentIndex = startIndex;

    stepTitles.each(function (index)
    {
        var item = $(this),
            content = stepContents.eq(index),
            modeData = content.data("mode"),
            mode = (modeData == null) ? contentMode.html : getValidEnumValue(contentMode,
                (/^\s*$/.test(modeData) || isNaN(modeData)) ? modeData : parseInt(modeData, 0)),
            contentUrl = (mode === contentMode.html || content.data("url") === undefined) ?
                "" : content.data("url"),
            contentLoaded = (mode !== contentMode.html && content.data("loaded") === "1"),
            step = $.extend({}, stepModel, {
                title: item.html(),
                content: (mode === contentMode.html) ? content.html() : "",
                contentUrl: contentUrl,
                contentMode: mode,
                contentLoaded: contentLoaded
            });

        addStepToCache(wizard, step);
    });
}

function decreaseCurrentIndexBy(state, decreaseBy)
{
    return state.currentIndex - decreaseBy;
}

function destroy(wizard, options)
{
    var eventNamespace = getEventNamespace(wizard);

   
    wizard.unbind(eventNamespace).removeData("uid").removeData("options")
        .removeData("state").removeData("steps").removeData("eventNamespace")
        .find(".actions a").unbind(eventNamespace);

   
    wizard.removeClass(options.clearFixCssClass + " vertical");

    var contents = wizard.find(".content > *");

   
    contents.removeData("loaded").removeData("mode").removeData("url");

   
    contents.removeAttr("id").removeAttr("role").removeAttr("tabindex")
        .removeAttr("class").removeAttr("style")._removeAria("labelledby")
        ._removeAria("hidden");

   
    wizard.find(".content > [data-mode='async'],.content > [data-mode='iframe']").empty();

    var wizardSubstitute = $(format("<{0} class=\"{1}\"></{0}>", wizard.get(0).tagName, wizard.attr("class")));

    if (wizard.attr("id") != null && wizard.attr("id") !== "")
    {
        wizardSubstitute._setId(wizard.attr("id"));
    }

    wizardSubstitute.html(wizard.find(".content").html());
    wizard.after(wizardSubstitute);
    wizard.remove();
}

function finishStep(wizard, state)
{
    var currentStep = wizard.find(".steps li").eq(state.currentIndex);

    if (wizard.triggerHandler("finishing", [state.currentIndex]))
    {
        currentStep.addClass("done").removeClass("error");
        wizard.triggerHandler("finished", [state.currentIndex]);
    }
    else
    {
        currentStep.addClass("error");
    }
}

function format(value)
{
    for (var i = 1; i < arguments.length; i++)
    {
        var index = (i - 1);
        var pattern = new RegExp("\\{" + index + "\\}", "gm");
        value = value.replace(pattern, arguments[i]);
    }

    return value;
}

function getEventNamespace(wizard)
{
    var eventNamespace = wizard.data("eventNamespace");

    if (eventNamespace == null)
    {
        eventNamespace = "." + getUniqueId(wizard);
        wizard.data("eventNamespace", eventNamespace);
    }

    return eventNamespace;
}

function getStepAnchor(wizard, index)
{
    var uniqueId = getUniqueId(wizard);

    return wizard.find("#" + uniqueId + _tabSuffix + index);
}

function getStepPanel(wizard, index)
{
    var uniqueId = getUniqueId(wizard);

    return wizard.find("#" + uniqueId + _tabpanelSuffix + index);
}

function getStepTitle(wizard, index)
{
    var uniqueId = getUniqueId(wizard);

    return wizard.find("#" + uniqueId + _titleSuffix + index);
}

function getOptions(wizard)
{
    return wizard.data("options");
}

function getState(wizard)
{
    return wizard.data("state");
}

function getSteps(wizard)
{
    return wizard.data("steps");
}

function getStep(wizard, index)
{
    var steps = getSteps(wizard);

    if (index < 0 || index >= steps.length)
    {
        throwError(_indexOutOfRangeErrorMessage);
    }

    return steps[index];
}

function getUniqueId(wizard)
{
    var uniqueId = wizard.data("uid");

    if (uniqueId == null)
    {
        uniqueId = "steps-uid-".concat(++_uniqueId);
        wizard.data("uid", uniqueId);
    }

    return uniqueId;
}

function getValidEnumValue(enumType, keyOrValue)
{
    validateArgument("enumType", enumType);
    validateArgument("keyOrValue", keyOrValue);

   
    if (typeof keyOrValue === "string")
    {
        var value = enumType[keyOrValue];
        if (value === undefined)
        {
            throwError("The enum key '{0}' does not exist.", keyOrValue);
        }

        return value;
    }
   
    else if (typeof keyOrValue === "number")
    {
        for (var key in enumType)
        {
            if (enumType[key] === keyOrValue)
            {
                return keyOrValue;
            }
        }

        throwError("Invalid enum value '{0}'.", keyOrValue);
    }
   
    else
    {
        throwError("Invalid key or value type.");
    }
}

function goToNextStep(wizard, options, state)
{
    return paginationClick(wizard, options, state, increaseCurrentIndexBy(state, 1));
}

function goToPreviousStep(wizard, options, state)
{
    return paginationClick(wizard, options, state, decreaseCurrentIndexBy(state, 1));
}

function goToStep(wizard, options, state, index)
{
    if (index < 0 || index >= state.stepCount)
    {
        throwError(_indexOutOfRangeErrorMessage);
    }

    if (options.forceMoveForward && index < state.currentIndex)
    {
        return;
    }

    var oldIndex = state.currentIndex;
    if (wizard.triggerHandler("stepChanging", [state.currentIndex, index]))
    {
       
        state.currentIndex = index;
        saveCurrentStateToCookie(wizard, options, state);

       
        refreshStepNavigation(wizard, options, state, oldIndex);
        refreshPagination(wizard, options, state);
        loadAsyncContent(wizard, options, state);
        startTransitionEffect(wizard, options, state, index, oldIndex);

        wizard.triggerHandler("stepChanged", [index, oldIndex]);
    }
    else
    {
        wizard.find(".steps li").eq(oldIndex).addClass("error");
    }

    return true;
}

function increaseCurrentIndexBy(state, increaseBy)
{
    return state.currentIndex + increaseBy;
}

function initialize(options)
{
        var opts = $.extend(true, {}, defaults, options);

    return this.each(function ()
    {
        var wizard = $(this);
        var state = {
            currentIndex: opts.startIndex,
            currentStep: null,
            stepCount: 0,
            transitionElement: null
        };

       
        wizard.data("options", opts);
        wizard.data("state", state);
        wizard.data("steps", []);

        analyzeData(wizard, opts, state);
        render(wizard, opts, state);
        registerEvents(wizard, opts);

       
        if (opts.autoFocus && _uniqueId === 0)
        {
            getStepAnchor(wizard, opts.startIndex).focus();
        }
    });
}

function insertStep(wizard, options, state, index, step)
{
    if (index < 0 || index > state.stepCount)
    {
        throwError(_indexOutOfRangeErrorMessage);
    }

   

   
    step = $.extend({}, stepModel, step);
    insertStepToCache(wizard, index, step);
    if (state.currentIndex >= index)
    {
        state.currentIndex++;
        saveCurrentStateToCookie(wizard, options, state);
    }
    state.stepCount++;

    var contentContainer = wizard.find(".content"),
        header = $(format("<{0}>{1}</{0}>", options.headerTag, step.title)),
        body = $(format("<{0}></{0}>", options.bodyTag));

    if (step.contentMode == null || step.contentMode === contentMode.html)
    {
        body.html(step.content);
    }

    if (index === 0)
    {
        contentContainer.prepend(body).prepend(header);
    }
    else
    {
        getStepPanel(wizard, (index - 1)).after(body).after(header);
    }

    renderBody(wizard, body, index);
    renderTitle(wizard, options, state, header, index);
    refreshSteps(wizard, options, state, index);
    refreshPagination(wizard, options, state);

    return wizard;
}

function insertStepToCache(wizard, index, step)
{
    getSteps(wizard).splice(index, 0, step);
}

function keyUpHandler(event)
{
    var wizard = $(this),
        options = getOptions(wizard),
        state = getState(wizard);

    if (options.suppressPaginationOnFocus && wizard.find(":focus").is(":input"))
    {
        event.preventDefault();
        return false;
    }

    var keyCodes = { left: 37, right: 39 };
    if (event.keyCode === keyCodes.left)
    {
        event.preventDefault();
        goToPreviousStep(wizard, options, state);
    }
    else if (event.keyCode === keyCodes.right)
    {
        event.preventDefault();
        goToNextStep(wizard, options, state);
    }
}

function loadAsyncContent(wizard, options, state)
{
    if (state.stepCount > 0)
    {
        var currentStep = getStep(wizard, state.currentIndex);

        if (!options.enableContentCache || !currentStep.contentLoaded)
        {
            switch (getValidEnumValue(contentMode, currentStep.contentMode))
            {
                case contentMode.iframe:
                    wizard.find(".content > .body").eq(state.currentIndex).empty()
                        .html("<iframe src=\"" + currentStep.contentUrl + "\" frameborder=\"0\" scrolling=\"no\" />")
                        .data("loaded", "1");
                    break;

                case contentMode.async:
                    var currentStepContent = getStepPanel(wizard, state.currentIndex)._aria("busy", "true")
                        .empty().append(renderTemplate(options.loadingTemplate, { text: options.labels.loading }));

                    $.ajax({ url: currentStep.contentUrl, cache: false }).done(function (data)
                    {
                        currentStepContent.empty().html(data)._aria("busy", "false").data("loaded", "1");
                    });
                    break;
            }
        }
    }
}

function paginationClick(wizard, options, state, index)
{
    var oldIndex = state.currentIndex;

    if (index >= 0 && index < state.stepCount && !(options.forceMoveForward && index < state.currentIndex))
    {
        var anchor = getStepAnchor(wizard, index),
            parent = anchor.parent(),
            isDisabled = parent.hasClass("disabled");

       
        parent._enableAria();
        anchor.click();

       
        if (oldIndex === state.currentIndex && isDisabled)
        {
           
            parent._disableAria();
            return false;
        }

        return true;
    }

    return false;
}

function paginationClickHandler(event)
{
    event.preventDefault();

    var anchor = $(this),
        wizard = anchor.parent().parent().parent().parent(),
        options = getOptions(wizard),
        state = getState(wizard),
        href = anchor.attr("href");

    switch (href.substring(href.lastIndexOf("#")))
    {
        case "#finish":
            finishStep(wizard, options, state);
            break;

        case "#next":
            goToNextStep(wizard, options, state);
            break;

        case "#previous":
            goToPreviousStep(wizard, options, state);
            break;
    }
}

function refreshPagination(wizard, options, state)
{
    if (options.enablePagination)
    {
        var finish = wizard.find(".actions a[href$='#finish']").parent(),
            next = wizard.find(".actions a[href$='#next']").parent();

        if (!options.forceMoveForward)
        {
            var previous = wizard.find(".actions a[href$='#previous']").parent();
            if (state.currentIndex > 0)
            {
                previous._enableAria();
            }
            else
            {
                previous._disableAria();
            }
        }

        if (options.enableFinishButton && options.showFinishButtonAlways)
        {
            if (state.stepCount === 0)
            {
                finish._disableAria();
                next._disableAria();
            }
            else if (state.stepCount > 1 && state.stepCount > (state.currentIndex + 1))
            {
                finish._enableAria();
                next._enableAria();
            }
            else
            {
                finish._enableAria();
                next._disableAria();
            }
        }
        else
        {
            if (state.stepCount === 0)
            {
                finish._hideAria();
                next._showAria()._disableAria();
            }
            else if (state.stepCount > (state.currentIndex + 1))
            {
                finish._hideAria();
                next._showAria()._enableAria();
            }
            else if (!options.enableFinishButton)
            {
                next._disableAria();
            }
            else
            {
                finish._showAria();
                next._hideAria();
            }
        }
    }
}

function refreshStepNavigation(wizard, options, state, oldIndex)
{
    var currentOrNewStepAnchor = getStepAnchor(wizard, state.currentIndex),
        currentInfo = $("<span class=\"current-info audible\">" + options.labels.current + " </span>"),
        stepTitles = wizard.find(".content > .title");

    if (oldIndex != null)
    {
        var oldStepAnchor = getStepAnchor(wizard, oldIndex);
        oldStepAnchor.parent().addClass("done").removeClass("error")._deselectAria();
        stepTitles.eq(oldIndex).removeClass("current").next(".body").removeClass("current");
        currentInfo = oldStepAnchor.find(".current-info");
        currentOrNewStepAnchor.focus();
    }

    currentOrNewStepAnchor.prepend(currentInfo).parent()._selectAria().removeClass("done")._enableAria();
    stepTitles.eq(state.currentIndex).addClass("current").next(".body").addClass("current");
}

function refreshSteps(wizard, options, state, index)
{
    var uniqueId = getUniqueId(wizard);

    for (var i = index; i < state.stepCount; i++)
    {
        var uniqueStepId = uniqueId + _tabSuffix + i,
            uniqueBodyId = uniqueId + _tabpanelSuffix + i,
            uniqueHeaderId = uniqueId + _titleSuffix + i,
            title = wizard.find(".title").eq(i)._setId(uniqueHeaderId);

        wizard.find(".steps a").eq(i)._setId(uniqueStepId)
            ._aria("controls", uniqueBodyId).attr("href", "#" + uniqueHeaderId)
            .html(renderTemplate(options.titleTemplate, { index: i + 1, title: title.html() }));
        wizard.find(".body").eq(i)._setId(uniqueBodyId)
            ._aria("labelledby", uniqueHeaderId);
    }
}

function registerEvents(wizard, options)
{
    var eventNamespace = getEventNamespace(wizard);

    wizard.bind("finishing" + eventNamespace, options.onFinishing);
    wizard.bind("finished" + eventNamespace, options.onFinished);
    wizard.bind("stepChanging" + eventNamespace, options.onStepChanging);
    wizard.bind("stepChanged" + eventNamespace, options.onStepChanged);

    if (options.enableKeyNavigation)
    {
        wizard.bind("keyup" + eventNamespace, keyUpHandler);
    }

    wizard.find(".actions a").bind("click" + eventNamespace, paginationClickHandler);
}

function removeStep(wizard, options, state, index)
{
   
    if (index < 0 || index >= state.stepCount || state.currentIndex === index)
    {
        return false;
    }

   
    removeStepFromCache(wizard, index);
    if (state.currentIndex > index)
    {
        state.currentIndex--;
        saveCurrentStateToCookie(wizard, options, state);
    }
    state.stepCount--;

    getStepTitle(wizard, index).remove();
    getStepPanel(wizard, index).remove();
    getStepAnchor(wizard, index).parent().remove();

   
    if (index === 0)
    {
        wizard.find(".steps li").first().addClass("first");
    }

   
    if (index === state.stepCount)
    {
        wizard.find(".steps li").eq(index).addClass("last");
    }

    refreshSteps(wizard, options, state, index);
    refreshPagination(wizard, options, state);

    return true;
}

function removeStepFromCache(wizard, index)
{
    getSteps(wizard).splice(index, 1);
}

function render(wizard, options, state)
{
   
    var wrapperTemplate = "<{0} class=\"{1}\">{2}</{0}>",
        orientation = getValidEnumValue(stepsOrientation, options.stepsOrientation),
        verticalCssClass = (orientation === stepsOrientation.vertical) ? " vertical" : "",
        contentWrapper = $(format(wrapperTemplate, options.contentContainerTag, "content " + options.clearFixCssClass, wizard.html())),
        stepsWrapper = $(format(wrapperTemplate, options.stepsContainerTag, "steps " + options.clearFixCssClass, "<ul role=\"tablist\"></ul>")),
        stepTitles = contentWrapper.children(options.headerTag),
        stepContents = contentWrapper.children(options.bodyTag);

   
    wizard.attr("role", "application").empty().append(stepsWrapper).append(contentWrapper)
        .addClass(options.cssClass + " " + options.clearFixCssClass + verticalCssClass);

   
    stepContents.each(function (index)
    {
        renderBody(wizard, $(this), index);
    });

   
    stepContents.eq(state.currentIndex)._showAria();

    stepTitles.each(function (index)
    {
        renderTitle(wizard, options, state, $(this), index);
    });

    refreshStepNavigation(wizard, options, state);
    renderPagination(wizard, options, state);
}

function renderBody(wizard, body, index)
{
    var uniqueId = getUniqueId(wizard),
        uniqueBodyId = uniqueId + _tabpanelSuffix + index,
        uniqueHeaderId = uniqueId + _titleSuffix + index;

    body._setId(uniqueBodyId).attr("role", "tabpanel")._aria("labelledby", uniqueHeaderId)
        .addClass("body")._hideAria();
}

function renderPagination(wizard, options, state)
{
    if (options.enablePagination)
    {
        var pagination = "<{0} class=\"actions {1}\"><ul role=\"menu\" aria-label=\"{2}\">{3}</ul></{0}>",
            buttonTemplate = "<li><a href=\"#{0}\" role=\"menuitem\">{1}</a></li>",
            buttons = "";

        if (!options.forceMoveForward)
        {
            buttons += format(buttonTemplate, "previous", options.labels.previous);
        }

        buttons += format(buttonTemplate, "next", options.labels.next);

        if (options.enableFinishButton)
        {
            buttons += format(buttonTemplate, "finish", options.labels.finish);
        }

        wizard.append(format(pagination, options.actionContainerTag, options.clearFixCssClass,
            options.labels.pagination, buttons));

        refreshPagination(wizard, options, state);
        loadAsyncContent(wizard, options, state);
    }
}

function renderTemplate(template, substitutes)
{
    var matches = template.match(/#([a-z]*)#/gi);

    for (var i = 0; i < matches.length; i++)
    {
        var match = matches[i], 
            key = match.substring(1, match.length - 1);

        if (substitutes[key] === undefined)
        {
            throwError("The key '{0}' does not exist in the substitute collection!", key);
        }

        template = template.replace(match, substitutes[key]);
    }

    return template;
}

function renderTitle(wizard, options, state, header, index)
{
    var uniqueId = getUniqueId(wizard),
        uniqueStepId = uniqueId + _tabSuffix + index,
        uniqueBodyId = uniqueId + _tabpanelSuffix + index,
        uniqueHeaderId = uniqueId + _titleSuffix + index,
        stepCollection = wizard.find(".steps > ul"),
        title = renderTemplate(options.titleTemplate, {
            index: index + 1,
            title: header.html()
        }),
        stepItem = $("<li role=\"tab\"><a id=\"" + uniqueStepId + "\" href=\"#" + uniqueHeaderId + 
            "\" aria-controls=\"" + uniqueBodyId + "\">" + title + "</a></li>");
        
    if (!options.enableAllSteps)
    {
        stepItem._disableAria();
    }

    if (state.currentIndex > index)
    {
        stepItem._enableAria().addClass("done");
    }

    header._setId(uniqueHeaderId).attr("tabindex", "-1").addClass("title");

    if (index === 0)
    {
        stepCollection.prepend(stepItem);
    }
    else
    {
        stepCollection.find("li").eq(index - 1).after(stepItem);
    }

   
    if (index === 0)
    {
        stepCollection.find("li").removeClass("first").eq(index).addClass("first");
    }

   
    if (index === (state.stepCount - 1))
    {
        stepCollection.find("li").removeClass("last").eq(index).addClass("last");
    }

   
    stepItem.children("a").bind("click" + getEventNamespace(wizard), stepClickHandler);
}

function saveCurrentStateToCookie(wizard, options, state)
{
    if (options.saveState && $.cookie)
    {
        $.cookie(_cookiePrefix + getUniqueId(wizard), state.currentIndex);
    }
}

function startTransitionEffect(wizard, options, state, index, oldIndex)
{
    var stepContents = wizard.find(".content > .body"),
        effect = getValidEnumValue(transitionEffect, options.transitionEffect),
        effectSpeed = options.transitionEffectSpeed,
        newStep = stepContents.eq(index),
        currentStep = stepContents.eq(oldIndex);

    switch (effect)
    {
        case transitionEffect.fade:
        case transitionEffect.slide:
            var hide = (effect === transitionEffect.fade) ? "fadeOut" : "slideUp",
                show = (effect === transitionEffect.fade) ? "fadeIn" : "slideDown";

            state.transitionElement = newStep;
            currentStep[hide](effectSpeed, function ()
            {
                var wizard = $(this)._hideAria().parent().parent(),
                    state = getState(wizard);

                if (state.transitionElement)
                {
                    state.transitionElement[show](effectSpeed, function ()
                    {
                        $(this)._showAria();
                    });
                    state.transitionElement = null;
                }
            }).promise();
            break;

        case transitionEffect.slideLeft:
            var outerWidth = currentStep.outerWidth(true),
                posFadeOut = (index > oldIndex) ? -(outerWidth) : outerWidth,
                posFadeIn = (index > oldIndex) ? outerWidth : -(outerWidth);

            currentStep.animate({ left: posFadeOut }, effectSpeed, 
                function () { $(this)._hideAria(); }).promise();
            newStep.css("left", posFadeIn + "px")._showAria()
                .animate({ left: 0 }, effectSpeed).promise();
            break;

        default:
            currentStep._hideAria();
            newStep._showAria();
            break;
    }
}

function stepClickHandler(event)
{
    event.preventDefault();

    var anchor = $(this),
        wizard = anchor.parent().parent().parent().parent(),
        options = getOptions(wizard),
        state = getState(wizard),
        oldIndex = state.currentIndex;

    if (anchor.parent().is(":not(.disabled):not(.current)"))
    {
        var href = anchor.attr("href"),
            position = parseInt(href.substring(href.lastIndexOf("-") + 1), 0);

        goToStep(wizard, options, state, position);
    }

   
    if (oldIndex === state.currentIndex)
    {
        getStepAnchor(wizard, oldIndex).focus();
        return false;
    }
}

function throwError(message)
{
    if (arguments.length > 1)
    {
        message = format.apply(this, arguments);
    }

    throw new Error(message);
}

function validateArgument(argumentName, argumentValue)
{
    if (argumentValue == null)
    {
        throwError("The argument '{0}' is null or undefined.", argumentName);
    }
}

$.fn.steps = function (method)
{
    if ($.fn.steps[method])
    {
        return $.fn.steps[method].apply(this, Array.prototype.slice.call(arguments, 1));
    }
    else if (typeof method === "object" || !method)
    {
        return initialize.apply(this, arguments);
    }
    else
    {
        $.error("Method " + method + " does not exist on jQuery.steps");
    }
};

$.fn.steps.add = function (step)
{
    var options = getOptions(this),
        state = getState(this);

    return insertStep(this, options, state, state.stepCount, step);
};

$.fn.steps.destroy = function ()
{
    var options = getOptions(this);

    return destroy(this, options);
};

$.fn.steps.finish = function ()
{
    var state = getState(this);

    finishStep(this, state);
};

$.fn.steps.getCurrentIndex = function ()
{
    return getState(this).currentIndex;
};

$.fn.steps.getCurrentStep = function ()
{
    return getStep(this, getState(this).currentIndex);
};

$.fn.steps.getStep = function (index)
{
    return getStep(this, index);
};

$.fn.steps.insert = function (index, step)
{
    var options = getOptions(this),
        state = getState(this);

    return insertStep(this, options, state, index, step);
};

$.fn.steps.next = function ()
{
    var options = getOptions(this),
        state = getState(this);

    return goToNextStep(this, options, state);
};

$.fn.steps.previous = function ()
{
    var options = getOptions(this),
        state = getState(this);

    return goToPreviousStep(this, options, state);
};

$.fn.steps.remove = function (index)
{
    var options = getOptions(this),
        state = getState(this);

    return removeStep(this, options, state, index);
};

$.fn.steps.setStep = function (index, step)
{
    throw new Error("Not yet implemented!");
};

$.fn.steps.skip = function (count)
{
    throw new Error("Not yet implemented!");
};

var contentMode = $.fn.steps.contentMode = {
        html: 0,

        iframe: 1,

        async: 2
};

var stepsOrientation = $.fn.steps.stepsOrientation = {
        horizontal: 0,

        vertical: 1
};

var transitionEffect = $.fn.steps.transitionEffect = {
        none: 0,

        fade: 1,

        slide: 2,

        slideLeft: 3
};

var stepModel = $.fn.steps.stepModel = {
    title: "",
    content: "",
    contentUrl: "",
    contentMode: contentMode.html,
    contentLoaded: false
};

var defaults = $.fn.steps.defaults = {
        headerTag: "h1",

        bodyTag: "div",

        contentContainerTag: "div",

        actionContainerTag: "div",

        stepsContainerTag: "div",

        cssClass: "wizard",

        clearFixCssClass: "clearfix",

        stepsOrientation: stepsOrientation.horizontal,

    
        titleTemplate: "<span class=\"number\">#index#.</span> #title#",

        loadingTemplate: "<span class=\"spinner\"></span> #text#",

    
        autoFocus: false,

        enableAllSteps: false,

        enableKeyNavigation: true,

        enablePagination: true,

        suppressPaginationOnFocus: true,

        enableContentCache: true,

        enableFinishButton: true,

        preloadContent: false,

        showFinishButtonAlways: false,

        forceMoveForward: false,

        saveState: false,

        startIndex: 0,

    
        transitionEffect: transitionEffect.none,

        transitionEffectSpeed: 200,

    
        onStepChanging: function (event, currentIndex, newIndex) { return true; },

        onStepChanged: function (event, currentIndex, priorIndex) { },

        onFinishing: function (event, currentIndex) { return true; },

        onFinished: function (event, currentIndex) { },

        labels: {
                current: "current step:",

                pagination: "Pagination",

                finish: "Finish",

                next: "Next",

                previous: "Previous",

                loading: "Loading ..."
    }
};

$.fn.extend({
    _aria: function (name, value)
    {
        return this.attr("aria-" + name, value);
    },

    _removeAria: function (name)
    {
        return this.removeAttr("aria-" + name);
    },

    _enableAria: function ()
    {
        return this.removeClass("disabled")._aria("disabled", "false");
    },

    _disableAria: function ()
    {
        return this.addClass("disabled")._aria("disabled", "true");
    },

    _hideAria: function ()
    {
        return this.hide()._aria("hidden", "true");
    },

    _showAria: function ()
    {
        return this.show()._aria("hidden", "false");
    },

    _selectAria: function ()
    {
        return this.addClass("current")._aria("selected", "true");
    },

    _deselectAria: function ()
    {
        return this.removeClass("current")._aria("selected", "false");
    },

    _setId: function (id)
    {
        return this.attr("id", id);
    }
});
})(jQuery);