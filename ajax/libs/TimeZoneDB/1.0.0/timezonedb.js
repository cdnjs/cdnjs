function TimeZoneDB(){
	this.getJSON = function(obj, success){
		try{
			var key = obj.key,  zone = obj.zone, lat = obj.lat, lng = obj.lng, time = obj.time;
			var uid = "_" + new Date().getTime() + Math.floor(Math.random() * 10000), script = document.createElement('script');
			
			window[uid] = function(data){
				success && success(data);
				
				try{
					delete window[uid];
				}
				catch(e){
					window[uid] = undefined;
				}
			}
			
			// Make JSONP request
			if(zone){
				script.src = "http://api.timezonedb.com/?key=" + key + "&zone=" + zone + ((time) ? "&time=" + time : "" ) + "&format=json&callback=" + uid;
			}
			else if(lat && lng){
				script.src = "http://api.timezonedb.com/?key=" + key + ((time) ? "&time=" + time : "" ) + "&lat=" + lat + "&lng=" + lng + "&format=json&callback=" + uid;
			}
			document.body.appendChild(script);

			// Remove the script element
			script.parentNode.removeChild(script);
		}
		catch(e){
			alert("JSON request failed.");
			return false;
		}
	}
}
