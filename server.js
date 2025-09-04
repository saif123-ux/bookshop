// const cds = require('@sap/cds');

// cds.on('bootstrap', app => {
//   const cors = require('cors');
//   app.use(cors({
//     // origin: 'http://localhost:8080',
//     origin: [
//       'https://port8080-workspaces-ws-qfx8w.eu10.applicationstudio.cloud.sap',
//       'http://localhost:8080' // Include all required origins
//   ],
//     credentials: true,
//     allowedHeaders: ['x-csrf-token', 'content-type', 'authorization'],
//     exposedHeaders: ['x-csrf-token']
//   }));
// });

// module.exports = cds.server;




const cds = require('@sap/cds');

cds.on('bootstrap', app => {
  app.get('/', (req, res, next) => {
    const accept = req.headers['accept'] || '';
    if (accept.includes('text/html')) {
      return res.redirect('/supplier-invoice-ui/webapp');
    }
    next();
  });
});

module.exports = cds.server;
