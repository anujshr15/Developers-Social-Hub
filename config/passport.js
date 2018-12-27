const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose=require('mongoose');
const User=mongoose.model('users');
const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';

module.exports=(passport)=>{
	passport.use(new JwtStrategy(opts,(payload,done)=>{
		User.findById(payload.id,(err,user)=>{
			if(err)
			{
				return done(err,false)
			}
			if(user)
			{
				return done(null,user)
			}
			else{
				return done(null,false);
			}
		}).catch(err=>console.log(err))
	}))
}

