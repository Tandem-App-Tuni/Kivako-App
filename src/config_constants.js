require('dotenv').config();

const LOCAL_TEST_ENVIRONMENT = process.env.REACT_APP_LOCAL_TEST_ENVIRONMENT || true;

// set the test server url and port here; either remote hosted staging server or local server
const testServerUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:3000';
const testServerPort = process.env.REACT_APP_BACKEND_PORT || ':3000';

console.log('testServerUrl, testServerPort logs ', testServerUrl, testServerPort )

console.log('LOCAL_TEST_ENVIRONMENT --- ', process.env.REACT_APP_LOCAL_TEST_ENVIRONMENT)
console.log('BACKEND_URL --- ', process.env.REACT_APP_BACKEND_URL)
console.log('NODE_ENV --- ', process.env.REACT_APP_NODE_ENV)

module.exports = Object.freeze({
    APPLICATION_URL: LOCAL_TEST_ENVIRONMENT ? testServerUrl : 'https://www.unitandem.fi',
    PORT_IN_USE : LOCAL_TEST_ENVIRONMENT ? testServerPort : '',
    IS_LOCAL_TEST_ENV: LOCAL_TEST_ENVIRONMENT,
    APPLICATION_NAME: 'Unitandem',
});