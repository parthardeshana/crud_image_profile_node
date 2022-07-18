const express = require("express");
const mongoose = require("mongoose");
var cors = require("cors");
require("dotenv").config();

const jwt = require('jsonwebtoken');
const url = process.env.DATABASE;
const PORT = process.env.PORT || 9000;
const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected success_____");
  })
  .catch((err) => {
    console.log("err", err);
  });

const conn = mongoose.connection;

conn.on("open", () => {
  console.log("connected ....");
});

app.use(express.json());


const authenticationToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, process.env.ACCESS_TOKEN, (err, user) => {
    if (err) return res.sendStatus(403)
    req.user = user
    next()
  })
}

const ProductsRouter = require("./src/routes/product");
const AdminRegister = require('./src/routes/Authentication/Adminauth');

app.use("/product", authenticationToken, ProductsRouter);
app.use("/admin", AdminRegister);

app.post("/login", async (req, res) => {
  const userName = req.body.userName
  const user = { name: userName }
  const accessToken = jwt.sign(user, process.env.ACCESS_TOKEN)
  res.json({ accessToken: accessToken })
});

app.listen(PORT, () => {
  console.log("server started ");
});
