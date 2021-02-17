System prerequisites:

-Git
-Mongodb
-npm
-node/nodemon

1. Clone the frontend Git repository for the Tandem application: https://github.com/Tandem-App-Tuni/Kivako-App.git. Switch to the devel branch for the latest versions.
2. In a separate folder download the backend Git repository: https://github.com/Tandem-App-Tuni/Kivako-app-backend.git Switch to the devel branch for the latest versions.
3. To configure the project to run localy you need to configure both the frontend and the backend applications.
   For the frontend, locate the file app/src/config_constants.js.
   Change the LOCAL_TEST_ENVIRONMENT variable to true for local testing or false for deployment on a server.
   For the backend, locate the src/configs/constants.js and do the same.
4. Make sure Mongodb is running on the machine.
5. To run the backend go to the src directory and run: nodemon server.js or node server.js. (Make sure to install all dependencies first by npm install package.json, or do it individually)
6. To run the frontend go to the app directory and run: npm run start. (Make sure to install all dependencies first by npm install package.json, or do it individually)

## Test/staging server setup

Update `testServerUrl` (include port) in `src/config_constants.js` with the remote staging servers url and make sure `LOCAL_TEST_ENVIRONMENT` is set to `true`

## Running the tests
1. Navigate to the app folder, found in the root directory of frontend.
2. Run the command "npm test".

## License

This project is licensed under the terms of the MIT license
