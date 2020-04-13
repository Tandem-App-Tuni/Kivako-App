const LOCAL_TEST_ENVIRONMENT = true;

module.exports = Object.freeze({
    APPLICATION_URL: LOCAL_TEST_ENVIRONMENT ? 'http://localhost:3000' : 'https://www.unitandem.fi',
    PORT_IN_USE : LOCAL_TEST_ENVIRONMENT ? ':3000' : '',
    IS_LOCAL_TEST_ENV: LOCAL_TEST_ENVIRONMENT,
    APPLICATION_NAME: 'Unitandem'
});