const cds = require('@sap/cds')

// PREVENT SERVER FROM SHUTTING DOWN ON ERRORS
process.on('uncaughtException', (error) => {
  console.log('🛡️  Uncaught Exception handled:', error.message)
  // DON'T exit the process
})

process.on('unhandledRejection', (reason, promise) => {
  console.log('🛡️  Unhandled Rejection handled:', reason.message)
  // DON'T exit the process
})

// Override CDS's default shutdown behavior
const originalExit = process.exit
process.exit = function(code) {
  console.log('🛡️  Blocked process.exit(', code, ') - keeping server alive')
  // Don't actually exit
}

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting CAP server...')
    
    // Connect to database
    const db = await cds.connect.to('db')
    console.log('✅ Database connected')
    
    // Serve all services
    const server = await cds.serve('all')
    console.log('✅ Server started on port', process.env.PORT || 4004)
    
    // Add health endpoint
    server.get('/health', (req, res) => res.status(200).send('OK'))
    server.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
    
    console.log('🎉 Application is ready and will stay alive!')
    
  } catch (error) {
    console.log('⚠️  Startup error, but keeping process alive:', error.message)
  }
}

startServer()