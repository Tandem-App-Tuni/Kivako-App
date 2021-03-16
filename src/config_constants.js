const LOCAL_TEST_ENVIRONMENT = true;

// set the test server url and port here; either remote hosted staging server or local server
const testServerUrl = 'http://localhost:3000';

module.exports = Object.freeze({
    APPLICATION_URL: LOCAL_TEST_ENVIRONMENT ? testServerUrl : 'https://www.unitandem.fi',
    PORT_IN_USE : LOCAL_TEST_ENVIRONMENT ? ':3000' : '',
    IS_LOCAL_TEST_ENV: LOCAL_TEST_ENVIRONMENT,
    APPLICATION_NAME: 'Unitandem',
});