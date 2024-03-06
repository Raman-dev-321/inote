const express = require('express')
const mongoose = require('mongoose');
const app = express()
const port = 5000


mongoose.connect("mongodb://127.0.0.1:27017/inotebook").then(()=>{
    console.log('connection established');
}).catch(err => console.log("something went wrong",err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', require('./Routes/Auth'))
app.get('/', (req, res) => {
  res.send("hello world")


})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
