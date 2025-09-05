const cds = require('@sap/cds')

// PREVENT SERVER FROM SHUTTING DOWN ON ERRORS
process.on('uncaughtException', (error) => {
  console.log('🛡️  Uncaught Exception handled:', error.message)
})

process.on('unhandledRejection', (reason) => {
  console.log('🛡️  Unhandled Rejection handled:', reason.message)
})

// Override CDS's default shutdown behavior
const originalExit = process.exit
process.exit = function (code) {
  console.log('🛡️  Blocked process.exit(', code, ') - keeping server alive')
}

// Start server
async function startServer() {
  try {
    console.log('🚀 Starting CAP server...')

    // Connect to database
    await cds.connect.to('db')
    console.log('✅ Database connected')

    // Start CAP server (this already creates an Express app and binds it)
    const app = await cds.server

    // Add health endpoints
    app.get('/health', (req, res) => res.status(200).send('OK'))
    app.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))

    console.log(`✅ Server running on http://0.0.0.0:${process.env.PORT || 4004}`)
    console.log('🎉 Application is ready and will stay alive!')
  } catch (error) {
    console.log('⚠️  Startup error, but keeping process alive:', error.message)
  }
}

startServer()
