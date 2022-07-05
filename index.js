const scrapeAll = require("./scrapeAllAndSave");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/GoogleReviewsAnalysis")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Couldn't connect to DB :", err));

const  Review  = require("./models/review");

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