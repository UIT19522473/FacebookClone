const app = require("./src/app");

const PORT = 4000;

const server = app.listen(PORT, () => {
  console.log(`listening port: ${PORT}`);
});
