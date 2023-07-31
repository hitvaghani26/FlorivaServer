const express = require("express");
const router = express.Router();
const session = require('express-session')
const { function01 } = require("../controller/login"); 
const User = require("../models/user.model")
const bcrypt = require("bcrypt")

router.post("/", async (req,res) => {
    
    
    try {
        const user = await User.findOne({
            email: req.body.email,
            
          });
        var truePass = await bcrypt.compare(req.body.password, user.password);
        
        if(truePass){

            console.log("Found user:", user);
      
       
            req.session.user = user;
            req.session.save()
            console.log("User data in session:", req.session.user);
        
            res.send({user: true, "session": req.session})
        }
        else{
            console.log("Found user but password is wrong", user);
            res.send({user: false})
        }
  
    
    } catch (error) {
        console.log("Some thing went wrong \n"+ error);
    }
   
   
})


module.exports = router;

