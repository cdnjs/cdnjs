/*
 * ******************************************************************************
 *  jquery.mb.components
 *  file: jquery.mb.flickr.js
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
 *  last modified: 25/04/13 22.58
 *  *****************************************************************************
 */

/*
 *
 * to obtain a Flickr API key:
 * http://www.flickr.com/services/apps/create/apply/
 *
 * This plugin adds an object filled with all the photos from a Flickr Set or a Flickr User
 * to a DOM element of your page.
 * Once the calls get success your element will have set all the photos, total elements and actual page
 *
 * ex:
 *
 $("#myElementId").mb_loadFlickrPhotos({callback: logData})
 function logData(o){
 console.debug(o.page); // actual page
 console.debug(o.pages); // total pages
 console.debug(o.photos); // Object containing all the photos per_page
 $(o.photos).each(function(n){
 console.debug(o.photos[n].title) // the title of the photo
 console.debug(o.photos[n].square) // the url for the photo sqared thmb
 console.debug(o.photos[n].thumb) // the url for the photo thmb
 console.debug(o.photos[n].medium) // the url for the medium-size photo
 console.debug(o.photos[n].source) // the url for the surce photo
 console.debug(o.photos[n].url) // the url for the flickr photo page
 });
 }
 *
 */


(function($) {
	document.flickr=new Object();
	$.mbFlickr={
		name:"mb.flickr",
		author:"Matteo Bicocchi",
		version:"1.0",
		//Flickr_API_DATA
		flickr_api_key:"",
		flickr_user_name:"",

		defaults:{
			flickr_user_id:"",
			flickr_photoset_id:"",
			page:1,
			per_page:20,
			onStart:function(){},
			callback:function(){}
		},

		//this is the main function
		loadFlickrPhotos:function(options){
			var gallery= $(this).get(0);

			gallery.defaults = {};
			$.extend(gallery.defaults,$.mbFlickr.defaults, options);
			document.flickr.photoset=gallery.defaults.flickr_photoset_id;

			if(typeof gallery.isInit!= "undefined" && gallery.isInit == gallery.defaults.flickr_photoset_id){
				if(gallery.defaults.callback)
					gallery.defaults.callback(gallery);
				return;
			}

			if(gallery.defaults.onStart)
				gallery.defaults.onStart();

			var getSet= gallery.defaults.flickr_photoset_id;
			if (!$.mbFlickr.defaults.flickr_user_id)
				$.mbFlickr.getFlickrNSID($.mbFlickr.flickr_api_key,$.mbFlickr.flickr_user_name);
			if (getSet) {
				$(gallery).mb_getFlickrSet(gallery.defaults.page,function(){
					$(gallery).mb_getFlickrPhotoDATA();
					$(gallery).mb_getFlickrPhotoINFO();
				});
			}else{
				$(gallery).mb_getFlickrPhotos(gallery.defaults.page,function(){
					$(gallery).mb_getFlickrPhotoDATA();
					$(gallery).mb_getFlickrPhotoINFO();
				});
			}
		},
		//get NSID from FLICKR
		getFlickrNSID:function(key,name){
			$.getJSON("http://api.flickr.com/services/rest/?method=flickr.urls.lookupUser&api_key="+key+"&url=http%3A%2F%2Fwww.flickr.com%2Fphotos%2F"+name+"%2F&format=json&rnd="+new Date()+"&jsoncallback=?",
					function(data){
						if (data.stat!="fail"){
							$.mbFlickr.defaults.flickr_user_id=data.user.id;
						}
					});
		},
		getFlickrSet:function(page, callback){
			if (!page) page=1;
			var gallery= $(this).get(0);
			var per_page= gallery.defaults.per_page;
			var key= $.mbFlickr.flickr_api_key;
			var setID= gallery.defaults.flickr_photoset_id;
			$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key="+key+"&photoset_id="+setID+"&extras=url_sq,url_t,url_s,url_m,url_o&per_page="+per_page+"&page="+page+"&format=json&rnd="+new Date().getTime()+"&jsoncallback=?",
					function(data){
						if(data.stat=="fail") {
							alert(data.message);
							return;
						}
						gallery.photos = data.photoset.photo;
						gallery.pages = data.photoset.pages;
						gallery.page = data.photoset.page;

						if(callback) callback();
					});
		},
		getFlickrPhotos:function(page, callback){
			if(!page) page=1;
			var gallery= $(this).get(0);
			var per_page= gallery.defaults.per_page;
			if (per_page=="all")per_page=100;
			var key= $.mbFlickr.flickr_api_key;
			var userNSID= $.mbFlickr.defaults.flickr_user_id;
			$.getJSON("http://api.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key="+key+"&user_id="+userNSID+"&per_page="+per_page+"&page="+page+"&format=json&jsoncallback=?",
					function(data){
						gallery.photos = data.photos.photo;
						gallery.pages = data.photos.pages;
						gallery.page = data.photos.page;
						if(callback) callback();
					});
		},
		getFlickrPhotoDATA:function(){
			var gallery= $(this).get(0);
			var key = $.mbFlickr.flickr_api_key;

			document.flickr.total= gallery.photos.length;

			$(gallery.photos).each(function(i){
				$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.getSizes&api_key="+key+"&photo_id="+this.id+"&secret="+this.secret+"&format=json&rnd="+new Date()+"&jsoncallback=?",
						function(data){

							gallery.photos[i].square= data.sizes.size[0].source;
							gallery.photos[i].squareWidth= data.sizes.size[0].width;
							gallery.photos[i].squareHeight= data.sizes.size[0].height;

							gallery.photos[i].thumb= data.sizes.size[1].source;
							gallery.photos[i].thumbWidth= data.sizes.size[1].width;
							gallery.photos[i].thumbHeght= data.sizes.size[1].height;

							gallery.photos[i].small= data.sizes.size[2].source;
							gallery.photos[i].smallWidth= data.sizes.size[2].width;
							gallery.photos[i].smallHeigt= data.sizes.size[2].height;

							gallery.photos[i].medium= data.sizes.size[3].source;
							gallery.photos[i].mediumWidth= data.sizes.size[3].width;
							gallery.photos[i].mediumHeight= data.sizes.size[3].height;

							gallery.photos[i].source= data.sizes.size[data.sizes.size.length-1].source;
							gallery.photos[i].sourceWidth= data.sizes.size[data.sizes.size.length-1].width;
							gallery.photos[i].sourceHeight= data.sizes.size[data.sizes.size.length-1].height;

							gallery.photos[i].url= data.sizes.size[data.sizes.size.length-1].url;

							document.flickr.loaded= i+1;

							if (i== gallery.photos.length-1){
								setTimeout(function(){
									if (gallery.defaults.callback)
										gallery.defaults.callback(gallery);
									gallery.isInit=gallery.defaults.flickr_photoset_id;
								},3000);
							}
						});
			});
		},
		getFlickrPhotoINFO:function(){
			var gallery= $(this).get(0);
			var key = $.mbFlickr.flickr_api_key;
			$(gallery.photos).each(function(i){

				$.getJSON("http://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key="+key+"&photo_id="+this.id+"&secret="+this.secret+"&format=json&rnd="+new Date().getMilliseconds()+"&jsoncallback=?",
						function(data){
							gallery.photos[i].description=data.photo.description._content==undefined?"":data.photo.description._content;
						});
			});
		}
	};

	$.fn.mb_getFlickrSet = $.mbFlickr.getFlickrSet;
	$.fn.mb_getFlickrPhotos = $.mbFlickr.getFlickrPhotos;
	$.fn.mb_getFlickrPhotoDATA = $.mbFlickr.getFlickrPhotoDATA;
	$.fn.mb_getFlickrPhotoINFO = $.mbFlickr.getFlickrPhotoINFO;
	$.fn.mb_loadFlickrPhotos = $.mbFlickr.loadFlickrPhotos;

})(jQuery);
