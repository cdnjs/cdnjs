App = {
	load: function() {
		jo.load();

		var yql = new joYQL("select title from rss where url='http://davebalmer.wordpress.com/feed'");
		
		var list = new joList(yql).attach(document.body);
		list.formatItem = function(data, index) {
			console.log(data.title);
			return joList.prototype.formatItem.call(this, data.title, index);
		};
		
		var button = new joButton("Go").selectEvent.subscribe(this.refresh, this).setStyle({
			backgroundColor: "rgba(0, 0, 0, .6)"
		});
		var input;
		
		var scn = new joScreen([
			new joContainer([
				new joFlexrow([
					input = new joInput("http://davebalmer.wordpress.com/feed"),
					button
				]),
			]).setStyle({
				borderTop: "1px solid rgba(255, 255, 255, .4)",
				borderBottom: "1px solid rgba(0, 0, 0, .4)",
				padding: "10px 0 0 0",
				background: "#8990BC"
			}),
			list
		]);
		
		this.yql = yql;
		this.input = input;

		this.refresh();
	},
	
	refresh: function() {
		joFocus.set(this.input);
		this.yql.setQuery("select title from rss where url='" + this.input.getData() + "' limit 20");
//		console.log(this.yql.query)
		this.yql.exec();
	}
};
