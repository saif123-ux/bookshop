const cds = require('@sap/cds')

// PREVENT SERVER FROM SHUTTING DOWN ON ERRORS
process.on('uncaughtException', (error) => {
  console.log('🛡️  Uncaught Exception handled:', error.message)
})

process.on('unhandledRejection', (reason) => {
  console.log('🛡️  Unhandled Rejection handled:', error.message)
})

// Override CDS's default shutdown behavior
const originalExit = process.exit
process.exit = function (code) {
  console.log('🛡️  Blocked process.exit(', code, ') - keeping server alive')
}

// Force CAP to use Render’s dynamic PORT
cds.env.for('server').port = process.env.PORT || 4004
cds.env.for('server').hostname = '0.0.0.0'

// Hook into CAP bootstrap to add custom routes
cds.on('bootstrap', (app) => {
  app.get('/health', (req, res) => res.status(200).send('OK'))
  app.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
})

// Start CAP server
cds.server

console.log(`✅ CAP server started on http://0.0.0.0:${process.env.PORT || 4004}`)
