const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const swaggerUI = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');

const userRoutes = require('./routes/user');
const traineeRoutes = require('./routes/trainee');

const PORT = process.env.PORT || 3001;


mongoose.connect((process.env.DATABASE), {
    useNewUrlParser : true,
    useUnifiedTopology : true,
    useCreateIndex : true
}).then(()=>{
        console.log(`DB connected`)
    })
  .catch(()=>{
        console.log(`DB is not connected`)
  })

app.use(cors());
app.use(bodyParser());
app.use(bodyParser.json());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use("/user", userRoutes);
app.use("/trainee", traineeRoutes);
app.get("/", (req, res)=> res.send(`app is working!`));

app.listen(PORT, (req, res)=> console.log(`server is running at port ${PORT}`));