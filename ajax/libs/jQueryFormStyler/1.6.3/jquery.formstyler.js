/*
 * jQuery Form Styler v1.6.3
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2015 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2015.04.10
 *
 */

(function(factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define(['jquery'], factory);
	} else if (typeof exports === 'object') {
		// CommonJS
		module.exports = factory(require('jquery'));
	} else {
		factory(jQuery);
	}
}(function($) {

	'use strict';

	$.fn.styler = function(options) {

		var opt = $.extend({
			wrapper: 'form',
			idSuffix: '-styler',
			filePlaceholder: 'Файл не выбран',
			fileBrowse: 'Обзор...',
			selectPlaceholder: 'Выберите...',
			selectSearch: false,
			selectSearchLimit: 10,
			selectSearchNotFound: 'Совпадений не найдено',
			selectSearchPlaceholder: 'Поиск...',
			selectVisibleOptions: 0,
			singleSelectzIndex: '100',
			selectSmartPositioning: true,
			onSelectOpened: function() {},
			onSelectClosed: function() {},
			onFormStyled: function() {}
		}, options);

		return this.each(function() {
			var el = $(this);

			var iOS = (navigator.userAgent.match(/(iPad|iPhone|iPod)/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;
			var Android = (navigator.userAgent.match(/Android/i) && !navigator.userAgent.match(/(Windows\sPhone)/i)) ? true : false;

			function Attributes() {
				var id = '',
						title = '',
						classes = '',
						dataList = '';
				if (el.attr('id') !== undefined && el.attr('id') !== '') id = ' id="' + el.attr('id') + opt.idSuffix + '"';
				if (el.attr('title') !== undefined && el.attr('title') !== '') title = ' title="' + el.attr('title') + '"';
				if (el.attr('class') !== undefined && el.attr('class') !== '') classes = ' ' + el.attr('class');
				var data = el.data();
				for (var i in data) {
					if (data[i] !== '') dataList += ' data-' + i + '="' + data[i] + '"';
				}
				id += dataList;
				this.id = id;
				this.title = title;
				this.classes = classes;
			}

			// checkbox
			if (el.is(':checkbox')) {
				el.each(function() {
					if (el.parent('div.jq-checkbox').length < 1) {

						var checkboxOutput = function() {

							var att = new Attributes();
							var checkbox = $('<div' + att.id + ' class="jq-checkbox' + att.classes + '"' + att.title + '><div class="jq-checkbox__div"></div></div>');

							// прячем оригинальный чекбокс
							el.css({
								position: 'absolute',
								zIndex: '-1',
								opacity: 0,
								margin: 0,
								padding: 0
							}).after(checkbox).prependTo(checkbox);

							checkbox.attr('unselectable', 'on').css({
								'-webkit-user-select': 'none',
								'-moz-user-select': 'none',
								'-ms-user-select': 'none',
								'-o-user-select': 'none',
								'user-select': 'none',
								display: 'inline-block',
								position: 'relative',
								overflow: 'hidden'
							});

							if (el.is(':checked')) checkbox.addClass('checked');
							if (el.is(':disabled')) checkbox.addClass('disabled');

							// клик на псевдочекбокс
							checkbox.on('click.styler', function() {
								if (!checkbox.is('.disabled')) {
									if (el.is(':checked')) {
										el.prop('checked', false);
										checkbox.removeClass('checked');
									} else {
										el.prop('checked', true);
										checkbox.addClass('checked');
									}
									el.change();
									return false;
								} else {
									return false;
								}
							});
							// клик на label
							el.closest('label').add('label[for="' + el.attr('id') + '"]').click(function(e) {
								if (!$(e.target).is('a')) {
									checkbox.click();
									e.preventDefault();
								}
							});
							// переключение по Space или Enter
							el.on('change.styler', function() {
								if (el.is(':checked')) checkbox.addClass('checked');
								else checkbox.removeClass('checked');
							})
							// чтобы переключался чекбокс, который находится в теге label
							.on('keydown.styler', function(e) {
								if (e.which == 32) checkbox.click();
							})
							.on('focus.styler', function() {
								if (!checkbox.is('.disabled')) checkbox.addClass('focused');
							})
							.on('blur.styler', function() {
								checkbox.removeClass('focused');
							});

						}; // end checkboxOutput()

						checkboxOutput();

						// обновление при динамическом изменении
						el.on('refresh', function() {
							el.off('.styler').parent().before(el).remove();
							checkboxOutput();
						});

					}
				});
			// end checkbox

			// radio
			} else if (el.is(':radio')) {
				el.each(function() {
					if (el.parent('div.jq-radio').length < 1) {

						var radioOutput = function() {

							var att = new Attributes();
							var radio = $('<div' + att.id + ' class="jq-radio' + att.classes + '"' + att.title + '><div class="jq-radio__div"></div></div>');

							// прячем оригинальную радиокнопку
							el.css({
								position: 'absolute',
								zIndex: '-1',
								opacity: 0,
								margin: 0,
								padding: 0
							}).after(radio).prependTo(radio);

							radio.attr('unselectable', 'on').css({
								'-webkit-user-select': 'none',
								'-moz-user-select': 'none',
								'-ms-user-select': 'none',
								'-o-user-select': 'none',
								'user-select': 'none',
								display: 'inline-block',
								position: 'relative'
							});

							if (el.is(':checked')) radio.addClass('checked');
							if (el.is(':disabled')) radio.addClass('disabled');

							// клик на псевдорадиокнопке
							radio.on('click.styler', function() {
								if (!radio.is('.disabled')) {
									radio.closest(opt.wrapper).find('input[name="' + el.attr('name') + '"]').prop('checked', false).parent().removeClass('checked');
									el.prop('checked', true).parent().addClass('checked');
									el.change();
									return false;
								} else {
									return false;
								}
							});
							// клик на label
							el.closest('label').add('label[for="' + el.attr('id') + '"]').click(function(e) {
								if (!$(e.target).is('a')) {
									radio.click();
									e.preventDefault();
								}
							});
							// переключение стрелками
							el.on('change.styler', function() {
								el.parent().addClass('checked');
							})
							.on('focus.styler', function() {
								if (!radio.is('.disabled')) radio.addClass('focused');
							})
							.on('blur.styler', function() {
								radio.removeClass('focused');
							});

						}; // end radioOutput()

						radioOutput();

						// обновление при динамическом изменении
						el.on('refresh', function() {
							el.off('.styler').parent().before(el).remove();
							radioOutput();
						});

					}
				});
			// end radio

			// file
			} else if (el.is(':file')) {
				// прячем оригинальное поле
				el.css({
					position: 'absolute',
					top: 0,
					right: 0,
					width: '100%',
					height: '100%',
					opacity: 0,
					margin: 0,
					padding: 0
				}).each(function() {
					if (el.parent('div.jq-file').length < 1) {

						var fileOutput = function() {

							var att = new Attributes();
							var placeholder = el.data('placeholder');
							if (placeholder === undefined) placeholder = opt.filePlaceholder;
							var browse = el.data('browse');
							if (browse === undefined || browse === '') browse = opt.fileBrowse;
							var file = $('<div' + att.id + ' class="jq-file' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative; overflow: hidden"></div>');
							var name = $('<div class="jq-file__name">' + placeholder + '</div>').appendTo(file);
							$('<div class="jq-file__browse">' + browse + '</div>').appendTo(file);
							el.after(file);
							file.append(el);
							if (el.is(':disabled')) file.addClass('disabled');
							el.on('change.styler', function() {
								var value = el.val();
								if (el.is('[multiple]')) {
									value = '';
									var files = el[0].files;
									for (var i = 0; i < files.length; i++) {
										value += ( (i > 0) ? ', ' : '' ) + files[i].name;
									}
								}
								name.text(value.replace(/.+[\\\/]/, ''));
								if (value === '') {
									name.text(placeholder);
									file.removeClass('changed');
								} else {
									file.addClass('changed');
								}
							})
							.on('focus.styler', function() {
								file.addClass('focused');
							})
							.on('blur.styler', function() {
								file.removeClass('focused');
							})
							.on('click.styler', function() {
								file.removeClass('focused');
							});

						}; // end fileOutput()

						fileOutput();

						// обновление при динамическом изменении
						el.on('refresh', function() {
							el.off('.styler').parent().before(el).remove();
							fileOutput();
						});

					}
				});
			// end file

			// select
			} else if (el.is('select')) {
				el.each(function() {
					if (el.parent('div.jqselect').length < 1) {

						var selectboxOutput = function() {

							// запрещаем прокрутку страницы при прокрутке селекта
							function preventScrolling(selector) {
								selector.off('mousewheel DOMMouseScroll').on('mousewheel DOMMouseScroll', function(e) {
									var scrollTo = null;
									if (e.type == 'mousewheel') { scrollTo = (e.originalEvent.wheelDelta * -1); }
									else if (e.type == 'DOMMouseScroll') { scrollTo = 40 * e.originalEvent.detail; }
									if (scrollTo) {
										e.stopPropagation();
										e.preventDefault();
										$(this).scrollTop(scrollTo + $(this).scrollTop());
									}
								});
							}

							var option = $('option', el);
							var list = '';
							// формируем список селекта
							function makeList() {
								for (var i = 0, len = option.length; i < len; i++) {
									var li = '',
											liClass = '',
											liClasses = '',
											dataList = '',
											optionClass = '',
											optgroupClass = '',
											dataJqfsClass = '';
									var disabled = 'disabled';
									var selDis = 'selected sel disabled';
									if (option.eq(i).prop('selected')) liClass = 'selected sel';
									if (option.eq(i).is(':disabled')) liClass = disabled;
									if (option.eq(i).is(':selected:disabled')) liClass = selDis;
									if (option.eq(i).attr('class') !== undefined) {
										optionClass = ' ' + option.eq(i).attr('class');
										dataJqfsClass = ' data-jqfs-class="' + option.eq(i).attr('class') + '"';
									}

									var data = option.eq(i).data();
									for (var k in data) {
										if (data[k] !== '') dataList += ' data-' + k + '="' + data[k] + '"';
									}

									if ( (liClass + optionClass) !== '' )	liClasses = ' class="' + liClass + optionClass + '"';
									li = '<li' + dataJqfsClass + dataList + liClasses + '>'+ option.eq(i).html() +'</li>';

									// если есть optgroup
									if (option.eq(i).parent().is('optgroup')) {
										if (option.eq(i).parent().attr('class') !== undefined) optgroupClass = ' ' + option.eq(i).parent().attr('class');
										li = '<li' + dataJqfsClass + dataList + ' class="' + liClass + optionClass + ' option' + optgroupClass + '">'+ option.eq(i).html() +'</li>';
										if (option.eq(i).is(':first-child')) {
											li = '<li class="optgroup' + optgroupClass + '">' + option.eq(i).parent().attr('label') + '</li>' + li;
										}
									}

									list += li;
								}
							} // end makeList()

							// одиночный селект
							function doSelect() {
								var att = new Attributes();

								var searchHTML = '';
								var selectPlaceholder = el.data('placeholder');
								var selectSearch = el.data('search');
								var selectSearchLimit = el.data('search-limit');
								var selectSearchNotFound = el.data('search-not-found');
								var selectSearchPlaceholder = el.data('search-placeholder');
								var singleSelectzIndex = el.data('z-index');
								var selectSmartPositioning = el.data('smart-positioning');

								if (selectPlaceholder === undefined) selectPlaceholder = opt.selectPlaceholder;
								if (selectSearch === undefined || selectSearch === '') selectSearch = opt.selectSearch;
								if (selectSearchLimit === undefined || selectSearchLimit === '') selectSearchLimit = opt.selectSearchLimit;
								if (selectSearchNotFound === undefined || selectSearchNotFound === '') selectSearchNotFound = opt.selectSearchNotFound;
								if (selectSearchPlaceholder === undefined) selectSearchPlaceholder = opt.selectSearchPlaceholder;
								if (singleSelectzIndex === undefined || singleSelectzIndex === '') singleSelectzIndex = opt.singleSelectzIndex;
								if (selectSmartPositioning === undefined || selectSmartPositioning === '') selectSmartPositioning = opt.selectSmartPositioning;

								var selectbox =
									$('<div' + att.id + ' class="jq-selectbox jqselect' + att.classes + '" style="display: inline-block; position: relative; z-index:' + singleSelectzIndex + '">' +
											'<div class="jq-selectbox__select"' + att.title + ' style="position: relative">' +
												'<div class="jq-selectbox__select-text"></div>' +
												'<div class="jq-selectbox__trigger"><div class="jq-selectbox__trigger-arrow"></div></div>' +
											'</div>' +
										'</div>');

								el.css({margin: 0, padding: 0}).after(selectbox).prependTo(selectbox);

								var divSelect = $('div.jq-selectbox__select', selectbox);
								var divText = $('div.jq-selectbox__select-text', selectbox);
								var optionSelected = option.filter(':selected');

								makeList();

								if (selectSearch) searchHTML =
									'<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' + selectSearchPlaceholder + '"></div>' +
									'<div class="jq-selectbox__not-found">' + selectSearchNotFound + '</div>';
								var dropdown =
									$('<div class="jq-selectbox__dropdown" style="position: absolute">' +
											searchHTML +
											'<ul style="position: relative; list-style: none; overflow: auto; overflow-x: hidden">' + list + '</ul>' +
										'</div>');
								selectbox.append(dropdown);
								var ul = $('ul', dropdown);
								var li = $('li', dropdown);
								var search = $('input', dropdown);
								var notFound = $('div.jq-selectbox__not-found', dropdown).hide();
								if (li.length < selectSearchLimit) search.parent().hide();

								// показываем опцию по умолчанию
								// если 1-я опция пустая и выбрана по умолчанию, то показываем плейсхолдер
								if (el.val() === '') {
									divText.text(selectPlaceholder).addClass('placeholder');
								} else {
									divText.text(optionSelected.text());
								}

								// определяем самый широкий пункт селекта
								var liWidth1 = 0,
										liWidth2 = 0;
								li.each(function() {
									var l = $(this);
									l.css({'display': 'inline-block'});
									if (l.innerWidth() > liWidth1) {
										liWidth1 = l.innerWidth();
										liWidth2 = l.width();
									}
									l.css({'display': ''});
								});

								// подстраиваем ширину псевдоселекта и выпадающего списка
								// в зависимости от самого широкого пункта
								var selClone = selectbox.clone().appendTo('body').width('auto');
								var selCloneWidth = selClone.find('select').outerWidth();
								selClone.remove();
								if (selCloneWidth == selectbox.width()) {
									divText.width(liWidth2);
								}
								if (liWidth1 > selectbox.width()) {
									dropdown.width(liWidth1);
								}
								// на случай, когда ширина плейсхолдера больше ширины пункта селекта
								// чтобы плейсхолдер не обрезался
								if (divText.is('.placeholder') && (divText.width() > liWidth1)) {
									divText.width(divText.width());
								}

								// прячем 1-ю пустую опцию, если она есть и если атрибут data-placeholder не пустой
								// если все же нужно, чтобы первая пустая опция отображалась, то указываем у селекта: data-placeholder=""
								if (option.first().text() === '' && el.data('placeholder') !== '') {
									li.first().hide();
								}

								// прячем оригинальный селект
								el.css({
									position: 'absolute',
									left: 0,
									top: 0,
									width: '100%',
									height: '100%',
									opacity: 0
								});

								var selectHeight = selectbox.outerHeight();
								var searchHeight = search.outerHeight();
								var isMaxHeight = ul.css('max-height');
								var liSelected = li.filter('.selected');
								if (liSelected.length < 1) li.first().addClass('selected sel');
								if (li.data('li-height') === undefined) li.data('li-height', li.outerHeight());
								var position = dropdown.css('top');
								if (dropdown.css('left') == 'auto') dropdown.css({left: 0});
								if (dropdown.css('top') == 'auto') dropdown.css({top: selectHeight});
								dropdown.hide();

								// если выбран не дефолтный пункт
								if (liSelected.length) {
									// добавляем класс, показывающий изменение селекта
									if (option.first().text() != optionSelected.text()) {
										selectbox.addClass('changed');
									}
									// передаем селекту класс выбранного пункта
									selectbox.data('jqfs-class', liSelected.data('jqfs-class'));
									selectbox.addClass(liSelected.data('jqfs-class'));
								}

								// если селект неактивный
								if (el.is(':disabled')) {
									selectbox.addClass('disabled');
									return false;
								}

								// при клике на псевдоселекте
								divSelect.click(function() {

									// колбек при закрытии селекта
									if ($('div.jq-selectbox').filter('.opened').length) {
										opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
									}

									el.focus();

									// если iOS, то не показываем выпадающий список,
									// т.к. отображается нативный и неизвестно, как его спрятать
									if (iOS) return;

									// умное позиционирование
									var win = $(window);
									var liHeight = li.data('li-height');
									var topOffset = selectbox.offset().top;
									var bottomOffset = win.height() - selectHeight - (topOffset - win.scrollTop());
									var visible = el.data('visible-options');
									if (visible === undefined || visible === '') visible = opt.selectVisibleOptions;
									var	minHeight = liHeight * 5;
									var	newHeight = liHeight * visible;
									if (visible > 0 && visible < 6) minHeight = newHeight;
									if (visible === 0) newHeight = 'auto';

									var dropDown = function() {
										dropdown.height('auto').css({bottom: 'auto', top: position});
										var maxHeightBottom = function() {
											ul.css('max-height', Math.floor((bottomOffset - 20 - searchHeight) / liHeight) * liHeight);
										};
										maxHeightBottom();
										ul.css('max-height', newHeight);
										if (isMaxHeight != 'none') {
											ul.css('max-height', isMaxHeight);
										}
										if (bottomOffset < (dropdown.outerHeight() + 20)) {
											maxHeightBottom();
										}
									};

									var dropUp = function() {
										dropdown.height('auto').css({top: 'auto', bottom: position});
										var maxHeightTop = function() {
											ul.css('max-height', Math.floor((topOffset - win.scrollTop() - 20 - searchHeight) / liHeight) * liHeight);
										};
										maxHeightTop();
										ul.css('max-height', newHeight);
										if (isMaxHeight != 'none') {
											ul.css('max-height', isMaxHeight);
										}
										if ((topOffset - win.scrollTop() - 20) < (dropdown.outerHeight() + 20)) {
											maxHeightTop();
										}
									};

									if (selectSmartPositioning === true || selectSmartPositioning === 1) {
										// раскрытие вниз
										if (bottomOffset > (minHeight + searchHeight + 20))	{
											dropDown();
											selectbox.removeClass('dropup').addClass('dropdown');
										// раскрытие вверх
										} else {
											dropUp();
											selectbox.removeClass('dropdown').addClass('dropup');
										}
									} else if (selectSmartPositioning === false || selectSmartPositioning === 0) {
										// раскрытие вниз
										if (bottomOffset > (minHeight + searchHeight + 20))	{
											dropDown();
											selectbox.removeClass('dropup').addClass('dropdown');
										}
									}

									// если выпадающий список выходит за правый край окна браузера,
									// то меняем позиционирование с левого на правое
									if (selectbox.offset().left + dropdown.outerWidth() > win.width()) {
										dropdown.css({left: 'auto', right: 0});
									}
									// конец умного позиционирования

									$('div.jqselect').css({zIndex: (singleSelectzIndex - 1)}).removeClass('opened');
									selectbox.css({zIndex: singleSelectzIndex});
									if (dropdown.is(':hidden')) {
										$('div.jq-selectbox__dropdown:visible').hide();
										dropdown.show();
										selectbox.addClass('opened focused');
										// колбек при открытии селекта
										opt.onSelectOpened.call(selectbox);
									} else {
										dropdown.hide();
										selectbox.removeClass('opened dropup dropdown');
										// колбек при закрытии селекта
										if ($('div.jq-selectbox').filter('.opened').length) {
											opt.onSelectClosed.call(selectbox);
										}
									}

									// поисковое поле
									if (search.length) {
										search.val('').keyup();
										notFound.hide();
										search.keyup(function() {
											var query = $(this).val();
											li.each(function() {
												if (!$(this).html().match(new RegExp('.*?' + query + '.*?', 'i'))) {
													$(this).hide();
												} else {
													$(this).show();
												}
											});
											// прячем 1-ю пустую опцию
											if (option.first().text() === '' && el.data('placeholder') !== '') {
												li.first().hide();
											}
											if (li.filter(':visible').length < 1) {
												notFound.show();
											} else {
												notFound.hide();
											}
										});
									}

									// прокручиваем до выбранного пункта при открытии списка
									if (li.filter('.selected').length) {
										if (el.val() === '') {
											ul.scrollTop(0);
										} else {
											// если нечетное количество видимых пунктов,
											// то высоту пункта делим пополам для последующего расчета
											if ( (ul.innerHeight() / liHeight) % 2 !== 0 ) liHeight = liHeight / 2;
											ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() / 2 + liHeight);
										}
									}

									preventScrolling(ul);
									return false;

								}); // end divSelect.click()

								// при наведении курсора на пункт списка
								li.hover(function() {
									$(this).siblings().removeClass('selected');
								});
								var selectedText = li.filter('.selected').text();

								// при клике на пункт списка
								li.filter(':not(.disabled):not(.optgroup)').click(function() {
									el.focus();
									var t = $(this);
									var liText = t.text();
									if (!t.is('.selected')) {
										var index = t.index();
										index -= t.prevAll('.optgroup').length;
										t.addClass('selected sel').siblings().removeClass('selected sel');
										option.prop('selected', false).eq(index).prop('selected', true);
										selectedText = liText;
										divText.text(liText);

										// передаем селекту класс выбранного пункта
										if (selectbox.data('jqfs-class')) selectbox.removeClass(selectbox.data('jqfs-class'));
										selectbox.data('jqfs-class', t.data('jqfs-class'));
										selectbox.addClass(t.data('jqfs-class'));

										el.change();
									}
									dropdown.hide();
									selectbox.removeClass('opened dropup dropdown');
									// колбек при закрытии селекта
									opt.onSelectClosed.call(selectbox);

								});
								dropdown.mouseout(function() {
									$('li.sel', dropdown).addClass('selected');
								});

								// изменение селекта
								el.on('change.styler', function() {
									divText.text(option.filter(':selected').text()).removeClass('placeholder');
									li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
									// добавляем класс, показывающий изменение селекта
									if (option.first().text() != li.filter('.selected').text()) {
										selectbox.addClass('changed');
									} else {
										selectbox.removeClass('changed');
									}
								})
								.on('focus.styler', function() {
									selectbox.addClass('focused');
									$('div.jqselect').not('.focused').removeClass('opened dropup dropdown').find('div.jq-selectbox__dropdown').hide();
								})
								.on('blur.styler', function() {
									selectbox.removeClass('focused');
								})
								// изменение селекта с клавиатуры
								.on('keydown.styler keyup.styler', function(e) {
									var liHeight = li.data('li-height');
									if (el.val() === '') {
										divText.text(selectPlaceholder).addClass('placeholder');
									} else {
										divText.text(option.filter(':selected').text());
									}
									li.removeClass('selected sel').not('.optgroup').eq(el[0].selectedIndex).addClass('selected sel');
									// вверх, влево, Page Up, Home
									if (e.which == 38 || e.which == 37 || e.which == 33 || e.which == 36) {
										if (el.val() === '') {
											ul.scrollTop(0);
										} else {
											ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
										}
									}
									// вниз, вправо, Page Down, End
									if (e.which == 40 || e.which == 39 || e.which == 34 || e.which == 35) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - ul.innerHeight() + liHeight);
									}
									// закрываем выпадающий список при нажатии Enter
									if (e.which == 13) {
										e.preventDefault();
										dropdown.hide();
										selectbox.removeClass('opened dropup dropdown');
										// колбек при закрытии селекта
										opt.onSelectClosed.call(selectbox);
									}
								}).on('keydown.styler', function(e) {
									// открываем выпадающий список при нажатии Space
									if (e.which == 32) {
										e.preventDefault();
										divSelect.click();
									}
								});

								// прячем выпадающий список при клике за пределами селекта
								$(document).on('click', function(e) {
									// e.target.nodeName != 'OPTION' - добавлено для обхода бага в Opera на движке Presto
									// (при изменении селекта с клавиатуры срабатывает событие onclick)
									if (!$(e.target).parents().hasClass('jq-selectbox') && e.target.nodeName != 'OPTION') {

										// колбек при закрытии селекта
										if ($('div.jq-selectbox').filter('.opened').length) {
											opt.onSelectClosed.call($('div.jq-selectbox').filter('.opened'));
										}

										if (search.length) search.val('').keyup();
										dropdown.hide().find('li.sel').addClass('selected');
										selectbox.removeClass('focused opened dropup dropdown');

									}
								});

							} // end doSelect()

							// мультиселект
							function doMultipleSelect() {
								var att = new Attributes();
								var selectbox = $('<div' + att.id + ' class="jq-select-multiple jqselect' + att.classes + '"' + att.title + ' style="display: inline-block; position: relative"></div>');

								el.css({margin: 0, padding: 0}).after(selectbox);

								makeList();
								selectbox.append('<ul>' + list + '</ul>');
								var ul = $('ul', selectbox).css({
									'position': 'relative',
									'overflow-x': 'hidden',
									'-webkit-overflow-scrolling': 'touch'
								});
								var li = $('li', selectbox).attr('unselectable', 'on');
								var size = el.attr('size');
								var ulHeight = ul.outerHeight();
								var liHeight = li.outerHeight();
								if (size !== undefined && size > 0) {
									ul.css({'height': liHeight * size});
								} else {
									ul.css({'height': liHeight * 4});
								}
								if (ulHeight > selectbox.height()) {
									ul.css('overflowY', 'scroll');
									preventScrolling(ul);
									// прокручиваем до выбранного пункта
									if (li.filter('.selected').length) {
										ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top);
									}
								}

								// прячем оригинальный селект
								el.prependTo(selectbox).css({
									position: 'absolute',
									left: 0,
									top: 0,
									width: '100%',
									height: '100%',
									opacity: 0
								});

								// если селект неактивный
								if (el.is(':disabled')) {
									selectbox.addClass('disabled');
									option.each(function() {
										if ($(this).is(':selected')) li.eq($(this).index()).addClass('selected');
									});

								// если селект активный
								} else {

									// при клике на пункт списка
									li.filter(':not(.disabled):not(.optgroup)').click(function(e) {
										el.focus();
										var clkd = $(this);
										if(!e.ctrlKey && !e.metaKey) clkd.addClass('selected');
										if(!e.shiftKey) clkd.addClass('first');
										if(!e.ctrlKey && !e.metaKey && !e.shiftKey) clkd.siblings().removeClass('selected first');

										// выделение пунктов при зажатом Ctrl
										if(e.ctrlKey || e.metaKey) {
											if (clkd.is('.selected')) clkd.removeClass('selected first');
												else clkd.addClass('selected first');
											clkd.siblings().removeClass('first');
										}

										// выделение пунктов при зажатом Shift
										if(e.shiftKey) {
											var prev = false,
													next = false;
											clkd.siblings().removeClass('selected').siblings('.first').addClass('selected');
											clkd.prevAll().each(function() {
												if ($(this).is('.first')) prev = true;
											});
											clkd.nextAll().each(function() {
												if ($(this).is('.first')) next = true;
											});
											if (prev) {
												clkd.prevAll().each(function() {
													if ($(this).is('.selected')) return false;
														else $(this).not('.disabled, .optgroup').addClass('selected');
												});
											}
											if (next) {
												clkd.nextAll().each(function() {
													if ($(this).is('.selected')) return false;
														else $(this).not('.disabled, .optgroup').addClass('selected');
												});
											}
											if (li.filter('.selected').length == 1) clkd.addClass('first');
										}

										// отмечаем выбранные мышью
										option.prop('selected', false);
										li.filter('.selected').each(function() {
											var t = $(this);
											var index = t.index();
											if (t.is('.option')) index -= t.prevAll('.optgroup').length;
											option.eq(index).prop('selected', true);
										});
										el.change();

									});

									// отмечаем выбранные с клавиатуры
									option.each(function(i) {
										$(this).data('optionIndex', i);
									});
									el.on('change.styler', function() {
										li.removeClass('selected');
										var arrIndexes = [];
										option.filter(':selected').each(function() {
											arrIndexes.push($(this).data('optionIndex'));
										});
										li.not('.optgroup').filter(function(i) {
											return $.inArray(i, arrIndexes) > -1;
										}).addClass('selected');
									})
									.on('focus.styler', function() {
										selectbox.addClass('focused');
									})
									.on('blur.styler', function() {
										selectbox.removeClass('focused');
									});

									// прокручиваем с клавиатуры
									if (ulHeight > selectbox.height()) {
										el.on('keydown.styler', function(e) {
											// вверх, влево, PageUp
											if (e.which == 38 || e.which == 37 || e.which == 33) {
												ul.scrollTop(ul.scrollTop() + li.filter('.selected').position().top - liHeight);
											}
											// вниз, вправо, PageDown
											if (e.which == 40 || e.which == 39 || e.which == 34) {
												ul.scrollTop(ul.scrollTop() + li.filter('.selected:last').position().top - ul.innerHeight() + liHeight * 2);
											}
										});
									}

								}
							} // end doMultipleSelect()

							if (el.is('[multiple]')) {

								// если Android или iOS, то мультиселект не стилизуем
								// причина для Android - в стилизованном селекте нет возможности выбрать несколько пунктов
								// причина для iOS - в стилизованном селекте неправильно отображаются выбранные пункты
								if (Android || iOS) return;

								doMultipleSelect();
							} else {
								doSelect();
							}

						}; // end selectboxOutput()

						selectboxOutput();

						// обновление при динамическом изменении
						el.on('refresh', function() {
							el.off('.styler').parent().before(el).remove();
							selectboxOutput();
						});

					}
				});
			// end select

			// reset
			} else if (el.is(':reset')) {
				el.on('click', function() {
					setTimeout(function() {
						el.closest(opt.wrapper).find('input, select').trigger('refresh');
					}, 1);
				});
			}
			// end reset

		})

		// колбек после выполнения плагина
		.promise()
		.done(function() {
			opt.onFormStyled.call();
		});

	};
}));