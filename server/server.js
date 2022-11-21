const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
require("./db/conn");


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(cors({
  origin: ["http://localhost:3000", "http://localhost:5173", "*"],
  methods: ["GET", "POST"],
  credentials: true
}))

app.use(express.json());
dotenv.config({ path: "config.env" });



// defining port
const PORT = process.env.PORT || 8080;
app.use(require("./routes/register"));
app.use(require("./routes/getOrder"));
app.use(require("./routes/getProduct"));
app.use(require("./routes/getUser"));
app.use(require("./routes/getProductById"));
app.use(require("./routes/deleteProduct"));
app.use(require("./routes/addProduct"));
app.use(require("./routes/login"))
app.use(require("./routes/register"))
app.use(require("./routes/pay"))
app.use(require("./routes/order"))

// setting up an empty GET Route
app.get('/', (req, res) => { res.json({ message: "GET request!!" }) });

// Starting Server on PORT
app.listen(PORT, () => console.log('Server started on PORT: ' + PORT))