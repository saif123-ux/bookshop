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
    const db = await cds.connect.to('db')
    console.log('✅ Database connected')

    // Start CDS server on Render’s port
    const port = process.env.PORT || 4004
    const server = await cds.server // this starts CAP’s Express app

    server.listen(port, '0.0.0.0', () => {
      console.log(`✅ Server is listening on http://0.0.0.0:${port}`)
    })

    // Add health endpoint
    server.get('/health', (req, res) => res.status(200).send('OK'))
    server.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))

    console.log('🎉 Application is ready and will stay alive!')
  } catch (error) {
    console.log('⚠️  Startup error, but keeping process alive:', error.message)
  }
}

startServer()
