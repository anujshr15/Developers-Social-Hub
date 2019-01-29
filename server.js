const express=require('express');
const mongoose=require('mongoose');
const passport=require('passport');
const bodyparser=require('body-parser');
const path=require('path');

const cors=require('cors');
const users=require('./routes/api/users')
const posts=require('./routes/api/posts')
const profile=require('./routes/api/profile')

const app=express();
const db=require('./config/keys.js');
mongoose.connect(db,{useNewUrlParser:true})
		.then(()=>console.log("MONGODB connected"))
		.catch(err=>console.log(err))


app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());
app.use(passport.initialize());

require('./config/passport')(passport);




//use routes
app.use(cors())

app.use('/api/users',users)
app.use('/api/profile',profile)
app.use('/api/posts',posts)

if(process.env.NODE_ENV==='production')
{
	app.use(express.static('./client/build'))

	app.get("*",(req,res)=>{
		res.sendFile(path.resolve(__dirname,'client','build','index.html'));
	})
}




const port=process.env.PORT || 3001;

app.listen(port,()=>console.log(`server running on port ${port}`));
