/*
	This use of joCache is a bit more modular than most in this
	demo. Notice we're using closures and inner functions. Jo
	likes you to use all the good stuff in JavaScript you want.
*/
joCache.set("popups", function() {
	var simple, complex;
	
	var card = new joCard([
		new joTitle("Choose a Popup Flavor"),
		new joGroup([
			simple = new joButton("Simple Alert"),
			complex = new joButton("Dialog with Form Controls")
		]),
		new joHTML("The popups here also have custom CSS applied to theme them.")
	]);
	
	card.setTitle("Popup Dialogs");
	
	simple.selectEvent.subscribe(function() {
		App.scn.alert("This is an Alert", "It's a very simple call to the joScreen object. It's similar to the good ol' alert() function built into most JavaScript engines.");
	});
	
	complex.selectEvent.subscribe(function() {
		App.scn.showPopup(joCache.get("popup"));
	});
	
	return card;
});

// a more complex popup with dialog controls
joCache.set("popup", function() {
	var popup = [
		new joGroup([
			new joHTML("You can load up a popup with form widgets and more."),
			new joDivider(),
			new joCaption("User Name"),
			new joFlexrow(new joInput("Jo")),
			new joLabel("Password"),
			new joFlexrow(new joPasswordInput("password"))
		]),
		new joButton("Login").selectEvent.subscribe(pop)
	];
	
	function pop() {
		console.log("hide popup");
		App.scn.hidePopup();
	}
	
	return popup;
});
