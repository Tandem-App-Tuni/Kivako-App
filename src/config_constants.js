const LOCAL_TEST_ENVIRONMENT = false;

// set the test server url and port here; either remote hosted staging server or local server
const testServerUrl = process.env.BACKEND_URL || 'http://localhost:3000';
const testServerPort = process.env.SERVER_PORT || ':3000';

module.exports = Object.freeze({
    APPLICATION_URL: LOCAL_TEST_ENVIRONMENT ? testServerUrl : 'https://www.unitandem.fi',
    PORT_IN_USE : LOCAL_TEST_ENVIRONMENT ? testServerPort : '',
    IS_LOCAL_TEST_ENV: LOCAL_TEST_ENVIRONMENT,
    APPLICATION_NAME: 'Unitandem',
});