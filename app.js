var alert = require('node-popup');
const popup = require('node-popup/dist/cjs.js');
var express = require('express');
//var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.connect("mongodb+srv://user:yoyohoneysingh@cluster0.k5bpx.mongodb.net/User?retryWrites=true&w=majority");
const app = express();
//const { check, valiadationResult } = require('express-validator');
app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('public'));
app.use(session({
           'secret':'fghvcdhshhgvjhfsbhvvh746ghjb',
            saveUninitialized:false,
            resave:false,
            cookie:{
                maxAge:1000*60*60*2,
                sameSite:true,
             }
           }));

var flag=0;
var authenticated= false;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine','ejs');




  

mongoose.connection.on('error', (err) => {
  console.log('DB connection Error');
});

mongoose.connection.on('connected', (err) => {
  console.log('DB connected');
});
var Schema = mongoose.Schema;
let User=new Schema({
  name:String,
  username:String,
  password:String,
  Email:String,
  
});

let Ques = new Schema({
  test_id:Number,
  q_id:Number,
  q_desc:String,
  choice1:String,
  choice2:String,
  choice3:String,
  choice4:String,
  answer:String
});

 


var users = mongoose.model('users',User)
var ques = mongoose.model('ques',Ques)

app.get("/",function(req,res){
    if(req.session.page_views){
      req.session.page_views++;
      console.log("You visited this page " + req.session.page_views + " times");
      authenticated = true;
      res.sendFile(__dirname+"/login.html");
   } 
   else {
      req.session.page_views = 1;
      console.log("Welcome to this page for the first time!");
      authenticated = true;
      res.sendFile(__dirname+"/login.html");
   }
    
});



app.post('/login', (req, res) => {
    var result = req.body;
   console.log(result);
   let err_msg = '';
   users.findOne({'username': result.username}, 'username password', function (err, values) {
    if (err){
     
        res.redirect('/')
    }
    else if (values && values._id){
       
        if (values.password == result.password){
          //err_msg = 'Successfully logged in !';
          authenticated = true;
         res.redirect('admin_page');
          
        }
        else {
          err_msg = "Incorrect Password";
          // console.log("Incorrect Password");
         return res.render('login',{ err_msg: err_msg });
        }
    }
    else {
      err_msg="Username or password is invalid";
      // console.log("Username  or password is invalid");
       return res.render('login',{err_msg: err_msg})
    }
    // 'athletes' contains the list of athletes that match the criteria.
  })





  //  query.exec(function (err, athletes) {
  //   if (err) {
   
  //   }
  //   else {
  //     console.log(query);
  //     res.sendFile(__dirname+"/Admin.html");
  //   }
    
  
    
  });



  app.get("/display_ques.html",function(req,res)
       {
       
          res.sendFile(__dirname+"/display_ques.html");
       
});



 
  app.get("/signup",function(req,res)
       {
        res.sendFile(__dirname+"/signup.html");
});


app.get("/resetPass",function(req,res)
{
 res.sendFile(__dirname+"/resetPass.html");
});
  
  app.post('/register', (req, res) => {
    var result = req.body;
    var result = req.body;
    var sData=new users();
    sData.username=result.username;
    sData.Email=result.Email;
    sData.password=result.password;
    sData.confirmPassword=result.confirmPassword;
    let err_msg = '';
    users.findOne({'username': result.username}, 'username', function (err, values) {
      if (values && values._id) {
        err_msg= "Username Exists";
       // console.log("Username Exists")
        return res.render('signup',{err_msg: err_msg});
      }
      else if (err){
        console.log(err);
      }
      else {
        err_msg = "Username available";
        //email validation
        users.findOne({'Email': result.Email}, 'Email', function (err, values) {
          if (values && values._id) {
            err_msg = "email Exists";
          return res.render('signup',{err_msg : err_msg});
          }
          else if (err){
            console.log(err);
          }
          else {
            err_msg = "email available";

            sData.save(function(err)

  {
  if(err)
     {
        err_msg = "error in sign up";
        return res.render('/signup',{err_msg: err_msg});
       
     }
     else {
      err_msg= "Sign up successful. You will be redirected to login page";
      // alert.a;
     return res.render('login',{err_msg:err_msg});
     }
    })


          }
        });
      }
    });
    
    
   
  });
  
  app.get("/admin_page",function(req,res)
{
  if (authenticated == true){
 res.sendFile(__dirname+"/admin_page.html");
  }
  else{
    //authenticated=false;
    res.sendFile(__dirname+"/login.html");
  }
});

app.post("/admin_page",(req,res)=>{

 if(authenticated == true){
 res.redirect('display_ques');
 }
});





  app.post('/adduser',(req,res)=>{
    var len=JSON.parse(req.body.userList).length;
    var sData=new user();
    sData.name=JSON.parse(req.body.userList)[len-1].name;
    sData.username=JSON.parse(req.body.userList)[len-1].username;
    sData.email=JSON.parse(req.body.userList)[len-1].Email;
    sData.password=JSON.parse(req.body.userList)[len-1].password;

    
  
    sData.save(function(err)
  {
  if(err)
     {
         console.log("Error");
     }
     res.redirect('/login.html');
  });
  })
  


  app.get('/display',function(req,res){
   
        if(authenticated == true)
        {
          ques.find(function(err,ques){
             if(err)
               {
                console.log(ques);
               }
             else
                {
                res.render('display_ques',{ques:ques});
              }
            });
          }
      else{
        res.sendFile(__dirname+"/login.html");
      }
  });

  
  
app.listen(3000, '127.0.0.1');
console.log('Node server running on port 8000');
