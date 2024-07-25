// import mongoose
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://nipung014:nipungnair@cluster0.eysx24f.mongodb.net/OpenBatchb1?retryWrites=true&w=majority&appName=Cluster0 ")
.then(()=>{
    console.log("connected to db");
})
.catch((error) => {
    console.log("error")
})