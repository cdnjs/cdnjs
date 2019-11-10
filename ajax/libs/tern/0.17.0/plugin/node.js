(function(mod) {
  if (typeof exports == "object" && typeof module == "object") // CommonJS
    return mod(require("../lib/tern"), require("./node_resolve"));
  if (typeof define == "function" && define.amd) // AMD
    return define(["../lib/tern", "./node_resolve"], mod);
  mod(tern, tern);
})(function(tern) {
  "use strict"

  tern.registerPlugin("node", function(server) {
    server.loadPlugin("node_resolve")
    server.on("postReset", function() {
      var mods = server.mod.modules, locals = server.cx.definitions.node
      for (var name in locals) if (/^[a-z_]*$/.test(name))
        mods.knownModules[name] = locals[name]
    })
    server.addDefs(defs)
  })

  var defs = {
    "!name": "node",
    "!define": {
      events: {
        "!url": "https://nodejs.org/api/events.html",
        "!doc": "Many objects in Node emit events: a net.Server emits an event each time a peer connects to it, a fs.readStream emits an event when the file is opened. All objects which emit events are instances of events.EventEmitter.",
        EventEmitter: {
          prototype: {
            addListener: {
              "!type": "fn(event: string, listener: fn())",
              "!url": "https://nodejs.org/api/events.html#events_emitter_addlistener_event_listener",
              "!doc": "Adds a listener to the end of the listeners array for the specified event."
            },
            on: {
              "!type": "fn(event: string, listener: fn())",
              "!url": "https://nodejs.org/api/events.html#events_emitter_on_event_listener",
              "!doc": "Adds a listener to the end of the listeners array for the specified event."
            },
            once: {
              "!type": "fn(event: string, listener: fn())",
              "!url": "https://nodejs.org/api/events.html#events_emitter_once_event_listener",
              "!doc": "Adds a one time listener for the event. This listener is invoked only the next time the event is fired, after which it is removed."
            },
            removeListener: {
              "!type": "fn(event: string, listener: fn())",
              "!url": "https://nodejs.org/api/events.html#events_emitter_removelistener_event_listener",
              "!doc": "Remove a listener from the listener array for the specified event. Caution: changes array indices in the listener array behind the listener."
            },
            removeAllListeners: {
              "!type": "fn(event: string)",
              "!url": "https://nodejs.org/api/events.html#events_emitter_removealllisteners_event",
              "!doc": "Removes all listeners, or those of the specified event."
            },
            setMaxListeners: {
              "!type": "fn(n: number)",
              "!url": "https://nodejs.org/api/events.html#events_emitter_setmaxlisteners_n",
              "!doc": "By default EventEmitters will print a warning if more than 10 listeners are added for a particular event. This is a useful default which helps finding memory leaks. Obviously not all Emitters should be limited to 10. This function allows that to be increased. Set to zero for unlimited."
            },
            listeners: {
              "!type": "fn(event: string) -> [fn()]",
              "!url": "https://nodejs.org/api/events.html#events_emitter_listeners_event",
              "!doc": "Returns an array of listeners for the specified event."
            },
            emit: {
              "!type": "fn(event: string)",
              "!url": "https://nodejs.org/api/events.html#events_emitter_emit_event_arg1_arg2",
              "!doc": "Execute each of the listeners in order with the supplied arguments."
            }
          },
          "!url": "https://nodejs.org/api/events.html#events_class_events_eventemitter",
          "!doc": "To access the EventEmitter class, require('events').EventEmitter."
        }
      },
      stream: {
        "!type": "fn()",
        prototype: {
          "!proto": "events.EventEmitter.prototype",
          pipe: {
            "!type": "fn(destination: +stream.Writable, options?: ?)",
            "!url": "https://nodejs.org/api/stream.html#stream_readable_pipe_destination_options",
            "!doc": "Connects this readable stream to destination WriteStream. Incoming data on this stream gets written to destination. Properly manages back-pressure so that a slow destination will not be overwhelmed by a fast readable stream."
          }
        },
        Writable: {
          "!type": "fn(options?: ?)",
          prototype: {
            "!proto": "stream.prototype",
            write: {
              "!type": "fn(chunk: string|+Buffer, encoding?: string, callback?: fn()) -> bool",
              "!url": "https://nodejs.org/api/stream.html#stream_writable_write_chunk_encoding_callback_1",
              "!doc": "Writes chunk to the stream. Returns true if the data has been flushed to the underlying resource. Returns false to indicate that the buffer is full, and the data will be sent out in the future. The 'drain' event will indicate when the buffer is empty again."
            },
            cork: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/stream.html#stream_writable_cork",
              "!doc": "Forces buffering of all writes. Buffered data will be flushed either at .uncork() or at .end() call."
            },
            uncork: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/stream.html#stream_writable_uncork",
              "!doc": "Flush all data, buffered since .cork() call."
            },
            setDefaultEncoding: {
              "!type": "fn(encoding: string) -> bool",
              "!url": "https://nodejs.org/api/stream.html#stream_writable_setdefaultencoding_encoding",
              "!doc": "Sets the default encoding for a writable stream. Returns true if the encoding is valid and is set. Otherwise returns false."
            },
            end: {
              "!type": "fn(chunk?: string|+Buffer, encoding?: string, callback?: fn()) -> bool",
              "!url": "https://nodejs.org/api/stream.html#stream_writable_end_chunk_encoding_callback",
              "!doc": "Call this method to signal the end of the data being written to the stream."
            }
          },
          "!url": "https://nodejs.org/api/stream.html#stream_class_stream_writable",
          "!doc": "A Writable Stream has the following methods, members, and events."
        },
        Readable: {
          "!type": "fn(options?: ?)",
          prototype: {
            "!proto": "stream.prototype",
            setEncoding: {
              "!type": "fn(encoding: string)",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_setencoding_encoding",
              "!doc": "Makes the 'data' event emit a string instead of a Buffer. encoding can be 'utf8', 'utf16le' ('ucs2'), 'ascii', or 'hex'."
            },
            pause: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_pause",
              "!doc": "Switches the readable stream into \"old mode\", where data is emitted using a 'data' event rather than being buffered for consumption via the read() method."
            },
            resume: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_resume",
              "!doc": "Switches the readable stream into \"old mode\", where data is emitted using a 'data' event rather than being buffered for consumption via the read() method."
            },
            destroy: "fn()",
            unpipe: {
              "!type": "fn(dest?: +stream.Writable)",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_unpipe_destination",
              "!doc": "Undo a previously established pipe(). If no destination is provided, then all previously established pipes are removed."
            },
            push: {
              "!type": "fn(chunk: +Buffer) -> bool",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_push_chunk",
              "!doc": "Explicitly insert some data into the read queue. If called with null, will signal the end of the data."
            },
            unshift: {
              "!type": "fn(chunk: +Buffer) -> bool",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_unshift_chunk",
              "!doc": "This is the corollary of readable.push(chunk). Rather than putting the data at the end of the read queue, it puts it at the front of the read queue."
            },
            wrap: {
              "!type": "fn(stream: ?) -> +stream.Readable",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_wrap_stream",
              "!doc": "If you are using an older Node library that emits 'data' events and has a pause() method that is advisory only, then you can use the wrap() method to create a Readable stream that uses the old stream as its data source."
            },
            read: {
              "!type": "fn(size?: number) -> +Buffer",
              "!url": "https://nodejs.org/api/stream.html#stream_readable_read_size_1",
              "!doc": "Call this method to consume data once the 'readable' event is emitted."
            }
          },
          "!url": "https://nodejs.org/api/stream.html#stream_class_stream_readable",
          "!doc": "A Readable Stream has the following methods, members, and events."
        },
        Duplex: {
          "!type": "fn(options?: ?)",
          prototype: {
            "!proto": "stream.Readable.prototype",
            write: "fn(chunk: +Buffer, encoding?: string, callback?: fn()) -> bool",
            end: "fn(chunk: +Buffer, encoding?: string, callback?: fn()) -> bool"
          },
          "!url": "https://nodejs.org/api/stream.html#stream_class_stream_duplex",
          "!doc": "A \"duplex\" stream is one that is both Readable and Writable, such as a TCP socket connection."
        },
        Transform: {
          "!type": "fn(options?: ?)",
          prototype: {
            "!proto": "stream.Duplex.prototype"
          },
          "!url": "https://nodejs.org/api/stream.html#stream_class_stream_transform",
          "!doc": "A \"transform\" stream is a duplex stream where the output is causally connected in some way to the input, such as a zlib stream or a crypto stream."
        },
        PassThrough: "stream.Transform",
        "!url": "https://nodejs.org/api/stream.html#stream_stream",
        "!doc": "A stream is an abstract interface implemented by various objects in Node. For example a request to an HTTP server is a stream, as is stdout. Streams are readable, writable, or both. All streams are instances of EventEmitter"
      },
      querystring: {
        "!url": "https://nodejs.org/api/querystring.html",
        "!doc": "This module provides utilities for dealing with query strings.",
        stringify: {
          "!type": "fn(obj: ?, sep?: string, eq?: string) -> string",
          "!url": "https://nodejs.org/api/querystring.html#querystring_querystring_stringify_obj_sep_eq",
          "!doc": "Serialize an object to a query string. Optionally override the default separator ('&') and assignment ('=') characters."
        },
        parse: {
          "!type": "fn(str: string, sep?: string, eq?: string, options?: ?) -> ?",
          "!url": "https://nodejs.org/api/querystring.html#querystring_querystring_parse_str_sep_eq_options",
          "!doc": "Deserialize a query string to an object. Optionally override the default separator ('&') and assignment ('=') characters."
        },
        escape: {
          "!type": "fn(string) -> string",
          "!url": "https://nodejs.org/api/querystring.html#querystring_querystring_escape",
          "!doc": "The escape function used by querystring.stringify, provided so that it could be overridden if necessary."
        },
        unescape: {
          "!type": "fn(string) -> string",
          "!url": "https://nodejs.org/api/querystring.html#querystring_querystring_unescape",
          "!doc": "The unescape function used by querystring.parse, provided so that it could be overridden if necessary."
        }
      },
      http: {
        "!url": "https://nodejs.org/api/http.html",
        "!doc": "The HTTP interfaces in Node are designed to support many features of the protocol which have been traditionally difficult to use. In particular, large, possibly chunk-encoded, messages. The interface is careful to never buffer entire requests or responses--the user is able to stream data.",
        STATUS_CODES: {},
        createServer: {
          "!type": "fn(listener?: fn(request: +http.IncomingMessage, response: +http.ServerResponse)) -> +http.Server",
          "!url": "https://nodejs.org/api/http.html#http_http_createserver_requestlistener",
          "!doc": "Returns a new web server object."
        },
        Server: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            listen: {
              "!type": "fn(port: number, hostname?: string, backlog?: number, callback?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_server_listen_port_hostname_backlog_callback",
              "!doc": "Begin accepting connections on the specified port and hostname. If the hostname is omitted, the server will accept connections directed to any IPv4 address (INADDR_ANY)."
            },
            close: {
              "!type": "fn(callback?: ?)",
              "!url": "https://nodejs.org/api/http.html#http_server_close_callback",
              "!doc": "Stops the server from accepting new connections."
            },
            maxHeadersCount: {
              "!type": "number",
              "!url": "https://nodejs.org/api/http.html#http_server_maxheaderscount",
              "!doc": "Limits maximum incoming headers count, equal to 1000 by default. If set to 0 - no limit will be applied."
            },
            setTimeout: {
              "!type": "fn(timeout: number, callback?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_server_settimeout_msecs_callback",
              "!doc": "Sets the timeout value for sockets, and emits a 'timeout' event on the Server object, passing the socket as an argument, if a timeout occurs."
            },
            timeout: {
              "!type": "number",
              "!url": "https://nodejs.org/api/http.html#http_server_timeout",
              "!doc": "The number of milliseconds of inactivity before a socket is presumed to have timed out."
            }
          },
          "!url": "https://nodejs.org/api/http.html#http_class_http_server",
          "!doc": "Class for HTTP server objects."
        },
        ServerResponse: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Writable.prototype",
            writeContinue: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/http.html#http_response_writecontinue",
              "!doc": "Sends a HTTP/1.1 100 Continue message to the client, indicating that the request body should be sent."
            },
            writeHead: {
              "!type": "fn(statusCode: number, headers?: ?)",
              "!url": "https://nodejs.org/api/http.html#http_response_writehead_statuscode_reasonphrase_headers",
              "!doc": "Sends a response header to the request. The status code is a 3-digit HTTP status code, like 404. The last argument, headers, are the response headers. Optionally one can give a human-readable reasonPhrase as the second argument."
            },
            setTimeout: {
              "!type": "fn(timeout: number, callback?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_response_settimeout_msecs_callback",
              "!doc": "Sets the Socket's timeout value to msecs. If a callback is provided, then it is added as a listener on the 'timeout' event on the response object."
            },
            statusCode: {
              "!type": "number",
              "!url": "https://nodejs.org/api/http.html#http_response_statuscode",
              "!doc": "When using implicit headers (not calling response.writeHead() explicitly), this property controls the status code that will be sent to the client when the headers get flushed."
            },
            setHeader: {
              "!type": "fn(name: string, value: string)",
              "!url": "https://nodejs.org/api/http.html#http_response_setheader_name_value",
              "!doc": "Sets a single header value for implicit headers. If this header already exists in the to-be-sent headers, its value will be replaced. Use an array of strings here if you need to send multiple headers with the same name."
            },
            headersSent: {
              "!type": "bool",
              "!url": "https://nodejs.org/api/http.html#http_response_headerssent",
              "!doc": "Boolean (read-only). True if headers were sent, false otherwise."
            },
            sendDate: {
              "!type": "bool",
              "!url": "https://nodejs.org/api/http.html#http_response_senddate",
              "!doc": "When true, the Date header will be automatically generated and sent in the response if it is not already present in the headers. Defaults to true."
            },
            getHeader: {
              "!type": "fn(name: string) -> string",
              "!url": "https://nodejs.org/api/http.html#http_response_getheader_name",
              "!doc": "Reads out a header that's already been queued but not sent to the client. Note that the name is case insensitive. This can only be called before headers get implicitly flushed."
            },
            removeHeader: {
              "!type": "fn(name: string)",
              "!url": "https://nodejs.org/api/http.html#http_response_removeheader_name",
              "!doc": "Removes a header that's queued for implicit sending."
            },
            addTrailers: {
              "!type": "fn(headers: ?)",
              "!url": "https://nodejs.org/api/http.html#http_response_addtrailers_headers",
              "!doc": "This method adds HTTP trailing headers (a header but at the end of the message) to the response."
            }
          },
          "!url": "https://nodejs.org/api/http.html#http_class_http_serverresponse",
          "!doc": "This object is created internally by a HTTP server--not by the user. It is passed as the second parameter to the 'request' event."
        },
        request: {
          "!type": "fn(options: ?, callback?: fn(res: +http.IncomingMessage)) -> +http.ClientRequest",
          "!url": "https://nodejs.org/api/http.html#http_http_request_options_callback",
          "!doc": "Node maintains several connections per server to make HTTP requests. This function allows one to transparently issue requests."
        },
        get: {
          "!type": "fn(options: ?, callback?: fn(res: +http.IncomingMessage)) -> +http.ClientRequest",
          "!url": "https://nodejs.org/api/http.html#http_http_get_options_callback",
          "!doc": "Since most requests are GET requests without bodies, Node provides this convenience method. The only difference between this method and http.request() is that it sets the method to GET and calls req.end() automatically."
        },
        globalAgent: {
          "!type": "+http.Agent",
          "!url": "https://nodejs.org/api/http.html#http_http_globalagent",
          "!doc": "Global instance of Agent which is used as the default for all http client requests."
        },
        Agent: {
          "!type": "fn()",
          prototype: {
            maxSockets: {
              "!type": "number",
              "!url": "https://nodejs.org/api/http.html#http_agent_maxsockets",
              "!doc": "By default set to 5. Determines how many concurrent sockets the agent can have open per host."
            },
            sockets: {
              "!type": "[+net.Socket]",
              "!url": "https://nodejs.org/api/http.html#http_agent_sockets",
              "!doc": "An object which contains arrays of sockets currently in use by the Agent. Do not modify."
            },
            requests: {
              "!type": "[+http.ClientRequest]",
              "!url": "https://nodejs.org/api/http.html#http_agent_requests",
              "!doc": "An object which contains queues of requests that have not yet been assigned to sockets. Do not modify."
            }
          },
          "!url": "https://nodejs.org/api/http.html#http_class_http_agent",
          "!doc": "In node 0.5.3+ there is a new implementation of the HTTP Agent which is used for pooling sockets used in HTTP client requests."
        },
        ClientRequest: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Writable.prototype",
            abort: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/http.html#http_request_abort",
              "!doc": "Aborts a request. (New since v0.3.8.)"
            },
            setTimeout: {
              "!type": "fn(timeout: number, callback?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_request_settimeout_timeout_callback",
              "!doc": "Once a socket is assigned to this request and is connected socket.setTimeout() will be called."
            },
            setNoDelay: {
              "!type": "fn(noDelay?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_request_setnodelay_nodelay",
              "!doc": "Once a socket is assigned to this request and is connected socket.setNoDelay() will be called."
            },
            setSocketKeepAlive: {
              "!type": "fn(enable?: bool, initialDelay?: number)",
              "!url": "https://nodejs.org/api/http.html#http_request_setsocketkeepalive_enable_initialdelay",
              "!doc": "Once a socket is assigned to this request and is connected socket.setKeepAlive() will be called."
            }
          },
          "!url": "https://nodejs.org/api/http.html#http_class_http_clientrequest",
          "!doc": "This object is created internally and returned from http.request(). It represents an in-progress request whose header has already been queued. The header is still mutable using the setHeader(name, value), getHeader(name), removeHeader(name) API. The actual header will be sent along with the first data chunk or when closing the connection."
        },
        IncomingMessage: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Readable.prototype",
            httpVersion: {
              "!type": "string",
              "!url": "https://nodejs.org/api/http.html#http_message_httpversion",
              "!doc": "In case of server request, the HTTP version sent by the client. In the case of client response, the HTTP version of the connected-to server. Probably either '1.1' or '1.0'."
            },
            headers: {
              "!type": "?",
              "!url": "https://nodejs.org/api/http.html#http_message_headers",
              "!doc": "The request/response headers object."
            },
            trailers: {
              "!type": "?",
              "!url": "https://nodejs.org/api/http.html#http_message_trailers",
              "!doc": "The request/response trailers object. Only populated after the 'end' event."
            },
            setTimeout: {
              "!type": "fn(timeout: number, callback?: fn())",
              "!url": "https://nodejs.org/api/http.html#http_message_settimeout_msecs_callback",
              "!doc": "Calls message.connection.setTimeout(msecs, callback)."
            },
            setEncoding: {
              "!type": "fn(encoding?: string)",
              "!url": "https://nodejs.org/api/http.html#http_message_setencoding_encoding",
              "!doc": "Set the encoding for data emitted by the 'data' event."
            },
            pause: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/http.html#http_message_pause",
              "!doc": "Pauses request/response from emitting events. Useful to throttle back a download."
            },
            resume: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/http.html#http_message_resume",
              "!doc": "Resumes a paused request/response."
            },
            method: {
              "!type": "string",
              "!url": "https://nodejs.org/api/http.html#http_message_method",
              "!doc": "Only valid for request obtained from http.Server."
            },
            url: {
              "!type": "string",
              "!url": "https://nodejs.org/api/http.html#http_message_url",
              "!doc": "Only valid for request obtained from http.Server."
            },
            statusCode: {
              "!type": "number",
              "!url": "https://nodejs.org/api/http.html#http_message_statuscode",
              "!doc": "Only valid for response obtained from http.ClientRequest."
            },
            socket: {
              "!type": "+net.Socket",
              "!url": "https://nodejs.org/api/http.html#http_message_socket",
              "!doc": "The net.Socket object associated with the connection."
            }
          },
          "!url": "https://nodejs.org/api/http.html#http_http_incomingmessage",
          "!doc": "An IncomingMessage object is created by http.Server or http.ClientRequest and passed as the first argument to the 'request' and 'response' event respectively. It may be used to access response status, headers and data."
        }
      },
      https: {
        "!url": "https://nodejs.org/api/http.html",
        "!doc": "HTTPS is the HTTP protocol over TLS/SSL. In Node this is implemented as a separate module.",
        Server: "http.Server",
        createServer: {
          "!type": "fn(listener?: fn(request: +http.IncomingMessage, response: +http.ServerResponse)) -> +https.Server",
          "!url": "https://nodejs.org/api/https.html#https_https_createserver_options_requestlistener",
          "!doc": "Returns a new HTTPS web server object. The options is similar to tls.createServer(). The requestListener is a function which is automatically added to the 'request' event."
        },
        request: {
          "!type": "fn(options: ?, callback?: fn(res: +http.IncomingMessage)) -> +http.ClientRequest",
          "!url": "https://nodejs.org/api/https.html#https_https_request_options_callback",
          "!doc": "Makes a request to a secure web server."
        },
        get: {
          "!type": "fn(options: ?, callback?: fn(res: +http.IncomingMessage)) -> +http.ClientRequest",
          "!url": "https://nodejs.org/api/https.html#https_https_get_options_callback",
          "!doc": "Like http.get() but for HTTPS."
        },
        Agent: "http.Agent",
        globalAgent: "http.globalAgent"
      },
      cluster: {
        "!proto": "events.EventEmitter.prototype",
        settings: {
          exec: "string",
          args: "[string]",
          silent: "bool",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_settings",
          "!doc": "All settings set by the .setupMaster is stored in this settings object. This object is not supposed to be changed or set manually, by you."
        },
        Worker: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            id: {
              "!type": "string",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_id",
              "!doc": "Each new worker is given its own unique id, this id is stored in the id."
            },
            process: {
              "!type": "+child_process.ChildProcess",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_process",
              "!doc": "All workers are created using child_process.fork(), the returned object from this function is stored in process."
            },
            suicide: {
              "!type": "bool",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_suicide",
              "!doc": "This property is a boolean. It is set when a worker dies after calling .kill() or immediately after calling the .disconnect() method. Until then it is undefined."
            },
            send: {
              "!type": "fn(message: ?, sendHandle?: ?)",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_send_message_sendhandle",
              "!doc": "This function is equal to the send methods provided by child_process.fork(). In the master you should use this function to send a message to a specific worker. However in a worker you can also use process.send(message), since this is the same function."
            },
            destroy: "fn()",
            disconnect: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_disconnect",
              "!doc": "When calling this function the worker will no longer accept new connections, but they will be handled by any other listening worker. Existing connection will be allowed to exit as usual. When no more connections exist, the IPC channel to the worker will close allowing it to die graceful. When the IPC channel is closed the disconnect event will emit, this is then followed by the exit event, there is emitted when the worker finally die."
            },
            kill: {
              "!type": "fn(signal?: string)",
              "!url": "https://nodejs.org/api/cluster.html#cluster_worker_kill_signal_sigterm",
              "!doc": "This function will kill the worker, and inform the master to not spawn a new worker. The boolean suicide lets you distinguish between voluntary and accidental exit."
            }
          },
          "!url": "https://nodejs.org/api/cluster.html#cluster_class_worker",
          "!doc": "A Worker object contains all public information and method about a worker. In the master it can be obtained using cluster.workers. In a worker it can be obtained using cluster.worker."
        },
        isMaster: {
          "!type": "bool",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_ismaster",
          "!doc": "True if the process is a master. This is determined by the process.env.NODE_UNIQUE_ID. If process.env.NODE_UNIQUE_ID is undefined, then isMaster is true."
        },
        isWorker: {
          "!type": "bool",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_isworker",
          "!doc": "This boolean flag is true if the process is a worker forked from a master. If the process.env.NODE_UNIQUE_ID is set to a value, then isWorker is true."
        },
        setupMaster: {
          "!type": "fn(settings?: cluster.settings)",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_setupmaster_settings",
          "!doc": "setupMaster is used to change the default 'fork' behavior. The new settings are effective immediately and permanently, they cannot be changed later on."
        },
        fork: {
          "!type": "fn(env?: ?) -> +cluster.Worker",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_fork_env",
          "!doc": "Spawn a new worker process. This can only be called from the master process."
        },
        disconnect: {
          "!type": "fn(callback?: fn())",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_disconnect_callback",
          "!doc": "When calling this method, all workers will commit a graceful suicide. When they are disconnected all internal handlers will be closed, allowing the master process to die graceful if no other event is waiting."
        },
        worker: {
          "!type": "+cluster.Worker",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_worker",
          "!doc": "A reference to the current worker object. Not available in the master process."
        },
        workers: {
          "!type": "[+cluster.Worker]",
          "!url": "https://nodejs.org/api/cluster.html#cluster_cluster_workers",
          "!doc": "A hash that stores the active worker objects, keyed by id field. Makes it easy to loop through all the workers. It is only available in the master process."
        },
        "!url": "https://nodejs.org/api/cluster.html#cluster_cluster",
        "!doc": "A single instance of Node runs in a single thread. To take advantage of multi-core systems the user will sometimes want to launch a cluster of Node processes to handle the load."
      },
      zlib: {
        "!url": "https://nodejs.org/api/zlib.html",
        "!doc": "This provides bindings to Gzip/Gunzip, Deflate/Inflate, and DeflateRaw/InflateRaw classes. Each class takes the same options, and is a readable/writable Stream.",
        Zlib: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Duplex.prototype",
            flush: {
              "!type": "fn(callback: fn())",
              "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_flush_callback",
              "!doc": "Flush pending data. Don't call this frivolously, premature flushes negatively impact the effectiveness of the compression algorithm."
            },
            reset: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_reset",
              "!doc": "Reset the compressor/decompressor to factory defaults. Only applicable to the inflate and deflate algorithms."
            }
          },
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_zlib",
          "!doc": "Not exported by the zlib module. It is documented here because it is the base class of the compressor/decompressor classes."
        },
        deflate: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_deflate_buf_callback",
          "!doc": "Compress a string with Deflate."
        },
        deflateRaw: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_deflateraw_buf_callback",
          "!doc": "Compress a string with DeflateRaw."
        },
        gzip: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_gzip_buf_callback",
          "!doc": "Compress a string with Gzip."
        },
        gunzip: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_gunzip_buf_callback",
          "!doc": "Decompress a raw Buffer with Gunzip."
        },
        inflate: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_inflate_buf_callback",
          "!doc": "Decompress a raw Buffer with Inflate."
        },
        inflateRaw: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_inflateraw_buf_callback",
          "!doc": "Decompress a raw Buffer with InflateRaw."
        },
        unzip: {
          "!type": "fn(buf: +Buffer, callback: fn())",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_unzip_buf_callback",
          "!doc": "Decompress a raw Buffer with Unzip."
        },
        Gzip: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_gzip",
          "!doc": "Compress data using gzip.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createGzip: {
          "!type": "fn(options: ?) -> +zlib.Zlib",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_creategzip_options",
          "!doc": "Returns a new Gzip object with an options."
        },
        Gunzip: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_gunzip",
          "!doc": "Decompress a gzip stream.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createGunzip: {
          "!type": "fn(options: ?) -> +zlib.Gunzip",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_creategunzip_options",
          "!doc": "Returns a new Gunzip object with an options."
        },
        Deflate: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_deflate",
          "!doc": "Compress data using deflate.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createDeflate: {
          "!type": "fn(options: ?) -> +zlib.Deflate",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_createdeflate_options",
          "!doc": "Returns a new Deflate object with an options."
        },
        Inflate: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_inflate",
          "!doc": "Decompress a deflate stream.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createInflate: {
          "!type": "fn(options: ?) -> +zlib.Inflate",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_createinflate_options",
          "!doc": "Returns a new Inflate object with an options."
        },
        InflateRaw: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_inflateraw",
          "!doc": "Decompress a raw deflate stream.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createInflateRaw: {
          "!type": "fn(options: ?) -> +zlib.InflateRaw",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_createinflateraw_options",
          "!doc": "Returns a new InflateRaw object with an options."
        },
        DeflateRaw: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_deflateraw",
          "!doc": "Compress data using deflate, and do not append a zlib header.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createDeflateRaw: {
          "!type": "fn(options: ?) -> +zlib.DeflateRaw",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_createdeflateraw_options",
          "!doc": "Returns a new DeflateRaw object with an options."
        },
        Unzip: {
          "!type": "fn()",
          "!url": "https://nodejs.org/api/zlib.html#zlib_class_zlib_unzip",
          "!doc": "Decompress either a Gzip- or Deflate-compressed stream by auto-detecting the header.",
          prototype: {"!proto:": "zlib.Zlib.prototype"}
        },
        createUnzip: {
          "!type": "fn(options: ?) -> +zlib.Unzip",
          "!url": "https://nodejs.org/api/zlib.html#zlib_zlib_createunzip_options",
          "!doc": "Returns a new Unzip object with an options."
        },
        Z_NO_FLUSH: "number",
        Z_PARTIAL_FLUSH: "number",
        Z_SYNC_FLUSH: "number",
        Z_FULL_FLUSH: "number",
        Z_FINISH: "number",
        Z_BLOCK: "number",
        Z_TREES: "number",
        Z_OK: "number",
        Z_STREAM_END: "number",
        Z_NEED_DICT: "number",
        Z_ERRNO: "number",
        Z_STREAM_ERROR: "number",
        Z_DATA_ERROR: "number",
        Z_MEM_ERROR: "number",
        Z_BUF_ERROR: "number",
        Z_VERSION_ERROR: "number",
        Z_NO_COMPRESSION: "number",
        Z_BEST_SPEED: "number",
        Z_BEST_COMPRESSION: "number",
        Z_DEFAULT_COMPRESSION: "number",
        Z_FILTERED: "number",
        Z_HUFFMAN_ONLY: "number",
        Z_RLE: "number",
        Z_FIXED: "number",
        Z_DEFAULT_STRATEGY: "number",
        Z_BINARY: "number",
        Z_TEXT: "number",
        Z_ASCII: "number",
        Z_UNKNOWN: "number",
        Z_DEFLATED: "number",
        Z_NULL: "number"
      },
      os: {
        "!url": "https://nodejs.org/api/os.html",
        "!doc": "Provides a few basic operating-system related utility functions.",
        tmpdir: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_tmpdir",
          "!doc": "Returns the operating system's default directory for temp files."
        },
        endianness: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_endianness",
          "!doc": "Returns the endianness of the CPU. Possible values are \"BE\" or \"LE\"."
        },
        hostname: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_hostname",
          "!doc": "Returns the hostname of the operating system."
        },
        type: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_type",
          "!doc": "Returns the operating system name."
        },
        platform: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_platform",
          "!doc": "Returns the operating system platform."
        },
        arch: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_arch",
          "!doc": "Returns the operating system CPU architecture."
        },
        release: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/os.html#os_os_release",
          "!doc": "Returns the operating system release."
        },
        uptime: {
          "!type": "fn() -> number",
          "!url": "https://nodejs.org/api/os.html#os_os_uptime",
          "!doc": "Returns the system uptime in seconds."
        },
        loadavg: {
          "!type": "fn() -> [number]",
          "!url": "https://nodejs.org/api/os.html#os_os_loadavg",
          "!doc": "Returns an array containing the 1, 5, and 15 minute load averages."
        },
        totalmem: {
          "!type": "fn() -> number",
          "!url": "https://nodejs.org/api/os.html#os_os_totalmem",
          "!doc": "Returns the total amount of system memory in bytes."
        },
        freemem: {
          "!type": "fn() -> number",
          "!url": "https://nodejs.org/api/os.html#os_os_freemem",
          "!doc": "Returns the amount of free system memory in bytes."
        },
        cpus: {
          "!type": "fn() -> [os.cpuSpec]",
          "!url": "https://nodejs.org/api/os.html#os_os_cpus",
          "!doc": "Returns an array of objects containing information about each CPU/core installed: model, speed (in MHz), and times (an object containing the number of milliseconds the CPU/core spent in: user, nice, sys, idle, and irq)."
        },
        networkInterfaces: {
          "!type": "fn() -> ?",
          "!url": "https://nodejs.org/api/os.html#os_os_networkinterfaces",
          "!doc": "Get a list of network interfaces."
        },
        EOL: {
          "!type": "string",
          "!url": "https://nodejs.org/api/os.html#os_os_eol",
          "!doc": "A constant defining the appropriate End-of-line marker for the operating system."
        }
      },
      punycode: {
        "!url": "https://nodejs.org/api/punycode.html",
        "!doc": "Punycode.js is bundled with Node.js v0.6.2+. Use require('punycode') to access it. (To use it with other Node.js versions, use npm to install the punycode module first.)",
        decode: {
          "!type": "fn(string: string) -> string",
          "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_decode_string",
          "!doc": "Converts a Punycode string of ASCII code points to a string of Unicode code points."
        },
        encode: {
          "!type": "fn(string: string) -> string",
          "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_encode_string",
          "!doc": "Converts a string of Unicode code points to a Punycode string of ASCII code points."
        },
        toUnicode: {
          "!type": "fn(domain: string) -> string",
          "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_tounicode_domain",
          "!doc": "Converts a Punycode string representing a domain name to Unicode. Only the Punycoded parts of the domain name will be converted, i.e. it doesn't matter if you call it on a string that has already been converted to Unicode."
        },
        toASCII: {
          "!type": "fn(domain: string) -> string",
          "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_toascii_domain",
          "!doc": "Converts a Unicode string representing a domain name to Punycode. Only the non-ASCII parts of the domain name will be converted, i.e. it doesn't matter if you call it with a domain that's already in ASCII."
        },
        ucs2: {
          decode: {
            "!type": "fn(string: string) -> string",
            "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_ucs2_decode_string",
            "!doc": "Creates an array containing the decimal code points of each Unicode character in the string. While JavaScript uses UCS-2 internally, this function will convert a pair of surrogate halves (each of which UCS-2 exposes as separate characters) into a single code point, matching UTF-16."
          },
          encode: {
            "!type": "fn(codePoints: [number]) -> string",
            "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_ucs2_encode_codepoints",
            "!doc": "Creates a string based on an array of decimal code points."
          }
        },
        version: {
          "!type": "?",
          "!url": "https://nodejs.org/api/punycode.html#punycode_punycode_version",
          "!doc": "A string representing the current Punycode.js version number."
        }
      },
      repl: {
        "!url": "https://nodejs.org/api/repl.html",
        "!doc": "A Read-Eval-Print-Loop (REPL) is available both as a standalone program and easily includable in other programs. The REPL provides a way to interactively run JavaScript and see the results. It can be used for debugging, testing, or just trying things out.",
        start: {
          "!type": "fn(options: ?) -> +events.EventEmitter",
          "!url": "https://nodejs.org/api/repl.html#repl_repl_start_options",
          "!doc": "Returns and starts a REPLServer instance."
        }
      },
      readline: {
        "!url": "https://nodejs.org/api/readline.html",
        "!doc": "Readline allows reading of a stream (such as process.stdin) on a line-by-line basis.",
        createInterface: {
          "!type": "fn(options: ?) -> +readline.Interface",
          "!url": "https://nodejs.org/api/readline.html#readline_readline_createinterface_options",
          "!doc": "Creates a readline Interface instance."
        },
        Interface: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            setPrompt: {
              "!type": "fn(prompt: string, length: number)",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_setprompt_prompt_length",
              "!doc": "Sets the prompt, for example when you run node on the command line, you see > , which is node's prompt."
            },
            prompt: {
              "!type": "fn(preserveCursor?: bool)",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_prompt_preservecursor",
              "!doc": "Readies readline for input from the user, putting the current setPrompt options on a new line, giving the user a new spot to write. Set preserveCursor to true to prevent the cursor placement being reset to 0."
            },
            question: {
              "!type": "fn(query: string, callback: fn())",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_question_query_callback",
              "!doc": "Prepends the prompt with query and invokes callback with the user's response. Displays the query to the user, and then invokes callback with the user's response after it has been typed."
            },
            pause: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_pause",
              "!doc": "Pauses the readline input stream, allowing it to be resumed later if needed."
            },
            resume: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_resume",
              "!doc": "Resumes the readline input stream."
            },
            close: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_close",
              "!doc": "Closes the Interface instance, relinquishing control on the input and output streams. The \"close\" event will also be emitted."
            },
            write: {
              "!type": "fn(data: ?, key?: ?)",
              "!url": "https://nodejs.org/api/readline.html#readline_rl_write_data_key",
              "!doc": "Writes data to output stream. key is an object literal to represent a key sequence; available if the terminal is a TTY."
            }
          },
          "!url": "https://nodejs.org/api/readline.html#readline_class_interface",
          "!doc": "The class that represents a readline interface with an input and output stream."
        }
      },
      vm: {
        "!url": "https://nodejs.org/api/vm.html",
        "!doc": "JavaScript code can be compiled and run immediately or compiled, saved, and run later.",
        createContext: {
          "!type": "fn(initSandbox?: ?) -> ?",
          "!url": "https://nodejs.org/api/vm.html#vm_vm_createcontext_initsandbox",
          "!doc": "vm.createContext creates a new context which is suitable for use as the 2nd argument of a subsequent call to vm.runInContext. A (V8) context comprises a global object together with a set of build-in objects and functions. The optional argument initSandbox will be shallow-copied to seed the initial contents of the global object used by the context."
        },
        Script: {
          "!type": "fn()",
          prototype: {
            runInThisContext: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/vm.html#vm_script_runinthiscontext",
              "!doc": "Similar to vm.runInThisContext but a method of a precompiled Script object. script.runInThisContext runs the code of script and returns the result. Running code does not have access to local scope, but does have access to the global object (v8: in actual context)."
            },
            runInNewContext: {
              "!type": "fn(sandbox?: ?)",
              "!url": "https://nodejs.org/api/vm.html#vm_script_runinnewcontext_sandbox",
              "!doc": "Similar to vm.runInNewContext a method of a precompiled Script object. script.runInNewContext runs the code of script with sandbox as the global object and returns the result. Running code does not have access to local scope. sandbox is optional."
            }
          },
          "!url": "https://nodejs.org/api/vm.html#vm_class_script",
          "!doc": "A class for running scripts. Returned by vm.createScript."
        },
        runInThisContext: {
          "!type": "fn(code: string, filename?: string)",
          "!url": "https://nodejs.org/api/vm.html#vm_vm_runinthiscontext_code_filename",
          "!doc": "vm.runInThisContext() compiles code, runs it and returns the result. Running code does not have access to local scope. filename is optional, it's used only in stack traces."
        },
        runInNewContext: {
          "!type": "fn(code: string, sandbox?: ?, filename?: string)",
          "!url": "https://nodejs.org/api/vm.html#vm_vm_runinnewcontext_code_sandbox_filename",
          "!doc": "vm.runInNewContext compiles code, then runs it in sandbox and returns the result. Running code does not have access to local scope. The object sandbox will be used as the global object for code. sandbox and filename are optional, filename is only used in stack traces."
        },
        runInContext: {
          "!type": "fn(code: string, context: ?, filename?: string)",
          "!url": "https://nodejs.org/api/vm.html#vm_vm_runincontext_code_context_filename",
          "!doc": "vm.runInContext compiles code, then runs it in context and returns the result. A (V8) context comprises a global object, together with a set of built-in objects and functions. Running code does not have access to local scope and the global object held within context will be used as the global object for code. filename is optional, it's used only in stack traces."
        },
        createScript: {
          "!type": "fn(code: string, filename?: string) -> +vm.Script",
          "!url": "https://nodejs.org/api/vm.html#vm_vm_createscript_code_filename",
          "!doc": "createScript compiles code but does not run it. Instead, it returns a vm.Script object representing this compiled code. This script can be run later many times using methods below. The returned script is not bound to any global object. It is bound before each run, just for that run. filename is optional, it's only used in stack traces."
        }
      },
      child_process: {
        "!url": "https://nodejs.org/api/child_process.html",
        "!doc": "Node provides a tri-directional popen(3) facility through the child_process module.",
        ChildProcess: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            stdin: {
              "!type": "+stream.Writable",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_stdin",
              "!doc": "A Writable Stream that represents the child process's stdin. Closing this stream via end() often causes the child process to terminate."
            },
            stdout: {
              "!type": "+stream.Readable",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_stdout",
              "!doc": "A Readable Stream that represents the child process's stdout."
            },
            stderr: {
              "!type": "+stream.Readable",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_stderr",
              "!doc": "A Readable Stream that represents the child process's stderr."
            },
            pid: {
              "!type": "number",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_pid",
              "!doc": "The PID of the child process."
            },
            kill: {
              "!type": "fn(signal?: string)",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_kill_signal",
              "!doc": "Send a signal to the child process. If no argument is given, the process will be sent 'SIGTERM'."
            },
            send: {
              "!type": "fn(message: ?, sendHandle?: ?)",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_send_message_sendhandle",
              "!doc": "When using child_process.fork() you can write to the child using child.send(message, [sendHandle]) and messages are received by a 'message' event on the child."
            },
            disconnect: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/child_process.html#child_process_child_disconnect",
              "!doc": "To close the IPC connection between parent and child use the child.disconnect() method. This allows the child to exit gracefully since there is no IPC channel keeping it alive. When calling this method the disconnect event will be emitted in both parent and child, and the connected flag will be set to false. Please note that you can also call process.disconnect() in the child process."
            }
          },
          "!url": "https://nodejs.org/api/child_process.html#child_process_class_childprocess",
          "!doc": "ChildProcess is an EventEmitter."
        },
        spawn: {
          "!type": "fn(command: string, args?: [string], options?: ?) -> +child_process.ChildProcess",
          "!url": "https://nodejs.org/api/child_process.html#child_process_child_process_spawn_command_args_options",
          "!doc": "Launches a new process with the given command, with command line arguments in args. If omitted, args defaults to an empty Array."
        },
        exec: {
          "!type": "fn(command: string, callback: fn(error: ?, stdout: +Buffer, stderr: +Buffer)) -> +child_process.ChildProcess",
          "!url": "https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback",
          "!doc": "Runs a command in a shell and buffers the output."
        },
        execFile: {
          "!type": "fn(file: string, args: [string], options: ?, callback: fn(error: ?, stdout: +Buffer, stderr: +Buffer)) -> +child_process.ChildProcess",
          "!url": "https://nodejs.org/api/child_process.html#child_process_child_process_execfile_file_args_options_callback",
          "!doc": "This is similar to child_process.exec() except it does not execute a subshell but rather the specified file directly. This makes it slightly leaner than child_process.exec. It has the same options."
        },
        fork: {
          "!type": "fn(modulePath: string, args?: [string], options?: ?) -> +child_process.ChildProcess",
          "!url": "https://nodejs.org/api/child_process.html#child_process_child_process_fork_modulepath_args_options",
          "!doc": "This is a special case of the spawn() functionality for spawning Node processes. In addition to having all the methods in a normal ChildProcess instance, the returned object has a communication channel built-in."
        }
      },
      url: {
        "!url": "https://nodejs.org/api/url.html",
        "!doc": "This module has utilities for URL resolution and parsing. ",
        parse: {
          "!type": "fn(urlStr: string, parseQueryString?: bool, slashesDenoteHost?: bool) -> url.type",
          "!url": "https://nodejs.org/api/url.html#url_url_parse_urlstr_parsequerystring_slashesdenotehost",
          "!doc": "Take a URL string, and return an object."
        },
        format: {
          "!type": "fn(url: url.type) -> string",
          "!url": "https://nodejs.org/api/url.html#url_url_format_urlobj",
          "!doc": "Take a parsed URL object, and return a formatted URL string."
        },
        resolve: {
          "!type": "fn(from: string, to: string) -> string",
          "!url": "https://nodejs.org/api/url.html#url_url_resolve_from_to",
          "!doc": "Take a base URL, and a href URL, and resolve them as a browser would for an anchor tag."
        }
      },
      dns: {
        "!url": "https://nodejs.org/api/dns.html",
        "!doc": "This module contains functions that belong to two different categories:\n1) Functions that use the underlying operating system facilities to perform name resolution, and that do not necessarily do any network communication.\n2) Functions that connect to an actual DNS server to perform name resolution, and that always use the network to perform DNS queries.",
        lookup: {
          "!type": "fn(domain: string, callback: fn(err: +Error, address: string, family: number)) -> string",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_lookup_domain_family_callback",
          "!doc": "Resolves a domain (e.g. 'google.com') into the first found A (IPv4) or AAAA (IPv6) record. The family can be the integer 4 or 6. Defaults to null that indicates both Ip v4 and v6 address family."
        },
        resolve: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolve_domain_rrtype_callback",
          "!doc": "Resolves a domain (e.g. 'google.com') into an array of the record types specified by rrtype. Valid rrtypes are 'A' (IPV4 addresses, default), 'AAAA' (IPV6 addresses), 'MX' (mail exchange records), 'TXT' (text records), 'SRV' (SRV records), 'PTR' (used for reverse IP lookups), 'NS' (name server records) and 'CNAME' (canonical name records)."
        },
        resolve4: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolve4_domain_callback",
          "!doc": "The same as dns.resolve(), but only for IPv4 queries (A records). addresses is an array of IPv4 addresses (e.g. ['74.125.79.104', '74.125.79.105', '74.125.79.106'])."
        },
        resolve6: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolve6_domain_callback",
          "!doc": "The same as dns.resolve4() except for IPv6 queries (an AAAA query)."
        },
        resolveMx: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolvemx_domain_callback",
          "!doc": "The same as dns.resolve(), but only for mail exchange queries (MX records)."
        },
        resolveTxt: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolvetxt_domain_callback",
          "!doc": "The same as dns.resolve(), but only for text queries (TXT records). addresses is an array of the text records available for domain (e.g., ['v=spf1 ip4:0.0.0.0 ~all'])."
        },
        resolveSrv: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolvesrv_domain_callback",
          "!doc": "The same as dns.resolve(), but only for service records (SRV records). addresses is an array of the SRV records available for domain. Properties of SRV records are priority, weight, port, and name (e.g., [{'priority': 10, {'weight': 5, 'port': 21223, 'name': 'service.example.com'}, ...])."
        },
        resolveNs: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolvens_domain_callback",
          "!doc": "The same as dns.resolve(), but only for name server records (NS records). addresses is an array of the name server records available for domain (e.g., ['ns1.example.com', 'ns2.example.com'])."
        },
        resolveCname: {
          "!type": "fn(domain: string, callback: fn(err: +Error, addresses: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_resolvecname_domain_callback",
          "!doc": "The same as dns.resolve(), but only for canonical name records (CNAME records). addresses is an array of the canonical name records available for domain (e.g., ['bar.example.com'])."
        },
        reverse: {
          "!type": "fn(ip: string, callback: fn(err: +Error, domains: [string])) -> [string]",
          "!url": "https://nodejs.org/api/dns.html#dns_dns_reverse_ip_callback",
          "!doc": "Reverse resolves an ip address to an array of domain names."
        }
      },
      net: {
        "!url": "https://nodejs.org/api/net.html",
        "!doc": "The net module provides you with an asynchronous network wrapper. It contains methods for creating both servers and clients (called streams).",
        createServer: {
          "!type": "fn(options?: ?, connectionListener?: fn(socket: +net.Socket)) -> +net.Server",
          "!url": "https://nodejs.org/api/net.html#net_net_createserver_options_connectionlistener",
          "!doc": "Creates a new TCP server. The connectionListener argument is automatically set as a listener for the 'connection' event."
        },
        Server: {
          "!type": "fn()",
          prototype: {
            "!proto": "net.Socket.prototype",
            listen: {
              "!type": "fn(port: number, hostname?: string, backlog?: number, callback?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_server_listen_port_host_backlog_callback",
              "!doc": "Begin accepting connections on the specified port and host. If the host is omitted, the server will accept connections directed to any IPv4 address (INADDR_ANY). A port value of zero will assign a random port."
            },
            close: {
              "!type": "fn(callback?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_server_close_callback",
              "!doc": "Stops the server from accepting new connections and keeps existing connections. This function is asynchronous, the server is finally closed when all connections are ended and the server emits a 'close' event. Optionally, you can pass a callback to listen for the 'close' event."
            },
            maxConnections: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_server_maxconnections",
              "!doc": "Set this property to reject connections when the server's connection count gets high."
            },
            getConnections: {
              "!type": "fn(callback: fn(err: +Error, count: number))",
              "!url": "https://nodejs.org/api/net.html#net_server_getconnections_callback",
              "!doc": "Asynchronously get the number of concurrent connections on the server. Works when sockets were sent to forks."
            }
          },
          "!url": "https://nodejs.org/api/net.html#net_class_net_server",
          "!doc": "This class is used to create a TCP or UNIX server. A server is a net.Socket that can listen for new incoming connections."
        },
        Socket: {
          "!type": "fn(options: ?)",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            connect: {
              "!type": "fn(port: number, host?: string, connectionListener?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_socket_connect_port_host_connectlistener",
              "!doc": "Opens the connection for a given socket. If port and host are given, then the socket will be opened as a TCP socket, if host is omitted, localhost will be assumed. If a path is given, the socket will be opened as a unix socket to that path."
            },
            bufferSize: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_socket_buffersize",
              "!doc": "net.Socket has the property that socket.write() always works. This is to help users get up and running quickly. The computer cannot always keep up with the amount of data that is written to a socket - the network connection simply might be too slow. Node will internally queue up the data written to a socket and send it out over the wire when it is possible. (Internally it is polling on the socket's file descriptor for being writable)."
            },
            setEncoding: {
              "!type": "fn(encoding?: string)",
              "!url": "https://nodejs.org/api/net.html#net_socket_setencoding_encoding",
              "!doc": "Set the encoding for the socket as a Readable Stream."
            },
            write: {
              "!type": "fn(data: +Buffer, encoding?: string, callback?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_socket_write_data_encoding_callback",
              "!doc": "Sends data on the socket. The second parameter specifies the encoding in the case of a string--it defaults to UTF8 encoding."
            },
            end: {
              "!type": "fn(data?: +Buffer, encoding?: string)",
              "!url": "https://nodejs.org/api/net.html#net_socket_end_data_encoding",
              "!doc": "Half-closes the socket. i.e., it sends a FIN packet. It is possible the server will still send some data."
            },
            destroy: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/net.html#net_socket_destroy",
              "!doc": "Ensures that no more I/O activity happens on this socket. Only necessary in case of errors (parse error or so)."
            },
            pause: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/net.html#net_socket_pause",
              "!doc": "Pauses the reading of data. That is, 'data' events will not be emitted. Useful to throttle back an upload."
            },
            resume: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/net.html#net_socket_resume",
              "!doc": "Resumes reading after a call to pause()."
            },
            setTimeout: {
              "!type": "fn(timeout: number, callback?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_socket_settimeout_timeout_callback",
              "!doc": "Sets the socket to timeout after timeout milliseconds of inactivity on the socket. By default net.Socket do not have a timeout."
            },
            setKeepAlive: {
              "!type": "fn(enable?: bool, initialDelay?: number)",
              "!url": "https://nodejs.org/api/net.html#net_socket_setkeepalive_enable_initialdelay",
              "!doc": "Enable/disable keep-alive functionality, and optionally set the initial delay before the first keepalive probe is sent on an idle socket. enable defaults to false."
            },
            address: {
              "!type": "fn() -> net.address",
              "!url": "https://nodejs.org/api/net.html#net_socket_address",
              "!doc": "Returns the bound address, the address family name and port of the socket as reported by the operating system. Returns an object with three properties, e.g. { port: 12346, family: 'IPv4', address: '127.0.0.1' }"
            },
            unref: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/net.html#net_socket_unref",
              "!doc": "Calling unref on a socket will allow the program to exit if this is the only active socket in the event system. If the socket is already unrefd calling unref again will have no effect."
            },
            ref: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/net.html#net_socket_ref",
              "!doc": "Opposite of unref, calling ref on a previously unrefd socket will not let the program exit if it's the only socket left (the default behavior). If the socket is refd calling ref again will have no effect."
            },
            remoteAddress: {
              "!type": "string",
              "!url": "https://nodejs.org/api/net.html#net_socket_remoteaddress",
              "!doc": "The string representation of the remote IP address. For example, '74.125.127.100' or '2001:4860:a005::68'."
            },
            remotePort: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_socket_remoteport",
              "!doc": "The numeric representation of the remote port. For example, 80 or 21."
            },
            localPort: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_socket_localport",
              "!doc": "The numeric representation of the local port. For example, 80 or 21."
            },
            bytesRead: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_socket_bytesread",
              "!doc": "The amount of received bytes."
            },
            bytesWritten: {
              "!type": "number",
              "!url": "https://nodejs.org/api/net.html#net_socket_byteswritten",
              "!doc": "The amount of bytes sent."
            },
            setNoDelay: {
              "!type": "fn(noDelay?: fn())",
              "!url": "https://nodejs.org/api/net.html#net_socket_setnodelay_nodelay",
              "!doc": "Disables the Nagle algorithm. By default TCP connections use the Nagle algorithm, they buffer data before sending it off. Setting true for noDelay will immediately fire off data each time socket.write() is called. noDelay defaults to true."
            },
            localAddress: {
              "!type": "string",
              "!url": "https://nodejs.org/api/net.html#net_socket_localaddress",
              "!doc": "The string representation of the local IP address the remote client is connecting on. For example, if you are listening on '0.0.0.0' and the client connects on '192.168.1.1', the value would be '192.168.1.1'."
            }
          },
          "!url": "https://nodejs.org/api/net.html#net_class_net_socket",
          "!doc": "This object is an abstraction of a TCP or UNIX socket. net.Socket instances implement a duplex Stream interface. They can be created by the user and used as a client (with connect()) or they can be created by Node and passed to the user through the 'connection' event of a server."
        },
        connect: {
          "!type": "fn(options: ?, connectionListener?: fn()) -> +net.Socket",
          "!url": "https://nodejs.org/api/net.html#net_net_connect_options_connectionlistener",
          "!doc": "Constructs a new socket object and opens the socket to the given location. When the socket is established, the 'connect' event will be emitted."
        },
        createConnection: {
          "!type": "fn(options: ?, connectionListener?: fn()) -> +net.Socket",
          "!url": "https://nodejs.org/api/net.html#net_net_createconnection_options_connectionlistener",
          "!doc": "Constructs a new socket object and opens the socket to the given location. When the socket is established, the 'connect' event will be emitted."
        },
        isIP: {
          "!type": "fn(input: string) -> number",
          "!url": "https://nodejs.org/api/net.html#net_net_isip_input",
          "!doc": "Tests if input is an IP address. Returns 0 for invalid strings, returns 4 for IP version 4 addresses, and returns 6 for IP version 6 addresses."
        },
        isIPv4: {
          "!type": "fn(input: string) -> bool",
          "!url": "https://nodejs.org/api/net.html#net_net_isipv4_input",
          "!doc": "Returns true if input is a version 4 IP address, otherwise returns false."
        },
        isIPv6: {
          "!type": "fn(input: string) -> bool",
          "!url": "https://nodejs.org/api/net.html#net_net_isipv6_input",
          "!doc": "Returns true if input is a version 6 IP address, otherwise returns false."
        }
      },
      dgram: {
        "!url": "https://nodejs.org/api/dgram.html",
        "!doc": "UDP / Datagram Sockets",
        createSocket: {
          "!type": "fn(type: string, callback?: fn()) -> +dgram.Socket",
          "!url": "https://nodejs.org/api/dgram.html#dgram_dgram_createsocket_type_callback",
          "!doc": "Creates a datagram Socket of the specified types. Valid types are udp4 and udp6."
        },
        Socket: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            send: {
              "!type": "fn(buf: +Buffer, offset: number, length: number, port: number, address: string, callback?: fn())",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_send_buf_offset_length_port_address_callback",
              "!doc": "For UDP sockets, the destination port and IP address must be specified. A string may be supplied for the address parameter, and it will be resolved with DNS. An optional callback may be specified to detect any DNS errors and when buf may be re-used. Note that DNS lookups will delay the time that a send takes place, at least until the next tick. The only way to know for sure that a send has taken place is to use the callback."
            },
            bind: {
              "!type": "fn(port: number, address?: string)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_bind_port_address_callback",
              "!doc": "For UDP sockets, listen for datagrams on a named port and optional address. If address is not specified, the OS will try to listen on all addresses."
            },
            close: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_close",
              "!doc": "Close the underlying socket and stop listening for data on it."
            },
            address: {
              address: "string",
              family: "string",
              port: "number",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_address",
              "!doc": "Returns an object containing the address information for a socket. For UDP sockets, this object will contain address , family and port."
            },
            setBroadcast: {
              "!type": "fn(flag: bool)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_setbroadcast_flag",
              "!doc": "Sets or clears the SO_BROADCAST socket option. When this option is set, UDP packets may be sent to a local interface's broadcast address."
            },
            setTTL: {
              "!type": "fn(ttl: number)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_setttl_ttl",
              "!doc": "Sets the IP_TTL socket option. TTL stands for \"Time to Live,\" but in this context it specifies the number of IP hops that a packet is allowed to go through. Each router or gateway that forwards a packet decrements the TTL. If the TTL is decremented to 0 by a router, it will not be forwarded. Changing TTL values is typically done for network probes or when multicasting."
            },
            setMulticastTTL: {
              "!type": "fn(ttl: number)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_setmulticastttl_ttl",
              "!doc": "Sets the IP_MULTICAST_TTL socket option. TTL stands for \"Time to Live,\" but in this context it specifies the number of IP hops that a packet is allowed to go through, specifically for multicast traffic. Each router or gateway that forwards a packet decrements the TTL. If the TTL is decremented to 0 by a router, it will not be forwarded."
            },
            setMulticastLoopback: {
              "!type": "fn(flag: bool)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_setmulticastloopback_flag",
              "!doc": "Sets or clears the IP_MULTICAST_LOOP socket option. When this option is set, multicast packets will also be received on the local interface."
            },
            addMembership: {
              "!type": "fn(multicastAddress: string, multicastInterface?: string)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_addmembership_multicastaddress_multicastinterface",
              "!doc": "Tells the kernel to join a multicast group with IP_ADD_MEMBERSHIP socket option."
            },
            dropMembership: {
              "!type": "fn(multicastAddress: string, multicastInterface?: string)",
              "!url": "https://nodejs.org/api/dgram.html#dgram_socket_dropmembership_multicastaddress_multicastinterface",
              "!doc": "Opposite of addMembership - tells the kernel to leave a multicast group with IP_DROP_MEMBERSHIP socket option. This is automatically called by the kernel when the socket is closed or process terminates, so most apps will never need to call this."
            }
          },
          "!url": "https://nodejs.org/api/dgram.html#dgram_class_dgram_socket",
          "!doc": "The dgram Socket class encapsulates the datagram functionality. It should be created via dgram.createSocket(type, [callback])."
        }
      },
      fs: {
        "!url": "https://nodejs.org/api/fs.html",
        "!doc": "File I/O is provided by simple wrappers around standard POSIX functions. To use this module do require('fs').\nAll the methods have asynchronous and synchronous forms.",
        rename: {
          "!type": "fn(oldPath: string, newPath: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_rename_oldpath_newpath_callback",
          "!doc": "Asynchronous rename(2). No arguments other than a possible exception are given to the completion callback."
        },
        renameSync: {
          "!type": "fn(oldPath: string, newPath: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_renamesync_oldpath_newpath",
          "!doc": "Synchronous rename(2)."
        },
        ftruncate: {
          "!type": "fn(fd: number, len: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_ftruncate_fd_len_callback",
          "!doc": "Asynchronous ftruncate(2). No arguments other than a possible exception are given to the completion callback."
        },
        ftruncateSync: {
          "!type": "fn(fd: number, len: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_ftruncatesync_fd_len",
          "!doc": "Synchronous ftruncate(2)."
        },
        truncate: {
          "!type": "fn(path: string, len: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_truncate_path_len_callback",
          "!doc": "Asynchronous truncate(2). No arguments other than a possible exception are given to the completion callback."
        },
        truncateSync: {
          "!type": "fn(path: string, len: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_truncatesync_path_len",
          "!doc": "Synchronous truncate(2)."
        },
        chown: {
          "!type": "fn(path: string, uid: number, gid: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_chown_path_uid_gid_callback",
          "!doc": "Asynchronous chown(2). No arguments other than a possible exception are given to the completion callback."
        },
        chownSync: {
          "!type": "fn(path: string, uid: number, gid: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_chownsync_path_uid_gid",
          "!doc": "Synchronous chown(2)."
        },
        fchown: {
          "!type": "fn(fd: number, uid: number, gid: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fchown_fd_uid_gid_callback",
          "!doc": "Asynchronous fchown(2). No arguments other than a possible exception are given to the completion callback."
        },
        fchownSync: {
          "!type": "fn(fd: number, uid: number, gid: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fchownsync_fd_uid_gid",
          "!doc": "Synchronous fchown(2)."
        },
        lchown: {
          "!type": "fn(path: string, uid: number, gid: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lchown_path_uid_gid_callback",
          "!doc": "Asynchronous lchown(2). No arguments other than a possible exception are given to the completion callback."
        },
        lchownSync: {
          "!type": "fn(path: string, uid: number, gid: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lchownsync_path_uid_gid",
          "!doc": "Synchronous lchown(2)."
        },
        chmod: {
          "!type": "fn(path: string, mode: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_chmod_path_mode_callback",
          "!doc": "Asynchronous chmod(2). No arguments other than a possible exception are given to the completion callback."
        },
        chmodSync: {
          "!type": "fn(path: string, mode: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_chmodsync_path_mode",
          "!doc": "Synchronous chmod(2)."
        },
        fchmod: {
          "!type": "fn(fd: number, mode: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fchmod_fd_mode_callback",
          "!doc": "Asynchronous fchmod(2). No arguments other than a possible exception are given to the completion callback."
        },
        fchmodSync: {
          "!type": "fn(fd: number, mode: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fchmodsync_fd_mode",
          "!doc": "Synchronous fchmod(2)."
        },
        lchmod: {
          "!type": "fn(path: string, mode: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lchmod_path_mode_callback",
          "!doc": "Asynchronous lchmod(2). No arguments other than a possible exception are given to the completion callback."
        },
        lchmodSync: {
          "!type": "fn(path: string, mode: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lchmodsync_path_mode",
          "!doc": "Synchronous lchmod(2)."
        },
        stat: {
          "!type": "fn(path: string, callback?: fn(err: +Error, stats: +fs.Stats) -> ?) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_stat_path_callback",
          "!doc": "Asynchronous stat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object."
        },
        lstat: {
          "!type": "fn(path: string, callback?: fn(err: +Error, stats: +fs.Stats) -> ?) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lstat_path_callback",
          "!doc": "Asynchronous lstat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. lstat() is identical to stat(), except that if path is a symbolic link, then the link itself is stat-ed, not the file that it refers to."
        },
        fstat: {
          "!type": "fn(fd: number, callback?: fn(err: +Error, stats: +fs.Stats) -> ?) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fstat_fd_callback",
          "!doc": "Asynchronous fstat(2). The callback gets two arguments (err, stats) where stats is a fs.Stats object. fstat() is identical to stat(), except that the file to be stat-ed is specified by the file descriptor fd."
        },
        statSync: {
          "!type": "fn(path: string) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_statsync_path",
          "!doc": "Synchronous stat(2). Returns an instance of fs.Stats."
        },
        lstatSync: {
          "!type": "fn(path: string) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_lstatsync_path",
          "!doc": "Synchronous lstat(2). Returns an instance of fs.Stats."
        },
        fstatSync: {
          "!type": "fn(fd: number) -> +fs.Stats",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fstatsync_fd",
          "!doc": "Synchronous fstat(2). Returns an instance of fs.Stats."
        },
        link: {
          "!type": "fn(srcpath: string, dstpath: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_link_srcpath_dstpath_callback",
          "!doc": "Asynchronous link(2). No arguments other than a possible exception are given to the completion callback."
        },
        linkSync: {
          "!type": "fn(srcpath: string, dstpath: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_linksync_srcpath_dstpath",
          "!doc": "Synchronous link(2)."
        },
        symlink: {
          "!type": "fn(srcpath: string, dstpath: string, type?: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_symlink_srcpath_dstpath_type_callback",
          "!doc": "Asynchronous symlink(2). No arguments other than a possible exception are given to the completion callback. type argument can be either 'dir', 'file', or 'junction' (default is 'file'). It is only used on Windows (ignored on other platforms). Note that Windows junction points require the destination path to be absolute. When using 'junction', the destination argument will automatically be normalized to absolute path."
        },
        symlinkSync: {
          "!type": "fn(srcpath: string, dstpath: string, type?: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_symlinksync_srcpath_dstpath_type",
          "!doc": "Synchronous symlink(2)."
        },
        readlink: {
          "!type": "fn(path: string, callback?: fn(err: +Error, linkString: string))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readlink_path_callback",
          "!doc": "Asynchronous readlink(2). The callback gets two arguments (err, linkString)."
        },
        readlinkSync: {
          "!type": "fn(path: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readlinksync_path",
          "!doc": "Synchronous readlink(2). Returns the symbolic link's string value."
        },
        realpath: {
          "!type": "fn(path: string, cache: bool, callback: fn(err: +Error, resolvedPath: string))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_realpath_path_cache_callback",
          "!doc": "Asynchronous realpath(2). The callback gets two arguments (err, resolvedPath). May use process.cwd to resolve relative paths. cache is an object literal of mapped paths that can be used to force a specific path resolution or avoid additional fs.stat calls for known real paths."
        },
        realpathSync: {
          "!type": "fn(path: string, cache?: bool) -> string",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_realpathsync_path_cache",
          "!doc": "Synchronous realpath(2). Returns the resolved path."
        },
        unlink: {
          "!type": "fn(path: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_unlink_path_callback",
          "!doc": "Asynchronous unlink(2). No arguments other than a possible exception are given to the completion callback."
        },
        unlinkSync: {
          "!type": "fn(path: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_unlinksync_path",
          "!doc": "Synchronous unlink(2)."
        },
        rmdir: {
          "!type": "fn(path: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_rmdir_path_callback",
          "!doc": "Asynchronous rmdir(2). No arguments other than a possible exception are given to the completion callback."
        },
        rmdirSync: {
          "!type": "fn(path: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_rmdirsync_path",
          "!doc": "Synchronous rmdir(2)."
        },
        mkdir: {
          "!type": "fn(path: string, mode?: ?, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_mkdir_path_mode_callback",
          "!doc": "Asynchronous mkdir(2). No arguments other than a possible exception are given to the completion callback. mode defaults to 0777."
        },
        mkdirSync: {
          "!type": "fn(path: string, mode?: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_mkdirsync_path_mode",
          "!doc": "Synchronous mkdir(2)."
        },
        readdir: {
          "!type": "fn(path: string, callback?: fn(err: +Error, files: [string]))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readdir_path_callback",
          "!doc": "Asynchronous readdir(3). Reads the contents of a directory. The callback gets two arguments (err, files) where files is an array of the names of the files in the directory excluding '.' and '..'."
        },
        readdirSync: {
          "!type": "fn(path: string) -> [string]",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readdirsync_path",
          "!doc": "Synchronous readdir(3). Returns an array of filenames excluding '.' and '..'."
        },
        close: {
          "!type": "fn(fd: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_close_fd_callback",
          "!doc": "Asynchronous close(2). No arguments other than a possible exception are given to the completion callback."
        },
        closeSync: {
          "!type": "fn(fd: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_closesync_fd",
          "!doc": "Synchronous close(2)."
        },
        open: {
          "!type": "fn(path: string, flags: string, mode?: string, callback?: fn(err: +Error, fd: number))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_open_path_flags_mode_callback",
          "!doc": "Asynchronous file open."
        },
        openSync: {
          "!type": "fn(path: string, flags: string, mode?: string) -> number",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_opensync_path_flags_mode",
          "!doc": "Synchronous open(2)."
        },
        utimes: {
          "!type": "fn(path: string, atime: number, mtime: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_utimes_path_atime_mtime_callback",
          "!doc": "Change file timestamps of the file referenced by the supplied path."
        },
        utimesSync: {
          "!type": "fn(path: string, atime: number, mtime: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_utimessync_path_atime_mtime",
          "!doc": "Change file timestamps of the file referenced by the supplied path."
        },
        futimes: {
          "!type": "fn(fd: number, atime: number, mtime: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_futimes_fd_atime_mtime_callback",
          "!doc": "Change the file timestamps of a file referenced by the supplied file descriptor."
        },
        futimesSync: {
          "!type": "fn(fd: number, atime: number, mtime: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_futimessync_fd_atime_mtime",
          "!doc": "Change the file timestamps of a file referenced by the supplied file descriptor."
        },
        fsync: {
          "!type": "fn(fd: number, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fsync_fd_callback",
          "!doc": "Asynchronous fsync(2). No arguments other than a possible exception are given to the completion callback."
        },
        fsyncSync: {
          "!type": "fn(fd: number)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_fsyncsync_fd",
          "!doc": "Synchronous fsync(2)."
        },
        write: {
          "!type": "fn(fd: number, buffer: +Buffer, offset: number, length: number, position: number, callback?: fn(err: +Error, written: number, buffer: +Buffer))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_write_fd_buffer_offset_length_position_callback",
          "!doc": "Write buffer to the file specified by fd."
        },
        writeSync: {
          "!type": "fn(fd: number, buffer: +Buffer, offset: number, length: number, position: number) -> number",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_writesync_fd_buffer_offset_length_position",
          "!doc": "Synchronous version of fs.write(). Returns the number of bytes written."
        },
        read: {
          "!type": "fn(fd: number, buffer: +Buffer, offset: number, length: number, position: number, callback?: fn(err: +Error, bytesRead: number, buffer: +Buffer))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_read_fd_buffer_offset_length_position_callback",
          "!doc": "Read data from the file specified by fd."
        },
        readSync: {
          "!type": "fn(fd: number, buffer: +Buffer, offset: number, length: number, position: number) -> number",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readsync_fd_buffer_offset_length_position",
          "!doc": "Synchronous version of fs.read. Returns the number of bytesRead."
        },
        readFile: {
          "!type": "fn(filename: string, callback: fn(err: +Error, data: +Buffer))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readfile_filename_options_callback",
          "!doc": "Asynchronously reads the entire contents of a file."
        },
        readFileSync: {
          "!type": "fn(filename: string, encoding: string) -> +Buffer",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_readfilesync_filename_options",
          "!doc": "Synchronous version of fs.readFile. Returns the contents of the filename."
        },
        writeFile: {
          "!type": "fn(filename: string, data: string|+Buffer, encoding?: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_writefile_filename_data_options_callback",
          "!doc": "Asynchronously writes data to a file, replacing the file if it already exists. data can be a string or a buffer."
        },
        writeFileSync: {
          "!type": "fn(filename: string, data: string|+Buffer, encoding?: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_writefilesync_filename_data_options",
          "!doc": "The synchronous version of fs.writeFile."
        },
        appendFile: {
          "!type": "fn(filename: string, data: string|+Buffer, encoding?: string, callback?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_appendfile_filename_data_options_callback",
          "!doc": "Asynchronously append data to a file, creating the file if it not yet exists. data can be a string or a buffer."
        },
        appendFileSync: {
          "!type": "fn(filename: string, data: string|+Buffer, encoding?: string)",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_appendfilesync_filename_data_options",
          "!doc": "The synchronous version of fs.appendFile."
        },
        watchFile: {
          "!type": "fn(filename: string, options: ?, listener: fn(current: +fs.Stats, prev: +fs.Stats))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_watchfile_filename_options_listener",
          "!doc": "Watch for changes on filename. The callback listener will be called each time the file is accessed."
        },
        unwatchFile: {
          "!type": "fn(filename: string, listener?: fn())",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_unwatchfile_filename_listener",
          "!doc": "Stop watching for changes on filename. If listener is specified, only that particular listener is removed. Otherwise, all listeners are removed and you have effectively stopped watching filename."
        },
        watch: {
          "!type": "fn(filename: string, options?: ?, listener?: fn(event: string, filename: string)) -> +fs.FSWatcher",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_watch_filename_options_listener",
          "!doc": "Watch for changes on filename, where filename is either a file or a directory. The returned object is a fs.FSWatcher."
        },
        exists: {
          "!type": "fn(path: string, callback?: fn(exists: bool))",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_exists_path_callback",
          "!doc": "Test whether or not the given path exists by checking with the file system. Then call the callback argument with either true or false."
        },
        existsSync: {
          "!type": "fn(path: string) -> bool",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_existssync_path",
          "!doc": "Synchronous version of fs.exists."
        },
        Stats: {
          "!type": "fn()",
          prototype: {
            isFile: "fn() -> bool",
            isDirectory: "fn() -> bool",
            isBlockDevice: "fn() -> bool",
            isCharacterDevice: "fn() -> bool",
            isSymbolicLink: "fn() -> bool",
            isFIFO: "fn() -> bool",
            isSocket: "fn() -> bool",
            dev: "number",
            ino: "number",
            mode: "number",
            nlink: "number",
            uid: "number",
            gid: "number",
            rdev: "number",
            size: "number",
            blksize: "number",
            blocks: "number",
            atime: "+Date",
            mtime: "+Date",
            ctime: "+Date"
          },
          "!url": "https://nodejs.org/api/fs.html#fs_class_fs_stats",
          "!doc": "Objects returned from fs.stat(), fs.lstat() and fs.fstat() and their synchronous counterparts are of this type."
        },
        createReadStream: {
          "!type": "fn(path: string, options?: ?) -> +stream.Readable",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_createreadstream_path_options",
          "!doc": "Returns a new ReadStream object."
        },
        createWriteStream: {
          "!type": "fn(path: string, options?: ?) -> +stream.Writable",
          "!url": "https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options",
          "!doc": "Returns a new WriteStream object."
        },
        FSWatcher: {
          "!type": "fn()",
          prototype: {
            close: "fn()"
          },
          "!url": "https://nodejs.org/api/fs.html#fs_class_fs_fswatcher",
          "!doc": "Objects returned from fs.watch() are of this type."
        }
      },
      path: {
        "!url": "https://nodejs.org/api/path.html",
        "!doc": "This module contains utilities for handling and transforming file paths. Almost all these methods perform only string transformations. The file system is not consulted to check whether paths are valid.",
        normalize: {
          "!type": "fn(p: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_normalize_p",
          "!doc": "Normalize a string path, taking care of '..' and '.' parts."
        },
        join: {
          "!type": "fn() -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_join_path1_path2",
          "!doc": "Join all arguments together and normalize the resulting path."
        },
        resolve: {
          "!type": "fn(from: string, from2: string, from3: string, from4: string, from5: string, to: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_resolve_from_to",
          "!doc": "Resolves to to an absolute path."
        },
        relative: {
          "!type": "fn(from: string, to: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_relative_from_to",
          "!doc": "Solve the relative path from from to to."
        },
        dirname: {
          "!type": "fn(p: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_dirname_p",
          "!doc": "Return the directory name of a path. Similar to the Unix dirname command."
        },
        basename: {
          "!type": "fn(p: string, ext?: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_basename_p_ext",
          "!doc": "Return the last portion of a path. Similar to the Unix basename command."
        },
        extname: {
          "!type": "fn(p: string) -> string",
          "!url": "https://nodejs.org/api/path.html#path_path_extname_p",
          "!doc": "Return the extension of the path, from the last '.' to end of string in the last portion of the path. If there is no '.' in the last portion of the path or the first character of it is '.', then it returns an empty string."
        },
        sep: {
          "!type": "string",
          "!url": "https://nodejs.org/api/path.html#path_path_sep",
          "!doc": "The platform-specific file separator. '\\\\' or '/'."
        },
        delimiter: {
          "!type": "string",
          "!url": "https://nodejs.org/api/path.html#path_path_delimiter",
          "!doc": "The platform-specific path delimiter, ; or ':'."
        }
      },
      string_decoder: {
        "!url": "https://nodejs.org/api/string_decoder.html",
        "!doc": "StringDecoder decodes a buffer to a string. It is a simple interface to buffer.toString() but provides additional support for utf8.",
        StringDecoder: {
          "!type": "fn(encoding?: string)",
          prototype: {
            write: {
              "!type": "fn(buffer: +Buffer) -> string",
              "!url": "https://nodejs.org/api/string_decoder.html#string_decoder_decoder_write_buffer",
              "!doc": "Returns a decoded string."
            },
            end: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/string_decoder.html#string_decoder_decoder_end",
              "!doc": "Returns any trailing bytes that were left in the buffer."
            }
          },
          "!url": "https://nodejs.org/api/string_decoder.html#string_decoder_class_stringdecoder",
          "!doc": "Accepts a single argument, encoding which defaults to utf8."
        }
      },
      tls: {
        "!url": "https://nodejs.org/api/tls.html",
        "!doc": "The tls module uses OpenSSL to provide Transport Layer Security and/or Secure Socket Layer: encrypted stream communication.",
        CLIENT_RENEG_LIMIT: "number",
        CLIENT_RENEG_WINDOW: "number",
        SLAB_BUFFER_SIZE: "number",
        getCiphers: {
          "!type": "fn() -> [string]",
          "!url": "https://nodejs.org/api/tls.html#tls_tls_getciphers",
          "!doc": "Returns an array with the names of the supported SSL ciphers."
        },
        Server: {
          "!type": "fn()",
          prototype: {
            "!proto": "net.Server.prototype",
            listen: {
              "!type": "fn(port: number, host?: string, callback?: fn())",
              "!url": "https://nodejs.org/api/tls.html#tls_server_listen_port_host_callback",
              "!doc": "Begin accepting connections on the specified port and host. If the host is omitted, the server will accept connections directed to any IPv4 address (INADDR_ANY)."
            },
            close: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/tls.html#tls_server_close",
              "!doc": "Stops the server from accepting new connections. This function is asynchronous, the server is finally closed when the server emits a 'close' event."
            },
            addContext: {
              "!type": "fn(hostName: string, credentials: tls.Server.credentials)",
              "!url": "https://nodejs.org/api/tls.html#tls_server_addcontext_hostname_credentials",
              "!doc": "Add secure context that will be used if client request's SNI hostname is matching passed hostname (wildcards can be used). credentials can contain key, cert and ca."
            }
          },
          "!url": "https://nodejs.org/api/tls.html#tls_class_tls_server",
          "!doc": "This class is a subclass of net.Server and has the same methods on it. Instead of accepting just raw TCP connections, this accepts encrypted connections using TLS or SSL."
        },
        createServer: {
          "!type": "fn(options?: ?, connectionListener?: fn(stream: +tls.CleartextStream)) -> +tls.Server",
          "!url": "https://nodejs.org/api/tls.html#tls_tls_createserver_options_secureconnectionlistener",
          "!doc": "Creates a new tls.Server. The connectionListener argument is automatically set as a listener for the secureConnection event."
        },
        CleartextStream: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Duplex.prototype",
            authorized: {
              "!type": "bool",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_authorized",
              "!doc": "A boolean that is true if the peer certificate was signed by one of the specified CAs, otherwise false"
            },
            authorizationError: {
              "!type": "+Error",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_authorizationerror",
              "!doc": "The reason why the peer's certificate has not been verified. This property becomes available only when cleartextStream.authorized === false."
            },
            getPeerCertificate: {
              "!type": "fn() -> ?",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_getpeercertificate",
              "!doc": "Returns an object representing the peer's certificate. The returned object has some properties corresponding to the field of the certificate."
            },
            getCipher: {
              "!type": "fn() -> tls.cipher",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_getcipher",
              "!doc": "Returns an object representing the cipher name and the SSL/TLS protocol version of the current connection."
            },
            address: {
              "!type": "net.address",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_address",
              "!doc": "Returns the bound address, the address family name and port of the underlying socket as reported by the operating system. Returns an object with three properties, e.g. { port: 12346, family: 'IPv4', address: '127.0.0.1' }"
            },
            remoteAddress: {
              "!type": "string",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_remoteaddress",
              "!doc": "The string representation of the remote IP address. For example, '74.125.127.100' or '2001:4860:a005::68'."
            },
            remotePort: {
              "!type": "number",
              "!url": "https://nodejs.org/api/tls.html#tls_cleartextstream_remoteport",
              "!doc": "The numeric representation of the remote port. For example, 443."
            }
          },
          "!url": "https://nodejs.org/api/tls.html#tls_class_tls_cleartextstream",
          "!doc": "This is a stream on top of the Encrypted stream that makes it possible to read/write an encrypted data as a cleartext data."
        },
        connect: {
          "!type": "fn(port: number, host?: string, options: ?, listener: fn()) -> +tls.CleartextStream",
          "!url": "https://nodejs.org/api/tls.html#tls_tls_connect_options_callback",
          "!doc": "Creates a new client connection to the given port and host (old API) or options.port and options.host. (If host is omitted, it defaults to localhost.)"
        },
        createSecurePair: {
          "!type": "fn(credentials?: crypto.credentials, isServer?: bool, requestCert?: bool, rejectUnauthorized?: bool) -> +tls.SecurePair",
          "!url": "https://nodejs.org/api/tls.html#tls_tls_createsecurepair_credentials_isserver_requestcert_rejectunauthorized",
          "!doc": "Creates a new secure pair object with two streams, one of which reads/writes encrypted data, and one reads/writes cleartext data. Generally the encrypted one is piped to/from an incoming encrypted data stream, and the cleartext one is used as a replacement for the initial encrypted stream."
        },
        SecurePair: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            cleartext: {
              "!type": "+tls.CleartextStream",
              "!url": "https://nodejs.org/api/tls.html#tls_class_securepair",
              "!doc": "Returned by tls.createSecurePair."
            },
            encrypted: {
              "!type": "+stream.Duplex",
              "!url": "https://nodejs.org/api/tls.html#tls_class_securepair",
              "!doc": "Returned by tls.createSecurePair."
            }
          },
          "!url": "https://nodejs.org/api/tls.html#tls_class_securepair",
          "!doc": "Returned by tls.createSecurePair."
        }
      },
      crypto: {
        "!url": "https://nodejs.org/api/crypto.html",
        "!doc": "The crypto module offers a way of encapsulating secure credentials to be used as part of a secure HTTPS net or http connection.\nIt also offers a set of wrappers for OpenSSL's hash, hmac, cipher, decipher, sign and verify methods.",
        getCiphers: {
          "!type": "fn() -> [string]",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_getciphers",
          "!doc": "Returns an array with the names of the supported ciphers."
        },
        getHashes: {
          "!type": "fn() -> [string]",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_gethashes",
          "!doc": "Returns an array with the names of the supported hash algorithms."
        },
        createCredentials: {
          "!type": "fn(details?: ?) -> crypto.credentials",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createcredentials_details",
          "!doc": "Creates a credentials object."
        },
        createHash: {
          "!type": "fn(algorithm: string) -> +crypto.Hash",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createhash_algorithm",
          "!doc": "Creates and returns a hash object, a cryptographic hash with the given algorithm which can be used to generate hash digests."
        },
        Hash: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Duplex.prototype",
            update: {
              "!type": "fn(data: +Buffer, encoding?: string)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_hash_update_data_input_encoding",
              "!doc": "Updates the hash content with the given data, the encoding of which is given in input_encoding and can be 'utf8', 'ascii' or 'binary'. If no encoding is provided, then a buffer is expected."
            },
            digest: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_hash_digest_encoding",
              "!doc": "Calculates the digest of all of the passed data to be hashed. The encoding can be 'hex', 'binary' or 'base64'. If no encoding is provided, then a buffer is returned."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_hash",
          "!doc": "The class for creating hash digests of data."
        },
        createHmac: {
          "!type": "fn(algorithm: string, key: string) -> +crypto.Hmac",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createhmac_algorithm_key",
          "!doc": "Creates and returns a hmac object, a cryptographic hmac with the given algorithm and key."
        },
        Hmac: {
          "!type": "fn()",
          prototype: {
            update: {
              "!type": "fn(data: +Buffer)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_hmac_update_data",
              "!doc": "Update the hmac content with the given data. This can be called many times with new data as it is streamed."
            },
            digest: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_hmac_digest_encoding",
              "!doc": "Calculates the digest of all of the passed data to the hmac. The encoding can be 'hex', 'binary' or 'base64'. If no encoding is provided, then a buffer is returned."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_hmac",
          "!doc": "Class for creating cryptographic hmac content."
        },
        createCipher: {
          "!type": "fn(algorithm: string, password: string) -> +crypto.Cipher",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createcipher_algorithm_password",
          "!doc": "Creates and returns a cipher object, with the given algorithm and password."
        },
        createCipheriv: {
          "!type": "fn(algorithm: string, password: string, iv: string) -> +crypto.Cipher",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv",
          "!doc": "Creates and returns a cipher object, with the given algorithm, key and iv."
        },
        Cipher: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Duplex.prototype",
            update: {
              "!type": "fn(data: +Buffer, input_encoding?: string, output_encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_cipher_update_data_input_encoding_output_encoding",
              "!doc": "Updates the cipher with data, the encoding of which is given in input_encoding and can be 'utf8', 'ascii' or 'binary'. If no encoding is provided, then a buffer is expected."
            },
            "final": {
              "!type": "fn(output_encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_cipher_final_output_encoding",
              "!doc": "Returns any remaining enciphered contents, with output_encoding being one of: 'binary', 'base64' or 'hex'. If no encoding is provided, then a buffer is returned."
            },
            setAutoPadding: {
              "!type": "fn(auto_padding: bool)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_cipher_setautopadding_auto_padding_true",
              "!doc": "You can disable automatic padding of the input data to block size. If auto_padding is false, the length of the entire input data must be a multiple of the cipher's block size or final will fail. Useful for non-standard padding, e.g. using 0x0 instead of PKCS padding. You must call this before cipher.final."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_cipher",
          "!doc": "Class for encrypting data."
        },
        createDecipher: {
          "!type": "fn(algorithm: string, password: string) -> +crypto.Decipher",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createdecipher_algorithm_password",
          "!doc": "Creates and returns a decipher object, with the given algorithm and key. This is the mirror of the createCipher() above."
        },
        createDecipheriv: {
          "!type": "fn(algorithm: string, key: string, iv: string) -> +crypto.Decipher",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createdecipheriv_algorithm_key_iv",
          "!doc": "Creates and returns a decipher object, with the given algorithm, key and iv. This is the mirror of the createCipheriv() above."
        },
        Decipher: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Duplex.prototype",
            update: {
              "!type": "fn(data: +Buffer, input_encoding?: string, output_encoding?: string)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_decipher_update_data_input_encoding_output_encoding",
              "!doc": "Updates the decipher with data, which is encoded in 'binary', 'base64' or 'hex'. If no encoding is provided, then a buffer is expected."
            },
            "final": {
              "!type": "fn(output_encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_decipher_final_output_encoding",
              "!doc": "Returns any remaining plaintext which is deciphered, with output_encoding being one of: 'binary', 'ascii' or 'utf8'. If no encoding is provided, then a buffer is returned."
            },
            setAutoPadding: {
              "!type": "fn(auto_padding: bool)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_decipher_setautopadding_auto_padding_true",
              "!doc": "You can disable auto padding if the data has been encrypted without standard block padding to prevent decipher.final from checking and removing it. Can only work if the input data's length is a multiple of the ciphers block size. You must call this before streaming data to decipher.update."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_decipher",
          "!doc": "Class for decrypting data."
        },
        createSign: {
          "!type": "fn(algorithm: string) -> +crypto.Sign",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createsign_algorithm",
          "!doc": "Creates and returns a signing object, with the given algorithm. On recent OpenSSL releases, openssl list-public-key-algorithms will display the available signing algorithms. Examples are 'RSA-SHA256'."
        },
        Sign: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Writable.prototype",
            update: {
              "!type": "fn(data: +Buffer)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_sign_update_data",
              "!doc": "Updates the sign object with data. This can be called many times with new data as it is streamed."
            },
            sign: {
              "!type": "fn(private_key: string, output_format: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_sign_sign_private_key_output_format",
              "!doc": "Calculates the signature on all the updated data passed through the sign. private_key is a string containing the PEM encoded private key for signing."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_sign",
          "!doc": "Class for generating signatures."
        },
        createVerify: {
          "!type": "fn(algorith: string) -> +crypto.Verify",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_createverify_algorithm",
          "!doc": "Creates and returns a verification object, with the given algorithm. This is the mirror of the signing object above."
        },
        Verify: {
          "!type": "fn()",
          prototype: {
            "!proto": "stream.Writable.prototype",
            update: {
              "!type": "fn(data: +Buffer)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_verifier_update_data",
              "!doc": "Updates the verifier object with data. This can be called many times with new data as it is streamed."
            },
            verify: {
              "!type": "fn(object: string, signature: string, signature_format?: string) -> bool",
              "!url": "https://nodejs.org/api/crypto.html#crypto_verifier_verify_object_signature_signature_format",
              "!doc": "Verifies the signed data by using the object and signature. object is a string containing a PEM encoded object, which can be one of RSA public key, DSA public key, or X.509 certificate. signature is the previously calculated signature for the data, in the signature_format which can be 'binary', 'hex' or 'base64'. If no encoding is specified, then a buffer is expected."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_verify",
          "!doc": "Class for verifying signatures."
        },
        createDiffieHellman: {
          "!type": "fn(prime: number, encoding?: string) -> +crypto.DiffieHellman",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_creatediffiehellman_prime_length",
          "!doc": "Creates a Diffie-Hellman key exchange object and generates a prime of the given bit length. The generator used is 2."
        },
        DiffieHellman: {
          "!type": "fn()",
          prototype: {
            generateKeys: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_generatekeys_encoding",
              "!doc": "Generates private and public Diffie-Hellman key values, and returns the public key in the specified encoding. This key should be transferred to the other party. Encoding can be 'binary', 'hex', or 'base64'. If no encoding is provided, then a buffer is returned."
            },
            computeSecret: {
              "!type": "fn(other_public_key: +Buffer, input_encoding?: string, output_encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_computesecret_other_public_key_input_encoding_output_encoding",
              "!doc": "Computes the shared secret using other_public_key as the other party's public key and returns the computed shared secret. Supplied key is interpreted using specified input_encoding, and secret is encoded using specified output_encoding. Encodings can be 'binary', 'hex', or 'base64'. If the input encoding is not provided, then a buffer is expected."
            },
            getPrime: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_getprime_encoding",
              "!doc": "Returns the Diffie-Hellman prime in the specified encoding, which can be 'binary', 'hex', or 'base64'. If no encoding is provided, then a buffer is returned."
            },
            getGenerator: {
              "!type": "fn(encoding: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_getgenerator_encoding",
              "!doc": "Returns the Diffie-Hellman prime in the specified encoding, which can be 'binary', 'hex', or 'base64'. If no encoding is provided, then a buffer is returned."
            },
            getPublicKey: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_getpublickey_encoding",
              "!doc": "Returns the Diffie-Hellman public key in the specified encoding, which can be 'binary', 'hex', or 'base64'. If no encoding is provided, then a buffer is returned."
            },
            getPrivateKey: {
              "!type": "fn(encoding?: string) -> +Buffer",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_getprivatekey_encoding",
              "!doc": "Returns the Diffie-Hellman private key in the specified encoding, which can be 'binary', 'hex', or 'base64'. If no encoding is provided, then a buffer is returned."
            },
            setPublicKey: {
              "!type": "fn(public_key: +Buffer, encoding?: string)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_setpublickey_public_key_encoding",
              "!doc": "Sets the Diffie-Hellman public key. Key encoding can be 'binary', 'hex' or 'base64'. If no encoding is provided, then a buffer is expected."
            },
            setPrivateKey: {
              "!type": "fn(public_key: +Buffer, encoding?: string)",
              "!url": "https://nodejs.org/api/crypto.html#crypto_diffiehellman_setprivatekey_private_key_encoding",
              "!doc": "Sets the Diffie-Hellman private key. Key encoding can be 'binary', 'hex' or 'base64'. If no encoding is provided, then a buffer is expected."
            }
          },
          "!url": "https://nodejs.org/api/crypto.html#crypto_class_diffiehellman",
          "!doc": "The class for creating Diffie-Hellman key exchanges."
        },
        getDiffieHellman: {
          "!type": "fn(group_name: string) -> +crypto.DiffieHellman",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_getdiffiehellman_group_name",
          "!doc": "Creates a predefined Diffie-Hellman key exchange object. The supported groups are: 'modp1', 'modp2', 'modp5' (defined in RFC 2412) and 'modp14', 'modp15', 'modp16', 'modp17', 'modp18' (defined in RFC 3526). The returned object mimics the interface of objects created by crypto.createDiffieHellman() above, but will not allow to change the keys (with diffieHellman.setPublicKey() for example). The advantage of using this routine is that the parties don't have to generate nor exchange group modulus beforehand, saving both processor and communication time."
        },
        pbkdf2: {
          "!type": "fn(password: string, salt: string, iterations: number, keylen: number, callback: fn(err: +Error, derivedKey: string))",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2_password_salt_iterations_keylen_callback",
          "!doc": "Asynchronous PBKDF2 applies pseudorandom function HMAC-SHA1 to derive a key of given length from the given password, salt and iterations. The callback gets two arguments (err, derivedKey)."
        },
        pbkdf2Sync: {
          "!type": "fn(password: string, salt: string, iterations: number, keylen: number) -> string",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_pbkdf2sync_password_salt_iterations_keylen",
          "!doc": "Synchronous PBKDF2 function. Returns derivedKey or throws error."
        },
        randomBytes: {
          "!type": "fn(size: number, callback?: fn(err: +Error, buf: +Buffer))",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback",
          "!doc": "Generates cryptographically strong pseudo-random data."
        },
        pseudoRandomBytes: {
          "!type": "fn(size: number, callback?: fn(err: +Error, buf: +Buffer))",
          "!url": "https://nodejs.org/api/crypto.html#crypto_crypto_pseudorandombytes_size_callback",
          "!doc": "Generates non-cryptographically strong pseudo-random data. The data returned will be unique if it is sufficiently long, but is not necessarily unpredictable. For this reason, the output of this function should never be used where unpredictability is important, such as in the generation of encryption keys."
        },
        DEFAULT_ENCODING: "string"
      },
      util: {
        "!url": "https://nodejs.org/api/util.html",
        "!doc": "The util module is primarily designed to support the needs of Node's internal APIs. Many of these utilities are useful for your own programs. If you find that these functions are lacking for your purposes, however, you are encouraged to write your own utilities. We are not interested in any future additions to the util module that are unnecessary for Node's internal functionality.",
        format: {
          "!type": "fn(format: string) -> string",
          "!url": "https://nodejs.org/api/util.html#util_util_format_format",
          "!doc": "Returns a formatted string using the first argument as a printf-like format."
        },
        debug: {
          "!type": "fn(msg: string)",
          "!url": "https://nodejs.org/api/util.html#util_util_debug_string",
          "!doc": "A synchronous output function. Will block the process and output string immediately to stderr."
        },
        error: {
          "!type": "fn(msg: string)",
          "!url": "https://nodejs.org/api/util.html#util_util_error",
          "!doc": "Same as util.debug() except this will output all arguments immediately to stderr."
        },
        puts: {
          "!type": "fn(data: string)",
          "!url": "https://nodejs.org/api/util.html#util_util_puts",
          "!doc": "A synchronous output function. Will block the process and output all arguments to stdout with newlines after each argument."
        },
        print: {
          "!type": "fn(data: string)",
          "!url": "https://nodejs.org/api/util.html#util_util_print",
          "!doc": "A synchronous output function. Will block the process, cast each argument to a string then output to stdout. Does not place newlines after each argument."
        },
        log: {
          "!type": "fn(string: string)",
          "!url": "https://nodejs.org/api/util.html#util_util_log_string",
          "!doc": "Output with timestamp on stdout."
        },
        inspect: {
          "!type": "fn(object: ?, options: ?) -> string",
          "!url": "https://nodejs.org/api/util.html#util_util_inspect_object_options",
          "!doc": "Return a string representation of object, which is useful for debugging."
        },
        isArray: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isarray_object",
          "!doc": "Returns true if the given \"object\" is an Array. false otherwise."
        },
        isRegExp: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isregexp_object",
          "!doc": "Returns true if the given \"object\" is a RegExp. false otherwise."
        },
        isDate: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isdate_object",
          "!doc": "Returns true if the given \"object\" is a Date. false otherwise."
        },
        isError: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_iserror_object",
          "!doc": "Returns true if the given \"object\" is an Error. false otherwise."
        },
        isBoolean: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isboolean_object",
          "!doc": "Returns true if the given \"object\" is a Boolean. false otherwise."
        },
        isNull: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isnull_object",
          "!doc": "Returns true if the given \"object\" is strictly null. false otherwise."
        },
        isNullOrUndefined: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isnullorundefined_object",
          "!doc": "Returns true if the given \"object\" is null or undefined. false otherwise."
        },
        isNumber: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isnumber_object",
          "!doc": "Returns true if the given \"object\" is a Number. false otherwise."
        },
        isString: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isstring_object",
          "!doc": "Returns true if the given \"object\" is a String. false otherwise."
        },
        isSymbol: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_issymbol_object",
          "!doc": "Returns true if the given \"object\" is a Symbol. false otherwise."
        },
        isUndefined: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isundefined_object",
          "!doc": "Returns true if the given \"object\" is undefined. false otherwise."
        },
        isObject: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isobject_object",
          "!doc": "Returns true if the given \"object\" is strictly an Object and not a Function. false otherwise."
        },
        isFunction: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isfunction_object",
          "!doc": "Returns true if the given \"object\" is a Function. false otherwise."
        },
        isPrimitive: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isprimitive_object",
          "!doc": "Returns true if the given \"object\" is a primitive type. false otherwise."
        },
        isBuffer: {
          "!type": "fn(object: ?) -> bool",
          "!url": "https://nodejs.org/api/util.html#util_util_isbuffer_object",
          "!doc": "Returns true if the given \"object\" is a Buffer. false otherwise."
        },
        inherits: {
          "!type": "fn(constructor: ?, superConstructor: ?)",
          "!url": "https://nodejs.org/api/util.html#util_util_inherits_constructor_superconstructor",
          "!doc": "Inherit the prototype methods from one constructor into another. The prototype of constructor will be set to a new object created from superConstructor."
        }
      },
      assert: {
        "!type": "fn(value: ?, message?: string)",
        fail: {
          "!type": "fn(actual: ?, expected: ?, message: string, operator: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_fail_actual_expected_message_operator",
          "!doc": "Throws an exception that displays the values for actual and expected separated by the provided operator."
        },
        ok: {
          "!type": "fn(value: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert",
          "!doc": "This module is used for writing unit tests for your applications, you can access it with require('assert')."
        },
        equal: {
          "!type": "fn(actual: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_equal_actual_expected_message",
          "!doc": "Tests shallow, coercive equality with the equal comparison operator ( == )."
        },
        notEqual: {
          "!type": "fn(actual: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_notequal_actual_expected_message",
          "!doc": "Tests shallow, coercive non-equality with the not equal comparison operator ( != )."
        },
        deepEqual: {
          "!type": "fn(actual: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_deepequal_actual_expected_message",
          "!doc": "Tests for deep equality."
        },
        notDeepEqual: {
          "!type": "fn(acutal: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_notdeepequal_actual_expected_message",
          "!doc": "Tests for any deep inequality."
        },
        strictEqual: {
          "!type": "fn(actual: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_strictequal_actual_expected_message",
          "!doc": "Tests strict equality, as determined by the strict equality operator ( === )"
        },
        notStrictEqual: {
          "!type": "fn(actual: ?, expected: ?, message?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_notstrictequal_actual_expected_message",
          "!doc": "Tests strict non-equality, as determined by the strict not equal operator ( !== )"
        },
        "throws": {
          "!type": "fn(block: fn(), error?: ?, messsage?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_throws_block_error_message",
          "!doc": "Expects block to throw an error. error can be constructor, regexp or validation function."
        },
        doesNotThrow: {
          "!type": "fn(block: fn(), error?: ?, messsage?: string)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_doesnotthrow_block_message",
          "!doc": "Expects block not to throw an error."
        },
        ifError: {
          "!type": "fn(value: ?)",
          "!url": "https://nodejs.org/api/assert.html#assert_assert_iferror_value",
          "!doc": "Tests if value is not a false value, throws if it is a true value. Useful when testing the first argument, error in callbacks."
        },
        "!url": "https://nodejs.org/api/assert.html#assert_assert",
        "!doc": "This module is used for writing unit tests for your applications, you can access it with require('assert')."
      },
      tty: {
        "!url": "https://nodejs.org/api/tty.html",
        "!doc": "The tty module houses the tty.ReadStream and tty.WriteStream classes. In most cases, you will not need to use this module directly.",
        isatty: {
          "!type": "fn(fd: number) -> bool",
          "!url": "https://nodejs.org/api/tty.html#tty_tty_isatty_fd",
          "!doc": "Returns true or false depending on if the fd is associated with a terminal."
        }
      },
      domain: {
        "!url": "https://nodejs.org/api/domain.html",
        "!doc": "Domains provide a way to handle multiple different IO operations as a single group. If any of the event emitters or callbacks registered to a domain emit an error event, or throw an error, then the domain object will be notified, rather than losing the context of the error in the process.on('uncaughtException') handler, or causing the program to exit immediately with an error code.",
        create: {
          "!type": "fn() -> +events.EventEmitter",
          "!url": "https://nodejs.org/api/domain.html#domain_domain_create",
          "!doc": "Returns a new Domain object."
        },
        Domain: {
          "!type": "fn()",
          prototype: {
            "!proto": "events.EventEmitter.prototype",
            run: {
              "!type": "fn(fn: fn())",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_run_fn",
              "!doc": "Run the supplied function in the context of the domain, implicitly binding all event emitters, timers, and lowlevel requests that are created in that context."
            },
            members: {
              "!type": "[+events.EventEmitter]",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_members",
              "!doc": "An array of timers and event emitters that have been explicitly added to the domain."
            },
            add: {
              "!type": "fn(emitter: +events.EventEmitter)",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_add_emitter",
              "!doc": "Explicitly adds an emitter to the domain. If any event handlers called by the emitter throw an error, or if the emitter emits an error event, it will be routed to the domain's error event, just like with implicit binding."
            },
            remove: {
              "!type": "fn(emitter: +events.EventEmitter)",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_remove_emitter",
              "!doc": "The opposite of domain.add(emitter). Removes domain handling from the specified emitter."
            },
            bind: {
              "!type": "fn(callback: fn(err: +Error, data: ?)) -> !0",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_bind_callback",
              "!doc": "The returned function will be a wrapper around the supplied callback function. When the returned function is called, any errors that are thrown will be routed to the domain's error event."
            },
            intercept: {
              "!type": "fn(cb: fn(data: ?)) -> !0",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_intercept_callback",
              "!doc": "This method is almost identical to domain.bind(callback). However, in addition to catching thrown errors, it will also intercept Error objects sent as the first argument to the function."
            },
            dispose: {
              "!type": "fn()",
              "!url": "https://nodejs.org/api/domain.html#domain_domain_dispose",
              "!doc": "The dispose method destroys a domain, and makes a best effort attempt to clean up any and all IO that is associated with the domain. Streams are aborted, ended, closed, and/or destroyed. Timers are cleared. Explicitly bound callbacks are no longer called. Any error events that are raised as a result of this are ignored."
            }
          },
          "!url": "https://nodejs.org/api/domain.html#domain_class_domain",
          "!doc": "The Domain class encapsulates the functionality of routing errors and uncaught exceptions to the active Domain object."
        }
      },
      "os.cpuSpec": {
        model: "string",
        speed: "number",
        times: {
          user: "number",
          nice: "number",
          sys: "number",
          idle: "number",
          irq: "number"
        }
      },
      "process.memoryUsage.type": {
        rss: "number",
        heapTotal: "?",
        number: "?",
        heapUsed: "number"
      },
      "net.address": {
        port: "number",
        family: "string",
        address: "string"
      },
      "url.type": {
        href: "string",
        protocol: "string",
        auth: "string",
        hostname: "string",
        port: "string",
        host: "string",
        pathname: "string",
        search: "string",
        query: "string",
        slashes: "bool",
        hash: "string"
      },
      "tls.Server.credentials": {
        key: "string",
        cert: "string",
        ca: "string"
      },
      "tls.cipher": {
        name: "string",
        version: "string"
      },
      "crypto.credentials": {
        pfx: "string",
        key: "string",
        passphrase: "string",
        cert: "string",
        ca: "string",
        crl: "string",
        ciphers: "string"
      },
      buffer: {
        Buffer: "Buffer",
        INSPECT_MAX_BYTES: "number",
        SlowBuffer: "Buffer"
      },
      module: {},
      timers: {
        setTimeout: {
          "!type": "fn(callback: fn(), ms: number) -> timers.Timer",
          "!url": "https://nodejs.org/api/globals.html#globals_settimeout_cb_ms",
          "!doc": "Run callback cb after at least ms milliseconds. The actual delay depends on external factors like OS timer granularity and system load."
        },
        clearTimeout: {
          "!type": "fn(id: timers.Timer)",
          "!url": "https://nodejs.org/api/globals.html#globals_cleartimeout_t",
          "!doc": "Stop a timer that was previously created with setTimeout(). The callback will not execute."
        },
        setInterval: {
          "!type": "fn(callback: fn(), ms: number) -> timers.Timer",
          "!url": "https://nodejs.org/api/globals.html#globals_setinterval_cb_ms",
          "!doc": "Run callback cb repeatedly every ms milliseconds. Note that the actual interval may vary, depending on external factors like OS timer granularity and system load. It's never less than ms but it may be longer."
        },
        clearInterval: {
          "!type": "fn(id: timers.Timer)",
          "!url": "https://nodejs.org/api/globals.html#globals_clearinterval_t",
          "!doc": "Stop a timer that was previously created with setInterval(). The callback will not execute."
        },
        setImmediate: {
          "!type": "fn(callback: fn()) -> timers.Timer",
          "!url": "https://nodejs.org/api/timers.html#timers_setimmediate_callback_arg",
          "!doc": "Schedule the 'immediate' execution of callback after I/O events callbacks."
        },
        clearImmediate: {
          "!type": "fn(id: timers.Timer)",
          "!url": "https://nodejs.org/api/timers.html#timers_clearimmediate_immediateid",
          "!doc": "Stops an immediate from triggering."
        },
        Timer: {
          unref: {
            "!type": "fn()",
            "!url": "https://nodejs.org/api/timers.html#timers_unref",
            "!doc": "Create a timer that is active but if it is the only item left in the event loop won't keep the program running."
          },
          ref: {
            "!type": "fn()",
            "!url": "https://nodejs.org/api/timers.html#timers_unref",
            "!doc": "Explicitly request the timer hold the program open (cancel the effect of 'unref')."
          }
        }
      }
    },
    process: {
      stdout: {
        "!type": "+stream.Writable",
        "!url": "https://nodejs.org/api/process.html#process_process_stdout",
        "!doc": "A Writable Stream to stdout."
      },
      stderr: {
        "!type": "+stream.Writable",
        "!url": "https://nodejs.org/api/process.html#process_process_stderr",
        "!doc": "A writable stream to stderr."
      },
      stdin: {
        "!type": "+stream.Readable",
        "!url": "https://nodejs.org/api/process.html#process_process_stdin",
        "!doc": "A Readable Stream for stdin. The stdin stream is paused by default, so one must call process.stdin.resume() to read from it."
      },
      argv: {
        "!type": "[string]",
        "!url": "https://nodejs.org/api/process.html#process_process_argv",
        "!doc": "An array containing the command line arguments. The first element will be 'node', the second element will be the name of the JavaScript file. The next elements will be any additional command line arguments."
      },
      execPath: {
        "!type": "string",
        "!url": "https://nodejs.org/api/process.html#process_process_execpath",
        "!doc": "This is the absolute pathname of the executable that started the process."
      },
      abort: {
        "!type": "fn()",
        "!url": "https://nodejs.org/api/process.html#process_process_abort",
        "!doc": "This causes node to emit an abort. This will cause node to exit and generate a core file."
      },
      chdir: {
        "!type": "fn(directory: string)",
        "!url": "https://nodejs.org/api/process.html#process_process_chdir_directory",
        "!doc": "Changes the current working directory of the process or throws an exception if that fails."
      },
      cwd: {
        "!type": "fn()",
        "!url": "https://nodejs.org/api/process.html#process_process_cwd",
        "!doc": "Returns the current working directory of the process."
      },
      env: {
        "!url": "https://nodejs.org/api/process.html#process_process_env",
        "!doc": "An object containing the user environment."
      },
      exit: {
        "!type": "fn(code?: number)",
        "!url": "https://nodejs.org/api/process.html#process_process_exit_code",
        "!doc": "Ends the process with the specified code. If omitted, exit uses the 'success' code 0."
      },
      getgid: {
        "!type": "fn() -> number",
        "!url": "https://nodejs.org/api/process.html#process_process_getgid",
        "!doc": "Gets the group identity of the process. This is the numerical group id, not the group name."
      },
      setgid: {
        "!type": "fn(id: number)",
        "!url": "https://nodejs.org/api/process.html#process_process_setgid_id",
        "!doc": "Sets the group identity of the process. This accepts either a numerical ID or a groupname string. If a groupname is specified, this method blocks while resolving it to a numerical ID."
      },
      getuid: {
        "!type": "fn() -> number",
        "!url": "https://nodejs.org/api/process.html#process_process_getuid",
        "!doc": "Gets the user identity of the process. This is the numerical userid, not the username."
      },
      setuid: {
        "!type": "fn(id: number)",
        "!url": "https://nodejs.org/api/process.html#process_process_setuid_id",
        "!doc": "Sets the user identity of the process. This accepts either a numerical ID or a username string. If a username is specified, this method blocks while resolving it to a numerical ID."
      },
      version: {
        "!type": "string",
        "!url": "https://nodejs.org/api/process.html#process_process_version",
        "!doc": "A compiled-in property that exposes NODE_VERSION."
      },
      versions: {
        http_parser: "string",
        node: "string",
        v8: "string",
        ares: "string",
        uv: "string",
        zlib: "string",
        openssl: "string",
        "!url": "https://nodejs.org/api/process.html#process_process_versions",
        "!doc": "A property exposing version strings of node and its dependencies."
      },
      config: {
        target_defaults: {
          cflags: "[?]",
          default_configuration: "string",
          defines: "[string]",
          include_dirs: "[string]",
          libraries: "[string]"
        },
        variables: {
          clang: "number",
          host_arch: "string",
          node_install_npm: "bool",
          node_install_waf: "bool",
          node_prefix: "string",
          node_shared_openssl: "bool",
          node_shared_v8: "bool",
          node_shared_zlib: "bool",
          node_use_dtrace: "bool",
          node_use_etw: "bool",
          node_use_openssl: "bool",
          target_arch: "string",
          v8_no_strict_aliasing: "number",
          v8_use_snapshot: "bool",
          visibility: "string"
        },
        "!url": "https://nodejs.org/api/process.html#process_process_config",
        "!doc": "An Object containing the JavaScript representation of the configure options that were used to compile the current node executable. This is the same as the \"config.gypi\" file that was produced when running the ./configure script."
      },
      kill: {
        "!type": "fn(pid: number, signal?: string)",
        "!url": "https://nodejs.org/api/process.html#process_process_kill_pid_signal",
        "!doc": "Send a signal to a process. pid is the process id and signal is the string describing the signal to send. Signal names are strings like 'SIGINT' or 'SIGUSR1'. If omitted, the signal will be 'SIGTERM'."
      },
      pid: {
        "!type": "number",
        "!url": "https://nodejs.org/api/process.html#process_process_pid",
        "!doc": "The PID of the process."
      },
      title: {
        "!type": "string",
        "!url": "https://nodejs.org/api/process.html#process_process_title",
        "!doc": "Getter/setter to set what is displayed in 'ps'."
      },
      arch: {
        "!type": "string",
        "!url": "https://nodejs.org/api/process.html#process_process_arch",
        "!doc": "What processor architecture you're running on: 'arm', 'ia32', or 'x64'."
      },
      platform: {
        "!type": "string",
        "!url": "https://nodejs.org/api/process.html#process_process_platform",
        "!doc": "What platform you're running on: 'darwin', 'freebsd', 'linux', 'sunos' or 'win32'"
      },
      memoryUsage: {
        "!type": "fn() -> process.memoryUsage.type",
        "!url": "https://nodejs.org/api/process.html#process_process_memoryusage",
        "!doc": "Returns an object describing the memory usage of the Node process measured in bytes."
      },
      nextTick: {
        "!type": "fn(callback: fn())",
        "!url": "https://nodejs.org/api/process.html#process_process_nexttick_callback",
        "!doc": "On the next loop around the event loop call this callback. This is not a simple alias to setTimeout(fn, 0), it's much more efficient. It typically runs before any other I/O events fire, but there are some exceptions."
      },
      maxTickDepth: {
        "!type": "number",
        "!url": "https://nodejs.org/api/process.html#process_process_maxtickdepth",
        "!doc": "The maximum depth of nextTick-calling nextTick-callbacks that will be evaluated before allowing other forms of I/O to occur."
      },
      umask: {
        "!type": "fn(mask?: number) -> number",
        "!url": "https://nodejs.org/api/process.html#process_process_umask_mask",
        "!doc": "Sets or reads the process's file mode creation mask. Child processes inherit the mask from the parent process. Returns the old mask if mask argument is given, otherwise returns the current mask."
      },
      uptime: {
        "!type": "fn() -> number",
        "!url": "https://nodejs.org/api/process.html#process_process_uptime",
        "!doc": "Number of seconds Node has been running."
      },
      hrtime: {
        "!type": "fn() -> [number]",
        "!url": "https://nodejs.org/api/process.html#process_process_hrtime",
        "!doc": "Returns the current high-resolution real time in a [seconds, nanoseconds] tuple Array. It is relative to an arbitrary time in the past. It is not related to the time of day and therefore not subject to clock drift. The primary use is for measuring performance between intervals."
      },
      "!url": "https://nodejs.org/api/globals.html#globals_process",
      "!doc": "The process object."
    },
    global: {
      "!type": "<top>",
      "!url": "https://nodejs.org/api/globals.html#globals_global",
      "!doc": "In browsers, the top-level scope is the global scope. That means that in browsers if you're in the global scope var something will define a global variable. In Node this is different. The top-level scope is not the global scope; var something inside a Node module will be local to that module."
    },
    console: {
      log: {
        "!type": "fn(text: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_log_data",
        "!doc": "Prints to stdout with newline. This function can take multiple arguments in a printf()-like way."
      },
      info: {
        "!type": "fn(text: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_info_data",
        "!doc": "Same as console.log."
      },
      error: {
        "!type": "fn(text: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_error_data",
        "!doc": "Same as console.log but prints to stderr."
      },
      warn: {
        "!type": "fn(text: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_warn_data",
        "!doc": "Same as console.error."
      },
      dir: {
        "!type": "fn(obj: ?)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_dir_obj",
        "!doc": "Uses util.inspect on obj and prints resulting string to stdout."
      },
      time: {
        "!type": "fn(label: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_time_label",
        "!doc": "Mark a time."
      },
      timeEnd: {
        "!type": "fn(label: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_timeend_label",
        "!doc": "Finish timer, record output."
      },
      trace: {
        "!type": "fn(label: string)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_trace_label",
        "!doc": "Print a stack trace to stderr of the current position."
      },
      assert: {
        "!type": "fn(expression: bool)",
        "!url": "https://nodejs.org/api/stdio.html#stdio_console_assert_expression_message",
        "!doc": "Same as assert.ok() where if the expression evaluates as false throw an AssertionError with message."
      },
      "!url": "https://nodejs.org/api/globals.html#globals_console",
      "!doc": "Used to print to stdout and stderr."
    },
    __filename: {
      "!type": "string",
      "!url": "https://nodejs.org/api/globals.html#globals_filename",
      "!doc": "The filename of the code being executed. This is the resolved absolute path of this code file. For a main program this is not necessarily the same filename used in the command line. The value inside a module is the path to that module file."
    },
    __dirname: {
      "!type": "string",
      "!url": "https://nodejs.org/api/globals.html#globals_dirname",
      "!doc": "The name of the directory that the currently executing script resides in."
    },
    setTimeout: "timers.setTimeout",
    clearTimeout: "timers.clearTimeout",
    setInterval: "timers.setInterval",
    clearInterval: "timers.clearInterval",
    Buffer: {
      "!type": "fn(str: string, encoding?: string) -> +Buffer",
      prototype: {
        "!proto": "String.prototype",
        write: "fn(string: string, offset?: number, length?: number, encoding?: string) -> number",
        toString: "fn(encoding?: string, start?: number, end?: number) -> string",
        length: "number",
        copy: "fn(targetBuffer: +Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number)",
        slice: "fn(start?: number, end?: number) -> +Buffer",
        readUInt8: "fn(offset: number, noAssert?: bool) -> number",
        readUInt16LE: "fn(offset: number, noAssert?: bool) -> number",
        readUInt16BE: "fn(offset: number, noAssert?: bool) -> number",
        readUInt32LE: "fn(offset: number, noAssert?: bool) -> number",
        readUInt32BE: "fn(offset: number, noAssert?: bool) -> number",
        readInt8: "fn(offset: number, noAssert?: bool) -> number",
        readInt16LE: "fn(offset: number, noAssert?: bool) -> number",
        readInt16BE: "fn(offset: number, noAssert?: bool) -> number",
        readInt32LE: "fn(offset: number, noAssert?: bool) -> number",
        readInt32BE: "fn(offset: number, noAssert?: bool) -> number",
        readFloatLE: "fn(offset: number, noAssert?: bool) -> number",
        readFloatBE: "fn(offset: number, noAssert?: bool) -> number",
        readDoubleLE: "fn(offset: number, noAssert?: bool) -> number",
        readDoubleBE: "fn(offset: number, noAssert?: bool) -> number",
        writeUInt8: "fn(value: number, offset: number, noAssert?: bool)",
        writeUInt16LE: "fn(value: number, offset: number, noAssert?: bool)",
        writeUInt16BE: "fn(value: number, offset: number, noAssert?: bool)",
        writeUInt32LE: "fn(value: number, offset: number, noAssert?: bool)",
        writeUInt32BE: "fn(value: number, offset: number, noAssert?: bool)",
        writeInt8: "fn(value: number, offset: number, noAssert?: bool)",
        writeInt16LE: "fn(value: number, offset: number, noAssert?: bool)",
        writeInt16BE: "fn(value: number, offset: number, noAssert?: bool)",
        writeInt32LE: "fn(value: number, offset: number, noAssert?: bool)",
        writeInt32BE: "fn(value: number, offset: number, noAssert?: bool)",
        writeFloatLE: "fn(value: number, offset: number, noAssert?: bool)",
        writeFloatBE: "fn(value: number, offset: number, noAssert?: bool)",
        writeDoubleLE: "fn(value: number, offset: number, noAssert?: bool)",
        writeDoubleBE: "fn(value: number, offset: number, noAssert?: bool)",
        fill: "fn(value: ?, offset?: number, end?: number)"
      },
      isBuffer: "fn(obj: ?) -> bool",
      byteLength: "fn(string: string, encoding?: string) -> number",
      concat: "fn(list: [+Buffer], totalLength?: number) -> +Buffer",
      "!url": "https://nodejs.org/api/globals.html#globals_class_buffer",
      "!doc": "Used to handle binary data."
    }
  };
});
