const express=require('express');
const mongoose=require('mongoose');

const users=require('./routes/api/users')
const posts=require('./routes/api/posts')
const profile=require('./routes/api/profile')

const app=express();
const db=require('./config/keys.js').mongoURI;
mongoose.connect(db,{useNewUrlParser:true})
		.then(()=>console.log("MONGODB connected"))
		.catch(err=>console.log(err))



app.get("/",(req,res)=>res.send("hello"))


//use routes

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)




const port=process.env.PORT || 3000;

app.listen(port,()=>console.log(`server running on port ${port}`));
