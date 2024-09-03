"use strict";

const  app = require("./app.js");
const  {
    setupServer
} = require("./server.js");
const  {
    basicConfigurationObject
} = require("./utils/constants.js");
const serverInstance = new setupServer(app);

const PORT = (basicConfigurationObject.PORT_NUMBER) ? parseInt(basicConfigurationObject.PORT_NUMBER) : 3000;

serverInstance.startServer(PORT);
