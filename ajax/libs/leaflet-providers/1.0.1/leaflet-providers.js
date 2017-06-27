(function () {
	'use strict';

	L.TileLayer.Provider = L.TileLayer.extend({
		initialize: function (arg, options) {
			var providers = L.TileLayer.Provider.providers;

			var parts = arg.split('.');

			var providerName = parts[0];
			var variantName = parts[1];

			if (!providers[providerName]) {
				throw 'No such provider (' + providerName + ')';
			}

			var provider = {
				url: providers[providerName].url,
				options: providers[providerName].options
			};

			// overwrite values in provider from variant.
			if (variantName && 'variants' in providers[providerName]) {
				if (!(variantName in providers[providerName].variants)) {
					throw 'No such name in provider (' + variantName + ')';
				}
				var variant = providers[providerName].variants[variantName];
				provider = {
					url: variant.url || provider.url,
					options: L.Util.extend({}, provider.options, variant.options)
				};
			} else if (typeof provider.url === 'function') {
				provider.url = provider.url(parts.splice(1).join('.'));
			}

			// replace attribution placeholders with their values from toplevel provider attribution,
			// recursively
			var attributionReplacer = function (attr) {
				if (attr.indexOf('{attribution.') === -1) {
					return attr;
				}
				return attr.replace(/\{attribution.(\w*)\}/,
					function (match, attributionName) {
						return attributionReplacer(providers[attributionName].options.attribution);
					}
				);
			};
			provider.options.attribution = attributionReplacer(provider.options.attribution);

			// Compute final options combining provider options with any user overrides
			var layerOpts = L.Util.extend({}, provider.options, options);
			L.TileLayer.prototype.initialize.call(this, provider.url, layerOpts);
		}
	});

	/**
	 * Definition of providers.
	 * see http://leafletjs.com/reference.html#tilelayer for options in the options map.
	 */

	//jshint maxlen:220
	L.TileLayer.Provider.providers = {
		OpenStreetMap: {
			url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
			options: {
				attribution:
					'&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
			},
			variants: {
				Mapnik: {},
				BlackAndWhite: {
					url: 'http://{s}.www.toolserver.org/tiles/bw-mapnik/{z}/{x}/{y}.png'
				},
				DE: {
					url: 'http://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png'
				},
				HOT: {
					url: 'http://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png',
					options: {
						attribution: '{attribution.OpenStreetMap}, Tiles courtesy of <a href="http://hot.openstreetmap.org/" target="_blank">Humanitarian OpenStreetMap Team</a>'
					}
				}
			}
		},
		OpenCycleMap: {
			url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
			options: {
				attribution:
					'&copy; <a href="http://www.opencyclemap.org">OpenCycleMap</a>, {attribution.OpenStreetMap}'
			}
		},
		OpenSeaMap: {
			url: 'http://tiles.openseamap.org/seamark/{z}/{x}/{y}.png',
			options: {
				attribution: 'Map data: &copy; <a href="http://www.openseamap.org">OpenSeaMap</a> contributors'
			}
		},
		Thunderforest: {
			url: 'http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png',
			options: {
				attribution: '{attribution.OpenCycleMap}'
			},
			variants: {
				OpenCycleMap: {},
				Transport: {
					url: 'http://{s}.tile2.opencyclemap.org/transport/{z}/{x}/{y}.png'
				},
				Landscape: {
					url: 'http://{s}.tile3.opencyclemap.org/landscape/{z}/{x}/{y}.png'
				},
				Outdoors: {
					url: 'http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png'
				}
			}
		},
		OpenMapSurfer: {
			url: 'http://129.206.74.245:8001/tms_r.ashx?x={x}&y={y}&z={z}',
			options: {
				attribution: 'Imagery from <a href="http://giscience.uni-hd.de/">GIScience Research Group @ University of Heidelberg</a> &mdash; Map data {attribution.OpenStreetMap}'
			},
			variants: {
				Grayscale: {
					url: 'http://129.206.74.245:8008/tms_rg.ashx?x={x}&y={y}&z={z}'
				}
			}
		},
		MapQuestOpen: {
			url: 'http://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpeg',
			options: {
				attribution:
					'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ' +
					'Map data {attribution.OpenStreetMap}',
				subdomains: '1234'
			},
			variants: {
				OSM: {},
				Aerial: {
					url: 'http://oatile{s}.mqcdn.com/tiles/1.0.0/sat/{z}/{x}/{y}.jpg',
					options: {
						attribution:
							'Tiles Courtesy of <a href="http://www.mapquest.com/">MapQuest</a> &mdash; ' +
							'Portions Courtesy NASA/JPL-Caltech and U.S. Depart. of Agriculture, Farm Service Agency'
					}
				}
			}
		},
		MapBox: {
			url: function (id) {
				return 'http://{s}.tiles.mapbox.com/v3/' + id + '/{z}/{x}/{y}.png';
			},
			options: {
				attribution:
					'Imagery from <a href="http://mapbox.com/about/maps/">MapBox</a> &mdash; ' +
					'Map data {attribution.OpenStreetMap}',
				subdomains: 'abcd'
			}
		},
		Stamen: {
			url: 'http://{s}.tile.stamen.com/toner/{z}/{x}/{y}.png',
			options: {
				attribution:
					'Map tiles by <a href="http://stamen.com">Stamen Design</a>, ' +
					'<a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; ' +
					'Map data {attribution.OpenStreetMap}',
				subdomains: 'abcd',
				minZoom: 0,
				maxZoom: 20
			},
			variants: {
				Toner: {},
				TonerBackground: {
					url: 'http://{s}.tile.stamen.com/toner-background/{z}/{x}/{y}.png'
				},
				TonerHybrid: {
					url: 'http://{s}.tile.stamen.com/toner-hybrid/{z}/{x}/{y}.png'
				},
				TonerLines: {
					url: 'http://{s}.tile.stamen.com/toner-lines/{z}/{x}/{y}.png'
				},
				TonerLabels: {
					url: 'http://{s}.tile.stamen.com/toner-labels/{z}/{x}/{y}.png'
				},
				TonerLite: {
					url: 'http://{s}.tile.stamen.com/toner-lite/{z}/{x}/{y}.png'
				},
				Terrain: {
					url: 'http://{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
					options: {
						minZoom: 4,
						maxZoom: 18
					}
				},
				TerrainBackground: {
					url: 'http://{s}.tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg',
					options: {
						minZoom: 4,
						maxZoom: 18
					}
				},
				Watercolor: {
					url: 'http://{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
					options: {
						minZoom: 3,
						maxZoom: 16
					}
				}
			}
		},
		Esri: {
			url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}',
			options: {
				attribution: 'Tiles &copy; Esri'
			},
			variants: {
				WorldStreetMap: {
					options: {
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
					}
				},
				DeLorme: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Specialty/DeLorme_World_Base_Map/MapServer/tile/{z}/{y}/{x}',
					options: {
						minZoom: 1,
						maxZoom: 11,
						attribution: '{attribution.Esri} &mdash; Copyright: &copy;2012 DeLorme'
					}
				},
				WorldTopoMap: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
					options: {
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
					}
				},
				WorldImagery: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
					options: {
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
					}
				},
				WorldTerrain: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 13,
						attribution:
							'{attribution.Esri} &mdash; ' +
							'Source: USGS, Esri, TANA, DeLorme, and NPS'
					}
				},
				WorldShadedRelief: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Shaded_Relief/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Source: Esri'
					}
				},
				WorldPhysical: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/World_Physical_Map/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 8,
						attribution: '{attribution.Esri} &mdash; Source: US National Park Service'
					}
				},
				OceanBasemap: {
					url: 'http://services.arcgisonline.com/ArcGIS/rest/services/Ocean_Basemap/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 13,
						attribution: '{attribution.Esri} &mdash; Sources: GEBCO, NOAA, CHS, OSU, UNH, CSUMB, National Geographic, DeLorme, NAVTEQ, and Esri'
					}
				},
				NatGeoWorldMap: {
					url: 'http://services.arcgisonline.com/ArcGIS/rest/services/NatGeo_World_Map/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; National Geographic, Esri, DeLorme, NAVTEQ, UNEP-WCMC, USGS, NASA, ESA, METI, NRCAN, GEBCO, NOAA, iPC'
					}
				},
				WorldGrayCanvas: {
					url: 'http://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
					options: {
						maxZoom: 16,
						attribution: '{attribution.Esri} &mdash; Esri, DeLorme, NAVTEQ'
					}
				}
			}
		},
		OpenWeatherMap: {
			options: {
				attribution: 'Map data &copy; <a href="http://openweathermap.org">OpenWeatherMap</a>',
				opacity: 0.5
			},
			variants: {
				Clouds: {
					url: 'http://{s}.tile.openweathermap.org/map/clouds/{z}/{x}/{y}.png'
				},
				CloudsClassic: {
					url: 'http://{s}.tile.openweathermap.org/map/clouds_cls/{z}/{x}/{y}.png'
				},
				Precipitation: {
					url: 'http://{s}.tile.openweathermap.org/map/precipitation/{z}/{x}/{y}.png'
				},
				PrecipitationClassic: {
					url: 'http://{s}.tile.openweathermap.org/map/precipitation_cls/{z}/{x}/{y}.png'
				},
				Rain: {
					url: 'http://{s}.tile.openweathermap.org/map/rain/{z}/{x}/{y}.png'
				},
				RainClassic: {
					url: 'http://{s}.tile.openweathermap.org/map/rain_cls/{z}/{x}/{y}.png'
				},
				Pressure: {
					url: 'http://{s}.tile.openweathermap.org/map/pressure/{z}/{x}/{y}.png'
				},
				PressureContour: {
					url: 'http://{s}.tile.openweathermap.org/map/pressure_cntr/{z}/{x}/{y}.png'
				},
				Wind: {
					url: 'http://{s}.tile.openweathermap.org/map/wind/{z}/{x}/{y}.png'
				},
				Temperature: {
					url: 'http://{s}.tile.openweathermap.org/map/temp/{z}/{x}/{y}.png'
				},
				Snow: {
					url: 'http://{s}.tile.openweathermap.org/map/snow/{z}/{x}/{y}.png'
				}
			}
		},
		Nokia: {
			options: {
				attribution:
					'Map &copy; <a href="http://developer.here.com">Nokia</a>, Data &copy; NAVTEQ 2012',
				subdomains: '1234',
				devID: 'xyz', //These basemaps are free and you can sign up here:  http://developer.here.com/plans
				appID: 'abc'
			},
			variants: {
				normalDay: {
					url: 'http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/normal.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}'
				},
				normalGreyDay: {
					url: 'http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/normal.day.grey/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}'
				},
				satelliteNoLabelsDay: {
					url: 'http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/satellite.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}'
				},
				satelliteYesLabelsDay: {
					url: 'http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/hybrid.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}'
				},
				terrainDay: {
					url: 'http://{s}.maptile.lbs.ovi.com/maptiler/v2/maptile/newest/terrain.day/{z}/{x}/{y}/256/png8?token={devID}&app_id={appID}'
				}
			}
		},
		Acetate: {
			url: 'http://a{s}.acetate.geoiq.com/tiles/acetate-hillshading/{z}/{x}/{y}.png',
			options: {
				attribution:
					'&copy;2012 Esri & Stamen, Data from OSM and Natural Earth',
				subdomains: '0123',
				minZoom: 2,
				maxZoom: 18
			},
			variants: {
				all: {},
				basemap: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/acetate-base/{z}/{x}/{y}.png'
				},
				terrain: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/terrain/{z}/{x}/{y}.png'
				},
				foreground: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/acetate-fg/{z}/{x}/{y}.png'
				},
				roads: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/acetate-roads/{z}/{x}/{y}.png'
				},
				labels: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/acetate-labels/{z}/{x}/{y}.png'
				},
				hillshading: {
					url: 'http://a{s}.acetate.geoiq.com/tiles/hillshading/{z}/{x}/{y}.png'
				}
			}
		},
		CloudMade: {
			url: 'http://{s}.tile.cloudmade.com/{apiKey}/{styleID}/256/{z}/{x}/{y}.png',
			options: {
				attribution:
					'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
					'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
					'Map tile imagery © <a href="http://cloudmade.com">CloudMade</a>',
				minZoom: 0,
				apiKey: 'abc', // Sign up for an API key at http://cloudmade.com/ - first 500,000 tile requests are free
				styleID: '1'
			},
			variants: {
				standardResolution: {
					maxZoom: 18
				},
				highResolution: {
					url: 'http://{s}.tile.cloudmade.com/{apiKey}/{styleID}@2x/256/{z}/{x}/{y}.png',
					maxZoom: 19
				}
			}
		}
	};

	L.tileLayer.provider = function (provider, options) {
		return new L.TileLayer.Provider(provider, options);
	};

	L.Control.Layers.Provided = L.Control.Layers.extend({
		initialize: function (base, overlay, options) {
			var first;

			var labelFormatter = function (label) {
				return label.replace(/\./g, ': ').replace(/([a-z])([A-Z])/g, '$1 $2');
			};

			if (base.length) {
				(function () {
					var out = {},
					    len = base.length,
					    i = 0;

					while (i < len) {
						if (typeof base[i] === 'string') {
							if (i === 0) {
								first = L.tileLayer.provider(base[0]);
								out[labelFormatter(base[i])] = first;
							} else {
								out[labelFormatter(base[i])] = L.tileLayer.provider(base[i]);
							}
						}
						i++;
					}
					base = out;
				}());
				this._first = first;
			}

			if (overlay && overlay.length) {
				(function () {
					var out = {},
					    len = overlay.length,
					    i = 0;

					while (i < len) {
						if (typeof base[i] === 'string') {
							out[labelFormatter(overlay[i])] = L.tileLayer.provider(overlay[i]);
						}
						i++;
					}
					overlay = out;
				}());
			}
			L.Control.Layers.prototype.initialize.call(this, base, overlay, options);
		},
		onAdd: function (map) {
			this._first.addTo(map);
			return L.Control.Layers.prototype.onAdd.call(this, map);
		}
	});

	L.control.layers.provided = function (baseLayers, overlays, options) {
		return new L.Control.Layers.Provided(baseLayers, overlays, options);
	};
}());

