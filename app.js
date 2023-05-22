const express = require("express");
const bodyparse = require("body-parser");
const _ = require("lodash");
const mongoose = require("mongoose");

mongoose.set('strictQuery', false);
const app = new express();
app.set("view engine","ejs");
app.use(express.static("public"));
app.use(bodyparse.urlencoded({extended:true}));
mongoose.connect("mongodb+srv://Kanishk:kanishk20148@cluster0.kxutrst.mongodb.net/?retryWrites=true&w=majority", {useNewUrlParser: true})
// mongoose.connect("mongodb://localhost:27017")
// const conn = mongoose.createConnection();
const postSchema={
    title: String,
    content: String
};

const Post = mongoose.model("post",postSchema);
app.get("/",function(req,res){
    try {
        const foundItems = Post.find({});
        if (foundItems.length === 0) {
        //   const p1 = new Post({
        //     title: "Day 1",
        //     content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque, repellat ea porro pariatur quia aut odio nulla, inventore accusantium maiores consequuntur ipsam unde! Placeat vitae porro et aliquam dolorum."
        //   });
        //   p1.save();
        Post.create({
            title: "Day 1",
            content: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque, repellat ea porro pariatur quia aut odio nulla, inventore accusantium maiores consequuntur ipsam unde! Placeat vitae porro et aliquam dolorum."
        })
          res.redirect("/");
        } else {
          res.render("home", { posts: foundItems });
          // console.log(foundItems)
        }
      } catch (err) {
        console.log(err);
      }
    // res.render("home",{posts:posts})
})
app.get("/home",function(req,res){
    res.redirect("/");
})
app.get("/about",function(req,res){
    res.render("about",{});
})
app.get("/contact",function(req,res){
    res.render("contact",{});
})
app.get("/compose",function(req,res){
    res.render("compose",{});
})
app.get("/notFound",function(req,res){
    res.render("notFound",{});
})
app.get("/post/:title",function(req,res){
    const t = req.params.title;
    Post.findOne({title:t},function(err,foundList){
        if(!err){
            console.log(t);
            if(!foundList){
            //    console.log("Doesnt exist!");
               res.redirect("/notFound")
            }else{
                res.render("log",{post:foundList});
            }
       }
   }); 
})
app.post("/",function(req,res){
    var m = req.body.title;
    var n = req.body.postbody;
    Post.create({
        title:req.body.title,
        content:req.body.postbody
    });
    // p.save();
    res.redirect("/");
})
app.listen("3000",function(){
    console.log("server started");
})

// const posts=[];
// posts.push({title: "Day 1",content:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat itaque, repellat ea porro pariatur quia aut odio nulla, inventore accusantium maiores consequuntur ipsam unde! Placeat vitae porro et aliquam dolorum."})

