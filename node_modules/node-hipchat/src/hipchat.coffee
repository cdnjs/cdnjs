https       = require 'https'
querystring = require 'querystring'
_           = require 'underscore'

class HipChatClient
  
  host:    'api.hipchat.com'

  constructor: (@apikey, @agent) ->
    @rateLimits =
      limit: 0
      remaining: 0
      reset: 0

  createRoom: (params, callback) ->
    data = 
      name: params.name
      owner_user_id: params.owner_user_id
      privacy: params.privacy ? 'public'
      topic: params.topic
      guest_access: if params.guest_access then 1 else 0

    options = @_prepareOptions
      method: 'post'
      path:   '/v1/rooms/create'
      query:  data
    @_sendRequest options, callback

  listRooms: (callback) ->
    options = @_prepareOptions
      method: 'get'
      path:   '/v1/rooms/list'
    @_sendRequest options, callback
  
  showRoom: (room, callback) ->
    options = @_prepareOptions
      method: 'get'
      path:   '/v1/rooms/show'
      query:
        room_id: room
    @_sendRequest options, callback

  deleteRoom: (room, callback) ->
    options = @_prepareOptions
      method: 'post'
      path:    '/v1/rooms/delete'
      query:
        room_id: room
    @_sendRequest options, callback


  getHistory: (params, callback) ->
    data =
      room_id:  params.room_id || params.room
      date:     params.date ? 'recent'
      timezone: params.timezone ? 'UTC'
    
    options = @_prepareOptions
      method: 'get'
      path:   '/v1/rooms/history'
      query: data

    @_sendRequest options, callback

  postMessage: (params, callback) ->
    data =
      room_id: params.room_id || params.room
      from:    params.from ? 'node-hipchat'
      message: params.message
      notify:  if params.notify then 1 else 0
      color:   params.color ? 'yellow'
      message_format: params.message_format ? 'html'
  
    options = @_prepareOptions
      method: 'post'
      path:   '/v1/rooms/message'
      data: data

    @_sendRequest options, callback
  
# users/* methods

  showUser: (user_id, callback) ->
    options = @_prepareOptions
      method: 'get'
      path:   '/v1/users/show'
      query:
        user_id: user_id
    @_sendRequest options, callback

  listUsers: (callback) ->
    options = @_prepareOptions
      method: 'get'
      path:   '/v1/users/list'
    @_sendRequest options, callback


  deleteUser: (user_id, callback) ->
    options = @_prepareOptions
      method: 'post'
      path:   '/v1/users/delete'
      query:
        user_id: user_id
    @_sendRequest options, callback  


  createUser: (params, callback) ->
    data =
      email: params.email
      name:  params.name
      mention_name: params.name.replace(/\s+/g, '')
      title: params.title
      is_group_admin: if params.is_group_admin then 1 else 0 
      password: params.password
      timezone: params.timezone ? 'UTC'

    
    options = @_prepareOptions
      method: 'post'
      path:   '/v1/users/create'
      data:   data


    @_sendRequest options, callback  

  updateUser: (params, callback) ->
    data = 
      user_id: params.user_id
      email: params.email
      name:  params.name
      mention_name: params.name.replace(/\s+/g, '')
      title: params.title
      is_group_admin: if params.is_group_admin then 1 else 0 
      password: params.password
      timezone: params.timezone ? 'UTC' 
    
    options = @_prepareOptions
      method: 'post'
      path:   '/v1/users/update'
      data:   data

    @_sendRequest options, callback


  getRateLimits: () ->
    @rateLimits


# private methods

  _prepareOptions: (op) ->
    #console.log ">>> _prepareOptions"
    #console.log op
    #console.log "<<< _prepareOptions"

    op.host = @host
    
    op.query = {} unless op.query?
    op.query['auth_token'] = @apikey
    op.query = querystring.stringify(op.query)
    op.path += '?' + op.query
    
    if op.method is 'post' and op.data?
      op.data = querystring.stringify(op.data)
      op.headers = {} unless op.headers?
      op.headers['Content-Type']   = 'application/x-www-form-urlencoded'
      op.headers['Content-Length'] = op.data.length

    if(@agent)
      op.agent = @agent
    
    return op

  _sendRequest: (options, callback) ->
    req = https.request(options)
    
    req.on 'response', (res) =>
      buffer = ''
      res.on 'data', (chunk) ->
        buffer += chunk
      res.on 'end', =>
        headers = res.headers
        @rateLimits =
          limit:        headers['x-ratelimit-limit'],
          remaining:    headers['x-ratelimit-remaining'],
          reset:        headers['x-ratelimit-reset']

        if callback?
          if res.statusCode is 200
            value = if options.json is false then buffer else JSON.parse(buffer)
            callback(value, null)
          else
            callback(null, buffer)

    if options.data? then req.write('' + options.data)
    req.end()


exports = module.exports = HipChatClient
