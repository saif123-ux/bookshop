const cds = require('@sap/cds')

// Add comprehensive error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error.message)
  // Don't exit - keep the server running
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason.message)
  // Don't exit - keep the server running
})

// Start the server with robust error handling
async function startServer() {
  try {
    console.log('🚀 Starting CAP server...')
    
    // Connect to database
    const db = await cds.connect.to('db')
    console.log('✅ Connected to SQLite database')
    
    // Serve all services
    const server = await cds.serve('all')
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    // Add health endpoint
    server.get('/health', (req, res) => {
      res.status(200).send('OK')
    })
    
    // Add root endpoint
    server.get('/', (req, res) => {
      res.send('Bookshop CAP Service is running! Use /browse for data.')
    })
    
    console.log('✅ Service endpoints ready')
    return server
    
  } catch (error) {
    console.error('❌ Failed to start server:', error.message)
    // Don't exit - let Render handle restarts
  }
}

// Start the server
startServer()