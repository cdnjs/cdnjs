
// Initial workings for Event Source. 
// NOT DONE YET.

// zlEventSource('http://localhost:3000/stream-sse')

// // Browser EventSource implementation
// export function zlEventSource(url) {
//   const evtSource = new EventSource(url)
  
//   // Handle connection open
//   evtSource.addEventListener('open', () => {
//     console.log('Connection opened')
//   })

//   // Handle regular messages
//   evtSource.addEventListener('message', (event) => {
//     const data = JSON.parse(event.data)
//     console.log('Message:', data)
//   })

//   // Handle status events
//   evtSource.addEventListener('status', (event) => {
//     console.log('Status:', event.data)
//   })

//   // Handle close event
//   evtSource.addEventListener('close', (event) => {
//     console.log('Server is closing the connection:', JSON.parse(event.data))
//     evtSource.close()
//   })

//   // Handle errors (now only for actual errors)
//   evtSource.addEventListener('error', (event) => {
//     // readyState 2 means CLOSED
//     if (evtSource.readyState === 2) {
//       console.log('Connection closed')
//     } else {
//       console.log('Connection error:', event)
//       evtSource.close() // Close on unexpected errors
//     }
//   })

//   return evtSource
// }


// Node.js SSE implementation using fetch
// async function zlNodeEventSource(url, options = {}) {
//   const {
//     reconnectInterval = 1000,
//     shouldReconnect = true
//   } = options

//   const emitter = new EventEmitter()
//   let isConnected = false
//   let shouldStop = false

//   async function connect() {
//     try {
//       console.log('Starting SSE connection to:', url)
//       const response = await fetch(url)
//       console.log('Got response:', response.status, response.headers.get('content-type'))
      
//       if (!response.ok) {
//         throw new Error(`HTTP error! status: ${response.status}`)
//       }
      
//       isConnected = true
//       const reader = response.body.getReader()
//       const decoder = new TextDecoder()
//       let buffer = ''
      
//       // Emit open event
//       process.nextTick(() => {
//         console.log('Emitting open event')
//         emitter.emit('open')
//       })

//       try {
//         while (!shouldStop) {
//           const { done, value } = await reader.read()
//           console.log('Read chunk:', done ? 'DONE' : `${value.length} bytes`)
          
//           if (done) {
//             console.log('Stream complete')
//             break
//           }

//           // Decode chunk and add to buffer
//           buffer += decoder.decode(value, { stream: true })
//           console.log('Buffer:', buffer)
          
//           // Split buffer into complete messages
//           const messages = buffer.split('\n\n')
//           buffer = messages.pop() // Keep incomplete message in buffer

//           // Process complete messages
//           for (const message of messages) {
//             if (message.trim() === '') continue
//             console.log('Processing message:', message)

//             // Parse the message
//             const lines = message.split('\n')
//             let eventType = 'message'
//             let data = ''

//             for (const line of lines) {
//               if (line.startsWith('event:')) {
//                 eventType = line.slice(6).trim()
//                 console.log('Found event type:', eventType)
//               }
//               if (line.startsWith('data:')) {
//                 data = line.slice(5).trim()
//                 console.log('Found data:', data)
//               }
//             }

//             // Try to parse JSON data
//             try {
//               const parsedData = JSON.parse(data)
//               console.log('Emitting event:', eventType, parsedData)
//               emitter.emit(eventType, { data: parsedData })
//             } catch (err) {
//               console.log('Failed to parse JSON:', err.message)
//               console.log('Emitting raw data:', eventType, data)
//               emitter.emit(eventType, { data })
//             }
//           }
//         }
//       } finally {
//         isConnected = false
//         reader.cancel()
//       }
//     } catch (error) {
//       console.log('Stream error:', error)
//       emitter.emit('error', error)
//     }

//     // Reconnect if needed
//     if (shouldReconnect && !shouldStop) {
//       console.log(`Reconnecting in ${reconnectInterval}ms...`)
//       setTimeout(connect, reconnectInterval)
//     } else {
//       emitter.emit('close')
//     }
//   }

//   // Start the initial connection
//   connect()

//   // Add method to close the connection
//   emitter.close = () => {
//     shouldStop = true
//   }

//   return emitter
// }

// // Example usage
// async function example() {
//   console.log('Starting example')
//   const events = await zlNodeEventSource('http://localhost:3000/stream-sse', {
//     reconnectInterval: 3000 // Reconnect after 3 seconds
//   })
  
//   events.on('open', () => console.log('Connection opened'))
//   events.on('message', event => console.log('Message:', event.data))
//   events.on('status', event => console.log('Status:', event.data))
//   events.on('close', () => console.log('Connection closed'))
//   events.on('error', error => console.log('Error:', error))

//   // Optional: Stop after 30 seconds
//   // setTimeout(() => {
//   //   console.log('Closing connection...')
//   //   events.close()
//   // }, 30000)
// }

// example().catch(err => console.error('Example failed:', err))

// // Simple EventEmitter that works in both Node.js and browser
// class EventEmitter {
//   constructor() {
//     this.events = {}
//   }

//   on(event, callback) {
//     if (!this.events[event]) this.events[event] = []
//     this.events[event].push(callback)
//     return this
//   }

//   emit(event, data) {
//     const callbacks = this.events[event]
//     if (callbacks) {
//       callbacks.forEach(callback => callback(data))
//     }
//     return this
//   }

//   off(event, callback) {
//     const callbacks = this.events[event]
//     if (callbacks) {
//       this.events[event] = callbacks.filter(cb => cb !== callback)
//     }
//     return this
//   }
// }

// // Platform-agnostic SSE client
// function createSSEClient(url, options = {}) {
//   // Use browser's EventSource if available
//   if (typeof EventSource !== 'undefined') {
//     const source = new EventSource(url)
//     const emitter = new EventEmitter()

//     source.onopen = () => emitter.emit('open')
//     source.onmessage = event => {
//       try {
//         const data = JSON.parse(event.data)
//         emitter.emit('message', { data })
//       } catch {
//         emitter.emit('message', { data: event.data })
//       }
//     }
//     source.onerror = error => emitter.emit('error', error)

//     // Handle custom events
//     if (options.events) {
//       options.events.forEach(eventName => {
//         source.addEventListener(eventName, event => {
//           try {
//             const data = JSON.parse(event.data)
//             emitter.emit(eventName, { data })
//           } catch {
//             emitter.emit(eventName, { data: event.data })
//           }
//         })
//       })
//     }

//     // Add close method
//     emitter.close = () => source.close()
//     return Promise.resolve(emitter)
//   }

//   // Node.js implementation using fetch
//   return (async () => {
//     const emitter = new EventEmitter()
//     let shouldStop = false

//     try {
//       const response = await fetch(url)
//       const reader = response.body.getReader()
//       const decoder = new TextDecoder()
//       let buffer = ''

//       // Emit open event
//       emitter.emit('open')

//       while (!shouldStop) {
//         const { done, value } = await reader.read()
        
//         if (done) break

//         // Decode chunk and add to buffer
//         buffer += decoder.decode(value, { stream: true })
        
//         // Split buffer into complete messages
//         const messages = buffer.split('\n\n')
//         buffer = messages.pop() // Keep incomplete message in buffer

//         // Process complete messages
//         for (const message of messages) {
//           if (message.trim() === '') continue

//           // Parse the message
//           const lines = message.split('\n')
//           let eventType = 'message'
//           let data = ''

//           for (const line of lines) {
//             if (line.startsWith('event:')) {
//               eventType = line.slice(6).trim()
//             }
//             if (line.startsWith('data:')) {
//               data = line.slice(5).trim()
//             }
//           }

//           // Try to parse JSON data
//           try {
//             const parsedData = JSON.parse(data)
//             emitter.emit(eventType, { data: parsedData })
//           } catch {
//             emitter.emit(eventType, { data })
//           }
//         }
//       }
//     } catch (error) {
//       emitter.emit('error', error)
//     }

//     // Add close method
//     emitter.close = () => {
//       shouldStop = true
//     }

//     return emitter
//   })()
// }

// // Example usage (works in both Node.js and browser)
// async function example() {
//   const events = await createSSEClient('http://localhost:3000/stream-sse', {
//     events: ['status'] // Custom events to listen for
//   })
  
//   events.on('open', () => console.log('Connection opened'))
//   events.on('message', event => console.log('Message:', event.data))
//   events.on('status', event => console.log('Status:', event.data))
//   events.on('error', error => console.log('Error:', error))

//   // Optional: Close after some time
//   // setTimeout(() => {
//   //   events.close()
//   // }, 30000)
// }

// // Run example if we're in Node.js
// if (typeof window === 'undefined') {
//   example()
// }

// // Export for use as a module
// export { createSSEClient }

// Browser example showing reconnection behavior
// function demoEventSource(url) {
//   const source = new EventSource(url)
//   let connectionCount = 0

//   source.onopen = () => {
//     connectionCount++
//     console.log(`Connection #${connectionCount} opened`)
//   }

//   source.onmessage = (event) => {
//     const data = JSON.parse(event.data)
//     console.log(`Message received:`, data)
//   }

//   source.addEventListener('status', (event) => {
//     console.log('Status:', event.data)
//   })

//   source.onerror = (error) => {
//     console.log('Connection lost. EventSource will automatically try to reconnect...')
//   }

//   // Return cleanup function
//   return () => source.close()
// }

// // Start the demo if in browser
// if (typeof window !== 'undefined') {
//   const cleanup = demoEventSource('http://localhost:3000/stream-sse')
  
//   // Optional: Stop after 30 seconds
//   // setTimeout(cleanup, 30000)
// }
