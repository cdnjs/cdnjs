App = {
	load: function() {
		jo.load();

		// create a new file source
		var file = new joFileSource("sometext.html");

		// we're going to bind our data source to the contents of this control
		var html = new joHTML(file);

		// build a simple UI
		var s = new joCard([
			new joTitle("Local file load test"),
			new joGroup(html),
			new joButton("Load").selectEvent.subscribe(function() { file.load(); })
		]).attach(document.body);
	}
};
