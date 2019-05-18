// Get configuration
require('./config/config.js');
// Connect to db
require('./db/connectDb');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT;

// Middlewares
app.use(bodyParser.json());

// Listen requests
app.listen(port, () => {
	console.log(`App started on port ${port}`);
});

// Export for testing
module.exports = { app };