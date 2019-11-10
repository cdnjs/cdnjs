/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: mb.bgndGallery.js
 *
 *  Copyright (c) 2001-2014. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 07/05/14 22.40
 *  *****************************************************************************
 */

/*Browser detection patch*/
var nAgt = navigator.userAgent;
if (!jQuery.browser) {
	jQuery.browser = {};
	jQuery.browser.mozilla = !1;
	jQuery.browser.webkit = !1;
	jQuery.browser.opera = !1;
	jQuery.browser.safari = !1;
	jQuery.browser.chrome = !1;
	jQuery.browser.msie = !1;
	jQuery.browser.ua = nAgt;
	jQuery.browser.name = navigator.appName;
	jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion);
	jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10);
	var nameOffset, verOffset, ix;
	if (-1 != (verOffset = nAgt.indexOf("Opera")))jQuery.browser.opera = !0, jQuery.browser.name = "Opera", jQuery.browser.fullVersion = nAgt.substring(verOffset + 6), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)); else if (-1 != (verOffset = nAgt.indexOf("MSIE")))jQuery.browser.msie = !0, jQuery.browser.name = "Microsoft Internet Explorer", jQuery.browser.fullVersion = nAgt.substring(verOffset + 5); else if (-1 != nAgt.indexOf("Trident")) {
		jQuery.browser.msie = !0;
		jQuery.browser.name = "Microsoft Internet Explorer";
		var start = nAgt.indexOf("rv:") + 3, end = start + 4;
		jQuery.browser.fullVersion = nAgt.substring(start, end)
	} else-1 != (verOffset = nAgt.indexOf("Chrome")) ? (jQuery.browser.webkit = !0, jQuery.browser.chrome = !0, jQuery.browser.name = "Chrome", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7)) : -1 != (verOffset = nAgt.indexOf("Safari")) ? (jQuery.browser.webkit = !0, jQuery.browser.safari = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("AppleWebkit")) ? (jQuery.browser.webkit = !0, jQuery.browser.name = "Safari", jQuery.browser.fullVersion = nAgt.substring(verOffset + 7), -1 != (verOffset = nAgt.indexOf("Version")) && (jQuery.browser.fullVersion = nAgt.substring(verOffset + 8))) : -1 != (verOffset = nAgt.indexOf("Firefox")) ? (jQuery.browser.mozilla = !0, jQuery.browser.name = "Firefox", jQuery.browser.fullVersion = nAgt.substring(verOffset + 8)) : (nameOffset = nAgt.lastIndexOf(" ") + 1) < (verOffset = nAgt.lastIndexOf("/")) && (jQuery.browser.name = nAgt.substring(nameOffset, verOffset), jQuery.browser.fullVersion = nAgt.substring(verOffset + 1), jQuery.browser.name.toLowerCase() == jQuery.browser.name.toUpperCase() && (jQuery.browser.name = navigator.appName));
	-1 != (ix = jQuery.browser.fullVersion.indexOf(";")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
	-1 != (ix = jQuery.browser.fullVersion.indexOf(" ")) && (jQuery.browser.fullVersion = jQuery.browser.fullVersion.substring(0, ix));
	jQuery.browser.majorVersion = parseInt("" + jQuery.browser.fullVersion, 10);
	isNaN(jQuery.browser.majorVersion) && (jQuery.browser.fullVersion = "" + parseFloat(navigator.appVersion), jQuery.browser.majorVersion = parseInt(navigator.appVersion, 10));
	jQuery.browser.version = jQuery.browser.majorVersion
}
jQuery.browser.android = /Android/i.test(nAgt);
jQuery.browser.blackberry = /BlackBerry/i.test(nAgt);
jQuery.browser.ios = /iPhone|iPad|iPod/i.test(nAgt);
jQuery.browser.operaMobile = /Opera Mini/i.test(nAgt);
jQuery.browser.windowsMobile = /IEMobile/i.test(nAgt);
jQuery.browser.mobile = jQuery.browser.android || jQuery.browser.blackberry || jQuery.browser.ios || jQuery.browser.windowsMobile || jQuery.browser.operaMobile;

/*
 *   jquery.mb.components
 *  file: jquery.mb.CSSAnimate.js
 */

/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.CSSAnimate.js
 *
 *  Copyright (c) 2001-2013. Matteo Bicocchi (Pupunzi);
 *  Open lab srl, Firenze - Italy
 *  email: matteo@open-lab.com
 *  site: 	http://pupunzi.com
 *  blog:	http://pupunzi.open-lab.com
 * 	http://open-lab.com
 *
 *  Licences: MIT, GPL
 *  http://www.opensource.org/licenses/mit-license.php
 *  http://www.gnu.org/licenses/gpl.html
 *
 *  last modified: 09/06/13 17.08
 *  *****************************************************************************
 */
jQuery.fn.CSSAnimate=function(a,g,p,m,h){function r(a){return a.replace(/([A-Z])/g,function(a){return"-"+a.toLowerCase()})}function f(a,f){return"string"!==typeof a||a.match(/^[\-0-9\.]+$/)?""+a+f:a}jQuery.support.transition=function(){var a=(document.body||document.documentElement).style;return void 0!==a.transition||void 0!==a.WebkitTransition||void 0!==a.MozTransition||void 0!==a.MsTransition||void 0!==a.OTransition}();return this.each(function(){var e=this,k=jQuery(this);e.id=e.id||"CSSA_"+(new Date).getTime(); var l=l||{type:"noEvent"};if(e.CSSAIsRunning&&e.eventType==l.type)e.CSSqueue=function(){k.CSSAnimate(a,g,p,m,h)};else if(e.CSSqueue=null,e.eventType=l.type,0!==k.length&&a){e.CSSAIsRunning=!0;"function"==typeof g&&(h=g,g=jQuery.fx.speeds._default);"function"==typeof p&&(h=p,p=0);"function"==typeof m&&(h=m,m="cubic-bezier(0.65,0.03,0.36,0.72)");if("string"==typeof g)for(var b in jQuery.fx.speeds)if(g==b){g=jQuery.fx.speeds[b];break}else g=jQuery.fx.speeds._default;g||(g=jQuery.fx.speeds._default); if(jQuery.support.transition){l={"default":"ease","in":"ease-in",out:"ease-out","in-out":"ease-in-out",snap:"cubic-bezier(0,1,.5,1)",easeOutCubic:"cubic-bezier(.215,.61,.355,1)",easeInOutCubic:"cubic-bezier(.645,.045,.355,1)",easeInCirc:"cubic-bezier(.6,.04,.98,.335)",easeOutCirc:"cubic-bezier(.075,.82,.165,1)",easeInOutCirc:"cubic-bezier(.785,.135,.15,.86)",easeInExpo:"cubic-bezier(.95,.05,.795,.035)",easeOutExpo:"cubic-bezier(.19,1,.22,1)",easeInOutExpo:"cubic-bezier(1,0,0,1)",easeInQuad:"cubic-bezier(.55,.085,.68,.53)", easeOutQuad:"cubic-bezier(.25,.46,.45,.94)",easeInOutQuad:"cubic-bezier(.455,.03,.515,.955)",easeInQuart:"cubic-bezier(.895,.03,.685,.22)",easeOutQuart:"cubic-bezier(.165,.84,.44,1)",easeInOutQuart:"cubic-bezier(.77,0,.175,1)",easeInQuint:"cubic-bezier(.755,.05,.855,.06)",easeOutQuint:"cubic-bezier(.23,1,.32,1)",easeInOutQuint:"cubic-bezier(.86,0,.07,1)",easeInSine:"cubic-bezier(.47,0,.745,.715)",easeOutSine:"cubic-bezier(.39,.575,.565,1)",easeInOutSine:"cubic-bezier(.445,.05,.55,.95)",easeInBack:"cubic-bezier(.6,-.28,.735,.045)", easeOutBack:"cubic-bezier(.175, .885,.32,1.275)",easeInOutBack:"cubic-bezier(.68,-.55,.265,1.55)"};l[m]&&(m=l[m]);var d="",q="transitionEnd";jQuery.browser.webkit?(d="-webkit-",q="webkitTransitionEnd"):jQuery.browser.mozilla?(d="-moz-",q="transitionend"):jQuery.browser.opera?(d="-o-",q="otransitionend"):jQuery.browser.msie&&(d="-ms-",q="msTransitionEnd");l=[];for(c in a){b=c;"transform"===b&&(b=d+"transform",a[b]=a[c],delete a[c]);"filter"===b&&(b=d+"filter",a[b]=a[c],delete a[c]);if("transform-origin"=== b||"origin"===b)b=d+"transform-origin",a[b]=a[c],delete a[c];"x"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" translateX("+f(a[c],"px")+")",delete a[c]);"y"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" translateY("+f(a[c],"px")+")",delete a[c]);"z"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" translateZ("+f(a[c],"px")+")",delete a[c]);"rotate"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" rotate("+f(a[c],"deg")+")",delete a[c]);"rotateX"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" rotateX("+f(a[c],"deg")+ ")",delete a[c]);"rotateY"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" rotateY("+f(a[c],"deg")+")",delete a[c]);"rotateZ"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" rotateZ("+f(a[c],"deg")+")",delete a[c]);"scale"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" scale("+f(a[c],"")+")",delete a[c]);"scaleX"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" scaleX("+f(a[c],"")+")",delete a[c]);"scaleY"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" scaleY("+f(a[c],"")+")",delete a[c]);"scaleZ"===b&&(b=d+"transform", a[b]=a[b]||"",a[b]+=" scaleZ("+f(a[c],"")+")",delete a[c]);"skew"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" skew("+f(a[c],"deg")+")",delete a[c]);"skewX"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" skewX("+f(a[c],"deg")+")",delete a[c]);"skewY"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" skewY("+f(a[c],"deg")+")",delete a[c]);"perspective"===b&&(b=d+"transform",a[b]=a[b]||"",a[b]+=" perspective("+f(a[c],"px")+")",delete a[c]);0>l.indexOf(b)&&l.push(r(b))}var c=l.join(","),s=function(){k.off(q+"."+ e.id);clearTimeout(e.timeout);k.css(d+"transition","");"function"==typeof h&&h(k);e.called=!0;e.CSSAIsRunning=!1;"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null)},n={};$.extend(n,a);n[d+"transition-property"]=c;n[d+"transition-duration"]=g+"ms";n[d+"transition-delay"]=p+"ms";n[d+"transition-style"]="preserve-3d";n[d+"transition-timing-function"]=m;setTimeout(function(){k.one(q+"."+e.id,s);k.css(n)},1);e.timeout=setTimeout(function(){k.called||!h?(k.called=!1,e.CSSAIsRunning=!1):(k.css(d+ "transition",""),h(k),e.CSSAIsRunning=!1,"function"==typeof e.CSSqueue&&(e.CSSqueue(),e.CSSqueue=null))},g+p+100)}else{for(var c in a)"transform"===c&&delete a[c],"filter"===c&&delete a[c],"transform-origin"===c&&delete a[c],"auto"===a[c]&&delete a[c];h&&"string"!==typeof h||(h="linear");k.animate(a,g,h)}}})};$.fn.css3=function(a){alert("SSS");return this.each(function(){$(this).CSSAnimate(a,1,0,null)})};




(function(jQuery){

	jQuery.mbBgndGallery ={
		name:"mb.bgndGallery",
		author:"Matteo Bicocchi",
		version:"1.9.0",
		defaults:{
			containment:"body",
			images:[],
			shuffle:false,
			controls:null,
			effect:"fade",
			filter: null,
			timer:4000,
			effTimer:3000,
			raster:false, //"inc/raster.png"
			folderPath:false,
			autoStart:true,
			grayScale:false,
			activateKeyboard:true,
			preserveTop:false,
			preserveWidth:false,
			placeHolder:"",

			//Path to the folder containing the thumbnails and ID of the DOM element that should contains them.
			// Thumbnail should have the same name of the corresponding image
			thumbs:{folderPath:"", placeholder:""},

			onStart:function(){},
			onChange:function(opt,idx){},
			onPause:function(opt){},
			onPlay:function(opt){},
			onNext:function(opt){},
			onPrev:function(opt){}
			// idx = the zero based index of the displayed photo
			// opt=the options relatives to this component instance you can manipulate on the specific event

			// for example, if you want to reverse the enter/exit effect once the previous button is clicked:
			// you can change the opt.effect onPrev event : opt.effect = "slideRight"
			// onNext:function(opt){opt.effect = "slideLeft"}
			// onPrev:function(opt){opt.effect = "slideRight"}

		},

		filters:{
			gray:{
				moz: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'matrix\' values=\'0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\'/></filter></svg>#grayscale")',
				webkit: 'grayscale(100%)',
				msie: 'gray'
			},
			halfGray:{
				moz: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'grayscale\'><feColorMatrix type=\'saturate\' values=\'0.5\'/></filter></svg>#grayscale")',
				webkit: 'grayscale(50%)',
				msie: 'gray alpha(opacity=50)'
			}
		},

		clear:false,

		buildGallery:function(options){
			var opt = {};
			jQuery.extend(opt, jQuery.mbBgndGallery.defaults,options);
			opt.galleryID= new Date().getTime();
			var el= jQuery(opt.containment).get(0);
			el.opt= opt;
			jQuery.mbBgndGallery.el = el;
			if(el.opt.onStart)
				el.opt.onStart();

			el.opt.gallery= jQuery("<div/>").attr({id:"bgndGallery_"+el.opt.galleryID}).addClass("mbBgndGallery");
			var pos= el.opt.containment=="body"?"fixed":"absolute";
			el.opt.gallery.css({
				position: pos,
				top: 0, let: 0,
				width: "100%",
				height: "100%",
				overflow: "hidden"
				/*,
				 backfaceVisibility:"hidden",
				 webkitBackfaceVisibility:"hidden",
				 mozBackfaceVisibility:"hidden",
				 msBackfaceVisibility:"hidden"
				 */
			});

			var containment = el.opt.containment;

			if(containment !="body" && jQuery(containment).text().trim()!=""){
				var wrapper=jQuery("<div/>").css({"position":"absolute",minHeight:"100%", minWidth:"100%", zIndex:3});
				jQuery(containment).wrapInner(wrapper);
				if(jQuery(containment).css("position")=="static")
					jQuery(containment).css("position","relative");
			}
			if(opt.raster){
				var raster=jQuery("<div/>").css({position:"absolute",top:0,left:0,width:"100%",height:"100%",background:"url("+opt.raster+")",zIndex:1});
				opt.gallery.append(raster);
			}

			jQuery(containment).prepend(opt.gallery);

			if(el.opt.folderPath && el.opt.images.length==0)
				el.opt.images = jQuery.loadFromSystem(el.opt.folderPath) ;


			if(el.opt.shuffle)
				el.opt.images= jQuery.shuffle(el.opt.images);

			var totImg= el.opt.images.length;

			var loadCounter=0;

			jQuery.mbBgndGallery.preload(el.opt.images[0],el);
			el.opt.gallery.on("imageLoaded."+el.opt.galleryID,function(){
				loadCounter++;
				if(loadCounter==totImg){
					el.opt.gallery.off("imageLoaded."+el.opt.galleryID);
					return;
				}
				jQuery.mbBgndGallery.preload(el.opt.images[loadCounter],el);
			});

			el.opt.imageCounter=0;

			jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);

			if (!opt.autoStart){
				el.opt.paused=true;
				jQuery(el.opt.gallery).trigger("paused");
			}

			el.opt.gallery.on("imageReady."+el.opt.galleryID,function(){

				if(el.opt.paused)
					return;

				clearTimeout(el.opt.changing);

				jQuery.mbBgndGallery.play(el);
			});

			jQuery(window).on("resize",function(){
				var image=jQuery("img",el.opt.gallery);
				jQuery.mbBgndGallery.checkSize(image,el);
			});

			var controls = el.opt.controls;
			if(controls){
				$(controls).addClass("controls");

				var counter=jQuery(el.opt.controls).find(".counter");
				counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

				jQuery.mbBgndGallery.buildControls(controls,el);
				jQuery(el.opt.containment).on("paused",function(){
					jQuery(el.opt.controls).find(".play").show();
					jQuery(el.opt.controls).find(".pause").hide();
				});
				jQuery(el.opt.containment).on("play",function(){
					jQuery(el.opt.controls).find(".play").hide();
					jQuery(el.opt.controls).find(".pause").show();
				});
			}

			//	if(el.opt.thumbs.folderPath.trim().length > 0 && el.opt.thumbs.placeholder.trim().length > 0)
			jQuery.mbBgndGallery.buildThumbs(el);

			return jQuery(el);

		},

		normalizeCss:function(opt){
			var newOpt = jQuery.extend(true, {}, opt);
			var sfx = "";
			var transitionEnd = "transitionEnd";
			if (jQuery.browser.webkit) {
				sfx = "-webkit-";
				transitionEnd = "webkitTransitionEnd";
			} else if (jQuery.browser.mozilla) {
				sfx = "-moz-";
				transitionEnd = "transitionend";
			} else if (jQuery.browser.opera) {
				sfx = "-o-";
				transitionEnd = "oTransitionEnd";
			} else if (jQuery.browser.msie) {
				sfx = "-ms-";
				transitionEnd = "msTransitionEnd";
			}

			function uncamel(str) {
				return str.replace(/([A-Z])/g, function(letter) { return '-' + letter.toLowerCase(); });
			}

			function setUnit(i, units) {
				if ((typeof i === "string") && (!i.match(/^[\-0-9\.]+$/))) {
					return i;
				} else {
					return "" + i + units;
				}
			}

			for(var o in newOpt){

				if (o==="transform"){
					newOpt[sfx+"transform"]=newOpt[o];
					delete newOpt[o];
				}

				if (o==="transform-origin"){
					newOpt[sfx+"transform-origin"]=opt[o];
					delete newOpt[o];
				}

				if (o==="filter"){
					newOpt[sfx+"filter"]=opt[o];
					delete newOpt[o];
				}

				/**
				 * Translate
				 * */

				var key="";

				if (o === "x") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" translateX("+setUnit(opt[o],"px")+")");
					delete newOpt[o];
				}

				if (o === "y") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" translateY("+setUnit(opt[o],"px")+")");
					delete newOpt[o];
				}

				if (o === "z") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" translateZ("+setUnit(opt[o],"px")+")");
					delete newOpt[o];
				}

				/**
				 * Rotate
				 * */
				if (o === "rotate") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" rotate("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				if (o === "rotateX") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" rotateX("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				if (o === "rotateY") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" rotateY("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				if (o === "rotateZ") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" rotateZ("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				/**
				 * Scale
				 * */
				if (o === "scale") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" scale("+setUnit(opt[o],"")+")");
					delete newOpt[o];
				}

				if (o === "scaleX") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" scaleX("+setUnit(opt[o],"")+")");
					delete newOpt[o];
				}

				if (o === "scaleY") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" scaleY("+setUnit(opt[o],"")+")");
					delete newOpt[o];
				}

				if (o === "scaleZ") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" scaleZ("+setUnit(opt[o],"")+")");
					delete newOpt[o];
				}

				/**
				 * Skew
				 * */

				if (o === "skew") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" skew("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				if (o === "skewX") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" skewX("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				if (o === "skewY") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" skewY("+setUnit(opt[o],"deg")+")");
					delete newOpt[o];
				}

				/**
				 * Perspective
				 * */
				if (o === "perspective") {
					key = sfx + "transform";
					newOpt[key] = newOpt[key] || "";
					newOpt[key]+= (" perspective("+setUnit(opt[o],"px")+")");
					delete newOpt[o];
				}

			}
			return newOpt;
		},

		preload:function(url,el){
			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			var img= jQuery("<img/>").load(function(){
				el.opt.gallery.trigger("imageLoaded."+el.opt.galleryID);
			}).attr("src",url);
		},

		checkSize:function(image,el){
			if(!image)
				return;

			if(jQuery.mbBgndGallery.changing)
				return;

			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			return image.each(function(){
				var image=jQuery(this);
				var w= image.attr("w");
				var h= image.attr("h");

				var containment = el.opt.containment == "body"? window : el.opt.containment;
				var aspectRatio= w/h;
				var wAspectRatio=jQuery(containment).width()/jQuery(containment).height();
				if(aspectRatio>=wAspectRatio){
					image.css("height","100%");
					image.css("width","auto");
				} else{
					image.css("width","100%");
					image.css("height","auto");
				}
				image.css("margin-left",((jQuery(containment).width()-image.width())/2));

				if(!el.opt.preserveTop)
					image.css("margin-top",((jQuery(containment).height()-image.height())/2));

				if(el.opt.preserveWidth){
					image.css({width:"100%", height:"auto", left:0, marginLeft:0});
				}
			});
		},

		changePhoto:function(url,el){

			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			jQuery.mbBgndGallery.buildThumbs(el);

			if(el.opt.thumbs.folderPath.trim().length > 0 && el.opt.thumbs.placeholder.trim().length > 0){
				jQuery(".sel", jQuery(el.opt.thumbs.placeholder)).removeClass("sel");
				jQuery("#mbBgImg_"+el.opt.imageCounter).addClass("sel");
			}

			jQuery.mbBgndGallery.changing=true;

			if(el.opt.onChange)
				el.opt.onChange(el.opt, el.opt.imageCounter);

			var image=jQuery("<img/>").hide().load(function(){

				var that=jQuery(this);

				var tmp=jQuery("<div/>").css({position:"absolute",top:-5000});
				tmp.append(that);
				jQuery("body").append(tmp);
				that.attr("w", that.width());
				that.attr("h", that.height());
				tmp.remove();

				el.opt.effect = typeof el.opt.effect == "object" ? el.opt.effect : jQuery.mbBgndGallery.effects[el.opt.effect];

				jQuery("img", el.opt.gallery).CSSAnimate(el.opt.effect.exit,el.opt.effTimer,0,el.opt.effect.exitTiming,function(el){
					if(el.length)
						el.remove();
				});
				that.css({position:"absolute"});
				el.opt.gallery.append(that);

				jQuery.mbBgndGallery.changing=false;
				jQuery.mbBgndGallery.checkSize(that, el);

				//var displayProperties = {top: 0, left: 0, opacity: 1, transform: "scale(1) rotate(0deg) translateX(0px) translateY(0px)", filter: " blur(0)"};
				var displayProperties = {top: 0, left: 0, opacity: 1, x:0, y:0, scale:1, rotate:0, skew:0, filter: " blur(0)"};
				displayProperties = jQuery.mbBgndGallery.normalizeCss(displayProperties);

				that.css(jQuery.mbBgndGallery.normalizeCss(el.opt.effect.enter)).show().CSSAnimate(displayProperties,el.opt.effTimer,0,el.opt.effect.enterTiming,function(){
					el.opt.gallery.trigger("imageReady."+el.opt.galleryID);
				});
			}).attr("src",url);

			image.error(function(){
				var image=jQuery(this);
				image.attr("src", el.opt.placeHolder);
			});

			if(el.opt.grayScale){
				image.greyScale(el);
//				image.applyFilter("gray");
//				el.opt.gallery.applyFilter("gray");
			}

			var counter=jQuery(el.opt.controls).find(".counter");
			counter.html(el.opt.imageCounter+1+" / "+el.opt.images.length);

		},

		play:function(el){

			if(!el)
				el = this.get(0);

			clearTimeout(el.opt.changing);

			var imgToRemove = jQuery("img", el.opt.gallery).not(":last");
			imgToRemove.remove();


			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			if(el.opt.onPlay)
				el.opt.onPlay(el.opt);

			el.opt.changing=setTimeout(function(){
				if(el.opt.paused)
					return;

				if(el.opt.onNext)
					el.opt.onNext(el.opt);

				if (el.opt.imageCounter>=el.opt.images.length-1)
					el.opt.imageCounter=-1;

				el.opt.imageCounter++;

				jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],jQuery(el.opt.containment).get(0));
			},el.opt.paused?0:el.opt.timer);

			el.opt.gallery.trigger("play");

		},

		pause:function(el){

			if(!el)
				el = this.get(0);

			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			clearTimeout(el.opt.changing);
			el.opt.paused=true;
			el.opt.gallery.trigger("paused");

			if(el.opt.onPause)
				el.opt.onPause(el.opt);
		},

		next:function(el){

			if(!el)
				el = this.get(0);

			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			if(el.opt.onNext)
				el.opt.onNext(el.opt);

			jQuery.mbBgndGallery.pause(el);
			if (el.opt.imageCounter==el.opt.images.length-1)
				el.opt.imageCounter=-1;

			el.opt.imageCounter++;

			jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
			clearTimeout(el.opt.changing);
		},

		prev:function(el){

			if(!el)
				el = this.get(0);

			if(jQuery.mbBgndGallery.clear){
				el.opt.gallery.remove();
				return;
			}

			if(el.opt.onPrev)
				el.opt.onPrev(el.opt);

			jQuery.mbBgndGallery.pause(el);

			clearTimeout(el.opt.changing);
			if (el.opt.imageCounter==0)
				el.opt.imageCounter=el.opt.images.length;

			el.opt.imageCounter--;

			jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
		},

		loader:{
			show:function(){},
			hide:function(){}
		},

		keyboard:function(el){
			jQuery(document).on("keydown.bgndGallery",function(e){
				switch(e.keyCode){
					case 32:
						if(el.opt.paused){
							jQuery.mbBgndGallery.play(el);
							el.opt.paused=false;
						}else{
							el.opt.paused=true;
							jQuery.mbBgndGallery.pause(el);
						}
						e.preventDefault();
						break;
					case 39:
						jQuery.mbBgndGallery.next(el);
						e.preventDefault();

						break;
					case 37:
						jQuery.mbBgndGallery.prev(el);
						e.preventDefault();

						break;
				}
			})
		},

		buildControls:function(controls,el){
			var pause=jQuery(controls).find(".pause");
			var play=jQuery(controls).find(".play");
			var next=jQuery(controls).find(".next");
			var prev=jQuery(controls).find(".prev");
			var fullScreen =  jQuery(controls).find(".fullscreen");

			if((jQuery.browser.msie || jQuery.browser.opera || 'ontouchstart' in window)){
				fullScreen.remove();
			}

			if(el.opt.autoStart)
				play.hide();

			pause.on("click",function(){
				jQuery.mbBgndGallery.pause(el);
				jQuery(this).hide();
				play.show();
			});

			play.on("click",function(){
				if(!el.opt.paused) return;
				clearTimeout(el.opt.changing);
				jQuery.mbBgndGallery.play(el);
				el.opt.paused=false;
			});

			next.on("click",function(){
				jQuery.mbBgndGallery.next(el);
				pause.hide();
				play.show();

			});

			prev.on("click",function(){
				jQuery.mbBgndGallery.prev(el);
				pause.hide();
				play.show();
			});

			fullScreen.on("click",function(){
				jQuery.mbBgndGallery.runFullscreen(el);
			});

			if(el.opt.activateKeyboard)
				jQuery.mbBgndGallery.keyboard(el);
		},

		changeGallery:function(array){

			var el = this.get(0);

			clearTimeout(el.opt.changing);
			el.opt.gallery.off("imageLoaded."+el.opt.galleryID);

			jQuery.mbBgndGallery.pause(el);
			el.opt.gallery.fadeOut();

			el.opt.images = array ;
			el.opt.imageCounter=-1;


			var images= el.opt.images;
			var totImg= images.length;
			var loadCounter=0;


			jQuery.mbBgndGallery.preload(images[loadCounter],el);
			el.opt.gallery.on("imageLoaded."+el.opt.galleryID,function(){
				if(loadCounter==totImg){
					el.opt.gallery.off("imageLoaded."+el.opt.galleryID);
					el.opt.gallery.fadeIn();
					jQuery.mbBgndGallery.play(el);
					el.opt.paused=false;
					return;
				}

				jQuery.mbBgndGallery.preload(images[loadCounter],el);
				loadCounter++;
			});

			if(el.opt.thumbs.folderPath.trim().length > 0 && el.opt.thumbs.placeholder.trim().length > 0)
				jQuery.mbBgndGallery.buildThumbs(el);

		},

		changeEffect:function(effect){
			jQuery.mbBgndGallery.el.opt.effect = effect;
		},

		runFullscreen: function(el){

			if(!el)
				el = this.get(0);

			var fullscreenchange = jQuery.browser.mozilla ? "mozfullscreenchange" : jQuery.browser.webkit ? "webkitfullscreenchange" : "fullscreenchange";
			jQuery(document).off(fullscreenchange);
			jQuery(document).on(fullscreenchange, function() {
				var isFullScreen = RunPrefixMethod(document, "IsFullScreen") || RunPrefixMethod(document, "FullScreen");

				if (!isFullScreen) {

					el.isFullscreen = false;

					jQuery(".fullScreen_controls").remove();
					if(!jQuery(el.opt.containment).is("body"))
						jQuery(el.opt.containment).css({
							width: el.width,
							height: el.height,
							top: el.top,
							left: el.left,
							position: el.position
						});
					el.opt.gallery.css({background:"transparent"})
					var image=jQuery("#bgndGallery_"+el.opt.galleryID+" img:first");

				}
				jQuery.mbBgndGallery.checkSize(image,el);

			});

			if(el.isFullscreen){
				cancelFullscreen();
			}else{
				el.isFullscreen = true;

				if(!jQuery(el.opt.containment).is("body")){
					el.width = jQuery(el.opt.containment).css("width");
					el.height = jQuery(el.opt.containment).css("height");
					el.top = jQuery(el.opt.containment).css("top");
					el.left = jQuery(el.opt.containment).css("left");
					el.position = jQuery(el.opt.containment).css("position");
				}

				var controls = jQuery(el.opt.controls).clone(true).addClass("fullScreen_controls").css({position:"absolute", zIndex:1000, bottom: 20, right:20});
				controls.find(".fullscreen").html("exit");
				el.opt.gallery.append(controls).css({background:"#000"});
				jQuery(el.opt.containment).CSSAnimate({
					width:"100%",
					height: "100%",
					top:0,
					left:0,
					position:"absolute"
				});

				launchFullscreen(el.opt.gallery.get(0));

			}

			function RunPrefixMethod(obj, method) {
				var pfx = ["webkit", "moz", "ms", "o", ""];
				var p = 0, m, t;
				while (p < pfx.length && !obj[m]) {
					m = method;
					if (pfx[p] == "") {
						m = m.substr(0,1).toLowerCase() + m.substr(1);
					}
					m = pfx[p] + m;
					t = typeof obj[m];
					if (t != "undefined") {
						pfx = [pfx[p]];
						return (t == "function" ? obj[m]() : obj[m]);
					}
					p++;
				}
			}

			function launchFullscreen(element) {
				RunPrefixMethod(element, "RequestFullScreen");
			}

			function cancelFullscreen() {
				if (RunPrefixMethod(document, "FullScreen") || RunPrefixMethod(document, "IsFullScreen")) {
					RunPrefixMethod(document, "CancelFullScreen");
				}
			}
		},

		buildThumbs: function(el){

			if(el.opt.thumbs.folderPath.trim().length == 0 && el.opt.thumbs.placeholder.trim().length == 0)
				return;

			jQuery(el.opt.thumbs.placeholder).addClass("thumbnailsContainer");

			function getImageName(path){
				return path.split("/").pop();
			}

			var thumbNumber = jQuery(el.opt.thumbs.placeholder).children().length || 0;

			if(thumbNumber != el.opt.images.length){

				jQuery(el.opt.thumbs.placeholder).empty();
				for (var i = 0; i < el.opt.images.length; i++){

					var imgSrc = el.opt.thumbs.folderPath + getImageName(el.opt.images[i]);

					var img=jQuery("<img/>").attr({"src":imgSrc, id: "mbBgImg_"+i}).click(function(){
						el.opt.imageCounter = jQuery(this).attr("i")-1;
						jQuery.mbBgndGallery.next(el);
						el.opt.paused=true;
					}).attr("i",i).css({opacity:0}).on("load",function(){
						$(this).fadeTo(1000,1);
					});

					jQuery(el.opt.thumbs.placeholder).append(img);
				}

				if(el.opt.thumbs.folderPath.trim().length > 0 && el.opt.thumbs.placeholder.trim().length > 0){
					jQuery(".sel", jQuery(el.opt.thumbs.placeholder)).removeClass("sel");
					jQuery("#mbBgImg_"+el.opt.imageCounter).addClass("sel");
				}
			}
		},

		addImages: function(images, goto, shuffle){

			var el = this.get(0);
			for (var i in images){
				el.opt.images.push(images[i]);
			}
			if(shuffle)
				el.opt.images = jQuery.shuffle(el.opt.images);

			if(goto)
				el.opt.imageCounter = el.opt.images.indexOf(images[0]);

			jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
			jQuery.mbBgndGallery.buildThumbs(el);

		},
		removeImages: function(images){

			var el = this.get(0);
			for (var i in images){
				var index = el.opt.images.indexOf(images[i]);
				if (index > -1)
					el.opt.images.splice(index, 1);
			}
			jQuery.mbBgndGallery.changePhoto(el.opt.images[el.opt.imageCounter],el);
			jQuery.mbBgndGallery.buildThumbs(el);
		},

		applyFilter: function(filter){

			var filterObj = jQuery.mbBgndGallery.filters[filter];
			var el = this.get(0);

			if (jQuery.browser.msie && jQuery.browser.version<9) {
				el.style.filter = filterObj["msie"];
			} else if(jQuery.browser.webkit){
				el.style["-webkit-filter"] = filterObj["webkit"];
			} else {
				el.style.filter = filterObj["moz"];
			}
		}

	};

	jQuery.fn.mbBgndGalleryPlay = jQuery.mbBgndGallery.play;
	jQuery.fn.mbBgndGalleryPause = jQuery.mbBgndGallery.pause;
	jQuery.fn.mbBgndGalleryPrev = jQuery.mbBgndGallery.prev;
	jQuery.fn.mbBgndGalleryNext = jQuery.mbBgndGallery.next;
	jQuery.fn.changeGallery = jQuery.mbBgndGallery.changeGallery;
	jQuery.fn.addImages = jQuery.mbBgndGallery.addImages;
	jQuery.fn.removeImages = jQuery.mbBgndGallery.removeImages;
	jQuery.fn.applyFilter = jQuery.mbBgndGallery.applyFilter;

	jQuery.loadFromSystem=function(folderPath, type){

		// if directory listing is enabled on the remote server.
		// if you run the page locally you need to run it under a local web server (Ex: http://localhost/yourPage)
		// otherwise the directory listing is unavailable.

		if(!folderPath)
			return;
		if(!type)
			type= ["jpg","jpeg","png"];
		var arr=[];
		jQuery.ajax({
			url:folderPath,
			async:false,
			success:function(response){
				var tmp=jQuery(response);
				var els= tmp.find("[href]");

				els.each(function(){
					for (var i in type){
						if (jQuery(this).attr("href").indexOf(type[i])>=0)
							arr.push(folderPath+jQuery(this).attr("href"));
						arr = jQuery.unique(arr);
					}
				});
				tmp.remove();
			}
		});
		return arr.length != 0 ? arr : false;
	};

	jQuery.fn.greyScale = function(el) {
		return this.each(function() {
			if (jQuery.browser.msie && jQuery.browser.version<9) {
				this.style.filter = "progid:DXImageTransform.Microsoft.BasicImage(grayScale=1)";
			} else if(jQuery.browser.webkit){
				el.opt.gallery.css("-webkit-filter", "grayscale(1) sepia(.4)");
			} else {
				this.src = grayScaleImage(this);
			}
		})
	};

	jQuery.shuffle = function(arr) {
		var newArray = arr.slice();
		var len = newArray.length;
		var i = len;
		while (i--) {
			var p = parseInt(Math.random()*len);
			var t = newArray[i];
			newArray[i] = newArray[p];
			newArray[p] = t;
		}
		return newArray;
	};

	function grayScaleImage(imgObj){
		var canvas = document.createElement('canvas');
		var canvasContext = canvas.getContext('2d');

		var imgW = imgObj.width;
		var imgH = imgObj.height;
		canvas.width = imgW;
		canvas.height = imgH;

		canvasContext.drawImage(imgObj, 0, 0);
		var imgPixels = canvasContext.getImageData(0, 0, imgW, imgH);

		for(var y = 0; y < imgPixels.height; y++){
			for(var x = 0; x < imgPixels.width; x++){
				var i = (y * 4) * imgPixels.width + x * 4;
				var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
				imgPixels.data[i] = avg;
				imgPixels.data[i + 1] = avg;
				imgPixels.data[i + 2] = avg;
			}
		}
		canvasContext.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
		return canvas.toDataURL();
	}



})(jQuery);

function mbBgndGallery(opt){
	return jQuery.mbBgndGallery.buildGallery(opt);
}
