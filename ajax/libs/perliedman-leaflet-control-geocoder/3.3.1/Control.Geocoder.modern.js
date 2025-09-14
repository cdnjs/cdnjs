import * as n from "leaflet";
function l(i, t) {
  return Object.assign(t, i.geocodingQueryParams);
}
function p(i, t) {
  return Object.assign(t, i.reverseQueryParams);
}
const N = /[&<>"'`]/g, M = /[&<>"'`]/, S = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
function T(i) {
  return S[i];
}
function D(i) {
  return i == null ? "" : i ? (i = "" + i, M.test(i) ? i.replace(N, T) : i) : i + "";
}
function c(i, t) {
  const e = { Accept: "application/json" }, s = new URL(i);
  return Object.entries(t).forEach(([o, r]) => {
    (Array.isArray(r) ? r : [r]).forEach((a) => {
      s.searchParams.append(o, a);
    });
  }), fetch(s.toString(), { headers: e }).then((o) => o.json());
}
function A(i, t) {
  return i.replace(/\{ *([\w_]+) *\}/g, (e, s) => {
    let o = t[s];
    return o === void 0 ? o = "" : typeof o == "function" && (o = o(t)), D(o);
  });
}
class w {
  options = {
    serviceUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
    apiKey: ""
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = l(this.options, {
      token: this.options.apiKey,
      SingleLine: t,
      outFields: "Addr_Type",
      forStorage: !1,
      maxLocations: 10,
      f: "json"
    });
    return (await c(
      this.options.serviceUrl + "/findAddressCandidates",
      e
    )).candidates.map((o) => {
      const r = new n.LatLng(o.location.y, o.location.x), a = new n.LatLngBounds(
        new n.LatLng(o.extent.ymax, o.extent.xmax),
        new n.LatLng(o.extent.ymin, o.extent.xmin)
      );
      return {
        name: o.address,
        bbox: a,
        center: r
      };
    });
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      location: t.lng + "," + t.lat,
      distance: 100,
      f: "json"
    }), o = await c(this.options.serviceUrl + "/reverseGeocode", s);
    if (!o || o.error)
      return [];
    const r = new n.LatLng(o.location.y, o.location.x), a = new n.LatLngBounds(r, r);
    return [
      {
        name: o.address.Match_addr,
        center: r,
        bbox: a
      }
    ];
  }
}
function G(i) {
  return new w(i);
}
class v {
  options = {
    serviceUrl: "https://dev.virtualearth.net/REST/v1/Locations/"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = l(this.options, {
      query: t,
      key: this.options.apiKey
    }), s = await c(this.options.serviceUrl, e);
    return this._parseResults(s);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      key: this.options.apiKey
    }), o = await c(
      this.options.serviceUrl + t.lat + "," + t.lng,
      s
    );
    return this._parseResults(o);
  }
  _parseResults(t) {
    return t.resourceSets[0].resources.map((e) => {
      const s = e.bbox;
      return {
        name: e.name,
        bbox: new n.LatLngBounds([s[0], s[1]], [s[2], s[3]]),
        center: new n.LatLng(...e.point.coordinates)
      };
    });
  }
}
function z(i) {
  return new v(i);
}
class _ {
  options = {
    apiKey: "",
    serviceUrl: "https://atlas.microsoft.com/search"
  };
  constructor(t) {
    if (n.Util.setOptions(this, t), !this.options.apiKey)
      throw new Error("Azure Maps Geocoder requires an API key.");
  }
  /**
   * {@inheritdoc}
   * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
   */
  async geocode(t) {
    const e = {
      "api-version": "1.0",
      query: t,
      "subscription-key": this.options.apiKey
    }, s = this.options.serviceUrl + "/address/json";
    return ((await c(s, e)).results || []).map(
      (r) => ({
        name: r.address.freeformAddress,
        bbox: new n.LatLngBounds(
          [r.viewport.topLeftPoint.lat, r.viewport.topLeftPoint.lon],
          [r.viewport.btmRightPoint.lat, r.viewport.btmRightPoint.lon]
        ),
        center: new n.LatLng(r.position.lat, r.position.lon)
      })
    );
  }
  /**
   * {@inheritdoc}
   * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address-reverse?view=rest-maps-1.0&tabs=HTTP
   */
  async reverse(t, e) {
    const s = {
      "api-version": "1.0",
      query: t.lat + "," + t.lng,
      "subscription-key": this.options.apiKey
    }, o = this.options.serviceUrl + "/address/reverse/json";
    return ((await c(o, s)).addresses || []).map(
      (a) => ({
        name: a.address.freeformAddress,
        bbox: new n.LatLngBounds(
          [a.viewport.topLeftPoint.lat, a.viewport.topLeftPoint.lon],
          [a.viewport.btmRightPoint.lat, a.viewport.btmRightPoint.lon]
        ),
        center: new n.LatLng(t.lat, t.lng)
      })
    );
  }
}
function W(i) {
  return new _(i);
}
class f {
  options = {
    serviceUrl: "https://maps.googleapis.com/maps/api/geocode/json"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = l(this.options, {
      key: this.options.apiKey,
      address: t
    }), s = await c(this.options.serviceUrl, e);
    return this._parseResults(s);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      key: this.options.apiKey,
      latlng: t.lat + "," + t.lng
    }), o = await c(this.options.serviceUrl, s);
    return this._parseResults(o);
  }
  _parseResults(t) {
    return (t.results || [])?.map((e) => {
      const s = new n.LatLng(e.geometry.location.lat, e.geometry.location.lng), o = new n.LatLngBounds(
        new n.LatLng(e.geometry.viewport.northeast.lat, e.geometry.viewport.northeast.lng),
        new n.LatLng(e.geometry.viewport.southwest.lat, e.geometry.viewport.southwest.lng)
      );
      return {
        name: e.formatted_address,
        bbox: o,
        center: s,
        properties: e.address_components
      };
    });
  }
}
function I(i) {
  return new f(i);
}
class b {
  options = {
    serviceUrl: "https://geocoder.api.here.com/6.2/",
    app_id: "",
    app_code: "",
    apiKey: "",
    maxResults: 5
  };
  constructor(t) {
    if (n.Util.setOptions(this, t), t?.apiKey) throw Error("apiKey is not supported, use app_id/app_code instead!");
  }
  geocode(t) {
    const e = l(this.options, {
      searchtext: t,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "geocode.json", e);
  }
  reverse(t, e) {
    let s = t.lat + "," + t.lng;
    this.options.reverseGeocodeProxRadius && (s += "," + this.options.reverseGeocodeProxRadius);
    const o = p(this.options, {
      prox: s,
      mode: "retrieveAddresses",
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      gen: 9,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "reversegeocode.json", o);
  }
  async getJSON(t, e) {
    return ((await c(t, e)).response.view?.[0]?.result || []).map((o) => {
      const r = o.location, a = new n.LatLng(r.displayPosition.latitude, r.displayPosition.longitude), d = new n.LatLngBounds(
        new n.LatLng(r.mapView.topLeft.latitude, r.mapView.topLeft.longitude),
        new n.LatLng(r.mapView.bottomRight.latitude, r.mapView.bottomRight.longitude)
      );
      return {
        name: r.address.label,
        properties: r.address,
        bbox: d,
        center: a
      };
    });
  }
}
class y {
  options = {
    serviceUrl: "https://geocode.search.hereapi.com/v1",
    apiKey: "",
    app_id: "",
    app_code: "",
    maxResults: 10
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  geocode(t) {
    const e = l(this.options, {
      q: t,
      apiKey: this.options.apiKey,
      limit: this.options.maxResults
    });
    if (!e.at && !e.in)
      throw Error(
        "at / in parameters not found. Please define coordinates (at=latitude,longitude) or other (in) in your geocodingQueryParams."
      );
    return this.getJSON(this.options.serviceUrl + "/discover", e);
  }
  reverse(t, e) {
    const s = p(this.options, {
      at: t.lat + "," + t.lng,
      limit: this.options.reverseGeocodeProxRadius,
      apiKey: this.options.apiKey
    });
    return this.getJSON(this.options.serviceUrl + "/revgeocode", s);
  }
  async getJSON(t, e) {
    return ((await c(t, e)).items || []).map((o) => {
      const r = new n.LatLng(o.position.lat, o.position.lng);
      let a;
      return o.mapView ? a = new n.LatLngBounds(
        new n.LatLng(o.mapView.south, o.mapView.west),
        new n.LatLng(o.mapView.north, o.mapView.east)
      ) : a = new n.LatLngBounds(
        new n.LatLng(o.position.lat, o.position.lng),
        new n.LatLng(o.position.lat, o.position.lng)
      ), {
        name: o.address.label,
        properties: o.address,
        bbox: a,
        center: r
      };
    });
  }
}
function q(i) {
  return i?.apiKey ? new y(i) : new b(i);
}
function x(i) {
  let t;
  if (t = i.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))
    return new n.LatLng(
      (/N/i.test(t[1]) ? 1 : -1) * +t[2],
      (/E/i.test(t[3]) ? 1 : -1) * +t[4]
    );
  if (t = i.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))
    return new n.LatLng(
      (/N/i.test(t[2]) ? 1 : -1) * +t[1],
      (/E/i.test(t[4]) ? 1 : -1) * +t[3]
    );
  if (t = i.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
  ))
    return new n.LatLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60),
      (/E/i.test(t[4]) ? 1 : -1) * (+t[5] + +t[6] / 60)
    );
  if (t = i.match(
    /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
  ))
    return new n.LatLng(
      (/N/i.test(t[3]) ? 1 : -1) * (+t[1] + +t[2] / 60),
      (/E/i.test(t[6]) ? 1 : -1) * (+t[4] + +t[5] / 60)
    );
  if (t = i.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
  ))
    return new n.LatLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60 + +t[4] / 3600),
      (/E/i.test(t[5]) ? 1 : -1) * (+t[6] + +t[7] / 60 + +t[8] / 3600)
    );
  if (t = i.match(
    /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
  ))
    return new n.LatLng(
      (/N/i.test(t[4]) ? 1 : -1) * (+t[1] + +t[2] / 60 + +t[3] / 3600),
      (/E/i.test(t[8]) ? 1 : -1) * (+t[5] + +t[6] / 60 + +t[7] / 3600)
    );
  if (t = i.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))
    return new n.LatLng(+t[1], +t[2]);
}
class U {
  options = {
    next: void 0,
    sizeInMeters: 1e4
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = x(t);
    return e ? [
      {
        name: t,
        center: e,
        bbox: e.toBounds(this.options.sizeInMeters)
      }
    ] : this.options.next ? this.options.next.geocode(t) : [];
  }
}
function H(i) {
  return new U(i);
}
class R {
  options = {
    serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  _getProperties(t) {
    const e = {
      text: t.text,
      address: t.address
    };
    return (t.context || []).forEach((s) => {
      const o = s.id.split(".")[0];
      e[o] = s.text, s.short_code && (e.countryShortCode = s.short_code);
    }), e;
  }
  async geocode(t) {
    const e = this.options.serviceUrl + encodeURIComponent(t) + ".json", s = l(this.options, {
      access_token: this.options.apiKey
    });
    s.proximity !== void 0 && s.proximity.lat !== void 0 && s.proximity.lng !== void 0 && (s.proximity = s.proximity.lng + "," + s.proximity.lat);
    const o = await c(e, s);
    return this._parseResults(o);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, e) {
    const s = this.options.serviceUrl + t.lng + "," + t.lat + ".json", o = p(this.options, {
      access_token: this.options.apiKey
    }), r = await c(s, o);
    return this._parseResults(r);
  }
  _parseResults(t) {
    return t.features?.length ? t.features.map((e) => {
      const s = new n.LatLng(...e.center.reverse());
      let o;
      return e.bbox ? o = new n.LatLngBounds(
        new n.LatLng(...e.bbox.slice(0, 2).reverse()),
        new n.LatLng(...e.bbox.slice(2, 4).reverse())
      ) : o = new n.LatLngBounds(s, s), {
        name: e.place_name,
        bbox: o,
        center: s,
        properties: this._getProperties(e)
      };
    }) : [];
  }
}
function V(i) {
  return new R(i);
}
class E {
  options = {
    serviceUrl: "https://www.mapquestapi.com/geocoding/v1"
  };
  constructor(t) {
    n.Util.setOptions(this, t), this.options.apiKey = decodeURIComponent(this.options.apiKey);
  }
  _formatName(...t) {
    return t.filter((e) => !!e).join(", ");
  }
  async geocode(t) {
    const e = l(this.options, {
      key: this.options.apiKey,
      location: t,
      limit: 5,
      outFormat: "json"
    }), s = await c(this.options.serviceUrl + "/address", e);
    return this._parseResults(s);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      key: this.options.apiKey,
      location: t.lat + "," + t.lng,
      outputFormat: "json"
    }), o = await c(this.options.serviceUrl + "/reverse", s);
    return this._parseResults(o);
  }
  _parseResults(t) {
    return (t.results?.[0]?.locations || []).map((s) => {
      const o = new n.LatLng(s.latLng.lat, s.latLng.lng);
      return {
        name: this._formatName(s.street, s.adminArea4, s.adminArea3, s.adminArea1),
        bbox: new n.LatLngBounds(o, o),
        center: o
      };
    });
  }
}
function J(i) {
  return new E(i);
}
class k {
  options = {
    userId: "",
    apiKey: "",
    serviceUrl: "https://neutrinoapi.com/"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  // https://www.neutrinoapi.com/api/geocode-address/
  async geocode(t) {
    const e = l(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      //get three words and make a dot based string
      address: t.split(/\s+/).join(".")
    }), s = await c(this.options.serviceUrl + "geocode-address", e);
    if (!s.locations)
      return [];
    s.geometry = s.locations[0];
    const o = new n.LatLng(s.geometry.latitude, s.geometry.longitude), r = new n.LatLngBounds(o, o);
    return [
      {
        name: s.geometry.address,
        bbox: r,
        center: o
      }
    ];
  }
  suggest(t) {
    return this.geocode(t);
  }
  // https://www.neutrinoapi.com/api/geocode-reverse/
  async reverse(t, e) {
    const s = p(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      latitude: t.lat,
      longitude: t.lng
    }), o = await c(this.options.serviceUrl + "geocode-reverse", s);
    if (o.status.status !== 200 || !o.found)
      return [];
    const r = new n.LatLng(t.lat, t.lng), a = new n.LatLngBounds(r, r);
    return [
      {
        name: o.address,
        bbox: a,
        center: r
      }
    ];
  }
}
function $(i) {
  return new k(i);
}
class u {
  options = {
    serviceUrl: "https://nominatim.openstreetmap.org/",
    htmlTemplate(t) {
      const e = t.address;
      let s;
      const o = [];
      return (e.road || e.building) && o.push("{building} {road} {house_number}"), (e.city || e.town || e.village || e.hamlet) && (s = o.length > 0 ? "leaflet-control-geocoder-address-detail" : "", o.push(
        '<span class="' + s + '">{postcode} {city} {town} {village} {hamlet}</span>'
      )), (e.state || e.country) && (s = o.length > 0 ? "leaflet-control-geocoder-address-context" : "", o.push('<span class="' + s + '">{state} {country}</span>')), A(o.join("<br/>"), e);
    }
  };
  constructor(t) {
    n.Util.setOptions(this, t || {});
  }
  async geocode(t) {
    const e = l(this.options, {
      q: t,
      limit: 5,
      format: "json",
      addressdetails: 1
    });
    return (await c(this.options.serviceUrl + "search", e)).map((o) => {
      const r = o.boundingbox;
      return {
        icon: o.icon,
        name: o.display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(o) : void 0,
        bbox: new n.LatLngBounds([+r[0], +r[2]], [+r[1], +r[3]]),
        center: new n.LatLng(+o.lat, +o.lon),
        properties: o
      };
    });
  }
  async reverse(t, e) {
    const s = p(this.options, {
      lat: t.lat,
      lon: t.lng,
      zoom: Math.round(Math.log(e / 256) / Math.log(2)),
      addressdetails: 1,
      format: "json"
    }), o = await c(this.options.serviceUrl + "reverse", s);
    if (!o?.lat || !o?.lon)
      return [];
    const r = new n.LatLng(+o.lat, +o.lon), a = new n.LatLngBounds(r, r);
    return [
      {
        name: o.display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(o) : void 0,
        center: r,
        bbox: a,
        properties: o
      }
    ];
  }
}
function Q(i) {
  return new u(i);
}
class O {
  options = {};
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    try {
      const e = this.options.OpenLocationCode.decode(t);
      return [{
        name: t,
        center: new n.LatLng(e.latitudeCenter, e.longitudeCenter),
        bbox: new n.LatLngBounds(
          new n.LatLng(e.latitudeLo, e.longitudeLo),
          new n.LatLng(e.latitudeHi, e.longitudeHi)
        )
      }];
    } catch (e) {
      return console.warn(e), [];
    }
  }
  async reverse(t, e) {
    try {
      return [{
        name: this.options.OpenLocationCode.encode(
          t.lat,
          t.lng,
          this.options.codeLength
        ),
        center: new n.LatLng(t.lat, t.lng),
        bbox: new n.LatLngBounds(
          new n.LatLng(t.lat, t.lng),
          new n.LatLng(t.lat, t.lng)
        )
      }];
    } catch (s) {
      return console.warn(s), [];
    }
  }
}
function F(i) {
  return new O(i);
}
class C {
  options = {
    serviceUrl: "https://api.opencagedata.com/geocode/v1/json"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = l(this.options, {
      key: this.options.apiKey,
      q: t
    }), s = await c(this.options.serviceUrl, e);
    return this._parseResults(s);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      key: this.options.apiKey,
      q: [t.lat, t.lng].join(",")
    }), o = await c(this.options.serviceUrl, s);
    return this._parseResults(o);
  }
  _parseResults(t) {
    return (t.results || []).map((e) => {
      const s = new n.LatLng(e.geometry.lat, e.geometry.lng), o = e.annotations && e.annotations.bounds ? new n.LatLngBounds(
        new n.LatLng(e.annotations.bounds.northeast.lat, e.annotations.bounds.northeast.lng),
        new n.LatLng(e.annotations.bounds.southwest.lat, e.annotations.bounds.southwest.lng)
      ) : new n.LatLngBounds(s, s);
      return {
        name: e.formatted,
        bbox: o,
        center: s,
        properties: e
      };
    });
  }
}
function Z(i) {
  return new C(i);
}
class h {
  options = {
    serviceUrl: "https://api.geocode.earth/v1"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = l(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), s = await c(this.options.serviceUrl + "/search", e);
    return this._parseResults(s);
  }
  async suggest(t) {
    const e = l(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), s = await c(this.options.serviceUrl + "/autocomplete", e);
    return this._parseResults(s);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      api_key: this.options.apiKey,
      "point.lat": t.lat,
      "point.lon": t.lng
    }), o = await c(this.options.serviceUrl + "/reverse", s);
    return this._parseResults(o);
  }
  _parseResults(t) {
    return (t.features || []).map((e) => {
      const s = e.geometry.coordinates, o = new n.LatLng(s[1], s[0]), r = Array.isArray(e.bbox) && e.bbox.length === 4 ? new n.LatLngBounds([e.bbox[1], e.bbox[0]], [e.bbox[3], e.bbox[2]]) : new n.LatLngBounds(o, o);
      return {
        name: e.properties.label,
        center: o,
        bbox: r,
        properties: e.properties
      };
    });
  }
}
function g(i) {
  return new h(i);
}
const X = h, Y = g, tt = h, et = g;
class K extends h {
  constructor(t) {
    super(
      Object.assign(
        {
          serviceUrl: "https://api.openrouteservice.org/geocode"
        },
        t
      )
    );
  }
}
function st(i) {
  return new K(i);
}
class P {
  options = {
    serviceUrl: "https://photon.komoot.io/api/",
    reverseUrl: "https://photon.komoot.io/reverse/",
    nameProperties: ["name", "street", "suburb", "hamlet", "town", "city", "state", "country"]
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t, e) {
    const s = l(this.options, { q: t }), o = e?.map?.getCenter?.();
    o && (s.lat = o.lat, s.lon = o.lng);
    const r = e?.map?.getZoom?.();
    r && (s.zoom = r);
    const a = await c(this.options.serviceUrl, s);
    return this._parseResults(a);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, e) {
    const s = p(this.options, {
      lat: t.lat,
      lon: t.lng
    }), o = await c(this.options.reverseUrl, s);
    return this._parseResults(o);
  }
  _parseResults(t) {
    return (t.features || []).map((e) => {
      const s = e.geometry.coordinates, o = new n.LatLng(s[1], s[0]), r = e.properties?.extent, a = r ? new n.LatLngBounds([r[1], r[0]], [r[3], r[2]]) : new n.LatLngBounds(o, o);
      return {
        name: this._decodeFeatureName(e),
        html: this.options.htmlTemplate ? this.options.htmlTemplate(e) : void 0,
        center: o,
        bbox: a,
        properties: e.properties
      };
    });
  }
  _decodeFeatureName(t) {
    return (this.options.nameProperties || []).map((e) => t.properties?.[e]).filter((e) => !!e).join(", ");
  }
}
function ot(i) {
  return new P(i);
}
class j {
  options = {
    serviceUrl: "https://api.what3words.com/v2/"
  };
  constructor(t) {
    n.Util.setOptions(this, t);
  }
  async geocode(t) {
    const e = await c(
      this.options.serviceUrl + "forward",
      l(this.options, {
        key: this.options.apiKey,
        //get three words and make a dot based string
        addr: t.split(/\s+/).join(".")
      })
    );
    if (!e.geometry)
      return [];
    const s = new n.LatLng(e.geometry.lat, e.geometry.lng), o = new n.LatLngBounds(s, s);
    return [
      {
        name: e.words,
        bbox: o,
        center: s
      }
    ];
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, e) {
    const s = await c(
      this.options.serviceUrl + "reverse",
      p(this.options, {
        key: this.options.apiKey,
        coords: [t.lat, t.lng].join(",")
      })
    );
    if (s.status.status != 200)
      return [];
    const o = new n.LatLng(s.geometry.lat, s.geometry.lng), r = new n.LatLngBounds(o, o);
    return [
      {
        name: s.words,
        bbox: r,
        center: o
      }
    ];
  }
}
function nt(i) {
  return new j(i);
}
const it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcGis: w,
  AzureMaps: _,
  Bing: v,
  GeocodeEarth: X,
  Google: f,
  HERE: b,
  HEREv2: y,
  LatLng: U,
  MapQuest: E,
  Mapbox: R,
  Mapzen: tt,
  Neutrino: k,
  Nominatim: u,
  OpenCage: C,
  OpenLocationCode: O,
  Openrouteservice: K,
  Pelias: h,
  Photon: P,
  What3Words: j,
  arcgis: G,
  azure: W,
  bing: z,
  geocodeEarth: Y,
  geocodingParams: l,
  google: I,
  here: q,
  latLng: H,
  mapQuest: J,
  mapbox: V,
  mapzen: et,
  neutrino: $,
  nominatim: Q,
  openLocationCode: F,
  opencage: Z,
  openrouteservice: st,
  parseLatLng: x,
  pelias: g,
  photon: ot,
  reverseParams: p,
  what3words: nt
}, Symbol.toStringTag, { value: "Module" }));
class m {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...t) {
  }
}
Object.getOwnPropertyNames(n.Control.prototype).forEach(
  (i) => m.prototype[i] = n.Control.prototype[i]
);
Object.getOwnPropertyNames(n.Evented.prototype).forEach(
  (i) => m.prototype[i] = n.Evented.prototype[i]
);
class L extends m {
  options = {
    showUniqueResult: !0,
    showResultIcons: !1,
    collapsed: !0,
    expand: "touch",
    position: "topright",
    placeholder: "Search...",
    errorMessage: "Nothing found.",
    iconLabel: "Initiate a new search",
    query: "",
    queryMinLength: 1,
    suggestMinLength: 3,
    suggestTimeout: 250,
    defaultMarkGeocode: !0
  };
  _alts;
  _container;
  _errorElement;
  _geocodeMarker;
  _input;
  _lastGeocode;
  _map;
  _preventBlurCollapse;
  _requestCount = 0;
  _results;
  _selection;
  _suggestTimeout;
  /**
   * Instantiates a geocoder control (to be invoked using `new`)
   * @param options the options
   */
  constructor(t) {
    super(t), n.Util.setOptions(this, t), this.options.geocoder || (this.options.geocoder = new u());
  }
  addThrobberClass() {
    this._container.classList.add("leaflet-control-geocoder-throbber");
  }
  removeThrobberClass() {
    this._container.classList.remove("leaflet-control-geocoder-throbber");
  }
  /**
   * Returns the container DOM element for the control and add listeners on relevant map events.
   * @param map the map instance
   * @see https://leafletjs.com/reference.html#control-onadd
   */
  onAdd(t) {
    const e = "leaflet-control-geocoder", s = n.DomUtil.create("div", e + " leaflet-bar"), o = n.DomUtil.create("button", e + "-icon", s), r = n.DomUtil.create("div", e + "-form", s);
    this._map = t, this._container = s, o.innerHTML = "&nbsp;", o.type = "button", o.setAttribute("aria-label", this.options.iconLabel);
    const a = this._input = n.DomUtil.create("input", "", r);
    return a.type = "search", a.value = this.options.query, a.placeholder = this.options.placeholder, n.DomEvent.disableClickPropagation(a), this._errorElement = n.DomUtil.create("div", e + "-form-no-error", s), this._errorElement.innerHTML = this.options.errorMessage, this._alts = n.DomUtil.create(
      "ul",
      e + "-alternatives leaflet-control-geocoder-alternatives-minimized",
      s
    ), n.DomEvent.disableClickPropagation(this._alts), n.DomEvent.on(a, "keydown", this._keydown, this), this.options.geocoder?.suggest && n.DomEvent.on(a, "input", this._change, this), n.DomEvent.on(a, "blur", () => {
      this.options.collapsed && !this._preventBlurCollapse && this._collapse(), this._preventBlurCollapse = !1;
    }), this.options.collapsed ? this.options.expand === "click" ? n.DomEvent.on(s, "click", (d) => {
      d.button === 0 && d.detail !== 2 && this._toggle();
    }) : this.options.expand === "touch" ? n.DomEvent.on(
      s,
      n.Browser.touch ? "touchstart mousedown" : "mousedown",
      (d) => {
        this._toggle(), d.preventDefault(), d.stopPropagation();
      },
      this
    ) : (n.DomEvent.on(s, "mouseover", this._expand, this), n.DomEvent.on(s, "mouseout", this._collapse, this), this._map.on("movestart", this._collapse, this)) : (this._expand(), n.Browser.touch ? n.DomEvent.on(s, "touchstart", () => this._geocode()) : n.DomEvent.on(s, "click", () => this._geocode())), this.options.defaultMarkGeocode && this.on("markgeocode", this.markGeocode, this), this.on("startgeocode", this.addThrobberClass, this), this.on("finishgeocode", this.removeThrobberClass, this), this.on("startsuggest", this.addThrobberClass, this), this.on("finishsuggest", this.removeThrobberClass, this), n.DomEvent.disableClickPropagation(s), s;
  }
  /**
   * Sets the query string on the text input
   * @param string the query string
   */
  setQuery(t) {
    return this._input.value = t, this;
  }
  _geocodeResult(t, e) {
    !e && this.options.showUniqueResult && t.length === 1 ? this._geocodeResultSelected(t[0]) : t.length > 0 ? (this._alts.innerHTML = "", this._results = t, this._alts.classList.remove("leaflet-control-geocoder-alternatives-minimized"), this._container.classList.add("leaflet-control-geocoder-options-open"), this._results.forEach((s, o) => this._alts.appendChild(this._createAlt(s, o)))) : (this._container.classList.add("leaflet-control-geocoder-options-error"), this._errorElement.classList.add("leaflet-control-geocoder-error"));
  }
  /**
   * Marks a geocoding result on the map
   * @param result the geocoding result
   */
  markGeocode(t) {
    const e = t.geocode;
    return this._map.fitBounds(e.bbox), this._geocodeMarker && this._map.removeLayer(this._geocodeMarker), this._geocodeMarker = new n.Marker(e.center).bindPopup(e.html || e.name).addTo(this._map).openPopup(), this;
  }
  async _geocode(t = !1) {
    const e = this._input.value;
    if (!t && e.length < this.options.queryMinLength)
      return;
    const s = ++this._requestCount;
    this._lastGeocode = e, t || this._clearResults();
    const o = { input: e };
    this.fire(t ? "startsuggest" : "startgeocode", o);
    const r = { map: this._map }, a = t ? await this.options.geocoder.suggest(e, r) : await this.options.geocoder.geocode(e, r);
    if (s === this._requestCount) {
      const d = { input: e, results: a };
      this.fire(t ? "finishsuggest" : "finishgeocode", d), this._geocodeResult(a, t);
    }
  }
  _geocodeResultSelected(t) {
    const e = { geocode: t };
    this.fire("markgeocode", e);
  }
  _toggle() {
    this._container.classList.contains("leaflet-control-geocoder-expanded") ? this._collapse() : this._expand();
  }
  _expand() {
    this._container.classList.add("leaflet-control-geocoder-expanded"), this._input.select(), this.fire("expand");
  }
  _collapse() {
    this._container.classList.remove("leaflet-control-geocoder-expanded"), this._alts.classList.add("leaflet-control-geocoder-alternatives-minimized"), this._errorElement.classList.remove("leaflet-control-geocoder-error"), this._container.classList.remove("leaflet-control-geocoder-options-open"), this._container.classList.remove("leaflet-control-geocoder-options-error"), this._input.blur(), this.fire("collapse");
  }
  _clearResults() {
    this._alts.classList.add("leaflet-control-geocoder-alternatives-minimized"), this._selection = null, this._errorElement.classList.remove("leaflet-control-geocoder-error"), this._container.classList.remove("leaflet-control-geocoder-options-open"), this._container.classList.remove("leaflet-control-geocoder-options-error");
  }
  _createAlt(t, e) {
    const s = n.DomUtil.create("li", ""), o = n.DomUtil.create("a", "", s), r = this.options.showResultIcons && t.icon ? n.DomUtil.create("img", "", o) : null, a = t.html ? void 0 : document.createTextNode(t.name), d = (B) => {
      this._preventBlurCollapse = !0, n.DomEvent.stop(B), this._geocodeResultSelected(t), n.DomEvent.on(s, "click touchend", () => {
        this.options.collapsed ? this._collapse() : this._clearResults();
      });
    };
    return r && (r.src = t.icon), s.setAttribute("data-result-index", String(e)), t.html ? o.innerHTML = o.innerHTML + t.html : a && o.appendChild(a), n.DomEvent.on(s, "mousedown touchstart", d, this), s;
  }
  _keydown(t) {
    const e = (s) => {
      this._selection && (this._selection.classList.remove("leaflet-control-geocoder-selected"), this._selection = this._selection[s > 0 ? "nextSibling" : "previousSibling"]), this._selection || (this._selection = this._alts[s > 0 ? "firstChild" : "lastChild"]), this._selection && this._selection.classList.add("leaflet-control-geocoder-selected");
    };
    switch (t.key) {
      case "Escape":
        this.options.collapsed ? this._collapse() : this._clearResults();
        break;
      case "ArrowUp":
        e(-1);
        break;
      case "ArrowDown":
        e(1);
        break;
      case "Enter":
        if (this._selection) {
          const s = parseInt(this._selection.getAttribute("data-result-index"), 10);
          this._geocodeResultSelected(this._results[s]), this._clearResults();
        } else
          this._geocode();
        break;
      default:
        return;
    }
    n.DomEvent.preventDefault(t);
  }
  _change() {
    const t = this._input.value;
    t !== this._lastGeocode && (clearTimeout(this._suggestTimeout), t.length >= this.options.suggestMinLength ? this._suggestTimeout = setTimeout(() => this._geocode(!0), this.options.suggestTimeout) : this._clearResults());
  }
}
function rt(i) {
  return new L(i);
}
/* @preserve
 * Leaflet Control Geocoder
 * https://github.com/perliedman/leaflet-control-geocoder
 *
 * Copyright (c) 2012 sa3m (https://github.com/sa3m)
 * Copyright (c) 2018 Per Liedman
 * All rights reserved.
 */
Object.assign(L, it);
Object.assign(n.Control, {
  Geocoder: L,
  geocoder: rt
});
export {
  L as Geocoder,
  L as default,
  rt as geocoder,
  it as geocoders
};
//# sourceMappingURL=Control.Geocoder.modern.js.map
