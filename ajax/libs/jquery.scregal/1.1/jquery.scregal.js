/**
 * Copyright (c) Bartłomiej Semańczyk - bartekss2@gmail.com http://www.blue-world.pl
 * @version 1.1
 * Last Update: Sunday, 4 January 2015
*/

(function($) {
	'use strict';

	var classnames = {
		scregalAdding: "scregalAdding",
		scregalAdded: "scregalAdded",
		scregalRemoving: "scregalRemoving",
		scregalRemoved: "scregalRemoved",
		scregalFigure: "scregalFigure",
		scregalWrap: "scregalWrap",

		scregalBox: "scregalBox",
		scregalBesideBox: "scregalBesideBox",
		scregalCenterBox: "scregalCenterBox",
		scregalLeftBox: "scregalLeftBox",
		scregalRightBox: "scregalRightBox",

		scregalTitle: "scregalTitle",
		scregalFront: "scregalFront",

		scregalLeftImg: "scregalLeftImg",
		scregalRightImg: "scregalRightImg",
		scregalCenterImg: "scregalCenterImg",

		scregalClose: "scregalClose",
		scregalNavigation: "scregalNavigation",
		scregalLeftNavigation: "scregalLeftNavigation",
		scregalRightNavigation: "scregalRightNavigation"
	};

	if (window.scregal === undefined) {
		window.scregal = {};
	}
	window.scregal.classnames = classnames;

	function _(str) {
		var dot = ".";
		return dot + str + ' ';
	}

	var Scregal = (function() {

		/* boxes */
		var $instance = undefined;
		var $scregalBox = $('<div class="' + window.scregal.classnames.scregalBox + '">');
		var $scregalLeftBox = $('<a href="#" class="' + window.scregal.classnames.scregalWrap + ' ' + window.scregal.classnames.scregalLeftBox + ' ' + window.scregal.classnames.scregalBesideBox + '">');
		var $scregalCenterBox = $('<div class="' + window.scregal.classnames.scregalWrap + ' ' + window.scregal.classnames.scregalCenterBox + '">');
		var $scregalRightBox = $('<a href="#" class="' + window.scregal.classnames.scregalWrap + ' ' + window.scregal.classnames.scregalRightBox + ' ' + window.scregal.classnames.scregalBesideBox + '">');

		var $scregalLeftImg = $('<img class="' + window.scregal.classnames.scregalLeftImg + '" />').css('display', 'none');
		var $scregalCenterImg = $('<img class="' + window.scregal.classnames.scregalCenterImg + '" />').css('display', 'none');
		var $scregalRightImg = $('<img class="' + window.scregal.classnames.scregalRightImg + '" />').css('display', 'none');

		var $scregalRightNav = $('<div class="' + window.scregal.classnames.scregalNavigation + ' ' + window.scregal.classnames.scregalRightNavigation + '">');
		var $scregalLeftNav = $('<div class="' + window.scregal.classnames.scregalNavigation + ' ' + window.scregal.classnames.scregalLeftNavigation + '">');
		var $scregalClose = $('<div class="' + window.scregal.classnames.scregalClose + '">');
		var $scregalFront = $('<div class="' + window.scregal.classnames.scregalFront + '"><div class="' + window.scregal.classnames.scregalTitle + '"></div></div>').css('display', 'none');

		//flags
		var isInitialized = false;
		var isScregalWorking = false;
		var isAutoGalleryRunning = false;
		var isNavigationHidden = false;
		var isFrontHidden = false;

		/* timer handlers */
		var auto_gallery_delay_timer = null;
		var auto_gallery_init_timer = null;
		var ids_counter = 0;
		var handlerForElem = undefined;

		/* datas */
		var scregal_datas = {};
		var recent_scregal_data = undefined;
		var recent_data_image = {
			scregalCenterImg : {},
			scregalLeftImg : {},
			scregalRightImg : {} };

		/* options */
		var defaults = {
			elems: '.gallery-box > a',
			maxWidth: '95%',
			centerDisappearAnimation: { opacity: 0 },
			sideDisappearAnimation: { opacity: 0 },
			centerAppearAnimation: { opacity: 1 },
			sideAppearAnimation: { opacity: 1 },
			disappearDuration: 2000,
			appearDuration: 2000,
			disappearEasing: 'easeInOutExpo',
			appearEasing: 'easeInOutExpo',
			isNavigationHidden: false,
			isNavigationKeyboard: true,
			hideNavigationWhenAutoGallery: true,
			hideFrontWhenAutoGallery: false,
			runAutoGalleryAfterDelay: 5000,
			autoGalleryDelay: 3000,
			init: true,
			prev: undefined,
			next: undefined,
			close: undefined,
			addFront: true, //whether display scregal front
			frontContent: function() {}, //if addFront, without content, return jquery object to prepend scregalFront
			frontTitle: function() { return $('<div class="scregalSubtitle">'); }, //called on every jquery element  from elems objects to, to html it withis title within scregalFront, callend wiith context of elem
			basicHeight: function() { return $(window).height(); },
			basicWidth: function() { return $(window).width(); },
			getGalleryName: function() { return 'rel'; } //order with galleries, first check if elem has data-rel attribute. If there is no attribute, then the function is called with context of elem.
			//+ json from options
		};

		var Scregal_Class = function(gallery, opts) {
			var that = this;
			this.updateOptions(opts);


			$instance = gallery;
			if (typeof gallery === 'string') {
				$instance = $(gallery);
			}

			if ($instance.length) {
				$(defaults.elems).each(function() {
					that.append($(this));
				});
				// return this;
			} else {
				// throw 'There is no instance of gallery for Scregal';
			}
			if (defaults.init) {
				this.init();
			}
		};

		Scregal_Class.prototype.init = function() {
			var that = this;
			if (!isInitialized) {
				$('body').prepend($scregalBox);
				$scregalBox.append($scregalLeftBox, $scregalCenterBox, $scregalRightBox, $scregalLeftImg, $scregalCenterImg, $scregalRightImg);

				if (defaults.addFront) {
					$scregalCenterBox.append($scregalFront);
					$scregalFront.prepend(defaults.frontContent());
				 	$scregalFront.show(0);
				}

				!defaults.prev ? $scregalBox.append($scregalLeftNav) : '';
				!defaults.next ? $scregalBox.append($scregalRightNav) : '';
				!defaults.close ? $scregalBox.append($scregalClose) : '';

				defaults.isNavigationHidden ? that.disappearNavigation() : '';

				this.set_other_handlers();
				isInitialized = true;
				$instance.trigger('scregalInitialized');
			}
		};

		Scregal_Class.prototype.updateOptions = function(opts) {
			opts ? $.extend(defaults, opts) : '';
		};


		Scregal_Class.prototype.append = function(elems) {
			var that = this;
			elems.each(function(){
				var t = $(this);
				var rel = t.attr('data-rel') ? t.attr('data-rel') : defaults.getGalleryName.call(t);

				!scregal_datas[rel] ? scregal_datas[rel] = [] : '';
				var data = {
					elem: t,
					href: t.attr('href'),
					rel: rel,
					id: ids_counter++,
					frontTitle : defaults.frontTitle.call(t)
				};

				scregal_datas[rel].push(data);

				t.addClass('scregal');
				that.set_handler(t);
				t.data('scregal', data);
				$instance.trigger('elemAppended', [t]);
			});
		};

		Scregal_Class.prototype.remove = function(elems) {
			var that = this;
			elems.each(function(){
				var data = $(this).data('scregal');
				var gallery = scregal_datas[data.rel];
				for (var i in gallery) {
					var index = parseInt(i);
					if (gallery[index].id == data.id) {
						gallery.splice(index, 1);
					}
				}
				$(this).removeData('scregal');
				$instance.trigger('elemRemoved', [$(this)]);
			});
		};

		Scregal_Class.prototype.set_recent_scregal_data = function(data) {
			recent_scregal_data = data;
		};

		Scregal_Class.prototype.disappearNavigation = function() {
			isNavigationHidden = true;
			$scregalRightNav.add($scregalLeftNav).add($scregalClose).add(defaults.prev + ', ' + defaults.next + ', ' + defaults.close).fadeOut(300);
		};

		Scregal_Class.prototype.appearNavigation = function() {
			if (!defaults.isNavigationHidden) {
				isNavigationHidden = false;
				$scregalRightNav.add($scregalLeftNav).add($scregalClose).add(defaults.prev + ', ' + defaults.next + ', ' + defaults.close).fadeIn(300);
			}
		};

		Scregal_Class.prototype.disappearFront = function() {
			isFrontHidden = true;
			$scregalFront.fadeOut(300);
		};

		Scregal_Class.prototype.appearFront = function() {
			isFrontHidden = false;
			$scregalFront.fadeIn(300);
		};

		Scregal_Class.prototype.is_navigation_hover = function() {
			var prev = defaults.prev ? defaults.prev + ':hover' : _(window.scregal.classnames.scregalLeftNavigation) + ':hover';
			var next = defaults.next ? defaults.next + ':hover' : _(window.scregal.classnames.scregalRightNavigation) + ':hover';
			var elems = $(prev + ', ' + next);
			var isHover = elems.length ? true : false;

			return isHover;
		};

		Scregal_Class.prototype.autoGalleryInit = function() {
			var that = this;
			clearTimeout(auto_gallery_init_timer);
			if (defaults.runAutoGalleryAfterDelay) {
				auto_gallery_init_timer = setTimeout(function(){
					isScregalWorking && !that.is_navigation_hover() ? that.autoGalleryStart() : '';
				}, defaults.runAutoGalleryAfterDelay);
			}
		};

		Scregal_Class.prototype.autoGalleryStart = function() {
			var that = this;
			isAutoGalleryRunning = true;

			defaults.hideNavigationWhenAutoGallery ? that.disappearNavigation() : '';
			defaults.hideFrontWhenAutoGallery ? that.disappearFront() : '';
			auto_gallery_delay_timer = setInterval(function(e){
				that.gallery_progress(true);
			}, defaults.autoGalleryDelay + Math.max(defaults.disappearDuration, defaults.appearDuration));
		};

		Scregal_Class.prototype.autoGalleryStop = function() {
			var that = this;
			isAutoGalleryRunning = false;

			clearInterval(auto_gallery_delay_timer);

			that.autoGalleryInit();
		};

		Scregal_Class.prototype.set_other_handlers = function() {
			var that = this;
			var i = 3;
			$scregalBox.on('mousemove', function(e){
				isFrontHidden ? that.appearFront() : '';
				isNavigationHidden && !defaults.isNavigationHidden ? that.appearNavigation() : '';
				isAutoGalleryRunning ? that.autoGalleryStop() : '';

				that.autoGalleryInit();
			});

			$(_(window.scregal.classnames.scregalCenterImg) + ', ' + _(window.scregal.classnames.scregalLeftImg) + ', ' + _(window.scregal.classnames.scregalRightImg)).load(function(){
				recent_data_image[$(this).attr('class')]['width'] = $(this).width();
				recent_data_image[$(this).attr('class')]['height'] = $(this).height();
				recent_data_image[$(this).attr('class')]['href'] = $(this).attr('src');

				if (--i == 0) {
					that.update_boxes_content();
					that.update_boxes_size();
					i = 3;
				}
			});

			$(window).resize(function(){
				that.update_boxes_size();
			});

			$('body').on('click', _(window.scregal.classnames.scregalRightBox), function(e){
				e.preventDefault();
				that.autoGalleryStop();
				that.gallery_progress(true);
			});

			$('body').on('click', _(window.scregal.classnames.scregalLeftBox), function(e){
				e.preventDefault();
				that.autoGalleryStop();
				that.gallery_progress();
			});

			$('body').on('click', defaults.prev + ', ' + _(window.scregal.classnames.scregalLeftNavigation), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.gallery_progress();
			});

			$('body').on('click', defaults.next + ', ' + _(window.scregal.classnames.scregalRightNavigation), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.gallery_progress(true);
			});

			$('body').on('click', defaults.close + ', ' + _(window.scregal.classnames.scregalClose), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.closeGallery();
			});

			$(document).on('keyup', function(e){
				e.preventDefault();
				var which = e.which;
				if (isScregalWorking && defaults.isNavigationKeyboard) {
					switch (which) {
						case 27 : that.closeGallery(); break;
						case 37 : that.gallery_progress(); that.autoGalleryStop(); break;
						case 39 : that.gallery_progress(true); that.autoGalleryStop(); break;
					}
				}
			});
		};

		Scregal_Class.prototype.openGallery = function(elem) {
			var that = this;
			var data = elem.data('scregal');
			that.set_recent_scregal_data(data);
			that.load_gallery_data();
			isScregalWorking = true;
			$(_(window.scregal.classnames.scregalBox)).fadeIn(300);
			$instance.trigger('scregalAppeared');
		};

		Scregal_Class.prototype.set_handler = function(elem) {
			var that = this;
			handlerForElem = function(e){
				e.preventDefault();
				that.openGallery(elem);
			};
			elem.on('click', handlerForElem);
		};

		Scregal_Class.prototype.gallery_progress = function(isNext) {
			var id = isNext ? this.getNextIndex() : this.getPrevIndex();
			var data = scregal_datas[recent_scregal_data.rel][id];
			this.set_recent_scregal_data(data);
			this.load_gallery_data();
		};

		Scregal_Class.prototype.closeGallery = function() {
			$(_(window.scregal.classnames.scregalBox)).fadeOut(300);
			$(_(window.scregal.classnames.scregalFigure)).remove();
			isScregalWorking = false;
			this.autoGalleryStop();
			$instance.trigger('scregalDisappeared');
		};

		Scregal_Class.prototype.getPrevIndex = function() {
			var id = recent_scregal_data.id;
			var gallery = scregal_datas[recent_scregal_data.rel];
			var length = gallery.length;

			for (var i in gallery) {
				var index = parseInt(i);
				if (gallery[index].id == id) {
					return index == 0 ? length-1 : index-1;
				}
			}
		};

		Scregal_Class.prototype.getNextIndex = function() {
			var id = recent_scregal_data.id;
			var gallery = scregal_datas[recent_scregal_data.rel];
			var length = gallery.length;

			for (var i in gallery) {
				var index = parseInt(i);
				if (gallery[index].id == id) {
					return index == length-1 ? 0 : index+1;
				}
			}
		};

		Scregal_Class.prototype.add_front_to_item = function() {
			$(_(window.scregal.classnames.scregalTitle)).html(recent_scregal_data.frontTitle);
		};

		Scregal_Class.prototype.load_gallery_data = function() {
			var id_prev = this.getPrevIndex();
			var id_next = this.getNextIndex();

			$scregalCenterImg.attr('src', recent_scregal_data.href);
			$scregalLeftImg.attr('src', scregal_datas[recent_scregal_data.rel][id_prev].href);
			$scregalRightImg.attr('src', scregal_datas[recent_scregal_data.rel][id_next].href);

			defaults.addFront ? this.add_front_to_item() : '';
		};

		Scregal_Class.prototype.on = function(eventName, eventHandler) {
			$instance.on(eventName, eventHandler);
		};

		Scregal_Class.prototype.off = function(eventName, eventHandler) {
			$instance.off(eventName, eventHandler);
		};

		Scregal_Class.prototype.update_boxes_size = function() {
			var basicWidth = defaults.basicWidth();
			var basicHeight = defaults.basicHeight();
			var scregalCenterImgWidth = recent_data_image.scregalCenterImg.width;
			var scregalCenterImgHeight = recent_data_image.scregalCenterImg.height;
			var scregalCenterImgNewWidth = Math.floor(scregalCenterImgWidth/(scregalCenterImgHeight/basicHeight));


			$scregalCenterBox.add($scregalLeftBox).add($scregalRightBox).height(basicHeight);

			var scregalCenterBoxNewWidth = typeof defaults.maxWidth == 'string' ? parseInt(defaults.maxWidth)/100 * basicWidth >= scregalCenterImgNewWidth ? scregalCenterImgNewWidth : parseInt(defaults.maxWidth)/100 * basicWidth : defaults.maxWidth >= scregalCenterImgNewWidth ? scregalCenterImgNewWidth : defaults.maxWidth;

			scregalCenterBoxNewWidth = Math.floor(scregalCenterBoxNewWidth);
			$scregalCenterBox.css({ width: scregalCenterBoxNewWidth });
			$scregalLeftBox.css({ width: (basicWidth - scregalCenterBoxNewWidth)/2 });
			$scregalRightBox.css({ width: (basicWidth - scregalCenterBoxNewWidth)/2 });
		};

		Scregal_Class.prototype.update_boxes_content = function() {

			var $figure = $('<figure class="' + window.scregal.classnames.scregalFigure + ' ' + window.scregal.classnames.scregalAdding + '">');
			var $scregalFigureCenter = $figure.clone().css('background-image', 'url(' + recent_data_image.scregalCenterImg.href + ')');
			var $scregalFigureLeft = $figure.clone().css('background-image', 'url(' + recent_data_image.scregalLeftImg.href + ')');
			var $scregalFigureRight = $figure.clone().css('background-image', 'url(' + recent_data_image.scregalRightImg.href + ')');

			$(_(window.scregal.classnames.scregalWrap) + _(window.scregal.classnames.scregalRemoved)).remove();
			$scregalCenterBox.prepend($scregalFigureCenter);
			$scregalLeftBox.prepend($scregalFigureLeft);
			$scregalRightBox.prepend($scregalFigureRight);

			$(_(window.scregal.classnames.scregalBesideBox) + _(window.scregal.classnames.scregalAdded)).addClass(window.scregal.classnames.scregalRemoving).animate(defaults.sideDisappearAnimation, defaults.disappearDuration, defaults.disappearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalRemoving);
				$(this).addClass(window.scregal.classnames.scregalRemoved);
			});

			$(_(window.scregal.classnames.scregalCenterBox) + _(window.scregal.classnames.scregalAdded)).addClass(window.scregal.classnames.scregalRemoving).animate(defaults.centerDisappearAnimation, defaults.disappearDuration, defaults.disappearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalRemoving);
				$(this).addClass(window.scregal.classnames.scregalRemoved);
			});

			$(_(window.scregal.classnames.scregalBesideBox) + _(window.scregal.classnames.scregalAdding)).animate(defaults.sideAppearAnimation, defaults.appearDuration, defaults.appearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalAdding);
				$(this).addClass(window.scregal.classnames.scregalAdded);
			});

			$(_(window.scregal.classnames.scregalCenterBox) + _(window.scregal.classnames.scregalAdding)).animate(defaults.centerAppearAnimation, defaults.appearDuration, defaults.appearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalAdding);
				$(this).addClass(window.scregal.classnames.scregalAdded);
			});
		};

		return Scregal_Class;
	})();

	window.Scregal = Scregal;

	var auto_scregal_instances = $('.js-scregal');
	auto_scregal_instances.each(function(){
		var gallery = $(this);
		var options = JSON.parse(gallery.attr('data-scregal-options'));
		var scregal = new Scregal(gallery, options);
		$(this).data('scregal', scregal);
	});

	$.fn.scregal = function(opts) {
		$(this).each(function(){
			var gallery = $(this);
			var scregal = new Scregal(gallery, opts);
			$(this).addClass('js-scregal');
			$(this).data('scregal', scregal);
		});
	};

}(jQuery));