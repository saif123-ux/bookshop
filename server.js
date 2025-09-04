const cds = require('@sap/cds')

// Add error handling
process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  process.exit(1)
})

// Start the server
cds.serve('all')
  .then((server) => {
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    // Add health endpoint
    server.get('/health', (req, res) => {
      res.status(200).send('OK')
    })
    
    // Add root endpoint
    server.get('/', (req, res) => {
      res.send('Bookshop CAP Service is running! Use /browse for data.')
    })
  })
  .catch((error) => {
    console.error('❌ Failed to start server:', error)
    process.exit(1)
  })