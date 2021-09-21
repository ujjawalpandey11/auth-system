const express=require("express");
const bodyParser=require("body-parser");


const app=express();


app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})

app.get("/success",function(req,res){
    res.send(__dirname+"/success.html")
})
app.use(session({
    secret:"Some secret.",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect("mongodb+srv://pandey_11:test123@cluster0.q7igc.mongodb.net/GP_website", {useNewUrlParser:true, useUnifiedTopology: true});
mongoose.set("useCreateIndex", true);

const userschema = new mongoose.Schema({
    email: String,
    password: String
});

app.post("/login",function(req,res){
    const user=new User({
        username:req.body.username,
        passport:req.body.password
    })

    req.login(user, function(err){
        if(err){
            console.log(err);
        }
        else{
            passport.authenticate("local")(req,res,function(){
                res.redirect("/success");
            });
        }
    })
})



app.listen(8080, function(){
    console.log("running");
});