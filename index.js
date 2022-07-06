const scrapeAll = require("./scrapeAllAndSave");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/GoogleReviewsAnalysis")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Couldn't connect to DB :", err));

const  Review  = require("./models/review");
const express = require("express");
const app = express();

app.get("/", async (req,res) => {
    res.send("Hello!");
});

async function main(){
    try{
        const res = await scrapeAll();
        return res;
    }catch(e){        
        console.error(e);
        return e;
    }
}

//main().then((res)=>console.log(res)).catch(e=>console.error(e));

app.listen(3000,()=>console.log("listening to port 3000 ..."));