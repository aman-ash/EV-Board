const express = require("express");

const app = express();

const BASE_PATH = "/";
const PORT = 5050;

app.get(BASE_PATH, (req, res) => {
  res.send("Hello from the Backend of EV-Board");
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
