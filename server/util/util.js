module.exports = {

    // Defines routes with controllers and versioning
    defineRoutes: (routes, routeName, version) => {

        // Define router
        const router = require('express').Router();

        // Create all routes
        routes.forEach((endpoint) => {

            // Set version if endpoint doesn't support
            if (!endpoint.versions.includes(version)) version = endpoint.fallbackVersion;

            // Set handlers
            let handlers = endpoint.handlers;

            // Set controller
            router[endpoint.type](endpoint.path, handlers, 
                require(`./../controller/${version}/${routeName}/${endpoint.controller}`));
            
        });

        // Return router
        return router;

    }

}