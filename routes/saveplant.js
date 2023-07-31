const express = require("express");
const router = express.Router();
const AllPlant = require("../models/allplant.model")

router.post("/", async (req, res) => {
    console.log(req.body);
    const user = User.findOne({ email: req.body.email })
    const plant =  AllPlant.find({})
    var hashpassword = await bcrypt.hash(req.body.password, 12);
    try {
        const isUserExist = await User.findOne({email:req.body.email})
        if(isUserExist){
            console.log("hii");
            res.json({user: true})
        }
        else{
            await User.create(
                {
                    name:req.body.name,
                    email: req.body.email,
                    password: hashpassword
                }
            );
            console.log("hiiiiiiiiii");
            res.json({ status: "ok" })
        }
          
    } catch (error) {
        res.json({ status: "error"})

    }
})

module.exports = router;