const express = require ("express");
const mongoose = require ("mongoose")
const app = express();
const PORT = 3000;
const dotenv = require ("dotenv")
dotenv.config()
// app.use(express.json())
app.get("/",(req,res)=>{
    res.json({"message":"ConnectEase API"})
    console.log(res)
})

mongoose.connect (process.env.MONGO_URI)
.then(()=>{
    app.listen(PORT,()=>{
        console.log(`server is running on http://localhost:${PORT} and DB is connected`)
    })
})
.catch(err => console.log(err))

