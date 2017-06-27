//UUID
function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}

function guid() {
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// Outer HTML
(function($){
  $.fn.outerHtml = function() {
    if (this.length == 0) return false;
    var elem = this[0], name = elem.tagName.toLowerCase();
    if (elem.outerHTML) return elem.outerHTML;
    var attrs = $.map(elem.attributes, function(i) { return i.name+'="'+i.value+'"'; }); 
    return "<"+name+(attrs.length > 0 ? " "+attrs.join(" ") : "")+">"+elem.innerHTML+"</"+name+">";
  };
})(jQuery);

// Bind twitter typeahead
ko.bindingHandlers.typeahead = {
    init: function (element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
        var $element = $(element);
        var allBindings = allBindingsAccessor();
        var typeaheadArr = ko.utils.unwrapObservable(valueAccessor());
        
        $element.attr("autocomplete", "off")
				.typeahead({
				    'source': typeaheadArr,
				    'minLength': allBindings.minLength,
				    'items': allBindings.items,
				    'updater': allBindings.updater
				});
    }
};

// Bind Twitter Progress
ko.bindingHandlers.progress = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		var $element = $(element);

		var bar = $('<div/>', {
			'class':'bar',
			'data-bind':'style: { width:' + valueAccessor() + ' }'
		});

		$element.attr('id', guid())
			.addClass('progress progress-info')
			.append(bar);

		ko.applyBindingsToDescendants(viewModel, $element[0]);
	}
}

// Bind Twitter Alert
ko.bindingHandlers.alert = {
    init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    	var $element = $(element);
    	var alertInfo = ko.utils.unwrapObservable(valueAccessor());

    	var dismissBtn = $('<button/>', {
    		'type':'button',
    		'class':'close',
    		'data-dismiss':'alert'
    	}).html('&times;');

    	var alertMessage = $('<p/>').html(alertInfo.message);

    	$element.addClass('alert alert-'+alertInfo.priority)
    			.append(dismissBtn)
    			.append(alertMessage);
    }
};

// Bind Twitter Tooltip
ko.bindingHandlers.tooltip = {
  update: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
    var $element, options, tooltip;
    options = ko.utils.unwrapObservable(valueAccessor());
    $element = $(element);
    tooltip = $element.data('tooltip');
    if (tooltip) {
      $.extend(tooltip.options, options);
    } else {
      $element.tooltip(options);
    }
  }
};

// Bind Twitter Popover
ko.bindingHandlers.popover = {
	init: function(element, valueAccessor, allBindingsAccessor, viewModel, bindingContext) {
		// read popover options 
		var popoverBindingValues = ko.utils.unwrapObservable(valueAccessor());

		// set popover title 
		var popoverTitle = popoverBindingValues.title;
		
		// set popover template id
		var tmplId = popoverBindingValues.template;

		// set popover trigger
		var trigger = 'click';

		if (popoverBindingValues.trigger) {
			trigger = popoverBindingValues.trigger;
		}

		// update triggers
		if (trigger === 'hover') {
            trigger = 'mouseenter mouseleave';
        } else if (trigger === 'focus') {
            trigger = 'focus blur';
        }

		// set popover placement
		var placement = popoverBindingValues.placement;

		// get template html
		var tmplHtml = $('#' + tmplId).html();

		// create unique identifier to bind to
		var uuid = guid();
        var domId = "ko-bs-popover-" + uuid;

        // create correct binding context
        var childBindingContext = bindingContext.createChildContext(viewModel);

        // create DOM object to use for popover content
		var tmplDom = $('<div/>', {
			"class" : "ko-popover",
			"id" : domId
		}).html(tmplHtml);

		// set content options
		options = {
			content: $(tmplDom[0]).outerHtml(),
			title: popoverTitle
		};

		if (placement) {
			options.placement = placement;
		}

		if (popoverBindingValues.container) {
			options.container = popoverBindingValues.container;
		}

		// Need to copy this, otherwise all the popups end up with the value of the last item
        var popoverOptions = $.extend({}, ko.bindingHandlers.popover.options, options);

        // bind popover to element click
		$(element).bind(trigger, function () {
			var popoverAction = 'show';
			var popoverTriggerEl = $(this);

			// popovers that hover should be toggled on hover
			// not stay there on mouseout
			if (trigger !== 'click') {
				popoverAction = 'toggle';
			}

			// show/toggle popover
			popoverTriggerEl.popover(popoverOptions).popover(popoverAction);

			// hide other popovers and bind knockout to the popover elements
			var popoverInnerEl = $('#' + domId);
			$('.ko-popover').not(popoverInnerEl).parents('.popover').remove();
		
			// if the popover is visible bind the view model to our dom ID
			if($('#' + domId).is(':visible')){

                ko.applyBindingsToDescendants(childBindingContext, $('#' + domId)[0]);

                /* Since bootstrap calculates popover position before template is filled,
                 * a smaller popover height is used and it appears moved down relative to the trigger element.
                 * So we have to fix the position after the bind
                 *  */

                var triggerElementPosition = $(element).offset().top;
                var triggerElementLeft = $(element).offset().left;
                var triggerElementHeight = $(element).outerHeight();
                var triggerElementWidth = $(element).outerWidth();

                var popover = $(popoverInnerEl).parents('.popover');
                var popoverHeight = popover.outerHeight();
                var popoverWidth = popover.outerWidth();
                var arrowSize = 10;

                switch (popoverOptions.placement) {
                    case 'left':
                    case 'right':
                        popover.offset({ top: triggerElementPosition - popoverHeight / 2 + triggerElementHeight / 2 });
                        break;
                    case 'top':
                        popover.offset({ top: triggerElementPosition - popoverHeight - arrowSize, left: triggerElementLeft - popoverWidth / 2 + triggerElementWidth / 2 });
                        break;
                    case 'bottom':
                        popover.offset({ top: triggerElementPosition + triggerElementHeight + arrowSize, left:triggerElementLeft - popoverWidth/2 + triggerElementWidth/2});
                }
            }

            
            // bind close button to remove popover
            $(document).on('click', '[data-dismiss="popover"]', function (e) {
                popoverTriggerEl.popover('hide');
            });
		});

		// Also tell KO *not* to bind the descendants itself, otherwise they will be bound twice
		return { controlsDescendantBindings: true };
	},
	options: {
		placement: "right",
		title: "",
		html: true,
		content: "",
		trigger: "manual"
	}
};
