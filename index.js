const express = require("express");
const getPrice = require("./getPrice");
const app = express();
const port = process.env.PORT || 8080;
app.get("/price", getPrice);
app.all("*", (req, res) => res.send("working"));
app.listen(port, () => console.log("listening"));
