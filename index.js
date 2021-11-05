const express = require("express");

const app = express();

const PORT = 4000;

app.get("/", (req, res) => {
  const response = process.env.WELCOME_MESSAGE
    ? `${process.env.WELCOME_MESSAGE}`
    : "Hello form localhost, no Welcome message env var";
  return res.json(response);
});

app.listen(PORT, () => console.log(`Server started on ${PORT}`));
