// strapdown-topbar.js v1.2.0
// by Joe DF, Released under MIT License.

// Revision date: 00:32 2015-03-13
// - ADDED menu toggling for Mobile devices
// - FIXED Known issue : right-version is reversed
// - ADDED Dropdown menu support
// - Known issue : dropdowns are not correctly aligned

/* HTML Original Template
<topbar>
	<item><a href="#">ITEM</a> with HTML</item>
	<menu name="Dropdown Menu">
		<item><a href="#">ITEM</a> with HTML</item>
		<item></item> <!-- add a divider -->
	</menu>
</topbar>
*/

/* HTML Result Template
<div class="navbar-inner">
	<div class="container">
		<a href="javascript:;" class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" id="navbar-main-btn" onclick="nbar_toggle()>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
			<span class="icon-bar"></span>
		</a>
		<div id="headline" class="brand">TITLE</div>
		<div class="nav-collapse collapse navbar-responsive-collapse pull-right" id="navbar-main">
			<ul class="nav navbar-nav navbar-right">
				<li class="headline-item brand">ITEM_HTML</li>
				<li class="dropdown headline-menu brand">
					<a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="dmenu_toggle(this)">MENUNAME <span class="caret"></span></a>
					<ul class="dropdown-menu">
						<li>ITEM_HTML</li>
						<li class="divider"></li>
					</ul>
				</li>
			</ul>
		</div>
	</div>
</div>
*/

;(function(){
	var doctitle = document.title.toString();
	var topbar = document.getElementsByClassName('navbar navbar-fixed-top')[0];
	var topbar_tag = document.getElementsByTagName('topbar')[0];
	var topbar_items = topbar_tag.getElementsByTagName('*');
	
	// Add in our needed styles - http://stackoverflow.com/a/707580/883015
	var calign = (topbar_tag.hasAttribute('right'))?'right':'left';
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = '.headline-item,.headline-menu{font-size:14px !important;}.headline-item{text-align:right;}'
				  + '@media(min-width:980px){.nav > li > a {display:inline !important;padding:0 !important;}}'
				  + '@media(max-width:979px){'
				  + 	'#navbar-main{width:100%}.nav > li {float:none !important;padding: 13px 15px 6px !important;display:block;}'
				  + 	'.nav > li > a {display:block !important;padding:0 !important;}'
				  + 	'#navbar-main ul{float:'+calign+';}'
				  + 	'.headline-item{text-align:'+calign+';}'
				  + '}';
	document.body.appendChild(css);
	
	// Add in custom menu-toggle js code
	var menucode = document.createElement("script");
	menucode.innerHTML = 'function nbar_toggle(){'
					   + 	'var nbar=document.getElementById("navbar-main");'
					   + 	'var nbar_t=nbar.className;'
					   + 	'if(nbar_t.indexOf("collapse")>-1){'
					   + 		'nbar.className=nbar.className.replace(/collapse/g,"open");'
					   + 	'}else{'
					   + 		'nbar.className=nbar.className.replace(/open/g,"collapse");'
					   + 	'}'
					   + '};'
					   + 'function dmenu_toggle(p,x){'
					   + 	'var dmenu=(x===1)?p.parentNode:p;'
					   + 	'var dmenu_t=dmenu.className;'
					   + 	'if(dmenu_t.indexOf("open")>-1||x===2){'
					   + 		'dmenu.className=dmenu.className.replace(/open/g,"");'
					   + 	'}else{'
					   + 		'dmenu.className=dmenu.className + " open";'
					   + 	'}'
					   + '}';
	document.body.appendChild(menucode);
	
	// Insert the Title and Menu
	var content = '<div class="navbar-inner"><div class="container"><div id="headline" class="brand">'+doctitle+'</div>'
				+ '<a href="javascript:;" class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" id="navbar-main-btn" onclick="nbar_toggle()">'
				+ '<span class="icon-bar"></span><span class="icon-bar"></span><span class="icon-bar"></span></a>'
				+ '<div class="nav-collapse collapse navbar-responsive-collapse pull-'+calign+'" id="navbar-main"><ul class="nav navbar-nav navbar-right">';

	// Insert the topbar items, Main processing loop
	for (var i = 0; i < topbar_items.length; i++) {
		var item = topbar_items[i];
		if (item.parentNode == topbar_tag) { // Process only top-level tags
			if (item.tagName.toUpperCase() == "MENU") { // Process Menu-type tags
				
				// Get Menu name
				var menu_name = item.hasAttribute("name")?item.getAttribute("name"):"Menu"; menu_name = (menu_name.length>0)?menu_name:"Menu";
				
				// Prepare Dropdown for the Menu
				content = content + '<li class="dropdown headline-menu brand"><a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="dmenu_toggle(this,1)">'+menu_name+' <span class="caret"></span></a><ul class="dropdown-menu">';
				
				// Sub-level processing loop, add Dropdown items
				menu_items = item.getElementsByTagName('item');
				for (var j = 0; j < menu_items.length; j++) {
					var menu_item = menu_items[j];
					if (menu_item.innerHTML.length > 0) { // Add <item> to Dropdown menu
						content = content + '<li>' + menu_item.innerHTML + '</li>';
					} else { // Otherwise, add a Divider
						content = content + '<li class="divider"></li>';
					}
				}
				
				// Finalize Menu
				content = content + '</ul></li>';
				
			} else { // Otherwise, process as simple <item> tag
				content = content + '<li class="headline-item brand">' + item.innerHTML + '</li>';
			}
		}
	}
	
	// Finalize
	content = content + '</ul></div></div></div>';
	topbar.innerHTML = content;
	
	// Hide original
	topbar_tag.style.display = 'none';
	
	// Add handler : Hide Dropdowns when clicking outside
	document.documentElement.addEventListener('mouseup', function(e){
		var ddowns = document.getElementsByClassName("dropdown");
		for (var i = 0; i < ddowns.length; i++) {
			var ddown = ddowns[i];
			if (!ddown.contains(e.target)) 
				dmenu_toggle(ddown,2);
		}
	});
})();