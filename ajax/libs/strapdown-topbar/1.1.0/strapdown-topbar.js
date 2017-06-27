// strapdown-topbar.js v1.1.0
// by Joe DF, Released under MIT License.

// Revision date: 12:43 2015-03-11
// - ADDED menu toggling for Mobile devices
// - FIXED Known issue : right-version is reversed
// - Missing feature : support for dropdown menus

/* HTML Original Template
<topbar>
	<item><a href="#">ITEM</a> with HTML</item>
</topbar>
*/

/* HTML Result Template
<div class="navbar-inner">
	<div class="container">
		<a class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" id="navbar-main-btn" onclick="nbar_toggle()>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</a>
		<div id="headline" class="brand">TITLE</div>
		<div class="nav-collapse collapse navbar-responsive-collapse pull-right" id="navbar-main">
			<ul class="nav navbar-nav navbar-right">
				<li class="headline-item brand">ITEM_HTML</li>
			</ul>
		</div>
	</div>
</div>
*/

;(function(){
	var doctitle = document.title.toString();
	var topbar = document.getElementsByClassName('navbar navbar-fixed-top')[0];
	var topbar_tag = document.getElementsByTagName('topbar')[0];
	var topbar_items = topbar_tag.getElementsByTagName('item');
	
	// Add in our needed styles - http://stackoverflow.com/a/707580/883015
	var calign = (topbar_tag.hasAttribute('right'))?'right':'left';
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = '.headline-item{text-align:right;font-size:14px !important;}'
				  + '@media(min-width:980px){.nav > li > a {display:inline !important;padding:0 !important;}}'
				  + '@media(max-width:979px){'
				  + '#navbar-main{width:100%}.nav > li {float:none !important;padding: 13px 15px 6px !important;display:block;}'
				  + '.nav > li > a {display:block !important;padding:0 !important;}'
				  + '#navbar-main ul{float:'+calign+';}'
				  + '.headline-item{text-align:'+calign+';}}';
	document.body.appendChild(css);
	
	// Add in custom menu-toggle code
	var menucode = document.createElement("script");
	menucode.innerHTML = 'function nbar_toggle(){var nbar=document.getElementById("navbar-main");var nbar_t=nbar.className;if(nbar_t.indexOf("collapse")>-1){nbar.className=nbar.className.replace(/collapse/g,"open");}else{nbar.className=nbar.className.replace(/open/g,"collapse");}};';
	document.body.appendChild(menucode);
	
	// Insert the Title and Menu
	var content = '<div class="navbar-inner"><div class="container"><div id="headline" class="brand">' + doctitle + '</div>'
				+ '<a class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" id="navbar-main-btn" onclick="nbar_toggle()">'
				+ '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a>'
				+ '<div class="nav-collapse collapse navbar-responsive-collapse pull-'+calign+'" id="navbar-main"><ul class="nav navbar-nav navbar-right">';

	// Insert the topbar items
	for (var i = 0; i < topbar_items.length; i++) { 
		content = content + '<li class="headline-item brand">' + topbar_items[i].innerHTML + '</li>';
	}
	
	// Finalize
	content = content + '</ul></div></div></div>';
	topbar.innerHTML = content;
	
	// Hide original
	topbar_tag.style.display = 'none';
})();