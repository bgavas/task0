const swaggerJSDoc = require('swagger-jsdoc');

// swagger definition
const swaggerDefinition = {
    info: {
        title: 'Task0 Node Swagger API',
        version: '1.0.0',
        description: 'Task0 Swagger',
    },
    host: process.env.API_URL.replace('http://', '').replace('https://', ''),
    basePath: '/'
};

// Options for the swagger docs
var options = {
    // import swaggerDefinitions
    swaggerDefinition: swaggerDefinition,
    // path to the API docs
    apis: ['./server/controller/*/*/*.js']
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

module.exports = (app) => {

    // Swagger.json get
    app.get('/swagger.json', (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

}