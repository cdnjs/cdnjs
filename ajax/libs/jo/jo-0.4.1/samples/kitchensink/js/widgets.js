joCache.set("widgets", function() {
	var card = new joCard([
		new joTitle("Input Boxes"),
		new joGroup([
			new joLabel("joInput"),
			new joFlexrow(new joInput("Hello, Jo!")),
			new joLabel("joPasswordInput"),
			new joFlexrow(new joPasswordInput("password")),
			new joLabel("joTextArea"),
			new joFlexrow(new joTextarea("This is some multi-line text, Jo!")),
			new joDivider(),
			new joFlexrow([
				new joLabel("Left Aligned").setStyle({className:"left", marginTop:"2px"}),
				new joInput("From CSS").setStyle({width: "150px", marginBottom: "0"})
			])
		]),
		new joTitle("Selection Widgets"),
		new joGroup([
			new joLabel("joOption"),
			new joFlexrow(new joOption([
				"Red", "Green", "Blue"
			])),
			new joLabel("joSelect"),
			new joSelect([
				"Baked Alaska",
				"Chocolate Mousse",
				"Rum Raisin Ice Cream",
				"Fudge Sundae"
			]),
			new joFlexrow([
				new joLabel("joToggle").setStyle("left"),
				new joToggle(true)
			]),
			new joFlexrow([
				new joLabel("With customized labels").setStyle("left"),
				new joToggle().setLabels(["No", "Yes"])
			])
		]),
		new joExpando([
			new joExpandoTitle("joExpando"),
			new joExpandoContent([
				new joLabel("Tuck away more UI controls"),
				new joFlexrow(new joInput("Hello again, Jo!"))
			])
		]),
/*
		new joLabel("Horizontal Scroller"),
		new joScroller([
			new joFlexrow([
				"HI", "HELLO", "HOLA", "SUP", "CHEERS", "DUDE", "YO"
			])
		]).setScroll(true, false).setStyle('iconz'),
*/
		new joDivider(),
		new joButton("joButton").selectEvent.subscribe(function() {
			App.scn.alert("You pressed a button!");
		}),
		new joButton("Disabled").disable(),
		new joGroup([
			new joLabel("joSlider"),
			slider = new joSlider(),
			new joLabel("joSlider range 0 - 9, snap 1"),
			slider = new joSlider(4).setRange(0, 9, 1).changeEvent.subscribe(function(value) {
				console.log("value: " + value);
			}, this)
		])
	]).setTitle("Form Widgets");
	
	return card;
});

var slider;