class u {
  constructor() {
    this.notificationCreatedEvent = ".Illuminate\\Notifications\\Events\\BroadcastNotificationCreated";
  }
  /**
   * Listen for a whisper event on the channel instance.
   */
  listenForWhisper(e, t) {
    return this.listen(".client-" + e, t);
  }
  /**
   * Listen for an event on the channel instance.
   */
  notification(e) {
    return this.listen(this.notificationCreatedEvent, e);
  }
  /**
   * Stop listening for notification events on the channel instance.
   */
  stopListeningForNotification(e) {
    return this.stopListening(this.notificationCreatedEvent, e);
  }
  /**
   * Stop listening for a whisper event on the channel instance.
   */
  stopListeningForWhisper(e, t) {
    return this.stopListening(".client-" + e, t);
  }
}
class d {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.namespace = e;
  }
  /**
   * Format the given event name.
   */
  format(e) {
    return [".", "\\"].includes(e.charAt(0)) ? e.substring(1) : (this.namespace && (e = this.namespace + "." + e), e.replace(/\./g, "\\"));
  }
  /**
   * Set the event namespace.
   */
  setNamespace(e) {
    this.namespace = e;
  }
}
function w(n) {
  try {
    new n();
  } catch (e) {
    if (e instanceof Error && e.message.includes("is not a constructor"))
      return !1;
  }
  return !0;
}
class l extends u {
  /**
   * Create a new class instance.
   */
  constructor(e, t, s) {
    super(), this.name = t, this.pusher = e, this.options = s, this.eventFormatter = new d(this.options.namespace), this.subscribe();
  }
  /**
   * Subscribe to a Pusher channel.
   */
  subscribe() {
    this.subscription = this.pusher.subscribe(this.name);
  }
  /**
   * Unsubscribe from a Pusher channel.
   */
  unsubscribe() {
    this.pusher.unsubscribe(this.name);
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, t) {
    return this.on(this.eventFormatter.format(e), t), this;
  }
  /**
   * Listen for all events on the channel instance.
   */
  listenToAll(e) {
    return this.subscription.bind_global((t, s) => {
      if (t.startsWith("pusher:"))
        return;
      let r = String(this.options.namespace ?? "").replace(
        /\./g,
        "\\"
      ), a = t.startsWith(r) ? t.substring(r.length + 1) : "." + t;
      e(a, s);
    }), this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, t) {
    return t ? this.subscription.unbind(
      this.eventFormatter.format(e),
      t
    ) : this.subscription.unbind(this.eventFormatter.format(e)), this;
  }
  /**
   * Stop listening for all events on the channel instance.
   */
  stopListeningToAll(e) {
    return e ? this.subscription.unbind_global(e) : this.subscription.unbind_global(), this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this.on("pusher:subscription_succeeded", () => {
      e();
    }), this;
  }
  /**
   * Register a callback to be called anytime a subscription error occurs.
   */
  error(e) {
    return this.on("pusher:subscription_error", (t) => {
      e(t);
    }), this;
  }
  /**
   * Bind a channel to an event.
   */
  on(e, t) {
    return this.subscription.bind(e, t), this;
  }
}
class f extends l {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      t
    ), this;
  }
}
class g extends l {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      t
    ), this;
  }
}
class y extends f {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this.on("pusher:subscription_succeeded", (t) => {
      e(Object.keys(t.members).map((s) => t.members[s]));
    }), this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this.on("pusher:member_added", (t) => {
      e(t.info);
    }), this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this.pusher.channels.channels[this.name].trigger(
      `client-${e}`,
      t
    ), this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this.on("pusher:member_removed", (t) => {
      e(t.info);
    }), this;
  }
}
class b extends u {
  /**
   * Create a new class instance.
   */
  constructor(e, t, s) {
    super(), this.events = {}, this.listeners = {}, this.name = t, this.socket = e, this.options = s, this.eventFormatter = new d(this.options.namespace), this.subscribe();
  }
  /**
   * Subscribe to a Socket.io channel.
   */
  subscribe() {
    this.socket.emit("subscribe", {
      channel: this.name,
      auth: this.options.auth || {}
    });
  }
  /**
   * Unsubscribe from channel and ubind event callbacks.
   */
  unsubscribe() {
    this.unbind(), this.socket.emit("unsubscribe", {
      channel: this.name,
      auth: this.options.auth || {}
    });
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, t) {
    return this.on(this.eventFormatter.format(e), t), this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, t) {
    return this.unbindEvent(this.eventFormatter.format(e), t), this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this.on("connect", (t) => {
      e(t);
    }), this;
  }
  /**
   * Register a callback to be called anytime an error occurs.
   */
  error(e) {
    return this;
  }
  /**
   * Bind the channel's socket to an event and store the callback.
   */
  on(e, t) {
    return this.listeners[e] = this.listeners[e] || [], this.events[e] || (this.events[e] = (s, r) => {
      this.name === s && this.listeners[e] && this.listeners[e].forEach((a) => a(r));
    }, this.socket.on(e, this.events[e])), this.listeners[e].push(t), this;
  }
  /**
   * Unbind the channel's socket from all stored event callbacks.
   */
  unbind() {
    Object.keys(this.events).forEach((e) => {
      this.unbindEvent(e);
    });
  }
  /**
   * Unbind the listeners for the given event.
   */
  unbindEvent(e, t) {
    this.listeners[e] = this.listeners[e] || [], t && (this.listeners[e] = this.listeners[e].filter(
      (s) => s !== t
    )), (!t || this.listeners[e].length === 0) && (this.events[e] && (this.socket.removeListener(e, this.events[e]), delete this.events[e]), delete this.listeners[e]);
  }
}
class v extends b {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this.socket.emit("client event", {
      channel: this.name,
      event: `client-${e}`,
      data: t
    }), this;
  }
}
class m extends v {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this.on("presence:subscribed", (t) => {
      e(t.map((s) => s.user_info));
    }), this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this.on(
      "presence:joining",
      (t) => e(t.user_info)
    ), this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this.socket.emit("client event", {
      channel: this.name,
      event: `client-${e}`,
      data: t
    }), this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this.on(
      "presence:leaving",
      (t) => e(t.user_info)
    ), this;
  }
}
class h extends u {
  /**
   * Subscribe to a channel.
   */
  subscribe() {
  }
  /**
   * Unsubscribe from a channel.
   */
  unsubscribe() {
  }
  /**
   * Listen for an event on the channel instance.
   */
  listen(e, t) {
    return this;
  }
  /**
   * Listen for all events on the channel instance.
   */
  listenToAll(e) {
    return this;
  }
  /**
   * Stop listening for an event on the channel instance.
   */
  stopListening(e, t) {
    return this;
  }
  /**
   * Register a callback to be called anytime a subscription succeeds.
   */
  subscribed(e) {
    return this;
  }
  /**
   * Register a callback to be called anytime an error occurs.
   */
  error(e) {
    return this;
  }
  /**
   * Bind a channel to an event.
   */
  on(e, t) {
    return this;
  }
}
class k extends h {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this;
  }
}
class C extends h {
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this;
  }
}
class _ extends k {
  /**
   * Register a callback to be called anytime the member list changes.
   */
  here(e) {
    return this;
  }
  /**
   * Listen for someone joining the channel.
   */
  joining(e) {
    return this;
  }
  /**
   * Send a whisper event to other clients in the channel.
   */
  whisper(e, t) {
    return this;
  }
  /**
   * Listen for someone leaving the channel.
   */
  leaving(e) {
    return this;
  }
}
const c = class c {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.setOptions(e), this.connect();
  }
  /**
   * Merge the custom options with the defaults.
   */
  setOptions(e) {
    this.options = {
      ...c._defaultOptions,
      ...e,
      broadcaster: e.broadcaster
    };
    let t = this.csrfToken();
    t && (this.options.auth.headers["X-CSRF-TOKEN"] = t, this.options.userAuthentication.headers["X-CSRF-TOKEN"] = t), t = this.options.bearerToken, t && (this.options.auth.headers.Authorization = "Bearer " + t, this.options.userAuthentication.headers.Authorization = "Bearer " + t);
  }
  /**
   * Extract the CSRF token from the page.
   */
  csrfToken() {
    var e, t;
    return typeof window < "u" && ((e = window.Laravel) != null && e.csrfToken) ? window.Laravel.csrfToken : this.options.csrfToken ? this.options.csrfToken : typeof document < "u" && typeof document.querySelector == "function" ? ((t = document.querySelector('meta[name="csrf-token"]')) == null ? void 0 : t.getAttribute("content")) ?? null : null;
  }
};
c._defaultOptions = {
  auth: {
    headers: {}
  },
  authEndpoint: "/broadcasting/auth",
  userAuthentication: {
    endpoint: "/broadcasting/user-auth",
    headers: {}
  },
  csrfToken: null,
  bearerToken: null,
  host: null,
  key: null,
  namespace: "App.Events"
};
let i = c;
class o extends i {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh Pusher connection.
   */
  connect() {
    if (typeof this.options.client < "u")
      this.pusher = this.options.client;
    else if (this.options.Pusher)
      this.pusher = new this.options.Pusher(
        this.options.key,
        this.options
      );
    else if (typeof window < "u" && typeof window.Pusher < "u")
      this.pusher = new window.Pusher(this.options.key, this.options);
    else
      throw new Error(
        "Pusher client not found. Should be globally available or passed via options.client"
      );
  }
  /**
   * Sign in the user via Pusher user authentication (https://pusher.com/docs/channels/using_channels/user-authentication/).
   */
  signin() {
    this.pusher.signin();
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, t, s) {
    return this.channel(e).listen(t, s);
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.channels[e] || (this.channels[e] = new l(
      this.pusher,
      e,
      this.options
    )), this.channels[e];
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return this.channels["private-" + e] || (this.channels["private-" + e] = new f(
      this.pusher,
      "private-" + e,
      this.options
    )), this.channels["private-" + e];
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivateChannel(e) {
    return this.channels["private-encrypted-" + e] || (this.channels["private-encrypted-" + e] = new g(
      this.pusher,
      "private-encrypted-" + e,
      this.options
    )), this.channels["private-encrypted-" + e];
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return this.channels["presence-" + e] || (this.channels["presence-" + e] = new y(
      this.pusher,
      "presence-" + e,
      this.options
    )), this.channels["presence-" + e];
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    [
      e,
      "private-" + e,
      "private-encrypted-" + e,
      "presence-" + e
    ].forEach((s) => {
      this.leaveChannel(s);
    });
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]);
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return this.pusher.connection.socket_id;
  }
  /**
   * Disconnect Pusher connection.
   */
  disconnect() {
    this.pusher.disconnect();
  }
}
class I extends i {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh Socket.io connection.
   */
  connect() {
    let e = this.getSocketIO();
    this.socket = e(
      this.options.host ?? void 0,
      this.options
    ), this.socket.io.on("reconnect", () => {
      Object.values(this.channels).forEach((t) => {
        t.subscribe();
      });
    });
  }
  /**
   * Get socket.io module from global scope or options.
   */
  getSocketIO() {
    if (typeof this.options.client < "u")
      return this.options.client;
    if (typeof window < "u" && typeof window.io < "u")
      return window.io;
    throw new Error(
      "Socket.io client not found. Should be globally available or passed via options.client"
    );
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, t, s) {
    return this.channel(e).listen(t, s);
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.channels[e] || (this.channels[e] = new b(
      this.socket,
      e,
      this.options
    )), this.channels[e];
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return this.channels["private-" + e] || (this.channels["private-" + e] = new v(
      this.socket,
      "private-" + e,
      this.options
    )), this.channels["private-" + e];
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return this.channels["presence-" + e] || (this.channels["presence-" + e] = new m(
      this.socket,
      "presence-" + e,
      this.options
    )), this.channels["presence-" + e];
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    [e, "private-" + e, "presence-" + e].forEach((s) => {
      this.leaveChannel(s);
    });
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.channels[e] && (this.channels[e].unsubscribe(), delete this.channels[e]);
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return this.socket.id;
  }
  /**
   * Disconnect Socketio connection.
   */
  disconnect() {
    this.socket.disconnect();
  }
}
class p extends i {
  constructor() {
    super(...arguments), this.channels = {};
  }
  /**
   * Create a fresh connection.
   */
  connect() {
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, t, s) {
    return new h();
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return new h();
  }
  /**
   * Get a private channel instance by name.
   */
  privateChannel(e) {
    return new k();
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivateChannel(e) {
    return new C();
  }
  /**
   * Get a presence channel instance by name.
   */
  presenceChannel(e) {
    return new _();
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
  }
  /**
   * Get the socket ID for the connection.
   */
  socketId() {
    return "fake-socket-id";
  }
  /**
   * Disconnect the connection.
   */
  disconnect() {
  }
}
class E {
  /**
   * Create a new class instance.
   */
  constructor(e) {
    this.options = e, this.connect(), this.options.withoutInterceptors || this.registerInterceptors();
  }
  /**
   * Get a channel instance by name.
   */
  channel(e) {
    return this.connector.channel(e);
  }
  /**
   * Create a new connection.
   */
  connect() {
    if (this.options.broadcaster === "reverb")
      this.connector = new o({
        ...this.options,
        cluster: ""
      });
    else if (this.options.broadcaster === "pusher")
      this.connector = new o(this.options);
    else if (this.options.broadcaster === "ably")
      this.connector = new o({
        ...this.options,
        cluster: "",
        broadcaster: "pusher"
      });
    else if (this.options.broadcaster === "socket.io")
      this.connector = new I(this.options);
    else if (this.options.broadcaster === "null")
      this.connector = new p(this.options);
    else if (typeof this.options.broadcaster == "function" && w(this.options.broadcaster))
      this.connector = new this.options.broadcaster(this.options);
    else
      throw new Error(
        `Broadcaster ${typeof this.options.broadcaster} ${String(this.options.broadcaster)} is not supported.`
      );
  }
  /**
   * Disconnect from the Echo server.
   */
  disconnect() {
    this.connector.disconnect();
  }
  /**
   * Get a presence channel instance by name.
   */
  join(e) {
    return this.connector.presenceChannel(e);
  }
  /**
   * Leave the given channel, as well as its private and presence variants.
   */
  leave(e) {
    this.connector.leave(e);
  }
  /**
   * Leave the given channel.
   */
  leaveChannel(e) {
    this.connector.leaveChannel(e);
  }
  /**
   * Leave all channels.
   */
  leaveAllChannels() {
    for (const e in this.connector.channels)
      this.leaveChannel(e);
  }
  /**
   * Listen for an event on a channel instance.
   */
  listen(e, t, s) {
    return this.connector.listen(e, t, s);
  }
  /**
   * Get a private channel instance by name.
   */
  private(e) {
    return this.connector.privateChannel(e);
  }
  /**
   * Get a private encrypted channel instance by name.
   */
  encryptedPrivate(e) {
    if (this.connectorSupportsEncryptedPrivateChannels(this.connector))
      return this.connector.encryptedPrivateChannel(e);
    throw new Error(
      `Broadcaster ${typeof this.options.broadcaster} ${String(
        this.options.broadcaster
      )} does not support encrypted private channels.`
    );
  }
  connectorSupportsEncryptedPrivateChannels(e) {
    return e instanceof o || e instanceof p;
  }
  /**
   * Get the Socket ID for the connection.
   */
  socketId() {
    return this.connector.socketId();
  }
  /**
   * Register 3rd party request interceptiors. These are used to automatically
   * send a connections socket id to a Laravel app with a X-Socket-Id header.
   */
  registerInterceptors() {
    typeof Vue < "u" && (Vue != null && Vue.http) && this.registerVueRequestInterceptor(), typeof axios == "function" && this.registerAxiosRequestInterceptor(), typeof jQuery == "function" && this.registerjQueryAjaxSetup(), typeof Turbo == "object" && this.registerTurboRequestInterceptor();
  }
  /**
   * Register a Vue HTTP interceptor to add the X-Socket-ID header.
   */
  registerVueRequestInterceptor() {
    Vue.http.interceptors.push(
      (e, t) => {
        this.socketId() && e.headers.set("X-Socket-ID", this.socketId()), t();
      }
    );
  }
  /**
   * Register an Axios HTTP interceptor to add the X-Socket-ID header.
   */
  registerAxiosRequestInterceptor() {
    axios.interceptors.request.use(
      (e) => (this.socketId() && (e.headers["X-Socket-Id"] = this.socketId()), e)
    );
  }
  /**
   * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
   */
  registerjQueryAjaxSetup() {
    typeof jQuery.ajax < "u" && jQuery.ajaxPrefilter(
      (e, t, s) => {
        this.socketId() && s.setRequestHeader("X-Socket-Id", this.socketId());
      }
    );
  }
  /**
   * Register the Turbo Request interceptor to add the X-Socket-ID header.
   */
  registerTurboRequestInterceptor() {
    document.addEventListener(
      "turbo:before-fetch-request",
      (e) => {
        e.detail.fetchOptions.headers["X-Socket-Id"] = this.socketId();
      }
    );
  }
}
export {
  u as Channel,
  i as Connector,
  d as EventFormatter,
  E as default
};
//# sourceMappingURL=echo.js.map
