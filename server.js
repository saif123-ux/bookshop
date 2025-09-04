const cds = require('@sap/cds')

// Prevent unhandled rejections from crashing the server
process.on('unhandledRejection', (reason, promise) => {
  console.log('🛡️  Unhandled Rejection handled gracefully:', reason.message)
  // Don't exit the process
})

process.on('uncaughtException', (error) => {
  console.log('🛡️  Uncaught Exception handled gracefully:', error.message)
  // Don't exit the process
})

// Start server
cds.serve('all')
  .then((server) => {
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    server.get('/health', (req, res) => res.status(200).send('OK'))
    server.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
  })
  .catch((error) => {
    console.error('❌ Server startup error:', error.message)
    // Don't exit - let Render handle restarts
  })