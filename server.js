const cds = require('@sap/cds')

// Force CAP to use Render’s dynamic PORT
cds.env.for('server').port = process.env.PORT || 4004
cds.env.for('server').hostname = '0.0.0.0'

// Add health check + root route
cds.on('bootstrap', (app) => {
  app.get('/health', (req, res) => res.status(200).send('OK'))
  app.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
})

// Start CAP server (async call)
cds
  .server
  .then((srv) => {
    console.log(`✅ CAP server started on http://0.0.0.0:${process.env.PORT || 4004}`)
  })
  .catch((err) => {
    console.error('❌ Failed to start CAP server:', err)
  })
