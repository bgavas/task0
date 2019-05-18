// Get configuration
require('./config/config.js');
// Connect to db
require('./db/connectDb');

const express = require('express');
const bodyParser = require('body-parser');
const arrays = require('./constant/array');
const routes = require('./route');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());

// Define routes
Object.keys(routes).forEach(function (key) {
    // Versioning
    arrays.availableVersions.forEach((version) => {
        app.use(`/api/${version}/` + key, routes[key](version));
    });
});

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };