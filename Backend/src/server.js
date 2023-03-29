const express = require("express");
const router = require("./Routes/Routes");
const UEN_router = require("./Controllers/UEN_controller");
const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

app.use(router);
app.use(UEN_router);

app.listen(PORT,() => console.log(`Server started on ${PORT}`));