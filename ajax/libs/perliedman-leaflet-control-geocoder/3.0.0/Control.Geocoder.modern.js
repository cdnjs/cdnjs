var N = Object.defineProperty;
var M = (a, t, o) => t in a ? N(a, t, { enumerable: !0, configurable: !0, writable: !0, value: o }) : a[t] = o;
var p = (a, t, o) => M(a, typeof t != "symbol" ? t + "" : t, o);
import * as s from "leaflet";
function u(a, t) {
  return s.Util.extend(t, a.geocodingQueryParams);
}
function h(a, t) {
  return s.Util.extend(t, a.reverseQueryParams);
}
const j = /[&<>"'`]/g, P = /[&<>"'`]/, G = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#x27;",
  "`": "&#x60;"
};
function A(a) {
  return G[a];
}
function W(a) {
  return a == null ? "" : a ? (a = "" + a, P.test(a) ? a.replace(j, A) : a) : a + "";
}
function d(a, t) {
  const o = { Accept: "application/json" }, e = new URL(a);
  return Object.entries(t).forEach(([n, i]) => {
    (Array.isArray(i) ? i : [i]).forEach((r) => {
      e.searchParams.append(n, r);
    });
  }), fetch(e.toString(), { headers: o }).then((n) => n.json());
}
function I(a, t) {
  return a.replace(/\{ *([\w_]+) *\}/g, (o, e) => {
    let n = t[e];
    return n === void 0 ? n = "" : typeof n == "function" && (n = n(t)), W(n);
  });
}
class L {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer",
      apiKey: ""
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, {
      token: this.options.apiKey,
      SingleLine: t,
      outFields: "Addr_Type",
      forStorage: !1,
      maxLocations: 10,
      f: "json"
    }), e = await d(
      this.options.serviceUrl + "/findAddressCandidates",
      o
    ), n = [];
    if (e.candidates && e.candidates.length)
      for (let i = 0; i <= e.candidates.length - 1; i++) {
        const r = e.candidates[i], l = s.latLng(r.location.y, r.location.x), c = s.latLngBounds(
          s.latLng(r.extent.ymax, r.extent.xmax),
          s.latLng(r.extent.ymin, r.extent.xmin)
        );
        n[i] = {
          name: r.address,
          bbox: c,
          center: l
        };
      }
    return n;
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, o) {
    const e = h(this.options, {
      location: t.lng + "," + t.lat,
      distance: 100,
      f: "json"
    }), n = await d(this.options.serviceUrl + "/reverseGeocode", e), i = [];
    if (n && !n.error) {
      const r = s.latLng(n.location.y, n.location.x), l = s.latLngBounds(r, r);
      i.push({
        name: n.address.Match_addr,
        center: r,
        bbox: l
      });
    }
    return i;
  }
}
function z(a) {
  return new L(a);
}
class y {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://dev.virtualearth.net/REST/v1/Locations/"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, {
      query: t,
      key: this.options.apiKey
    }), e = await d(this.options.serviceUrl, o), n = [];
    if (e.resourceSets.length > 0)
      for (let i = e.resourceSets[0].resources.length - 1; i >= 0; i--) {
        const r = e.resourceSets[0].resources[i], l = r.bbox;
        n[i] = {
          name: r.name,
          bbox: s.latLngBounds([l[0], l[1]], [l[2], l[3]]),
          center: s.latLng(r.point.coordinates)
        };
      }
    return n;
  }
  async reverse(t, o) {
    const e = h(this.options, {
      key: this.options.apiKey
    }), n = await d(
      this.options.serviceUrl + t.lat + "," + t.lng,
      e
    ), i = [];
    for (let r = n.resourceSets[0].resources.length - 1; r >= 0; r--) {
      const l = n.resourceSets[0].resources[r], c = l.bbox;
      i[r] = {
        name: l.name,
        bbox: s.latLngBounds([c[0], c[1]], [c[2], c[3]]),
        center: s.latLng(l.point.coordinates)
      };
    }
    return i;
  }
}
function H(a) {
  return new y(a);
}
class x {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://maps.googleapis.com/maps/api/geocode/json"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, {
      key: this.options.apiKey,
      address: t
    }), e = await d(this.options.serviceUrl, o), n = [];
    if (e.results && e.results.length)
      for (let i = 0; i <= e.results.length - 1; i++) {
        const r = e.results[i], l = s.latLng(r.geometry.location), c = s.latLngBounds(
          s.latLng(r.geometry.viewport.northeast),
          s.latLng(r.geometry.viewport.southwest)
        );
        n[i] = {
          name: r.formatted_address,
          bbox: c,
          center: l,
          properties: r.address_components
        };
      }
    return n;
  }
  async reverse(t, o) {
    const e = h(this.options, {
      key: this.options.apiKey,
      latlng: t.lat + "," + t.lng
    }), n = await d(this.options.serviceUrl, e), i = [];
    if (n.results && n.results.length)
      for (let r = 0; r <= n.results.length - 1; r++) {
        const l = n.results[r], c = s.latLng(l.geometry.location), g = s.latLngBounds(
          s.latLng(l.geometry.viewport.northeast),
          s.latLng(l.geometry.viewport.southwest)
        );
        i[r] = {
          name: l.formatted_address,
          bbox: g,
          center: c,
          properties: l.address_components
        };
      }
    return i;
  }
}
function J(a) {
  return new x(a);
}
class w {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocoder.api.here.com/6.2/",
      app_id: "",
      app_code: "",
      apiKey: "",
      maxResults: 5
    });
    if (s.Util.setOptions(this, t), t != null && t.apiKey) throw Error("apiKey is not supported, use app_id/app_code instead!");
  }
  geocode(t) {
    const o = u(this.options, {
      searchtext: t,
      gen: 9,
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "geocode.json", o);
  }
  reverse(t, o) {
    let e = t.lat + "," + t.lng;
    this.options.reverseGeocodeProxRadius && (e += "," + this.options.reverseGeocodeProxRadius);
    const n = h(this.options, {
      prox: e,
      mode: "retrieveAddresses",
      app_id: this.options.app_id,
      app_code: this.options.app_code,
      gen: 9,
      jsonattributes: 1,
      maxresults: this.options.maxResults
    });
    return this.getJSON(this.options.serviceUrl + "reversegeocode.json", n);
  }
  async getJSON(t, o) {
    const e = await d(t, o), n = [];
    if (e.response.view && e.response.view.length)
      for (let i = 0; i <= e.response.view[0].result.length - 1; i++) {
        const r = e.response.view[0].result[i].location, l = s.latLng(r.displayPosition.latitude, r.displayPosition.longitude), c = s.latLngBounds(
          s.latLng(r.mapView.topLeft.latitude, r.mapView.topLeft.longitude),
          s.latLng(r.mapView.bottomRight.latitude, r.mapView.bottomRight.longitude)
        );
        n[i] = {
          name: r.address.label,
          properties: r.address,
          bbox: c,
          center: l
        };
      }
    return n;
  }
}
class U {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://geocode.search.hereapi.com/v1",
      apiKey: "",
      app_id: "",
      app_code: "",
      maxResults: 10
    });
    s.Util.setOptions(this, t);
  }
  geocode(t) {
    const o = u(this.options, {
      q: t,
      apiKey: this.options.apiKey,
      limit: this.options.maxResults
    });
    if (!o.at && !o.in)
      throw Error(
        "at / in parameters not found. Please define coordinates (at=latitude,longitude) or other (in) in your geocodingQueryParams."
      );
    return this.getJSON(this.options.serviceUrl + "/discover", o);
  }
  reverse(t, o) {
    const e = h(this.options, {
      at: t.lat + "," + t.lng,
      limit: this.options.reverseGeocodeProxRadius,
      apiKey: this.options.apiKey
    });
    return this.getJSON(this.options.serviceUrl + "/revgeocode", e);
  }
  async getJSON(t, o) {
    const e = await d(t, o), n = [];
    if (e.items && e.items.length)
      for (let i = 0; i <= e.items.length - 1; i++) {
        const r = e.items[i], l = s.latLng(r.position.lat, r.position.lng);
        let c;
        r.mapView ? c = s.latLngBounds(
          s.latLng(r.mapView.south, r.mapView.west),
          s.latLng(r.mapView.north, r.mapView.east)
        ) : c = s.latLngBounds(
          s.latLng(r.position.lat, r.position.lng),
          s.latLng(r.position.lat, r.position.lng)
        ), n[i] = {
          name: r.address.label,
          properties: r.address,
          bbox: c,
          center: l
        };
      }
    return n;
  }
}
function q(a) {
  return a != null && a.apiKey ? new U(a) : new w(a);
}
function C(a) {
  let t;
  if (t = a.match(/^([NS])\s*(\d{1,3}(?:\.\d*)?)\W*([EW])\s*(\d{1,3}(?:\.\d*)?)$/))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * +t[2],
      (/E/i.test(t[3]) ? 1 : -1) * +t[4]
    );
  if (t = a.match(/^(\d{1,3}(?:\.\d*)?)\s*([NS])\W*(\d{1,3}(?:\.\d*)?)\s*([EW])$/))
    return s.latLng(
      (/N/i.test(t[2]) ? 1 : -1) * +t[1],
      (/E/i.test(t[4]) ? 1 : -1) * +t[3]
    );
  if (t = a.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?$/
  ))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60),
      (/E/i.test(t[4]) ? 1 : -1) * (+t[5] + +t[6] / 60)
    );
  if (t = a.match(
    /^(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([NS])\W*(\d{1,3})°?\s*(\d{1,3}(?:\.\d*)?)?['′]?\s*([EW])$/
  ))
    return s.latLng(
      (/N/i.test(t[3]) ? 1 : -1) * (+t[1] + +t[2] / 60),
      (/E/i.test(t[6]) ? 1 : -1) * (+t[4] + +t[5] / 60)
    );
  if (t = a.match(
    /^([NS])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\W*([EW])\s*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?$/
  ))
    return s.latLng(
      (/N/i.test(t[1]) ? 1 : -1) * (+t[2] + +t[3] / 60 + +t[4] / 3600),
      (/E/i.test(t[5]) ? 1 : -1) * (+t[6] + +t[7] / 60 + +t[8] / 3600)
    );
  if (t = a.match(
    /^(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]\s*([NS])\W*(\d{1,3})°?\s*(\d{1,2})['′]?\s*(\d{1,3}(?:\.\d*)?)?["″]?\s*([EW])$/
  ))
    return s.latLng(
      (/N/i.test(t[4]) ? 1 : -1) * (+t[1] + +t[2] / 60 + +t[3] / 3600),
      (/E/i.test(t[8]) ? 1 : -1) * (+t[5] + +t[6] / 60 + +t[7] / 3600)
    );
  if (t = a.match(/^\s*([+-]?\d+(?:\.\d*)?)\s*[\s,]\s*([+-]?\d+(?:\.\d*)?)\s*$/))
    return s.latLng(+t[1], +t[2]);
}
class E {
  constructor(t) {
    p(this, "options", {
      next: void 0,
      sizeInMeters: 1e4
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = C(t);
    return o ? [
      {
        name: t,
        center: o,
        bbox: o.toBounds(this.options.sizeInMeters)
      }
    ] : this.options.next ? this.options.next.geocode(t) : [];
  }
}
function V(a) {
  return new E(a);
}
class R {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.mapbox.com/geocoding/v5/mapbox.places/"
    });
    s.Util.setOptions(this, t);
  }
  _getProperties(t) {
    const o = {
      text: t.text,
      address: t.address
    };
    for (let e = 0; e < (t.context || []).length; e++) {
      const n = t.context[e].id.split(".")[0];
      o[n] = t.context[e].text, t.context[e].short_code && (o.countryShortCode = t.context[e].short_code);
    }
    return o;
  }
  async geocode(t) {
    const o = this.options.serviceUrl + encodeURIComponent(t) + ".json", e = u(this.options, {
      access_token: this.options.apiKey
    });
    e.proximity !== void 0 && e.proximity.lat !== void 0 && e.proximity.lng !== void 0 && (e.proximity = e.proximity.lng + "," + e.proximity.lat);
    const n = await d(o, e);
    return this._parseResults(n);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, o) {
    const e = this.options.serviceUrl + t.lng + "," + t.lat + ".json", n = h(this.options, {
      access_token: this.options.apiKey
    }), i = await d(e, n);
    return this._parseResults(i);
  }
  _parseResults(t) {
    var e;
    if (!((e = t.features) != null && e.length))
      return [];
    const o = [];
    for (let n = 0; n <= t.features.length - 1; n++) {
      const i = t.features[n], r = s.latLng(i.center.reverse());
      let l;
      i.bbox ? l = s.latLngBounds(
        s.latLng(i.bbox.slice(0, 2).reverse()),
        s.latLng(i.bbox.slice(2, 4).reverse())
      ) : l = s.latLngBounds(r, r), o[n] = {
        name: i.place_name,
        bbox: l,
        center: r,
        properties: this._getProperties(i)
      };
    }
    return o;
  }
}
function $(a) {
  return new R(a);
}
class D {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://www.mapquestapi.com/geocoding/v1"
    });
    s.Util.setOptions(this, t), this.options.apiKey = decodeURIComponent(this.options.apiKey);
  }
  _formatName(...t) {
    return t.filter((o) => !!o).join(", ");
  }
  async geocode(t) {
    const o = u(this.options, {
      key: this.options.apiKey,
      location: t,
      limit: 5,
      outFormat: "json"
    }), e = await d(this.options.serviceUrl + "/address", o);
    return this._parseResults(e);
  }
  async reverse(t, o) {
    const e = h(this.options, {
      key: this.options.apiKey,
      location: t.lat + "," + t.lng,
      outputFormat: "json"
    }), n = await d(this.options.serviceUrl + "/reverse", e);
    return this._parseResults(n);
  }
  _parseResults(t) {
    const o = [];
    if (t.results && t.results[0].locations)
      for (let e = t.results[0].locations.length - 1; e >= 0; e--) {
        const n = t.results[0].locations[e], i = s.latLng(n.latLng);
        o[e] = {
          name: this._formatName(n.street, n.adminArea4, n.adminArea3, n.adminArea1),
          bbox: s.latLngBounds(i, i),
          center: i
        };
      }
    return o;
  }
}
function F(a) {
  return new D(a);
}
class k {
  constructor(t) {
    p(this, "options", {
      userId: "",
      apiKey: "",
      serviceUrl: "https://neutrinoapi.com/"
    });
    s.Util.setOptions(this, t);
  }
  // https://www.neutrinoapi.com/api/geocode-address/
  async geocode(t) {
    const o = u(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      //get three words and make a dot based string
      address: t.split(/\s+/).join(".")
    }), e = await d(this.options.serviceUrl + "geocode-address", o), n = [];
    if (e.locations) {
      e.geometry = e.locations[0];
      const i = s.latLng(e.geometry.latitude, e.geometry.longitude), r = s.latLngBounds(i, i);
      n[0] = {
        name: e.geometry.address,
        bbox: r,
        center: i
      };
    }
    return n;
  }
  suggest(t) {
    return this.geocode(t);
  }
  // https://www.neutrinoapi.com/api/geocode-reverse/
  async reverse(t, o) {
    const e = h(this.options, {
      apiKey: this.options.apiKey,
      userId: this.options.userId,
      latitude: t.lat,
      longitude: t.lng
    }), n = await d(this.options.serviceUrl + "geocode-reverse", e), i = [];
    if (n.status.status == 200 && n.found) {
      const r = s.latLng(t.lat, t.lng), l = s.latLngBounds(r, r);
      i[0] = {
        name: n.address,
        bbox: l,
        center: r
      };
    }
    return i;
  }
}
function Q(a) {
  return new k(a);
}
class f {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://nominatim.openstreetmap.org/",
      htmlTemplate: function(t) {
        const o = t.address;
        let e;
        const n = [];
        return (o.road || o.building) && n.push("{building} {road} {house_number}"), (o.city || o.town || o.village || o.hamlet) && (e = n.length > 0 ? "leaflet-control-geocoder-address-detail" : "", n.push(
          '<span class="' + e + '">{postcode} {city} {town} {village} {hamlet}</span>'
        )), (o.state || o.country) && (e = n.length > 0 ? "leaflet-control-geocoder-address-context" : "", n.push('<span class="' + e + '">{state} {country}</span>')), I(n.join("<br/>"), o);
      }
    });
    s.Util.setOptions(this, t || {});
  }
  async geocode(t) {
    const o = u(this.options, {
      q: t,
      limit: 5,
      format: "json",
      addressdetails: 1
    }), e = await d(this.options.serviceUrl + "search", o), n = [];
    for (let i = e.length - 1; i >= 0; i--) {
      const r = e[i].boundingbox;
      n[i] = {
        icon: e[i].icon,
        name: e[i].display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(e[i]) : void 0,
        bbox: s.latLngBounds([+r[0], +r[2]], [+r[1], +r[3]]),
        center: s.latLng(+e[i].lat, +e[i].lon),
        properties: e[i]
      };
    }
    return n;
  }
  async reverse(t, o) {
    const e = h(this.options, {
      lat: t.lat,
      lon: t.lng,
      zoom: Math.round(Math.log(o / 256) / Math.log(2)),
      addressdetails: 1,
      format: "json"
    }), n = await d(this.options.serviceUrl + "reverse", e), i = [];
    if (n && n.lat && n.lon) {
      const r = s.latLng(+n.lat, +n.lon), l = s.latLngBounds(r, r);
      i.push({
        name: n.display_name,
        html: this.options.htmlTemplate ? this.options.htmlTemplate(n) : void 0,
        center: r,
        bbox: l,
        properties: n
      });
    }
    return i;
  }
}
function X(a) {
  return new f(a);
}
class B {
  constructor(t) {
    p(this, "options", {});
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    try {
      const o = this.options.OpenLocationCode.decode(t);
      return [{
        name: t,
        center: s.latLng(o.latitudeCenter, o.longitudeCenter),
        bbox: s.latLngBounds(
          s.latLng(o.latitudeLo, o.longitudeLo),
          s.latLng(o.latitudeHi, o.longitudeHi)
        )
      }];
    } catch (o) {
      return console.warn(o), [];
    }
  }
  async reverse(t, o) {
    try {
      return [{
        name: this.options.OpenLocationCode.encode(
          t.lat,
          t.lng,
          this.options.codeLength
        ),
        center: s.latLng(t.lat, t.lng),
        bbox: s.latLngBounds(
          s.latLng(t.lat, t.lng),
          s.latLng(t.lat, t.lng)
        )
      }];
    } catch (e) {
      return console.warn(e), [];
    }
  }
}
function Y(a) {
  return new B(a);
}
class S {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.opencagedata.com/geocode/v1/json"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, {
      key: this.options.apiKey,
      q: t
    }), e = await d(this.options.serviceUrl, o);
    return this._parseResults(e);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, o) {
    const e = h(this.options, {
      key: this.options.apiKey,
      q: [t.lat, t.lng].join(",")
    }), n = await d(this.options.serviceUrl, e);
    return this._parseResults(n);
  }
  _parseResults(t) {
    const o = [];
    if (t.results && t.results.length)
      for (let e = 0; e < t.results.length; e++) {
        const n = t.results[e], i = s.latLng(n.geometry);
        let r;
        n.annotations && n.annotations.bounds ? r = s.latLngBounds(
          s.latLng(n.annotations.bounds.northeast),
          s.latLng(n.annotations.bounds.southwest)
        ) : r = s.latLngBounds(i, i), o.push({
          name: n.formatted,
          bbox: r,
          center: i
        });
      }
    return o;
  }
}
function Z(a) {
  return new S(a);
}
class m {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.geocode.earth/v1"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), e = await d(this.options.serviceUrl + "/search", o);
    return this._parseResults(e, "bbox");
  }
  async suggest(t) {
    const o = u(this.options, {
      api_key: this.options.apiKey,
      text: t
    }), e = await d(this.options.serviceUrl + "/autocomplete", o);
    return this._parseResults(e, "bbox");
  }
  async reverse(t, o) {
    const e = h(this.options, {
      api_key: this.options.apiKey,
      "point.lat": t.lat,
      "point.lon": t.lng
    }), n = await d(this.options.serviceUrl + "/reverse", e);
    return this._parseResults(n, "bounds");
  }
  _parseResults(t, o) {
    const e = [];
    return s.geoJSON(t, {
      pointToLayer(n, i) {
        return s.circleMarker(i);
      },
      onEachFeature(n, i) {
        const r = {};
        let l, c;
        i.getBounds ? (l = i.getBounds(), c = l.getCenter()) : i.feature.bbox ? (c = i.getLatLng(), l = s.latLngBounds(
          s.GeoJSON.coordsToLatLng(i.feature.bbox.slice(0, 2)),
          s.GeoJSON.coordsToLatLng(i.feature.bbox.slice(2, 4))
        )) : (c = i.getLatLng(), l = s.latLngBounds(c, c)), r.name = i.feature.properties.label, r.center = c, r[o] = l, r.properties = i.feature.properties, e.push(r);
      }
    }), e;
  }
}
function _(a) {
  return new m(a);
}
const tt = m, et = _, st = m, ot = _;
class O extends m {
  constructor(t) {
    super(
      s.Util.extend(
        {
          serviceUrl: "https://api.openrouteservice.org/geocode"
        },
        t
      )
    );
  }
}
function nt(a) {
  return new O(a);
}
class K {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://photon.komoot.io/api/",
      reverseUrl: "https://photon.komoot.io/reverse/",
      nameProperties: ["name", "street", "suburb", "hamlet", "town", "city", "state", "country"]
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = u(this.options, { q: t }), e = await d(this.options.serviceUrl, o);
    return this._parseResults(e);
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, o) {
    const e = h(this.options, {
      lat: t.lat,
      lon: t.lng
    }), n = await d(this.options.reverseUrl, e);
    return this._parseResults(n);
  }
  _parseResults(t) {
    var e;
    const o = [];
    if (t && t.features)
      for (let n = 0; n < t.features.length; n++) {
        const i = t.features[n], r = i.geometry.coordinates, l = s.latLng(r[1], r[0]), c = (e = i.properties) == null ? void 0 : e.extent, g = c ? s.latLngBounds([c[1], c[0]], [c[3], c[2]]) : s.latLngBounds(l, l);
        o.push({
          name: this._decodeFeatureName(i),
          html: this.options.htmlTemplate ? this.options.htmlTemplate(i) : void 0,
          center: l,
          bbox: g,
          properties: i.properties
        });
      }
    return o;
  }
  _decodeFeatureName(t) {
    return (this.options.nameProperties || []).map((o) => {
      var e;
      return (e = t.properties) == null ? void 0 : e[o];
    }).filter((o) => !!o).join(", ");
  }
}
function it(a) {
  return new K(a);
}
class T {
  constructor(t) {
    p(this, "options", {
      serviceUrl: "https://api.what3words.com/v2/"
    });
    s.Util.setOptions(this, t);
  }
  async geocode(t) {
    const o = await d(
      this.options.serviceUrl + "forward",
      u(this.options, {
        key: this.options.apiKey,
        //get three words and make a dot based string
        addr: t.split(/\s+/).join(".")
      })
    ), e = [];
    if (o.geometry) {
      const n = s.latLng(o.geometry.lat, o.geometry.lng), i = s.latLngBounds(n, n);
      e[0] = {
        name: o.words,
        bbox: i,
        center: n
      };
    }
    return e;
  }
  suggest(t) {
    return this.geocode(t);
  }
  async reverse(t, o) {
    const e = await d(
      this.options.serviceUrl + "reverse",
      h(this.options, {
        key: this.options.apiKey,
        coords: [t.lat, t.lng].join(",")
      })
    ), n = [];
    if (e.status.status == 200) {
      const i = s.latLng(e.geometry.lat, e.geometry.lng), r = s.latLngBounds(i, i);
      n[0] = {
        name: e.words,
        bbox: r,
        center: i
      };
    }
    return n;
  }
}
function rt(a) {
  return new T(a);
}
const at = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ArcGis: L,
  Bing: y,
  GeocodeEarth: tt,
  Google: x,
  HERE: w,
  HEREv2: U,
  LatLng: E,
  MapQuest: D,
  Mapbox: R,
  Mapzen: st,
  Neutrino: k,
  Nominatim: f,
  OpenCage: S,
  OpenLocationCode: B,
  Openrouteservice: O,
  Pelias: m,
  Photon: K,
  What3Words: T,
  arcgis: z,
  bing: H,
  geocodeEarth: et,
  geocodingParams: u,
  google: J,
  here: q,
  latLng: V,
  mapQuest: F,
  mapbox: $,
  mapzen: ot,
  neutrino: Q,
  nominatim: X,
  openLocationCode: Y,
  opencage: Z,
  openrouteservice: nt,
  parseLatLng: C,
  pelias: _,
  photon: it,
  reverseParams: h,
  what3words: rt
}, Symbol.toStringTag, { value: "Module" }));
class v {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(...t) {
  }
}
s.Util.extend(v.prototype, s.Control.prototype);
s.Util.extend(v.prototype, s.Evented.prototype);
class b extends v {
  /**
   * Instantiates a geocoder control (to be invoked using `new`)
   * @param options the options
   */
  constructor(o) {
    super(o);
    p(this, "options", {
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
    p(this, "_alts");
    p(this, "_container");
    p(this, "_errorElement");
    p(this, "_geocodeMarker");
    p(this, "_input");
    p(this, "_lastGeocode");
    p(this, "_map");
    p(this, "_preventBlurCollapse");
    p(this, "_requestCount", 0);
    p(this, "_results");
    p(this, "_selection");
    p(this, "_suggestTimeout");
    s.Util.setOptions(this, o), this.options.geocoder || (this.options.geocoder = new f());
  }
  addThrobberClass() {
    s.DomUtil.addClass(this._container, "leaflet-control-geocoder-throbber");
  }
  removeThrobberClass() {
    s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-throbber");
  }
  /**
   * Returns the container DOM element for the control and add listeners on relevant map events.
   * @param map the map instance
   * @see https://leafletjs.com/reference.html#control-onadd
   */
  onAdd(o) {
    var c;
    const e = "leaflet-control-geocoder", n = s.DomUtil.create("div", e + " leaflet-bar"), i = s.DomUtil.create("button", e + "-icon", n), r = s.DomUtil.create("div", e + "-form", n);
    this._map = o, this._container = n, i.innerHTML = "&nbsp;", i.type = "button", i.setAttribute("aria-label", this.options.iconLabel);
    const l = this._input = s.DomUtil.create("input", "", r);
    return l.type = "search", l.value = this.options.query, l.placeholder = this.options.placeholder, s.DomEvent.disableClickPropagation(l), this._errorElement = s.DomUtil.create(
      "div",
      e + "-form-no-error",
      n
    ), this._errorElement.innerHTML = this.options.errorMessage, this._alts = s.DomUtil.create(
      "ul",
      e + "-alternatives leaflet-control-geocoder-alternatives-minimized",
      n
    ), s.DomEvent.disableClickPropagation(this._alts), s.DomEvent.addListener(l, "keydown", this._keydown, this), (c = this.options.geocoder) != null && c.suggest && s.DomEvent.addListener(l, "input", this._change, this), s.DomEvent.addListener(l, "blur", () => {
      this.options.collapsed && !this._preventBlurCollapse && this._collapse(), this._preventBlurCollapse = !1;
    }), this.options.collapsed ? this.options.expand === "click" ? s.DomEvent.addListener(n, "click", (g) => {
      g.button === 0 && g.detail !== 2 && this._toggle();
    }) : this.options.expand === "touch" ? s.DomEvent.addListener(
      n,
      s.Browser.touch ? "touchstart mousedown" : "mousedown",
      (g) => {
        this._toggle(), g.preventDefault(), g.stopPropagation();
      },
      this
    ) : (s.DomEvent.addListener(n, "mouseover", this._expand, this), s.DomEvent.addListener(n, "mouseout", this._collapse, this), this._map.on("movestart", this._collapse, this)) : (this._expand(), s.Browser.touch ? s.DomEvent.addListener(n, "touchstart", () => this._geocode()) : s.DomEvent.addListener(n, "click", () => this._geocode())), this.options.defaultMarkGeocode && this.on("markgeocode", this.markGeocode, this), this.on("startgeocode", this.addThrobberClass, this), this.on("finishgeocode", this.removeThrobberClass, this), this.on("startsuggest", this.addThrobberClass, this), this.on("finishsuggest", this.removeThrobberClass, this), s.DomEvent.disableClickPropagation(n), n;
  }
  /**
   * Sets the query string on the text input
   * @param string the query string
   */
  setQuery(o) {
    return this._input.value = o, this;
  }
  _geocodeResult(o, e) {
    if (!e && this.options.showUniqueResult && o.length === 1)
      this._geocodeResultSelected(o[0]);
    else if (o.length > 0) {
      this._alts.innerHTML = "", this._results = o, s.DomUtil.removeClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), s.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-open");
      for (let n = 0; n < o.length; n++)
        this._alts.appendChild(this._createAlt(o[n], n));
    } else
      s.DomUtil.addClass(this._container, "leaflet-control-geocoder-options-error"), s.DomUtil.addClass(this._errorElement, "leaflet-control-geocoder-error");
  }
  /**
   * Marks a geocoding result on the map
   * @param result the geocoding result
   */
  markGeocode(o) {
    const e = o.geocode;
    return this._map.fitBounds(e.bbox), this._geocodeMarker && this._map.removeLayer(this._geocodeMarker), this._geocodeMarker = new s.Marker(e.center).bindPopup(e.html || e.name).addTo(this._map).openPopup(), this;
  }
  async _geocode(o = !1) {
    const e = this._input.value;
    if (!o && e.length < this.options.queryMinLength)
      return;
    const n = ++this._requestCount;
    this._lastGeocode = e, o || this._clearResults();
    const i = { input: e };
    this.fire(o ? "startsuggest" : "startgeocode", i);
    const r = o ? await this.options.geocoder.suggest(e) : await this.options.geocoder.geocode(e);
    if (n === this._requestCount) {
      const l = { input: e, results: r };
      this.fire(o ? "finishsuggest" : "finishgeocode", l), this._geocodeResult(r, o);
    }
  }
  _geocodeResultSelected(o) {
    const e = { geocode: o };
    this.fire("markgeocode", e);
  }
  _toggle() {
    s.DomUtil.hasClass(this._container, "leaflet-control-geocoder-expanded") ? this._collapse() : this._expand();
  }
  _expand() {
    s.DomUtil.addClass(this._container, "leaflet-control-geocoder-expanded"), this._input.select(), this.fire("expand");
  }
  _collapse() {
    s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-expanded"), s.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), s.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error"), this._input.blur(), this.fire("collapse");
  }
  _clearResults() {
    s.DomUtil.addClass(this._alts, "leaflet-control-geocoder-alternatives-minimized"), this._selection = null, s.DomUtil.removeClass(this._errorElement, "leaflet-control-geocoder-error"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-open"), s.DomUtil.removeClass(this._container, "leaflet-control-geocoder-options-error");
  }
  _createAlt(o, e) {
    const n = s.DomUtil.create("li", ""), i = s.DomUtil.create("a", "", n), r = this.options.showResultIcons && o.icon ? s.DomUtil.create("img", "", i) : null, l = o.html ? void 0 : document.createTextNode(o.name), c = (g) => {
      this._preventBlurCollapse = !0, s.DomEvent.stop(g), this._geocodeResultSelected(o), s.DomEvent.on(n, "click touchend", () => {
        this.options.collapsed ? this._collapse() : this._clearResults();
      });
    };
    return r && (r.src = o.icon), n.setAttribute("data-result-index", String(e)), o.html ? i.innerHTML = i.innerHTML + o.html : l && i.appendChild(l), s.DomEvent.addListener(n, "mousedown touchstart", c, this), n;
  }
  _keydown(o) {
    const e = (n) => {
      this._selection && (s.DomUtil.removeClass(this._selection, "leaflet-control-geocoder-selected"), this._selection = this._selection[n > 0 ? "nextSibling" : "previousSibling"]), this._selection || (this._selection = this._alts[n > 0 ? "firstChild" : "lastChild"]), this._selection && s.DomUtil.addClass(this._selection, "leaflet-control-geocoder-selected");
    };
    switch (o.keyCode) {
      // Escape
      case 27:
        this.options.collapsed ? this._collapse() : this._clearResults();
        break;
      // Up
      case 38:
        e(-1);
        break;
      // Up
      case 40:
        e(1);
        break;
      // Enter
      case 13:
        if (this._selection) {
          const n = parseInt(this._selection.getAttribute("data-result-index"), 10);
          this._geocodeResultSelected(this._results[n]), this._clearResults();
        } else
          this._geocode();
        break;
      default:
        return;
    }
    s.DomEvent.preventDefault(o);
  }
  _change() {
    const o = this._input.value;
    o !== this._lastGeocode && (clearTimeout(this._suggestTimeout), o.length >= this.options.suggestMinLength ? this._suggestTimeout = setTimeout(() => this._geocode(!0), this.options.suggestTimeout) : this._clearResults());
  }
}
function lt(a) {
  return new b(a);
}
/* @preserve
 * Leaflet Control Geocoder
 * https://github.com/perliedman/leaflet-control-geocoder
 *
 * Copyright (c) 2012 sa3m (https://github.com/sa3m)
 * Copyright (c) 2018 Per Liedman
 * All rights reserved.
 */
s.Util.extend(b, at);
s.Util.extend(s.Control, {
  Geocoder: b,
  geocoder: lt
});
export {
  b as Geocoder,
  b as default,
  lt as geocoder,
  at as geocoders
};
//# sourceMappingURL=Control.Geocoder.modern.js.map
