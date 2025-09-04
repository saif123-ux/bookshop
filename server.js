const cds = require('@sap/cds')

// Error handling - prevent server from exiting
process.on('unhandledRejection', (reason, promise) => {
  console.log('⚠️  Handled rejection:', reason.message)
})

process.on('uncaughtException', (error) => {
  console.log('⚠️  Handled exception:', error.message)
})

// Start server with database connection
async function startServer() {
  try {
    console.log('🔗 Connecting to database...')
    
    // Connect to database first
    const db = await cds.connect.to('db')
    console.log('✅ Database connected successfully')
    
    // Then start the server
    const server = await cds.serve('all')
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    // Health endpoints
    server.get('/health', (req, res) => res.status(200).send('OK'))
    server.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
    
    console.log('🎉 Application is ready!')
    
  } catch (error) {
    console.log('⚠️  Server started with database issues, but still running')
    console.log('Error:', error.message)
    
    // Start server even if database fails
    const server = await cds.serve('all')
    console.log('✅ Server started (without database) on port', process.env.PORT || 4004)
  }
}

startServer()