joCache.set("themes", function() {
	var card, theme, size;
	
	card = new joCard([
		new joTitle("Pick a theme"),
		new joGroup([
			new joLabel("Colors"),
			theme = new joSelect([
				"Default",
				"Baby Blue",
				"Yellow and Grey"
			]),
			new joLabel("Font Family").setStyle({marginTop: "10px"}),
			new joFlexrow(size = new joOption([
				"Default",
				"Times",
				"Funky"
			], 0))
		]),
		new joHTML("These theme options are all controlled with CSS. For this demo, we're dynamically setting styles inline using <code>joDOM.applyCSSRule</code>. Most apps should have their own style, and would not need to load CSS rules on the fly like this, but it makes for a more interesting demo."),
		new joHTML("WARNING: Your eyes may burn while applying these theme tweaks.")
	]);
	
	// attach event handlers for our controls
	theme.selectEvent.subscribe(changetheme);
	size.selectEvent.subscribe(changefont);
	
	// yeah, I know -- inline CSS is bad, but this illustrates the point
	var themecss = [
		" ",
		"jobutton, jotitle, joexpandotitle, joselecttitle, josliderthumb, jooptionitem, jotoggle > * { background-color: #9cf; } jomenuitem, jolistitem { background-color: #fff } jocard { background-color: #369;} jogroup {background-color: rgba(255, 255, 255, .4);}",
		"jobutton, jotitle, joexpandotitle, joselecttitle, josliderthumb, jooptionitem, jotoggle > * { background-color: #cc3; color: #000; } jomenuitem, jolistitem { background-color: #fff;} jogroup {background-color: #ccc; } jocard { background-color: #888; }"
	];
	
	var colorrule = new joCSSRule();

	function changetheme(setting) {
		colorrule.setData(themecss[setting]);
	}
	
	var fontrule = new joCSSRule();
	var fontcss = [
		" ",
		'body { font-family: "Georgia", "Times New Roman", "Times"; }',
		'body { font-family: "Marker Felt", "Comic Sans MS", "Comic Sans", "Arial"; }'
	];
	function changefont(setting) {
		fontrule.setData(fontcss[setting]);
	}
	
	return card;
});
