require('dotenv').config();
const express = require('express')
const cors = require('cors')
const app =express()
const bodyparser= require('body-parser')
const PORT = process.env.PORT || 5005

const connectDB = require('./dbConnection/connection')
const mainRoutes=require('./routes/mainRoute')
connectDB();
app.use(express.json())
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }));  


const corsOptions = {
    origin:'*',
    methods:['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type','Authorization']
}
app.use(cors(corsOptions))

app.use('/api', mainRoutes); // Prefix all routes with /api


app.listen(PORT,()=>{
    console.log(`Server runing on port`,PORT);
})


