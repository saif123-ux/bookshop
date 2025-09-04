const cds = require('@sap/cds')

// Add error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Don't exit immediately for database errors
})

// Initialize and start the server
async function startServer() {
  try {
    // Connect to database first
    const db = await cds.connect.to('db')
    console.log('✅ Connected to SQLite database')
    
    // Then serve all services
    const server = await cds.serve('all')
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    // Add health endpoint
    server.get('/health', (req, res) => {
      res.status(200).send('OK')
    })
    
    // Add root endpoint
    server.get('/', (req, res) => {
      res.send('Bookshop CAP Service is running with SQLite! Use /browse for data.')
    })
    
    return server
    
  } catch (error) {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  }
}

startServer()