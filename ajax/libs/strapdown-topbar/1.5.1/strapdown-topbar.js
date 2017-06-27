// strapdown-topbar.js v1.5.1
// by Joe DF, Released under MIT License.
// Revision date: 16:42 2015-07-28

// - ADDED menu toggling for Mobile devices
// - FIXED Known issue : right-version is reversed
// - ADDED Dropdown menu support
// - FIXED Known issue : dropdowns anchor not correctly text-aligned
// - Known issue : dropdowns are not correctly aligned
// - ADDED Auto-Anchor Headings
// - CHANGED to display:inline-block; for Headings
// - ADDED Simplistic Table of Contents <toc>
// - FIXED Known issue : header anchors are not perfectly leveled
// - ADDED ID to topbar container : `id="topbar"` for easier custom-js handling
// - ADDED fix for Google Chrome, etc: for the missing "String.contains()" function
// - ADDED option : topbar fixed on mobile devices, 'mfixed' attribute
// - FIXED content alignment --> fixed bug from v1.5.0

/* HTML Original Template
<topbar right>
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
		<a href="javascript:;" class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" onclick="nbar_toggle()>
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
	//http://stackoverflow.com/a/1978419/883015
	if (typeof String.prototype.contains === 'undefined') { String.prototype.contains = function(it) { return this.indexOf(it) != -1; }; }

	var doctitle = document.title.toString();
	var topbar = document.getElementsByClassName('navbar navbar-fixed-top')[0];
	var topbar_tag = document.getElementsByTagName('topbar')[0];
	var topbar_items = topbar_tag.getElementsByTagName('*');
	
	// Add in our needed styles - http://stackoverflow.com/a/707580/883015
	var calign = (topbar_tag.hasAttribute('right'))?'right':'left';
	var css = document.createElement("style");
	css.type = "text/css";
	css.innerHTML = '.headline-item,.headline-menu{font-size:14px!important}.headline-item{text-align:right}'
				  + '@media(min-width:980px){.nav>li>a{display:inline!important;padding:0!important}}'
				  + '@media(max-width:979px){'
				  + 	'#navbar-main{width:100%}.nav>li{float:none!important;padding:13px 15px 6px!important;display:block}'
				  + 	'.nav>li>a{display:block!important;padding:0!important}'
				  + 	'#navbar-main ul{float:'+calign+'}'
				  + 	'.headline-item,.dropdown-toggle{text-align:'+calign+'}'
				  + '}';
	// Make topbar fixed on mobile devices (optional)
	if (topbar_tag.hasAttribute('mfixed')) {
		css.innerHTML = css.innerHTML 
					  + '@media(max-width:979px){'
					  + 	'.navbar-fixed-top{position: fixed !important;margin-right: 0 !important;margin-left: 0 !important;}'
					  + 	'#content{margin-top: 73px;}'
					  + '}';
	}
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
	var content = '<div class="navbar-inner"><div class="container" id="topbar"><div id="headline" class="brand">'+doctitle+'</div>'
				+ '<a href="javascript:;" class="btn btn-navbar" data-toggle="collapse" data-target="#navbar-main" onclick="nbar_toggle()">'
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
				
			} else if (item.tagName.toUpperCase() == "TOC") { // Prepare <TOC> tag for later processing
				// Get TOC name
				var toc_name = (item.innerHTML.length>0)?item.innerHTML:"Contents";
				content = content + '<li class="dropdown headline-menu brand"><a href="javascript:;" class="dropdown-toggle" data-toggle="dropdown" onclick="dmenu_toggle(this,1)">'+toc_name+' <span class="caret"></span></a><ul class="dropdown-menu" id="strapdown-toc">';
				// Finalize TOC preparation
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
	
	// Prepare TOC access
	var toc_c = document.getElementById("strapdown-toc");
	
	// Bonus Feature ! - Auto-Anchor Headings
	// Thanks for Ragnar-F's original code, this is a forked version
	// Permalink: https://github.com/Ragnar-F/ahk_docs_german/blob/93e17c109ed2739e1953bfdd63941f7d9c5ef0f2/static/content.js#L1413-L1448
	
	// Header processing loop
	for (var i = 1; i < 7; i++) {
		var headers = document.getElementsByTagName('h'+i);
		for (var j = 0; j < headers.length; j++) {
			// Get Header text
			var innerText = headers[j].innerHTML.replace(/<\/?[^>]+(>|$)/g, ""); // http://stackoverflow.com/a/5002161/883015
			
			// Add/Get anchor
			var anchorId = '_' + Date.now;
			if(headers[j].hasAttribute('id')) // if id anchor exists, use it
			{
				h_Id = headers[j].getAttribute('id');
				anchorId = (h_Id.length>0)?h_Id:anchorId;
				headers[j].removeAttribute('id');
			}
			else // if id anchor not exist, create one
			{
				var str = innerText.replace(/\s/g, '_'); // replace spaces with _
				var str = str.replace(/[():.,;'#\[\]\/{}&="|?!]/g, ''); // remove special chars
				var str = str.toLowerCase(); // convert to lowercase
				if(!!document.getElementById(str)) // if new id anchor exist already, set it to a unique one
					anchorId = str + anchorId;
				else
					anchorId = str;
			}
			// http://stackoverflow.com/a/1763629/883015
			var anchor = document.createElement('a');
				anchor.href = '#' + anchorId;
				anchor.style = 'text-decoration:none;';
				anchor.innerHTML = '<span id="'+anchorId+'" class="h'+i+'_anchor"></span>'
				anchor.appendChild(headers[j].cloneNode(true));
				headers[j].parentNode.replaceChild(anchor,headers[j]);
			
			// Show paragraph sign on mouseover
			headers[j].addEventListener('mouseenter', function(e){
				var p = document.createElement('span');
				p.innerHTML = ' &para;'; p.className = 'sd-para-symbol';
				this.appendChild(p);
			});
			headers[j].addEventListener('mouseleave', function(e){
				var p = document.getElementsByClassName('sd-para-symbol');
				for (var k = 0; k < p.length; k++)
					p[k].parentNode.removeChild(p[k]);
			});
			
			// Add TOC elements
			if (!!toc_c) {
				toc_c.innerHTML = toc_c.innerHTML + '<li><a href="#'+anchorId+'">' + innerText + '</a></li>';
			}
		}
	}
	
	// Add "Back to top" anchor in TOC
	if (!!toc_c)
		toc_c.innerHTML = toc_c.innerHTML + '<li class="divider"></li><li><a href="#top">Back to top</a></li>';
	
	// Custom Header anchor styling
	window.onload = function() { //wait for window to load for window.getComputedStyle
		var haligh_css = '';
		// Prepare the css for better anchor alignment
		for (var i = 1; i < 7; i++) {
			var h_e = document.getElementsByTagName('h'+i)[0];
			if (!!h_e) {
				// http://stackoverflow.com/a/15195345/883015
				var h_fs = parseInt(window.getComputedStyle(h_e,null).getPropertyValue('font-size'),10);
				var h_lh = parseInt(window.getComputedStyle(h_e,null).getPropertyValue('line-height'),10);
				haligh_css = haligh_css + '.h'+i+'_anchor{position:relative;top:-'+(h_fs+h_lh)+'px}';
				//alert("i = "+i+"\ninnerHTML = "+h_e.innerHTML+"\nh_fs = "+h_fs+"\nh_lh = "+h_lh);
			}
		}
		var css = document.createElement("style");
		css.type = "text/css";
		css.innerHTML = 'h1,h2,h3,h4,h5,h6{display:inline-block}'
					  + 'a h1,a h2,a h3,a h4,a h5,a h6{color:#555}'
					  + 'a h1:hover,a h2:hover,a h3:hover,a h4:hover,a h5:hover,a h6:hover{color:#D9230F}'
					  + '.sd-para-symbol{color:#999;font-size:.7em;position:absolute}'
					  + haligh_css;
		document.body.appendChild(css);
	}
})();