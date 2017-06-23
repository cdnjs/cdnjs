/*!
 *  Elite Date Picker v2.0.3
 *
 *  Author: Mridul Ahuja
 *
 *  Github: https://github.com/mridah/datepicker
 *
 *  License: MIT
 */


(function($) {
	$.fn.extend({
		datepicker: function (params) {
			var dateInput = $(this);
			var selector = $(this).selector;

			if(params !== 'destroy') { /* initialize */
				var defaults = {
					format: 'Y-m-d',
					time: false,
					disableTyping: false
				};

				params = $.extend(defaults, params);

				dateInput.each(function(){
					generate_datepicker($(this), selector, params);
				});
				
			}
			else { /* destroy */
				destroy_datepicker(dateInput);
			}
		}
	});


	var generate_datepicker = (dateInput, inputSelector, params) => {

		var monthList = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
			'October', 'November', 'December'];
		var dayList = ['S', 'M', 'T', 'W', 'Th', 'F', 'Sa'];
		var dayMap = {'Sun': 1, 'Mon': 2, 'Tue': 3, 'Wed': 4, 'Thu': 5, 'Fri': 6, 'Sat': 7};
		var datepicker = $(`<div class="mr-elite-d-p date-picker" tabindex="-1" style="display: none;">
			<span class="up-tip"></span></div>`);
		var datepickerHeader = $(`<div class="header"></div>`);
		var mainContent = $(`<div class="main-content"><div class="m-c-items date-selector"><div class="days"></div>
			<div class="dates"></div><div class="footer-buttons"><span class="set-time-button">Set Time</span>
			<span class="ok-button">OK</span></div></div><div class="m-c-items month-selector"></div>
			<div class="m-c-items year-selector"></div><div class="m-c-items time-selector"></div></div>`);
		var monthSelectorButton;
		var selectMonthContainer;
		var selectMonth;
		var yearSelectorButton;
		var selectYearContainer;
		var selectYear;
		var timeSelectorContainer;
		var hourSelector;
		var minuteSelector;
		var monthFirstDate = new Date();
		var inputboxDate = dateInput.val() ? dateInput.val() : new Date().toJSON().slice(0,10);
		var inputboxDateFormatted;
		var inpytboxDateSplit;
		var prevButton;
		var nextButton;
		var currentYearSelected;
		var currentMonthSelected;
		var currentDateSelected;
		var scrollToPos;
		var setTimeButton;
		var setTime;
		var okButton;


		/*
			function declarations start here
		*/

		var pad_date = (nr, n, str) => {
			return Array(n-String(nr).length+1).join(str||'0')+nr;
		};


		var format_date_Y_m_d = (date, format) => {
			format = format.substr(0, 5);
			var formattedDate;
			date[0] = parseInt(date[0]);
			date[1] = parseInt(date[1]);
			date[2] = parseInt(date[2]);
			switch(format) {
				case 'd-m-Y':
				case 'd/m/Y':
					formattedDate = date[2] 
						+ '-' + date[1] 
						+ '-' + date[0];
					currentDateSelected = date[0];
					currentMonthSelected = date[1];
					currentYearSelected = date[2];
					break;

				case 'm-d-Y':
				case 'm/d/Y':
					formattedDate = date[2] 
						+ '-' + date[0] 
						+ '-' + date[1];
					currentDateSelected = date[1];
					currentMonthSelected = date[0];
					currentYearSelected = date[2];
					break;

				case 'Y-m-d':
				case 'Y/m/d':
					formattedDate = date[0] 
						+ '-' + date[1] 
						+ '-' + date[2];
					currentDateSelected = date[2];
					currentMonthSelected = date[1];
					currentYearSelected = date[0];
					break;

				case 'Y-d-m':
				case 'Y/d/m':
					formattedDate = date[0] 
						+ '-' + date[2] 
						+ '-' + date[1];
					currentDateSelected = date[1];
					currentMonthSelected = date[2];
					currentYearSelected = date[0];
					break;
			}
			return formattedDate;
		};


		var days_in_month = (month, year) => {
			return new Date(year, month, 0).getDate();
		}


		var to_JSON_local = (date) => {
			var local = new Date(date);
			local.setMinutes(date.getMinutes() - date.getTimezoneOffset());
			return local.toJSON().slice(0, 10);
		}


		var get_new_date = () => {
			var newDate = params.format.substr(0, 5);
			
				newDate = newDate.replace('d', pad_date(currentDateSelected, 2));
				newDate = newDate.replace('m', pad_date(currentMonthSelected, 2));
				newDate = newDate.replace('Y', currentYearSelected);

			if(params.time) {
				newDate += ' ' + setTime;
			}
			return newDate;
		};


		var create_dates = (month = undefined, year = undefined) => {
			monthFirstDate = new Date(currentMonthSelected + '-01-' + currentYearSelected);
			var datesContainer = mainContent.find(`.date-selector .dates`);
			var i;
			var firstDay = monthFirstDate.toString().substr(0,3);
			var d;

			/* converting day to number */
			firstDay = dayMap[firstDay];
			datesContainer.html('');

			for(i = 1; i< firstDay; i++) {
				datesContainer.append(`<div class="date" style="padding: 0;"></div>`);
			}

			if(month && year) {
				var days = days_in_month(month, year);
				for(i = 1; i<= days; i++) {
					d = to_JSON_local(new Date(year + '-' + month + '-' + i));
					datesContainer.append(`<div class="date" dpd="` + d + `">` + i + `</div>`);
				}

			}
		};


		var select_selected_date = () => {
			var selectedDate = mainContent.find(`.dates .date`);

			selectedDate = selectedDate.filter(function(){
				return $(this).text() == datepickerHeader.find(`.date`).text();
			});

			if(selectedDate.length) {
				selectedDate.addClass('selected');
				currentDateSelected = selectedDate.text();
				datepickerHeader.find(`.day`).text( new Date(
					currentYearSelected + '-' + currentMonthSelected + '-' + currentDateSelected)
					.toString().substr(0,3) );
			}
			else {
				var toSel = mainContent.find(`.dates .date:last-child`);
				datepickerHeader.find(`.date`).text(toSel.text());
				currentDateSelected = toSel.text();
				toSel.addClass('selected');
				datepickerHeader.find(`.day`).text( new Date(
					currentYearSelected + '-' + currentMonthSelected + '-' + currentDateSelected)
					.toString().substr(0,3) );
			}
		};


		var date_handler = (separator) => {
			inputboxDateSplit = inputboxDate.split(separator);
				if(!inputboxDateSplit>2){
					console.error('Invalid date encountered on `' + inputSelector + '`');
					return;
				}

				inputboxDateFormatted = format_date_Y_m_d(inputboxDateSplit, params.format);

				inputboxDateFormatted = new Date(inputboxDateFormatted)
				if(inputboxDateFormatted == 'Invalid Date') {
					console.error('Invalid date encountered on `' + inputSelector + '`');
					return;
				}

				datepickerHeader.find(`.date`).text(currentDateSelected);
				monthSelectorButton.text(monthList[parseInt(currentMonthSelected) - 1].substr(0, 3));
				monthSelectorButton.attr('dm', parseInt(currentMonthSelected));
				yearSelectorButton.text(currentYearSelected);
				yearSelectorButton.attr('dy', parseInt(currentYearSelected));

				/* removing previously selected month and year */
				selectMonthContainer.find(`.month`).removeClass(`selected`);
				selectYearContainer.find(`.year`).removeClass(`selected`);

				/* selecting month and year */
				selectMonthContainer.find('[dm="' + parseInt(currentMonthSelected) + '"]').addClass(`selected`);
				selectYearContainer.find('[dy="' + parseInt(currentYearSelected) + '"]').addClass(`selected`);

				scrollToPos = selectYearContainer.find('.year[dy="2018"]').get(0).offsetTop;

				selectYearContainer.get(0).scrollTop = scrollToPos-10;

				create_dates(parseInt(currentMonthSelected), currentYearSelected);
				mainContent.find(`[dpd="` + to_JSON_local(inputboxDateFormatted) + `"]`).addClass(`selected`);

		};


		var read_time = () => {
			mainContent.find(`.time-selector .select-hours .hour`).removeClass('selected');
			mainContent.find(`.time-selector .select-minutes .minute`).removeClass('selected');

			setTime = dateInput.val().substr(11, 19);

			var timeString = dateInput.val().split(' ');
			var timeStringSplit = timeString[1].split(':');
			var hour = parseInt(timeStringSplit[0]);
			var min = parseInt(timeStringSplit[1]);
			
			var selectedHour;
			var selectedMins;

			if(params.format.substr(6, 11) == 'h:i:a') {
				var ampm = timeString[2];
				selectedHour = mainContent.find(`.time-selector .select-hours .hour`).filter(function(){
					return $(this).text() == hour;
				});
				selectedMins = mainContent.find(`.time-selector .select-minutes .minute`).filter(function(){
					return $(this).text() == min;
				});

				selectedHour.parent().get(0).scrollTop = 0;
				selectedMins.parent().get(0).scrollTop = 0;

				selectedHour.addClass('selected');
				selectedMins.addClass('selected');

				selectedHour.parent().animate({
					scrollTop: selectedHour.position().top - 100
				}, 'fast');

				selectedMins.parent().animate({
					scrollTop: selectedMins.position().top - 100
				}, 'fast');

				mainContent.find(`.time-selector .am-pm`).removeClass('selected');

				if(ampm == 'AM') 
					mainContent.find(`.time-selector .am-mode-select`).addClass('selected');

				if(ampm == 'PM') 
					mainContent.find(`.time-selector .pm-mode-select`).addClass('selected');

			}
			else if(params.format.substr(6, 11) == 'h:i:s') {
				mainContent.find(`.time-selector .am-pm`).removeClass('selected');

				if(!parseInt(hour)) { /* 12 AM */
					mainContent.find(`.time-selector .am-mode-select`).addClass('selected');
					hour = 12;
				}
				else if(parseInt(hour)>12) { /* PM */
					mainContent.find(`.time-selector .pm-mode-select`).addClass('selected');
					hour = parseInt(hour) - 12;
				}
				else if(parseInt(hour)<12) { /* AM */
					mainContent.find(`.time-selector .am-mode-select`).addClass('selected');
				}
				else {
					mainContent.find(`.time-selector .pm-mode-select`).addClass('selected');
				}

				selectedHour = mainContent.find(`.time-selector .select-hours .hour`).filter(function(){
					return $(this).text() == hour;
				});

				selectedMins = mainContent.find(`.time-selector .select-minutes .minute`).filter(function(){
					return $(this).text() == min;
				});

				selectedHour.parent().get(0).scrollTop = 0;
				selectedMins.parent().get(0).scrollTop = 0;

				selectedHour.addClass('selected');
				selectedMins.addClass('selected');

				selectedHour.parent().animate({
					scrollTop: selectedHour.position().top - 100
				}, 'fast');

				selectedMins.parent().animate({
					scrollTop: selectedMins.position().top - 100
				}, 'fast');
			}
		}


		/*
			function declarations end here
		*/


		datepickerHeader.append(`<div class="prev"><</div><div class="selected-date"></div><div class="next">></div>`);

		datepicker.append(datepickerHeader);
		datepicker.append(mainContent)

		datepickerHeader.find('.selected-date').append(`<span class="day">Mon</span><span class="comma">,</span>
			<span class="date">8</span> <span class="month">Sep</span> <span class="year">2017</span>`);

		datepicker.insertAfter(dateInput);


		/*
			filling info in datepicker
		*/

		/* adding months in mainContent */
		$.each(monthList, ( index, value ) => {
			mainContent.find(`.month-selector`).append(
				`<div class="month" dm="` + (index+1) + `">` + value + `</div>`
			);
		});

		/* adding years in mainContent */
		for(var i=2050; i>1950; i--) {
			mainContent.find(`.year-selector`).append(
				`<div class="year" dy="` + i + `">` + i + `</div>`
			);
		}

		/* adding days in mainContent */
		$.each(dayList, ( index, value ) => {
			mainContent.find(`.date-selector .days`).append(
				`<div class="day" dd="` + (index+1) + `">` + value + `</div>`
			);
		});


		/* adding time selectors if time mode is enabled */
		if(params.time) {
			mainContent.find(`.time-selector`).append(`<div class="select-hours-container">
				<span class="up-arrow-small-hours"></span><div class="select-hours"></div>
				<span class="down-arrow-small-hours"></span><div class="hour-footer">HOURS</div></div>
				<div class="select-minutes-container"><span class="up-arrow-small-minutes">
				</span><div class="select-minutes"></div><span class="down-arrow-small-minutes"></span>
				<div class="minutes-footer">MIN</div></div><div class="am-pm-container">
				<div class="am-pm am-mode-select">AM</div><div class="am-pm pm-mode-select">PM</div>
				</div><span class="back-to-calendar">BACK</span>`);

			for(var i=1; i<13; i++) {
				mainContent.find(`.time-selector .select-hours`).append(
					`<div class="hour" hour="` + i + `"> ` + i + `</div>`
				);
			}
			for(var i=1; i<60; i++) {
				mainContent.find(`.time-selector .select-minutes`).append(
					`<div class="minute" minute="` + i + `"> ` + i + `</div>`
				);
			}
		}
		else {
			mainContent.find(`.footer-buttons .set-time-button`).css('visibility', 'hidden');
		}


		/*
			creating references
		*/

		prevButton = datepickerHeader.find(`.prev`);
		nextButton = datepickerHeader.find(`.next`);

		monthSelectorButton = datepickerHeader.find('.month');
		selectMonth = mainContent.find(`.month`);
		selectMonthContainer = selectMonth.parent();

		yearSelectorButton = datepickerHeader.find('.year');
		selectYear = mainContent.find(`.year`);
		selectYearContainer = selectYear.parent();

		setTimeButton = mainContent.find(`.footer-buttons .set-time-button`);
		timeSelectorContainer = mainContent.find(`.time-selector`);

		hourSelector = mainContent.find(`.time-selector .select-hours-container .hour`);
		minuteSelector = mainContent.find(`.time-selector .select-minutes-container .minute`);

		okButton = mainContent.find(`.footer-buttons .ok-button`);



		if(inputboxDate.includes('-')) {
			date_handler('-');
		}
		else if(inputboxDate.includes('/')) {
			date_handler('/');
		}


		/*
			event handlers start here
		*/


		/* month handlers */

		monthSelectorButton.click(() => {
			mainContent.find(`.m-c-items`).hide();
			mainContent.find(`.month-selector`).css('left', '200px').show();
			mainContent.find(`.month-selector`).animate({left:0}, 200);
		});


		selectMonth.click((e) => {
			var selected = $(e.currentTarget);
			var selectedMonth = selected.text();
			var monthHeader = datepickerHeader.find(`.month`);
			var monthSelector = mainContent.find(`.month-selector`);
			currentMonthSelected = selected.attr('dm');
			monthHeader.text(selectedMonth.substr(0, 3));
			monthHeader.attr('dm', selected.attr('dm'));
			monthSelector.find(`.month`).removeClass(`selected`);
			selected.addClass('selected');
			mainContent.find(`.month-selector`).hide();
			mainContent.find(`.date-selector`).css('left', '200px').show();
			mainContent.find(`.date-selector`).animate({left:0}, 200);

			monthFirstDate = new Date(selected.attr('dm') + '-01-' + currentYearSelected);
			create_dates(currentMonthSelected, currentYearSelected);

			/* selecting date */
			select_selected_date();
		});


		selectMonthContainer.on( 'mousewheel DOMMouseScroll', function (e) { 
			var e0 = e.originalEvent;
			var delta = e0.wheelDelta || -e0.detail;

			this.scrollTop += ( delta < 0 ? 1 : -1 ) * 8;
			e.preventDefault();
		});


		/* year handlers */

		yearSelectorButton.click(() => {
			mainContent.find(`.m-c-items`).hide();
			mainContent.find(`.year-selector`).css('left', '200px').show();
			mainContent.find(`.year-selector`).animate({left:0}, 200);
		});


		selectYear.click((e) => {
			var selected = $(e.currentTarget);
			var selectedYear = selected.text();
			var yearHeader = datepickerHeader.find(`.year`);
			var yearSelector = mainContent.find(`.year-selector`);
			currentYearSelected = selected.attr('dy');
			yearHeader.text(selectedYear);
			yearHeader.attr('dy', selected.attr('dy'));
			yearSelector.find(`.year`).removeClass(`selected`);
			selected.addClass('selected');
			mainContent.find(`.year-selector`).hide();
			mainContent.find(`.date-selector`).css('left', '200px').show();
			mainContent.find(`.date-selector`).animate({left:0}, 200);
			monthFirstDate = new Date(currentMonthSelected + '-01-' + selected.attr('dy'));
			create_dates(currentMonthSelected, currentYearSelected);

			/* selecting date */
			select_selected_date();
		});


		selectYearContainer.on( 'mousewheel DOMMouseScroll', function(e) { 
			var e0 = e.originalEvent;
			var delta = e0.wheelDelta || -e0.detail;

			this.scrollTop += ( delta < 0 ? 1 : -1 ) * 8;
			e.preventDefault();
		});


		/* input box handlers */

		dateInput.focus((e) => {
			var datepicker = $(e.currentTarget).next();
			datepicker.css('left', dateInput.get(0).offsetLeft);

			inputboxDate = dateInput.val() ? dateInput.val() : new Date().toJSON().slice(0,10);

			/* initializing datepicker with value from input */

			if(!params.time) {
				if(inputboxDate.includes('-')) {
					date_handler('-');
				}
				else if(inputboxDate.includes('/')) {
					date_handler('/');
				}
			}

			/* selecting date */
			select_selected_date();

			/* bringing up calendar */
			mainContent.find('.m-c-items').hide();
			mainContent.find('.date-selector').show();

			if(params.time)
				read_time();

			/* display datepicker */
			datepicker.fadeIn();
		});


		dateInput.keydown(function(e) {
			var code = e.keyCode || e.which;
			if (code === 9) { /* tab pressed */
				$('.mr-elite-d-p').fadeOut();
				return true;
			}

			if(params.disableTyping) {
				return false;
			}
		});


		if(params.disableTyping) {
			dateInput.bind("paste",function(e) {
				e.preventDefault();
			});
		}


		datepicker.bind('keydown', function(e) {
			var code = e.keyCode || e.which;
			if (code === 9) { /* tab pressed */
				$('.mr-elite-d-p').fadeOut();
			}
		});


		/* prev & next button handlers */

		prevButton.click(() => {
			if(currentMonthSelected != 1) {
				currentMonthSelected--;
			}
			else {
				currentMonthSelected = 12;
				currentYearSelected --;
			}
			monthFirstDate = new Date(currentMonthSelected + '-01-' + currentYearSelected);

			monthSelectorButton.text(monthList[currentMonthSelected - 1].substr(0, 3));
			monthSelectorButton.attr('dm', currentMonthSelected);
			yearSelectorButton.text(currentYearSelected);
			yearSelectorButton.attr('dy', currentYearSelected);

			mainContent.find(`.date-selector`).css('left', '-200px').show();
			mainContent.find(`.date-selector`).animate({left:0}, 200);

			create_dates(currentMonthSelected, currentYearSelected);

			/* selecting date */
			select_selected_date();
		});


		nextButton.click(() => {
			if(currentMonthSelected != 12) {
				currentMonthSelected++;
			}
			else {
				currentMonthSelected = 1;
				currentYearSelected++;
			}
			monthFirstDate = new Date(currentMonthSelected + '-01-' + currentYearSelected);

			monthSelectorButton.text(monthList[currentMonthSelected - 1].substr(0, 3));
			monthSelectorButton.attr('dm', currentMonthSelected);
			yearSelectorButton.text(currentYearSelected);
			yearSelectorButton.attr('dy', currentYearSelected);

			mainContent.find(`.date-selector`).css('left', '200px').show();
			mainContent.find(`.date-selector`).animate({left:0}, 200);

			create_dates(currentMonthSelected, currentYearSelected);

			/* selecting date */
			select_selected_date();
		});


		/* date selection handler */

		datepicker.on('click', '.main-content .date-selector .date', (e) => {
			e = $(e.currentTarget);

			$('.main-content .date-selector .date').removeClass('selected');
			e.addClass('selected');

			currentDateSelected = e.text();
			datepickerHeader.find(`.day`).text( new Date(
					currentYearSelected + '-' + currentMonthSelected + '-' + currentDateSelected)
					.toString().substr(0,3) );

			datepickerHeader.find(`.date`).text(currentDateSelected);
		});


		/* set time button handler */

		setTimeButton.click(() => {
			$('.main-content .m-c-items').hide();
			mainContent.find(`.time-selector`).css('left', '200px').show();
			mainContent.find(`.time-selector`).animate({left:0}, 200);
			read_time();
		});


		/* final ok button handlers */

		okButton.click(() => {
			dateInput.val(get_new_date());
			$('.mr-elite-d-p').fadeOut();
		});


		/* document click handler */

		$(document).click(function (e) {
			if((!datepicker.is(e.target) && datepicker.has(e.target).length === 0) && !dateInput.is(e.target))
			{
				datepicker.fadeOut();
			}
		});


		/* hours & minutes scroll handlers */

		mainContent.find('.time-selector .up-arrow-small-hours').click(() => {
			var posToScroll = hourSelector.parent().scrollTop();
			hourSelector.parent().animate({
				scrollTop:  posToScroll - 80 /* scroll up */
			});
		});

		mainContent.find('.time-selector .down-arrow-small-hours').click(() => {
			var posToScroll = hourSelector.parent().scrollTop();
			hourSelector.parent().animate({
				scrollTop:  posToScroll + 80 /* scroll down */
			});
		});

		mainContent.find('.time-selector .up-arrow-small-minutes').click(() => {
			var posToScroll = minuteSelector.parent().scrollTop();
			minuteSelector.parent().animate({
				scrollTop:  posToScroll - 80 /* scroll up */
			});
		});

		mainContent.find('.time-selector .down-arrow-small-minutes').click(() => {
			var posToScroll = minuteSelector.parent().scrollTop();
			minuteSelector.parent().animate({
				scrollTop:  posToScroll + 80 /* scroll down */
			});
		});


		/* time selection handlers */

		mainContent.find('.time-selector .hour').click((e) => {
			e = $(e.currentTarget);
			mainContent.find('.time-selector .hour').removeClass('selected');
			e.addClass('selected');
		});

		mainContent.find('.time-selector .minute').click((e) => {
			e = $(e.currentTarget);
			mainContent.find('.time-selector .minute').removeClass('selected');
			e.addClass('selected');
		});

		mainContent.find('.time-selector .am-pm').click((e) => {
			e = $(e.currentTarget);
			mainContent.find('.time-selector .am-pm').removeClass('selected');
			e.addClass('selected');
		});


		/* save selected time handler */

		mainContent.find('.time-selector .back-to-calendar').click(() => {
			var hours;
			var mins;
			var seconds;
			hours = mainContent.find('.time-selector .select-hours .selected').attr('hour');
			mins = mainContent.find('.time-selector .select-minutes .selected').attr('minute');

			if(mainContent.find('.time-selector .am-pm.selected').hasClass('am-mode-select')) {
				if(params.format.substr(6, 11) === 'h:i:s') {

					setTime = hours == '12' ?
						'00:' + pad_date(mins, 2) + ':00' 
						: pad_date(hours, 2) + ':' + pad_date(mins, 2) + ':00';
				}
				else if(params.format.substr(6, 11) === 'h:i:a') {
					setTime = pad_date(hours, 2) + ':' + pad_date(mins, 2) + ' AM';
				}
			}
			else if(mainContent.find('.time-selector .am-pm.selected').hasClass('pm-mode-select')) {
				if(params.format.substr(6, 11) === 'h:i:s') {
					hours = hours == '12' ? '12' : parseInt(hours) + 12;
					setTime = pad_date(hours, 2) + ':' + pad_date(mins, 2) + ':00';
				}
				else if(params.format.substr(6, 11) === 'h:i:a') {
					setTime = pad_date(hours, 2) + ':' + pad_date(mins, 2) + ' PM';
				}
			}

			mainContent.find('.m-c-items').hide();
			mainContent.find(`.date-selector`).css('left', '-200px').show();
			mainContent.find(`.date-selector`).animate({left:0}, 200);
		});


		/* window change handler */

		if (/*@cc_on!@*/false) { /* check for Internet Explorer */
			document.onfocusout = function(){
				$('.mr-elite-d-p').fadeOut();
			}
		}
		else {
			window.onblur = function(){
				$('.mr-elite-d-p').fadeOut();
			}
		}

	};


	var destroy_datepicker = (dateInput) => {
		dateInput.off();
		if(dateInput.next().hasClass('mr-elite-d-p')) {
			dateInput.next().remove();
		}
	};


})(jQuery);