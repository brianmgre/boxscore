require("dotenv").config();
const server = require("./api/server");

PORT = process.env.PORT || 3333;

server.listen(PORT, () => {
  console.log(`\nUp and Running on port: ${PORT}\n`);
});
