const mongoose= require("mongoose");

const Products = new mongoose.Schema(
    {

        Name:String,
        Image:String,
        Price:String,
        Description:String,
        Campanyname:String,

      
      
    },
    {
        collection: "Product",

    }

);

mongoose.model("Product", Products);