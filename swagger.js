const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Tiamati API',
        description: 'API da cafeteria'
    },
    host: 'https://projeto-tiamate-back.onrender.com'
};

const outputFile = './documentacao.json';
const routes = ['./index.js'];

/* NOTE: If you are using the express Router, you must pass in the 'routes' only the 
root file where the route starts, such as index.js, app.js, routes.js, etc ... */

swaggerAutogen(outputFile, routes, doc);