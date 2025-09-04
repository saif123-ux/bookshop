const cds = require('@sap/cds')
const PORT = process.env.PORT || 4004

async function startServer() {
  try {
    const db = await cds.connect.to('db')
    console.log('✅ Database connected')
    
    const server = await cds.serve('all')
    console.log('✅ Server started on port', PORT)
    
    server.get('/health', (req, res) => res.status(200).send('OK'))
    server.get('/', (req, res) => res.send('Bookshop CAP Service is running!'))
    
  } catch (error) {
    console.log('⚠️ Error:', error.message)
    // Keep server running even with errors
    const server = await cds.serve('all')
    console.log('✅ Server started on port', PORT)
  }
}

startServer()