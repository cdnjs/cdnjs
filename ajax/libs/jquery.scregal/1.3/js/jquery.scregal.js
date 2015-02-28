/**
 * Copyright (c) Bartłomiej Semańczyk - bartekss2@gmail.com http://www.blue-world.pl
 * @version 1.3
 * Last Update: Monday, 12 January 2015
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

	var templates = {
		footer: {
			classname: 'scregal-footer-template',
			frontContent: function() {
				return $('<div class="navigation"><div class="prev"></div><div class="next"></div><div class="close"></div></div>');
			},
			basicHeight: function() {
				return $(window).height() - $('.scregalFront').outerHeight();
			},
			frontTitle: function() {
				var h1 = $('<div class="scregalSubtitle">');
				var title = $(this).attr('data-title');
				var author = $(this).attr('data-author');
				var postlink = $(this).attr('data-post-link');
				var posttitle = $(this).attr('data-post-title');
				h1.append('<h3>'+ title + '</h3>');
				author ? h1.append('<p>zdjęcie: ' + author + '</p>') : '';
				postlink ? h1.append('zobacz więcej: <a href="' + postlink + '">' + posttitle + '</a>') : '';
				return h1;
			},
			disappearDuration: 300,
			appearDuration: 300,
			addFront: true,
			prev: '.prev',
			next: '.next',
			close: '.close'
		}
	};

	if (window.scregal === undefined) {
		window.scregal = {};
	}
	window.scregal.classnames = classnames;

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



	function _(str) {
		var dot = ".";
		return dot + str + ' ';
	}

	var Scregal = (function() {

		var Scregal_Class = function(gallery, opts) {
			var that = this;

			// this.$instance = undefined;
			this.$instance = gallery;
			if (typeof gallery === 'string') {
				this.$instance = $(gallery);
			}
			var data = this.$instance.data('scregal');
			if (data) {
				return data;
			}

			//flags
			this.isInitialized = false;
			this.isScregalWorking = false;
			this.isAutoGalleryRunning = false;
			this.isNavigationHidden = false;
			this.isFrontHidden = false;

			/* timer handlers */
			this.auto_gallery_delay_timer = null;
			this.auto_gallery_init_timer = null;
			this.ids_counter = 0;
			this.handlerForElem = undefined;

			/* datas */
			this.scregal_datas = {};
			this.recent_scregal_data = undefined;
			this.recent_data_image = {
				scregalCenterImg : {},
				scregalLeftImg : {},
				scregalRightImg : {} };

			/* options */
			this.defaults = {
				elems: '> a',
				maxWidth: '85%',
				template: undefined,
				centerDisappearAnimation: { opacity: 0 },
				sideDisappearAnimation: { opacity: 0 },
				centerAppearAnimation: { opacity: 1 },
				sideAppearAnimation: { opacity: 1 },
				disappearDuration: 2000,
				appearDuration: 2000,
				disappearEasing: 'easeInOutExpo',
				appearEasing: 'easeInOutExpo',
				isNavigationHidden: false,
				manageNavigationUsingKeyboard: true,
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
			if (opts.template) {
				this.updateOptions(templates[opts.template]);
				$scregalBox.addClass(templates[opts.template]['classname']);
			}

			this.updateOptions(opts);

			if (this.$instance.length) {

				var $whereToSearch = $.trim(this.defaults.elems).indexOf('>') == 0 ? this.$instance.find(this.defaults.elems) : $(this.defaults.elems);
				$whereToSearch.each(function() {
					that.append($(this));
				});
				// return this;
			} else {
				// throw 'There is no instance of gallery for Scregal';
			}
			if (this.defaults.init) {
				this.init();
			}
		};

		Scregal_Class.prototype.init = function() {
			var that = this;
			if (!that.isInitialized) {
				if (!$('body ' + _(window.scregal.classnames.scregalBox)).length) {
					$('body').prepend($scregalBox);
					$scregalBox.append($scregalLeftBox, $scregalCenterBox, $scregalRightBox, $scregalLeftImg, $scregalCenterImg, $scregalRightImg);
					if (that.defaults.addFront) {
						$scregalBox.append($scregalFront);
						$scregalFront.prepend(that.defaults.frontContent());
					 	$scregalFront.show(0);
					}

					!that.defaults.prev ? $scregalBox.append($scregalLeftNav) : '';
					!that.defaults.next ? $scregalBox.append($scregalRightNav) : '';
					!that.defaults.close ? $scregalBox.append($scregalClose) : '';

				}
				that.defaults.isNavigationHidden ? that.disappearNavigation() : '';

				that.isInitialized = true;
				that.$instance.trigger('scregalInitialized');
				that.$instance.data('scregal', that);
				that.set_other_handlers();
			}
		};

		Scregal_Class.prototype.updateOptions = function(opts) {
			var that = this;
			opts ? $.extend(that.defaults, opts) : '';
		};

		Scregal_Class.prototype.append = function(elems) {
			var that = this;
			elems.each(function(){
				var t = $(this);
				var rel = t.attr('data-rel') ? t.attr('data-rel') : that.defaults.getGalleryName.call(t);

				!that.scregal_datas[rel] ? that.scregal_datas[rel] = [] : '';
				var data = {
					elem: t,
					href: t.attr('href'),
					rel: rel,
					id: that.ids_counter++,
					frontTitle : that.defaults.frontTitle.call(t),
					handler: function(e){
						e.preventDefault();
						that.openGallery(t);
					}
				};
				t.on('click', data.handler);
				that.scregal_datas[rel].push(data);

				t.addClass('scregal');
				t.data('scregal', data);
				that.$instance.trigger('elemAppended', [t]);
			});
		};

		Scregal_Class.prototype.remove = function(elems) {
			var that = this;
			elems.each(function(){
				var data = $(this).data('scregal');
				var gallery = that.scregal_datas[data.rel];
				for (var i in gallery) {
					var index = parseInt(i);
					if (gallery[index].id == data.id) {
						gallery.splice(index, 1);
					}
				}
				$(this).off('click', data.handler);
				$(this).removeData('scregal');
				that.$instance.trigger('elemRemoved', [$(this)]);
			});
		};

		Scregal_Class.prototype.set_recent_scregal_data = function(data) {
			this.recent_scregal_data = data;
		};

		Scregal_Class.prototype.disappearNavigation = function() {
			var that = this;
			that.isNavigationHidden = true;
			$scregalRightNav.add($scregalLeftNav).add($scregalClose).add(that.defaults.prev + ', ' + that.defaults.next + ', ' + that.defaults.close).fadeOut(300);
		};

		Scregal_Class.prototype.appearNavigation = function() {
			var that = this;
			if (!that.defaults.isNavigationHidden) {
				that.isNavigationHidden = false;
				$scregalRightNav.add($scregalLeftNav).add($scregalClose).add(that.defaults.prev + ', ' + that.defaults.next + ', ' + that.defaults.close).fadeIn(300);
			}
		};

		Scregal_Class.prototype.disappearFront = function() {
			this.isFrontHidden = true;
			$scregalFront.fadeOut(300);
		};

		Scregal_Class.prototype.appearFront = function() {
			this.isFrontHidden = false;
			$scregalFront.fadeIn(300);
		};

		Scregal_Class.prototype.is_navigation_hover = function() {
			var that = this;
			var prev = that.defaults.prev ? that.defaults.prev + ':hover' : _(window.scregal.classnames.scregalLeftNavigation) + ':hover';
			var next = that.defaults.next ? that.defaults.next + ':hover' : _(window.scregal.classnames.scregalRightNavigation) + ':hover';
			var elems = $(prev + ', ' + next);
			var isHover = elems.length ? true : false;

			return isHover;
		};

		Scregal_Class.prototype.autoGalleryInit = function() {
			var that = this;
			clearTimeout(that.auto_gallery_init_timer);
			if (that.defaults.runAutoGalleryAfterDelay) {
				that.auto_gallery_init_timer = setTimeout(function(){
					that.isScregalWorking && !that.is_navigation_hover() ? that.autoGalleryStart() : '';
				}, that.defaults.runAutoGalleryAfterDelay);
			}
		};

		Scregal_Class.prototype.autoGalleryStart = function() {
			var that = this;
			that.isAutoGalleryRunning = true;

			that.defaults.hideNavigationWhenAutoGallery ? that.disappearNavigation() : '';
			that.defaults.hideFrontWhenAutoGallery ? that.disappearFront() : '';
			that.auto_gallery_delay_timer = setInterval(function(e){
				that.gallery_progress(true);
			}, that.defaults.autoGalleryDelay + Math.max(that.defaults.disappearDuration, that.defaults.appearDuration));
		};

		Scregal_Class.prototype.autoGalleryStop = function() {
			var that = this;
			that.isAutoGalleryRunning = false;

			clearInterval(that.auto_gallery_delay_timer);

			that.autoGalleryInit();
		};

		Scregal_Class.prototype.set_other_handlers = function() {
			var that = this;
			var i = 3;
			$scregalBox.on('mousemove', function(e){
				that.isFrontHidden ? that.appearFront() : '';
				that.isNavigationHidden && !that.defaults.isNavigationHidden ? that.appearNavigation() : '';
				that.isAutoGalleryRunning ? that.autoGalleryStop() : '';

				that.autoGalleryInit();
			});

			$(_(window.scregal.classnames.scregalCenterImg) + ', ' + _(window.scregal.classnames.scregalLeftImg) + ', ' + _(window.scregal.classnames.scregalRightImg)).load(function(){
				that.recent_data_image[$(this).attr('class')]['width'] = $(this).width();
				that.recent_data_image[$(this).attr('class')]['height'] = $(this).height();
				that.recent_data_image[$(this).attr('class')]['href'] = $(this).attr('src');

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

			$('body').on('click', that.defaults.prev + ', ' + _(window.scregal.classnames.scregalLeftNavigation), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.gallery_progress();
			});

			$('body').on('click', that.defaults.next + ', ' + _(window.scregal.classnames.scregalRightNavigation), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.gallery_progress(true);
			});

			$('body').on('click', that.defaults.close + ', ' + _(window.scregal.classnames.scregalClose), function(e){
				e.preventDefault();
				e.stopPropagation();
				that.closeGallery();
			});

			$(document).on('keyup', function(e){
				e.preventDefault();
				var which = e.which;
				if (that.isScregalWorking && that.defaults.manageNavigationUsingKeyboard) {
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
			that.isScregalWorking = true;
			$(_(window.scregal.classnames.scregalBox)).fadeIn(300);
			that.$instance.trigger('scregalAppeared');
		};

		Scregal_Class.prototype.gallery_progress = function(isNext) {
			var id = isNext ? this.getNextIndex() : this.getPrevIndex();
			var data = this.scregal_datas[this.recent_scregal_data.rel][id];
			this.set_recent_scregal_data(data);
			this.load_gallery_data();
		};

		Scregal_Class.prototype.closeGallery = function() {
			$(_(window.scregal.classnames.scregalBox)).fadeOut(300);
			$(_(window.scregal.classnames.scregalFigure)).remove();
			this.isScregalWorking = false;
			this.autoGalleryStop();
			this.$instance.trigger('scregalDisappeared');
		};

		Scregal_Class.prototype.getPrevIndex = function() {
			var id = this.recent_scregal_data.id;
			var gallery = this.scregal_datas[this.recent_scregal_data.rel];
			var length = gallery.length;

			for (var i in gallery) {
				var index = parseInt(i);
				if (gallery[index].id == id) {
					return index == 0 ? length-1 : index-1;
				}
			}
		};

		Scregal_Class.prototype.getNextIndex = function() {
			var id = this.recent_scregal_data.id;
			var gallery = this.scregal_datas[this.recent_scregal_data.rel];
			var length = gallery.length;

			for (var i in gallery) {
				var index = parseInt(i);
				if (gallery[index].id == id) {
					return index == length-1 ? 0 : index+1;
				}
			}
		};

		Scregal_Class.prototype.add_front_to_item = function() {
			var that = this;
			$(_(window.scregal.classnames.scregalTitle)).html(that.recent_scregal_data.frontTitle);
		};

		Scregal_Class.prototype.load_gallery_data = function() {
			var id_prev = this.getPrevIndex();
			var id_next = this.getNextIndex();

			$scregalCenterImg.attr('src', this.recent_scregal_data.href);
			$scregalLeftImg.attr('src', this.scregal_datas[this.recent_scregal_data.rel][id_prev].href);
			$scregalRightImg.attr('src', this.scregal_datas[this.recent_scregal_data.rel][id_next].href);

			this.defaults.addFront ? this.add_front_to_item() : '';
		};

		Scregal_Class.prototype.on = function(eventName, eventHandler) {
			that.$instance.on(eventName, eventHandler);
		};

		Scregal_Class.prototype.off = function(eventName, eventHandler) {
			that.$instance.off(eventName, eventHandler);
		};

		Scregal_Class.prototype.update_boxes_size = function() {
			var that = this;
			var basicWidth = that.defaults.basicWidth();
			var basicHeight = that.defaults.basicHeight();
			var scregalCenterImgWidth = that.recent_data_image.scregalCenterImg.width;
			var scregalCenterImgHeight = that.recent_data_image.scregalCenterImg.height;
			var scregalCenterImgNewWidth = Math.floor(scregalCenterImgWidth/(scregalCenterImgHeight/basicHeight));


			$scregalCenterBox.add($scregalLeftBox).add($scregalRightBox).height(basicHeight);

			var scregalCenterBoxNewWidth = typeof that.defaults.maxWidth == 'string' ? parseInt(that.defaults.maxWidth)/100 * basicWidth >= scregalCenterImgNewWidth ? scregalCenterImgNewWidth : parseInt(that.defaults.maxWidth)/100 * basicWidth : that.defaults.maxWidth >= scregalCenterImgNewWidth ? scregalCenterImgNewWidth : that.defaults.maxWidth;

			scregalCenterBoxNewWidth = Math.floor(scregalCenterBoxNewWidth);
			$scregalCenterBox.css({ width: scregalCenterBoxNewWidth });
			$scregalLeftBox.css({ width: (basicWidth - scregalCenterBoxNewWidth)/2 });
			$scregalRightBox.css({ width: (basicWidth - scregalCenterBoxNewWidth)/2 });
		};

		Scregal_Class.prototype.update_boxes_content = function() {
			var that = this;
			var $figure = $('<figure class="' + window.scregal.classnames.scregalFigure + ' ' + window.scregal.classnames.scregalAdding + '">');
			var $scregalFigureCenter = $figure.clone().css('background-image', 'url(' + that.recent_data_image.scregalCenterImg.href + ')');
			var $scregalFigureLeft = $figure.clone().css('background-image', 'url(' + that.recent_data_image.scregalLeftImg.href + ')');
			var $scregalFigureRight = $figure.clone().css('background-image', 'url(' + that.recent_data_image.scregalRightImg.href + ')');

			$(_(window.scregal.classnames.scregalWrap) + _(window.scregal.classnames.scregalRemoved)).remove();
			$scregalCenterBox.prepend($scregalFigureCenter);
			$scregalLeftBox.prepend($scregalFigureLeft);
			$scregalRightBox.prepend($scregalFigureRight);

			$(_(window.scregal.classnames.scregalBesideBox) + _(window.scregal.classnames.scregalAdded)).addClass(window.scregal.classnames.scregalRemoving).animate(that.defaults.sideDisappearAnimation, that.defaults.disappearDuration, that.defaults.disappearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalRemoving);
				$(this).addClass(window.scregal.classnames.scregalRemoved);
			});

			$(_(window.scregal.classnames.scregalCenterBox) + _(window.scregal.classnames.scregalAdded)).addClass(window.scregal.classnames.scregalRemoving).animate(that.defaults.centerDisappearAnimation, that.defaults.disappearDuration, that.defaults.disappearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalRemoving);
				$(this).addClass(window.scregal.classnames.scregalRemoved);
			});

			$(_(window.scregal.classnames.scregalBesideBox) + _(window.scregal.classnames.scregalAdding)).animate(that.defaults.sideAppearAnimation, that.defaults.appearDuration, that.defaults.appearEasing, function(){
				$(this).removeClass(window.scregal.classnames.scregalAdding);
				$(this).addClass(window.scregal.classnames.scregalAdded);
			});

			$(_(window.scregal.classnames.scregalCenterBox) + _(window.scregal.classnames.scregalAdding)).animate(that.defaults.centerAppearAnimation, that.defaults.appearDuration, that.defaults.appearEasing, function(){
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
		var opts = gallery.attr('data-scregal-options')
		var options = opts ? JSON.parse(opts) : {};
		var scregal = new Scregal(gallery, options);
	});

	$.fn.scregal = function(opts) {
		$(this).each(function(){
			var gallery = $(this);
			var scregal = new Scregal(gallery, opts);
			$(this).addClass('js-scregal');
		});
	};

}(jQuery));