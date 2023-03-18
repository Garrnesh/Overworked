const express = require("express");
const router = require("./Routes/GaneshR");
const UEN_router = require("./Routes/UEN");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api', router);
app.use('/api', UEN_router);


// app.use('/', (req,res,next) => {
//     res.status(404).json({
//         errorMessage: 'No such endpoint found'
//     })
// }); 

app.listen(PORT,() => console.log(`Server started on ${PORT}`));