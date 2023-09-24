const express = require("express");
const app = express();
const port =8080;
//path require
const path =require("path");
const methodOverride = require('method-override');
const {v4 :uuidv4} =require(`uuid`);
uuidv4(); 

//data parse from url to data
app.use(express.urlencoded({extended :true}));
//view engine set
app.set("view engine", "ejs");
//path set for views
app.set("views", path.join(__dirname ,"views"));
//public use express static
app.use(express.static(path.join(__dirname , "public")));

let posts =[
   {
    id: uuidv4(),
    username :"adnan",
    content :"i love conding",
   },
   {
    id: uuidv4(),
    username :"Nouman",
    content:"Hard work is important to active success",
   },
   {
    id: uuidv4(),
    username:"Burhan",
    content:"i got seleceted for my 1st intership ",
   },
];

//Get 
//form render
app.get("/posts", (req , res) =>{
    res.render("index.ejs", {posts});
})

//post
app.get("/posts/new" ,(req ,res) =>{
    res.render("new.ejs");
})

app.post("/posts" ,(req ,res) =>{
    let id =uuidv4();
    //post use body 
    // console.log(req.body);
    //new post add in the form of #posts
    let {username ,content} =req.body;
    posts.push({id , username , content});
    // res.send("post request working");
    //response send to get request
    res.redirect("/posts");
});

//id retieve
app.get("/posts/:id", (req , res) => {
   let {id} =req.params;
   let post =posts.find((p) => id === p.id);
//    console.log(post);
//    console.log(id);
//    res.send("request working ")
    res.render("show.ejs" , {post});
});


app.patch("/post/:id" , (req , res) =>{
    let {id} =req.params;
    
    console.log(id);
    res.send("patch request is working ")
});

app.get("/posts/:id/edit" ,(req , res)=>{
    let {id} =req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs" , {post});
});
app.listen(port ,() =>{
    console.log(`listening to port : 8080`);
});