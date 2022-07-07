const scrapeAll = require("./scrapeAllAndSave");
const mongoose = require("mongoose");
mongoose
  .connect("mongodb://localhost/GoogleReviewsAnalysis")
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Couldn't connect to DB :", err));

const  Review  = require("./models/review");
const express = require("express");
const app = express();

app.set("view engine","ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/", async (req,res) => {
    const numberOfDocs = await Review.countDocuments();

    const pageNumber = req.query.page ? parseInt(req.query.page) : 1;
    const pageSize = 10;
    const numberOfPages = Math.ceil(numberOfDocs/pageSize);

    if(pageNumber > numberOfPages || pageNumber < 1 ){
        return res.send("Page doesn't exist!");
    }

    const firstPage = pageNumber % pageSize  == 1 ? pageNumber : pageNumber - (pageNumber % pageSize) + (pageNumber % pageSize == 0 ? -(pageSize-1): 1);
    let lastPage = pageNumber % pageSize  == 0 ? pageNumber : pageNumber - (pageNumber % pageSize) +  pageSize;
    
    if(lastPage > numberOfPages){
        lastPage =  numberOfPages;
    }

    const reviews = await Review.find().skip((pageNumber-1)*pageSize).limit(pageSize).sort({_id:1});
    return res.render("index",{reviews,firstPage,lastPage,numberOfPages,pageNumber});
    
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