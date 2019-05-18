const utils = require('./../util/util');

// Define routes
const routes = [
    {
        controller: 'search',
        description: 'Search records',
        fallbackVersion: 'v1',
        handlers: [],
        path: '/search',
        type: 'post',
        versions: ['v1']
    }
];


// Export route
module.exports = (version) => utils.defineRoutes(routes, 'record', version);