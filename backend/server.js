const app = require("./src/app");
const SocketServer = require("./src/socket");

const http = require("http");

const server = http.createServer(app);

SocketServer(server);


const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
