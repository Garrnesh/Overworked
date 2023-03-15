const express = require("express");
const routes = require("./Routes/GaneshR")
const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

app.get('/api', routes);

app.use('/', (req,res,next) => {
    res.status(404).json({
        errorMessage: 'No such endpoint found'
    })
});

app.listen(PORT,() => console.log(`Server started on ${PORT}`));