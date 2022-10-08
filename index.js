const express=require('express');
const mongoose=require('mongoose');
const app=express()
const Product=require('./product')
const cors = require('cors');


if (process.env.NODE_ENV !== "production") {
    require('dotenv').config();
  }


app.use(cors());
const bodyParser=require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())




const db='mongodb+srv://dharunya:ridh1217@cluster0.aoyobnx.mongodb.net/?retryWrites=true&w=majority'
mongoose.connect(db,{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{
    console.log("Connection open")
}).catch(err=>{
    console.log("OOPS!!ERROR")
})
app.get('/',function(req,res){
    res.send("hello")
})

app.get('/products',(req,res)=>{
    Product.find({}) 
    .exec((err,products)=>{
        if(err) console.log(err.message)
        else{
            res.json(products)
        }
    })
})

app.post('/products',(req,res)=>{
    try
    {
    const product = new Product();
    product.name=req.body.name;
    product.price=req.body.price;
    product.rating=req.body.rating;
    product.image=req.body.image
    product.save()
    res.redirect('http://localhost:3000/products')
    }catch(Err)
    {
        console.log(Err.message);
    }

})


app.post('/products/delete',async(req,res)=>{
    const {id} = req.body
    const product= await Product.findByIdAndDelete(id);

       res.redirect('http://localhost:3000/products')

    })
const PORT = 5000 || process.env.PORT
app.listen(PORT,function(){
   console.log("Server is running")
}
)
