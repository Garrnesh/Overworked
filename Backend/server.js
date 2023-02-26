const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('./routes', (req,res))

app.listen(PORT,() => console.log(`Server started on ${PORT}`));