const mongoose = require("mongoose");

const AllplantSchema = new mongoose.Schema(
    {name:{
      type: String,
        required: true,
    },
      email: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      password: { type: String, required: true },
    },
    {
      collation: {
        locale: "en", // Replace "en" with the appropriate language/locale for your use case
        strength: 2, // Choose the appropriate strength (1, 2, 3, or 4)
      },
    }
  );
  
  const AllPlnat = mongoose.model("allplant", AllplantSchema);
  
  module.exports = AllPlnat;