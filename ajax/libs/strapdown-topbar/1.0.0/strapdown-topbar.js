// strapdown-topbar.js v1.0.0
// by Joe DF, Released under MIT License.

// Revision date: 00:12 2015-03-11
// Known issue : right-version is reversed

/* HTML Original Template
<topbar>
	<item><a href="#">ITEM</a> with HTML</item>
</topbar>
*/

/* HTML Result Template
<div class="navbar-inner">
	<div class="container">
		<div id="headline" class="brand">TITLE</div>
		<div id="headline-item" class="brand">ITEM_HTML</div>
	</div>
</div>
*/

;(function(){
	var doctitle = document.title.toString();
	var topbar = document.getElementsByClassName('navbar navbar-fixed-top')[0];
	var topbar_tag = document.getElementsByTagName('topbar')[0];
	var topbar_items = topbar_tag.getElementsByTagName('item');
	
	// Add in our need styles - http://stackoverflow.com/a/707580/883015
	var css = document.createElement("style");
	css.type = "text/css";
	if (topbar_tag.hasAttribute('right')) {
		css.innerHTML = ".headline-item{float:right !important;text-align:right;font-size:14px !important;}";
	} else {
		css.innerHTML = ".headline-item{text-align:right;font-size:14px !important;}";
	}
	document.body.appendChild(css);
	
	// Insert the title
	var content = '<div class="navbar-inner"><div class="container"><div id="headline" class="brand">' + doctitle + '</div>';

	// Insert the topbar items
	for (var i = 0; i < topbar_items.length; i++) { 
		content = content + '<div class="headline-item brand">' + topbar_items[i].innerHTML + '</div>';
	}
	
	// Finalize
	content = content + '</div></div>';
	topbar.innerHTML = content;
	
	// Hide original
	topbar_tag.style.display = 'none';
})();