const http = require("http");
const controller = require("./controller");
const config = require("./config/serverconfig.json");

const server = http.createServer(controller);


server.listen(config.port);

console.log(`Server er startet, lytter på port ${config.port}. Gå til ${config.host}:${config.port}`);