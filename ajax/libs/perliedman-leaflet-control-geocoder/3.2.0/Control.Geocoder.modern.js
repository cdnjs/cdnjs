var M = Object.defineProperty;
var D = (i, e, t) => e in i ? M(i, e, { enumerable: !0, configurable: !0, writable: !0, value: t }) : i[e] = t;
var l = (i, e, t) => D(i, typeof e != "symbol" ? e + "" : e, t);
import * as n from "leaflet";
function h(i, e) {
  return Object.assign(e, i.geocodingQueryParams);
}
function g(i, e) {
  return Object.assign(e, i.reverseQueryParams);
}
const A = /[&<>"'`]/g, G = /[&<>"'`]/, z = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
function W(i) {
  return z[i];
}
function I(i) {
  return i == null ? "" : i ? (i = "" + i, G.test(i) ? i.replace(A, W) : i) : i + "";
}
function p(i, e) {
  const t = { Accept: "application/json" }, s = new URL(i);
  return Object.entries(e).forEach(([o, r]) => {
    (Array.isArray(r) ? r : [r]).forEach((a) => {
      s.searchParams.append(o, a);
    });
  }), fetch(s.toString(), { headers: t }).then((o) => o.json());
}
function q(i, e) {
  return i.replace(/\{ *([\w_]+) *\}/g, (t, s) => {
    let o = e[s];
    return o === void 0 ? o = "" : typeof o == "function" && (o = o(e)), I(o);
  });
}
class b {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      apiKey: ""
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = h(this.options, {
      token: this.options.apiKey,
      SingleLine: e,
      outFields: "Addr_Type",
      forStorage: !1,
      maxLocations: 10,
      f: "json"
    });
    return (await p(
      this.options.serviceUrl + "/findAddressCandidates",
      t
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
  suggest(e) {
    return this.geocode(e);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      location: e.lng + "," + e.lat,
      distance: 100,
      f: "json"
    }), o = await p(this.options.serviceUrl + "/reverseGeocode", s);
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
function H(i) {
  return new b(i);
}
class y {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://dev.virtualearth.net/REST/v1/Locations/"
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = h(this.options, {
      query: e,
      key: this.options.apiKey
    }), s = await p(this.options.serviceUrl, t);
    return this._parseResults(s);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      key: this.options.apiKey
    }), o = await p(
      this.options.serviceUrl + e.lat + "," + e.lng,
      s
    );
    return this._parseResults(o);
  }
  _parseResults(e) {
    return e.resourceSets[0].resources.map((t) => {
      const s = t.bbox;
      return {
        name: t.name,
        bbox: new n.LatLngBounds([s[0], s[1]], [s[2], s[3]]),
        center: new n.LatLng(...t.point.coordinates)
      };
    });
  }
}
function J(i) {
  return new y(i);
}
class x {
  constructor(e) {
    l(this, "options", {
      apiKey: "",
      serviceUrl: "https://atlas.microsoft.com/search"
    });
    if (n.Util.setOptions(this, e), !this.options.apiKey)
      throw new Error("Azure Maps Geocoder requires an API key.");
  }
  /**
   * {@inheritdoc}
   * https://learn.microsoft.com/en-us/rest/api/maps/search/get-search-address?view=rest-maps-1.0&tabs=HTTP
   */
  async geocode(e) {
    const t = {
      "api-version": "1.0",
      query: e,
      "subscription-key": this.options.apiKey
    }, s = this.options.serviceUrl + "/address/json";
    return ((await p(s, t)).results || []).map(
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
  async reverse(e, t) {
    const s = {
      "api-version": "1.0",
      query: e.lat + "," + e.lng,
      "subscription-key": this.options.apiKey
    }, o = this.options.serviceUrl + "/address/reverse/json";
    return ((await p(o, s)).addresses || []).map(
      (a) => ({
        name: a.address.freeformAddress,
        bbox: new n.LatLngBounds(
          [a.viewport.topLeftPoint.lat, a.viewport.topLeftPoint.lon],
          [a.viewport.btmRightPoint.lat, a.viewport.btmRightPoint.lon]
        ),
        center: new n.LatLng(e.lat, e.lng)
      })
    );
  }
}
function V(i) {
  return new x(i);
}
class U {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://maps.googleapis.com/maps/api/geocode/json"
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = h(this.options, {
      key: this.options.apiKey,
      address: e
    }), s = await p(this.options.serviceUrl, t);
    return this._parseResults(s);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      key: this.options.apiKey,
      latlng: e.lat + "," + e.lng
    }), o = await p(this.options.serviceUrl, s);
    return this._parseResults(o);
  }
  _parseResults(e) {
    var t;
    return (t = e.results || []) == null ? void 0 : t.map((s) => {
      const o = new n.LatLng(s.geometry.location.lat, s.geometry.location.lng), r = new n.LatLngBounds(
        new n.LatLng(s.geometry.viewport.northeast.lat, s.geometry.viewport.northeast.lng),
        new n.LatLng(s.geometry.viewport.southwest.lat, s.geometry.viewport.southwest.lng)
      );
      return {
        name: s.formatted_address,
        bbox: r,
        center: o,
        properties: s.address_components
      };
    });
  }
}
function $(i) {
  return new U(i);
}
class R {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://geocoder.api.here.com/6.2/",
      app_id: "",
      app_code: "",
      apiKey: "",
      maxResults: 5
    });
    if (n.Util.setOptions(this, e), e != null && e.apiKey) throw Error("apiKey is not supported, use app_id/app_code instead!");
  }
  geocode(e) {
    const t = h(this.options, {
      searchtext: e,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "geocode.json", t);
  }
  reverse(e, t) {
    let s = e.lat + "," + e.lng;
    this.options.reverseGeocodeProxRadius && (s += "," + this.options.reverseGeocodeProxRadius);
    const o = g(this.options, {
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
  async getJSON(e, t) {
    var o, r;
    return (((r = (o = (await p(e, t)).response.view) == null ? void 0 : o[0]) == null ? void 0 : r.result) || []).map((a) => {
      const c = a.location, d = new n.LatLng(c.displayPosition.latitude, c.displayPosition.longitude), u = new n.LatLngBounds(
        new n.LatLng(c.mapView.topLeft.latitude, c.mapView.topLeft.longitude),
        new n.LatLng(c.mapView.bottomRight.latitude, c.mapView.bottomRight.longitude)
      );
      return {
        name: c.address.label,
        properties: c.address,
        bbox: u,
        center: d
      };
    });
  }
}
class E {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://geocode.search.hereapi.com/v1",
      apiKey: "",
      app_id: "",
      app_code: "",
      maxResults: 10
    });
    n.Util.setOptions(this, e);
  }
  geocode(e) {
    const t = h(this.options, {
      q: e,
      apiKey: this.options.apiKey,
      limit: this.options.maxResults
    });
    if (!t.at && !t.in)
      throw Error(
        "at / in parameters not found. Please define coordinates (at=latitude,longitude) or other (in) in your geocodingQueryParams."
      );
    return this.getJSON(this.options.serviceUrl + "/discover", t);
  }
  reverse(e, t) {
    const s = g(this.options, {
      at: e.lat + "," + e.lng,
      limit: this.options.reverseGeocodeProxRadius,
      apiKey: this.options.apiKey
    });
    return this.getJSON(this.options.serviceUrl + "/revgeocode", s);
  }
  async getJSON(e, t) {
    return ((await p(e, t)).items || []).map((o) => {
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
function F(i) {
  return i != null && i.apiKey ? new E(i) : new R(i);
}
function k(i) {
  let e;
  if (e = i.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))
    return new n.LatLng(
      (/N/i.test(e[1]) ? 1 : -1) * +e[2],
      (/E/i.test(e[3]) ? 1 : -1) * +e[4]
    );
  if (e = i.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))
    return new n.LatLng(
      (/N/i.test(e[2]) ? 1 : -1) * +e[1],
      (/E/i.test(e[4]) ? 1 : -1) * +e[3]
    );
  if (e = i.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
  ))
    return new n.LatLng(
      (/N/i.test(e[1]) ? 1 : -1) * (+e[2] + +e[3] / 60),
      (/E/i.test(e[4]) ? 1 : -1) * (+e[5] + +e[6] / 60)
    );
  if (e = i.match(
    /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
  ))
    return new n.LatLng(
      (/N/i.test(e[3]) ? 1 : -1) * (+e[1] + +e[2] / 60),
      (/E/i.test(e[6]) ? 1 : -1) * (+e[4] + +e[5] / 60)
    );
  if (e = i.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
  ))
    return new n.LatLng(
      (/N/i.test(e[1]) ? 1 : -1) * (+e[2] + +e[3] / 60 + +e[4] / 3600),
      (/E/i.test(e[5]) ? 1 : -1) * (+e[6] + +e[7] / 60 + +e[8] / 3600)
    );
  if (e = i.match(
    /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
  ))
    return new n.LatLng(
      (/N/i.test(e[4]) ? 1 : -1) * (+e[1] + +e[2] / 60 + +e[3] / 3600),
      (/E/i.test(e[8]) ? 1 : -1) * (+e[5] + +e[6] / 60 + +e[7] / 3600)
    );
  if (e = i.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))
    return new n.LatLng(+e[1], +e[2]);
}
class O {
  constructor(e) {
    l(this, "options", {
      next: void 0,
      sizeInMeters: 1e4
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = k(e);
    return t ? [
      {
        name: e,
        center: t,
        bbox: t.toBounds(this.options.sizeInMeters)
      }
    ] : this.options.next ? this.options.next.geocode(e) : [];
  }
}
function Q(i) {
  return new O(i);
}
class C {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    });
    n.Util.setOptions(this, e);
  }
  _getProperties(e) {
    const t = {
      text: e.text,
      address: e.address
    };
    return (e.context || []).forEach((s) => {
      const o = s.id.split(".")[0];
      t[o] = s.text, s.short_code && (t.countryShortCode = s.short_code);
    }), t;
  }
  async geocode(e) {
    const t = this.options.serviceUrl + encodeURIComponent(e) + ".json", s = h(this.options, {
      access_token: this.options.apiKey
    });
    s.proximity !== void 0 && s.proximity.lat !== void 0 && s.proximity.lng !== void 0 && (s.proximity = s.proximity.lng + "," + s.proximity.lat);
    const o = await p(t, s);
    return this._parseResults(o);
  }
  suggest(e) {
    return this.geocode(e);
  }
  async reverse(e, t) {
    const s = this.options.serviceUrl + e.lng + "," + e.lat + ".json", o = g(this.options, {
      access_token: this.options.apiKey
    }), r = await p(s, o);
    return this._parseResults(r);
  }
  _parseResults(e) {
    var t;
    return (t = e.features) != null && t.length ? e.features.map((s) => {
      const o = new n.LatLng(...s.center.reverse());
      let r;
      return s.bbox ? r = new n.LatLngBounds(
        new n.LatLng(...s.bbox.slice(0, 2).reverse()),
        new n.LatLng(...s.bbox.slice(2, 4).reverse())
      ) : r = new n.LatLngBounds(o, o), {
        name: s.place_name,
        bbox: r,
        center: o,
        properties: this._getProperties(s)
      };
    }) : [];
  }
}
function Z(i) {
  return new C(i);
}
class B {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://www.mapquestapi.com/geocoding/v1"
    });
    n.Util.setOptions(this, e), this.options.apiKey = decodeURIComponent(this.options.apiKey);
  }
  _formatName(...e) {
    return e.filter((t) => !!t).join(", ");
  }
  async geocode(e) {
    const t = h(this.options, {
      key: this.options.apiKey,
      location: e,
      limit: 5,
      outFormat: "json"
    }), s = await p(this.options.serviceUrl + "/address", t);
    return this._parseResults(s);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      key: this.options.apiKey,
      location: e.lat + "," + e.lng,
      outputFormat: "json"
    }), o = await p(this.options.serviceUrl + "/reverse", s);
    return this._parseResults(o);
  }
  _parseResults(e) {
    var s, o;
    return (((o = (s = e.results) == null ? void 0 : s[0]) == null ? void 0 : o.locations) || []).map((r) => {
      const a = new n.LatLng(r.latLng.lat, r.latLng.lng);
      return {
        name: this._formatName(r.street, r.adminArea4, r.adminArea3, r.adminArea1),
        bbox: new n.LatLngBounds(a, a),
        center: a
      };
    });
  }
}
function X(i) {
  return new B(i);
}
class K {
  constructor(e) {
    l(this, "options", {
      userId: "",
      apiKey: "",
      serviceUrl: "https://neutrinoapi.com/"
    });
    n.Util.setOptions(this, e);
  }
  // https://www.neutrinoapi.com/api/geocode-address/
  async geocode(e) {
    const t = h(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      //get three words and make a dot based string
      address: e.split(/\s+/).join(".")
    }), s = await p(this.options.serviceUrl + "geocode-address", t);
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
  suggest(e) {
    return this.geocode(e);
  }
  // https://www.neutrinoapi.com/api/geocode-reverse/
  async reverse(e, t) {
    const s = g(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      latitude: e.lat,
      longitude: e.lng
    }), o = await p(this.options.serviceUrl + "geocode-reverse", s);
    if (o.status.status !== 200 || !o.found)
      return [];
    const r = new n.LatLng(e.lat, e.lng), a = new n.LatLngBounds(r, r);
    return [
      {
        name: o.address,
        bbox: a,
        center: r
      }
    ];
  }
}
function Y(i) {
  return new K(i);
}
class L {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://nominatim.openstreetmap.org/",
      htmlTemplate(e) {
        const t = e.address;
        let s;
        const o = [];
        return (t.road || t.building) && o.push("{building} {road} {house_number}"), (t.city || t.town || t.village || t.hamlet) && (s = o.length > 0 ? "leaflet-control-geocoder-address-detail" : "", o.push(
          '<span class="' + s + '">{postcode} {city} {town} {village} {hamlet}</span>'
        )), (t.state || t.country) && (s = o.length > 0 ? "leaflet-control-geocoder-address-context" : "", o.push('<span class="' + s + '">{state} {country}</span>')), q(o.join("<br/>"), t);
      }
    });
    n.Util.setOptions(this, e || {});
  }
  async geocode(e) {
    const t = h(this.options, {
      q: e,
      limit: 5,
      format: "json",
      addressdetails: 1
    });
    return (await p(this.options.serviceUrl + "search", t)).map((o) => {
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
  async reverse(e, t) {
    const s = g(this.options, {
      lat: e.lat,
      lon: e.lng,
      zoom: Math.round(Math.log(t / 256) / Math.log(2)),
      addressdetails: 1,
      format: "json"
    }), o = await p(this.options.serviceUrl + "reverse", s);
    if (!(o != null && o.lat) || !(o != null && o.lon))
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
function ee(i) {
  return new L(i);
}
class j {
  constructor(e) {
    l(this, "options", {});
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    try {
      const t = this.options.OpenLocationCode.decode(e);
      return [{
        name: e,
        center: new n.LatLng(t.latitudeCenter, t.longitudeCenter),
        bbox: new n.LatLngBounds(
          new n.LatLng(t.latitudeLo, t.longitudeLo),
          new n.LatLng(t.latitudeHi, t.longitudeHi)
        )
      }];
    } catch (t) {
      return console.warn(t), [];
    }
  }
  async reverse(e, t) {
    try {
      return [{
        name: this.options.OpenLocationCode.encode(
          e.lat,
          e.lng,
          this.options.codeLength
        ),
        center: new n.LatLng(e.lat, e.lng),
        bbox: new n.LatLngBounds(
          new n.LatLng(e.lat, e.lng),
          new n.LatLng(e.lat, e.lng)
        )
      }];
    } catch (s) {
      return console.warn(s), [];
    }
  }
}
function te(i) {
  return new j(i);
}
class P {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://api.opencagedata.com/geocode/v1/json"
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = h(this.options, {
      key: this.options.apiKey,
      q: e
    }), s = await p(this.options.serviceUrl, t);
    return this._parseResults(s);
  }
  suggest(e) {
    return this.geocode(e);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      key: this.options.apiKey,
      q: [e.lat, e.lng].join(",")
    }), o = await p(this.options.serviceUrl, s);
    return this._parseResults(o);
  }
  _parseResults(e) {
    return (e.results || []).map((t) => {
      const s = new n.LatLng(t.geometry.lat, t.geometry.lng), o = t.annotations && t.annotations.bounds ? new n.LatLngBounds(
        new n.LatLng(t.annotations.bounds.northeast.lat, t.annotations.bounds.northeast.lng),
        new n.LatLng(t.annotations.bounds.southwest.lat, t.annotations.bounds.southwest.lng)
      ) : new n.LatLngBounds(s, s);
      return {
        name: t.formatted,
        bbox: o,
        center: s,
        properties: t
      };
    });
  }
}
function se(i) {
  return new P(i);
}
class m {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://api.geocode.earth/v1"
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = h(this.options, {
      api_key: this.options.apiKey,
      text: e
    }), s = await p(this.options.serviceUrl + "/search", t);
    return this._parseResults(s, "bbox");
  }
  async suggest(e) {
    const t = h(this.options, {
      api_key: this.options.apiKey,
      text: e
    }), s = await p(this.options.serviceUrl + "/autocomplete", t);
    return this._parseResults(s, "bbox");
  }
  async reverse(e, t) {
    const s = g(this.options, {
      api_key: this.options.apiKey,
      "point.lat": e.lat,
      "point.lon": e.lng
    }), o = await p(this.options.serviceUrl + "/reverse", s);
    return this._parseResults(o, "bounds");
  }
  _parseResults(e, t) {
    const s = [];
    return new n.GeoJSON(e, {
      pointToLayer(o, r) {
        return new n.CircleMarker(r, { radius: 10 });
      },
      onEachFeature(o, r) {
        const a = {};
        let c, d;
        r.getBounds ? (c = r.getBounds(), d = c.getCenter()) : r.feature.bbox ? (d = r.getLatLng(), c = new n.LatLngBounds(
          n.GeoJSON.coordsToLatLng(r.feature.bbox.slice(0, 2)),
          n.GeoJSON.coordsToLatLng(r.feature.bbox.slice(2, 4))
        )) : (d = r.getLatLng(), c = new n.LatLngBounds(d, d)), a.name = r.feature.properties.label, a.center = d, a[t] = c, a.properties = r.feature.properties, s.push(a);
      }
    }), s;
  }
}
function w(i) {
  return new m(i);
}
const oe = m, ne = w, ie = m, re = w;
class S extends m {
  constructor(e) {
    super(
      Object.assign(
        {
          serviceUrl: "https://api.openrouteservice.org/geocode"
        },
        e
      )
    );
  }
}
function ae(i) {
  return new S(i);
}
class T {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://photon.komoot.io/api/",
      reverseUrl: "https://photon.komoot.io/reverse/",
      nameProperties: ["name", "street", "suburb", "hamlet", "town", "city", "state", "country"]
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e, t) {
    var c, d, u, _;
    const s = h(this.options, { q: e }), o = (d = (c = t == null ? void 0 : t.map) == null ? void 0 : c.getCenter) == null ? void 0 : d.call(c);
    o && (s.lat = o.lat, s.lon = o.lng);
    const r = (_ = (u = t == null ? void 0 : t.map) == null ? void 0 : u.getZoom) == null ? void 0 : _.call(u);
    r && (s.zoom = r);
    const a = await p(this.options.serviceUrl, s);
    return this._parseResults(a);
  }
  suggest(e) {
    return this.geocode(e);
  }
  async reverse(e, t) {
    const s = g(this.options, {
      lat: e.lat,
      lon: e.lng
    }), o = await p(this.options.reverseUrl, s);
    return this._parseResults(o);
  }
  _parseResults(e) {
    return (e.features || []).map((t) => {
      var c;
      const s = t.geometry.coordinates, o = new n.LatLng(s[1], s[0]), r = (c = t.properties) == null ? void 0 : c.extent, a = r ? new n.LatLngBounds([r[1], r[0]], [r[3], r[2]]) : new n.LatLngBounds(o, o);
      return {
        name: this._decodeFeatureName(t),
        html: this.options.htmlTemplate ? this.options.htmlTemplate(t) : void 0,
        center: o,
        bbox: a,
        properties: t.properties
      };
    });
  }
  _decodeFeatureName(e) {
    return (this.options.nameProperties || []).map((t) => {
      var s;
      return (s = e.properties) == null ? void 0 : s[t];
    }).filter((t) => !!t).join(", ");
  }
}
function ce(i) {
  return new T(i);
}
class N {
  constructor(e) {
    l(this, "options", {
      serviceUrl: "https://api.what3words.com/v2/"
    });
    n.Util.setOptions(this, e);
  }
  async geocode(e) {
    const t = await p(
      this.options.serviceUrl + "forward",
      h(this.options, {
        key: this.options.apiKey,
        //get three words and make a dot based string
        addr: e.split(/\s+/).join(".")
      })
    );
    if (!t.geometry)
      return [];
    const s = new n.LatLng(t.geometry.lat, t.geometry.lng), o = new n.LatLngBounds(s, s);
    return [
      {
        name: t.words,
        bbox: o,
        center: s
      }
    ];
  }
  suggest(e) {
    return this.geocode(e);
  }
  async reverse(e, t) {
    const s = await p(
      this.options.serviceUrl + "reverse",
      g(this.options, {
        key: this.options.apiKey,
        coords: [e.lat, e.lng].join(",")
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
function le(i) {
  return new N(i);
}
const pe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcGis: b,
  AzureMaps: x,
  Bing: y,
  GeocodeEarth: oe,
  Google: U,
  HERE: R,
  HEREv2: E,
  LatLng: O,
  MapQuest: B,
  Mapbox: C,
  Mapzen: ie,
  Neutrino: K,
  Nominatim: L,
  OpenCage: P,
  OpenLocationCode: j,
  Openrouteservice: S,
  Pelias: m,
  Photon: T,
  What3Words: N,
  arcgis: H,
  azure: V,
  bing: J,
  geocodeEarth: ne,
  geocodingParams: h,
  google: $,
  here: F,
  latLng: Q,
  mapQuest: X,
  mapbox: Z,
  mapzen: re,
  neutrino: Y,
  nominatim: ee,
  openLocationCode: te,
  opencage: se,
  openrouteservice: ae,
  parseLatLng: k,
  pelias: w,
  photon: ce,
  reverseParams: g,
  what3words: le
}, Symbol.toStringTag, { value: "Module" }));
class f {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...e) {
  }
}
Object.assign(f.prototype, n.Control.prototype);
Object.assign(f.prototype, n.Evented.prototype);
class v extends f {
  /**
   * Instantiates a geocoder control (to be invoked using `new`)
   * @param options the options
   */
  constructor(t) {
    super(t);
    l(this, "options", {
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
    });
    l(this, "_alts");
    l(this, "_container");
    l(this, "_errorElement");
    l(this, "_geocodeMarker");
    l(this, "_input");
    l(this, "_lastGeocode");
    l(this, "_map");
    l(this, "_preventBlurCollapse");
    l(this, "_requestCount", 0);
    l(this, "_results");
    l(this, "_selection");
    l(this, "_suggestTimeout");
    n.Util.setOptions(this, t), this.options.geocoder || (this.options.geocoder = new L());
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
    var d;
    const s = "leaflet-control-geocoder", o = n.DomUtil.create("div", s + " leaflet-bar"), r = n.DomUtil.create("button", s + "-icon", o), a = n.DomUtil.create("div", s + "-form", o);
    this._map = t, this._container = o, r.innerHTML = "&nbsp;", r.type = "button", r.setAttribute("aria-label", this.options.iconLabel);
    const c = this._input = n.DomUtil.create("input", "", a);
    return c.type = "search", c.value = this.options.query, c.placeholder = this.options.placeholder, n.DomEvent.disableClickPropagation(c), this._errorElement = n.DomUtil.create("div", s + "-form-no-error", o), this._errorElement.innerHTML = this.options.errorMessage, this._alts = n.DomUtil.create(
      "ul",
      s + "-alternatives leaflet-control-geocoder-alternatives-minimized",
      o
    ), n.DomEvent.disableClickPropagation(this._alts), n.DomEvent.addListener(c, "keydown", this._keydown, this), (d = this.options.geocoder) != null && d.suggest && n.DomEvent.addListener(c, "input", this._change, this), n.DomEvent.addListener(c, "blur", () => {
      this.options.collapsed && !this._preventBlurCollapse && this._collapse(), this._preventBlurCollapse = !1;
    }), this.options.collapsed ? this.options.expand === "click" ? n.DomEvent.addListener(o, "click", (u) => {
      u.button === 0 && u.detail !== 2 && this._toggle();
    }) : this.options.expand === "touch" ? n.DomEvent.addListener(
      o,
      n.Browser.touch ? "touchstart mousedown" : "mousedown",
      (u) => {
        this._toggle(), u.preventDefault(), u.stopPropagation();
      },
      this
    ) : (n.DomEvent.addListener(o, "mouseover", this._expand, this), n.DomEvent.addListener(o, "mouseout", this._collapse, this), this._map.on("movestart", this._collapse, this)) : (this._expand(), n.Browser.touch ? n.DomEvent.addListener(o, "touchstart", () => this._geocode()) : n.DomEvent.addListener(o, "click", () => this._geocode())), this.options.defaultMarkGeocode && this.on("markgeocode", this.markGeocode, this), this.on("startgeocode", this.addThrobberClass, this), this.on("finishgeocode", this.removeThrobberClass, this), this.on("startsuggest", this.addThrobberClass, this), this.on("finishsuggest", this.removeThrobberClass, this), n.DomEvent.disableClickPropagation(o), o;
  }
  /**
   * Sets the query string on the text input
   * @param string the query string
   */
  setQuery(t) {
    return this._input.value = t, this;
  }
  _geocodeResult(t, s) {
    !s && this.options.showUniqueResult && t.length === 1 ? this._geocodeResultSelected(t[0]) : t.length > 0 ? (this._alts.innerHTML = "", this._results = t, this._alts.classList.remove("leaflet-control-geocoder-alternatives-minimized"), this._container.classList.add("leaflet-control-geocoder-options-open"), this._results.forEach((o, r) => this._alts.appendChild(this._createAlt(o, r)))) : (this._container.classList.add("leaflet-control-geocoder-options-error"), this._errorElement.classList.add("leaflet-control-geocoder-error"));
  }
  /**
   * Marks a geocoding result on the map
   * @param result the geocoding result
   */
  markGeocode(t) {
    const s = t.geocode;
    return this._map.fitBounds(s.bbox), this._geocodeMarker && this._map.removeLayer(this._geocodeMarker), this._geocodeMarker = new n.Marker(s.center).bindPopup(s.html || s.name).addTo(this._map).openPopup(), this;
  }
  async _geocode(t = !1) {
    const s = this._input.value;
    if (!t && s.length < this.options.queryMinLength)
      return;
    const o = ++this._requestCount;
    this._lastGeocode = s, t || this._clearResults();
    const r = { input: s };
    this.fire(t ? "startsuggest" : "startgeocode", r);
    const a = { map: this._map }, c = t ? await this.options.geocoder.suggest(s, a) : await this.options.geocoder.geocode(s, a);
    if (o === this._requestCount) {
      const d = { input: s, results: c };
      this.fire(t ? "finishsuggest" : "finishgeocode", d), this._geocodeResult(c, t);
    }
  }
  _geocodeResultSelected(t) {
    const s = { geocode: t };
    this.fire("markgeocode", s);
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
  _createAlt(t, s) {
    const o = n.DomUtil.create("li", ""), r = n.DomUtil.create("a", "", o), a = this.options.showResultIcons && t.icon ? n.DomUtil.create("img", "", r) : null, c = t.html ? void 0 : document.createTextNode(t.name), d = (u) => {
      this._preventBlurCollapse = !0, n.DomEvent.stop(u), this._geocodeResultSelected(t), n.DomEvent.on(o, "click touchend", () => {
        this.options.collapsed ? this._collapse() : this._clearResults();
      });
    };
    return a && (a.src = t.icon), o.setAttribute("data-result-index", String(s)), t.html ? r.innerHTML = r.innerHTML + t.html : c && r.appendChild(c), n.DomEvent.addListener(o, "mousedown touchstart", d, this), o;
  }
  _keydown(t) {
    const s = (o) => {
      this._selection && (this._selection.classList.remove("leaflet-control-geocoder-selected"), this._selection = this._selection[o > 0 ? "nextSibling" : "previousSibling"]), this._selection || (this._selection = this._alts[o > 0 ? "firstChild" : "lastChild"]), this._selection && this._selection.classList.add("leaflet-control-geocoder-selected");
    };
    switch (t.key) {
      case "Escape":
        this.options.collapsed ? this._collapse() : this._clearResults();
        break;
      case "ArrowUp":
        s(-1);
        break;
      case "ArrowDown":
        s(1);
        break;
      case "Enter":
        if (this._selection) {
          const o = parseInt(this._selection.getAttribute("data-result-index"), 10);
          this._geocodeResultSelected(this._results[o]), this._clearResults();
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
function de(i) {
  return new v(i);
}
/* @preserve
 * Leaflet Control Geocoder
 * https://github.com/perliedman/leaflet-control-geocoder
 *
 * Copyright (c) 2012 sa3m (https://github.com/sa3m)
 * Copyright (c) 2018 Per Liedman
 * All rights reserved.
 */
Object.assign(v, pe);
Object.assign(n.Control, {
  Geocoder: v,
  geocoder: de
});
export {
  v as Geocoder,
  v as default,
  de as geocoder,
  pe as geocoders
};
//# sourceMappingURL=Control.Geocoder.modern.js.map
