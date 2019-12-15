/*!

Name: Open Weather
Dependencies: jQuery, OpenWeatherMap API
Author: Michael Lynch
Author URL: http://michaelynch.com
Date Created: August 28, 2013
Licensed under the MIT license

*/

;(function($) {

	$.fn.openWeather  = function(options) {

		// return if no element was bound
		// so chained events can continue
		if(!this.length) {
			return this;
		}

		// define default parameters
		const defaults = {
			descriptionTarget: null,
			maxTemperatureTarget: null,
			minTemperatureTarget: null,
			windSpeedTarget: null,
			humidityTarget: null,
			sunriseTarget: null,
			sunsetTarget: null,
			placeTarget: null,
			iconTarget: null,
			customIcons: null,
			units: 'c',
			city: null,
			lat: null,
			lng: null,
			key: null,
			lang: 'en',
			success: function() {},
			error: function(message) {}
		}

		// define plugin
		const plugin = this;

		// define element
		const el = $(this);

		// define settings
		plugin.settings = {}

		// merge defaults and options
		plugin.settings = $.extend({}, defaults, options);

		// define settings namespace
		const s = plugin.settings;

		// format time function
		const formatTime = function(unixTimestamp) {

			// define milliseconds using unix time stamp
			const milliseconds = unixTimestamp * 1000;

			// create a new date using milliseconds
			const date = new Date(milliseconds);

			// define hours
			let hours = date.getHours();

			// if hours are greater than 12
			if(hours > 12) {

				// calculate remaining hours in the day
				let hoursRemaining = 24 - hours;

				// redefine hours as the reamining hours subtracted from a 12 hour day
				hours = 12 - hoursRemaining;
			}

			// define minutes
			let minutes = date.getMinutes();

			// convert minutes to a string
			minutes = minutes.toString();

			// if minutes has less than 2 characters
			if(minutes.length < 2) {

				// add a 0 to minutes
				minutes = 0 + minutes;
			}

			// construct time using hours and minutes
			let time = hours + ':' + minutes;

			return time;
		}

		// define basic api endpoint
		let apiURL = '//api.openweathermap.org/data/2.5/weather?lang='+s.lang;

		let weatherObj;

		let temperature;
		let minTemperature;
		let maxTemperature;

		// if city isn't null
		if(s.city != null) {

			// define API url using city (and remove any spaces in city)
			apiURL += '&q='+s.city;

		} else if(s.lat != null && s.lng != null) {

			// define API url using lat and lng
			apiURL += '&lat='+s.lat+'&lon='+s.lng;
		}

		// if api key was supplied
		if(s.key != null) {

			// append api key paramater
			apiURL += '&appid=' + s.key;
		}

		$.ajax({
			type: 'GET',
			url: apiURL,
			dataType: 'jsonp',
			success: function(data) {

				if(data) {

					// if units are 'f'
					if(s.units == 'f') {

						// define temperature as fahrenheit
						temperature = Math.round(((data.main.temp - 273.15) * 1.8) + 32) + '°F';

						// define min temperature as fahrenheit
						minTemperature = Math.round(((data.main.temp_min - 273.15) * 1.8) + 32) + '°F';

						// define max temperature as fahrenheit
						maxTemperature = Math.round(((data.main.temp_max - 273.15) * 1.8) + 32) + '°F';

					} else {

						// define temperature as celsius
						temperature = Math.round(data.main.temp - 273.15) + '°C';

						// define min temperature as celsius
						minTemperature = Math.round(data.main.temp_min - 273.15) + '°C';

						// define max temperature as celsius
						maxTemperature = Math.round(data.main.temp_max - 273.15) + '°C';
					}

					weatherObj = {
						city: `${data.name}, ${data.sys.country}`,
						temperature: {
							current: temperature,
							min: minTemperature,
							max: maxTemperature,
							units: s.units.toUpperCase()
						},
						description: data.weather[0].description,
						windspeed: `${Math.round(data.wind.speed)} Mps`,
						humidity: `${data.main.humidity}%`,
						sunrise: `${formatTime(data.sys.sunrise)} AM`,
						sunset: `${formatTime(data.sys.sunset)} PM`
					};

					// set temperature
					el.html(temperature);

					// if minTemperatureTarget isn't null
					if(s.minTemperatureTarget != null) {

						// set minimum temperature
						$(s.minTemperatureTarget).text(minTemperature);
					}

					// if maxTemperatureTarget isn't null
					if(s.maxTemperatureTarget != null) {

						// set maximum temperature
						$(s.maxTemperatureTarget).text(maxTemperature);
					}

					// set weather description
					$(s.descriptionTarget).text(weatherObj.description);

					// if iconTarget and default weather icon aren't null
					if(s.iconTarget != null && data.weather[0].icon != null) {

						let iconURL;

						// if customIcons isn't null
						if(s.customIcons != null) {

							// define the default icon name
							const defaultIconFileName = data.weather[0].icon;

							let timeOfDay;
							let iconName;

							// if default icon name contains the letter 'd'
							if(defaultIconFileName.indexOf('d') != -1) {

								// define time of day as day
								timeOfDay = 'day';

							} else {

								// define time of day as night
								timeOfDay = 'night';
							}

							// if icon is clear sky
							if(defaultIconFileName == '01d' || defaultIconFileName == '01n') {
								iconName = 'clear';
							}

							// if icon is clouds
							if(defaultIconFileName == '02d' || defaultIconFileName == '02n' || defaultIconFileName == '03d' || defaultIconFileName == '03n' || defaultIconFileName == '04d' || defaultIconFileName == '04n') {
								iconName = 'clouds';
							}

							// if icon is rain
							if(defaultIconFileName == '09d' || defaultIconFileName == '09n' || defaultIconFileName == '10d' || defaultIconFileName == '10n') {
								iconName = 'rain';
							}

							// if icon is thunderstorm
							if(defaultIconFileName == '11d' || defaultIconFileName == '11n') {
								iconName = 'storm';
							}

							// if icon is snow
							if(defaultIconFileName == '13d' || defaultIconFileName == '13n') {

								iconName = 'snow';
							}

							// if icon is mist
							if(defaultIconFileName == '50d' || defaultIconFileName == '50n') {
								iconName = 'mist';
							}

							// define custom icon URL
							iconURL = `${s.customIcons}${timeOfDay}/${iconName}.png`;

						} else {

							// define icon URL using default icon
							iconURL = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`;
						}

						// set iconTarget src attribute as iconURL
						$(s.iconTarget).attr('src', iconURL);
					}

					// if placeTarget isn't null
					if(s.placeTarget != null) {

						// set place
						$(s.placeTarget).text(weatherObj.city);
					}

					// if windSpeedTarget isn't null
					if(s.windSpeedTarget != null) {

						// set wind speed
						$(s.windSpeedTarget).text(weatherObj.windspeed);
					}

					// if humidityTarget isn't null
					if(s.humidityTarget != null) {

						// set humidity
						$(s.humidityTarget).text(weatherObj.humidity);
					}

					// if sunriseTarget isn't null
					if(s.sunriseTarget != null) {

						// set sunrise
						$(s.sunriseTarget).text(weatherObj.sunrise);
					}

					// if sunriseTarget isn't null
					if(s.sunsetTarget != null) {

						// set sunset
						$(s.sunsetTarget).text(weatherObj.sunset);
					}

					// run success callback
					s.success.call(this, weatherObj);
				}
			},
			error: function(jqXHR, textStatus, errorThrown) {
				// run error callback
				s.error.call(this, {
					error: textStatus
				});
			}
		});
	}
})(jQuery);
