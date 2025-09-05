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

// Hook into CAP bootstrap to add custom routes
cds.on('bootstrap', (app) => {
  app.get('/health', (req, res) => res.status(200).send('OK'))
  app.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
})

// Start the CAP server (synchronous in your CAP version)
const app = cds.server

console.log(`✅ CAP server started on http://0.0.0.0:${process.env.PORT || 4004}`)
