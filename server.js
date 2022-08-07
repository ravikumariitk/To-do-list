let express=require('express')
let i=0;
const mongoose = require('mongoose');
mongoose.connect("mongodb+srv://RaviKumar:Ravi%40123@cluster0.fjtakvv.mongodb.net/onlocalhost", {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("We are connected")
});
const kittySchema = new mongoose.Schema({
    task: String,
    status:String,
    id:Number
  });
  let Kitten;
//   const Kitten = mongoose.model('To_do_Date', kittySchema);
  
let ejs=require('ejs')
let app=express();
app.use(express.urlencoded())
app.set('view engine',"ejs")
app.use(express.static(__dirname + '/static'));
app.get('/home',(req,res)=>{//edited area
    let temp= new Date();
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);    
    let tempdate=temp.getDay()+"/"+temp.getMonth()+"/"+temp.getFullYear();
    res.render('index',{Date:tempdate,Data:kittens})
})
})
app.get('/signout',(req,res)=>{
    res.redirect('/')
})
app.get('/',(req,res)=>{
    res.render('login')
})
app.post('/add',(req,res)=>{
    const fluffy = new Kitten({ task: req.body.addNew,status:"unchecked",id:i++});
    if(req.body.addNew!='')
    {
    fluffy.save(function (err) {
        if (err) return console.error(err);
        else{
           
            res.redirect('/home')
        }
       
      });
    }
    else{
        res.send('Sorry')
    }
   
})
app.get('/use',(req,res)=>{
    let temp= new Date();
    let tempdate=temp.getDay()+"/"+temp.getMonth()+"/"+temp.getFullYear();
    res.render('use',{Date:tempdate})
})
app.post('/login',(req,res)=>{
     Kitten = mongoose.model(req.body.givenEmail, kittySchema);
    res.redirect('/home')
})
app.post('/update',(req,res)=>{
    // console.log(req.body)
    
    for (const key in req.body) {
        // console.log(key)
        Kitten.update({ id: Number(key) }, { status: "checked" }, ()=>{
            // console.log("Updated")
        });
    }

    // Kitten.find(function (err, kittens) {
    //     if (err) return console.error(err);    
//    console.log(kittens)
    res.redirect('/home')
})

app.listen(80);