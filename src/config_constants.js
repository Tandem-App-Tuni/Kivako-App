const LOCAL_TEST_ENVIRONMENT = process.env.LOCAL_TEST_ENVIRONMENT || true;
console.log('LOCAL_TEST_ENVIRONMENT --- ', LOCAL_TEST_ENVIRONMENT)

// set the test server url and port here; either remote hosted staging server or local server
const testServerUrl = process.env.BACKEND_URL || 'http://localhost:3000';
const testServerPort = process.env.BACKEND_PORT || ':3000';

console.log('testServerUrl, testServerPort logs ', testServerUrl, testServerPort )

module.exports = Object.freeze({
    APPLICATION_URL: LOCAL_TEST_ENVIRONMENT ? testServerUrl : 'https://www.unitandem.fi',
    PORT_IN_USE : LOCAL_TEST_ENVIRONMENT ? testServerPort : '',
    IS_LOCAL_TEST_ENV: LOCAL_TEST_ENVIRONMENT,
    APPLICATION_NAME: 'Unitandem',
});