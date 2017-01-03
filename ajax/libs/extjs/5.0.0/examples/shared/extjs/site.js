Ext.onReady(function(){
	// expanders
	Ext.getBody().on('click', function(e, t){
		t = Ext.get(t);
		e.stopEvent();

		var bd = t.next('div.expandable-body');
		bd.enableDisplayMode();
		var bdi = bd.first();
		var expanded = bd.isVisible();

		if(expanded){
			bd.hide();
		}else{
			bdi.hide();
			bd.show();
			bdi.slideIn('l', {duration:0.2, stopAnimation: true, easing:'easeOut'});
		}

		t.update(!expanded ? 'Hide details' : 'Show details');

	}, null, {delegate:'a.expander'});
});
