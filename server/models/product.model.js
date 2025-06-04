const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    
  },
  image: {
    type: String,
  
  },
  price: {
    type: String,

  },
  description: {  
    type: String,
  
  },
    category: {
    type: String, 
   
  }
});


const productmodel = mongoose.model("product" , productSchema)

module.exports = productmodel