const fs = require('fs');

const { app } = require('./../../server');
const testConfig = require('./../../config/test.config');

describe('RECORD ROUTE', () => {

    const filterTests = testConfig.recordFunctionFilter.map(item => item + '.js');

    let routePrefix = 'api/v1/record';

    // Read each test file for v1
    fs
        .readdirSync(__dirname + '/../controller/v1/record')
        .forEach(file => {
            if (filterTests.length === 0 || filterTests.includes(file))
                require(__dirname + '/../controller/v1/record/' + file)(app, routePrefix);
        });

});