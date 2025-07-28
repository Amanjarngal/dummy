const User = require('../models/User.Model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Signup = async(req,res)=>{
    const {name,email,password} = req.body;
    if(!name || !email || !password)
    {
        return res.status(500).json({message:"Fill all the Fields!"});
    }
    
    try{
        const hashPass = await bcrypt.hash(password,10);
        if(hashPass)
        {
        const user = new User({name,email,password:hashPass});
        await user.save();
        res.status(200).json({message:"User Created Successfully!",user})
        }
    }
    catch(error){
        res.status(500).json({message:error,rrr:"hello"})
    }
}

const Login = async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password)
    {
        return res.status(500).json({message:"Fill all the Fields!"});
    }
    
    try{
        const user = await  User.findOne({email});
        if(user)
        {
            const ress = await bcrypt.compare( password, user.password);
            if(!ress)
            {
                 res.status(500).json({message:"Invalid Cridentials!"});
            }
            else{
                const token = await jwt.sign({id:user._id},process.env.SECRAT_KEY);
                res.status(200).json({message:"Logined Successfully!",token,user});
               
            }
        }
        else{
            res.status(404).json({message:"User Not Found!"});
        }
    }
    catch(error){
        console.log(error)
        res.status(500).json({message:error})
    }
}

module.exports = {
    Signup,
    Login
}