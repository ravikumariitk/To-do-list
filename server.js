let express=require('express')
let i=0;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ravi', {useNewUrlParser: true, useUnifiedTopology: true});
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
  const Kitten = mongoose.model('To_do_Date', kittySchema);
  
let ejs=require('ejs')
let app=express();
app.use(express.urlencoded())
app.set('view engine',"ejs")
app.use(express.static(__dirname + '/static'));
app.get('/',(req,res)=>{
    let temp= new Date();
    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);    
    let tempdate=temp.getDay()+"/"+temp.getMonth()+"/"+temp.getFullYear();
    res.render('index',{Date:tempdate,Data:kittens})
})
})
app.post('/add',(req,res)=>{
    const fluffy = new Kitten({ task: req.body.addNew,status:"unchecked",id:i++});
    if(req.body.addNew!='')
    {
    fluffy.save(function (err) {
        if (err) return console.error(err);
        else{
           
            res.redirect('/')
        }
       
      });
    }
    else{
        res.send('Sorry')
    }
   
})

app.post('/update',(req,res)=>{
    console.log(req.body)
    
    for (const key in req.body) {
        console.log(key)
        Kitten.update({ id: Number(key) }, { status: "checked" }, ()=>{
            console.log("Updated")
        });
    }

    Kitten.find(function (err, kittens) {
        if (err) return console.error(err);    
   console.log(kittens)
    res.redirect('/')
})
})
app.listen(80);