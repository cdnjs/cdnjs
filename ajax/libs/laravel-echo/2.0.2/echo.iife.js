var Echo = (function () {
    'use strict';

    /**
     * This class represents a basic channel.
     */
    class Channel {
      /**
       * Listen for a whisper event on the channel instance.
       */
      listenForWhisper(event, callback) {
        return this.listen('.client-' + event, callback);
      }
      /**
       * Listen for an event on the channel instance.
       */
      notification(callback) {
        return this.listen('.Illuminate\\Notifications\\Events\\BroadcastNotificationCreated', callback);
      }
      /**
       * Stop listening for a whisper event on the channel instance.
       */
      stopListeningForWhisper(event, callback) {
        return this.stopListening('.client-' + event, callback);
      }
    }

    /**
     * Event name formatter
     */
    class EventFormatter {
      /**
       * Create a new class instance.
       */
      constructor(namespace) {
        this.namespace = namespace;
        //
      }
      /**
       * Format the given event name.
       */
      format(event) {
        if (['.', '\\'].includes(event.charAt(0))) {
          return event.substring(1);
        } else if (this.namespace) {
          event = this.namespace + '.' + event;
        }
        return event.replace(/\./g, '\\');
      }
      /**
       * Set the event namespace.
       */
      setNamespace(value) {
        this.namespace = value;
      }
    }

    function isConstructor(obj) {
      try {
        new obj();
      } catch (err) {
        if (err instanceof Error && err.message.includes('is not a constructor')) {
          return false;
        }
      }
      return true;
    }

    /**
     * This class represents a Pusher channel.
     */
    class PusherChannel extends Channel {
      /**
       * Create a new class instance.
       */
      constructor(pusher, name, options) {
        super();
        this.name = name;
        this.pusher = pusher;
        this.options = options;
        this.eventFormatter = new EventFormatter(this.options.namespace);
        this.subscribe();
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
      listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Listen for all events on the channel instance.
       */
      listenToAll(callback) {
        this.subscription.bind_global((event, data) => {
          if (event.startsWith('pusher:')) {
            return;
          }
          let namespace = String(this.options.namespace ?? '').replace(/\./g, '\\');
          let formattedEvent = event.startsWith(namespace) ? event.substring(namespace.length + 1) : '.' + event;
          callback(formattedEvent, data);
        });
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
      stopListening(event, callback) {
        if (callback) {
          this.subscription.unbind(this.eventFormatter.format(event), callback);
        } else {
          this.subscription.unbind(this.eventFormatter.format(event));
        }
        return this;
      }
      /**
       * Stop listening for all events on the channel instance.
       */
      stopListeningToAll(callback) {
        if (callback) {
          this.subscription.unbind_global(callback);
        } else {
          this.subscription.unbind_global();
        }
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
      subscribed(callback) {
        this.on('pusher:subscription_succeeded', () => {
          callback();
        });
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription error occurs.
       */
      error(callback) {
        this.on('pusher:subscription_error', status => {
          callback(status);
        });
        return this;
      }
      /**
       * Bind a channel to an event.
       */
      on(event, callback) {
        this.subscription.bind(event, callback);
        return this;
      }
    }

    /**
     * This class represents a Pusher private channel.
     */
    class PusherPrivateChannel extends PusherChannel {
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
      }
    }

    /**
     * This class represents a Pusher private channel.
     */
    class PusherEncryptedPrivateChannel extends PusherChannel {
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
      }
    }

    /**
     * This class represents a Pusher presence channel.
     */
    class PusherPresenceChannel extends PusherPrivateChannel {
      /**
       * Register a callback to be called anytime the member list changes.
       */
      here(callback) {
        this.on('pusher:subscription_succeeded', data => {
          callback(Object.keys(data.members).map(k => data.members[k]));
        });
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
      joining(callback) {
        this.on('pusher:member_added', member => {
          callback(member.info);
        });
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(eventName, data) {
        this.pusher.channels.channels[this.name].trigger(`client-${eventName}`, data);
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
      leaving(callback) {
        this.on('pusher:member_removed', member => {
          callback(member.info);
        });
        return this;
      }
    }

    /**
     * This class represents a Socket.io channel.
     */
    class SocketIoChannel extends Channel {
      /**
       * Create a new class instance.
       */
      constructor(socket, name, options) {
        super();
        /**
         * The event callbacks applied to the socket.
         */
        this.events = {};
        /**
         * User supplied callbacks for events on this channel.
         */
        this.listeners = {};
        this.name = name;
        this.socket = socket;
        this.options = options;
        this.eventFormatter = new EventFormatter(this.options.namespace);
        this.subscribe();
      }
      /**
       * Subscribe to a Socket.io channel.
       */
      subscribe() {
        this.socket.emit('subscribe', {
          channel: this.name,
          auth: this.options.auth || {}
        });
      }
      /**
       * Unsubscribe from channel and ubind event callbacks.
       */
      unsubscribe() {
        this.unbind();
        this.socket.emit('unsubscribe', {
          channel: this.name,
          auth: this.options.auth || {}
        });
      }
      /**
       * Listen for an event on the channel instance.
       */
      listen(event, callback) {
        this.on(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
      stopListening(event, callback) {
        this.unbindEvent(this.eventFormatter.format(event), callback);
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
      subscribed(callback) {
        this.on('connect', socket => {
          callback(socket);
        });
        return this;
      }
      /**
       * Register a callback to be called anytime an error occurs.
       */
      error(_callback) {
        return this;
      }
      /**
       * Bind the channel's socket to an event and store the callback.
       */
      on(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        if (!this.events[event]) {
          this.events[event] = (channel, data) => {
            if (this.name === channel && this.listeners[event]) {
              this.listeners[event].forEach(cb => cb(data));
            }
          };
          this.socket.on(event, this.events[event]);
        }
        this.listeners[event].push(callback);
        return this;
      }
      /**
       * Unbind the channel's socket from all stored event callbacks.
       */
      unbind() {
        Object.keys(this.events).forEach(event => {
          this.unbindEvent(event);
        });
      }
      /**
       * Unbind the listeners for the given event.
       */
      unbindEvent(event, callback) {
        this.listeners[event] = this.listeners[event] || [];
        if (callback) {
          this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
        }
        if (!callback || this.listeners[event].length === 0) {
          if (this.events[event]) {
            this.socket.removeListener(event, this.events[event]);
            delete this.events[event];
          }
          delete this.listeners[event];
        }
      }
    }

    /**
     * This class represents a Socket.io private channel.
     */
    class SocketIoPrivateChannel extends SocketIoChannel {
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(eventName, data) {
        this.socket.emit('client event', {
          channel: this.name,
          event: `client-${eventName}`,
          data: data
        });
        return this;
      }
    }

    /**
     * This class represents a Socket.io presence channel.
     */
    class SocketIoPresenceChannel extends SocketIoPrivateChannel {
      /**
       * Register a callback to be called anytime the member list changes.
       */
      here(callback) {
        this.on('presence:subscribed', members => {
          callback(members.map(m => m.user_info));
        });
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
      joining(callback) {
        this.on('presence:joining', member => callback(member.user_info));
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(eventName, data) {
        this.socket.emit('client event', {
          channel: this.name,
          event: `client-${eventName}`,
          data: data
        });
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
      leaving(callback) {
        this.on('presence:leaving', member => callback(member.user_info));
        return this;
      }
    }

    /**
     * This class represents a null channel.
     */
    class NullChannel extends Channel {
      /**
       * Subscribe to a channel.
       */
      subscribe() {
        //
      }
      /**
       * Unsubscribe from a channel.
       */
      unsubscribe() {
        //
      }
      /**
       * Listen for an event on the channel instance.
       */
      listen(_event, _callback) {
        return this;
      }
      /**
       * Listen for all events on the channel instance.
       */
      listenToAll(_callback) {
        return this;
      }
      /**
       * Stop listening for an event on the channel instance.
       */
      stopListening(_event, _callback) {
        return this;
      }
      /**
       * Register a callback to be called anytime a subscription succeeds.
       */
      subscribed(_callback) {
        return this;
      }
      /**
       * Register a callback to be called anytime an error occurs.
       */
      error(_callback) {
        return this;
      }
      /**
       * Bind a channel to an event.
       */
      on(_event, _callback) {
        return this;
      }
    }

    /**
     * This class represents a null private channel.
     */
    class NullPrivateChannel extends NullChannel {
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(_eventName, _data) {
        return this;
      }
    }

    /**
     * This class represents a null private channel.
     */
    class NullEncryptedPrivateChannel extends NullChannel {
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(_eventName, _data) {
        return this;
      }
    }

    /**
     * This class represents a null presence channel.
     */
    class NullPresenceChannel extends NullPrivateChannel {
      /**
       * Register a callback to be called anytime the member list changes.
       */
      here(_callback) {
        return this;
      }
      /**
       * Listen for someone joining the channel.
       */
      joining(_callback) {
        return this;
      }
      /**
       * Send a whisper event to other clients in the channel.
       */
      whisper(_eventName, _data) {
        return this;
      }
      /**
       * Listen for someone leaving the channel.
       */
      leaving(_callback) {
        return this;
      }
    }

    class Connector {
      /**
       * Create a new class instance.
       */
      constructor(options) {
        this.setOptions(options);
        this.connect();
      }
      /**
       * Merge the custom options with the defaults.
       */
      setOptions(options) {
        this.options = {
          ...Connector._defaultOptions,
          ...options,
          broadcaster: options.broadcaster
        };
        let token = this.csrfToken();
        if (token) {
          this.options.auth.headers['X-CSRF-TOKEN'] = token;
          this.options.userAuthentication.headers['X-CSRF-TOKEN'] = token;
        }
        token = this.options.bearerToken;
        if (token) {
          this.options.auth.headers['Authorization'] = 'Bearer ' + token;
          this.options.userAuthentication.headers['Authorization'] = 'Bearer ' + token;
        }
      }
      /**
       * Extract the CSRF token from the page.
       */
      csrfToken() {
        let selector;
        if (typeof window !== 'undefined' && typeof window.Laravel !== 'undefined' && window.Laravel.csrfToken) {
          return window.Laravel.csrfToken;
        }
        if (this.options.csrfToken) {
          return this.options.csrfToken;
        }
        if (typeof document !== 'undefined' && typeof document.querySelector === 'function' && (selector = document.querySelector('meta[name="csrf-token"]'))) {
          return selector.getAttribute('content');
        }
        return null;
      }
    }
    /**
     * Default connector options.
     */
    Connector._defaultOptions = {
      auth: {
        headers: {}
      },
      authEndpoint: '/broadcasting/auth',
      userAuthentication: {
        endpoint: '/broadcasting/user-auth',
        headers: {}
      },
      csrfToken: null,
      bearerToken: null,
      host: null,
      key: null,
      namespace: 'App.Events'
    };

    /**
     * This class creates a connector to Pusher.
     */
    class PusherConnector extends Connector {
      constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
      }
      /**
       * Create a fresh Pusher connection.
       */
      connect() {
        if (typeof this.options.client !== 'undefined') {
          this.pusher = this.options.client;
        } else if (this.options.Pusher) {
          this.pusher = new this.options.Pusher(this.options.key, this.options);
        } else if (typeof window !== 'undefined' && typeof window.Pusher !== 'undefined') {
          this.pusher = new window.Pusher(this.options.key, this.options);
        } else {
          throw new Error('Pusher client not found. Should be globally available or passed via options.client');
        }
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
      listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
      }
      /**
       * Get a channel instance by name.
       */
      channel(name) {
        if (!this.channels[name]) {
          this.channels[name] = new PusherChannel(this.pusher, name, this.options);
        }
        return this.channels[name];
      }
      /**
       * Get a private channel instance by name.
       */
      privateChannel(name) {
        if (!this.channels['private-' + name]) {
          this.channels['private-' + name] = new PusherPrivateChannel(this.pusher, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
      }
      /**
       * Get a private encrypted channel instance by name.
       */
      encryptedPrivateChannel(name) {
        if (!this.channels['private-encrypted-' + name]) {
          this.channels['private-encrypted-' + name] = new PusherEncryptedPrivateChannel(this.pusher, 'private-encrypted-' + name, this.options);
        }
        return this.channels['private-encrypted-' + name];
      }
      /**
       * Get a presence channel instance by name.
       */
      presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
          this.channels['presence-' + name] = new PusherPresenceChannel(this.pusher, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
      leave(name) {
        let channels = [name, 'private-' + name, 'private-encrypted-' + name, 'presence-' + name];
        channels.forEach(name => {
          this.leaveChannel(name);
        });
      }
      /**
       * Leave the given channel.
       */
      leaveChannel(name) {
        if (this.channels[name]) {
          this.channels[name].unsubscribe();
          delete this.channels[name];
        }
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

    /**
     * This class creates a connector to a Socket.io server.
     */
    class SocketIoConnector extends Connector {
      constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
      }
      /**
       * Create a fresh Socket.io connection.
       */
      connect() {
        let io = this.getSocketIO();
        this.socket = io(this.options.host ?? undefined, this.options);
        this.socket.on('reconnect', () => {
          Object.values(this.channels).forEach(channel => {
            channel.subscribe();
          });
        });
      }
      /**
       * Get socket.io module from global scope or options.
       */
      getSocketIO() {
        if (typeof this.options.client !== 'undefined') {
          return this.options.client;
        }
        if (typeof window !== 'undefined' && typeof window.io !== 'undefined') {
          return window.io;
        }
        throw new Error('Socket.io client not found. Should be globally available or passed via options.client');
      }
      /**
       * Listen for an event on a channel instance.
       */
      listen(name, event, callback) {
        return this.channel(name).listen(event, callback);
      }
      /**
       * Get a channel instance by name.
       */
      channel(name) {
        if (!this.channels[name]) {
          this.channels[name] = new SocketIoChannel(this.socket, name, this.options);
        }
        return this.channels[name];
      }
      /**
       * Get a private channel instance by name.
       */
      privateChannel(name) {
        if (!this.channels['private-' + name]) {
          this.channels['private-' + name] = new SocketIoPrivateChannel(this.socket, 'private-' + name, this.options);
        }
        return this.channels['private-' + name];
      }
      /**
       * Get a presence channel instance by name.
       */
      presenceChannel(name) {
        if (!this.channels['presence-' + name]) {
          this.channels['presence-' + name] = new SocketIoPresenceChannel(this.socket, 'presence-' + name, this.options);
        }
        return this.channels['presence-' + name];
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
      leave(name) {
        let channels = [name, 'private-' + name, 'presence-' + name];
        channels.forEach(name => {
          this.leaveChannel(name);
        });
      }
      /**
       * Leave the given channel.
       */
      leaveChannel(name) {
        if (this.channels[name]) {
          this.channels[name].unsubscribe();
          delete this.channels[name];
        }
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

    /**
     * This class creates a null connector.
     */
    class NullConnector extends Connector {
      constructor() {
        super(...arguments);
        /**
         * All of the subscribed channel names.
         */
        this.channels = {};
      }
      /**
       * Create a fresh connection.
       */
      connect() {
        //
      }
      /**
       * Listen for an event on a channel instance.
       */
      listen(_name, _event, _callback) {
        return new NullChannel();
      }
      /**
       * Get a channel instance by name.
       */
      channel(_name) {
        return new NullChannel();
      }
      /**
       * Get a private channel instance by name.
       */
      privateChannel(_name) {
        return new NullPrivateChannel();
      }
      /**
       * Get a private encrypted channel instance by name.
       */
      encryptedPrivateChannel(_name) {
        return new NullEncryptedPrivateChannel();
      }
      /**
       * Get a presence channel instance by name.
       */
      presenceChannel(_name) {
        return new NullPresenceChannel();
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
      leave(_name) {
        //
      }
      /**
       * Leave the given channel.
       */
      leaveChannel(_name) {
        //
      }
      /**
       * Get the socket ID for the connection.
       */
      socketId() {
        return 'fake-socket-id';
      }
      /**
       * Disconnect the connection.
       */
      disconnect() {
        //
      }
    }

    /**
     * This class is the primary API for interacting with broadcasting.
     */
    class Echo {
      /**
       * Create a new class instance.
       */
      constructor(options) {
        this.options = options;
        this.connect();
        if (!this.options.withoutInterceptors) {
          this.registerInterceptors();
        }
      }
      /**
       * Get a channel instance by name.
       */
      channel(channel) {
        return this.connector.channel(channel);
      }
      /**
       * Create a new connection.
       */
      connect() {
        if (this.options.broadcaster === 'reverb') {
          this.connector = new PusherConnector({
            ...this.options,
            cluster: ''
          });
        } else if (this.options.broadcaster === 'pusher') {
          this.connector = new PusherConnector(this.options);
        } else if (this.options.broadcaster === 'socket.io') {
          this.connector = new SocketIoConnector(this.options);
        } else if (this.options.broadcaster === 'null') {
          this.connector = new NullConnector(this.options);
        } else if (typeof this.options.broadcaster === 'function' && isConstructor(this.options.broadcaster)) {
          this.connector = new this.options.broadcaster(this.options);
        } else {
          throw new Error(`Broadcaster ${typeof this.options.broadcaster} ${String(this.options.broadcaster)} is not supported.`);
        }
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
      join(channel) {
        return this.connector.presenceChannel(channel);
      }
      /**
       * Leave the given channel, as well as its private and presence variants.
       */
      leave(channel) {
        this.connector.leave(channel);
      }
      /**
       * Leave the given channel.
       */
      leaveChannel(channel) {
        this.connector.leaveChannel(channel);
      }
      /**
       * Leave all channels.
       */
      leaveAllChannels() {
        for (const channel in this.connector.channels) {
          this.leaveChannel(channel);
        }
      }
      /**
       * Listen for an event on a channel instance.
       */
      listen(channel, event, callback) {
        return this.connector.listen(channel, event, callback);
      }
      /**
       * Get a private channel instance by name.
       */
      private(channel) {
        return this.connector.privateChannel(channel);
      }
      /**
       * Get a private encrypted channel instance by name.
       */
      encryptedPrivate(channel) {
        if (this.connectorSupportsEncryptedPrivateChannels(this.connector)) {
          return this.connector.encryptedPrivateChannel(channel);
        }
        throw new Error(`Broadcaster ${typeof this.options.broadcaster} ${String(this.options.broadcaster)} does not support encrypted private channels.`);
      }
      connectorSupportsEncryptedPrivateChannels(connector) {
        return connector instanceof PusherConnector || connector instanceof NullConnector;
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
        if (typeof Vue === 'function' && Vue.http) {
          this.registerVueRequestInterceptor();
        }
        if (typeof axios === 'function') {
          this.registerAxiosRequestInterceptor();
        }
        if (typeof jQuery === 'function') {
          this.registerjQueryAjaxSetup();
        }
        if (typeof Turbo === 'object') {
          this.registerTurboRequestInterceptor();
        }
      }
      /**
       * Register a Vue HTTP interceptor to add the X-Socket-ID header.
       */
      registerVueRequestInterceptor() {
        Vue.http.interceptors.push((request, next) => {
          if (this.socketId()) {
            request.headers.set('X-Socket-ID', this.socketId());
          }
          next();
        });
      }
      /**
       * Register an Axios HTTP interceptor to add the X-Socket-ID header.
       */
      registerAxiosRequestInterceptor() {
        axios.interceptors.request.use(config => {
          if (this.socketId()) {
            config.headers['X-Socket-Id'] = this.socketId();
          }
          return config;
        });
      }
      /**
       * Register jQuery AjaxPrefilter to add the X-Socket-ID header.
       */
      registerjQueryAjaxSetup() {
        if (typeof jQuery.ajax != 'undefined') {
          jQuery.ajaxPrefilter((_options, _originalOptions, xhr) => {
            if (this.socketId()) {
              xhr.setRequestHeader('X-Socket-Id', this.socketId());
            }
          });
        }
      }
      /**
       * Register the Turbo Request interceptor to add the X-Socket-ID header.
       */
      registerTurboRequestInterceptor() {
        document.addEventListener('turbo:before-fetch-request', event => {
          event.detail.fetchOptions.headers['X-Socket-Id'] = this.socketId();
        });
      }
    }

    return Echo;

})();
